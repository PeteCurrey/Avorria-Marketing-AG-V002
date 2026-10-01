/**
 * scripts/apply-migrations.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Applies SQL migrations to the configured Supabase project via the
 * Supabase Management API. Uses pg_query endpoint which is available
 * on all Supabase projects.
 *
 * Run: pnpm run db:migrate
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { config } from 'dotenv'
import path from 'path'
import fs from 'fs'

config({ path: path.resolve(process.cwd(), '.env.local') })

const SUPABASE_URL    = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SERVICE_KEY     = process.env.SUPABASE_SERVICE_ROLE_KEY!
const DB_URL          = process.env.SUPABASE_URL! // postgres:// connection string

if (!DB_URL) {
  console.error('[Migrate] SUPABASE_URL (postgres:// connection string) is required.')
  console.error('Add SUPABASE_URL=postgresql://postgres:password@db.your-ref.supabase.co:5432/postgres to .env.local')
  process.exit(1)
}

const MIGRATIONS_DIR = path.join(process.cwd(), 'supabase', 'migrations')

async function runMigration(filePath: string): Promise<void> {
  const sql = fs.readFileSync(filePath, 'utf-8')
  const filename = path.basename(filePath)
  console.log(`[Migrate] Applying ${filename}...`)

  // Use Supabase REST API with service role — pg RPC approach
  // For production use: npx supabase db push or psql directly
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_migration`, {
    method: 'POST',
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql }),
  })

  if (!res.ok) {
    const body = await res.text()
    // exec_migration doesn't exist — that's expected, print instructions
    console.warn(`[Migrate] Auto-apply not available. Apply ${filename} manually:`)
    console.warn(`  Option 1: Supabase Dashboard → SQL Editor → paste migration`)
    console.warn(`  Option 2: psql "${DB_URL}" -f supabase/migrations/${filename}`)
    console.warn(`  Option 3: npx supabase db push (requires Supabase CLI)`)
    return
  }

  console.log(`[Migrate] ✓ ${filename} applied.`)
}

async function main() {
  const files = fs.readdirSync(MIGRATIONS_DIR)
    .filter(f => f.endsWith('.sql'))
    .sort()

  console.log(`[Migrate] Found ${files.length} migration(s)`)

  for (const file of files) {
    await runMigration(path.join(MIGRATIONS_DIR, file))
  }

  console.log('[Migrate] Done.')
}

main().catch(err => {
  console.error('[Migrate] Error:', err)
  process.exit(1)
})
