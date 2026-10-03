import Link from 'next/link'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { Button } from '@/components/ui/Button'
import { getAllArticles } from '@/lib/lobby'

/**
 * LobbyPreview — Chapter 07: Warm Ivory + Coral Accent
 *
 * Visual chapter: warm ivory ground returns (#F6F4EF), coral category labels
 * (#E47763) mark the editorial intelligence section. Coral is used only here
 * as a warm, considered accent distinct from rose (hover/italic) and cobalt
 * (process/system).
 *
 * Requirements:
 * - Chapter 07: Warm Ivory ground
 * - Oversized section numeral: 07 (Work Sans 200, watermark)
 * - Truthful editorial intelligence dispatch listing
 * - Coral accent on category labels — editorial chapter colour
 */

export async function LobbyPreview() {
  const articles = (await getAllArticles()).slice(0, 3)

  return (
    <section
      className="relative section-y-large border-t border-[var(--color-border)] overflow-hidden"
      style={{ backgroundColor: 'var(--color-ivory)' }}
      aria-labelledby="lobby-heading"
    >
      {/* ── Background Architectural Numeral ─────────────────────────────────── */}
      <div
        className="absolute top-8 right-[7vw] pointer-events-none select-none text-[clamp(6rem,16vw,14rem)] font-extralight text-[var(--color-graphite)] opacity-[0.04] leading-none"
        aria-hidden="true"
      >
        07
      </div>

      <div className="w-full px-6 md:px-10 lg:px-[7vw]">
        {/* Section Header */}
        <div className="max-w-[1200px] mb-16 lg:mb-20">
          <RevealOnScroll>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[0.6875rem] tracking-[0.22em] uppercase font-light text-[var(--color-graphite-mid)]">
                07 // THE LOBBY · EDITORIAL INTELLIGENCE
              </span>
              <span className="h-px w-12 bg-[var(--color-border-strong)]" aria-hidden="true" />
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div>
                <h2
                  id="lobby-heading"
                  className="font-extralight text-[var(--color-graphite)] leading-[1.04] tracking-[-0.025em] text-[clamp(2.5rem,5.5vw,5.75rem)]"
                >
                  What changed.{' '}
                  <em className="not-italic italic font-extralight" style={{ color: 'var(--color-rose-text)' }}>
                    What matters.
                  </em>
                </h2>
                <p className="mt-4 text-sm md:text-base font-light text-[var(--color-graphite-mid)] max-w-[42ch]">
                  Critical dispatches on search algorithms, platform changes, and digital infrastructure for ambitious operators.
                </p>
              </div>

              <Button
                as="link"
                href="/lobby"
                variant="secondary"
                size="sm"
                className="hidden md:inline-flex shrink-0"
              >
                Enter The Lobby ↗
              </Button>
            </div>
          </RevealOnScroll>
        </div>

        {/* ── Editorial Dispatches List ───────────────────────────────────────── */}
        <div className="border-t border-[var(--color-border)] divide-y divide-[var(--color-border)]">
          {articles.map((article, i) => (
            <RevealOnScroll key={article.slug} delay={i * 80}>
              <Link
                href={`/lobby/${article.slug}`}
                className="group block py-8 md:py-10 hover:bg-[var(--color-ivory-warm)] transition-colors rounded-[var(--radius-sm)]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-baseline">
                  <div className="lg:col-span-3">
                    {/* Coral category label — editorial chapter accent */}
                    <span
                      className="text-[10px] tracking-[0.2em] font-light uppercase block mb-1"
                      style={{ color: 'var(--color-coral)' }}
                    >
                      {article.categoryName ?? article.categoryLabel ?? article.category}
                    </span>
                    <span className="text-[10px] tracking-[0.16em] uppercase text-[var(--color-graphite-muted)] font-light">
                      DISPATCH #{i + 1} · {article.readingTimeMinutes ?? article.readTimeMinutes ?? 5} MIN READ
                    </span>
                  </div>

                  <div className="lg:col-span-8">
                    <h3 className="text-xl md:text-2xl font-extralight text-[var(--color-graphite)] group-hover:text-[var(--color-graphite)] transition-colors mb-2 tracking-[-0.01em]">
                      {article.title}
                    </h3>
                    <p className="text-sm font-light text-[var(--color-graphite-mid)] leading-relaxed line-clamp-2">
                      {article.excerpt ?? article.dek}
                    </p>
                  </div>

                  <div className="lg:col-span-1 hidden lg:flex justify-end text-[var(--color-graphite-mid)] group-hover:text-[var(--color-coral)] group-hover:translate-x-1 transition-all">
                    <span>↗</span>
                  </div>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>

        {/* Mobile Link */}
        <div className="mt-8 md:hidden">
          <Button as="link" href="/lobby" variant="secondary" size="sm">
            Enter The Lobby ↗
          </Button>
        </div>
      </div>
    </section>
  )
}

// Backwards-compatible export
export const JournalPreview = LobbyPreview
