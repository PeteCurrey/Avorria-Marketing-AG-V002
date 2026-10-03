import Image from 'next/image'

export function LobbyEditorialBreak() {
  return (
    <section
      aria-label="Editorial statement"
      className="relative w-full overflow-hidden bg-[#161513] text-white my-8 lg:my-12 border border-[var(--color-border)]"
    >
      {/* ── Background Architectural Plate ── */}
      <div className="absolute inset-0 z-0 opacity-35 select-none pointer-events-none" aria-hidden="true">
        <Image
          src="/images/architecture/03-data.jpg"
          alt="Avorria — High-density digital infrastructure and modern architectural grid"
          fill
          sizes="100vw"
          className="object-cover object-center filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/85" />
      </div>

      {/* ── Editorial Statement Overlay ── */}
      <div className="relative z-10 w-full px-8 md:px-14 lg:px-20 py-20 md:py-28 lg:py-32 flex flex-col justify-center">
        <div className="max-w-[840px]">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
            <p className="text-[0.625rem] font-light tracking-[0.22em] uppercase text-white/60">
              AVORRIA POSITIONING // PERSPECTIVE
            </p>
          </div>

          {/* Statement */}
          <h2 className="text-[clamp(2rem,4.5vw,4.25rem)] font-extralight tracking-[-0.025em] text-white leading-[1.05] mb-8">
            DIGITAL IS NOT DECORATION.
          </h2>

          {/* Supporting Copy */}
          <p className="text-[1.0625rem] sm:text-[1.25rem] font-light text-white/80 leading-[1.6] max-w-[62ch]">
            Websites and digital platforms are operating assets. When engineered with architectural discipline,
            they reduce commercial friction, preserve organic visibility, and compound enterprise value.
          </p>
        </div>

        {/* Telemetry Footer */}
        <div className="pt-12 mt-12 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[0.5625rem] tracking-[0.2em] uppercase font-light text-white/50">
          <span>SPECIFICATION PRECEDES SURFACE</span>
          <span>SUB-SECOND INTERACTION // WCAG AAA // ZERO CODE COMPROMISE</span>
        </div>
      </div>
    </section>
  )
}
