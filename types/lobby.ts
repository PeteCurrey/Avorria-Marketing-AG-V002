/**
 * types/lobby.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Domain types for The Lobby — Avorria's editorial and intelligence layer.
 * Enforces provenance, source-linking, and rigorous technical metadata.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type LobbyProvenanceState =
  | 'VERIFIED'           // Audited empirical metrics or source code commits
  | 'SOURCE_LINKED'      // Backed by primary external sources (Google, Meta, SEC, etc.)
  | 'EDITORIAL_ANALYSIS' // Analytical framework / synthesis by Avorria principals
  | 'OPINION'            // Stated philosophical or contrarian perspective
  | 'DRAFT'              // Internal staging / review only

export type LobbyCategorySlug =
  | 'digital-strategy'
  | 'website-intelligence'
  | 'search-engine-intelligence'
  | 'platform-shifts'
  | 'applied-ai'
  | 'teardowns'
  | 'field-memos'
  | 'studio-dispatch'

export interface LobbySource {
  id: string
  title: string
  url: string
  publisher: string
  retrievedDate: string
  quoteSnippet?: string
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
}

export interface LobbyArticle {
  id: string
  slug: string
  issueNumber: string
  title: string
  dek: string
  category: LobbyCategorySlug
  categoryLabel: string
  publishedAt: string
  updatedAt?: string
  readTimeMinutes: number
  leadAuthor: {
    name: string
    role: string
  }
  provenance: {
    state: LobbyProvenanceState
    rationale: string
  }
  sources: LobbySource[]
  dataSnippets?: LobbyDataSnippet[]
  annotations?: LobbyAnnotation[]
  sections: LobbySection[]
  relatedSlugs?: string[]
  isFeatured?: boolean
}

export interface LobbyCategory {
  slug: LobbyCategorySlug
  label: string
  shortDescription: string
  longDescription: string
  dispatchCount?: number
}
