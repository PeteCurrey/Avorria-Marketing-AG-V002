import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Button } from '@/components/ui/Button'
import { ProjectMedia } from '@/components/ui/ProjectMedia'
import { MediaPlaceholder } from '@/components/ui/MediaPlaceholder'
import { ChapterRenderer } from '@/components/case-study/ChapterRenderer'
import { EvidenceLedger } from '@/components/case-study/EvidenceLedger'
import { getProject, getPublishedProjectSlugs } from '@/content/projects'
import { getVerifiedCaseStudyBySlug } from '@/content/case-studies/registry'
import { siteConfig } from '@/content/config/site'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getPublishedProjectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: project.seo.title,
    description: project.seo.description,
    alternates: { canonical: `${siteConfig.url}/work/${slug}` },
    openGraph: {
      title: project.seo.title,
      description: project.seo.description,
      url: `${siteConfig.url}/work/${slug}`,
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const detailedCaseStudy = getVerifiedCaseStudyBySlug(slug)

  return (
    <div className="section-y-large">
      <div className="container-max">
        <div className="container-content">

          <Breadcrumb
            items={[
              { label: 'Work', href: '/work' },
              { label: project.title },
            ]}
            className="mb-12"
          />

          {/* Header */}
          <div className="border-b border-[var(--color-border)] pb-12 mb-12">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="text-label-upper text-muted font-mono">{project.industry}</span>
              <span className="text-label-upper text-muted">—</span>
              <span className="text-label-upper text-muted font-mono">{project.year}</span>
              {detailedCaseStudy && (
                <>
                  <span className="text-label-upper text-muted">—</span>
                  <span className="text-label-upper font-mono text-[var(--color-accent)]">
                    PROVENANCE: {detailedCaseStudy.provenance.toUpperCase()}
                  </span>
                </>
              )}
            </div>
            <h1 className="text-display-l max-w-[800px] mb-6 font-extralight tracking-tight">
              {project.title}
            </h1>
            <p className="text-body-l text-secondary max-w-[620px] font-light leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Case Study Hero Media Visual Plate */}
          <div className="mb-16">
            {project.heroImage?.src ? (
              <div className="relative w-full aspect-[21/9] overflow-hidden border border-[var(--color-border)]">
                <ProjectMedia
                  src={project.heroImage.src}
                  alt={project.heroImage.alt || project.title}
                  fill
                  priority
                  sizes="100vw"
                />
              </div>
            ) : project.heroVideo?.src ? (
              <div className="relative w-full aspect-[21/9] overflow-hidden border border-[var(--color-border)]">
                <ProjectMedia
                  type="video"
                  src={project.heroVideo.src}
                  poster={project.heroVideo.poster}
                  alt={project.heroVideo.alt || project.title}
                  fill
                  priority
                  sizes="100vw"
                />
              </div>
            ) : (
              <div className="relative w-full aspect-[21/9] min-h-[320px] overflow-hidden border border-[var(--color-border)]">
                <MediaPlaceholder
                  variant="hero"
                  title={project.title}
                  client={project.client}
                  sector={project.industry}
                  discipline={detailedCaseStudy?.discipline || '01 // VERIFIED PRODUCTION FLAGSHIP'}
                  specs={
                    project.technology
                      ? project.technology.slice(0, 3).map((t, idx) => ({
                          label: `LAYER 0${idx + 1}`,
                          value: t.toUpperCase(),
                        }))
                      : [
                          { label: 'DELIVERY', value: 'SERVER-FIRST' },
                          { label: 'TOLERANCES', value: 'SURGICAL' },
                        ]
                  }
                />
              </div>
            )}
          </div>

          {/* Meta grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 mb-16 border-b border-[var(--color-border)]">
            {[
              { label: 'Client', value: project.client },
              { label: 'Year', value: String(project.year) },
              { label: 'Industry', value: project.industry },
              {
                label: 'Services',
                value: project.services.map((s) => s.replace(/-/g, ' ')).join(', '),
              },
            ].map(({ label, value }) => (
              <div key={label} className="border-l border-t border-[var(--color-border)] p-6 last:border-r md:last:border-r-0">
                <p className="text-label-upper text-muted mb-2 font-mono">{label}</p>
                <p className="text-[var(--text-small)] text-[var(--color-graphite)] capitalize font-light">
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Render In-Depth Investigation Chapters if present in Registry */}
          {detailedCaseStudy && detailedCaseStudy.chapters.length > 0 ? (
            <div className="mb-16">
              {detailedCaseStudy.chapters.map((chapter) => (
                <ChapterRenderer
                  key={chapter.id}
                  chapter={chapter}
                  projectSlug={slug}
                />
              ))}

              {detailedCaseStudy.qualitativeEvidence && detailedCaseStudy.qualitativeEvidence.length > 0 && (
                <div className="border-t border-[var(--color-border)] pt-16">
                  <EvidenceLedger
                    evidence={detailedCaseStudy.qualitativeEvidence}
                  />
                </div>
              )}
            </div>
          ) : (
            /* Fallback to Standard Case Study Sections */
            <>
              {project.challenge && (
                <div className="border-t border-[var(--color-border)] py-12 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8">
                  <p className="text-label-upper font-mono">Challenge</p>
                  <p className="text-secondary leading-relaxed font-light">{project.challenge}</p>
                </div>
              )}

              {project.approach && (
                <div className="border-t border-[var(--color-border)] py-12 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8">
                  <p className="text-label-upper font-mono">Approach</p>
                  <p className="text-secondary leading-relaxed font-light">{project.approach}</p>
                </div>
              )}

              {project.outcome && (
                <div className="border-t border-[var(--color-border)] py-12 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8">
                  <p className="text-label-upper font-mono">Outcome</p>
                  <p className="text-secondary leading-relaxed font-light">{project.outcome}</p>
                </div>
              )}
            </>
          )}

          {/* Technology badges */}
          {project.technology && project.technology.length > 0 && (
            <div className="border-t border-[var(--color-border)] py-12 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8">
              <p className="text-label-upper font-mono">Engineering Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.technology.map((t) => (
                  <span key={t} className="text-label-upper font-mono border border-[var(--color-border)] px-3 py-1.5 text-secondary text-[11px]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Case Study Bottom CTA */}
          <div className="border-t border-[var(--color-border)] pt-16 mt-8">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-4 items-center">
                <Button as="link" href="/start-a-project" variant="primary" size="md">
                  Commission Similar Architecture ↗
                </Button>
                <Button as="link" href="/work" variant="ghost" size="md">
                  ← All Case Studies
                </Button>
              </div>
              <span className="text-[10px] font-mono text-[var(--color-graphite-muted)] uppercase">
                AVORRIA ARCHITECTURAL INVESTIGATION // {project.year}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
