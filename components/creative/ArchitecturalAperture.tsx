import React from 'react'
import { TechnicalAnnotation } from './TechnicalAnnotation'

interface ArchitecturalApertureProps {
  children: React.ReactNode
  aspectRatio?: '21/9' | '16/9' | '4/3' | '1/1' | '16/5'
  caption?: string
  figureNumber?: string
  spec?: string
  coordinate?: string
  className?: string
}

/**
 * Creative Device 01: Editorial Image Cropping & The Precision Media Plate
 * Architecturally cropped media container framed with fine-line tick marks and blueprint metadata.
 */
export function ArchitecturalAperture({
  children,
  aspectRatio = '16/9',
  caption,
  figureNumber,
  spec,
  coordinate,
  className = '',
}: ArchitecturalApertureProps) {
  const ratioClasses = {
    '21/9': 'aspect-[21/9]',
    '16/9': 'aspect-[16/9]',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
    '16/5': 'aspect-[16/5]',
  }[aspectRatio]

  return (
    <figure className={`relative group ${className}`}>
      {/* Container with hairline border & corner accents */}
      <div className="relative border border-[var(--color-border)] p-1.5 bg-[var(--color-ivory-dark)] transition-colors duration-[var(--duration-base)]">
        {/* Subtle corner ticks */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--color-graphite-mid)] z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--color-graphite-mid)] z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--color-graphite-mid)] z-10 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--color-graphite-mid)] z-10 pointer-events-none" />

        {/* Media Frame */}
        <div className={`relative w-full overflow-hidden ${ratioClasses} bg-[var(--color-graphite)]`}>
          <div className="w-full h-full transition-transform duration-[var(--duration-image)] ease-[var(--ease-out)] group-hover:scale-[1.02]">
            {children}
          </div>
        </div>
      </div>

      {/* Metadata caption strip */}
      {(caption || figureNumber) && (
        <figcaption className="flex flex-wrap items-center justify-between gap-3 mt-3 px-1 text-[var(--text-label)] font-light text-[var(--color-graphite-mid)]">
          <div className="flex items-center gap-2">
            {figureNumber && (
              <span className="font-mono text-[var(--color-graphite)] uppercase">
                [{figureNumber}]
              </span>
            )}
            {caption && <span>{caption}</span>}
          </div>
          {(spec || coordinate) && (
            <TechnicalAnnotation label="PLATE" spec={spec} coordinate={coordinate} />
          )}
        </figcaption>
      )}
    </figure>
  )
}
