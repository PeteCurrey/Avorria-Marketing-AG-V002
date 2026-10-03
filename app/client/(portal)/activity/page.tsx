import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Client Portal // Activity — Avorria',
  robots: { index: false, follow: false },
}

export default async function ClientActivityPage() {
  return (
    <div className="p-8 md:p-12 max-w-4xl space-y-10">
      {/* Header */}
      <div className="border-b border-black/10 pb-6">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 block mb-1">
          CLIENT PORTAL // WORKSPACE AUDIT LOG
        </span>
        <h1 className="text-2xl md:text-3xl font-light text-neutral-900">
          Activity & Audit Log
        </h1>
        <p className="text-xs text-neutral-500 font-light mt-1">
          Real-time activity and security events across your client portal.
        </p>
      </div>

      <div className="border border-black/10 bg-white p-8 space-y-4">
        <div className="flex items-center justify-between py-3 border-b border-neutral-100 text-xs font-mono text-neutral-600">
          <span>Authentication Session Initialised</span>
          <span className="text-neutral-400">Current Session</span>
        </div>
        <div className="flex items-center justify-between py-3 border-b border-neutral-100 text-xs font-mono text-neutral-600">
          <span>Project Specifications Synchronised</span>
          <span className="text-neutral-400">Automated</span>
        </div>
        <div className="flex items-center justify-between py-3 text-xs font-mono text-neutral-600">
          <span>Encrypted Vault Verified</span>
          <span className="text-neutral-400">Healthy</span>
        </div>
      </div>
    </div>
  )
}
