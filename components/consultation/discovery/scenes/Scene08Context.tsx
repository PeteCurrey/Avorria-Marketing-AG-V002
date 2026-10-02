'use client'

import React, { useState } from 'react'

interface Scene08ContextProps {
  initialData?: Record<string, any>
  onNext: (data: Record<string, any>) => void
  onBack: () => void
  onSkip?: () => void
}

export const Scene08Context: React.FC<Scene08ContextProps> = ({
  initialData = {},
  onNext,
  onBack,
  onSkip,
}) => {
  const [openText, setOpenText] = useState(initialData.openContext || '')
  const charCount = openText.trim().length

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({ openContext: openText })
  }

  return (
    <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 md:py-16">
      <div className="max-w-[1560px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left margin editorial spacer */}
        <div className="hidden lg:block lg:col-span-2" />

        {/* Centre: Primary Question — full editorial breathing room (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[12px] uppercase tracking-[0.2em] text-[var(--color-rose-text)] font-work-sans font-light">
              STAGE 08 / 09
            </span>
            <span className="w-8 h-[1px] bg-[var(--color-border)]" />
            <span className="text-[12px] uppercase tracking-[0.16em] text-[var(--color-graphite-muted)] font-work-sans font-light">
              OPEN CONTEXT
            </span>
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-work-sans font-[200] text-[var(--color-graphite)] tracking-[-0.03em] leading-[1.04] mb-6">
            WHAT HAVEN'T<br />
            WE ASKED?
          </h2>

          {/* Editorial rule */}
          <div className="w-16 h-[1px] bg-[var(--color-border-strong)] mb-8" />

          <p className="font-work-sans font-light text-base md:text-lg text-[var(--color-graphite-mid)] max-w-2xl mb-10 leading-relaxed">
            This is your space. Context that doesn't fit a form. Nuance the questions missed. 
            Constraints we should know about. Politics, history, sensitivities. 
            The things you'd tell a trusted partner before the work began.
          </p>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8 font-work-sans font-light">
            <div className="flex flex-col gap-3 relative">
              <textarea
                id="openContext"
                value={openText}
                onChange={(e) => setOpenText(e.target.value)}
                rows={8}
                placeholder="Write freely. There are no wrong answers here."
                className="w-full bg-transparent border-0 border-b border-[var(--color-border-strong)] pb-4 text-lg md:text-xl text-[var(--color-graphite)] outline-none resize-none placeholder:text-[var(--color-graphite-muted)] leading-relaxed transition-colors focus:border-[var(--color-graphite)]"
              />
              {charCount > 0 && (
                <span className="absolute bottom-6 right-0 text-[10px] uppercase tracking-widest text-[var(--color-graphite-muted)]">
                  {charCount} CHARS
                </span>
              )}
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
                  className="bg-[var(--color-graphite)] text-white px-8 py-3.5 rounded-full text-xs uppercase tracking-widest hover:bg-[var(--color-rose-text)] transition-colors duration-300"
                >
                  REVIEW YOUR BRIEF →
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Right margin editorial spacer */}
        <div className="hidden lg:block lg:col-span-3" />
      </div>
    </section>
  )
}
