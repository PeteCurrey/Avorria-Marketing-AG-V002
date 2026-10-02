import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAuthorBySlug, getAuthors, getPublishedArticles } from '@/lib/lobby'
import { LobbyWireStory } from '@/components/lobby/LobbyWireStory'
import { generatePageMetadata } from '@/lib/metadata'

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const authors = await getAuthors()
  return authors.map((a) => ({
    slug: a.slug,
  }))
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    return generatePageMetadata({
      title: 'Contributor Not Found // The Lobby',
      description: 'The requested contributor profile could not be found.',
      path: '/lobby',
    })
  }

  return generatePageMetadata({
    title: `${author.name} // Editorial Contributor // The Lobby`,
    description: author.bio,
    path: `/lobby/author/${author.slug}`,
  })
}

export default async function LobbyAuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    notFound()
  }

  const allArticles = await getPublishedArticles()
  const authorArticles = allArticles.filter((a) => {
    if (typeof a.author === 'object' && 'slug' in a.author && a.author.slug === author.slug) {
      return true
    }
    if (a.leadAuthor?.name.toLowerCase().includes(author.name.toLowerCase())) {
      return true
    }
    return false
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
          <span>EDITORIAL PRINCIPAL PROFILE</span>
        </div>

        {/* Author Bio Header */}
        <header className="border border-black/10 dark:border-white/10 p-8 md:p-10 bg-black/[0.015] dark:bg-white/[0.015] space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 block">
              // VERIFIED CONTRIBUTOR DOSSIER
            </span>
            <h1 className="text-3xl sm:text-4xl font-extralight tracking-tight text-neutral-900 dark:text-white">
              {author.name}
            </h1>
            <p className="text-xs sm:text-sm font-mono text-neutral-500">
              {author.role}
            </p>
          </div>

          <p className="text-sm sm:text-base font-light text-neutral-700 dark:text-neutral-300 max-w-2xl leading-relaxed">
            {author.bio}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-6 text-[11px] font-mono text-neutral-400 border-t border-black/5 dark:border-white/5 pt-4">
            <div>
              <span>Indexed Dispatches: </span>
              <span className="text-neutral-900 dark:text-white">{authorArticles.length}</span>
            </div>
            {author.socialLinks?.linkedin && (
              <a
                href={author.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                LinkedIn ↗
              </a>
            )}
            {author.socialLinks?.github && (
              <a
                href={author.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                GitHub ↗
              </a>
            )}
          </div>
        </header>

        {/* Published Dossiers by this Author */}
        <section aria-label="Authored Dispatches" className="space-y-6">
          <div className="flex items-baseline justify-between border-b border-black/10 dark:border-white/10 pb-4">
            <span className="text-xs font-mono uppercase tracking-[0.15em] text-neutral-400">
              Published Intelligence by {author.name}
            </span>
            <span className="text-[10px] font-mono text-neutral-400">
              Chronological
            </span>
          </div>

          {authorArticles.length > 0 ? (
            <div className="space-y-2">
              {authorArticles.map((article) => (
                <LobbyWireStory key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="border border-black/10 dark:border-white/10 p-12 text-center max-w-md mx-auto space-y-2">
              <p className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                Awaiting Publication
              </p>
              <p className="text-xs font-light text-neutral-600 dark:text-neutral-400">
                Authored dispatches are currently progressing through peer review and empirical verification.
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
