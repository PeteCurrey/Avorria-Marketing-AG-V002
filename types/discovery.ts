import { z } from 'zod'

// ─── Enums & State Constants ──────────────────────────────────────────────────

export const DISCOVERY_PROJECT_STATES = [
  'DRAFT',
  'IN_PROGRESS',
  'READY_FOR_REVIEW',
  'SUBMITTED',
  'PROCESSING',
  'COMPLETED',
  'ERROR',
] as const

export type DiscoveryProjectState = (typeof DISCOVERY_PROJECT_STATES)[number]

export const UNDERSTANDING_LEVELS = [
  'UNDERSTOOD',
  'PARTIALLY_UNDERSTOOD',
  'NOT_YET_DEFINED',
] as const

export type UnderstandingLevel = (typeof UNDERSTANDING_LEVELS)[number]

export const FOLLOW_UP_PRIORITIES = ['high', 'medium', 'low'] as const
export type FollowUpPriority = (typeof FOLLOW_UP_PRIORITIES)[number]

// ─── Schema: Extracted Intelligence (Strict Facts vs Explorations) ────────────

export const ProjectExtractionSchema = z.object({
  client_provided: z
    .array(z.string())
    .describe('Concrete facts explicitly stated by the client in their own words.'),
  potential_areas_to_explore: z
    .array(z.string())
    .describe('Hypothetical areas or architectural opportunities for Avorria to explore. Strictly NOT confirmed requirements.'),
  unknowns: z
    .array(z.string())
    .describe('Information gaps or questions not yet answered by the client.'),
  key_entities: z.object({
    company: z.string().optional(),
    website: z.string().optional(),
    budget: z.string().optional(),
    timeline: z.string().optional(),
    systems: z.array(z.string()).default([]),
  }),
})

export type ProjectExtraction = z.infer<typeof ProjectExtractionSchema>

// ─── Schema: Adaptive Follow-Up Question ──────────────────────────────────────

export const FollowUpQuestionSchema = z.object({
  should_ask_question: z
    .boolean()
    .describe('True only if a single follow-up question would materially clarify scope. False if sufficient context exists.'),
  question: z
    .string()
    .nullable()
    .describe('A single human, outcome-oriented question without technical jargon. Null if should_ask_question is false.'),
  reason: z
    .string()
    .nullable()
    .describe('Why this question matters to shaping the project brief.'),
  related_area: z
    .string()
    .nullable()
    .describe('The specific discovery facet this relates to: business, problem, outcome, environment, or timing.'),
  priority: z.enum(FOLLOW_UP_PRIORITIES).nullable(),
})

export type FollowUpQuestion = z.infer<typeof FollowUpQuestionSchema>

// ─── Schema: Completeness Matrix ──────────────────────────────────────────────

export const CompletenessMatrixSchema = z.object({
  business: z.enum(UNDERSTANDING_LEVELS),
  problem: z.enum(UNDERSTANDING_LEVELS),
  objective: z.enum(UNDERSTANDING_LEVELS),
  audience: z.enum(UNDERSTANDING_LEVELS),
  technical_environment: z.enum(UNDERSTANDING_LEVELS),
  materials: z.enum(UNDERSTANDING_LEVELS),
  timing: z.enum(UNDERSTANDING_LEVELS),
  budget: z.enum(UNDERSTANDING_LEVELS),
})

export type CompletenessMatrix = z.infer<typeof CompletenessMatrixSchema>

export const ProjectUnderstandingSchema = z.object({
  matrix: CompletenessMatrixSchema,
  summary: z.string(),
  questions_remaining_count: z.number().int().nonnegative(),
})

export type ProjectUnderstanding = z.infer<typeof ProjectUnderstandingSchema>

// ─── Schema: Client-Facing Project Brief ──────────────────────────────────────

export const ProjectBriefSchema = z.object({
  title: z.string(),
  status: z.string().default('PREPARED FOR AVORRIA REVIEW'),
  business_summary: z.object({
    name: z.string().default('Not yet specified'),
    role: z.string().default('Not specified'),
    description: z.string().default('Not provided'),
    customers: z.string().default('Not specified'),
  }),
  problem_statement: z.object({
    what_is_happening: z.string(),
    what_is_not_working: z.string(),
    impact_and_costs: z.string().default('Not explicitly detailed'),
    why_now: z.string().default('Not specified'),
  }),
  objectives_and_outcomes: z.object({
    success_definition: z.string(),
    selected_goals: z.array(z.string()).default([]),
  }),
  project_scope: z.object({
    category: z.string(),
    technical_certainty: z.string(), // e.g. "Specific Architecture Identified" or "Needs Avorria Guidance"
    indicated_needs: z.array(z.string()).default([]),
  }),
  current_environment: z.object({
    systems_in_place: z.array(z.string()).default([]),
    systems_to_keep: z.array(z.string()).default([]),
    systems_to_retire: z.array(z.string()).default([]),
    frustrations: z.string().default('None noted'),
  }),
  materials_summary: z.object({
    file_count: z.number().int().default(0),
    items: z.array(
      z.object({
        name: z.string(),
        category: z.string().optional(),
      })
    ).default([]),
  }),
  commercial_parameters: z.object({
    timing: z.string().default('Flexible'),
    urgency: z.string().default('Standard'),
    deadline: z.string().optional(),
    budget_bracket: z.string().default('To be determined'),
  }),
  additional_context: z.string().default('None provided'),
  client_corrections_noted: z.array(z.string()).default([]),
  avorria_commitments_disclaimer: z.string().default(
    'This project brief synthesises client-supplied discovery input to frame collaborative scoping. It does not constitute a commercial proposal, timeline commitment, or technical contract.'
  ),
})

export type ProjectBrief = z.infer<typeof ProjectBriefSchema>

// ─── Schema: Internal Avorria Discovery Pack ──────────────────────────────────

export const DiscoveryPackSchema = z.object({
  executive_summary: z.string(),
  problem_statement: z.string(),
  confirmed_client_facts: z.array(z.string()),
  hypotheses_and_exploration_areas: z.array(z.string()),
  technical_considerations: z.array(z.string()),
  integration_inventory: z.array(z.string()),
  content_and_materials_inventory: z.array(z.string()),
  unknowns_and_risks: z.array(z.string()),
  suggested_discovery_agenda: z.array(z.string()),
  preliminary_engagement_shape: z.string(),
})

export type DiscoveryPack = z.infer<typeof DiscoveryPackSchema>

// ─── Schema: AI Processing Result ─────────────────────────────────────────────

export interface AIProcessingResult<T> {
  success: boolean
  data: T | null
  model: string
  status: 'SUCCESS' | 'FAILED' | 'RECOVERED'
  error: string | null
  recoveredFromError: boolean
  tokens?: {
    prompt: number
    completion: number
    total: number
  }
}
