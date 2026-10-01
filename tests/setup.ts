/**
 * tests/setup.ts
 * Global test setup — loads .env.local for RLS tests that hit real Supabase.
 */
import { config } from 'dotenv'
import path from 'path'

config({ path: path.resolve(process.cwd(), '.env.local') })

// Guard: RLS tests must never run against production
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
if (supabaseUrl.includes('your-production-project')) {
  throw new Error('[RLS Tests] Refusing to run against production Supabase project.')
}
