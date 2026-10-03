'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { forgotPasswordAction, type ForgotPasswordFormState } from '@/lib/actions/auth'
import { AuthLayout } from '@/components/auth/AuthLayout'

const initial: ForgotPasswordFormState = {}

export default function ForgotPasswordPage() {
  const [state, action, isPending] = useActionState(forgotPasswordAction, initial)

  return (
    <AuthLayout
      title="Reset password."
      subtitle="Enter your work email address to receive a secure reset link."
      badge="CLIENT PORTAL"
      backHref="/client/login"
      backLabel="Back to sign in"
      footerContent={
        <p className="text-[0.8125rem] font-light text-[var(--color-graphite-mid)]">
          Remember your password?{' '}
          <Link
            href="/client/login"
            className="text-[var(--color-graphite)] underline underline-offset-4 hover:text-[var(--color-cobalt)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-graphite)]"
          >
            Sign in
          </Link>
        </p>
      }
    >
      <div className="space-y-6">
        {/* Success message */}
        {state.success ? (
          <div className="space-y-6">
            <div
              role="status"
              className="p-4 border border-emerald-600/30 bg-emerald-500/10 text-[0.8125rem] font-light text-emerald-950 leading-relaxed rounded-[var(--radius-sm)] space-y-2"
            >
              <div className="flex items-center gap-2 text-emerald-800 font-normal">
                <span>✓</span>
                <span>Check your email</span>
              </div>
              <p className="text-emerald-900/80">
                If an account exists for that email address, we&apos;ve sent instructions to reset your password.
              </p>
            </div>
            <Link
              href="/client/login"
              className="block text-center w-full bg-[var(--color-cobalt)] hover:bg-[#2546E0] border border-[var(--color-cobalt)] text-white py-3.5 px-6 text-[0.8125rem] font-light tracking-[0.1em] uppercase rounded-[var(--radius-sm)] transition-colors duration-[var(--duration-base)]"
            >
              Return to sign in
            </Link>
          </div>
        ) : (
          <form action={action} className="space-y-5" noValidate>
            {/* Global Error Notice */}
            {state.error && (
              <div
                role="alert"
                className="p-3.5 border border-[#B5616A]/40 bg-[#B5616A]/10 text-[0.8125rem] font-light text-[#9A4A53] leading-relaxed flex items-start gap-2.5 rounded-[var(--radius-sm)]"
              >
                <span className="shrink-0 mt-0.5 text-xs text-[#9A4A53]">●</span>
                <span>{state.error}</span>
              </div>
            )}

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
                  <span>Sending reset link…</span>
                </>
              ) : (
                <span>Send reset link</span>
              )}
            </button>
          </form>
        )}
      </div>
    </AuthLayout>
  )
}
