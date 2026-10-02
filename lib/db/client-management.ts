/**
 * lib/db/client-management.ts
 * Admin-only: create orgs, invite users, list members.
 * Service-role throughout — never call from client components.
 */
import 'server-only'
import { createAdminClient } from '@/lib/supabase/server-admin'
import type { Database } from '@/types/supabase'

type OrganisationRow = Database['public']['Tables']['organisations']['Row']
type ProfileRow = Database['public']['Tables']['profiles']['Row']

export async function createOrganisation(input: {
  name: string
  slug: string
  primaryEmail?: string
  website?: string
}): Promise<OrganisationRow> {
  const admin = createAdminClient()
  const { data, error } = await admin
    .from('organisations')
    .insert({
      name: input.name,
      slug: input.slug,
      primary_email: input.primaryEmail ?? null,
      website: input.website ?? null,
      status: 'ACTIVE',
    })
    .select()
    .single()
  if (error || !data) throw new Error(`createOrganisation: ${error?.message}`)
  return data
}

export async function inviteUser(input: {
  email: string
  organisationId: string
  role?: 'CLIENT' | 'TEAM'
}): Promise<void> {
  const admin = createAdminClient()
  // Supabase auth admin invite — sends email with magic link
  const { error } = await admin.auth.admin.inviteUserByEmail(input.email, {
    data: {
      role: input.role ?? 'CLIENT',
      organisation_id: input.organisationId,
    },
  })
  if (error) throw new Error(`inviteUser: ${error.message}`)
}

export async function listOrgMembers(organisationId: string): Promise<ProfileRow[]> {
  const admin = createAdminClient()
  const { data } = await admin
    .from('organisation_memberships')
    .select('profiles(*)')
    .eq('organisation_id', organisationId)
  // Flatten nested profiles
  return (data ?? []).map((m: any) => m.profiles).filter(Boolean)
}
