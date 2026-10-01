import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Sign In — Avorria',
  robots: { index: false, follow: false },
}

// Admin login page — the layout.tsx for /admin/* redirects here when unauthenticated
// This page is OUTSIDE the auth guard (layout skips redirect for /admin/login)
// Full login UI ships in Phase 2C.
export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 bg-[#090909] text-white">
      <div className="w-full max-w-sm">
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
          Admin
        </p>
        <h1
          style={{
            fontSize: '1.75rem',
            fontWeight: 200,
            color: '#F5F2EC',
            marginBottom: '1.5rem',
          }}
        >
          Sign in
        </h1>
        <p
          style={{
            color: '#8A8784',
            fontSize: '0.875rem',
            fontWeight: 300,
            lineHeight: 1.6,
          }}
        >
          Admin login UI ships in Phase 2C. The Supabase Auth infrastructure,
          MFA enforcement, and session management are fully operational.
        </p>
      </div>
    </div>
  )
}
