import type { Metadata } from 'next'
import Link from 'next/link'
import { searchArticles, getPublishedArticles } from '@/lib/lobby'
import { LobbyWireStory } from '@/components/lobby/LobbyWireStory'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: 'Search Intelligence // The Lobby',
    description: 'Search Avorria editorial publications, forensic teardowns, and engineering dispatches.',
    path: '/lobby/search',
  }),
  robots: {
    index: false, // Internal search results page should not be indexed by Google
    follow: true,
  },
}

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function LobbySearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams
  const query = (q || '').trim()

  const results = query ? await searchArticles(query) : []

  return (
    <div className="min-h-screen bg-[var(--color-ivory)] dark:bg-[#080808] text-neutral-900 dark:text-white pt-28 pb-24 px-6 sm:px-8 md:px-12">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Navigation Breadcrumb */}
        <div className="border-b border-black/10 dark:border-white/10 pb-4 text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400">
          <Link href="/lobby" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
            ← THE LOBBY
          </Link>
          <span className="mx-2">//</span>
          <span>INTELLIGENCE SEARCH</span>
        </div>

        {/* Search Header & Input */}
        <header className="space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-400 block">
              FORENSIC SEARCH // PUBLISHED DISPATCHES ONLY
            </span>
            <h1 className="text-3xl sm:text-4xl font-extralight tracking-tight text-neutral-900 dark:text-white">
              Search The Lobby
            </h1>
          </div>

          <form method="GET" action="/lobby/search" className="space-y-3">
            <div className="flex border border-black/20 dark:border-white/20 bg-black/[0.015] dark:bg-white/[0.02] focus-within:border-black dark:focus-within:border-white transition-colors">
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search across titles, architectural breakdowns, Core Web Vitals, algorithms..."
                className="w-full bg-transparent px-4 py-3 text-sm font-light text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-neutral-900 text-white dark:bg-white dark:text-black text-xs font-mono uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                Search
              </button>
            </div>
            <p className="text-[11px] font-mono text-neutral-400">
              Query searches published editorial titles, section analyses, and source registries.
            </p>
          </form>
        </header>

        {/* Results Area */}
        <section aria-label="Search Results" className="space-y-6 pt-4 border-t border-black/10 dark:border-white/10">
          {query ? (
            <>
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Search query: &ldquo;{query}&rdquo;
                </span>
                <span className="text-[11px] font-mono text-neutral-400">
                  {results.length} {results.length === 1 ? 'result' : 'results'} found
                </span>
              </div>

              {results.length > 0 ? (
                <div className="space-y-2">
                  {results.map((article) => (
                    <LobbyWireStory key={article.id} article={article} />
                  ))}
                </div>
              ) : (
                <div className="border border-black/10 dark:border-white/10 p-12 text-center max-w-md mx-auto space-y-3">
                  <p className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                    No Matching Dispatches Found
                  </p>
                  <p className="text-xs font-light text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Zero published investigations matched &ldquo;{query}&rdquo;. Check spelling or explore structural categories from the broadsheet.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/lobby"
                      className="text-xs font-mono uppercase text-amber-600 dark:text-amber-400 hover:underline"
                    >
                      Return to The Lobby Broadsheet →
                    </Link>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="py-12 text-center space-y-2 border border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01]">
              <p className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
                Awaiting Search Term
              </p>
              <p className="text-xs font-light text-neutral-500">
                Enter keywords above to query the verified Avorria editorial intelligence corpus.
              </p>
            </div>
          )}
        </section>

        {/* Back Link */}
        <div className="pt-8 border-t border-black/10 dark:border-white/10">
          <Link
            href="/lobby"
            className="text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
          >
            ← Back to The Lobby
          </Link>
        </div>
      </div>
    </div>
  )
}
