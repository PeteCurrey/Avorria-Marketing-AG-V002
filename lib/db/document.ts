/**
 * lib/db/document.ts
 * Document and deliverable queries. Server-only.
 */
import 'server-only'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/server-admin'
import type { Database } from '@/types/supabase'

type DocumentRow = Database['public']['Tables']['documents']['Row']
type DeliverableRow = Database['public']['Tables']['deliverables']['Row']

// ─── Documents ────────────────────────────────────────────────────────────────

export async function listDocuments(organisationId: string): Promise<DocumentRow[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('documents')
    .select('*')
    .eq('organisation_id', organisationId)
    .order('created_at', { ascending: false })
  return data ?? []
}

export async function listAllDocuments(): Promise<DocumentRow[]> {
  const admin = createAdminClient()
  const { data } = await admin
    .from('documents')
    .select('*, organisations(name)')
    .order('created_at', { ascending: false })
  return (data as any[]) ?? []
}

// ─── Deliverables ─────────────────────────────────────────────────────────────

/**
 * Client: only published deliverables visible.
 */
export async function listDeliverables(organisationId: string): Promise<DeliverableRow[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('deliverables')
    .select('*')
    .eq('organisation_id', organisationId)
    .eq('published', true)
    .order('created_at', { ascending: false })
  return data ?? []
}

/**
 * Admin: all deliverables including unpublished.
 */
export async function listAllDeliverables(organisationId?: string): Promise<DeliverableRow[]> {
  const admin = createAdminClient()
  let query = admin
    .from('deliverables')
    .select('*, organisations(name)')
    .order('created_at', { ascending: false })

  if (organisationId) {
    query = query.eq('organisation_id', organisationId) as typeof query
  }

  const { data } = await query
  return (data as any[]) ?? []
}

export async function publishDeliverable(id: string): Promise<void> {
  const admin = createAdminClient()
  const { error } = await admin
    .from('deliverables')
    .update({ published: true, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw new Error(`publishDeliverable: ${error.message}`)
}
