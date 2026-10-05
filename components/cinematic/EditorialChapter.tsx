'use client'

import type { ReactNode } from 'react'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

export type ChapterTheme = 'ivory' | 'stone' | 'graphite' | 'petrol' | 'wine'

export interface EditorialChapterProps {
  /** The theme for background and text contrast */
  theme: ChapterTheme
  /** Sculptural architectural numeral in background (e.g. '01', '02') */
  numeral?: string
  /** Small tracked eyebrow label e.g. '02 — CAPABILITIES & DISCIPLINES' */
  eyebrow?: string
  /** Section H2 headline */
  heading?: ReactNode
  /** Optional subtitle or paragraph under the heading */
  description?: ReactNode
  /** Main section content */
  children: ReactNode
  /** Section HTML id for accessibility / navigation */
  id?: string
  /** Additional container classes */
  className?: string
}

const THEME_STYLES: Record<
  ChapterTheme,
  {
    bg: string
    color: string
    borderColor: string
    ruleColor: string
    eyebrowColor: string
    numeralClass: string
  }
> = {
  ivory: {
    bg: 'var(--color-ivory)',
    color: 'var(--color-graphite)',
    borderColor: 'var(--color-border)',
    ruleColor: 'var(--color-border-strong)',
    eyebrowColor: 'var(--color-graphite-mid)',
    numeralClass: 'text-[var(--color-graphite)] opacity-[0.04]',
  },
  stone: {
    bg: 'var(--color-stone)',
    color: 'var(--color-graphite)',
    borderColor: 'var(--color-border-strong)',
    ruleColor: 'var(--color-border-strong)',
    eyebrowColor: 'var(--color-graphite-mid)',
    numeralClass: 'text-[var(--color-ivory)] opacity-40',
  },
  graphite: {
    bg: 'var(--color-graphite)',
    color: 'var(--color-ivory)',
    borderColor: '#2A2724',
    ruleColor: 'rgba(255,255,255,0.2)',
    eyebrowColor: 'var(--color-accent-light)',
    numeralClass: 'text-[var(--color-ivory)] opacity-[0.04]',
  },
  petrol: {
    bg: 'var(--color-petrol)',
    color: 'var(--color-ivory)',
    borderColor: '#244C53',
    ruleColor: 'rgba(255,255,255,0.2)',
    eyebrowColor: 'var(--color-accent-light)',
    numeralClass: 'numeral-wine-on-petrol',
  },
  wine: {
    bg: 'var(--color-wine)',
    color: 'var(--color-ivory)',
    borderColor: 'rgba(255,255,255,0.1)',
    ruleColor: 'var(--color-accent)',
    eyebrowColor: 'var(--color-accent-light)',
    numeralClass: 'text-white/[0.04]',
  },
}

export function EditorialChapter({
  theme,
  numeral,
  eyebrow,
  heading,
  description,
  children,
  id,
  className = '',
}: EditorialChapterProps) {
  const styles = THEME_STYLES[theme]

  return (
    <section
      id={id}
      data-chapter={theme}
      style={{ backgroundColor: styles.bg, color: styles.color }}
      className={`relative section-y-large border-t border-[${styles.borderColor}] overflow-hidden ${className}`}
    >
      {/* ── Background Architectural Numeral ── */}
      {numeral && (
        <div
          className={`absolute top-8 right-[7vw] pointer-events-none select-none text-[clamp(6rem,16vw,14rem)] font-extralight leading-none ${styles.numeralClass}`}
          aria-hidden="true"
        >
          {numeral}
        </div>
      )}

      <div className="w-full px-6 md:px-10 lg:px-[7vw]">
        {/* Section Header */}
        {(eyebrow || heading || description) && (
          <div className="max-w-[1200px] mb-14 lg:mb-20">
            <RevealOnScroll>
              {eyebrow && (
                <div className="flex items-center gap-4 mb-6">
                  <span
                    className="text-[0.6875rem] tracking-[0.22em] uppercase font-light"
                    style={{ color: styles.eyebrowColor }}
                  >
                    {eyebrow}
                  </span>
                  <span
                    className="h-px w-12"
                    style={{ backgroundColor: styles.ruleColor }}
                    aria-hidden="true"
                  />
                </div>
              )}

              {heading && (
                <h2
                  className="font-extralight leading-[1.04] tracking-[-0.025em] text-[clamp(2.5rem,5.8vw,6.25rem)] max-w-[22ch]"
                >
                  {heading}
                </h2>
              )}

              {description && (
                <div className="mt-6 text-base md:text-lg font-light opacity-80 max-w-[54ch] leading-relaxed">
                  {description}
                </div>
              )}
            </RevealOnScroll>
          </div>
        )}

        {/* Section Body */}
        {children}
      </div>
    </section>
  )
}
