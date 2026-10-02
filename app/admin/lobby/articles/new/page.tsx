import type { Metadata } from 'next'
import Link from 'next/link'
import { getCategories, getAuthors } from '@/lib/lobby'
import { LobbyAdminNav } from '@/components/admin/LobbyAdminNav'
import { PageHeader } from '@/components/ui/dashboard/PageHeader'
import { Button } from '@/components/ui/Button'
import { createArticleAction } from '@/lib/actions/lobby'

export const metadata: Metadata = {
  title: 'New Dispatch // The Lobby Admin // Avorria',
  robots: { index: false, follow: false },
}

const CONTENT_TYPES = [
  { value: 'ARTICLE', label: 'Article — Deep dive, essay or teardown' },
  { value: 'GUIDE', label: 'Guide — Practical tactical walkthrough' },
  { value: 'NEWS_UPDATE', label: 'News Update — Time-sensitive algorithmic/platform shift (requires ≥1 source)' },
  { value: 'RESOURCE', label: 'Resource — Reference checklist or standard' },
  { value: 'ANNOUNCEMENT', label: 'Announcement — Studio log or engineering benchmark' },
]

export default async function NewArticlePage() {
  const [categories, authors] = await Promise.all([
    getCategories(),
    getAuthors(),
  ])

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <PageHeader
        label="EDITORIAL INTAKE"
        title="Draft New Intelligence Dispatch"
        action={
          <Button as="link" href="/admin/lobby/articles" variant="ghost" size="sm">
            ← Cancel
          </Button>
        }
      />

      <LobbyAdminNav />

      {/* Creation Form */}
      <form action={createArticleAction as any} className="space-y-6 border border-[var(--color-border)] p-8 bg-white">
        
        {/* Title */}
        <div className="space-y-2">
          <label htmlFor="title" className="block text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)]">
            Dispatch Title *
          </label>
          <input
            id="title"
            name="title"
            required
            placeholder="e.g. Google INP Mandate: Technical Architecture & Real-World Latency"
            className="w-full border border-[var(--color-border)] px-4 py-2.5 text-sm font-light text-[var(--color-graphite)] placeholder:text-[var(--color-graphite-muted)] focus:border-[var(--color-graphite)] focus:outline-none transition-colors"
          />
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <label htmlFor="slug" className="block text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)]">
            URL Slug *
          </label>
          <div className="flex items-center border border-[var(--color-border)] px-3 bg-[var(--color-ivory)]">
            <span className="text-xs text-[var(--color-graphite-muted)]">/lobby/</span>
            <input
              id="slug"
              name="slug"
              required
              pattern="^[a-z0-9-]+$"
              placeholder="google-inp-mandate-latency-audit"
              className="w-full bg-transparent px-2 py-2.5 text-sm font-light text-[var(--color-graphite)] placeholder:text-[var(--color-graphite-muted)] focus:outline-none"
            />
          </div>
          <p className="text-[0.6875rem] font-light text-[var(--color-graphite-muted)]">
            Lowercase alphanumeric with hyphens only.
          </p>
        </div>

        {/* Excerpt */}
        <div className="space-y-2">
          <label htmlFor="excerpt" className="block text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)]">
            Editorial Summary (Dek / Excerpt) *
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            required
            rows={3}
            placeholder="What changed. What matters. What you should do about it."
            className="w-full border border-[var(--color-border)] p-4 text-sm font-light text-[var(--color-graphite)] placeholder:text-[var(--color-graphite-muted)] focus:border-[var(--color-graphite)] focus:outline-none transition-colors leading-relaxed"
          />
        </div>

        {/* Grid: Content Type & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="contentType" className="block text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)]">
              Content Type *
            </label>
            <select
              id="contentType"
              name="contentType"
              className="w-full border border-[var(--color-border)] px-3 py-2.5 text-sm font-light text-[var(--color-graphite)] bg-white focus:border-[var(--color-graphite)] focus:outline-none"
            >
              {CONTENT_TYPES.map((ct) => (
                <option key={ct.value} value={ct.value}>{ct.label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="categoryId" className="block text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)]">
              Category Taxonomy
            </label>
            <select
              id="categoryId"
              name="categoryId"
              className="w-full border border-[var(--color-border)] px-3 py-2.5 text-sm font-light text-[var(--color-graphite)] bg-white focus:border-[var(--color-graphite)] focus:outline-none"
            >
              <option value="">— Select Category —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Author Selection (Real Team Members Only) */}
        <div className="space-y-2">
          <label htmlFor="authorId" className="block text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)]">
            Verified Contributor (Real team members only)
          </label>
          <select
            id="authorId"
            name="authorId"
            className="w-full border border-[var(--color-border)] px-3 py-2.5 text-sm font-light text-[var(--color-graphite)] bg-white focus:border-[var(--color-graphite)] focus:outline-none"
          >
            <option value="">— Avorria Editorial Desk —</option>
            {authors.map((a) => (
              <option key={a.id} value={a.id}>{a.name} — {a.role}</option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
          <p className="text-[0.6875rem] font-light text-[var(--color-graphite-muted)]">
            Created as a DRAFT. You will configure structured blocks, sources, and SEO on the next screen.
          </p>
          <Button type="submit" variant="primary" size="md">
            Initialize Draft →
          </Button>
        </div>
      </form>

    </div>
  )
}
