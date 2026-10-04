import Link from 'next/link'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { Button } from '@/components/ui/Button'
import { getAllArticles } from '@/lib/lobby'

/**
 * LobbyPreview — Chapter 07: Stone Ground + Rose Accent
 *
 * Visual chapter: warm stone ground (#E8E2D8), rose category labels,
 * editorial intelligence preview establishing an authoritative transition.
 */

export async function LobbyPreview() {
  const articles = (await getAllArticles()).slice(0, 3)

  return (
    <section
      className="relative section-y-large border-t border-[var(--color-border)] overflow-hidden"
      style={{ backgroundColor: 'var(--color-stone)' }}
      data-chapter="stone"
      aria-labelledby="lobby-heading"
    >
      <div className="w-full px-6 md:px-10 lg:px-[7vw]">
        {/* Section Header */}
        <div className="max-w-[1200px] mb-16 lg:mb-20">
          <RevealOnScroll>
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
                className="hidden md:inline-flex shrink-0 bg-white/70"
              >
                Enter The Lobby ↗
              </Button>
            </div>
          </RevealOnScroll>
        </div>

        {/* ── Editorial Dispatches List ───────────────────────────────────────── */}
        <div className="border-t border-[var(--color-border-strong)] divide-y divide-[var(--color-border-strong)]">
          {articles.map((article, i) => (
            <RevealOnScroll key={article.slug} delay={i * 80}>
              <Link
                href={`/lobby/${article.slug}`}
                className="group block py-8 md:py-10 hover:bg-white/50 transition-colors rounded-[var(--radius-sm)] px-2"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-baseline">
                  <div className="lg:col-span-3">
                    {/* Rose category label — signature punctuation */}
                    <span
                      className="text-[10px] tracking-[0.2em] font-light uppercase block mb-1"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      {article.categoryName ?? article.categoryLabel ?? article.category}
                    </span>
                    <span className="text-[10px] tracking-[0.16em] uppercase text-[var(--color-graphite-muted)] font-light">
                      {article.readingTimeMinutes ?? article.readTimeMinutes ?? 5} min read
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

                  <div className="lg:col-span-1 hidden lg:flex justify-end text-[var(--color-graphite-mid)] group-hover:text-[var(--color-accent)] group-hover:translate-x-1 transition-all">
                    <span>↗</span>
                  </div>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>

        {/* Mobile Link */}
        <div className="mt-8 md:hidden">
          <Button as="link" href="/lobby" variant="secondary" size="sm" className="bg-white/70">
            Enter The Lobby ↗
          </Button>
        </div>
      </div>
    </section>
  )
}

// Backwards-compatible export
export const JournalPreview = LobbyPreview
