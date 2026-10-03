import type { LobbyProvenanceState } from '@/types/lobby'

interface LobbyProvenanceBadgeProps {
  state: LobbyProvenanceState
  rationale?: string
  className?: string
}

const provenanceConfig: Record<
  LobbyProvenanceState,
  { label: string; border: string; text: string; bg: string }
> = {
  VERIFIED: {
    label: 'PROVENANCE: VERIFIED EMPIRICAL',
    border: 'border-emerald-600/30',
    text: 'text-emerald-700 dark:text-emerald-400',
    bg: 'bg-emerald-500/5',
  },
  SOURCE_LINKED: {
    label: 'PROVENANCE: PRIMARY SOURCE LINKED',
    border: 'border-blue-600/30',
    text: 'text-blue-700 dark:text-blue-400',
    bg: 'bg-blue-500/5',
  },
  EDITORIAL_ANALYSIS: {
    label: 'PROVENANCE: EDITORIAL ANALYSIS',
    border: 'border-purple-600/30',
    text: 'text-purple-700 dark:text-purple-400',
    bg: 'bg-purple-500/5',
  },
  OPINION: {
    label: 'PROVENANCE: CONTRARIAN OPINION',
    border: 'border-amber-600/30',
    text: 'text-amber-700 dark:text-amber-400',
    bg: 'bg-amber-500/5',
  },
  DRAFT: {
    label: 'INTERNAL STAGING · DRAFT',
    border: 'border-black/20 dark:border-white/20',
    text: 'text-neutral-500',
    bg: 'bg-black/5 dark:bg-white/5',
  },
}

export function LobbyProvenanceBadge({ state, rationale, className = '' }: LobbyProvenanceBadgeProps) {
  const config = provenanceConfig[state] || provenanceConfig.EDITORIAL_ANALYSIS

  return (
    <div className={`inline-flex flex-col gap-1 ${className}`}>
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-mono uppercase tracking-[0.18em] border ${config.border} ${config.text} ${config.bg}`}
      >
        <span className="w-1 h-1 rounded-full bg-current opacity-80" />
        {config.label}
      </span>
      {rationale && (
        <span className="text-[10px] font-light text-neutral-500 dark:text-neutral-400 font-mono tracking-tight max-w-md">
          {rationale}
        </span>
      )}
    </div>
  )
}
