import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MFA Required — Avorria',
  robots: { index: false, follow: false },
}

export default function AdminMfaPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 bg-[#090909] text-white">
      <div className="max-w-sm w-full">
        <p
          style={{
            fontSize: '0.6875rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#B5616A',
            marginBottom: '2rem',
            fontWeight: 300,
          }}
        >
          Security
        </p>
        <h1
          style={{
            fontSize: '1.75rem',
            fontWeight: 200,
            color: '#F5F2EC',
            marginBottom: '1.5rem',
          }}
        >
          Two-factor authentication required
        </h1>
        <p
          style={{
            color: '#8A8784',
            fontSize: '0.875rem',
            fontWeight: 300,
            lineHeight: 1.6,
          }}
        >
          TOTP challenge UI ships in Phase 2C. Contact hello@avorria.com if you
          need immediate access.
        </p>
      </div>
    </div>
  )
}
