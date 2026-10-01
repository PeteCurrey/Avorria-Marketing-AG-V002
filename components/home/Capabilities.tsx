import Link from 'next/link'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

const capabilities = [
  {
    index: '01',
    label: 'WEB',
    title: 'Web Development',
    description:
      'Websites and web applications built for performance, conversion and scale. From marketing platforms to complex SaaS products.',
    href: '/services/web-development',
  },
  {
    index: '02',
    label: 'AI',
    title: 'AI Development',
    description:
      'AI integrations, intelligent workflows, agents and AI-native product functionality — built to solve real business problems.',
    href: '/services/ai-development',
  },
  {
    index: '03',
    label: 'SYSTEMS',
    title: 'Digital Systems',
    description:
      'Data, APIs, automation, CRM, platforms and connected business systems that make your digital infrastructure genuinely useful.',
    href: '/services/digital-systems',
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
