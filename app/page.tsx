import type { Metadata } from 'next'
import { Hero } from '@/components/home/Hero'
import { ChannelFilterBar } from '@/components/home/ChannelFilterBar'
import { EditorialMosaic } from '@/components/home/EditorialMosaic'
import { TopLeaderboard } from '@/components/home/TopLeaderboard'
import { ProofRail } from '@/components/home/ProofRail'
import { DisciplineShowcase } from '@/components/home/DisciplineShowcase'
import { Positioning } from '@/components/home/Positioning'
import { LobbyPreview } from '@/components/home/LobbyPreview'
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
 * HomePage — Full Red Bull Digital Flagship Architecture
 *
 * Sequence:
 * 1. Monumental Edge-to-Edge Hero + 4-Project Interactive Ticker
 * 2. Sticky Channel / Topic Filter Bar (Build, Search, Systems, Teardowns, Lobby)
 * 3. Signature Red Bull Asymmetric Editorial Mosaic (2x2 Lead Feature + 4 Cards)
 * 4. Top 05 Production Benchmarks Leaderboard (Architectural Numerals 01-05)
 * 5. Verified Engineering Proof Snap Rail
 * 6. Three Disciplines Product Showcase (Build, Search, Systems Editions)
 * 7. Commercial Positioning & Manifesto Chapter
 * 8. The Lobby Editorial Magazine Feed
 * 9. Monumental Final Commission Chapter
 */
export default function HomePage() {
  return (
    <>
      {/* 1. Full-Bleed Edge-to-Edge Hero Stage */}
      <Hero />

      {/* 2. Sticky Topic / Channel Bar */}
      <ChannelFilterBar />

      {/* 3. Red Bull Signature Asymmetric Editorial Mosaic */}
      <EditorialMosaic />

      {/* 4. Top 05 Engineering Leaderboard */}
      <TopLeaderboard />

      {/* 5. Verified Telemetry Rail */}
      <ProofRail />

      {/* 6. Three Disciplines Editions Arena */}
      <DisciplineShowcase />

      {/* 7. Commercial Manifesto */}
      <Positioning />

      {/* 8. The Lobby Magazine Feed */}
      <LobbyPreview />

      {/* 9. Final Commission Intake */}
      <FinalCta />
    </>
  )
}
