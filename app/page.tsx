import type { Metadata } from 'next'
import { Hero } from '@/components/home/Hero'
import { Positioning } from '@/components/home/Positioning'
import { Capabilities } from '@/components/home/Capabilities'
import { SelectedWork } from '@/components/home/SelectedWork'
import { SystemsDiagram } from '@/components/home/SystemsDiagram'
import { ProcessSection } from '@/components/home/ProcessSection'
import { TechStack } from '@/components/home/TechStack'
import { JournalPreview } from '@/components/home/JournalPreview'
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

export default function HomePage() {
  return (
    <>
      <Hero />
      <Positioning />
      <Capabilities />
      <SelectedWork />
      <SystemsDiagram />
      <ProcessSection />
      <TechStack />
      <JournalPreview />
      <FinalCta />
    </>
  )
}
