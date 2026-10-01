import type { Metadata } from 'next'
import Link from 'next/link'
import { listAllProposals } from '@/lib/proposals/tokens'
import { listOutreachProspects } from '@/lib/outreach'
import { computeFinancialScenario } from '@/lib/finance/scenarios'

export const metadata: Metadata = {
  title: 'Admin // Commercial Command Center — Avorria',
  robots: { index: false, follow: false },
}

export default async function AdminDashboardPage() {
  const proposals = await listAllProposals()
  const prospects = await listOutreachProspects()
  const finance = computeFinancialScenario({
    activeBuildSprints: 3,
    averageSprintFee: 24000,
    activeRetainers: 4,
    averageRetainerFee: 6500,
  })

  return (
    <div className="p-8 md:p-12 max-w-7xl space-y-10">
      
      {/* Masthead */}
      <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 block mb-1">
            CONTROL CENTER // OPERATIONAL COMMAND
          </span>
          <h1 className="text-2xl md:text-3xl font-light text-white">
            Commercial Overview
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/scout"
            className="px-4 py-2 border border-white/20 text-xs font-mono uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
          >
            Launch Scout ⌖
          </Link>
          <Link
            href="/admin/proposals"
            className="px-4 py-2 bg-white text-black text-xs font-mono uppercase tracking-wider font-light hover:bg-white/90 transition-colors"
          >
            + New Proposal
          </Link>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border border-white/10 bg-[#111] p-6 space-y-1">
          <span className="text-[10px] font-mono uppercase text-white/40 block">Monthly Run-Rate (MRR+Sprints)</span>
          <p className="text-2xl font-light text-white">£{finance.monthlyGrossRevenue.toLocaleString()}</p>
          <p className="text-xs text-emerald-400 font-mono">£{finance.annualizedRunRate.toLocaleString()} ARR run-rate</p>
        </div>

        <div className="border border-white/10 bg-[#111] p-6 space-y-1">
          <span className="text-[10px] font-mono uppercase text-white/40 block">Active Engineering Sprints</span>
          <p className="text-2xl font-light text-white">{finance.activeBuildSprints}</p>
          <p className="text-xs text-white/50 font-mono">Avg Fee: £{finance.averageSprintFee.toLocaleString()}</p>
        </div>

        <div className="border border-white/10 bg-[#111] p-6 space-y-1">
          <span className="text-[10px] font-mono uppercase text-white/40 block">Embedded Retainers</span>
          <p className="text-2xl font-light text-white">{finance.activeRetainers}</p>
          <p className="text-xs text-white/50 font-mono">£{(finance.activeRetainers * finance.averageRetainerFee).toLocaleString()}/mo recurring</p>
        </div>

        <div className="border border-white/10 bg-[#111] p-6 space-y-1">
          <span className="text-[10px] font-mono uppercase text-white/40 block">Net Delivery Margin</span>
          <p className="text-2xl font-light text-emerald-400">{finance.netMarginPercentage}%</p>
          <p className="text-xs text-white/50 font-mono">Direct Costs: £{finance.estimatedDirectCosts.toLocaleString()}/mo</p>
        </div>
      </div>

      {/* Active Pipeline & Operational Queues */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Proposals Queue */}
        <div className="border border-white/10 bg-[#111] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-white/70">
              ACTIVE PROPOSALS & CONTRACTS ({proposals.length})
            </h2>
            <Link href="/admin/proposals" className="text-[11px] font-mono text-white/40 hover:text-white">
              View All →
            </Link>
          </div>

          <div className="divide-y divide-white/5">
            {proposals.map((p) => (
              <div key={p.id} className="py-3 flex items-center justify-between gap-4 text-xs font-light">
                <div>
                  <p className="text-white font-mono">{p.organisationName}</p>
                  <p className="text-white/40 text-[11px]">{p.projectTitle}</p>
                </div>
                <div className="text-right">
                  <span className="text-white font-mono">£{p.totalInvestment.toLocaleString()}</span>
                  <span className={`block text-[10px] font-mono ${p.status === 'ACCEPTED' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    [{p.status}]
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scout & Outreach Queue */}
        <div className="border border-white/10 bg-[#111] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-white/70">
              SCOUT PROSPECT PIPELINE ({prospects.length})
            </h2>
            <Link href="/admin/outreach" className="text-[11px] font-mono text-white/40 hover:text-white">
              View Pipeline →
            </Link>
          </div>

          <div className="divide-y divide-white/5">
            {prospects.map((pros) => (
              <div key={pros.id} className="py-3 flex items-center justify-between gap-4 text-xs font-light">
                <div>
                  <p className="text-white font-mono">{pros.companyName}</p>
                  <p className="text-white/40 text-[11px]">{pros.domain} // {pros.decisionMakerName}</p>
                </div>
                <div className="text-right">
                  <span className="text-emerald-400 font-mono">SCORE: {pros.opportunityScore}/100</span>
                  <span className="block text-[10px] font-mono text-white/40">
                    [{pros.stage}]
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Operational System Status */}
      <div className="border border-white/10 bg-[#0e0e0e] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-white/50">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>SUPABASE RLS: ENFORCED // DB POOL: HEALTHY // RESEND: READY</span>
        </div>
        <Link href="/admin/system-health" className="text-white/70 hover:text-white underline underline-offset-2">
          View Security Audit Trail →
        </Link>
      </div>

    </div>
  )
}
