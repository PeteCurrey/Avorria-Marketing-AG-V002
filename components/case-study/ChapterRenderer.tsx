import React from 'react'
import type { CaseStudyChapter } from '@/types/case-study'
import { ArchitecturalAperture } from '@/components/creative/ArchitecturalAperture'
import { AnalyticalLedger } from '@/components/creative/AnalyticalLedger'
import { TechnicalAnnotation } from '@/components/creative/TechnicalAnnotation'

interface ChapterRendererProps {
  chapter: CaseStudyChapter
  projectSlug: string
  className?: string
}

/**
 * Editorial Chapter Renderer
 * Renders investigation chapters (CONTEXT, PROBLEM, SYSTEM, EVIDENCE, INTERFACE, PROCESS)
 * with asymmetric layouts, restrained diagrams, and architectural media frames.
 */
export function ChapterRenderer({
  chapter,
  projectSlug,
  className = '',
}: ChapterRendererProps) {
  return (
    <section className={`border-t border-[var(--color-border)] pt-16 pb-20 ${className}`}>
      {/* Chapter Marker Header */}
      <div className="flex items-center justify-between mb-8">
        <span className="text-[var(--text-label)] tracking-[0.18em] uppercase font-light text-[var(--color-graphite-mid)] flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[var(--color-accent)] inline-block" />
          <span>{chapter.eyebrow}</span>
        </span>
        <TechnicalAnnotation label="CHAPTER" spec={chapter.type} />
      </div>

      {/* Chapter Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-12">
        <div className="lg:col-span-8">
          <h3 className="font-display text-[1.75rem] md:text-[2.25rem] font-extralight text-[var(--color-graphite)] uppercase leading-tight mb-6">
            {chapter.title}
          </h3>

          {chapter.statement && (
            <p className="text-[var(--text-body-l)] font-light text-[var(--color-graphite)] leading-relaxed mb-6 border-l-2 border-[var(--color-accent)] pl-6">
              {chapter.statement}
            </p>
          )}

          <div className="space-y-4 text-[var(--text-body)] font-light text-[var(--color-graphite-mid)] leading-relaxed">
            {chapter.paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        {/* Technical Specs sidebar (if present) */}
        {chapter.technicalSpecs && (
          <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[var(--color-border)] lg:pl-8">
            <AnalyticalLedger
              eyebrow="ENGINEERING TOLERANCES"
              title="TECHNICAL TELEMETRY"
              items={chapter.technicalSpecs.map((spec, i) => ({
                key: `spec-${i}`,
                label: spec.label,
                value: spec.value,
                subtext: spec.detail,
              }))}
            />
          </div>
        )}
      </div>

      {/* Architectural Media Frame (if present) */}
      {chapter.media && (
        <div className="mt-12">
          <ArchitecturalAperture
            aspectRatio={chapter.media.aspectRatio || '21/9'}
            figureNumber={chapter.media.figureNumber}
            caption={chapter.media.caption}
            spec={chapter.media.spec}
          >
            <div className="w-full h-full flex flex-col justify-between p-8 md:p-12 bg-gradient-to-br from-[#1A1916] to-[#252320] text-[var(--color-ivory)]">
              <div className="flex items-center justify-between text-[11px] font-mono text-[var(--color-graphite-muted)] uppercase">
                <span>INTERVENTION CAPTURE // {projectSlug}</span>
                <span>TYPE: {chapter.media.type}</span>
              </div>
              <div className="max-w-xl">
                <p className="text-[var(--text-label)] font-mono text-[var(--color-accent-light)] uppercase mb-2">
                  PRODUCTION SYSTEM SPECIFICATION
                </p>
                <p className="font-display text-[1.25rem] md:text-[1.5rem] font-light uppercase text-[var(--color-ivory)]">
                  {chapter.media.alt}
                </p>
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-[var(--color-graphite-muted)] border-t border-[var(--color-graphite-mid)] pt-2">
                <span>VERIFIABLE ARCHITECTURAL ARTIFACT</span>
                <span>ZERO SIMULATION</span>
              </div>
            </div>
          </ArchitecturalAperture>
        </div>
      )}
    </section>
  )
}
