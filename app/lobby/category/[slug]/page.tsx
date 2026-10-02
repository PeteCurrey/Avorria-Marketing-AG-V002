import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCategoryBySlug, getAllCategories, getArticlesByCategory, getAllArticles } from '@/lib/lobby'
import { LobbyBroadsheetMasthead } from '@/components/lobby/LobbyBroadsheetMasthead'
import { LobbyWireStory } from '@/components/lobby/LobbyWireStory'
import { generatePageMetadata } from '@/lib/metadata'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map((cat) => ({
    slug: cat.slug,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    return generatePageMetadata({
      title: 'Category Not Found // The Lobby',
      description: 'The requested intelligence category could not be found.',
      path: '/lobby',
    })
  }

  const title = category.seoTitle || `${category.name || (category as any).label} // The Lobby`
  const description = category.seoDescription || category.description || (category as any).longDescription

  return generatePageMetadata({
    title,
    description,
    path: `/lobby/category/${category.slug}`,
  })
}

export default async function LobbyCategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const [categories, articles, allArticles] = await Promise.all([
    getAllCategories(),
    getArticlesByCategory(category.slug),
    getAllArticles(),
  ])

  const displayName = category.name || (category as any).label
  const displayDescription = (category as any).longDescription || category.description

  return (
    <div className="min-h-screen bg-[var(--color-ivory)] dark:bg-[#080808] text-neutral-900 dark:text-white pt-28 pb-24 px-6 sm:px-8 md:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Masthead */}
        <LobbyBroadsheetMasthead
          categories={categories}
          activeCategorySlug={category.slug}
          totalArticlesCount={allArticles.length}
        />

        {/* Category Dossier Header */}
        <div className="border border-black/10 dark:border-white/10 p-8 md:p-10 bg-black/[0.015] dark:bg-white/[0.015] space-y-4">
          <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400">
            <span>THEMATIC INTELLIGENCE DOSSIER</span>
            <span>//</span>
            <span>{category.slug}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extralight tracking-tight text-neutral-900 dark:text-white">
            {displayName}
          </h2>
          {displayDescription && (
            <p className="text-sm sm:text-base font-light text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
              {displayDescription}
            </p>
          )}
          <div className="pt-2 text-[10px] font-mono text-neutral-400">
            Indexed dispatches: {articles.length}
          </div>
        </div>

        {/* Dispatches in this Category */}
        <section aria-label="Category Dispatches" className="space-y-6">
          <div className="flex items-baseline justify-between border-b border-black/10 dark:border-white/10 pb-4">
            <span className="text-xs font-mono uppercase tracking-[0.15em] text-neutral-400">
              Dispatches in {displayName}
            </span>
            <span className="text-[10px] font-mono text-neutral-400">
              Chronological sequence
            </span>
          </div>

          {articles.length > 0 ? (
            <div className="space-y-2">
              {articles.map((article) => (
                <LobbyWireStory key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="border border-black/10 dark:border-white/10 p-12 text-center max-w-md mx-auto space-y-2">
              <p className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                Dossier in Staging
              </p>
              <p className="text-xs font-light text-neutral-600 dark:text-neutral-400">
                New field observations in this category are currently undergoing editorial and source verification.
              </p>
            </div>
          )}
        </section>

        {/* Back Link */}
        <div className="pt-8 border-t border-black/10 dark:border-white/10">
          <Link
            href="/lobby"
            className="text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
          >
            ← Back to All Dispatches
          </Link>
        </div>
      </div>
    </div>
  )
}
