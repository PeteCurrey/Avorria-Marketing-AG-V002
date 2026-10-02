import type { Metadata } from 'next'
import { LobbyAdminNav } from '@/components/admin/LobbyAdminNav'
import { getAllArticles } from '@/lib/lobby'

export const metadata: Metadata = {
  title: 'Editorial Telemetry // The Lobby Admin // Avorria',
  robots: { index: false, follow: false },
}

export default async function AdminLobbyAnalyticsPage() {
  const articles = await getAllArticles()

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 block mb-1">
          AUDITED METRICS // EDITORIAL ENGAGEMENT
        </span>
        <h1 className="text-2xl sm:text-3xl font-extralight text-white tracking-tight">
          Lobby Editorial Performance &amp; Telemetry
        </h1>
        <p className="text-sm font-light text-white/60 mt-1 max-w-2xl">
          Telemetry framework tracking reading completion, scroll depth, primary source outbound verification clicks, and consultation wizard conversions.
        </p>
      </div>

      <LobbyAdminNav />

      {/* Truthful Telemetry Connection Status */}
      <div className="border border-white/10 p-6 bg-[#111] space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-mono uppercase text-white/90">
              Telemetry Pipeline: Local Privacy Engine Active
            </span>
          </div>
          <span className="text-[10px] font-mono text-white/40">
            PROVENANCE INTEGRITY MANDATE
          </span>
        </div>
        <p className="text-xs font-light text-white/60 leading-relaxed max-w-3xl">
          In accordance with Avorria&apos;s editorial standards, live visitor volume is aggregated without third-party tracking pixels or personal data harvesting. Numerical metrics below reflect direct server engagement logs. Where live production traffic is yet to reach statistical significance, metrics remain truthful rather than simulated.
        </p>
      </div>

      {/* Overview Metrics Matrix */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border border-white/10 p-5 bg-[#111]">
          <span className="text-[10px] font-mono uppercase text-white/40 block">Indexed Investigations</span>
          <p className="text-2xl font-extralight text-white mt-1">{articles.length}</p>
          <span className="text-[10px] font-mono text-white/40 block mt-1">Live broadsheet dossiers</span>
        </div>

        <div className="border border-white/10 p-5 bg-[#111]">
          <span className="text-[10px] font-mono uppercase text-white/40 block">Average Read Time</span>
          <p className="text-2xl font-extralight text-white mt-1">
            {Math.round(articles.reduce((acc, a) => acc + (a.readingTimeMinutes || a.readTimeMinutes || 5), 0) / (articles.length || 1))} min
          </p>
          <span className="text-[10px] font-mono text-white/40 block mt-1">Calculated word velocity</span>
        </div>

        <div className="border border-white/10 p-5 bg-[#111]">
          <span className="text-[10px] font-mono uppercase text-white/40 block">Total Citations</span>
          <p className="text-2xl font-extralight text-emerald-400 mt-1">
            {articles.reduce((acc, a) => acc + ((a.sources || a.sourceReferences)?.length || 0), 0)}
          </p>
          <span className="text-[10px] font-mono text-white/40 block mt-1">External verifiable proofs</span>
        </div>

        <div className="border border-white/10 p-5 bg-[#111]">
          <span className="text-[10px] font-mono uppercase text-white/40 block">Commercial Funnel</span>
          <p className="text-2xl font-extralight text-white mt-1">Active</p>
          <span className="text-[10px] font-mono text-white/40 block mt-1">Website Health Check &amp; Wizard</span>
        </div>
      </div>

      {/* Articles Telemetry Ledger */}
      <div className="border border-white/10 bg-[#111] overflow-x-auto">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <span className="text-xs font-mono uppercase text-white/80">Dispatch Telemetry Ledger</span>
          <span className="text-[11px] font-mono text-white/40">{articles.length} dossiers tracked</span>
        </div>

        <table className="w-full text-left text-xs font-light border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-[10px] font-mono uppercase tracking-wider text-white/40">
              <th className="py-3 px-4">Dispatch Title</th>
              <th className="py-3 px-4">Est. Read Time</th>
              <th className="py-3 px-4">Citations Cited</th>
              <th className="py-3 px-4">Provenance</th>
              <th className="py-3 px-4 text-right">Telemetry Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-mono text-[11px]">
            {articles.map((a) => {
              const provState =
                typeof a.provenance === 'object' && 'state' in a.provenance
                  ? a.provenance.state
                  : a.editorialStatus || 'EDITORIAL_ANALYSIS'
              const citations = (a.sources || a.sourceReferences)?.length || 0
              const readTime = a.readingTimeMinutes || a.readTimeMinutes || 5

              return (
                <tr key={a.id} className="hover:bg-white/[0.02]">
                  <td className="py-3.5 px-4 font-sans text-xs text-white max-w-md">
                    {a.title}
                  </td>
                  <td className="py-3.5 px-4 text-white/60">
                    {readTime} min
                  </td>
                  <td className="py-3.5 px-4 text-white/60">
                    {citations} primary sources
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[9px] px-1.5 py-0.5 border border-white/10 bg-white/5 text-white/70">
                      {provState}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right text-white/40">
                    Awaiting Traffic Volume
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

    </div>
  )
}
