/**
 * lib/ai/contradiction-detector.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Phase 4 Adaptive Discovery Engine
 *
 * Detects contradictions between client statements across discovery stages.
 * Multi-turn context awareness: tracks confirmed facts, suggestions, and
 * interpretations across the full discovery session.
 *
 * KEY PRINCIPLE: Contradictions are surfaced for client clarification,
 * never resolved automatically.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import 'server-only'
import { z } from 'zod'
import { captureError } from '@/lib/monitoring'
import { AI_MODELS } from './openai'

// ─── Provenance States ────────────────────────────────────────────────────────

export const PROVENANCE_STATES = [
  'CONFIRMED',           // Client stated this explicitly
  'CLIENT_SUGGESTED',    // Client phrased it as possibility ("maybe", "probably")
  'AI_INTERPRETATION',   // Derived from client context, not stated
  'UNKNOWN',             // No information provided
  'TO_EXPLORE',          // Identified as a relevant unknown to investigate
] as const

export type ProvenanceState = (typeof PROVENANCE_STATES)[number]

// ─── Schemas ──────────────────────────────────────────────────────────────────

export const ContradictionSchema = z.object({
  detected: z.boolean(),
  contradiction_description: z.string().nullable(),
  first_statement: z.string().nullable(),
  first_stage: z.string().nullable(),
  second_statement: z.string().nullable(),
  second_stage: z.string().nullable(),
  clarifying_question: z.string().nullable(),
})

export type Contradiction = z.infer<typeof ContradictionSchema>

export const ProjectFactSchema = z.object({
  value: z.string(),
  provenance: z.enum(PROVENANCE_STATES),
  stage: z.string(),
  editable: z.boolean().default(true),
  client_override: z.string().optional(),
})

export type ProjectFact = z.infer<typeof ProjectFactSchema>

export const ProjectContextSchema = z.object({
  facts: z.record(z.string(), ProjectFactSchema),
  contradictions: z.array(ContradictionSchema).default([]),
  resolved_contradictions: z.array(z.string()).default([]),
})

export type ProjectContext = z.infer<typeof ProjectContextSchema>

// ─── Contradiction Detection Prompt ──────────────────────────────────────────

const CONTRADICTION_SYSTEM_PROMPT = `
You are an expert project discovery analyst at Avorria.
Analyse the client's statements across all discovery stages for contradictions.

RULES:
1. A contradiction is when two statements MATERIALLY conflict in scope, capability, or requirement.
2. Minor differences in phrasing are NOT contradictions.
3. If a contradiction is detected, surface ONE clear clarifying question.
4. NEVER resolve the contradiction automatically.
5. The question must be human, respectful, and outcome-oriented.
6. Output valid JSON matching ContradictionResult schema.

EXAMPLES OF REAL CONTRADICTIONS:
- "simple brochure site" + "product configurator with CRM integration" → contradiction
- "no technical requirements" + "must integrate with our custom SAP instance" → contradiction
- "launch in 2 weeks" + "redesign the entire platform" → contradiction

EXAMPLES OF NON-CONTRADICTIONS:
- "we sell industrial equipment" + "we have 130 machines" → no contradiction, context building
- "better for customers" + "better for internal team" → no contradiction, complementary goals
`.trim()

// ─── 1. Contradiction Detection ───────────────────────────────────────────────

export async function detectContradictions(
  stageAnswers: Record<string, Record<string, unknown>>
): Promise<Contradiction> {
  if (!process.env.OPENAI_API_KEY) {
    return fallbackContradictionCheck(stageAnswers)
  }

  const model = AI_MODELS.EXTRACTION
  const answerSummary = Object.entries(stageAnswers)
    .map(([stage, data]) => {
      const texts = Object.entries(data)
        .filter(([, v]) => typeof v === 'string' && String(v).trim().length > 5)
        .map(([k, v]) => `  ${k}: ${String(v).trim()}`)
        .join('\n')
      return `Stage: ${stage}\n${texts}`
    })
    .join('\n\n')

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: CONTRADICTION_SYSTEM_PROMPT },
          {
            role: 'user',
            content: `Client discovery answers across all stages:\n\n${answerSummary}\n\nIdentify any material contradictions. Output JSON with keys: detected, contradiction_description, first_statement, first_stage, second_statement, second_stage, clarifying_question.`,
          },
        ],
        temperature: 0.1,
        response_format: { type: 'json_object' },
      }),
      signal: AbortSignal.timeout(12000),
    })

    if (!res.ok) {
      return fallbackContradictionCheck(stageAnswers)
    }

    const json = await res.json()
    const raw = JSON.parse(json?.choices?.[0]?.message?.content ?? '{}')
    const parsed = ContradictionSchema.safeParse(raw)
    return parsed.success ? parsed.data : fallbackContradictionCheck(stageAnswers)
  } catch (err) {
    captureError(err, { context: 'detectContradictions' })
    return fallbackContradictionCheck(stageAnswers)
  }
}

// ─── 2. Multi-Turn Context Builder ───────────────────────────────────────────

/**
 * Builds a unified project context from all stage answers,
 * with explicit provenance tagging for each extracted fact.
 * Client corrections always override AI interpretations.
 */
export function buildProjectContext(
  stageAnswers: Record<string, Record<string, unknown>>,
  existingContext?: ProjectContext,
  clientCorrections?: Record<string, string>
): ProjectContext {
  const facts: Record<string, ProjectFact> = existingContext?.facts ?? {}

  // Merge stage answers into facts with provenance tagging
  for (const [stage, data] of Object.entries(stageAnswers)) {
    for (const [field, value] of Object.entries(data)) {
      if (!value || (typeof value === 'string' && value.trim().length < 2)) continue

      const existingFact = facts[field]

      // Client corrections are authoritative — never overwrite
      if (existingFact?.provenance === 'CONFIRMED' && existingFact.client_override) {
        continue
      }

      facts[field] = ProjectFactSchema.parse({
        value: Array.isArray(value) ? value.join(', ') : String(value),
        provenance: deriveProvenance(field, value),
        stage,
        editable: true,
      })
    }
  }

  // Apply client corrections — these permanently override AI interpretations
  if (clientCorrections) {
    for (const [field, correctedValue] of Object.entries(clientCorrections)) {
      if (facts[field]) {
        facts[field] = {
          ...facts[field],
          value: correctedValue,
          provenance: 'CONFIRMED',
          client_override: correctedValue,
        }
      } else {
        facts[field] = ProjectFactSchema.parse({
          value: correctedValue,
          provenance: 'CONFIRMED',
          stage: 'correction',
          editable: true,
          client_override: correctedValue,
        })
      }
    }
  }

  return ProjectContextSchema.parse({
    facts,
    contradictions: existingContext?.contradictions ?? [],
    resolved_contradictions: existingContext?.resolved_contradictions ?? [],
  })
}

// ─── 3. Quality Adaptive Follow-Up Evaluator ─────────────────────────────────

/**
 * Determines whether a follow-up question is of sufficient quality
 * to show the client. Uses a heuristic priority matrix aligned to
 * Phase 1 scope criteria.
 */
export function scoreFollowUpQuality(question: string, relatedArea: string | null): {
  isHighQuality: boolean
  reason: string
} {
  // Low-value signals — questions about these rarely change scope
  const lowValuePatterns = [
    /how did you hear/i,
    /preferred colour/i,
    /favourite font/i,
    /do you have a logo/i,
    /what is your company size/i,
  ]

  // High-value areas — these materially affect architecture and scope
  const highValueAreas = ['problem', 'objective', 'technical_environment', 'timing', 'budget']

  if (lowValuePatterns.some((p) => p.test(question))) {
    return {
      isHighQuality: false,
      reason: 'Low-value question that does not materially affect project scope.',
    }
  }

  if (relatedArea && highValueAreas.includes(relatedArea)) {
    return {
      isHighQuality: true,
      reason: `High-value clarification for ${relatedArea}.`,
    }
  }

  return {
    isHighQuality: true,
    reason: 'Contextually relevant follow-up.',
  }
}

// ─── Deterministic Helpers ────────────────────────────────────────────────────

function deriveProvenance(field: string, value: unknown): ProvenanceState {
  // Fields the client explicitly fills in are CONFIRMED
  const explicitFields = [
    'contactName', 'contactEmail', 'contactRole', 'contactPhone',
    'companyName', 'companyWebsite', 'problemStatement', 'successDefinition',
    'budgetRange', 'timeline', 'additionalContext', 'projectCategory',
    'existingSystems', 'referralSource',
  ]

  if (explicitFields.includes(field)) return 'CONFIRMED'

  // Optional supplementary fields are CLIENT_SUGGESTED
  const suggestedFields = [
    'problemAreas', 'goals', 'systemsToKeep', 'systemsToRetire',
    'technicalFrustrations', 'decisionProcess', 'urgency',
  ]

  if (suggestedFields.includes(field)) return 'CLIENT_SUGGESTED'

  // AI-derived fields
  return 'AI_INTERPRETATION'
}

function fallbackContradictionCheck(
  stageAnswers: Record<string, Record<string, unknown>>
): Contradiction {
  const projectCategory = String(stageAnswers['project']?.projectCategory || '')
  const projectDescription = String(stageAnswers['project']?.projectDescription || '')
  const existingSystems = String(stageAnswers['environment']?.existingSystems || '')
  const systemsToKeep = String(stageAnswers['environment']?.systemsToKeep || '')

  const combinedProject = `${projectCategory} ${projectDescription}`.toLowerCase()
  const combinedSystems = `${existingSystems} ${systemsToKeep}`.toLowerCase()

  // Simple scope vs complex integration contradiction
  const isBrochureOrSimple = /brochure|simple|basic|small/.test(combinedProject)
  const hasComplexIntegration = /crm|erp|sap|salesforce|integrate|api/.test(combinedSystems)

  if (isBrochureOrSimple && hasComplexIntegration) {
    return ContradictionSchema.parse({
      detected: true,
      contradiction_description: 'Project described as simple/brochure but complex integrations mentioned',
      first_statement: `Project: ${combinedProject.slice(0, 100)}`,
      first_stage: 'project',
      second_statement: `Systems: ${combinedSystems.slice(0, 100)}`,
      second_stage: 'environment',
      clarifying_question:
        'You mentioned a simple website, but you\'ve also described integrations with systems like CRM or ERP. Should the project include those integration capabilities?',
    })
  }

  return ContradictionSchema.parse({
    detected: false,
    contradiction_description: null,
    first_statement: null,
    first_stage: null,
    second_statement: null,
    second_stage: null,
    clarifying_question: null,
  })
}
