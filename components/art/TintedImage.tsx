import Image from 'next/image'

/**
 * TintedImage — duotone / colour-graded image treatment.
 *
 * Uses SVG feColorMatrix filters to grade photography into the Avorria
 * palette (rose, bronze, wine, petrol) without requiring pre-graded assets.
 *
 * Each tint applies:
 * 1. A desaturate step (feColorMatrix type="saturate" values="0.15")
 * 2. A colour matrix shift into the target palette
 * 3. A multiply blend overlay div for warmth
 *
 * Usage:
 *   <TintedImage src="..." alt="..." tint="rose" opacity={0.4} />
 */

type TintColor = 'rose' | 'bronze' | 'wine' | 'petrol'

interface TintedImageProps {
  src: string
  alt: string
  tint?: TintColor
  tintOpacity?: number
  aspectRatio?: string
  priority?: boolean
  sizes?: string
  objectPosition?: string
  className?: string
}

const TINT_OVERLAYS: Record<TintColor, string> = {
  rose:   'rgba(181, 97, 106, 0.35)',
  bronze: 'rgba(164, 117, 81, 0.35)',
  wine:   'rgba(74, 31, 39, 0.5)',
  petrol: 'rgba(23, 53, 58, 0.5)',
}

export function TintedImage({
  src,
  alt,
  tint = 'rose',
  tintOpacity = 1,
  aspectRatio = '16/9',
  priority = false,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  objectPosition = 'center center',
  className = '',
}: TintedImageProps) {
  const filterId = `tint-${tint}`
  const overlayColor = TINT_OVERLAYS[tint]

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      {/* SVG filter definition */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <filter id={filterId}>
            <feColorMatrix type="saturate" values="0.2" />
          </filter>
        </defs>
      </svg>

      {/* Desaturated image */}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
        style={{
          objectPosition,
          filter: `url(#${filterId})`,
        }}
      />

      {/* Colour tint overlay using mix-blend-mode: multiply */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: overlayColor,
          opacity: tintOpacity,
          mixBlendMode: 'multiply',
        }}
        aria-hidden="true"
      />
    </div>
  )
}
