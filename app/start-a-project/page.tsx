import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'
import { ProjectForm } from '@/components/forms/ProjectForm'

export const metadata: Metadata = generatePageMetadata({
  title: 'Start a Project',
  description:
    'Tell Avorria about your project. We design and build digital products, AI systems and high-performance websites for ambitious businesses.',
  path: '/start-a-project',
})

export default function StartAProjectPage() {
  return (
    <div className="section-y-large">
      <div className="container-max">
        <div className="container-content">

          <div className="border-b border-[var(--color-border)] pb-16 mb-16">
            <p className="text-label-upper mb-6">Start a project</p>
            <h1 className="text-display-l max-w-[640px]">
              Tell us what you're building.
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">

            {/* Sidebar */}
            <div className="lg:pt-1">
              <div className="space-y-10">
                <div>
                  <p className="text-label-upper mb-3">What happens next</p>
                  <ol className="space-y-4 text-[var(--text-small)] text-secondary" aria-label="What happens after you submit">
                    {[
                      'We review your enquiry carefully.',
                      'We respond within one business day.',
                      'We schedule a conversation to understand your project.',
                      'We propose a clear approach and next steps.',
                    ].map((step, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-label-upper text-muted shrink-0 pt-0.5">0{i + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="border-t border-[var(--color-border)] pt-8">
                  <p className="text-label-upper mb-3">Prefer email?</p>
                  <a
                    href="mailto:hello@avorria.com"
                    className="text-[var(--text-small)] text-[var(--color-graphite-mid)] hover:text-[var(--color-accent)] transition-colors duration-[var(--duration-base)]"
                  >
                    hello@avorria.com
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <ProjectForm />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
