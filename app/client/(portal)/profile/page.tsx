import type { Metadata } from 'next'
import { getSession } from '@/lib/auth'
import { getOrganisation } from '@/lib/db/organisation'

export const metadata: Metadata = {
  title: 'Client Portal // Profile — Avorria',
  robots: { index: false, follow: false },
}

export default async function ClientProfilePage() {
  const session = await getSession()
  const user = session?.user
  const org = user?.organisationId ? await getOrganisation(user.organisationId) : null

  return (
    <div className="p-8 md:p-12 max-w-4xl space-y-10">
      {/* Header */}
      <div className="border-b border-black/10 pb-6">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 block mb-1">
          CLIENT PORTAL // ACCOUNT PROFILE
        </span>
        <h1 className="text-2xl md:text-3xl font-light text-neutral-900">
          User Profile & Access
        </h1>
        <p className="text-xs text-neutral-500 font-light mt-1">
          Verified client credentials and workspace membership.
        </p>
      </div>

      {/* Profile Details Card */}
      <div className="border border-black/10 bg-white p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
              Account Name
            </label>
            <p className="text-sm font-light text-neutral-900">
              {user?.name || 'Client Principal'}
            </p>
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
              Work Email
            </label>
            <p className="text-sm font-light text-neutral-900">
              {user?.email || '—'}
            </p>
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
              Organisation
            </label>
            <p className="text-sm font-light text-neutral-900">
              {org?.name || 'Avorria Client Partner'}
            </p>
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
              Access Role
            </label>
            <span className="inline-block px-2.5 py-0.5 border border-emerald-500/30 text-emerald-700 bg-emerald-50 text-[11px] font-mono uppercase tracking-wider">
              {user?.role || 'CLIENT'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
