import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Button } from '@/components/ui/Button'
import { ProjectMedia } from '@/components/ui/ProjectMedia'
import { MediaPlaceholder } from '@/components/ui/MediaPlaceholder'
import { CinematicPlate } from '@/components/cinematic/CinematicPlate'
import { ChapterRenderer } from '@/components/case-study/ChapterRenderer'
import { EvidenceLedger } from '@/components/case-study/EvidenceLedger'
import { CaseStudyGallery } from '@/components/case-study/CaseStudyGallery'
import { generatePageMetadata } from '@/lib/metadata'
import { getProject, getPublishedProjectSlugs } from '@/content/projects'
import { getVerifiedCaseStudyBySlug } from '@/content/case-studies/registry'
import { getProjectMedia } from '@/content/media/registry'
import { siteConfig } from '@/content/config/site'

/** Atmospheric cinematic still for opening exhibition visual */
const CINEMATIC_MAP: Record<string, string> = {
  'alkota-bikes': '/images/cinematic/work-alkota.jpg',
  tafm: '/images/cinematic/work-tafm.jpg',
  drawdown: '/images/cinematic/work-drawdown.jpg',
  careeros: '/images/cinematic/work-careeros.jpg',
  nestiq: '/images/cinematic/work-nestiq.jpg',
  entirefm: '/images/cinematic/work-entirefm.jpg',
}

const SPEC_SUBTITLE_MAP: Record<string, { annotation: string; metadata: string }> = {
  'alkota-bikes': {
    annotation: 'CASE STUDY 01 · PRECISION CYCLING',
    metadata: 'BESPOKE TITANIUM FLAGSHIP & 3D STAGE',
  },
  tafm: {
    annotation: 'CASE STUDY 02 · COMMERCIAL MARKETPLACE',
    metadata: 'MARKETPLACE INFRASTRUCTURE & UNDERWRITING',
  },
  drawdown: {
    annotation: 'CASE STUDY 03 · QUANTITATIVE RISK',
    metadata: 'SUB-MILLISECOND CANVAS & WEBGL TELEMETRY',
  },
  careeros: {
    annotation: 'CASE STUDY 04 · AI TALENT INFRASTRUCTURE',
    metadata: 'AUTONOMOUS AGENT TAXONOMY ORCHESTRATION',
  },
  nestiq: {
    annotation: 'CASE STUDY 05 · SPATIAL PROPERTY INTELLIGENCE',
    metadata: 'POSTGIS & VECTOR TILE PIPELINE',
  },
  entirefm: {
    annotation: 'CASE STUDY 06 · FACILITIES LOGISTICS',
    metadata: 'MULTI-REGION DISPATCH & TECHNICAL SEARCH',
  },
  'one-great-northern': {
    annotation: 'CASE STUDY 07 · ARCHITECTURAL SHOWCASE',
    metadata: 'INTERACTIVE FLOORPLATE & LEASING SPECIFICATION',
  },
}

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
  return generatePageMetadata({
    title: project.seo.title,
    description: project.seo.description,
    path: `/work/${slug}`,
    ogImage: project.heroImage?.src,
    type: 'article',
  })
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const detailedCaseStudy = getVerifiedCaseStudyBySlug(slug)
  const mediaPackage = getProjectMedia(slug)

  // Structured Data Schema.org
  const caseStudySchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    headline: project.title,
    name: project.title,
    description: project.description,
    url: `${siteConfig.url}/work/${slug}`,
    datePublished: `${project.year}-01-01`,
    author: {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    image: project.heroImage?.src ? `${siteConfig.url}${project.heroImage.src}` : undefined,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }}
      />
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
              <span className="text-label-upper text-muted font-light">{project.industry}</span>
              <span className="text-label-upper text-muted">—</span>
              <span className="text-label-upper text-muted font-light">{project.year}</span>
              {detailedCaseStudy && (
                <>
                  <span className="text-label-upper text-muted">—</span>
                  <span className="text-label-upper font-light text-[var(--color-accent)]">
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

          {/* Case Study Hero Media Visual Plate: Cinematic Still & Annotation */}
          <div className="mb-16">
            {CINEMATIC_MAP[slug] || project.heroImage?.src ? (
              <CinematicPlate
                src={CINEMATIC_MAP[slug] ?? project.heroImage?.src ?? ''}
                alt={project.heroImage?.alt || `${project.title} atmospheric case study still`}
                aspectRatio="21/9"
                priority
                sizes="(min-width: 1024px) 86vw, 100vw"
                annotation={SPEC_SUBTITLE_MAP[slug]?.annotation ?? `CASE STUDY // ${project.industry.toUpperCase()}`}
                metadata={SPEC_SUBTITLE_MAP[slug]?.metadata ?? 'VERIFIED PRODUCTION DEPLOYMENT'}
              />
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
                <p className="text-label-upper text-muted mb-2 font-light">{label}</p>
                <p className="text-[var(--text-small)] text-[var(--color-graphite)] capitalize font-light">
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* ── Verified Visual Evidence Artefacts Gallery ───────────────────────── */}
          {mediaPackage && mediaPackage.gallery.length > 0 && (
            <CaseStudyGallery items={mediaPackage.gallery} />
          )}

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
                  <p className="text-label-upper font-light">Challenge</p>
                  <p className="text-secondary leading-relaxed font-light">{project.challenge}</p>
                </div>
              )}

              {project.approach && (
                <div className="border-t border-[var(--color-border)] py-12 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8">
                  <p className="text-label-upper font-light">Approach</p>
                  <p className="text-secondary leading-relaxed font-light">{project.approach}</p>
                </div>
              )}

              {project.outcome && (
                <div className="border-t border-[var(--color-border)] py-12 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8">
                  <p className="text-label-upper font-light">Outcome</p>
                  <p className="text-secondary leading-relaxed font-light">{project.outcome}</p>
                </div>
              )}
            </>
          )}

          {/* Technology badges */}
          {project.technology && project.technology.length > 0 && (
            <div className="border-t border-[var(--color-border)] py-12 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8">
              <p className="text-label-upper font-light">Engineering Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.technology.map((t) => (
                  <span key={t} className="text-label-upper font-light border border-[var(--color-border)] px-3 py-1.5 text-secondary text-[11px]">
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
              <span className="text-[10px] font-light text-[var(--color-graphite-muted)] uppercase">
                AVORRIA ARCHITECTURAL INVESTIGATION // {project.year}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
    </>
  )
}
