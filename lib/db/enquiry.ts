/**
 * lib/db/enquiry.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Enquiry persistence. Writes via SECURITY DEFINER function (no INSERT policy
 * for authenticated users on the enquiries table). Admin reads via service role.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import 'server-only'
import { createAdminClient } from '@/lib/supabase/server-admin'
import { writeAuditEvent } from '@/lib/db/audit'
import type { Database } from '@/types/supabase'

type EnquiryRow = Database['public']['Tables']['enquiries']['Row']

export interface InsertEnquiryInput {
  name: string
  company?: string | null
  email: string
  website?: string | null
  whatBuilding: string
  problemSolving?: string | null
  services: string[]
  budget?: string | null
  timeline?: string | null
  additional?: string | null
  ipHash?: string | null
}

/**
 * Persists an enquiry via the SECURITY DEFINER insert_enquiry function.
 * Returns the new enquiry ID.
 */
export async function insertEnquiry(input: InsertEnquiryInput): Promise<string> {
  const admin = createAdminClient()

  const { data, error } = await admin.rpc('insert_enquiry', {
    p_name:            input.name,
    p_company:         input.company ?? null,
    p_email:           input.email,
    p_website:         input.website ?? null,
    p_what_building:   input.whatBuilding,
    p_problem_solving: input.problemSolving ?? null,
    p_services:        input.services,
    p_budget:          input.budget ?? null,
    p_timeline:        input.timeline ?? null,
    p_additional:      input.additional ?? null,
    p_ip_hash:         input.ipHash ?? null,
  })

  if (error) throw new Error(`insertEnquiry failed: ${error.message}`)
  return data as string
}

/**
 * Lists enquiries — TEAM/ADMIN only, called from admin dashboard.
 */
export async function listEnquiries(
  opts: { status?: string; limit?: number; offset?: number } = {}
): Promise<EnquiryRow[]> {
  const admin = createAdminClient()
  let query = admin
    .from('enquiries')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(opts.limit ?? 50)

  if (opts.status) query = query.eq('status', opts.status)
  if (opts.offset) query = query.range(opts.offset, opts.offset + (opts.limit ?? 50) - 1)

  const { data, error } = await query
  if (error) throw new Error(`listEnquiries failed: ${error.message}`)
  return data ?? []
}

/**
 * Gets a single enquiry by ID — admin only.
 */
export async function getEnquiry(id: string): Promise<EnquiryRow | null> {
  const admin = createAdminClient()
  const { data, error } = await admin
    .from('enquiries')
    .select('*')
    .eq('id', id)
    .single()
  if (error) return null
  return data
}

/**
 * Updates enquiry status and writes audit event.
 */
export async function updateEnquiryStatus(
  id: string,
  status: string,
  actorId: string
): Promise<void> {
  const admin = createAdminClient()
  const { error } = await admin
    .from('enquiries')
    .update({ status: status as any, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw new Error(`updateEnquiryStatus: ${error.message}`)

  // Record in audit log
  await writeAuditEvent({
    actorId,
    action: 'enquiry.status_update',
    resourceType: 'enquiry',
    resourceId: id,
    metadata: { status },
  })
}

/**
 * Adds an internal note to an enquiry. Notes are stored in metadata JSONB.
 */
export async function addEnquiryNote(
  id: string,
  note: string,
  actorId: string
): Promise<void> {
  const admin = createAdminClient()
  // Fetch existing metadata
  const { data } = await admin.from('enquiries').select('metadata').eq('id', id).single()
  const existing = (data?.metadata as any) ?? {}
  const notes: any[] = existing.notes ?? []
  notes.push({ note, actorId, createdAt: new Date().toISOString() })
  const { error } = await admin
    .from('enquiries')
    .update({ metadata: { ...existing, notes } as any })
    .eq('id', id)
  if (error) throw new Error(`addEnquiryNote: ${error.message}`)
}

/**
 * Converts an enquiry to a client organisation.
 * Returns the new organisation ID.
 */
export async function convertEnquiryToOrg(
  enquiryId: string,
  orgName: string,
  orgSlug: string,
  actorId: string
): Promise<string> {
  const admin = createAdminClient()

  // Get enquiry for email
  const { data: enq } = await admin.from('enquiries').select('email').eq('id', enquiryId).single()

  // Create org
  const { data: org, error: orgErr } = await admin
    .from('organisations')
    .insert({ name: orgName, slug: orgSlug, primary_email: enq?.email ?? null, status: 'ACTIVE' })
    .select('id')
    .single()
  if (orgErr || !org) throw new Error(`convertEnquiryToOrg: ${orgErr?.message}`)

  // Mark enquiry as QUALIFIED and link org
  await admin
    .from('enquiries')
    .update({ status: 'QUALIFIED' as any, metadata: { converted_org_id: org.id } as any })
    .eq('id', enquiryId)

  return org.id
}
