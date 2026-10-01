import type { Metadata } from 'next'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { getPublishedArticles } from '@/content/journal'

export const metadata: Metadata = generatePageMetadata({
  title: 'Journal',
  description:
    'Build notes, AI insights, web development articles and digital systems thinking from Avorria.',
  path: '/journal',
})

const categoryLabels: Record<string, string> = {
  'build-notes': 'Build Notes',
  ai: 'AI',
  web: 'Web',
  systems: 'Systems',
  insights: 'Insights',
}

export default function JournalPage() {
  const articles = getPublishedArticles()

  return (
    <div className="section-y-large">
      <div className="container-max">
        <div className="container-content">

          <Breadcrumb items={[{ label: 'Journal' }]} className="mb-12" />

          <div className="border-b border-[var(--color-border)] pb-16 mb-16">
            <Eyebrow>Journal</Eyebrow>
            <h1 className="text-display-l max-w-[640px]">
              Build notes &amp; insights.
            </h1>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3 mb-12">
            {Object.entries(categoryLabels).map(([slug, label]) => (
              <span key={slug} className="text-label-upper border border-[var(--color-border)] px-4 py-2 text-muted">
                {label}
              </span>
            ))}
          </div>

          {articles.length === 0 ? (
            <div className="border border-[var(--color-border)] p-16 text-center">
              <p className="text-label-upper mb-4">Coming soon</p>
              <p className="text-secondary max-w-[400px] mx-auto">
                Editorial articles, build notes and insights will be published here.
                Only authored, verified content will appear.
              </p>
            </div>
          ) : (
            <div className="space-y-0">
              {articles.map((article, i) => (
                <RevealOnScroll key={article.slug} delay={i * 60}>
                  <Link
                    href={`/journal/${article.slug}`}
                    className="group block border-t border-[var(--color-border)] py-10 hover:border-[var(--color-border-strong)] transition-colors duration-[var(--duration-base)]"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-[160px_1fr_200px] gap-4 md:gap-8 items-start">
                      <div>
                        <p className="text-label-upper text-muted">
                          {categoryLabels[article.category] ?? article.category}
                        </p>
                      </div>
                      <div>
                        <h2 className="text-display-s mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-[var(--duration-base)]">
                          {article.title}
                        </h2>
                        <p className="text-secondary line-clamp-2">{article.excerpt}</p>
                      </div>
                      <div className="flex items-start justify-between md:justify-end gap-4 md:flex-col md:items-end">
                        <p className="text-label-upper text-muted">
                          {new Date(article.publishedAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                        {article.readingTimeMinutes && (
                          <p className="text-label-upper text-muted">
                            {article.readingTimeMinutes} min read
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                </RevealOnScroll>
              ))}
              <div className="border-t border-[var(--color-border)]" aria-hidden="true" />
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
