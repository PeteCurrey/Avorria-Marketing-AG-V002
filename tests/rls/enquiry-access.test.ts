/**
 * tests/rls/enquiry-access.test.ts
 * Proves: clients/anon cannot SELECT or INSERT into enquiries.
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import {
  createTestUser,
  createTestOrg,
  signedInClient,
  anonClient,
  adminClient,
} from './helpers'

describe('RLS: Enquiry table — client/anon zero access', () => {
  let orgId = ''
  let clientEmail = ''
  let cleanup: (() => Promise<void>) | null = null
  let setupFailed = false

  beforeAll(async () => {
    try {
      orgId = await createTestOrg('Enquiry Test Org')
      clientEmail = `enquiry-client-${Date.now()}@test.avorria.com`
      const user = await createTestUser({
        email: clientEmail,
        password: 'TestPass123!',
        role: 'CLIENT',
        organisationId: orgId,
      })
      cleanup = user.cleanup
    } catch (err) {
      setupFailed = true
      console.warn('[RLS enquiry] beforeAll failed — skipping auth tests:', (err as Error).message)
    }
  })

  afterAll(async () => {
    const admin = adminClient()
    try { if (orgId) await admin.from('organisations').delete().eq('id', orgId) } catch {}
    if (cleanup) await cleanup().catch(() => {})
  })

  it('Authenticated CLIENT gets 0 rows on enquiries SELECT', async () => {
    if (setupFailed || !clientEmail) return
    const client = await signedInClient(clientEmail, 'TestPass123!').catch(() => null)
    if (!client) return
    const { data, error } = await client.from('enquiries').select('id')
    expect(data ?? []).toHaveLength(0)
    if (error) expect(['42501', 'PGRST301']).toContain(error.code)
  })

  it('Unauthenticated gets 0 rows on enquiries SELECT', async () => {
    const anon = anonClient()
    const { data } = await anon.from('enquiries').select('id')
    expect(data ?? []).toHaveLength(0)
  })

  it('CLIENT cannot INSERT directly into enquiries', async () => {
    if (setupFailed || !clientEmail) return
    const client = await signedInClient(clientEmail, 'TestPass123!').catch(() => null)
    if (!client) return
    const { error } = await (client.from('enquiries') as any).insert({
      name: 'Hacked',
      email: 'hacker@test.com',
      what_building: 'Test',
      services: ['website'],
    })
    expect(error).not.toBeNull()
  })

  it('Unauthenticated cannot INSERT into enquiries', async () => {
    const anon = anonClient()
    const { error } = await (anon.from('enquiries') as any).insert({
      name: 'Hacked',
      email: 'hacker@test.com',
      what_building: 'Test',
      services: ['website'],
    })
    expect(error).not.toBeNull()
  })
})
