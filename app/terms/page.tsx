import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Terms of Use',
  description: 'Terms of Use for the Avorria website.',
  path: '/terms',
})

export default function TermsPage() {
  return (
    <div className="section-y-large">
      <div className="container-max">
        <div className="container-content container-text">
          <div className="border-b border-[var(--color-border)] pb-12 mb-12">
            <p className="text-label-upper mb-4">Legal</p>
            <h1 className="text-display-m">Terms of Use</h1>
            <p className="text-muted text-[var(--text-small)] mt-4">Last updated: October 2026</p>
          </div>
          <div className="space-y-8 text-secondary leading-relaxed">
            <section>
              <h2 className="text-[var(--text-heading)] font-display font-normal text-[var(--color-graphite)] mb-4">
                Use of this website
              </h2>
              <p>
                This website is provided by Avorria for general information
                purposes. By accessing this website you agree to these terms.
                If you do not agree, please do not use this website.
              </p>
            </section>
            <section>
              <h2 className="text-[var(--text-heading)] font-display font-normal text-[var(--color-graphite)] mb-4">
                Intellectual property
              </h2>
              <p>
                All content on this website — including text, design, code,
                graphics and branding — is the intellectual property of Avorria
                unless otherwise stated. You may not reproduce, distribute or
                use this content without our written permission.
              </p>
            </section>
            <section>
              <h2 className="text-[var(--text-heading)] font-display font-normal text-[var(--color-graphite)] mb-4">
                Accuracy of information
              </h2>
              <p>
                We aim to ensure the information on this website is accurate
                and current. However, we make no warranty as to its completeness
                or accuracy. Information may change without notice.
              </p>
            </section>
            <section>
              <h2 className="text-[var(--text-heading)] font-display font-normal text-[var(--color-graphite)] mb-4">
                Limitation of liability
              </h2>
              <p>
                To the extent permitted by law, Avorria is not liable for any
                loss or damage arising from your use of this website or reliance
                on information contained herein.
              </p>
            </section>
            <section>
              <h2 className="text-[var(--text-heading)] font-display font-normal text-[var(--color-graphite)] mb-4">
                Governing law
              </h2>
              <p>
                These terms are governed by the laws of England and Wales.
              </p>
            </section>
            <section>
              <h2 className="text-[var(--text-heading)] font-display font-normal text-[var(--color-graphite)] mb-4">
                Contact
              </h2>
              <p>
                Questions about these terms? Contact{' '}
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
