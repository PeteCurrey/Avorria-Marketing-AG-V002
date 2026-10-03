'use client'

/**
 * FounderSection — Editorial founder portrait and narrative for the About page.
 *
 * Composition:
 *   Desktop — asymmetric 12-col grid:
 *     LEFT  (col 1–5): full-bleed portrait photograph, 3:4 crop, no border-radius
 *     RIGHT (col 6–12): editorial headline → fine rule → narrative → name strip → detail strip
 *
 *   Mobile — portrait image (4:5) → text below
 *
 * Motion (gated on JS / prefers-reduced-motion respected):
 *   - Image panel: clip-path reveal from bottom
 *   - Headline lines: translateY mask reveal, staggered
 *   - Rule: scaleX 0→1 from left
 *   - Body / strip: fade-up
 *
 * Type rules (CI enforced):
 *   - Headlines: font-extralight (200)
 *   - Body/labels: font-light (300)
 *   - Weights above 300 are forbidden
 */

import Image from 'next/image'
import { useEffect, useRef } from 'react'

export function FounderSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const el = sectionRef.current
    if (!el) return

    // Gather animated elements
    const image = el.querySelector<HTMLElement>('.founder-image-wrap')
    const lines = el.querySelectorAll<HTMLElement>('.founder-line-inner')
    const rule = el.querySelector<HTMLElement>('.founder-rule')
    const fadeEls = el.querySelectorAll<HTMLElement>('.founder-fade')

    // Set initial states
    if (image) {
      image.style.clipPath = 'inset(100% 0 0 0)'
      image.style.transition = 'clip-path 900ms cubic-bezier(0.16, 1, 0.3, 1)'
    }
    lines.forEach((line, i) => {
      line.style.transform = 'translateY(110%)'
      line.style.transition = `transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${120 + i * 80}ms`
    })
    if (rule) {
      rule.style.transform = 'scaleX(0)'
      rule.style.transformOrigin = 'left'
      rule.style.transition = 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 400ms'
    }
    fadeEls.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(12px)'
      el.style.transition = `opacity 600ms ease ${500 + i * 80}ms, transform 600ms ease ${500 + i * 80}ms`
    })

    // Observe and trigger
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          if (image) image.style.clipPath = 'inset(0% 0 0 0)'
          lines.forEach((line) => { line.style.transform = 'translateY(0)' })
          if (rule) rule.style.transform = 'scaleX(1)'
          fadeEls.forEach((el) => {
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
          })
          observer.disconnect()
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-[var(--color-border)] bg-white overflow-hidden"
      aria-labelledby="founder-heading"
    >
      {/* ── Watermark numeral ─────────────────────────────────────────────── */}
      <div
        className="absolute top-8 right-[7vw] pointer-events-none select-none text-[clamp(6rem,16vw,14rem)] font-extralight text-[var(--color-graphite)] opacity-[0.03] leading-none"
        aria-hidden="true"
      >
        PC
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[90vh]">

        {/* ── LEFT: Portrait photograph ─────────────────────────────────────── */}
        <div className="lg:col-span-5 relative">

          {/* Mobile: constrained aspect ratio */}
          <div className="lg:hidden relative w-full aspect-[4/5] overflow-hidden founder-image-wrap">
            <Image
              src="/images/about/peter-currey.png"
              alt="Peter Currey — Founder and Director of Avorria"
              fill
              priority
              sizes="100vw"
              className="object-cover object-top"
            />
            {/* Subtle bottom fade on mobile */}
            <div
              className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
              style={{ background: 'linear-gradient(to top, #ffffff 0%, transparent 100%)' }}
            />
          </div>

          {/* Desktop: full-height pinned image */}
          <div className="hidden lg:block absolute inset-0 founder-image-wrap overflow-hidden">
            <Image
              src="/images/about/peter-currey.png"
              alt="Peter Currey — Founder and Director of Avorria"
              fill
              priority
              sizes="42vw"
              className="object-cover object-top"
            />
            {/* Right-edge fade into white — blends into text column */}
            <div
              className="absolute inset-y-0 right-0 w-1/3 pointer-events-none"
              style={{ background: 'linear-gradient(to right, transparent 0%, #ffffff 100%)' }}
            />
          </div>
        </div>

        {/* ── RIGHT: Editorial text column ─────────────────────────────────── */}
        <div
          className={[
            'lg:col-span-7',
            'flex flex-col justify-center',
            'px-8 md:px-12 lg:pl-16 lg:pr-[8vw]',
            'py-16 lg:py-24',
          ].join(' ')}
        >
          {/* Eyebrow */}
          <div className="founder-fade mb-8">
            <div className="flex items-center gap-4">
              <span className="text-[0.6875rem] tracking-[0.22em] uppercase font-light text-[var(--color-graphite-mid)]">
                FOUNDER / AVORRIA
              </span>
              <span className="h-px w-10 bg-[var(--color-border-strong)]" aria-hidden="true" />
            </div>
          </div>

          {/* Large editorial headline */}
          <h2
            id="founder-heading"
            className="font-extralight text-[var(--color-graphite)] mb-8 overflow-hidden"
            style={{
              fontSize: 'clamp(2.25rem, 5vw, 5.5rem)',
              lineHeight: 1.04,
              letterSpacing: '-0.025em',
            }}
          >
            <span className="block overflow-hidden">
              <span className="founder-line-inner block">Built from</span>
            </span>
            <span className="block overflow-hidden">
              <span className="founder-line-inner block">
                real{' '}
                <em className="not-italic italic font-extralight" style={{ color: 'var(--color-rose-text)' }}>
                  experience.
                </em>
              </span>
            </span>
          </h2>

          {/* Fine rule */}
          <div
            className="founder-rule h-px bg-[var(--color-border-strong)] mb-10 w-full"
            aria-hidden="true"
          />

          {/* Founder name + title */}
          <div className="founder-fade mb-8">
            <p className="text-[0.6875rem] tracking-[0.22em] uppercase font-light text-[var(--color-graphite-muted)] mb-1">
              Founder / Director
            </p>
            <p
              className="font-extralight text-[var(--color-graphite)] tracking-[-0.01em]"
              style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2rem)' }}
            >
              Peter Currey
            </p>
          </div>

          {/* Narrative */}
          <div className="founder-fade space-y-5 max-w-[54ch] mb-10">
            <p className="text-[1.0625rem] font-light text-[var(--color-graphite)] leading-relaxed">
              Avorria was not founded by someone who decided to start a technology agency.
              It was founded by someone who spent years working with real businesses, real
              operational problems, and real commercial constraints across business,
              construction, property, finance, and digital development.
            </p>
            <p className="text-sm font-light text-[var(--color-graphite-mid)] leading-relaxed">
              That background shapes everything Avorria does. Technology only earns its
              place when it solves something real — when it removes friction, opens a market,
              or creates a system that compounds in value over time. Not when it looks impressive
              on a portfolio slide.
            </p>
            <p className="text-sm font-light text-[var(--color-graphite-mid)] leading-relaxed">
              The same discipline runs through every engagement: understand the problem
              properly before architecting the solution, then build it as well as it can
              possibly be built. That principle applies whether the project is a physical
              structure, a commercial operation, or a digital system.
            </p>
            <p className="text-sm font-light text-[var(--color-graphite-mid)] leading-relaxed">
              Avorria exists to bring strategy, design, engineering, and emerging technology
              together under one roof — with the clarity that only comes from having operated
              outside of technology as well as within it.
            </p>
          </div>

          {/* Detail strip */}
          <div className="founder-fade border-t border-[var(--color-border)] pt-8">
            <dl className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8">
              {[
                { term: 'Studio', detail: 'Avorria' },
                { term: 'Role', detail: 'Founder & Director' },
                { term: 'Based', detail: 'United Kingdom' },
              ].map(({ term, detail }) => (
                <div key={term} className="space-y-1">
                  <dt className="text-[0.625rem] tracking-[0.2em] uppercase font-light text-[var(--color-graphite-muted)]">
                    {term}
                  </dt>
                  <dd className="text-xs font-light text-[var(--color-graphite)] tracking-wide">
                    {detail}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

      </div>
    </section>
  )
}
