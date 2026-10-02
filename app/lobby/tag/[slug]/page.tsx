import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getTagBySlug, getTags, getPublishedArticles } from '@/lib/lobby'
import { LobbyWireStory } from '@/components/lobby/LobbyWireStory'
import { generatePageMetadata } from '@/lib/metadata'

interface TagPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const tags = await getTags()
  return tags.map((t) => ({
    slug: t.slug,
  }))
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { slug } = await params
  const tag = await getTagBySlug(slug)

  if (!tag) {
    return generatePageMetadata({
      title: 'Taxonomy Not Found // The Lobby',
      description: 'The requested topic tag could not be found.',
      path: '/lobby',
    })
  }

  return {
    ...generatePageMetadata({
      title: `${tag.name} // Topic Intelligence // The Lobby`,
      description: tag.description || `Field intelligence and technical dossiers tagged under ${tag.name}.`,
      path: `/lobby/tag/${tag.slug}`,
    }),
    robots: {
      index: false, // Prevent thin taxonomy indexation per search hygiene guidelines
      follow: true,
    },
  }
}

export default async function LobbyTagPage({ params }: TagPageProps) {
  const { slug } = await params
  const tag = await getTagBySlug(slug)

  if (!tag) {
    notFound()
  }

  const allArticles = await getPublishedArticles()
  const matchingArticles = allArticles.filter((article) => {
    // Check if tag is in article tags or category or text matches
    const tagSlug = tag.slug.toLowerCase()
    const inTags = article.tags?.some((t) => t.slug === tagSlug)
    const inSlug = article.slug.includes(tagSlug)
    const inCat = (article.categorySlug || article.category || '').includes(tagSlug)
    return inTags || inSlug || inCat
  })

  return (
    <div className="min-h-screen bg-[var(--color-ivory)] dark:bg-[#080808] text-neutral-900 dark:text-white pt-28 pb-24 px-6 sm:px-8 md:px-12">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Navigation Breadcrumb */}
        <div className="border-b border-black/10 dark:border-white/10 pb-4 text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400">
          <Link href="/lobby" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
            ← THE LOBBY
          </Link>
          <span className="mx-2">//</span>
          <span>TAXONOMY TAG</span>
        </div>

        {/* Tag Header */}
        <header className="space-y-4 border border-black/10 dark:border-white/10 p-8 bg-black/[0.015] dark:bg-white/[0.015]">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 block">
            TOPIC TAG // {tag.slug}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extralight tracking-tight text-neutral-900 dark:text-white">
            {tag.name}
          </h1>
          {tag.description && (
            <p className="text-sm font-light text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
              {tag.description}
            </p>
          )}
          <div className="pt-2 text-[10px] font-mono text-neutral-400">
            {matchingArticles.length} {matchingArticles.length === 1 ? 'DISPATCH' : 'DISPATCHES'} CLASSIFIED
          </div>
        </header>

        {/* Matching Dispatches */}
        <section aria-label="Matching Dispatches" className="space-y-6">
          <div className="flex items-baseline justify-between border-b border-black/10 dark:border-white/10 pb-4">
            <span className="text-xs font-mono uppercase tracking-[0.15em] text-neutral-400">
              Classified Dossiers
            </span>
            <span className="text-[10px] font-mono text-neutral-400">
              Chronological
            </span>
          </div>

          {matchingArticles.length > 0 ? (
            <div className="space-y-2">
              {matchingArticles.map((article) => (
                <LobbyWireStory key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="border border-black/10 dark:border-white/10 p-12 text-center max-w-md mx-auto space-y-2">
              <p className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                No Dispatches Currently Tagged
              </p>
              <p className="text-xs font-light text-neutral-600 dark:text-neutral-400">
                Field observations corresponding to this taxonomy are currently in review or unindexed.
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
            ← Back to The Lobby
          </Link>
        </div>
      </div>
    </div>
  )
}
