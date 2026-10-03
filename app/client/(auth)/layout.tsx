import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import type { ReactNode } from 'react'

/**
 * ClientAuthLayout
 *
 * Guard for unauthenticated authentication routes (/client/login, etc.).
 * If a visitor already has an active authenticated session, redirect them
 * to the client portal dashboard immediately — never render the login form.
 */
export default async function ClientAuthLayout({ children }: { children: ReactNode }) {
  const session = await getSession()

  if (session) {
    if (session.user.role === 'ADMIN' || session.user.role === 'TEAM') {
      redirect('/admin/dashboard')
    }
    redirect('/client/dashboard')
  }

  return <>{children}</>
}
