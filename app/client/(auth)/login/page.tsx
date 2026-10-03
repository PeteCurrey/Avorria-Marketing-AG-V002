'use client'

import { useActionState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { signInAction, type SignInFormState } from '@/lib/actions/auth'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { sanitizeClientRedirect } from '@/lib/utils/redirect'

const initial: SignInFormState = {}

function LoginForm() {
  const [state, action, isPending] = useActionState(signInAction, initial)
  const searchParams = useSearchParams()
  const status = searchParams.get('status')
  const errorCode = searchParams.get('error')
  const redirectParam = searchParams.get('redirect')
  const sanitizedRedirect = sanitizeClientRedirect(redirectParam)

  // Map known error codes to calm, clear messages without internal jargon
  let bannerError: string | null = null
  if (errorCode === 'session-expired') {
    bannerError = 'Your session has expired. Please sign in again.'
  } else if (errorCode === 'invalid-token') {
    bannerError = 'This password reset link is invalid or has already been used. Please request a new one.'
  } else if (errorCode === 'expired-token') {
    bannerError = 'This password reset link has expired. Please request a new reset link.'
  } else if (errorCode === 'network') {
    bannerError = 'Unable to connect to authentication services. Please check your network and try again.'
  } else if (errorCode === 'unexpected') {
    bannerError = 'An unexpected authentication error occurred. Please try again.'
  }

  const activeError = state.error || bannerError

  return (
    <div className="space-y-6">
      {/* Success banner if redirected after password reset */}
      {status === 'password-updated' && (
        <div
          role="status"
          className="p-3.5 border border-emerald-600/30 bg-emerald-500/10 text-[0.8125rem] font-light text-emerald-900 leading-relaxed flex items-start gap-2.5 rounded-[var(--radius-sm)]"
        >
          <span className="shrink-0 mt-0.5 text-xs text-emerald-700">✓</span>
          <span>Your password has been updated. Please sign in with your new credentials.</span>
        </div>
      )}

      {/* Global authentication or session error */}
      {activeError && (
        <div
          role="alert"
          className="p-3.5 border border-[#B5616A]/40 bg-[#B5616A]/10 text-[0.8125rem] font-light text-[#9A4A53] leading-relaxed flex items-start gap-2.5 rounded-[var(--radius-sm)]"
        >
          <span className="shrink-0 mt-0.5 text-xs text-[#9A4A53]">●</span>
          <span>{activeError}</span>
        </div>
      )}

      <form action={action} className="space-y-5" noValidate>
        {/* Preserved redirect destination */}
        <input type="hidden" name="redirect" value={sanitizedRedirect} />

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-[0.6875rem] font-light tracking-[0.12em] uppercase text-[var(--color-graphite-mid)] mb-2"
          >
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            disabled={isPending}
            aria-describedby={state.fieldErrors?.email ? 'email-error' : undefined}
            placeholder="name@company.com"
            className={[
              'w-full bg-white border px-3.5 py-3 text-[0.9375rem] font-light text-[var(--color-graphite)] placeholder:text-[var(--color-graphite-muted)]/60 rounded-[var(--radius-sm)]',
              'focus:outline-none focus:ring-1 transition-all duration-[var(--duration-fast)]',
              'disabled:opacity-60 disabled:cursor-not-allowed',
              state.fieldErrors?.email
                ? 'border-[var(--color-accent)] focus:border-[var(--color-accent)] focus:ring-[var(--color-accent)]'
                : 'border-[var(--color-border-strong)] focus:border-[var(--color-graphite)] focus:ring-[var(--color-graphite)]',
            ].join(' ')}
          />
          {state.fieldErrors?.email && (
            <p
              id="email-error"
              role="alert"
              className="text-[0.75rem] font-light text-[var(--color-rose-text)] mt-1.5 flex items-center gap-1.5"
            >
              <span>{state.fieldErrors.email[0]}</span>
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="password"
              className="block text-[0.6875rem] font-light tracking-[0.12em] uppercase text-[var(--color-graphite-mid)]"
            >
              Password
            </label>
            <Link
              href="/client/forgot-password"
              className="text-[0.75rem] font-light text-[var(--color-graphite-mid)] hover:text-[var(--color-graphite)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-graphite)]"
            >
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            disabled={isPending}
            aria-describedby={state.fieldErrors?.password ? 'password-error' : undefined}
            className={[
              'w-full bg-white border px-3.5 py-3 text-[0.9375rem] font-light text-[var(--color-graphite)] rounded-[var(--radius-sm)]',
              'focus:outline-none focus:ring-1 transition-all duration-[var(--duration-fast)]',
              'disabled:opacity-60 disabled:cursor-not-allowed',
              state.fieldErrors?.password
                ? 'border-[var(--color-accent)] focus:border-[var(--color-accent)] focus:ring-[var(--color-accent)]'
                : 'border-[var(--color-border-strong)] focus:border-[var(--color-graphite)] focus:ring-[var(--color-graphite)]',
            ].join(' ')}
          />
          {state.fieldErrors?.password && (
            <p
              id="password-error"
              role="alert"
              className="text-[0.75rem] font-light text-[var(--color-rose-text)] mt-1.5 flex items-center gap-1.5"
            >
              <span>{state.fieldErrors.password[0]}</span>
            </p>
          )}
        </div>

        {/* Primary CTA (Restrained Cobalt) */}
        <button
          type="submit"
          disabled={isPending}
          className={[
            'w-full bg-[var(--color-cobalt)] hover:bg-[#2546E0] border border-[var(--color-cobalt)] hover:border-[#2546E0]',
            'text-white py-3.5 px-6 text-[0.8125rem] font-light tracking-[0.1em] uppercase rounded-[var(--radius-sm)]',
            'transition-colors duration-[var(--duration-base)] cursor-pointer',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-cobalt)]',
            'disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2',
          ].join(' ')}
        >
          {isPending ? (
            <>
              <span
                className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"
                aria-hidden="true"
              />
              <span>Signing in…</span>
            </>
          ) : (
            <span>Sign in</span>
          )}
        </button>
      </form>
    </div>
  )
}

export default function ClientLoginPage() {
  return (
    <AuthLayout
      title="Welcome back."
      subtitle="Sign in to access your Avorria client workspace."
      badge="CLIENT PORTAL"
      backHref="/"
      backLabel="Back to Avorria"
      footerContent={
        <p className="text-[0.8125rem] font-light text-[var(--color-graphite-mid)]">
          Need access?{' '}
          <Link
            href="/contact"
            className="text-[var(--color-graphite)] underline underline-offset-4 hover:text-[var(--color-cobalt)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-graphite)]"
          >
            Contact us
          </Link>
        </p>
      }
    >
      <Suspense fallback={<div className="h-48 animate-pulse bg-black/5 rounded-[var(--radius-sm)]" />}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  )
}
