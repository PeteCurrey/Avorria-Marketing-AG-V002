/**
 * lib/supabase/client.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Supabase browser client — anon key only.
 * For use in 'use client' components for auth state listeners only.
 * NEVER receives the service role key.
 * ─────────────────────────────────────────────────────────────────────────────
 */
'use client'

import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/supabase'

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
