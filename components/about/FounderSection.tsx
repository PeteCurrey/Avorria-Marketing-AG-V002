'use client'

/**
 * FounderSection — Editorial founder portrait and narrative for the About page.
 *
 * Requirements:
 * - Eyebrow: THE PERSON BEHIND AVORRIA
 * - Headline: BUILT FROM REAL EXPERIENCE.
 * - Exact Copy:
 *     - Introduction: Avorria was founded by Peter Currey with a simple belief...
 *     - Background: Peter's background spans business, construction...
 *     - Philosophy: That is the thinking behind Avorria...
 *     - Closing: Avorria brings strategy, design... Build things that matter. Build them properly.
 * - Nameplate: PETER CURREY / FOUNDER / DIRECTOR
 * - Transition: THE PEOPLE BEHIND THE WORK
 * - Responsive:
 *     Desktop: Asymmetric editorial spread (Left: Image, Right: Text)
 *     Mobile: Eyebrow → Headline → Image → Nameplate → Biography → Transition
 * - Design System: Work Sans 200 for headlines, Work Sans 300 for body, NO weights above 300.
 */

import Image from 'next/image'
import { useEffect, useRef } from 'react'

export function FounderSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const el = sectionRef.current
    if (!el) return

    const imageWraps = el.querySelectorAll<HTMLElement>('.founder-image-wrap')
    const lines = el.querySelectorAll<HTMLElement>('.founder-line-inner')
    const rules = el.querySelectorAll<HTMLElement>('.founder-rule')
    const fadeEls = el.querySelectorAll<HTMLElement>('.founder-fade')

    imageWraps.forEach((wrap) => {
      wrap.style.clipPath = 'inset(100% 0 0 0)'
      wrap.style.transition = 'clip-path 850ms cubic-bezier(0.16, 1, 0.3, 1)'
    })
    lines.forEach((line, i) => {
      line.style.transform = 'translateY(110%)'
      line.style.transition = `transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${100 + i * 80}ms`
    })
    rules.forEach((rule) => {
      rule.style.transform = 'scaleX(0)'
      rule.style.transformOrigin = 'left'
      rule.style.transition = 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 350ms'
    })
    fadeEls.forEach((fade, i) => {
      fade.style.opacity = '0'
      fade.style.transform = 'translateY(8px)'
      fade.style.transition = `opacity 600ms ease ${450 + i * 60}ms, transform 600ms ease ${450 + i * 60}ms`
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          imageWraps.forEach((wrap) => { wrap.style.clipPath = 'inset(0% 0 0 0)' })
          lines.forEach((line) => { line.style.transform = 'translateY(0)' })
          rules.forEach((rule) => { rule.style.transform = 'scaleX(1)' })
          fadeEls.forEach((fade) => {
            fade.style.opacity = '1'
            fade.style.transform = 'translateY(0)'
          })
          observer.disconnect()
        })
      },
      { threshold: 0.08 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="founder"
      className="relative border-t border-[var(--color-border)] bg-white overflow-hidden"
      aria-labelledby="founder-heading"
    >
      {/* ── Background Numeral Watermark ────────────────────────────────────── */}
      <div
        className="absolute top-8 right-[7vw] pointer-events-none select-none text-[clamp(6rem,16vw,14rem)] font-extralight text-[var(--color-graphite)] opacity-[0.03] leading-none"
        aria-hidden="true"
      >
        04
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          DESKTOP VIEW (lg:grid)
          Asymmetric spread: Left full-bleed image (5 cols), Right narrative (7 cols)
          ═══════════════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:grid grid-cols-12 min-h-[90vh]">
        {/* Left: Full-Height Art-Directed Photograph */}
        <div className="col-span-5 relative">
          <div className="absolute inset-0 founder-image-wrap overflow-hidden">
            <Image
              src="/images/about/peter-currey.png"
              alt="Peter Currey — Founder and Director of Avorria"
              fill
              priority
              sizes="42vw"
              className="object-cover object-top"
            />
            {/* Soft right fade into pure white editorial ground */}
            <div
              className="absolute inset-y-0 right-0 w-1/3 pointer-events-none"
              style={{ background: 'linear-gradient(to right, transparent 0%, #ffffff 100%)' }}
            />
          </div>
        </div>

        {/* Right: Editorial Narrative Column */}
        <div className="col-span-7 flex flex-col justify-center px-12 xl:pl-16 xl:pr-[8vw] py-20 xl:py-28">
          {/* Eyebrow */}
          <div className="founder-fade mb-6">
            <div className="flex items-center gap-4">
              <span className="text-[0.6875rem] tracking-[0.22em] uppercase font-light text-[var(--color-graphite-mid)]">
                THE PERSON BEHIND AVORRIA
              </span>
              <span className="h-px w-10 bg-[var(--color-border-strong)]" aria-hidden="true" />
            </div>
          </div>

          {/* Monumental Headline */}
          <h2
            id="founder-heading"
            className="font-extralight text-[var(--color-graphite)] mb-8 overflow-hidden"
            style={{
              fontSize: 'clamp(2.5rem, 4.8vw, 5.25rem)',
              lineHeight: 1.04,
              letterSpacing: '-0.025em',
            }}
          >
            <span className="block overflow-hidden">
              <span className="founder-line-inner block">BUILT FROM REAL</span>
            </span>
            <span className="block overflow-hidden">
              <span className="founder-line-inner block">
                <em className="not-italic italic font-extralight" style={{ color: 'var(--color-rose-text)' }}>
                  EXPERIENCE.
                </em>
              </span>
            </span>
          </h2>

          {/* Fine Rule */}
          <div
            className="founder-rule h-px bg-[var(--color-border-strong)] mb-10 w-full"
            aria-hidden="true"
          />

          {/* Exact Narrative Copy */}
          <div className="founder-fade space-y-6 max-w-[56ch] mb-12">
            <p className="text-[1.125rem] font-light text-[var(--color-graphite)] leading-relaxed">
              Avorria was founded by Peter Currey with a simple belief: technology should solve something.
            </p>

            <p className="text-[0.9375rem] font-light text-[var(--color-graphite-mid)] leading-relaxed">
              The business grew from experience of building and operating businesses, working with real
              commercial problems and seeing first-hand where technology can create genuine advantage —
              and where it can simply create more complexity.
            </p>

            <p className="text-[0.9375rem] font-light text-[var(--color-graphite-mid)] leading-relaxed">
              Peter&apos;s background spans business, construction, property, finance and technology. That
              perspective continues to shape how Avorria approaches digital work today.
            </p>

            <p className="text-[0.9375rem] font-light text-[var(--color-graphite-mid)] leading-relaxed">
              The common thread has always been building: understanding what needs to exist, working out
              how it should work, and then making it real.
            </p>

            <p className="text-[0.9375rem] font-light text-[var(--color-graphite-mid)] leading-relaxed">
              That is the thinking behind Avorria.
            </p>

            <p className="text-[0.9375rem] font-light text-[var(--color-graphite-mid)] leading-relaxed">
              Not technology for technology&apos;s sake. Not digital products built because they can be built.
            </p>

            <p className="text-[0.9375rem] font-light text-[var(--color-graphite-mid)] leading-relaxed">
              The objective is to understand the business, find the opportunity, and build something that
              genuinely moves it forward.
            </p>

            <div className="pt-2 border-t border-[var(--color-border)]">
              <p className="text-[0.9375rem] font-light text-[var(--color-graphite)] leading-relaxed">
                Avorria brings strategy, design, development, systems and emerging technology together
                to do exactly that.
              </p>
              <p className="text-[1.0625rem] font-light text-[var(--color-graphite)] tracking-[-0.01em] mt-3">
                Build things that matter. Build them properly.
              </p>
            </div>
          </div>

          {/* Founder Identification Nameplate */}
          <div className="founder-fade border-t border-[var(--color-border)] pt-8 mb-12">
            <p
              className="font-extralight text-[var(--color-graphite)] tracking-[-0.01em] mb-1"
              style={{ fontSize: 'clamp(1.25rem, 2.2vw, 1.75rem)' }}
            >
              PETER CURREY
            </p>
            <p className="text-[0.6875rem] tracking-[0.22em] uppercase font-light text-[var(--color-graphite-muted)]">
              FOUNDER / DIRECTOR
            </p>
          </div>

          {/* Quiet Transition into Meet the Team */}
          <div className="founder-fade pt-6 border-t border-[var(--color-border)]">
            <div className="flex items-center justify-between text-[11px] tracking-[0.2em] uppercase font-light text-[var(--color-graphite-muted)]">
              <span className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-rose-text)]" />
                <span>THE PEOPLE BEHIND THE WORK</span>
              </span>
              <a
                href="#team"
                className="text-[var(--color-graphite)] hover:text-[var(--color-rose-text)] transition-colors inline-flex items-center gap-2"
              >
                <span>MEET THE TEAM</span>
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          MOBILE VIEW (lg:hidden)
          Specific narrative order:
          1. THE PERSON BEHIND AVORRIA
          2. BUILT FROM REAL EXPERIENCE.
          3. FOUNDER IMAGE
          4. PETER CURREY / FOUNDER / DIRECTOR
          5. BIOGRAPHY
          6. THE PEOPLE BEHIND THE WORK / MEET THE TEAM
          ═══════════════════════════════════════════════════════════════════════ */}
      <div className="lg:hidden px-6 py-16 space-y-8">
        {/* 1. Mobile Eyebrow */}
        <div className="founder-fade">
          <div className="flex items-center gap-4">
            <span className="text-[0.6875rem] tracking-[0.22em] uppercase font-light text-[var(--color-graphite-mid)]">
              THE PERSON BEHIND AVORRIA
            </span>
            <span className="h-px w-10 bg-[var(--color-border-strong)]" aria-hidden="true" />
          </div>
        </div>

        {/* 2. Mobile Headline */}
        <h2
          className="font-extralight text-[var(--color-graphite)] overflow-hidden"
          style={{
            fontSize: 'clamp(2.25rem, 8vw, 3.5rem)',
            lineHeight: 1.06,
            letterSpacing: '-0.025em',
          }}
        >
          <span className="block overflow-hidden">
            <span className="founder-line-inner block">BUILT FROM REAL</span>
          </span>
          <span className="block overflow-hidden">
            <span className="founder-line-inner block">
              <em className="not-italic italic font-extralight" style={{ color: 'var(--color-rose-text)' }}>
                EXPERIENCE.
              </em>
            </span>
          </span>
        </h2>

        {/* 3. Mobile Founder Image */}
        <div className="relative w-full aspect-[4/5] overflow-hidden founder-image-wrap border border-[var(--color-border)]">
          <Image
            src="/images/about/peter-currey.png"
            alt="Peter Currey — Founder and Director of Avorria"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
            style={{ background: 'linear-gradient(to top, #ffffff 0%, transparent 100%)' }}
          />
        </div>

        {/* 4. Mobile Nameplate */}
        <div className="founder-fade pt-2">
          <p className="font-extralight text-2xl text-[var(--color-graphite)] tracking-tight mb-1">
            PETER CURREY
          </p>
          <p className="text-[0.6875rem] tracking-[0.22em] uppercase font-light text-[var(--color-graphite-muted)]">
            FOUNDER / DIRECTOR
          </p>
        </div>

        {/* Fine Rule */}
        <div className="founder-rule h-px bg-[var(--color-border)] w-full" aria-hidden="true" />

        {/* 5. Mobile Biography Copy */}
        <div className="founder-fade space-y-5 text-sm font-light text-[var(--color-graphite-mid)] leading-relaxed">
          <p className="text-base text-[var(--color-graphite)]">
            Avorria was founded by Peter Currey with a simple belief: technology should solve something.
          </p>

          <p>
            The business grew from experience of building and operating businesses, working with real
            commercial problems and seeing first-hand where technology can create genuine advantage —
            and where it can simply create more complexity.
          </p>

          <p>
            Peter&apos;s background spans business, construction, property, finance and technology. That
            perspective continues to shape how Avorria approaches digital work today.
          </p>

          <p>
            The common thread has always been building: understanding what needs to exist, working out
            how it should work, and then making it real.
          </p>

          <p>
            That is the thinking behind Avorria.
          </p>

          <p>
            Not technology for technology&apos;s sake. Not digital products built because they can be built.
          </p>

          <p>
            The objective is to understand the business, find the opportunity, and build something that
            genuinely moves it forward.
          </p>

          <div className="pt-4 border-t border-[var(--color-border)]">
            <p className="text-[var(--color-graphite)]">
              Avorria brings strategy, design, development, systems and emerging technology together
              to do exactly that.
            </p>
            <p className="text-base text-[var(--color-graphite)] mt-2">
              Build things that matter. Build them properly.
            </p>
          </div>
        </div>

        {/* 6. Mobile Transition into Meet the Team */}
        <div className="founder-fade pt-8 border-t border-[var(--color-border)]">
          <div className="flex flex-col gap-2 text-[11px] tracking-[0.2em] uppercase font-light text-[var(--color-graphite-muted)]">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-rose-text)]" />
              <span>THE PEOPLE BEHIND THE WORK</span>
            </span>
            <a
              href="#team"
              className="text-[var(--color-graphite)] hover:text-[var(--color-rose-text)] transition-colors inline-flex items-center gap-2 pt-1"
            >
              <span>MEET THE TEAM</span>
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
