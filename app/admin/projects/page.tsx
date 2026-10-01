import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Project Governance // Admin // Avorria',
  robots: { index: false, follow: false },
}

interface AdminProjectRecord {
  id: string
  reference: string
  organisationName: string
  title: string
  status: 'DISCOVERY' | 'ACTIVE_SPRINT' | 'STAGING_REVIEW' | 'LIVE_SOVEREIGN' | 'ON_HOLD'
  sprintProgress: string
  leadArchitect: string
  contractValue: number
  targetCompletion: string
  repo: string
}

const activeProjects: AdminProjectRecord[] = [
  {
    id: 'prj-01',
    reference: 'AVR-PRJ-ALK',
    organisationName: 'Alkota Titanium Cycles Ltd',
    title: 'Bespoke Parametric Configurator & Headless Commerce',
    status: 'ACTIVE_SPRINT',
    sprintProgress: 'Sprint 2 of 4 (65%)',
    leadArchitect: 'Peter C. // Lead Principal',
    contractValue: 28500,
    targetCompletion: '2026-11-10',
    repo: 'github.com/alkota/platform',
  },
  {
    id: 'prj-02',
    reference: 'AVR-PRJ-VLX',
    organisationName: 'Velox Capital Partners',
    title: 'Institutional LP Reporting Portal & Secure Data Vault',
    status: 'DISCOVERY',
    sprintProgress: 'Sprint 0 // Scoping',
    leadArchitect: 'Staff Architect // Security Lead',
    contractValue: 34000,
    targetCompletion: '2026-12-05',
    repo: 'github.com/velox/lp-vault',
  },
  {
    id: 'prj-03',
    reference: 'AVR-PRJ-MED',
    organisationName: 'Meridian Maritime Solutions',
    title: 'Fleet Telemetry Dashboard & AIS Geofencing Engine',
    status: 'STAGING_REVIEW',
    sprintProgress: 'Sprint 3 of 3 (UAT Review)',
    leadArchitect: 'Peter C. // Lead Principal',
    contractValue: 24000,
    targetCompletion: '2026-10-18',
    repo: 'github.com/meridian/ais-gateway',
  },
  {
    id: 'prj-04',
    reference: 'AVR-PRJ-ELY',
    organisationName: 'Elysium BioLabs Ltd',
    title: 'High-Throughput Clinical Trials Data Pipeline',
    status: 'LIVE_SOVEREIGN',
    sprintProgress: 'Completed // In Retainer Support',
    leadArchitect: 'Infrastructure Principal',
    contractValue: 42000,
    targetCompletion: '2026-08-30',
    repo: 'github.com/elysium/trials-engine',
  },
]

const statusStyles: Record<AdminProjectRecord['status'], { label: string; badge: string }> = {
  DISCOVERY: { label: 'Discovery & Scoping', badge: 'border-blue-500/40 text-blue-400 bg-blue-950/20' },
  ACTIVE_SPRINT: { label: 'Active Sprint', badge: 'border-amber-500/40 text-amber-400 bg-amber-950/20' },
  STAGING_REVIEW: { label: 'Staging / UAT', badge: 'border-purple-500/40 text-purple-400 bg-purple-950/20' },
  LIVE_SOVEREIGN: { label: 'Live Sovereign', badge: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/20' },
  ON_HOLD: { label: 'On Hold', badge: 'border-white/20 text-white/40' },
}

export default function AdminProjectsPage() {
  const activeSprintsCount = activeProjects.filter((p) => p.status === 'ACTIVE_SPRINT').length
  const totalValue = activeProjects.reduce((sum, p) => sum + p.contractValue, 0)

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/40 mb-2">
            Engineering Governance & Sprint Control
          </p>
          <h1 className="text-3xl font-extralight text-white tracking-tight">
            Active Projects & Governance
          </h1>
          <p className="text-sm font-light text-white/60 mt-2 max-w-2xl">
            Live delivery tracking, sprint velocity, repository ownership telemetry, and sovereign client handovers.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5">
            4 ACTIVE REPOSITORIES MONITORED
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border border-white/10 p-5 bg-[#111]">
          <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">Active Sprints</p>
          <p className="text-2xl font-extralight text-amber-400 mt-1">{activeSprintsCount}</p>
          <p className="text-[11px] font-light text-white/40 mt-1">4-week delivery cycles</p>
        </div>
        <div className="border border-white/10 p-5 bg-[#111]">
          <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">Committed Contract Sum</p>
          <p className="text-2xl font-extralight text-white mt-1">£{totalValue.toLocaleString()}</p>
          <p className="text-[11px] font-light text-white/40 mt-1">Across 4 initiatives</p>
        </div>
        <div className="border border-white/10 p-5 bg-[#111]">
          <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">Code Sovereignty</p>
          <p className="text-2xl font-extralight text-emerald-400 mt-1">100%</p>
          <p className="text-[11px] font-light text-white/40 mt-1">Direct client git commits</p>
        </div>
        <div className="border border-white/10 p-5 bg-[#111]">
          <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">Lead Engineer Ratio</p>
          <p className="text-2xl font-extralight text-white mt-1">1 : 1</p>
          <p className="text-[11px] font-light text-white/40 mt-1">Dedicated principal accountability</p>
        </div>
      </div>

      {/* Projects Master Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-white/80">
            Project Master Index
          </h2>
          <span className="text-[11px] font-mono text-white/40">
            {activeProjects.length} Engagements Under Governance
          </span>
        </div>

        <div className="border border-white/10 bg-[#111] overflow-x-auto">
          <table className="w-full text-left text-xs font-light border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-[10px] font-mono uppercase tracking-wider text-white/40">
                <th className="py-3 px-4">Ref / Organisation</th>
                <th className="py-3 px-4">Initiative Title</th>
                <th className="py-3 px-4">Phase & Sprint State</th>
                <th className="py-3 px-4">Lead Principal</th>
                <th className="py-3 px-4">Value</th>
                <th className="py-3 px-4">Target Date</th>
                <th className="py-3 px-4 text-right">Repository</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-[11px]">
              {activeProjects.map((prj) => {
                const style = statusStyles[prj.status]
                return (
                  <tr key={prj.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4">
                      <div className="text-white font-sans text-xs">{prj.organisationName}</div>
                      <div className="text-white/40 text-[10px] font-mono">{prj.reference}</div>
                    </td>
                    <td className="py-4 px-4 font-sans text-xs text-white/80 max-w-xs">
                      {prj.title}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-block text-[9px] uppercase px-2 py-0.5 border ${style.badge} mb-1`}>
                        {style.label}
                      </span>
                      <div className="text-white/50 text-[10px] font-sans">{prj.sprintProgress}</div>
                    </td>
                    <td className="py-4 px-4 font-sans text-xs text-white/70">
                      {prj.leadArchitect}
                    </td>
                    <td className="py-4 px-4 text-white">
                      £{prj.contractValue.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-white/50 text-[10px]">
                      {prj.targetCompletion}
                    </td>
                    <td className="py-4 px-4 text-right font-mono text-[10px]">
                      <span className="text-emerald-400 bg-emerald-950/20 border border-emerald-500/20 px-2 py-0.5">
                        {prj.repo.split('/')[2]}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Governance & Quality Control Rules */}
      <div className="border border-white/10 p-6 bg-[#111] space-y-4">
        <h3 className="text-xs font-mono uppercase tracking-[0.15em] text-white/80">
          Avorria Engineering Governance Protocol
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-light text-white/60">
          <div>
            <span className="text-[10px] font-mono text-white uppercase block mb-1">01 // Strict Fixed 4-Week Scope</span>
            Build Sprints run on fixed 4-week cadences. We do not do indefinite time-and-materials. Scope is locked prior to Day 1 with binary acceptance tests.
          </div>
          <div>
            <span className="text-[10px] font-mono text-white uppercase block mb-1">02 // Weekly Epistemic Review</span>
            Every Friday 16:00 GMT, live deployed staging URLs are demonstrated directly to the client stakeholder. No slide decks; only running code.
          </div>
          <div>
            <span className="text-[10px] font-mono text-white uppercase block mb-1">03 // Full Intellectual Property Handover</span>
            Clients hold admin access to their own GitHub repository and Supabase database. Avorria retains zero proprietary lock-in.
          </div>
        </div>
      </div>
    </div>
  )
}
