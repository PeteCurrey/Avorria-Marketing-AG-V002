'use client'

/**
 * HeroMedia — Right-panel media for the Hero section.
 *
 * The image arrives as a confident editorial composition.
 * No white-fade bleed — instead, a subtle shadow/vignette at the left
 * edge creates depth without apologising for the image being there.
 *
 * Desktop: hard architectural edge where text column meets media panel.
 *          A thin graphite rule (1px) separates the two columns.
 * Mobile:  top-edge dark vignette (image sits below text, naturally separated).
 */

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface HeroMediaProps {
  /** Path to poster image — served from /public */
  poster?: string
  /** Path to optional looping video */
  video?: string
  /** Alt text for poster */
  alt?: string
}

export function HeroMedia({
  poster = '/images/hero/hero-bg.jpg',
  video,
  alt = 'Avorria — Chicago river architectural twilight skyline',
}: HeroMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)

  // Attempt to play video if provided (respects reduced-motion via CSS)
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.play().catch(() => {
      // Autoplay blocked — poster remains visible
    })
    const handleCanPlay = () => setVideoReady(true)
    v.addEventListener('canplay', handleCanPlay)
    return () => v.removeEventListener('canplay', handleCanPlay)
  }, [])

  return (
    <div
      className="relative w-full h-full overflow-hidden hero-media-panel select-none"
      aria-hidden="true"
    >
      {/* ── Architectural photograph — confident, no apology ───────────────── */}
      <Image
        src={poster}
        alt={alt}
        fill
        priority
        sizes="(min-width: 1024px) 54vw, 100vw"
        className={[
          'object-cover hero-media-poster',
          videoReady ? 'opacity-0' : 'opacity-100',
          'transition-opacity duration-700',
        ].join(' ')}
        style={{ objectPosition: 'center center' }}
      />

      {/* ── Hard architectural edge — confident, no gradient dissolve ── */}

      {/* ── Optional Video ────────────────────────────────────────────────── */}
      {video && (
        <video
          ref={videoRef}
          src={video}
          muted
          playsInline
          loop
          className={[
            'absolute inset-0 w-full h-full object-cover hero-media-video',
            videoReady ? 'opacity-100' : 'opacity-0',
            'transition-opacity duration-700',
          ].join(' ')}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
