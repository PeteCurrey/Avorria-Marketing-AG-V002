/**
 * tests/rls/helpers.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Test helpers for RLS tests.
 * Creates impersonated Supabase clients with specific JWTs.
 * Uses service role for setup/teardown only.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { createClient } from '@supabase/supabase-js'
import type { Database } from '../../types/supabase'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

/** Service-role client — for test setup and teardown only */
export function adminClient() {
  return createClient<Database>(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

/** Anon client — represents unauthenticated user */
export function anonClient() {
  return createClient<Database>(SUPABASE_URL, ANON_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

/**
 * Creates a test user in Supabase Auth with given role and org.
 * Returns the user and a JWT-authenticated client.
 */
export async function createTestUser(opts: {
  email: string
  password: string
  role: 'CLIENT' | 'TEAM' | 'ADMIN'
  organisationId?: string
}): Promise<{ userId: string; cleanup: () => Promise<void> }> {
  const admin = adminClient()

  // Create user
  const { data, error } = await admin.auth.admin.createUser({
    email: opts.email,
    password: opts.password,
    email_confirm: true,
    app_metadata: {
      role: opts.role,
      ...(opts.organisationId ? { organisation_id: opts.organisationId } : {}),
    },
  })

  if (error || !data.user) throw new Error(`createTestUser failed: ${error?.message}`)
  const userId = data.user.id

  return {
    userId,
    cleanup: async () => {
      await admin.auth.admin.deleteUser(userId)
    },
  }
}

/**
 * Creates a signed-in client for a test user.
 */
export async function signedInClient(email: string, password: string) {
  const client = createClient<Database>(SUPABASE_URL, ANON_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
  const { error } = await client.auth.signInWithPassword({ email, password })
  if (error) throw new Error(`signedInClient: ${error.message}`)
  return client
}

/**
 * Creates a test organisation. Returns the org ID.
 */
export async function createTestOrg(name: string): Promise<string> {
  const admin = adminClient()
  const slug = name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now()
  const { data, error } = await (admin as any)
    .from('organisations')
    .insert({ name, slug })
    .select('id')
    .single()

  if (error || !data) throw new Error(`createTestOrg failed: ${error?.message}`)
  return data.id
}

/**
 * Creates a test project for an org. Returns the project ID.
 */
export async function createTestProject(organisationId: string, title: string): Promise<string> {
  const admin = adminClient()
  const slug = title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now()
  const { data, error } = await (admin as any)
    .from('projects')
    .insert({ organisation_id: organisationId, title, slug })
    .select('id')
    .single()

  if (error || !data) throw new Error(`createTestProject failed: ${error?.message}`)
  return data.id
}
