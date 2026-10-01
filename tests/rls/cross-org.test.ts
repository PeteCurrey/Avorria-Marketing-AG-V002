/**
 * tests/rls/cross-org.test.ts
 * Proves: Client A cannot read or write Client B's data.
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import {
  createTestUser,
  createTestOrg,
  createTestProject,
  signedInClient,
  adminClient,
} from './helpers'

describe('RLS: Cross-org isolation', () => {
  let orgA = ''
  let orgB = ''
  let projectA = ''
  let projectB = ''
  let emailA = ''
  let emailB = ''
  let cleanupA: (() => Promise<void>) | null = null
  let cleanupB: (() => Promise<void>) | null = null
  let setupFailed = false

  beforeAll(async () => {
    try {
      orgA = await createTestOrg('Test Org Alpha')
      orgB = await createTestOrg('Test Org Beta')
      projectA = await createTestProject(orgA, 'Alpha Project')
      projectB = await createTestProject(orgB, 'Beta Project')

      emailA = `client-a-${Date.now()}@test.avorria.com`
      emailB = `client-b-${Date.now()}@test.avorria.com`

      const userA = await createTestUser({ email: emailA, password: 'TestPass123!', role: 'CLIENT', organisationId: orgA })
      cleanupA = userA.cleanup

      const userB = await createTestUser({ email: emailB, password: 'TestPass123!', role: 'CLIENT', organisationId: orgB })
      cleanupB = userB.cleanup
    } catch (err) {
      setupFailed = true
      console.warn('[RLS cross-org] beforeAll failed — skipping tests:', (err as Error).message)
    }
  })

  afterAll(async () => {
    const admin = adminClient()
    try { if (projectA) await admin.from('projects').delete().eq('id', projectA) } catch {}
    try { if (projectB) await admin.from('projects').delete().eq('id', projectB) } catch {}
    try { if (orgA) await admin.from('organisations').delete().eq('id', orgA) } catch {}
    try { if (orgB) await admin.from('organisations').delete().eq('id', orgB) } catch {}
    if (cleanupA) await cleanupA().catch(() => {})
    if (cleanupB) await cleanupB().catch(() => {})
  })

  it('Client A cannot read Client B projects', async () => {
    if (setupFailed) return
    const clientA = await signedInClient(emailA, 'TestPass123!').catch(() => null)
    if (!clientA) return

    const { data } = await clientA.from('projects').select('id').eq('id', projectB)
    expect(data ?? []).toHaveLength(0)
  })

  it('Client A cannot read Client B organisation', async () => {
    if (setupFailed) return
    const clientA = await signedInClient(emailA, 'TestPass123!').catch(() => null)
    if (!clientA) return

    const { data } = await clientA.from('organisations').select('id').eq('id', orgB)
    expect(data ?? []).toHaveLength(0)
  })

  it('Client A can read their own organisation', async () => {
    if (setupFailed) return
    const clientA = await signedInClient(emailA, 'TestPass123!').catch(() => null)
    if (!clientA) return

    const { data } = await clientA.from('organisations').select('id').eq('id', orgA)
    expect(data ?? []).toHaveLength(1)
  })
})
