import type { LobbyDataSnippet as LobbyDataSnippetType } from '@/types/lobby'

interface LobbyDataSnippetProps {
  snippet: LobbyDataSnippetType
  className?: string
}

export function LobbyDataSnippet({ snippet, className = '' }: LobbyDataSnippetProps) {
  return (
    <div className={`border border-black/10 dark:border-white/10 p-5 bg-black/[0.015] dark:bg-white/[0.02] space-y-2 ${className}`}>
      <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-[0.16em] text-neutral-400">
        <span>EMPIRICAL TELEMETRY</span>
        <span className="text-emerald-600 dark:text-emerald-400">● {snippet.provenance}</span>
      </div>
      <p className="text-3xl font-extralight tracking-tight text-neutral-900 dark:text-white font-mono">
        {snippet.metric}
      </p>
      <p className="text-xs font-light text-neutral-600 dark:text-neutral-300 leading-snug">
        {snippet.label}
      </p>
      <p className="text-[10px] font-mono text-neutral-400 pt-1 border-t border-black/5 dark:border-white/5 truncate">
        Source: {snippet.source}
      </p>
    </div>
  )
}
