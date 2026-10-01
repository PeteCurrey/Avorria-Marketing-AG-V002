/**
 * tests/rls/unauthenticated.test.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Proves: Unauthenticated requests get 0 rows on every client-facing table.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { describe, it, expect } from 'vitest'
import { anonClient } from './helpers'

const TABLES = [
  'organisations',
  'profiles',
  'projects',
  'messages',
  'documents',
  'deliverables',
  'activity',
  'notifications',
  'audit_events',
  'enquiries',
] as const

describe('RLS: Unauthenticated gets 0 rows on all tables', () => {
  for (const table of TABLES) {
    it(`anon SELECT on ${table} returns 0 rows`, async () => {
      const anon = anonClient()
      const { data, error } = await anon.from(table).select('id').limit(1)
      // RLS should return empty array or permission denied — never real data
      expect(data ?? []).toHaveLength(0)
      // If there's an error, it should be a security error, not a server crash
      if (error) {
        expect(['42501', 'PGRST301']).toContain(error.code)
      }
    })
  }
})
