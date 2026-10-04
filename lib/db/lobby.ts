import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/types/supabase'

export type LobbyArticleRow = Database['public']['Tables']['lobby_articles']['Row']

export type LobbyResult = {
  articles: LobbyArticleRow[]
  error: string | null
}

/**
 * Fetch published articles from The Lobby.
 * Public queries return only rows where published = true (or status = 'PUBLISHED').
 * Returns { articles, error } so database errors surface as an error state,
 * while an empty database table surfaces as a clean empty state.
 */
export async function getLobbyArticles(): Promise<LobbyResult> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('lobby_articles')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false })

    if (error) {
      console.error('[Lobby] Error fetching articles:', error.message)
      return { articles: [], error: error.message }
    }
    return { articles: data ?? [], error: null }
  } catch (err: any) {
    console.error('[Lobby] Unexpected error:', err)
    return { articles: [], error: err?.message || 'Database service error' }
  }
}

/**
 * Fetch a single published Lobby article by its slug.
 */
export async function getLobbyArticleBySlug(slug: string): Promise<LobbyArticleRow | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('lobby_articles')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle()

    if (error) {
      console.error('[Lobby] Error fetching article by slug:', error.message)
      return null
    }
    return data
  } catch (err) {
    console.error('[Lobby] Unexpected error:', err)
    return null
  }
}

/**
 * Fetch up to `limit` related published articles, excluding the current article.
 */
export async function getRelatedLobbyArticles(currentSlug: string, limit: number = 3): Promise<LobbyArticleRow[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('lobby_articles')
      .select('*')
      .neq('slug', currentSlug)
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('[Lobby] Error fetching related articles:', error.message)
      return []
    }
    return data ?? []
  } catch (err) {
    console.error('[Lobby] Unexpected error:', err)
    return []
  }
}
