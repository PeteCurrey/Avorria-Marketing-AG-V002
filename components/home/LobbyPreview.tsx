import Link from 'next/link'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { Button } from '@/components/ui/Button'
import { getAllArticles } from '@/lib/lobby'

export async function LobbyPreview() {
  const articles = (await getAllArticles()).slice(0, 3)

  return (
    <section
      className="section-y-large border-b border-[var(--color-border)] bg-[var(--color-ivory-dark)]"
      aria-labelledby="lobby-heading"
    >
      <div className="container-max">
        <div className="container-content">

          <div className="flex items-end justify-between mb-16 gap-8">
            <RevealOnScroll>
              <Eyebrow>06 — The Lobby</Eyebrow>
              <h2 id="lobby-heading" className="text-display-l">
                What changed. What matters.
              </h2>
            </RevealOnScroll>
            <RevealOnScroll>
              <Button
                as="link"
                href="/lobby"
                variant="ghost"
                size="sm"
                className="hidden md:inline-flex shrink-0"
              >
                All dispatches →
              </Button>
            </RevealOnScroll>
          </div>

          <div className="space-y-0">
            {articles.map((article, i) => (
              <RevealOnScroll key={article.slug} delay={i * 80}>
                <Link
                  href={`/lobby/${article.slug}`}
                  className="group block border-t border-[var(--color-border)] py-8 hover:border-[var(--color-border-strong)] transition-colors duration-[var(--duration-base)]"
                >
                  <div className="grid grid-cols-1 md:grid-cols-[140px_1fr_auto] gap-4 md:gap-8 items-center">
                    <p className="text-label-upper text-[var(--color-graphite-muted)]">
                      {article.categoryName ?? article.categoryLabel ?? article.category}
                    </p>
                    <div>
                      <h3 className="text-[var(--text-heading)] font-light text-[var(--color-graphite)] group-hover:text-[var(--color-accent)] transition-colors duration-[var(--duration-base)] mb-1">
                        {article.title}
                      </h3>
                      <p className="text-[var(--text-small)] text-secondary line-clamp-1 font-light">
                        {article.excerpt ?? article.dek}
                      </p>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                      <span className="text-label-upper text-muted">
                        {article.readingTimeMinutes ?? article.readTimeMinutes ?? 5} MIN READ
                      </span>
                      <span
                        className="text-muted group-hover:text-[var(--color-accent)] group-hover:translate-x-1 transition-all duration-[var(--duration-base)]"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
            <div className="border-t border-[var(--color-border)]" aria-hidden="true" />
          </div>

          <div className="mt-8 md:hidden">
            <Button as="link" href="/lobby" variant="ghost" size="sm">
              All dispatches →
            </Button>
          </div>

        </div>
      </div>
    </section>
  )
}

// Backwards-compatible export
export const JournalPreview = LobbyPreview
