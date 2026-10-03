import Image from 'next/image'

/**
 * OverlapImage — overlaps the next section boundary by 40–80px,
 * bridging chapters with tangible physical presence.
 *
 * Usage:
 *   <OverlapImage src="..." alt="..." overlap={60} />
 *
 * The component uses negative bottom margin to push into the next chapter.
 * Wrap in a `relative` parent and ensure the next section has `z-0`.
 */

interface OverlapImageProps {
  src: string
  alt: string
  aspectRatio?: string
  overlap?: number
  priority?: boolean
  sizes?: string
  objectPosition?: string
  className?: string
}

export function OverlapImage({
  src,
  alt,
  aspectRatio = '16/9',
  overlap = 60,
  priority = false,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  objectPosition = 'center center',
  className = '',
}: OverlapImageProps) {
  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        aspectRatio,
        marginBottom: `-${overlap}px`,
        position: 'relative',
        zIndex: 1,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
        style={{ objectPosition }}
      />
    </div>
  )
}
