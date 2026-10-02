'use client'

/**
 * CaseStudyGallery — Multi-artefact visual inspection gallery
 *
 * Renders verified visual evidence artefacts with:
 * - Architectural figure captions & registration ticks
 * - Technical specification tags
 * - Provenance stamps
 * - High-resolution responsive next/image rendering
 */

import Image from 'next/image'
import type { MediaAsset } from '@/types/media'

interface CaseStudyGalleryProps {
  items: MediaAsset[]
  className?: string
}

export function CaseStudyGallery({ items, className = '' }: CaseStudyGalleryProps) {
  if (!items || items.length === 0) return null

  return (
    <section className={`my-16 space-y-16 ${className}`} aria-label="Visual Evidence Gallery">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
        <span className="text-[10px] tracking-[0.2em] uppercase font-light text-[var(--color-graphite-muted)]">
          VERIFIED VISUAL ARTEFACTS // {items.length} EXHIBITS
        </span>
        <span className="text-[10px] tracking-[0.16em] uppercase font-light text-[var(--color-rose-text)]">
          PROD-EVIDENCE-PASS
        </span>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {items.map((item, idx) => (
          <figure
            key={`${item.src}-${idx}`}
            className="group relative border border-[var(--color-border)] bg-[var(--color-ivory-light)] p-4 md:p-6 transition-all duration-300 hover:border-[var(--color-border-strong)]"
          >
            {/* Top Telemetry Row */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--color-border)] text-[10px] tracking-[0.18em] uppercase text-[var(--color-graphite-muted)] font-light">
              <span className="text-[var(--color-rose-text)]">{item.figureNumber || `EXHIBIT 0${idx + 1}`}</span>
              <span>{item.spec || 'PRODUCTION VERIFIED SPEC'}</span>
            </div>

            {/* Media Plate */}
            <div className="relative w-full aspect-[16/9] bg-[#121110] overflow-hidden border border-[var(--color-border)] mb-4">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.01]"
              />
              {/* Subtle edge vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Caption & Provenance */}
            <figcaption className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-3 pt-2">
              <p className="text-xs md:text-sm font-light text-[var(--color-graphite)] max-w-[70ch] leading-relaxed">
                {item.caption || item.alt}
              </p>
              <span className="text-[9px] tracking-[0.16em] uppercase font-light text-[var(--color-graphite-muted)] shrink-0 border border-[var(--color-border)] px-2 py-0.5">
                {item.provenance}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
