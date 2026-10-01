import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { Button } from '@/components/ui/Button'
import { getService, getPublishedServices } from '@/content/services'
import { siteConfig } from '@/content/config/site'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const services = getPublishedServices()
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}
  return {
    title: service.seo.title,
    description: service.seo.description,
    alternates: { canonical: `${siteConfig.url}/services/${slug}` },
    openGraph: {
      title: service.seo.title,
      description: service.seo.description,
      url: `${siteConfig.url}/services/${slug}`,
    },
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'Avorria',
      url: siteConfig.url,
    },
    url: `${siteConfig.url}/services/${slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <div className="section-y-large">
        <div className="container-max">
          <div className="container-content">

            <Breadcrumb
              items={[
                { label: 'Services', href: '/services' },
                { label: service.title },
              ]}
              className="mb-12"
            />

            {/* Header */}
            <div className="border-b border-[var(--color-border)] pb-16 mb-16">
              <p className="text-label-upper mb-6">Service</p>
              <h1 className="text-display-l max-w-[700px] mb-6">
                {service.headline}
              </h1>
              <p className="text-body-l text-secondary max-w-[560px]">
                {service.description}
              </p>
            </div>

            {/* Capabilities */}
            <div className="mb-20">
              <p className="text-label-upper mb-12">Capabilities</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
                {service.capabilities.map((cap, i) => (
                  <RevealOnScroll key={i} delay={i * 60}>
                    <div className="border-l border-t border-[var(--color-border)] p-8">
                      <h2 className="text-[var(--text-small)] font-light text-[var(--color-graphite)] mb-3 font-sans-avorria tracking-[0.01em]">
                        {cap.title}
                      </h2>
                      <p className="text-[var(--text-small)] text-secondary leading-relaxed">
                        {cap.description}
                      </p>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>

            {/* Technology */}
            {service.technology && service.technology.length > 0 && (
              <div className="border-t border-[var(--color-border)] pt-12 mb-20">
                <p className="text-label-upper mb-6">Technology</p>
                <div className="flex flex-wrap gap-3">
                  {service.technology.map((tech) => (
                    <span
                      key={tech}
                      className="text-label-upper border border-[var(--color-border)] px-4 py-2 text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Internal linking: work related */}
            <div className="border-t border-[var(--color-border)] pt-12 mb-20">
              <p className="text-label-upper mb-4">See also</p>
              <div className="flex flex-wrap gap-4">
                <Button as="link" href="/work" variant="ghost" size="sm">View our work →</Button>
                <Button as="link" href="/process" variant="ghost" size="sm">Our process →</Button>
                <Button as="link" href="/journal" variant="ghost" size="sm">Journal →</Button>
              </div>
            </div>

            {/* CTA */}
            <div className="border-t border-[var(--color-border)] pt-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-display-s mb-4">
                    Ready to discuss your project?
                  </h2>
                  <p className="text-secondary mb-8">
                    Tell us what you're building and we'll respond within one business day.
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
    </>
  )
}
