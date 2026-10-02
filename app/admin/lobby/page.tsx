import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllArticlesAdmin, getAllCategories, getAuthors } from '@/lib/lobby'
import { LobbyAdminNav } from '@/components/admin/LobbyAdminNav'
import { PageHeader } from '@/components/ui/dashboard/PageHeader'
import { SectionLabel } from '@/components/ui/dashboard/SectionLabel'
import { StatusDot } from '@/components/ui/dashboard/StatusDot'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'The Lobby Editorial Desk // Admin // Avorria',
  robots: { index: false, follow: false },
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default async function AdminLobbyPage() {
  const [articles, categories, authors] = await Promise.all([
    getAllArticlesAdmin(),
    getAllCategories(),
    getAuthors(),
  ])

  const drafts = articles.filter((a) => a.status === 'DRAFT')
  const inReview = articles.filter((a) => a.status === 'REVIEW')
  const approved = articles.filter((a) => a.status === 'APPROVED')
  const published = articles.filter((a) => a.status === 'PUBLISHED')

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <PageHeader
        label="EDITORIAL GOVERNANCE"
        title="The Lobby Editorial Desk"
        action={
          <div className="flex items-center gap-3">
            <Button as="link" href="/lobby" variant="ghost" size="sm">
              Live Lobby ↗
            </Button>
            <Button as="link" href="/admin/lobby/articles/new" variant="primary" size="sm">
              + New Article
            </Button>
          </div>
        }
      />

      {/* Lobby Sub-Navigation */}
      <LobbyAdminNav />

      {/* Workflow Stage Counts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-[var(--color-border)]">
        <div>
          <SectionLabel>Drafts</SectionLabel>
          <p className="text-2xl font-[200] text-[var(--color-graphite)] mt-1">{drafts.length}</p>
        </div>
        <div>
          <SectionLabel>In Review</SectionLabel>
          <p className="text-2xl font-[200] text-[var(--color-graphite)] mt-1">{inReview.length}</p>
        </div>
        <div>
          <SectionLabel>Approved</SectionLabel>
          <p className="text-2xl font-[200] text-[var(--color-graphite)] mt-1">{approved.length}</p>
        </div>
        <div>
          <SectionLabel>Published</SectionLabel>
          <p className="text-2xl font-[200] text-[var(--color-graphite)] mt-1">{published.length}</p>
        </div>
      </div>

      {/* Articles Overview */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <SectionLabel>Recent Editorial Activity</SectionLabel>
          <Link
            href="/admin/lobby/articles"
            className="text-[0.6875rem] font-light tracking-[0.1em] uppercase text-[var(--color-graphite-mid)] hover:text-[var(--color-graphite)]"
          >
            All Articles ({articles.length}) →
          </Link>
        </div>

        {articles.length > 0 ? (
          <div className="border border-[var(--color-border)] overflow-x-auto bg-white">
            <table className="w-full text-left text-sm font-light border-collapse">
              <thead>
                <tr className="border-b border-[var(--color-border)] bg-[var(--color-ivory-dark)]">
                  <th className="py-3 px-4 text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)]">Status</th>
                  <th className="py-3 px-4 text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)]">Title</th>
                  <th className="py-3 px-4 text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)] hidden md:table-cell">Category</th>
                  <th className="py-3 px-4 text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)] hidden lg:table-cell">Type</th>
                  <th className="py-3 px-4 text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)] hidden sm:table-cell">Date</th>
                  <th className="py-3 px-4 text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)] text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {articles.slice(0, 10).map((article) => {
                  const author = typeof article.author === 'object' && 'name' in article.author ? article.author.name : article.leadAuthor?.name ?? 'Editorial Desk'
                  return (
                    <tr key={article.id} className="hover:bg-[var(--color-ivory)] transition-colors h-14">
                      <td className="py-3 px-4 whitespace-nowrap">
                        <StatusDot status={article.status ?? 'DRAFT'} />
                      </td>
                      <td className="py-3 px-4">
                        <Link
                          href={`/admin/lobby/articles/${article.id}`}
                          className="text-[var(--color-graphite)] hover:text-[var(--color-accent)] transition-colors line-clamp-1"
                        >
                          {article.title}
                        </Link>
                        <p className="text-[0.6875rem] text-[var(--color-graphite-muted)] line-clamp-1">
                          By {author} · /{article.slug}
                        </p>
                      </td>
                      <td className="py-3 px-4 text-[var(--color-graphite-mid)] whitespace-nowrap hidden md:table-cell">
                        {article.categoryName ?? article.category ?? '—'}
                      </td>
                      <td className="py-3 px-4 text-[0.6875rem] text-[var(--color-graphite-muted)] whitespace-nowrap hidden lg:table-cell">
                        {article.contentType ?? 'ARTICLE'}
                      </td>
                      <td className="py-3 px-4 text-[0.6875rem] text-[var(--color-graphite-muted)] whitespace-nowrap hidden sm:table-cell">
                        {fmt(article.publishedAt)}
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <Link
                          href={`/admin/lobby/articles/${article.id}`}
                          className="text-[0.6875rem] font-light tracking-[0.1em] uppercase text-[var(--color-graphite)] hover:text-[var(--color-accent)] underline underline-offset-4"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="border border-[var(--color-border)] p-12 text-center bg-white">
            <p className="text-[0.6875rem] font-light tracking-[0.2em] uppercase text-[var(--color-graphite-muted)] mb-2">
              No articles recorded
            </p>
            <p className="text-sm font-light text-[var(--color-graphite-mid)] mb-4">
              Begin by drafting a new editorial dispatch.
            </p>
            <Button as="link" href="/admin/lobby/articles/new" variant="primary" size="sm">
              + New Article
            </Button>
          </div>
        )}
      </section>

    </div>
  )
}
