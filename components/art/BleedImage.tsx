import Image from 'next/image'
import type { ComponentPropsWithoutRef } from 'react'

/**
 * BleedImage — breaks the container to run edge-to-edge or edge-to-gutter.
 * The image is a confident rectangular plate; no dissolve gradients.
 *
 * Usage:
 *   <BleedImage src="/images/hero.jpg" alt="..." aspectRatio="16/9" />
 */

interface BleedImageProps {
  src: string
  alt: string
  aspectRatio?: string
  priority?: boolean
  sizes?: string
  objectPosition?: string
  className?: string
}

export function BleedImage({
  src,
  alt,
  aspectRatio = '16/9',
  priority = false,
  sizes = '100vw',
  objectPosition = 'center center',
  className = '',
}: BleedImageProps) {
  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition-transform duration-700 hover:scale-[1.02]"
        style={{ objectPosition }}
      />
    </div>
  )
}
