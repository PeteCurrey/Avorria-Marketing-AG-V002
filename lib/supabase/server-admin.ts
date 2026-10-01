/**
 * lib/supabase/server-admin.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Supabase service-role client — NEVER imported in client bundles.
 * Used ONLY for: migrations, RLS tests, audit writes, rate-limit queries,
 * and admin-invoked user management.
 *
 * 'server-only' import will throw a build error if this module is ever
 * accidentally imported from a Client Component.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import 'server-only'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error(
      '[Avorria] SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL is not set. ' +
      'This client must only be used server-side.'
    )
  }

  return createClient<Database>(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }) as any
}
