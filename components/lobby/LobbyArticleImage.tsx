import Image from 'next/image'
import type { LobbyArticle } from '@/types/lobby'

/**
 * Editorial imagery mapping for Lobby articles.
 * Uses verified authentic project & architectural assets from Avorria's repository.
 * Zero generic stock, zero obvious AI-generated images.
 */
export const LOBBY_ARTICLE_IMAGES: Record<string, { src: string; alt: string; focal?: string }> = {
  'websites-we-would-fire': {
    src: '/images/projects/alkota-bikes/hero-screenshot.png',
    alt: 'High-performance digital flagship architecture — clean engineering contrasting common failure archetypes',
    focal: 'center center',
  },
  'google-inp-core-web-vitals-architecture': {
    src: '/images/projects/drawdown/hero.png',
    alt: 'Sub-millisecond quantitative Canvas telemetry and interaction latency optimization',
    focal: 'center center',
  },
  'the-end-of-the-agency-retainer': {
    src: '/images/positioning/manifesto.jpg',
    alt: 'Avorria engineering manifesto and sovereign commercial sprint specification',
    focal: 'center center',
  },
  'meta-advantage-plus-creative-fatigue': {
    src: '/images/projects/entirefm/hero.webp',
    alt: 'Commercial organic infrastructure and programmatic landing page architecture',
    focal: 'center center',
  },
  'applied-ai-without-hallucination': {
    src: '/images/projects/careeros/hero-screenshot.png',
    alt: 'Deterministic enterprise state machines, Zod schema gating, and autonomous agent workflows',
    focal: 'center center',
  },
  'monolithic-cms-technical-debt': {
    src: '/images/projects/tafm/hero-screenshot.png',
    alt: 'High-volume commercial marketplace software versus bloated legacy monolithic CMS platforms',
    focal: 'center center',
  },
}

const DEFAULT_IMAGE = {
  src: '/images/architecture/01-website.jpg',
  alt: 'Avorria editorial intelligence — digital systems, architecture, and technology',
  focal: 'center center',
}

interface LobbyArticleImageProps {
  article: LobbyArticle
  className?: string
  aspectRatio?: '4/3' | '16/9' | '16/10' | '3/2'
  priority?: boolean
  sizes?: string
}

export function getArticleImageMeta(article: LobbyArticle) {
  if (article.heroMedia?.url) {
    return {
      src: article.heroMedia.url,
      alt: article.heroMedia.altText || article.heroMedia.caption || article.title,
      focal: 'center center',
    }
  }
  if (article.thumbnailMedia?.url) {
    return {
      src: article.thumbnailMedia.url,
      alt: article.thumbnailMedia.altText || article.title,
      focal: 'center center',
    }
  }
  return LOBBY_ARTICLE_IMAGES[article.slug] || DEFAULT_IMAGE
}

export function LobbyArticleImage({
  article,
  className = '',
  aspectRatio = '4/3',
  priority = false,
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
}: LobbyArticleImageProps) {
  const meta = getArticleImageMeta(article)

  const aspectClass =
    aspectRatio === '4/3'
      ? 'aspect-[4/3]'
      : aspectRatio === '16/9'
        ? 'aspect-[16/9]'
        : aspectRatio === '16/10'
          ? 'aspect-[16/10]'
          : 'aspect-[3/2]'

  return (
    <div
      className={[
        'group-hover:border-[var(--color-border-strong)] relative w-full overflow-hidden bg-[#161513] border border-[var(--color-border)] transition-colors duration-300',
        aspectClass,
        className,
      ].join(' ')}
    >
      <Image
        src={meta.src}
        alt={meta.alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover object-center transition-all duration-700 ease-out group-hover:scale-[1.03]"
        style={{ objectPosition: meta.focal || 'center center' }}
      />
      {/* Editorial overlay & subtle vignette */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"
        aria-hidden="true"
      />
      {/* Precision corner registration ticks — signature Avorria motif */}
      <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/30" aria-hidden="true" />
      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/30" aria-hidden="true" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/30" aria-hidden="true" />
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/30" aria-hidden="true" />
    </div>
  )
}
