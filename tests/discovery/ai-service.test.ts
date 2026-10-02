import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  extractProjectIntelligence,
  evaluateAdaptiveFollowUp,
  generateClientProjectBrief,
  generateInternalDiscoveryPack,
  evaluateCompleteness,
} from '@/lib/ai/openai'

describe('AI Intelligence & Reasoning Service', () => {
  const originalEnv = process.env

  beforeEach(() => {
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
    vi.restoreAllMocks()
  })

  describe('Extraction Layer', () => {
    it('uses deterministic heuristic recovery when OPENAI_API_KEY is not set', async () => {
      delete process.env.OPENAI_API_KEY

      const clientInput =
        'We have an old website that nobody internally wants to maintain. Customers cannot find products easily and our sales team keeps answering the same questions.'

      const result = await extractProjectIntelligence({
        stage: 'problem',
        clientText: clientInput,
      })

      expect(result.success).toBe(true)
      expect(result.status).toBe('RECOVERED')
      expect(result.recoveredFromError).toBe(true)
      expect(result.data).toBeDefined()

      // Confirmed facts must reflect client text verbatim
      expect(result.data?.client_provided.length).toBeGreaterThan(0)
      expect(
        result.data?.client_provided.some((s) => s.includes('old website') || s.includes('cannot find products'))
      ).toBe(true)

      // Potential areas must be explicitly marked as exploration, NOT confirmed facts
      expect(result.data?.potential_areas_to_explore.length).toBeGreaterThan(0)
      expect(result.data?.unknowns.length).toBeGreaterThan(0)
    })

    it('recovers gracefully from simulated OpenAI API HTTP error', async () => {
      process.env.OPENAI_API_KEY = 'sk-mock-test-key'

      // Mock fetch to simulate 500 internal server error from OpenAI
      const mockFetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        text: () => Promise.resolve('{"error": {"message": "Internal server error from model host"}}'),
      })
      global.fetch = mockFetch as any

      const clientText = 'Our warehouse inventory management system is dropping sync with Shopify Plus during peak drop hours.'

      const result = await extractProjectIntelligence({
        stage: 'problem',
        clientText,
      })

      // Client data must be preserved and recovery returned
      expect(result.success).toBe(true)
      expect(result.status).toBe('RECOVERED')
      expect(result.recoveredFromError).toBe(true)
      expect(result.data?.client_provided[0]).toContain('Our warehouse inventory management system')
    })
  })

  describe('Adaptive Question Logic', () => {
    it('asks at most one question when critical problem context is completely missing', async () => {
      delete process.env.OPENAI_API_KEY

      const answers = {
        companyName: 'Bespoke Joinery Ltd',
        // problem is completely missing
      }
      const completeness = evaluateCompleteness(answers)

      const result = await evaluateAdaptiveFollowUp(answers, completeness)

      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
      expect(result.data?.should_ask_question).toBe(true)
      expect(result.data?.question).toBeDefined()
      expect(typeof result.data?.question).toBe('string')
      expect(result.data?.related_area).toBe('problem')
      expect(result.data?.priority).toBe('high')
    })

    it('does NOT ask a follow-up question when sufficient context already exists', async () => {
      delete process.env.OPENAI_API_KEY

      const answers = {
        companyName: 'Bespoke Joinery Ltd',
        problemStatement: 'Our custom configurator cannot handle non-standard timber dimension math in real time.',
        problemImpact: 'Losing high-value architectural contracts.',
        desiredOutcome: 'Parametric WebGL geometry viewer with instant CNC cutting export.',
        existingSystems: ['AutoCAD', 'WooCommerce'],
      }
      const completeness = evaluateCompleteness(answers)

      const result = await evaluateAdaptiveFollowUp(answers, completeness)

      expect(result.success).toBe(true)
      expect(result.data?.should_ask_question).toBe(false)
      expect(result.data?.question).toBeNull()
    })
  })

  describe('Client Brief & Discovery Pack Synthesis', () => {
    it('generates a complete client project brief with explicit legal disclaimer', async () => {
      delete process.env.OPENAI_API_KEY

      const answers = {
        companyName: 'Meridian Maritime',
        contactRole: 'Managing Director',
        businessDescription: 'Commercial vessel charter and freight brokerage across the North Sea.',
        problemStatement: 'Vessel position tracking and automated demurrage calculation requires manual spreadsheet cross-referencing.',
        desiredOutcome: 'Unified dispatch interface with AIS satellite positioning and automated charter agreements.',
        goals: ['Automate demurrage calculations', 'Real-time telemetry map'],
        existingSystems: ['MarineTraffic API', 'Excel VBA macros'],
        timeline: '1-3-months',
        budgetRange: '£25k-50k',
      }
      const files = [{ name: 'Vessel_Telematics_Sample.xlsx', category: 'Data Sample' }]

      const briefRes = await generateClientProjectBrief(answers, files)

      expect(briefRes.success).toBe(true)
      expect(briefRes.data).toBeDefined()
      const brief = briefRes.data!

      expect(brief.business_summary.name).toBe('Meridian Maritime')
      expect(brief.materials_summary.file_count).toBe(1)
      expect(brief.commercial_parameters.budget_bracket).toBe('£25k-50k')
      expect(brief.avorria_commitments_disclaimer).toContain('does not constitute a commercial proposal')
    })

    it('generates an internal discovery pack with clear segregation of facts vs hypotheses', async () => {
      delete process.env.OPENAI_API_KEY

      const answers = {
        companyName: 'Meridian Maritime',
        problemStatement: 'Vessel position tracking requires manual spreadsheet cross-referencing.',
        existingSystems: ['MarineTraffic API', 'Excel VBA macros'],
      }
      const files = [{ name: 'Vessel_Telematics_Sample.xlsx' }]

      const packRes = await generateInternalDiscoveryPack(answers, files)

      expect(packRes.success).toBe(true)
      expect(packRes.data).toBeDefined()
      const pack = packRes.data!

      expect(pack.confirmed_client_facts.length).toBeGreaterThan(0)
      expect(pack.hypotheses_and_exploration_areas.length).toBeGreaterThan(0)
      expect(pack.suggested_discovery_agenda.length).toBe(3)
      expect(pack.technical_considerations.length).toBeGreaterThan(0)
    })
  })
})
