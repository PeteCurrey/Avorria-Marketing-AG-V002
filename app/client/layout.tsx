import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { ClientNav } from '@/components/client/ClientNav'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

interface ClientLayoutProps {
  children: ReactNode
}

// Stub — replace with real data layer query when database is connected
async function getOrganisationName(orgId: string | null): Promise<string | undefined> {
  if (!orgId) return undefined
  // Future: return await db.organisation.findUnique({ where: { id: orgId } })?.name
  return 'Your Organisation'
}

export default async function ClientLayout({ children }: ClientLayoutProps) {
  const session = await getSession()

  if (!session) {
    return <>{children}</>
  }

  // ADMIN and TEAM users should use the admin portal
  if (session.user.role === 'ADMIN' || session.user.role === 'TEAM') {
    redirect('/admin/dashboard')
  }

  const organisationName = await getOrganisationName(session.user.organisationId)

  return (
    <div className="flex min-h-screen bg-[var(--color-ivory)]">
      <ClientNav user={session.user} organisationName={organisationName} />
      <main id="main-content" className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
