import React from 'react'

interface ChapterGateProps {
  number: string
  title: string
  category?: string
  statement?: string
  className?: string
}

/**
 * Avorria Signature Moment A: The Chapter Gate
 * An expansive architectural pause with a Work Sans 200 monolithic title
 * and 1px edge-to-edge expanding hairline rule.
 */
export function ChapterGate({
  number,
  title,
  category = 'DISCIPLINE',
  statement,
  className = '',
}: ChapterGateProps) {
  return (
    <section className={`pt-24 pb-12 ${className}`} aria-label={`Chapter ${number}: ${title}`}>
      <div className="container-max">
        <div className="border-t border-[var(--color-border)] pt-8 pb-12">
          {/* Eyebrow & sequence tag */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-[var(--text-label)] tracking-[0.18em] uppercase font-light text-[var(--color-graphite-mid)] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[var(--color-accent)] inline-block" />
              <span>CHAPTER // {number}</span>
            </span>
            <span className="text-[var(--text-label)] tracking-[0.18em] uppercase font-light text-[var(--color-graphite-muted)] font-mono">
              [ {category} ]
            </span>
          </div>

          {/* Monolithic Statement */}
          <div className="max-w-4xl">
            <h2 className="font-display text-[var(--text-display-l)] font-extralight tracking-[var(--tracking-display)] text-[var(--color-graphite)] leading-[var(--leading-display)] uppercase mb-6">
              {title}
            </h2>
            {statement && (
              <p className="text-[var(--text-body-l)] font-light text-[var(--color-graphite-mid)] leading-relaxed max-w-2xl">
                {statement}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
