import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Cookie Policy',
  description: 'Cookie Policy for Avorria — information about cookies used on this website.',
  path: '/cookies',
})

export default function CookiesPage() {
  return (
    <div className="section-y-large">
      <div className="container-max">
        <div className="container-content container-text">
          <div className="border-b border-[var(--color-border)] pb-12 mb-12">
            <p className="text-label-upper mb-4">Legal</p>
            <h1 className="text-display-m">Cookie Policy</h1>
            <p className="text-muted text-[var(--text-small)] mt-4">Last updated: October 2026</p>
          </div>
          <div className="space-y-8 text-secondary leading-relaxed">
            <section>
              <h2 className="text-[var(--text-heading)] font-display font-normal text-[var(--color-graphite)] mb-4">
                What are cookies?
              </h2>
              <p>
                Cookies are small text files stored on your device when you
                visit a website. They help websites function correctly and
                can provide information about how the site is used.
              </p>
            </section>
            <section>
              <h2 className="text-[var(--text-heading)] font-display font-normal text-[var(--color-graphite)] mb-4">
                Cookies we use
              </h2>
              <p>This website uses a minimal set of cookies:</p>
              <div className="mt-4 space-y-4">
                <div className="border border-[var(--color-border)] p-5">
                  <p className="text-[var(--text-small)] font-light text-[var(--color-graphite)] mb-1">Essential cookies</p>
                  <p className="text-[var(--text-small)] font-light">
                    Required for the website to function. These include session
                    management and security cookies. They cannot be disabled.
                  </p>
                </div>
                <div className="border border-[var(--color-border)] p-5">
                  <p className="text-[var(--text-small)] font-light text-[var(--color-graphite)] mb-1">Analytics cookies (if enabled)</p>
                  <p className="text-[var(--text-small)] font-light">
                    If analytics are configured, we use privacy-conscious
                    analytics that do not track you across other websites,
                    set cross-site cookies, or fingerprint your device.
                  </p>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-[var(--text-heading)] font-display font-normal text-[var(--color-graphite)] mb-4">
                Managing cookies
              </h2>
              <p>
                You can control and delete cookies through your browser
                settings. Disabling cookies may affect website functionality.
              </p>
            </section>
            <section>
              <h2 className="text-[var(--text-heading)] font-display font-normal text-[var(--color-graphite)] mb-4">
                Contact
              </h2>
              <p>
                Questions about our cookie use? Contact us at{' '}
                <a href="mailto:hello@avorria.com" className="underline hover:text-[var(--color-accent)]">
                  hello@avorria.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
