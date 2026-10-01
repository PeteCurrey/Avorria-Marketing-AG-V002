import React from 'react'
import type { QualitativeEvidence } from '@/types/case-study'

interface EvidenceLedgerProps {
  evidence: QualitativeEvidence[]
  className?: string
}

const CATEGORY_LABELS: Record<string, string> = {
  SYSTEM_REBUILT: 'SYSTEM REBUILT',
  WORKFLOW_AUTOMATED: 'WORKFLOW AUTOMATED',
  PLATFORM_LAUNCHED: 'PLATFORM LAUNCHED',
  INFRASTRUCTURE_CONSOLIDATED: 'INFRASTRUCTURE CONSOLIDATED',
  JOURNEY_REDESIGNED: 'JOURNEY REDESIGNED',
  INTERNAL_TOOLING: 'INTERNAL TOOLING',
  PERFORMANCE_VERIFIED: 'PERFORMANCE VERIFIED',
}

/**
 * Editorial Case Study Evidence Ledger
 * Shows strictly qualitative and audited evidence. Zero fabricated percentages.
 */
export function EvidenceLedger({ evidence, className = '' }: EvidenceLedgerProps) {
  return (
    <div className={`border border-[var(--color-border)] p-8 bg-[var(--color-ivory-dark)] ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4 mb-6">
        <span className="text-[var(--text-label)] tracking-[0.16em] uppercase font-light text-[var(--color-graphite-mid)] flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[var(--color-accent)] inline-block" />
          <span>VERIFIED COMMERCIAL &amp; TECHNICAL EVIDENCE</span>
        </span>
        <span className="font-mono text-[10px] text-[var(--color-graphite-muted)] uppercase">
          PROVENANCE: AUDITED
        </span>
      </div>

      {/* Evidence items */}
      <div className="space-y-6">
        {evidence.map((item) => (
          <div key={item.id} className="border-t border-[var(--color-border)] pt-4 first:border-t-0 first:pt-0">
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="font-mono text-[10px] uppercase text-[var(--color-accent)] tracking-wider">
                [{CATEGORY_LABELS[item.category] || item.category}]
              </span>
              <span className="font-mono text-[10px] text-[var(--color-graphite-muted)]">
                METHOD: {item.verificationMethod}
              </span>
            </div>
            <p className="text-[var(--text-body)] font-light text-[var(--color-graphite)] leading-relaxed mb-2">
              {item.statement}
            </p>
            {item.verifiableMetric && (
              <div className="inline-flex items-baseline gap-2 bg-[var(--color-ivory)] border border-[var(--color-border)] px-3 py-1 mt-1">
                <span className="font-mono text-[var(--text-small)] font-light text-[var(--color-accent)]">
                  {item.verifiableMetric.value}
                </span>
                <span className="text-[11px] font-mono text-[var(--color-graphite-muted)] uppercase">
                  ({item.verifiableMetric.context})
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
