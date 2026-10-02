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
    "Avorria's editorial intelligence desk covering critical changes across digital marketing, websites, Google, Meta, SEO, applied AI, and sovereign online infrastructure.",
  path: '/lobby',
})

export default async function LobbyIndexPage() {
  const [articles, categories, featured] = await Promise.all([
    getAllArticles(),
    getAllCategories(),
    getFeaturedArticle(),
  ])

  const secondaryArticles = featured
    ? articles.filter((a) => a.id !== featured.id)
    : articles

  // Structural intelligence categories
  const structuralSlugs = [
    { slug: 'marketing', label: 'Marketing Intelligence', desc: 'Acquisition economics, funnel conversion, and paid performance telemetry.' },
    { slug: 'google-search', label: 'Google & Search', desc: 'Core algorithm updates, indexation dynamics, and technical SEO architecture.' },
    { slug: 'meta-social', label: 'Meta & Social', desc: 'Machine learning ad delivery, Advantage+ auctions, and attribution models.' },
    { slug: 'websites', label: 'Websites & UX', desc: 'Interaction latency (INP), Core Web Vitals, and modern frontend systems.' },
    { slug: 'small-business', label: 'Small Business', desc: 'Commercial decision-making frameworks, contracts, and software sovereignty.' },
    { slug: 'technology', label: 'Applied AI & Tech', desc: 'Deterministic agent pipelines, cloud infrastructure, and enterprise automation.' },
    { slug: 'avorria', label: 'Avorria Dispatches', desc: 'Internal engineering logs, open benchmarks, and studio releases.' },
  ]

  return (
    <div className="min-h-screen bg-[var(--color-ivory)] dark:bg-[#080808] text-neutral-900 dark:text-white pt-28 pb-24 px-6 sm:px-8 md:px-12">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Broadsheet Masthead with search utility */}
        <div>
          <div className="flex justify-end mb-4">
            <Link
              href="/lobby/search"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors border border-black/10 dark:border-white/10 px-3 py-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Search Intelligence</span>
            </Link>
          </div>
          <LobbyBroadsheetMasthead
            categories={categories}
            totalArticlesCount={articles.length}
          />
        </div>

        {/* Empty State vs Content */}
        {articles.length === 0 ? (
          <div className="border border-black/10 dark:border-white/10 p-16 text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-400 block">
              STATUS // EDITORIAL DESK IN ACTIVE PREPARATION
            </span>
            <h2 className="text-3xl font-extralight text-neutral-900 dark:text-white">
              The Lobby is Being Built
            </h2>
            <p className="text-sm font-light text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Intelligence, practical guidance, and verified developments will appear here as they pass through editorial review and provenance verification.
            </p>
          </div>
        ) : (
          <>
            {/* Dominant Featured Intelligence */}
            {featured && (
              <section aria-label="Featured Cover Investigation">
                <LobbyLeadFeature article={featured} />
              </section>
            )}

            {/* The Chronological Intelligence Wire */}
            <section aria-label="Intelligence Wire" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-black/10 dark:border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 block mb-1">
                    CHRONOLOGICAL WIRE // DISPATCH STREAM
                  </span>
                  <h2 className="text-2xl font-extralight text-neutral-900 dark:text-white">
                    Latest Dispatches &amp; Technical Memos
                  </h2>
                </div>
                <span className="text-xs font-mono text-neutral-400">
                  Showing {secondaryArticles.length} recent dispatches
                </span>
              </div>

              {secondaryArticles.length === 0 ? (
                <p className="text-xs font-mono text-neutral-400 py-6">
                  No additional chronological dispatches currently indexed.
                </p>
              ) : (
                <div className="space-y-2">
                  {secondaryArticles.map((article) => (
                    <LobbyWireStory key={article.id} article={article} />
                  ))}
                </div>
              )}
            </section>

            {/* Structural Intelligence Areas */}
            <section aria-label="Intelligence Domains" className="space-y-8 pt-8 border-t border-black/10 dark:border-white/10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 block mb-1">
                  CORE COVERAGE // INTELLIGENCE DOMAINS
                </span>
                <h3 className="text-2xl font-extralight text-neutral-900 dark:text-white">
                  Coverage Areas &amp; Subject Taxonomy
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10">
                {structuralSlugs.map((topic) => {
                  const matchCount = articles.filter(
                    (a) => a.category === topic.slug || a.categorySlug === topic.slug
                  ).length

                  return (
                    <Link
                      key={topic.slug}
                      href={`/lobby/category/${topic.slug}`}
                      className="group bg-[var(--color-ivory)] dark:bg-[#080808] p-6 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                          <span className="uppercase tracking-[0.18em]">{topic.slug}</span>
                          <span>{matchCount} {matchCount === 1 ? 'RECORD' : 'RECORDS'}</span>
                        </div>
                        <h4 className="text-lg font-light text-neutral-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                          {topic.label}
                        </h4>
                        <p className="text-xs font-light text-neutral-600 dark:text-neutral-400 leading-relaxed">
                          {topic.desc}
                        </p>
                      </div>

                      <div className="text-[10px] font-mono text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors flex items-center gap-1 pt-2">
                        <span>EXPLORE DOSSIERS</span>
                        <span>→</span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>

            {/* Comprehensive Architectural Ledger Table */}
            <section aria-label="Dispatch Registry" className="space-y-6 pt-10 border-t border-black/10 dark:border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 block mb-1">
                    THE LOBBY ARCHIVE // ALL ISSUES
                  </span>
                  <h3 className="text-2xl font-extralight text-neutral-900 dark:text-white">
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
                    {articles.map((item) => {
                      const authorName =
                        typeof item.author === 'object' && 'name' in item.author
                          ? item.author.name
                          : item.leadAuthor?.name || 'Avorria Editorial Desk'
                      const provState =
                        typeof item.provenance === 'object' && 'state' in item.provenance
                          ? item.provenance.state
                          : item.editorialStatus || 'EDITORIAL_ANALYSIS'

                      return (
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
                          <td className="py-3.5 px-4 text-neutral-500">
                            <Link
                              href={`/lobby/category/${item.categorySlug || item.category}`}
                              className="hover:underline"
                            >
                              {item.categoryName || item.categoryLabel || item.category}
                            </Link>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="text-[10px] px-1.5 py-0.5 border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-neutral-600 dark:text-neutral-300">
                              {provState}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-neutral-500">
                            {authorName}
                          </td>
                          <td className="py-3.5 px-4 text-right text-neutral-400">
                            {new Date(item.publishedAt).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

      </div>
    </div>
  )
}
