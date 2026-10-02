'use client'

/**
 * SelectedWork — Chapter 03
 *
 * Requirements:
 * - Chapter 03: Warm Ivory ground
 * - Oversized section numeral: 03 (Work Sans 200)
 * - Thin full-width rule
 * - Scale contrast: monumental display statement vs small tracked labels
 * - Pinned horizontal gallery (desktop) via GSAP ScrollTrigger
 * - Stacked on mobile
 * - Large-format imagery with real project captures (hero.webp & thumbnail.webp)
 * - Custom cursor "View" pill on fine pointers (@media (pointer: fine))
 */

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getFeaturedProjects } from '@/content/projects'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { Button } from '@/components/ui/Button'

export function SelectedWork() {
  const projects = getFeaturedProjects()
  const sectionRef = useRef<HTMLElement>(null)
  const pinContainerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  // Custom cursor follower state
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 })
  const [cursorVisible, setCursorVisible] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check prefers-reduced-motion or mobile viewports
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    // Desktop horizontal scroll pinning (min-width: 1024px)
    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth
        const viewportWidth = window.innerWidth
        return -(trackWidth - viewportWidth + 120)
      }

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.8,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth + 400}`,
          invalidateOnRefresh: true,
        },
      })

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    })

    return () => {
      mm.revert()
    }
  }, [])

  // Mouse follower handler for fine pointers
  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY })
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative section-y-large border-t border-[var(--color-border)] bg-[var(--color-ivory)] overflow-hidden"
      aria-labelledby="work-heading"
    >
      {/* ── Background Architectural Numeral ─────────────────────────────────── */}
      <div
        className="absolute top-8 right-[7vw] pointer-events-none select-none text-[clamp(6rem,16vw,14rem)] font-extralight text-[var(--color-graphite)] opacity-[0.04] leading-none"
        aria-hidden="true"
      >
        03
      </div>

      {/* ── Custom "View" Cursor for fine pointers ──────────────────────────── */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className={`pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-graphite)] text-[var(--color-ivory)] text-[10px] tracking-[0.2em] font-light uppercase px-4 py-2 shadow-lg transition-opacity duration-200 hidden md:flex items-center gap-1.5 ${
          cursorVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transition: 'transform 0.15s ease-out, opacity 0.15s ease-out',
        }}
      >
        <span>View</span>
        <span className="text-[var(--color-rose-text)]">↗</span>
      </div>

      <div className="w-full px-6 md:px-10 lg:px-[7vw]">
        {/* Section Header with Scale Contrast Statement */}
        <div className="max-w-[1200px] mb-12 lg:mb-16">
          <RevealOnScroll>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[0.6875rem] tracking-[0.22em] uppercase font-light text-[var(--color-graphite-mid)]">
                03 // SELECTED WORK
              </span>
              <span className="h-px w-12 bg-[var(--color-border-strong)]" aria-hidden="true" />
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <h2
                id="work-heading"
                className="font-extralight text-[var(--color-graphite)] leading-[1.04] tracking-[-0.025em] text-[clamp(2.5rem,5.8vw,6.25rem)]"
              >
                Selected{' '}
                <em className="not-italic italic font-extralight" style={{ color: 'var(--color-rose-text)' }}>
                  work.
                </em>
              </h2>
              <p className="text-sm md:text-base font-light text-[var(--color-graphite-mid)] max-w-[38ch] leading-relaxed">
                Six verified commercial and technical interventions. Zero fabricated metrics.
              </p>
            </div>
          </RevealOnScroll>
        </div>

        {/* ── Pinned Horizontal Gallery (Desktop) / Stacked Grid (Mobile) ─────── */}
        <div ref={pinContainerRef} className="relative w-full">
          <div
            ref={trackRef}
            className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:w-max lg:pr-[10vw]"
          >
            {projects.map((project, idx) => (
              <article
                key={project.slug}
                onMouseEnter={() => setCursorVisible(true)}
                onMouseLeave={() => setCursorVisible(false)}
                className="group relative w-full lg:w-[680px] shrink-0 border border-[var(--color-border)] bg-[var(--color-ivory-light)] hover:border-[var(--color-border-strong)] transition-all duration-[var(--duration-base)] p-5 md:p-6"
              >
                <Link href={`/work/${project.slug}`} className="block">
                  {/* Card Telemetry Header */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--color-border)] text-[10px] tracking-[0.18em] uppercase text-[var(--color-graphite-muted)] font-light">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                      <span>{project.industry}</span>
                    </span>
                    <span>PROJ. 0{idx + 1} / 2025</span>
                  </div>

                  {/* Large-Format Project Capture (16:9 Aspect Ratio) */}
                  <div className="relative w-full aspect-[16/9] bg-[#1A1916] overflow-hidden border border-[var(--color-border)] mb-5">
                    {project.heroImage ? (
                      <Image
                        src={project.heroImage.src}
                        alt={project.heroImage.alt}
                        fill
                        priority={idx < 2}
                        sizes="(max-width: 1024px) 100vw, 680px"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-[var(--color-graphite-muted)] uppercase tracking-wider font-light">
                        {project.title}
                      </div>
                    )}

                    {/* Subtle Overlay Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300" />
                  </div>

                  {/* Project Details */}
                  <div className="space-y-3">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-xl md:text-2xl font-extralight text-[var(--color-graphite)] tracking-[-0.01em] group-hover:text-[var(--color-rose-text)] transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-xs font-light text-[var(--color-graphite-mid)]">
                        {project.client}
                      </span>
                    </div>

                    <p className="text-sm font-light text-[var(--color-graphite-mid)] leading-relaxed line-clamp-2">
                      {project.summary}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.technology?.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-[9px] tracking-[0.14em] uppercase text-[var(--color-graphite-muted)] font-light border border-[var(--color-border)] px-2 py-0.5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Gallery Footer CTA */}
        <div className="mt-12 lg:mt-16 flex items-center justify-between border-t border-[var(--color-border)] pt-6">
          <span className="text-[11px] tracking-[0.18em] uppercase text-[var(--color-graphite-muted)] font-light">
            SCROLL HORIZONTALLY ON DESKTOP · TAP TO INSPECT
          </span>
          <Button as="link" href="/work" variant="secondary" size="sm">
            View All Verified Work
          </Button>
        </div>
      </div>
    </section>
  )
}
