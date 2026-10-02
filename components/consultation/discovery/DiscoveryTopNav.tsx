'use client'

import React from 'react'
import Link from 'next/link'

interface StageMeta {
  label: string
  slug: string
  number: number
}

interface DiscoveryTopNavProps {
  stages: StageMeta[]
  currentStage: number
  completedStages?: number[]
  saveStatus: 'idle' | 'saving' | 'saved' | 'error'
  dossierOpen: boolean
  onDossierToggle: () => void
  onStageClick: (stageNumber: number) => void
  onSaveAndReturn: () => void
}

export const DiscoveryTopNav: React.FC<DiscoveryTopNavProps> = ({
  stages,
  currentStage,
  completedStages = [],
  saveStatus,
  dossierOpen,
  onDossierToggle,
  onStageClick,
  onSaveAndReturn,
}) => {
  const currentStageMeta = stages.find((s) => s.number === currentStage)

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[var(--color-border)] transition-all">
      <div className="max-w-[1560px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between font-work-sans text-xs">
        {/* Left: Brand + Mode */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-[var(--color-graphite)] font-[300] tracking-[0.16em] uppercase hover:text-[var(--color-rose-text)] transition-colors"
          >
            AVORRIA
          </Link>
          <span className="text-[var(--color-border-strong)] hidden sm:inline">/</span>
          <span className="text-[var(--color-graphite-muted)] tracking-wider uppercase hidden sm:inline font-light">
            PROJECT DISCOVERY
          </span>
        </div>

        {/* Centre: Stage Navigator (Desktop) */}
        <nav aria-label="Discovery Journey" className="hidden lg:flex items-center gap-5 xl:gap-7">
          {stages.map((stage) => {
            const isActive = currentStage === stage.number
            const isPast = completedStages.includes(stage.number)
            const isClickable = isPast || stage.number === currentStage

            return (
              <button
                key={stage.number}
                type="button"
                onClick={() => isClickable && onStageClick(stage.number)}
                aria-current={isActive ? 'step' : undefined}
                className={`flex items-center gap-1.5 py-1 tracking-wider uppercase transition-colors group ${
                  isClickable ? 'cursor-pointer' : 'cursor-default'
                } ${
                  isActive
                    ? 'text-[var(--color-graphite)] font-[300] border-b border-[var(--color-graphite)]'
                    : isPast
                    ? 'text-[var(--color-graphite-mid)] hover:text-[var(--color-graphite)] font-light'
                    : 'text-[var(--color-graphite-muted)] font-light'
                }`}
              >
                <span className="text-[10px] text-[var(--color-graphite-muted)] group-hover:text-[var(--color-graphite)] transition-colors">
                  {String(stage.number).padStart(2, '0')}
                </span>
                <span className="text-[11px]">{stage.label}</span>
                {isPast && !isActive && (
                  <span className="text-[10px] text-[var(--color-rose-text)]">✓</span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Centre: Compact mobile stage indicator */}
        <div className="lg:hidden flex items-center gap-2">
          <span className="text-[11px] uppercase tracking-wider text-[var(--color-graphite-muted)]">
            STAGE {String(currentStage).padStart(2, '0')} / 09
          </span>
          <span className="text-[var(--color-border-strong)]">·</span>
          <span className="text-[11px] uppercase tracking-wider text-[var(--color-graphite)] font-[300]">
            {currentStageMeta?.label || ''}
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Save status dot */}
          <div className="hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-wider text-[var(--color-graphite-muted)]">
            <span
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                saveStatus === 'saving'
                  ? 'bg-amber-400 animate-pulse'
                  : saveStatus === 'error'
                  ? 'bg-rose-500'
                  : saveStatus === 'saved'
                  ? 'bg-emerald-500'
                  : 'bg-[var(--color-border-strong)]'
              }`}
            />
            <span>
              {saveStatus === 'saving'
                ? 'SAVING...'
                : saveStatus === 'error'
                ? 'SAVE ERROR'
                : saveStatus === 'saved'
                ? 'DRAFT SAVED'
                : 'AUTO-SAVE ON'}
            </span>
          </div>

          <button
            type="button"
            onClick={onSaveAndReturn}
            className="text-[11px] uppercase tracking-wider text-[var(--color-graphite-muted)] hover:text-[var(--color-graphite)] transition-colors py-1 cursor-pointer"
          >
            SAVE &amp; RETURN
          </button>

          <button
            type="button"
            onClick={onDossierToggle}
            aria-expanded={dossierOpen}
            aria-label={dossierOpen ? 'Close dossier' : 'Open dossier'}
            className={`text-[11px] uppercase tracking-wider px-3 py-1.5 border transition-all cursor-pointer ${
              dossierOpen
                ? 'bg-[var(--color-graphite)] text-white border-[var(--color-graphite)]'
                : 'bg-[#F8F7F5] text-[var(--color-graphite)] border-[var(--color-border)] hover:bg-white'
            }`}
          >
            DOSSIER {dossierOpen ? '✕' : '→'}
          </button>
        </div>
      </div>
    </header>
  )
}
