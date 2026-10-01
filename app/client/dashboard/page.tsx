import type { Metadata } from 'next'
import Link from 'next/link'
import { getSession } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Client Portal // Overview — Avorria',
  robots: { index: false, follow: false },
}

export default async function ClientDashboardPage() {
  const session = await getSession()
  const userName = session?.user?.name || 'Client Principal'

  return (
    <div className="p-8 md:p-12 max-w-6xl space-y-10">
      
      {/* Portal Header */}
      <div className="border-b border-black/10 pb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 block mb-1">
            CLIENT PORTAL // SECURE PROJECT TELEMETRY
          </span>
          <h1 className="text-2xl md:text-3xl font-light text-neutral-900">
            Welcome, {userName}.
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-light">
            ACTIVE SPRINT // WEEK 03
          </span>
        </div>
      </div>

      {/* Active Project Card */}
      <div className="border border-black/10 bg-white p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-neutral-100 pb-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 block mb-1">
              CURRENT ENGAGEMENT
            </span>
            <h2 className="text-xl font-light text-neutral-900">
              Parametric Configurator & Headless Commerce Architecture
            </h2>
          </div>
          <span className="px-3 py-1 border border-emerald-500/30 text-emerald-700 bg-emerald-50 text-xs font-mono uppercase tracking-widest self-start">
            SPRINT: IN DEVELOPMENT
          </span>
        </div>

        {/* Progress Bar & Telemetry */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-500 font-light">
            <span>MILESTONE PROGRESS: 65%</span>
            <span>TARGET SHIP: 18 BUSINESS DAYS</span>
          </div>
          <div className="w-full h-1.5 bg-neutral-100 overflow-hidden">
            <div className="h-full bg-neutral-900 w-[65%]" />
          </div>
        </div>

        {/* Sprint Epics Ledger */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="border border-neutral-100 p-4 space-y-1">
            <span className="text-[10px] font-mono text-neutral-400 block">EPIC 01 // COMPLETED</span>
            <p className="text-sm font-light text-neutral-800">Parametric Geometry Engine</p>
            <p className="text-xs text-neutral-400">Sub-16ms WebGL coordinate calculations verified.</p>
          </div>
          <div className="border border-neutral-200 bg-neutral-50/50 p-4 space-y-1">
            <span className="text-[10px] font-mono text-emerald-600 block">EPIC 02 // CURRENT SPRINT</span>
            <p className="text-sm font-light text-neutral-800">Stripe Multi-Currency Deposit Flow</p>
            <p className="text-xs text-neutral-500">Elements checkout pipeline in staging review.</p>
          </div>
          <div className="border border-neutral-100 p-4 space-y-1 opacity-60">
            <span className="text-[10px] font-mono text-neutral-400 block">EPIC 03 // NEXT SPRINT</span>
            <p className="text-sm font-light text-neutral-800">Workshop Operational Portal</p>
            <p className="text-xs text-neutral-400">Supabase technician queue & live order telemetry.</p>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/client/proposals"
          className="border border-black/10 bg-white p-6 hover:border-black/30 transition-colors space-y-2"
        >
          <span className="text-[10px] font-mono text-neutral-400 block">COMMERCIAL</span>
          <h3 className="text-base font-light text-neutral-900">Proposals & SOW</h3>
          <p className="text-xs text-neutral-500 font-light">View active proposals, digital sign-off, and deposit schedules.</p>
        </Link>

        <Link
          href="/client/deliverables"
          className="border border-black/10 bg-white p-6 hover:border-black/30 transition-colors space-y-2"
        >
          <span className="text-[10px] font-mono text-neutral-400 block">ASSETS</span>
          <h3 className="text-base font-light text-neutral-900">Deliverables</h3>
          <p className="text-xs text-neutral-500 font-light">Access production builds, staging URLs, and Figma design tokens.</p>
        </Link>

        <Link
          href="/client/documents"
          className="border border-black/10 bg-white p-6 hover:border-black/30 transition-colors space-y-2"
        >
          <span className="text-[10px] font-mono text-neutral-400 block">GOVERNANCE</span>
          <h3 className="text-base font-light text-neutral-900">Documents & IP</h3>
          <p className="text-xs text-neutral-500 font-light">Executed NDAs, contracts, architectural specs, and invoices.</p>
        </Link>

        <Link
          href="/client/messages"
          className="border border-black/10 bg-white p-6 hover:border-black/30 transition-colors space-y-2"
        >
          <span className="text-[10px] font-mono text-neutral-400 block">COMMUNICATIONS</span>
          <h3 className="text-base font-light text-neutral-900">Principal Comms</h3>
          <p className="text-xs text-neutral-500 font-light">Direct engineering dialogue, sprint debriefs, and decision log.</p>
        </Link>
      </div>

      {/* Infrastructure Sovereignty Status */}
      <div className="border border-neutral-200 bg-neutral-50 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-light text-neutral-600">
        <div className="flex items-center gap-3">
          <span className="font-mono text-neutral-400">[SOVEREIGNTY]</span>
          <span>GitHub Organization: <span className="font-mono text-neutral-900">Direct Client Sovereignty (Root Admin)</span></span>
        </div>
        <span className="font-mono text-neutral-400">CI/CD: AUTOMATED // EDGE: CLOUDFLARE</span>
      </div>

    </div>
  )
}
