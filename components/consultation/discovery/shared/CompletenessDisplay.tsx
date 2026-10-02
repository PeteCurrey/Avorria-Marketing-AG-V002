import { CompletenessMatrix, UNDERSTANDING_LEVELS, UnderstandingLevel } from '@/types/discovery'
import React from 'react'

interface CompletenessDisplayProps {
  completeness: CompletenessMatrix
}

export const CompletenessDisplay: React.FC<CompletenessDisplayProps> = ({ completeness }) => {
  const categories = [
    { key: 'business', label: 'BUSINESS' },
    { key: 'problem', label: 'PROBLEM' },
    { key: 'objective', label: 'OBJECTIVE' },
    { key: 'audience', label: 'AUDIENCE' },
    { key: 'technical_environment', label: 'ENVIRONMENT' },
    { key: 'materials', label: 'MATERIALS' },
    { key: 'timing', label: 'TIMING' },
    { key: 'budget', label: 'BUDGET' },
  ] as const

  const getStatusText = (status: UnderstandingLevel) => {
    switch (status) {
      case 'UNDERSTOOD':
        return <span className="text-[var(--color-graphite)]">✓ Understood</span>
      case 'PARTIALLY_UNDERSTOOD':
        return <span className="text-[var(--color-graphite-mid)]">◑ In progress</span>
      case 'NOT_YET_DEFINED':
        return <span className="text-[var(--color-graphite-muted)]">— Not yet defined</span>
      default:
        return <span className="text-[var(--color-graphite-muted)]">— Not yet defined</span>
    }
  }

  return (
    <div className="flex flex-col gap-2 font-work-sans font-light text-sm">
      {categories.map(({ key, label }) => {
        const val = completeness[key]
        return (
          <div key={key} className="flex justify-between w-full max-w-sm">
            <span className="uppercase tracking-wide text-xs">{label}</span>
            <span>{getStatusText(val)}</span>
          </div>
        )
      })}
    </div>
  )
}
