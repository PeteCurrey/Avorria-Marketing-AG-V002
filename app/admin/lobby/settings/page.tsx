import type { Metadata } from 'next'
import { LobbyAdminNav } from '@/components/admin/LobbyAdminNav'

export const metadata: Metadata = {
  title: 'Lobby Settings // The Lobby Admin // Avorria',
  robots: { index: false, follow: false },
}

export default async function AdminLobbySettingsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 block mb-1">
          EDITORIAL GOVERNANCE // SYSTEM PREFERENCES
        </span>
        <h1 className="text-2xl sm:text-3xl font-extralight text-white tracking-tight">
          Lobby Editorial Policies &amp; Settings
        </h1>
        <p className="text-sm font-light text-white/60 mt-1">
          Global publication rules, automated provenance enforcement, sitemap controls, and syndication parameters.
        </p>
      </div>

      <LobbyAdminNav />

      <div className="space-y-6">
        
        {/* Policy 1: Provenance Gate */}
        <div className="border border-white/10 p-6 bg-[#111] space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-mono uppercase text-white/90">
              1. Empirical Provenance Gate
            </h3>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5">
              ACTIVE ENFORCEMENT
            </span>
          </div>
          <p className="text-xs font-light text-white/60 leading-relaxed">
            Every published investigation must explicitly declare one of five provenance classifications: <code className="text-white/80">VERIFIED</code>, <code className="text-white/80">SOURCE_LINKED</code>, <code className="text-white/80">EDITORIAL_ANALYSIS</code>, <code className="text-white/80">OPINION</code>, or <code className="text-white/80">DRAFT</code>. Articles claiming empirical metrics without primary source documentation are rejected by the editorial linter.
          </p>
        </div>

        {/* Policy 2: Publishing Pipeline */}
        <div className="border border-white/10 p-6 bg-[#111] space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-mono uppercase text-white/90">
              2. Multi-Stage Publication Lifecycle
            </h3>
            <span className="text-[10px] font-mono text-white/40">
              DRAFT → REVIEW → APPROVED → PUBLISHED
            </span>
          </div>
          <p className="text-xs font-light text-white/60 leading-relaxed">
            Team members can draft and submit investigations for review. Transitioning to <span className="text-white font-mono text-[11px]">PUBLISHED</span> requires explicit administrative review to prevent unverified drafts from leaking to search engines or the public broadsheet.
          </p>
        </div>

        {/* Policy 3: SEO & Sitemap Syndication */}
        <div className="border border-white/10 p-6 bg-[#111] space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-mono uppercase text-white/90">
              3. Search Engine Hygiene &amp; Indexation
            </h3>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5">
              DYNAMIC SITEMAP LINKED
            </span>
          </div>
          <p className="text-xs font-light text-white/60 leading-relaxed">
            Published articles are automatically integrated into <code className="text-white/80">/sitemap.xml</code> with canonical URLs and schema.org Article metadata. Tag archives default to <code className="text-white/80">noindex, follow</code> to prevent thin taxonomy clutter.
          </p>
        </div>

        {/* Policy 4: Truthful Empty States */}
        <div className="border border-white/10 p-6 bg-[#111] space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-mono uppercase text-white/90">
              4. Truthful Empty State Mandate
            </h3>
            <span className="text-[10px] font-mono text-white/40">
              ZERO PLACEHOLDER CONTENT
            </span>
          </div>
          <p className="text-xs font-light text-white/60 leading-relaxed">
            The platform strictly forbids dummy placeholder articles or simulated statistics. If a category, author, or search query has no published records, a truthful architectural staging state is rendered.
          </p>
        </div>

      </div>
    </div>
  )
}
