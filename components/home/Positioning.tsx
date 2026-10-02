import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { MediaPlaceholder } from '@/components/ui/MediaPlaceholder'

export function Positioning() {
  return (
    <section
      className="section-y border-b border-[var(--color-border)]"
      aria-labelledby="positioning-heading"
    >
      <div className="container-max">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left: Strong Editorial Statement */}
            <div className="lg:col-span-6">
              <RevealOnScroll>
                <Eyebrow>About Avorria</Eyebrow>
                <h2
                  id="positioning-heading"
                  className="text-display-l mb-8"
                >
                  Technology should solve something.
                </h2>
              </RevealOnScroll>

              <RevealOnScroll delay={150}>
                <p className="text-body-l text-secondary mb-6 leading-relaxed">
                  Too many digital projects are built to look impressive rather
                  than to do something useful. We take a different position.
                </p>
                <p className="text-secondary leading-relaxed mb-6 font-light">
                  Avorria combines strategy, design and engineering to create
                  digital products and systems that are precise, performant and
                  purposeful. We work with businesses that want technology to
                  actually do something — to improve a process, open a market,
                  reduce friction or create something new.
                </p>
                <p className="text-secondary leading-relaxed font-light">
                  We build websites, web applications, AI implementations and
                  connected digital systems. Often, the most valuable outcome
                  is all three working together.
                </p>
              </RevealOnScroll>
            </div>

            {/* Right: Sequence of Real Interface & System Fragments */}
            <div className="lg:col-span-6 space-y-4 pt-4 lg:pt-12">
              <RevealOnScroll delay={100}>
                <div className="text-label-upper text-[var(--color-graphite-muted)] mb-3 flex items-center justify-between">
                  <span>INTERVENTION PROOF // 01</span>
                  <span>CADENCE: REAL-TIME</span>
                </div>
                <MediaPlaceholder
                  variant="fragment"
                  title="Drawdown.Trading Risk Engine"
                  client="Avorria Quantitative"
                  sector="Sub-millisecond Canvas WebSocket subscriber & tick aggregator"
                  discipline="03 // SYSTEMS"
                  aspectRatio="aspect-[21/9]"
                />
              </RevealOnScroll>

              <RevealOnScroll delay={200}>
                <div className="text-label-upper text-[var(--color-graphite-muted)] mb-3 flex items-center justify-between">
                  <span>INTERVENTION PROOF // 02</span>
                  <span>TOLERANCES: SUB-MILLIMETER</span>
                </div>
                <MediaPlaceholder
                  variant="fragment"
                  title="Alkota Bikes WebGL Stage"
                  client="Alkota Bikes Ltd"
                  sector="Bespoke titanium frame geometry telemetry & tube specs"
                  discipline="01 // BUILD"
                  aspectRatio="aspect-[21/9]"
                />
              </RevealOnScroll>

              <RevealOnScroll delay={300}>
                <div className="text-label-upper text-[var(--color-graphite-muted)] mb-3 flex items-center justify-between">
                  <span>INTERVENTION PROOF // 03</span>
                  <span>GEOSPATIAL: NATIONWIDE</span>
                </div>
                <MediaPlaceholder
                  variant="fragment"
                  title="NestIQ PostGIS Polygon Pipeline"
                  client="NestIQ Intelligence"
                  sector="25M+ UK Land Registry cadastral vector tile generation"
                  discipline="01 // BUILD"
                  aspectRatio="aspect-[21/9]"
                />
              </RevealOnScroll>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
