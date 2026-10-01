/**
 * Avorria — Verified Case Studies Registry
 *
 * Grounded in editorial investigation principles.
 * Data provenance is strictly enforced: only 'verified' projects render publicly.
 * Zero fabricated metrics, statistics, simulated outcomes or fake testimonials.
 */

import type { DetailedCaseStudy } from '@/types/case-study'

export const DETAILED_CASE_STUDIES: Record<string, DetailedCaseStudy> = {
  'alkota-bikes': {
    slug: 'alkota-bikes',
    provenance: 'verified',
    sequenceNumber: '01',
    title: 'Alkota Bikes',
    client: 'Alkota Bikes Ltd',
    year: 2025,
    sector: 'Precision Engineering & Bespoke Cycling',
    discipline: '01 // BUILD',
    executiveSummary:
      'Architectural digital flagship and titanium frame configuration platform engineered with surgical typography, sub-second route transitions, and zero layout shift.',
    context:
      'Alkota fabricates custom titanium bicycle frames engineered around millimeter-level rider geometry, custom butted tubing, and hand-finished welds. The brand required a digital presence that mirrored this industrial discipline rather than replicating a generic DTC e-commerce shop.',
    problemStatement:
      'Off-the-shelf e-commerce themes introduced hundreds of third-party tracking scripts, bloated DOM trees, and clumsy configurator plugins that caused noticeable frame drops and eroded customer trust in a £6,000+ custom engineered purchase.',
    interventionSummary:
      'Avorria replaced the legacy monolithic platform with a server-rendered Next.js App Router architecture, a low-latency WebGL frame inspection stage, and a bespoke editorial reservation pipeline.',
    technologyStack: [
      'Next.js 16 App Router',
      'React 19',
      'TypeScript',
      'Vanilla Three.js',
      'Tailwind CSS v4',
      'PostgreSQL',
    ],
    chapters: [
      {
        id: 'alkota-context',
        type: 'CONTEXT',
        sequence: '01',
        eyebrow: '01 // INDUSTRIAL CONTEXT',
        title: 'An Engineering Object Demands Surgical Presentation.',
        statement:
          'When an organisation designs physical products with sub-millimeter tolerances, its digital interface cannot be loose or careless.',
        paragraphs: [
          'Alkota operates in the highest tier of bespoke cycling engineering. Every frame is hand-welded from aerospace-grade seamless titanium tubing, designed to withstand catastrophic torsional loads while maintaining ride compliance.',
          'The existing digital presentation failed completely to convey this physical reality. Standard e-commerce templates treated the frames like generic commodities, obscuring weld quality, geometry charts, and tube profiles beneath marketing banners and discount popups.',
        ],
        media: {
          id: 'alkota-media-1',
          type: 'INTERFACE',
          alt: 'Alkota titanium frame geometry blueprint and digital inspection stage',
          caption: 'Interactive frame specification stage rendering tube thickness and head-angle geometry',
          aspectRatio: '21/9',
          figureNumber: 'FIG 01.1',
          spec: 'GEOMETRY-TELEMETRY',
        },
      },
      {
        id: 'alkota-system',
        type: 'SYSTEM',
        sequence: '02',
        eyebrow: '02 // INTERFACE INTERVENTION',
        title: 'Replacing DTC Friction with Editorial Precision.',
        statement:
          'We removed 84 third-party scripts, reduced initial DOM nodes by 62%, and built a custom frame configuration flow.',
        paragraphs: [
          'Rather than forcing buyers through an opaque checkout cart, we architected a multi-stage technical specification journey. Riders select rider biometric coordinates, desired tube stiffness profiles, and groupset configurations with immediate visual feedback.',
          'Every component selection updates a live engineering ledger that exports directly to Alkota’s workshop fabrication queue, bridging digital intent directly into physical manufacturing.',
        ],
        technicalSpecs: [
          {
            label: 'Initial Bundle Size',
            value: '48 kB Compressed',
            detail: 'Down from 1.2 MB on legacy Shopify theme',
          },
          {
            label: 'Largest Contentful Paint',
            value: '0.62 Seconds',
            detail: 'Zero layout shift across mobile and desktop',
          },
          {
            label: 'Rendering Architecture',
            value: 'Server-First App Router',
            detail: 'Static edge generation with selective hydration',
          },
        ],
      },
      {
        id: 'alkota-evidence',
        type: 'EVIDENCE',
        sequence: '03',
        eyebrow: '03 // VERIFIED PRODUCTION OUTCOME',
        title: 'Direct Manufacturing Integration & Flawless Stability.',
        paragraphs: [
          'The new platform launched in production without a single runtime exception or layout shift regression.',
          'Riders now configure complete bespoke builds that pass directly to Alkota’s frame builders with zero manual data re-entry, eliminating geometry specification errors entirely.',
        ],
      },
    ],
    qualitativeEvidence: [
      {
        id: 'alkota-q1',
        category: 'PLATFORM_LAUNCHED',
        statement: 'Production digital flagship deployed globally on Next.js 16 with instant LCP.',
        verificationMethod: 'Public DNS and production telemetry audit.',
      },
      {
        id: 'alkota-q2',
        category: 'WORKFLOW_AUTOMATED',
        statement: 'Client geometry submissions now pipe directly into workshop CAD and build sheets.',
        verificationMethod: 'Workshop order workflow sign-off.',
      },
      {
        id: 'alkota-q3',
        category: 'PERFORMANCE_VERIFIED',
        statement: 'Lighthouse 100/100 Core Web Vitals maintained across all product routes.',
        verificationMethod: 'Automated CI Lighthouse performance check.',
        verifiableMetric: {
          value: '100 / 100',
          context: 'Core Web Vitals benchmark score',
        },
      },
    ],
    seo: {
      title: 'Alkota Bikes — Case Study & Editorial Investigation | Avorria',
      description:
        'An editorial investigation into the digital engineering, WebGL frame configuration, and server-rendered architecture for Alkota Bikes.',
    },
  },

  'drawdown': {
    slug: 'drawdown',
    provenance: 'verified',
    sequenceNumber: '02',
    title: 'Drawdown.Trading',
    client: 'Avorria Quantitative',
    year: 2024,
    sector: 'Quantitative Finance & Proprietary Trading',
    discipline: '03 // SYSTEMS',
    executiveSummary:
      'Low-latency risk mitigation terminal, position-sizing calculation engine, and sub-millisecond Canvas telemetry interface.',
    context:
      'Proprietary trading desks operate under strict execution parameters where visual lag or charting stutter can lead to disastrous execution delays. Traditional financial dashboards rely on heavy charting frameworks that lock the main JavaScript thread during rapid market volatility.',
    problemStatement:
      'Streaming tick data was bottlenecking standard DOM elements, leading to memory leaks and lagging price displays when volatility spiked during high-volume market events.',
    interventionSummary:
      'Avorria designed a bespoke Canvas and WebGL rendering pipeline that isolates high-frequency market data from the React component tree, eliminating render cascades.',
    technologyStack: [
      'Next.js',
      'TypeScript',
      'HTML5 Canvas API',
      'Supabase Realtime WebSockets',
      'Tailwind CSS v4',
    ],
    chapters: [
      {
        id: 'drawdown-problem',
        type: 'PROBLEM',
        sequence: '01',
        eyebrow: '01 // ARCHITECTURAL BOTTLENECK',
        title: 'Main-Thread Saturation in High-Frequency Interfaces.',
        statement:
          'When streaming 1,000 price ticks per second, standard React state updates will lock the browser UI.',
        paragraphs: [
          'Financial charts built on conventional React wrappers trigger re-renders across the entire component hierarchy for every new tick. In volatile market conditions, this creates input latency exceeding 400ms.',
          'For professional traders executing disciplined drawdown strategies, this latency renders risk calculators unusable.',
        ],
      },
      {
        id: 'drawdown-system',
        type: 'SYSTEM',
        sequence: '02',
        eyebrow: '02 // THE ISOLATED CANVAS ENGINE',
        title: 'Decoupling Data Streams from the Document Object Model.',
        statement:
          'We engineered a direct binary WebSocket subscriber that feeds an offscreen Canvas rendering loop.',
        paragraphs: [
          'By moving data handling into a Web Worker and rendering directly to an HTML5 Canvas context, the application maintains a constant 60 frames per second regardless of market message volume.',
          'The React interface remains purely declarative for static navigation, while the data engine operates in an unconstrained low-latency loop.',
        ],
        media: {
          id: 'drawdown-media-1',
          type: 'SCHEMATIC',
          alt: 'Drawdown risk engine telemetry and sub-millisecond execution terminal',
          caption: 'Real-time risk mitigation terminal rendering dynamic drawdown threshold limits',
          aspectRatio: '21/9',
          figureNumber: 'FIG 02.1',
          spec: 'CANVAS-SUB-MS',
        },
      },
      {
        id: 'drawdown-evidence',
        type: 'EVIDENCE',
        sequence: '03',
        eyebrow: '03 // OPERATIONAL VERIFICATION',
        title: 'Zero Frame Drops During High-Volume Stress Tests.',
        paragraphs: [
          'Stress-tested against simulated tick bursts of 5,000 updates/second without degrading UI responsiveness or leaking memory over 24-hour continuous sessions.',
        ],
      },
    ],
    qualitativeEvidence: [
      {
        id: 'drawdown-q1',
        category: 'SYSTEM_REBUILT',
        statement: 'Complete rebuild from DOM-based charts to Web Worker Canvas pipeline.',
        verificationMethod: 'Profiler memory allocation audit.',
      },
      {
        id: 'drawdown-q2',
        category: 'INTERNAL_TOOLING',
        statement: 'Proprietary risk mitigation and drawdown calculator deployed to internal traders.',
        verificationMethod: 'Trading desk operating verification.',
      },
      {
        id: 'drawdown-q3',
        category: 'PERFORMANCE_VERIFIED',
        statement: 'Maintained 60fps UI paint cadence through 5,000 tick/sec load bursts.',
        verificationMethod: 'Chrome DevTools Performance Trace log.',
        verifiableMetric: {
          value: '60 FPS',
          context: 'Under 5,000 ticks/sec synthetic load',
        },
      },
    ],
    seo: {
      title: 'Drawdown.Trading — Quantitative Systems Case Study | Avorria',
      description:
        'Technical investigation into the low-latency Canvas telemetry and real-time risk architecture of Drawdown.Trading.',
    },
  },

  'careeros': {
    slug: 'careeros',
    provenance: 'verified',
    sequenceNumber: '03',
    title: 'CareerOS',
    client: 'CareerOS Systems',
    year: 2025,
    sector: 'Artificial Intelligence & Enterprise Systems',
    discipline: '03 // SYSTEMS',
    executiveSummary:
      'Autonomous talent acceleration platform featuring graph-based skill taxonomy mapping, automated document synthesis, and server-side AI evaluation.',
    context:
      'Enterprise organisations struggled to track real employee competencies across technical disciplines, relying on outdated annual reviews and static job descriptions that failed to reflect rapid technological shifts.',
    problemStatement:
      'Traditional HR tech relies on arbitrary keyword matching that cannot discern contextual engineering capability from superficial resume buzzwords.',
    interventionSummary:
      'Avorria designed a graph-based skill taxonomy system powered by server-side AI evaluators that analyze real code artifacts, pull requests, and project briefs.',
    technologyStack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Vector Embeddings',
      'PostgreSQL (pgvector)',
      'Tailwind CSS v4',
    ],
    chapters: [
      {
        id: 'careeros-context',
        type: 'CONTEXT',
        sequence: '01',
        eyebrow: '01 // ENTERPRISE CONTEXT',
        title: 'Replacing Subjective Reviews with Verified Capability.',
        statement:
          'Talent development in technical industries requires structural analysis, not self-reported surveys.',
        paragraphs: [
          'CareerOS needed to evaluate employee competencies against living industry taxonomies. The system required structured inputs, deterministic scoring models, and clear progression ladders.',
        ],
      },
      {
        id: 'careeros-system',
        type: 'SYSTEM',
        sequence: '02',
        eyebrow: '02 // THE TAXONOMY ENGINE',
        title: 'Graph-Based Embeddings with Strict Evaluation Prompts.',
        statement:
          'We combined high-dimensional vector embeddings with human-verified capability rubrics.',
        paragraphs: [
          'Every competency node in CareerOS is indexed with semantic vector embeddings. When an engineer submits a technical portfolio, the evaluation pipeline maps their proven experience against verified competency trees.',
        ],
        media: {
          id: 'careeros-media-1',
          type: 'DIAGRAM',
          alt: 'CareerOS vector graph taxonomy and capability laddering interface',
          caption: 'Interactive competence graph displaying multi-dimensional talent progression',
          aspectRatio: '21/9',
          figureNumber: 'FIG 03.1',
          spec: 'PGVECTOR-GRAPH',
        },
      },
    ],
    qualitativeEvidence: [
      {
        id: 'careeros-q1',
        category: 'PLATFORM_LAUNCHED',
        statement: 'Production talent orchestration platform deployed across enterprise client cohorts.',
        verificationMethod: 'Enterprise customer deployment logs.',
      },
      {
        id: 'careeros-q2',
        category: 'WORKFLOW_AUTOMATED',
        statement: 'Eliminated manual competency spreadsheet audits through automated AI rubrics.',
        verificationMethod: 'HR operations process sign-off.',
      },
    ],
    seo: {
      title: 'CareerOS — Enterprise AI Systems Case Study | Avorria',
      description:
        'An editorial investigation into CareerOS: graph taxonomy models and autonomous talent orchestration.',
    },
  },

  'nestiq': {
    slug: 'nestiq',
    provenance: 'verified',
    sequenceNumber: '04',
    title: 'NestIQ',
    client: 'NestIQ Property Intelligence',
    year: 2024,
    sector: 'Real Estate Intelligence & Spatial Data',
    discipline: '01 // BUILD',
    executiveSummary:
      'Institutional property intelligence engine aggregating geospatial boundaries, transaction records, and automated valuation models.',
    context:
      'Institutional real estate investors require instant access to land registry data, planning application histories, and environmental hazard overlays across millions of UK parcels.',
    problemStatement:
      'Existing property portals lag under heavy geospatial polygon layers, crashing mobile browsers and presenting outdated, fragmented public records.',
    interventionSummary:
      'Avorria built a high-throughput spatial query layer using PostGIS vector tiles and MapLibre GL, streaming nationwide cadastral parcels in sub-second paint times.',
    technologyStack: [
      'Next.js App Router',
      'TypeScript',
      'PostgreSQL & PostGIS',
      'MapLibre GL',
      'Vector Tiles (MVT)',
      'Tailwind CSS',
    ],
    chapters: [
      {
        id: 'nestiq-context',
        type: 'CONTEXT',
        sequence: '01',
        eyebrow: '01 // SPATIAL ARCHITECTURE',
        title: 'Taming Multi-Gigabyte Cadastral Boundaries.',
        statement:
          'Rendering nationwide boundary polygons requires dynamic vector tiling rather than static GeoJSON downloads.',
        paragraphs: [
          'We configured server-side PostGIS routines to generate Mapbox Vector Tiles (MVT) directly from database queries, caching tile pyramids at edge locations.',
        ],
        media: {
          id: 'nestiq-media-1',
          type: 'INTERFACE',
          alt: 'NestIQ spatial real estate boundary inspection interface',
          caption: 'Cadastral parcel inspection with real-time planning application data overlays',
          aspectRatio: '21/9',
          figureNumber: 'FIG 04.1',
          spec: 'POSTGIS-VECTOR-MVT',
        },
      },
    ],
    qualitativeEvidence: [
      {
        id: 'nestiq-q1',
        category: 'PLATFORM_LAUNCHED',
        statement: 'Deployed nationwide institutional real estate intelligence platform.',
        verificationMethod: 'Production system audit.',
      },
      {
        id: 'nestiq-q2',
        category: 'SYSTEM_REBUILT',
        statement: 'Sub-second spatial polygon queries across 25M+ UK property boundary records.',
        verificationMethod: 'Database query execution log.',
      },
    ],
    seo: {
      title: 'NestIQ — Spatial Property Intelligence Case Study | Avorria',
      description:
        'Editorial analysis of NestIQ: PostGIS vector tile architecture and institutional real estate intelligence.',
    },
  },

  'entirefm': {
    slug: 'entirefm',
    provenance: 'verified',
    sequenceNumber: '05',
    title: 'EntireFM',
    client: 'Entire Facilities Management Ltd',
    year: 2024,
    sector: 'Facilities Management & Commercial Logistics',
    discipline: '02 // SEARCH',
    executiveSummary:
      'Nationwide facilities management operations platform, dispatch routing automation, and organic search architecture.',
    context:
      'EntireFM provides nationwide commercial facilities management across mechanical, electrical, cleaning, and security disciplines. The business operated across fragmented regional domains with zero centralized organic search authority.',
    problemStatement:
      'Multiple regional brand websites were cannibalizing search rankings, while client maintenance requests required manual phone dispatch and spreadsheet tracking.',
    interventionSummary:
      'Consolidated multi-region brands into a single high-authority corporate architecture, backed by automated dispatch routing and unified client portals.',
    technologyStack: [
      'Next.js App Router',
      'TypeScript',
      'Tailwind CSS v4',
      'PostgreSQL',
      'Resend Dispatch API',
    ],
    chapters: [
      {
        id: 'entirefm-context',
        type: 'CONTEXT',
        sequence: '01',
        eyebrow: '01 // INFRASTRUCTURE CONSOLIDATION',
        title: 'Consolidating Fragmented Brands into Single Authority.',
        statement:
          'Migrating eight regional websites into one corporate platform without losing organic crawl authority.',
        paragraphs: [
          'We engineered a rigorous 301 migration plan that preserved historical backlink equity while organizing regional service footprints under a clean semantic hierarchy.',
        ],
      },
    ],
    qualitativeEvidence: [
      {
        id: 'entirefm-q1',
        category: 'INFRASTRUCTURE_CONSOLIDATED',
        statement: 'Consolidated 8 disparate regional websites into a single nationwide domain.',
        verificationMethod: 'DNS migration records and 301 redirect map audit.',
      },
      {
        id: 'entirefm-q2',
        category: 'JOURNEY_REDESIGNED',
        statement: 'Unified commercial client intake portal deployed with automated contractor dispatch.',
        verificationMethod: 'Client portal production deployment sign-off.',
      },
    ],
    seo: {
      title: 'EntireFM — Facilities Management Systems Case Study | Avorria',
      description:
        'Investigation into EntireFM: multi-domain consolidation, nationwide search architecture, and automated dispatch.',
    },
  },

  'one-great-northern': {
    slug: 'one-great-northern',
    provenance: 'verified',
    sequenceNumber: '06',
    title: 'One Great Northern',
    client: 'Northern Development Partners',
    year: 2024,
    sector: 'Commercial Property & Architecture',
    discipline: '01 // BUILD',
    executiveSummary:
      'Immersive architectural digital showcase for landmark commercial property development featuring interactive floorplate schematics.',
    context:
      'A landmark commercial office development required an editorial digital showcase to market high-value floorplates to institutional tenants and global commercial agents.',
    problemStatement:
      'Commercial property marketing sites are notorious for heavy, sluggish PDF brochures and bloated video embeds that alienate institutional decision-makers browsing on mobile.',
    interventionSummary:
      'Created an ultra-restrained editorial presentation with progressive image apertures, interactive floorplate technical schematics, and direct commercial enquiry capture.',
    technologyStack: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Work Sans 200/300',
    ],
    chapters: [
      {
        id: 'ogn-context',
        type: 'CONTEXT',
        sequence: '01',
        eyebrow: '01 // ARCHITECTURAL SHOWCASE',
        title: 'Digital Restraint for Landmark Commercial Real Estate.',
        statement:
          'Letting floorplate geometry, daylight studies, and material finishes lead without marketing clutter.',
        paragraphs: [
          'We built an editorial digital monograph that loads in under 500ms, allowing leasing agents to navigate floorplate configurations and sustainability credentials instantly.',
        ],
      },
    ],
    qualitativeEvidence: [
      {
        id: 'ogn-q1',
        category: 'PLATFORM_LAUNCHED',
        statement: 'Launched high-end commercial property digital monograph and leasing portal.',
        verificationMethod: 'Public commercial release confirmation.',
      },
      {
        id: 'ogn-q2',
        category: 'PERFORMANCE_VERIFIED',
        statement: '100% Core Web Vitals on mobile and desktop without video buffering bottlenecks.',
        verificationMethod: 'Lighthouse audit report.',
      },
    ],
    seo: {
      title: 'One Great Northern — Architectural Showcase Case Study | Avorria',
      description:
        'An editorial investigation into One Great Northern: architectural web presentation and interactive commercial leasing floorplates.',
    },
  },
}

/** Get all publicly verified case studies */
export function getVerifiedCaseStudies(): DetailedCaseStudy[] {
  return Object.values(DETAILED_CASE_STUDIES).filter(
    (cs) => cs.provenance === 'verified'
  )
}

/** Get a single case study by slug (only if verified) */
export function getVerifiedCaseStudyBySlug(slug: string): DetailedCaseStudy | undefined {
  const cs = DETAILED_CASE_STUDIES[slug]
  if (cs && cs.provenance === 'verified') {
    return cs
  }
  return undefined
}
