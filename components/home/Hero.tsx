'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

interface HeroProject {
  id: string
  number: string
  title: string
  discipline: string
  metric: string
  image: string
  slug: string
  summary: string
}

const HERO_PROJECTS: HeroProject[] = [
  {
    id: 'alkota',
    number: '01',
    title: 'Alkota Bikes',
    discipline: 'BUILD // 3D FLAGSHIP',
    metric: '0.62S LCP',
    image: '/images/cinematic/work-alkota.jpg',
    slug: '/work/alkota-bikes',
    summary: 'Titanium frame configuration engine with sub-second route transitions and zero layout shift.',
  },
  {
    id: 'drawdown',
    number: '02',
    title: 'Drawdown Terminal',
    discipline: 'SEARCH // RISK ENGINE',
    metric: '5,000 TICKS/S',
    image: '/images/cinematic/work-drawdown.jpg',
    slug: '/work/drawdown',
    summary: 'High-frequency macro financial risk modeling platform with real-time volatility graphs.',
  },
  {
    id: 'entirefm',
    number: '03',
    title: 'EntireFM',
    discipline: 'SEARCH ARCHITECTURE',
    metric: '8 DOMAINS UNIFIED',
    image: '/images/cinematic/work-entirefm.jpg',
    slug: '/work/entirefm',
    summary: 'Multi-brand enterprise search consolidation with surgical schema hierarchy and zero traffic loss.',
  },
  {
    id: 'careeros',
    number: '04',
    title: 'CareerOS',
    discipline: 'SYSTEMS // AGENTIC AI',
    metric: 'ZOD STATE ENGINE',
    image: '/images/cinematic/work-careeros.jpg',
    slug: '/work/careeros',
    summary: 'Autonomous talent intelligence pipeline with deterministic state-machine workflow orchestration.',
  },
]

/**
 * Hero — Monumental Red Bull Digital Flagship Translation
 *
 * Architecture:
 * - Edge-to-edge full viewport 100dvh cinematic stage.
 * - Dynamic photographic plate background with dark vignette scrim.
 * - Live telemetry badge: Pulse indicator + verified performance stats.
 * - Monumental fluid headline with surgical Work Sans typography.
 * - Dual high-voltage CTA cluster.
 * - Bottom 4-card interactive project preview ticker inspired by Red Bull's featured media bar.
 */
export function Hero() {
  const [activeProject, setActiveProject] = useState<number>(0)
  const current = HERO_PROJECTS[activeProject]

  return (
    <section
      className="relative -mt-16 md:-mt-20 min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#0A0B0E] text-white"
      data-chapter="hero"
      aria-labelledby="hero-heading"
    >
      {/* ── Background: Cinematic Stage Plate with Smooth Switcher ──────── */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none" aria-hidden="true">
        {HERO_PROJECTS.map((project, idx) => (
          <div
            key={project.id}
            className={[
              'absolute inset-0 transition-opacity duration-1000 ease-out',
              idx === activeProject ? 'opacity-100 scale-100' : 'opacity-0 scale-105',
            ].join(' ')}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover object-center filter brightness-[0.65] contrast-[1.1]"
            />
          </div>
        ))}

        {/* Ambient Dark Scrims: Multi-layer gradient ensures AAA text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E] via-[#0A0B0E]/60 to-[#0A0B0E]/80" />
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40 mix-blend-overlay" />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
      </div>

      {/* ── Main Stage: Upper & Center Editorial Composition ─────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 sm:pt-36 lg:pt-40 pb-8 flex-1 flex flex-col justify-center">
        {/* Live Telemetry Pill */}
        <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md w-fit mb-6 animate-fade-in">
          <span
            className="w-2 h-2 rounded-full animate-ping shrink-0"
            style={{ backgroundColor: 'var(--color-cobalt)' }}
            aria-hidden="true"
          />
          <span className="w-2 h-2 rounded-full -ml-5 shrink-0" style={{ backgroundColor: 'var(--color-cobalt)' }} />
          <span className="text-[0.6875rem] uppercase tracking-[0.2em] font-light text-white/90">
            PRODUCTION VERIFIED // {current.metric}
          </span>
          <span className="text-white/30 text-[0.625rem]">|</span>
          <span className="text-[0.6875rem] uppercase tracking-[0.16em] font-extralight text-white/70">
            {current.discipline}
          </span>
        </div>

        {/* Monumental Headline — Red Bull Scale with Work Sans 200 */}
        <h1
          id="hero-heading"
          className="font-extralight uppercase text-white tracking-[-0.035em] leading-[0.95] max-w-5xl mb-6 text-balance"
          style={{
            fontSize: 'clamp(2.75rem, 6.8vw, 6.75rem)',
          }}
        >
          Websites and <br className="hidden sm:inline" />
          systems built to{' '}
          <span className="italic font-extralight text-[#9A4A53] hover:text-[var(--color-cobalt)] transition-colors duration-500">
            work.
          </span>
        </h1>

        {/* Supporting Editorial Paragraph */}
        <p
          className="font-light text-white/80 max-w-2xl text-base sm:text-lg lg:text-xl leading-relaxed mb-8"
        >
          Avorria engineers monumental digital flagships, high-velocity search platforms,
          and autonomous agentic systems for organisations that demand verified commercial outcomes.
        </p>

        {/* Dual High-Impact Action Cluster */}
        <div className="flex flex-wrap items-center gap-4">
          <Button as="link" href="/start-a-project" variant="cobalt" size="lg">
            Start a project{' '}
            <span className="btn-arrow ml-1" aria-hidden="true">↗</span>
          </Button>

          <Button as="link" href="/work" variant="secondary" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:border-white">
            Explore All Flagships
          </Button>

          <Link
            href={current.slug}
            className="group hidden md:inline-flex items-center gap-2 px-5 py-3.5 rounded-sm border border-white/15 bg-white/5 hover:border-[var(--color-cobalt)] transition-all duration-300 text-[0.6875rem] uppercase tracking-[0.14em] font-light text-white/80 hover:text-white"
          >
            <span>Live Case: {current.title}</span>
            <span className="group-hover:translate-x-0.5 transition-transform text-[var(--color-cobalt)]">→</span>
          </Link>
        </div>
      </div>

      {/* ── Bottom: Red Bull-Style Interactive Featured Media Ticker ─────── */}
      <div className="relative z-10 w-full border-t border-white/10 bg-[#0A0B0E]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          {/* Label + Controls */}
          <div className="flex items-center justify-between pt-3 pb-2 text-[0.625rem] uppercase tracking-[0.2em] font-light text-white/50">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cobalt)]" />
              FEATURED PRODUCTIONS // SELECT TO PREVIEW
            </span>
            <span className="hidden sm:inline">04 VERIFIED CASE STUDIES</span>
          </div>

          {/* 4-Card Grid Ticker */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 pb-4">
            {HERO_PROJECTS.map((project, index) => {
              const isSelected = index === activeProject

              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setActiveProject(index)}
                  className={[
                    'group relative text-left p-2.5 sm:p-3 rounded-sm border transition-all duration-300 flex items-start gap-3',
                    isSelected
                      ? 'border-[var(--color-cobalt)] bg-white/10 shadow-[0_0_20px_rgba(49,87,255,0.25)]'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.06]',
                  ].join(' ')}
                >
                  {/* Thumbnail */}
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-xs overflow-hidden bg-black/50 border border-white/10">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="56px"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Text details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="text-[0.625rem] font-extralight tracking-[0.16em] text-[var(--color-cobalt)]">
                        {project.number}
                      </span>
                      <span className="text-[0.5625rem] font-light tracking-[0.1em] text-white/40 uppercase truncate">
                        {project.metric}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-light text-white truncate group-hover:text-[var(--color-cobalt)] transition-colors">
                      {project.title}
                    </p>

                    <p className="text-[0.625rem] font-extralight tracking-[0.08em] text-white/60 uppercase truncate">
                      {project.discipline}
                    </p>
                  </div>

                  {/* Active Indicator Bar */}
                  {isSelected && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-cobalt)]"
                      aria-hidden="true"
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
