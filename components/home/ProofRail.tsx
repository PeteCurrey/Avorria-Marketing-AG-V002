'use client'

import { HorizontalContentRail } from '@/components/ui/HorizontalContentRail'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

interface ProofPoint {
  metric: string
  label: string
  context: string
  tag: string
}

const PROOF_POINTS: ProofPoint[] = [
  {
    metric: '0.62s LCP',
    label: 'Alkota Bikes',
    context: 'Sub-second 3D WebGL configurator with zero shift',
    tag: 'PERFORMANCE',
  },
  {
    metric: '5,000 Ticks/s',
    label: 'Drawdown Trading',
    context: 'Sub-millisecond high-frequency telemetry & quantitative risk terminal',
    tag: 'REAL-TIME',
  },
  {
    metric: '8 Domains Consolidated',
    label: 'EntireFM Group',
    context: 'Consolidation of 8 legacy domains with zero organic equity loss',
    tag: 'TECHNICAL SEO',
  },
  {
    metric: 'Multi-Tier Portal',
    label: 'TAFM Commercial',
    context: 'Automated equipment financing & supplier workflow infrastructure',
    tag: 'SYSTEMS',
  },
  {
    metric: '100% Core Vitals',
    label: 'Production Standard',
    context: 'Strict Next.js 16 server-first execution & static optimization',
    tag: 'STANDARDS',
  },
]

/**
 * ProofRail — Phase 3 Live Telemetry & Engineering Proof Rail
 *
 * Sits directly below the Positioning section to provide immediate commercial
 * credibility and empirical benchmarks via an accessible horizontal snap rail.
 */
export function ProofRail() {
  return (
    <div className="w-full bg-[var(--color-ivory)] border-t border-[var(--color-border)] py-12">
      <div className="w-full px-6 md:px-10 lg:px-[7vw]">
        <RevealOnScroll>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cobalt)] animate-pulse" aria-hidden="true" />
              <span className="text-[10px] tracking-[0.2em] uppercase font-light text-[var(--color-graphite-mid)]">
                VERIFIED PRODUCTION BENCHMARKS · ZERO PLACEHOLDER CLAIMS
              </span>
            </div>
            <span className="hidden md:inline-block text-[10px] tracking-[0.16em] uppercase font-light text-[var(--color-graphite-muted)]">
              SWIPE / SCROLL TO INSPECT
            </span>
          </div>

          <HorizontalContentRail showControls={false} label="Verified engineering telemetry">
            {PROOF_POINTS.map((item) => (
              <div
                key={item.metric}
                className="w-[280px] sm:w-[320px] shrink-0 snap-start p-5 bg-white border border-[var(--color-border)] rounded-[var(--radius-card)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[9px] tracking-[0.18em] uppercase text-[var(--color-cobalt)] font-light mb-2">
                    <span>{item.tag}</span>
                    <span className="text-[var(--color-graphite-muted)]">VERIFIED</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extralight text-[var(--color-graphite)] tracking-tight mb-1">
                    {item.metric}
                  </div>
                  <div className="text-xs font-light text-[var(--color-graphite)] tracking-wide mb-2">
                    {item.label}
                  </div>
                </div>
                <p className="text-[11px] font-light text-[var(--color-graphite-mid)] leading-relaxed pt-3 border-t border-[var(--color-border)]">
                  {item.context}
                </p>
              </div>
            ))}
          </HorizontalContentRail>
        </RevealOnScroll>
      </div>
    </div>
  )
}
