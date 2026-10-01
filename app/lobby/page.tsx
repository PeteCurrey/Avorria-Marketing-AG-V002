import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllArticles, getAllCategories, getFeaturedArticle } from '@/lib/lobby'
import { LobbyBroadsheetMasthead } from '@/components/lobby/LobbyBroadsheetMasthead'
import { LobbyLeadFeature } from '@/components/lobby/LobbyLeadFeature'
import { LobbyWireStory } from '@/components/lobby/LobbyWireStory'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'The Lobby // Editorial & Intelligence Division',
  description:
    'Avorria editorial publications, forensic teardowns, search engine intelligence, and technical strategy direct from the engineering desk.',
  path: '/lobby',
})

export default async function LobbyIndexPage() {
  const [articles, categories, featured] = await Promise.all([
    getAllArticles(),
    getAllCategories(),
    getFeaturedArticle(),
  ])

  const secondaryArticles = articles.filter((a) => a.id !== featured.id)

  return (
    <div className="min-h-screen bg-[var(--color-ivory)] dark:bg-[#080808] text-neutral-900 dark:text-white pt-28 pb-24 px-6 sm:px-8 md:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Broadsheet Masthead */}
        <LobbyBroadsheetMasthead
          categories={categories}
          totalArticlesCount={articles.length}
        />

        {/* Lead Feature Story */}
        <section aria-label="Cover Investigation">
          <LobbyLeadFeature article={featured} />
        </section>

        {/* The Intelligence Wire */}
        <section aria-label="Intelligence Wire" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-black/10 dark:border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 block mb-1">
                DISPATCH WIRE // CHRONOLOGICAL LOG
              </span>
              <h2 className="text-2xl font-extralight text-neutral-900 dark:text-white">
                Field Intelligence &amp; Architectural Memos
              </h2>
            </div>
            <span className="text-xs font-mono text-neutral-400">
              Showing {secondaryArticles.length} active dispatches
            </span>
          </div>

          <div className="space-y-2">
            {secondaryArticles.map((article) => (
              <LobbyWireStory key={article.id} article={article} />
            ))}
          </div>
        </section>

        {/* Comprehensive Architectural Ledger Table */}
        <section aria-label="Dispatch Registry" className="space-y-6 pt-10 border-t border-black/10 dark:border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 block mb-1">
                THE LOBBY ARCHIVE // ALL ISSUES
              </span>
              <h3 className="text-xl font-extralight text-neutral-900 dark:text-white">
                Intelligence Ledger Index
              </h3>
            </div>
            <span className="text-[10px] font-mono text-neutral-400">
              {articles.length} RECORDS INDEXED
            </span>
          </div>

          <div className="border border-black/10 dark:border-white/10 overflow-x-auto bg-black/[0.01] dark:bg-white/[0.01]">
            <table className="w-full text-left text-xs font-light border-collapse">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                  <th className="py-3 px-4">Ref / Issue</th>
                  <th className="py-3 px-4">Investigation Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Provenance</th>
                  <th className="py-3 px-4">Author</th>
                  <th className="py-3 px-4 text-right">Published</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5 font-mono text-[11px]">
                {articles.map((item) => (
                  <tr key={item.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 text-neutral-400">
                      {item.id}
                    </td>
                    <td className="py-3.5 px-4 font-sans text-xs">
                      <Link
                        href={`/lobby/${item.slug}`}
                        className="text-neutral-900 dark:text-white hover:underline underline-offset-4"
                      >
                        {item.title}
                      </Link>
                    </td>
                    <td className="py-3.5 px-4 text-neutral-500 font-sans text-xs">
                      {item.categoryLabel}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-[9px] uppercase px-1.5 py-0.5 border border-black/10 dark:border-white/10 text-neutral-600 dark:text-neutral-300">
                        {item.provenance.state}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-neutral-500 font-sans text-xs">
                      {item.leadAuthor.name}
                    </td>
                    <td className="py-3.5 px-4 text-right text-neutral-400 text-[10px]">
                      {new Date(item.publishedAt).toLocaleDateString('en-GB')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Editorial Standards Footnote */}
        <aside className="border border-black/10 dark:border-white/10 p-6 bg-black/[0.01] dark:bg-white/[0.015] space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 block">
            Avorria Editorial Charter &amp; Publication Protocol
          </span>
          <p className="text-xs font-light text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl">
            The Lobby publishes technical investigations, observable failure analyses, and commercial intelligence from the Avorria workshop. We do not accept sponsored content, we do not publish synthetic AI filler, and all external claims are linked directly to primary engineering documentation or audited benchmarks.
          </p>
        </aside>
      </div>
    </div>
  )
}
