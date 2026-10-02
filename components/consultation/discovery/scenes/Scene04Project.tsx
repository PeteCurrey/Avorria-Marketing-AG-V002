'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface Scene04ProjectProps {
  initialData?: Record<string, any>
  onNext: (data: Record<string, any>) => void
  onBack: () => void
  onSkip?: () => void
}

const PROJECT_CATEGORIES = [
  { id: 'new-website', label: 'New Website', sub: 'Brand presence, landing pages, marketing site' },
  { id: 'rebuild', label: 'Rebuild Existing Website', sub: 'Replace or modernise current digital presence' },
  { id: 'web-application', label: 'Web Application', sub: 'Bespoke software for clients or internal teams' },
  { id: 'ecommerce', label: 'Ecommerce Platform', sub: 'Direct-to-consumer or B2B trading systems' },
  { id: 'ai', label: 'AI System or Automation', sub: 'Intelligent automation, copilots, data pipelines' },
  { id: 'platform', label: 'Digital Platform', sub: 'Multi-side platforms, marketplaces, portals' },
  { id: 'internal', label: 'Internal Tool or Dashboard', sub: 'Operations software for your team' },
  { id: 'not-sure', label: "I'm Not Sure Yet", sub: 'Start with the problem — we\'ll shape the solution' },
]

export const Scene04Project: React.FC<Scene04ProjectProps> = ({
  initialData = {},
  onNext,
  onBack,
  onSkip,
}) => {
  const [data, setData] = useState({
    projectCategory: initialData.projectCategory || '',
    projectDescription: initialData.projectDescription || '',
    technicalRequirements: initialData.technicalRequirements || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSelect = (label: string) => {
    setData((prev) => ({ ...prev, projectCategory: label }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!data.projectCategory) return
    onNext(data)
  }

  const showDetail = data.projectCategory && data.projectCategory !== "I'm Not Sure Yet"

  return (
    <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 md:py-16">
      <div className="max-w-[1560px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column — Question + Category Selection (8 Columns) */}
        <div className="lg:col-span-8 flex flex-col items-start">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[12px] uppercase tracking-[0.2em] text-[var(--color-rose-text)] font-work-sans font-light">
              STAGE 04 / 09
            </span>
            <span className="w-8 h-[1px] bg-[var(--color-border)]" />
            <span className="text-[12px] uppercase tracking-[0.16em] text-[var(--color-graphite-muted)] font-work-sans font-light">
              SCOPE DEFINITION
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-work-sans font-[200] text-[var(--color-graphite)] tracking-[-0.03em] leading-[1.08] mb-4">
            WHAT ARE<br />
            WE BUILDING?
          </h2>

          <p className="font-work-sans font-light text-base md:text-lg text-[var(--color-graphite-mid)] max-w-xl mb-8 leading-relaxed">
            You don't need to know the technical answer. Tell us what you want to achieve — we'll determine the engineering approach from context.
          </p>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 font-work-sans font-light">
            {/* Editorial Category Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
              {PROJECT_CATEGORIES.map((cat) => {
                const isSelected = data.projectCategory === cat.label
                const isNotSure = cat.id === 'not-sure'
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleSelect(cat.label)}
                    className={`text-left p-4 border rounded-[2px] transition-all duration-200 cursor-pointer group ${
                      isSelected
                        ? 'bg-[var(--color-graphite)] text-white border-[var(--color-graphite)]'
                        : isNotSure
                        ? 'bg-[#F8F7F5] text-[var(--color-graphite-mid)] border-[var(--color-border)] hover:border-[var(--color-graphite-mid)] hover:bg-white'
                        : 'bg-white text-[var(--color-graphite)] border-[var(--color-border)] hover:border-[var(--color-graphite-mid)] hover:bg-[#FAFAFA]'
                    }`}
                  >
                    <span className={`block text-sm font-[300] mb-1 ${isSelected ? 'text-white' : ''}`}>
                      {cat.label}
                    </span>
                    <span className={`block text-[11px] leading-snug ${isSelected ? 'text-white/70' : 'text-[var(--color-graphite-muted)]'}`}>
                      {cat.sub}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Detail Fields (Conditional on non-unsure selection) */}
            {showDetail && (
              <div className="flex flex-col gap-4 max-w-2xl border-t border-[var(--color-border)] pt-6">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="projectDescription" className="text-xs uppercase tracking-wider text-[var(--color-graphite-muted)]">
                    Tell us more about what this involves (Optional)
                  </label>
                  <textarea
                    id="projectDescription"
                    name="projectDescription"
                    value={data.projectDescription}
                    onChange={handleChange}
                    rows={3}
                    placeholder="What does the project need to accomplish for the people using it?"
                    className="w-full bg-[#FAFAFA] border border-[var(--color-border)] p-4 text-sm text-[var(--color-graphite)] rounded-[2px] focus:bg-white focus:border-[var(--color-graphite)] outline-none transition-all resize-y placeholder:text-[var(--color-graphite-muted)]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="technicalRequirements" className="text-xs uppercase tracking-wider text-[var(--color-graphite-muted)]">
                    Technical requirements you're aware of (Optional — 'not sure' is fine)
                  </label>
                  <textarea
                    id="technicalRequirements"
                    name="technicalRequirements"
                    value={data.technicalRequirements}
                    onChange={handleChange}
                    rows={2}
                    placeholder="e.g. Must integrate with our existing Salesforce CRM..."
                    className="w-full bg-[#FAFAFA] border border-[var(--color-border)] p-4 text-sm text-[var(--color-graphite)] rounded-[2px] focus:bg-white focus:border-[var(--color-graphite)] outline-none transition-all resize-y placeholder:text-[var(--color-graphite-muted)]"
                  />
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)] max-w-2xl">
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
                  disabled={!data.projectCategory}
                  className="bg-[var(--color-graphite)] text-white px-8 py-3.5 rounded-full text-xs uppercase tracking-widest hover:bg-[var(--color-rose-text)] transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  CONTINUE →
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Right: Compact Architecture Composition (4 Columns) */}
        <div className="hidden lg:block lg:col-span-4 relative w-full h-[540px] flex items-center justify-center">
          <div className="absolute inset-0 border border-[var(--color-border)] bg-[#FAFAFA] overflow-hidden">
            {/* Real Project: Drawdown / System Architecture Feel */}
            <div className="absolute inset-4 border border-[var(--color-border)] overflow-hidden">
              <Image
                src="/images/projects/drawdown/hero.webp"
                alt="Digital System Architecture"
                fill
                sizes="30vw"
                className="object-cover object-top filter grayscale contrast-110 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FAFAFA]/80" />
            </div>
            <div className="absolute top-5 left-5 text-[9px] uppercase tracking-widest text-[var(--color-graphite-muted)] font-mono">
              [SYSTEM // FORMING]
            </div>
          </div>

          {/* Live Category Indicator */}
          {data.projectCategory && (
            <div className="absolute bottom-5 left-5 right-5 bg-white/95 border border-[var(--color-border)] p-4 font-work-sans shadow-sm">
              <div className="text-[10px] uppercase tracking-widest text-[var(--color-graphite-muted)] mb-1">SCOPE IDENTIFIED</div>
              <div className="text-sm text-[var(--color-graphite)] font-[300]">{data.projectCategory}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
