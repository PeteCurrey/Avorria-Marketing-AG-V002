/**
 * Avorria — Mega Menu Configuration & Media Registry
 *
 * Sourced directly from verified Avorria projects, services, and routes.
 * Zero fabricated case studies or generic stock visuals.
 */

export interface VisualPreview {
  title: string
  subtitle: string
  image: string
  tag: string
  href: string
  ctaText?: string
}

export interface MegaMenuItem {
  label: string
  sublabel: string
  href: string
  tag?: string
  preview: VisualPreview
}

export interface MegaMenuSection {
  title: string
  items: MegaMenuItem[]
  viewAllLink?: {
    label: string
    href: string
  }
}

export interface MegaMenuTab {
  id: 'work' | 'services' | 'approach' | 'insights' | 'about'
  label: string
  href: string
  sections: MegaMenuSection[]
  defaultPreview: VisualPreview
}

export const megaMenuTabs: MegaMenuTab[] = [
  {
    id: 'work',
    label: 'Work',
    href: '/work',
    defaultPreview: {
      title: 'Drawdown.Trading',
      subtitle: 'Sub-millisecond quantitative risk terminal and Canvas execution interface.',
      image: '/images/projects/drawdown/hero.png',
      tag: 'FINANCIAL SYSTEMS // CANVAS API',
      href: '/work/drawdown',
      ctaText: 'View Case Study',
    },
    sections: [
      {
        title: '01 // SELECTED WORK',
        items: [
          {
            label: 'Alkota Bikes',
            sublabel: 'Bespoke WebGL titanium frame configurator & flagship platform',
            href: '/work/alkota-bikes',
            tag: '3D STAGE',
            preview: {
              title: 'Alkota Bikes',
              subtitle: 'High-performance digital flagship and custom frame architecture for bespoke titanium bicycles.',
              image: '/images/projects/alkota-bikes/hero-screenshot.png',
              tag: 'FLAGSHIP // THREE.JS // NEXT.JS',
              href: '/work/alkota-bikes',
              ctaText: 'View Case Study',
            },
          },
          {
            label: 'Drawdown.Trading',
            sublabel: 'Low-latency analytics dashboard & quantitative execution interface',
            href: '/work/drawdown',
            tag: 'FINTECH',
            preview: {
              title: 'Drawdown.Trading',
              subtitle: 'Sub-millisecond quantitative risk terminal and Canvas execution interface for professional trading.',
              image: '/images/projects/drawdown/hero.png',
              tag: 'FINANCIAL SYSTEMS // CANVAS API',
              href: '/work/drawdown',
              ctaText: 'View Case Study',
            },
          },
          {
            label: 'TAFM',
            sublabel: 'Commercial marketplace connecting UK businesses & lenders',
            href: '/work/tafm',
            tag: 'MARKETPLACE',
            preview: {
              title: 'TAFM',
              subtitle: 'Commercial asset finance marketplace platform connecting UK businesses, equipment suppliers, and specialist finance providers.',
              image: '/images/projects/tafm/hero-screenshot.png',
              tag: 'MARKETPLACE INFRASTRUCTURE',
              href: '/work/tafm',
              ctaText: 'View Case Study',
            },
          },
          {
            label: 'CareerOS',
            sublabel: 'Autonomous agent workflows & real-time skill taxonomy graphs',
            href: '/work/careeros',
            tag: 'AI AGENTS',
            preview: {
              title: 'CareerOS',
              subtitle: 'Enterprise career orchestration platform and intelligent workflow systems powered by autonomous agents.',
              image: '/images/projects/careeros/hero-screenshot.png',
              tag: 'AUTONOMOUS WORKFLOWS // AI',
              href: '/work/careeros',
              ctaText: 'View Case Study',
            },
          },
        ],
      },
      {
        title: '02 // PROVEN INFRASTRUCTURE',
        items: [
          {
            label: 'NestIQ Property Intelligence',
            sublabel: '25M+ cadastral parcel PostGIS spatial intelligence platform',
            href: '/work/nestiq',
            tag: 'SPATIAL GIS',
            preview: {
              title: 'NestIQ',
              subtitle: 'Spatial data layers and valuation modeling platform for institutional real estate search.',
              image: '/images/projects/nestiq/hero.webp',
              tag: 'POSTGIS // SPATIAL TILES',
              href: '/work/nestiq',
              ctaText: 'View Case Study',
            },
          },
          {
            label: 'EntireFM Nationwide',
            sublabel: '8 regional domains consolidated with zero organic equity loss',
            href: '/work/entirefm',
            tag: 'SEARCH DOMINANCE',
            preview: {
              title: 'EntireFM',
              subtitle: 'Nationwide commercial facilities management platform, operations dispatch, and organic search architecture.',
              image: '/images/projects/entirefm/hero.webp',
              tag: 'ENTERPRISE MIGRATION // SEARCH',
              href: '/work/entirefm',
              ctaText: 'View Case Study',
            },
          },
          {
            label: 'One Great Northern',
            sublabel: 'Architectural property monograph with interactive floorplates',
            href: '/work/one-great-northern',
            tag: 'MONOGRAPH',
            preview: {
              title: 'One Great Northern',
              subtitle: 'Immersive architectural showcase for landmark commercial property development.',
              image: '/images/projects/one-great-northern/hero.webp',
              tag: 'ARCHITECTURAL EDITORIAL',
              href: '/work/one-great-northern',
              ctaText: 'View Case Study',
            },
          },
        ],
        viewAllLink: {
          label: 'View All 7 Production Projects →',
          href: '/work',
        },
      },
    ],
  },
  {
    id: 'services',
    label: 'Services',
    href: '/services',
    defaultPreview: {
      title: 'Digital Flagships & Web Applications',
      subtitle: 'Engineered for sub-second LCP, surgical typography, and zero layout shift.',
      image: '/images/projects/alkota-bikes/hero-screenshot.png',
      tag: 'DISCIPLINE 01 // BUILD',
      href: '/services/build',
      ctaText: 'Explore Build Discipline',
    },
    sections: [
      {
        title: '01 // BUILD & PLATFORMS',
        items: [
          {
            label: 'Digital Flagships',
            sublabel: 'Corporate platforms and editorial presentations on Next.js 16 App Router',
            href: '/services/build',
            tag: '0.62S LCP',
            preview: {
              title: 'Digital Flagships & Web Platforms',
              subtitle: 'Bespoke web applications engineered on Next.js 16 with instant LCP and zero layout shift.',
              image: '/images/projects/alkota-bikes/hero-screenshot.png',
              tag: 'NEXT.JS 16 // THREE.JS',
              href: '/services/build',
              ctaText: 'Explore Build Discipline',
            },
          },
          {
            label: 'Bespoke Web Applications',
            sublabel: 'Client portals, internal tooling, and resilient state machines',
            href: '/services/build',
            tag: 'FULL STACK',
            preview: {
              title: 'Bespoke Web Software',
              subtitle: 'Server-first execution and strict TypeScript invariants for high-value enterprise software.',
              image: '/images/projects/tafm/hero-screenshot.png',
              tag: 'STRICT TYPESCRIPT // RBAC',
              href: '/services/build',
              ctaText: 'Explore Build Discipline',
            },
          },
          {
            label: 'Selective WebGL & 3D',
            sublabel: 'Vanilla Three.js inspection stages and technical product configurators',
            href: '/services/build',
            tag: '60 FPS',
            preview: {
              title: 'Selective WebGL Engineering',
              subtitle: 'Controlled 3D visualization stages without bloated third-party framework overhead.',
              image: '/images/projects/alkota-bikes/hero-screenshot.png',
              tag: 'THREE.JS // WEBGL',
              href: '/services/build',
              ctaText: 'Explore Build Discipline',
            },
          },
        ],
      },
      {
        title: '02 // SEARCH & SYSTEMS',
        items: [
          {
            label: 'Technical Search Architecture',
            sublabel: 'Crawl budget engineering, Schema.org entity graphs, and Core Web Vitals 100/100',
            href: '/services/search',
            tag: 'SEARCH',
            preview: {
              title: 'Technical Search & Migration',
              subtitle: 'Treating search visibility as an engineering discipline with zero ranking drop during rebuilds.',
              image: '/images/projects/entirefm/hero.webp',
              tag: 'ORGANIC AUTHORITY',
              href: '/services/search',
              ctaText: 'Explore Search Discipline',
            },
          },
          {
            label: 'Commercial Systems & Data',
            sublabel: 'Server-side attribution, Stripe payments, and PostGIS vector cadastral tiles',
            href: '/services/systems',
            tag: 'INFRASTRUCTURE',
            preview: {
              title: 'Commercial Systems & Data',
              subtitle: 'Connecting transaction gateways, server-side webhooks, and real-time operational telemetry.',
              image: '/images/projects/drawdown/hero.png',
              tag: 'POSTGRESQL // STRIPE',
              href: '/services/systems',
              ctaText: 'Explore Systems Discipline',
            },
          },
          {
            label: 'Autonomous Workflows & AI',
            sublabel: 'Deterministic vector retrieval, automated worker queues, and scout routines',
            href: '/services/systems',
            tag: 'AUTOMATION',
            preview: {
              title: 'Autonomous Systems & AI Agents',
              subtitle: 'Domain-trained vector embeddings and scheduled operational pipelines with zero human drag.',
              image: '/images/projects/careeros/hero-screenshot.png',
              tag: 'VECTOR SEARCH // WORKFLOWS',
              href: '/services/systems',
              ctaText: 'Explore Systems Discipline',
            },
          },
        ],
        viewAllLink: {
          label: 'View Capability Matrix →',
          href: '/services',
        },
      },
    ],
  },
  {
    id: 'approach',
    label: 'Approach',
    href: '/process',
    defaultPreview: {
      title: 'Precision Engineering Methodology',
      subtitle: 'The 7-stage delivery protocol engineered to resolve commercial friction.',
      image: '/images/positioning/manifesto.jpg',
      tag: 'AVORRIA PROTOCOL // REF. AV-2025',
      href: '/process',
      ctaText: 'Explore 7-Stage Process',
    },
    sections: [
      {
        title: '01 // HOW WE WORK',
        items: [
          {
            label: 'The 7-Stage Delivery Process',
            sublabel: 'Understand → Architect → Design → Engineer → Validate → Launch → Improve',
            href: '/process',
            tag: '7 STAGES',
            preview: {
              title: 'The 7-Stage Delivery Process',
              subtitle: 'Structure precedes surface. We specify database schemas and system models before interface styling.',
              image: '/images/positioning/manifesto.jpg',
              tag: 'SPECIFICATION PRECEDES SURFACE',
              href: '/process',
              ctaText: 'View Methodology',
            },
          },
          {
            label: 'Production Tolerances',
            sublabel: 'Sub-second LCP, WCAG AAA accessibility, zero layout shift, strict TypeScript',
            href: '/about#standards',
            tag: 'TOLERANCES',
            preview: {
              title: 'Engineering Tolerances',
              subtitle: 'Strict performance thresholds: 100/100 Core Web Vitals, zero layout shift, and contract invariants.',
              image: '/images/projects/drawdown/hero.png',
              tag: 'SUB-SECOND LCP // ZERO CLS',
              href: '/about#standards',
              ctaText: 'View Standards',
            },
          },
        ],
      },
      {
        title: '02 // COMMERCIAL TERMS',
        items: [
          {
            label: 'Transparent Pricing & Retainers',
            sublabel: 'Fixed-deliverable scopes and senior principal access with zero agency overhead',
            href: '/pricing',
            tag: 'TRANSPARENT',
            preview: {
              title: 'Commercial Transparency',
              subtitle: 'Defined deliverables, explicit production timelines, and senior engineer execution.',
              image: '/images/positioning/manifesto.jpg',
              tag: 'FIXED-SCOPE // VALUE PRICED',
              href: '/pricing',
              ctaText: 'View Pricing Matrix',
            },
          },
          {
            label: 'Independent Digital Audit',
            sublabel: 'Rigorous diagnostic appraisal of your current tech stack, search equity, and speed',
            href: '/digital-audit',
            tag: 'AUDIT',
            preview: {
              title: 'Independent Digital Audit',
              subtitle: 'Blunt, forensic teardowns of code hygiene, crawl budget leaks, and conversion bottlenecks.',
              image: '/images/projects/tafm/hero-screenshot.png',
              tag: 'FORENSIC APPRAISAL',
              href: '/digital-audit',
              ctaText: 'Request Technical Audit',
            },
          },
        ],
        viewAllLink: {
          label: 'Read Full Process Specification →',
          href: '/process',
        },
      },
    ],
  },
  {
    id: 'insights',
    label: 'Insights',
    href: '/lobby',
    defaultPreview: {
      title: 'The Lobby',
      subtitle: 'Editorial intelligence for modern operators: Google, AI systems, websites, and infrastructure.',
      image: '/images/projects/tafm/hero-screenshot.png',
      tag: 'INTELLIGENCE // AVORRIA DISPATCH',
      href: '/lobby',
      ctaText: 'Enter The Lobby',
    },
    sections: [
      {
        title: '01 // EDITORIAL INTELLIGENCE',
        items: [
          {
            label: 'The Lobby Index',
            sublabel: 'What changed. What matters. What you should do about it.',
            href: '/lobby',
            tag: 'PUBLICATION',
            preview: {
              title: 'The Lobby Editorial Index',
              subtitle: 'Independent operator dispatches covering technical architecture, search changes, and digital systems.',
              image: '/images/projects/tafm/hero-screenshot.png',
              tag: 'THE LOBBY // DISPATCH',
              href: '/lobby',
              ctaText: 'Read Publications',
            },
          },
          {
            label: 'Technical Search & Migration Notes',
            sublabel: 'Architectural strategies for preserving organic authority through platform overhauls',
            href: '/lobby/category/search',
            tag: 'ANALYSIS',
            preview: {
              title: 'Search & Crawl Architecture',
              subtitle: 'Engineering perspectives on Google crawl budgets, semantic graph indexes, and AI search visibility.',
              image: '/images/projects/entirefm/hero.webp',
              tag: 'TECHNICAL SEARCH',
              href: '/lobby/category/search',
              ctaText: 'Read Search Notes',
            },
          },
        ],
      },
      {
        title: '02 // DIAGNOSTICS & BRIEFING',
        items: [
          {
            label: 'Digital Teardown & Systems Audit',
            sublabel: 'Understand exactly where your site leaks speed, search rank, or conversion efficiency',
            href: '/digital-audit',
            tag: 'DIAGNOSTIC',
            preview: {
              title: 'Systems & Code Diagnostics',
              subtitle: 'Comprehensive audits exposing third-party script bloat, rendering stalls, and organic leaks.',
              image: '/images/projects/drawdown/hero.png',
              tag: 'SYSTEM AUDIT',
              href: '/digital-audit',
              ctaText: 'Request Audit',
            },
          },
          {
            label: 'Begin a Structured Project Brief',
            sublabel: 'Scope your technical requirements, expected timelines, and system boundaries',
            href: '/start-a-project',
            tag: 'DISCOVERY',
            preview: {
              title: 'Structured Project Discovery',
              subtitle: 'Interactive commission intake matching technical specifications directly to business outcomes.',
              image: '/images/projects/alkota-bikes/hero-screenshot.png',
              tag: 'INTAKE OPEN',
              href: '/start-a-project',
              ctaText: 'Start Discovery Brief',
            },
          },
        ],
        viewAllLink: {
          label: 'Browse All Lobby Notes & Guides →',
          href: '/lobby',
        },
      },
    ],
  },
  {
    id: 'about',
    label: 'About',
    href: '/about',
    defaultPreview: {
      title: 'Avorria Digital Studio',
      subtitle: 'Engineers and designers building serious digital products and operating systems.',
      image: '/images/positioning/manifesto.jpg',
      tag: 'LONDON // GLOBAL COMMISSIONS',
      href: '/about',
      ctaText: 'Explore Studio Profile',
    },
    sections: [
      {
        title: '01 // THE STUDIO',
        items: [
          {
            label: 'Studio Philosophy & Origin',
            sublabel: 'Why we reject agency pitch theatre in favor of direct principal engineering',
            href: '/about',
            tag: 'PRINCIPLES',
            preview: {
              title: 'Philosophy & Operating Principles',
              subtitle: 'Restrained typography, true white foundations, and authentic code execution.',
              image: '/images/positioning/manifesto.jpg',
              tag: 'DIRECT PRINCIPAL ACCESS',
              href: '/about',
              ctaText: 'Read Philosophy',
            },
          },
          {
            label: 'Engineering Standards',
            sublabel: 'Work Sans typography, WCAG AAA accessibility, sub-second LCP invariants',
            href: '/about#standards',
            tag: 'STANDARDS',
            preview: {
              title: 'Production Invariants & Standards',
              subtitle: 'Strict design tokens, accessible color contrasts, and zero layout shift guarantees.',
              image: '/images/projects/drawdown/hero.png',
              tag: 'WCAG AAA // ZERO CLS',
              href: '/about#standards',
              ctaText: 'Review Standards',
            },
          },
        ],
      },
      {
        title: '02 // DIRECT ENGAGEMENT',
        items: [
          {
            label: 'Pricing & Engagement Models',
            sublabel: 'Fixed scopes, dedicated sprint allocations, and transparent retainers',
            href: '/pricing',
            tag: 'PRICING',
            preview: {
              title: 'Engagement & Terms',
              subtitle: 'Commercial clarity from day one. No hidden scope expansion or junior staffing.',
              image: '/images/positioning/manifesto.jpg',
              tag: 'COMMERCIAL TERMS',
              href: '/pricing',
              ctaText: 'View Pricing',
            },
          },
          {
            label: 'Direct Studio Channel',
            sublabel: 'Connect directly with Avorria leadership for commissions & enquiries',
            href: '/contact',
            tag: 'CONTACT',
            preview: {
              title: 'Direct Studio Channel',
              subtitle: 'London studio with global reach. Initial consultations led directly by technical partners.',
              image: '/images/projects/alkota-bikes/hero-screenshot.png',
              tag: 'COMMISSIONS OPEN',
              href: '/contact',
              ctaText: 'Get in Touch',
            },
          },
        ],
        viewAllLink: {
          label: 'Contact Studio Directly →',
          href: '/contact',
        },
      },
    ],
  },
]
