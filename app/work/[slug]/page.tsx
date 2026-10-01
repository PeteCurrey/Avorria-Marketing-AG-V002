import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Button } from '@/components/ui/Button'
import { getProject, getPublishedProjectSlugs } from '@/content/projects'
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
          <div className="border-b border-[var(--color-border)] pb-16 mb-16">
            <div className="flex flex-wrap gap-4 mb-8">
              <span className="text-label-upper text-muted">{project.industry}</span>
              <span className="text-label-upper text-muted">—</span>
              <span className="text-label-upper text-muted">{project.year}</span>
            </div>
            <h1 className="text-display-l max-w-[700px] mb-6">{project.title}</h1>
            <p className="text-body-l text-secondary max-w-[560px]">{project.description}</p>
          </div>

          {/* Meta grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 mb-16">
            {[
              { label: 'Client', value: project.client },
              { label: 'Year', value: String(project.year) },
              { label: 'Industry', value: project.industry },
              {
                label: 'Services',
                value: project.services.map((s) => s.replace(/-/g, ' ')).join(', '),
              },
            ].map(({ label, value }) => (
              <div key={label} className="border-l border-t border-[var(--color-border)] p-6">
                <p className="text-label-upper text-muted mb-2">{label}</p>
                <p className="text-[var(--text-small)] text-[var(--color-graphite)] capitalize">
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Conditional sections — only render if content exists */}
          {project.challenge && (
            <div className="border-t border-[var(--color-border)] py-12 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8">
              <p className="text-label-upper">Challenge</p>
              <p className="text-secondary leading-relaxed">{project.challenge}</p>
            </div>
          )}

          {project.approach && (
            <div className="border-t border-[var(--color-border)] py-12 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8">
              <p className="text-label-upper">Approach</p>
              <p className="text-secondary leading-relaxed">{project.approach}</p>
            </div>
          )}

          {project.outcome && (
            <div className="border-t border-[var(--color-border)] py-12 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8">
              <p className="text-label-upper">Outcome</p>
              <p className="text-secondary leading-relaxed">{project.outcome}</p>
            </div>
          )}

          {project.technology && project.technology.length > 0 && (
            <div className="border-t border-[var(--color-border)] py-12 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8">
              <p className="text-label-upper">Technology</p>
              <div className="flex flex-wrap gap-3">
                {project.technology.map((t) => (
                  <span key={t} className="text-label-upper border border-[var(--color-border)] px-4 py-2 text-secondary">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="border-t border-[var(--color-border)] pt-16 mt-4">
            <div className="flex flex-wrap gap-4 items-center">
              <Button as="link" href="/start-a-project" variant="primary" size="md">
                Start a project ↗
              </Button>
              <Button as="link" href="/work" variant="ghost" size="md">
                ← All work
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
