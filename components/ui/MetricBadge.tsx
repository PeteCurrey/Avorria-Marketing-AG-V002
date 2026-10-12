'use client'

import { useEffect, useRef, useState } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MetricBadgeProps {
  /** The metric label to display — e.g. "0.62s LCP", "98 / 100", "Zero Shift" */
  value: string
  /** Optional descriptor below the value — e.g. "Lighthouse Performance" */
  label?: string
  /** Visual variant */
  variant?: 'default' | 'dark' | 'ghost'
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * MetricBadge — Phase 2A
 *
 * Displays a key performance metric — used on case study hero sections,
 * proof bands, and EditorialCard overlays.
 *
 * Variants:
 * - default: ivory bg, graphite text — for light chapter sections
 * - dark:    graphite bg, ivory text — for dark chapter sections
 * - ghost:   transparent, border only — for overlay on images
 *
 * Behaviour:
 * - The value is presented statically (no counter animation here — GSAP counter
 *   animation can be optionally added via GSAP in Phase 2C on the proof band)
 * - No initial hidden state — always visible, accessible
 * - Used as a standalone block badge (not inline)
 */
export function MetricBadge({
  value,
  label,
  variant = 'default',
}: MetricBadgeProps) {
  const containerStyles: Record<string, string> = {
    default: [
      'bg-[var(--color-ivory)]',
      'border border-[var(--color-border-strong)]',
      'text-[var(--color-graphite)]',
    ].join(' '),
    dark: [
      'bg-[var(--color-graphite)]',
      'border border-[rgba(247,245,240,0.12)]',
      'text-[var(--color-ivory)]',
    ].join(' '),
    ghost: [
      'bg-transparent',
      'border border-[rgba(247,245,240,0.25)]',
      'text-[var(--color-ivory)]',
      'backdrop-blur-sm',
    ].join(' '),
  }

  return (
    <div
      className={[
        'inline-flex flex-col items-start',
        'px-4 py-3',
        'rounded-[var(--radius-md)]',
        containerStyles[variant],
      ].join(' ')}
      role="img"
      aria-label={label ? `${value} — ${label}` : value}
    >
      {/* Primary metric value */}
      <span
        className={[
          'font-extralight leading-none tracking-[-0.02em]',
          'text-[clamp(1.25rem,2vw,1.75rem)]',
          variant === 'default' ? 'text-[var(--color-graphite)]' : 'text-[var(--color-ivory)]',
        ].join(' ')}
        aria-hidden="true"
      >
        {value}
      </span>

      {/* Label */}
      {label && (
        <span
          className={[
            'text-[10px] tracking-[0.14em] uppercase font-light mt-1',
            variant === 'default'
              ? 'text-[var(--color-graphite-muted)]'
              : 'text-[var(--color-accent-light)] opacity-70',
          ].join(' ')}
          aria-hidden="true"
        >
          {label}
        </span>
      )}
    </div>
  )
}

// ─── MetricBadgeRow ───────────────────────────────────────────────────────────

export interface MetricBadgeRowProps {
  metrics: Array<{ value: string; label: string }>
  variant?: 'default' | 'dark' | 'ghost'
}

/**
 * MetricBadgeRow — a horizontal strip of MetricBadges.
 * Used on case study hero sections.
 */
export function MetricBadgeRow({ metrics, variant = 'default' }: MetricBadgeRowProps) {
  return (
    <div
      className="flex flex-wrap gap-3"
      aria-label="Key performance metrics"
    >
      {metrics.map(({ value, label }) => (
        <MetricBadge
          key={`${value}-${label}`}
          value={value}
          label={label}
          variant={variant}
        />
      ))}
    </div>
  )
}
