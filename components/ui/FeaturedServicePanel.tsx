import Image from 'next/image'
import Link from 'next/link'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { Eyebrow } from '@/components/ui/Eyebrow'

export interface FeaturedServicePanelProps {
  index: string
  label: string
  title: string
  statement: string
  deliverables: string[]
  proofMetric: { value: string; label: string }
  href: string
  image: string
  imageAlt: string
  accent?: 'cobalt' | 'coral' | 'chartreuse' | 'default'
}

/**
 * FeaturedServicePanel — Phase 2 Reusable Capability Presentation Panel
 *
 * Combines full-bleed edge photography with high-precision engineering typography.
 */
export function FeaturedServicePanel({
  index,
  label,
  title,
  statement,
  deliverables,
  proofMetric,
  href,
  image,
  imageAlt,
  accent = 'cobalt',
}: FeaturedServicePanelProps) {
  const accentBorderMap: Record<string, string> = {
    cobalt: 'border-[var(--color-cobalt)]',
    coral: 'border-[var(--color-coral)]',
    chartreuse: 'border-[var(--color-chartreuse)]',
    default: 'border-[var(--color-border-strong)]',
  }

  return (
    <article className="group relative w-full border border-[var(--color-border)] bg-white rounded-[var(--radius-card)] overflow-hidden transition-all duration-500 hover:border-[var(--color-graphite)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
        {/* Left: Narrative & Deliverables (7 cols) */}
        <div className="lg:col-span-7 p-8 md:p-12 lg:p-14 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <Eyebrow accent={accent} withDot className="mb-0">
                {index} // {label}
              </Eyebrow>
              <span className="text-[0.625rem] tracking-[0.2em] uppercase font-light text-[var(--color-graphite-muted)]">
                DISCIPLINE VERIFIED
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl lg:text-4xl font-extralight text-[var(--color-graphite)] tracking-[-0.02em] leading-tight mb-4">
              {title}
            </h3>

            <p className="text-sm md:text-base font-light text-[var(--color-graphite-mid)] leading-relaxed mb-8 max-w-xl">
              {statement}
            </p>

            {/* Deliverables List */}
            <div className="border-t border-[var(--color-border)] pt-6 mb-8">
              <p className="text-[0.625rem] tracking-[0.18em] uppercase font-light text-[var(--color-graphite-muted)] mb-3">
                CORE CAPABILITIES &amp; ARCHITECTURE
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-light text-[var(--color-graphite)]">
                {deliverables.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[var(--color-cobalt)]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Metric & CTA link */}
          <div className="pt-6 border-t border-[var(--color-border)] flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="block text-xl md:text-2xl font-extralight text-[var(--color-graphite)] leading-none">
                {proofMetric.value}
              </span>
              <span className="text-[10px] tracking-[0.14em] uppercase font-light text-[var(--color-graphite-muted)]">
                {proofMetric.label}
              </span>
            </div>

            <Link
              href={href}
              className="inline-flex items-center gap-2 text-xs font-light tracking-[0.12em] uppercase text-[var(--color-graphite)] hover:text-[var(--color-cobalt)] transition-colors group-hover:translate-x-1"
            >
              <span>Explore Capability</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Right: Rich Photography (5 cols) */}
        <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full bg-[var(--color-graphite)] overflow-hidden">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover object-center transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/50 via-transparent to-transparent pointer-events-none" />
          
          <div className="absolute top-4 right-4 text-[9px] tracking-[0.2em] uppercase font-light text-white/70 px-2 py-1 bg-black/40 backdrop-blur-sm border border-white/10 rounded-[var(--radius-xs)]">
            STAGE 0{index}
          </div>
        </div>
      </div>
    </article>
  )
}
