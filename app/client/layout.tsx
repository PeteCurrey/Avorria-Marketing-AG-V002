import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { ClientNav } from '@/components/client/ClientNav'
import { getOrganisation } from '@/lib/db/organisation'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default async function ClientLayout({ children }: { children: ReactNode }) {
  const session = await getSession()

  // Unauthenticated: render children (login page handles its own UI)
  if (!session) {
    return <>{children}</>
  }

  // ADMIN and TEAM → admin portal
  if (session.user.role === 'ADMIN' || session.user.role === 'TEAM') {
    redirect('/admin/dashboard')
  }

  const org = session.user.organisationId
    ? await getOrganisation(session.user.organisationId)
    : null

  return (
    <div className="flex min-h-screen bg-[var(--color-ivory)]">
      <ClientNav user={session.user} organisationName={org?.name} />
      <main id="main-content" className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
