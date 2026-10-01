import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/content/config/site'

export const metadata: Metadata = generatePageMetadata({
  title: 'Contact',
  description:
    'Get in touch with Avorria. We work with ambitious businesses on digital products, web development, AI systems and digital infrastructure.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <div className="section-y-large">
      <div className="container-max">
        <div className="container-content">

          <div className="border-b border-[var(--color-border)] pb-16 mb-16">
            <Eyebrow>Contact</Eyebrow>
            <h1 className="text-display-l max-w-[640px]">
              Let's talk.
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

            <div>
              <p className="text-body-l text-secondary mb-10">
                If you have a project in mind, the best place to start is
                our project intake form — it helps us understand your project
                before we speak.
              </p>
              <Button as="link" href="/start-a-project" variant="primary" size="lg">
                Start a project ↗
              </Button>
            </div>

            <div className="space-y-12">
              <div>
                <p className="text-label-upper mb-4">General enquiries</p>
                <a
                  href={`mailto:${siteConfig.email.hello}`}
                  className="text-display-s hover:text-[var(--color-accent)] transition-colors duration-[var(--duration-base)] block"
                  aria-label={`Email Avorria at ${siteConfig.email.hello}`}
                >
                  {siteConfig.email.hello}
                </a>
              </div>

              <div className="border-t border-[var(--color-border)] pt-10">
                <p className="text-label-upper mb-4">Support</p>
                <a
                  href={`mailto:${siteConfig.email.support}`}
                  className="text-[var(--color-graphite-mid)] hover:text-[var(--color-accent)] transition-colors duration-[var(--duration-base)]"
                  aria-label={`Support email: ${siteConfig.email.support}`}
                >
                  {siteConfig.email.support}
                </a>
              </div>

              <div className="border-t border-[var(--color-border)] pt-10">
                <p className="text-label-upper mb-4">Response time</p>
                <p className="text-secondary">
                  We respond to all enquiries within one business day.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
