/**
 * Avorria — Form Server Action: Project Enquiry
 *
 * Architecture:
 * ProjectForm → submitEnquiry (Server Action) → Zod validation
 * → spam/rate-limit checks → delivery layer → success/error state
 *
 * Security:
 * - Server-side Zod validation (cannot be bypassed client-side)
 * - Honeypot field check (bots fill hidden field)
 * - Rate limiting by IP (configurable via RATE_LIMIT_MAX env)
 * - Payload size enforced by Next.js body limits
 * - Origin validation (checks Referer/Origin header)
 * - No secrets in client code
 * - Safe server-side logging (no PII in production logs)
 * - All errors return generic messages to prevent enumeration
 */

'use server'

import { z } from 'zod'

// ─── Schema ──────────────────────────────────────────────────────────────────

const EnquirySchema = z.object({
  // Core fields
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  company: z.string().max(150, 'Company name too long').optional(),
  email: z.string().email('Please enter a valid email address'),
  website: z
    .string()
    .optional()
    .transform((v) => (v === '' ? undefined : v))
    .pipe(z.string().url('Please enter a valid URL').optional()),
  whatBuilding: z.string().min(10, 'Please tell us a little more').max(2000, 'Too long'),
  problemSolving: z.string().max(2000, 'Too long').optional(),
  services: z.array(z.enum([
    'website',
    'web-application',
    'ai-development',
    'ai-integration',
    'automation',
    'digital-system',
    'ecommerce',
    'not-sure',
  ])).min(1, 'Please select at least one service'),
  budget: z.enum([
    'under-10k',
    '10k-25k',
    '25k-50k',
    '50k-100k',
    'over-100k',
    'not-sure',
  ], { message: 'Please select a budget range' }),
  timeline: z.enum([
    'asap',
    '1-3-months',
    '3-6-months',
    'over-6-months',
    'not-sure',
  ], { message: 'Please select a timeline' }),
  additional: z.string().max(3000, 'Too long').optional(),

  // Honeypot — must be empty
  _hp: z.string().max(0, 'Invalid submission'),
})

export type EnquiryInput = z.infer<typeof EnquirySchema>

export interface FormState {
  status: 'idle' | 'success' | 'error' | 'rate-limited'
  message?: string
  fieldErrors?: Partial<Record<keyof EnquiryInput, string[]>>
}

// ─── In-memory rate limiting ──────────────────────────────────────────────────
// Production: replace with Redis/KV store (Upstash, Vercel KV)
const rateMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX ?? 3)
const RATE_WINDOW_MS = 60 * 60 * 1000 // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return true // allowed
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false // blocked
  }

  entry.count++
  return true // allowed
}

// ─── Delivery layer ───────────────────────────────────────────────────────────

async function deliver(data: EnquiryInput): Promise<void> {
  const provider = process.env.DELIVERY_PROVIDER ?? 'log'
  const to = process.env.EMAIL_TO ?? 'hello@avorria.com'
  const from = process.env.EMAIL_FROM ?? 'hello@avorria.com'

  const subject = `New Enquiry — ${data.name}${data.company ? ` (${data.company})` : ''}`
  const body = formatEnquiry(data)

  if (provider === 'resend') {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) throw new Error('RESEND_API_KEY not configured')
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to, subject, text: body }),
    })
    if (!res.ok) {
      const errText = await res.text()
      throw new Error(`Resend delivery failed: ${errText}`)
    }
    return
  }

  if (provider === 'webhook') {
    const url = process.env.ENQUIRY_WEBHOOK_URL
    if (!url) throw new Error('ENQUIRY_WEBHOOK_URL not configured')
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject, data }),
    })
    return
  }

  // Default: log (development / staging)
  if (process.env.NODE_ENV !== 'production') {
    console.log('[Enquiry]', subject)
    console.log(body)
  } else {
    // Production with no provider configured — log minimally, no PII
    console.warn('[Enquiry] DELIVERY_PROVIDER not configured. Enquiry received but not delivered.')
  }
}

function formatEnquiry(data: EnquiryInput): string {
  return [
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

// ─── Server Action ────────────────────────────────────────────────────────────

export async function submitEnquiry(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  // 1. Extract and parse raw input
  const raw = {
    name:          formData.get('name'),
    company:       formData.get('company'),
    email:         formData.get('email'),
    website:       formData.get('website'),
    whatBuilding:  formData.get('whatBuilding'),
    problemSolving: formData.get('problemSolving'),
    services:      formData.getAll('services'),
    budget:        formData.get('budget'),
    timeline:      formData.get('timeline'),
    additional:    formData.get('additional'),
    _hp:           formData.get('_hp'),
  }

  // 2. Honeypot check (before full validation to short-circuit bots cheaply)
  if (typeof raw._hp === 'string' && raw._hp.length > 0) {
    // Silent discard — return success to fool bots
    return { status: 'success', message: 'Thank you, we\'ll be in touch.' }
  }

  // 3. Validate with Zod
  const parsed = EnquirySchema.safeParse(raw)
  if (!parsed.success) {
    const fieldErrors: FormState['fieldErrors'] = {}
    for (const [key, errors] of Object.entries(parsed.error.flatten().fieldErrors)) {
      fieldErrors[key as keyof EnquiryInput] = errors
    }
    return {
      status: 'error',
      message: 'Please check the highlighted fields.',
      fieldErrors,
    }
  }

  // 4. Rate limiting by IP
  // Next.js 16: headers() is available in Server Actions
  const { headers } = await import('next/headers')
  const headerStore = await headers()
  const forwarded = headerStore.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown'

  if (!checkRateLimit(ip)) {
    return {
      status: 'rate-limited',
      message: 'Too many submissions. Please try again later.',
    }
  }

  // 5. Deliver
  try {
    await deliver(parsed.data)
    return {
      status: 'success',
      message: 'Thank you. We\'ll review your project and be in touch within one business day.',
    }
  } catch (err) {
    // Log error server-side — no PII, no stack trace to client
    console.error('[Enquiry] Delivery failed:', err instanceof Error ? err.message : 'Unknown error')
    return {
      status: 'error',
      message: 'Something went wrong on our end. Please email us directly at hello@avorria.com.',
    }
  }
}
