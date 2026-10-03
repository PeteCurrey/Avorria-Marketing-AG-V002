import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Client Portal // Projects & Sprints — Avorria',
  robots: { index: false, follow: false },
}

export default async function ClientProjectsPage() {
  return (
    <div className="p-8 md:p-12 max-w-5xl space-y-10">
      
      {/* Header */}
      <div className="border-b border-black/10 pb-6">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 block mb-1">
          CLIENT PORTAL // PROJECT SPECIFICATIONS
        </span>
        <h1 className="text-2xl md:text-3xl font-light text-neutral-900">
          Projects & Active Roadmap
        </h1>
        <p className="text-xs text-neutral-500 font-light mt-1">
          Track sprint cycles, architecture specifications, and delivery epics.
        </p>
      </div>

      {/* Project Specs */}
      <div className="border border-black/10 bg-white p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-100 pb-4">
          <h2 className="text-xl font-light text-neutral-900">
            Alkota Titanium Cycles // Flagship Configurator
          </h2>
          <span className="font-mono text-xs text-neutral-400">REPO: github.com/alkota/platform</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-light">
          <div>
            <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">Current State</span>
            <p className="text-neutral-800 font-mono">SPRINT 02 OF 04</p>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">Tech Stack</span>
            <p className="text-neutral-800">Next.js 16 / React 19 / Canvas</p>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">Infrastructure</span>
            <p className="text-neutral-800">Supabase RLS & Cloudflare Edge</p>
          </div>
        </div>

        <div className="border-t border-neutral-100 pt-6 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-[0.15em] text-neutral-400">
            SPRINT PHASES & DELIVERY MILESTONES
          </h3>

          <div className="space-y-3">
            {[
              { code: 'SPRINT 01', title: 'Data Architecture & Geometry Model', status: 'COMPLETED', date: 'Delivered Sept 24' },
              { code: 'SPRINT 02', title: 'Interactive Canvas UI & Parametric Curves', status: 'IN_PROGRESS', date: 'Target: Oct 14' },
              { code: 'SPRINT 03', title: 'Stripe Elements Checkout & PDF Build Sheets', status: 'QUEUED', date: 'Target: Oct 28' },
              { code: 'SPRINT 04', title: 'UAT Acceptance Testing & Sovereign Repo Handover', status: 'QUEUED', date: 'Target: Nov 10' },
            ].map((sprint) => (
              <div key={sprint.code} className="p-4 border border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-neutral-400">{sprint.code}</span>
                  <span className="text-sm font-light text-neutral-900">{sprint.title}</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className={sprint.status === 'COMPLETED' ? 'text-emerald-600' : sprint.status === 'IN_PROGRESS' ? 'text-neutral-900' : 'text-neutral-400'}>
                    [{sprint.status}]
                  </span>
                  <span className="text-neutral-400">{sprint.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
