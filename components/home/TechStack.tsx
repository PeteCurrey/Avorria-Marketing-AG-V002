'use client'

/**
 * TechStack — Chapter 06
 *
 * Interactive visual media surfaces demonstrating verified technology tolerances.
 *
 * ARCHITECTURE:
 * - True White #FFFFFF canvas foundation
 * - 8 architectural capability cards mapped directly to authentic Avorria project captures
 * - Bespoke vector geometry & logo backgrounds tailored to each technology
 * - Default state: restrained white card, subtle watermark silhouette, high-contrast typography
 * - Hover / Focus state: card expands smoothly (scale 1.03, elevation), logo pops with vibrant signature brand color
 * - Atmospheric radial color glow tuned to each technology's brand spectrum
 * - Protective scrim ensures 100% text readability under all interaction states
 * - Mobile: logo and ambient glow display at balanced opacity permanently
 * - Keyboard accessible: cards are focusable with matching visual state
 * - prefers-reduced-motion: strips scale transforms, immediate opacity
 */

import React from 'react'
import Image from 'next/image'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

interface TechItem {
  id: string
  name: string
  category: string
  role: string
  metric: string
  image: string
  alt: string
  provenance: string
  brandColor: string
  glowColor: string
  accentBorder: string
}

const technologies: TechItem[] = [
  {
    id: 'nextjs',
    name: 'Next.js 16 App Router',
    category: 'FRAMEWORK',
    role: 'Server-First Execution & Static Generation',
    metric: '0.62S LCP',
    image: '/images/projects/one-great-northern/hero.webp',
    alt: 'One Great Northern production deployment on Next.js 16 App Router',
    provenance: 'One Great Northern // Static Edge Flagship',
    brandColor: '#000000',
    glowColor: 'rgba(0, 112, 243, 0.22)',
    accentBorder: 'rgba(0, 0, 0, 0.28)',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'LANGUAGE',
    role: 'End-to-End Strict Typings & Invariant Proofs',
    metric: '100% STRICT',
    image: '/images/projects/alkota-bikes/thumbnail.webp',
    alt: 'Alkota Bikes strict TypeScript geometry sizing calculations',
    provenance: 'Alkota Bikes // Biometric Geometry Engine',
    brandColor: '#3178C6',
    glowColor: 'rgba(49, 120, 198, 0.24)',
    accentBorder: 'rgba(49, 120, 198, 0.40)',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL / PostGIS',
    category: 'DATABASE',
    role: 'Relational Schemas & Spatial Cadastral Pyramids',
    metric: '25M+ PARCELS',
    image: '/images/projects/nestiq/hero.webp',
    alt: 'Nestiq cadastral land parcel query interface and spatial index',
    provenance: 'Nestiq // 25M+ Cadastral Parcel Index',
    brandColor: '#336791',
    glowColor: 'rgba(51, 103, 145, 0.24)',
    accentBorder: 'rgba(51, 103, 145, 0.40)',
  },
  {
    id: 'threejs',
    name: 'Vanilla Three.js',
    category: '3D GRAPHICS',
    role: 'Low-Latency WebGL Geometry Inspection Stages',
    metric: '60 FPS STABLE',
    image: '/images/projects/alkota-bikes/hero.webp',
    alt: 'Alkota Bikes custom titanium frame 3D WebGL inspection stage',
    provenance: 'Alkota Bikes // WebGL Inspection Stage',
    brandColor: '#049EF4',
    glowColor: 'rgba(4, 158, 244, 0.24)',
    accentBorder: 'rgba(4, 158, 244, 0.40)',
  },
  {
    id: 'html5-canvas',
    name: 'HTML5 Canvas API',
    category: 'TELEMETRY',
    role: 'Worker-Driven Isolated Financial Tick Aggregation',
    metric: '5,000 TICKS/S',
    image: '/images/projects/drawdown/hero.png',
    alt: 'Drawdown high-frequency execution interface on HTML5 Canvas',
    provenance: 'Drawdown.Trading // High-Frequency Telemetry',
    brandColor: '#E34F26',
    glowColor: 'rgba(227, 79, 38, 0.24)',
    accentBorder: 'rgba(227, 79, 38, 0.40)',
  },
  {
    id: 'ai-models',
    name: 'OpenAI / Anthropic',
    category: 'AI INTEGRATION',
    role: 'Deterministic Agent Routines & Ontology Synthesis',
    metric: 'ZERO HALLUCINATION',
    image: '/images/projects/careeros/hero.webp',
    alt: 'CareerOS career progression ontology synthesis and agent pipeline',
    provenance: 'CareerOS // Autonomous Ontology Pipeline',
    brandColor: '#D97706',
    glowColor: 'rgba(217, 119, 6, 0.22)',
    accentBorder: 'rgba(217, 119, 6, 0.38)',
  },
  {
    id: 'supabase',
    name: 'Supabase Realtime',
    category: 'INFRASTRUCTURE',
    role: 'Binary WebSockets & Row-Level Authorization',
    metric: '<10MS PUBSUB',
    image: '/images/projects/entirefm/hero.webp',
    alt: 'Entire Facilities Management realtime operations and dispatch telemetry',
    provenance: 'Entire FM // Realtime Dispatch Infrastructure',
    brandColor: '#3ECF8E',
    glowColor: 'rgba(62, 207, 142, 0.26)',
    accentBorder: 'rgba(62, 207, 142, 0.45)',
  },
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS v4',
    category: 'DESIGN TOKENS',
    role: 'CSS-First Architectural Theme System',
    metric: 'ZERO RUNTIME',
    image: '/images/projects/one-great-northern/thumbnail.webp',
    alt: 'One Great Northern design tokens and architectural typography',
    provenance: 'One Great Northern // Token Architecture',
    brandColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.24)',
    accentBorder: 'rgba(56, 189, 248, 0.40)',
  },
]

// ─── Vector Technology Logomarks ─────────────────────────────────────────────

function NextJsLogo() {
  return (
    <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="90" cy="90" r="88" stroke="currentColor" strokeWidth="4" opacity="0.35" />
      <circle cx="90" cy="90" r="76" fill="currentColor" opacity="0.12" />
      <path
        d="M149.5 157.1L69.6 54H54V126H66.7V70.1L139.8 164.7C143.2 162.4 146.5 159.9 149.5 157.1Z"
        fill="currentColor"
      />
      <rect x="115" y="54" width="12.7" height="72" fill="currentColor" opacity="0.8" />
    </svg>
  )
}

function TypeScriptLogo() {
  return (
    <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="24" fill="currentColor" />
      <path
        d="M70.5 75.8C72.2 79.4 75.2 82.2 79.5 82.2C83.4 82.2 86 80.2 86 77.2C86 73.8 83.6 72.4 77.5 69.8C69.8 66.5 64.5 62.4 64.5 53.6C64.5 44 72.1 37 83.2 37C90.5 37 96.5 39.8 100.2 46.2L91.4 51.6C89.4 48 86.8 46.2 82.8 46.2C78.8 46.2 76.5 48.2 76.5 51C76.5 54.2 78.8 55.6 84.8 58.2C93.4 61.8 98 66.4 98 75.2C98 86.4 89.2 92 78.8 92C69 92 61.8 87.2 58 79.5L70.5 75.8ZM28 47.5H44.5V91H56.5V47.5H73V38H28V47.5Z"
        fill="white"
      />
    </svg>
  )
}

function PostgresLogo() {
  return (
    <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cadastral & Spatial coordinate grid rings */}
      <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" opacity="0.4" />
      <circle cx="64" cy="64" r="42" stroke="currentColor" strokeWidth="1.5" opacity="0.25" />
      <line x1="64" y1="8" x2="64" y2="120" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <line x1="8" y1="64" x2="120" y2="64" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      {/* Architectural PostgreSQL elephant form */}
      <path
        d="M64 24C44 24 32 38 32 58C32 74 40 86 52 90V108C52 110 56 112 60 110L72 98C84 96 96 86 96 66C96 44 82 24 64 24ZM52 56C49 56 46 53 46 50C46 47 49 44 52 44C55 44 58 47 58 50C58 53 55 56 52 56Z"
        fill="currentColor"
      />
      <path
        d="M76 54C76 68 70 82 58 88C64 90 72 88 78 84C86 78 90 68 90 56C90 46 84 38 76 34V54Z"
        fill="currentColor"
        opacity="0.5"
      />
    </svg>
  )
}

function ThreeJsLogo() {
  return (
    <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M64 16L112 96H16L64 16Z" stroke="currentColor" strokeWidth="3" />
      <path d="M64 16L64 96" stroke="currentColor" strokeWidth="2.5" />
      <path d="M16 96L64 56L112 96" stroke="currentColor" strokeWidth="2.5" />
      <polygon points="64,16 64,56 16,96" fill="currentColor" opacity="0.35" />
      <polygon points="64,16 112,96 64,56" fill="currentColor" opacity="0.65" />
      <circle cx="64" cy="56" r="4.5" fill="currentColor" />
      <circle cx="64" cy="16" r="3.5" fill="currentColor" />
      <circle cx="16" cy="96" r="3.5" fill="currentColor" />
      <circle cx="112" cy="96" r="3.5" fill="currentColor" />
    </svg>
  )
}

function CanvasLogo() {
  return (
    <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 18L30 108L64 118L98 108L106 18H22Z" fill="currentColor" />
      <path d="M64 26V110L91 102L97 26H64Z" fill="white" opacity="0.22" />
      <path
        d="M36 72L48 52L64 78L78 40L92 68"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="78" cy="40" r="4.5" fill="white" />
    </svg>
  )
}

function AiModelsLogo() {
  return (
    <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(64,64)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <ellipse
            key={i}
            cx="0"
            cy="-26"
            rx="11"
            ry="25"
            transform={`rotate(${angle})`}
            fill="currentColor"
            opacity={i % 2 === 0 ? 0.8 : 0.45}
          />
        ))}
        <circle cx="0" cy="0" r="10" fill="currentColor" />
      </g>
    </svg>
  )
}

function SupabaseLogo() {
  return (
    <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M74.1 123.6C70.3 128.2 62.7 125.7 62.5 119.8L60.7 75.8H18.5C10.7 75.8 6.4 66.8 11.3 60.7L53.9 4.4C57.7 -0.2 65.3 2.3 65.5 8.2L67.3 52.2H109.5C117.3 52.2 121.6 61.2 116.7 67.3L74.1 123.6Z"
        fill="currentColor"
      />
    </svg>
  )
}

function TailwindLogo() {
  return (
    <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M64 42.7C42.7 42.7 29.3 53.3 24 74.7C32 64 41.3 58.7 52 58.7C60 58.7 66.7 63.3 74.7 68.7C87.3 77.3 100.7 85.3 124 85.3C145.3 85.3 158.7 74.7 164 53.3C156 64 146.7 69.3 136 69.3C128 69.3 121.3 64.7 113.3 59.3C100.7 50.7 87.3 42.7 64 42.7ZM24 74.7C2.7 74.7 -10.7 85.3 -16 106.7C-8 96 1.3 90.7 12 90.7C20 90.7 26.7 95.3 34.7 100.7C47.3 109.3 60.7 117.3 84 117.3C105.3 117.3 118.7 106.7 124 85.3C116 96 106.7 101.3 96 101.3C88 101.3 81.3 96.7 73.3 91.3C60.7 82.7 47.3 74.7 24 74.7Z"
        fill="currentColor"
        transform="translate(-10, -14) scale(0.85)"
      />
    </svg>
  )
}

function TechLogo({ id }: { id: string }) {
  switch (id) {
    case 'nextjs':
      return <NextJsLogo />
    case 'typescript':
      return <TypeScriptLogo />
    case 'postgresql':
      return <PostgresLogo />
    case 'threejs':
      return <ThreeJsLogo />
    case 'html5-canvas':
      return <CanvasLogo />
    case 'ai-models':
      return <AiModelsLogo />
    case 'supabase':
      return <SupabaseLogo />
    case 'tailwindcss':
      return <TailwindLogo />
    default:
      return null
  }
}

// ─── Main Section Component ──────────────────────────────────────────────────

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
              className="tech-card group p-6 lg:p-8 flex flex-col justify-between min-h-[270px] md:min-h-[300px] focus:outline-none"
              tabIndex={0}
              role="article"
              aria-label={`${tech.name} — ${tech.category}: ${tech.metric}`}
              style={
                {
                  '--tech-color': tech.brandColor,
                  '--tech-glow': tech.glowColor,
                  '--tech-border': tech.accentBorder,
                } as React.CSSProperties
              }
            >
              {/* ── Atmospheric Radial Brand Glow (reveals on hover / focus) ─── */}
              <div className="tech-card-glow" aria-hidden="true" />

              {/* ── Authentic Vector Technology Logomark (pops with color on hover) ── */}
              <div className="tech-card-logo-wrap" aria-hidden="true">
                <TechLogo id={tech.id} />
              </div>

              {/* ── Atmospheric Project Capture (subtle texture layer) ───────── */}
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
