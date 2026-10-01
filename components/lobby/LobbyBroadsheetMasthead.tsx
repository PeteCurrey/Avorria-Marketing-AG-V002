import Link from 'next/link'
import type { LobbyCategory } from '@/types/lobby'

interface LobbyBroadsheetMastheadProps {
  categories: LobbyCategory[]
  activeCategorySlug?: string
  totalArticlesCount: number
}

export function LobbyBroadsheetMasthead({
  categories,
  activeCategorySlug,
  totalArticlesCount,
}: LobbyBroadsheetMastheadProps) {
  return (
    <header className="border-b border-black/10 dark:border-white/10 pb-8 space-y-8">
      {/* Top Ledger Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/5 dark:border-white/5 pb-4 text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400">
        <div className="flex items-center gap-4">
          <span className="text-neutral-900 dark:text-white font-light">AVORRIA STUDIO</span>
          <span>//</span>
          <span>EDITORIAL &amp; INTELLIGENCE DIVISION</span>
        </div>
        <div className="flex items-center gap-6">
          <span>VOLUME IV</span>
          <span>DISPATCHES: {totalArticlesCount} VERIFIED</span>
          <span>EST. LONDON</span>
        </div>
      </div>

      {/* Main Masthead Title */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-400 block mb-2">
            The Working Environment &amp; Field Intelligence
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight tracking-tight text-neutral-900 dark:text-white leading-[1.05]">
            The Lobby
          </h1>
        </div>
        <p className="max-w-md text-xs sm:text-sm font-light text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Technical teardowns, empirical search data, algorithmic shifts, and commercial strategy directly from the Avorria engineering desk.
        </p>
      </div>

      {/* Category Ticker Navigation */}
      <nav aria-label="Lobby Categories" className="pt-2">
        <ul className="flex flex-wrap items-center gap-2">
          <li>
            <Link
              href="/lobby"
              className={`inline-block px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider border transition-all ${
                !activeCategorySlug
                  ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-black'
                  : 'border-black/10 dark:border-white/10 text-neutral-500 hover:border-black/30 dark:hover:border-white/30 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              All Dossiers ({totalArticlesCount})
            </Link>
          </li>
          {categories.map((cat) => {
            const isActive = activeCategorySlug === cat.slug
            return (
              <li key={cat.slug}>
                <Link
                  href={`/lobby/category/${cat.slug}`}
                  className={`inline-block px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider border transition-all ${
                    isActive
                      ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-black'
                      : 'border-black/10 dark:border-white/10 text-neutral-500 hover:border-black/30 dark:hover:border-white/30 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  {cat.label} ({cat.dispatchCount || 0})
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
