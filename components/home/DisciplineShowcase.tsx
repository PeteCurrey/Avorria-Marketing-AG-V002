import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

interface DisciplineEdition {
  id: string
  number: string
  name: string
  tagline: string
  metric: string
  accentColor: string
  image: string
  slug: string
  specs: string[]
  deliverables: string[]
  featuredCase: {
    title: string
    slug: string
  }
}

const EDITIONS: DisciplineEdition[] = [
  {
    id: 'build',
    number: 'EDITION 01',
    name: 'BUILD',
    tagline: 'Digital Flagships & WebGL Configuration Platforms',
    metric: '0.62S COLD LCP',
    accentColor: 'var(--color-cobalt)',
    image: '/images/cinematic/discipline-build.jpg',
    slug: '/services/build',
    specs: [
      'Next.js 16 App Router Server Components',
      'Vanilla Three.js WebGL Inspection Stages',
      'Zero Third-Party Layout Shift Pipeline',
      'Deterministic Micro-Interactions & Audio',
    ],
    deliverables: [
      'Custom E-Commerce Flagships',
      'Bespoke Product Configurators',
      'Interactive Design Systems',
      'Performance Audit Certification',
    ],
    featuredCase: {
      title: 'Alkota Bikes Titanium Stage',
      slug: '/work/alkota-bikes',
    },
  },
  {
    id: 'search',
    number: 'EDITION 02',
    name: 'SEARCH',
    tagline: 'Technical Search Architecture & Entity Intelligence',
    metric: '8 DOMAINS UNIFIED',
    accentColor: '#10B981',
    image: '/images/cinematic/discipline-strategy.jpg',
    slug: '/services/search',
    specs: [
      'Surgical 1:1 Redirect Mapping Algorithms',
      'Deep Nested JSON-LD Schema Graphs',
      'Zero-Loss Multi-Domain Migrations',
      'Programmatic High-Velocity Indexing',
    ],
    deliverables: [
      'Enterprise Search Architecture',
      'Complex Domain Consolidations',
      'Technical SEO Recovery Audits',
      'Entity Knowledge Graph Wiring',
    ],
    featuredCase: {
      title: 'EntireFM Search Consolidation',
      slug: '/work/entirefm',
    },
  },
  {
    id: 'systems',
    number: 'EDITION 03',
    name: 'SYSTEMS',
    tagline: 'Autonomous AI Workflows & State Machine Orchestration',
    metric: '100% ZOD VALIDATED',
    accentColor: '#F59E0B',
    image: '/images/cinematic/discipline-systems.jpg',
    slug: '/services/systems',
    specs: [
      'Strict Zod Schema Extraction Enforcement',
      'Self-Correcting Multi-Agent State Machines',
      'PostgreSQL Realtime Event Telemetry',
      'Private Vector Retrieval Pipelines',
    ],
    deliverables: [
      'Autonomous Candidate Matching',
      'Deterministic Intelligence APIs',
      'AI Workflow Engine Integration',
      'Realtime Analytics & Telemetry',
    ],
    featuredCase: {
      title: 'CareerOS Agentic Infrastructure',
      slug: '/work/careeros',
    },
  },
]

export function DisciplineShowcase() {
  return (
    <section
      id="disciplines"
      className="relative bg-[#0A0B0E] text-white py-20 lg:py-32 border-b border-white/10"
      aria-labelledby="disciplines-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.2em] font-light text-[var(--color-cobalt)] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cobalt)]" />
              <span>THE THREE CORE DISCIPLINES // SPECIFICATIONS</span>
            </div>
            <h2
              id="disciplines-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extralight uppercase tracking-[-0.03em] leading-tight text-white"
            >
              Engineering Disciplines
            </h2>
          </div>

          <p className="font-light text-white/60 text-sm max-w-md">
            Three specialised studios working as one integrated engineering unit.
            Every engagement includes verified technical deliverables, not slide decks.
          </p>
        </div>

        {/* 3-Column Red Bull Editions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {EDITIONS.map((edition) => (
            <article
              key={edition.id}
              className="group relative flex flex-col justify-between rounded-sm border border-white/10 bg-[#12141A] hover:border-[var(--color-cobalt)] transition-all duration-500 overflow-hidden"
            >
              {/* Media Plate */}
              <div className="relative w-full h-52 overflow-hidden bg-black/40">
                <Image
                  src={edition.image}
                  alt={edition.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12141A] via-[#12141A]/50 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[0.625rem] uppercase tracking-[0.16em] font-light bg-black/80 backdrop-blur-md text-white/90 border border-white/15">
                    {edition.number}
                  </span>
                  <span
                    className="text-[0.625rem] uppercase tracking-[0.14em] font-light px-2.5 py-1 rounded-full text-white bg-black/70 backdrop-blur-md border border-white/10"
                    style={{ color: edition.accentColor }}
                  >
                    {edition.metric}
                  </span>
                </div>

                {/* Edition Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-3xl font-extralight tracking-tight text-white uppercase mb-1">
                    {edition.name}
                  </h3>
                  <p className="text-xs font-light text-white/70 line-clamp-1">
                    {edition.tagline}
                  </p>
                </div>
              </div>

              {/* Technical Specifications Sheet */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Specs List */}
                  <div className="mb-6">
                    <span className="text-[0.625rem] uppercase tracking-[0.16em] font-light text-white/40 block mb-3">
                      TECHNICAL ARCHITECTURE:
                    </span>
                    <ul className="space-y-2 text-xs font-extralight text-white/70">
                      {edition.specs.map((spec, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-white/30 shrink-0" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Deliverables List */}
                  <div className="mb-6 pt-4 border-t border-white/10">
                    <span className="text-[0.625rem] uppercase tracking-[0.16em] font-light text-white/40 block mb-3">
                      COMMERCIAL DELIVERABLES:
                    </span>
                    <ul className="space-y-1.5 text-xs font-light text-white/80">
                      {edition.deliverables.map((deliv, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-[var(--color-cobalt)] text-[0.625rem]">✓</span>
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Featured Case Reference & Action */}
                <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                  <Link
                    href={edition.featuredCase.slug}
                    className="inline-flex items-center justify-between text-xs font-light text-white/60 hover:text-white transition-colors"
                  >
                    <span className="truncate">Case: {edition.featuredCase.title}</span>
                    <span className="text-[var(--color-cobalt)]">↗</span>
                  </Link>

                  <Button as="link" href={edition.slug} variant="cobalt" size="sm" className="w-full justify-center">
                    Explore {edition.name} Discipline →
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
