/**
 * lib/lobby/index.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Primary entrypoint for The Lobby data queries.
 * Integrates database layer with static fallback guarantees.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import 'server-only'
export * from './db'

import {
  getPublishedArticles,
  getFeaturedArticle as dbGetFeaturedArticle,
  getArticleBySlug as dbGetArticleBySlug,
  getCategories,
  getCategoryBySlug as dbGetCategoryBySlug,
  searchArticles,
  getRelatedArticles,
  getAllArticlesAdmin,
  getArticleByIdAdmin,
} from './db'
import type { LobbyArticle, LobbyCategory, LobbyCategorySlug } from '@/types/lobby'

export async function getAllArticles(): Promise<LobbyArticle[]> {
  return getPublishedArticles()
}

export async function getFeaturedArticle(): Promise<LobbyArticle | null> {
  return dbGetFeaturedArticle()
}

export async function getArticleBySlug(slug: string): Promise<LobbyArticle | null> {
  return dbGetArticleBySlug(slug)
}

export async function getArticlesByCategory(categorySlug: string): Promise<LobbyArticle[]> {
  return getPublishedArticles({ categorySlug })
}

export async function getAllCategories(): Promise<LobbyCategory[]> {
  return getCategories()
}

export async function getCategoryBySlug(slug: string): Promise<LobbyCategory | null> {
  return dbGetCategoryBySlug(slug)
}
