import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
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
import { getService } from '@/content/services'
import { getArticleBySlug } from '@/lib/lobby'
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

  const primaryService = detailedCaseStudy?.primaryServiceSlug
    ? getService(detailedCaseStudy.primaryServiceSlug)
    : undefined

  const secondaryServices = (detailedCaseStudy?.secondaryServiceSlugs ?? [])
    .map((s) => getService(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))

  const relatedArticles = detailedCaseStudy?.relatedLobbySlugs
    ? (await Promise.all(detailedCaseStudy.relatedLobbySlugs.map((s) => getArticleBySlug(s))))
        .filter((a): a is NonNullable<typeof a> => Boolean(a))
    : []

  const relatedProjects = (detailedCaseStudy?.relatedProjectSlugs ?? [])
    .map((s) => getProject(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  // Structured Data Schema.org: TechArticle + CreativeWork
  const caseStudySchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${siteConfig.url}/work/${slug}#case-study`,
    headline: project.seo?.title || project.title,
    name: project.title,
    description: project.seo?.description || project.description,
    url: `${siteConfig.url}/work/${slug}`,
    datePublished: `${project.year}-01-01`,
    inLanguage: 'en-GB',
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
    about: [
      detailedCaseStudy?.primaryServiceSlug
        ? {
            '@type': 'Service',
            '@id': `${siteConfig.url}/services/${detailedCaseStudy.primaryServiceSlug}#service`,
            name: primaryService?.title ?? detailedCaseStudy.primaryServiceSlug.toUpperCase(),
          }
        : null,
      ...(detailedCaseStudy?.secondaryServiceSlugs?.map((sec) => ({
        '@type': 'Service',
        '@id': `${siteConfig.url}/services/${sec}#service`,
        name: sec.toUpperCase(),
      })) ?? []),
    ].filter(Boolean),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteConfig.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Work',
        item: `${siteConfig.url}/work`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.title,
        item: `${siteConfig.url}/work/${slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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

          {/* ── 01 // Core Service Discipline Anchor ───────────────────────── */}
          {primaryService && (
            <div className="border-t border-[var(--color-border)] py-14" aria-label="Core service discipline">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[10px] tracking-[0.2em] uppercase font-light text-[var(--color-graphite-muted)]">
                  01 // CORE SERVICE CAPABILITY
                </span>
                <span className="h-px w-10 bg-[var(--color-border-strong)]" aria-hidden="true" />
              </div>
              <div className="border border-[var(--color-border)] bg-[var(--color-ivory-light)] p-8 md:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
                  <div>
                    <span className="text-[10px] tracking-[0.16em] uppercase font-light text-[var(--color-rose-text)] block mb-2">
                      {primaryService.disciplineEyebrow ?? 'PRIMARY DISCIPLINE'}
                    </span>
                    <h2 className="text-xl md:text-2xl font-light text-[var(--color-graphite)] mb-3">
                      {primaryService.title} — {primaryService.headline}
                    </h2>
                    <p className="text-xs md:text-sm font-light text-secondary max-w-[70ch] leading-relaxed mb-4">
                      {primaryService.description}
                    </p>
                    {secondaryServices.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        <span className="text-[10px] tracking-[0.14em] uppercase font-light text-muted">
                          Supporting Disciplines:
                        </span>
                        {secondaryServices.map((sec) => (
                          <Link
                            key={sec.slug}
                            href={`/services/${sec.slug}`}
                            className="text-[11px] font-light tracking-[0.08em] uppercase border border-[var(--color-border)] px-2.5 py-1 text-[var(--color-graphite)] hover:border-[var(--color-graphite)] transition-colors"
                          >
                            {sec.title} →
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <Button
                      as="link"
                      href={`/services/${primaryService.slug}`}
                      variant="primary"
                      size="md"
                    >
                      Explore {primaryService.slug.toUpperCase()} Discipline →
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── 02 // Editorial Intelligence & Methodology ─────────────────── */}
          {relatedArticles.length > 0 && (
            <div className="border-t border-[var(--color-border)] py-14" aria-label="Related technical intelligence">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[10px] tracking-[0.2em] uppercase font-light text-[var(--color-graphite-muted)]">
                  02 // EDITORIAL INTELLIGENCE &amp; METHODOLOGY
                </span>
                <span className="h-px w-10 bg-[var(--color-border-strong)]" aria-hidden="true" />
              </div>
              <div className="max-w-2xl mb-8">
                <h2 className="text-display-s font-extralight text-[var(--color-graphite)] tracking-tight mb-2">
                  Engineering research supporting this architecture.
                </h2>
                <p className="text-xs md:text-sm font-light text-secondary">
                  Technical teardowns and architectural essays from The Lobby explaining the principles behind this deployment.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/lobby/${article.slug}`}
                    className="group border border-[var(--color-border)] bg-[var(--color-ivory-light)] p-6 hover:border-[var(--color-graphite)] transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] tracking-[0.16em] uppercase font-light text-[var(--color-graphite-muted)] mb-3">
                        <span className="text-[var(--color-rose-text)]">{article.categoryLabel}</span>
                        <span>{article.readTimeMinutes} min read</span>
                      </div>
                      <h3 className="text-base font-light text-[var(--color-graphite)] mb-2 group-hover:text-[var(--color-rose-text)] transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-xs font-light text-secondary leading-relaxed line-clamp-3 mb-4">
                        {article.dek}
                      </p>
                    </div>
                    <span className="text-[10px] tracking-[0.12em] uppercase font-light text-[var(--color-graphite)] inline-flex items-center gap-1.5 pt-3 border-t border-[var(--color-border)]">
                      Read Analysis <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ── 03 // Comparative Production Architecture ───────────────────── */}
          {relatedProjects.length > 0 && (
            <div className="border-t border-[var(--color-border)] py-14" aria-label="Comparative production deployments">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[10px] tracking-[0.2em] uppercase font-light text-[var(--color-graphite-muted)]">
                  03 // COMPARATIVE ARCHITECTURE
                </span>
                <span className="h-px w-10 bg-[var(--color-border-strong)]" aria-hidden="true" />
              </div>
              <div className="max-w-2xl mb-8">
                <h2 className="text-display-s font-extralight text-[var(--color-graphite)] tracking-tight mb-2">
                  Parallel verified deployments.
                </h2>
                <p className="text-xs md:text-sm font-light text-secondary">
                  Production systems built under similar operational constraints and commercial requirements.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedProjects.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/work/${rel.slug}`}
                    className="group border border-[var(--color-border)] bg-[var(--color-ivory-light)] p-8 hover:border-[var(--color-graphite)] transition-all duration-200"
                  >
                    <div className="flex items-center justify-between text-[10px] tracking-[0.16em] uppercase font-light text-[var(--color-graphite-muted)] mb-3">
                      <span>{rel.client}</span>
                      <span className="text-[var(--color-rose-text)]">{rel.year}</span>
                    </div>
                    <h3 className="text-lg font-light text-[var(--color-graphite)] mb-2 group-hover:text-[var(--color-rose-text)] transition-colors">
                      {rel.title}
                    </h3>
                    <p className="text-xs md:text-sm font-light text-secondary leading-relaxed mb-4">
                      {rel.description}
                    </p>
                    <span className="text-[10px] tracking-[0.12em] uppercase font-light text-[var(--color-graphite)] inline-flex items-center gap-1.5 pt-3 border-t border-[var(--color-border)]">
                      Inspect Deployment <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ── 04 // Contextual Commercial Commissioning CTA ───────────────── */}
          <div className="border-t border-[var(--color-border)] pt-16 mt-8">
            {detailedCaseStudy?.customCta && (
              <div className="border border-[var(--color-border)] bg-[var(--color-ivory-light)] p-8 md:p-12 mb-8">
                <div className="max-w-2xl mb-6">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-light text-[var(--color-rose-text)] block mb-2">
                    COMMERCIAL COMMISSIONING
                  </span>
                  <h2 className="text-display-s font-extralight text-[var(--color-graphite)] tracking-tight mb-3">
                    {detailedCaseStudy.customCta.headline}
                  </h2>
                  <p className="text-xs md:text-sm font-light text-secondary leading-relaxed">
                    {detailedCaseStudy.customCta.subtext}
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 items-center">
                  <Button
                    as="link"
                    href={detailedCaseStudy.customCta.primaryHref}
                    variant="primary"
                    size="md"
                  >
                    {detailedCaseStudy.customCta.primaryLabel} ↗
                  </Button>
                  {detailedCaseStudy.customCta.secondaryHref && (
                    <Button
                      as="link"
                      href={detailedCaseStudy.customCta.secondaryHref}
                      variant="ghost"
                      size="md"
                    >
                      {detailedCaseStudy.customCta.secondaryLabel ?? '← All Case Studies'}
                    </Button>
                  )}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-4 items-center">
                {!detailedCaseStudy?.customCta && (
                  <Button as="link" href="/start-a-project" variant="primary" size="md">
                    Commission Similar Architecture ↗
                  </Button>
                )}
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
