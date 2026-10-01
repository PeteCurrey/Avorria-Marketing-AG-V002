/**
 * Avorria — Commercial Engagement Models & Project Economics
 *
 * Transparent commercial principles. Zero hidden retainer drift.
 * Real engineering costs tied to verifiable deliverables.
 */

export interface PricingModel {
  id: string
  name: string
  sequence: string
  investment: string
  billingStructure: string
  idealFor: string
  summary: string
  deliverables: string[]
  timeline: string
}

export const PRICING_MODELS: PricingModel[] = [
  {
    id: 'sprint-build',
    name: 'Dedicated Build Sprint',
    sequence: '01',
    investment: '£8,000 – £40,000+',
    billingStructure: 'Milestone-based (Deposit, Beta Delivery, Production Sign-off)',
    idealFor: 'Organisations requiring a new digital flagship, complex platform rebuild, or high-risk platform migration.',
    summary: 'A defined-scope architectural sprint that designs, engineers, and deploys a production-ready digital asset with zero legacy baggage.',
    deliverables: [
      'Comprehensive architectural blueprint and technical scoping document',
      'Bespoke Next.js App Router engineering with strict TypeScript and Tailwind v4',
      'Surgical Work Sans typography system and mobile-first responsive execution',
      'Optional WebGL product inspection aperture or custom Canvas interface',
      'Server-side tracking, analytics, and CRM integration',
      'Zero layout shift, 100/100 Core Web Vitals, and full production handover',
    ],
    timeline: '4 – 12 weeks depending on technical complexity',
  },
  {
    id: 'embedded-systems',
    name: 'Embedded Growth & Systems Retainer',
    sequence: '02',
    investment: '£4,000 – £12,000+ / month',
    billingStructure: 'Quarterly commitment with 30-day rolling transition terms',
    idealFor: 'Ambitious enterprises who require an in-house digital engineering, technical search, and pipeline infrastructure partner.',
    summary: 'We behave as your senior digital engineering and growth systems department—iterating code, maintaining search authority, and optimizing pipeline.',
    deliverables: [
      'Continuous technical SEO engineering, crawl monitoring, and entity graph expansion',
      'Ongoing feature development, conversion rate refinement, and UX enhancements',
      'Autonomous workflow automation and data integration maintenance',
      'Server-side ad attribution reconciliation and full-funnel reporting',
      'Direct Slack/Teams channel with senior engineering and strategic leadership',
      'Bi-weekly production releases and executive commercial reporting',
    ],
    timeline: 'Ongoing partnership with 90-day operating roadmaps',
  },
  {
    id: 'agency-teardown',
    name: 'Retainer & Architecture Teardown Audit',
    sequence: '03',
    investment: '£1,500 – £3,500 (Diagnostic)',
    billingStructure: 'Fixed-fee diagnostic (Credited against future builds)',
    idealFor: 'Executives paying £3k–£10k+/mo to marketing agencies who suspect they are paying for 40-page fluff decks and zero commercial progress.',
    summary: 'A blunt, confidential forensic audit of your existing marketing retainers, tech stack, and crawl architecture. We tell you exactly what is working, what is filler, and what is broken.',
    deliverables: [
      'Forensic teardown of agency deliverables vs. invoices over the last 6–12 months',
      'Technical health audit (Crawl errors, indexing leaks, CWV bottlenecks, tracking gaps)',
      'Attribution validation: separating genuine commercial revenue from vanity impressions',
      'Actionable 90-day remediation roadmap with prioritized fixes',
      'Executive briefing document ready for board or leadership review',
    ],
    timeline: 'Delivered in 5 – 7 business days',
  },
]

export const COST_DRIVERS = {
  increasesComplexity: [
    'Custom WebGL / 3D interactive configuration requirements',
    'Complex multi-system ERP / CRM two-way real-time data synchronization',
    'Multi-region internationalization with dynamic currency and geo-routing',
    'High-volume transactional checkout and custom compliance requirements',
  ],
  reducesComplexity: [
    'Clean, pre-existing brand assets and verified technical specifications',
    'Direct access to decision-makers with rapid review cycles',
    'Standard headless CMS integration (Sanity / Supabase)',
    'Modern, well-documented existing API endpoints',
  ],
}
