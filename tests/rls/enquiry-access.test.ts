/**
 * tests/rls/enquiry-access.test.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Proves:
 *  - Clients cannot SELECT enquiries
 *  - Clients cannot INSERT enquiries directly
 *  - Unauthenticated cannot SELECT enquiries
 * ─────────────────────────────────────────────────────────────────────────────
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
  let orgId: string
  let cleanup: () => Promise<void>
  let clientEmail: string

  beforeAll(async () => {
    orgId = await createTestOrg('Enquiry Test Org')
    clientEmail = `enquiry-client-${Date.now()}@test.avorria.com`
    const user = await createTestUser({
      email: clientEmail,
      password: 'TestPass123!',
      role: 'CLIENT',
      organisationId: orgId,
    })
    cleanup = user.cleanup
  })

  afterAll(async () => {
    const admin = adminClient()
    await admin.from('organisations').delete().eq('id', orgId)
    await cleanup()
  })

  it('Authenticated CLIENT gets 0 rows on enquiries SELECT', async () => {
    const client = await signedInClient(clientEmail, 'TestPass123!')
    const { data, error } = await client.from('enquiries').select('id')
    // Either 0 rows or permission denied — both are acceptable security outcomes
    expect(data ?? []).toHaveLength(0)
    // If error, it must be a permission error, not a server error
    if (error) expect(error.code).toBe('42501') // PostgreSQL "insufficient privilege"
  })

  it('Unauthenticated gets 0 rows on enquiries SELECT', async () => {
    const anon = anonClient()
    const { data } = await anon.from('enquiries').select('id')
    expect(data ?? []).toHaveLength(0)
  })

  it('CLIENT cannot INSERT directly into enquiries', async () => {
    const client = await signedInClient(clientEmail, 'TestPass123!')
    const { error } = await (client as any).from('enquiries').insert({
      name: 'Hacked',
      email: 'hacker@test.com',
      what_building: 'Test',
      services: ['website'],
    })
    // Must fail — no INSERT policy for authenticated users on enquiries
    expect(error).not.toBeNull()
  })

  it('Unauthenticated cannot INSERT into enquiries', async () => {
    const anon = anonClient()
    const { error } = await (anon as any).from('enquiries').insert({
      name: 'Hacked',
      email: 'hacker@test.com',
      what_building: 'Test',
      services: ['website'],
    })
    expect(error).not.toBeNull()
  })
})
