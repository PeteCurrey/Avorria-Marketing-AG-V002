import Image from 'next/image'
import Link from 'next/link'

export function LobbyHero() {
  return (
    <section
      className="-mt-16 md:-mt-20 relative flex flex-col justify-between min-h-[100svh] w-full overflow-hidden bg-white border-b border-[var(--color-border)]"
      aria-labelledby="lobby-hero-heading"
    >
      {/* ── Background Editorial Visual Plate ─────────────────────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none" aria-hidden="true">
        <Image
          src="/images/hero/hero-bg.jpg"
          alt="Avorria — Modern architectural skyline at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center lg:object-right filter contrast-[1.05] brightness-[0.98]"
        />
        {/* Soft edge masking: True white ground transitions seamlessly on left/top */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent w-[65%]" />
        <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white/40" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* ── Content Container (Starts right beneath header) ────────────────── */}
      <div className="relative z-10 w-full px-6 md:px-10 lg:px-[7vw] pt-28 md:pt-36 lg:pt-40 pb-12 flex-1 flex flex-col justify-between">
        
        {/* Masthead details */}
        <div className="max-w-[760px]">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
            <p className="text-[0.6875rem] font-light tracking-[0.2em] uppercase text-[var(--color-graphite-mid)]">
              EDITORIAL INTELLIGENCE — AVORRIA
            </p>
          </div>

          {/* Main Title */}
          <h1
            id="lobby-hero-heading"
            className="text-[clamp(3.5rem,8vw,7.5rem)] font-extralight tracking-[-0.03em] text-[var(--color-graphite)] leading-[0.96] mb-8"
          >
            The Lobby
          </h1>

          {/* 3-line cadence */}
          <div className="space-y-1 mb-8 border-l border-[var(--color-border-strong)] pl-5">
            <p className="text-[1.25rem] sm:text-[1.5rem] font-extralight tracking-[-0.01em] text-[var(--color-graphite)] leading-tight">
              What changed.
            </p>
            <p className="text-[1.25rem] sm:text-[1.5rem] font-extralight tracking-[-0.01em] text-[var(--color-graphite)] leading-tight">
              What matters.
            </p>
            <p className="text-[1.25rem] sm:text-[1.5rem] font-extralight tracking-[-0.01em] text-[var(--color-rose-text)] leading-tight">
              What you should do about it.
            </p>
          </div>

          {/* Supporting thesis */}
          <p className="text-[var(--text-body)] font-light text-[var(--color-graphite-mid)] max-w-[560px] leading-relaxed mb-8">
            Avorria&apos;s editorial perspective on digital systems, website architecture, 
            search visibility, and emerging technology. Written by active principals, not marketing committees.
          </p>

          {/* Utility shortcuts: Search & RSS */}
          <div className="flex items-center gap-4 pt-2">
            <Link
              href="/lobby/search"
              className="text-[0.6875rem] font-light tracking-[0.16em] uppercase text-[var(--color-graphite)] border border-[var(--color-border)] px-4 py-2 hover:border-[var(--color-graphite)] transition-colors duration-200 bg-white/70 backdrop-blur-xs"
              aria-label="Search The Lobby articles and teardowns"
            >
              Search Intelligence
            </Link>
            <Link
              href="/lobby/rss.xml"
              className="text-[0.6875rem] font-light tracking-[0.16em] uppercase text-[var(--color-graphite-mid)] hover:text-[var(--color-graphite)] border border-[var(--color-border)] px-4 py-2 hover:border-[var(--color-graphite)] transition-colors duration-200 bg-white/70 backdrop-blur-xs"
              aria-label="RSS feed for The Lobby"
            >
              RSS Feed
            </Link>
          </div>
        </div>

        {/* ── Bottom of Screen Scroll Cue ───────────────────────────────────── */}
        <div className="pt-12 flex items-center justify-between text-[0.625rem] tracking-[0.2em] uppercase font-light text-[var(--color-graphite-muted)] border-t border-[var(--color-border)]/60">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full border border-[var(--color-graphite-mid)]/40 flex items-center justify-center text-[0.75rem] text-[var(--color-graphite)] animate-pulse">
              ↓
            </div>
            <span>SCROLL TO EXPLORE</span>
          </div>

          <div className="hidden sm:flex items-center gap-4">
            <span>ISSUE ARCHIVE // Q4 2026</span>
            <span>·</span>
            <span>VERIFIED PROVENANCE</span>
          </div>
        </div>

      </div>
    </section>
  )
}
