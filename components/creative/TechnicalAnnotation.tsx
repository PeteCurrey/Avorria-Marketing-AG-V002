import React from 'react'

interface TechnicalAnnotationProps {
  label: string
  spec?: string
  coordinate?: string
  className?: string
}

/**
 * Creative Device 05: Technical Annotation
 * Blueprint-style coordinate markers, index tags, and technical specs.
 * Rendered in Work Sans 300, uppercase, tracking-wide.
 */
export function TechnicalAnnotation({
  label,
  spec,
  coordinate,
  className = '',
}: TechnicalAnnotationProps) {
  return (
    <div
      className={`inline-flex items-center gap-3 text-[var(--text-label)] tracking-[0.16em] uppercase text-[var(--color-graphite-mid)] font-light ${className}`}
      aria-hidden="true"
    >
      <span className="flex items-center gap-1">
        <span className="w-1.5 h-1.5 border-l border-t border-[var(--color-border-strong)] inline-block" />
        <span>{label}</span>
      </span>
      {spec && (
        <>
          <span className="text-[var(--color-border-strong)]">/</span>
          <span className="font-mono text-[10px] text-[var(--color-graphite-muted)]">{spec}</span>
        </>
      )}
      {coordinate && (
        <>
          <span className="text-[var(--color-border-strong)]">/</span>
          <span className="font-mono text-[10px] text-[var(--color-graphite-muted)]">{coordinate}</span>
        </>
      )}
    </div>
  )
}
