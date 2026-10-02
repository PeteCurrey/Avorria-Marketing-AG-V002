'use client'

import React, { useState } from 'react'

interface Scene07InvestmentProps {
  initialData?: Record<string, any>
  onNext: (data: Record<string, any>) => void
  onBack: () => void
  onSkip?: () => void
}

const TIMELINE_OPTIONS = [
  { id: 'asap', label: 'AS SOON AS POSSIBLE', sub: 'Ready to proceed immediately' },
  { id: '1-3months', label: '1–3 MONTHS', sub: 'Within the near term' },
  { id: '3-6months', label: '3–6 MONTHS', sub: 'Considered, planned timeline' },
  { id: '6-12months', label: '6–12 MONTHS', sub: 'Longer horizon, building toward it' },
  { id: 'exploring', label: 'EXPLORING', sub: 'No fixed timeline — gathering information' },
]

const BUDGET_BANDS = [
  { id: 'under20k', label: 'Under £20K', range: 'under20k' },
  { id: '20-50k', label: '£20K – £50K', range: '20-50k' },
  { id: '50-100k', label: '£50K – £100K', range: '50-100k' },
  { id: '100-250k', label: '£100K – £250K', range: '100-250k' },
  { id: 'over250k', label: 'Over £250K', range: 'over250k' },
  { id: 'undisclosed', label: 'Prefer Not To Say', range: 'undisclosed' },
]

const JOURNEY_PHASES = ['DISCOVERY', 'STRATEGY', 'DESIGN', 'BUILD', 'LAUNCH']

export const Scene07Investment: React.FC<Scene07InvestmentProps> = ({
  initialData = {},
  onNext,
  onBack,
  onSkip,
}) => {
  const [data, setData] = useState({
    timeline: initialData.timeline || '',
    budget: initialData.budget || '',
    budgetFlexibility: initialData.budgetFlexibility || '',
    decisionTimeline: initialData.decisionTimeline || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!data.timeline) return
    onNext(data)
  }

  const selectedTimelineIndex = TIMELINE_OPTIONS.findIndex((t) => t.id === data.timeline)
  // Map timeline to which phase the client is at on the internal journey
  const activePhaseIndex = Math.min(
    selectedTimelineIndex >= 0 ? selectedTimelineIndex : 0,
    JOURNEY_PHASES.length - 1
  )

  return (
    <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 md:py-16">
      <div className="max-w-[1560px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: Timeline & Budget Selection (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[12px] uppercase tracking-[0.2em] text-[var(--color-rose-text)] font-work-sans font-light">
              STAGE 07 / 09
            </span>
            <span className="w-8 h-[1px] bg-[var(--color-border)]" />
            <span className="text-[12px] uppercase tracking-[0.16em] text-[var(--color-graphite-muted)] font-work-sans font-light">
              TIMING &amp; INVESTMENT
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-work-sans font-[200] text-[var(--color-graphite)] tracking-[-0.03em] leading-[1.08] mb-4">
            WHEN ARE YOU<br />
            LOOKING TO MOVE?
          </h2>

          <p className="font-work-sans font-light text-base md:text-lg text-[var(--color-graphite-mid)] max-w-xl mb-8 leading-relaxed">
            We need to understand your real horizon — not the ideal one. Budget context helps us design appropriate solutions from the beginning.
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col gap-8 font-work-sans font-light">
            {/* Timeline Selection */}
            <div className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-wider text-[var(--color-graphite-muted)]">Project Start Timeline</p>
              <div className="flex flex-col gap-2">
                {TIMELINE_OPTIONS.map((opt) => {
                  const isSelected = data.timeline === opt.id
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setData((prev) => ({ ...prev, timeline: opt.id }))}
                      className={`flex items-center justify-between px-5 py-4 border rounded-[2px] transition-all duration-200 text-left group ${
                        isSelected
                          ? 'border-[var(--color-graphite)] bg-[var(--color-graphite)] text-white'
                          : 'border-[var(--color-border)] bg-[#FAFAFA] hover:bg-white hover:border-[var(--color-graphite-mid)] text-[var(--color-graphite)]'
                      }`}
                    >
                      <span className={`text-sm font-[300] ${isSelected ? 'text-white' : ''}`}>{opt.label}</span>
                      <span className={`text-[11px] ${isSelected ? 'text-white/70' : 'text-[var(--color-graphite-muted)]'}`}>
                        {opt.sub}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Budget Band */}
            <div className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-wider text-[var(--color-graphite-muted)]">
                Budget Range (Optional — helps calibrate the approach)
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {BUDGET_BANDS.map((band) => {
                  const isSelected = data.budget === band.id
                  return (
                    <button
                      key={band.id}
                      type="button"
                      onClick={() => setData((prev) => ({ ...prev, budget: prev.budget === band.id ? '' : band.id }))}
                      className={`px-4 py-3 border rounded-[2px] text-[12px] text-left transition-all duration-200 ${
                        isSelected
                          ? 'border-[var(--color-graphite)] bg-[var(--color-graphite)] text-white'
                          : 'border-[var(--color-border)] bg-[#FAFAFA] hover:bg-white hover:border-[var(--color-graphite-mid)] text-[var(--color-graphite)]'
                      }`}
                    >
                      {band.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Budget Flexibility Note */}
            {data.budget && data.budget !== 'undisclosed' && (
              <div className="flex flex-col gap-1.5">
                <label htmlFor="budgetFlexibility" className="text-xs uppercase tracking-wider text-[var(--color-graphite-muted)]">
                  Flexibility Note (Optional)
                </label>
                <textarea
                  id="budgetFlexibility"
                  value={data.budgetFlexibility}
                  onChange={(e) => setData((prev) => ({ ...prev, budgetFlexibility: e.target.value }))}
                  rows={2}
                  placeholder="e.g. Board approved to £75K but flexible for the right solution..."
                  className="w-full bg-[#FAFAFA] border border-[var(--color-border)] p-4 text-sm text-[var(--color-graphite)] rounded-[2px] focus:bg-white focus:border-[var(--color-graphite)] outline-none transition-all resize-none placeholder:text-[var(--color-graphite-muted)]"
                />
              </div>
            )}

            {/* Decision Process */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="decisionTimeline" className="text-xs uppercase tracking-wider text-[var(--color-graphite-muted)]">
                Decision-Making Process (Optional)
              </label>
              <textarea
                id="decisionTimeline"
                value={data.decisionTimeline}
                onChange={(e) => setData((prev) => ({ ...prev, decisionTimeline: e.target.value }))}
                rows={2}
                placeholder="Who needs to sign this off? Is there a board, procurement process, or internal stakeholder journey?"
                className="w-full bg-[#FAFAFA] border border-[var(--color-border)] p-4 text-sm text-[var(--color-graphite)] rounded-[2px] focus:bg-white focus:border-[var(--color-graphite)] outline-none transition-all resize-y placeholder:text-[var(--color-graphite-muted)]"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
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
                  disabled={!data.timeline}
                  className="bg-[var(--color-graphite)] text-white px-8 py-3.5 rounded-full text-xs uppercase tracking-widest hover:bg-[var(--color-rose-text)] transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  CONTINUE →
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Right: Sophisticated Timeline Diagram (5 Columns) */}
        <div className="hidden lg:flex lg:col-span-5 flex-col items-center justify-center h-[600px] border border-[var(--color-border)] bg-[#FAFAFA] p-10 font-work-sans font-light">
          <p className="text-[10px] uppercase tracking-widest text-[var(--color-graphite-muted)] mb-8 self-start">ENGAGEMENT JOURNEY</p>

          <div className="flex flex-col items-center gap-0 w-full">
            {JOURNEY_PHASES.map((phase, i) => {
              const isActive = i <= activePhaseIndex && data.timeline !== ''
              const isCurrent = i === activePhaseIndex && data.timeline !== ''
              return (
                <React.Fragment key={phase}>
                  <div className={`w-full flex items-center gap-4 px-5 py-4 border transition-colors duration-500 ${
                    isCurrent
                      ? 'border-[var(--color-graphite)] bg-[var(--color-graphite)] text-white'
                      : isActive
                      ? 'border-[var(--color-border)] bg-white'
                      : 'border-[var(--color-border)] bg-transparent'
                  }`}>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors duration-500 ${
                      isCurrent
                        ? 'border-white bg-white'
                        : isActive
                        ? 'border-[var(--color-graphite)] bg-[var(--color-graphite)]'
                        : 'border-[var(--color-border)]'
                    }`}>
                      {isActive && !isCurrent && (
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                      {isCurrent && <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-graphite)]" />}
                    </div>
                    <span className={`text-[11px] uppercase tracking-widest flex-1 transition-colors duration-500 ${
                      isCurrent ? 'text-white' : isActive ? 'text-[var(--color-graphite)]' : 'text-[var(--color-graphite-muted)]'
                    }`}>
                      {phase}
                    </span>
                    {isCurrent && (
                      <span className="text-[9px] uppercase tracking-widest text-white/70">ENTRY POINT</span>
                    )}
                  </div>
                  {i < JOURNEY_PHASES.length - 1 && (
                    <div className={`w-[1px] h-6 transition-colors duration-500 ${isActive ? 'bg-[var(--color-graphite-mid)]' : 'bg-[var(--color-border)]'}`} />
                  )}
                </React.Fragment>
              )
            })}
          </div>

          {data.timeline && (
            <p className="text-[10px] text-[var(--color-graphite-muted)] mt-8 text-center uppercase tracking-wider">
              DISCOVERY → LAUNCH TYPICALLY SPANS 8–32 WEEKS
            </p>
          )}

          {!data.timeline && (
            <p className="text-[10px] text-[var(--color-graphite-muted)] mt-8 text-center uppercase tracking-wider">
              SELECT YOUR TIMELINE TO CALIBRATE
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
