'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface Scene03OutcomeProps {
  initialData?: Record<string, any>
  onNext: (data: Record<string, any>) => void
  onBack: () => void
  onSkip?: () => void
}

const STRATEGIC_GOALS = [
  'Higher conversion / enquiries',
  'Superior customer experience',
  'Less internal friction',
  'Faster operations',
  'Competitive advantage',
  'New digital capability',
  'Brand authority',
  'Something else',
]

export const Scene03Outcome: React.FC<Scene03OutcomeProps> = ({
  initialData = {},
  onNext,
  onBack,
  onSkip,
}) => {
  const [data, setData] = useState({
    successDefinition: initialData.successDefinition || '',
    goals: initialData.goals || [],
    otherGoal: initialData.otherGoal || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const toggleGoal = (goal: string) => {
    setData((prev) => {
      const exists = prev.goals.includes(goal)
      return {
        ...prev,
        goals: exists ? prev.goals.filter((g: string) => g !== goal) : [...prev.goals, goal],
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext(data)
  }

  return (
    <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 md:py-16">
      <div className="max-w-[1560px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Interactive Briefing Column (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[12px] uppercase tracking-[0.2em] text-[var(--color-rose-text)] font-work-sans font-light">
              STAGE 03 / 09
            </span>
            <span className="w-8 h-[1px] bg-[var(--color-border)]" />
            <span className="text-[12px] uppercase tracking-[0.16em] text-[var(--color-graphite-muted)] font-work-sans font-light">
              DESTINATION &amp; IMPACT
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-work-sans font-[200] text-[var(--color-graphite)] tracking-[-0.03em] leading-[1.08] mb-4">
            WHAT WOULD SUCCESS<br />
            LOOK LIKE?
          </h2>

          <p className="font-work-sans font-light text-base md:text-lg text-[var(--color-graphite-mid)] max-w-xl mb-8 leading-relaxed">
            If this project worked exactly as you hoped, what would be different? Describe the transformation in customer behavior, operational throughput, or business clarity.
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col gap-6 font-work-sans font-light">
            {/* Primary Success Narrative */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="successDefinition" className="text-xs uppercase tracking-wider text-[var(--color-graphite-muted)]">
                The Target Reality
              </label>
              <textarea
                id="successDefinition"
                name="successDefinition"
                value={data.successDefinition}
                onChange={handleChange}
                rows={5}
                placeholder="In 12 months, what tangible evidence will prove this investment succeeded? (e.g. Sub-second quote generation, zero manual data transfers, 40% inbound enquiry uplift...)"
                className="w-full bg-[#FAFAFA] border border-[var(--color-border)] p-4 text-base text-[var(--color-graphite)] rounded-[2px] focus:bg-white focus:border-[var(--color-graphite)] outline-none transition-all resize-y placeholder:text-[var(--color-graphite-muted)]"
              />
            </div>

            {/* Strategic Goal Chips */}
            <div className="flex flex-col gap-2.5 pt-1">
              <span className="text-[11px] uppercase tracking-wider text-[var(--color-graphite-muted)]">
                Strategic Targets (Select all that align)
              </span>
              <div className="flex flex-wrap gap-2">
                {STRATEGIC_GOALS.map((goal) => {
                  const isSelected = data.goals.includes(goal)
                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => toggleGoal(goal)}
                      className={`text-xs px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[var(--color-graphite)] text-white border-[var(--color-graphite)]'
                          : 'bg-[#FAFAFA] text-[var(--color-graphite)] border-[var(--color-border)] hover:border-[var(--color-graphite-mid)]'
                      }`}
                    >
                      {goal} {isSelected && '✓'}
                    </button>
                  )
                })}
              </div>
            </div>

            {data.goals.includes('Something else') && (
              <div className="flex flex-col gap-1.5 pt-1">
                <label htmlFor="otherGoal" className="text-xs uppercase tracking-wider text-[var(--color-graphite-muted)]">
                  Please Specify Custom Target
                </label>
                <input
                  id="otherGoal"
                  type="text"
                  name="otherGoal"
                  value={data.otherGoal}
                  onChange={handleChange}
                  placeholder="Detail your custom objective..."
                  className="bg-[#FAFAFA] border border-[var(--color-border)] px-4 py-3 text-sm text-[var(--color-graphite)] rounded-[2px] focus:bg-white focus:border-[var(--color-graphite)] outline-none transition-all"
                />
              </div>
            )}

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

        {/* Right Architectural Visual: Pristine Clarity (5 Columns) */}
        <div className="lg:col-span-5 relative w-full h-[380px] sm:h-[460px] lg:h-[620px] flex items-center justify-center">
          <div className="absolute inset-0 border border-[var(--color-border)] bg-white overflow-hidden shadow-sm flex items-center justify-center p-8">
            {/* Real Project Visual: NestIQ pristine, high-order clarity */}
            <div className="relative w-full h-full border border-[var(--color-border)] overflow-hidden shadow-md">
              <Image
                src="/images/projects/nestiq/hero.webp"
                alt="Avorria Engineered Clarity Interface"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top filter grayscale contrast-110 opacity-95 transition-transform duration-1000 hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
            </div>

            {/* Architectural Negative Space Grid Coordinates */}
            <div className="absolute top-4 left-6 text-[9px] uppercase tracking-widest text-[var(--color-graphite-muted)] font-mono">
              [STATE // RESOLVED CLARITY]
            </div>
            <div className="absolute top-4 right-6 text-[9px] uppercase tracking-widest text-[var(--color-rose-text)] font-mono">
              ORDER OVER ENTROPY
            </div>
          </div>

          {/* Outcome Alignment Telemetry Card */}
          <div className="absolute bottom-6 left-10 right-10 bg-white/95 backdrop-blur-sm border border-[var(--color-border)] p-5 shadow-sm font-work-sans">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-[var(--color-graphite-muted)] mb-2 pb-1.5 border-b border-[var(--color-border)]">
              <span>OUTCOME BENCHMARK</span>
              <span className="text-[var(--color-rose-text)]">
                {data.goals.length > 0 ? `${data.goals.length} TARGET OBJECTIVES` : 'AWAITING DEFINITION'}
              </span>
            </div>

            <p className="text-xs text-[var(--color-graphite)] font-[300] line-clamp-3 leading-relaxed">
              {data.successDefinition.trim() || 'A clearly articulated outcome enables our engineering team to design the optimal sovereign stack.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
