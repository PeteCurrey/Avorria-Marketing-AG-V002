import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getSession, checkMfa } from '@/lib/auth'
import { AdminNav } from '@/components/admin/AdminNav'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Admin — Avorria',
  robots: { index: false, follow: false },
}

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getSession()

  // Unauthenticated → admin login page (outside this guarded segment)
  if (!session) {
    redirect('/admin-login')
  }

  // Clients cannot access admin portal
  if (session.user.role === 'CLIENT') {
    redirect('/client/dashboard')
  }

  // TEAM and ADMIN require MFA (aal2) — redirect to MFA challenge
  const mfa = await checkMfa()
  if (!mfa.satisfied) {
    redirect('/admin-mfa')
  }

  return (
    <div className="flex min-h-screen bg-[#090909] text-white">
      <AdminNav user={session.user} />
      <main id="admin-main-content" className="flex-1 overflow-auto bg-[#0d0d0d]">
        {children}
      </main>
    </div>
  )
}
