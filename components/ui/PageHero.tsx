import Image from 'next/image'
import Link from 'next/link'

/**
 * PageHero — Red Bull Digital Platform Inner Page Hero
 *
 * Full-screen dark media stage for inner pages:
 *   - Dark Obsidian ground (#000F1E)
 *   - Ambient Ken Burns zoom keyframes (`hero-kb-image`)
 *   - Multi-layer dark gradient overlay
 *   - Left text column: Pill Eyebrow -> H1 Display -> Standfirst -> Red Bull Pill CTAs
 *   - Negative margin-top calc(-1 * var(--nav-height, 68px)) to seamlessly underlay floating capsule nav
 *   - Work Sans 200/300 adherence (zero weights >= 500)
 */

interface HeadlineLine {
  before?: string
  accent?: string
  after?: string
}

interface PageHeroProps {
  /** Small eyebrow label e.g. "STUDIO / ABOUT" */
  eyebrow: string
  /** H1 content — one or more lines, each optionally with an accent */
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
  /** Section color chapter theme */
  theme?: 'graphite' | 'petrol' | 'wine'
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
      className="relative flex flex-col min-h-[100dvh] overflow-hidden bg-[#000F1E] text-white"
      style={{
        marginTop: 'calc(-1 * var(--nav-height, 68px))',
      }}
      data-chapter="hero"
      aria-labelledby="page-hero-heading"
    >
      {/* ── Background Media: Ken Burns Ambient Zoom ─────────────── */}
      <div className="absolute inset-0 z-0 hero-kb-image overflow-hidden" aria-hidden="true">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          style={{ filter: 'brightness(0.6) contrast(1.1)' }}
        />
        {/* Multi-layer Gradient Scrim for AAA Text Legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(0,15,30,0.92) 0%, rgba(0,15,30,0.8) 45%, rgba(0,15,30,0.4) 75%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, #000F1E 0%, rgba(0,15,30,0.7) 25%, transparent 60%)',
          }}
        />
      </div>

      {/* ── Content Container ────────────────────────────────────── */}
      <div
        className="relative z-10 flex flex-col justify-between w-full lg:w-[58%] min-h-[100dvh] mx-auto max-w-[1920px]"
        style={{
          paddingInline: 'clamp(1.25rem, 5vw, 5rem)',
          paddingTop: 'clamp(7rem, 15vh, 10rem)',
          paddingBottom: 'clamp(3rem, 8vh, 5rem)',
        }}
      >
        <div className="my-auto">
          {/* Eyebrow Pill */}
          <div className="mb-5 sm:mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[0.6875rem] uppercase tracking-[0.16em] font-light text-white bg-white/10 backdrop-blur-md border border-white/15">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cobalt, #3157FF)]" aria-hidden="true" />
              {eyebrow}
            </span>
          </div>

          {/* Monumental Headline */}
          <h1
            id="page-hero-heading"
            className="font-extralight uppercase leading-[0.98] mb-6 sm:mb-8"
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 6rem)',
              letterSpacing: '-0.03em',
            }}
          >
            {headline.map((line, i) => (
              <span key={i} className="block">
                {line.before && <span>{line.before} </span>}
                {line.accent && (
                  <span className="text-[var(--color-cobalt, #3157FF)]">
                    {line.accent}
                  </span>
                )}
                {line.after && <span> {line.after}</span>}
              </span>
            ))}
          </h1>

          {/* Standfirst Body */}
          <p
            className="font-light text-white/75 text-base sm:text-lg mb-8 sm:mb-10 max-w-[50ch] leading-relaxed"
          >
            {body}
          </p>

          {/* Red Bull Pill Button CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={primaryCta.href}
              className="rb-pill-btn rb-pill-btn-primary group"
              style={{ padding: '0.65rem 1.6rem', fontSize: '0.875rem' }}
            >
              {primaryCta.label}
              <span
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </Link>

            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="rb-pill-btn rb-pill-btn-tertiary"
                style={{ padding: '0.65rem 1.4rem', fontSize: '0.875rem' }}
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="hidden lg:flex items-center gap-3 pt-6" aria-hidden="true">
          <div className="flex items-center justify-center w-7 h-7 rounded-full border border-white/20 text-white/50 text-xs">
            ↓
          </div>
          <span className="text-[0.625rem] tracking-[0.16em] uppercase font-light text-white/40">
            Scroll to explore
          </span>
        </div>
      </div>

      {/* ── Bottom Metadata Strip ─────────────────────────────────── */}
      {(metaLeft || metaRight) && (
        <div
          className="relative z-10 w-full border-t border-white/10 py-4 flex items-center justify-between text-[0.6875rem] tracking-[0.14em] uppercase font-light text-white/40"
          style={{ paddingInline: 'clamp(1.25rem, 5vw, 5rem)' }}
        >
          {metaLeft && (
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cobalt, #3157FF)]" />
              {metaLeft}
            </span>
          )}
          {metaRight && <span>{metaRight}</span>}
        </div>
      )}
    </section>
  )
}
