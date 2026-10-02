'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { requireAuth, getSession } from '@/lib/auth'
import { sendMessage, createThread, markThreadRead } from '@/lib/db/message'

const sendMessageSchema = z.object({
  threadId: z.string().uuid(),
  organisationId: z.string().uuid(),
  projectId: z.string().uuid().optional(),
  content: z.string().min(1).max(10000),
})

export async function sendMessageAction(
  _prev: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string }> {
  const session = await requireAuth()

  const parsed = sendMessageSchema.safeParse({
    threadId: formData.get('threadId'),
    organisationId: formData.get('organisationId'),
    projectId: formData.get('projectId') || undefined,
    content: formData.get('content'),
  })
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Invalid message.' }

  try {
    await sendMessage({
      ...parsed.data,
      authorId: session.id,
      authorName: session.name,
    })
  } catch {
    return { error: 'Failed to send message. Please try again.' }
  }

  revalidatePath(`/client/messages/${parsed.data.threadId}`)
  revalidatePath(`/admin/messages/${parsed.data.threadId}`)
  return {}
}

const createThreadSchema = z.object({
  organisationId: z.string().uuid(),
  projectId: z.string().uuid().optional(),
  subject: z.string().min(2).max(200),
  content: z.string().min(1).max(10000),
})

export async function createThreadAction(
  _prev: { error?: string; threadId?: string } | null,
  formData: FormData
): Promise<{ error?: string; threadId?: string }> {
  const session = await requireAuth()

  const parsed = createThreadSchema.safeParse({
    organisationId: formData.get('organisationId'),
    projectId: formData.get('projectId') || undefined,
    subject: formData.get('subject'),
    content: formData.get('content'),
  })
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Invalid input.' }

  try {
    const threadId = await createThread({
      ...parsed.data,
      authorId: session.id,
      authorName: session.name,
    })
    revalidatePath('/admin/messages')
    revalidatePath('/client/messages')
    return { threadId }
  } catch {
    return { error: 'Failed to create thread.' }
  }
}

export async function markReadAction(threadId: string): Promise<void> {
  await requireAuth()
  await markThreadRead(threadId)
  revalidatePath('/client/messages')
  revalidatePath('/admin/messages')
}
