import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = generatePageMetadata({
  title: 'Our Process',
  description:
    'How Avorria works: a seven-stage process from understanding your business problem through to ongoing improvement. Designed to produce useful, reliable digital products.',
  path: '/process',
})

const steps = [
  {
    index: '01',
    title: 'Understand',
    description: `Every project begins with understanding the actual business problem. Not the technology you think you need — the outcome you want to achieve. We ask difficult questions early so we can build the right thing, not just build a thing.`,
  },
  {
    index: '02',
    title: 'Architect',
    description: `Before any interface is designed, we design the system. What data is needed? Where does it come from? How do the components connect? Getting architecture right at the start prevents expensive rebuilds later.`,
  },
  {
    index: '03',
    title: 'Design',
    description: `Purposeful design that serves the product. We design for clarity, performance and conversion — not for portfolio screenshots. Every decision has a reason.`,
  },
  {
    index: '04',
    title: 'Engineer',
    description: `Built properly, with the right technology, to production standard. We do not cut corners that create technical debt. We use modern, maintainable approaches that will serve you for years.`,
  },
  {
    index: '05',
    title: 'Validate',
    description: `Tested against real use cases. Performance, accessibility, edge cases and reliability are verified before launch — not discovered after.`,
  },
  {
    index: '06',
    title: 'Launch',
    description: `Deployment that is deliberate, monitored and controlled. We do not push to production and walk away. Launch is a managed process.`,
  },
  {
    index: '07',
    title: 'Improve',
    description: `The most valuable digital products evolve. We offer ongoing engagement to iterate based on data, user feedback and business change. Launch is the beginning, not the end.`,
  },
]

export default function ProcessPage() {
  return (
    <div className="section-y-large">
      <div className="container-max">
        <div className="container-content">

          <div className="border-b border-[var(--color-border)] pb-16 mb-16">
            <Eyebrow>How we work</Eyebrow>
            <h1 className="text-display-l max-w-[640px]">
              A process built for useful outcomes.
            </h1>
          </div>

          <p className="text-body-l text-secondary max-w-[560px] mb-20">
            Our process is not a sales deck — it is how we actually work. Each
            stage is designed to reduce waste, catch problems early and deliver
            something that performs in the real world.
          </p>

          <div className="space-y-0">
            {steps.map((step, i) => (
              <RevealOnScroll key={step.index} delay={i * 60}>
                <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-6 lg:gap-16 border-t border-[var(--color-border)] py-12">
                  <div className="flex lg:flex-col gap-4 lg:gap-2">
                    <span className="text-label-upper text-muted">{step.index}</span>
                    <h2 className="text-display-s">{step.title}</h2>
                  </div>
                  <p className="text-secondary leading-relaxed max-w-[600px]">{step.description}</p>
                </div>
              </RevealOnScroll>
            ))}
            <div className="border-t border-[var(--color-border)]" aria-hidden="true" />
          </div>

          <div className="mt-20 border-t border-[var(--color-border)] pt-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-display-s mb-4">Start a project with us</h2>
                <p className="text-secondary mb-8">
                  Tell us about your project and we will explain how this process
                  would apply to what you are building.
                </p>
                <Button as="link" href="/start-a-project" variant="primary" size="md">
                  Start a project ↗
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
