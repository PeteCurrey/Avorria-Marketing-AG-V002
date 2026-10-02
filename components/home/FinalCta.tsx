import { Button } from '@/components/ui/Button'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

export function FinalCta() {
  return (
    <section
      className="section-y-large relative overflow-hidden"
      aria-labelledby="final-cta-heading"
    >
      <div className="container-max relative z-10">
        <div className="container-content">
          <RevealOnScroll>
            {/* Architectural Frame Wrapper */}
            <div className="border border-[var(--color-border)] bg-[#121110] text-[#EFECE6] p-8 md:p-16 lg:p-20 relative overflow-hidden">
              
              {/* Subtle architectural background grid */}
              <div className="absolute inset-0 pointer-events-none opacity-20" aria-hidden="true">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="cta-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4A4845" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#cta-grid)" />
                  <line x1="0" y1="100%" x2="100%" y2="0" stroke="#B5616A" strokeWidth="0.5" opacity="0.3" />
                </svg>
              </div>

              {/* Registration corners */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#8A8784]" aria-hidden="true" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#8A8784]" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#8A8784]" aria-hidden="true" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#8A8784]" aria-hidden="true" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
                  <p className="text-label-upper font-mono text-[11px] text-[#8A8784]">
                    AVORRIA COMMISSIONS // INTAKE OPEN
                  </p>
                </div>

                <h2
                  id="final-cta-heading"
                  className="text-display-l md:text-display-xl mb-8 max-w-[760px] text-white font-extralight tracking-tight"
                >
                  Have something worth building?
                </h2>

                <p className="text-secondary text-base md:text-lg font-light text-[#C8C4BE] max-w-xl mb-10 leading-relaxed">
                  We partner with ambitious enterprises and founders who require bespoke digital flagships,
                  low-latency web systems, and server-side intelligence engineered to exacting tolerances.
                </p>

                <div className="flex flex-wrap gap-4 items-center">
                  <Button as="link" href="/start-a-project" variant="primary" size="lg">
                    Start a project ↗
                  </Button>
                  <Button as="link" href="/contact" variant="secondary" size="lg" className="border-white/20 text-white hover:bg-white/10">
                    Get in touch
                  </Button>
                </div>

                <div className="mt-14 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono text-[#8A8784]">
                  <span>ZERO PITCH THEATRE</span>
                  <span>•</span>
                  <span>DIRECT PRINCIPAL ENGAGEMENT</span>
                  <span>•</span>
                  <span>LONDON / GLOBAL</span>
                </div>
              </div>

            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
