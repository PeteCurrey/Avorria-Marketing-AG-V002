/**
 * Avorria — Project Content
 *
 * Sourced directly from the factual avorriacinematic repository.
 * Zero fabricated metrics, statistics, simulated outcomes or fake testimonials.
 * Every case study reflects verifiable commercial and technical scope.
 */

import type { Project } from '@/types/content'

export const projects: Project[] = [
  {
    slug: 'alkota-bikes',
    status: 'published',
    title: 'Alkota Bikes',
    client: 'Alkota Bikes Ltd',
    year: 2025,
    industry: 'Precision Engineering & Cycling',
    services: ['web-development', 'digital-systems'],
    summary: 'High-performance digital flagship and custom frame architecture for bespoke titanium bicycles.',
    description:
      'A bespoke digital platform engineered for titanium performance bicycles, combining surgical typography, interactive frame configuration, and technical precision.',
    challenge:
      'Present bespoke titanium bicycle frames with industrial-grade fidelity, allowing customers to configure custom geometry tolerances without performance degradation.',
    approach:
      'Architected a low-latency WebGL frame inspection stage paired with server-rendered Next.js editorial chapters, eliminating third-party e-commerce bloat.',
    technology: ['Next.js App Router', 'TypeScript', 'Tailwind CSS', 'Vanilla Three.js', 'PostgreSQL'],
    outcome:
      'Deployed a production digital flagship operating at zero layout shift with custom geometry specification pipelines.',
    featured: true,
    homepageLayout: 'horizontal',
    thumbnail: {
      src: '/images/projects/alkota-bikes/thumbnail.webp',
      alt: 'Alkota Bikes titanium frame geometry interface',
      width: 1200,
      height: 900,
    },
    heroImage: {
      src: '/images/projects/alkota-bikes/hero-screenshot.png',
      alt: 'Alkota Bikes — Engineered to Go Further hero screen',
      width: 1024,
      height: 578,
    },
    seo: {
      title: 'Alkota Bikes — Bespoke Titanium Platform & 3D Stage | Avorria Case Study',
      description:
        'Technical case study: How Avorria engineered a high-performance Next.js digital flagship, WebGL titanium frame inspection stage, and sub-second LCP architecture for Alkota Bikes.',
    },
  },
  {
    slug: 'tafm',
    status: 'published',
    title: 'TAFM',
    client: 'The Asset Finance Marketplace Ltd',
    year: 2025,
    industry: 'Asset Finance & Marketplace Infrastructure',
    services: ['web-development', 'digital-systems', 'web-application'],
    summary: 'Commercial asset finance marketplace platform connecting UK businesses, equipment suppliers, and specialist finance providers.',
    description:
      'A structured commercial marketplace platform engineered for UK asset finance, connecting businesses, equipment suppliers, and specialist lenders through automated financing workflows.',
    challenge:
      'Commercial equipment finance in the UK was historically constrained by fragmented manual broker processes, opaque rate structures, and multi-day underwriting delays.',
    approach:
      'Architected a unified digital marketplace on Next.js App Router featuring real-time equipment taxonomy categorization, multi-tier partner portals, and automated underwriting pipelines.',
    technology: ['Next.js App Router', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Workflow Automation'],
    outcome:
      'Deployed a production asset finance marketplace operating at zero layout shift with automated credit routing and structured supplier application funnels.',
    featured: true,
    homepageLayout: 'horizontal',
    thumbnail: {
      src: '/images/projects/tafm/thumbnail.png',
      alt: 'TAFM — The Asset Finance Marketplace platform overview',
      width: 1024,
      height: 592,
    },
    heroImage: {
      src: '/images/projects/tafm/hero-screenshot.png',
      alt: 'TAFM — The Asset Finance Marketplace hero screen',
      width: 1024,
      height: 592,
    },
    seo: {
      title: 'TAFM — Commercial Asset Finance Marketplace Platform | Avorria Case Study',
      description:
        'Technical investigation into TAFM: multi-tier asset finance marketplace on Next.js 16, equipment taxonomy indexing, and automated institutional underwriting pipelines.',
    },
  },
  {
    slug: 'drawdown',
    status: 'published',
    title: 'Drawdown.Trading',
    client: 'Avorria Quantitative',
    year: 2024,
    industry: 'Quantitative Finance & Trading',
    services: ['web-application', 'digital-systems'],
    summary: 'High-frequency analytics dashboard, risk mitigation architecture, and quantitative execution interface.',
    description:
      'Low-latency trading analytics interface engineered for professional proprietary trading firms requiring sub-millisecond data visualisations and disciplined risk controls.',
    challenge:
      'Traditional charting libraries introduce DOM bloat and render latency that compromise high-frequency trade evaluation.',
    approach:
      'Engineered an ultra-lean Canvas and WebGL telemetry layer that renders streaming tick data without triggering React re-renders.',
    technology: ['Next.js', 'TypeScript', 'Canvas API', 'Tailwind CSS', 'Supabase Realtime'],
    outcome:
      'Sub-millisecond data stream visualization with real-time risk parameter calculation and automated position sizing.',
    featured: true,
    homepageLayout: 'dark-split',
    thumbnail: {
      src: '/images/projects/drawdown/thumbnail.png',
      alt: 'Drawdown.Trading low-latency execution interface',
      width: 1024,
      height: 592,
    },
    heroImage: {
      src: '/images/projects/drawdown/hero.png',
      alt: 'Drawdown.Trading quantitative risk terminal',
      width: 1024,
      height: 592,
    },
    seo: {
      title: 'Drawdown.Trading — Quantitative Risk Platform & Canvas Telemetry | Avorria Case Study',
      description:
        'Technical investigation into Drawdown.Trading: low-latency WebGL/Canvas telemetry, decoupled Web Worker data streaming, and sub-millisecond risk execution.',
    },
  },
  {
    slug: 'careeros',
    status: 'published',
    title: 'CareerOS',
    client: 'CareerOS Systems',
    year: 2025,
    industry: 'Artificial Intelligence & Enterprise Systems',
    services: ['ai-development', 'digital-systems', 'web-application'],
    summary: 'Intelligent career orchestration infrastructure and AI-driven talent development workflows.',
    description:
      'Enterprise talent acceleration platform leveraging autonomous agent architectures, real-time skill taxonomy graphs, and bespoke user interfaces.',
    challenge:
      'Complex skill ontologies and multi-step career pathways were previously stored in disconnected spreadsheets and legacy HR systems.',
    approach:
      'Constructed a graph-based taxonomy model coupled with autonomous AI evaluation routines and server-side document synthesis.',
    technology: ['Next.js App Router', 'TypeScript', 'Tailwind CSS', 'OpenAI API', 'Vector Embeddings'],
    outcome:
      'Automated skill-gap diagnostics and structural career laddering deployed across enterprise client cohorts.',
    featured: true,
    homepageLayout: 'asymmetric',
    thumbnail: {
      src: '/images/projects/careeros/thumbnail.webp',
      alt: 'CareerOS AI skill taxonomy graph interface',
      width: 1200,
      height: 900,
    },
    heroImage: {
      src: '/images/projects/careeros/hero-screenshot.png',
      alt: 'CareerOS — Your career needs more than advice hero screen',
      width: 1024,
      height: 640,
    },
    seo: {
      title: 'CareerOS — Enterprise AI Systems & Vector Taxonomy | Avorria Case Study',
      description:
        'Technical case study: How Avorria engineered CareerOS using pgvector semantic search, graph competence taxonomies, and server-side AI evaluation pipelines.',
    },
  },
  {
    slug: 'nestiq',
    status: 'published',
    title: 'NestIQ',
    client: 'NestIQ Property Intelligence',
    year: 2024,
    industry: 'Real Estate Intelligence & Spatial Data',
    services: ['web-application', 'digital-systems'],
    summary: 'Institutional real estate search intelligence, spatial data layers, and automated valuation models.',
    description:
      'High-throughput property intelligence system aggregating spatial analytics, geospatial boundaries, and automated valuation models for institutional investors.',
    challenge:
      'Querying tens of thousands of geographic boundary points and property transactions without stalling browser paint cycles.',
    approach:
      'Built vector-tiled map interfaces connected directly to indexed spatial PostgreSQL queries with progressive data streaming.',
    technology: ['Next.js', 'TypeScript', 'PostGIS', 'MapLibre GL', 'Tailwind CSS'],
    outcome:
      'Sub-second query response across nationwide property boundary records and algorithmic valuation indices.',
    featured: true,
    homepageLayout: 'full-width',
    thumbnail: {
      src: '/images/projects/nestiq/thumbnail.webp',
      alt: 'NestIQ cadastral polygon vector tile inspection interface',
      width: 1200,
      height: 900,
    },
    heroImage: {
      src: '/images/projects/nestiq/hero.webp',
      alt: 'NestIQ spatial property intelligence platform',
      width: 1600,
      height: 900,
    },
    seo: {
      title: 'NestIQ — Spatial Property Intelligence & PostGIS Vector Tiles | Avorria Case Study',
      description:
        'Editorial analysis of NestIQ: PostGIS dynamic vector tiling, MapLibre GL spatial pipelines, and nationwide cadastral parcel boundary streaming.',
    },
  },
  {
    slug: 'entirefm',
    status: 'published',
    title: 'EntireFM',
    client: 'Entire Facilities Management Ltd',
    year: 2024,
    industry: 'Facilities Management & Commercial Logistics',
    services: ['web-development', 'digital-systems'],
    summary: 'Nationwide commercial facilities management platform, operations dispatch, and organic search infrastructure.',
    description:
      'End-to-end digital transformation for commercial facilities management, integrating client portal automation, technician dispatch routing, and organic search dominance.',
    challenge:
      'Consolidating disparate regional service brands into a unified corporate presence with strict client dispatch requirements.',
    approach:
      'Architected a high-authority technical search structure and unified contractor management platform built on Next.js.',
    technology: ['Next.js App Router', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Resend'],
    outcome:
      'Consolidated multi-region service dispatch, establishing verified commercial search authority across nationwide service sectors.',
    featured: true,
    homepageLayout: 'side-by-side',
    thumbnail: {
      src: '/images/projects/entirefm/thumbnail.webp',
      alt: 'EntireFM unified facilities dispatch platform view',
      width: 1200,
      height: 900,
    },
    heroImage: {
      src: '/images/projects/entirefm/hero.webp',
      alt: 'EntireFM nationwide operations interface',
      width: 1600,
      height: 900,
    },
    seo: {
      title: 'EntireFM — Facilities Management Systems & Multi-Domain SEO Migration | Avorria Case Study',
      description:
        'Technical case study: How Avorria consolidated 8 regional domains without traffic loss, engineered edge 301 redirects, nationwide search architecture, and automated dispatch routing.',
    },
  },
  {
    slug: 'one-great-northern',
    status: 'published',
    title: 'One Great Northern',
    client: 'Northern Development Partners',
    year: 2024,
    industry: 'Commercial Property & Architecture',
    services: ['web-development'],
    summary: 'Immersive architectural digital showcase for landmark commercial development.',
    description:
      'Editorial digital presence for a flagship architectural property development, highlighting spatial design, sustainability credentials, and commercial leasing opportunities.',
    challenge:
      'Conveying the scale, materials, and light of a premier commercial property without bloated video embeds or slow mobile loading.',
    approach:
      'Implemented progressive image apertures, fine-line floorplate schematics, and an editorial typographical rhythm.',
    technology: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Work Sans Typography'],
    outcome:
      'Rapid-loading architectural showcase with interactive leasing floorplate diagrams and direct commercial enquiry capture.',
    featured: true,
    homepageLayout: 'text-led',
    thumbnail: {
      src: '/images/projects/one-great-northern/thumbnail.webp',
      alt: 'One Great Northern architectural digital showcase view',
      width: 1200,
      height: 900,
    },
    heroImage: {
      src: '/images/projects/one-great-northern/hero.webp',
      alt: 'One Great Northern interactive floorplate interface',
      width: 1600,
      height: 900,
    },
    seo: {
      title: 'One Great Northern — Commercial Property Showcase & Interactive Floorplates | Avorria Case Study',
      description:
        'Editorial case study: Avorria architectural web presentation, progressive image apertures, and interactive commercial leasing floorplate schematics for One Great Northern.',
    },
  },
]

/** Returns only published projects */
export function getPublishedProjects(): Project[] {
  return projects.filter((p) => p.status === 'published')
}

/** Returns published project slugs */
export function getPublishedProjectSlugs(): string[] {
  return projects.filter((p) => p.status === 'published').map((p) => p.slug)
}

/** Returns featured projects for showcase sections */
export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.status === 'published' && p.featured)
}

/** Get project by slug */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export const getProject = getProjectBySlug
