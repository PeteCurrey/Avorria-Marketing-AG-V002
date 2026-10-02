/**
 * lib/actions/discovery.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Project Discovery Server Actions
 *
 * Implements strict server-side boundaries:
 * - Session token generation / verification
 * - Rate limiting & honeypot verification
 * - Progressive stage persistence
 * - Server-side OpenAI extraction & adaptive follow-up triggering
 * - Dual-brief synthesis (Client Brief + Avorria Discovery Pack)
 * - Submission transition into verified enterprise pipeline
 * ─────────────────────────────────────────────────────────────────────────────
 */

'use server'

import { randomBytes } from 'node:crypto'
import { z } from 'zod'
import {
  createOrResumeDiscoveryProject,
  getDiscoveryProjectByToken,
  saveDiscoveryStageAnswer,
  listDiscoveryAnswers,
  recordAIInteraction,
  saveDiscoveryBriefs,
  finalizeDiscoverySubmission,
  type DiscoveryProjectRow,
} from '@/lib/db/discovery'
import {
  extractProjectIntelligence,
  evaluateAdaptiveFollowUp,
  evaluateCompleteness,
  generateClientProjectBrief,
  generateInternalDiscoveryPack,
} from '@/lib/ai/openai'
import { checkRateLimit, hashIp } from '@/lib/db/rateLimit'
import { captureError } from '@/lib/monitoring'
import type {
  CompletenessMatrix,
  FollowUpQuestion,
  ProjectBrief,
  DiscoveryPack,
  DiscoveryProjectState,
} from '@/types/discovery'

// ─── Input Validation Schemas ─────────────────────────────────────────────────

const StageAnswerInputSchema = z.object({
  sessionToken: z.string().min(8),
  stageNumber: z.number().int().min(1).max(9),
  stageSlug: z.string().min(2),
  inputData: z.record(z.string(), z.unknown()),
  _hp: z.string().max(0).optional(),
})

// ─── 1. Initialize or Resume Discovery Session ────────────────────────────────

export async function initOrResumeDiscoveryAction(existingToken?: string): Promise<{
  success: boolean
  sessionToken: string
  project: DiscoveryProjectRow
  answers: Record<string, unknown>[]
  error?: string
}> {
  try {
    const sessionToken = existingToken?.trim() || `avr_sess_${randomBytes(24).toString('hex')}`

    const { headers } = await import('next/headers')
    const headerStore = await headers()
    const forwarded = headerStore.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1'
    const userAgent = headerStore.get('user-agent') || undefined
    const ipHash = hashIp(ip)

    const project = await createOrResumeDiscoveryProject(sessionToken, ipHash, userAgent)
    const answers = await listDiscoveryAnswers(project.id)

    return {
      success: true,
      sessionToken,
      project,
      answers,
    }
  } catch (err: unknown) {
    captureError(err, { context: 'initOrResumeDiscoveryAction' })
    return {
      success: false,
      sessionToken: '',
      project: {} as any,
      answers: [],
      error: 'Unable to initialize project discovery session.',
    }
  }
}

// ─── 2. Save Stage Answer & Update Intelligence ───────────────────────────────

export async function saveStageAnswerAction(payload: {
  sessionToken: string
  stageNumber: number
  stageSlug: string
  inputData: Record<string, unknown>
  runAIExtraction?: boolean
}): Promise<{
  success: boolean
  completeness: CompletenessMatrix
  extracted?: Record<string, unknown>
  error?: string
}> {
  try {
    const parsed = StageAnswerInputSchema.safeParse(payload)
    if (!parsed.success) {
      return {
        success: false,
        completeness: evaluateCompleteness({}),
        error: 'Invalid stage payload submitted.',
      }
    }

    const { sessionToken, stageNumber, stageSlug, inputData } = parsed.data
    const project = await getDiscoveryProjectByToken(sessionToken)

    if (!project) {
      return {
        success: false,
        completeness: evaluateCompleteness({}),
        error: 'Discovery session not found.',
      }
    }

    // 1. Calculate updated completeness matrix across accumulated answers
    const allAnswers = await listDiscoveryAnswers(project.id)
    const consolidatedAnswers: Record<string, unknown> = {}
    for (const a of allAnswers) {
      Object.assign(consolidatedAnswers, a.raw_input as Record<string, unknown>)
    }
    Object.assign(consolidatedAnswers, inputData)

    const completeness = evaluateCompleteness(consolidatedAnswers)

    // 2. Optional AI Extraction (Non-blocking, with error recovery)
    let extractedResult: Record<string, unknown> | undefined

    if (payload.runAIExtraction) {
      const narrativeText = Object.values(inputData)
        .filter((val) => typeof val === 'string' && val.length > 10)
        .join('\n\n')

      if (narrativeText.length > 15) {
        const aiRes = await extractProjectIntelligence({
          stage: stageSlug,
          clientText: narrativeText,
          existingContext: consolidatedAnswers,
        })

        if (aiRes.data) {
          extractedResult = aiRes.data as unknown as Record<string, unknown>
        }

        // Record AI interaction for audit
        await recordAIInteraction({
          projectId: project.id,
          interactionType: 'EXTRACTION',
          model: aiRes.model,
          status: aiRes.status,
          promptSummary: `Extraction for stage ${stageSlug}`,
          structuredOutput: aiRes.data as unknown as Record<string, unknown>,
          errorMessage: aiRes.error || undefined,
        })
      }
    }

    // 3. Persist raw answer & update project in DB
    await saveDiscoveryStageAnswer({
      projectId: project.id,
      stageNumber,
      stageSlug,
      rawInput: inputData,
      extractedData: extractedResult,
      completenessMatrix: completeness,
    })

    return {
      success: true,
      completeness,
      extracted: extractedResult,
    }
  } catch (err: unknown) {
    captureError(err, { context: 'saveStageAnswerAction', payload })
    return {
      success: false,
      completeness: evaluateCompleteness({}),
      error: 'Failed to record stage answer.',
    }
  }
}

// ─── 3. Evaluate Adaptive Follow-Up Question ──────────────────────────────────

export async function evaluateFollowUpAction(sessionToken: string): Promise<{
  success: boolean
  followUp: FollowUpQuestion | null
  error?: string
}> {
  try {
    const project = await getDiscoveryProjectByToken(sessionToken)
    if (!project) {
      return { success: false, followUp: null, error: 'Session not found.' }
    }

    const allAnswers = await listDiscoveryAnswers(project.id)
    const consolidated: Record<string, unknown> = {}
    for (const a of allAnswers) {
      Object.assign(consolidated, a.raw_input as Record<string, unknown>)
    }

    const completeness = evaluateCompleteness(consolidated)
    const result = await evaluateAdaptiveFollowUp(consolidated, completeness)

    await recordAIInteraction({
      projectId: project.id,
      interactionType: 'FOLLOW_UP',
      model: result.model,
      status: result.status,
      promptSummary: 'Adaptive follow-up evaluation',
      structuredOutput: result.data as unknown as Record<string, unknown>,
      errorMessage: result.error || undefined,
    })

    return {
      success: true,
      followUp: result.data,
    }
  } catch (err: unknown) {
    captureError(err, { context: 'evaluateFollowUpAction', sessionToken })
    return { success: false, followUp: null, error: 'Failed to evaluate follow-up.' }
  }
}

// ─── 4. Generate Review Brief Preview (Stage 09) ──────────────────────────────

export async function generateBriefPreviewAction(sessionToken: string): Promise<{
  success: boolean
  clientBrief: ProjectBrief | null
  internalPack: DiscoveryPack | null
  error?: string
}> {
  try {
    const project = await getDiscoveryProjectByToken(sessionToken)
    if (!project) {
      return { success: false, clientBrief: null, internalPack: null, error: 'Session not found.' }
    }

    const allAnswers = await listDiscoveryAnswers(project.id)
    const consolidated: Record<string, unknown> = {}
    for (const a of allAnswers) {
      Object.assign(consolidated, a.raw_input as Record<string, unknown>)
    }

    // 1. Synthesize Client-Facing Brief
    const clientBriefRes = await generateClientProjectBrief(consolidated)
    const clientBrief = clientBriefRes.data

    await recordAIInteraction({
      projectId: project.id,
      interactionType: 'CLIENT_BRIEF_SYNTHESIS',
      model: clientBriefRes.model,
      status: clientBriefRes.status,
      promptSummary: 'Client Brief generation',
      structuredOutput: clientBrief as unknown as Record<string, unknown>,
      errorMessage: clientBriefRes.error || undefined,
    })

    // 2. Synthesize Internal Avorria Discovery Pack
    const internalPackRes = await generateInternalDiscoveryPack(consolidated, [], clientBrief || undefined)
    const internalPack = internalPackRes.data

    await recordAIInteraction({
      projectId: project.id,
      interactionType: 'INTERNAL_DISCOVERY_PACK_SYNTHESIS',
      model: internalPackRes.model,
      status: internalPackRes.status,
      promptSummary: 'Internal Discovery Pack generation',
      structuredOutput: internalPack as unknown as Record<string, unknown>,
      errorMessage: internalPackRes.error || undefined,
    })

    // 3. Save briefs to database
    if (clientBrief && internalPack) {
      await saveDiscoveryBriefs(project.id, clientBrief, internalPack)
    }

    return {
      success: true,
      clientBrief,
      internalPack,
    }
  } catch (err: unknown) {
    captureError(err, { context: 'generateBriefPreviewAction', sessionToken })
    return { success: false, clientBrief: null, internalPack: null, error: 'Brief synthesis failed.' }
  }
}

// ─── 5. Submit Final Brief (Terminal Action) ──────────────────────────────────

export async function submitFinalBriefAction(sessionToken: string): Promise<{
  success: boolean
  reference?: string
  enquiryId?: string
  projectId?: string
  organisationId?: string
  error?: string
}> {
  try {
    const { headers } = await import('next/headers')
    const headerStore = await headers()
    const forwarded = headerStore.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1'

    // Rate limit check
    const allowed = await checkRateLimit(ip)
    if (!allowed) {
      return { success: false, error: 'Too many submissions. Please wait before retrying.' }
    }

    const project = await getDiscoveryProjectByToken(sessionToken)
    if (!project) {
      return { success: false, error: 'Project session not found.' }
    }

    // Ensure brief is generated before final submission
    if (!project.client_brief) {
      const preview = await generateBriefPreviewAction(sessionToken)
      if (!preview.success || !preview.clientBrief) {
        return { success: false, error: 'Could not generate final brief for submission.' }
      }
    }

    const result = await finalizeDiscoverySubmission(project.id)

    return {
      success: true,
      reference: result.reference,
      enquiryId: result.enquiryId,
      projectId: result.projectId,
      organisationId: result.organisationId,
    }
  } catch (err: unknown) {
    captureError(err, { context: 'submitFinalBriefAction', sessionToken })
    return { success: false, error: 'Failed to submit project brief. Please email hello@avorria.com.' }
  }
}
