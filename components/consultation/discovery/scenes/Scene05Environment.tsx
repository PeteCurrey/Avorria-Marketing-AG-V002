'use client'

import React, { useState } from 'react'

interface Scene05EnvironmentProps {
  initialData?: Record<string, any>
  onNext: (data: Record<string, any>) => void
  onBack: () => void
  onSkip?: () => void
}

export const Scene05Environment: React.FC<Scene05EnvironmentProps> = ({
  initialData = {},
  onNext,
  onBack,
  onSkip,
}) => {
  const [data, setData] = useState({
    existingSystems: initialData.existingSystems || '',
    systemsToKeep: initialData.systemsToKeep || '',
    systemsToRetire: initialData.systemsToRetire || '',
    technicalFrustrations: initialData.technicalFrustrations || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext(data)
  }

  // Derive live system count
  const systemTokens: string[] = data.existingSystems
    .split(/[\n,]/)
    .map((s: string) => s.trim())
    .filter((s: string) => s.length > 2)

  return (
    <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 md:py-16">
      <div className="max-w-[1560px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: Input Column (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[12px] uppercase tracking-[0.2em] text-[var(--color-rose-text)] font-work-sans font-light">
              STAGE 05 / 09
            </span>
            <span className="w-8 h-[1px] bg-[var(--color-border)]" />
            <span className="text-[12px] uppercase tracking-[0.16em] text-[var(--color-graphite-muted)] font-work-sans font-light">
              ECOSYSTEM ANALYSIS
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-work-sans font-[200] text-[var(--color-graphite)] tracking-[-0.03em] leading-[1.08] mb-4">
            WHAT ARE WE<br />
            WORKING WITH?
          </h2>

          <p className="font-work-sans font-light text-base md:text-lg text-[var(--color-graphite-mid)] max-w-xl mb-8 leading-relaxed">
            Every system your business relies on becomes context for our architecture. Describe the current environment — the critical, the legacy, and the broken.
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col gap-6 font-work-sans font-light">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="existingSystems" className="text-xs uppercase tracking-wider text-[var(--color-graphite-muted)]">
                Current Systems, Platforms &amp; Tools
              </label>
              <span className="text-[11px] text-[var(--color-graphite-muted)]">
                Websites, CRMs, ERPs, databases, APIs, analytics, hosting, SaaS tools — anything relevant.
              </span>
              <textarea
                id="existingSystems"
                name="existingSystems"
                value={data.existingSystems}
                onChange={handleChange}
                rows={4}
                placeholder="e.g. WordPress site (2015), Salesforce CRM, Sage 200, custom legacy quoting system on SQL Server..."
                className="w-full bg-[#FAFAFA] border border-[var(--color-border)] p-4 text-base text-[var(--color-graphite)] rounded-[2px] focus:bg-white focus:border-[var(--color-graphite)] outline-none transition-all resize-y placeholder:text-[var(--color-graphite-muted)]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="systemsToKeep" className="text-xs uppercase tracking-wider text-[var(--color-graphite-muted)]">
                  Must Integrate With (Optional)
                </label>
                <textarea
                  id="systemsToKeep"
                  name="systemsToKeep"
                  value={data.systemsToKeep}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Systems that must remain or connect..."
                  className="w-full bg-[#FAFAFA] border border-[var(--color-border)] p-3.5 text-sm text-[var(--color-graphite)] rounded-[2px] focus:bg-white focus:border-[var(--color-graphite)] outline-none transition-all resize-none placeholder:text-[var(--color-graphite-muted)]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="systemsToRetire" className="text-xs uppercase tracking-wider text-[var(--color-graphite-muted)]">
                  Hoping To Retire (Optional)
                </label>
                <textarea
                  id="systemsToRetire"
                  name="systemsToRetire"
                  value={data.systemsToRetire}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Systems you'd like to eliminate..."
                  className="w-full bg-[#FAFAFA] border border-[var(--color-border)] p-3.5 text-sm text-[var(--color-graphite)] rounded-[2px] focus:bg-white focus:border-[var(--color-graphite)] outline-none transition-all resize-none placeholder:text-[var(--color-graphite-muted)]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="technicalFrustrations" className="text-xs uppercase tracking-wider text-[var(--color-graphite-muted)]">
                Biggest Technical Frustrations (Optional)
              </label>
              <textarea
                id="technicalFrustrations"
                name="technicalFrustrations"
                value={data.technicalFrustrations}
                onChange={handleChange}
                rows={2}
                placeholder="Where does your current stack create friction for teams or customers?"
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
                  className="bg-[var(--color-graphite)] text-white px-8 py-3.5 rounded-full text-xs uppercase tracking-widest hover:bg-[var(--color-rose-text)] transition-colors duration-300"
                >
                  CONTINUE →
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Right: Restrained Technical Architecture Visual (5 Columns) */}
        <div className="hidden lg:flex lg:col-span-5 flex-col items-center justify-center h-[620px] border border-[var(--color-border)] bg-[#FAFAFA] p-8 font-work-sans font-light">
          {/* Elegant System Architecture Diagram */}
          <div className="flex flex-col items-center gap-0 w-full max-w-xs">
            {[
              { label: 'CUSTOMER', color: 'graphite' },
              { label: 'WEBSITE', color: 'graphite' },
              { label: 'DATA LAYER', color: 'graphite-mid' },
              { label: 'CRM / ERP', color: 'graphite-mid' },
              { label: 'INTERNAL TOOLS', color: 'graphite-muted' },
              { label: 'REPORTING', color: 'graphite-muted' },
            ].map((node, i, arr) => (
              <React.Fragment key={node.label}>
                <div
                  className={`w-full border border-[var(--color-border)] px-5 py-3 flex items-center justify-between bg-white text-[11px] uppercase tracking-widest transition-colors duration-300 ${
                    systemTokens.some((t: string) =>
                      t.toLowerCase().includes(node.label.split('/')[0].trim().toLowerCase().slice(0, 5))
                    )
                      ? 'border-[var(--color-graphite)] bg-[#FAFAFA]'
                      : ''
                  }`}
                >
                  <span className="text-[var(--color-graphite)] font-[300]">{node.label}</span>
                  <span className="text-[10px] text-[var(--color-graphite-muted)]">
                    {systemTokens.some((t: string) =>
                      t.toLowerCase().includes(node.label.split('/')[0].trim().toLowerCase().slice(0, 5))
                    )
                      ? '● IDENTIFIED'
                      : '○ TBC'}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <div className="flex flex-col items-center py-0.5">
                    <div className="w-[1px] h-4 bg-[var(--color-border-strong)]" />
                    <div className="text-[9px] text-[var(--color-graphite-muted)]">↓</div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          <p className="text-[10px] uppercase tracking-widest text-[var(--color-graphite-muted)] mt-8 text-center">
            ARCHITECTURAL SYSTEM MAP
          </p>

          {systemTokens.length > 0 && (
            <p className="text-xs text-[var(--color-graphite-mid)] mt-2 text-center">
              {systemTokens.length} system{systemTokens.length !== 1 ? 's' : ''} identified
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
