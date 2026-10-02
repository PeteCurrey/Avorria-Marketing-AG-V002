'use client'

import React from 'react'
import Image from 'next/image'

interface IntroSceneProps {
  onBegin: () => void
}

export const IntroScene: React.FC<IntroSceneProps> = ({ onBegin }) => {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center relative overflow-hidden bg-white">
      <div className="max-w-[1560px] mx-auto px-6 md:px-12 w-full py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Editorial Narrative (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-graphite-muted)] font-work-sans font-light">
              00 / PROJECT DISCOVERY
            </span>
            <span className="w-6 h-[1px] bg-[var(--color-border-strong)]" />
            <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-rose-text)] font-work-sans font-light">
              AVORRIA STUDIO
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-work-sans font-[200] text-[var(--color-graphite)] tracking-[-0.03em] leading-[1.03] mb-8">
            START SOMETHING<br />
            WORTH BUILDING.
          </h1>

          <div className="max-w-xl mb-10 space-y-4">
            <p className="font-work-sans font-light text-xl md:text-2xl text-[var(--color-graphite)] leading-snug">
              “This isn't a contact form.<br />
              It's the beginning of your project.”
            </p>
            <p className="font-work-sans font-light text-base md:text-lg text-[var(--color-graphite-mid)] leading-relaxed">
              You don't need to know the technical answers. Tell us what you're trying to change, build or solve — and our strategy and engineering team will shape a clear, comprehensive brief before a single conversation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-12">
            <button
              type="button"
              onClick={onBegin}
              className="bg-[var(--color-graphite)] text-white px-9 py-4 rounded-full font-work-sans font-light text-sm tracking-wider uppercase hover:bg-[var(--color-rose-text)] transition-colors duration-300 shadow-sm cursor-pointer"
            >
              BEGIN YOUR BRIEF →
            </button>
            <div className="text-xs font-work-sans font-light text-[var(--color-graphite-muted)] flex flex-col gap-0.5">
              <span>9 structured stages · Approx. 5–7 minutes</span>
              <span>Saves progress continuously · Supporting files welcome</span>
            </div>
          </div>

          {/* Architectural Stage Outline */}
          <div className="border-t border-[var(--color-border)] pt-6 w-full grid grid-cols-3 sm:grid-cols-5 gap-4 text-[10px] uppercase tracking-wider text-[var(--color-graphite-muted)] font-work-sans font-light">
            <div>
              <span className="block text-[var(--color-graphite)] font-[300]">01 // SCOPE</span>
              <span>Business &amp; Problem</span>
            </div>
            <div>
              <span className="block text-[var(--color-graphite)] font-[300]">02 // VISION</span>
              <span>Outcome &amp; Project</span>
            </div>
            <div>
              <span className="block text-[var(--color-graphite)] font-[300]">03 // CONTEXT</span>
              <span>Environment &amp; Files</span>
            </div>
            <div className="hidden sm:block">
              <span className="block text-[var(--color-graphite)] font-[300]">04 // TIMING</span>
              <span>Scale &amp; Horizon</span>
            </div>
            <div className="hidden sm:block">
              <span className="block text-[var(--color-graphite)] font-[300]">05 // DOSSIER</span>
              <span>Synthesized Brief</span>
            </div>
          </div>
        </div>

        {/* Right Cinematic Composition (5 Columns) */}
        <div className="lg:col-span-5 relative w-full h-[380px] sm:h-[460px] lg:h-[620px] flex items-center justify-center">
          {/* Subtle Outer Hairline Frame */}
          <div className="absolute inset-0 border border-[var(--color-border)] bg-[#FAFAFA]" />

          {/* Real Project Layer 1: Architecture Crop */}
          <div className="absolute top-6 left-6 right-6 bottom-16 overflow-hidden border border-[var(--color-border)] shadow-sm bg-white">
            <Image
              src="/images/projects/careeros/hero.webp"
              alt="Avorria Engineered Interface System"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-top filter grayscale contrast-110 opacity-90 transition-transform duration-1000 hover:scale-[1.02]"
            />
            {/* Fine Technical Grid Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Real Project Layer 2: Offset Telemetry Card */}
          <div className="absolute bottom-6 left-12 right-12 bg-white/95 backdrop-blur-sm border border-[var(--color-border)] p-5 shadow-sm">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-[var(--color-graphite-muted)] mb-2">
              <span>SYSTEM SPECIFICATION</span>
              <span className="text-[var(--color-rose-text)]">ACTIVE PIPELINE</span>
            </div>
            <p className="font-work-sans font-light text-xs text-[var(--color-graphite)] leading-relaxed">
              Bespoke web applications, high-performance platforms, and autonomous intelligence layers engineered for precision.
            </p>
            <div className="mt-3 flex items-center gap-4 text-[9px] uppercase tracking-wider text-[var(--color-graphite-muted)] border-t border-[var(--color-border)] pt-2">
              <span>53.4808° N, 2.2426° W</span>
              <span>·</span>
              <span>AVORRIA DIGITAL ARCHITECTURE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
