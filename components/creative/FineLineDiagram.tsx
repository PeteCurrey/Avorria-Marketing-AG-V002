import React from 'react'

interface FineLineDiagramProps {
  className?: string
}

/**
 * Creative Device 06: Fine-Line Diagrams (Architectural Vector Schematics)
 * 1px geometric architectural schematic of the Scout -> Strategy -> Deployment pipeline.
 */
export function FineLineDiagram({ className = '' }: FineLineDiagramProps) {
  const steps = [
    {
      index: '01',
      phase: 'FORENSIC AUDIT',
      detail: 'Lighthouse / Schema / Crawl Graph / Server Attribution',
      spec: 'DIAGNOSTIC',
    },
    {
      index: '02',
      phase: 'SYSTEM ARCHITECTURE',
      detail: 'Next.js App Router / Zod Contracts / Database Isolation',
      spec: 'SPECIFICATION',
    },
    {
      index: '03',
      phase: 'PRECISION BUILD',
      detail: 'Tailwind v4 / Work Sans / Zero Layout Shift / 100 CWV',
      spec: 'PRODUCTION',
    },
    {
      index: '04',
      phase: 'COMMERCIAL PIPELINE',
      detail: 'Stripe Settlement / Continuous Search Dominance / BI',
      spec: 'DEPLOYMENT',
    },
  ]

  return (
    <div className={`border border-[var(--color-border)] p-6 md:p-8 bg-[var(--color-ivory-dark)] ${className}`}>
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4 mb-8">
        <span className="text-[var(--text-label)] tracking-[0.16em] uppercase font-light text-[var(--color-graphite-mid)] flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[var(--color-graphite)] inline-block" />
          <span>SCHEMATIC // DELIVERY PIPELINE</span>
        </span>
        <span className="text-[var(--text-label)] font-mono text-[var(--color-graphite-muted)] uppercase">
          TOLERANCE: ZERO-REGRESSION
        </span>
      </div>

      {/* Pipeline Sequence */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
        {steps.map((s, idx) => (
          <div key={s.index} className="relative group">
            {/* Step Index & Indicator */}
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-[var(--text-label)] text-[var(--color-accent)] font-light">
                [{s.index}]
              </span>
              <div className="h-[1px] flex-1 bg-[var(--color-border-strong)]" />
              {idx < steps.length - 1 && (
                <span className="hidden md:inline-block text-[10px] text-[var(--color-border-strong)]">
                  →
                </span>
              )}
            </div>

            {/* Title & Phase */}
            <h4 className="text-[var(--text-small)] font-light text-[var(--color-graphite)] uppercase tracking-[0.08em] mb-1.5">
              {s.phase}
            </h4>
            <p className="text-[var(--text-label)] font-light text-[var(--color-graphite-mid)] leading-relaxed">
              {s.detail}
            </p>

            <div className="mt-4 pt-2 border-t border-[var(--color-border)]">
              <span className="text-[10px] font-mono text-[var(--color-graphite-muted)] uppercase">
                {s.spec}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
