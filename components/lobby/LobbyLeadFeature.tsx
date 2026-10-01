import Link from 'next/link'
import type { LobbyArticle } from '@/types/lobby'
import { LobbyProvenanceBadge } from '@/components/lobby/LobbyProvenanceBadge'
import { LobbyDataSnippet } from '@/components/lobby/LobbyDataSnippet'

interface LobbyLeadFeatureProps {
  article: LobbyArticle
}

export function LobbyLeadFeature({ article }: LobbyLeadFeatureProps) {
  return (
    <article className="border border-black/10 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.015] p-8 md:p-12 space-y-8">
      {/* Top Metadata Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400">
            COVER FEATURE // {article.issueNumber}
          </span>
          <span className="text-neutral-300 dark:text-neutral-700">|</span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
            {article.categoryLabel}
          </span>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-mono text-neutral-400">
          <span>{new Date(article.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          <span>•</span>
          <span>{article.readTimeMinutes} MIN READ</span>
        </div>
      </div>

      {/* Main Grid: Headline + Dek & Snippets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
            <Link
              href={`/lobby/${article.slug}`}
              className="hover:underline underline-offset-8 decoration-1 transition-all"
            >
              {article.title}
            </Link>
          </h2>

          <p className="text-sm sm:text-base font-light text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl">
            {article.dek}
          </p>

          <div className="pt-2">
            <LobbyProvenanceBadge
              state={article.provenance.state}
              rationale={article.provenance.rationale}
            />
          </div>

          <div className="pt-4 flex items-center gap-6 border-t border-black/5 dark:border-white/5">
            <div>
              <span className="text-[9px] font-mono uppercase text-neutral-400 block">Lead Principal</span>
              <p className="text-xs font-light text-neutral-800 dark:text-neutral-200">{article.leadAuthor.name}</p>
            </div>
            <div>
              <span className="text-[9px] font-mono uppercase text-neutral-400 block">Desk</span>
              <p className="text-xs font-light text-neutral-500">{article.leadAuthor.role}</p>
            </div>
            <div className="ml-auto">
              <Link
                href={`/lobby/${article.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-white bg-neutral-900 dark:text-black dark:bg-white hover:opacity-90 transition-opacity"
              >
                <span>Read Full Investigation</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right column: empirical data snippets */}
        <div className="lg:col-span-4 space-y-4">
          <div className="border-b border-black/10 dark:border-white/10 pb-2">
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-400">
              Diagnostic Observations
            </span>
          </div>
          {article.dataSnippets && article.dataSnippets.length > 0 ? (
            article.dataSnippets.map((snippet) => (
              <LobbyDataSnippet key={snippet.label} snippet={snippet} />
            ))
          ) : (
            <div className="border border-black/10 dark:border-white/10 p-4 text-[11px] font-light text-neutral-400">
              Full evidentiary citations and source code commit hashes available in dispatch dossier.
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
