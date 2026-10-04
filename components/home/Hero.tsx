import { Button } from '@/components/ui/Button'
import { HeroMedia } from './HeroMedia'

/**
 * Hero — Aurora Spec (Visual Elevation)
 *
 * Layout:
 *   - Header overlays the hero (Navigation is fixed/absolute, z-50)
 *   - Left text column: ~44% width, inset pl-[7vw], vertically centred
 *   - Right media panel: ~56% width, full-bleed to top, right, bottom edges
 *   - The section is min-h-screen (100dvh) to fill the viewport
 *   - A 1px vertical rule on desktop separates the two columns (architectural)
 *
 * Type:
 *   - Eyebrow: cobalt dot + uppercase, tracked, Work Sans 300
 *   - H1: clamp(3rem, 6.2vw, 6.5rem), line-height 1.04, weight 200
 *   - "work." italic weight 200 in rose
 *
 * Motion (gated on .js class — content always visible without JS):
 *   - Eyebrow: fade-up 0ms
 *   - H1: line-by-line mask reveal, 80/160/240ms stagger
 *   - Paragraph: fade-up 360ms
 *   - CTAs: fade-up 440ms
 *   - Scroll cue: fade-up 800ms
 *   - Media panel: slow scale 1.04 → 1.0 over 1.4s
 *
 * LCP: H1 is LCP candidate. Never starts at opacity:0.
 *      .line-inner slides from translateY(100%) inside overflow:hidden container.
 */
export function Hero() {
  return (
    <section
      className="-mt-16 md:-mt-20 relative flex flex-col lg:flex-row min-h-[100dvh] overflow-hidden bg-[var(--color-ivory)]"
      data-chapter="ivory"
      aria-labelledby="hero-heading"
    >
      {/* ── Left: Text column ───────────────────────────────────────────────── */}
      {/* pl-[7vw] inset per Aurora spec; pr gives breathing room before media */}
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
          {/* Eyebrow — cobalt dot + tracked label */}
          <p
            className={[
              'hero-eyebrow mb-5',
              'flex items-center gap-2.5',
              'text-[0.6875rem] tracking-[0.18em] uppercase font-light',
              'text-[var(--color-graphite-mid)]',
            ].join(' ')}
          >
            {/* Cobalt pulse dot — small creative navigation detail */}
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse"
              style={{ backgroundColor: 'var(--color-accent)' }}
              aria-hidden="true"
            />
            DIGITAL PRODUCTS · SYSTEMS · INTELLIGENCE
          </p>

          {/* H1 — line-by-line mask reveal.
              Each .line-mask is overflow:hidden; .line-inner slides up from 100%.
              H1 element itself is never opacity:0 — safe as LCP candidate. */}
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
              <span className="line-inner block">Websites and</span>
            </span>
            <span className="line-mask hero-line-2">
              <span className="line-inner block">systems built</span>
            </span>
            <span className="line-mask hero-line-3">
              <span className="line-inner block">
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

          {/* Supporting paragraph — max 46ch, Graphite Mid, 18px, weight 300 */}
          <p
            className={[
              'hero-para mb-8',
              'font-light text-[var(--color-graphite-mid)]',
              'max-w-[46ch]',
            ].join(' ')}
            style={{ fontSize: '1.125rem', lineHeight: 1.6 }}
          >
            Avorria designs and builds digital products, intelligent systems
            and high-performance websites for ambitious businesses.
          </p>

          {/* CTAs — side by side per Aurora */}
          <div className="hero-ctas flex flex-row flex-wrap gap-4">
            <Button as="link" href="/start-a-project" variant="primary" size="lg">
              Start a project{' '}
              <span className="btn-arrow" aria-hidden="true">↗</span>
            </Button>
            <Button as="link" href="/work" variant="secondary" size="lg">
              View our work
            </Button>
          </div>
        </div>

        {/* ── Scroll cue — bottom-left, aligned to pl-[7vw] ─────────────── */}
        <div
          className="hero-scroll hidden lg:flex items-center gap-3 pt-4"
          aria-hidden="true"
        >
          {/* Circular arrow — mimics Aurora's circular down-arrow button */}
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
          <span
            className="text-[0.625rem] tracking-[0.18em] uppercase font-light text-[var(--color-graphite-muted)]"
          >
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
      {/* On desktop: absolutely positioned to fill the right ~56% of viewport,
          stretching from top:0 to bottom:0, flushed to the right edge. */}
      <div
        className="hidden lg:block absolute top-0 right-0 bottom-0"
        style={{ left: '46%' }}
        aria-hidden="true"
      >
        <HeroMedia />
      </div>
    </section>
  )
}
