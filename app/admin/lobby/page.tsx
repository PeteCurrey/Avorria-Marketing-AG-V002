import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllArticles, getAllCategories, getAuthors, getTags } from '@/lib/lobby'
import { LobbyAdminNav } from '@/components/admin/LobbyAdminNav'

export const metadata: Metadata = {
  title: 'The Lobby Editorial Desk // Admin // Avorria',
  robots: { index: false, follow: false },
}

export default async function AdminLobbyPage() {
  const [articles, categories, authors, tags] = await Promise.all([
    getAllArticles(),
    getAllCategories(),
    getAuthors(),
    getTags(),
  ])

  const verifiedCount = articles.filter(
    (a) =>
      (typeof a.provenance === 'object' && (a.provenance.state === 'VERIFIED' || a.provenance.state === 'SOURCE_LINKED')) ||
      a.editorialStatus === 'VERIFIED' ||
      a.editorialStatus === 'SOURCE_LINKED'
  ).length

  const totalCitations = articles.reduce(
    (sum, a) => sum + ((a.sources || a.sourceReferences)?.length || 0),
    0
  )

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      
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
          <Link
            href="/admin/lobby/articles/new"
            className="px-4 py-2 bg-white text-black text-xs font-mono uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            + Draft Investigation
          </Link>
        </div>
      </div>

      {/* Lobby Sub-Navigation */}
      <LobbyAdminNav />

      {/* Editorial KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border border-white/10 p-5 bg-[#111]">
          <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">Published Dispatches</p>
          <p className="text-2xl font-extralight text-white mt-1">{articles.length}</p>
          <p className="text-[11px] font-light text-white/40 mt-1">Across {categories.length} taxonomies</p>
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
          <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">Active Contributors</p>
          <p className="text-2xl font-extralight text-white mt-1">{authors.length}</p>
          <p className="text-[11px] font-light text-white/40 mt-1">Verified Avorria team</p>
        </div>
      </div>

      {/* Quick Access Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/admin/lobby/articles"
          className="border border-white/10 p-6 bg-[#111] hover:border-white/30 transition-colors space-y-2 group"
        >
          <div className="flex items-center justify-between text-[10px] font-mono text-white/40">
            <span>EDITORIAL WORKFLOW</span>
            <span>→</span>
          </div>
          <h3 className="text-base font-light text-white group-hover:text-amber-400 transition-colors">
            Articles &amp; Dispatches Registry
          </h3>
          <p className="text-xs font-light text-white/60">
            Review drafts, approve submissions, inspect source references, and publish new intelligence dossiers.
          </p>
        </Link>

        <Link
          href="/admin/lobby/categories"
          className="border border-white/10 p-6 bg-[#111] hover:border-white/30 transition-colors space-y-2 group"
        >
          <div className="flex items-center justify-between text-[10px] font-mono text-white/40">
            <span>TAXONOMY</span>
            <span>→</span>
          </div>
          <h3 className="text-base font-light text-white group-hover:text-amber-400 transition-colors">
            Categories &amp; Structural Domains
          </h3>
          <p className="text-xs font-light text-white/60">
            Manage the 7 structural areas: Marketing, Google/Search, Meta/Social, Websites, Small Business, Tech, Avorria.
          </p>
        </Link>

        <Link
          href="/admin/lobby/analytics"
          className="border border-white/10 p-6 bg-[#111] hover:border-white/30 transition-colors space-y-2 group"
        >
          <div className="flex items-center justify-between text-[10px] font-mono text-white/40">
            <span>AUDITED TELEMETRY</span>
            <span>→</span>
          </div>
          <h3 className="text-base font-light text-white group-hover:text-amber-400 transition-colors">
            Editorial Performance &amp; Engagement
          </h3>
          <p className="text-xs font-light text-white/60">
            Truthful telemetry tracking reading depth, citation outbound clicks, and conversion continuation.
          </p>
        </Link>
      </div>

      {/* Dispatches Management Ledger */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-white/80">
            Recent Published Dispatches
          </h2>
          <Link
            href="/admin/lobby/articles"
            className="text-[11px] font-mono text-white/40 hover:text-white transition-colors"
          >
            View Complete Registry →
          </Link>
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
              {articles.slice(0, 5).map((article) => {
                const authorName =
                  typeof article.author === 'object' && 'name' in article.author
                    ? article.author.name
                    : article.leadAuthor?.name || 'Avorria Editorial Desk'
                const provState =
                  typeof article.provenance === 'object' && 'state' in article.provenance
                    ? article.provenance.state
                    : article.editorialStatus || 'EDITORIAL_ANALYSIS'
                const citationCount = (article.sources || article.sourceReferences)?.length || 0

                return (
                  <tr key={article.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 text-white/40">
                      {article.issueNumber || article.id}
                    </td>
                    <td className="py-3.5 px-4 font-sans text-xs">
                      <Link
                        href={`/admin/lobby/articles/${article.id}`}
                        className="text-white hover:text-amber-400 transition-colors"
                      >
                        {article.title}
                      </Link>
                    </td>
                    <td className="py-3.5 px-4 text-white/60">
                      {article.categoryName || article.categoryLabel || article.category}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-[10px] px-2 py-0.5 border border-white/10 bg-white/5 text-white/70">
                        {provState}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-white/60">
                      {citationCount} sources
                    </td>
                    <td className="py-3.5 px-4 text-white/60">
                      {authorName}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-3">
                      <Link
                        href={`/admin/lobby/articles/${article.id}`}
                        className="text-white/60 hover:text-white transition-colors"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/lobby/${article.slug}`}
                        target="_blank"
                        className="text-white/40 hover:text-white transition-colors"
                      >
                        View ↗
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
