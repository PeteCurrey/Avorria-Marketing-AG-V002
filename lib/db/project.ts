/**
 * lib/db/project.ts
 * Project queries. Server-only. RLS-scoped for clients; service-role for admin.
 */
import 'server-only'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/server-admin'
import type { Database } from '@/types/supabase'

type ProjectRow = Database['public']['Tables']['projects']['Row']
type MilestoneRow = Database['public']['Tables']['milestones']['Row']

// ─── Client-facing (RLS-scoped) ──────────────────────────────────────────────

export async function getProject(id: string): Promise<ProjectRow | null> {
  const supabase = await createClient()
  const { data } = await supabase.from('projects').select('*').eq('id', id).single()
  return data ?? null
}

export async function listProjects(organisationId: string): Promise<ProjectRow[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('projects')
    .select('*')
    .eq('organisation_id', organisationId)
    .order('updated_at', { ascending: false })
  return data ?? []
}

export async function listMilestones(projectId: string): Promise<MilestoneRow[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('milestones')
    .select('*')
    .eq('project_id', projectId)
    .order('due_date', { ascending: true })
  return data ?? []
}

// ─── Admin (service-role) ─────────────────────────────────────────────────────

export async function listAllProjects(): Promise<ProjectRow[]> {
  const admin = createAdminClient()
  const { data } = await admin
    .from('projects')
    .select('*, organisations(name)')
    .order('updated_at', { ascending: false })
  return (data as any[]) ?? []
}

export async function createProject(input: {
  organisationId: string
  title: string
  slug: string
  status?: string
  description?: string
  budget?: number
}): Promise<ProjectRow> {
  const admin = createAdminClient()
  const { data, error } = await admin
    .from('projects')
    .insert({
      organisation_id: input.organisationId,
      title: input.title,
      slug: input.slug,
      status: (input.status as any) ?? 'DISCOVERY',
      description: input.description ?? null,
      budget: input.budget ?? null,
    })
    .select()
    .single()
  if (error || !data) throw new Error(`createProject: ${error?.message}`)
  return data
}

export async function updateProjectStatus(id: string, status: string): Promise<void> {
  const admin = createAdminClient()
  const { error } = await admin
    .from('projects')
    .update({ status: status as any, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw new Error(`updateProjectStatus: ${error.message}`)
}

export async function addMilestone(input: {
  projectId: string
  title: string
  dueDate?: string
  completed?: boolean
}): Promise<MilestoneRow> {
  const admin = createAdminClient()
  const { data, error } = await admin
    .from('milestones')
    .insert({
      project_id: input.projectId,
      title: input.title,
      due_date: input.dueDate ?? null,
      completed: input.completed ?? false,
    })
    .select()
    .single()
  if (error || !data) throw new Error(`addMilestone: ${error?.message}`)
  return data
}
