'use client'

import { useActionState } from 'react'
import { resetPasswordAction, type ResetPasswordFormState } from '@/lib/actions/auth'

const initial: ResetPasswordFormState = {}

export function ResetPasswordForm() {
  const [state, action, isPending] = useActionState(resetPasswordAction, initial)

  return (
    <div className="space-y-6">
      {state.error && (
        <div
          role="alert"
          className="p-3.5 border border-[#B5616A]/40 bg-[#B5616A]/10 text-[0.8125rem] font-light text-[#9A4A53] leading-relaxed flex items-start gap-2.5 rounded-[var(--radius-sm)]"
        >
          <span className="shrink-0 mt-0.5 text-xs text-[#9A4A53]">●</span>
          <span>{state.error}</span>
        </div>
      )}

      <form action={action} className="space-y-5" noValidate>
        {/* New Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-[0.6875rem] font-light tracking-[0.12em] uppercase text-[var(--color-graphite-mid)] mb-2"
          >
            New password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            disabled={isPending}
            aria-describedby={state.fieldErrors?.password ? 'password-error' : 'password-hint'}
            className={[
              'w-full bg-white border px-3.5 py-3 text-[0.9375rem] font-light text-[var(--color-graphite)] rounded-[var(--radius-sm)]',
              'focus:outline-none focus:ring-1 transition-all duration-[var(--duration-fast)]',
              'disabled:opacity-60 disabled:cursor-not-allowed',
              state.fieldErrors?.password
                ? 'border-[var(--color-accent)] focus:border-[var(--color-accent)] focus:ring-[var(--color-accent)]'
                : 'border-[var(--color-border-strong)] focus:border-[var(--color-graphite)] focus:ring-[var(--color-graphite)]',
            ].join(' ')}
          />
          <p id="password-hint" className="text-[0.6875rem] font-light text-[var(--color-graphite-muted)] mt-1.5">
            Must be at least 8 characters.
          </p>
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

        {/* Confirm New Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-[0.6875rem] font-light tracking-[0.12em] uppercase text-[var(--color-graphite-mid)] mb-2"
          >
            Confirm new password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            disabled={isPending}
            aria-describedby={state.fieldErrors?.confirmPassword ? 'confirm-error' : undefined}
            className={[
              'w-full bg-white border px-3.5 py-3 text-[0.9375rem] font-light text-[var(--color-graphite)] rounded-[var(--radius-sm)]',
              'focus:outline-none focus:ring-1 transition-all duration-[var(--duration-fast)]',
              'disabled:opacity-60 disabled:cursor-not-allowed',
              state.fieldErrors?.confirmPassword
                ? 'border-[var(--color-accent)] focus:border-[var(--color-accent)] focus:ring-[var(--color-accent)]'
                : 'border-[var(--color-border-strong)] focus:border-[var(--color-graphite)] focus:ring-[var(--color-graphite)]',
            ].join(' ')}
          />
          {state.fieldErrors?.confirmPassword && (
            <p
              id="confirm-error"
              role="alert"
              className="text-[0.75rem] font-light text-[var(--color-rose-text)] mt-1.5 flex items-center gap-1.5"
            >
              <span>{state.fieldErrors.confirmPassword[0]}</span>
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
              <span>Updating password…</span>
            </>
          ) : (
            <span>Update password</span>
          )}
        </button>
      </form>
    </div>
  )
}
