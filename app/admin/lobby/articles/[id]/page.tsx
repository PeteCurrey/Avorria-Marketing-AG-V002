import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getArticleByIdAdmin, getCategories, getAuthors } from '@/lib/lobby'
import { getArticleRevisions } from '@/lib/lobby/workflow'
import { LobbyAdminNav } from '@/components/admin/LobbyAdminNav'
import { PageHeader } from '@/components/ui/dashboard/PageHeader'
import { SectionLabel } from '@/components/ui/dashboard/SectionLabel'
import { StatusDot } from '@/components/ui/dashboard/StatusDot'
import { Button } from '@/components/ui/Button'
import { updateArticleAction, setArticleStatusAction } from '@/lib/actions/lobby'
import type { LobbyArticleStatus } from '@/types/lobby'

interface ArticleEditorProps {
  params: Promise<{ id: string }>
}

export const metadata: Metadata = {
  title: 'Editorial Workbench // The Lobby Admin // Avorria',
  robots: { index: false, follow: false },
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default async function AdminArticleEditorPage({ params }: ArticleEditorProps) {
  const { id } = await params
  const [article, categories, authors, revisions] = await Promise.all([
    getArticleByIdAdmin(id),
    getCategories(),
    getAuthors(),
    getArticleRevisions(id).catch(() => []),
  ])

  if (!article) {
    notFound()
  }

  const currentStatus = article.status || 'DRAFT'
  const bodyBlocksJson = JSON.stringify(article.blocks || article.sections || [], null, 2)
  const sourcesJson = JSON.stringify(article.sources || article.sourceReferences || [], null, 2)

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      
      {/* Top Bar & Status Control */}
      <PageHeader
        label="EDITORIAL WORKBENCH"
        title={article.title}
        action={
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/lobby/${article.slug}`}
              target="_blank"
              className="text-[0.6875rem] font-light tracking-[0.1em] uppercase text-[var(--color-graphite-mid)] hover:text-[var(--color-graphite)] border border-[var(--color-border)] px-3 py-1.5 bg-white transition-colors"
            >
              Public View ↗
            </Link>

            {/* Workflow Transition Buttons */}
            {currentStatus === 'DRAFT' && (
              <form action={async () => {
                'use server'
                await setArticleStatusAction(article.id, 'REVIEW')
              }}>
                <Button type="submit" variant="secondary" size="sm">
                  Submit for Review →
                </Button>
              </form>
            )}

            {currentStatus === 'REVIEW' && (
              <div className="flex items-center gap-2">
                <form action={async () => {
                  'use server'
                  await setArticleStatusAction(article.id, 'APPROVED')
                }}>
                  <Button type="submit" variant="primary" size="sm">
                    Approve Dispatch
                  </Button>
                </form>
                <form action={async () => {
                  'use server'
                  await setArticleStatusAction(article.id, 'DRAFT')
                }}>
                  <Button type="submit" variant="ghost" size="sm">
                    Return to Draft
                  </Button>
                </form>
              </div>
            )}

            {currentStatus === 'APPROVED' && (
              <div className="flex items-center gap-2">
                <form action={async () => {
                  'use server'
                  await setArticleStatusAction(article.id, 'PUBLISHED')
                }}>
                  <Button type="submit" variant="primary" size="sm">
                    Publish Live 🚀
                  </Button>
                </form>
                <form action={async () => {
                  'use server'
                  await setArticleStatusAction(article.id, 'REVIEW')
                }}>
                  <Button type="submit" variant="ghost" size="sm">
                    Re-open Review
                  </Button>
                </form>
              </div>
            )}

            {currentStatus === 'PUBLISHED' && (
              <form action={async () => {
                'use server'
                await setArticleStatusAction(article.id, 'ARCHIVED')
              }}>
                <Button type="submit" variant="ghost" size="sm">
                  Archive
                </Button>
              </form>
            )}

            {currentStatus === 'ARCHIVED' && (
              <form action={async () => {
                'use server'
                await setArticleStatusAction(article.id, 'DRAFT')
              }}>
                <Button type="submit" variant="secondary" size="sm">
                  Restore to Draft
                </Button>
              </form>
            )}
          </div>
        }
      />

      <LobbyAdminNav />

      {/* Status Bar */}
      <div className="flex items-center gap-3 py-3 px-4 border border-[var(--color-border)] bg-white">
        <StatusDot status={currentStatus} />
        <span className="text-xs text-[var(--color-graphite-muted)] font-light">
          Article ID: {article.id} · Workflow Status: {currentStatus}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        
        {/* Main Editor Form */}
        <form action={updateArticleAction as any} className="space-y-6 border border-[var(--color-border)] p-8 bg-white">
          <input type="hidden" name="id" value={article.id} />

          {/* Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="block text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)]">
              Title *
            </label>
            <input
              id="title"
              name="title"
              defaultValue={article.title}
              required
              className="w-full border border-[var(--color-border)] px-4 py-2 text-sm font-light text-[var(--color-graphite)] focus:border-[var(--color-graphite)] focus:outline-none"
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <label htmlFor="slug" className="block text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)]">
              Slug *
            </label>
            <div className="flex items-center border border-[var(--color-border)] px-3 bg-[var(--color-ivory)]">
              <span className="text-xs text-[var(--color-graphite-muted)]">/lobby/</span>
              <input
                id="slug"
                name="slug"
                defaultValue={article.slug}
                required
                pattern="^[a-z0-9-]+$"
                className="w-full bg-transparent px-2 py-2 text-sm font-light text-[var(--color-graphite)] focus:outline-none"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <label htmlFor="excerpt" className="block text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)]">
              Summary (Dek / Excerpt) *
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              defaultValue={article.excerpt ?? article.dek ?? ''}
              required
              rows={3}
              className="w-full border border-[var(--color-border)] p-3 text-sm font-light text-[var(--color-graphite)] focus:border-[var(--color-graphite)] focus:outline-none leading-relaxed"
            />
          </div>

          {/* Grid: Type & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="contentType" className="block text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)]">
                Content Type *
              </label>
              <select
                id="contentType"
                name="contentType"
                defaultValue={article.contentType ?? 'ARTICLE'}
                className="w-full border border-[var(--color-border)] px-3 py-2 text-sm font-light text-[var(--color-graphite)] bg-white focus:border-[var(--color-graphite)] focus:outline-none"
              >
                <option value="ARTICLE">Article</option>
                <option value="GUIDE">Guide</option>
                <option value="NEWS_UPDATE">News Update (requires ≥1 source)</option>
                <option value="RESOURCE">Resource</option>
                <option value="ANNOUNCEMENT">Announcement</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="categoryId" className="block text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)]">
                Category
              </label>
              <select
                id="categoryId"
                name="categoryId"
                defaultValue={article.categoryId ?? ''}
                className="w-full border border-[var(--color-border)] px-3 py-2 text-sm font-light text-[var(--color-graphite)] bg-white focus:border-[var(--color-graphite)] focus:outline-none"
              >
                <option value="">— Select Category —</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid: Author & Read Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="authorId" className="block text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)]">
                Author (Real team members only)
              </label>
              <select
                id="authorId"
                name="authorId"
                defaultValue={article.authorId ?? ''}
                className="w-full border border-[var(--color-border)] px-3 py-2 text-sm font-light text-[var(--color-graphite)] bg-white focus:border-[var(--color-graphite)] focus:outline-none"
              >
                <option value="">— Avorria Editorial Desk —</option>
                {authors.map((a) => (
                  <option key={a.id} value={a.id}>{a.name} — {a.role}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="readingTimeMinutes" className="block text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)]">
                Reading Time (minutes)
              </label>
              <input
                id="readingTimeMinutes"
                name="readingTimeMinutes"
                type="number"
                defaultValue={article.readingTimeMinutes ?? article.readTimeMinutes ?? 5}
                min={1}
                max={60}
                className="w-full border border-[var(--color-border)] px-3 py-2 text-sm font-light text-[var(--color-graphite)] focus:border-[var(--color-graphite)] focus:outline-none"
              />
            </div>
          </div>

          {/* Hero Image & Alt-Text (Required rule: image upload with alt-text required) */}
          <div className="border-t border-[var(--color-border)] pt-6 space-y-4">
            <SectionLabel>Hero Media (Alt-Text Required if URL Provided)</SectionLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="heroImageUrl" className="block text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)] mb-1">
                  Hero Image URL
                </label>
                <input
                  id="heroImageUrl"
                  name="heroImageUrl"
                  type="url"
                  defaultValue={article.heroMedia?.url ?? ''}
                  placeholder="https://..."
                  className="w-full border border-[var(--color-border)] px-3 py-2 text-xs font-light text-[var(--color-graphite)] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="heroImageAlt" className="block text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)] mb-1">
                  Image Alt-Text *
                </label>
                <input
                  id="heroImageAlt"
                  name="heroImageAlt"
                  type="text"
                  defaultValue={article.heroMedia?.altText ?? ''}
                  placeholder="Descriptive explanation for accessibility"
                  className="w-full border border-[var(--color-border)] px-3 py-2 text-xs font-light text-[var(--color-graphite)] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Structured Body Blocks (JSON) */}
          <div className="border-t border-[var(--color-border)] pt-6 space-y-2">
            <div className="flex items-center justify-between">
              <SectionLabel>Body Blocks (Structured JSON)</SectionLabel>
              <span className="text-[0.6875rem] text-[var(--color-graphite-muted)]">Rendered server-side as semantic HTML</span>
            </div>
            <textarea
              id="bodyBlocksJson"
              name="bodyBlocksJson"
              defaultValue={bodyBlocksJson}
              rows={12}
              className="w-full border border-[var(--color-border)] p-3 text-xs font-mono text-[var(--color-graphite)] focus:border-[var(--color-graphite)] focus:outline-none bg-[var(--color-ivory)] leading-relaxed"
            />
          </div>

          {/* Sources & Citations (JSON) */}
          <div className="border-t border-[var(--color-border)] pt-6 space-y-2">
            <div className="flex items-center justify-between">
              <SectionLabel>Sources & Empirical Citations (JSON)</SectionLabel>
              <span className="text-[0.6875rem] text-[var(--color-graphite-muted)]">Required for NEWS_UPDATE approval</span>
            </div>
            <textarea
              id="sourceReferencesJson"
              name="sourceReferencesJson"
              defaultValue={sourcesJson}
              rows={5}
              className="w-full border border-[var(--color-border)] p-3 text-xs font-mono text-[var(--color-graphite)] focus:border-[var(--color-graphite)] focus:outline-none bg-[var(--color-ivory)] leading-relaxed"
            />
          </div>

          {/* Editorial Notes (Internal Only) */}
          <div className="border-t border-[var(--color-border)] pt-6 space-y-2">
            <SectionLabel>Editorial Notes (Internal / Team only)</SectionLabel>
            <textarea
              id="editorialNotes"
              name="editorialNotes"
              defaultValue={article.editorialNotes ?? ''}
              rows={2}
              placeholder="Internal reviewer notes, provenance verifications, or revision context..."
              className="w-full border border-[var(--color-border)] p-3 text-sm font-light text-[var(--color-graphite)] focus:outline-none"
            />
          </div>

          {/* Save Button */}
          <div className="border-t border-[var(--color-border)] pt-6 flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-light text-[var(--color-graphite)]">
              <input
                type="checkbox"
                name="featured"
                value="true"
                defaultChecked={article.isFeatured}
                className="rounded-none border-[var(--color-border)]"
              />
              <span>Feature on Lobby index</span>
            </label>

            <Button type="submit" variant="primary" size="md">
              Save Changes
            </Button>
          </div>
        </form>

        {/* Sidebar: Revisions & Metadata */}
        <aside className="space-y-6">
          
          {/* Revisions History Drawer */}
          <div className="border border-[var(--color-border)] p-6 bg-white space-y-4">
            <SectionLabel>Revision History</SectionLabel>
            {revisions && revisions.length > 0 ? (
              <ul className="space-y-3 divide-y divide-[var(--color-border)]">
                {revisions.map((rev: any) => (
                  <li key={rev.id || rev.version} className="pt-2 text-xs font-light">
                    <div className="flex items-baseline justify-between">
                      <span className="font-mono text-[var(--color-accent)]">v{rev.version}</span>
                      <span className="text-[var(--color-graphite-muted)] text-[0.6875rem]">{fmt(rev.createdAt || rev.created_at)}</span>
                    </div>
                    {rev.notes && (
                      <p className="text-[var(--color-graphite-mid)] mt-1 line-clamp-2">{rev.notes}</p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs font-light text-[var(--color-graphite-muted)]">
                Initial revision created.
              </p>
            )}
          </div>

          {/* Article Info */}
          <div className="border border-[var(--color-border)] p-6 bg-white space-y-3 text-xs font-light text-[var(--color-graphite-mid)]">
            <SectionLabel>Article Metadata</SectionLabel>
            <p><span className="text-[var(--color-graphite-muted)]">Published:</span> {article.publishedAt ? fmt(article.publishedAt) : 'Not published'}</p>
            <p><span className="text-[var(--color-graphite-muted)]">Updated:</span> {article.updatedAt ? fmt(article.updatedAt) : '—'}</p>
            <p><span className="text-[var(--color-graphite-muted)]">Schema Type:</span> {article.schemaType ?? 'Article'}</p>
          </div>

        </aside>

      </div>

    </div>
  )
}
