import Link from 'next/link'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CategoryBadgeProps {
  label: string
  href: string
  /** Inverted: for use on dark backgrounds */
  inverted?: boolean
  /** Active state: shows chartreuse indicator dot */
  active?: boolean
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * CategoryBadge — Phase 2A
 *
 * Tappable category label that links to a category index page.
 * Used on EditorialCard, LobbyArticleGrid, and category nav.
 *
 * Two modes:
 * - Default: graphite-mid text on light backgrounds
 * - Inverted: ivory/rose-light text on dark chapter backgrounds
 * - Active: chartreuse indicator dot (for filter bars / sticky nav)
 *
 * Always legible without JS. No initial hidden state.
 */
export function CategoryBadge({
  label,
  href,
  inverted = false,
  active = false,
}: CategoryBadgeProps) {
  return (
    <Link
      href={href}
      className={[
        'inline-flex items-center gap-1.5',
        'text-[10px] tracking-[0.18em] uppercase font-light',
        'transition-colors duration-[var(--duration-base)]',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-cobalt)] focus-visible:rounded-[var(--radius-xs)]',
        inverted
          ? 'text-[var(--color-accent-light)] hover:text-[var(--color-ivory)]'
          : 'text-[var(--color-accent)] hover:text-[var(--color-graphite)]',
      ].join(' ')}
      aria-label={`View all ${label} articles`}
    >
      {/* Active state: chartreuse indicator dot (used on filter bars) */}
      {active && (
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0 bg-[var(--color-chartreuse)]"
          aria-hidden="true"
        />
      )}
      {!active && (
        <span
          className={[
            'w-1 h-1 rounded-full shrink-0',
            inverted ? 'bg-[var(--color-accent-light)] opacity-70' : 'bg-[var(--color-accent)]',
          ].join(' ')}
          aria-hidden="true"
        />
      )}
      {label}
    </Link>
  )
}
