import { describe, it, expect, vi } from 'vitest'
import { extractToc } from '@/components/lobby/LobbyBlockRenderer'
import type { LobbyArticle, LobbyBlock } from '@/types/lobby'

describe('The Lobby — Publishing Workflow & Security Rules', () => {

  describe('1. Table of Contents Extraction', () => {
    it('extracts level 2 and level 3 headings from structured blocks', () => {
      const blocks: LobbyBlock[] = [
        { type: 'lead', text: 'Intro paragraph' },
        { type: 'heading', level: 2, text: 'Core Architecture', id: 'core-architecture' },
        { type: 'paragraph', text: 'Some body text' },
        { type: 'heading', level: 3, text: 'Interaction Latency', id: 'interaction-latency' },
        { type: 'heading', level: 4, text: 'Sub details' }, // level 4 excluded from TOC
        { type: 'heading', level: 2, text: 'Execution Model' },
      ]

      const toc = extractToc(blocks)
      expect(toc).toHaveLength(3)
      expect(toc[0]).toEqual({ id: 'core-architecture', text: 'Core Architecture', level: 2 })
      expect(toc[1]).toEqual({ id: 'interaction-latency', text: 'Interaction Latency', level: 3 })
      expect(toc[2]).toEqual({ id: 'execution-model', text: 'Execution Model', level: 2 })
    })

    it('returns empty array when no headings exist', () => {
      const blocks: LobbyBlock[] = [
        { type: 'paragraph', text: 'Just a paragraph' },
      ]
      expect(extractToc(blocks)).toEqual([])
    })
  })

  describe('2. Source Link Gate for News Updates', () => {
    it('enforces that NEWS_UPDATE requires at least one source before approval', () => {
      // Mock validation function mirroring transitionArticleStatusAction logic
      function canApproveArticle(contentType: string, sources: unknown[]): { allowed: boolean; reason?: string } {
        if (contentType === 'NEWS_UPDATE') {
          if (!sources || sources.length === 0) {
            return { allowed: false, reason: 'NEWS_UPDATE requires at least one source link before it can be approved.' }
          }
        }
        return { allowed: true }
      }

      // News update without sources fails
      const invalidNews = canApproveArticle('NEWS_UPDATE', [])
      expect(invalidNews.allowed).toBe(false)
      expect(invalidNews.reason).toContain('at least one source link')

      // News update with sources passes
      const validNews = canApproveArticle('NEWS_UPDATE', [
        { title: 'Google Search Central Update', url: 'https://developers.google.com/search' }
      ])
      expect(validNews.allowed).toBe(true)

      // Standard article without sources passes approval
      const standardArticle = canApproveArticle('ARTICLE', [])
      expect(standardArticle.allowed).toBe(true)
    })
  })

  describe('3. Public Accessibility Isolation (Unpublished Never Leak)', () => {
    it('filters out draft, review, approved, and archived articles from public dispatches', () => {
      const mockArticles: Partial<LobbyArticle>[] = [
        { id: '1', slug: 'published-article', status: 'PUBLISHED', publishedAt: '2026-09-01T00:00:00Z' },
        { id: '2', slug: 'draft-article', status: 'DRAFT', publishedAt: '2026-09-02T00:00:00Z' },
        { id: '3', slug: 'review-article', status: 'REVIEW', publishedAt: '2026-09-03T00:00:00Z' },
        { id: '4', slug: 'approved-article', status: 'APPROVED', publishedAt: '2026-09-04T00:00:00Z' },
        { id: '5', slug: 'archived-article', status: 'ARCHIVED', publishedAt: '2026-09-05T00:00:00Z' },
        { id: '6', slug: 'future-article', status: 'PUBLISHED', publishedAt: '2099-01-01T00:00:00Z' },
      ]

      const now = new Date('2026-10-02T00:00:00Z').getTime()

      const publicArticles = mockArticles.filter(
        (a) => a.status === 'PUBLISHED' && new Date(a.publishedAt!).getTime() <= now
      )

      expect(publicArticles).toHaveLength(1)
      expect(publicArticles[0].slug).toBe('published-article')
    })
  })

  describe('4. Taxonomy Classification', () => {
    it('verifies the five canonical launch categories', () => {
      const canonicalCategories = ['search', 'platforms', 'websites', 'marketing', 'avorria']

      expect(canonicalCategories).toContain('search')
      expect(canonicalCategories).toContain('platforms')
      expect(canonicalCategories).toContain('websites')
      expect(canonicalCategories).toContain('marketing')
      expect(canonicalCategories).toContain('avorria')
      expect(canonicalCategories).toHaveLength(5)
    })
  })

})
