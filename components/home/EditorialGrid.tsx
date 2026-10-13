import Image from 'next/image'
import Link from 'next/link'

/**
 * EditorialGrid — Red Bull "The Red Bulletin" Bento Grid Duplicate
 *
 * Duplicates Red Bull's culture & editorial magazine feed:
 * - Asymmetric 1 Lead Hero Tile + 2 Stacked Companion Modules
 * - Dark Obsidian stage (#000F1E) with deep navy card surfaces (#00162B)
 * - Category tags, reading times, and smooth card zoom
 */

export function EditorialGrid() {
  return (
    <section
      className="w-full bg-[#000F1E] border-t border-white/10"
      aria-labelledby="editorial-heading"
      style={{ paddingBlock: 'clamp(4rem, 8vw, 6.5rem)' }}
    >
      <div className="mx-auto max-w-[1920px]" style={{ paddingInline: 'clamp(1.25rem, 4vw, 3rem)' }}>

        {/* ── Section Caption ──────────────────────────────────────── */}
        <div data-reveal="" className="panel-caption-rbx">
          <div className="flex items-baseline gap-4">
            <h2
              id="editorial-heading"
              className="panel-caption-rbx__title"
            >
              The Lobby
            </h2>
            <span className="hidden sm:inline-block text-xs font-light text-white/40 tracking-[0.14em] uppercase">
              Editorial &amp; Engineering Research
            </span>
          </div>

          <Link
            href="/lobby"
            className="rb-pill-btn rb-pill-btn-tertiary"
          >
            <span>Explore all essays</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* ── Asymmetric Bento Grid (1 Major Lead + 2 Stacked Cards) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">

          {/* ── Lead Story Tile (Spans 7 cols on desktop) ────────────── */}
          <Link
            href="/lobby/websites-we-would-fire"
            className="lg:col-span-7 group relative flex flex-col justify-end bg-[#00162B] border border-white/10 hover:border-white/25 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
            style={{ minHeight: 'clamp(380px, 45vw, 540px)' }}
            data-reveal=""
          >
            {/* Background Image with Zoom */}
            <div className="absolute inset-0 overflow-hidden bg-[#001C39]">
              <Image
                src="/images/cinematic/work-nestiq.jpg"
                alt="Websites We Would Fire — enterprise teardown"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.35,0,0,1)] group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, #00162B 0%, rgba(0, 22, 43, 0.75) 45%, rgba(0, 22, 43, 0.2) 75%, transparent 100%)',
                }}
              />
            </div>

            {/* Lead Content */}
            <div className="relative z-10 p-6 sm:p-8 max-w-2xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[0.625rem] font-light tracking-[0.14em] uppercase bg-[var(--color-cobalt, #3157FF)] text-white">
                  TEARDOWN // LEAD ESSAY
                </span>
                <span className="text-xs font-light text-white/50">
                  12 min read
                </span>
              </div>

              <h3
                className="font-extralight text-white uppercase leading-tight group-hover:text-[var(--color-cobalt)] transition-colors duration-200"
                style={{
                  fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                  letterSpacing: '-0.02em',
                }}
              >
                Websites We Would Fire: The Enterprise Redesign Epidemic
              </h3>

              <p className="font-light text-white/70 text-sm sm:text-base mt-2 line-clamp-2 max-w-xl">
                A forensic examination of twelve multi-million pound re-platforming failures, analyzing catastrophic third-party script inflation, broken canonical tags, and unvetted frameworks.
              </p>

              <div className="mt-5 inline-flex items-center gap-2 text-xs font-light tracking-[0.1em] text-white/90 group-hover:text-white uppercase">
                <span>Read Full Teardown</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </div>
            </div>
          </Link>

          {/* ── Two Stacked Secondary Stories (Spans 5 cols) ─────────── */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            {/* Secondary Card 1 */}
            <Link
              href="/work/alkota-bikes"
              className="group flex-1 flex flex-col justify-between bg-[#00162B] border border-white/10 hover:border-white/25 rounded-lg overflow-hidden transition-all duration-300 p-6 hover:shadow-xl"
              data-reveal=""
            >
              <div>
                <div className="flex items-center gap-3 mb-2.5">
                  <span className="px-2 py-0.5 rounded-full text-[0.625rem] font-light tracking-[0.12em] uppercase bg-white/10 text-white/80 border border-white/15">
                    TECHNICAL SPECIFICATION
                  </span>
                  <span className="text-[0.6875rem] font-light text-white/40">
                    6 min read
                  </span>
                </div>

                <h3
                  className="font-extralight text-white uppercase group-hover:text-[var(--color-cobalt)] transition-colors duration-200 text-lg sm:text-xl leading-snug"
                >
                  Sub-Second Route Changes with Zero Layout Shift
                </h3>

                <p className="font-light text-white/60 text-xs sm:text-sm mt-2 line-clamp-2">
                  How we decoupled 3D asset bundles and utilized partial hydration pipelines to eliminate FID and CLS spikes on mobile devices.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/40 group-hover:text-white">
                <span className="font-light uppercase tracking-[0.1em]">Read Engineering Note</span>
                <span>→</span>
              </div>
            </Link>

            {/* Secondary Card 2 */}
            <Link
              href="/services/search"
              className="group flex-1 flex flex-col justify-between bg-[#00162B] border border-white/10 hover:border-white/25 rounded-lg overflow-hidden transition-all duration-300 p-6 hover:shadow-xl"
              data-reveal=""
            >
              <div>
                <div className="flex items-center gap-3 mb-2.5">
                  <span className="px-2 py-0.5 rounded-full text-[0.625rem] font-light tracking-[0.12em] uppercase bg-white/10 text-white/80 border border-white/15">
                    SEARCH ALGORITHMS
                  </span>
                  <span className="text-[0.6875rem] font-light text-white/40">
                    8 min read
                  </span>
                </div>

                <h3
                  className="font-extralight text-white uppercase group-hover:text-[var(--color-cobalt)] transition-colors duration-200 text-lg sm:text-xl leading-snug"
                >
                  Surgical Search Architecture: Consolidating 8 Domains
                </h3>

                <p className="font-light text-white/60 text-xs sm:text-sm mt-2 line-clamp-2">
                  The protocol for merging enterprise corporate acquisitions without losing rank equity or triggering Google algorithmic suppressions.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/40 group-hover:text-white">
                <span className="font-light uppercase tracking-[0.1em]">Read Search Blueprint</span>
                <span>→</span>
              </div>
            </Link>

          </div>

        </div>

      </div>
    </section>
  )
}
