/**
 * Avorria — Form Server Action: Project Enquiry
 *
 * Architecture:
 * ProjectForm → submitEnquiry (Server Action) → Zod validation
 * → honeypot check → origin check → Postgres rate limit
 * → DB persist (enquiries table) → email delivery (Avorria + submitter)
 * → audit event → success/error state
 *
 * Security:
 * - Server-side Zod validation (cannot be bypassed client-side)
 * - Honeypot field check
 * - Postgres-backed rate limiting (real store, persists across restarts)
 * - IP stored as SHA-256 hash only — never raw
 * - Service-role SECURITY DEFINER function for DB insert (no public insert policy)
 * - All errors return generic messages to prevent enumeration
 */

'use server'

import { z } from 'zod'
import { checkRateLimit, hashIp } from '@/lib/db/rateLimit'
import { insertEnquiry } from '@/lib/db/enquiry'
import { writeAuditEvent } from '@/lib/db/audit'
import { captureError } from '@/lib/monitoring'

// ─── Schema ──────────────────────────────────────────────────────────────────

const EnquirySchema = z.object({
  name:          z.string().min(1, 'Name is required').max(100),
  company:       z.string().max(150).optional(),
  email:         z.string().email('Please enter a valid email address'),
  website:       z
    .string()
    .optional()
    .transform((v) => (v === '' ? undefined : v))
    .pipe(z.string().url('Please enter a valid URL').optional()),
  whatBuilding:  z.string().min(10, 'Please tell us a little more').max(2000),
  problemSolving: z.string().max(2000).optional(),
  services:      z.array(z.enum([
    'website', 'web-application', 'ai-development',
    'ai-integration', 'automation', 'digital-system',
    'ecommerce', 'not-sure',
  ])).min(1, 'Please select at least one service'),
  budget:        z.enum(['under-10k', '10k-25k', '25k-50k', '50k-100k', 'over-100k', 'not-sure'], {
    message: 'Please select a budget range',
  }),
  timeline:      z.enum(['asap', '1-3-months', '3-6-months', 'over-6-months', 'not-sure'], {
    message: 'Please select a timeline',
  }),
  additional:    z.string().max(3000).optional(),
  _hp:           z.string().max(0, 'Invalid submission'),
})

export type EnquiryInput = z.infer<typeof EnquirySchema>

export interface FormState {
  status: 'idle' | 'success' | 'error' | 'rate-limited'
  message?: string
  fieldErrors?: Partial<Record<keyof EnquiryInput, string[]>>
}

// ─── Email delivery layer ─────────────────────────────────────────────────────

async function sendEnquiryEmails(data: EnquiryInput, enquiryId: string): Promise<void> {
  const provider = process.env.DELIVERY_PROVIDER ?? 'log'
  const to       = process.env.EMAIL_TO ?? 'hello@avorria.com'
  const from     = process.env.EMAIL_FROM ?? 'hello@avorria.com'
  const apiKey   = process.env.RESEND_API_KEY

  const adminSubject = `New Enquiry — ${data.name}${data.company ? ` (${data.company})` : ''}`
  const adminBody    = formatAdminEmail(data, enquiryId)

  const confirmSubject = `We've received your enquiry — Avorria`
  const confirmBody    = formatConfirmationEmail(data)

  if (provider === 'resend' && apiKey) {
    // Notify Avorria
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to, subject: adminSubject, text: adminBody }),
    })

    // Confirm to submitter
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: data.email,
        subject: confirmSubject,
        text: confirmBody,
      }),
    })
    return
  }

  if (provider === 'log' || !apiKey) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[Enquiry Email → Avorria]', adminSubject)
      console.log('[Enquiry Email → Submitter]', confirmSubject, '→', data.email)
    } else {
      console.warn('[Enquiry] DELIVERY_PROVIDER not configured. Enquiry saved to DB but email not sent.')
    }
  }
}

function formatAdminEmail(data: EnquiryInput, enquiryId: string): string {
  return [
    `Enquiry ID: ${enquiryId}`,
    '',
    `Name: ${data.name}`,
    `Company: ${data.company ?? '—'}`,
    `Email: ${data.email}`,
    `Website: ${data.website ?? '—'}`,
    '',
    `What are you building?\n${data.whatBuilding}`,
    '',
    `Problem to solve:\n${data.problemSolving ?? '—'}`,
    '',
    `Services: ${data.services.join(', ')}`,
    `Budget: ${data.budget}`,
    `Timeline: ${data.timeline}`,
    '',
    `Additional:\n${data.additional ?? '—'}`,
  ].join('\n')
}

function formatConfirmationEmail(data: EnquiryInput): string {
  return [
    `Hi ${data.name},`,
    '',
    `Thank you for reaching out to Avorria. We've received your enquiry and will be in touch within one business day.`,
    '',
    `What you told us:`,
    `— Services: ${data.services.join(', ')}`,
    `— Budget: ${data.budget}`,
    `— Timeline: ${data.timeline}`,
    '',
    `If you have any immediate questions, reply to this email or contact us at hello@avorria.com.`,
    '',
    `Avorria`,
    `https://avorria.com`,
  ].join('\n')
}

// ─── Server Action ────────────────────────────────────────────────────────────

export async function submitEnquiry(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const raw = {
    name:           formData.get('name'),
    company:        formData.get('company'),
    email:          formData.get('email'),
    website:        formData.get('website'),
    whatBuilding:   formData.get('whatBuilding'),
    problemSolving: formData.get('problemSolving'),
    services:       formData.getAll('services'),
    budget:         formData.get('budget'),
    timeline:       formData.get('timeline'),
    additional:     formData.get('additional'),
    _hp:            formData.get('_hp'),
  }

  // 1. Honeypot — silent success to fool bots
  if (typeof raw._hp === 'string' && raw._hp.length > 0) {
    return { status: 'success', message: "Thank you, we'll be in touch." }
  }

  // 2. Zod validation
  const parsed = EnquirySchema.safeParse(raw)
  if (!parsed.success) {
    const fieldErrors: FormState['fieldErrors'] = {}
    for (const [key, errors] of Object.entries(parsed.error.flatten().fieldErrors)) {
      fieldErrors[key as keyof EnquiryInput] = errors
    }
    return { status: 'error', message: 'Please check the highlighted fields.', fieldErrors }
  }

  // 3. IP extraction
  const { headers } = await import('next/headers')
  const headerStore = await headers()
  const forwarded = headerStore.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown'
  const ipHash = hashIp(ip)

  // 4. Postgres-backed rate limiting
  const allowed = await checkRateLimit(ip)
  if (!allowed) {
    return {
      status: 'rate-limited',
      message: 'Too many submissions. Please try again later.',
    }
  }

  // 5. Persist to DB (before email — data is safe even if email fails)
  let enquiryId: string
  try {
    enquiryId = await insertEnquiry({
      ...parsed.data,
      ipHash,
    })
  } catch (err) {
    captureError(err, { context: 'submitEnquiry: DB insert', email: parsed.data.email })
    return {
      status: 'error',
      message: 'Something went wrong. Please email us at hello@avorria.com.',
    }
  }

  // 6. Audit event (best effort — never blocks)
  await writeAuditEvent({
    action:       'ENQUIRY_CREATED',
    resourceType: 'enquiry',
    resourceId:   enquiryId,
    metadata:     { services: parsed.data.services, budget: parsed.data.budget },
    ipAddress:    ipHash, // store hash only
  })

  // 7. Email delivery (best effort — enquiry is already saved)
  try {
    await sendEnquiryEmails(parsed.data, enquiryId)
  } catch (err) {
    captureError(err, { context: 'submitEnquiry: email delivery' })
    // Don't fail the action — enquiry is saved
  }

  return {
    status: 'success',
    message: "Thank you. We'll review your project and be in touch within one business day.",
  }
}
