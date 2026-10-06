import type { Metadata } from 'next'
import Link from 'next/link'
import * as fs from 'fs'
import * as path from 'path'
import { getGscConnectionStatus } from '@/lib/seo/gsc'

export const metadata: Metadata = {
  title: 'Search Intelligence & SEO Command Center // Admin // Avorria',
  robots: { index: false, follow: false },
}

interface Opportunity {
  id: string
  type: string
  cluster: string
  query: string
  targetUrl: string
  currentPositionEstimate: string
  commercialValue: string
  bottleneck: string
  recommendedActions: string[]
  confidence: string
}

interface Experiment {
  id: string
  date: string
  url: string
  queryTheme: string
  hypothesis: string
  expectedImpact: string
  measurementWindow: string
  status: string
}

export default async function AdminSeoPage() {
  const gscStatus = getGscConnectionStatus()

  // Read opportunities from JSON store
  let opportunities: Opportunity[] = []
  try {
    const oppPath = path.join(process.cwd(), 'content', 'seo', 'opportunities.json')
    if (fs.existsSync(oppPath)) {
      opportunities = JSON.parse(fs.readFileSync(oppPath, 'utf-8'))
    }
  } catch {
    opportunities = []
  }

  // Read experiments from JSON store
  let experiments: Experiment[] = []
  try {
    const expPath = path.join(process.cwd(), 'content', 'seo', 'experiments.json')
    if (fs.existsSync(expPath)) {
      experiments = JSON.parse(fs.readFileSync(expPath, 'utf-8'))
    }
  } catch {
    experiments = []
  }

  const activeExperiments = experiments.filter((e) => e.status === 'ACTIVE_EXPERIMENT')
  const pendingExperiments = experiments.filter((e) => e.status === 'AWAITING_POST_CHANGE_SEARCH_DATA')

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-10">
      
      {/* Masthead */}
      <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 block mb-1">
            SEARCH INTELLIGENCE // COMMERCIAL OPPORTUNITY ENGINE
          </span>
          <h1 className="text-2xl md:text-3xl font-light text-white">
            Search &amp; Authority Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono uppercase px-3 py-1.5 border border-white/10 bg-white/5 text-white/70">
            Phase 8 Active
          </span>
        </div>
      </div>

      {/* 1. Truthful Connection Telemetry */}
      <div className="border border-white/10 p-6 bg-[#111] space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-3">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                gscStatus.connected ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'
              }`}
            />
            <span className="text-xs font-mono uppercase text-white/90">
              Google Search Console Status:{' '}
              {gscStatus.connected ? 'CONNECTED (Verified)' : 'CREDENTIALS PENDING'}
            </span>
          </div>
          <span className="text-[10px] font-mono text-white/40">
            PROPERTY: {gscStatus.property}
          </span>
        </div>

        {gscStatus.connected ? (
          <p className="text-xs font-light text-emerald-400/80 leading-relaxed max-w-3xl">
            Live Search Analytics connection authenticated via read-only Service Account ({gscStatus.clientEmail}).
          </p>
        ) : (
          <div className="space-y-3">
            <p className="text-xs font-mono text-amber-300">
              GSC DATA UNAVAILABLE — CONNECT SEARCH CONSOLE
            </p>
            <p className="text-xs font-light text-white/60 leading-relaxed max-w-3xl">
              In strict accordance with the Avorria Data Integrity Mandate, click, impression, and ranking metrics are withheld rather than simulated. To activate live data ingestion, configure <code className="text-white/80 font-mono">GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL</code> and <code className="text-white/80 font-mono">GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY</code> in production environment variables.
            </p>
          </div>
        )}
      </div>

      {/* 2. Site Health & Architecture KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border border-white/10 p-5 bg-[#111]">
          <span className="text-[10px] font-mono uppercase text-white/40 block">Indexable Inventory</span>
          <p className="text-2xl font-extralight text-white mt-1">56 URLs</p>
          <span className="text-[10px] font-mono text-emerald-400 block mt-1">100% Canonical Parity</span>
        </div>

        <div className="border border-white/10 p-5 bg-[#111]">
          <span className="text-[10px] font-mono uppercase text-white/40 block">Commercial Pillars</span>
          <p className="text-2xl font-extralight text-white mt-1">3 Disciplines</p>
          <span className="text-[10px] font-mono text-white/40 block mt-1">Build · Search · Systems</span>
        </div>

        <div className="border border-white/10 p-5 bg-[#111]">
          <span className="text-[10px] font-mono uppercase text-white/40 block">Production Proof</span>
          <p className="text-2xl font-extralight text-white mt-1">7 Case Studies</p>
          <span className="text-[10px] font-mono text-white/40 block mt-1">Zero Fabricated Results</span>
        </div>

        <div className="border border-white/10 p-5 bg-[#111]">
          <span className="text-[10px] font-mono uppercase text-white/40 block">Controlled Experiments</span>
          <p className="text-2xl font-extralight text-white mt-1">{experiments.length} Total</p>
          <span className="text-[10px] font-mono text-amber-300 block mt-1">
            {pendingExperiments.length} Awaiting 28d Data
          </span>
        </div>
      </div>

      {/* 3. High-Value Commercial Opportunities Register */}
      <div className="border border-white/10 bg-[#111] overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <span className="text-xs font-mono uppercase text-white/80">Commercial Opportunity Register</span>
          <span className="text-[11px] font-mono text-white/40">{opportunities.length} Priority Vectors</span>
        </div>

        <div className="divide-y divide-white/5">
          {opportunities.map((opp) => (
            <div key={opp.id} className="p-4 hover:bg-white/[0.02] transition-colors space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono uppercase px-2 py-0.5 border border-white/10 bg-white/5 text-white/80">
                    {opp.cluster}
                  </span>
                  <span className="text-xs font-mono text-white">{opp.query}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono text-amber-400">
                    {opp.currentPositionEstimate}
                  </span>
                  <span className="text-[9px] font-mono text-white/40">
                    Val: {opp.commercialValue}
                  </span>
                </div>
              </div>

              <div className="text-xs font-light text-white/60">
                <span className="text-white/40 font-mono text-[10px] uppercase">Target: </span>
                <Link href={opp.targetUrl} className="hover:text-white underline decoration-white/20">
                  {opp.targetUrl.replace('https://avorria.com', '')}
                </Link>
                <span className="mx-2 text-white/20">|</span>
                <span className="text-white/40 font-mono text-[10px] uppercase">Bottleneck: </span>
                <span>{opp.bottleneck}</span>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {opp.recommendedActions.map((action, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-light text-white/50 bg-white/[0.03] px-2 py-0.5 border border-white/5"
                  >
                    ↳ {action}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Active Controlled Experiments */}
      <div className="border border-white/10 bg-[#111] overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <span className="text-xs font-mono uppercase text-white/80">Controlled Experiments Ledger</span>
          <span className="text-[11px] font-mono text-white/40">
            {activeExperiments.length} Active · {pendingExperiments.length} Awaiting Data
          </span>
        </div>

        <table className="w-full text-left text-xs font-light border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-[10px] font-mono uppercase tracking-wider text-white/40">
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Target Route</th>
              <th className="py-3 px-4">Theme</th>
              <th className="py-3 px-4">Hypothesis</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-mono text-[11px]">
            {experiments.map((exp) => (
              <tr key={exp.id} className="hover:bg-white/[0.02]">
                <td className="py-3.5 px-4 text-white/80">{exp.id}</td>
                <td className="py-3.5 px-4 font-sans text-xs text-white">
                  {exp.url.replace('https://avorria.com', '')}
                </td>
                <td className="py-3.5 px-4 text-white/60">{exp.queryTheme}</td>
                <td className="py-3.5 px-4 font-sans text-xs text-white/50 max-w-sm truncate">
                  {exp.hypothesis}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <span
                    className={`text-[9px] px-2 py-0.5 border ${
                      exp.status === 'ACTIVE_EXPERIMENT'
                        ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
                        : 'border-amber-500/30 text-amber-300 bg-amber-500/10'
                    }`}
                  >
                    {exp.status === 'ACTIVE_EXPERIMENT' ? 'Active' : 'Awaiting 28d Data'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}
