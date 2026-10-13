import type { Metadata } from 'next'
import { Hero } from '@/components/home/Hero'
import { DisciplineRail } from '@/components/home/DisciplineRail'
import { StoriesCarousel } from '@/components/home/StoriesCarousel'
import { DeploymentsList } from '@/components/home/DeploymentsList'
import { EditorialGrid } from '@/components/home/EditorialGrid'
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
 * HomePage — Red Bull Digital Platform Exact Structural & Animated Duplicate
 *
 * Sequence:
 * 1. Panoptikum Hero Stage (100vh Full-Bleed Media, Ken Burns Zoom, Pill CTA, Progress Indicator)
 * 2. Discipline / Product Rail (Feed Cards Rail Scroller, Edition Numeral, Dynamic Scroll Track)
 * 3. Stories Feed Carousel (Cosmos Story Cards, Circular Arrow Navigation, Reading Time Badges)
 * 4. Events & Deployments Shelf (Calendar Layout, Filter Tabs, Live Radar Pulsing Badges)
 * 5. Red Bulletin Editorial Bento Grid (1 Major Lead + 2 Stacked Companion Cards)
 * 6. Monumental Closing Intake Chapter (High-Contrast Cobalt & Pure White CTAs)
 */
export default function HomePage() {
  return (
    <>
      {/* 1. Panoptikum Flagship Hero Stage */}
      <Hero />

      {/* 2. Product / Discipline Rail (Red Bull Energy Drinks Shelf) */}
      <DisciplineRail />

      {/* 3. Stories Carousel (Red Bull Stories Shelf with Arrow Nav) */}
      <StoriesCarousel />

      {/* 4. Events & Deployments Shelf (Red Bull Events Calendar Layout) */}
      <DeploymentsList />

      {/* 5. Editorial Bento Grid (Red Bull Bulletin Magazine Feed) */}
      <EditorialGrid />

      {/* 6. Commission Intake Chapter */}
      <FinalCta />
    </>
  )
}
