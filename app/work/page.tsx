import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { generatePageMetadata } from '@/lib/metadata'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { Button } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'
import { getPublishedProjects } from '@/content/projects'
import { siteConfig } from '@/content/config/site'

export const metadata: Metadata = generatePageMetadata({
  title: 'Work // Verified Production Engineering Portfolio',
  description:
    'Verified case studies in digital product engineering, quantitative terminals, PostGIS cadastral platforms, and high-performance WebGL flagships by Avorria.',
  path: '/work',
})

/** Cinematic image override map — project slug → cinematic asset */
const CINEMATIC_MAP: Record<string, string> = {
  'alkota-bikes': '/images/cinematic/work-alkota.jpg',
  tafm: '/images/cinematic/work-tafm.jpg',
  drawdown: '/images/cinematic/work-drawdown.jpg',
  careeros: '/images/cinematic/work-careeros.jpg',
  nestiq: '/images/cinematic/work-nestiq.jpg',
  entirefm: '/images/cinematic/work-entirefm.jpg',
}

/** Industry label overrides for editorial annotation strip */
const INDUSTRY_LABEL: Record<string, string> = {
  'alkota-bikes': 'PRECISION ENGINEERING · CYCLING',
  tafm: 'COMMERCIAL MARKETPLACE · FINANCE',
  drawdown: 'QUANTITATIVE FINANCE · TRADING',
  careeros: 'ARTIFICIAL INTELLIGENCE · ENTERPRISE',
  nestiq: 'SPATIAL DATA · REAL ESTATE',
  entirefm: 'FACILITIES MANAGEMENT · OPERATIONS',
  'one-great-northern': 'COMMERCIAL PROPERTY · ARCHITECTURE',
}

export default function WorkPage() {
  const projects = getPublishedProjects()

  // Slice into tiers for editorial layout
  const hero = projects[0]       // Alkota — 21:9 full-bleed monumental
  const duoA = projects.slice(1, 3)  // TAFM (7) + Drawdown (5)
  const duoB = projects.slice(3, 5)  // CareerOS (5) + NestIQ (7)
  const remainder = projects.slice(5) // EntireFM + One Great Northern

  const workSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Selected Work & Case Studies — Avorria',
    description: 'Verified production engineering case studies by Avorria.',
    url: `${siteConfig.url}/work`,
    publisher: {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    hasPart: projects.map((p) => ({
      '@type': 'CreativeWork',
      name: p.title,
      url: `${siteConfig.url}/work/${p.slug}`,
      description: p.description,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workSchema) }}
      />
      <PageHero
        eyebrow="SELECTED WORK / VERIFIED PORTFOLIO"
        headline={[
          { before: 'Websites and systems' },
          { accent: 'built to work.' },
        ]}
        body="Seven verified commercial and technical interventions. Every entry represents production architecture deployed for ambitious operators. Zero fabricated metrics."
        primaryCta={{ label: 'View projects ↓', href: '#projects' }}
        secondaryCta={{ label: 'Start a project ↗', href: '/start-a-project' }}
        image={CINEMATIC_MAP['alkota-bikes']}
        imageAlt="Alkota Bikes — bespoke titanium frame flagship platform"
        metaLeft="VERIFIED PRODUCTION DEPLOYMENTS ONLY"
        metaRight="ZERO FABRICATED METRICS"
      />

      {/* ── AGENCY EXHIBITION ───────────────────────────────────────────────── */}
      <div id="projects" className="bg-[var(--color-graphite)] text-[var(--color-ivory)]">
        <div className="w-full px-6 md:px-10 lg:px-[7vw] py-20 lg:py-32">

          {/* Section eyebrow */}
          <RevealOnScroll>
            <div className="flex items-center gap-4 mb-16 lg:mb-24">
              <span className="text-[0.6875rem] tracking-[0.22em] uppercase font-light text-[var(--color-accent-light)] opacity-70">
                PRODUCTION PORTFOLIO
              </span>
              <span className="h-px flex-1 max-w-[4rem] bg-white/10" aria-hidden="true" />
            </div>
          </RevealOnScroll>

          {/* ── 01. HERO FEATURE: ALKOTA BIKES — 21:9 MONUMENTAL ── */}
          {hero && (
            <div className="mb-20 lg:mb-32">
              <RevealOnScroll>
                <article className="group">
                  {/* Telemetry strip */}
                  <div className="flex items-center justify-between pb-3 mb-5 border-b border-white/10 text-[10px] tracking-[0.18em] uppercase text-white/50 font-light">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
                      <span>{INDUSTRY_LABEL[hero.slug] ?? hero.industry}</span>
                    </span>
                    <span>CASE STUDY 01 · {hero.year}</span>
                  </div>

                  <Link
                    href={`/work/${hero.slug}`}
                    className="relative block w-full overflow-hidden border border-white/10"
                    style={{ aspectRatio: '21/9' }}
                    aria-label={`View ${hero.title} case study`}
                  >
                    <Image
                      src={CINEMATIC_MAP[hero.slug] ?? hero.heroImage?.src ?? ''}
                      alt={hero.heroImage?.alt ?? hero.title}
                      fill
                      priority
                      sizes="(min-width: 1024px) 86vw, 100vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Bottom title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 px-6 md:px-10 pb-7 md:pb-10 flex items-end justify-between">
                      <div>
                        <p className="text-[10px] tracking-[0.16em] uppercase font-light text-white/60 mb-2">
                          {hero.summary}
                        </p>
                        <h2
                          className="font-extralight text-white leading-[1.0] tracking-[-0.02em] group-hover:opacity-90 transition-opacity"
                          style={{ fontSize: 'clamp(2.2rem, 5vw, 5.5rem)' }}
                        >
                          {hero.title}
                        </h2>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-light tracking-[0.1em] uppercase text-white/80 group-hover:text-white border-b border-white/30 group-hover:border-white pb-1 transition-all self-end mb-1">
                        <span>View Case Study</span>
                        <span aria-hidden="true">↗</span>
                      </div>
                    </div>
                  </Link>
                </article>
              </RevealOnScroll>
            </div>
          )}

          {/* ── 02. EDITORIAL DUO A: 7/5 COLUMNS — TAFM + DRAWDOWN ── */}
          {duoA.length === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20 lg:mb-32">
              {/* TAFM — 7 cols */}
              <div className="lg:col-span-7">
                <RevealOnScroll delay={80}>
                  <ProjectCard
                    project={duoA[0]}
                    index={2}
                    cinematicSrc={CINEMATIC_MAP[duoA[0].slug]}
                    aspectRatio="16/10"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </RevealOnScroll>
              </div>
              {/* Drawdown — 5 cols */}
              <div className="lg:col-span-5">
                <RevealOnScroll delay={180}>
                  <ProjectCard
                    project={duoA[1]}
                    index={3}
                    cinematicSrc={CINEMATIC_MAP[duoA[1].slug]}
                    aspectRatio="16/10"
                    sizes="(min-width: 1024px) 36vw, 100vw"
                  />
                </RevealOnScroll>
              </div>
            </div>
          )}

          {/* ── 03. EDITORIAL DUO B: 5/7 COLUMNS — CAREEROS + NESTIQ ── */}
          {duoB.length === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20 lg:mb-32">
              {/* CareerOS — 5 cols */}
              <div className="lg:col-span-5">
                <RevealOnScroll delay={80}>
                  <ProjectCard
                    project={duoB[0]}
                    index={4}
                    cinematicSrc={CINEMATIC_MAP[duoB[0].slug]}
                    aspectRatio="16/10"
                    sizes="(min-width: 1024px) 36vw, 100vw"
                  />
                </RevealOnScroll>
              </div>
              {/* NestIQ — 7 cols */}
              <div className="lg:col-span-7">
                <RevealOnScroll delay={180}>
                  <ProjectCard
                    project={duoB[1]}
                    index={5}
                    cinematicSrc={CINEMATIC_MAP[duoB[1].slug]}
                    aspectRatio="16/10"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </RevealOnScroll>
              </div>
            </div>
          )}

          {/* ── 04. REMAINDER: EVEN 6/6 PAIR ── */}
          {remainder.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16 lg:mb-24">
              {remainder.map((project, i) => (
                <RevealOnScroll key={project.slug} delay={i * 100}>
                  <ProjectCard
                    project={project}
                    index={6 + i}
                    cinematicSrc={CINEMATIC_MAP[project.slug]}
                    aspectRatio="16/10"
                    sizes="(min-width: 1024px) 44vw, 100vw"
                  />
                </RevealOnScroll>
              ))}
            </div>
          )}

          {/* ── CLOSING CTA ── */}
          <div className="border-t border-white/10 pt-10 mt-4 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-xs font-light text-white/50 tracking-[0.04em]">
              Every entry represents production architecture deployed for ambitious operators.
            </p>
            <Button as="link" href="/start-a-project" variant="secondary" size="md" className="btn-dark-outline">
              Start a project ↗
            </Button>
          </div>

        </div>
      </div>

      {/* ── DISCIPLINE ARCHITECTURE STRIP ─────────────────────────────────── */}
      <div className="bg-[var(--color-ivory)] border-t border-[var(--color-border)]">
        <div className="w-full px-6 md:px-10 lg:px-[7vw] py-20">
          <RevealOnScroll>
            <div className="flex items-center gap-4 mb-12">
              <span className="text-[10px] tracking-[0.22em] uppercase font-light text-[var(--color-graphite-muted)]">
                ARCHITECTURAL DISCIPLINES
              </span>
              <span className="h-px flex-1 max-w-[4rem] bg-[var(--color-border-strong)]" aria-hidden="true" />
            </div>

            <div className="max-w-2xl mb-12">
              <h2 className="text-display-s font-extralight text-[var(--color-graphite)] tracking-tight mb-3">
                Three disciplines. One engineering standard.
              </h2>
              <p className="text-sm font-light text-secondary leading-relaxed">
                Every case study in this portfolio connects to one or more of Avorria&apos;s three technical disciplines. Explore the methodology behind the work.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[var(--color-border)]">
              {[
                {
                  slug: 'build',
                  label: '01 // BUILD',
                  headline: 'Digital flagships & bespoke web applications.',
                  description: 'Bespoke Next.js architecture, interactive software, and engineered digital flagships. Built for performance, not compromised by templates.',
                  count: '4 verified deployments',
                  slugs: ['alkota-bikes', 'tafm', 'nestiq', 'one-great-northern'],
                },
                {
                  slug: 'search',
                  label: '02 // SEARCH',
                  headline: 'Technical SEO & organic search architecture.',
                  description: 'Enterprise crawl architecture, migration engineering, and Core Web Vitals remediation. Organic search treated as an engineering discipline.',
                  count: '3 verified deployments',
                  slugs: ['alkota-bikes', 'entirefm', 'one-great-northern'],
                },
                {
                  slug: 'systems',
                  label: '03 // SYSTEMS',
                  headline: 'Commercial data systems & intelligent automation.',
                  description: 'AI pipelines, server-side attribution, payment infrastructure, and autonomous workflow automation. Backend systems that compound in value.',
                  count: '3 verified deployments',
                  slugs: ['drawdown', 'careeros', 'nestiq'],
                },
              ].map((disc, i) => (
                <Link
                  key={disc.slug}
                  href={`/services/${disc.slug}`}
                  className={`group p-8 md:p-10 hover:bg-white transition-all duration-200 border-[var(--color-border)]${i > 0 ? ' md:border-l' : ''}`}
                >
                  <div className="text-[10px] tracking-[0.2em] uppercase font-light text-[var(--color-rose-text)] mb-4">
                    {disc.label}
                  </div>
                  <h3 className="text-base md:text-lg font-light text-[var(--color-graphite)] mb-3 group-hover:text-[var(--color-rose-text)] transition-colors leading-snug">
                    {disc.headline}
                  </h3>
                  <p className="text-xs font-light text-secondary leading-relaxed mb-6">
                    {disc.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
                    <span className="text-[10px] tracking-[0.12em] uppercase font-light text-muted">
                      {disc.count}
                    </span>
                    <span className="text-[10px] tracking-[0.12em] uppercase font-light text-[var(--color-graphite)] inline-flex items-center gap-1 group-hover:text-[var(--color-rose-text)] transition-colors">
                      Explore Discipline <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   ProjectCard — reusable dark-chapter project tile
   ───────────────────────────────────────────────────────────────────────────── */
interface ProjectCardProps {
  project: ReturnType<typeof getPublishedProjects>[number]
  index: number
  cinematicSrc?: string
  aspectRatio?: string
  sizes?: string
}

function ProjectCard({
  project,
  index,
  cinematicSrc,
  aspectRatio = '16/10',
  sizes = '(min-width: 1024px) 44vw, 100vw',
}: ProjectCardProps) {
  const imageSrc = cinematicSrc ?? project.heroImage?.src ?? ''
  const imageAlt = project.heroImage?.alt ?? project.title

  return (
    <article className="group h-full flex flex-col">
      {/* Telemetry strip */}
      <div className="flex items-center justify-between pb-3 mb-5 border-b border-white/10 text-[10px] tracking-[0.18em] uppercase text-white/50 font-light">
        <span className="flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-[var(--color-accent)] opacity-60" aria-hidden="true" />
          <span>{project.industry}</span>
        </span>
        <span>CASE STUDY {String(index).padStart(2, '0')}</span>
      </div>

      <Link
        href={`/work/${project.slug}`}
        className="relative block w-full bg-[#0D0C0B] overflow-hidden mb-5 border border-white/10"
        style={{ aspectRatio }}
        aria-label={`View ${project.title} case study`}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes={sizes}
            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-white/20 uppercase font-light">
            {project.title}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </Link>

      <h2 className="text-2xl md:text-3xl font-extralight text-[var(--color-ivory)] tracking-[-0.01em] group-hover:text-[var(--color-accent-light)] transition-colors mb-2">
        {project.title}
      </h2>

      <p className="text-sm font-light text-white/60 leading-relaxed mb-5 grow line-clamp-2">
        {project.summary}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex flex-wrap gap-1.5">
          {project.technology?.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-[9px] tracking-[0.12em] uppercase font-light text-white/40 border border-white/10 px-2 py-0.5"
            >
              {tech}
            </span>
          ))}
        </div>
        <Link
          href={`/work/${project.slug}`}
          className="text-xs font-light tracking-[0.08em] uppercase text-white/70 hover:text-white flex items-center gap-1 transition-colors flex-shrink-0 ml-4"
        >
          <span>View</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  )
}
