/**
 * lib/supabase/server.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Supabase SSR server client — for use in Server Components, Server Actions,
 * and Route Handlers. Reads/writes the Supabase session cookie.
 *
 * NEVER import this in 'use client' components.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/supabase'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, {
                ...options,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
              })
            )
          } catch {
            // In Server Components cookies can't be set — this is expected.
            // Only Server Actions and Route Handlers can set cookies.
          }
        },
      },
    }
  )
}
