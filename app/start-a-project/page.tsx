import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'
import { siteConfig } from '@/content/config/site'
import { ProjectInfoSection } from '@/components/consultation/ProjectInfoSection'
import { DiscoveryHero } from '@/components/consultation/discovery/DiscoveryHero'
import { DiscoveryWorkspace } from '@/components/consultation/discovery/DiscoveryWorkspace'

export const metadata: Metadata = generatePageMetadata({
  title: 'Start a Digital Project | Avorria Project Discovery',
  description: 'Begin your project brief with Avorria. Tell us about your business, the problem you face, and what you want to achieve. Our intelligent discovery process helps you articulate your project before a single meeting.',
  path: '/start-a-project',
})

function StartAProjectJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${siteConfig.url}/start-a-project#webpage`,
    name: 'Start a Digital Project | Avorria Project Discovery',
    url: `${siteConfig.url}/start-a-project`,
    description: 'Begin your project brief with Avorria. Tell us about your business, the problem you face, and what you want to achieve.',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
      name: siteConfig.name,
    },
    about: {
      '@type': 'Service',
      name: 'Digital Project Discovery',
      provider: {
        '@type': 'Organization',
        name: siteConfig.organization.name,
        url: siteConfig.url,
      },
      serviceType: [
        'Web Development',
        'Web Applications',
        'Digital Platforms',
        'AI Development & Automation',
        'Technical Architecture Audits',
      ],
      areaServed: 'GB',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default function StartAProjectPage() {
  return (
    <div className="bg-white text-[var(--color-graphite)] min-h-screen">
      <StartAProjectJsonLd />
      <DiscoveryHero />
      <DiscoveryWorkspace />
      <ProjectInfoSection />
    </div>
  )
}
