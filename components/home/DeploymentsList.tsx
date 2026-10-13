import Link from 'next/link'

/**
 * DeploymentsList — Red Bull "Events" Section Exact Duplicate
 *
 * Red Bull pattern from redbull.com/gb-en (confirmed from source):
 * - Section header: "Events" left + "View all" right
 * - List of event rows: name · date · location · sport · status badge
 * - Status badges: "Happening now", "Registrations open", "Past event", "Live soon"
 *
 * Avorria translation:
 * - "Recent Deployments" header + "View all" → /work
 * - Rows: project name · date · sector · status badge
 * - Status badges: "LIVE", "IN BUILD", "DISCOVERY"
 *
 * Animations:
 * - Section header: scroll reveal (opacity:0, translateY:20px → in-view, 700ms)
 * - Rows stagger: 60ms per row, translateX(-10px) → 0, opacity 0 → 1, 600ms ease
 * - Row hover: padding-left 0 → 1rem (Red Bull's exact row hover), 350ms cubic-bezier(0.25,1,0.5,1)
 * - "LIVE" badge: cobalt background with subtle pulsing dot
 */

interface Deployment {
  name: string
  date: string
  sector: string
  status: 'LIVE' | 'IN BUILD' | 'DISCOVERY' | 'ARCHIVED'
  href: string
}

const DEPLOYMENTS: Deployment[] = [
  {
    name: 'Alkota Bikes',
    date: 'Oct 2025',
    sector: 'Precision Engineering',
    status: 'LIVE',
    href: '/work/alkota-bikes',
  },
  {
    name: 'CareerOS',
    date: 'Aug 2025',
    sector: 'Talent Technology',
    status: 'LIVE',
    href: '/work/careeros',
  },
  {
    name: 'EntireFM',
    date: 'Jul 2025',
    sector: 'Facilities Management',
    status: 'LIVE',
    href: '/work/entirefm',
  },
  {
    name: 'Drawdown Terminal',
    date: 'Apr 2025',
    sector: 'Financial Risk',
    status: 'LIVE',
    href: '/work/drawdown',
  },
  {
    name: 'Nestiq',
    date: 'Feb 2025',
    sector: 'PropTech',
    status: 'LIVE',
    href: '/work/nestiq',
  },
]

const STATUS_STYLES: Record<Deployment['status'], { bg: string; text: string; dot?: boolean }> = {
  LIVE: { bg: 'bg-[var(--color-cobalt)]', text: 'text-white', dot: true },
  'IN BUILD': { bg: 'bg-[var(--color-graphite)]', text: 'text-[var(--color-ivory)]' },
  DISCOVERY: { bg: 'bg-[var(--color-stone)]', text: 'text-[var(--color-graphite-mid)]' },
  ARCHIVED: { bg: 'bg-transparent border border-[var(--color-border)]', text: 'text-[var(--color-graphite-muted)]' },
}

export function DeploymentsList() {
  return (
    <section
      className="w-full bg-[var(--color-ivory)] border-t border-[var(--color-border)]"
      aria-labelledby="deployments-heading"
      style={{ paddingBlock: 'clamp(3rem, 6vw, 5rem)' }}
    >
      <div style={{ paddingInline: 'clamp(1.25rem, 4vw, 3rem)' }}>

        {/* ── Section Header: "Events" left + "View all" right pattern ─ */}
        <div
          data-reveal=""
          className="flex items-baseline justify-between mb-6 sm:mb-8"
        >
          <h2
            id="deployments-heading"
            className="font-extralight text-[var(--color-graphite)] uppercase tracking-[0.04em]"
            style={{ fontSize: 'clamp(1.1rem, 2vw, 1.375rem)' }}
          >
            Recent Deployments
          </h2>
          <Link
            href="/work"
            className="font-light text-[var(--color-graphite-mid)] hover:text-[var(--color-graphite)] transition-colors duration-200"
            style={{ fontSize: '0.8125rem', letterSpacing: '0.04em' }}
          >
            View all →
          </Link>
        </div>

        {/* ── Deployment Rows — Red Bull event list pattern ─────────── */}
        <div role="list" aria-label="Recent project deployments">
          {DEPLOYMENTS.map((dep, i) => {
            const badge = STATUS_STYLES[dep.status]
            return (
              <Link
                key={dep.name}
                href={dep.href}
                role="listitem"
                className="rb-deployment-row group flex items-center justify-between gap-4 border-t border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-colors duration-200"
                style={{
                  padding: 'clamp(1rem, 2vw, 1.375rem) 0',
                  animationDelay: `${i * 60}ms`,
                }}
                data-reveal=""
              >
                {/* Left: name + sector */}
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 min-w-0">
                  <span
                    className="font-extralight text-[var(--color-graphite)] group-hover:text-[var(--color-cobalt)] transition-colors duration-200 truncate"
                    style={{
                      fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                      letterSpacing: '-0.015em',
                    }}
                  >
                    {dep.name}
                  </span>
                  <span
                    className="font-light text-[var(--color-graphite-muted)] hidden sm:inline"
                    style={{ fontSize: '0.8125rem' }}
                  >
                    {dep.sector}
                  </span>
                </div>

                {/* Right: date + status badge */}
                <div className="flex items-center gap-3 sm:gap-5 shrink-0">
                  <span
                    className="font-light text-[var(--color-graphite-muted)] hidden md:inline"
                    style={{ fontSize: '0.8125rem' }}
                  >
                    {dep.date}
                  </span>

                  {/* Status badge — Red Bull "Happening now" / "Registrations open" pattern */}
                  <span
                    className={[
                      'inline-flex items-center gap-1.5 px-2.5 py-1 font-light uppercase tracking-[0.1em]',
                      badge.bg,
                      badge.text,
                    ].join(' ')}
                    style={{
                      fontSize: '0.625rem',
                      borderRadius: '2px',
                    }}
                  >
                    {badge.dot && (
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-white/80 rb-live-dot"
                        aria-hidden="true"
                      />
                    )}
                    {dep.status}
                  </span>
                </div>
              </Link>
            )
          })}

          {/* Bottom border */}
          <div className="border-t border-[var(--color-border)]" aria-hidden="true" />
        </div>

      </div>
    </section>
  )
}
