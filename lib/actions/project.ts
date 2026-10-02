'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { requireAdmin, requireTeam, getSession } from '@/lib/auth'
import {
  createProject,
  updateProjectStatus,
  addMilestone,
} from '@/lib/db/project'
import { writeActivity } from '@/lib/db/activity'
import { writeAuditEvent } from '@/lib/db/audit'

const createProjectSchema = z.object({
  organisationId: z.string().uuid(),
  title: z.string().min(2).max(120),
  slug: z.string().min(2).max(80).regex(/^[a-z0-9-]+$/),
  status: z.string().optional(),
  description: z.string().max(1000).optional(),
  budget: z.coerce.number().positive().optional(),
})

export async function createProjectAction(
  _prev: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string }> {
  const session = await requireTeam()

  const parsed = createProjectSchema.safeParse({
    organisationId: formData.get('organisationId'),
    title: formData.get('title'),
    slug: formData.get('slug'),
    status: formData.get('status') || 'DISCOVERY',
    description: formData.get('description') || undefined,
    budget: formData.get('budget') || undefined,
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid input.' }
  }

  try {
    const project = await createProject(parsed.data)
    await writeActivity({
      organisationId: parsed.data.organisationId,
      projectId: project.id,
      actorId: session.id,
      actorName: session.name,
      type: 'PROJECT_CREATED',
      description: `Project "${parsed.data.title}" created`,
    })
    await writeAuditEvent({
      actorId: session.id,
      action: 'project.create',
      resourceType: 'project',
      resourceId: project.id,
    })
  } catch (err) {
    return { error: 'Failed to create project. Please try again.' }
  }

  revalidatePath('/admin/projects')
  revalidatePath(`/admin/clients/${parsed.data.organisationId}`)
  redirect(`/admin/projects/${parsed.data.organisationId}`)
}

const updateStatusSchema = z.object({
  projectId: z.string().uuid(),
  status: z.enum(['ENQUIRY','DISCOVERY','PLANNING','DESIGN','DEVELOPMENT','REVIEW','LAUNCH','COMPLETED','ON_HOLD']),
})

export async function updateProjectStatusAction(
  _prev: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string }> {
  const session = await requireTeam()

  const parsed = updateStatusSchema.safeParse({
    projectId: formData.get('projectId'),
    status: formData.get('status'),
  })
  if (!parsed.success) return { error: 'Invalid status.' }

  try {
    await updateProjectStatus(parsed.data.projectId, parsed.data.status)
    await writeActivity({
      projectId: parsed.data.projectId,
      actorId: session.id,
      actorName: session.name,
      type: 'STATUS_CHANGED',
      description: `Status changed to ${parsed.data.status}`,
    })
  } catch {
    return { error: 'Failed to update status.' }
  }

  revalidatePath(`/admin/projects/${parsed.data.projectId}`)
  revalidatePath(`/client/projects/${parsed.data.projectId}`)
  return {}
}

const addMilestoneSchema = z.object({
  projectId: z.string().uuid(),
  title: z.string().min(2).max(200),
  dueDate: z.string().optional(),
})

export async function addMilestoneAction(
  _prev: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string }> {
  const session = await requireTeam()

  const parsed = addMilestoneSchema.safeParse({
    projectId: formData.get('projectId'),
    title: formData.get('title'),
    dueDate: formData.get('dueDate') || undefined,
  })
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Invalid input.' }

  try {
    await addMilestone(parsed.data)
  } catch {
    return { error: 'Failed to add milestone.' }
  }

  revalidatePath(`/admin/projects/${parsed.data.projectId}`)
  return {}
}
