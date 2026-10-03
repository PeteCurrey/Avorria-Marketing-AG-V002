import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Client Portal // Settings — Avorria',
  robots: { index: false, follow: false },
}

export default async function ClientSettingsPage() {
  return (
    <div className="p-8 md:p-12 max-w-4xl space-y-10">
      {/* Header */}
      <div className="border-b border-black/10 pb-6">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 block mb-1">
          CLIENT PORTAL // WORKSPACE CONFIGURATION
        </span>
        <h1 className="text-2xl md:text-3xl font-light text-neutral-900">
          Client Workspace Settings
        </h1>
        <p className="text-xs text-neutral-500 font-light mt-1">
          Notifications, session preferences, and security settings.
        </p>
      </div>

      <div className="border border-black/10 bg-white p-8 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-neutral-100">
            <div>
              <p className="text-sm font-light text-neutral-900">Sprint Delivery Notifications</p>
              <p className="text-xs text-neutral-400 font-light">Receive real-time alerts when new milestones and deliverables are completed.</p>
            </div>
            <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-500/30">
              ENABLED
            </span>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-light text-neutral-900">Session Inactivity Timeout</p>
              <p className="text-xs text-neutral-400 font-light">Enforces re-authentication after inactivity to safeguard proprietary assets.</p>
            </div>
            <span className="text-xs font-mono text-neutral-600 bg-neutral-100 px-2 py-0.5">
              30 MINUTES
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
