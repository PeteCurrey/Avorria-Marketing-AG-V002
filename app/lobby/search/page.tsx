import type { Metadata } from 'next'
import Link from 'next/link'
import { searchArticles } from '@/lib/lobby'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: 'Search The Lobby — Avorria',
    description: 'Search editorial publications and analysis from Avorria.',
    path: '/lobby/search',
  }),
  robots: {
    index: false, // Internal search is always noindex
    follow: true,
  },
}

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function LobbySearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams
  const query = (q || '').trim()

  const results = query ? await searchArticles(query) : []

  return (
    <div className="min-h-screen bg-[var(--color-ivory)] pt-28 pb-24">
      <div className="container-max container-content">

        {/* ── Breadcrumb ──────────────────────────────────────────────── */}
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="flex items-center gap-2 text-[0.6875rem] font-light tracking-[0.12em] uppercase text-[var(--color-graphite-muted)]">
            <li>
              <Link href="/lobby" className="hover:text-[var(--color-graphite)] transition-colors duration-200">
                The Lobby
              </Link>
            </li>
            <li aria-hidden="true">·</li>
            <li className="text-[var(--color-graphite)]" aria-current="page">
              Search
            </li>
          </ol>
        </nav>

        {/* ── Search Header & Form ────────────────────────────────────── */}
        <header className="border-b border-[var(--color-border)] pb-8 mb-10 max-w-[700px]">
          <p className="text-[0.6875rem] font-light tracking-[0.2em] uppercase text-[var(--color-graphite-muted)] mb-3">
            Editorial Search
          </p>
          <h1 className="text-[var(--text-display-l)] font-[200] tracking-[var(--tracking-heading)] text-[var(--color-graphite)] leading-[1.05] mb-6">
            Search The Lobby
          </h1>

          <form method="GET" action="/lobby/search" className="space-y-3">
            <div className="flex border border-[var(--color-border-strong)] bg-white focus-within:border-[var(--color-graphite)] transition-colors">
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search by topic, Google update, website architecture..."
                className="w-full bg-transparent px-4 py-3 text-[var(--text-small)] font-light text-[var(--color-graphite)] placeholder:text-[var(--color-graphite-muted)] focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[var(--color-graphite)] text-[var(--color-ivory)] text-[0.6875rem] font-light tracking-[0.14em] uppercase hover:bg-[var(--color-accent)] transition-colors duration-200 shrink-0"
              >
                Search
              </button>
            </div>
            <p className="text-[0.6875rem] font-light text-[var(--color-graphite-muted)]">
              Searches published editorial titles, excerpts, and body content.
            </p>
          </form>
        </header>

        {/* ── Results Area ────────────────────────────────────────────── */}
        <section aria-label="Search Results">
          {query ? (
            <>
              <div className="flex items-baseline justify-between mb-6">
                <p className="text-[0.6875rem] font-light tracking-[0.12em] uppercase text-[var(--color-graphite-muted)]">
                  Results for &ldquo;{query}&rdquo;
                </p>
                <p className="text-[0.6875rem] font-light text-[var(--color-graphite-muted)]">
                  {results.length} {results.length === 1 ? 'article' : 'articles'} found
                </p>
              </div>

              {results.length > 0 ? (
                <ul role="list">
                  {results.map((article) => (
                    <li key={article.slug} className="border-t border-[var(--color-border)]">
                      <Link
                        href={`/lobby/${article.slug}`}
                        className="group flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 py-6 hover:border-[var(--color-border-strong)] transition-colors duration-200"
                      >
                        <div className="max-w-[680px]">
                          <p className="text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)] mb-1">
                            {article.categoryName ?? article.category}
                          </p>
                          <h2 className="text-[var(--text-heading)] font-light text-[var(--color-graphite)] group-hover:text-[var(--color-accent)] transition-colors duration-200 mb-2">
                            {article.title}
                          </h2>
                          <p className="text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] line-clamp-2 leading-relaxed">
                            {article.excerpt ?? article.dek}
                          </p>
                        </div>
                        <div className="flex items-center gap-4 shrink-0 text-[0.6875rem] font-light tracking-[0.1em] uppercase text-[var(--color-graphite-muted)]">
                          <span>{fmt(article.publishedAt)}</span>
                          <span aria-hidden="true">·</span>
                          <span>{article.readingTimeMinutes ?? article.readTimeMinutes ?? 5} min read</span>
                          <span
                            className="text-[var(--color-graphite-muted)] group-hover:text-[var(--color-accent)] group-hover:translate-x-1 transition-all duration-200"
                            aria-hidden="true"
                          >
                            →
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                  <li className="border-t border-[var(--color-border)]" aria-hidden="true" />
                </ul>
              ) : (
                <div className="py-16 border-t border-[var(--color-border)] text-center max-w-md mx-auto">
                  <p className="text-[0.6875rem] font-light tracking-[0.2em] uppercase text-[var(--color-graphite-muted)] mb-3">
                    No results found
                  </p>
                  <p className="text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] leading-relaxed mb-6">
                    No published dispatches matched &ldquo;{query}&rdquo;. Try another term or explore by category.
                  </p>
                  <Link
                    href="/lobby"
                    className="text-[var(--text-small)] font-light text-[var(--color-graphite)] border-b border-[var(--color-graphite)] pb-0.5 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors duration-200"
                  >
                    ← Browse all dispatches
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="py-16 text-center text-[var(--color-graphite-muted)]">
              <p className="text-[var(--text-small)] font-light">
                Enter a term above to search all published dispatches.
              </p>
            </div>
          )}
        </section>

      </div>
    </div>
  )
}
