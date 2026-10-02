import { describe, it, expect } from 'vitest'
import {
  ProjectExtractionSchema,
  FollowUpQuestionSchema,
  CompletenessMatrixSchema,
  ProjectBriefSchema,
  DiscoveryPackSchema,
  DISCOVERY_PROJECT_STATES,
  UNDERSTANDING_LEVELS,
} from '@/types/discovery'

describe('Discovery Schema Validation & Structured Outputs', () => {
  it('validates a correct ProjectExtraction output', () => {
    const valid = {
      client_provided: ['Old site built in 2018', 'Sales team handles duplicate queries'],
      potential_areas_to_explore: ['Search integration', 'Automated enquiry triage'],
      unknowns: ['Current CMS architecture', 'Expected monthly transaction volume'],
      key_entities: {
        company: 'Apex Logistics Ltd',
        website: 'https://apexlogistics.example',
        budget: '£25k-50k',
        timeline: '1-3-months',
        systems: ['WordPress', 'HubSpot'],
      },
    }

    const parsed = ProjectExtractionSchema.safeParse(valid)
    expect(parsed.success).toBe(true)
    if (parsed.success) {
      expect(parsed.data.client_provided).toHaveLength(2)
      expect(parsed.data.potential_areas_to_explore).toContain('Search integration')
      expect(parsed.data.key_entities.systems).toEqual(['WordPress', 'HubSpot'])
    }
  })

  it('rejects ProjectExtraction with invalid entity types', () => {
    const invalid = {
      client_provided: 'not-an-array',
      potential_areas_to_explore: [],
      unknowns: [],
      key_entities: {},
    }

    const parsed = ProjectExtractionSchema.safeParse(invalid)
    expect(parsed.success).toBe(false)
  })

  it('validates FollowUpQuestion schema when question is needed', () => {
    const asking = {
      should_ask_question: true,
      question: 'What is the primary constraint driving your deadline?',
      reason: 'Helps determine whether phased release or singular launch is appropriate.',
      related_area: 'timing',
      priority: 'high',
    }

    const parsed = FollowUpQuestionSchema.safeParse(asking)
    expect(parsed.success).toBe(true)
    if (parsed.success) {
      expect(parsed.data.should_ask_question).toBe(true)
      expect(parsed.data.priority).toBe('high')
    }
  })

  it('validates FollowUpQuestion schema when no question is needed', () => {
    const notAsking = {
      should_ask_question: false,
      question: null,
      reason: null,
      related_area: null,
      priority: null,
    }

    const parsed = FollowUpQuestionSchema.safeParse(notAsking)
    expect(parsed.success).toBe(true)
    if (parsed.success) {
      expect(parsed.data.should_ask_question).toBe(false)
      expect(parsed.data.question).toBeNull()
    }
  })

  it('rejects invalid priority in FollowUpQuestion', () => {
    const invalid = {
      should_ask_question: true,
      question: 'Why?',
      reason: 'Need to know',
      related_area: 'problem',
      priority: 'urgent', // invalid enum
    }

    const parsed = FollowUpQuestionSchema.safeParse(invalid)
    expect(parsed.success).toBe(false)
  })

  it('validates CompletenessMatrixSchema with strictly defined understanding levels', () => {
    const matrix = {
      business: 'UNDERSTOOD',
      problem: 'UNDERSTOOD',
      objective: 'PARTIALLY_UNDERSTOOD',
      audience: 'PARTIALLY_UNDERSTOOD',
      technical_environment: 'NOT_YET_DEFINED',
      materials: 'UNDERSTOOD',
      timing: 'UNDERSTOOD',
      budget: 'NOT_YET_DEFINED',
    }

    const parsed = CompletenessMatrixSchema.safeParse(matrix)
    expect(parsed.success).toBe(true)
  })

  it('rejects arbitrary percentage numbers in CompletenessMatrixSchema', () => {
    const invalid = {
      business: '75%', // forbidden percentage score
      problem: 'UNDERSTOOD',
      objective: 'UNDERSTOOD',
      audience: 'UNDERSTOOD',
      technical_environment: 'UNDERSTOOD',
      materials: 'UNDERSTOOD',
      timing: 'UNDERSTOOD',
      budget: 'UNDERSTOOD',
    }

    const parsed = CompletenessMatrixSchema.safeParse(invalid)
    expect(parsed.success).toBe(false)
  })

  it('validates ProjectBriefSchema with comprehensive structure and disclaimer', () => {
    const brief = {
      title: 'Vanguard Capital — Project Brief',
      status: 'PREPARED FOR AVORRIA REVIEW',
      business_summary: {
        name: 'Vanguard Capital',
        role: 'Chief Technology Officer',
        description: 'Quantitative investment advisory',
        customers: 'Institutional hedge funds and sovereign family offices',
      },
      problem_statement: {
        what_is_happening: 'Current reporting interface requires 45 seconds to generate risk breakdown.',
        what_is_not_working: 'Real-time telemetry and portfolio recalculation lags market prices.',
        impact_and_costs: 'Institutional client complaints during volatility events.',
        why_now: 'Launching European fund expansion in Q4.',
      },
      objectives_and_outcomes: {
        success_definition: 'Sub-second risk recalculation dashboard with sovereign data isolation.',
        selected_goals: ['Reduce latency', 'Automate risk reporting', 'Enterprise security compliance'],
      },
      project_scope: {
        category: 'Web Application & Real-Time Telemetry',
        technical_certainty: 'Specific Architecture Identified',
        indicated_needs: ['WebSockets API', 'PostgreSQL telemetry', 'Tailwind responsive UI'],
      },
      current_environment: {
        systems_in_place: ['Legacy Python backend', 'Django templates', 'Redis cache'],
        systems_to_keep: ['Core calculation engine'],
        systems_to_retire: ['Django rendering frontend'],
        frustrations: 'Layout shifts and unresponsive table rendering on mobile devices.',
      },
      materials_summary: {
        file_count: 2,
        items: [
          { name: 'Architecture_Spec_v2.pdf', category: 'Specification' },
          { name: 'Risk_Dashboard_Mockup.png', category: 'Design Reference' },
        ],
      },
      commercial_parameters: {
        timing: '3-6-months',
        urgency: 'High',
        deadline: '2026-11-01',
        budget_bracket: '£50k+',
      },
      additional_context: 'Strict mutual NDA required prior to code access.',
      client_corrections_noted: [],
      avorria_commitments_disclaimer:
        'This project brief synthesises client-supplied discovery input to frame collaborative scoping. It does not constitute a commercial proposal, timeline commitment, or technical contract.',
    }

    const parsed = ProjectBriefSchema.safeParse(brief)
    expect(parsed.success).toBe(true)
    if (parsed.success) {
      expect(parsed.data.materials_summary.file_count).toBe(2)
      expect(parsed.data.avorria_commitments_disclaimer).toContain('does not constitute a commercial proposal')
    }
  })

  it('validates DiscoveryPackSchema for internal team ingestion', () => {
    const pack = {
      executive_summary: 'Vanguard Capital requires a low-latency portfolio risk recalculation platform.',
      problem_statement: '45-second latency in Django templates creates operational friction during volatility.',
      confirmed_client_facts: [
        'CTO initiated brief',
        'Legacy calculation engine in Python to be preserved',
        'Target launch for European expansion Q4',
      ],
      hypotheses_and_exploration_areas: [
        'Explore server-sent events (SSE) vs WebSockets for telemetry stream',
        'Assess whether WebGL canvas is required for dense risk matrices',
      ],
      technical_considerations: [
        'Python API latency must be profiled before frontend commit',
        'Data sovereignty requirement mandates UK/EU hosting boundary',
      ],
      integration_inventory: ['Legacy Python backend', 'Redis cache'],
      content_and_materials_inventory: ['Architecture_Spec_v2.pdf', 'Risk_Dashboard_Mockup.png'],
      unknowns_and_risks: [
        'Peak concurrent user volume across hedge fund clients',
        'Availability of sandbox Python calculation endpoints during sprint 1',
      ],
      suggested_discovery_agenda: [
        '01 — Architecture dissection and latency benchmarks',
        '02 — Data contract specification for telemetry stream',
        '03 — Phased milestone plan and commercial agreement',
      ],
      preliminary_engagement_shape: 'Architecture Spike (2 weeks) followed by 10-week Production Build.',
    }

    const parsed = DiscoveryPackSchema.safeParse(pack)
    expect(parsed.success).toBe(true)
    if (parsed.success) {
      expect(parsed.data.confirmed_client_facts).toHaveLength(3)
      expect(parsed.data.hypotheses_and_exploration_areas).toHaveLength(2)
    }
  })

  it('exports valid project states and understanding levels', () => {
    expect(DISCOVERY_PROJECT_STATES).toContain('DRAFT')
    expect(DISCOVERY_PROJECT_STATES).toContain('IN_PROGRESS')
    expect(DISCOVERY_PROJECT_STATES).toContain('READY_FOR_REVIEW')
    expect(DISCOVERY_PROJECT_STATES).toContain('SUBMITTED')
    expect(UNDERSTANDING_LEVELS).toEqual(['UNDERSTOOD', 'PARTIALLY_UNDERSTOOD', 'NOT_YET_DEFINED'])
  })
})
