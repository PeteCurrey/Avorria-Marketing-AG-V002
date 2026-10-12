import { type ReactNode } from 'react'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

export interface SectionHeadingProps {
  number?: string
  eyebrow?: string
  accentEyebrow?: 'default' | 'cobalt' | 'coral' | 'chartreuse' | 'rose'
  title: string
  italicAccent?: string
  description?: string
  align?: 'left' | 'center' | 'between'
  action?: ReactNode
  theme?: 'light' | 'dark'
  className?: string
}

/**
 * SectionHeading — Phase 2 Reusable Architectural Heading
 *
 * Provides a standardized header block with:
 * - Architectural index + eyebrow rule
 * - Extra Light display headline with optional italic emphasis
 * - Clean descriptive subcopy and optional right-aligned action CTA
 */
export function SectionHeading({
  number,
  eyebrow,
  accentEyebrow = 'default',
  title,
  italicAccent,
  description,
  align = 'between',
  action,
  theme = 'light',
  className = '',
}: SectionHeadingProps) {
  const isDark = theme === 'dark'

  return (
    <div className={`w-full mb-12 lg:mb-16 ${className}`}>
      <RevealOnScroll>
        {(number || eyebrow) && (
          <div className="flex items-center gap-4 mb-6">
            <Eyebrow accent={accentEyebrow} withDot className="mb-0">
              {number ? `${number} — ` : ''}{eyebrow}
            </Eyebrow>
            <span
              className={`h-px w-12 ${isDark ? 'bg-white/20' : 'bg-[var(--color-border-strong)]'}`}
              aria-hidden="true"
            />
          </div>
        )}

        <div
          className={`flex flex-col ${
            align === 'center'
              ? 'items-center text-center'
              : align === 'between'
              ? 'lg:flex-row lg:items-end lg:justify-between gap-6'
              : 'items-start'
          }`}
        >
          <div className="max-w-3xl">
            <h2
              className={`font-extralight leading-[1.04] tracking-[-0.025em] text-[clamp(2.25rem,5vw,5.5rem)] ${
                isDark ? 'text-[var(--color-ivory)]' : 'text-[var(--color-graphite)]'
              }`}
            >
              {title}{' '}
              {italicAccent && (
                <em
                  className="not-italic italic font-extralight"
                  style={{
                    color: isDark ? 'var(--color-accent-light)' : 'var(--color-rose-text)',
                  }}
                >
                  {italicAccent}
                </em>
              )}
            </h2>
            {description && (
              <p
                className={`mt-4 text-base lg:text-lg font-light leading-relaxed max-w-2xl ${
                  isDark ? 'text-white/70' : 'text-[var(--color-graphite-mid)]'
                }`}
              >
                {description}
              </p>
            )}
          </div>

          {action && <div className="shrink-0 mt-4 lg:mt-0">{action}</div>}
        </div>
      </RevealOnScroll>
    </div>
  )
}
