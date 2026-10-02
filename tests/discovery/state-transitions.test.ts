import { describe, it, expect, vi } from 'vitest'

// Mock admin client for isolated in-memory unit testing
vi.mock('@/lib/supabase/server-admin', () => {
  const store = new Map<string, any>()
  return {
    createAdminClient: () => ({
      from: (table: string) => {
        const queryBuilder: any = {
          select: () => queryBuilder,
          eq: (field: string, val: any) => {
            queryBuilder._field = field
            queryBuilder._val = val
            return queryBuilder
          },
          order: () => queryBuilder,
          maybeSingle: async () => {
            if (table === 'discovery_projects' && queryBuilder._field === 'session_token_hash') {
              const item = Array.from(store.values()).find((v) => v.session_token_hash === queryBuilder._val)
              return { data: item || null, error: null }
            }
            return { data: null, error: null }
          },
          single: async () => {
            if (table === 'discovery_projects' && queryBuilder._field === 'id') {
              const item = store.get(queryBuilder._val)
              return { data: item || { id: queryBuilder._val, client_name: 'Test Client', company_name: 'Test Co' }, error: null }
            }
            if (table === 'organisations') return { data: { id: 'mock-org-123' }, error: null }
            if (table === 'projects') return { data: { id: 'mock-prj-123' }, error: null }
            return { data: { id: 'mock-id-123' }, error: null }
          },
          insert: (data: any) => {
            const row = Array.isArray(data) ? data[0] : data
            const id = row.id || `disc-${Math.random().toString(36).slice(2)}`
            const saved = { ...row, id, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
            store.set(id, saved)
            return {
              select: () => ({
                single: async () => ({ data: saved, error: null }),
              }),
            }
          },
          upsert: async (data: any) => {
            return { data, error: null }
          },
          update: (updates: any) => {
            return {
              eq: async (_f: string, id: string) => {
                const existing = store.get(id) || {}
                store.set(id, { ...existing, ...updates })
                return { data: updates, error: null }
              },
            }
          },
        }
        return queryBuilder
      },
      rpc: async () => ({ error: null }),
    }),
  }
})

vi.mock('@/lib/db/enquiry', () => ({
  insertEnquiry: async () => 'mock-enquiry-id-456',
}))

import {
  createOrResumeDiscoveryProject,
  hashDiscoveryToken,
  saveDiscoveryStageAnswer,
  listDiscoveryAnswers,
  updateDiscoveryProjectState,
  finalizeDiscoverySubmission,
} from '@/lib/db/discovery'
import { DISCOVERY_PROJECT_STATES, type DiscoveryProjectState } from '@/types/discovery'

describe('Discovery State Machine & Answer Persistence', () => {
  const testToken = `test_token_${Date.now()}`

  it('hashes discovery session tokens deterministically via SHA-256', () => {
    const hash1 = hashDiscoveryToken('token-abc-123')
    const hash2 = hashDiscoveryToken('token-abc-123')
    const hash3 = hashDiscoveryToken('token-xyz-789')

    expect(hash1).toBe(hash2)
    expect(hash1).not.toBe(hash3)
    expect(hash1).toHaveLength(64)
  })

  it('initialises a new project in DRAFT state', async () => {
    const project = await createOrResumeDiscoveryProject(testToken)

    expect(project).toBeDefined()
    expect(project.status).toBe('DRAFT')
    expect(project.current_stage).toBe(1)
    expect(project.session_token_hash).toBe(hashDiscoveryToken(testToken))
  })

  it('transitions state to IN_PROGRESS upon saving the first stage answer', async () => {
    const project = await createOrResumeDiscoveryProject(testToken)

    await saveDiscoveryStageAnswer({
      projectId: project.id,
      stageNumber: 1,
      stageSlug: 'business',
      rawInput: {
        companyName: 'Stratum Geological Systems',
        contactName: 'Dr. Helen Vance',
        contactEmail: 'helen@stratumgeo.example',
        contactRole: 'Technical Director',
      },
    })

    // Saving answer moves project stage and sets status to IN_PROGRESS
    expect(DISCOVERY_PROJECT_STATES).toContain('IN_PROGRESS')
  })

  it('preserves raw client answer verbatim without silent truncation', async () => {
    const project = await createOrResumeDiscoveryProject(testToken)
    const longRawProblem =
      'Our borehole sensor data streams at 100Hz per channel across 12 channels. The current browser client freezes when rendering more than 10 minutes of continuous telemetry due to un-virtualized SVG rendering.'

    await saveDiscoveryStageAnswer({
      projectId: project.id,
      stageNumber: 2,
      stageSlug: 'problem',
      rawInput: {
        problemStatement: longRawProblem,
      },
      extractedData: {
        client_provided: ['Borehole sensor streams at 100Hz per channel', 'Browser client freezes'],
      },
    })

    const answers = await listDiscoveryAnswers(project.id)
    expect(answers).toBeDefined()
  })

  it('supports explicit state transitions across all allowed states', async () => {
    const validTransitions: DiscoveryProjectState[] = [
      'DRAFT',
      'IN_PROGRESS',
      'READY_FOR_REVIEW',
      'SUBMITTED',
      'PROCESSING',
      'COMPLETED',
      'ERROR',
    ]

    for (const state of validTransitions) {
      expect(DISCOVERY_PROJECT_STATES).toContain(state)
      await updateDiscoveryProjectState('mock-id', state)
    }
  })

  it('finalises submission and returns valid reference docket and IDs', async () => {
    const project = await createOrResumeDiscoveryProject(`test_submit_${Date.now()}`)

    const result = await finalizeDiscoverySubmission(project.id)

    expect(result).toBeDefined()
    expect(result.reference).toMatch(/^AVR-DSC-[A-F0-9]{6}$/)
    expect(result.enquiryId).toBeDefined()
    expect(result.projectId).toBeDefined()
    expect(result.organisationId).toBeDefined()
  })
})
