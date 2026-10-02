import type { Metadata } from 'next'
import { getAuthors } from '@/lib/lobby'
import { LobbyAdminNav } from '@/components/admin/LobbyAdminNav'
import { saveAuthorAction } from '@/lib/actions/lobby'

export const metadata: Metadata = {
  title: 'Author Registry // The Lobby Admin // Avorria',
  robots: { index: false, follow: false },
}

export default async function AdminAuthorsPage() {
  const authors = await getAuthors()

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 block mb-1">
          CONTRIBUTOR GOVERNANCE // VERIFIED PRINCIPALS
        </span>
        <h1 className="text-2xl sm:text-3xl font-extralight text-white tracking-tight">
          Author &amp; Principal Registry
        </h1>
        <p className="text-sm font-light text-white/60 mt-1 max-w-2xl">
          Verified editorial contributors. Principle: Real studio principals only. Never fabricate synthetic author profiles or generic ghostwriters.
        </p>
      </div>

      <LobbyAdminNav />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Authors List (8 cols) */}
        <div className="lg:col-span-8 border border-white/10 bg-[#111]">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-white/80">Registered Authors</span>
            <span className="text-[11px] font-mono text-white/40">{authors.length} verified</span>
          </div>

          <div className="divide-y divide-white/5">
            {authors.map((a) => (
              <div key={a.id || a.slug} className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-light text-white">{a.name}</h3>
                    <p className="text-xs font-mono text-white/50">{a.role}</p>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 border border-emerald-500/30 bg-emerald-950/30 text-emerald-400">
                    VERIFIED CONTRIBUTOR
                  </span>
                </div>
                <p className="text-xs font-light text-white/60 leading-relaxed">
                  {a.bio}
                </p>
                <div className="text-[10px] font-mono text-white/40">
                  Public profile: <code className="text-white/60">/lobby/author/{a.slug}</code>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Author Form (4 cols) */}
        <div className="lg:col-span-4 border border-white/10 p-6 bg-[#111] space-y-4">
          <div>
            <span className="text-[10px] font-mono uppercase text-white/40 block mb-1">
              ENROLL CONTRIBUTOR
            </span>
            <h3 className="text-sm font-mono uppercase text-white/90">
              + New Author Profile
            </h3>
          </div>

          <form action={saveAuthorAction as any} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-white/60">Full Name *</label>
              <input
                name="name"
                required
                placeholder="e.g. Elena Rostova"
                className="w-full bg-[#181818] border border-white/15 px-3 py-2 text-xs font-light text-white focus:border-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-white/60">Role / Title *</label>
              <input
                name="role"
                required
                placeholder="e.g. Senior Conversion Engineer"
                className="w-full bg-[#181818] border border-white/15 px-3 py-2 text-xs font-light text-white focus:border-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-white/60">Profile Slug *</label>
              <input
                name="slug"
                required
                pattern="^[a-z0-9-]+$"
                placeholder="elena-rostova"
                className="w-full bg-[#181818] border border-white/15 px-3 py-2 text-xs font-mono text-white focus:border-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-white/60">Professional Biography</label>
              <textarea
                name="bio"
                rows={4}
                placeholder="Empirical background, technical focus, and areas of research."
                className="w-full bg-[#181818] border border-white/15 p-2 text-xs font-light text-white focus:border-white focus:outline-none leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-white text-black text-xs font-mono uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Enroll Author
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}
