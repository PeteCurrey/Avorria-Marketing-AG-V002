// Admin MFA page does NOT use the admin auth-guard layout.
// This nested layout replaces the parent /admin/layout.tsx for this route only.
import type { ReactNode } from 'react'

export default function AdminMfaLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#090909]">
      {children}
    </div>
  )
}
