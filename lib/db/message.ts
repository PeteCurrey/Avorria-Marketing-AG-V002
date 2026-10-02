/**
 * lib/db/message.ts
 * Message thread queries. Server-only. RLS-scoped.
 */
import 'server-only'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/server-admin'
import type { Database } from '@/types/supabase'

type MessageRow = Database['public']['Tables']['messages']['Row']

// ─── Threads (represented as messages grouped by thread identifier) ───────────
// The schema has a 'messages' table with thread_id, project_id, organisation_id

export async function listThreads(organisationId: string): Promise<MessageRow[]> {
  const supabase = await createClient()
  // Latest message per thread
  const { data } = await supabase
    .from('messages')
    .select('*')
    .eq('organisation_id', organisationId)
    .order('created_at', { ascending: false })
  return data ?? []
}

export async function listMessages(threadId: string): Promise<MessageRow[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('messages')
    .select('*')
    .eq('thread_id', threadId)
    .order('created_at', { ascending: true })
  return data ?? []
}

export async function listAllThreads(): Promise<MessageRow[]> {
  const admin = createAdminClient()
  const { data } = await admin
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200)
  return data ?? []
}

export async function sendMessage(input: {
  threadId: string
  organisationId: string
  projectId?: string
  content: string
  authorId: string
  authorName: string
}): Promise<MessageRow> {
  const admin = createAdminClient()
  const { data, error } = await admin
    .from('messages')
    .insert({
      thread_id: input.threadId,
      organisation_id: input.organisationId,
      project_id: input.projectId ?? null,
      content: input.content,
      author_id: input.authorId,
      author_name: input.authorName,
      read: false,
    })
    .select()
    .single()
  if (error || !data) throw new Error(`sendMessage: ${error?.message}`)
  return data
}

export async function createThread(input: {
  organisationId: string
  projectId?: string
  subject: string
  authorId: string
  authorName: string
  content: string
}): Promise<string> {
  const threadId = crypto.randomUUID()
  await sendMessage({
    threadId,
    organisationId: input.organisationId,
    projectId: input.projectId,
    content: input.content,
    authorId: input.authorId,
    authorName: input.authorName,
  })
  return threadId
}

export async function markThreadRead(threadId: string): Promise<void> {
  const admin = createAdminClient()
  await admin
    .from('messages')
    .update({ read: true })
    .eq('thread_id', threadId)
    .eq('read', false)
}
