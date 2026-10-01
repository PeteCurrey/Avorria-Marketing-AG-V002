/**
 * lib/env.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Environment variable validation at server startup.
 * Fails loudly with descriptive messages — no silent undefined vars.
 *
 * Import this at the top of app/layout.tsx (server-only, top of module).
 * ─────────────────────────────────────────────────────────────────────────────
 */
import 'server-only'
import { z } from 'zod'

const EnvSchema = z.object({
  // Supabase — required
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .url('NEXT_PUBLIC_SUPABASE_URL must be a valid URL'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(1, 'NEXT_PUBLIC_SUPABASE_ANON_KEY is empty'),
  SUPABASE_SERVICE_ROLE_KEY: z
    .string()
    .min(1, 'SUPABASE_SERVICE_ROLE_KEY is empty'),

  // Site
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url('NEXT_PUBLIC_SITE_URL must be a valid URL'),

  // Email — optional (required for delivery in production)
  RESEND_API_KEY: z.string().optional().transform((v) => (v === '' ? undefined : v)),
  EMAIL_FROM: z.string().email().optional().default('hello@avorria.com'),
  EMAIL_TO: z.string().email().optional().default('hello@avorria.com'),
  DELIVERY_PROVIDER: z
    .enum(['log', 'resend', 'nodemailer', 'webhook'])
    .optional()
    .default('log'),

  // Rate limiting
  RATE_LIMIT_MAX: z.coerce.number().int().positive().optional().default(3),

  // Analytics — optional
  NEXT_PUBLIC_ANALYTICS_ID: z.string().optional().transform((v) => (v === '' ? undefined : v)),
  NEXT_PUBLIC_ANALYTICS_HOST: z
    .string()
    .optional()
    .transform((v) => (v === '' ? undefined : v))
    .pipe(z.string().url().optional()),

  // Environment flag
  NEXT_PUBLIC_ENVIRONMENT: z
    .enum(['development', 'staging', 'production'])
    .optional()
    .default('development'),

  // Seed guard — NEVER set in production
  SEED_ENABLED: z
    .enum(['true', 'false'])
    .optional()
    .default('false'),

  // Error monitoring
  SENTRY_DSN: z
    .string()
    .optional()
    .transform((v) => (v === '' ? undefined : v))
    .pipe(z.string().url().optional()),

  // Node environment
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .optional()
    .default('development'),
})

type Env = z.infer<typeof EnvSchema>

function validateEnv(): Env {
  const result = EnvSchema.safeParse(process.env)
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  • ${i.path.join('.')}: ${i.message}`)
      .join('\n')
    throw new Error(
      `[Avorria] Environment validation failed:\n${issues}\n\n` +
      'Check .env.local against .env.example and ensure all required variables are set.'
    )
  }
  return result.data
}

// Validated and typed env — throws at startup if invalid
export const env: Env = validateEnv()
