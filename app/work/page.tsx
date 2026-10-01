import type { Metadata } from 'next'
import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { getPublishedProjects } from '@/content/projects'

export const metadata: Metadata = generatePageMetadata({
  title: 'Work',
  description:
    'Selected projects by Avorria — digital products, web applications, AI systems and digital infrastructure built for ambitious businesses.',
  path: '/work',
})

export default function WorkPage() {
  const projects = getPublishedProjects()

  return (
    <div className="section-y-large">
      <div className="container-max">
        <div className="container-content">

          <Breadcrumb items={[{ label: 'Work' }]} className="mb-12" />

          <div className="border-b border-[var(--color-border)] pb-16 mb-16">
            <Eyebrow>Selected work</Eyebrow>
            <h1 className="text-display-l max-w-[640px]">
              What we've built.
            </h1>
          </div>

          {projects.length === 0 ? (
            <div className="border border-[var(--color-border)] p-16 text-center">
              <p className="text-label-upper mb-4">Projects coming soon</p>
              <p className="text-secondary max-w-[400px] mx-auto mb-8">
                We are preparing case studies. Only verified, factual project
                information will appear here.
              </p>
              <Button as="link" href="/start-a-project" variant="primary" size="md">
                Start your project ↗
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-0">
                {projects.map((project, i) => (
                  <RevealOnScroll key={project.slug} delay={i * 80}>
                    <Link
                      href={`/work/${project.slug}`}
                      className="group block border-t border-[var(--color-border)] py-14 hover:border-[var(--color-border-strong)] transition-colors duration-[var(--duration-base)]"
                      aria-label={`${project.title} — view case study`}
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr_240px_40px] gap-6 lg:gap-10 items-start">
                        <div>
                          <p className="text-label-upper text-muted">{project.year}</p>
                        </div>
                        <div>
                          <h2 className="text-display-s mb-2 group-hover:text-[var(--color-accent)] transition-colors duration-[var(--duration-base)]">
                            {project.title}
                          </h2>
                          <p className="text-label-upper text-muted mb-4">{project.industry}</p>
                          <p className="text-secondary">{project.summary}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.services.map((s) => (
                            <span key={s} className="text-label-upper border border-[var(--color-border)] px-3 py-1.5 text-muted">
                              {s.replace(/-/g, ' ')}
                            </span>
                          ))}
                        </div>
                        <div className="hidden lg:flex justify-end pt-1">
                          <span className="text-muted group-hover:text-[var(--color-accent)] group-hover:translate-x-1 transition-all duration-[var(--duration-base)]" aria-hidden="true">→</span>
                        </div>
                      </div>
                    </Link>
                  </RevealOnScroll>
                ))}
                <div className="border-t border-[var(--color-border)]" aria-hidden="true" />
              </div>

              <div className="mt-16 border-t border-[var(--color-border)] pt-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                  <div>
                    <h2 className="text-display-s mb-4">Have something to build?</h2>
                    <Button as="link" href="/start-a-project" variant="primary" size="md">
                      Start a project ↗
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  )
}
