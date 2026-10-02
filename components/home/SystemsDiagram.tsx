import { Eyebrow } from '@/components/ui/Eyebrow'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

const systemLayers = [
  {
    label: 'Website',
    description: 'The commercial front-end. Fast, ranked, converting.',
    proofBadge: 'NEXT.JS 16 // 100/100 CWV',
  },
  {
    label: 'Application',
    description: 'The functional layer. User accounts, data, interactions.',
    proofBadge: 'POSTGRESQL // AUTH & RBAC',
  },
  {
    label: 'Data',
    description: 'Structured information, analytics and business intelligence.',
    proofBadge: 'POSTGIS // SPATIAL TILES',
  },
  {
    label: 'APIs',
    description: 'Connections between systems, platforms and third parties.',
    proofBadge: 'REST // WEBSOCKETS // STRIPE',
  },
  {
    label: 'AI',
    description: 'Intelligent automation, processing and decision support.',
    proofBadge: 'PGVECTOR // TAXONOMY GRAPH',
  },
  {
    label: 'Automation',
    description: 'Processes that run without you, reliably, at scale.',
    proofBadge: 'AUTONOMOUS WORKFLOWS',
  },
  {
    label: 'Business',
    description: 'The outcome. Technology that earns its place.',
    proofBadge: 'VERIFIED COMMERCIAL RETURN',
  },
]

export function SystemsDiagram() {
  return (
    <section
      className="section-y-large border-b border-[var(--color-border)] bg-[var(--color-ivory-dark)]"
      aria-labelledby="systems-heading"
    >
      <div className="container-max">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            <div className="lg:col-span-5">
              <RevealOnScroll>
                <Eyebrow>03 — Digital Systems</Eyebrow>
                <h2 id="systems-heading" className="text-display-l mb-6">
                  A website is sometimes only the beginning.
                </h2>
                <p className="text-secondary text-body-l leading-relaxed mb-6 font-light">
                  When web, AI and systems engineering are designed together,
                  they create something much more valuable than any one of them
                  built in isolation.
                </p>
                <p className="text-[var(--text-small)] text-[var(--color-graphite-mid)] leading-relaxed font-light border-l border-[var(--color-accent)] pl-4">
                  Each layer below directly maps to verified production systems we build for clients —
                  from spatial vector pyramids to sub-millisecond tick aggregators.
                </p>
              </RevealOnScroll>
            </div>

            {/* Vertical system journey */}
            <div className="lg:col-span-7">
              <RevealOnScroll delay={150}>
                <div className="space-y-0" role="list" aria-label="Digital system layers">
                  {systemLayers.map((layer, i) => (
                    <div
                      key={layer.label}
                      className="group flex items-start gap-5 py-5 border-t border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-colors"
                      role="listitem"
                    >
                      {/* Connector line */}
                      <div className="flex flex-col items-center pt-1.5" aria-hidden="true">
                        <div className="w-2.5 h-2.5 rounded-full border border-[var(--color-graphite-mid)] bg-[var(--color-ivory-dark)] group-hover:bg-[var(--color-accent)] transition-colors" />
                        {i < systemLayers.length - 1 && (
                          <div className="w-px h-10 bg-[var(--color-border)] mt-1.5" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                          <p className="text-base font-light text-[var(--color-graphite)] group-hover:text-[var(--color-accent)] transition-colors">
                            {layer.label}
                          </p>
                          <span className="text-[10px] font-mono text-[var(--color-graphite-muted)] tracking-wider uppercase border border-[var(--color-border)] px-2 py-0.5 bg-white/50">
                            {layer.proofBadge}
                          </span>
                        </div>
                        <p className="text-[var(--text-small)] text-[var(--color-graphite-mid)] font-light leading-relaxed">
                          {layer.description}
                        </p>
                      </div>

                      {/* Layer index */}
                      <span className="text-label-upper text-[var(--color-border-strong)] pt-1 select-none font-mono" aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-[var(--color-border)]" aria-hidden="true" />
                </div>
              </RevealOnScroll>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
