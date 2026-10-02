'use client'

import React from 'react'

interface StageProgressNavProps {
  currentStage: number
  totalStages: number
}

export const StageProgressNav: React.FC<StageProgressNavProps> = ({ currentStage, totalStages }) => {
  const stages = Array.from({ length: totalStages }, (_, i) => i + 1)

  return (
    <div className="flex overflow-x-auto gap-4 md:gap-8 pb-4 mb-8 border-b border-[var(--color-border)] hide-scrollbar font-work-sans text-sm">
      {stages.map((stage) => {
        const isPast = stage < currentStage
        const isCurrent = stage === currentStage
        const isFuture = stage > currentStage

        return (
          <div key={stage} className={`flex items-center gap-2 whitespace-nowrap transition-colors duration-300 ${isCurrent ? 'text-[var(--color-graphite)] font-[300] border-b border-[var(--color-graphite)] pb-1' : isFuture ? 'text-[var(--color-graphite-muted)] font-light' : 'text-[var(--color-accent)] font-light'}`}>
            <span>{String(stage).padStart(2, '0')}</span>
            {isPast && <span>✓</span>}
          </div>
        )
      })}
    </div>
  )
}
