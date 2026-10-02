'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface Scene01BusinessProps {
  initialData?: Record<string, any>
  onNext: (data: Record<string, any>) => void
  onBack: () => void
  onSkip?: () => void
}

export const Scene01Business: React.FC<Scene01BusinessProps> = ({
  initialData = {},
  onNext,
  onBack,
  onSkip,
}) => {
  const [data, setData] = useState({
    companyName: initialData.companyName || '',
    businessDescription: initialData.businessDescription || '',
    contactName: initialData.contactName || '',
    contactEmail: initialData.contactEmail || '',
    contactRole: initialData.contactRole || '',
    companyWebsite: initialData.companyWebsite || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
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
              STAGE 01 / 09
            </span>
            <span className="w-8 h-[1px] bg-[var(--color-border)]" />
            <span className="text-[12px] uppercase tracking-[0.16em] text-[var(--color-graphite-muted)] font-work-sans font-light">
              FOUNDATIONAL CONTEXT
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-work-sans font-[200] text-[var(--color-graphite)] tracking-[-0.03em] leading-[1.08] mb-4">
            TELL US ABOUT<br />
            YOUR WORLD.
          </h2>

          <p className="font-work-sans font-light text-base md:text-lg text-[var(--color-graphite-mid)] max-w-xl mb-8 leading-relaxed">
            Before we explore technical architecture, we want to understand the enterprise behind it. What is your commercial purpose and who relies on your work?
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col gap-6 font-work-sans font-light">
            {/* Organisation Name Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="companyName" className="text-xs uppercase tracking-wider text-[var(--color-graphite-muted)]">
                Company or Venture Name
              </label>
              <input
                id="companyName"
                type="text"
                name="companyName"
                value={data.companyName}
                onChange={handleChange}
                placeholder="e.g. Stratum Geological Systems"
                className="w-full bg-[#FAFAFA] border border-[var(--color-border)] px-4 py-3.5 text-base text-[var(--color-graphite)] rounded-[2px] focus:bg-white focus:border-[var(--color-graphite)] outline-none transition-all placeholder:text-[var(--color-graphite-muted)]"
              />
            </div>

            {/* Business Description Area */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="businessDescription" className="text-xs uppercase tracking-wider text-[var(--color-graphite-muted)]">
                What does your business do, and who are your customers?
              </label>
              <textarea
                id="businessDescription"
                name="businessDescription"
                value={data.businessDescription}
                onChange={handleChange}
                rows={4}
                placeholder="Describe your operations in plain words. For example: We supply industrial telemetry to North Sea offshore operators..."
                className="w-full bg-[#FAFAFA] border border-[var(--color-border)] p-4 text-base text-[var(--color-graphite)] rounded-[2px] focus:bg-white focus:border-[var(--color-graphite)] outline-none transition-all resize-y placeholder:text-[var(--color-graphite-muted)]"
              />
            </div>

            {/* Contact Details (Non-Gated, Respectful) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contactName" className="text-xs uppercase tracking-wider text-[var(--color-graphite-muted)]">
                  Your Name (Optional)
                </label>
                <input
                  id="contactName"
                  type="text"
                  name="contactName"
                  value={data.contactName}
                  onChange={handleChange}
                  placeholder="e.g. Dr. Helen Vance"
                  className="bg-[#FAFAFA] border border-[var(--color-border)] px-3.5 py-2.5 text-sm text-[var(--color-graphite)] rounded-[2px] focus:bg-white focus:border-[var(--color-graphite)] outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="contactEmail" className="text-xs uppercase tracking-wider text-[var(--color-graphite-muted)]">
                  Work Email (Optional)
                </label>
                <input
                  id="contactEmail"
                  type="email"
                  name="contactEmail"
                  value={data.contactEmail}
                  onChange={handleChange}
                  placeholder="helen@stratum.example"
                  className="bg-[#FAFAFA] border border-[var(--color-border)] px-3.5 py-2.5 text-sm text-[var(--color-graphite)] rounded-[2px] focus:bg-white focus:border-[var(--color-graphite)] outline-none transition-all"
                />
              </div>
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

        {/* Right Architectural Visual Composition (5 Columns) */}
        <div className="lg:col-span-5 relative w-full h-[360px] sm:h-[440px] lg:h-[600px] flex items-center justify-center">
          <div className="absolute inset-0 border border-[var(--color-border)] bg-[#FAFAFA] overflow-hidden">
            {/* Real Project Visual: One Great Northern architectural composition */}
            <Image
              src="/images/projects/one-great-northern/hero.webp"
              alt="Avorria Structural Architecture"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover filter grayscale contrast-115 opacity-85 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-70" />
          </div>

          {/* Live Document Assembly Badge */}
          <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm border border-[var(--color-border)] p-5 shadow-sm font-work-sans">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-[var(--color-graphite-muted)] mb-3 pb-2 border-b border-[var(--color-border)]">
              <span>BRIEFING ASSEMBLY</span>
              <span className="text-[var(--color-rose-text)]">STAGE 01 RECORD</span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[var(--color-graphite-muted)] block">
                  ORGANISATION
                </span>
                <span className="text-[var(--color-graphite)] font-[300]">
                  {data.companyName.trim() || '— Awaiting company name'}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-[var(--color-graphite-muted)] block">
                  COMMERCIAL ACTIVITY
                </span>
                <p className="text-[var(--color-graphite)] font-[300] line-clamp-2">
                  {data.businessDescription.trim() || '— Awaiting description'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
