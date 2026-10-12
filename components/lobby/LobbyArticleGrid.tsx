import Link from 'next/link'
import type { LobbyArticle } from '@/types/lobby'
import { LobbyArticleImage, getArticleDiscipline } from './LobbyArticleImage'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

interface LobbyArticleGridProps {
  articles: LobbyArticle[]
  title?: string
  eyebrow?: string
  variant?: 'standard' | 'asymmetric'
}

export function LobbyArticleGrid({
  articles,
  title = 'Latest Intelligence',
  eyebrow = 'DISPATCHES · ARCHIVE',
  variant = 'standard',
}: LobbyArticleGridProps) {
  if (!articles || articles.length === 0) return null

  if (variant === 'asymmetric' && articles.length >= 3) {
    const lead = articles[0]
    const duo = articles.slice(1, 3)
    const rest = articles.slice(3)
    const leadDiscipline = getArticleDiscipline(lead)

    return (
      <section aria-labelledby="latest-articles-heading" className="w-full">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-10 border-b border-[var(--color-border)]">
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

        {/* ── Red Bull Asymmetric 7+5 Stage ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch mb-12">
          {/* 7 Columns Lead Story */}
          <div className="lg:col-span-7">
            <RevealOnScroll>
              <article className="border border-[var(--color-border)] bg-white p-6 sm:p-8 flex flex-col justify-between h-full group hover:border-[var(--color-border-strong)] transition-all duration-300">
                <Link href={`/lobby/${lead.slug}`} className="block">
                  <div className="mb-6 overflow-hidden">
                    <LobbyArticleImage
                      article={lead}
                      aspectRatio="16/10"
                      sizes="(min-width: 1024px) 58vw, 100vw"
                    />
                  </div>

                  <div className="flex items-center gap-3 text-[0.625rem] font-light tracking-[0.18em] uppercase text-[var(--color-graphite-muted)] mb-3">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: leadDiscipline.accentColor }}
                      aria-hidden="true"
                    />
                    <span className="text-[var(--color-graphite)]">{leadDiscipline.badgeText}</span>
                    <span aria-hidden="true">·</span>
                    <span>{lead.categoryName || lead.categoryLabel || lead.category}</span>
                  </div>

                  <h3 className="text-[clamp(1.5rem,2.5vw,2.25rem)] font-extralight tracking-tight text-[var(--color-graphite)] leading-[1.12] mb-4 group-hover:text-[var(--color-rose-text)] transition-colors duration-200">
                    {lead.title}
                  </h3>

                  <p className="text-[0.9375rem] font-light text-[var(--color-graphite-mid)] leading-relaxed mb-6 max-w-[54ch]">
                    {lead.excerpt ?? lead.dek ?? ''}
                  </p>
                </Link>

                <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between text-[0.6875rem] font-light tracking-[0.1em] uppercase text-[var(--color-graphite-muted)]">
                  <div className="flex items-center gap-3">
                    <span>{fmt(lead.publishedAt)}</span>
                    <span aria-hidden="true">·</span>
                    <span>{lead.readingTimeMinutes ?? lead.readTimeMinutes ?? 5} MIN READ</span>
                  </div>
                  <Link
                    href={`/lobby/${lead.slug}`}
                    className="inline-flex items-center gap-1.5 text-[var(--color-graphite)] group-hover:text-[var(--color-rose-text)] transition-colors duration-200"
                  >
                    <span>Read Investigation</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            </RevealOnScroll>
          </div>

          {/* 5 Columns Stacked Duo */}
          <div className="lg:col-span-5 flex flex-col gap-8 justify-between">
            {duo.map((article, idx) => {
              const discipline = getArticleDiscipline(article)
              return (
                <RevealOnScroll key={article.slug} delay={idx * 100}>
                  <article className="border border-[var(--color-border)] bg-white p-6 flex flex-col justify-between h-full group hover:border-[var(--color-border-strong)] transition-all duration-300">
                    <Link href={`/lobby/${article.slug}`} className="block">
                      <div className="mb-4 overflow-hidden">
                        <LobbyArticleImage
                          article={article}
                          aspectRatio="16/9"
                          sizes="(min-width: 1024px) 40vw, 100vw"
                        />
                      </div>

                      <div className="flex items-center gap-3 text-[0.625rem] font-light tracking-[0.18em] uppercase text-[var(--color-graphite-muted)] mb-2">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: discipline.accentColor }}
                          aria-hidden="true"
                        />
                        <span className="text-[var(--color-graphite)]">{discipline.label}</span>
                        <span aria-hidden="true">·</span>
                        <span>{article.categoryName || article.categoryLabel || article.category}</span>
                      </div>

                      <h3 className="text-[1.25rem] font-extralight tracking-tight text-[var(--color-graphite)] leading-[1.2] mb-3 group-hover:text-[var(--color-rose-text)] transition-colors duration-200">
                        {article.title}
                      </h3>

                      <p className="text-[0.8125rem] font-light text-[var(--color-graphite-mid)] leading-relaxed line-clamp-2 mb-4">
                        {article.excerpt ?? article.dek ?? ''}
                      </p>
                    </Link>

                    <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-[0.6875rem] font-light tracking-[0.1em] uppercase text-[var(--color-graphite-muted)]">
                      <span>{article.readingTimeMinutes ?? article.readTimeMinutes ?? 5} MIN READ</span>
                      <Link
                        href={`/lobby/${article.slug}`}
                        className="inline-flex items-center gap-1.5 text-[var(--color-graphite)] group-hover:text-[var(--color-rose-text)] transition-colors duration-200"
                      >
                        <span>Read</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </article>
                </RevealOnScroll>
              )
            })}
          </div>
        </div>

        {/* Remaining articles in standard magazine grid */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 pt-4">
            {rest.map((article, idx) => (
              <ArticleGridCard key={article.slug} article={article} delay={idx * 60} />
            ))}
          </div>
        )}
      </section>
    )
  }

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
          {articles.length} ARTICLES
        </p>
      </div>

      {/* ── 3-Column Editorial Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {articles.map((article, idx) => (
          <ArticleGridCard key={article.slug} article={article} delay={idx * 50} />
        ))}
      </div>
    </section>
  )
}

function ArticleGridCard({ article, delay = 0 }: { article: LobbyArticle; delay?: number }) {
  const categoryLabel = article.categoryName || article.categoryLabel || article.category || 'Article'
  const readTime = article.readingTimeMinutes ?? article.readTimeMinutes ?? 5
  const excerpt = article.excerpt ?? article.dek ?? ''
  const discipline = getArticleDiscipline(article)

  return (
    <RevealOnScroll delay={delay}>
      <article className="border border-[var(--color-border)] bg-white p-6 flex flex-col justify-between group hover:border-[var(--color-border-strong)] transition-all duration-300 h-full">
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

          {/* Discipline & Category */}
          <div className="flex items-center justify-between gap-2 text-[0.625rem] font-light tracking-[0.16em] uppercase text-[var(--color-graphite-muted)] mb-3">
            <span className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: discipline.accentColor }}
                aria-hidden="true"
              />
              <span className="text-[var(--color-graphite)]">{discipline.label}</span>
              <span aria-hidden="true">·</span>
              <span>{categoryLabel}</span>
            </span>
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
    </RevealOnScroll>
  )
}
