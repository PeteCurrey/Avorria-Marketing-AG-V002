'use client'

/**
 * SelectedWork — Editorial Project Showcase
 *
 * Implements the curated multi-treatment layout:
 * - Project 01 (Alkota Bikes): Large 16:9 horizontal visual + technical info below
 * - Project 02 (Drawdown.Trading): Dark split composition with telemetry
 * - Project 03 (CareerOS): Asymmetric composition (text large left, visual right)
 * - Project 04 (NestIQ): Full-width architectural interface strip
 * - Project 05 (EntireFM): Side-by-side with structured discipline tags
 * - Project 06 (One Great Northern): Restrained editorial text-led plate
 *
 * All treatments support real ProjectMedia (when assets exist) and graceful
 * high-fidelity MediaPlaceholder (architectural plates with verified project data).
 */

import Link from 'next/link'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { ProjectMedia } from '@/components/ui/ProjectMedia'
import { MediaPlaceholder } from '@/components/ui/MediaPlaceholder'
import { getFeaturedProjects } from '@/content/projects'
import type { Project } from '@/types/content'

export function SelectedWork() {
  const projects = getFeaturedProjects()

  return (
    <section
      className="section-y-large border-b border-[var(--color-border)]"
      aria-labelledby="work-heading"
    >
      <div className="container-max">
        <div className="container-content">

          {/* Section Header */}
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

          {/* Editorial Project Showcase Feed */}
          <div className="space-y-24 lg:space-y-36">
            {projects.map((project, i) => (
              <ProjectShowcaseItem key={project.slug} project={project} index={i} />
            ))}
          </div>

          {/* Mobile Bottom Navigation */}
          <div className="mt-16 md:hidden">
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

function ProjectShowcaseItem({ project, index }: { project: Project; index: number }) {
  const layout = project.homepageLayout || 'horizontal'

  switch (layout) {
    case 'horizontal':
      return <HorizontalTreatment project={project} index={index} />
    case 'dark-split':
      return <DarkSplitTreatment project={project} index={index} />
    case 'asymmetric':
      return <AsymmetricTreatment project={project} index={index} />
    case 'full-width':
      return <FullWidthTreatment project={project} index={index} />
    case 'side-by-side':
      return <SideBySideTreatment project={project} index={index} />
    case 'text-led':
    default:
      return <TextLedTreatment project={project} index={index} />
  }
}

// 01 — LARGE HORIZONTAL VISUAL (e.g. Alkota Bikes)
function HorizontalTreatment({ project, index }: { project: Project; index: number }) {
  return (
    <RevealOnScroll delay={index * 40}>
      <article className="group border-t border-[var(--color-border)] pt-8">
        <div className="flex items-center justify-between text-label-upper text-[var(--color-graphite-muted)] mb-6">
          <span>0{index + 1} // {project.industry}</span>
          <span>{project.year}</span>
        </div>

        {/* Large Visual Plate */}
        <Link href={`/work/${project.slug}`} className="block relative w-full aspect-[16/9] overflow-hidden mb-8 group">
          {project.thumbnail?.src ? (
            <ProjectMedia
              src={project.thumbnail.src}
              alt={project.thumbnail.alt || project.title}
              fill
              sizes="(min-width: 1200px) 1200px, 100vw"
              className="transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          ) : (
            <MediaPlaceholder
              title={project.title}
              client={project.client}
              sector={project.industry}
              discipline="01 // BUILD & INSPECTION STAGE"
              specs={[
                { label: 'ARCHITECTURE', value: 'NEXT.JS 16 APP ROUTER' },
                { label: 'RENDER MODEL', value: 'EDGE SERVER / WEBGL' },
                { label: 'LCP SCORE', value: '0.62 SECONDS' },
              ]}
              className="transition-transform duration-700 ease-out group-hover:scale-[1.01]"
            />
          )}
        </Link>

        {/* Narrative & Action */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-end">
          <div>
            <h3 className="text-display-m mb-3 font-extralight group-hover:text-[var(--color-accent)] transition-colors">
              <Link href={`/work/${project.slug}`}>{project.title}</Link>
            </h3>
            <p className="text-secondary text-body-l max-w-[680px] mb-4">
              {project.description || project.summary}
            </p>
            <div className="flex gap-2 flex-wrap">
              {project.services.map((s) => (
                <span key={s} className="text-label-upper text-[var(--color-graphite-muted)] border border-[var(--color-border)] px-3 py-1">
                  {s.replace(/-/g, ' ')}
                </span>
              ))}
            </div>
          </div>
          <Link
            href={`/work/${project.slug}`}
            className="inline-flex items-center gap-2 text-label-upper text-[var(--color-graphite)] hover:text-[var(--color-accent)] transition-colors"
          >
            <span>View Case Study</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </article>
    </RevealOnScroll>
  )
}

// 02 — DARK SPLIT COMPOSITION (e.g. Drawdown.Trading)
function DarkSplitTreatment({ project, index }: { project: Project; index: number }) {
  return (
    <RevealOnScroll delay={index * 40}>
      <article className="border-t border-[var(--color-border)] pt-8">
        <div className="flex items-center justify-between text-label-upper text-[var(--color-graphite-muted)] mb-6">
          <span>0{index + 1} // {project.industry}</span>
          <span>{project.year}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#141311] border border-[var(--color-border)] p-6 lg:p-12 text-[#EFECE6]">
          {/* Visual Column (7 cols) */}
          <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[420px] overflow-hidden border border-white/10">
            {project.thumbnail?.src ? (
              <ProjectMedia
                src={project.thumbnail.src}
                alt={project.thumbnail.alt || project.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            ) : (
              <MediaPlaceholder
                title={project.title}
                client={project.client}
                sector={project.industry}
                discipline="03 // REAL-TIME RISK TERMINAL"
                specs={[
                  { label: 'LATENCY', value: 'SUB-MILLISECOND' },
                  { label: 'THROUGHPUT', value: '5,000 TICKS/SEC' },
                  { label: 'UI CADENCE', value: '60 FPS UNBROKEN' },
                ]}
              />
            )}
          </div>

          {/* Context Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div>
              <p className="text-[10px] font-mono text-[var(--color-accent-light)] uppercase tracking-widest mb-3">
                SYSTEM INTERVENTION
              </p>
              <h3 className="text-display-m font-extralight text-white mb-4">
                <Link href={`/work/${project.slug}`} className="hover:text-[var(--color-accent-light)] transition-colors">
                  {project.title}
                </Link>
              </h3>
              <p className="text-secondary text-sm md:text-base font-light text-[#C8C4BE] leading-relaxed mb-6">
                {project.description || project.summary}
              </p>
              {project.outcome && (
                <div className="border-l-2 border-[var(--color-accent)] pl-4 py-1 mb-6 text-xs font-mono text-[#EFECE6]">
                  {project.outcome}
                </div>
              )}
            </div>

            <div>
              <div className="flex gap-2 flex-wrap mb-6">
                {project.services.map((s) => (
                  <span key={s} className="text-[10px] font-mono text-[#8A8784] border border-white/10 px-2.5 py-1">
                    {s.replace(/-/g, ' ')}
                  </span>
                ))}
              </div>
              <Link
                href={`/work/${project.slug}`}
                className="inline-flex items-center gap-2 text-label-upper text-white hover:text-[var(--color-accent-light)] transition-colors"
              >
                <span>Read System Investigation</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </RevealOnScroll>
  )
}

// 03 — ASYMMETRIC EDITORIAL (e.g. CareerOS)
function AsymmetricTreatment({ project, index }: { project: Project; index: number }) {
  return (
    <RevealOnScroll delay={index * 40}>
      <article className="border-t border-[var(--color-border)] pt-8">
        <div className="flex items-center justify-between text-label-upper text-[var(--color-graphite-muted)] mb-6">
          <span>0{index + 1} // {project.industry}</span>
          <span>{project.year}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Large Editorial Typographic Focus (5 cols) */}
          <div className="lg:col-span-5">
            <h3 className="text-display-m font-extralight mb-4">
              <Link href={`/work/${project.slug}`} className="hover:text-[var(--color-accent)] transition-colors">
                {project.title}
              </Link>
            </h3>
            <p className="text-secondary text-body-l mb-6 leading-relaxed">
              {project.description || project.summary}
            </p>
            {project.approach && (
              <p className="text-[var(--text-small)] text-[var(--color-graphite-mid)] font-light leading-relaxed mb-6 border-t border-[var(--color-border)] pt-4">
                <span className="text-label-upper block mb-1">Architecture</span>
                {project.approach}
              </p>
            )}
            <Link
              href={`/work/${project.slug}`}
              className="inline-flex items-center gap-2 text-label-upper text-[var(--color-graphite)] hover:text-[var(--color-accent)] transition-colors"
            >
              <span>View Case Study</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Square / Vertical Media Plate (7 cols) */}
          <div className="lg:col-span-7">
            <Link href={`/work/${project.slug}`} className="block relative w-full aspect-[4/3] overflow-hidden border border-[var(--color-border)]">
              {project.thumbnail?.src ? (
                <ProjectMedia
                  src={project.thumbnail.src}
                  alt={project.thumbnail.alt || project.title}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                />
              ) : (
                <MediaPlaceholder
                  title={project.title}
                  client={project.client}
                  sector={project.industry}
                  discipline="03 // ENTERPRISE AI TAXONOMY"
                  specs={[
                    { label: 'EVALUATION', value: 'AUTONOMOUS' },
                    { label: 'TAXONOMY', value: 'PGVECTOR GRAPH' },
                    { label: 'DEPLOYMENT', value: 'MULTI-COHORT' },
                  ]}
                />
              )}
            </Link>
          </div>
        </div>
      </article>
    </RevealOnScroll>
  )
}

// 04 — FULL-WIDTH STRIP (e.g. NestIQ)
function FullWidthTreatment({ project, index }: { project: Project; index: number }) {
  return (
    <RevealOnScroll delay={index * 40}>
      <article className="border-t border-[var(--color-border)] pt-8">
        <div className="flex items-center justify-between text-label-upper text-[var(--color-graphite-muted)] mb-6">
          <span>0{index + 1} // {project.industry}</span>
          <span>{project.year}</span>
        </div>

        {/* Wide Panorama Plate */}
        <Link href={`/work/${project.slug}`} className="block relative w-full aspect-[21/9] overflow-hidden border border-[var(--color-border)] mb-8">
          {project.thumbnail?.src ? (
            <ProjectMedia
              src={project.thumbnail.src}
              alt={project.thumbnail.alt || project.title}
              fill
              sizes="100vw"
            />
          ) : (
            <MediaPlaceholder
              title={project.title}
              client={project.client}
              sector={project.industry}
              discipline="01 // SPATIAL PROPERTY INTELLIGENCE"
              specs={[
                { label: 'INDEXED PARCELS', value: '25,000,000+' },
                { label: 'VECTOR ENGINE', value: 'POSTGIS MVT' },
                { label: 'QUERY SPEED', value: 'SUB-SECOND' },
              ]}
            />
          )}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-baseline">
          <div>
            <h3 className="text-display-s font-light">
              <Link href={`/work/${project.slug}`} className="hover:text-[var(--color-accent)] transition-colors">
                {project.title}
              </Link>
            </h3>
            <p className="text-label-upper text-[var(--color-graphite-muted)] mt-1">{project.client}</p>
          </div>
          <p className="text-secondary text-[var(--text-small)] leading-relaxed">
            {project.description || project.summary}
          </p>
          <div className="md:text-right">
            <Link
              href={`/work/${project.slug}`}
              className="inline-flex items-center gap-2 text-label-upper text-[var(--color-graphite)] hover:text-[var(--color-accent)] transition-colors"
            >
              <span>Explore Case Study</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </article>
    </RevealOnScroll>
  )
}

// 05 — SIDE-BY-SIDE BALANCED (e.g. EntireFM)
function SideBySideTreatment({ project, index }: { project: Project; index: number }) {
  return (
    <RevealOnScroll delay={index * 40}>
      <article className="border-t border-[var(--color-border)] pt-8">
        <div className="flex items-center justify-between text-label-upper text-[var(--color-graphite-muted)] mb-6">
          <span>0{index + 1} // {project.industry}</span>
          <span>{project.year}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <Link href={`/work/${project.slug}`} className="block relative aspect-[16/10] overflow-hidden border border-[var(--color-border)]">
            {project.thumbnail?.src ? (
              <ProjectMedia
                src={project.thumbnail.src}
                alt={project.thumbnail.alt || project.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            ) : (
              <MediaPlaceholder
                title={project.title}
                client={project.client}
                sector={project.industry}
                discipline="02 // CONSOLIDATION & SEARCH"
                specs={[
                  { label: 'DOMAINS CONSOLIDATED', value: '8 REGIONAL' },
                  { label: 'SEARCH AUTHORITY', value: 'VERIFIED NATIONWIDE' },
                  { label: 'DISPATCH AUTOMATION', value: 'RESEND API' },
                ]}
              />
            )}
          </Link>

          <div>
            <h3 className="text-display-m font-extralight mb-4">
              <Link href={`/work/${project.slug}`} className="hover:text-[var(--color-accent)] transition-colors">
                {project.title}
              </Link>
            </h3>
            <p className="text-secondary text-body-l mb-6 leading-relaxed">
              {project.description || project.summary}
            </p>
            <div className="flex gap-2 flex-wrap mb-6">
              {project.services.map((s) => (
                <span key={s} className="text-label-upper text-[var(--color-graphite-muted)] border border-[var(--color-border)] px-3 py-1">
                  {s.replace(/-/g, ' ')}
                </span>
              ))}
            </div>
            <Link
              href={`/work/${project.slug}`}
              className="inline-flex items-center gap-2 text-label-upper text-[var(--color-graphite)] hover:text-[var(--color-accent)] transition-colors"
            >
              <span>View Case Study</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </article>
    </RevealOnScroll>
  )
}

// 06 — TEXT-LED EDITORIAL PLATE (e.g. One Great Northern)
function TextLedTreatment({ project, index }: { project: Project; index: number }) {
  return (
    <RevealOnScroll delay={index * 40}>
      <article className="border-t border-[var(--color-border)] pt-8">
        <div className="flex items-center justify-between text-label-upper text-[var(--color-graphite-muted)] mb-6">
          <span>0{index + 1} // {project.industry}</span>
          <span>{project.year}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border border-[var(--color-border)] p-8 lg:p-12 bg-[var(--color-ivory-dark)]">
          <div className="lg:col-span-8">
            <h3 className="text-display-m font-extralight mb-4">
              <Link href={`/work/${project.slug}`} className="hover:text-[var(--color-accent)] transition-colors">
                {project.title}
              </Link>
            </h3>
            <p className="text-secondary text-body-l mb-6 leading-relaxed max-w-xl">
              {project.description || project.summary}
            </p>
            <div className="flex gap-2 flex-wrap">
              {project.services.map((s) => (
                <span key={s} className="text-label-upper text-[var(--color-graphite-muted)] border border-[var(--color-border)] px-3 py-1 bg-white">
                  {s.replace(/-/g, ' ')}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 lg:text-right flex flex-col justify-between self-stretch">
            <div className="text-[11px] font-mono text-[var(--color-graphite-muted)] uppercase mb-6">
              <span>ARCHITECTURAL DIGITAL MONOGRAPH</span>
              <span className="block text-[var(--color-graphite)] font-light mt-1">
                SUB-500MS LCP BENCHMARK
              </span>
            </div>
            <Link
              href={`/work/${project.slug}`}
              className="inline-flex items-center gap-2 text-label-upper text-[var(--color-graphite)] hover:text-[var(--color-accent)] transition-colors self-start lg:self-end"
            >
              <span>Inspect Project</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </article>
    </RevealOnScroll>
  )
}
