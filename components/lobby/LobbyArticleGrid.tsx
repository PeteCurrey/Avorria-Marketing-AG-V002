import Link from 'next/link'
import type { LobbyArticle } from '@/types/lobby'
import { LobbyArticleImage } from './LobbyArticleImage'

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

interface LobbyArticleGridProps {
  articles: LobbyArticle[]
  title?: string
  eyebrow?: string
}

export function LobbyArticleGrid({
  articles,
  title = 'Latest Intelligence',
  eyebrow = 'DISPATCHES // ARCHIVE',
}: LobbyArticleGridProps) {
  if (!articles || articles.length === 0) return null

  return (
    <section aria-labelledby="latest-articles-heading" className="w-full">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-[var(--color-border)]">
        <div>
          <p className="text-[0.625rem] font-light tracking-[0.2em] uppercase text-[var(--color-graphite-muted)] mb-2">
            {eyebrow}
          </p>
          <h2
            id="latest-articles-heading"
            className="text-[var(--text-display-s)] font-extralight tracking-[-0.015em] text-[var(--color-graphite)]"
          >
            {title}
          </h2>
        </div>
        <p className="text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)]">
          {articles.length} DISPATCHES
        </p>
      </div>

      {/* ── 3-Column Editorial Grid on Desktop, 2 on Tablet, 1 on Mobile ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {articles.map((article) => {
          const categoryLabel = article.categoryName || article.categoryLabel || article.category || 'Article'
          const readTime = article.readingTimeMinutes ?? article.readTimeMinutes ?? 5
          const excerpt = article.excerpt ?? article.dek ?? ''

          return (
            <article key={article.slug} className="flex flex-col justify-between group">
              <Link
                href={`/lobby/${article.slug}`}
                className="block flex-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-graphite)]"
              >
                {/* 4:3 Editorial Image */}
                <div className="mb-5 overflow-hidden">
                  <LobbyArticleImage
                    article={article}
                    aspectRatio="4/3"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>

                {/* Category & Date */}
                <div className="flex items-center justify-between gap-2 text-[0.625rem] font-light tracking-[0.16em] uppercase text-[var(--color-graphite-muted)] mb-3">
                  <span className="text-[var(--color-graphite-mid)]">{categoryLabel}</span>
                  <span>{fmt(article.publishedAt)}</span>
                </div>

                {/* Headline */}
                <h3 className="text-[1.25rem] font-extralight tracking-[-0.01em] text-[var(--color-graphite)] leading-[1.2] mb-3 group-hover:text-[var(--color-rose-text)] transition-colors duration-200">
                  {article.title}
                </h3>

                {/* Excerpt */}
                {excerpt && (
                  <p className="text-[0.875rem] font-light text-[var(--color-graphite-mid)] leading-relaxed line-clamp-3 mb-6">
                    {excerpt}
                  </p>
                )}
              </Link>

              {/* Bottom Rule & Reading Time / Arrow */}
              <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between text-[0.6875rem] font-light tracking-[0.1em] uppercase text-[var(--color-graphite-muted)]">
                <span>{readTime} MIN READ</span>
                <Link
                  href={`/lobby/${article.slug}`}
                  className="inline-flex items-center gap-1.5 text-[var(--color-graphite)] group-hover:text-[var(--color-rose-text)] transition-colors duration-200"
                  aria-label={`Read ${article.title}`}
                >
                  <span>READ</span>
                  <span
                    className="text-base transition-transform duration-300 ease-out group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
