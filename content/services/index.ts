/**
 * Avorria — Canonical Service & Capability Taxonomy
 *
 * 3 Core Technical Disciplines:
 * 01. BUILD — High-performance web applications, digital flagships, bespoke digital products
 * 02. SEARCH — Enterprise technical search architecture, complex migrations, organic dominance
 * 03. SYSTEMS — Commercial data infrastructure, revenue attribution, autonomous workflows, payments
 */

import type { Service } from '@/types/content'

export const services: Service[] = [
  {
    slug: 'build',
    status: 'published',
    title: '01 // Build',
    headline: 'Digital flagships, bespoke web applications and interactive software.',
    description:
      'We engineer digital flagships and bespoke web software for organisations requiring uncompromising performance, surgical typography, and resilient modern architecture.',
    capabilities: [
      {
        title: 'High-Performance Web Flagships',
        description:
          'Corporate platforms, architectural monographs, and editorial presentations engineered on Next.js 16 with instant LCP and zero layout shift.',
      },
      {
        title: 'Bespoke Web Applications',
        description:
          'Complex interactive platforms, client dashboards, and secure portals built with strict TypeScript and server-first App Router architecture.',
      },
      {
        title: 'Selective WebGL & 3D Engineering',
        description:
          'Controlled vanilla Three.js visualization stages deployed for bespoke product configuration and technical showcase moments.',
      },
      {
        title: 'Headless Architecture & CMS',
        description:
          'Decoupled content infrastructure allowing editorial autonomy without sacrificing code hygiene or frontend speed.',
      },
      {
        title: 'Conversion-Engineered UX',
        description:
          'User journeys and interaction mechanics designed around commercial qualification, replacing generic card clutter with editorial pacing.',
      },
      {
        title: 'API & Microservice Integration',
        description:
          'Clean, resilient service contracts connecting web surfaces directly to internal databases and enterprise software.',
      },
    ],
    technology: ['Next.js App Router', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Vanilla Three.js', 'PostgreSQL'],
    seo: {
      title: 'Digital Flagships & Web Application Engineering — Avorria',
      description:
        'Avorria engineers bespoke web flagships and complex interactive applications. Precision typography, instant performance, and architectural restraint.',
    },
  },
  {
    slug: 'search',
    status: 'published',
    title: '02 // Search',
    headline: 'Technical search architecture, migration risk mitigation, and structural visibility.',
    description:
      'We treat search engine visibility as an engineering discipline. We build search architectures that compound in value, protect revenue during migrations, and capture high-intent commercial demand.',
    capabilities: [
      {
        title: 'Enterprise Technical Architecture',
        description:
          'Crawl budget engineering, semantic graph hierarchies, and rendering optimization ensuring complete index comprehension.',
      },
      {
        title: 'High-Risk Migration Engineering',
        description:
          'Rigorous 301 redirect mapping, canonical preservation, and URL authority safeguarding during major corporate platform rebuilds.',
      },
      {
        title: 'Commercial Intent Hierarchy',
        description:
          'Systematic keyword mapping targeting high-value commercial transactions and enterprise buyer intent rather than vanity search volume.',
      },
      {
        title: 'Structured Data & Entity Graphs',
        description:
          'Comprehensive Schema.org semantic graphs engineered to establish unmistakable brand authority across search engines and AI models.',
      },
      {
        title: 'Core Web Vitals Remediation',
        description:
          'Root-cause architectural diagnostics to achieve 100/100 performance scores across mobile and desktop environments.',
      },
      {
        title: 'Audit & Retainer Teardowns',
        description:
          'Blunt, independent audits of existing agency SEO retainers—revealing what is productive work, what is filler, and where crawl leaks exist.',
      },
    ],
    technology: ['Google Search Console API', 'Lighthouse', 'Schema.org', 'Next.js Metadata', 'Edge Rewriting'],
    seo: {
      title: 'Technical Search Architecture & SEO Engineering — Avorria',
      description:
        'Avorria provides enterprise technical search architecture and migration risk mitigation. Search engine visibility engineered for compounding commercial value.',
    },
  },
  {
    slug: 'systems',
    status: 'published',
    title: '03 // Systems',
    headline: 'Commercial data infrastructure, revenue attribution, and intelligent automations.',
    description:
      'A website is only as valuable as the business machinery behind it. We design and deploy the data pipelines, autonomous workflows, and payment infrastructure that power digital operations.',
    capabilities: [
      {
        title: 'Server-Side Attribution & Tracking',
        description:
          'Resilient server-to-server tracking (CAPI, custom webhooks, PostgreSQL logs) eliminating browser ad-blocker drop-offs and reconciling true CAC.',
      },
      {
        title: 'Autonomous Workflow & Scout Engines',
        description:
          'Purpose-built automated processing pipelines for lead qualification, data extraction, competitor inspection, and operational routing.',
      },
      {
        title: 'Commercial Payment & Stripe Infrastructure',
        description:
          'Secure deposit collection, recurring billing, signed proposal token redemption, and automated accounting reconciliation.',
      },
      {
        title: 'Transactional Email & Dispatch',
        description:
          'Dedicated domain authentication, rate-limited dispatch queues, and high-deliverability notification workflows via Resend.',
      },
      {
        title: 'Internal Dashboards & Executive Portals',
        description:
          'High-density data interfaces that provide leadership with real-time pipeline telemetry, cashflow modeling, and operating metrics.',
      },
      {
        title: 'CRM & ERP Synchronization',
        description:
          'Bi-directional synchronization bridges between front-facing web funnels and back-office enterprise management systems.',
      },
    ],
    technology: ['PostgreSQL', 'Supabase', 'Stripe', 'Resend', 'TypeScript', 'Server Actions'],
    seo: {
      title: 'Commercial Data Infrastructure & Systems Engineering — Avorria',
      description:
        'Avorria engineers commercial systems, server-side attribution, Stripe payment infrastructure, and intelligent workflow automation.',
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
