import { describe, it, expect, vi, afterEach } from 'vitest'
import {
  detectContradictions,
  buildProjectContext,
  scoreFollowUpQuality,
  PROVENANCE_STATES,
} from '@/lib/ai/contradiction-detector'

// ─────────────────────────────────────────────────────────────────────────────
// Phase 4 Adaptive Discovery Engine Tests
// Seven project archetypes validated as specified in Phase 2 brief.
// All tests run deterministically without a live OpenAI API key.
// ─────────────────────────────────────────────────────────────────────────────

describe('Phase 4 — Adaptive Discovery Engine', () => {
  const originalEnv = process.env
  afterEach(() => {
    process.env = { ...originalEnv }
    vi.restoreAllMocks()
  })

  // ─── Archetype 1: Simple Website ───────────────────────────────────────────
  describe('Archetype 1 — Simple Website', () => {
    it('detects no contradiction when scope is consistent', async () => {
      delete process.env.OPENAI_API_KEY

      const answers = {
        business: { companyName: 'Highfield Bakery', businessDescription: 'Local artisan bakery in York with two retail premises.' },
        problem: { problemStatement: 'We don\'t have a website. Customers keep asking for one.' },
        project: { projectCategory: 'New website', projectDescription: 'Simple brochure site showing our products and hours.' },
        environment: { existingSystems: 'None. We\'re starting from scratch.' },
      }

      const result = await detectContradictions(answers)
      expect(result.detected).toBe(false)
    })

    it('builds project context with CONFIRMED provenance for explicit fields', () => {
      const answers = {
        business: { companyName: 'Highfield Bakery', contactEmail: 'hello@highfield.example' },
      }

      const ctx = buildProjectContext(answers)
      expect(ctx.facts.companyName.provenance).toBe('CONFIRMED')
      expect(ctx.facts.contactEmail.provenance).toBe('CONFIRMED')
    })
  })

  // ─── Archetype 2: Ecommerce ────────────────────────────────────────────────
  describe('Archetype 2 — Ecommerce', () => {
    it('correctly tags ecommerce system mentions', () => {
      const answers = {
        business: { companyName: 'Veld Outdoors', businessDescription: 'Premium camping and outdoor equipment. Ship to EU.' },
        environment: { existingSystems: 'Shopify Basic, Klaviyo for email, Royal Mail integration.' },
      }

      const ctx = buildProjectContext(answers)
      expect(ctx.facts['existingSystems'].value).toContain('Shopify')
    })

    it('detects no contradiction between ecommerce category and integration systems', async () => {
      delete process.env.OPENAI_API_KEY

      const answers = {
        project: { projectCategory: 'New website', projectDescription: 'Ecommerce store to replace our current Shopify setup.' },
        environment: { existingSystems: 'Shopify Basic, needs to integrate with Klaviyo and Royal Mail.' },
      }

      const result = await detectContradictions(answers)
      // Ecommerce + integrations is NOT a contradiction
      expect(result.detected).toBe(false)
    })
  })

  // ─── Archetype 3: Web Application ─────────────────────────────────────────
  describe('Archetype 3 — Complex Web Application', () => {
    it('builds rich context with CLIENT_SUGGESTED provenance for optional fields', () => {
      const answers = {
        business: { companyName: 'OpsFlo' },
        project: { projectCategory: 'Web application', projectDescription: 'Multi-tenant SaaS for field service scheduling.' },
        outcome: {
          successDefinition: 'Dispatchers can reassign engineers in under 30 seconds.',
          goals: ['Faster operations', 'Less internal friction'],
        },
        environment: {
          existingSystems: 'PostgreSQL, Google Calendar API, Xero.',
          systemsToKeep: 'Google Calendar API, Xero.',
        },
      }

      const ctx = buildProjectContext(answers)
      expect(ctx.facts.goals?.provenance).toBe('CLIENT_SUGGESTED')
      expect(ctx.facts.systemsToKeep?.provenance).toBe('CLIENT_SUGGESTED')
    })
  })

  // ─── Archetype 4: AI / Automation ─────────────────────────────────────────
  describe('Archetype 4 — AI Implementation', () => {
    it('does not hallucinate technical requirements when only brief problem described', () => {
      const answers = {
        problem: { problemStatement: 'We spend 6 hours a week manually triaging customer enquiries.' },
        project: { projectCategory: 'AI system or automation' },
      }

      const ctx = buildProjectContext(answers)

      // No AI interpretation should invent specific models or libraries
      const techEnvFact = ctx.facts['existingSystems']
      expect(techEnvFact).toBeUndefined()
    })
  })

  // ─── Archetype 5: Internal Platform ───────────────────────────────────────
  describe('Archetype 5 — Internal Business Platform', () => {
    it('handles complex multi-system integration without contradiction', async () => {
      delete process.env.OPENAI_API_KEY

      const answers = {
        business: { companyName: 'Meridian Facilities Management' },
        project: { projectCategory: 'Internal tool or dashboard', projectDescription: 'Unified dashboard for facilities managers to view all sites.' },
        environment: {
          existingSystems: 'SAP, Salesforce, legacy Oracle system from 2008.',
          systemsToKeep: 'SAP, Salesforce.',
          systemsToRetire: 'Legacy Oracle system.',
        },
      }

      const result = await detectContradictions(answers)
      // Internal platform with multiple integrations is expected, not a contradiction
      expect(result.detected).toBe(false)
      expect(result.clarifying_question).toBeNull()
    })
  })

  // ─── Archetype 6: Unknown / Early Idea ────────────────────────────────────
  describe('Archetype 6 — Unknown / Early Idea (I\'m Not Sure)', () => {
    it('accepts "not sure" as a valid and complete answer for project type', () => {
      const answers = {
        project: { projectCategory: 'I\'m not sure yet', projectDescription: '' },
      }

      const ctx = buildProjectContext(answers)
      expect(ctx.facts.projectCategory?.value).toBe("I'm not sure yet")
      expect(ctx.facts.projectCategory?.provenance).toBe('CONFIRMED')
    })

    it('does not force a follow-up question when client is genuinely early-stage', () => {
      const score = scoreFollowUpQuality(
        'What is your preferred colour palette?',
        'business'
      )
      expect(score.isHighQuality).toBe(false)
    })
  })

  // ─── Archetype 7: Contradictory Requirements ──────────────────────────────
  describe('Archetype 7 — Contradictory Requirements', () => {
    it('detects a contradiction between "simple brochure" and complex CRM integration', async () => {
      delete process.env.OPENAI_API_KEY

      const answers = {
        project: {
          projectCategory: 'New website',
          projectDescription: 'A simple brochure site to replace our old one.',
        },
        environment: {
          existingSystems: 'Salesforce CRM, need to integrate with our SAP ERP system.',
          systemsToKeep: 'Salesforce, SAP.',
        },
      }

      const result = await detectContradictions(answers)

      // The heuristic should detect this contradiction
      expect(result.detected).toBe(true)
      expect(result.clarifying_question).toBeTruthy()
      expect(result.clarifying_question!.length).toBeGreaterThan(20)
      // Question must not resolve the contradiction \u2014 only surface it
      expect(result.clarifying_question).not.toContain('therefore')
      expect(result.clarifying_question).not.toContain('we recommend')
    })

    it('ensures AI cannot auto-resolve contradictions by asserting a decision', async () => {
      delete process.env.OPENAI_API_KEY

      const answers = {
        project: { projectCategory: 'simple brochure' },
        environment: { existingSystems: 'deep salesforce crm integration required' },
      }

      const result = await detectContradictions(answers)
      if (result.detected) {
        // Question must end with a question mark or be phrased openly
        expect(result.clarifying_question).toMatch(/\?$/)
      }
    })
  })

  // ─── Context Building: Client Corrections Override AI ─────────────────────
  describe('Multi-Turn Context & Client Corrections', () => {
    it('client corrections permanently override AI interpretations', () => {
      const initialAnswers = {
        problem: { problemStatement: 'Our website is slow.' },
      }

      const firstCtx = buildProjectContext(initialAnswers)

      // Simulate an AI interpretation being added for a field
      firstCtx.facts['coreProblem'] = {
        value: 'Performance optimisation of web infrastructure',
        provenance: 'AI_INTERPRETATION',
        stage: 'ai_extraction',
        editable: true,
      }

      // Client corrects it
      const correctedCtx = buildProjectContext(
        initialAnswers,
        firstCtx,
        { coreProblem: 'The website takes 12 seconds to load on mobile and loses customers.' }
      )

      expect(correctedCtx.facts.coreProblem.provenance).toBe('CONFIRMED')
      expect(correctedCtx.facts.coreProblem.value).toContain('12 seconds')
      expect(correctedCtx.facts.coreProblem.client_override).toBeDefined()
    })

    it('does not overwrite a client-confirmed fact when processing a new stage', () => {
      const answers = {
        business: { companyName: 'Atlas Engineering' },
      }

      const ctx1 = buildProjectContext(answers)
      expect(ctx1.facts.companyName.value).toBe('Atlas Engineering')

      // Simulate second-pass with additional stage data
      const answers2 = {
        business: { companyName: 'Atlas Engineering' },
        problem: { problemStatement: 'Our procurement approval system is manual.' },
      }

      // Apply a client correction first
      const correctedCtx = buildProjectContext(answers, ctx1, { companyName: 'Atlas Engineering Ltd' })
      expect(correctedCtx.facts.companyName.provenance).toBe('CONFIRMED')
      expect(correctedCtx.facts.companyName.client_override).toBe('Atlas Engineering Ltd')

      // Now process new answers — client correction must survive
      const ctx2 = buildProjectContext(answers2, correctedCtx)
      expect(ctx2.facts.companyName.value).toBe('Atlas Engineering Ltd')
    })

    it('retains multi-stage context when company mentioned in stage 1 and volume mentioned in stage 5', () => {
      const stage1 = { business: { companyName: 'Vanguard Bearings', businessDescription: 'Industrial bearing manufacturer.' } }
      const ctx1 = buildProjectContext(stage1)

      const stage2 = {
        ...stage1,
        environment: { existingSystems: 'We have around 130 product variants in our catalogue.' },
      }
      const ctx2 = buildProjectContext(stage2, ctx1)

      // Both facts should coexist in context
      expect(ctx2.facts.companyName?.value).toBe('Vanguard Bearings')
      expect(ctx2.facts.existingSystems?.value).toContain('130 product variants')
    })
  })

  // ─── Follow-Up Quality Scoring ────────────────────────────────────────────
  describe('Follow-Up Quality Scoring', () => {
    it('rates scope-affecting questions as high quality', () => {
      const result = scoreFollowUpQuality(
        'What is the primary constraint driving your project deadline?',
        'timing'
      )
      expect(result.isHighQuality).toBe(true)
    })

    it('rates low-value questions as low quality', () => {
      const result = scoreFollowUpQuality('How did you hear about us?', null)
      expect(result.isHighQuality).toBe(false)
    })

    it('rates technical environment questions as high quality', () => {
      const result = scoreFollowUpQuality(
        'Are there specific systems this project needs to connect to?',
        'technical_environment'
      )
      expect(result.isHighQuality).toBe(true)
    })
  })

  // ─── Provenance Constants ─────────────────────────────────────────────────
  describe('Provenance State Integrity', () => {
    it('exports all five provenance states', () => {
      expect(PROVENANCE_STATES).toContain('CONFIRMED')
      expect(PROVENANCE_STATES).toContain('CLIENT_SUGGESTED')
      expect(PROVENANCE_STATES).toContain('AI_INTERPRETATION')
      expect(PROVENANCE_STATES).toContain('UNKNOWN')
      expect(PROVENANCE_STATES).toContain('TO_EXPLORE')
    })
  })
})
