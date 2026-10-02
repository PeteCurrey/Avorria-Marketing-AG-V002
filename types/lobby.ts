/**
 * types/lobby.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Domain types for The Lobby — Avorria's editorial, intelligence, and resource system.
 * Enforces strict provenance, source-linking, and publication lifecycle.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type LobbyContentType =
  | 'ARTICLE'
  | 'GUIDE'
  | 'NEWS_UPDATE'
  | 'RESOURCE'
  | 'CASE_STUDY'
  | 'ANNOUNCEMENT'

export type LobbyArticleStatus =
  | 'DRAFT'
  | 'REVIEW'
  | 'APPROVED'
  | 'PUBLISHED'
  | 'ARCHIVED'

export type LobbyProvenanceState =
  | 'VERIFIED'           // Audited empirical metrics or source code commits
  | 'SOURCE_LINKED'      // Backed by primary external sources (Google, Meta, SEC, etc.)
  | 'EDITORIAL_ANALYSIS' // Analytical framework / synthesis by Avorria principals
  | 'OPINION'            // Stated philosophical or contrarian perspective
  | 'DRAFT'              // Internal staging / review only

export type LobbyCtaType =
  | 'start-a-project'
  | 'website-audit'
  | 'consultation'
  | 'services'
  | 'none'

export interface LobbyAuthor {
  id: string
  name: string
  role: string
  bio: string
  profileImage?: string | null
  slug: string
  socialLinks?: Record<string, string>
  isActive: boolean
}

export interface LobbyCategory {
  id: string
  name: string
  slug: string
  description: string
  displayOrder: number
  isActive: boolean
  seoTitle?: string
  seoDescription?: string
  ogImage?: string
  dispatchCount?: number
}

export interface LobbyTag {
  id: string
  name: string
  slug: string
  description?: string
  isActive: boolean
  articleCount?: number
}

export interface LobbySource {
  id: string
  title: string
  url: string
  publisher: string
  retrievedDate: string
  quoteSnippet?: string
  sourceType?: 'OFFICIAL_DOCUMENTATION' | 'ACADEMIC_PAPER' | 'REGULATORY_FILING' | 'INDUSTRY_BENCHMARK' | 'PRIMARY_INTERVIEW'
  verificationStatus?: 'VERIFIED' | 'DOCUMENTED' | 'EXTERNAL'
}

export interface LobbyDataSnippet {
  metric: string
  label: string
  source: string
  provenance: LobbyProvenanceState
}

export interface LobbyAnnotation {
  id: string
  targetSection: string
  note: string
  author: string
}

export interface LobbySection {
  title?: string
  romanNumeral?: string
  paragraphs: string[]
  pullQuote?: {
    text: string
    attribution?: string
  }
  comparisonTable?: {
    headers: [string, string, string]
    rows: [string, string, string][]
  }
  codeSnippet?: {
    language: string
    code: string
    caption?: string
  }
  callout?: {
    type: 'KEY_TAKEAWAY' | 'ARCHITECTURAL_NOTE' | 'OPERATIONAL_RISK'
    title: string
    body: string
  }
}

export interface LobbyArticle {
  id: string
  title: string
  slug: string
  issueNumber?: string
  excerpt?: string
  dek?: string // Editorial subtitle / dek
  contentType?: LobbyContentType
  categoryId?: string
  category?: string
  categorySlug?: string
  categoryName?: string
  categoryLabel?: string
  authorId?: string
  author?: LobbyAuthor | { name: string; role: string }
  leadAuthor?: { name: string; role: string }
  heroMedia?: {
    url: string
    caption?: string
    altText?: string
    aspectRatio?: '16:9' | '21:9' | '4:3'
  }
  thumbnailMedia?: {
    url: string
    altText?: string
  }
  publishedAt: string
  updatedAt?: string
  status?: LobbyArticleStatus
  isFeatured?: boolean
  editorialStatus?: LobbyProvenanceState
  provenance?: {
    state: LobbyProvenanceState
    rationale: string
  }
  provenanceRationale?: string
  sources?: LobbySource[]
  sourceReferences?: LobbySource[]
  readingTimeMinutes?: number
  readTimeMinutes?: number
  tags?: LobbyTag[]
  sections: LobbySection[]
  dataSnippets?: LobbyDataSnippet[]
  annotations?: LobbyAnnotation[]
  relatedSlugs?: string[]
  ctaType?: LobbyCtaType
  seo?: {
    title?: string
    description?: string
    canonicalUrl?: string
    ogTitle?: string
    ogDescription?: string
    ogImage?: string
    noIndex?: boolean
    noFollow?: boolean
  }
  internalLinks?: {
    label: string
    href: string
    context: string
  }[]
  analytics?: {
    viewsCount: number
    readsCount: number
    avgTimeSeconds: number
    ctaClicksCount: number
  }
}
