import { Eyebrow } from '@/components/ui/Eyebrow'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { Button } from '@/components/ui/Button'

const processSteps = [
  { index: '01', label: 'Understand', description: 'We start with the business problem, not the technology solution.' },
  { index: '02', label: 'Architect', description: 'We design the system before we design the interface.' },
  { index: '03', label: 'Design', description: 'Purposeful, precise design that serves the product, not the portfolio.' },
  { index: '04', label: 'Engineer', description: 'Built properly, with the right technology, to production standard.' },
  { index: '05', label: 'Validate', description: 'Tested against real use. Performance, accessibility and reliability.' },
  { index: '06', label: 'Launch', description: 'Deployment that is deliberate, monitored and controlled.' },
  { index: '07', label: 'Improve', description: 'Ongoing iteration based on data, feedback and business evolution.' },
]

export function ProcessSection() {
  return (
    <section
      className="section-y-large border-b border-[var(--color-border)]"
      aria-labelledby="process-heading"
    >
      <div className="container-max">
        <div className="container-content">

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-16 lg:mb-24 gap-8">
            <RevealOnScroll>
              <Eyebrow>04 — Process</Eyebrow>
              <h2 id="process-heading" className="text-display-l">
                How we work.
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <div className="lg:max-w-[360px]">
                <p className="text-secondary leading-relaxed mb-6">
                  Our process is designed to produce useful, reliable digital
                  products — not impressive-looking things that do not perform.
                </p>
                <Button as="link" href="/process" variant="secondary" size="sm">
                  Read more about our process
                </Button>
              </div>
            </RevealOnScroll>
          </div>

          {/* Elegant sequence — not seven cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-0">
            {processSteps.map((step, i) => (
              <RevealOnScroll key={step.index} delay={i * 60}>
                <div className="border-t border-[var(--color-border)] lg:border-t-0 lg:border-l lg:first:border-l-0 pt-8 lg:pt-0 lg:pl-6 pb-8 lg:pb-0">
                  <span className="text-label-upper text-[var(--color-graphite-muted)] mb-4 block">{step.index}</span>
                  <h3 className="text-[var(--text-small)] font-light font-sans-avorria text-[var(--color-graphite)] mb-3 tracking-[0.01em]">
                    {step.label}
                  </h3>
                  <p className="text-[var(--text-label)] text-[var(--color-graphite-muted)] leading-relaxed tracking-wide">
                    {step.description}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
