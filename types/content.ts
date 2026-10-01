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
  coverImage?: {
    src: string
    alt: string
    width: number
    height: number
  }
  featured: boolean
  seo: SEOMeta
}

// ─── Services ────────────────────────────────────────────────────────────────

export interface ServiceCapability {
  title: string
  description: string
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
