'use server'

import { z } from 'zod'
import { createConsultationRecord } from '@/lib/db/project-pipeline'
import { captureError } from '@/lib/monitoring'
import type {
  ConsultationInput,
  ConsultationReceipt,
  ProjectInitiationFormData,
  BudgetRangeOption,
  ProjectType,
} from '@/types/consultation'

// ── Budget range normaliser ───────────────────────────────────────────────────
function normaliseBudget(range: string): BudgetRangeOption {
  switch (range) {
    case '5k-10k':
    case '10k-25k':
      return '10k-25k'
    case '25k-50k':
      return '25k-50k'
    case '50k-100k':
      return '50k-100k'
    case '50k-plus':
    case 'over-100k':
      return 'over-100k'
    case 'not-sure':
    case 'tbd':
    default:
      return 'tbd'
  }
}

// ── Project category → project type normaliser ────────────────────────────────
function normaliseProjectType(categories?: string[]): ProjectType {
  if (!categories || categories.length === 0) return 'build-sprint'
  if (categories.includes('ai-system') || categories.includes('digital-transformation')) {
    return 'embedded-systems'
  }
  if (categories.includes('digital-platform') || categories.includes('web-application')) {
    return 'build-sprint'
  }
  return 'build-sprint'
}

// ── Zod schema ───────────────────────────────────────────────────────────────
const ConsultationSchema = z.object({
  // Stage 01 / Core Fields
  organisationName: z.string().trim().min(1, 'Organisation name is required').max(150),
  organisationUrl:  z.string().trim().optional(),
  contactName:      z.string().trim().min(1, 'Contact name is required').max(100),
  contactEmail:     z.string().trim().email('Valid email is required'),
  contactRole:      z.string().trim().optional(),

  // Progressive Wizard Fields
  challengeType:        z.string().trim().optional(),
  challengeDescription: z.string().trim().optional(),
  projectCategories:    z.array(z.string()).optional(),
  additionalContext:    z.string().trim().optional(),

  // Budget & Timeline
  budgetRange: z.enum([
    '5k-10k',
    '10k-25k',
    '25k-50k',
    '50k-100k',
    '50k-plus',
    'over-100k',
    'not-sure',
    'tbd',
  ]),
  timeline: z.enum(['immediate', '1-3-months', '3-6-months', 'exploratory']),

  // Legacy / Additional Consultation Fields
  projectType: z
    .enum(['build-sprint', 'embedded-systems', 'forensic-audit', 'architecture-consultation'])
    .optional(),
  currentSituation:      z.string().trim().optional(),
  desiredOutcome:        z.string().trim().optional(),
  industry:              z.string().trim().optional(),
  existingPlatform:      z.string().trim().optional(),
  technicalRequirements: z.array(z.string()).optional(),
  decisionStructure:     z.string().trim().optional(),
  relevantLinks:         z.string().trim().optional(),
  supportingNotes:       z.string().trim().optional(),

  // Honeypot
  _hp: z.string().max(0, 'Invalid submission').optional(),
})

export interface ConsultationActionResponse {
  success: boolean
  receipt?: ConsultationReceipt
  error?: string
  fieldErrors?: Record<string, string[]>
}

export async function submitConsultationAction(
  data: (ConsultationInput | ProjectInitiationFormData) & { _hp?: string }
): Promise<ConsultationActionResponse> {
  try {
    const parse = ConsultationSchema.safeParse(data)
    if (!parse.success) {
      return {
        success: false,
        error: 'Please verify the required fields.',
        fieldErrors: parse.error.flatten().fieldErrors,
      }
    }

    const d = parse.data

    // ── Build DB-compatible ConsultationInput payload ────────────────────────
    const challengePrefix = d.challengeType
      ? `[${d.challengeType.replace(/-/g, ' ').toUpperCase()}] `
      : ''
    const combinedSituation = `${challengePrefix}${d.challengeDescription ?? ''}`.trim()
    const combinedNotes = [d.supportingNotes, d.additionalContext].filter(Boolean).join('\n\n')

    const resolvedProjectType: ProjectType =
      d.projectType ?? normaliseProjectType(d.projectCategories)

    const resolvedBudget: BudgetRangeOption = normaliseBudget(d.budgetRange)

    const payload: ConsultationInput = {
      organisationName:      d.organisationName,
      organisationUrl:       d.organisationUrl,
      industry:              d.industry,
      projectType:           resolvedProjectType,
      currentSituation:      d.currentSituation || combinedSituation || 'Not specified',
      desiredOutcome:        d.desiredOutcome || d.additionalContext || 'Not specified',
      existingPlatform:      d.existingPlatform,
      technicalRequirements: d.technicalRequirements ?? [],
      timeline:              d.timeline,
      budgetRange:           resolvedBudget,
      decisionStructure:     d.decisionStructure ?? 'Founder / CEO Direct Mandate',
      relevantLinks:         d.relevantLinks,
      supportingNotes:       combinedNotes || undefined,
      contactName:           d.contactName,
      contactEmail:          d.contactEmail,
      contactRole:           d.contactRole,
    }

    const receipt = await createConsultationRecord(payload)

    return { success: true, receipt }
  } catch (err: unknown) {
    captureError(err, { context: 'submitConsultationAction', data })
    return {
      success: false,
      error:
        err instanceof Error
          ? err.message
          : 'Submission failed. Please contact hello@avorria.com.',
    }
  }
}
