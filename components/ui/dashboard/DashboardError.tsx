/**
 * components/ui/dashboard/DashboardError.tsx
 * Calm, specific error state with next step. Never "Oops".
 * Used as fallback in error.tsx files throughout the portal.
 */
'use client'
import { useEffect } from 'react'

interface DashboardErrorProps {
  error: Error & { digest?: string }
  reset: () => void
  title?: string
  body?: string
}

export function DashboardError({
  error,
  reset,
  title = 'Something went wrong',
  body = 'An error occurred loading this page. Please try again, or contact hello@avorria.com if the problem persists.',
}: DashboardErrorProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      console.error('[DashboardError]', error.message, error.digest)
    }
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] py-20 px-6 text-center">
      <p className="text-[0.6875rem] font-light tracking-[0.16em] uppercase text-[var(--color-rose-text)] mb-3">
        Error
      </p>
      <h2 className="text-[var(--text-heading)] font-[200] text-[var(--color-graphite)] mb-4">
        {title}
      </h2>
      <p className="text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] max-w-[400px] leading-relaxed mb-8">
        {body}
      </p>
      <button
        onClick={reset}
        className="text-[var(--text-small)] font-light text-[var(--color-graphite)] underline underline-offset-4 decoration-[var(--color-border-strong)] hover:decoration-[var(--color-graphite)] transition-all duration-200"
      >
        Try again
      </button>
    </div>
  )
}
