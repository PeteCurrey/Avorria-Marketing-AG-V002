import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Button } from '@/components/ui/Button'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

export const metadata: Metadata = generatePageMetadata({
  title: 'About',
  description:
    'Avorria is a digital agency and technology studio building digital products, AI systems and high-performance websites for ambitious businesses.',
  path: '/about',
})

const disciplines = [
  {
    title: '01 // Build',
    description: 'High-performance digital flagships, bespoke web software, and interactive platforms engineered with surgical typography and instant LCP.',
    href: '/services/build',
  },
  {
    title: '02 // Search',
    description: 'Enterprise technical search architecture, high-risk migration safeguards, semantic entity graphs, and organic market dominance.',
    href: '/services/search',
  },
  {
    title: '03 // Systems',
    description: 'Commercial data infrastructure, Stripe billing pipelines, autonomous scout engines, and real-time operational telemetry.',
    href: '/services/systems',
  },
]

export default function AboutPage() {
  return (
    <div className="section-y-large">
      <div className="container-max">
        <div className="container-content">

          <div className="border-b border-[var(--color-border)] pb-16 mb-16">
            <Eyebrow>About Avorria</Eyebrow>
            <h1 className="text-display-l max-w-[700px]">
              A digital agency that builds things.
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-20">
            <RevealOnScroll>
              <div className="space-y-6 text-secondary leading-relaxed">
                <p className="text-body-l">
                  Avorria is a digital agency and technology studio. We design
                  and build digital products, intelligent systems and
                  high-performance websites for businesses that want technology
                  to actually do something.
                </p>
                <p>
                  We combine strategy, design and engineering. Not as three
                  separate services handed off between separate teams, but as
                  an integrated discipline that produces better outcomes.
                </p>
                <p>
                  Our clients are businesses that take digital seriously — who
                  understand that the quality of the digital product they put
                  in front of customers reflects directly on the quality of
                  their business.
                </p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={150}>
              <div className="space-y-6 text-secondary leading-relaxed">
                <p>
                  We do not build generic websites. We do not oversell AI. We
                  do not use technology for its own sake.
                </p>
                <p>
                  What we build is precise, performant and purposeful. We ask
                  difficult questions at the start, so we can build the right
                  thing — not just build something quickly.
                </p>
                <p>
                  The most valuable digital products come from combining web,
                  AI and systems engineering in a coherent whole. That is what
                  we specialise in.
                </p>
              </div>
            </RevealOnScroll>
          </div>

          {/* Disciplines */}
          <div className="mb-20">
            <p className="text-label-upper mb-10">What we do</p>
            <div className="space-y-0">
              {disciplines.map((d, i) => (
                <RevealOnScroll key={d.title} delay={i * 60}>
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_auto] gap-6 border-t border-[var(--color-border)] py-8 items-center">
                    <h2 className="text-display-s">{d.title}</h2>
                    <p className="text-secondary">{d.description}</p>
                    <Button as="link" href={d.href} variant="ghost" size="sm" className="shrink-0">
                      Learn more →
                    </Button>
                  </div>
                </RevealOnScroll>
              ))}
              <div className="border-t border-[var(--color-border)]" aria-hidden="true" />
            </div>
          </div>

          {/* CTA */}
          <div className="border-t border-[var(--color-border)] pt-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-display-s mb-4">Work with us</h2>
                <p className="text-secondary mb-8">
                  Tell us about your project.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button as="link" href="/start-a-project" variant="primary" size="md">
                    Start a project ↗
                  </Button>
                  <Button as="link" href="/contact" variant="secondary" size="md">
                    Get in touch
                  </Button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
