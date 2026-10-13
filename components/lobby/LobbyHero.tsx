import Image from 'next/image'
import Link from 'next/link'
import type { LobbyArticle } from '@/types/lobby'
import { getArticleImageMeta, getArticleDiscipline } from './LobbyArticleImage'

interface LobbyHeroProps {
  article?: LobbyArticle | null
}

/**
 * LobbyHero — Red Bull Digital Platform Lead Story Stage
 *
 * Full-screen media plate for The Lobby with Ken Burns zoom,
 * pill category tags, and Red Bull pill CTAs.
 */
export function LobbyHero({ article }: LobbyHeroProps) {
  const imageMeta = article
    ? getArticleImageMeta(article)
    : { src: '/images/cinematic/work-drawdown.jpg', alt: 'The Lobby — Avorria' }
  const title = article?.title || 'The Lobby'
  const category = article?.categoryName || article?.categoryLabel || article?.category || 'Editorial Intelligence'
  const readTime = article?.readingTimeMinutes ?? article?.readTimeMinutes ?? 6
  const excerpt = article?.excerpt || article?.dek || 'What changed. What matters. What you should do about it.'
  const articleHref = article ? `/lobby/${article.slug}` : '/lobby'
  const discipline = article ? getArticleDiscipline(article) : null

  return (
    <section
      className="relative flex flex-col justify-end min-h-[92svh] lg:min-h-[95svh] w-full overflow-hidden bg-[#000F1E] text-white"
      style={{
        marginTop: 'calc(-1 * var(--nav-height, 68px))',
      }}
      data-chapter="hero"
      aria-labelledby="lobby-hero-heading"
    >
      {/* ── Background Media: Ken Burns Ambient Zoom ─────────────── */}
      <div className="absolute inset-0 z-0 hero-kb-image overflow-hidden" aria-hidden="true">
        <Image
          src={imageMeta.src}
          alt={imageMeta.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter contrast-[1.08] brightness-[0.7]"
        />
        {/* Multi-layer Gradient Scrim for AAA contrast */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, #000F1E 0%, rgba(0,15,30,0.85) 40%, rgba(0,15,30,0.3) 75%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(0,15,30,0.85) 0%, rgba(0,15,30,0.4) 60%, transparent 100%)',
          }}
        />
      </div>

      {/* ── Content: Overlaid on featured story plate ─────────────── */}
      <div
        className="relative z-10 w-full mx-auto max-w-[1920px] pb-14 md:pb-20"
        style={{
          paddingInline: 'clamp(1.25rem, 5vw, 5rem)',
          paddingTop: 'clamp(7rem, 15vh, 10rem)',
        }}
      >
        <div className="max-w-[960px]">
          {/* Eyebrow & Category Pill */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[0.6875rem] uppercase tracking-[0.16em] font-light text-white bg-white/10 backdrop-blur-md border border-white/15"
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: discipline?.accentColor ?? 'var(--color-cobalt, #3157FF)' }}
                aria-hidden="true"
              />
              THE LOBBY · LEAD STORY · {category}
            </span>

            {discipline && (
              <span className="text-[0.625rem] font-light tracking-[0.14em] uppercase text-white/60 border border-white/10 px-2.5 py-0.5 rounded-full">
                {discipline.badgeText}
              </span>
            )}
          </div>

          {/* Monumental Overlaid Story Title */}
          <Link href={articleHref} className="group block mb-6">
            <h1
              id="lobby-hero-heading"
              className="text-[clamp(2.5rem,6vw,5.5rem)] font-extralight tracking-[-0.03em] uppercase leading-[0.98] text-white group-hover:text-[var(--color-cobalt, #3157FF)] transition-colors duration-200"
            >
              {title}
            </h1>
          </Link>

          {/* Supporting Excerpt */}
          <p
            className="text-base sm:text-lg font-light leading-relaxed max-w-[62ch] mb-8 text-white/75"
          >
            {excerpt}
          </p>

          {/* Red Bull Pill Button CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            {article && (
              <Link
                href={articleHref}
                className="rb-pill-btn rb-pill-btn-primary"
                style={{ padding: '0.65rem 1.6rem', fontSize: '0.875rem' }}
              >
                <span>Read Story ({readTime} Min)</span>
                <span aria-hidden="true">→</span>
              </Link>
            )}

            <Link
              href="/lobby/search"
              className="rb-pill-btn rb-pill-btn-tertiary"
              style={{ padding: '0.65rem 1.4rem', fontSize: '0.875rem' }}
              aria-label="Search The Lobby articles"
            >
              Search Archive
            </Link>

            <Link
              href="/lobby/rss.xml"
              className="rb-pill-btn rb-pill-btn-tertiary"
              style={{ padding: '0.65rem 1.2rem', fontSize: '0.875rem', opacity: 0.7 }}
              aria-label="RSS feed for The Lobby"
            >
              RSS Feed
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="mt-14 pt-6 flex items-center justify-between border-t border-white/10 text-white/40">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-xs text-white/60">
              ↓
            </div>
            <span className="text-[0.625rem] tracking-[0.2em] uppercase font-light text-white/50">
              EXPLORE ALL DISPATCHES
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[0.625rem] tracking-[0.2em] uppercase font-light text-white/40">
            <span>AVORRIA EDITORIAL</span>
            <span>·</span>
            <span>ZERO VENDOR SPONSORSHIP</span>
          </div>
        </div>
      </div>
    </section>
  )
}
