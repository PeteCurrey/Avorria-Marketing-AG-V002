import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllArticlesAdmin, getCategories } from '@/lib/lobby'
import { LobbyAdminNav } from '@/components/admin/LobbyAdminNav'
import { PageHeader } from '@/components/ui/dashboard/PageHeader'
import { SectionLabel } from '@/components/ui/dashboard/SectionLabel'
import { StatusDot } from '@/components/ui/dashboard/StatusDot'
import { Button } from '@/components/ui/Button'
import type { LobbyArticleStatus } from '@/types/lobby'

export const metadata: Metadata = {
  title: 'Articles Registry // The Lobby Admin // Avorria',
  robots: { index: false, follow: false },
}

interface ArticlesPageProps {
  searchParams: Promise<{ status?: string; category?: string; q?: string }>
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

const STATUS_FILTERS = ['ALL', 'DRAFT', 'REVIEW', 'APPROVED', 'PUBLISHED', 'ARCHIVED'] as const

export default async function AdminArticlesPage({ searchParams }: ArticlesPageProps) {
  const { status, category, q } = await searchParams

  const [articles, categories] = await Promise.all([
    getAllArticlesAdmin({
      status: status && status !== 'ALL' ? (status as LobbyArticleStatus) : undefined,
      categoryId: category,
      search: q,
    }),
    getCategories(),
  ])

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <PageHeader
        label="EDITORIAL REGISTRY"
        title="Articles & Dispatches"
        action={
          <Button as="link" href="/admin/lobby/articles/new" variant="primary" size="sm">
            + New Article
          </Button>
        }
      />

      <LobbyAdminNav />

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-b border-[var(--color-border)]">
        <div className="flex flex-wrap items-center gap-2">
          {STATUS_FILTERS.map((st) => {
            const isSelected = (!status && st === 'ALL') || status === st
            const href = st === 'ALL' ? '/admin/lobby/articles' : `/admin/lobby/articles?status=${st}`

            return (
              <Link
                key={st}
                href={href}
                className={`text-[0.6875rem] font-light tracking-[0.14em] uppercase px-3 py-1.5 transition-colors duration-200 ${
                  isSelected
                    ? 'text-[var(--color-graphite)] bg-white border border-[var(--color-border)]'
                    : 'text-[var(--color-graphite-mid)] hover:text-[var(--color-graphite)]'
                }`}
              >
                {st}
              </Link>
            )
          })}
        </div>

        <form method="GET" action="/admin/lobby/articles" className="flex items-center">
          <input
            type="text"
            name="q"
            defaultValue={q || ''}
            placeholder="Search articles..."
            className="border border-[var(--color-border)] bg-white px-3 py-1 text-xs font-light text-[var(--color-graphite)] placeholder:text-[var(--color-graphite-muted)] focus:outline-none focus:border-[var(--color-graphite)]"
          />
        </form>
      </div>

      {/* Table */}
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
            {articles.length > 0 ? (
              articles.map((article) => {
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
              })
            ) : (
              <tr>
                <td colSpan={6} className="py-12 text-center text-sm font-light text-[var(--color-graphite-muted)]">
                  No articles matched the filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  )
}
