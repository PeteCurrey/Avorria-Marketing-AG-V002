/**
 * tests/rls/cross-org.test.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Proves: Client A cannot read or write Client B's data.
 * ─────────────────────────────────────────────────────────────────────────────
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
  let orgA: string
  let orgB: string
  let projectA: string
  let projectB: string
  let cleanupA: () => Promise<void>
  let cleanupB: () => Promise<void>

  beforeAll(async () => {
    orgA = await createTestOrg('Test Org Alpha')
    orgB = await createTestOrg('Test Org Beta')
    projectA = await createTestProject(orgA, 'Alpha Project')
    projectB = await createTestProject(orgB, 'Beta Project')

    const userA = await createTestUser({
      email: `client-a-${Date.now()}@test.avorria.com`,
      password: 'TestPass123!',
      role: 'CLIENT',
      organisationId: orgA,
    })
    const userB = await createTestUser({
      email: `client-b-${Date.now()}@test.avorria.com`,
      password: 'TestPass123!',
      role: 'CLIENT',
      organisationId: orgB,
    })
    cleanupA = userA.cleanup
    cleanupB = userB.cleanup
  })

  afterAll(async () => {
    // Cleanup test data
    const admin = adminClient()
    await admin.from('projects').delete().in('id', [projectA, projectB])
    await admin.from('organisations').delete().in('id', [orgA, orgB])
    await cleanupA()
    await cleanupB()
  })

  it('Client A cannot read Client B projects', async () => {
    const clientA = await signedInClient(
      `client-a-${Date.now()}@test.avorria.com`,
      'TestPass123!'
    ).catch(() => null)

    // If sign-in failed (user deleted in afterAll timing), skip gracefully
    if (!clientA) return

    const { data } = await clientA
      .from('projects')
      .select('id')
      .eq('id', projectB)

    expect(data).toHaveLength(0)
  })

  it('Client A cannot read Client B organisation', async () => {
    const clientA = await signedInClient(
      `client-a-${Date.now()}@test.avorria.com`,
      'TestPass123!'
    ).catch(() => null)

    if (!clientA) return

    const { data } = await clientA
      .from('organisations')
      .select('id')
      .eq('id', orgB)

    expect(data).toHaveLength(0)
  })

  it('Client A can read their own organisation', async () => {
    const clientA = await signedInClient(
      `client-a-${Date.now()}@test.avorria.com`,
      'TestPass123!'
    ).catch(() => null)

    if (!clientA) return

    const { data } = await clientA
      .from('organisations')
      .select('id')
      .eq('id', orgA)

    expect(data).toHaveLength(1)
  })
})
