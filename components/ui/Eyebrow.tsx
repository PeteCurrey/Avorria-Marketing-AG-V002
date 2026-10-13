import { type ReactNode } from 'react'

export interface EyebrowProps {
  children: ReactNode
  className?: string
  accent?: 'default' | 'cobalt' | 'coral' | 'chartreuse' | 'rose'
  withDot?: boolean
}

/**
 * Eyebrow — Phase 2 Design System Component
 *
 * Micro-typography uppercase tracking label with optional accent pulse dot.
 */
export function Eyebrow({
  children,
  className = '',
  accent = 'default',
  withDot = false,
}: EyebrowProps) {
  const dotColorMap: Record<string, string> = {
    default: 'var(--color-cobalt, #3157FF)',
    cobalt: 'var(--color-cobalt, #3157FF)',
    coral: 'var(--color-coral)',
    chartreuse: 'var(--color-chartreuse)',
    rose: 'var(--color-rose-text)',
  }

  return (
    <div className={`flex items-center gap-2.5 mb-4 ${className}`} aria-hidden="false">
      {withDot && (
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse"
          style={{ backgroundColor: dotColorMap[accent] }}
          aria-hidden="true"
        />
      )}
      <span className="text-[0.6875rem] tracking-[0.2em] uppercase font-light text-[var(--color-graphite-mid)]">
        {children}
      </span>
    </div>
  )
}
