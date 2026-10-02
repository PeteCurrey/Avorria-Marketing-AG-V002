'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface ReelItem {
  src: string
  alt: string
  title: string
  discipline: string
  sector: string
}

const REEL_ITEMS: ReelItem[] = [
  {
    src: '/images/projects/alkota-bikes/hero-screenshot.png',
    alt: 'Alkota Bikes bespoke titanium 3D WebGL flagship platform',
    title: 'ALKOTA BIKES',
    discipline: 'BESPOKE 3D WEBGL FLAGSHIP',
    sector: 'PRECISION CYCLING',
  },
  {
    src: '/images/projects/drawdown/hero.png',
    alt: 'Drawdown.Trading low-latency quantitative risk terminal',
    title: 'DRAWDOWN.TRADING',
    discipline: 'SUB-MILLISECOND RISK TERMINAL',
    sector: 'FINANCIAL QUANTITATIVE',
  },
  {
    src: '/images/projects/tafm/hero-screenshot.png',
    alt: 'The Asset Finance Marketplace structured commercial platform',
    title: 'TAFM',
    discipline: 'MARKETPLACE INFRASTRUCTURE',
    sector: 'COMMERCIAL ASSET FINANCE',
  },
]

export function HeroMedia() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % REEL_ITEMS.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  const current = REEL_ITEMS[activeIndex]

  return (
    <div
      className="relative w-full h-full overflow-hidden hero-media-panel select-none bg-[#121110]"
      aria-hidden="true"
    >
      {/* ── Layered Verified Project Images with Ambient Crossfade ── */}
      {REEL_ITEMS.map((item, idx) => (
        <div
          key={item.src}
          className={[
            'absolute inset-0 transition-all duration-1000 ease-out',
            idx === activeIndex
              ? 'opacity-100 scale-100 z-10'
              : 'opacity-0 scale-[1.02] z-0 pointer-events-none',
          ].join(' ')}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            priority={idx === 0}
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="object-cover object-center"
          />
        </div>
      ))}

      {/* ── Soft Architectural Vignette & Editorial Tint ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-20" />

      {/* ── White left-edge fade — blends into white text column on desktop ── */}
      <div
        className="absolute inset-y-0 left-0 pointer-events-none hidden lg:block z-20"
        style={{
          width: '24%',
          background: 'linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0) 100%)',
        }}
      />

      {/* ── White top-edge fade on mobile ── */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-none lg:hidden z-20"
        style={{
          height: '25%',
          background: 'linear-gradient(to bottom, #ffffff 0%, rgba(255,255,255,0) 100%)',
        }}
      />

      {/* ── Cinematic Bottom Caption Bar ── */}
      <div className="absolute bottom-6 left-8 right-8 z-30 flex items-center justify-between text-[0.625rem] tracking-[0.16em] uppercase font-light text-white/80 border-t border-white/20 pt-3">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-rose-text)] animate-pulse" />
          <span>VERIFIED PRODUCTION WORK // {current.title}</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-white/50">{current.discipline}</span>
          <div className="flex items-center gap-1.5">
            {REEL_ITEMS.map((_, i) => (
              <span
                key={i}
                className={[
                  'h-1 transition-all duration-500 rounded-full',
                  i === activeIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/30',
                ].join(' ')}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
