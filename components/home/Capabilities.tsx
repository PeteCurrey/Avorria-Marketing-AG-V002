'use client'

/**
 * Capabilities — Chapter 02: Warm Stone
 *
 * Visual chapter: warm stone ground (#E8E2D8), rose/bronze active accents,
 * generous real-work media aperture that floats with architectural depth.
 */

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

interface CapabilityDiscipline {
  index: string
  label: string
  title: string
  statement: string
  description: string
  href: string
  proofProject: string
  proofSector: string
  image: string
}

const disciplines: CapabilityDiscipline[] = [
  {
    index: '01',
    label: 'BUILD',
    title: 'Digital Flagships & Web Platforms',
    statement: 'Engineered for sub-second rendering, surgical typography, and zero layout shift.',
    description:
      'High-performance web platforms, bespoke web software, and selective WebGL configurations. Built for brands where execution directly impacts commercial valuation.',
    href: '/services/build',
    proofProject: 'Alkota Bikes',
    proofSector: 'Bespoke titanium frame geometry & real-time WebGL 3D stage',
    image: '/images/cinematic/discipline-build.jpg',
  },
  {
    index: '02',
    label: 'DIGITAL PRODUCTS',
    title: 'Bespoke Applications & Client Portals',
    statement: 'Server-first architecture and resilient state machines for enterprise workflows.',
    description:
      'Structured marketplaces, operational portals, and complex customer dashboards built with strict TypeScript and deterministic data validation.',
    href: '/services/build',
    proofProject: 'TAFM Commercial Marketplace',
    proofSector: 'Multi-tier supplier portals and automated commercial equipment financing',
    image: '/images/cinematic/work-tafm.jpg',
  },
  {
    index: '03',
    label: 'SYSTEMS & DATA',
    title: 'Commercial Infrastructure & Real-Time Intelligence',
    statement: 'Connecting payment gateways, spatial cadastral tiles, and data pipelines.',
    description:
      'Server-side attribution, Stripe financial infrastructure, PostGIS spatial queries, and sub-millisecond data visualisations that turn isolated websites into compounding operating assets.',
    href: '/services/systems',
    proofProject: 'Drawdown.Trading',
    proofSector: 'Sub-millisecond Canvas quantitative risk terminal & live execution telemetry',
    image: '/images/cinematic/discipline-systems.jpg',
  },
  {
    index: '04',
    label: 'INTELLIGENCE & AI',
    title: 'Autonomous Agent Workflows & Vector Retrieval',
    statement: 'Deterministic AI systems engineered for operational leverage without hallucination.',
    description:
      'Domain-trained vector search, automated worker queues, and scheduled background routines that automate multi-step business procedures without human friction.',
    href: '/services/systems',
    proofProject: 'CareerOS Enterprise Systems',
    proofSector: 'Autonomous skill taxonomy graphs and automated document synthesis',
    image: '/images/cinematic/work-careeros.jpg',
  },
  {
    index: '05',
    label: 'TECHNICAL SEARCH',
    title: 'Search Architecture & High-Risk Migrations',
    statement: 'Safeguarding organic ranking authority during major platform overhauls.',
    description:
      'Enterprise crawl budget engineering, Schema.org semantic entity graphs, and 301 migration maps. Protecting search revenue when corporate structures consolidate.',
    href: '/services/search',
    proofProject: 'EntireFM Nationwide',
    proofSector: 'Consolidation of 8 regional domains into unified national authority',
    image: '/images/cinematic/discipline-strategy.jpg',
  },
]

export function Capabilities() {
  const [activeIdx, setActiveIdx] = useState(0)
  const activeDiscipline = disciplines[activeIdx]

  return (
    <section
      className="relative section-y-large border-t border-[var(--color-border)]"
      style={{ backgroundColor: 'var(--color-stone)' }}
      data-chapter="stone"
      aria-labelledby="capabilities-heading"
    >
      {/* ── Background Architectural Watermark: Ivory on Stone ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-8 right-[7vw] select-none text-[clamp(6rem,16vw,14rem)] font-extralight text-[var(--color-ivory)] opacity-40 leading-none"
        >
          02
        </div>
      </div>

      <div className="w-full px-6 md:px-10 lg:px-[7vw]">
        {/* Section Header */}
        <div className="max-w-[1200px] mb-16 lg:mb-20">
          <RevealOnScroll>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[0.6875rem] tracking-[0.22em] uppercase font-light text-[var(--color-graphite-mid)]">
                02 — CAPABILITIES &amp; DISCIPLINES
              </span>
              <span className="h-px w-12 bg-[var(--color-border-strong)]" aria-hidden="true" />
            </div>

            <h2
              id="capabilities-heading"
              className="font-extralight text-[var(--color-graphite)] leading-[1.04] tracking-[-0.025em] text-[clamp(2.5rem,5.8vw,6.25rem)] max-w-[18ch]"
            >
              We build{' '}
              <em className="not-italic italic font-extralight" style={{ color: 'var(--color-rose-text)' }}>
                serious
              </em>{' '}
              things that work.
            </h2>
          </RevealOnScroll>
        </div>

        {/* Two-Column Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Interactive Discipline List */}
          <div className="lg:col-span-7 space-y-3" role="tablist" aria-label="Capabilities disciplines">
            {disciplines.map((item, idx) => {
              const isActive = idx === activeIdx

              return (
                <div
                  key={item.label}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`discipline-panel-${idx}`}
                  id={`discipline-tab-${idx}`}
                  tabIndex={0}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onFocus={() => setActiveIdx(idx)}
                  className={[
                    'relative p-6 md:p-8 border transition-all duration-300 cursor-pointer rounded-[var(--radius-sm)] focus-visible:outline-2 focus-visible:outline-offset-2 overflow-hidden',
                    isActive
                      ? 'border-[var(--color-graphite)] bg-white shadow-sm'
                      : 'border-[var(--color-border)] bg-white/60 hover:bg-white hover:border-[var(--color-border-strong)]',
                  ].join(' ')}
                >
                  {/* Rose top-edge rule — draws in when active */}
                  <span
                    className="absolute top-0 left-0 right-0 h-[2px] transition-transform duration-500 origin-left"
                    style={{
                      backgroundColor: 'var(--color-accent)',
                      transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                    }}
                    aria-hidden="true"
                  />

                  <div className="flex items-baseline justify-between gap-4 mb-3">
                    <span className="text-[0.6875rem] tracking-[0.2em] font-light uppercase text-[var(--color-graphite-muted)]">
                      {item.index} — {item.label}
                    </span>
                    <span
                      className={[
                        'text-xs tracking-[0.1em] uppercase font-light transition-colors duration-200',
                        isActive ? 'text-[var(--color-accent)]' : 'text-transparent',
                      ].join(' ')}
                    >
                      Active
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-extralight text-[var(--color-graphite)] tracking-[-0.01em] mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-sm font-light text-[var(--color-graphite-mid)] leading-relaxed mb-3 max-w-[54ch]">
                    {item.statement}
                  </p>

                  <p className="text-xs font-light text-[var(--color-graphite-muted)] leading-relaxed max-w-[54ch] mb-4">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-2 text-xs font-light tracking-[0.08em] uppercase text-[var(--color-graphite)] hover:text-[var(--color-accent)] transition-colors"
                      tabIndex={isActive ? 0 : -1}
                    >
                      <span>Explore Discipline</span>
                      <span aria-hidden="true">→</span>
                    </Link>

                    <span className="text-[10px] tracking-[0.14em] uppercase font-light text-[var(--color-graphite-muted)]">
                      Case Study: {item.proofProject}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Column: Generous Real-Work Media Aperture (Sticky on Desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div
              id={`discipline-panel-${activeIdx}`}
              role="tabpanel"
              aria-labelledby={`discipline-tab-${activeIdx}`}
            >
              {/* Aperture Header Bar */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--color-border)] text-[10px] tracking-[0.18em] uppercase text-[var(--color-graphite-muted)] font-light">
                <span className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  />
                  <span>CASE STUDY · {activeDiscipline.proofProject}</span>
                </span>
                <span>DISCIPLINE {activeDiscipline.index}</span>
              </div>

              {/* Main 4:5 Real-Image Frame — floats with shadow, no border box */}
              <div
                className="relative w-full aspect-[4/5] overflow-hidden mb-4 rounded-[var(--radius-card)]"
                style={{
                  backgroundColor: '#0E0D0C',
                  boxShadow: '0 20px 50px -12px rgba(24,24,24,0.22), 0 4px 16px -4px rgba(24,24,24,0.12)',
                }}
              >
                <Image
                  key={activeDiscipline.image}
                  src={activeDiscipline.image}
                  alt={activeDiscipline.title}
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover object-center transition-all duration-700 hover:scale-[1.02]"
                  priority
                />
              </div>

              {/* Aperture Detail */}
              <div className="space-y-2">
                <h4 className="text-base font-light text-[var(--color-graphite)] tracking-[-0.01em]">
                  {activeDiscipline.proofProject}
                </h4>
                <p className="text-xs font-light text-[var(--color-graphite-mid)] leading-relaxed">
                  {activeDiscipline.proofSector}
                </p>

                <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between">
                  <Link
                    href={activeDiscipline.href}
                    className="text-[10px] tracking-[0.14em] uppercase font-light text-[var(--color-graphite)] hover:text-[var(--color-accent)] flex items-center gap-1 transition-colors"
                  >
                    <span>View Technical Scope</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                  <span className="text-[9px] tracking-[0.16em] uppercase font-light text-[var(--color-graphite-muted)]">
                    PRODUCTION
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
