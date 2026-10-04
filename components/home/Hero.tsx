'use client'

import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { HeroMedia } from './HeroMedia'

/**
 * Hero — One Orchestrated GSAP Timeline
 *
 * Brief rules:
 * - One orchestrated hero reveal (GSAP timeline, not CSS animation).
 * - Never IntersectionObserver for animation.
 * - No ALL CAPS eyebrow label.
 * - No animate-pulse.
 * - Respect prefers-reduced-motion: skip GSAP, elements at final state.
 * - H1 is the LCP candidate — never starts at opacity:0.
 *   Lines animate translateY only (mask reveal via .line-mask overflow:hidden).
 *
 * Motion sequence (GSAP timeline, delay from tl.play()):
 *   0ms   — H1 line 1 rises from translateY(100%) inside mask
 *   100ms — H1 line 2
 *   200ms — H1 line 3
 *   380ms — supporting paragraph fades + rises
 *   460ms — CTA buttons
 *   820ms — scroll cue
 *   0ms   — media panel scales 1.04 → 1 (parallel, 1400ms, CSS)
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const line3Ref = useRef<HTMLSpanElement>(null)
  const paraRef = useRef<HTMLParagraphElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)
  const scrollCueRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Dynamically import GSAP to keep it out of the SSR bundle
    import('gsap').then(({ default: gsap }) => {
      const targets = [
        line1Ref.current,
        line2Ref.current,
        line3Ref.current,
        paraRef.current,
        ctasRef.current,
        scrollCueRef.current,
      ].filter(Boolean)

      if (!targets.length) return

      const tl = gsap.timeline({ paused: false })

      // H1 lines: translateY only — opacity always 1 (LCP safe, Axe safe)
      tl.fromTo(
        line1Ref.current,
        { y: '108%' },
        { y: '0%', duration: 0.9, ease: 'cubic-bezier(0.19, 0.72, 0.12, 1)' },
        0,
      )
      tl.fromTo(
        line2Ref.current,
        { y: '108%' },
        { y: '0%', duration: 0.9, ease: 'cubic-bezier(0.19, 0.72, 0.12, 1)' },
        0.1,
      )
      tl.fromTo(
        line3Ref.current,
        { y: '108%' },
        { y: '0%', duration: 0.9, ease: 'cubic-bezier(0.19, 0.72, 0.12, 1)' },
        0.2,
      )

      // Paragraph and CTAs: fade + rise
      tl.fromTo(
        paraRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        0.38,
      )
      tl.fromTo(
        ctasRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        0.46,
      )

      // Scroll cue — last, subtle
      if (scrollCueRef.current) {
        tl.fromTo(
          scrollCueRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          0.82,
        )
      }
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      className="-mt-16 md:-mt-20 relative flex flex-col lg:flex-row min-h-[100dvh] overflow-hidden bg-[var(--color-ivory)]"
      data-chapter="ivory"
      aria-labelledby="hero-heading"
    >
      {/* ── Left: Text column ───────────────────────────────────────────────── */}
      <div
        className={[
          'relative z-10',
          'flex flex-col justify-between',
          'w-full lg:w-[46%] shrink-0 lg:min-h-[100dvh]',
          'pl-[7vw] pr-8 lg:pr-6',
          'pt-24 pb-12 lg:pt-28 lg:pb-10',
        ].join(' ')}
      >
        <div className="my-auto">
          {/* H1 — line-by-line mask reveal via GSAP timeline.
              .line-mask is overflow:hidden; inner span slides from translateY(108%).
              H1 element is never opacity:0 — safe as LCP candidate. */}
          <h1
            id="hero-heading"
            className="font-extralight mb-7 text-[var(--color-graphite)]"
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 6.25rem)',
              lineHeight: 1.04,
              letterSpacing: '-0.025em',
            }}
          >
            <span className="line-mask hero-line-1">
              <span ref={line1Ref} className="line-inner block">Websites and</span>
            </span>
            <span className="line-mask hero-line-2">
              <span ref={line2Ref} className="line-inner block">systems built</span>
            </span>
            <span className="line-mask hero-line-3">
              <span ref={line3Ref} className="line-inner block">
                to{' '}
                <em
                  className="not-italic italic font-extralight"
                  style={{ color: 'var(--color-rose-text)' }}
                >
                  work.
                </em>
              </span>
            </span>
          </h1>

          {/* Supporting paragraph */}
          <p
            ref={paraRef}
            className="hero-para mb-8 font-light text-[var(--color-graphite-mid)] max-w-[46ch]"
            style={{ fontSize: '1.125rem', lineHeight: 1.6 }}
          >
            Avorria designs and builds digital products, intelligent systems
            and high-performance websites for ambitious businesses.
          </p>

          {/* CTAs */}
          <div ref={ctasRef} className="hero-ctas flex flex-row flex-wrap gap-4">
            <Button as="link" href="/start-a-project" variant="primary" size="lg">
              Start a project{' '}
              <span className="btn-arrow" aria-hidden="true">↗</span>
            </Button>
            <Button as="link" href="/work" variant="secondary" size="lg">
              View our work
            </Button>
          </div>
        </div>

        {/* ── Scroll cue — bottom-left ─────────────────────────────────── */}
        <div
          ref={scrollCueRef}
          className="hero-scroll hidden lg:flex items-center gap-3 pt-4"
          aria-hidden="true"
        >
          <div
            className={[
              'flex items-center justify-center',
              'w-8 h-8 rounded-full',
              'border border-[var(--color-graphite-mid)]',
              'text-[var(--color-graphite-mid)]',
            ].join(' ')}
            style={{ fontSize: '0.875rem' }}
          >
            ↓
          </div>
          <span className="text-[0.625rem] tracking-[0.18em] uppercase font-light text-[var(--color-graphite-muted)]">
            Scroll to explore
          </span>
        </div>
      </div>

      {/* ── Thin vertical rule: architectural separator (desktop only) ────── */}
      <div
        className="hidden lg:block absolute top-0 bottom-0 w-px z-10 opacity-30"
        style={{ left: '46%', backgroundColor: 'var(--color-border-strong)' }}
        aria-hidden="true"
      />

      {/* ── Mobile: media below text, 4:5 crop ─────────────────────────────── */}
      <div className="lg:hidden w-full aspect-[4/5] relative" aria-hidden="true">
        <HeroMedia />
      </div>

      {/* ── Right: Media panel — ~56% width, full-bleed top/right/bottom ────── */}
      <div
        className="hidden lg:block absolute top-0 right-0 bottom-0 hero-media-panel"
        style={{ left: '46%' }}
        aria-hidden="true"
      >
        <HeroMedia />
      </div>
    </section>
  )
}
