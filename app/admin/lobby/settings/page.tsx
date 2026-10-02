import type { Metadata } from 'next'
import { LobbyAdminNav } from '@/components/admin/LobbyAdminNav'
import { PageHeader } from '@/components/ui/dashboard/PageHeader'
import { SectionLabel } from '@/components/ui/dashboard/SectionLabel'

export const metadata: Metadata = {
  title: 'Lobby Settings // The Lobby Admin // Avorria',
  robots: { index: false, follow: false },
}

export default async function AdminLobbySettingsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <PageHeader
        label="EDITORIAL GOVERNANCE"
        title="Lobby Policies & Settings"
      />

      <LobbyAdminNav />

      <div className="space-y-6">
        
        {/* Policy 1: Source Requirement for News Updates */}
        <div className="border border-[var(--color-border)] p-6 bg-white space-y-3">
          <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
            <SectionLabel>1. NEWS UPDATE SOURCE GATE</SectionLabel>
            <span className="text-[0.6875rem] font-light tracking-[0.1em] uppercase text-[var(--color-accent)]">
              Enforced
            </span>
          </div>
          <p className="text-sm font-light text-[var(--color-graphite-mid)] leading-relaxed">
            Every news update (<code className="text-xs font-mono text-[var(--color-graphite)]">NEWS_UPDATE</code>) must contain at least one verified source citation link before it can transition to <span className="font-mono text-xs text-[var(--color-graphite)]">APPROVED</span>. The system prevents premature approval of unverified claims.
          </p>
        </div>

        {/* Policy 2: Publishing Pipeline */}
        <div className="border border-[var(--color-border)] p-6 bg-white space-y-3">
          <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
            <SectionLabel>2. FIVE-STAGE PUBLISHING WORKFLOW</SectionLabel>
            <span className="text-[0.6875rem] font-light text-[var(--color-graphite-muted)] font-mono">
              DRAFT → REVIEW → APPROVED → PUBLISHED → ARCHIVED
            </span>
          </div>
          <p className="text-sm font-light text-[var(--color-graphite-mid)] leading-relaxed">
            Team members can draft and submit dispatches for review. Transitioning to <span className="font-mono text-xs text-[var(--color-graphite)]">PUBLISHED</span> is an explicit administrative action, writes an append-only audit event, and immediately revalidates relevant Next.js cache tags.
          </p>
        </div>

        {/* Policy 3: SEO & Archive Indexation */}
        <div className="border border-[var(--color-border)] p-6 bg-white space-y-3">
          <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
            <SectionLabel>3. THRESHOLD-BASED ARCHIVE INDEXATION</SectionLabel>
            <span className="text-[0.6875rem] font-light tracking-[0.1em] uppercase text-[var(--color-graphite-muted)]">
              Threshold: ≥3 Articles
            </span>
          </div>
          <p className="text-sm font-light text-[var(--color-graphite-mid)] leading-relaxed">
            Tag, search, and author archives serve <code className="text-xs font-mono text-[var(--color-graphite)]">noindex, follow</code> robots tags until they contain at least three published articles to prevent search engine penalty for thin content pages.
          </p>
        </div>

        {/* Policy 4: Author Integrity */}
        <div className="border border-[var(--color-border)] p-6 bg-white space-y-3">
          <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
            <SectionLabel>4. AUTHOR INTEGRITY</SectionLabel>
            <span className="text-[0.6875rem] font-light tracking-[0.1em] uppercase text-[var(--color-graphite-muted)]">
              Real Team Only
            </span>
          </div>
          <p className="text-sm font-light text-[var(--color-graphite-mid)] leading-relaxed">
            Never fabricate synthetic author profiles or generic personas. Structured data <code className="text-xs font-mono text-[var(--color-graphite)]">Person</code> schema is only generated for real, verified studio principals.
          </p>
        </div>

      </div>

    </div>
  )
}
