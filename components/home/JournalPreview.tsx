import Link from 'next/link'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { Button } from '@/components/ui/Button'
import { getPublishedArticles } from '@/content/journal'

const categoryLabels: Record<string, string> = {
  'build-notes': 'Build Notes',
  ai: 'AI',
  web: 'Web',
  systems: 'Systems',
  insights: 'Insights',
}

export function JournalPreview() {
  const articles = getPublishedArticles().slice(0, 3)

  return (
    <section
      className="section-y-large border-b border-[var(--color-border)] bg-[var(--color-ivory-dark)]"
      aria-labelledby="journal-heading"
    >
      <div className="container-max">
        <div className="container-content">

          <div className="flex items-end justify-between mb-16 gap-8">
            <RevealOnScroll>
              <Eyebrow>06 — Journal</Eyebrow>
              <h2 id="journal-heading" className="text-display-l">
                Build notes &amp; insights.
              </h2>
            </RevealOnScroll>
            <RevealOnScroll>
              <Button as="link" href="/journal" variant="ghost" size="sm"
                className="hidden md:inline-flex shrink-0">
                All articles →
              </Button>
            </RevealOnScroll>
          </div>

          {articles.length === 0 ? (
            <RevealOnScroll>
              <div className="border border-[var(--color-border)] p-12 text-center">
                <p className="text-label-upper mb-3">Coming soon</p>
                <p className="text-secondary text-[var(--text-small)]">
                  Editorial articles, build notes and insights will appear here.
                </p>
              </div>
            </RevealOnScroll>
          ) : (
            <div className="space-y-0">
              {articles.map((article, i) => (
                <RevealOnScroll key={article.slug} delay={i * 80}>
                  <Link
                    href={`/journal/${article.slug}`}
                    className="group block border-t border-[var(--color-border)] py-8 hover:border-[var(--color-border-strong)] transition-colors duration-[var(--duration-base)]"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 md:gap-8 items-center">
                      <p className="text-label-upper">
                        {categoryLabels[article.category] ?? article.category}
                      </p>
                      <div>
                        <h3 className="text-[var(--text-heading)] font-display font-normal group-hover:text-[var(--color-accent)] transition-colors duration-[var(--duration-base)] mb-1">
                          {article.title}
                        </h3>
                        <p className="text-[var(--text-small)] text-secondary line-clamp-1">
                          {article.excerpt}
                        </p>
                      </div>
                      <div className="hidden md:flex items-center gap-4">
                        <span className="text-label-upper text-muted">
                          {new Date(article.publishedAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
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
          )}

          <div className="mt-8 md:hidden">
            <Button as="link" href="/journal" variant="ghost" size="sm">
              All articles →
            </Button>
          </div>

        </div>
      </div>
    </section>
  )
}
