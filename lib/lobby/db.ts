/**
 * lib/lobby/db.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Data access layer for The Lobby.
 * Queries Supabase with strict RLS enforcement for public and admin contexts.
 * Falls back gracefully to the verified initial seed dataset when the database
 * is unpopulated or offline, guaranteeing 100% SSG and zero broken builds.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import 'server-only'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/server-admin'
import { LOBBY_ARTICLES } from '@/content/lobby/articles'
import { LOBBY_CATEGORIES } from '@/content/lobby/categories'
import { LOBBY_AUTHORS } from '@/content/lobby/authors'
import { LOBBY_TAGS } from '@/content/lobby/tags'
import type {
  LobbyArticle,
  LobbyCategory,
  LobbyAuthor,
  LobbyTag,
  LobbyArticleStatus,
} from '@/types/lobby'

// ─── Public Queries (Strictly Published Content) ─────────────────────────────

export async function getPublishedArticles(options: {
  categorySlug?: string
  tagSlug?: string
  authorSlug?: string
  limit?: number
  offset?: number
} = {}): Promise<LobbyArticle[]> {
  try {
    const supabase = await createClient()
    let query = supabase
      .from('lobby_articles')
      .select('*, lobby_categories(*), lobby_authors(*)')
      .eq('status', 'PUBLISHED')
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false })

    if (options.limit) query = query.limit(options.limit)
    if (options.offset) query = query.range(options.offset, options.offset + (options.limit || 50) - 1)

    const { data, error } = await query
    if (!error && data && data.length > 0) {
      return (data as any[]).map(mapDbArticleToDomain)
    }
  } catch {
    // Fall back to verified static seed
  }

  // Fallback to static seed
  let filtered = LOBBY_ARTICLES.filter((a) => (a.status || 'PUBLISHED') === 'PUBLISHED')

  if (options.categorySlug) {
    filtered = filtered.filter(
      (a) => a.category === options.categorySlug || a.categorySlug === options.categorySlug
    )
  }

  const authorSlug = options.authorSlug
  if (authorSlug) {
    filtered = filtered.filter(
      (a) => (typeof a.author === 'object' && 'slug' in a.author && a.author.slug === authorSlug) ||
             (a.leadAuthor && a.leadAuthor.name.toLowerCase().includes(authorSlug.replace(/-/g, ' ')))
    )
  }

  filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  if (options.limit) {
    return filtered.slice(options.offset || 0, (options.offset || 0) + options.limit)
  }
  return filtered
}

export async function getFeaturedArticle(): Promise<LobbyArticle | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('lobby_articles')
      .select('*, lobby_categories(*), lobby_authors(*)')
      .eq('status', 'PUBLISHED')
      .eq('featured', true)
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false })
      .limit(1)
      .single()

    if (!error && data) {
      return mapDbArticleToDomain(data)
    }
  } catch {
    // Fallback
  }

  const staticFeatured = LOBBY_ARTICLES.find((a) => a.isFeatured && (a.status || 'PUBLISHED') === 'PUBLISHED')
  return staticFeatured || LOBBY_ARTICLES[0] || null
}

export async function getArticleBySlug(slug: string): Promise<LobbyArticle | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('lobby_articles')
      .select('*, lobby_categories(*), lobby_authors(*)')
      .eq('slug', slug)
      .eq('status', 'PUBLISHED')
      .lte('published_at', new Date().toISOString())
      .single()

    if (!error && data) {
      return mapDbArticleToDomain(data)
    }
  } catch {
    // Fallback
  }

  const staticArticle = LOBBY_ARTICLES.find(
    (a) => a.slug === slug && (a.status || 'PUBLISHED') === 'PUBLISHED'
  )
  return staticArticle || null
}

export async function getCategories(): Promise<LobbyCategory[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('lobby_categories')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    if (!error && data && data.length > 0) {
      return (data as any[]).map((c: any) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description || '',
        displayOrder: c.display_order,
        isActive: c.is_active,
        seoTitle: c.seo_title || undefined,
        seoDescription: c.seo_description || undefined,
        ogImage: c.og_image || undefined,
        dispatchCount: 0,
      }))
    }
  } catch {
    // Fallback
  }

  return LOBBY_CATEGORIES.map((c) => ({
    ...c,
    dispatchCount: LOBBY_ARTICLES.filter((a) => a.category === c.slug || a.categorySlug === c.slug).length,
  }))
}

export async function getCategoryBySlug(slug: string): Promise<LobbyCategory | null> {
  const categories = await getCategories()
  return categories.find((c) => c.slug === slug) || null
}

export async function getTags(): Promise<LobbyTag[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('lobby_tags')
      .select('*')
      .eq('is_active', true)

    if (!error && data && data.length > 0) {
      return (data as any[]).map((t: any) => ({
        id: t.id,
        name: t.name,
        slug: t.slug,
        description: t.description || undefined,
        isActive: t.is_active,
      }))
    }
  } catch {
    // Fallback
  }

  return LOBBY_TAGS
}

export async function getTagBySlug(slug: string): Promise<LobbyTag | null> {
  const tags = await getTags()
  return tags.find((t) => t.slug === slug) || null
}

export async function getAuthors(): Promise<LobbyAuthor[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('lobby_authors')
      .select('*')
      .eq('is_active', true)

    if (!error && data && data.length > 0) {
      return (data as any[]).map((a: any) => ({
        id: a.id,
        name: a.name,
        role: a.role,
        bio: a.bio || '',
        profileImage: a.profile_image || null,
        slug: a.slug,
        socialLinks: (a.social_links as Record<string, string>) || {},
        isActive: a.is_active,
      }))
    }
  } catch {
    // Fallback
  }

  return LOBBY_AUTHORS
}

export async function getAuthorBySlug(slug: string): Promise<LobbyAuthor | null> {
  const authors = await getAuthors()
  return authors.find((a) => a.slug === slug) || null
}

export async function searchArticles(query: string): Promise<LobbyArticle[]> {
  if (!query || query.trim().length === 0) return []
  const clean = query.trim().toLowerCase()

  const allPublished = await getPublishedArticles()
  return allPublished.filter((a) => {
    const inTitle = a.title.toLowerCase().includes(clean)
    const inExcerpt = (a.excerpt || a.dek || '').toLowerCase().includes(clean)
    const inCategory = (a.categoryName || a.categoryLabel || a.category || '').toLowerCase().includes(clean)
    const inSections = a.sections.some(
      (s) =>
        (s.title || '').toLowerCase().includes(clean) ||
        s.paragraphs.some((p) => p.toLowerCase().includes(clean))
    )
    return inTitle || inExcerpt || inCategory || inSections
  })
}

export async function getRelatedArticles(
  currentSlug: string,
  categorySlug?: string,
  limit = 2
): Promise<LobbyArticle[]> {
  const all = await getPublishedArticles()
  return all
    .filter((a) => a.slug !== currentSlug && (!categorySlug || a.category === categorySlug || a.categorySlug === categorySlug))
    .slice(0, limit)
}

// ─── Admin Queries (Full Access) ─────────────────────────────────────────────

export async function getAllArticlesAdmin(options: {
  status?: LobbyArticleStatus
  categoryId?: string
  search?: string
} = {}): Promise<LobbyArticle[]> {
  try {
    const admin = createAdminClient()
    let query = admin
      .from('lobby_articles')
      .select('*, lobby_categories(*), lobby_authors(*)')
      .order('created_at', { ascending: false })

    if (options.status) query = query.eq('status', options.status)
    if (options.categoryId) query = query.eq('category_id', options.categoryId)

    const { data, error } = await query
    if (!error && data && data.length > 0) {
      let results: LobbyArticle[] = (data as any[]).map(mapDbArticleToDomain)
      if (options.search) {
        const s = options.search.toLowerCase()
        results = results.filter((a: LobbyArticle) => a.title.toLowerCase().includes(s) || a.slug.includes(s))
      }
      return results
    }
  } catch {
    // Fallback
  }

  let results: LobbyArticle[] = [...LOBBY_ARTICLES]
  if (options.status) {
    results = results.filter((a) => (a.status || 'PUBLISHED') === options.status)
  }
  if (options.search) {
    const s = options.search.toLowerCase()
    results = results.filter((a: LobbyArticle) => a.title.toLowerCase().includes(s) || a.slug.includes(s))
  }
  return results
}

export async function getArticleByIdAdmin(id: string): Promise<LobbyArticle | null> {
  try {
    const admin = createAdminClient()
    const { data, error } = await admin
      .from('lobby_articles')
      .select('*, lobby_categories(*), lobby_authors(*)')
      .eq('id', id)
      .single()

    if (!error && data) {
      return mapDbArticleToDomain(data)
    }
  } catch {
    // Fallback
  }

  const staticMatch = LOBBY_ARTICLES.find((a) => a.id === id || a.slug === id)
  return staticMatch || null
}

// ─── Internal Mapper ─────────────────────────────────────────────────────────

function mapDbArticleToDomain(raw: any): LobbyArticle {
  const cat = raw.lobby_categories || {}
  const aut = raw.lobby_authors || {}

  return {
    id: raw.id,
    title: raw.title,
    slug: raw.slug,
    issueNumber: raw.issue_number || undefined,
    excerpt: raw.excerpt,
    dek: raw.excerpt,
    contentType: raw.content_type,
    categoryId: raw.category_id || '',
    categorySlug: cat.slug || '',
    categoryName: cat.name || '',
    category: cat.slug || '',
    categoryLabel: cat.name || '',
    authorId: raw.author_id || '',
    author: {
      id: aut.id || '',
      name: aut.name || 'Avorria Editorial Desk',
      role: aut.role || 'Editorial Intelligence',
      bio: aut.bio || '',
      slug: aut.slug || 'editorial-desk',
      isActive: true,
    },
    leadAuthor: {
      name: aut.name || 'Avorria Editorial Desk',
      role: aut.role || 'Editorial Intelligence',
    },
    heroMedia: raw.hero_media || undefined,
    thumbnailMedia: raw.thumbnail_media || undefined,
    publishedAt: raw.published_at || raw.created_at,
    updatedAt: raw.updated_at || undefined,
    status: raw.status as LobbyArticleStatus,
    isFeatured: raw.featured,
    editorialStatus: raw.editorial_status,
    provenance: {
      state: raw.editorial_status,
      rationale: raw.provenance_rationale || '',
    },
    provenanceRationale: raw.provenance_rationale || undefined,
    sourceReferences: raw.source_references || [],
    sources: raw.source_references || [],
    readingTimeMinutes: raw.reading_time_minutes || 5,
    readTimeMinutes: raw.reading_time_minutes || 5,
    tags: [],
    blocks: raw.body_blocks || [],
    sections: raw.body_blocks || [],
    ctaType: raw.cta_type || 'start-a-project',
    ctaLabel: raw.cta_label || undefined,
    ctaUrl: raw.cta_url || undefined,
    schemaType: raw.schema_type || 'Article',
    editorialNotes: raw.editorial_notes || undefined,
    seo: {
      title: raw.seo_title || undefined,
      description: raw.seo_description || undefined,
      canonicalUrl: raw.canonical_url || undefined,
      ogTitle: raw.og_title || undefined,
      ogDescription: raw.og_description || undefined,
      ogImage: raw.og_image || undefined,
      noIndex: raw.no_index || false,
      noFollow: raw.no_follow || false,
    },
    internalLinks: raw.internal_links || [],
  }
}
