'use client'

/**
 * Capabilities — Phase 3 Rebuild: Responsive Accordion & Persistent Media Stage
 *
 * Implements the approved Phase 1/2 blueprint:
 * - On desktop: sticky persistent photographic media stage on the right, interactive accordion on the left.
 * - On mobile: seamless inline collapsible cards with embedded photography so images are never hidden.
 * - Architectural line drawing and cobalt/rose accents.
 */

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

interface CapabilityDiscipline {
  index: string
  label: string
  title: string
  statement: string
  description: string
  deliverables: string[]
  href: string
  proofProject: string
  proofSector: string
  proofMetric: string
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
    deliverables: ['Next.js 16 App Router', 'Sub-second Core Web Vitals', 'Bespoke 3D & WebGL Stages', 'Zero Layout Shift'],
    href: '/services/build',
    proofProject: 'Alkota Bikes',
    proofSector: 'Bespoke titanium frame geometry & real-time WebGL 3D stage',
    proofMetric: '0.62s LCP // 60 FPS',
    image: '/images/cinematic/discipline-build.jpg',
  },
  {
    index: '02',
    label: 'DIGITAL PRODUCTS',
    title: 'Bespoke Applications & Client Portals',
    statement: 'Server-first architecture and resilient state machines for enterprise workflows.',
    description:
      'Structured marketplaces, operational portals, and complex customer dashboards built with strict TypeScript and deterministic data validation.',
    deliverables: ['Enterprise Customer Portals', 'Automated Workflows', 'Strict Schema Contracts', 'State-Machine SaaS'],
    href: '/services/build',
    proofProject: 'TAFM Commercial Marketplace',
    proofSector: 'Multi-tier supplier portals and automated commercial equipment financing',
    proofMetric: 'Automated Financing Engine',
    image: '/images/cinematic/work-tafm.jpg',
  },
  {
    index: '03',
    label: 'SYSTEMS & DATA',
    title: 'Commercial Infrastructure & Real-Time Intelligence',
    statement: 'Connecting payment gateways, spatial cadastral tiles, and data pipelines.',
    description:
      'Server-side attribution, Stripe financial infrastructure, PostGIS spatial queries, and sub-millisecond data visualisations that turn isolated websites into compounding operating assets.',
    deliverables: ['Stripe Financial Pipelines', 'PostGIS Cadastral Tiles', 'Sub-ms Risk Telemetry', 'Server-Side Attribution'],
    href: '/services/systems',
    proofProject: 'Drawdown.Trading',
    proofSector: 'Sub-millisecond Canvas quantitative risk terminal & live execution telemetry',
    proofMetric: '5,000 Ticks/Second',
    image: '/images/cinematic/discipline-systems.jpg',
  },
  {
    index: '04',
    label: 'INTELLIGENCE & AI',
    title: 'Autonomous Agent Workflows & Vector Retrieval',
    statement: 'Deterministic AI systems engineered for operational leverage without hallucination.',
    description:
      'Domain-trained vector search, automated worker queues, and scheduled background routines that automate multi-step business procedures without human friction.',
    deliverables: ['Deterministic AI Workflows', 'Domain Vector Embeddings', 'Automated Synthesis', 'Zero Hallucination'],
    href: '/services/systems',
    proofProject: 'CareerOS Enterprise Systems',
    proofSector: 'Autonomous skill taxonomy graphs and automated document synthesis',
    proofMetric: 'Vector Retrieval Graphs',
    image: '/images/cinematic/work-careeros.jpg',
  },
  {
    index: '05',
    label: 'TECHNICAL SEARCH',
    title: 'Search Architecture & High-Risk Migrations',
    statement: 'Safeguarding organic ranking authority during major platform overhauls.',
    description:
      'Enterprise crawl budget engineering, Schema.org semantic entity graphs, and 301 migration maps. Protecting search revenue when corporate structures consolidate.',
    deliverables: ['301 Migration Architecture', 'Schema.org Entity Graphs', 'Crawl Budget Auditing', 'Zero Equity Loss'],
    href: '/services/search',
    proofProject: 'EntireFM Nationwide',
    proofSector: 'Consolidation of 8 regional domains into unified national authority',
    proofMetric: '8 Domains Consolidated',
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
        <div className="absolute top-8 right-[7vw] select-none text-[clamp(6rem,16vw,14rem)] font-extralight text-[var(--color-ivory)] opacity-40 leading-none">
          02
        </div>
      </div>

      <div className="w-full px-6 md:px-10 lg:px-[7vw]">
        {/* Section Heading Component */}
        <SectionHeading
          number="02"
          eyebrow="CAPABILITIES &amp; DISCIPLINES"
          accentEyebrow="cobalt"
          title="We build"
          italicAccent="serious"
          description="Integrated engineering, search intelligence, and bespoke systems engineered to compound in commercial value."
        />

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Interactive Accordion List */}
          <div className="lg:col-span-7 space-y-4" role="tablist" aria-label="Capabilities disciplines">
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
                  onClick={() => setActiveIdx(idx)}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onFocus={() => setActiveIdx(idx)}
                  className={[
                    'relative p-6 md:p-8 border transition-all duration-300 cursor-pointer rounded-[var(--radius-card)] focus-visible:outline-2 focus-visible:outline-offset-2 overflow-hidden',
                    isActive
                      ? 'border-[var(--color-graphite)] bg-white shadow-sm'
                      : 'border-[var(--color-border)] bg-white/60 hover:bg-white hover:border-[var(--color-border-strong)]',
                  ].join(' ')}
                >
                  {/* Top-edge active rule */}
                  <span
                    className="absolute top-0 left-0 right-0 h-[2px] transition-transform duration-500 origin-left"
                    style={{
                      backgroundColor: 'var(--color-cobalt)',
                      transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                    }}
                    aria-hidden="true"
                  />

                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <span className="text-[0.6875rem] tracking-[0.2em] font-light uppercase text-[var(--color-graphite-muted)]">
                      {item.index} // {item.label}
                    </span>
                    <span
                      className={[
                        'text-[10px] tracking-[0.14em] uppercase font-light transition-colors duration-200',
                        isActive ? 'text-[var(--color-cobalt)]' : 'text-transparent',
                      ].join(' ')}
                    >
                      {item.proofMetric}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extralight text-[var(--color-graphite)] tracking-[-0.01em] mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm font-light text-[var(--color-graphite-mid)] leading-relaxed mb-4 max-w-[54ch]">
                    {item.statement}
                  </p>

                  {/* Accordion Expandable Detail */}
                  <div
                    className={[
                      'grid transition-all duration-300 ease-out',
                      isActive ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0',
                    ].join(' ')}
                  >
                    <div className="overflow-hidden">
                      <p className="text-xs font-light text-[var(--color-graphite-mid)] leading-relaxed mb-4 max-w-[54ch]">
                        {item.description}
                      </p>

                      {/* Mobile Embedded Image (Displayed inside accordion on small screens) */}
                      <div className="lg:hidden relative w-full aspect-[16/10] overflow-hidden rounded-[var(--radius-sm)] mb-4 bg-black">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="100vw"
                          className="object-cover object-center"
                        />
                      </div>

                      {/* Deliverables tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.deliverables.map((d) => (
                          <span
                            key={d}
                            className="text-[10px] tracking-wide font-light px-2.5 py-1 bg-[var(--color-ivory)] border border-[var(--color-border)] text-[var(--color-graphite)] rounded-[var(--radius-xs)]"
                          >
                            {d}
                          </span>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between">
                        <Link
                          href={item.href}
                          className="inline-flex items-center gap-1.5 text-xs font-light tracking-[0.1em] uppercase text-[var(--color-cobalt)] hover:text-[var(--color-graphite)] transition-colors"
                        >
                          <span>Explore Discipline Architecture</span>
                          <span aria-hidden="true">→</span>
                        </Link>
                        <span className="text-[10px] tracking-[0.14em] uppercase font-light text-[var(--color-graphite-muted)]">
                          Case Study: {item.proofProject}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Column: Persistent Photographic Media Stage (Desktop Sticky) */}
          <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-28">
            <div
              id={`discipline-panel-${activeIdx}`}
              role="tabpanel"
              aria-labelledby={`discipline-tab-${activeIdx}`}
              className="bg-white p-6 border border-[var(--color-border)] rounded-[var(--radius-card)]"
            >
              {/* Media Stage Top Bar */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--color-border)] text-[10px] tracking-[0.18em] uppercase text-[var(--color-graphite-muted)] font-light">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cobalt)]" aria-hidden="true" />
                  <span>CASE STUDY · {activeDiscipline.proofProject}</span>
                </span>
                <span>DISCIPLINE 0{activeDiscipline.index}</span>
              </div>

              {/* Main 4:5 Photographic Frame */}
              <div className="relative w-full aspect-[4/5] overflow-hidden mb-5 rounded-[var(--radius-card)] bg-[#100F0D]">
                <Image
                  key={activeDiscipline.image}
                  src={activeDiscipline.image}
                  alt={activeDiscipline.title}
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] tracking-[0.16em] uppercase text-white/70 block mb-1">
                    VERIFIED BENCHMARK
                  </span>
                  <span className="text-xl font-extralight tracking-tight block">
                    {activeDiscipline.proofMetric}
                  </span>
                </div>
              </div>

              {/* Stage Metadata */}
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
                    className="text-[10px] tracking-[0.14em] uppercase font-light text-[var(--color-graphite)] hover:text-[var(--color-cobalt)] flex items-center gap-1 transition-colors"
                  >
                    <span>View Technical Scope</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                  <span className="text-[9px] tracking-[0.16em] uppercase font-light text-[var(--color-graphite-muted)]">
                    PRODUCTION DEPLOYED
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
