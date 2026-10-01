'use client'

import { Button } from '@/components/ui/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="section-y-large">
      <div className="container-max">
        <div className="container-content">
          <div className="border-b border-[var(--color-border)] pb-16 mb-16">
            <p className="text-label-upper mb-6 text-muted">Error</p>
            <h1 className="text-display-l max-w-[600px]">
              Something went wrong.
            </h1>
          </div>
          <p className="text-body-l text-secondary mb-10 max-w-[480px]">
            An unexpected error occurred. Please try again, or contact us
            if the problem persists.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="md" onClick={reset}>
              Try again
            </Button>
            <Button as="link" href="/" variant="ghost" size="md">
              Go to homepage
            </Button>
            <Button as="link" href="/contact" variant="ghost" size="md">
              Contact us
            </Button>
          </div>
          {process.env.NODE_ENV === 'development' && error.message && (
            <pre className="mt-10 p-4 border border-[var(--color-accent)] text-[var(--text-small)] text-[var(--color-accent)] overflow-auto">
              {error.message}
            </pre>
          )}
        </div>
      </div>
    </div>
  )
}
