import type { Metadata } from 'next'
import { FinanceScenarioPlanner } from '@/components/admin/FinanceScenarioPlanner'

export const metadata: Metadata = {
  title: 'Financial Modeling // Admin // Avorria',
  robots: { index: false, follow: false },
}

export default function AdminFinancePage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/40 mb-2">
            Commercial Modeling & Cashflow Telemetry
          </p>
          <h1 className="text-3xl font-extralight text-white tracking-tight">
            Finance & Unit Economics
          </h1>
          <p className="text-sm font-light text-white/60 mt-2 max-w-2xl">
            Simulate revenue run-rates, sprint capacity constraints, retainer MRR expansion, and direct engineering margins.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5">
            DETERMINISTIC CASHFLOW ENGINE
          </span>
        </div>
      </div>

      {/* Interactive Planner */}
      <FinanceScenarioPlanner />

      {/* Strategic Capital Allocation Principles */}
      <div className="border border-white/10 p-6 bg-[#111] space-y-4">
        <h3 className="text-xs font-mono uppercase tracking-[0.15em] text-white/80">
          Avorria Commercial Discipline Principles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-light text-white/60">
          <div>
            <span className="text-[10px] font-mono text-white uppercase block mb-1">
              01 // 50% Capital Pre-Payment
            </span>
            Engineering sprints require a 50% non-negotiable deposit before git branching or sprint planning commences. This guarantees non-negative operational cashflow.
          </div>
          <div>
            <span className="text-[10px] font-mono text-white uppercase block mb-1">
              02 // Direct Engineering Cost Cap
            </span>
            Direct infrastructure and technical tooling costs are held strictly below 28% of project gross margin, protecting high net margins on custom development.
          </div>
          <div>
            <span className="text-[10px] font-mono text-white uppercase block mb-1">
              03 // Retainer Base Covers Fixed Studio Overhead
            </span>
            High-assurance technical retainers (security patching, performance SLAs, hotfixes) cover 100% of studio baseline overhead, making sprint revenue pure expansion capital.
          </div>
        </div>
      </div>
    </div>
  )
}
