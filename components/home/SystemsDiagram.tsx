import { Eyebrow } from '@/components/ui/Eyebrow'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

const systemLayers = [
  { label: 'Website', description: 'The commercial front-end. Fast, ranked, converting.' },
  { label: 'Application', description: 'The functional layer. User accounts, data, interactions.' },
  { label: 'Data', description: 'Structured information, analytics and business intelligence.' },
  { label: 'APIs', description: 'Connections between systems, platforms and third parties.' },
  { label: 'AI', description: 'Intelligent automation, processing and decision support.' },
  { label: 'Automation', description: 'Processes that run without you, reliably, at scale.' },
  { label: 'Business', description: 'The outcome. Technology that earns its place.' },
]

export function SystemsDiagram() {
  return (
    <section
      className="section-y-large border-b border-[var(--color-border)] bg-[var(--color-ivory-dark)]"
      aria-labelledby="systems-heading"
    >
      <div className="container-max">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            <RevealOnScroll>
              <Eyebrow>03 — Digital Systems</Eyebrow>
              <h2 id="systems-heading" className="text-display-l mb-6">
                A website is sometimes only the beginning.
              </h2>
              <p className="text-secondary text-body-l">
                When web, AI and systems engineering are designed together,
                they create something much more valuable than any one of them
                built in isolation.
              </p>
            </RevealOnScroll>

            {/* System flow diagram */}
            <RevealOnScroll delay={150}>
              <div className="space-y-0" role="list" aria-label="Digital system layers">
                {systemLayers.map((layer, i) => (
                  <div
                    key={layer.label}
                    className="flex items-start gap-6 py-5 border-t border-[var(--color-border)]"
                    role="listitem"
                  >
                    {/* Connector line */}
                    <div className="flex flex-col items-center pt-1.5" aria-hidden="true">
                      <div className="w-2 h-2 rounded-full border border-[var(--color-graphite-mid)] bg-[var(--color-ivory-dark)]" />
                      {i < systemLayers.length - 1 && (
                        <div className="w-px h-8 bg-[var(--color-border)] mt-1" />
                      )}
                    </div>
                    {/* Content */}
                    <div className="flex-1 pb-3">
                      <p className="text-[var(--text-small)] font-light text-[var(--color-graphite)] mb-1">
                        {layer.label}
                      </p>
                      <p className="text-[var(--text-small)] text-[var(--color-graphite-muted)]">
                        {layer.description}
                      </p>
                    </div>
                    {/* Layer index */}
                    <span className="text-label-upper text-[var(--color-border-strong)] pt-0.5" aria-hidden="true">
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
    </section>
  )
}
