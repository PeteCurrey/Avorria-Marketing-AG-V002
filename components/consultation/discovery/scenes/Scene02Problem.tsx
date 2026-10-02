'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface Scene02ProblemProps {
  initialData?: Record<string, any>
  onNext: (data: Record<string, any>) => void
  onBack: () => void
  onSkip?: () => void
}

const CONTEXT_PILLS = [
  'Customer experience',
  'Website',
  'Internal processes',
  'Growth & conversion',
  'Legacy technology',
  'Something else',
]

export const Scene02Problem: React.FC<Scene02ProblemProps> = ({
  initialData = {},
  onNext,
  onBack,
  onSkip,
}) => {
  const [data, setData] = useState({
    problemStatement: initialData.problemStatement || '',
    problemAreas: initialData.problemAreas || [],
    problemImpact: initialData.problemImpact || '',
    whyNow: initialData.whyNow || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const togglePill = (pill: string) => {
    setData((prev) => {
      const exists = prev.problemAreas.includes(pill)
      return {
        ...prev,
        problemAreas: exists
          ? prev.problemAreas.filter((p: string) => p !== pill)
          : [...prev.problemAreas, pill],
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext(data)
  }

  const hasContent = data.problemStatement.trim().length > 20

  return (
    <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 md:py-16">
      <div className="max-w-[1560px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Interactive Briefing Column (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[12px] uppercase tracking-[0.2em] text-[var(--color-rose-text)] font-work-sans font-light">
              STAGE 02 / 09
            </span>
            <span className="w-8 h-[1px] bg-[var(--color-border)]" />
            <span className="text-[12px] uppercase tracking-[0.16em] text-[var(--color-graphite-muted)] font-work-sans font-light">
              DIAGNOSTIC DISCOVERY
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-work-sans font-[200] text-[var(--color-graphite)] tracking-[-0.03em] leading-[1.08] mb-4">
            WHAT NEEDS<br />
            TO CHANGE?
          </h2>

          <p className="font-work-sans font-light text-base md:text-lg text-[var(--color-graphite-mid)] max-w-xl mb-8 leading-relaxed">
            Tell us what isn't working today. It doesn't need to be technical. Describe the friction, the inefficiency, or the opportunity you are striving to capture.
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col gap-6 font-work-sans font-light">
            {/* Primary Problem Narrative */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="problemStatement" className="text-xs uppercase tracking-wider text-[var(--color-graphite-muted)]">
                The Core Challenge
              </label>
              <textarea
                id="problemStatement"
                name="problemStatement"
                value={data.problemStatement}
                onChange={handleChange}
                rows={5}
                placeholder="In your own words: what feels broken, clunky, or behind the curve? Where do customers or team members stumble?"
                className="w-full bg-[#FAFAFA] border border-[var(--color-border)] p-4 text-base text-[var(--color-graphite)] rounded-[2px] focus:bg-white focus:border-[var(--color-graphite)] outline-none transition-all resize-y placeholder:text-[var(--color-graphite-muted)]"
              />
            </div>

            {/* Contextual Focus Prompts */}
            <div className="flex flex-col gap-2.5 pt-1">
              <span className="text-[11px] uppercase tracking-wider text-[var(--color-graphite-muted)]">
                Key Areas Of Friction (Select any that apply)
              </span>
              <div className="flex flex-wrap gap-2">
                {CONTEXT_PILLS.map((pill) => {
                  const isSelected = data.problemAreas.includes(pill)
                  return (
                    <button
                      key={pill}
                      type="button"
                      onClick={() => togglePill(pill)}
                      className={`text-xs px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[var(--color-graphite)] text-white border-[var(--color-graphite)]'
                          : 'bg-[#FAFAFA] text-[var(--color-graphite)] border-[var(--color-border)] hover:border-[var(--color-graphite-mid)]'
                      }`}
                    >
                      {pill} {isSelected && '✓'}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Optional Impact Detail */}
            <div className="flex flex-col gap-1.5 pt-2">
              <label htmlFor="problemImpact" className="text-xs uppercase tracking-wider text-[var(--color-graphite-muted)]">
                What is this costing you? (Optional: Time, revenue, operational burden)
              </label>
              <input
                id="problemImpact"
                type="text"
                name="problemImpact"
                value={data.problemImpact}
                onChange={handleChange}
                placeholder="e.g. Sales team spends 15 hours a week manually re-entering data..."
                className="bg-[#FAFAFA] border border-[var(--color-border)] px-4 py-3 text-sm text-[var(--color-graphite)] rounded-[2px] focus:bg-white focus:border-[var(--color-graphite)] outline-none transition-all"
              />
            </div>

            {/* Navigation Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-[var(--color-border)]">
              <button
                type="button"
                onClick={onBack}
                className="text-xs uppercase tracking-wider text-[var(--color-graphite-muted)] hover:text-[var(--color-graphite)] transition-colors py-2"
              >
                ← BACK
              </button>

              <div className="flex items-center gap-4">
                {onSkip && (
                  <button
                    type="button"
                    onClick={onSkip}
                    className="text-xs uppercase tracking-wider text-[var(--color-graphite-muted)] hover:text-[var(--color-graphite)] transition-colors py-2"
                  >
                    SKIP FOR NOW
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-[var(--color-graphite)] text-white px-8 py-3.5 rounded-full text-xs uppercase tracking-widest hover:bg-[var(--color-rose-text)] transition-colors duration-300"
                >
                  CONTINUE →
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Right Fragmented Visual Composition (5 Columns) */}
        <div className="lg:col-span-5 relative w-full h-[380px] sm:h-[460px] lg:h-[620px] flex items-center justify-center">
          {/* Framed Canvas */}
          <div className="absolute inset-0 border border-[var(--color-border)] bg-[#FAFAFA] overflow-hidden">
            {/* Visual Fragment 1: TAFM Architecture Layer (Tilted / Offset) */}
            <div
              className={`absolute -top-4 -left-6 w-[85%] h-[65%] border border-[var(--color-border)] shadow-sm bg-white overflow-hidden transition-all duration-700 ${
                hasContent ? 'rotate-[-1deg] translate-y-1' : 'rotate-[-3deg]'
              }`}
            >
              <Image
                src="/images/projects/tafm/hero-screenshot.png"
                alt="Legacy Interface Layer"
                fill
                sizes="(max-width: 1024px) 100vw, 35vw"
                className="object-cover object-left-top filter grayscale contrast-125 opacity-75"
              />
              <div className="absolute inset-0 bg-white/20" />
            </div>

            {/* Visual Fragment 2: Alkota Layer (Offset in opposite angle) */}
            <div
              className={`absolute bottom-4 right-0 w-[80%] h-[55%] border border-[var(--color-border)] shadow-md bg-white overflow-hidden transition-all duration-700 ${
                hasContent ? 'rotate-[1deg] -translate-x-2' : 'rotate-[2.5deg]'
              }`}
            >
              <Image
                src="/images/projects/alkota-bikes/hero-screenshot.png"
                alt="Operational Disconnect Crop"
                fill
                sizes="(max-width: 1024px) 100vw, 35vw"
                className="object-cover object-top filter grayscale contrast-110 opacity-70"
              />
            </div>

            {/* Hairline Diagnostic Ruler Marks */}
            <div className="absolute top-4 right-4 text-[9px] uppercase tracking-widest text-[var(--color-graphite-muted)] font-mono">
              [DISCONNECT ANALYSIS]
            </div>
          </div>

          {/* Real-Time Problem Diagnostics Badge */}
          <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm border border-[var(--color-border)] p-5 shadow-sm font-work-sans">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-[var(--color-graphite-muted)] mb-2 pb-1.5 border-b border-[var(--color-border)]">
              <span>SYSTEM DIAGNOSTIC</span>
              <span className="text-[var(--color-rose-text)]">
                {data.problemAreas.length > 0 ? `${data.problemAreas.length} FOCUS VECTORS` : 'FREE-FORM'}
              </span>
            </div>

            <p className="text-xs text-[var(--color-graphite)] font-[300] line-clamp-3 leading-relaxed">
              {data.problemStatement.trim() || 'Describing technical or operational friction establishes the engineering boundary.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
