import type { Metadata } from 'next'
import { getAuthors } from '@/lib/lobby'
import { LobbyAdminNav } from '@/components/admin/LobbyAdminNav'
import { PageHeader } from '@/components/ui/dashboard/PageHeader'
import { SectionLabel } from '@/components/ui/dashboard/SectionLabel'
import { Button } from '@/components/ui/Button'
import { saveAuthorAction } from '@/lib/actions/lobby'

export const metadata: Metadata = {
  title: 'Author Registry // The Lobby Admin // Avorria',
  robots: { index: false, follow: false },
}

export default async function AdminAuthorsPage() {
  const authors = await getAuthors()

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <PageHeader
        label="CONTRIBUTOR GOVERNANCE"
        title="Author & Principal Registry"
      />

      <LobbyAdminNav />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Authors List (8 cols) */}
        <div className="lg:col-span-8 border border-[var(--color-border)] bg-white">
          <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between">
            <SectionLabel>Verified Contributors ({authors.length})</SectionLabel>
            <span className="text-[0.6875rem] text-[var(--color-graphite-muted)]">Real team members only</span>
          </div>

          <div className="divide-y divide-[var(--color-border)]">
            {authors.map((a) => (
              <div key={a.id || a.slug} className="p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-light text-[var(--color-graphite)]">{a.name}</h3>
                    <p className="text-xs text-[var(--color-graphite-muted)]">{a.role}</p>
                  </div>
                  <span className="text-[0.6875rem] font-light tracking-[0.1em] uppercase text-[var(--color-graphite-muted)] border border-[var(--color-border)] px-2 py-0.5">
                    Verified
                  </span>
                </div>
                <p className="text-sm font-light text-[var(--color-graphite-mid)] leading-relaxed">
                  {a.bio}
                </p>
                <div className="text-xs text-[var(--color-graphite-muted)] font-mono">
                  /lobby/author/{a.slug}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Author (4 cols) */}
        <div className="lg:col-span-4 border border-[var(--color-border)] p-6 bg-white space-y-4">
          <SectionLabel>Register Contributor</SectionLabel>
          <p className="text-xs font-light text-[var(--color-graphite-muted)]">
            Only register genuine Avorria team members or principals. Person schema is generated only for real contributors.
          </p>

          <form action={saveAuthorAction as any} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="name" className="block text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)]">
                Full Name *
              </label>
              <input
                id="name"
                name="name"
                required
                placeholder="e.g. Jane Doe"
                className="w-full border border-[var(--color-border)] px-3 py-2 text-sm font-light text-[var(--color-graphite)] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="role" className="block text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)]">
                Studio Role / Title *
              </label>
              <input
                id="role"
                name="role"
                required
                placeholder="e.g. Lead Technical Strategist"
                className="w-full border border-[var(--color-border)] px-3 py-2 text-sm font-light text-[var(--color-graphite)] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="slug" className="block text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)]">
                Slug *
              </label>
              <input
                id="slug"
                name="slug"
                required
                pattern="^[a-z0-9-]+$"
                placeholder="jane-doe"
                className="w-full border border-[var(--color-border)] px-3 py-2 text-sm font-mono text-[var(--color-graphite)] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="bio" className="block text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)]">
                Short Biography
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={3}
                placeholder="Brief professional background and areas of architectural focus..."
                className="w-full border border-[var(--color-border)] p-3 text-xs font-light text-[var(--color-graphite)] focus:outline-none leading-relaxed"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="linkedin" className="block text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)]">
                LinkedIn URL
              </label>
              <input
                id="linkedin"
                name="linkedin"
                type="url"
                placeholder="https://linkedin.com/in/..."
                className="w-full border border-[var(--color-border)] px-3 py-2 text-xs font-light text-[var(--color-graphite)] focus:outline-none"
              />
            </div>

            <Button type="submit" variant="primary" size="sm" className="w-full">
              Register Contributor
            </Button>
          </form>
        </div>

      </div>

    </div>
  )
}
