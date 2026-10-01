'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { signInAction, type SignInFormState } from '@/lib/actions/auth'

const initial: SignInFormState = {}

export default function ClientLoginPage() {
  const [state, action, isPending] = useActionState(signInAction, initial)

  return (
    <div className="min-h-screen bg-[var(--color-ivory)] flex items-center justify-center px-6">
      <div className="w-full max-w-[380px]">

        {/* Wordmark */}
        <Link
          href="/"
          className="block text-[0.75rem] font-light tracking-[0.2em] uppercase text-[var(--color-graphite)] hover:text-[var(--color-accent)] transition-colors duration-[var(--duration-base)] mb-16"
          aria-label="Avorria — Back to website"
        >
          AVORRIA
        </Link>

        {/* Heading */}
        <div className="border-b border-[var(--color-border)] pb-8 mb-10">
          <p className="text-[var(--text-label)] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)] mb-2">
            Client portal
          </p>
          <h1 className="text-[2rem] font-extralight text-[var(--color-graphite)] leading-tight">
            Sign in
          </h1>
        </div>

        {/* Form */}
        <form action={action} className="space-y-6" noValidate>
          {/* Global error */}
          {state.error && (
            <div
              role="alert"
              className="text-[var(--text-small)] font-light text-[var(--color-accent)] border border-[var(--color-accent)] px-4 py-3"
            >
              {state.error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-[var(--text-label)] font-light tracking-[0.1em] uppercase text-[var(--color-graphite-muted)] mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              aria-describedby={state.fieldErrors?.email ? 'email-error' : undefined}
              className="w-full bg-transparent border border-[var(--color-border)] px-4 py-3 text-[var(--text-small)] font-light text-[var(--color-graphite)] focus:outline-none focus:border-[var(--color-graphite)] transition-colors duration-[var(--duration-fast)]"
            />
            {state.fieldErrors?.email && (
              <p id="email-error" role="alert" className="text-[var(--text-label)] font-light text-[var(--color-accent)] mt-2">
                {state.fieldErrors.email[0]}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-[var(--text-label)] font-light tracking-[0.1em] uppercase text-[var(--color-graphite-muted)] mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              aria-describedby={state.fieldErrors?.password ? 'password-error' : undefined}
              className="w-full bg-transparent border border-[var(--color-border)] px-4 py-3 text-[var(--text-small)] font-light text-[var(--color-graphite)] focus:outline-none focus:border-[var(--color-graphite)] transition-colors duration-[var(--duration-fast)]"
            />
            {state.fieldErrors?.password && (
              <p id="password-error" role="alert" className="text-[var(--text-label)] font-light text-[var(--color-accent)] mt-2">
                {state.fieldErrors.password[0]}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full border border-[var(--color-graphite)] bg-[var(--color-graphite)] text-[var(--color-ivory)] px-6 py-3 text-[var(--text-label)] font-light tracking-[0.1em] uppercase hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-[var(--duration-base)]"
          >
            {isPending ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
          <p className="text-[var(--text-label)] font-light text-[var(--color-graphite-muted)]">
            Need access?{' '}
            <Link href="/contact" className="text-[var(--color-graphite)] underline underline-offset-2 hover:text-[var(--color-accent)] transition-colors">
              Contact us
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}
