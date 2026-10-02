import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'
import { siteConfig } from '@/content/config/site'
import { ProjectHero } from '@/components/consultation/ProjectHero'
import { ProjectInitiationWizard } from '@/components/consultation/ProjectInitiationWizard'
import { ProjectInfoSection } from '@/components/consultation/ProjectInfoSection'

export const metadata: Metadata = generatePageMetadata({
  title: 'Start a Project | Digital Products, Websites & Intelligent Systems',
  description:
    "Start a digital project with Avorria. Tell us what you're building, changing or solving and we'll help define the right website, digital platform, AI system or digital architecture.",
  path: '/start-a-project',
})

function StartAProjectJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${siteConfig.url}/start-a-project#webpage`,
    name: 'Start a Project — Project Initiation & Architecture Scoping',
    url: `${siteConfig.url}/start-a-project`,
    description:
      'Initiate a bespoke digital engagement with Avorria. High-performance websites, custom web applications, autonomous AI systems, and technical architecture scoping.',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
      name: siteConfig.name,
    },
    about: {
      '@type': 'Service',
      name: 'Digital Architecture & Platform Engineering',
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

      {/* Cinematic Media Hero */}
      <ProjectHero />

      {/* Initiation Wizard Section */}
      <section className="section-y bg-white">
        <div className="container-max">
          <ProjectInitiationWizard />
        </div>
      </section>

      {/* Informational Architecture & Closing CTA */}
      <ProjectInfoSection />
    </div>
  )
}
