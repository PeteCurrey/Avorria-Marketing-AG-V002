import Link from 'next/link'
import type { LobbyArticle } from '@/types/lobby'
import { LobbyArticleImage } from './LobbyArticleImage'

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

interface LobbyFeaturedStoryProps {
  article: LobbyArticle
}

export function LobbyFeaturedStory({ article }: LobbyFeaturedStoryProps) {
  const categoryLabel = article.categoryName || article.categoryLabel || article.category || 'Teardowns'
  const readTime = article.readingTimeMinutes ?? article.readTimeMinutes ?? 7
  const excerpt = article.excerpt ?? article.dek ?? ''

  return (
    <section aria-labelledby="featured-story-heading" className="w-full">
      <Link
        href={`/lobby/${article.slug}`}
        className="group block border border-[var(--color-border)] hover:border-[var(--color-border-strong)] bg-white transition-colors duration-300"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
          {/* ── Left Column: Large Editorial Image (50-55% width on desktop) ── */}
          <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[420px] lg:min-h-[500px] border-b lg:border-b-0 lg:border-r border-[var(--color-border)]">
            <LobbyArticleImage
              article={article}
              aspectRatio="16/10"
              priority
              className="w-full h-full !border-0"
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
          </div>

          {/* ── Right Column: Editorial Text & Metadata ── */}
          <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 xl:p-14 flex flex-col justify-between">
            <div>
              {/* Category & Badge */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[0.625rem] font-light tracking-[0.2em] uppercase text-[var(--color-accent)] border border-[var(--color-accent)]/30 px-2 py-0.5">
                  FEATURED
                </span>
                <span className="text-[0.6875rem] font-light tracking-[0.16em] uppercase text-[var(--color-graphite-muted)]">
                  {categoryLabel}
                </span>
              </div>

              {/* Headline */}
              <h2
                id="featured-story-heading"
                className="text-[clamp(1.75rem,3.2vw,2.75rem)] font-extralight tracking-[-0.02em] text-[var(--color-graphite)] leading-[1.1] mb-6 group-hover:text-[var(--color-rose-text)] transition-colors duration-200"
              >
                {article.title}
              </h2>

              {/* Description */}
              {excerpt && (
                <p className="text-[var(--text-body)] font-light text-[var(--color-graphite-mid)] leading-relaxed mb-8 max-w-[48ch]">
                  {excerpt}
                </p>
              )}
            </div>

            {/* Bottom Metadata & Interactive Arrow */}
            <div className="pt-6 border-t border-[var(--color-border)] flex items-center justify-between">
              <div className="flex items-center gap-3 text-[0.6875rem] font-light tracking-[0.12em] uppercase text-[var(--color-graphite-muted)]">
                <span>{fmt(article.publishedAt)}</span>
                <span aria-hidden="true">·</span>
                <span>{readTime} MIN READ</span>
              </div>

              <div className="flex items-center gap-2 text-[0.8125rem] font-light tracking-[0.1em] uppercase text-[var(--color-graphite)] group-hover:text-[var(--color-rose-text)] transition-colors duration-200">
                <span className="hidden sm:inline">READ DOSSIER</span>
                <span
                  className="text-lg transition-transform duration-300 ease-out group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </div>
            </div>

          </div>

        </div>
      </Link>
    </section>
  )
}
