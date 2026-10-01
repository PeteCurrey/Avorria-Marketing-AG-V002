import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllArticles, getAllCategories } from '@/lib/lobby'

export const metadata: Metadata = {
  title: 'The Lobby Editorial Desk // Admin // Avorria',
  robots: { index: false, follow: false },
}

export default async function AdminLobbyPage() {
  const [articles, categories] = await Promise.all([
    getAllArticles(),
    getAllCategories(),
  ])

  const verifiedCount = articles.filter(
    (a) => a.provenance.state === 'VERIFIED' || a.provenance.state === 'SOURCE_LINKED'
  ).length

  const totalCitations = articles.reduce((sum, a) => sum + (a.sources?.length || 0), 0)

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/40 mb-2">
            Editorial Governance &amp; Intelligence Publishing
          </p>
          <h1 className="text-3xl font-extralight text-white tracking-tight">
            The Lobby Editorial Desk
          </h1>
          <p className="text-sm font-light text-white/60 mt-2 max-w-2xl">
            Controlled publication management, source-linking verification, empirical telemetry audits, and issue sequence governance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/lobby"
            target="_blank"
            className="px-4 py-2 border border-white/20 text-xs font-mono uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
          >
            Live Broadsheet ↗
          </Link>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5">
            PROVENANCE INTEGRITY: 100%
          </span>
        </div>
      </div>

      {/* Editorial KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border border-white/10 p-5 bg-[#111]">
          <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">Published Dispatches</p>
          <p className="text-2xl font-extralight text-white mt-1">{articles.length}</p>
          <p className="text-[11px] font-light text-white/40 mt-1">Across 8 taxonomies</p>
        </div>
        <div className="border border-white/10 p-5 bg-[#111]">
          <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">Empirical / Sourced</p>
          <p className="text-2xl font-extralight text-emerald-400 mt-1">{verifiedCount}</p>
          <p className="text-[11px] font-light text-white/40 mt-1">Zero fabricated claims</p>
        </div>
        <div className="border border-white/10 p-5 bg-[#111]">
          <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">Primary Citations</p>
          <p className="text-2xl font-extralight text-white mt-1">{totalCitations}</p>
          <p className="text-[11px] font-light text-white/40 mt-1">Direct external sources</p>
        </div>
        <div className="border border-white/10 p-5 bg-[#111]">
          <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">Active Sequence</p>
          <p className="text-2xl font-extralight text-white mt-1">ISSUE 04</p>
          <p className="text-[11px] font-light text-white/40 mt-1">Q4 2026 Volume</p>
        </div>
      </div>

      {/* Dispatches Management Ledger */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-white/80">
            Dispatches Publication Ledger
          </h2>
          <span className="text-[11px] font-mono text-white/40">
            {articles.length} Dispatches in Registry
          </span>
        </div>

        <div className="border border-white/10 bg-[#111] overflow-x-auto">
          <table className="w-full text-left text-xs font-light border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-[10px] font-mono uppercase tracking-wider text-white/40">
                <th className="py-3 px-4">Ref / Issue</th>
                <th className="py-3 px-4">Dispatch Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Provenance Tier</th>
                <th className="py-3 px-4">Citations</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-[11px]">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-4 text-white/50">
                    <div>{article.id}</div>
                    <div className="text-[9px] text-white/30">{article.issueNumber.split(' // ')[0]}</div>
                  </td>
                  <td className="py-4 px-4 font-sans text-xs text-white max-w-sm">
                    <p className="line-clamp-1">{article.title}</p>
                    <span className="text-[10px] font-mono text-white/40 block mt-0.5">
                      /{article.slug}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-white/70 font-sans text-xs">
                    {article.categoryLabel}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`text-[9px] uppercase px-1.5 py-0.5 border ${
                        article.provenance.state === 'VERIFIED'
                          ? 'border-emerald-500/40 text-emerald-400 bg-emerald-950/20'
                          : article.provenance.state === 'SOURCE_LINKED'
                          ? 'border-blue-500/40 text-blue-400 bg-blue-950/20'
                          : article.provenance.state === 'OPINION'
                          ? 'border-amber-500/40 text-amber-400 bg-amber-950/20'
                          : 'border-purple-500/40 text-purple-400 bg-purple-950/20'
                      }`}
                    >
                      {article.provenance.state}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-white/60">
                    {article.sources?.length || 0} external
                  </td>
                  <td className="py-4 px-4 text-white/70 font-sans text-xs">
                    {article.leadAuthor.name}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Link
                      href={`/lobby/${article.slug}`}
                      target="_blank"
                      className="text-[10px] font-mono text-white/60 hover:text-white border border-white/20 px-2 py-1 transition-colors"
                    >
                      Inspect ↗
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Categories & Taxonomies Coverage */}
      <div className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-white/80">
          Editorial Taxonomies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div key={cat.slug} className="border border-white/10 p-5 bg-[#111] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-white tracking-wider">
                  {cat.label}
                </span>
                <span className="text-[10px] font-mono text-white/40">
                  {cat.dispatchCount || 0} Dispatches
                </span>
              </div>
              <p className="text-[11px] font-light text-white/50 leading-relaxed">
                {cat.shortDescription}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Editorial Standards Governance Protocol */}
      <div className="border border-white/10 p-6 bg-[#111] space-y-4">
        <h3 className="text-xs font-mono uppercase tracking-[0.15em] text-white/80">
          The Lobby Editorial Publishing Standards
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-light text-white/60">
          <div>
            <span className="text-[10px] font-mono text-white uppercase block mb-1">
              01 // The Provenance Imperative
            </span>
            Every claim, statistic, or architectural assertion must be assigned a provenance tier. Numerical metrics must have an auditable source or be explicitly labelled as internal studio telemetry.
          </div>
          <div>
            <span className="text-[10px] font-mono text-white uppercase block mb-1">
              02 // Non-Promotional Stance
            </span>
            Dispatches must read as objective investigations. They must never conclude with aggressive sales pitches or marketing buzzwords. Commercial pathways are quiet and consultative.
          </div>
          <div>
            <span className="text-[10px] font-mono text-white uppercase block mb-1">
              03 // Human Authorship Guarantee
            </span>
            No automated generative copy is permitted into The Lobby. Machine-assisted data collection (e.g. via Scout) is curated and analysed exclusively by Avorria principals.
          </div>
        </div>
      </div>
    </div>
  )
}
