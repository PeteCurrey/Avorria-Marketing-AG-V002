import type { LobbySource } from '@/types/lobby'

interface LobbySourceCitationsProps {
  sources: LobbySource[]
  className?: string
}

export function LobbySourceCitations({ sources, className = '' }: LobbySourceCitationsProps) {
  if (!sources || sources.length === 0) return null

  return (
    <div className={`border border-black/10 dark:border-white/10 p-6 bg-black/[0.01] dark:bg-white/[0.01] space-y-4 ${className}`}>
      <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-3">
        <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
          Source Citations & Primary Evidence ({sources.length})
        </h3>
        <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400">
          EXTERNAL CLAIMS VERIFIED
        </span>
      </div>

      <div className="space-y-4 divide-y divide-black/5 dark:divide-white/5">
        {sources.map((source, index) => (
          <div key={source.id} className={index > 0 ? 'pt-4 space-y-1.5' : 'space-y-1.5'}>
            <div className="flex items-baseline justify-between gap-4">
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-light text-neutral-900 dark:text-white hover:underline underline-offset-4 flex items-center gap-1.5"
              >
                <span>[{index + 1}] {source.title}</span>
                <span className="text-[10px] font-mono text-neutral-400">↗</span>
              </a>
              <span className="text-[9px] font-mono text-neutral-400 shrink-0">
                {source.publisher}
              </span>
            </div>
            {source.quoteSnippet && (
              <blockquote className="text-[11px] font-light italic text-neutral-500 dark:text-neutral-400 border-l border-black/20 dark:border-white/20 pl-3 py-0.5">
                &ldquo;{source.quoteSnippet}&rdquo;
              </blockquote>
            )}
            <div className="text-[9px] font-mono text-neutral-400">
              Retrieved {source.retrievedDate}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
