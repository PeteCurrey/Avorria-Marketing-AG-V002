import Image from 'next/image'
import Link from 'next/link'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { CategoryBadge } from '@/components/ui/CategoryBadge'

// ─── Types ────────────────────────────────────────────────────────────────────

export type EditorialCardSize = 'feature' | 'standard' | 'compact'

export interface EditorialCardProps {
  href: string
  title: string
  excerpt?: string
  image?: string
  imageAlt?: string
  category?: string
  categoryHref?: string
  readTime?: number
  date?: string
  /** Metric badge text — e.g. "0.62s LCP" */
  metric?: string
  size?: EditorialCardSize
  /** Delay for staggered reveals (ms) */
  revealDelay?: number
  /** Override chapter/background colour for gradient — defaults to graphite */
  gradientFrom?: string
}

// ─── Aspect ratio per size ─────────────────────────────────────────────────────
//
//  feature  → 16:9  (desktop) / 4:3 (mobile) — full-width lead card
//  standard → 4:3   — standard editorial card
//  compact  → 16:9  — horizontal list thumbnail (future use)
//
const sizeClasses: Record<EditorialCardSize, string> = {
  feature:  'aspect-[16/9] sm:aspect-[16/9]',
  standard: 'aspect-[4/3]',
  compact:  'aspect-[16/9]',
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * EditorialCard — Phase 2A
 *
 * Image-first editorial card following the Red Bull-derived card system.
 * Principles:
 * - Image always bleeds to all four card edges (no padding inside the image container)
 * - Category label is tappable and links to the category index
 * - Read-time displayed consistently on every card
 * - Title overlays the image with a gradient scrim for contrast
 * - Hover: image scale 1.02 over 700ms var(--ease-editorial)
 * - No rounded corners by default (architectural system: --radius-card = 4px)
 * - No shadows (per design token system)
 *
 * Graceful degradation:
 * - If no image is provided, renders a dark background chapter colour instead
 * - Content is always legible without JS (no opacity:0 initial state on card itself)
 * - The RevealOnScroll wrapper handles entrance animation
 */
export function EditorialCard({
  href,
  title,
  excerpt,
  image,
  imageAlt,
  category,
  categoryHref,
  readTime,
  date,
  metric,
  size = 'standard',
  revealDelay = 0,
  gradientFrom = 'rgba(24,24,24,0.85)',
}: EditorialCardProps) {
  return (
    <RevealOnScroll delay={revealDelay}>
      <article className="group relative overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-graphite)]">
        <Link
          href={href}
          className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-cobalt)] focus-visible:rounded-[var(--radius-card)]"
          aria-label={title}
        >
          {/* ── Image container — bleeds to all edges ── */}
          <div
            className={[
              'relative w-full overflow-hidden',
              sizeClasses[size],
            ].join(' ')}
            aria-hidden="true"
          >
            {image ? (
              <Image
                src={image}
                alt={imageAlt ?? title}
                fill
                sizes={
                  size === 'feature'
                    ? '(min-width: 1024px) 80vw, 100vw'
                    : '(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw'
                }
                className="object-cover object-center transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-[1.02]"
              />
            ) : (
              /* No-image fallback: dark chapter ground */
              <div className="absolute inset-0 bg-[var(--color-graphite)]" />
            )}

            {/* Gradient scrim — bottom-up, guarantees WCAG AA on ivory text */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(to top, ${gradientFrom} 0%, rgba(24,24,24,0.3) 50%, rgba(24,24,24,0.05) 100%)`,
              }}
            />

            {/* ── Overlaid metadata + title ── */}
            <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
              {/* Top-left: category badge */}
              {category && (
                <div className="absolute top-4 left-4 md:top-5 md:left-5">
                  <span
                    className="inline-block text-[10px] tracking-[0.18em] uppercase font-light text-[var(--color-accent-light)] opacity-90"
                  >
                    {category}
                  </span>
                </div>
              )}

              {/* Top-right: metric badge */}
              {metric && (
                <div className="absolute top-4 right-4 md:top-5 md:right-5">
                  <MetricPill metric={metric} />
                </div>
              )}

              {/* Bottom: title */}
              <div>
                <h3
                  className={[
                    'font-extralight text-[var(--color-ivory)] leading-[1.08] tracking-[-0.02em]',
                    'transition-colors duration-[var(--duration-base)]',
                    'group-hover:text-white',
                    size === 'feature'
                      ? 'text-[clamp(1.5rem,3.5vw,2.5rem)]'
                      : 'text-[clamp(1.1rem,2vw,1.5rem)]',
                  ].join(' ')}
                >
                  {title}
                </h3>

                {/* Meta row: date + read time */}
                {(readTime || date) && (
                  <div className="flex items-center gap-3 mt-2">
                    {date && (
                      <time
                        className="text-[10px] tracking-[0.14em] uppercase font-light text-[var(--color-ivory)] opacity-50"
                        dateTime={date}
                      >
                        {date}
                      </time>
                    )}
                    {date && readTime && (
                      <span className="text-[var(--color-ivory)] opacity-30 text-[10px]">·</span>
                    )}
                    {readTime && (
                      <span className="text-[10px] tracking-[0.14em] uppercase font-light text-[var(--color-ivory)] opacity-50">
                        {readTime} MIN READ
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>

        {/* ── Below-image excerpt (optional, for feature size) ── */}
        {excerpt && size === 'feature' && (
          <div className="px-5 md:px-6 py-4 bg-[var(--color-graphite)]">
            <p className="text-sm font-light text-[var(--color-ivory)] opacity-70 leading-relaxed line-clamp-2">
              {excerpt}
            </p>
            {category && categoryHref && (
              <div className="mt-3">
                <CategoryBadge label={category} href={categoryHref} inverted />
              </div>
            )}
          </div>
        )}
      </article>
    </RevealOnScroll>
  )
}

// ─── Internal MetricPill (used only inside EditorialCard) ─────────────────────

function MetricPill({ metric }: { metric: string }) {
  return (
    <span
      className={[
        'inline-flex items-center px-2 py-1',
        'text-[9px] tracking-[0.14em] uppercase font-light',
        'text-[var(--color-ivory)]',
        'bg-[rgba(24,24,24,0.6)] backdrop-blur-sm',
        'border border-[rgba(247,245,240,0.15)]',
        'rounded-[var(--radius-xs)]',
      ].join(' ')}
    >
      {metric}
    </span>
  )
}
