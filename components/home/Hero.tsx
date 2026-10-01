import { Button } from '@/components/ui/Button'
import { HeroVisual } from './HeroVisual'

/**
 * Hero — Phase 2A
 *
 * Layout: left text column (45%) + right image/visual column (~55%, bleeding right)
 *
 * Motion:
 * - Eyebrow: fade-up from 14px, 0ms delay
 * - H1: line-by-line mask reveal (.line-mask / .line-inner), 80/160/240ms stagger
 * - Paragraph: fade-up 360ms
 * - CTAs: fade-up 440ms
 * - Scroll cue: fade-up 800ms
 * - Hero visual: starts fully visible, slow scale 1.04→1 over 1400ms
 *
 * LCP: H1 is the LCP candidate. It must NOT start at opacity:0.
 *      The .line-inner starts at translateY(100%) within an overflow-hidden container
 *      — the H1 element itself is always in the document flow at full opacity.
 *      The `.js` class gates all animation states — no JS = no hiding.
 *
 * All classes gated on `.js` in globals.css — content visible without JS.
 */
export function Hero() {
  return (
    <section
      className="relative min-h-[90vh] flex flex-col border-b border-[var(--color-border)] overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="container-max flex-1 flex relative z-10">
        <div className="flex-1 flex flex-col lg:flex-row lg:items-center gap-0 lg:gap-0">

          {/* ── Left: Text column ────────────────────────────────────────── */}
          <div className="flex-1 lg:max-w-[45%] lg:pr-16 pt-24 pb-12 lg:py-0 flex flex-col justify-center">

            {/* Eyebrow */}
            <p className="hero-eyebrow text-label-upper mb-8">
              WEB. AI. SYSTEMS.
            </p>

            {/* H1 — line-by-line mask reveal.
                Each .line-mask is overflow:hidden; .line-inner slides up from 100%.
                H1 is never opacity:0 — safe as LCP candidate. */}
            <h1
              id="hero-heading"
              className="text-display-xl mb-8"
            >
              <span className="line-mask hero-line-1">
                <span className="line-inner block">Websites and</span>
              </span>
              <span className="line-mask hero-line-2">
                <span className="line-inner block">
                  systems{' '}
                  <em className="not-italic italic text-[var(--color-rose-text)]">built</em>
                </span>
              </span>
              <span className="line-mask hero-line-3">
                <span className="line-inner block">to work.</span>
              </span>
            </h1>

            {/* Paragraph */}
            <p className="hero-para text-body-l text-secondary mb-10 max-w-[480px]">
              Avorria designs and builds digital products, intelligent systems
              and high-performance websites for ambitious businesses.
            </p>

            {/* CTAs */}
            <div className="hero-ctas flex flex-wrap gap-4">
              <Button
                as="link"
                href="/start-a-project"
                variant="primary"
                size="lg"
              >
                Start a project{' '}
                <span className="btn-arrow" aria-hidden="true">↗</span>
              </Button>
              <Button
                as="link"
                href="/work"
                variant="secondary"
                size="lg"
              >
                View our work
              </Button>
            </div>
          </div>

          {/* ── Right: Visual column — ~55% viewport width, bleeds to edge ── */}
          <div
            className="hidden lg:flex flex-1 items-stretch relative -mr-[5rem]"
            aria-hidden="true"
          >
            <div className="hero-image-wrap w-full h-full min-h-[90vh] relative">
              <HeroVisual />
            </div>
          </div>

        </div>
      </div>

      {/* Mobile: visual sits below text block */}
      <div className="lg:hidden w-full aspect-[4/5] relative" aria-hidden="true">
        <div className="hero-image-wrap w-full h-full">
          <HeroVisual />
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="hero-scroll container-max pb-8 flex items-center gap-3"
        aria-hidden="true"
      >
        <span className="text-label-upper">Scroll to explore</span>
        <div className="w-8 h-px bg-[var(--color-border-strong)]" />
      </div>
    </section>
  )
}
