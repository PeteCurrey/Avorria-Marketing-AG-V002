/**
 * lib/db/organisation.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Organisation data queries. Server-only. Scoped to authenticated user's org.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import 'server-only'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/server-admin'
import type { Database } from '@/types/supabase'

type OrganisationRow = Database['public']['Tables']['organisations']['Row']
type ProjectRow = Database['public']['Tables']['projects']['Row']

/**
 * Gets an organisation by ID.
 * Uses RLS-respecting anon client — clients can only see their own org.
 */
export async function getOrganisation(id: string): Promise<OrganisationRow | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('organisations')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return data
}

/**
 * Lists all projects for an organisation.
 * RLS-scoped — clients only see their own org's projects.
 */
export async function listOrganisationProjects(organisationId: string): Promise<ProjectRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('organisation_id', organisationId)
    .order('updated_at', { ascending: false })

  if (error) return []
  return data ?? []
}

/**
 * Admin: lists all organisations. Service-role only.
 */
export async function listAllOrganisations(): Promise<OrganisationRow[]> {
  const admin = createAdminClient()
  const { data, error } = await admin
    .from('organisations')
    .select('*')
    .order('name')

  if (error) throw new Error(`listAllOrganisations: ${error.message}`)
  return data ?? []
}
