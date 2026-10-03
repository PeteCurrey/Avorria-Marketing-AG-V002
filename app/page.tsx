import type { Metadata } from 'next'
import { Hero } from '@/components/home/Hero'
import { Positioning } from '@/components/home/Positioning'
import { Capabilities } from '@/components/home/Capabilities'
import { SelectedWork } from '@/components/home/SelectedWork'
import { SystemsDiagram } from '@/components/home/SystemsDiagram'
import { ProcessSection } from '@/components/home/ProcessSection'
import { LobbyPreview } from '@/components/home/LobbyPreview'
import { FinalCta } from '@/components/home/FinalCta'
import { siteConfig } from '@/content/config/site'

export const metadata: Metadata = {
  title: `Avorria — ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    url: siteConfig.url,
    title: `Avorria — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
}

/**
 * HomePage — Quiet Confidence with a Creative Edge
 *
 * Exact chapter sequence:
 * 1. Hero: ivory + full-bleed image
 * 2. Positioning: ivory
 * 3. Capabilities: stone
 * 4. Selected Work: graphite
 * 5. Systems: petrol
 * 6. Process: ivory
 * 7. Lobby: stone
 * 8. Final CTA: wine
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Positioning />
      <Capabilities />
      <SelectedWork />
      <SystemsDiagram />
      <ProcessSection />
      <LobbyPreview />
      <FinalCta />
    </>
  )
}
