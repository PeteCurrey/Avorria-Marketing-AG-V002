'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Report to monitoring on client-side and ensure console visibility
    console.error('[GlobalError]', error?.message || error, error?.digest)
  }, [error])

  return (
    <html lang="en-GB">
      <body>
        <div className="flex min-h-screen items-center justify-center p-6 bg-[#F5F2EC]">
          <div className="max-w-sm w-full text-center">
            <p
              style={{
                fontSize: '0.6875rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#9A4A53',
                marginBottom: '1.5rem',
                fontWeight: 300,
              }}
            >
              Error
            </p>
            <h1
              style={{
                fontSize: '1.75rem',
                fontWeight: 200,
                color: '#1E1D1B',
                marginBottom: '1.5rem',
              }}
            >
              Something went wrong
            </h1>
            <p
              style={{
                color: '#4A4845',
                fontSize: '1rem',
                fontWeight: 300,
                marginBottom: '2.5rem',
                lineHeight: 1.6,
              }}
            >
              An unexpected error occurred. Our team has been notified.
            </p>
            <button
              onClick={reset}
              style={{
                padding: '0.75rem 2rem',
                background: '#1E1D1B',
                color: '#F5F2EC',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 300,
                letterSpacing: '0.04em',
              }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
