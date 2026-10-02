'use client'

/**
 * TechStack — Chapter 06
 *
 * Requirements:
 * - Chapter 06: Warm Ivory ground
 * - Oversized section numeral: 06 (Work Sans 200)
 * - Work Sans only (remove ALL font-mono)
 * - Thin full-width rule
 * - Scale contrast: monumental display statement vs small tracked labels
 * - Architectural hardware/systems grid with verified performance tolerances
 */

import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

interface TechItem {
  name: string
  category: string
  role: string
  metric: string
}

const technologies: TechItem[] = [
  { name: 'Next.js 16 App Router', category: 'FRAMEWORK', role: 'Server-First Execution & Static Generation', metric: '0.62S LCP' },
  { name: 'TypeScript', category: 'LANGUAGE', role: 'End-to-End Strict Typings & Invariant Proofs', metric: '100% STRICT' },
  { name: 'PostgreSQL / PostGIS', category: 'DATABASE', role: 'Relational Schemas & Spatial Cadastral Pyramids', metric: '25M+ PARCELS' },
  { name: 'Vanilla Three.js', category: '3D GRAPHICS', role: 'Low-Latency WebGL Geometry Inspection Stages', metric: '60 FPS STABLE' },
  { name: 'HTML5 Canvas API', category: 'TELEMETRY', role: 'Worker-Driven Isolated Financial Tick Aggregation', metric: '5,000 TICKS/S' },
  { name: 'OpenAI / Anthropic', category: 'AI INTEGRATION', role: 'Deterministic Agent Routines & Ontology Synthesis', metric: 'ZERO HALLUCINATION' },
  { name: 'Supabase Realtime', category: 'INFRASTRUCTURE', role: 'Binary WebSockets & Row-Level Authorization', metric: '<10MS PUBSUB' },
  { name: 'Tailwind CSS v4', category: 'DESIGN TOKENS', role: 'CSS-First Architectural Theme System', metric: 'ZERO RUNTIME' },
]

export function TechStack() {
  return (
    <section
      className="relative section-y-large border-t border-[var(--color-border)] bg-[var(--color-ivory)] overflow-hidden"
      aria-labelledby="tech-heading"
      id="techstack"
    >
      {/* ── Background Architectural Numeral ─────────────────────────────────── */}
      <div
        className="absolute top-8 right-[7vw] pointer-events-none select-none text-[clamp(6rem,16vw,14rem)] font-extralight text-[var(--color-graphite)] opacity-[0.04] leading-none"
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
                06 // TECHNOLOGY & TOLERANCES
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
                  <em className="not-italic italic font-extralight" style={{ color: 'var(--color-rose-text)' }}>
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

        {/* ── Architectural 8-Cell Matrix ────────────────────────────────────── */}
        <div className="border-t border-l border-[var(--color-border)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="border-b border-r border-[var(--color-border)] p-6 lg:p-8 bg-[var(--color-ivory-light)] hover:bg-black/[0.015] transition-colors"
            >
              {/* Category & Metric */}
              <div className="flex items-center justify-between text-[10px] tracking-[0.18em] uppercase text-[var(--color-graphite-muted)] font-light mb-4">
                <span>{tech.category}</span>
                <span className="text-[var(--color-rose-text)]">{tech.metric}</span>
              </div>

              {/* Technology Name */}
              <h3 className="text-lg md:text-xl font-extralight text-[var(--color-graphite)] mb-2 tracking-[-0.01em]">
                {tech.name}
              </h3>

              {/* Role */}
              <p className="text-xs font-light text-[var(--color-graphite-mid)] leading-relaxed">
                {tech.role}
              </p>
            </div>
          ))}
        </div>

        {/* Matrix Footer */}
        <div className="mt-8 flex items-center justify-between text-[10px] tracking-[0.18em] uppercase text-[var(--color-graphite-muted)] font-light pt-4 border-t border-[var(--color-border)]">
          <span>DEPLOYED PRODUCTION MATRIX</span>
          <span>100% STRICT ENGINE CONFORMANCE</span>
        </div>
      </div>
    </section>
  )
}
