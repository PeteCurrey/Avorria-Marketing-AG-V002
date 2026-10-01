import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getArticleBySlug, getAllArticles } from '@/lib/lobby'
import { LobbyProvenanceBadge } from '@/components/lobby/LobbyProvenanceBadge'
import { LobbyDataSnippet } from '@/components/lobby/LobbyDataSnippet'
import { LobbySourceCitations } from '@/components/lobby/LobbySourceCitations'
import { generatePageMetadata } from '@/lib/metadata'

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    return generatePageMetadata({
      title: 'Article Not Found // The Lobby',
      description: 'The requested intelligence dispatch could not be found.',
      path: '/lobby',
    })
  }

  return generatePageMetadata({
    title: `${article.title} // The Lobby`,
    description: article.dek,
    path: `/lobby/${article.slug}`,
  })
}

export default async function LobbyArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-[var(--color-ivory)] dark:bg-[#080808] text-neutral-900 dark:text-white pt-28 pb-24 px-6 sm:px-8 md:px-12">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Breadcrumb & Issue Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-4 text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400">
          <div className="flex items-center gap-3">
            <Link href="/lobby" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              ← THE LOBBY
            </Link>
            <span>//</span>
            <Link href={`/lobby/category/${article.category}`} className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              {article.categoryLabel}
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span>{article.issueNumber}</span>
            <span>•</span>
            <span>{article.readTimeMinutes} MIN READ</span>
          </div>
        </div>

        {/* Masthead Headline & Dek */}
        <header className="space-y-6 max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-neutral-900 dark:text-white leading-[1.08]">
            {article.title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-light text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {article.dek}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-black/5 dark:border-white/5">
            <div>
              <span className="text-[9px] font-mono uppercase text-neutral-400 block">Lead Principal</span>
              <p className="text-xs font-light text-neutral-900 dark:text-white">{article.leadAuthor.name}</p>
            </div>
            <div>
              <span className="text-[9px] font-mono uppercase text-neutral-400 block">Desk</span>
              <p className="text-xs font-light text-neutral-500">{article.leadAuthor.role}</p>
            </div>
            <div>
              <span className="text-[9px] font-mono uppercase text-neutral-400 block">Published</span>
              <p className="text-xs font-light text-neutral-500">
                {new Date(article.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
        </header>

        {/* Provenance Verification Ledger */}
        <section aria-label="Provenance Information" className="border border-black/10 dark:border-white/10 p-6 bg-black/[0.01] dark:bg-white/[0.015]">
          <LobbyProvenanceBadge
            state={article.provenance.state}
            rationale={article.provenance.rationale}
          />
        </section>

        {/* Two-Column Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Reading Flow (8 cols) */}
          <main className="lg:col-span-8 space-y-12">
            {article.sections.map((section, idx) => (
              <section key={section.title || idx} className="space-y-6">
                {section.title && (
                  <div className="border-b border-black/10 dark:border-white/10 pb-3">
                    {section.romanNumeral && (
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 block mb-1">
                        SECTION {section.romanNumeral}
                      </span>
                    )}
                    <h2 className="text-2xl font-extralight tracking-tight text-neutral-900 dark:text-white">
                      {section.title}
                    </h2>
                  </div>
                )}

                <div className="space-y-5 text-sm sm:text-base font-light text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {section.pullQuote && (
                  <figure className="my-8 border-l-2 border-neutral-900 dark:border-white pl-6 py-2 space-y-2">
                    <blockquote className="text-lg sm:text-xl font-extralight italic text-neutral-900 dark:text-white leading-snug">
                      &ldquo;{section.pullQuote.text}&rdquo;
                    </blockquote>
                    {section.pullQuote.attribution && (
                      <figcaption className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                        // {section.pullQuote.attribution}
                      </figcaption>
                    )}
                  </figure>
                )}

                {section.comparisonTable && (
                  <div className="my-8 border border-black/10 dark:border-white/10 overflow-x-auto bg-black/[0.01] dark:bg-white/[0.01]">
                    <table className="w-full text-left text-xs font-light border-collapse">
                      <thead>
                        <tr className="border-b border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                          {section.comparisonTable.headers.map((h, hIdx) => (
                            <th key={hIdx} className="py-3 px-4">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/5 dark:divide-white/5 font-sans text-xs">
                        {section.comparisonTable.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02]">
                            <td className="py-3 px-4 text-neutral-500 font-mono text-[11px]">{row[0]}</td>
                            <td className="py-3 px-4 text-rose-600 dark:text-rose-400">{row[1]}</td>
                            <td className="py-3 px-4 text-emerald-700 dark:text-emerald-400">{row[2]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}

            {/* Citations Footer */}
            <LobbySourceCitations sources={article.sources} />
          </main>

          {/* Sticky Side-Rail (4 cols) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
            
            {/* Telemetry Snippets */}
            {article.dataSnippets && article.dataSnippets.length > 0 && (
              <div className="space-y-3">
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-400 block">
                  Audited Telemetry Snippets
                </span>
                {article.dataSnippets.map((snippet) => (
                  <LobbyDataSnippet key={snippet.label} snippet={snippet} />
                ))}
              </div>
            )}

            {/* Annotations */}
            {article.annotations && article.annotations.length > 0 && (
              <div className="border border-black/10 dark:border-white/10 p-5 bg-black/[0.015] dark:bg-white/[0.02] space-y-3">
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-400 block">
                  Architectural Margin Notes
                </span>
                {article.annotations.map((ann) => (
                  <div key={ann.id} className="space-y-1 text-xs font-light">
                    <p className="text-[10px] font-mono text-neutral-500">// {ann.targetSection}</p>
                    <p className="text-neutral-700 dark:text-neutral-300 italic">{ann.note}</p>
                    <span className="text-[9px] font-mono text-neutral-400 block">— {ann.author}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Commercial Action Box */}
            <div className="border border-black/10 dark:border-white/10 p-6 bg-black/[0.02] dark:bg-white/[0.02] space-y-4">
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-400 block">
                Direct Studio Dialogue
              </span>
              <h3 className="text-sm font-light text-neutral-900 dark:text-white">
                Identify Similar Friction in Your Infrastructure
              </h3>
              <p className="text-xs font-light text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Run an automated diagnostic audit on your corporate domain or schedule a strategic scoping call with an Avorria lead principal.
              </p>
              <div className="space-y-2 pt-2">
                <Link
                  href="/audit"
                  className="block w-full py-2.5 text-center text-xs font-mono uppercase tracking-wider text-white bg-neutral-900 dark:text-black dark:bg-white hover:opacity-90 transition-opacity"
                >
                  Run Website Health Check ↗
                </Link>
                <Link
                  href="/start-a-project"
                  className="block w-full py-2 text-center text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  Consultation Wizard →
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Back Link */}
        <div className="pt-12 border-t border-black/10 dark:border-white/10">
          <Link
            href="/lobby"
            className="text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
          >
            ← Back to The Lobby Broadsheet
          </Link>
        </div>
      </div>
    </article>
  )
}
