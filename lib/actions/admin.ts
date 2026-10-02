'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { requireAdmin } from '@/lib/auth'
import {
  createOrganisation,
  inviteUser,
} from '@/lib/db/client-management'
import {
  updateEnquiryStatus,
  addEnquiryNote,
  convertEnquiryToOrg,
} from '@/lib/db/enquiry'
import { publishDeliverable } from '@/lib/db/document'
import { writeAuditEvent } from '@/lib/db/audit'

// ─── Create Client Organisation ───────────────────────────────────────────────

const createClientSchema = z.object({
  name: z.string().min(2).max(120),
  slug: z.string().min(2).max(80).regex(/^[a-z0-9-]+$/, 'Slug: lowercase letters, numbers, hyphens only'),
  primaryEmail: z.string().email().optional().or(z.literal('')),
  website: z.string().url().optional().or(z.literal('')),
})

export async function createClientAction(
  _prev: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string }> {
  const session = await requireAdmin()

  const parsed = createClientSchema.safeParse({
    name: formData.get('name'),
    slug: formData.get('slug'),
    primaryEmail: formData.get('primaryEmail') || undefined,
    website: formData.get('website') || undefined,
  })
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Invalid input.' }

  try {
    const org = await createOrganisation({
      name: parsed.data.name,
      slug: parsed.data.slug,
      primaryEmail: parsed.data.primaryEmail || undefined,
      website: parsed.data.website || undefined,
    })
    await writeAuditEvent({
      actorId: session.id,
      action: 'organisation.create',
      resourceType: 'organisation',
      resourceId: org.id,
    })
    revalidatePath('/admin/clients')
    redirect(`/admin/clients/${org.id}`)
  } catch (err: any) {
    return { error: err.message ?? 'Failed to create client.' }
  }
}

// ─── Invite User ──────────────────────────────────────────────────────────────

const inviteSchema = z.object({
  email: z.string().email(),
  organisationId: z.string().uuid(),
  role: z.enum(['CLIENT', 'TEAM']).default('CLIENT'),
})

export async function inviteUserAction(
  _prev: { error?: string; success?: boolean } | null,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const session = await requireAdmin()

  const parsed = inviteSchema.safeParse({
    email: formData.get('email'),
    organisationId: formData.get('organisationId'),
    role: formData.get('role') || 'CLIENT',
  })
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Invalid input.' }

  try {
    await inviteUser(parsed.data)
    await writeAuditEvent({
      actorId: session.id,
      action: 'user.invite',
      resourceType: 'user',
      resourceId: parsed.data.email,
      metadata: { organisation_id: parsed.data.organisationId, role: parsed.data.role },
    })
    revalidatePath(`/admin/clients/${parsed.data.organisationId}`)
    return { success: true }
  } catch (err: any) {
    return { error: err.message ?? 'Failed to send invite.' }
  }
}

// ─── Enquiry Status ───────────────────────────────────────────────────────────

const enquiryStatusSchema = z.object({
  enquiryId: z.string().uuid(),
  status: z.enum(['NEW','REVIEWING','QUALIFIED','REJECTED','ARCHIVED']),
})

export async function updateEnquiryStatusAction(
  _prev: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string }> {
  const session = await requireAdmin()

  const parsed = enquiryStatusSchema.safeParse({
    enquiryId: formData.get('enquiryId'),
    status: formData.get('status'),
  })
  if (!parsed.success) return { error: 'Invalid status.' }

  try {
    await updateEnquiryStatus(parsed.data.enquiryId, parsed.data.status, session.id)
    revalidatePath('/admin/enquiries')
    revalidatePath(`/admin/enquiries/${parsed.data.enquiryId}`)
    return {}
  } catch (err: any) {
    return { error: err.message ?? 'Failed to update enquiry.' }
  }
}

// ─── Enquiry Note ─────────────────────────────────────────────────────────────

const noteSchema = z.object({
  enquiryId: z.string().uuid(),
  note: z.string().min(1).max(5000),
})

export async function addEnquiryNoteAction(
  _prev: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string }> {
  const session = await requireAdmin()

  const parsed = noteSchema.safeParse({
    enquiryId: formData.get('enquiryId'),
    note: formData.get('note'),
  })
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Invalid input.' }

  try {
    await addEnquiryNote(parsed.data.enquiryId, parsed.data.note, session.id)
    revalidatePath(`/admin/enquiries/${parsed.data.enquiryId}`)
    return {}
  } catch {
    return { error: 'Failed to save note.' }
  }
}

// ─── Convert Enquiry to Client ────────────────────────────────────────────────

const convertSchema = z.object({
  enquiryId: z.string().uuid(),
  orgName: z.string().min(2).max(120),
  orgSlug: z.string().min(2).max(80).regex(/^[a-z0-9-]+$/),
})

export async function convertEnquiryAction(
  _prev: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string }> {
  const session = await requireAdmin()

  const parsed = convertSchema.safeParse({
    enquiryId: formData.get('enquiryId'),
    orgName: formData.get('orgName'),
    orgSlug: formData.get('orgSlug'),
  })
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Invalid input.' }

  try {
    const orgId = await convertEnquiryToOrg(
      parsed.data.enquiryId,
      parsed.data.orgName,
      parsed.data.orgSlug,
      session.id
    )
    await writeAuditEvent({
      actorId: session.id,
      action: 'enquiry.convert',
      resourceType: 'enquiry',
      resourceId: parsed.data.enquiryId,
      metadata: { org_id: orgId },
    })
    revalidatePath('/admin/clients')
    revalidatePath('/admin/enquiries')
    redirect(`/admin/clients/${orgId}`)
  } catch (err: any) {
    return { error: err.message ?? 'Failed to convert enquiry.' }
  }
}

// ─── Publish Deliverable ──────────────────────────────────────────────────────

export async function publishDeliverableAction(deliverableId: string): Promise<{ error?: string }> {
  const session = await requireAdmin()
  try {
    await publishDeliverable(deliverableId)
    await writeAuditEvent({
      actorId: session.id,
      action: 'deliverable.publish',
      resourceType: 'deliverable',
      resourceId: deliverableId,
    })
    revalidatePath('/admin/deliverables')
    return {}
  } catch {
    return { error: 'Failed to publish deliverable.' }
  }
}
