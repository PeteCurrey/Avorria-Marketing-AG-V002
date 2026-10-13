'use client'

import { useState } from 'react'
import Link from 'next/link'

/**
 * DeploymentsList — Red Bull "Events" Shelf Exact Duplicate
 *
 * Duplicates Red Bull's event calendar shelf:
 * - Dark Obsidian Stage (#000F1E)
 * - Section Caption with Tabs: [ All ] [ Live ] [ In Build ]
 * - Interactive deployment rows with Left-Padding Slide Hover
 * - Live Pulsing Radar Dots (cosmos-live-icon-animated)
 * - Verified Production Telemetry Badges
 */

type DeploymentFilter = 'ALL' | 'LIVE' | 'IN_BUILD'

interface DeploymentEntry {
  id: string
  name: string
  date: string
  sector: string
  metric: string
  status: 'LIVE' | 'IN BUILD' | 'DISCOVERY'
  href: string
}

const DEPLOYMENTS: DeploymentEntry[] = [
  {
    id: 'alkota',
    name: 'Alkota Bikes',
    date: 'Oct 2025',
    sector: 'Precision Engineering · UK',
    metric: '0.62S LCP · ZERO SHIFT',
    status: 'LIVE',
    href: '/work/alkota-bikes',
  },
  {
    id: 'careeros',
    name: 'CareerOS',
    date: 'Aug 2025',
    sector: 'Talent Technology · London',
    metric: '80% SCREENING AUTOMATED',
    status: 'LIVE',
    href: '/work/careeros',
  },
  {
    id: 'entirefm',
    name: 'EntireFM Enterprise',
    date: 'Jul 2025',
    sector: 'Facilities Management · Global',
    metric: '8 DOMAINS CONSOLIDATED',
    status: 'LIVE',
    href: '/work/entirefm',
  },
  {
    id: 'drawdown',
    name: 'Drawdown Risk Terminal',
    date: 'Apr 2025',
    sector: 'Financial Modeling · Quantitative',
    metric: '5,000 TICKS/SEC ENGINE',
    status: 'LIVE',
    href: '/work/drawdown',
  },
  {
    id: 'nestiq',
    name: 'Nestiq Platform',
    date: 'Feb 2025',
    sector: 'PropTech Systems · Manchester',
    metric: 'SUB-150MS SEARCH LATENCY',
    status: 'LIVE',
    href: '/work/nestiq',
  },
  {
    id: 'tafm',
    name: 'TAFM Logistics Flagship',
    date: 'Q4 2025',
    sector: 'Transport & Freight · UK & EU',
    metric: 'IN ACTIVE SPRINT',
    status: 'IN BUILD',
    href: '/work',
  },
]

export function DeploymentsList() {
  const [activeTab, setActiveTab] = useState<DeploymentFilter>('ALL')

  const filtered = DEPLOYMENTS.filter((dep) => {
    if (activeTab === 'LIVE') return dep.status === 'LIVE'
    if (activeTab === 'IN_BUILD') return dep.status === 'IN BUILD'
    return true
  })

  return (
    <section
      className="w-full bg-[#000F1E] border-t border-white/10"
      aria-labelledby="deployments-heading"
      style={{ paddingBlock: 'clamp(4rem, 8vw, 6.5rem)' }}
    >
      <div className="mx-auto max-w-[1920px]" style={{ paddingInline: 'clamp(1.25rem, 4vw, 3rem)' }}>

        {/* ── Section Caption with Tabs & View All ─────────────────── */}
        <div data-reveal="" className="panel-caption-rbx flex-col md:flex-row items-start md:items-center">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-6">
            <h2
              id="deployments-heading"
              className="panel-caption-rbx__title"
            >
              Recent Deployments
            </h2>

            {/* Red Bull Style Filter Tabs */}
            <div className="flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab('ALL')}
                className={[
                  'px-3.5 py-1 rounded-full text-xs font-light transition-all duration-200 cursor-pointer',
                  activeTab === 'ALL'
                    ? 'bg-white text-[#000F1E] shadow-sm'
                    : 'text-white/60 hover:text-white',
                ].join(' ')}
              >
                All Events
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('LIVE')}
                className={[
                  'px-3.5 py-1 rounded-full text-xs font-light transition-all duration-200 cursor-pointer',
                  activeTab === 'LIVE'
                    ? 'bg-white text-[#000F1E] shadow-sm'
                    : 'text-white/60 hover:text-white',
                ].join(' ')}
              >
                Live Now
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('IN_BUILD')}
                className={[
                  'px-3.5 py-1 rounded-full text-xs font-light transition-all duration-200 cursor-pointer',
                  activeTab === 'IN_BUILD'
                    ? 'bg-white text-[#000F1E] shadow-sm'
                    : 'text-white/60 hover:text-white',
                ].join(' ')}
              >
                In Build
              </button>
            </div>
          </div>

          <Link
            href="/work"
            className="rb-pill-btn rb-pill-btn-tertiary mt-2 md:mt-0"
          >
            <span>View all</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* ── Interactive Deployment Rows ───────────────────────────── */}
        <div
          role="list"
          aria-label="Recent project deployments"
          className="mt-6 border-b border-white/10"
        >
          {filtered.map((dep, i) => (
            <Link
              key={dep.id}
              href={dep.href}
              role="listitem"
              className="rb-deployment-row group flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 border-t border-white/10 py-5 transition-all duration-300"
              style={{ animationDelay: `${i * 60}ms` }}
              data-reveal=""
            >
              {/* Left Column: Project Title & Sector */}
              <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4 min-w-0">
                <span
                  className="font-extralight text-white group-hover:text-[var(--color-cobalt)] transition-colors duration-200 truncate"
                  style={{
                    fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {dep.name}
                </span>
                <span className="font-light text-white/50 text-xs sm:text-sm">
                  {dep.sector}
                </span>
              </div>

              {/* Right Column: Telemetry Metric, Date, & Status Badge */}
              <div className="flex items-center gap-4 sm:gap-6 shrink-0 mt-2 sm:mt-0">
                {/* Metric pill */}
                <span className="hidden lg:inline-block px-3 py-1 rounded bg-[#00162B] border border-white/10 text-[0.6875rem] font-light text-[var(--color-cobalt)] tracking-[0.1em] uppercase">
                  {dep.metric}
                </span>

                {/* Delivery Date */}
                <span className="font-light text-white/40 text-xs sm:text-sm">
                  {dep.date}
                </span>

                {/* Red Bull Status Badge with Radar Pulse */}
                <span
                  className={[
                    'inline-flex items-center gap-2 px-3 py-1 rounded-full text-[0.625rem] font-light uppercase tracking-[0.12em]',
                    dep.status === 'LIVE'
                      ? 'bg-[var(--color-cobalt)] text-white shadow-sm'
                      : 'bg-white/10 text-white/80 border border-white/15',
                  ].join(' ')}
                >
                  {dep.status === 'LIVE' && (
                    <span className="cosmos-live-icon-animated text-white" aria-hidden="true">
                      <span className="cosmos-live-icon-animated__dot" />
                    </span>
                  )}
                  {dep.status}
                </span>

                <span className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all duration-200">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
