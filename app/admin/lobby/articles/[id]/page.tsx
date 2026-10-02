import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getArticleByIdAdmin, getCategories, getAuthors } from '@/lib/lobby'
import { LobbyAdminNav } from '@/components/admin/LobbyAdminNav'
import { updateArticleAction, setArticleStatusAction } from '@/lib/actions/lobby'
import type { LobbyArticleStatus } from '@/types/lobby'

interface ArticleEditorProps {
  params: Promise<{ id: string }>
}

export const metadata: Metadata = {
  title: 'Editorial Workbench // The Lobby Admin // Avorria',
  robots: { index: false, follow: false },
}

export default async function AdminArticleEditorPage({ params }: ArticleEditorProps) {
  const { id } = await params
  const [article, categories, authors] = await Promise.all([
    getArticleByIdAdmin(id),
    getCategories(),
    getAuthors(),
  ])

  if (!article) {
    notFound()
  }

  const currentStatus = article.status || 'PUBLISHED'
  const provState =
    typeof article.provenance === 'object' && 'state' in article.provenance
      ? article.provenance.state
      : article.editorialStatus || 'EDITORIAL_ANALYSIS'
  const provRationale =
    typeof article.provenance === 'object' && 'rationale' in article.provenance
      ? article.provenance.rationale
      : article.provenanceRationale || ''

  const bodyBlocksJson = JSON.stringify(article.sections || [], null, 2)
  const sourcesJson = JSON.stringify(article.sources || article.sourceReferences || [], null, 2)

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      
      {/* Top Bar & Status Control */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">
              EDITORIAL WORKBENCH // REF: {article.issueNumber || article.id}
            </span>
            <span
              className={`text-[9px] px-2 py-0.5 border font-mono ${
                currentStatus === 'PUBLISHED'
                  ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-400'
                  : currentStatus === 'REVIEW'
                  ? 'border-amber-500/40 bg-amber-950/40 text-amber-400'
                  : 'border-white/20 bg-white/5 text-white/60'
              }`}
            >
              STATUS: {currentStatus}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extralight text-white tracking-tight line-clamp-1">
            {article.title}
          </h1>
        </div>

        {/* Status Transition Actions */}
        <div className="flex items-center gap-3">
          <Link
            href={`/lobby/${article.slug}`}
            target="_blank"
            className="px-3 py-1.5 border border-white/20 text-xs font-mono uppercase text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            Public View ↗
          </Link>

          {currentStatus === 'DRAFT' && (
            <form action={setArticleStatusAction.bind(null, article.id, 'REVIEW')}>
              <button
                type="submit"
                className="px-3.5 py-1.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono uppercase tracking-wider hover:bg-amber-500/30 transition-colors"
              >
                Submit for Review →
              </button>
            </form>
          )}

          {currentStatus === 'REVIEW' && (
            <div className="flex items-center gap-2">
              <form action={setArticleStatusAction.bind(null, article.id, 'APPROVED')}>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-sky-500/20 border border-sky-500/40 text-sky-300 text-xs font-mono uppercase tracking-wider hover:bg-sky-500/30 transition-colors"
                >
                  Approve
                </button>
              </form>
              <form action={setArticleStatusAction.bind(null, article.id, 'PUBLISHED')}>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono uppercase tracking-wider hover:bg-emerald-500/30 transition-colors"
                >
                  Publish Live ↗
                </button>
              </form>
            </div>
          )}

          {currentStatus === 'APPROVED' && (
            <form action={setArticleStatusAction.bind(null, article.id, 'PUBLISHED')}>
              <button
                type="submit"
                className="px-3.5 py-1.5 bg-emerald-500 text-black font-mono text-xs uppercase tracking-wider hover:bg-emerald-400 transition-colors"
              >
                Publish Live ↗
              </button>
            </form>
          )}

          {currentStatus === 'PUBLISHED' && (
            <form action={setArticleStatusAction.bind(null, article.id, 'ARCHIVED')}>
              <button
                type="submit"
                className="px-3 py-1.5 border border-white/20 text-xs font-mono uppercase text-white/50 hover:text-rose-400 hover:border-rose-400/40 transition-colors"
              >
                Unpublish / Archive
              </button>
            </form>
          )}
        </div>
      </div>

      <LobbyAdminNav />

      {/* Editor Form */}
      <form action={updateArticleAction as any} className="space-y-8">
        <input type="hidden" name="id" value={article.id} />

        {/* Section 1: Core Metadata */}
        <div className="border border-white/10 p-6 bg-[#111] space-y-6">
          <div className="border-b border-white/10 pb-3">
            <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-white/80">
              1. Editorial Metadata &amp; Taxonomy
            </h2>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase text-white/60">
              Headline Title *
            </label>
            <input
              name="title"
              defaultValue={article.title}
              required
              className="w-full bg-[#181818] border border-white/15 px-4 py-2 text-sm font-light text-white focus:border-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-white/60">
                URL Slug *
              </label>
              <input
                name="slug"
                defaultValue={article.slug}
                required
                pattern="^[a-z0-9-]+$"
                className="w-full bg-[#181818] border border-white/15 px-3 py-2 text-xs font-mono text-white focus:border-white focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-white/60">
                Issue Number
              </label>
              <input
                name="issueNumber"
                defaultValue={article.issueNumber || ''}
                placeholder="e.g. ISSUE 04 // Q4 2026"
                className="w-full bg-[#181818] border border-white/15 px-3 py-2 text-xs font-mono text-white focus:border-white focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase text-white/60">
              Editorial Dek / Summary *
            </label>
            <textarea
              name="excerpt"
              defaultValue={article.excerpt || article.dek || ''}
              required
              rows={3}
              className="w-full bg-[#181818] border border-white/15 p-3 text-sm font-light text-white focus:border-white focus:outline-none leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-white/60">
                Format Type
              </label>
              <select
                name="contentType"
                defaultValue={article.contentType || 'ARTICLE'}
                className="w-full bg-[#181818] border border-white/15 px-3 py-2 text-xs font-mono text-white focus:border-white focus:outline-none"
              >
                <option value="ARTICLE">ARTICLE</option>
                <option value="GUIDE">GUIDE</option>
                <option value="NEWS_UPDATE">NEWS_UPDATE</option>
                <option value="RESOURCE">RESOURCE</option>
                <option value="CASE_STUDY">CASE_STUDY</option>
                <option value="ANNOUNCEMENT">ANNOUNCEMENT</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-white/60">
                Category Domain
              </label>
              <select
                name="categoryId"
                defaultValue={article.categoryId || ''}
                className="w-full bg-[#181818] border border-white/15 px-3 py-2 text-xs font-mono text-white focus:border-white focus:outline-none"
              >
                <option value="">-- Select Category --</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-white/60">
                Author Principal
              </label>
              <select
                name="authorId"
                defaultValue={article.authorId || ''}
                className="w-full bg-[#181818] border border-white/15 px-3 py-2 text-xs font-mono text-white focus:border-white focus:outline-none"
              >
                <option value="">-- Avorria Editorial Desk --</option>
                {authors.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                value="true"
                defaultChecked={article.isFeatured}
                className="rounded-none bg-[#181818] border-white/20"
              />
              <span className="text-xs font-mono text-white/80">Featured Cover Story</span>
            </label>

            <div className="flex items-center gap-2">
              <label className="text-xs font-mono text-white/60">Reading Time (Min):</label>
              <input
                type="number"
                name="readingTimeMinutes"
                defaultValue={article.readingTimeMinutes || article.readTimeMinutes || 5}
                min={1}
                max={120}
                className="w-16 bg-[#181818] border border-white/15 px-2 py-1 text-xs font-mono text-white"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Editorial Provenance & Sources */}
        <div className="border border-white/10 p-6 bg-[#111] space-y-6">
          <div className="border-b border-white/10 pb-3">
            <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-white/80">
              2. Editorial Integrity &amp; Provenance Ledger
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-white/60">
                Provenance Classification *
              </label>
              <select
                name="editorialStatus"
                defaultValue={provState}
                className="w-full bg-[#181818] border border-white/15 px-3 py-2 text-xs font-mono text-white focus:border-white focus:outline-none"
              >
                <option value="VERIFIED">VERIFIED — Audited empirical telemetry / code commit</option>
                <option value="SOURCE_LINKED">SOURCE_LINKED — Primary external platform documentation</option>
                <option value="EDITORIAL_ANALYSIS">EDITORIAL_ANALYSIS — Synthesis by Avorria principals</option>
                <option value="OPINION">OPINION — Stated perspective or contrarian thesis</option>
                <option value="DRAFT">DRAFT — Unverified internal working draft</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-white/60">
                Contextual Commercial CTA
              </label>
              <select
                name="ctaType"
                defaultValue={article.ctaType || 'start-a-project'}
                className="w-full bg-[#181818] border border-white/15 px-3 py-2 text-xs font-mono text-white focus:border-white focus:outline-none"
              >
                <option value="start-a-project">Start a Project (Consultation)</option>
                <option value="website-audit">Website Health Check (Diagnostic)</option>
                <option value="consultation">Strategic Diagnostic Session</option>
                <option value="services">Explore Core Service Pillars</option>
                <option value="none">None (Pure Editorial Dossier)</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase text-white/60">
              Provenance Rationale
            </label>
            <textarea
              name="provenanceRationale"
              defaultValue={provRationale}
              rows={2}
              placeholder="e.g. Synthesised across 140+ diagnostic audits conducted via the Scout engine between 2024 and 2026."
              className="w-full bg-[#181818] border border-white/15 p-3 text-xs font-light text-white focus:border-white focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase text-white/60">
              Primary Source Citations (JSON Array)
            </label>
            <textarea
              name="sourceReferencesJson"
              defaultValue={sourcesJson}
              rows={6}
              className="w-full bg-[#181818] border border-white/15 p-3 text-xs font-mono text-white/80 focus:border-white focus:outline-none"
            />
            <p className="text-[10px] font-mono text-white/40">
              Format: [{'{'} &quot;id&quot;: &quot;src-1&quot;, &quot;title&quot;: &quot;...&quot;, &quot;url&quot;: &quot;https://...&quot;, &quot;publisher&quot;: &quot;...&quot;, &quot;retrievedDate&quot;: &quot;YYYY-MM-DD&quot; {'}'}]
            </p>
          </div>
        </div>

        {/* Section 3: Content Body Blocks */}
        <div className="border border-white/10 p-6 bg-[#111] space-y-4">
          <div className="border-b border-white/10 pb-3">
            <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-white/80">
              3. Dossier Body Blocks &amp; Sections (JSON Array)
            </h2>
          </div>

          <textarea
            name="bodyBlocksJson"
            defaultValue={bodyBlocksJson}
            rows={12}
            className="w-full bg-[#181818] border border-white/15 p-3 text-xs font-mono text-white/80 focus:border-white focus:outline-none"
          />
          <p className="text-[10px] font-mono text-white/40">
            Supports title, romanNumeral, paragraphs, pullQuote, comparisonTable, and callout blocks.
          </p>
        </div>

        {/* Section 4: SEO & Robots Controls */}
        <div className="border border-white/10 p-6 bg-[#111] space-y-6">
          <div className="border-b border-white/10 pb-3">
            <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-white/80">
              4. Search Engine Hygiene &amp; Meta Controls
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-white/60">
                SEO Title Override
              </label>
              <input
                name="seoTitle"
                defaultValue={article.seo?.title || ''}
                placeholder="Leave blank to use dispatch title"
                className="w-full bg-[#181818] border border-white/15 px-3 py-2 text-xs font-mono text-white focus:border-white focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-white/60">
                Canonical URL Override
              </label>
              <input
                name="canonicalUrl"
                defaultValue={article.seo?.canonicalUrl || ''}
                placeholder="https://..."
                className="w-full bg-[#181818] border border-white/15 px-3 py-2 text-xs font-mono text-white focus:border-white focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase text-white/60">
              SEO Meta Description Override
            </label>
            <input
              name="seoDescription"
              defaultValue={article.seo?.description || ''}
              placeholder="Leave blank to use editorial dek"
              className="w-full bg-[#181818] border border-white/15 px-3 py-2 text-xs font-mono text-white focus:border-white focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="noIndex"
                value="true"
                defaultChecked={article.seo?.noIndex}
                className="rounded-none bg-[#181818] border-white/20"
              />
              <span className="text-xs font-mono text-white/80">noindex (Prevent Search Indexation)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="noFollow"
                value="true"
                defaultChecked={article.seo?.noFollow}
                className="rounded-none bg-[#181818] border-white/20"
              />
              <span className="text-xs font-mono text-white/80">nofollow (Do Not Pass PageRank)</span>
            </label>
          </div>
        </div>

        {/* Save Bar */}
        <div className="sticky bottom-4 border border-white/20 p-4 bg-[#080808]/95 backdrop-blur flex items-center justify-between shadow-2xl">
          <Link
            href="/admin/lobby/articles"
            className="text-xs font-mono uppercase text-white/40 hover:text-white transition-colors"
          >
            ← Back to Articles
          </Link>

          <button
            type="submit"
            className="px-8 py-2.5 bg-white text-black text-xs font-mono uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            Save All Changes
          </button>
        </div>
      </form>
    </div>
  )
}
