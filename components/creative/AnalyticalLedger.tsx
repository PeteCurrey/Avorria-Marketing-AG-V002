import React from 'react'

export interface LedgerItem {
  key: string
  label: string
  value: string
  subtext?: string
}

interface AnalyticalLedgerProps {
  title?: string
  eyebrow?: string
  items: LedgerItem[]
  className?: string
}

/**
 * Creative Device 07: Restrained Data Visualisation (The Analytical Ledger)
 * High-density minimalist table/spec sheet for factual data disclosure.
 */
export function AnalyticalLedger({
  title,
  eyebrow,
  items,
  className = '',
}: AnalyticalLedgerProps) {
  return (
    <div className={`border-t border-[var(--color-border)] pt-6 ${className}`}>
      {(eyebrow || title) && (
        <div className="mb-6">
          {eyebrow && (
            <p className="text-[var(--text-label)] tracking-[0.16em] uppercase font-light text-[var(--color-graphite-mid)] mb-1">
              {eyebrow}
            </p>
          )}
          {title && (
            <h3 className="text-[var(--text-heading)] font-light text-[var(--color-graphite)] uppercase tracking-[var(--tracking-heading)]">
              {title}
            </h3>
          )}
        </div>
      )}

      {/* High-density spec ledger */}
      <dl className="divide-y divide-[var(--color-border)]">
        {items.map((item) => (
          <div key={item.key} className="py-3.5 flex flex-wrap items-baseline justify-between gap-4">
            <dt className="text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] flex items-center gap-2">
              <span className="w-1 h-1 bg-[var(--color-border-strong)] inline-block" />
              <span>{item.label}</span>
            </dt>
            <dd className="text-right">
              <span className="font-mono text-[var(--text-small)] font-light text-[var(--color-graphite)]">
                {item.value}
              </span>
              {item.subtext && (
                <span className="block text-[var(--text-label)] font-light text-[var(--color-graphite-muted)] mt-0.5">
                  {item.subtext}
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
