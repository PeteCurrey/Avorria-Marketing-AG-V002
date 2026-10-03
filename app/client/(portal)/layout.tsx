import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { ClientNav } from '@/components/client/ClientNav'
import { getOrganisation } from '@/lib/db/organisation'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

/**
 * ClientPortalLayout — Server-Side Authentication Guard
 *
 * Every protected /client/* route within this segment requires a verified session.
 * Unauthenticated requests are immediately aborted and redirected to /client/login.
 * No protected telemetry, project specifications, documents, or client data are
 * ever rendered or transferred for unauthenticated requests.
 */
export default async function ClientPortalLayout({ children }: { children: ReactNode }) {
  const session = await getSession()

  // STRICT SERVER GUARD: unauthenticated requests cannot proceed
  if (!session) {
    redirect('/client/login')
  }

  // ADMIN and TEAM staff are directed to the admin portal
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
