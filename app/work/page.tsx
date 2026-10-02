import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { generatePageMetadata } from '@/lib/metadata'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { getPublishedProjects } from '@/content/projects'
import { siteConfig } from '@/content/config/site'

export const metadata: Metadata = generatePageMetadata({
  title: 'Work // Verified Production Engineering Portfolio',
  description:
    'Verified case studies in digital product engineering, quantitative terminals, PostGIS cadastral platforms, and high-performance WebGL flagships by Avorria.',
  path: '/work',
})

export default function WorkPage() {
  const projects = getPublishedProjects()

  const workSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Selected Work & Case Studies — Avorria',
    description: 'Verified production engineering case studies by Avorria.',
    url: `${siteConfig.url}/work`,
    publisher: {
      '@type': 'Organization',
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
      <div className="section-y-large bg-[var(--color-ivory)]">
        <div className="container-max">
          <div className="container-content">

            <Breadcrumb items={[{ label: 'Work' }]} className="mb-12" />

            {/* Page Header */}
            <div className="border-b border-[var(--color-border)] pb-16 mb-16">
              <div className="flex items-center gap-4 mb-6">
                <Eyebrow>Selected work</Eyebrow>
                <span className="h-px w-12 bg-[var(--color-border-strong)]" aria-hidden="true" />
                <span className="text-[10px] tracking-[0.2em] font-light text-[var(--color-graphite-muted)] uppercase">
                  VERIFIED COMMERCIAL & TECHNICAL PROOFS
                </span>
              </div>
              <h1 className="text-display-l max-w-[800px] mb-6 font-extralight tracking-tight">
                Websites and systems{' '}
                <em className="not-italic italic font-extralight" style={{ color: 'var(--color-rose-text)' }}>
                  built to work.
                </em>
              </h1>
              <p className="text-body-l text-secondary max-w-[640px] font-light leading-relaxed">
                Six verified commercial and technical interventions. Every entry represents production architecture deployed for ambitious operators. Zero fabricated metrics.
              </p>
            </div>

            {/* Visual Portfolio Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {projects.map((project, i) => (
                <RevealOnScroll key={project.slug} delay={i * 60}>
                  <article className="group relative border border-[var(--color-border)] bg-[var(--color-ivory-light)] p-6 md:p-8 hover:border-[var(--color-border-strong)] transition-all duration-300">
                    <Link href={`/work/${project.slug}`} className="block">
                      {/* Telemetry Header */}
                      <div className="flex items-center justify-between pb-3 mb-5 border-b border-[var(--color-border)] text-[10px] tracking-[0.18em] uppercase text-[var(--color-graphite-muted)] font-light">
                        <span className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                          <span>{project.industry}</span>
                        </span>
                        <span>0{i + 1} // {project.year}</span>
                      </div>

                      {/* Large-Format Real Project Capture (16:9) */}
                      <div className="relative w-full aspect-[16/9] bg-[#121110] overflow-hidden border border-[var(--color-border)] mb-6">
                        {project.heroImage ? (
                          <Image
                            src={project.heroImage.src}
                            alt={project.heroImage.alt}
                            fill
                            priority={i < 2}
                            sizes="(max-width: 1024px) 100vw, 600px"
                            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-muted uppercase font-light">
                            {project.title}
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                      </div>

                      {/* Project Title & Client */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-baseline justify-between gap-4">
                          <h2 className="text-display-s font-extralight text-[var(--color-graphite)] group-hover:text-[var(--color-rose-text)] transition-colors">
                            {project.title}
                          </h2>
                          <span className="text-xs font-light text-[var(--color-graphite-mid)]">
                            {project.client}
                          </span>
                        </div>
                        <p className="text-sm font-light text-[var(--color-graphite-mid)] leading-relaxed line-clamp-2">
                          {project.summary}
                        </p>
                      </div>

                      {/* Engineering Badges */}
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--color-border)]">
                        {project.technology?.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="text-[9px] tracking-[0.14em] uppercase text-[var(--color-graphite-muted)] font-light border border-[var(--color-border)] px-2 py-0.5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </Link>
                  </article>
                </RevealOnScroll>
              ))}
            </div>

            {/* Bottom Closing CTA */}
            <div className="mt-24 border-t border-[var(--color-border)] pt-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center justify-between">
                <div>
                  <h2 className="text-display-s mb-3 font-extralight">Ready to engineer something similar?</h2>
                  <p className="text-secondary font-light max-w-md mb-8">
                    We partner with select organisations on high-stakes digital flagships, spatial data pipelines, and quantitative interfaces.
                  </p>
                  <Button as="link" href="/start-a-project" variant="primary" size="md">
                    Start a project ↗
                  </Button>
                </div>
                <div className="border border-[var(--color-border)] p-6 bg-[var(--color-ivory-light)]">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-light text-[var(--color-graphite-muted)] block mb-2">
                    TECHNICAL VERIFICATION STANDARD
                  </span>
                  <p className="text-xs font-light text-[var(--color-graphite-mid)] leading-relaxed">
                    All case studies documented here are backed by production deployments running verified Next.js 16, PostGIS, WebGL, or Canvas architectures. Zero synthetic demonstrations.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
