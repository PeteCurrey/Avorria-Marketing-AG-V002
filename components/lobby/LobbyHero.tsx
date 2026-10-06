import Image from 'next/image'
import Link from 'next/link'
import type { LobbyArticle } from '@/types/lobby'
import { getArticleImageMeta } from './LobbyArticleImage'

interface LobbyHeroProps {
  article?: LobbyArticle | null
}

export function LobbyHero({ article }: LobbyHeroProps) {
  // Use atmospheric cinematic asset to avoid embedded UI screenshot text clashing with the headline
  const imageUrl = '/images/cinematic/work-drawdown.jpg'
  const imageAlt = article?.title || 'The Lobby — Avorria'
  const title = article?.title || 'The Lobby'
  const category = article?.categoryName || article?.categoryLabel || article?.category || 'Editorial Intelligence'
  const readTime = article?.readingTimeMinutes ?? article?.readTimeMinutes ?? 6
  const excerpt = article?.excerpt || article?.dek || 'What changed. What matters. What you should do about it.'
  const articleHref = article ? `/lobby/${article.slug}` : '/lobby'

  return (
    <section
      className="-mt-16 md:-mt-20 relative flex flex-col justify-end min-h-[92svh] lg:min-h-[95svh] w-full overflow-hidden"
      data-chapter="photographic"
      aria-labelledby="lobby-hero-heading"
    >
      {/* ── Full-Bleed Editorial Plate — confident, image-first art direction ── */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none" aria-hidden="true">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter contrast-[1.03]"
        />
        {/* Deep architectural grounding gradient — guarantees WCAG AAA on Ivory text */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(26,25,22,0.92) 0%, rgba(26,25,22,0.6) 45%, rgba(26,25,22,0.15) 80%, rgba(26,25,22,0.4) 100%)'
          }}
        />
      </div>

      {/* ── Content: Overlaid on featured story plate ── */}
      <div className="relative z-10 w-full px-6 md:px-10 lg:px-[7vw] pt-28 pb-14 md:pb-18">
        <div className="max-w-[960px]">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }} aria-hidden="true" />
            <p className="text-[0.6875rem] font-light tracking-[0.2em] uppercase text-[var(--color-accent-light)] opacity-90">
              THE LOBBY · LEAD STORY · {category}
            </p>
          </div>

          {/* Monumental Overlaid Story Title */}
          <Link href={articleHref} className="group block mb-6">
            <h1
              id="lobby-hero-heading"
              className="text-[clamp(2.5rem,6.5vw,6.5rem)] font-extralight tracking-[-0.03em] leading-[1.0] group-hover:text-[var(--color-accent-light)] transition-colors duration-200"
              style={{ color: 'var(--color-ivory)' }}
            >
              {title}
            </h1>
          </Link>

          {/* Supporting Excerpt */}
          <p
            className="text-[1.125rem] sm:text-[1.25rem] font-light leading-relaxed max-w-[62ch] mb-8"
            style={{ color: 'var(--color-ivory)', opacity: 0.8 }}
          >
            {excerpt}
          </p>

          {/* Actions Cluster */}
          <div className="flex flex-wrap items-center gap-4">
            {article && (
              <Link
                href={articleHref}
                className="inline-flex items-center gap-2 text-xs font-light tracking-[0.12em] uppercase px-5 py-3 transition-colors duration-200 !bg-[var(--color-ivory)] !text-[var(--color-graphite)] hover:!bg-white"
              >
                <span>Read Story ({readTime} Min)</span>
                <span aria-hidden="true">→</span>
              </Link>
            )}

            <Link
              href="/lobby/search"
              className="text-xs font-light tracking-[0.12em] uppercase px-4 py-3 transition-colors duration-200"
              style={{
                color: 'var(--color-ivory)',
                border: '1px solid rgba(247,245,240,0.3)',
              }}
              aria-label="Search The Lobby articles"
            >
              Search Archive
            </Link>

            <Link
              href="/lobby/rss.xml"
              className="text-xs font-light tracking-[0.12em] uppercase px-4 py-3 transition-colors duration-200"
              style={{
                color: 'var(--color-ivory)',
                opacity: 0.6,
                border: '1px solid rgba(247,245,240,0.15)',
              }}
              aria-label="RSS feed for The Lobby"
            >
              RSS Feed
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="mt-14 pt-6 flex items-center justify-between" style={{ borderTop: '1px solid rgba(247,245,240,0.15)' }}>
          <div className="flex items-center gap-3">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
              style={{ border: '1px solid rgba(247,245,240,0.3)', color: 'var(--color-ivory)' }}
            >
              ↓
            </div>
            <span className="text-[0.625rem] tracking-[0.2em] uppercase font-light text-[var(--color-ivory)] opacity-60">
              EXPLORE ALL DISPATCHES
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[0.625rem] tracking-[0.2em] uppercase font-light text-[var(--color-ivory)] opacity-40">
            <span>AVORRIA EDITORIAL</span>
            <span>·</span>
            <span>NO SPONSORED CONTENT</span>
          </div>
        </div>
      </div>
    </section>
  )
}
