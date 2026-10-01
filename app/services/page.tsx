import type { Metadata } from 'next'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Button } from '@/components/ui/Button'
import { getPublishedServices } from '@/content/services'

export const metadata: Metadata = generatePageMetadata({
  title: 'Services',
  description:
    'Avorria builds high-performance websites, AI systems and digital infrastructure. Three core disciplines: Web Development, AI Development and Digital Systems.',
  path: '/services',
})

export default function ServicesPage() {
  const services = getPublishedServices()

  return (
    <div className="section-y-large">
      <div className="container-max">
        <div className="container-content">

          <Breadcrumb items={[{ label: 'Services' }]} className="mb-12" />

          <div className="border-b border-[var(--color-border)] pb-16 mb-16">
            <Eyebrow>What we build</Eyebrow>
            <h1 className="text-display-l max-w-[640px]">
              Three disciplines. One studio.
            </h1>
          </div>

          <p className="text-body-l text-secondary max-w-[640px] mb-20">
            Avorria operates across three core disciplines — web development, AI development
            and digital systems. They are most powerful when they work together.
          </p>

          <div className="space-y-0">
            {services.map((service, i) => (
              <RevealOnScroll key={service.slug} delay={i * 80}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block border-t border-[var(--color-border)] py-12 hover:border-[var(--color-border-strong)] transition-colors duration-[var(--duration-base)]"
                  aria-label={`${service.title} — view service`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_1fr_60px] gap-6 lg:gap-12 items-start">
                    <div>
                      <span className="text-label-upper text-muted">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-display-s mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-[var(--duration-base)]">
                        {service.title}
                      </h2>
                      <p className="text-label-upper text-muted">{service.headline}</p>
                    </div>
                    <p className="text-secondary">{service.description}</p>
                    <div className="hidden lg:flex justify-end pt-2">
                      <span className="text-muted group-hover:text-[var(--color-accent)] group-hover:translate-x-1 transition-all duration-[var(--duration-base)]" aria-hidden="true">→</span>
                    </div>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
            <div className="border-t border-[var(--color-border)]" aria-hidden="true" />
          </div>

          <div className="mt-20 border-t border-[var(--color-border)] pt-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-display-s mb-4">Ready to start a project?</h2>
                <p className="text-secondary mb-8">
                  Tell us about what you're building and we'll respond within one business day.
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
