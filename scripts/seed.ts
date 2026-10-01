/**
 * scripts/seed.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Development/test seed data.
 * NEVER runs in production — guarded by env flags at both runtime and build.
 * Run: SEED_ENABLED=true pnpm run seed
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { config } from 'dotenv'
import path from 'path'

config({ path: path.resolve(process.cwd(), '.env.local') })

// ─── Guards — must come before any Supabase imports ──────────────────────────

if (process.env.NODE_ENV === 'production') {
  console.error('[Seed] ERROR: Seed must NEVER run in production. Exiting.')
  process.exit(1)
}

if (process.env.SEED_ENABLED !== 'true') {
  console.error(
    '[Seed] ERROR: SEED_ENABLED is not set to "true".\n' +
    'To run seed: SEED_ENABLED=true pnpm run seed\n' +
    'This guard prevents accidental data insertion.'
  )
  process.exit(1)
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
if (!supabaseUrl || supabaseUrl.includes('your-production')) {
  console.error('[Seed] ERROR: Refusing to seed — SUPABASE_URL looks like production.')
  process.exit(1)
}

// ─── Seed data ────────────────────────────────────────────────────────────────

import { createClient } from '@supabase/supabase-js'

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

async function seed() {
  console.log('[Seed] Starting seed for:', supabaseUrl)

  // Create a test organisation
  const { data: org, error: orgErr } = await admin
    .from('organisations')
    .insert({ name: 'Demo Client Ltd', slug: 'demo-client-ltd' })
    .select('id')
    .single()

  if (orgErr) {
    console.error('[Seed] Org insert error:', orgErr.message)
    process.exit(1)
  }

  console.log('[Seed] Created org:', org.id)

  // Create test users via Supabase Auth Admin API
  const users = [
    { email: 'admin@avorria.com',  password: 'admin-dev-2026',   role: 'ADMIN',  org: null },
    { email: 'team@avorria.com',   password: 'team-dev-2026',    role: 'TEAM',   org: null },
    { email: 'client@example.com', password: 'client-dev-2026',  role: 'CLIENT', org: org.id },
  ]

  for (const u of users) {
    const { error } = await admin.auth.admin.createUser({
      email: u.email,
      password: u.password,
      email_confirm: true,
      app_metadata: {
        role: u.role,
        ...(u.org ? { organisation_id: u.org } : {}),
      },
    })
    if (error && !error.message.includes('already registered')) {
      console.error(`[Seed] User ${u.email} error:`, error.message)
    } else {
      console.log(`[Seed] User ready: ${u.email} (${u.role})`)
    }
  }

  console.log('[Seed] Done.')
}

seed().catch((err) => {
  console.error('[Seed] Fatal:', err)
  process.exit(1)
})
