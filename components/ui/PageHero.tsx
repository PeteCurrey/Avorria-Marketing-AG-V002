import Image from 'next/image'
import Link from 'next/link'

/**
 * PageHero — Full-screen dark hero for inner pages.
 *
 * Layout mirrors the home Hero spec:
 *   - Dark graphite ground (#1A1916)
 *   - Full-bleed background image with gradient overlay (right half on desktop, full on mobile)
 *   - Left text column: eyebrow → H1 (with optional italic rose accent) → body → CTAs → scroll cue
 *   - Metadata strip pinned to bottom of section
 *   - min-h-[100dvh], -mt-16 md:-mt-20 to underlay fixed nav
 *
 * Type rules (CI enforced):
 *   - H1: font-extralight (200), clamp scale, tight tracking
 *   - Body/labels: font-light (300)
 *   - CI rule: weights above 300 are forbidden — no bold, semibold, or medium
 */

interface HeadlineLine {
  before?: string
  accent?: string   // italic rose word(s)
  after?: string
}

interface PageHeroProps {
  /** Small eyebrow label e.g. "STUDIO / ABOUT" */
  eyebrow: string
  /** H1 content — one or more lines, each optionally with a rose italic accent */
  headline: HeadlineLine[]
  /** Supporting paragraph below the H1 */
  body: string
  /** Primary CTA button */
  primaryCta: { label: string; href: string }
  /** Optional secondary CTA */
  secondaryCta?: { label: string; href: string }
  /** Background image path (from /public) */
  image: string
  /** Image alt text */
  imageAlt: string
  /** Bottom metadata strip — left label */
  metaLeft?: string
  /** Bottom metadata strip — right label */
  metaRight?: string
}

export function PageHero({
  eyebrow,
  headline,
  body,
  primaryCta,
  secondaryCta,
  image,
  imageAlt,
  metaLeft,
  metaRight,
}: PageHeroProps) {
  return (
    <section
      className="-mt-16 md:-mt-20 relative flex flex-col min-h-[100dvh] overflow-hidden"
      style={{ backgroundColor: 'var(--color-graphite)' }}
      aria-labelledby="page-hero-heading"
    >
      {/* ── Full-bleed background image ──────────────────────────────────────── */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        {/* Gradient: left heavy on desktop so text column is legible; full overlay on mobile */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              'linear-gradient(to right, rgba(26,25,22,0.95) 0%, rgba(26,25,22,0.85) 46%, rgba(26,25,22,0.45) 70%, rgba(26,25,22,0.25) 100%)',
            ].join(''),
          }}
        />
        {/* Bottom fade — ensures metadata strip reads cleanly */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(26,25,22,0.9) 0%, transparent 100%)' }}
        />
      </div>

      {/* ── Text column ─────────────────────────────────────────────────────── */}
      <div
        className={[
          'relative z-10 flex flex-col justify-between',
          'w-full lg:w-[52%] min-h-[100dvh]',
          'pl-[7vw] pr-8 lg:pr-12',
          'pt-36 pb-24 lg:pt-44 lg:pb-28',
        ].join(' ')}
      >
        <div className="my-auto">
          {/* Eyebrow */}
          <p className="text-[0.6875rem] tracking-[0.22em] uppercase font-light mb-6"
            style={{ color: 'rgba(255,255,255,0.5)' }}>
            {eyebrow}
          </p>

          {/* H1 */}
          <h1
            id="page-hero-heading"
            className="font-extralight mb-8"
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 6.25rem)',
              lineHeight: 1.04,
              letterSpacing: '-0.025em',
              color: '#FFFFFF',
            }}
          >
            {headline.map((line, i) => (
              <span key={i} className="block">
                {line.before && <span>{line.before} </span>}
                {line.accent && (
                  <em
                    className="not-italic italic font-extralight"
                    style={{ color: 'var(--color-rose-text)' }}
                  >
                    {line.accent}
                  </em>
                )}
                {line.after && <span> {line.after}</span>}
              </span>
            ))}
          </h1>

          {/* Body */}
          <p
            className="font-light mb-10 max-w-[46ch]"
            style={{
              fontSize: '1.125rem',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.65)',
            }}
          >
            {body}
          </p>

          {/* CTAs */}
          <div className="flex flex-row flex-wrap gap-4">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-light tracking-[0.06em] uppercase transition-colors duration-200"
              style={{
                backgroundColor: '#FFFFFF',
                color: 'var(--color-graphite)',
              }}
            >
              {primaryCta.label}
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-light tracking-[0.06em] uppercase border transition-colors duration-200"
                style={{
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: 'rgba(255,255,255,0.8)',
                }}
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="hidden lg:flex items-center gap-3 pt-4" aria-hidden="true">
          <div
            className="flex items-center justify-center w-8 h-8 rounded-full"
            style={{ border: '1px solid rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}
          >
            ↓
          </div>
          <span className="text-[0.625rem] tracking-[0.18em] uppercase font-light"
            style={{ color: 'rgba(255,255,255,0.4)' }}>
            Scroll to explore
          </span>
        </div>
      </div>

      {/* ── Bottom metadata strip ────────────────────────────────────────────── */}
      {(metaLeft || metaRight) && (
        <div
          className="absolute bottom-0 inset-x-0 z-10 px-[7vw] py-5 flex items-center justify-between"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          {metaLeft && (
            <span className="text-[10px] tracking-[0.18em] uppercase font-light flex items-center gap-2"
              style={{ color: 'rgba(255,255,255,0.35)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-rose-text)' }} />
              {metaLeft}
            </span>
          )}
          {metaRight && (
            <span className="text-[10px] tracking-[0.18em] uppercase font-light"
              style={{ color: 'rgba(255,255,255,0.35)' }}>
              {metaRight}
            </span>
          )}
        </div>
      )}
    </section>
  )
}
