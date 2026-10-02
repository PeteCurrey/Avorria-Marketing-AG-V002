'use client'

/**
 * TechStack — Chapter 06
 *
 * Interactive visual media surfaces demonstrating verified technology tolerances.
 *
 * ARCHITECTURE:
 * - True White #FFFFFF canvas foundation
 * - 8 architectural capability cards mapped directly to authentic Avorria project captures
 * - Default state: restrained white card, high-contrast typography, generous whitespace
 * - Hover / Focus state: progressive image reveal (0 → ~0.30 opacity, scale 1.03 → 1.0)
 * - Protective scrim ensures 100% text readability under all interaction states
 * - Mobile: image displays at lower opacity (0.14) permanently — no tap-to-discover barrier
 * - Keyboard accessible: cards are focusable with matching visual state
 * - prefers-reduced-motion: strips scale transforms, immediate opacity
 */

import Image from 'next/image'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

interface TechItem {
  name: string
  category: string
  role: string
  metric: string
  image: string
  alt: string
  provenance: string
}

const technologies: TechItem[] = [
  {
    name: 'Next.js 16 App Router',
    category: 'FRAMEWORK',
    role: 'Server-First Execution & Static Generation',
    metric: '0.62S LCP',
    image: '/images/projects/one-great-northern/hero.webp',
    alt: 'One Great Northern production deployment on Next.js 16 App Router',
    provenance: 'One Great Northern // Static Edge Flagship',
  },
  {
    name: 'TypeScript',
    category: 'LANGUAGE',
    role: 'End-to-End Strict Typings & Invariant Proofs',
    metric: '100% STRICT',
    image: '/images/projects/alkota-bikes/thumbnail.webp',
    alt: 'Alkota Bikes strict TypeScript geometry sizing calculations',
    provenance: 'Alkota Bikes // Biometric Geometry Engine',
  },
  {
    name: 'PostgreSQL / PostGIS',
    category: 'DATABASE',
    role: 'Relational Schemas & Spatial Cadastral Pyramids',
    metric: '25M+ PARCELS',
    image: '/images/projects/nestiq/hero.webp',
    alt: 'Nestiq cadastral land parcel query interface and spatial index',
    provenance: 'Nestiq // 25M+ Cadastral Parcel Index',
  },
  {
    name: 'Vanilla Three.js',
    category: '3D GRAPHICS',
    role: 'Low-Latency WebGL Geometry Inspection Stages',
    metric: '60 FPS STABLE',
    image: '/images/projects/alkota-bikes/hero.webp',
    alt: 'Alkota Bikes custom titanium frame 3D WebGL inspection stage',
    provenance: 'Alkota Bikes // WebGL Inspection Stage',
  },
  {
    name: 'HTML5 Canvas API',
    category: 'TELEMETRY',
    role: 'Worker-Driven Isolated Financial Tick Aggregation',
    metric: '5,000 TICKS/S',
    image: '/images/projects/drawdown/hero.webp',
    alt: 'Drawdown high-frequency execution interface on HTML5 Canvas',
    provenance: 'Drawdown.Trading // High-Frequency Telemetry',
  },
  {
    name: 'OpenAI / Anthropic',
    category: 'AI INTEGRATION',
    role: 'Deterministic Agent Routines & Ontology Synthesis',
    metric: 'ZERO HALLUCINATION',
    image: '/images/projects/careeros/hero.webp',
    alt: 'CareerOS career progression ontology synthesis and agent pipeline',
    provenance: 'CareerOS // Autonomous Ontology Pipeline',
  },
  {
    name: 'Supabase Realtime',
    category: 'INFRASTRUCTURE',
    role: 'Binary WebSockets & Row-Level Authorization',
    metric: '<10MS PUBSUB',
    image: '/images/projects/entirefm/hero.webp',
    alt: 'Entire Facilities Management realtime operations and dispatch telemetry',
    provenance: 'Entire FM // Realtime Dispatch Infrastructure',
  },
  {
    name: 'Tailwind CSS v4',
    category: 'DESIGN TOKENS',
    role: 'CSS-First Architectural Theme System',
    metric: 'ZERO RUNTIME',
    image: '/images/projects/one-great-northern/thumbnail.webp',
    alt: 'One Great Northern design tokens and architectural typography',
    provenance: 'One Great Northern // Token Architecture',
  },
]

export function TechStack() {
  return (
    <section
      className="relative section-y-large border-t border-[var(--color-border)] bg-white overflow-hidden"
      aria-labelledby="tech-heading"
      id="techstack"
    >
      {/* ── Background Architectural Numeral ─────────────────────────────────── */}
      <div
        className="absolute top-8 right-[7vw] pointer-events-none select-none text-[clamp(6rem,16vw,14rem)] font-extralight text-[var(--color-graphite)] opacity-[0.035] leading-none"
        aria-hidden="true"
      >
        06
      </div>

      <div className="w-full px-6 md:px-10 lg:px-[7vw]">
        {/* Section Header */}
        <div className="max-w-[1200px] mb-16 lg:mb-20">
          <RevealOnScroll>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[0.6875rem] tracking-[0.22em] uppercase font-light text-[var(--color-graphite-mid)]">
                06 // TECHNOLOGY &amp; TOLERANCES
              </span>
              <span className="h-px w-12 bg-[var(--color-border-strong)]" aria-hidden="true" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8">
                <h2
                  id="tech-heading"
                  className="font-extralight text-[var(--color-graphite)] leading-[1.04] tracking-[-0.025em] text-[clamp(2.5rem,5.5vw,5.75rem)]"
                >
                  An engineering stack,{' '}
                  <em
                    className="not-italic italic font-extralight"
                    style={{ color: 'var(--color-rose-text)' }}
                  >
                    not
                  </em>{' '}
                  a logo wall.
                </h2>
              </div>
              <div className="lg:col-span-4">
                <p className="text-sm md:text-base font-light text-[var(--color-graphite-mid)] leading-relaxed">
                  We select technologies based on execution tolerances, memory stability, and server-side performance — never social media hype.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* ── Architectural 8-Cell Interactive Media Matrix ──────────────────── */}
        <div
          className="border-t border-l border-[var(--color-border)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          role="region"
          aria-label="Technology and engineering tolerances matrix"
        >
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="tech-card group p-6 lg:p-8 flex flex-col justify-between min-h-[260px] md:min-h-[290px] focus:outline-none"
              tabIndex={0}
              role="article"
              aria-label={`${tech.name} — ${tech.category}: ${tech.metric}`}
            >
              {/* ── Background Media Surface (reveals on hover / focus) ─────── */}
              <div className="tech-card-image-wrap" aria-hidden="true">
                <Image
                  src={tech.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="tech-card-image"
                  loading="lazy"
                />
                {/* Protective editorial scrim ensures high typographic contrast */}
                <div className="tech-card-scrim" />
              </div>

              {/* ── Top: Category & Performance Metric ──────────────────────── */}
              <div className="relative z-10 flex items-center justify-between text-[10px] tracking-[0.18em] uppercase font-light mb-6">
                <span className="text-[var(--color-graphite-muted)] group-hover:text-[var(--color-graphite)] group-focus:text-[var(--color-graphite)] transition-colors duration-300">
                  {tech.category}
                </span>
                <span className="text-[var(--color-rose-text)] font-light">
                  {tech.metric}
                </span>
              </div>

              {/* ── Middle: Technology Name & Architectural Role ────────────── */}
              <div className="relative z-10 my-auto py-2">
                <h3 className="text-lg md:text-xl font-extralight text-[var(--color-graphite)] mb-2.5 tracking-[-0.01em] transition-colors duration-300">
                  {tech.name}
                </h3>
                <p className="text-xs font-light text-[var(--color-graphite-mid)] leading-relaxed max-w-[28ch]">
                  {tech.role}
                </p>
              </div>

              {/* ── Bottom: Verified Project Provenance Stamp ───────────────── */}
              <div className="relative z-10 pt-4 border-t border-[var(--color-border)]/80 flex items-center justify-between text-[9px] tracking-[0.14em] uppercase font-light text-[var(--color-graphite-muted)]">
                <span className="tech-card-provenance text-[var(--color-rose-text)] truncate pr-2">
                  {tech.provenance}
                </span>
                <span className="text-[var(--color-graphite-muted)] shrink-0 select-none opacity-60">
                  VERIFIED
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Matrix Footer */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[10px] tracking-[0.18em] uppercase text-[var(--color-graphite-muted)] font-light pt-4 border-t border-[var(--color-border)]">
          <span>DEPLOYED PRODUCTION MATRIX</span>
          <span>100% STRICT ENGINE CONFORMANCE</span>
        </div>
      </div>
    </section>
  )
}
