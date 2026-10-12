import Image from 'next/image'
import Link from 'next/link'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { MetricBadge } from '@/components/ui/MetricBadge'

export interface CaseStudyFeatureProps {
  title: string
  client: string
  sector: string
  statement: string
  metrics: Array<{ value: string; label: string }>
  image: string
  imageAlt: string
  href: string
  aspectRatio?: '21/9' | '16/9'
}

/**
 * CaseStudyFeature — Phase 2 Monumental Case Study Card
 *
 * Full-width cinematic editorial presentation with image-bleed design,
 * architectural annotation, and high-impact proof metrics.
 */
export function CaseStudyFeature({
  title,
  client,
  sector,
  statement,
  metrics,
  image,
  imageAlt,
  href,
  aspectRatio = '21/9',
}: CaseStudyFeatureProps) {
  return (
    <RevealOnScroll>
      <article className="group relative w-full overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-graphite)] border border-white/10">
        <Link
          href={href}
          className="relative block w-full overflow-hidden"
          style={{ aspectRatio }}
          aria-label={`View ${client} case study`}
        >
          {/* Main Visual */}
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 85vw, 100vw"
            className="object-cover object-center transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-[1.02]"
          />

          {/* Deep Architectural Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 pointer-events-none" />

          {/* Top Registration Bar */}
          <div className="absolute top-5 left-6 right-6 flex items-center justify-between text-[10px] tracking-[0.2em] uppercase font-light text-white/80">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cobalt)]" aria-hidden="true" />
              <span>{client} · {sector}</span>
            </div>
            <span className="hidden sm:inline-block border border-white/20 px-2 py-0.5 rounded-[var(--radius-xs)]">
              FEATURE CASE
            </span>
          </div>

          {/* Bottom Overlaid Information */}
          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-[var(--color-ivory)] tracking-[-0.02em] leading-tight mb-2 group-hover:text-white transition-colors">
                {title}
              </h3>
              <p className="text-xs sm:text-sm font-light text-white/70 max-w-xl line-clamp-2">
                {statement}
              </p>
            </div>

            {/* Metrics Cluster */}
            <div className="flex flex-wrap items-center gap-3">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/15 rounded-[var(--radius-xs)] text-left"
                >
                  <span className="block text-sm md:text-base font-extralight text-white leading-none">
                    {m.value}
                  </span>
                  <span className="text-[9px] tracking-[0.14em] uppercase font-light text-white/60">
                    {m.label}
                  </span>
                </div>
              ))}
              <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full border border-white/30 text-white group-hover:border-white group-hover:bg-white group-hover:text-[var(--color-graphite)] transition-all">
                ↗
              </div>
            </div>
          </div>
        </Link>
      </article>
    </RevealOnScroll>
  )
}
