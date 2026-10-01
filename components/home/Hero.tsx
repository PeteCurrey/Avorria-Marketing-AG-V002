import { Button } from '@/components/ui/Button'
import { HeroVisual } from './HeroVisual'

export function Hero() {
  return (
    <section
      className="relative min-h-[85vh] md:min-h-[90vh] flex flex-col border-b border-[var(--color-border)]"
      aria-labelledby="hero-heading"
    >
      <div className="container-max flex-1 flex">
        <div className="container-content flex-1 flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-0 py-20 lg:py-0">

          {/* Text column */}
          <div className="flex-1 lg:max-w-[55%] lg:pr-16">
            <p className="text-label-upper mb-8 animate-[hero-fade_0.6s_ease-out_0.1s_both]">
              WEB / AI / SYSTEMS
            </p>

            <h1
              id="hero-heading"
              className="text-display-xl mb-8 animate-[hero-fade_0.7s_ease-out_0.2s_both]"
            >
              We build<br />
              <em className="not-italic text-[var(--color-graphite-mid)]">what comes</em><br />
              next.
            </h1>

            <p className="text-body-l text-secondary mb-10 max-w-[480px] animate-[hero-fade_0.7s_ease-out_0.35s_both]">
              Avorria designs and builds digital products, intelligent systems
              and high-performance websites for ambitious businesses.
            </p>

            <div className="flex flex-wrap gap-4 animate-[hero-fade_0.7s_ease-out_0.5s_both]">
              <Button
                as="link"
                href="/start-a-project"
                variant="primary"
                size="lg"
              >
                Start a project ↗
              </Button>
              <Button
                as="link"
                href="/work"
                variant="secondary"
                size="lg"
              >
                View our work
              </Button>
            </div>
          </div>

          {/* Visual column */}
          <div className="flex-1 flex items-center justify-center lg:justify-end animate-[hero-fade_1s_ease-out_0.3s_both]">
            <div className="w-full max-w-[500px] lg:max-w-none aspect-square lg:aspect-auto lg:h-[460px]">
              <HeroVisual />
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="container-max pb-8 flex items-center gap-3 animate-[hero-fade_1s_ease-out_1.2s_both]" aria-hidden="true">
        <span className="text-label-upper">Scroll</span>
        <div className="w-8 h-px bg-[var(--color-border-strong)]" />
      </div>

      <style>{`
        @keyframes hero-fade {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [class*="animate-"] { animation: none !important; opacity: 1 !important; }
        }
      `}</style>
    </section>
  )
}
