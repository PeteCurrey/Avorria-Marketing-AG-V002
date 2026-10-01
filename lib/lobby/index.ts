import 'server-only'
import { LOBBY_ARTICLES } from '@/content/lobby/articles'
import { LOBBY_CATEGORIES } from '@/content/lobby/categories'
import type { LobbyArticle, LobbyCategory, LobbyCategorySlug } from '@/types/lobby'

export async function getAllArticles(): Promise<LobbyArticle[]> {
  return [...LOBBY_ARTICLES].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export async function getFeaturedArticle(): Promise<LobbyArticle> {
  const articles = await getAllArticles()
  return articles.find((a) => a.isFeatured) || articles[0]
}

export async function getArticleBySlug(slug: string): Promise<LobbyArticle | null> {
  const article = LOBBY_ARTICLES.find((a) => a.slug === slug)
  return article || null
}

export async function getArticlesByCategory(categorySlug: LobbyCategorySlug): Promise<LobbyArticle[]> {
  return LOBBY_ARTICLES.filter((a) => a.category === categorySlug).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export async function getAllCategories(): Promise<LobbyCategory[]> {
  return LOBBY_CATEGORIES.map((cat) => ({
    ...cat,
    dispatchCount: LOBBY_ARTICLES.filter((a) => a.category === cat.slug).length,
  }))
}

export async function getCategoryBySlug(slug: string): Promise<LobbyCategory | null> {
  const cat = LOBBY_CATEGORIES.find((c) => c.slug === slug)
  if (!cat) return null
  return {
    ...cat,
    dispatchCount: LOBBY_ARTICLES.filter((a) => a.category === cat.slug).length,
  }
}
