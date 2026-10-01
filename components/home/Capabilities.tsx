import Link from 'next/link'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

const capabilities = [
  {
    index: '01',
    label: 'BUILD',
    title: 'Digital Flagships & Web Applications',
    description:
      'High-performance web platforms, bespoke web software, and selective WebGL configurations engineered with surgical typography and instant LCP.',
    href: '/services/build',
  },
  {
    index: '02',
    label: 'SEARCH',
    title: 'Technical Search & Migration Architecture',
    description:
      'Enterprise crawl budget engineering, high-risk migration safeguards, semantic entity graphs, and commercial keyword dominance.',
    href: '/services/search',
  },
  {
    index: '03',
    label: 'SYSTEMS',
    title: 'Commercial Systems & Data Pipelines',
    description:
      'Server-side attribution, Stripe payment infrastructure, autonomous scout engines, and real-time operational telemetry.',
    href: '/services/systems',
  },
]

export function Capabilities() {
  return (
    <section
      className="section-y-large border-b border-[var(--color-border)]"
      aria-labelledby="capabilities-heading"
    >
      <div className="container-max">
        <div className="container-content">

          <RevealOnScroll>
            <Eyebrow>01 — Capabilities</Eyebrow>
            <h2 id="capabilities-heading" className="text-display-l mb-16 lg:mb-24 max-w-[600px]">
              What we build.
            </h2>
          </RevealOnScroll>

          {/* Editorial capability rows — not cards */}
          <div>
            {capabilities.map((cap, i) => (
              <RevealOnScroll key={cap.index} delay={i * 80}>
                <Link
                  href={cap.href}
                  className="group block border-t border-[var(--color-border)] py-10 lg:py-12 hover:border-[var(--color-border-strong)] transition-colors duration-[var(--duration-base)]"
                  aria-label={`${cap.title} — learn more`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr_1fr_80px] gap-6 lg:gap-12 items-center">

                    {/* Index + label */}
                    <div className="flex items-center gap-4 lg:block">
                      <span className="text-label-upper text-[var(--color-graphite-muted)]">{cap.index}</span>
                      <span className="lg:hidden text-label-upper ml-2">{cap.label}</span>
                    </div>

                    {/* Title */}
                    <div>
                      <p className="hidden lg:block text-label-upper mb-3">{cap.label}</p>
                      <h3 className="text-display-s group-hover:text-[var(--color-accent)] transition-colors duration-[var(--duration-base)]">
                        {cap.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-secondary text-[var(--text-small)] lg:text-base leading-relaxed">
                      {cap.description}
                    </p>

                    {/* Arrow */}
                    <div className="hidden lg:flex justify-end">
                      <span
                        className="text-[1.25rem] text-[var(--color-graphite-muted)] group-hover:text-[var(--color-accent)] group-hover:translate-x-1 transition-all duration-[var(--duration-base)]"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </div>

                  </div>
                </Link>
              </RevealOnScroll>
            ))}
            <div className="border-t border-[var(--color-border)]" aria-hidden="true" />
          </div>

        </div>
      </div>
    </section>
  )
}
