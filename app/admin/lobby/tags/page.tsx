import type { Metadata } from 'next'
import { getTags } from '@/lib/lobby'
import { LobbyAdminNav } from '@/components/admin/LobbyAdminNav'
import { saveTagAction } from '@/lib/actions/lobby'

export const metadata: Metadata = {
  title: 'Tag Taxonomy Manager // The Lobby Admin // Avorria',
  robots: { index: false, follow: false },
}

export default async function AdminTagsPage() {
  const tags = await getTags()

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 block mb-1">
          SECONDARY TAXONOMY // TOPIC CLASSIFICATION
        </span>
        <h1 className="text-2xl sm:text-3xl font-extralight text-white tracking-tight">
          Tag Taxonomy Architecture
        </h1>
        <p className="text-sm font-light text-white/60 mt-1 max-w-2xl">
          Tags provide fine-grained indexing across articles without creating thin content pages. Tag pages carry a <code className="text-white">noindex, follow</code> directive.
        </p>
      </div>

      <LobbyAdminNav />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Tags Table (8 cols) */}
        <div className="lg:col-span-8 border border-white/10 bg-[#111]">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-white/80">Active Topic Tags</span>
            <span className="text-[11px] font-mono text-white/40">{tags.length} total</span>
          </div>

          <table className="w-full text-left text-xs font-light border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-[10px] font-mono uppercase tracking-wider text-white/40">
                <th className="py-3 px-4">Tag Name</th>
                <th className="py-3 px-4">Slug</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-[11px]">
              {tags.map((t) => (
                <tr key={t.id || t.slug} className="hover:bg-white/[0.02]">
                  <td className="py-3.5 px-4 font-sans text-xs">
                    <p className="text-white">{t.name}</p>
                    {t.description && <p className="text-[10px] text-white/40 line-clamp-1">{t.description}</p>}
                  </td>
                  <td className="py-3.5 px-4 text-white/60">
                    /tag/{t.slug}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[9px] px-2 py-0.5 border border-emerald-500/30 bg-emerald-950/30 text-emerald-400">
                      ACTIVE
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Tag Form (4 cols) */}
        <div className="lg:col-span-4 border border-white/10 p-6 bg-[#111] space-y-4">
          <div>
            <span className="text-[10px] font-mono uppercase text-white/40 block mb-1">
              CREATE TAG
            </span>
            <h3 className="text-sm font-mono uppercase text-white/90">
              + New Topic Tag
            </h3>
          </div>

          <form action={saveTagAction as any} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-white/60">Tag Name *</label>
              <input
                name="name"
                required
                placeholder="e.g. Interaction Latency"
                className="w-full bg-[#181818] border border-white/15 px-3 py-2 text-xs font-light text-white focus:border-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-white/60">Slug *</label>
              <input
                name="slug"
                required
                pattern="^[a-z0-9-]+$"
                placeholder="interaction-latency"
                className="w-full bg-[#181818] border border-white/15 px-3 py-2 text-xs font-mono text-white focus:border-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-white/60">Description</label>
              <textarea
                name="description"
                rows={3}
                placeholder="Brief summary of this classification."
                className="w-full bg-[#181818] border border-white/15 p-2 text-xs font-light text-white focus:border-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-white text-black text-xs font-mono uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Add Tag
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}
