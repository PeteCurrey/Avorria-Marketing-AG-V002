import Image from 'next/image'
import Link from 'next/link'

export function LobbyHero() {
  return (
    <section
      className="-mt-16 md:-mt-20 relative flex flex-col justify-end min-h-[100svh] w-full overflow-hidden"
      data-chapter="photographic"
      aria-labelledby="lobby-hero-heading"
    >
      {/* ── Full-Bleed Editorial Plate — confident, no apology ── */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none" aria-hidden="true">
        <Image
          src="/images/hero/hero-bg.jpg"
          alt="Avorria — Modern architectural skyline at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Single deep-bottom vignette — grounds text overlay, no fog or dissolve */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(26,25,22,0.85) 0%, rgba(26,25,22,0.5) 35%, rgba(26,25,22,0) 65%)'
          }}
        />
      </div>

      {/* ── Content: overlaid on image at bottom ── */}
      <div className="relative z-10 w-full px-6 md:px-10 lg:px-[7vw] pt-28 pb-16 md:pb-20">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }} aria-hidden="true" />
          <p className="text-[0.6875rem] font-light tracking-[0.2em] uppercase" style={{ color: 'var(--color-accent-light)', opacity: 0.8 }}>
            EDITORIAL INTELLIGENCE — AVORRIA
          </p>
        </div>

        {/* Monumental title overlaid on image */}
        <h1
          id="lobby-hero-heading"
          className="text-[clamp(3.5rem,8vw,8rem)] font-extralight tracking-[-0.03em] leading-[0.96] mb-6"
          style={{ color: 'var(--color-ivory)' }}
        >
          The Lobby
        </h1>

        {/* Single-line thesis — italic rose, not list */}
        <p
          className="text-[1.25rem] md:text-[1.5rem] font-extralight tracking-[-0.01em] mb-8"
          style={{ color: 'var(--color-accent-light)' }}
        >
          What changed. What matters. What you should do about it.
        </p>

        {/* Utility actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/lobby/search"
            className="text-[0.6875rem] font-light tracking-[0.16em] uppercase px-4 py-2 transition-colors duration-200"
            style={{
              color: 'var(--color-ivory)',
              border: '1px solid rgba(247,245,240,0.3)'
            }}
            aria-label="Search The Lobby articles"
          >
            Search Intelligence
          </Link>
          <Link
            href="/lobby/rss.xml"
            className="text-[0.6875rem] font-light tracking-[0.16em] uppercase px-4 py-2 transition-colors duration-200"
            style={{
              color: 'var(--color-ivory)',
              opacity: 0.6,
              border: '1px solid rgba(247,245,240,0.15)'
            }}
            aria-label="RSS feed for The Lobby"
          >
            RSS Feed
          </Link>
        </div>

        {/* Scroll cue */}
        <div className="mt-12 pt-6 flex items-center gap-3" style={{ borderTop: '1px solid rgba(247,245,240,0.12)' }}>
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
            style={{ border: '1px solid rgba(247,245,240,0.3)', color: 'var(--color-ivory)' }}
          >
            ↓
          </div>
          <span className="text-[0.625rem] tracking-[0.2em] uppercase font-light" style={{ color: 'var(--color-ivory)', opacity: 0.5 }}>SCROLL TO EXPLORE</span>
        </div>
      </div>
    </section>
  )
}
