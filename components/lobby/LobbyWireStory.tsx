import Link from 'next/link'
import type { LobbyArticle } from '@/types/lobby'
import { LobbyProvenanceBadge } from '@/components/lobby/LobbyProvenanceBadge'

interface LobbyWireStoryProps {
  article: LobbyArticle
}

export function LobbyWireStory({ article }: LobbyWireStoryProps) {
  return (
    <article className="border-t border-black/10 dark:border-white/10 pt-6 pb-8 transition-colors hover:bg-black/[0.008] dark:hover:bg-white/[0.01]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline">
        {/* Margin Metadata Column */}
        <div className="md:col-span-3 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-neutral-400">
              {article.id}
            </span>
            <span className="text-neutral-300 dark:text-neutral-700">//</span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
              {article.categoryLabel}
            </span>
          </div>
          <p className="text-[10px] font-mono text-neutral-400">
            {new Date(article.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
          <div className="pt-1">
            <LobbyProvenanceBadge state={article.provenance.state} />
          </div>
        </div>

        {/* Content Column */}
        <div className="md:col-span-7 space-y-2.5">
          <h3 className="text-xl sm:text-2xl font-extralight tracking-tight text-neutral-900 dark:text-white leading-snug">
            <Link
              href={`/lobby/${article.slug}`}
              className="hover:underline underline-offset-4 decoration-1 transition-all"
            >
              {article.title}
            </Link>
          </h3>
          <p className="text-xs sm:text-sm font-light text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {article.dek}
          </p>
          <div className="flex items-center gap-3 text-[10px] font-mono text-neutral-400 pt-1">
            <span>By {article.leadAuthor.name}</span>
            <span>•</span>
            <span>{article.readTimeMinutes} MIN READ</span>
            {article.sources && article.sources.length > 0 && (
              <>
                <span>•</span>
                <span>{article.sources.length} CITATIONS</span>
              </>
            )}
          </div>
        </div>

        {/* Action Link Column */}
        <div className="md:col-span-2 md:text-right">
          <Link
            href={`/lobby/${article.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white border-b border-black/20 dark:border-white/20 pb-0.5"
          >
            <span>Dossier</span>
            <span>↗</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
