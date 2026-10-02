import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllArticlesAdmin, getCategories } from '@/lib/lobby'
import { LobbyAdminNav } from '@/components/admin/LobbyAdminNav'
import type { LobbyArticleStatus } from '@/types/lobby'

export const metadata: Metadata = {
  title: 'Articles Registry // The Lobby Admin // Avorria',
  robots: { index: false, follow: false },
}

interface ArticlesPageProps {
  searchParams: Promise<{ status?: string; category?: string; q?: string }>
}

export default async function AdminArticlesPage({ searchParams }: ArticlesPageProps) {
  const { status, category, q } = await searchParams

  const [articles, categories] = await Promise.all([
    getAllArticlesAdmin({
      status: status as LobbyArticleStatus | undefined,
      categoryId: category,
      search: q,
    }),
    getCategories(),
  ])

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 block mb-1">
            EDITORIAL REGISTRY // PUBLISHING QUEUE
          </span>
          <h1 className="text-2xl sm:text-3xl font-extralight text-white tracking-tight">
            Articles &amp; Dispatches Registry
          </h1>
        </div>

        <Link
          href="/admin/lobby/articles/new"
          className="px-4 py-2 bg-white text-black text-xs font-mono uppercase tracking-wider hover:opacity-90 transition-opacity self-start sm:self-auto"
        >
          + Create New Dispatch
        </Link>
      </div>

      <LobbyAdminNav />

      {/* Filter Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-4 border border-white/10 p-4 bg-[#111] text-xs font-mono">
        <div className="flex flex-wrap items-center gap-2 text-white/60">
          <span>Filter Status:</span>
          {['ALL', 'DRAFT', 'REVIEW', 'APPROVED', 'PUBLISHED', 'ARCHIVED'].map((st) => {
            const isSelected = (!status && st === 'ALL') || status === st
            const href = st === 'ALL' ? '/admin/lobby/articles' : `/admin/lobby/articles?status=${st}`

            return (
              <Link
                key={st}
                href={href}
                className={`px-2.5 py-1 transition-colors ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                {st}
              </Link>
            )
          })}
        </div>

        <span className="text-white/40">
          {articles.length} {articles.length === 1 ? 'Dispatch' : 'Dispatches'} listed
        </span>
      </div>

      {/* Articles Table */}
      <div className="border border-white/10 bg-[#111] overflow-x-auto">
        <table className="w-full text-left text-xs font-light border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-[10px] font-mono uppercase tracking-wider text-white/40">
              <th className="py-3 px-4">Ref</th>
              <th className="py-3 px-4">Title &amp; Dek</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Provenance</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-mono text-[11px]">
            {articles.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-white/40">
                  No dispatches match the selected filter criteria.
                </td>
              </tr>
            ) : (
              articles.map((item) => {
                const itemStatus = item.status || 'PUBLISHED'
                const itemType = item.contentType || 'ARTICLE'
                const provState =
                  typeof item.provenance === 'object' && 'state' in item.provenance
                    ? item.provenance.state
                    : item.editorialStatus || 'EDITORIAL_ANALYSIS'

                return (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 text-white/40 font-mono">
                      {item.issueNumber || item.id}
                    </td>
                    <td className="py-3.5 px-4 max-w-sm">
                      <Link
                        href={`/admin/lobby/articles/${item.id}`}
                        className="text-white font-sans text-xs hover:text-amber-400 transition-colors block line-clamp-1"
                      >
                        {item.title}
                      </Link>
                      <p className="text-[11px] font-light text-white/40 line-clamp-1 mt-0.5">
                        {item.excerpt || item.dek}
                      </p>
                    </td>
                    <td className="py-3.5 px-4 text-white/60 text-[10px]">
                      {itemType}
                    </td>
                    <td className="py-3.5 px-4 text-white/60">
                      {item.categoryName || item.categoryLabel || item.category}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[9px] px-2 py-0.5 border ${
                          itemStatus === 'PUBLISHED'
                            ? 'border-emerald-500/30 bg-emerald-950/30 text-emerald-400'
                            : itemStatus === 'REVIEW'
                            ? 'border-amber-500/30 bg-amber-950/30 text-amber-400'
                            : 'border-white/10 bg-white/5 text-white/50'
                        }`}
                      >
                        {itemStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-[9px] px-1.5 py-0.5 border border-white/10 bg-white/5 text-white/70">
                        {provState}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-white/40 text-[10px]">
                      {new Date(item.publishedAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-3">
                      <Link
                        href={`/admin/lobby/articles/${item.id}`}
                        className="text-white/60 hover:text-white transition-colors"
                      >
                        Workbench
                      </Link>
                      <Link
                        href={`/lobby/${item.slug}`}
                        target="_blank"
                        className="text-white/40 hover:text-white transition-colors"
                      >
                        View ↗
                      </Link>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
