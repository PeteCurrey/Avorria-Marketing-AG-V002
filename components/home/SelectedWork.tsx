import Link from 'next/link'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { getFeaturedProjects } from '@/content/projects'

export function SelectedWork() {
  const projects = getFeaturedProjects()

  return (
    <section
      className="section-y-large border-b border-[var(--color-border)]"
      aria-labelledby="work-heading"
    >
      <div className="container-max">
        <div className="container-content">

          <div className="flex items-end justify-between mb-16 lg:mb-24">
            <RevealOnScroll>
              <Eyebrow>02 — Selected Work</Eyebrow>
              <h2 id="work-heading" className="text-display-l">
                What we've built.
              </h2>
            </RevealOnScroll>

            <RevealOnScroll>
              <Link
                href="/work"
                className="hidden md:inline-flex items-center gap-2 text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] border-b border-transparent hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors duration-[var(--duration-base)]"
              >
                All work →
              </Link>
            </RevealOnScroll>
          </div>

          {projects.length === 0 ? (
            /* Placeholder shown when no published projects exist yet */
            <RevealOnScroll>
              <div className="border border-[var(--color-border)] rounded-[var(--radius-md)] p-12 text-center">
                <p className="text-label-upper mb-4">Coming soon</p>
                <p className="text-secondary">
                  Selected case studies will appear here. Projects are reviewed before publishing.
                </p>
              </div>
            </RevealOnScroll>
          ) : (
            <div className="space-y-0">
              {projects.map((project, i) => (
                <RevealOnScroll key={project.slug} delay={i * 100}>
                  <Link
                    href={`/work/${project.slug}`}
                    className="group block border-t border-[var(--color-border)] py-10 lg:py-14 hover:border-[var(--color-border-strong)] transition-colors duration-[var(--duration-base)]"
                    aria-label={`${project.title} — view case study`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-center">
                      <div>
                        <p className="text-label-upper mb-4">{project.industry} / {project.year}</p>
                        <h3 className="text-display-s mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-[var(--duration-base)]">
                          {project.title}
                        </h3>
                        <p className="text-secondary max-w-[560px]">{project.summary}</p>
                        <div className="flex gap-3 mt-5 flex-wrap">
                          {project.services.map((s) => (
                            <span
                              key={s}
                              className="text-label-upper text-[var(--color-graphite-muted)] border border-[var(--color-border)] px-3 py-1.5"
                            >
                              {s.replace(/-/g, ' ')}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span
                        className="hidden lg:block text-[1.5rem] text-[var(--color-graphite-muted)] group-hover:text-[var(--color-accent)] group-hover:translate-x-1 transition-all duration-[var(--duration-base)]"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </div>
                  </Link>
                </RevealOnScroll>
              ))}
              <div className="border-t border-[var(--color-border)]" aria-hidden="true" />
            </div>
          )}

          {/* Mobile CTA */}
          <div className="mt-10 md:hidden">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] border-b border-transparent hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors duration-[var(--duration-base)]"
            >
              View all work →
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
