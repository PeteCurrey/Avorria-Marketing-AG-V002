/**
 * lib/monitoring.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Sentry-ready error monitoring hook.
 * Set SENTRY_DSN to activate Sentry. Without it, errors go to console.error.
 *
 * Usage: captureError(error, { context: 'enquiry submission', userId })
 * ─────────────────────────────────────────────────────────────────────────────
 */
import 'server-only'

export interface ErrorContext {
  context?: string
  userId?: string
  organisationId?: string
  action?: string
  [key: string]: unknown
}

/**
 * Captures a server-side error.
 * In production with SENTRY_DSN: reports to Sentry.
 * Without: console.error with sanitised details.
 */
export function captureError(error: unknown, ctx?: ErrorContext): void {
  const message = error instanceof Error ? error.message : String(error)
  const stack = error instanceof Error ? error.stack : undefined

  // Sentry integration — activate by installing @sentry/nextjs and setting SENTRY_DSN
  if (process.env.SENTRY_DSN) {
    try {
      // Dynamic import to avoid bundling Sentry when not configured
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const Sentry = require('@sentry/nextjs') as {
        captureException: (err: unknown, opts?: unknown) => void
        setContext: (key: string, data: Record<string, unknown>) => void
      }
      if (ctx) Sentry.setContext('avorria', ctx as Record<string, unknown>)
      Sentry.captureException(error)
    } catch {
      // Sentry not installed — fall through to console
    }
  }

  // Always log server-side (no PII — message only, no user data in message)
  console.error(
    `[Error]${ctx?.context ? ` ${ctx.context}` : ''}:`,
    message,
    process.env.NODE_ENV === 'development' ? stack : ''
  )
}

/**
 * Wraps an async function with error capture.
 * Usage: const result = await withMonitoring(() => submitEnquiry(data), { context: 'enquiry' })
 */
export async function withMonitoring<T>(
  fn: () => Promise<T>,
  ctx?: ErrorContext,
): Promise<T> {
  try {
    return await fn()
  } catch (err) {
    captureError(err, ctx)
    throw err
  }
}
