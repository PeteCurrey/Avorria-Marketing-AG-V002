import type { Metadata } from 'next'
import { ConceptHero } from '@/components/home/ConceptHero'
import { ProofBand } from '@/components/home/ProofBand'
import { PinnedChapters } from '@/components/home/PinnedChapters'
import { AuditTiers } from '@/components/home/AuditTiers'
import { FeaturedCaseStudy } from '@/components/home/FeaturedCaseStudy'
import { LobbySection } from '@/components/home/LobbySection'
import { ClosingCtaFooter } from '@/components/home/ClosingCtaFooter'
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
    type: 'website',
  },
}

export default function HomePage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.organization.name,
    url: siteConfig.organization.url,
    logo: {
      '@type': 'ImageObject',
      url: siteConfig.organization.logo,
    },
    description: siteConfig.organization.description,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: siteConfig.organization.contactEmail,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <main id="main">
        <ConceptHero />
        <ProofBand />
        <PinnedChapters />
        <AuditTiers />
        <FeaturedCaseStudy />
        <LobbySection />
        <ClosingCtaFooter />
      </main>
    </>
  )
}
