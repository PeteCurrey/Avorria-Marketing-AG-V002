/**
 * AnnotationLabel — small rose/bronze hairline callout.
 *
 * Renders a thin accent rule followed by small-caps tracked uppercase text.
 * Use for image captions, callout references, and editorial annotations.
 *
 * Usage:
 *   <AnnotationLabel>Precision engineering geometry</AnnotationLabel>
 *   <AnnotationLabel accent="bronze">01 — Architecture</AnnotationLabel>
 */

type AccentColor = 'rose' | 'bronze'

interface AnnotationLabelProps {
  children: React.ReactNode
  accent?: AccentColor
  className?: string
}

const ACCENT_COLORS: Record<AccentColor, string> = {
  rose:   'var(--color-accent)',
  bronze: 'var(--color-bronze)',
}

export function AnnotationLabel({
  children,
  accent = 'rose',
  className = '',
}: AnnotationLabelProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[0.625rem] font-light tracking-[0.18em] uppercase text-[var(--color-graphite-muted)] ${className}`}
    >
      <span
        className="inline-block h-px flex-shrink-0"
        style={{
          width: '1.25rem',
          backgroundColor: ACCENT_COLORS[accent],
        }}
        aria-hidden="true"
      />
      {children}
    </span>
  )
}
