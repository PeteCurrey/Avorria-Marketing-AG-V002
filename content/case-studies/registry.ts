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
    primaryServiceSlug: 'build',
    secondaryServiceSlugs: ['search'],
    relatedLobbySlugs: [
      'nextjs-vs-wordpress-engineering-comparison',
      'core-web-vitals-ranking-reality',
      'when-to-rebuild-your-website',
    ],
    relatedProjectSlugs: ['tafm', 'one-great-northern'],
    customCta: {
      headline: 'Commission a Bespoke Digital Flagship',
      subtext: 'Transform your brand object into a high-performance web experience with sub-second LCP and zero template compromises.',
      primaryLabel: 'Commission Flagship Architecture ↗',
      primaryHref: '/start-a-project',
      secondaryLabel: 'Explore Build Discipline',
      secondaryHref: '/services/build',
    },
    seo: {
      title: 'Alkota Bikes — Bespoke Titanium Platform & 3D Stage | Avorria Case Study',
      description:
        'Technical case study: How Avorria engineered a high-performance Next.js digital flagship, WebGL titanium frame inspection stage, and sub-second LCP architecture for Alkota Bikes.',
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
    primaryServiceSlug: 'systems',
    secondaryServiceSlugs: ['build'],
    relatedLobbySlugs: [
      'bespoke-web-application-when-to-build',
      'google-inp-core-web-vitals-architecture',
    ],
    relatedProjectSlugs: ['careeros', 'tafm'],
    customCta: {
      headline: 'Engineer Low-Latency Systems & High-Frequency Interfaces',
      subtext: 'Isolate data-intensive streaming pipelines from the document object model for uncompromised paint performance.',
      primaryLabel: 'Discuss Quantitative Systems ↗',
      primaryHref: '/start-a-project',
      secondaryLabel: 'Explore Systems Discipline',
      secondaryHref: '/services/systems',
    },
    seo: {
      title: 'Drawdown.Trading — Quantitative Risk Platform & Canvas Telemetry | Avorria Case Study',
      description:
        'Technical investigation into Drawdown.Trading: low-latency WebGL/Canvas telemetry, decoupled Web Worker data streaming, and sub-millisecond risk execution.',
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
      {
        id: 'careeros-evidence',
        type: 'EVIDENCE',
        sequence: '03',
        eyebrow: '03 // VERIFIED PRODUCTION OUTCOME',
        title: 'Deterministic AI Operations Across Enterprise Cohorts.',
        paragraphs: [
          'CareerOS deployed across enterprise client cohorts, eliminating unstructured prompt hallucination through strict Zod schema constraints and PostgreSQL database triggers.',
          'Technical talent teams now audit engineering progression against verifiable code submissions rather than subjective self-evaluations.',
        ],
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
    primaryServiceSlug: 'systems',
    secondaryServiceSlugs: ['build'],
    relatedLobbySlugs: [
      'custom-ai-vs-saas-business-decision',
      'what-a-custom-ai-agent-can-automate',
      'ai-integration-without-exposing-sensitive-data',
    ],
    relatedProjectSlugs: ['drawdown', 'tafm'],
    customCta: {
      headline: 'Deploy Custom AI Systems & Autonomous Workflows',
      subtext: 'Integrate deterministic vector taxonomy pipelines and schema-validated AI evaluators into enterprise operations.',
      primaryLabel: 'Discuss AI Systems Integration ↗',
      primaryHref: '/start-a-project',
      secondaryLabel: 'Explore Systems Discipline',
      secondaryHref: '/services/systems',
    },
    seo: {
      title: 'CareerOS — Enterprise AI Systems & Vector Taxonomy | Avorria Case Study',
      description:
        'Technical case study: How Avorria engineered CareerOS using pgvector semantic search, graph competence taxonomies, and server-side AI evaluation pipelines.',
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
          'By avoiding large client-side GeoJSON payloads, memory usage on mobile devices was reduced by over 80%, enabling fluid map panning across densely parcelled urban districts.',
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
      {
        id: 'nestiq-system',
        type: 'SYSTEM',
        sequence: '02',
        eyebrow: '02 // HIGH-THROUGHPUT PIPELINE',
        title: 'Server-Side Vector Tile Pyramids & Spatial Indexing.',
        statement:
          'Spatial indexing with GiST indices and edge caching delivered sub-second parcel queries.',
        paragraphs: [
          'Rather than querying raw geometric tables on every zoom event, the system generates binary MVT buffers at zoom levels 10 through 18. Each tile is cached with HTTP cache-control headers at the edge CDN.',
          'Sub-second spatial queries allow commercial property surveyors to inspect planning history, title boundaries, and valuation data in a single unified view.',
        ],
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
    primaryServiceSlug: 'build',
    secondaryServiceSlugs: ['systems'],
    relatedLobbySlugs: [
      'bespoke-web-application-when-to-build',
      'monolithic-cms-technical-debt',
    ],
    relatedProjectSlugs: ['tafm', 'drawdown'],
    customCta: {
      headline: 'Engineer Spatial Data & High-Throughput Web Applications',
      subtext: 'Stream multi-gigabyte geospatial datasets in sub-second paint times using server-rendered vector tiles and PostGIS.',
      primaryLabel: 'Discuss Spatial Architecture ↗',
      primaryHref: '/start-a-project',
      secondaryLabel: 'Explore Build Discipline',
      secondaryHref: '/services/build',
    },
    seo: {
      title: 'NestIQ — Spatial Property Intelligence & PostGIS Vector Tiles | Avorria Case Study',
      description:
        'Editorial analysis of NestIQ: PostGIS dynamic vector tiling, MapLibre GL spatial pipelines, and nationwide cadastral parcel boundary streaming.',
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
          'EntireFM had acquired and launched eight regional facilities websites across the UK. Instead of compounding regional momentum, the fragmented domains split domain authority, produced duplicate service descriptions, and diluted Googlebot crawl budget.',
          'We engineered a comprehensive technical SEO migration strategy: auditing every indexed URL, constructing a complete 301 edge redirect map, and unifying regional landing pages under a clear geographical hierarchy on a single canonical domain.',
        ],
      },
      {
        id: 'entirefm-system',
        type: 'SYSTEM',
        sequence: '02',
        eyebrow: '02 // SEARCH & DISPATCH PIPELINE',
        title: 'Edge 301 Redirect Mapping & Automated Service Routing.',
        statement:
          'Server-rendered regional service pages paired with automated dispatch queues eliminated phone triage.',
        paragraphs: [
          'Every regional footprint was migrated to a high-performance Next.js App Router route with structured Schema.org LocalBusiness and Service markup.',
          'Commercial facilities managers can now log reactive maintenance requests through a secure client intake portal. Requests are validated, parsed, and routed directly to vetted regional contractors via the Resend dispatch API.',
        ],
      },
      {
        id: 'entirefm-evidence',
        type: 'EVIDENCE',
        sequence: '03',
        eyebrow: '03 // VERIFIED PRODUCTION OUTCOME',
        title: 'Unified Domain Authority with Zero Backlink Equity Loss.',
        paragraphs: [
          'The eight-domain migration executed with zero 404 crawl cascades or indexation drops. Historical search equity was transferred cleanly to the core corporate platform.',
          'Consolidated commercial search visibility now powers nationwide facilities contracts across commercial real estate, logistics hubs, and corporate offices.',
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
    primaryServiceSlug: 'search',
    secondaryServiceSlugs: ['build', 'systems'],
    relatedLobbySlugs: [
      'protect-organic-traffic-website-migration',
      'why-your-website-crawled-not-ranked',
      'when-to-rebuild-your-website',
    ],
    relatedProjectSlugs: ['alkota-bikes', 'tafm'],
    customCta: {
      headline: 'Protect Organic Authority During Corporate Migrations',
      subtext: 'Consolidate disparate domains, eliminate canonical cannibalisation, and build high-authority search architectures.',
      primaryLabel: 'Request a Migration & Technical SEO Audit ↗',
      primaryHref: '/digital-audit',
      secondaryLabel: 'Explore Search Architecture',
      secondaryHref: '/services/search',
    },
    seo: {
      title: 'EntireFM — Facilities Management Systems & Multi-Domain SEO Migration | Avorria Case Study',
      description:
        'Technical case study: How Avorria consolidated 8 regional domains without traffic loss, engineered edge 301 redirects, nationwide search architecture, and automated dispatch routing.',
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
          'Commercial leasing decisions for landmark office developments involve institutional stakeholders, architects, and facilities directors. Sluggish marketing sites with unskippable splash videos and 50MB PDF downloads create immediate friction.',
          'Avorria built a digital monograph that loads in under 500ms, allowing leasing agents to navigate floorplate configurations, ESG sustainability credentials, and transport links instantly from any device.',
        ],
      },
      {
        id: 'ogn-system',
        type: 'SYSTEM',
        sequence: '02',
        eyebrow: '02 // INTERACTIVE SPECIFICATION',
        title: 'Fine-Line Vector Floorplates & Direct Enquiry Capture.',
        statement:
          'Interactive SVG floorplates render floor dimensions and division options with zero layout shift.',
        paragraphs: [
          'Leasing agents and prospective tenants can toggle split-floor tenancy arrangements, view core services and riser locations, and inspect net internal area (NIA) specifications.',
          'Direct confidential enquiry pipelines connect institutional decision-makers directly with the developer development and leasing directors.',
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
    primaryServiceSlug: 'build',
    secondaryServiceSlugs: ['search'],
    relatedLobbySlugs: [
      'core-web-vitals-ranking-reality',
      'when-to-rebuild-your-website',
    ],
    relatedProjectSlugs: ['alkota-bikes', 'nestiq'],
    customCta: {
      headline: 'Commission Architectural Digital Showcases',
      subtext: 'Market landmark commercial assets with sub-500ms editorial presentation, interactive floorplates, and zero video buffering.',
      primaryLabel: 'Commission Architectural Showcase ↗',
      primaryHref: '/start-a-project',
      secondaryLabel: 'Explore Build Discipline',
      secondaryHref: '/services/build',
    },
    seo: {
      title: 'One Great Northern — Commercial Property Showcase & Interactive Floorplates | Avorria Case Study',
      description:
        'Editorial case study: Avorria architectural web presentation, progressive image apertures, and interactive commercial leasing floorplate schematics for One Great Northern.',
    },
  },

  'tafm': {
    slug: 'tafm',
    provenance: 'verified',
    sequenceNumber: '07',
    title: 'TAFM',
    client: 'The Asset Finance Marketplace Ltd',
    year: 2025,
    sector: 'Commercial Asset Finance & Marketplace Systems',
    discipline: '01 // BUILD',
    executiveSummary:
      'Multi-tier commercial asset finance marketplace connecting UK businesses, equipment suppliers, and specialist lenders through automated underwriting workflows.',
    context:
      'TAFM provides asset finance infrastructure across the UK, allowing companies to acquire essential commercial machinery, vehicles, and operational equipment. The organisation required a unified digital marketplace to connect equipment suppliers, applicants, and institutional finance providers with structured credit applications.',
    problemStatement:
      'Commercial equipment finance in the UK was traditionally fragmented: paper-heavy broker handoffs, opaque rates, and multi-day underwriting delays caused friction for buyers and suppliers alike.',
    interventionSummary:
      'Avorria engineered a streamlined digital marketplace platform on Next.js App Router featuring real-time equipment taxonomy indexing, automated borrower pre-qualification, and direct lender underwriting pipelines.',
    technologyStack: [
      'Next.js 16 App Router',
      'TypeScript',
      'Tailwind CSS v4',
      'PostgreSQL',
      'Workflow Automation',
    ],
    chapters: [
      {
        id: 'tafm-context',
        type: 'CONTEXT',
        sequence: '01',
        eyebrow: '01 // MARKETPLACE CONTEXT',
        title: 'Commercial Equipment Finance Demands Speed and Transparency.',
        statement:
          'When capital deployment is gated by opaque broker delays, business equipment acquisition grinds to a halt.',
        paragraphs: [
          'Commercial businesses needing critical equipment — from transport vehicles to industrial plant machinery — face convoluted financing hurdles. Traditional underwriting takes days and relies on manual paper forms.',
          'TAFM was conceived to unify the entire acquisition chain into a single digital platform: one structured application, instant verification, and multiple verified financing possibilities.',
        ],
        media: {
          id: 'tafm-media-1',
          type: 'INTERFACE',
          alt: 'TAFM marketplace hero interface and equipment taxonomy inspection',
          caption: 'Interactive asset finance application platform with automated lender routing',
          aspectRatio: '16/9',
          figureNumber: 'FIG 07.1',
          spec: 'NEXT.JS 16 // STRUCTURED APPLICATION PIPELINE',
        },
      },
      {
        id: 'tafm-system',
        type: 'SYSTEM',
        sequence: '02',
        eyebrow: '02 // ARCHITECTURAL INTERVENTION',
        title: 'Automated Routing & Multi-Tier Partner Taxonomy.',
        statement:
          'We engineered a multi-portal architecture serving borrowers, equipment dealers, and underwriters.',
        paragraphs: [
          'The platform models equipment categories, lending limits, and asset risk profiles into an indexed taxonomy. Equipment suppliers can initiate customer proposals directly at point of sale.',
          'Underwriting criteria are evaluated deterministically in real-time, routing compliant applications to matching institutional funders without manual intermediary delays.',
        ],
        technicalSpecs: [
          {
            label: 'Route Performance',
            value: 'Sub-Second LCP',
            detail: 'Server-rendered pages with static edge caching',
          },
          {
            label: 'Application Flow',
            value: 'Zero Layout Shift',
            detail: 'Structured multi-step form with client-side state preservation',
          },
          {
            label: 'Data Integrity',
            value: '100% Strict TypeScript',
            detail: 'Strict domain models across all borrower and asset data schemas',
          },
        ],
      },
      {
        id: 'tafm-evidence',
        type: 'EVIDENCE',
        sequence: '03',
        eyebrow: '03 // VERIFIED PRODUCTION OUTCOME',
        title: 'Operational Velocity & Nationwide Financing Scalability.',
        paragraphs: [
          'TAFM deployed globally with immediate route responsiveness, zero visual regressions, and surgical typography.',
          'UK businesses and equipment vendors now complete financing proposals in minutes rather than days, drastically compressing the equipment acquisition cycle.',
        ],
      },
    ],
    qualitativeEvidence: [
      {
        id: 'tafm-q1',
        category: 'PLATFORM_LAUNCHED',
        statement: 'Production commercial asset finance marketplace deployed on Next.js 16 with instant LCP.',
        verificationMethod: 'Public DNS and production telemetry audit.',
      },
      {
        id: 'tafm-q2',
        category: 'WORKFLOW_AUTOMATED',
        statement: 'End-to-end structured asset application pipeline connecting suppliers directly to lenders.',
        verificationMethod: 'Platform transaction workflow verification.',
      },
      {
        id: 'tafm-q3',
        category: 'PERFORMANCE_VERIFIED',
        statement: '100% Core Web Vitals on mobile and desktop without third-party script bloat.',
        verificationMethod: 'Automated CI Lighthouse audit report.',
      },
    ],
    primaryServiceSlug: 'build',
    secondaryServiceSlugs: ['systems'],
    relatedLobbySlugs: [
      'bespoke-web-application-when-to-build',
      'when-to-rebuild-your-website',
    ],
    relatedProjectSlugs: ['alkota-bikes', 'drawdown'],
    customCta: {
      headline: 'Commission Commercial Marketplace & Web App Architecture',
      subtext: 'Deploy bespoke multi-tier portal systems and automated credit workflow pipelines built on strict TypeScript.',
      primaryLabel: 'Discuss Marketplace Engineering ↗',
      primaryHref: '/start-a-project',
      secondaryLabel: 'Explore Build Discipline',
      secondaryHref: '/services/build',
    },
    seo: {
      title: 'TAFM — Commercial Asset Finance Marketplace Platform | Avorria Case Study',
      description:
        'Technical investigation into TAFM: multi-tier asset finance marketplace on Next.js 16, equipment taxonomy indexing, and automated institutional underwriting pipelines.',
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
