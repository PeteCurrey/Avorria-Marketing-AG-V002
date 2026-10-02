'use client'

/**
 * ProjectMedia — Unified media renderer for all project visuals
 *
 * Handles:
 *   - Static images via next/image (<picture> with AVIF/WebP)
 *   - Short video clips: muted autoplay loop playsInline
 *   - prefers-reduced-motion: video shows poster still, no autoplay
 *   - fill layout (for cards/hero) or contained (fixed width/height)
 *   - Graceful: always falls back to MediaPlaceholder when src is absent
 *
 * Usage (fill — for hero / work cards):
 *   <ProjectMedia src="/images/projects/alkota/thumbnail.webp" alt="..." fill priority />
 *
 * Usage (video):
 *   <ProjectMedia type="video" src="/clips/alkota.mp4" poster="/images/alkota-poster.webp" alt="..." fill />
 */

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface BaseProps {
  alt: string
  className?: string
  /** Priority-load (LCP candidate) — use for hero only */
  priority?: boolean
  /** Sizes attribute for responsive images */
  sizes?: string
  /** Optional overlay content (project title, category label) */
  overlay?: React.ReactNode
}

interface FillImageProps extends BaseProps {
  type?: 'image'
  src: string
  srcAvif?: string
  fill: true
  width?: never
  height?: never
  poster?: never
}

interface ContainedImageProps extends BaseProps {
  type?: 'image'
  src: string
  srcAvif?: never
  fill?: false
  width: number
  height: number
  poster?: never
}

interface VideoProps extends BaseProps {
  type: 'video'
  src: string
  poster: string
  fill: true
  width?: never
  height?: never
  srcAvif?: never
}

type ProjectMediaProps = FillImageProps | ContainedImageProps | VideoProps

export function ProjectMedia(props: ProjectMediaProps) {
  const { alt, className = '', priority = false, sizes, overlay } = props

  if (props.type === 'video') {
    return (
      <VideoMedia
        src={props.src}
        poster={props.poster}
        alt={alt}
        className={className}
        overlay={overlay}
      />
    )
  }

  // Image
  if (props.fill) {
    return (
      <div className={`relative w-full h-full ${className}`}>
        <Image
          src={props.src}
          alt={alt}
          fill
          priority={priority}
          fetchPriority={priority ? 'high' : 'auto'}
          sizes={sizes ?? '(min-width: 1024px) 55vw, 100vw'}
          className="object-cover object-center"
          loading={priority ? 'eager' : 'lazy'}
        />
        {overlay && (
          <div className="absolute inset-0 z-10 pointer-events-none">
            {overlay}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        src={props.src}
        alt={alt}
        width={props.width}
        height={props.height}
        priority={priority}
        sizes={sizes}
        className="w-full h-auto"
        loading={priority ? 'eager' : 'lazy'}
      />
      {overlay && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {overlay}
        </div>
      )}
    </div>
  )
}

// ─── Video sub-component ────────────────────────────────────────────────────

interface VideoMediaProps {
  src: string
  poster: string
  alt: string
  className?: string
  overlay?: React.ReactNode
}

function VideoMedia({ src, poster, alt, className = '', overlay }: VideoMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // When reduced motion: show poster still image instead
  if (reducedMotion) {
    return (
      <div className={`relative w-full h-full ${className}`}>
        <Image
          src={poster}
          alt={alt}
          fill
          className="object-cover object-center"
          loading="lazy"
          sizes="(min-width: 1024px) 55vw, 100vw"
        />
        {overlay && (
          <div className="absolute inset-0 z-10 pointer-events-none">{overlay}</div>
        )}
      </div>
    )
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        autoPlay
        loop
        playsInline
        preload="none"
        aria-label={alt}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {overlay && (
        <div className="absolute inset-0 z-10 pointer-events-none">{overlay}</div>
      )}
    </div>
  )
}
