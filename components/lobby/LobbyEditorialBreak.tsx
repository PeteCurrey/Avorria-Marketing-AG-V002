import Image from 'next/image'

export function LobbyEditorialBreak() {
  return (
    <section
      aria-label="Editorial statement"
      className="relative w-full overflow-hidden my-8 lg:my-12"
      data-chapter="petrol"
      style={{ backgroundColor: 'var(--color-petrol)' }}
    >
      {/* ── Background Architectural Plate ── */}
      <div className="absolute inset-0 z-0 opacity-25 select-none pointer-events-none" aria-hidden="true">
        <Image
          src="/images/architecture/03-data.jpg"
          alt="High-density digital infrastructure"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(23,53,58,0.95) 0%, rgba(23,53,58,0.7) 60%, rgba(23,53,58,0.85) 100%)' }} />
      </div>

      {/* ── Statement Overlay ── */}
      <div className="relative z-10 w-full px-8 md:px-14 lg:px-20 py-20 md:py-28 lg:py-32">
        <div className="max-w-[840px]">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }} aria-hidden="true" />
            <p className="text-[0.625rem] font-light tracking-[0.22em] uppercase" style={{ color: 'var(--color-accent-light)', opacity: 0.7 }}>
              AVORRIA PERSPECTIVE
            </p>
          </div>

          {/* Statement */}
          <h2
            className="text-[clamp(2rem,4.5vw,4.25rem)] font-extralight tracking-[-0.025em] leading-[1.05] mb-8"
            style={{ color: 'var(--color-ivory)' }}
          >
            Digital is not decoration.
          </h2>

          {/* Supporting Copy */}
          <p
            className="text-[1.0625rem] sm:text-[1.25rem] font-light leading-[1.6] max-w-[62ch]"
            style={{ color: 'var(--color-ivory)', opacity: 0.75 }}
          >
            Websites and digital platforms are operating assets. When engineered with architectural discipline,
            they reduce commercial friction, preserve organic visibility, and compound enterprise value.
          </p>
        </div>
      </div>
    </section>
  )
}
