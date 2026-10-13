import type { Metadata } from 'next'
import { Hero } from '@/components/home/Hero'
import { DisciplineRail } from '@/components/home/DisciplineRail'
import { StoriesCarousel } from '@/components/home/StoriesCarousel'
import { DeploymentsList } from '@/components/home/DeploymentsList'
import { FinalCta } from '@/components/home/FinalCta'
import { siteConfig } from '@/content/config/site'

export const metadata: Metadata = {
  title: {
    absolute: `Avorria — ${siteConfig.tagline}`,
  },
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
 * HomePage — Red Bull Faithful Structural Duplication
 *
 * Exact Red Bull homepage section order (confirmed from redbull.com/gb-en, 12 Oct 2026):
 *   1. Hero          → ONE full-bleed story, bottom-anchored content, Ken Burns
 *   2. Disciplines   → Horizontal snap rail (Red Bull "Energy Drinks" section)
 *   3. Stories       → Horizontal card carousel + circular arrows (Red Bull "Stories")
 *   4. Deployments   → Row list + status badges (Red Bull "Events" section)
 *   5. Final CTA     → Dark commission chapter (Red Bull-style dark footer module)
 */
export default function HomePage() {
  return (
    <>
      {/* 1. Single full-bleed hero story — ONE story, bottom-left content */}
      <Hero />

      {/* 2. Disciplines horizontal snap rail — Red Bull "Energy Drinks" pattern */}
      <DisciplineRail />

      {/* 3. Stories horizontal card carousel — Red Bull "Stories" pattern */}
      <StoriesCarousel />

      {/* 4. Recent deployments row list — Red Bull "Events" pattern */}
      <DeploymentsList />

      {/* 5. Final commission chapter */}
      <FinalCta />
    </>
  )
}
