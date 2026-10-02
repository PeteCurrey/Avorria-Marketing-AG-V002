import type { Metadata } from 'next'
import Link from 'next/link'
import { getCategories, getAuthors } from '@/lib/lobby'
import { LobbyAdminNav } from '@/components/admin/LobbyAdminNav'
import { createArticleAction } from '@/lib/actions/lobby'

export const metadata: Metadata = {
  title: 'New Dispatch // The Lobby Admin // Avorria',
  robots: { index: false, follow: false },
}

export default async function NewArticlePage() {
  const [categories, authors] = await Promise.all([
    getCategories(),
    getAuthors(),
  ])

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 block mb-1">
            EDITORIAL INTAKE // NEW INVESTIGATION
          </span>
          <h1 className="text-2xl sm:text-3xl font-extralight text-white tracking-tight">
            Draft New Intelligence Dispatch
          </h1>
        </div>

        <Link
          href="/admin/lobby/articles"
          className="text-xs font-mono uppercase text-white/40 hover:text-white transition-colors"
        >
          ← Cancel
        </Link>
      </div>

      <LobbyAdminNav />

      {/* Creation Form */}
      <form action={createArticleAction as any} className="space-y-6 border border-white/10 p-8 bg-[#111]">
        
        {/* Title */}
        <div className="space-y-2">
          <label htmlFor="title" className="block text-xs font-mono uppercase tracking-wider text-white/60">
            Dispatch Title *
          </label>
          <input
            id="title"
            name="title"
            required
            placeholder="e.g. Google INP and the Interaction Latency Mandate: A Forensic Audit"
            className="w-full bg-[#181818] border border-white/15 px-4 py-2.5 text-sm font-light text-white placeholder:text-white/30 focus:border-white focus:outline-none transition-colors"
          />
          <p className="text-[10px] font-mono text-white/40">
            Descriptive, precise headline. Avoid sensationalism or marketing buzzwords.
          </p>
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <label htmlFor="slug" className="block text-xs font-mono uppercase tracking-wider text-white/60">
            URL Slug *
          </label>
          <div className="flex items-center bg-[#181818] border border-white/15 px-3">
            <span className="text-xs font-mono text-white/40">/lobby/</span>
            <input
              id="slug"
              name="slug"
              required
              pattern="^[a-z0-9-]+$"
              placeholder="google-inp-interaction-latency-forensic-audit"
              className="w-full bg-transparent px-2 py-2.5 text-sm font-mono text-white placeholder:text-white/30 focus:outline-none"
            />
          </div>
          <p className="text-[10px] font-mono text-white/40">
            Lowercase alphanumeric with hyphens only.
          </p>
        </div>

        {/* Excerpt / Dek */}
        <div className="space-y-2">
          <label htmlFor="excerpt" className="block text-xs font-mono uppercase tracking-wider text-white/60">
            Editorial Summary (Dek) *
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            required
            rows={3}
            placeholder="A two-to-three sentence forensic synopsis explaining what occurred, why it matters, and who is affected."
            className="w-full bg-[#181818] border border-white/15 p-4 text-sm font-light text-white placeholder:text-white/30 focus:border-white focus:outline-none transition-colors leading-relaxed"
          />
        </div>

        {/* Grid: Content Type & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="contentType" className="block text-xs font-mono uppercase tracking-wider text-white/60">
              Content Format / Type *
            </label>
            <select
              id="contentType"
              name="contentType"
              defaultValue="ARTICLE"
              className="w-full bg-[#181818] border border-white/15 px-3 py-2.5 text-xs font-mono text-white focus:border-white focus:outline-none"
            >
              <option value="ARTICLE">ARTICLE — General Editorial Analysis</option>
              <option value="GUIDE">GUIDE — In-Depth Architectural Guide</option>
              <option value="NEWS_UPDATE">NEWS UPDATE — Verified Platform Event</option>
              <option value="RESOURCE">RESOURCE — Benchmark, Checklist, or Tool</option>
              <option value="CASE_STUDY">CASE STUDY — Forensic Project Outcome</option>
              <option value="ANNOUNCEMENT">ANNOUNCEMENT — Avorria Studio Release</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="categoryId" className="block text-xs font-mono uppercase tracking-wider text-white/60">
              Structural Domain Category
            </label>
            <select
              id="categoryId"
              name="categoryId"
              className="w-full bg-[#181818] border border-white/15 px-3 py-2.5 text-xs font-mono text-white focus:border-white focus:outline-none"
            >
              <option value="">-- Select Category --</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.slug})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Author */}
        <div className="space-y-2">
          <label htmlFor="authorId" className="block text-xs font-mono uppercase tracking-wider text-white/60">
            Author / Editorial Principal
          </label>
          <select
            id="authorId"
            name="authorId"
            className="w-full bg-[#181818] border border-white/15 px-3 py-2.5 text-xs font-mono text-white focus:border-white focus:outline-none"
          >
            <option value="">-- Default (Avorria Editorial Desk) --</option>
            {authors.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name} — {a.role}
              </option>
            ))}
          </select>
          <p className="text-[10px] font-mono text-white/40">
            Real Avorria contributors only. Never assign fabricated author personas.
          </p>
        </div>

        {/* Submit Action */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between">
          <p className="text-[11px] font-mono text-white/40">
            Initial save creates a <span className="text-white">DRAFT</span>. It will not be exposed to the public.
          </p>

          <button
            type="submit"
            className="px-6 py-2.5 bg-white text-black text-xs font-mono uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            Create Draft &amp; Open Workbench →
          </button>
        </div>
      </form>
    </div>
  )
}
