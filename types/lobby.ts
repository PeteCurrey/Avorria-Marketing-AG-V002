/**
 * types/lobby.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Domain types for The Lobby — Avorria's editorial intelligence hub.
 * "What changed. What matters. What you should do about it."
 * Enforces strict provenance, source-linking, and publication lifecycle.
 * No CASE_STUDY here — case studies live exclusively in /work.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── Content & Workflow Enums ─────────────────────────────────────────────────

export type LobbyContentType =
  | 'ARTICLE'
  | 'GUIDE'
  | 'NEWS_UPDATE'
  | 'RESOURCE'
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

export type LobbySchemaType = 'Article' | 'BlogPosting' | 'TechArticle'

export type LobbyCategorySlug = string

// ─── Five Launch Categories ───────────────────────────────────────────────────
// search | platforms | websites | marketing | avorria
// Structure supports more without refactor (display_order, is_active)

export type LobbyLaunchCategorySlug =
  | 'search'
  | 'platforms'
  | 'websites'
  | 'marketing'
  | 'avorria'

// ─── Structured Block Types (server-rendered, zero editor JS in public bundle) ─

export type LobbyBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3 | 4; text: string; id?: string }
  | { type: 'lead'; text: string }
  | { type: 'pullquote'; quote: string; attribution?: string }
  | { type: 'callout'; variant: 'takeaway' | 'risk' | 'architectural'; title: string; body: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'code'; language: string; code: string; caption?: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'divider' }
  | { type: 'image'; url: string; alt: string; caption?: string }

// Legacy section format (used by static seed content; renderer handles both)
export interface LobbySection {
  title?: string
  romanNumeral?: string
  paragraphs: string[]
  pullQuote?: { text: string; attribution?: string }
  comparisonTable?: { headers: [string, string, string]; rows: [string, string, string][] }
  codeSnippet?: { language: string; code: string; caption?: string }
  callout?: { type: 'KEY_TAKEAWAY' | 'ARCHITECTURAL_NOTE' | 'OPERATIONAL_RISK'; title: string; body: string }
}

// ─── Author ───────────────────────────────────────────────────────────────────
// Real team members only. Never fabricate contributor profiles.

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

// ─── Category ─────────────────────────────────────────────────────────────────

export interface LobbyCategory {
  id: string
  name: string
  slug: string
  label?: string                 // Compatibility alias
  description: string
  displayOrder: number
  isActive: boolean
  seoTitle?: string
  seoDescription?: string
  ogImage?: string
  dispatchCount?: number
}

// ─── Tag ─────────────────────────────────────────────────────────────────────

export interface LobbyTag {
  id: string
  name: string
  slug: string
  description?: string
  isActive: boolean
  articleCount?: number
}

// ─── Source / Citation ────────────────────────────────────────────────────────

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

// ─── Data Snippet ─────────────────────────────────────────────────────────────

export interface LobbyDataSnippet {
  metric: string
  label: string
  source: string
  provenance: LobbyProvenanceState
}

// ─── Annotation ───────────────────────────────────────────────────────────────

export interface LobbyAnnotation {
  id: string
  targetSection: string
  note: string
  author: string
}

// ─── Revision ─────────────────────────────────────────────────────────────────

export interface LobbyRevision {
  id: string
  version: number
  title: string
  excerpt?: string
  authorId?: string
  notes?: string
  createdAt: string
}

// ─── Article ─────────────────────────────────────────────────────────────────

export interface LobbyArticle {
  id: string
  title: string
  slug: string
  issueNumber?: string
  excerpt?: string
  dek?: string                   // Editorial subtitle / dek (alias for excerpt in UI)
  contentType?: LobbyContentType
  categoryId?: string
  category?: string              // slug alias for compatibility with static seed
  categorySlug?: string
  categoryName?: string
  categoryLabel?: string
  authorId?: string
  author?: LobbyAuthor | { name: string; role: string; slug?: string }
  leadAuthor?: { name: string; role: string }
  heroMedia?: {
    url: string
    caption?: string
    altText?: string            // Required on DB-stored articles
    aspectRatio?: '16:9' | '21:9' | '4:3'
  }
  thumbnailMedia?: { url: string; altText?: string }
  publishedAt: string
  updatedAt?: string
  status?: LobbyArticleStatus
  isFeatured?: boolean
  editorialStatus?: LobbyProvenanceState
  provenance?: { state: LobbyProvenanceState; rationale: string }
  provenanceRationale?: string
  sources?: LobbySource[]
  sourceReferences?: LobbySource[]
  readingTimeMinutes?: number
  readTimeMinutes?: number       // alias for static seed compatibility
  tags?: LobbyTag[]
  blocks?: LobbyBlock[]
  sections: LobbySection[]
  dataSnippets?: LobbyDataSnippet[]
  annotations?: LobbyAnnotation[]
  relatedItems?: string[]        // slugs
  relatedSlugs?: string[]
  ctaType?: LobbyCtaType
  ctaLabel?: string
  ctaUrl?: string
  schemaType?: LobbySchemaType
  editorialNotes?: string        // internal, admin-only
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
  internalLinks?: { label: string; href: string; context: string }[]
  analytics?: {
    viewsCount: number
    readsCount: number
    avgTimeSeconds: number
    ctaClicksCount: number
  }
}
