import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Privacy Policy',
  description: 'Privacy Policy for Avorria — how we collect, use and protect your information.',
  path: '/privacy',
  noIndex: false,
})

export default function PrivacyPage() {
  return (
    <div className="section-y-large">
      <div className="container-max">
        <div className="container-content container-text">
          <div className="border-b border-[var(--color-border)] pb-12 mb-12">
            <p className="text-label-upper mb-4">Legal</p>
            <h1 className="text-display-m">Privacy Policy</h1>
            <p className="text-muted text-[var(--text-small)] mt-4">Last updated: October 2026</p>
          </div>
          <div className="prose-avorria space-y-8 text-secondary leading-relaxed">
            <section>
              <h2 className="text-[var(--text-heading)] font-display font-normal text-[var(--color-graphite)] mb-4">
                Who we are
              </h2>
              <p>
                This website is operated by Avorria. When we refer to "we", "us"
                or "Avorria" in this policy, we mean the Avorria business.
                Our contact email is hello@avorria.com.
              </p>
            </section>
            <section>
              <h2 className="text-[var(--text-heading)] font-display font-normal text-[var(--color-graphite)] mb-4">
                Information we collect
              </h2>
              <p>
                We collect information you provide when you submit a project
                enquiry via our Start a Project form. This includes your name,
                company name, email address, website URL and information about
                your project.
              </p>
              <p className="mt-4">
                We may also collect standard website analytics data (such as
                pages visited and approximate geographic region) through
                privacy-conscious analytics tools that do not track you across
                other websites.
              </p>
            </section>
            <section>
              <h2 className="text-[var(--text-heading)] font-display font-normal text-[var(--color-graphite)] mb-4">
                How we use your information
              </h2>
              <p>We use the information you provide to:</p>
              <ul className="list-disc list-inside mt-3 space-y-1 ml-4">
                <li>Respond to your project enquiry</li>
                <li>Communicate about a potential or ongoing engagement</li>
                <li>Improve our website and services</li>
              </ul>
              <p className="mt-4">
                We do not sell, rent or share your personal data with third
                parties for marketing purposes.
              </p>
            </section>
            <section>
              <h2 className="text-[var(--text-heading)] font-display font-normal text-[var(--color-graphite)] mb-4">
                Data retention
              </h2>
              <p>
                We retain project enquiry information for as long as is
                necessary to manage the enquiry and any resulting engagement.
                You may request deletion of your data at any time by contacting
                hello@avorria.com.
              </p>
            </section>
            <section>
              <h2 className="text-[var(--text-heading)] font-display font-normal text-[var(--color-graphite)] mb-4">
                Your rights
              </h2>
              <p>
                You have the right to access, correct or request deletion of
                your personal data. To exercise these rights, contact us at
                hello@avorria.com.
              </p>
            </section>
            <section>
              <h2 className="text-[var(--text-heading)] font-display font-normal text-[var(--color-graphite)] mb-4">
                Changes to this policy
              </h2>
              <p>
                We may update this policy from time to time. Changes will be
                posted on this page with an updated date.
              </p>
            </section>
            <section>
              <h2 className="text-[var(--text-heading)] font-display font-normal text-[var(--color-graphite)] mb-4">
                Contact
              </h2>
              <p>
                For any privacy-related questions, contact us at{' '}
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
