import Image from 'next/image'
import type { LobbyArticle } from '@/types/lobby'

/**
 * Editorial imagery mapping for all 16 Lobby articles.
 * Uses verified authentic project & architectural assets from Avorria's repository.
 * Zero generic stock, zero hallucinated graphics.
 */
export const LOBBY_ARTICLE_IMAGES: Record<string, { src: string; alt: string; focal?: string }> = {
  'websites-we-would-fire': {
    src: '/images/cinematic/work-alkota.jpg',
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
  'when-to-rebuild-your-website': {
    src: '/images/cinematic/discipline-build.jpg',
    alt: 'Structural steel engineering — architectural foundations for complete website rebuilds',
    focal: 'center center',
  },
  'nextjs-vs-wordpress-engineering-comparison': {
    src: '/images/architecture/01-website.jpg',
    alt: 'Engineering analysis: React Server Components versus monolithic WordPress plugin stacks',
    focal: 'center center',
  },
  'protect-organic-traffic-website-migration': {
    src: '/images/cinematic/work-entirefm.jpg',
    alt: 'Enterprise 301 migration safeguards, canonical protection, and multi-domain authority consolidation',
    focal: 'center center',
  },
  'why-your-website-crawled-not-ranked': {
    src: '/images/cinematic/discipline-strategy.jpg',
    alt: 'Architectural studio blueprints — indexation bottlenecks and crawl budget diagnostics',
    focal: 'center center',
  },
  'custom-ai-vs-saas-business-decision': {
    src: '/images/architecture/05-ai.jpg',
    alt: 'Proprietary enterprise AI infrastructure versus recurring SaaS operational liabilities',
    focal: 'center center',
  },
  'what-a-custom-ai-agent-can-automate': {
    src: '/images/cinematic/discipline-systems.jpg',
    alt: 'Server hardware telemetry — background worker pipelines and autonomous business scout engines',
    focal: 'center center',
  },
  'ai-integration-without-exposing-sensitive-data': {
    src: '/images/cinematic/work-careeros.jpg',
    alt: 'Row Level Security, private vector embeddings, and sovereign model inference environments',
    focal: 'center center',
  },
  'how-to-evaluate-a-digital-agency': {
    src: '/images/architecture/07-business.jpg',
    alt: 'Commercial evaluation framework for senior operators vetting digital agencies',
    focal: 'center center',
  },
  'bespoke-web-application-when-to-build': {
    src: '/images/architecture/02-application.jpg',
    alt: 'Custom web application architecture vs off-the-shelf software limitations',
    focal: 'center center',
  },
  'core-web-vitals-ranking-reality': {
    src: '/images/cinematic/work-drawdown.jpg',
    alt: 'Real-user telemetry monitoring, sub-second LCP, and Google Core Web Vitals ranking impact',
    focal: 'center center',
  },
}

const DEFAULT_IMAGE = {
  src: '/images/architecture/01-website.jpg',
  alt: 'Avorria editorial intelligence — digital systems, architecture, and technology',
  focal: 'center center',
}

export type DisciplineKey = 'build' | 'search' | 'systems' | 'strategy'

export interface ArticleDisciplineInfo {
  key: DisciplineKey
  label: string
  sublabel: string
  badgeText: string
  accentColor: string
  serviceSlug: string
  serviceUrl: string
  serviceTitle: string
  serviceCta: string
}

const DISCIPLINE_MAP: Record<DisciplineKey, ArticleDisciplineInfo> = {
  build: {
    key: 'build',
    label: 'BUILD',
    sublabel: 'DIGITAL FLAGSHIPS & WEB CRAFT',
    badgeText: 'DISCIPLINE 01 // BUILD',
    accentColor: 'var(--color-cobalt)',
    serviceSlug: 'build',
    serviceUrl: '/services/build',
    serviceTitle: 'Bespoke Web Development & Next.js Platforms',
    serviceCta: 'Explore Build Capabilities ↗',
  },
  search: {
    key: 'search',
    label: 'SEARCH',
    sublabel: 'TECHNICAL SEARCH & REVENUE DISCOVERY',
    badgeText: 'DISCIPLINE 02 // SEARCH',
    accentColor: 'var(--color-graphite-mid)',
    serviceSlug: 'search',
    serviceUrl: '/services/search',
    serviceTitle: 'Technical Search Architecture & Migration Safeguards',
    serviceCta: 'Explore Search Architecture ↗',
  },
  systems: {
    key: 'systems',
    label: 'SYSTEMS',
    sublabel: 'AUTONOMOUS AI & DATA INFRASTRUCTURE',
    badgeText: 'DISCIPLINE 03 // SYSTEMS',
    accentColor: 'var(--color-petrol)',
    serviceSlug: 'systems',
    serviceUrl: '/services/systems',
    serviceTitle: 'Custom AI Development & Systems Automation',
    serviceCta: 'Explore Systems Engineering ↗',
  },
  strategy: {
    key: 'strategy',
    label: 'STRATEGY',
    sublabel: 'COMMERCIAL SPRINT SPECIFICATION',
    badgeText: 'STUDIO // COMMERCIAL ARCHITECTURE',
    accentColor: 'var(--color-rose-text)',
    serviceSlug: 'build',
    serviceUrl: '/services',
    serviceTitle: 'Integrated Studio Engineering Disciplines',
    serviceCta: 'Explore Studio Disciplines ↗',
  },
}

/**
 * Returns discipline classification and tokens for a given article.
 */
export function getArticleDiscipline(article: LobbyArticle | { slug?: string; category?: string; categorySlug?: string }): ArticleDisciplineInfo {
  const slug = article.slug || ''
  const cat = ('category' in article ? article.category : '') || ('categorySlug' in article ? article.categorySlug : '') || ''

  // Slug-level mapping
  if (
    slug === 'websites-we-would-fire' ||
    slug === 'google-inp-core-web-vitals-architecture' ||
    slug === 'monolithic-cms-technical-debt' ||
    slug === 'when-to-rebuild-your-website' ||
    slug === 'nextjs-vs-wordpress-engineering-comparison' ||
    slug === 'bespoke-web-application-when-to-build'
  ) {
    return DISCIPLINE_MAP.build
  }

  if (
    slug === 'protect-organic-traffic-website-migration' ||
    slug === 'why-your-website-crawled-not-ranked' ||
    slug === 'core-web-vitals-ranking-reality' ||
    slug === 'meta-advantage-plus-creative-fatigue'
  ) {
    return DISCIPLINE_MAP.search
  }

  if (
    slug === 'applied-ai-without-hallucination' ||
    slug === 'custom-ai-vs-saas-business-decision' ||
    slug === 'what-a-custom-ai-agent-can-automate' ||
    slug === 'ai-integration-without-exposing-sensitive-data'
  ) {
    return DISCIPLINE_MAP.systems
  }

  if (slug === 'the-end-of-the-agency-retainer' || slug === 'how-to-evaluate-a-digital-agency') {
    return DISCIPLINE_MAP.strategy
  }

  // Category fallback
  if (cat === 'websites' || cat === 'website-intelligence' || cat === 'teardowns') {
    return DISCIPLINE_MAP.build
  }
  if (cat === 'google-search' || cat === 'search-engine-intelligence' || cat === 'meta-social' || cat === 'platform-shifts') {
    return DISCIPLINE_MAP.search
  }
  if (cat === 'technology' || cat === 'applied-ai') {
    return DISCIPLINE_MAP.systems
  }

  return DISCIPLINE_MAP.strategy
}

interface LobbyArticleImageProps {
  article: LobbyArticle
  className?: string
  aspectRatio?: '4/3' | '16/9' | '16/10' | '3/2' | '21/9'
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
          : aspectRatio === '21/9'
            ? 'aspect-[21/9]'
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
