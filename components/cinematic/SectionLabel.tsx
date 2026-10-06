'use client'

export interface SectionLabelProps {
  /** Text content e.g. '01 / STRATEGY' or 'SELECTED WORK / 2026' */
  children: string
  /** Accent dot color per Section 30.3 */
  accent?: 'cobalt' | 'coral' | 'chartreuse' | 'rose' | 'none'
  /** Optional trailing horizontal rule */
  rule?: boolean
  /** Dark or light ground */
  theme?: 'ivory' | 'stone' | 'graphite' | 'petrol' | 'wine'
  /** Optional custom className */
  className?: string
}

const ACCENT_COLORS = {
  cobalt: 'var(--color-cobalt)',
  coral: 'var(--color-coral)',
  chartreuse: 'var(--color-chartreuse)',
  rose: 'var(--color-accent)',
  none: 'transparent',
}

/**
 * SectionLabel — Section 30.23
 *
 * Small editorial metadata details: uppercase, tracked, Work Sans Light (300).
 * Adds sophistication without becoming decoration.
 */
export function SectionLabel({
  children,
  accent = 'cobalt',
  rule = false,
  theme = 'ivory',
  className = '',
}: SectionLabelProps) {
  const isDark = theme === 'graphite' || theme === 'petrol' || theme === 'wine'
  const textColor = isDark ? 'text-[var(--color-ivory)] opacity-80' : 'text-[var(--color-graphite-mid)]'
  const ruleColor = isDark ? 'bg-white/20' : 'bg-[var(--color-border-strong)]'

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {accent !== 'none' && (
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: ACCENT_COLORS[accent] }}
          aria-hidden="true"
        />
      )}
      <span className={`text-[0.6875rem] tracking-[0.2em] uppercase font-light ${textColor}`}>
        {children}
      </span>
      {rule && <span className={`h-px w-10 flex-shrink-0 ${ruleColor}`} aria-hidden="true" />}
    </div>
  )
}
