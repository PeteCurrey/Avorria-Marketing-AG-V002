'use client'

import React from 'react'

export const DiscoveryHero: React.FC = () => {
  const scrollToWizard = () => {
    document.getElementById('discovery-workspace')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="bg-white pt-32 pb-16 border-b border-[var(--color-border)]">
      <div className="container-max flex flex-col items-start max-w-4xl">
        <span className="text-[12px] uppercase tracking-wider text-[var(--color-graphite-muted)] font-work-sans font-light mb-6">
          Project Initiation / Avorria
        </span>
        <h1 className="text-5xl md:text-7xl font-work-sans font-[200] text-[var(--color-graphite)] leading-[1.1] mb-8">
          START SOMETHING<br />
          WORTH BUILDING.
        </h1>
        <p className="font-work-sans font-light text-lg md:text-xl text-[var(--color-graphite)] max-w-2xl mb-10 leading-relaxed">
          This isn't a contact form. It's the beginning of your project brief. You don't need to know the technical answers. Tell us what you're trying to change, build or solve — and we'll help you shape a clear brief together.
        </p>
        <button
          onClick={scrollToWizard}
          className="bg-[var(--color-graphite)] text-white px-8 py-3 rounded-full font-work-sans font-light hover:bg-[#2A2926] transition-colors mb-4"
        >
          BEGIN YOUR BRIEF →
        </button>
        <span className="text-sm font-work-sans font-light text-[var(--color-graphite-muted)]">
          Typically 5–10 minutes · Save your progress · Upload supporting material
        </span>
      </div>
    </section>
  )
}
