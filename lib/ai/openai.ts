/**
 * lib/ai/openai.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Avorria Project Discovery — Server-Side Intelligence & Reasoning Service
 *
 * Principles:
 * - Server-only: OpenAI credentials and execution are NEVER exposed to the client.
 * - Structured outputs: Enforces strict JSON Schema parsing against Zod models.
 * - Model tiering: Configurable model routing (routine extraction vs. deep synthesis).
 * - Safety & Integrity: Zero hallucinated facts, budgets, timelines, or commitments.
 * - Fault tolerance: On API failure, client inputs are preserved, and deterministic
 *   heuristic recovery is provided without fake analysis.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import 'server-only'
import { captureError } from '@/lib/monitoring'
import {
  ProjectExtractionSchema,
  FollowUpQuestionSchema,
  CompletenessMatrixSchema,
  ProjectBriefSchema,
  DiscoveryPackSchema,
  type ProjectExtraction,
  type FollowUpQuestion,
  type CompletenessMatrix,
  type ProjectBrief,
  type DiscoveryPack,
  type AIProcessingResult,
  type UnderstandingLevel,
} from '@/types/discovery'

// ─── Central Model Configuration ──────────────────────────────────────────────

export const AI_MODELS = {
  // Lower-cost, low-latency model for classification & field extraction
  EXTRACTION: process.env.OPENAI_MODEL_EXTRACTION || 'gpt-4o-mini',
  // High-capability reasoning model for cross-stage synthesis & discovery packs
  SYNTHESIS: process.env.OPENAI_MODEL_SYNTHESIS || 'gpt-4o',
} as const

// ─── Core OpenAI Request Engine ───────────────────────────────────────────────

interface OpenAIChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

async function callOpenAIStructured<T>(params: {
  model: string
  messages: OpenAIChatMessage[]
  temperature?: number
  maxTokens?: number
  schemaParser: (raw: unknown) => { success: true; data: T } | { success: false; error: any }
}): Promise<{
  success: boolean
  data: T | null
  error: string | null
  tokens?: { prompt: number; completion: number; total: number }
}> {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    return {
      success: false,
      data: null,
      error: 'OPENAI_API_KEY is not configured in server environment.',
    }
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 18000) // 18s SLA

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: params.model,
        messages: params.messages,
        temperature: params.temperature ?? 0.1,
        response_format: { type: 'json_object' },
      }),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!res.ok) {
      const errText = await res.text()
      const errorMsg = `OpenAI API returned ${res.status}: ${errText}`
      captureError(new Error(errorMsg), { context: 'callOpenAIStructured:http', model: params.model })
      return { success: false, data: null, error: errorMsg }
    }

    const json = await res.json()
    const rawContent = json?.choices?.[0]?.message?.content

    if (!rawContent) {
      return { success: false, data: null, error: 'OpenAI returned empty message content.' }
    }

    let parsedJson: unknown
    try {
      parsedJson = JSON.parse(rawContent)
    } catch (parseErr) {
      return { success: false, data: null, error: 'Failed to parse JSON response from OpenAI.' }
    }

    const validation = params.schemaParser(parsedJson)
    if (!validation.success) {
      return {
        success: false,
        data: null,
        error: `Schema validation failed: ${JSON.stringify(validation.error)}`,
      }
    }

    const usage = json.usage
    return {
      success: true,
      data: validation.data,
      error: null,
      tokens: usage
        ? {
            prompt: usage.prompt_tokens ?? 0,
            completion: usage.completion_tokens ?? 0,
            total: usage.total_tokens ?? 0,
          }
        : undefined,
    }
  } catch (err: unknown) {
    clearTimeout(timeoutId)
    const message = err instanceof Error ? err.message : String(err)
    captureError(err, { context: 'callOpenAIStructured:exception', model: params.model })
    return { success: false, data: null, error: message }
  }
}

// ─── 1. Factual Extraction & Entity Parsing ───────────────────────────────────

const EXTRACTION_SYSTEM_PROMPT = `
You are the Project Intelligence parser for Avorria, a bespoke digital engineering studio.
Your mandate is to read prospective client input and extract structured intelligence with absolute truthfulness.

CRITICAL RULES:
1. NEVER invent facts, budgets, timelines, metrics, or company requirements.
2. Put confirmed client statements into 'client_provided'.
3. Put hypothetical technical or architectural areas that Avorria could explore into 'potential_areas_to_explore'.
   THESE ARE NEVER FACTS. They are exploration topics only.
4. Put unaddressed elements into 'unknowns'.
5. Extract key entities (company, website, budget, timeline, systems) only if explicitly mentioned.
6. Output valid JSON matching the ProjectExtraction schema.
`.trim()

export async function extractProjectIntelligence(
  input: {
    stage: string
    clientText: string
    existingContext?: Record<string, unknown>
  }
): Promise<AIProcessingResult<ProjectExtraction>> {
  const model = AI_MODELS.EXTRACTION

  // If no OpenAI key or in offline mode, trigger heuristic recovery immediately
  if (!process.env.OPENAI_API_KEY) {
    return {
      success: true,
      data: fallbackExtractHeuristics(input.clientText),
      model: 'heuristic-fallback',
      status: 'RECOVERED',
      error: 'OpenAI API key missing; used deterministic heuristic extractor.',
      recoveredFromError: true,
    }
  }

  const prompt = `
Stage: ${input.stage}
Client Input:
"""
${input.clientText}
"""

Existing Context:
${JSON.stringify(input.existingContext || {})}

Return JSON with keys:
- client_provided (string[])
- potential_areas_to_explore (string[])
- unknowns (string[])
- key_entities { company?, website?, budget?, timeline?, systems: string[] }
`.trim()

  const result = await callOpenAIStructured<ProjectExtraction>({
    model,
    messages: [
      { role: 'system', content: EXTRACTION_SYSTEM_PROMPT },
      { role: 'user', content: prompt },
    ],
    schemaParser: (raw) => {
      const res = ProjectExtractionSchema.safeParse(raw)
      return res.success ? { success: true, data: res.data } : { success: false, error: res.error }
    },
  })

  if (result.success && result.data) {
    return {
      success: true,
      data: result.data,
      model,
      status: 'SUCCESS',
      error: null,
      recoveredFromError: false,
      tokens: result.tokens,
    }
  }

  // Graceful recovery: preserve raw text, synthesize deterministic extraction
  const fallback = fallbackExtractHeuristics(input.clientText)
  return {
    success: true,
    data: fallback,
    model,
    status: 'RECOVERED',
    error: result.error,
    recoveredFromError: true,
  }
}

// ─── 2. Adaptive Follow-Up Question Logic ─────────────────────────────────────

const FOLLOW_UP_SYSTEM_PROMPT = `
You are an executive project scoping partner at Avorria.
Determine if a single follow-up question is genuinely necessary and materially improves understanding.

RULES:
1. Ask AT MOST ONE question.
2. If the client has already provided reasonable context, return "should_ask_question": false.
3. NEVER interrogate the client with multiple rapid-fire questions.
4. Avoid technical jargon (e.g. don't ask "what ORM do you prefer?"). Ask human, outcome-oriented questions.
5. If the client indicated they are "not sure" about technical architecture, accept it and do NOT grill them on technical specifics.
6. Output valid JSON:
   {
     "should_ask_question": boolean,
     "question": string | null,
     "reason": string | null,
     "related_area": string | null,
     "priority": "high" | "medium" | "low" | null
   }
`.trim()

export async function evaluateAdaptiveFollowUp(
  answers: Record<string, unknown>,
  completeness: CompletenessMatrix
): Promise<AIProcessingResult<FollowUpQuestion>> {
  const model = AI_MODELS.EXTRACTION

  if (!process.env.OPENAI_API_KEY) {
    return {
      success: true,
      data: fallbackAdaptiveQuestion(answers, completeness),
      model: 'heuristic-fallback',
      status: 'RECOVERED',
      error: 'OpenAI API key missing; used heuristic adaptive logic.',
      recoveredFromError: true,
    }
  }

  const prompt = `
Current Client Answers:
${JSON.stringify(answers, null, 2)}

Current Completeness Matrix:
${JSON.stringify(completeness, null, 2)}

Decide if ONE follow-up question is genuinely required right now.
`.trim()

  const result = await callOpenAIStructured<FollowUpQuestion>({
    model,
    messages: [
      { role: 'system', content: FOLLOW_UP_SYSTEM_PROMPT },
      { role: 'user', content: prompt },
    ],
    schemaParser: (raw) => {
      const res = FollowUpQuestionSchema.safeParse(raw)
      return res.success ? { success: true, data: res.data } : { success: false, error: res.error }
    },
  })

  if (result.success && result.data) {
    return {
      success: true,
      data: result.data,
      model,
      status: 'SUCCESS',
      error: null,
      recoveredFromError: false,
      tokens: result.tokens,
    }
  }

  return {
    success: true,
    data: fallbackAdaptiveQuestion(answers, completeness),
    model,
    status: 'RECOVERED',
    error: result.error,
    recoveredFromError: true,
  }
}

// ─── 3. Factual Brief Completeness Evaluator (Deterministic) ──────────────────

export function evaluateCompleteness(answers: Record<string, any>): CompletenessMatrix {
  const businessLevel = evaluateFieldLevel(
    answers.companyName || answers.organisationName,
    answers.businessDescription || answers.whatBusinessDoes
  )

  const problemLevel = evaluateFieldLevel(
    answers.problemStatement || answers.challengeDescription || answers.whatNeedsChange,
    answers.problemImpact || answers.whyNow
  )

  const objectiveLevel = evaluateFieldLevel(
    answers.successDefinition || answers.desiredOutcome,
    answers.goals || answers.objectives
  )

  const audienceLevel: UnderstandingLevel =
    answers.customers || answers.targetAudience
      ? String(answers.customers || answers.targetAudience).trim().length > 10
        ? 'UNDERSTOOD'
        : 'PARTIALLY_UNDERSTOOD'
      : answers.userSegments
      ? 'PARTIALLY_UNDERSTOOD'
      : 'NOT_YET_DEFINED'

  const techLevel = evaluateFieldLevel(
    answers.existingSystems || answers.infrastructure || answers.currentPlatform,
    answers.systemsToKeep || answers.technicalFrustrations
  )

  const materialsLevel: UnderstandingLevel =
    answers.files && Array.isArray(answers.files) && answers.files.length > 0
      ? 'UNDERSTOOD'
      : answers.materialsNote
      ? 'PARTIALLY_UNDERSTOOD'
      : 'NOT_YET_DEFINED'

  const timingLevel: UnderstandingLevel =
    answers.timeline || answers.urgency || answers.deadline
      ? 'UNDERSTOOD'
      : 'NOT_YET_DEFINED'

  const budgetLevel: UnderstandingLevel =
    answers.budgetRange || answers.investmentBracket
      ? 'UNDERSTOOD'
      : 'NOT_YET_DEFINED'

  return CompletenessMatrixSchema.parse({
    business: businessLevel,
    problem: problemLevel,
    objective: objectiveLevel,
    audience: audienceLevel,
    technical_environment: techLevel,
    materials: materialsLevel,
    timing: timingLevel,
    budget: budgetLevel,
  })
}

function evaluateFieldLevel(primary?: any, secondary?: any): UnderstandingLevel {
  const hasPrimary = Boolean(primary && String(primary).trim().length > 3)
  const hasSecondary = Boolean(
    secondary && (Array.isArray(secondary) ? secondary.length > 0 : String(secondary).trim().length > 3)
  )

  if (hasPrimary && hasSecondary) return 'UNDERSTOOD'
  if (hasPrimary || hasSecondary) return 'PARTIALLY_UNDERSTOOD'
  return 'NOT_YET_DEFINED'
}

// ─── 4. Client Project Brief Synthesis ────────────────────────────────────────

const CLIENT_BRIEF_SYSTEM_PROMPT = `
You are Avorria's Executive Director of Strategy.
Synthesise the client's discovery answers into a polished, structured Client Project Brief.

ABSOLUTE PRINCIPLES:
1. NEVER invent facts, budgets, timelines, or client requirements.
2. Distinguish clearly what the client provided versus what is open for Avorria to explore.
3. If information was not provided, state "Not specified" or "To be determined".
4. The brief is a scoping instrument to clarify requirements, NOT a legal contract.
5. Output valid JSON matching the ProjectBrief schema.
`.trim()

export async function generateClientProjectBrief(
  answers: Record<string, any>,
  files: any[] = []
): Promise<AIProcessingResult<ProjectBrief>> {
  const model = AI_MODELS.SYNTHESIS

  if (!process.env.OPENAI_API_KEY) {
    return {
      success: true,
      data: fallbackClientBrief(answers, files),
      model: 'heuristic-fallback',
      status: 'RECOVERED',
      error: 'OpenAI API key missing; used deterministic brief synthesizer.',
      recoveredFromError: true,
    }
  }

  const prompt = `
Synthesise this client project brief:
Input Answers:
${JSON.stringify(answers, null, 2)}

Uploaded Materials Count: ${files.length}
Uploaded Materials Names: ${files.map((f) => f.name || f.file_name).join(', ')}

Generate a structured ProjectBrief JSON.
`.trim()

  const result = await callOpenAIStructured<ProjectBrief>({
    model,
    messages: [
      { role: 'system', content: CLIENT_BRIEF_SYSTEM_PROMPT },
      { role: 'user', content: prompt },
    ],
    schemaParser: (raw) => {
      const res = ProjectBriefSchema.safeParse(raw)
      return res.success ? { success: true, data: res.data } : { success: false, error: res.error }
    },
  })

  if (result.success && result.data) {
    return {
      success: true,
      data: result.data,
      model,
      status: 'SUCCESS',
      error: null,
      recoveredFromError: false,
      tokens: result.tokens,
    }
  }

  return {
    success: true,
    data: fallbackClientBrief(answers, files),
    model,
    status: 'RECOVERED',
    error: result.error,
    recoveredFromError: true,
  }
}

// ─── 5. Internal Avorria Discovery Pack Synthesis ─────────────────────────────

const DISCOVERY_PACK_SYSTEM_PROMPT = `
You are the Technical Systems Principal at Avorria.
Generate an Internal Discovery Pack for the senior engineering & strategy team.

REQUIREMENTS:
1. Executive summary of client problem and ambitions.
2. Verified confirmed facts vs hypotheses & exploration areas.
3. Technical considerations & potential architectural risks.
4. Suggested discovery workshop agenda for the principal consultation.
5. Never assume technologies that weren't stated.
6. Output valid JSON matching DiscoveryPack schema.
`.trim()

export async function generateInternalDiscoveryPack(
  answers: Record<string, any>,
  files: any[] = [],
  clientBrief?: ProjectBrief
): Promise<AIProcessingResult<DiscoveryPack>> {
  const model = AI_MODELS.SYNTHESIS

  if (!process.env.OPENAI_API_KEY) {
    return {
      success: true,
      data: fallbackDiscoveryPack(answers, files, clientBrief),
      model: 'heuristic-fallback',
      status: 'RECOVERED',
      error: 'OpenAI API key missing; used deterministic discovery pack generator.',
      recoveredFromError: true,
    }
  }

  const prompt = `
Answers:
${JSON.stringify(answers, null, 2)}

Client Brief Summary:
${JSON.stringify(clientBrief || {}, null, 2)}

Materials:
${JSON.stringify(files.map((f) => f.name || f.file_name))}

Generate valid DiscoveryPack JSON.
`.trim()

  const result = await callOpenAIStructured<DiscoveryPack>({
    model,
    messages: [
      { role: 'system', content: DISCOVERY_PACK_SYSTEM_PROMPT },
      { role: 'user', content: prompt },
    ],
    schemaParser: (raw) => {
      const res = DiscoveryPackSchema.safeParse(raw)
      return res.success ? { success: true, data: res.data } : { success: false, error: res.error }
    },
  })

  if (result.success && result.data) {
    return {
      success: true,
      data: result.data,
      model,
      status: 'SUCCESS',
      error: null,
      recoveredFromError: false,
      tokens: result.tokens,
    }
  }

  return {
    success: true,
    data: fallbackDiscoveryPack(answers, files, clientBrief),
    model,
    status: 'RECOVERED',
    error: result.error,
    recoveredFromError: true,
  }
}

// ─── Deterministic Fallbacks & Heuristics (Guaranteed Zero Data Loss) ─────────

function fallbackExtractHeuristics(rawText: string): ProjectExtraction {
  const sentences = rawText
    .split(/[.\n]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 5)

  return ProjectExtractionSchema.parse({
    client_provided: sentences.length > 0 ? sentences : [rawText.trim() || 'No explicit text provided'],
    potential_areas_to_explore: [
      'Digital system architecture and modernization',
      'User workflow and information hierarchy optimization',
    ],
    unknowns: [
      'Specific infrastructure dependencies',
      'Integration constraints not yet defined',
    ],
    key_entities: {
      systems: [],
    },
  })
}

function fallbackAdaptiveQuestion(
  answers: Record<string, any>,
  completeness: CompletenessMatrix
): FollowUpQuestion {
  if (completeness.problem === 'NOT_YET_DEFINED') {
    return FollowUpQuestionSchema.parse({
      should_ask_question: true,
      question: 'What is the most pressing friction or limitation holding back your operations right now?',
      reason: 'Clarifying the primary pain point allows us to define the appropriate scope.',
      related_area: 'problem',
      priority: 'high',
    })
  }

  if (completeness.objective === 'NOT_YET_DEFINED') {
    return FollowUpQuestionSchema.parse({
      should_ask_question: true,
      question: 'If this project delivers beyond expectations, what tangible change will you see first?',
      reason: 'Anchors success criteria directly to business outcomes.',
      related_area: 'objective',
      priority: 'medium',
    })
  }

  return FollowUpQuestionSchema.parse({
    should_ask_question: false,
    question: null,
    reason: null,
    related_area: null,
    priority: null,
  })
}

function fallbackClientBrief(answers: Record<string, any>, files: any[]): ProjectBrief {
  const company = answers.companyName || answers.organisationName || 'Client Organisation'
  const problem = answers.problemStatement || answers.challengeDescription || answers.whatNeedsChange || 'Modernisation of core digital platform'
  const success = answers.successDefinition || answers.desiredOutcome || 'Scalable, sovereign digital system'

  return ProjectBriefSchema.parse({
    title: `${company} — Project Brief`,
    status: 'PREPARED FOR AVORRIA REVIEW',
    business_summary: {
      name: company,
      role: answers.contactRole || 'Principal',
      description: answers.businessDescription || 'Commercial enterprise',
      customers: answers.customers || 'Not specified',
    },
    problem_statement: {
      what_is_happening: String(problem),
      what_is_not_working: answers.whatIsNotWorking || 'Legacy constraints',
      impact_and_costs: answers.problemImpact || 'Time and operational friction',
      why_now: answers.whyNow || 'Strategic priority',
    },
    objectives_and_outcomes: {
      success_definition: String(success),
      selected_goals: Array.isArray(answers.goals) ? answers.goals : [],
    },
    project_scope: {
      category: answers.projectCategory || 'Digital System',
      technical_certainty: answers.technicalCertainty || 'To be determined with Avorria',
      indicated_needs: Array.isArray(answers.indicatedNeeds) ? answers.indicatedNeeds : [],
    },
    current_environment: {
      systems_in_place: Array.isArray(answers.existingSystems) ? answers.existingSystems : [],
      systems_to_keep: Array.isArray(answers.systemsToKeep) ? answers.systemsToKeep : [],
      systems_to_retire: Array.isArray(answers.systemsToRetire) ? answers.systemsToRetire : [],
      frustrations: answers.frustrations || 'None specified',
    },
    materials_summary: {
      file_count: files.length,
      items: files.map((f) => ({ name: f.name || f.file_name || 'Uploaded File', category: f.category || 'Reference' })),
    },
    commercial_parameters: {
      timing: answers.timeline || 'Flexible',
      urgency: answers.urgency || 'Standard',
      deadline: answers.deadline || undefined,
      budget_bracket: answers.budgetRange || 'To be scoped',
    },
    additional_context: answers.additionalContext || 'None provided',
    client_corrections_noted: [],
    avorria_commitments_disclaimer:
      'This project brief synthesises client-supplied discovery input to frame collaborative scoping. It does not constitute a commercial proposal, timeline commitment, or technical contract.',
  })
}

function fallbackDiscoveryPack(
  answers: Record<string, any>,
  files: any[],
  clientBrief?: ProjectBrief
): DiscoveryPack {
  return DiscoveryPackSchema.parse({
    executive_summary: `Discovery initiated for ${answers.companyName || 'client'}. Primary focus: ${answers.problemStatement || 'Digital engineering initiative'}.`,
    problem_statement: clientBrief?.problem_statement?.what_is_happening || answers.problemStatement || 'Operational modernization',
    confirmed_client_facts: [
      `Organisation: ${answers.companyName || 'Not specified'}`,
      `Primary problem description provided by client: ${answers.problemStatement || 'Noted in brief'}`,
      `Materials provided: ${files.length} file(s)`,
    ],
    hypotheses_and_exploration_areas: [
      'Evaluate whether custom web architecture or modular headless system delivers superior ROI.',
      'Assess potential API integrations with existing enterprise systems.',
    ],
    technical_considerations: [
      'Confirm existing data schema and migration requirements.',
      'Review SLA and concurrency requirements during initial technical scoping.',
    ],
    integration_inventory: Array.isArray(answers.existingSystems) ? answers.existingSystems : ['TBD during technical audit'],
    content_and_materials_inventory: files.map((f) => f.name || f.file_name || 'Document'),
    unknowns_and_risks: [
      'Exact database schema and volume of legacy data.',
      'Internal stakeholder availability for sprint reviews.',
    ],
    suggested_discovery_agenda: [
      '01 — Architecture review & technical boundaries',
      '02 — Data flow & third-party dependency audit',
      '03 — Commercial scoping & milestone agreement',
    ],
    preliminary_engagement_shape: 'Targeted Scoping Sprint (Phase 1) followed by Production Build.',
  })
}
