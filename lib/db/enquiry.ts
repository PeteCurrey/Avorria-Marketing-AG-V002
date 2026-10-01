/**
 * lib/db/enquiry.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Enquiry persistence. Writes via SECURITY DEFINER function (no INSERT policy
 * for authenticated users on the enquiries table). Admin reads via service role.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import 'server-only'
import { createAdminClient } from '@/lib/supabase/server-admin'
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
