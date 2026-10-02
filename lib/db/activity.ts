/**
 * lib/db/activity.ts
 * Activity log queries. Server-only. RLS-scoped.
 */
import 'server-only'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/server-admin'
import type { Database } from '@/types/supabase'

type ActivityRow = Database['public']['Tables']['activity']['Row']

export async function listActivity(organisationId: string, limit = 20): Promise<ActivityRow[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('activity')
    .select('*')
    .eq('organisation_id', organisationId)
    .order('created_at', { ascending: false })
    .limit(limit)
  return data ?? []
}

export async function listAllActivity(limit = 100): Promise<ActivityRow[]> {
  const admin = createAdminClient()
  const { data } = await admin
    .from('activity')
    .select('*, organisations(name)')
    .order('created_at', { ascending: false })
    .limit(limit)
  return (data as any[]) ?? []
}

export async function writeActivity(input: {
  organisationId?: string
  projectId?: string
  actorId: string
  actorName: string
  type: string
  description: string
  metadata?: Record<string, unknown>
}): Promise<void> {
  const admin = createAdminClient()
  await admin.from('activity').insert({
    organisation_id: input.organisationId ?? null,
    project_id: input.projectId ?? null,
    actor_id: input.actorId,
    actor_name: input.actorName,
    type: input.type as any,
    description: input.description,
    metadata: (input.metadata ?? null) as any,
  })
}
