import type { Metadata } from 'next'
import { getTags } from '@/lib/lobby'
import { LobbyAdminNav } from '@/components/admin/LobbyAdminNav'
import { PageHeader } from '@/components/ui/dashboard/PageHeader'
import { SectionLabel } from '@/components/ui/dashboard/SectionLabel'
import { Button } from '@/components/ui/Button'
import { saveTagAction } from '@/lib/actions/lobby'

export const metadata: Metadata = {
  title: 'Tag Taxonomy Manager // The Lobby Admin // Avorria',
  robots: { index: false, follow: false },
}

export default async function AdminTagsPage() {
  const tags = await getTags()

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <PageHeader
        label="SECONDARY TAXONOMY"
        title="Tag Architecture"
      />

      <LobbyAdminNav />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Tags Table (8 cols) */}
        <div className="lg:col-span-8 border border-[var(--color-border)] bg-white overflow-x-auto">
          <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between">
            <SectionLabel>Active Topic Tags ({tags.length})</SectionLabel>
            <span className="text-[0.6875rem] text-[var(--color-graphite-muted)]">Noindexed until ≥3 articles</span>
          </div>

          <table className="w-full text-left text-sm font-light border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-ivory-dark)] text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)]">
                <th className="py-3 px-4">Tag Name</th>
                <th className="py-3 px-4">Slug</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {tags.map((t) => (
                <tr key={t.id || t.slug} className="hover:bg-[var(--color-ivory)] h-14">
                  <td className="py-3.5 px-4">
                    <p className="text-[var(--color-graphite)] font-light">#{t.name}</p>
                    {t.description && <p className="text-[0.6875rem] text-[var(--color-graphite-muted)] line-clamp-1">{t.description}</p>}
                  </td>
                  <td className="py-3.5 px-4 text-xs font-mono text-[var(--color-graphite-mid)]">
                    /tag/{t.slug}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[0.6875rem] font-light tracking-[0.1em] uppercase text-[var(--color-graphite-muted)]">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Tag (4 cols) */}
        <div className="lg:col-span-4 border border-[var(--color-border)] p-6 bg-white space-y-4">
          <SectionLabel>Add Topic Tag</SectionLabel>

          <form action={saveTagAction as any} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="name" className="block text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)]">
                Tag Name *
              </label>
              <input
                id="name"
                name="name"
                required
                placeholder="e.g. core-web-vitals"
                className="w-full border border-[var(--color-border)] px-3 py-2 text-sm font-light text-[var(--color-graphite)] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="slug" className="block text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)]">
                URL Slug *
              </label>
              <input
                id="slug"
                name="slug"
                required
                pattern="^[a-z0-9-]+$"
                placeholder="core-web-vitals"
                className="w-full border border-[var(--color-border)] px-3 py-2 text-sm font-mono text-[var(--color-graphite)] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="description" className="block text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)]">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={2}
                placeholder="Brief thematic definition..."
                className="w-full border border-[var(--color-border)] p-3 text-xs font-light text-[var(--color-graphite)] focus:outline-none"
              />
            </div>

            <Button type="submit" variant="primary" size="sm" className="w-full">
              Create Tag
            </Button>
          </form>
        </div>

      </div>

    </div>
  )
}
