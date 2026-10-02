'use client'

import React, { useEffect, useState } from 'react'

interface ConfirmationSceneProps {
  companyName?: string
  contactEmail?: string
}

export const ConfirmationScene: React.FC<ConfirmationSceneProps> = ({
  companyName,
  contactEmail,
}) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Slight delay allows the fade-in transition to register after mount
    const t = setTimeout(() => setVisible(true), 60)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      className={`min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 py-16 transition-opacity duration-700 ease-out ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="max-w-3xl w-full flex flex-col items-center text-center gap-0 font-work-sans font-light">
        {/* Typographic Emblem */}
        <div className="mb-12 flex flex-col items-center gap-4">
          <div className="w-16 h-[1px] bg-[var(--color-border-strong)]" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-rose-text)]">
            AVORRIA · DISCOVERY COMPLETE
          </span>
          <div className="w-16 h-[1px] bg-[var(--color-border-strong)]" />
        </div>

        {/* Primary Statement */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-work-sans font-[200] text-[var(--color-graphite)] tracking-[-0.03em] leading-[1.04] mb-8">
          YOUR PROJECT<br />
          IS NOW<br />
          IN MOTION.
        </h1>

        {/* Horizontal rule */}
        <div className="w-full max-w-md h-[1px] bg-[var(--color-border)] my-10" />

        {/* What happens next */}
        <div className="w-full max-w-lg flex flex-col items-start gap-5 text-left mb-12">
          <p className="text-[10px] uppercase tracking-widest text-[var(--color-graphite-muted)] self-start">
            WHAT HAPPENS NEXT
          </p>
          {[
            'Your brief has been received by a principal strategist at Avorria.',
            'We will review your context and prepare a considered, specific response.',
            'Expect to hear from us within one business day.',
          ].map((line, i) => (
            <div key={i} className="flex items-start gap-4">
              <span className="text-[10px] text-[var(--color-graphite-muted)] mt-0.5 flex-shrink-0 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-base text-[var(--color-graphite)] leading-relaxed">{line}</p>
            </div>
          ))}
        </div>

        {/* Contact confirmation */}
        {contactEmail && (
          <div className="border border-[var(--color-border)] px-8 py-5 mb-12 w-full max-w-lg text-left">
            <p className="text-[10px] uppercase tracking-widest text-[var(--color-graphite-muted)] mb-2">
              CONFIRMATION SENT TO
            </p>
            <p className="text-sm text-[var(--color-graphite)]">{contactEmail}</p>
          </div>
        )}

        {/* Return home */}
        <a
          href="/"
          className="text-xs uppercase tracking-widest text-[var(--color-graphite-muted)] hover:text-[var(--color-graphite)] transition-colors border-b border-[var(--color-border)] pb-0.5"
        >
          ← RETURN TO AVORRIA
        </a>
      </div>
    </section>
  )
}
