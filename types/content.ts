/**
 * Avorria — Content Types
 * CMS-ready data shapes. Switching to Sanity/Contentful requires
 * only replacing the data source, not the component architecture.
 */

// ─── Shared ─────────────────────────────────────────────────────────────────

export type ContentStatus = 'published' | 'draft'

export interface SEOMeta {
  title: string
  description: string
  ogImage?: string
  noIndex?: boolean
}

// ─── Projects / Work ─────────────────────────────────────────────────────────

export type ProjectService =
  | 'web-development'
  | 'ai-development'
  | 'digital-systems'
  | 'ecommerce'
  | 'web-application'

export interface ProjectMediaAsset {
  src: string
  srcAvif?: string
  alt: string
  blurDataURL?: string
  width?: number
  height?: number
}

export interface Project {
  slug: string
  status: ContentStatus
  title: string
  client: string
  year: number
  industry: string
  services: ProjectService[]
  summary: string          // One sentence — shown in listings
  description: string      // Two to three sentences — shown on project page
  challenge?: string
  approach?: string
  technology?: string[]
  // Outcome: only factual, verified information. NO invented metrics.
  outcome?: string
  /** Card thumbnail — used on homepage Work showcase (approx 800×600) */
  thumbnail?: ProjectMediaAsset
  /** Legacy field — alias for thumbnail.src in older components */
  coverImage?: {
    src: string
    alt: string
    width: number
    height: number
  }
  /** Case study page hero image (approx 1600×900) */
  heroImage?: ProjectMediaAsset
  /** Case study page hero video — replaces heroImage when supplied */
  heroVideo?: {
    src: string
    poster: string
    alt: string
  }
  /** Additional editorial gallery images */
  gallery?: ProjectMediaAsset[]
  /**
   * Homepage Selected Work layout variant.
   * Controls which editorial treatment is applied in SelectedWork.tsx.
   * Defaults to 'horizontal' when omitted.
   */
  homepageLayout?: 'horizontal' | 'dark-split' | 'asymmetric' | 'full-width' | 'side-by-side' | 'text-led'
  featured: boolean
  seo: SEOMeta
}


// ─── Services ────────────────────────────────────────────────────────────────

export interface ServiceCapability {
  title: string
  description: string
}

export interface ServiceApproachStep {
  step: string
  title: string
  description: string
}

export interface ServiceFaqItem {
  question: string
  answer: string
}

export interface Service {
  slug: string
  status: ContentStatus
  title: string
  headline: string
  description: string
  capabilities: ServiceCapability[]
  technology?: string[]
  seo: SEOMeta
  // Phase 3 enriched commercial fields
  disciplineEyebrow?: string
  heroHeadline?: { before?: string; accent?: string; after?: string }[]
  heroImage?: string
  heroAlt?: string
  metaLeft?: string
  metaRight?: string
  problemTitle?: string
  problemStatement?: string
  problemDetail?: string[]
  approachTitle?: string
  approachStatement?: string
  approachSteps?: ServiceApproachStep[]
  caseStudySlugs?: string[]
  faqTitle?: string
  faqs?: ServiceFaqItem[]
}

// ─── Journal ─────────────────────────────────────────────────────────────────

export type JournalCategory =
  | 'build-notes'
  | 'ai'
  | 'web'
  | 'systems'
  | 'insights'

export interface JournalArticle {
  slug: string
  status: ContentStatus
  title: string
  category: JournalCategory
  excerpt: string
  content: string          // Markdown or rich text — CMS-ready
  author: {
    name: string
    // role?: string
  }
  publishedAt: string      // ISO date string
  updatedAt?: string
  readingTimeMinutes?: number
  tags?: string[]
  seo: SEOMeta
}
