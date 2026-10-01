/**
 * Avorria — Services Content
 * Verified capability descriptions only. No invented outcomes or statistics.
 */

import type { Service } from '@/types/content'

export const services: Service[] = [
  {
    slug: 'web-development',
    status: 'published',
    title: 'Web Development',
    headline: 'High-performance websites and web applications.',
    description:
      'We design and engineer websites and web applications that perform, convert and scale. From marketing sites to complex web applications, we build with precision and purpose.',
    capabilities: [
      {
        title: 'High-Performance Websites',
        description:
          'Marketing sites, corporate platforms and editorial experiences engineered for speed, conversion and long-term maintainability.',
      },
      {
        title: 'Web Applications',
        description:
          'Complex interactive applications — dashboards, portals, SaaS products and internal tools — built for reliability and scale.',
      },
      {
        title: 'Ecommerce',
        description:
          'Commerce platforms built for performance and conversion, from bespoke storefronts to complex multi-channel operations.',
      },
      {
        title: 'Headless Architecture',
        description:
          'Decoupled frontend and backend systems that allow content, commerce and experience to evolve independently.',
      },
      {
        title: 'CMS Implementation',
        description:
          'Content management systems configured for editorial teams, with structured content models that support growth.',
      },
      {
        title: 'API Integration',
        description:
          'Clean integration with third-party services, internal systems and data sources.',
      },
    ],
    technology: ['Next.js', 'React', 'TypeScript', 'Vercel', 'PostgreSQL'],
    seo: {
      title: 'Web Development Agency — Avorria',
      description:
        'Avorria builds high-performance websites and web applications. From marketing sites to complex web applications — engineered for performance, conversion and scale.',
    },
  },
  {
    slug: 'ai-development',
    status: 'published',
    title: 'AI Development',
    headline: 'AI built to solve real business problems.',
    description:
      'We implement AI where it creates genuine business value — integrating AI into products, building intelligent workflows, and creating AI-native functionality that actually works.',
    capabilities: [
      {
        title: 'AI Integration',
        description:
          'Connect your existing systems and products to AI models and APIs in a controlled, evaluated way.',
      },
      {
        title: 'AI Agents',
        description:
          'Purpose-built autonomous agents that handle specific, well-defined business tasks with appropriate human oversight.',
      },
      {
        title: 'AI Workflows & Automation',
        description:
          'Intelligent automation of business processes — document processing, data extraction, classification, routing and decision support.',
      },
      {
        title: 'Knowledge Systems',
        description:
          'AI-powered knowledge bases, documentation systems and information retrieval built on your proprietary data.',
      },
      {
        title: 'AI Product Development',
        description:
          'AI-native product features — from intelligent search to personalisation to generative interfaces — built into your product.',
      },
      {
        title: 'Evaluation & Governance',
        description:
          'Structured evaluation frameworks for AI system quality, reliability, safety and business impact.',
      },
    ],
    technology: ['OpenAI', 'Anthropic', 'TypeScript', 'Python', 'PostgreSQL', 'Supabase'],
    seo: {
      title: 'AI Development Agency — Avorria',
      description:
        'Avorria builds AI integrations, agents and intelligent workflows that solve real business problems. AI implementation without the hype.',
    },
  },
  {
    slug: 'digital-systems',
    status: 'published',
    title: 'Digital Systems',
    headline: 'Business systems that connect your digital operations.',
    description:
      'A website is sometimes only the beginning. We design and build the data, automation, integrations and platforms that make your digital infrastructure genuinely useful.',
    capabilities: [
      {
        title: 'Business Platforms',
        description:
          'Custom platforms built around your specific business processes — not configured around somebody else\'s assumptions.',
      },
      {
        title: 'CRM Integration',
        description:
          'Connect your website, applications and data systems with your CRM to create a coherent customer view.',
      },
      {
        title: 'Data Systems',
        description:
          'Data pipelines, warehouses, transformation layers and analytics infrastructure built to be reliable and maintainable.',
      },
      {
        title: 'APIs',
        description:
          'Internal and external APIs designed for clarity, performance and long-term evolution.',
      },
      {
        title: 'Automation',
        description:
          'Business process automation that removes manual work and keeps your operations moving without you.',
      },
      {
        title: 'Internal Tools',
        description:
          'Custom internal applications — dashboards, reporting tools, admin systems — built for the people who actually use them.',
      },
    ],
    technology: ['PostgreSQL', 'Supabase', 'TypeScript', 'Next.js', 'APIs'],
    seo: {
      title: 'Digital Systems — Avorria',
      description:
        'Avorria builds the data, automation, APIs and platforms that make your digital infrastructure genuinely useful. Business systems without unnecessary complexity.',
    },
  },
]

/** Returns only published services */
export function getPublishedServices(): Service[] {
  return services.filter((s) => s.status === 'published')
}

/** Returns a single published service by slug */
export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug && s.status === 'published')
}
