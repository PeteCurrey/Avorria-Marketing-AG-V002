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
      'We engineer bespoke digital flagships and custom web platforms for organisations that view digital infrastructure as a core operational and commercial asset. Built with strict TypeScript, server-rendered Next.js App Router, and zero template compromises.',
    disciplineEyebrow: 'DISCIPLINE 01 // WEB DEVELOPMENT & DIGITAL FLAGSHIPS',
    heroHeadline: [
      { before: 'Digital flagships' },
      { before: '& bespoke', accent: 'web software.' },
    ],
    heroImage: '/images/projects/alkota-bikes/hero.webp',
    heroAlt: 'Alkota Bikes titanium platform and precision engineering digital showcase',
    metaLeft: 'DISCIPLINE 01 // BESPOKE WEB DEVELOPMENT',
    metaRight: 'SUB-SECOND LCP · STRICT TYPESCRIPT',
    problemTitle: 'THE COMMODITISATION OF WEB DEVELOPMENT',
    problemStatement:
      'Off-the-shelf themes, fragile plugins, and bloated frameworks produce slow, vulnerable websites that erode customer trust and compound technical debt.',
    problemDetail: [
      'Most commercial web development suffers from layered compromises: generic agency templates bloated with redundant JavaScript, fragile third-party plugins that break upon updates, and disconnected architectures that cannot adapt to bespoke operational workflows.',
      'For ambitious businesses selling high-value services or engineered physical products, a slow or generic web interface signals carelessness. Millisecond delays directly depress conversion velocity, while uncontrolled third-party script chains introduce security vulnerabilities and layout shifts.',
      'Avorria engineers bespoke web architecture from first principles. We author clean semantic markup, bespoke styling via Tailwind CSS v4, and server-first React 19 / Next.js pipelines designed around how your organisation actually operates.',
    ],
    approachTitle: 'ENGINEERING METHODOLOGY',
    approachStatement:
      'A deterministic six-stage engineering lifecycle from initial technical discovery to validated production deployment.',
    approachSteps: [
      {
        step: '01',
        title: 'Architectural Discovery',
        description:
          'We interrogate business models, database entities, customer interaction workflows, and Core Web Vitals baselines before writing code.',
      },
      {
        step: '02',
        title: 'Domain & Schema Modeling',
        description:
          'System architectures, database schemas (PostgreSQL), and strict TypeScript types are drafted to represent business logic deterministically.',
      },
      {
        step: '03',
        title: 'Interface Architecture & Typography',
        description:
          'Editorial typography scales, restrained colour palettes, and accessible spatial design systems crafted for clarity and brand authority.',
      },
      {
        step: '04',
        title: 'Full-Stack Engineering',
        description:
          'Next.js 16 App Router implementation utilizing React Server Components, server actions, and selective client islands with sub-second LCP.',
      },
      {
        step: '05',
        title: 'Integration & Verification',
        description:
          'Third-party API connections, transactional email pipelines, payment Gateways, automated accessibility audits, and CI/CD validation.',
      },
      {
        step: '06',
        title: 'Deployment & Continuous Health',
        description:
          'Zero-downtime edge deployment, real-user telemetry monitoring, structured data validation, and handover of fully sovereign repositories.',
      },
    ],
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
    caseStudySlugs: ['alkota-bikes', 'tafm', 'one-great-northern', 'nestiq'],
    faqTitle: 'COMMERCIAL & TECHNICAL QUESTIONS',
    faqs: [
      {
        question: 'What distinguishes bespoke web development from standard agency delivery?',
        answer:
          'Standard digital agencies frequently install commercial WordPress themes or Shopify store templates layered with dozens of third-party plugins. Avorria authors custom software from the foundation up using Next.js, React Server Components, and strict TypeScript. You receive a proprietary, asset-grade codebase with zero licence dependencies, instant page transitions, and complete IP ownership.',
      },
      {
        question: 'How long does a typical bespoke web development project take?',
        answer:
          'Engagements typically span 6 to 12 weeks depending on architectural scope, third-party integrations, and interactive requirements. All projects are delivered in discrete, bi-weekly production sprints with demonstrable code milestones rather than vague delivery dates.',
      },
      {
        question: 'Do you build on Next.js exclusively?',
        answer:
          'Next.js with React Server Components is our primary production framework because it provides the optimal balance of edge performance, server-side security, and SEO rendering. However, our technical foundation is built on standard web standards: HTML5, CSS, modern JavaScript, and relational databases (PostgreSQL/Supabase).',
      },
      {
        question: 'Can you integrate with our existing backend or CRM systems?',
        answer:
          'Yes. We design and implement resilient API bridges, webhooks, and secure authentication flows (OAuth, passkeys, JWT) that connect custom web platforms directly to systems like HubSpot, Salesforce, Stripe, ERPs, or proprietary internal databases.',
      },
      {
        question: 'Who owns the code and intellectual property once launched?',
        answer:
          'You do. 100%. We enforce complete code sovereignty. The entire GitHub repository, cloud hosting infrastructure (Vercel/AWS), and database environments are transferred directly to your organization with zero vendor lock-in or proprietary agency license fees.',
      },
    ],
    seo: {
      title: 'Bespoke Web Development & Digital Flagships — Avorria',
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
      'We treat search engine visibility as an engineering discipline. We build search architectures that compound in value, protect revenue during corporate migrations, and capture high-intent commercial demand across the UK.',
    disciplineEyebrow: 'DISCIPLINE 02 // TECHNICAL SEARCH ARCHITECTURE & SEO',
    heroHeadline: [
      { before: 'Technical search' },
      { before: 'architecture &', accent: 'SEO engineering.' },
    ],
    heroImage: '/images/projects/entirefm/hero.webp',
    heroAlt: 'EntireFM nationwide search consolidation and multi-domain migration case study',
    metaLeft: 'DISCIPLINE 02 // SEARCH ARCHITECTURE',
    metaRight: 'ZERO MIGRATION RISK · SCHEMA GRAPHS',
    problemTitle: 'THE FRAGILITY OF ORGANIC VISIBILITY',
    problemStatement:
      'Superficial keyword retainers and mismanaged CMS migrations routinely destroy organic search authority, leaking commercial revenue to competitors.',
    problemDetail: [
      'Most enterprise search visibility failures stem from architectural negligence rather than content deficits. Corporate rebrands, CMS replatforming, and multi-domain consolidations frequently sever decades of accumulated backlink authority due to poorly executed 301 redirects and orphaned canonical loops.',
      'At the same time, traditional SEO agency retainers often produce vanity keyword tracking reports, generic blog filler, and superficial checklist optimizations without addressing crawl budget waste, slow rendering trees, or broken schema entity connections.',
      'Avorria approaches search as an engineering foundation. As a UK digital agency with deep roots in Yorkshire and nationwide delivery, we build programmatic indexation models, robust migration fail-safes, and interconnected Schema.org entity graphs that position your brand authoritatively across both search engines and generative AI agents.',
    ],
    approachTitle: 'SYSTEMATIC SEARCH FRAMEWORK',
    approachStatement:
      'A forensic methodology that protects revenue, eliminates indexation waste, and captures commercial search intent.',
    approachSteps: [
      {
        step: '01',
        title: 'Forensic Crawl & Technical Audit',
        description:
          'Deep inspection of crawl logs, HTTP headers, canonical parity, rendering budgets, and internal link topologies using custom telemetry.',
      },
      {
        step: '02',
        title: 'Commercial Intent & Keyword Hierarchy',
        description:
          'Systematic taxonomy mapping targeting high-value transactional queries and commercial buyers rather than unmonetizable vanity volume.',
      },
      {
        step: '03',
        title: 'Architectural Remediation',
        description:
          'Refactoring URL hierarchies, resolving cannibalisation clusters, eliminating redirect chains, and hardening edge HTTP response headers.',
      },
      {
        step: '04',
        title: 'Entity Graphs & Semantic JSON-LD',
        description:
          'Authoring rich schema graphs connecting Organization, Services, Person, and CreativeWork entities via disambiguated @id references.',
      },
      {
        step: '05',
        title: 'High-Risk Migration Safeguards',
        description:
          'One-to-one legacy URL mapping, staging simulation, DNS transition monitoring, and automated real-time status code verification.',
      },
      {
        step: '06',
        title: 'Performance & CWV Engineering',
        description:
          'Sub-second LCP tuning, font-swapping optimisation, and layout shift remediation to guarantee flawless Core Web Vitals compliance.',
      },
    ],
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
    caseStudySlugs: ['entirefm', 'alkota-bikes'],
    faqTitle: 'SEARCH & MIGRATION QUESTIONS',
    faqs: [
      {
        question: 'How do you safeguard organic search traffic during a major website redesign or migration?',
        answer:
          'We engineer a comprehensive migration safeguard protocol: 100% legacy URL inventory mapping, verified 1:1 301 redirects, strict canonical alignment, pre-launch staging crawl audits, and 24/7 post-launch DNS and 404 telemetry. In projects like EntireFM, this prevented equity loss while consolidating 8 regional brands into one nationwide authority.',
      },
      {
        question: 'Do you offer monthly ongoing SEO retainers?',
        answer:
          'We avoid passive, open-ended retainers that produce generic monthly PDF reports. Instead, we structure engagements as discrete technical sprints—such as an initial architectural audit, a platform migration, or structured data graph deployment—with measurable engineering deliverables and clear transfer of capabilities.',
      },
      {
        question: 'What is the commercial value of Schema.org structured data?',
        answer:
          'Structured data transforms unstructured web text into machine-readable knowledge graphs. By explicitly declaring entities, services, authors, and geographic service areas (such as the UK and Yorkshire), search engines and AI models can verify and index your commercial capabilities without ambiguity.',
      },
      {
        question: 'How does website performance (Core Web Vitals) affect commercial rankings?',
        answer:
          'Google uses Core Web Vitals (LCP, INP, CLS) as both an explicit ranking signal and a direct conversion filter. Slow rendering speeds waste crawl budget and drastically increase bounce rates. We engineer sub-second LCP and zero layout shift as structural requirements of all builds.',
      },
      {
        question: 'Can you audit our current digital marketing agency’s SEO output?',
        answer:
          'Yes. Through our Agency Teardown diagnostic service, we provide objective, confidential audits of existing SEO retainers. We identify whether quoted fees are generating real technical value or merely billing for superficial checklist maintenance.',
      },
    ],
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
      'A website is only as valuable as the business machinery behind it. We design and deploy bespoke AI development, autonomous workflow engines, and commercial data infrastructure that power modern digital operations.',
    disciplineEyebrow: 'DISCIPLINE 03 // AI DEVELOPMENT & COMMERCIAL SYSTEMS',
    heroHeadline: [
      { before: 'Intelligent systems' },
      { before: '& autonomous', accent: 'AI workflows.' },
    ],
    heroImage: '/images/projects/drawdown/hero.webp',
    heroAlt: 'Drawdown.Trading quantitative risk terminal and high-throughput real-time systems telemetry',
    metaLeft: 'DISCIPLINE 03 // SYSTEMS & AI DEVELOPMENT',
    metaRight: 'VECTOR SEARCH · SERVER ACTIONS · STRIPE',
    problemTitle: 'THE BOTTLENECK OF MANUAL OPERATIONS',
    problemStatement:
      'Fragmented software stacks and manual human data handoffs throttle growth, introduce human error, and obscure true commercial revenue attribution.',
    problemDetail: [
      'As commercial organizations scale, operational complexity frequently outpaces system capabilities. Teams become bogged down in repetitive manual procedures: re-entering customer records across disconnected CRMs, manually triaging inbound inquiries, and wrestling with unreliable client attribution due to browser tracking blockages.',
      'Superficial AI integrations often exacerbate the problem: generic chatbots that hallucinate inaccurate information, insecure API calls exposing sensitive company data, or brittle automation scripts that break silently without alerting operators.',
      'Avorria engineers robust, sovereign digital systems. We combine deterministic backend workflows, pgvector semantic search, resilient server-side attribution pipelines, and Stripe billing engines into dependable infrastructure that scales operational capacity without proportional headcount increases.',
    ],
    approachTitle: 'SYSTEMS ENGINEERING LIFECYCLE',
    approachStatement:
      'Rigorous engineering for intelligent automations, high-throughput data processing, and financial infrastructure.',
    approachSteps: [
      {
        step: '01',
        title: 'Operational Workflow Diagnostic',
        description:
          'Forensic mapping of data flows, manual repetitive steps, software bottlenecks, and customer friction points.',
      },
      {
        step: '02',
        title: 'Data & Schema Architecture',
        description:
          'Design of normalized relational models, vector embedding stores (pgvector), and deterministic state machine boundaries.',
      },
      {
        step: '03',
        title: 'AI Model & Prompt Engineering',
        description:
          'Implementation of domain-specific vector retrieval (RAG), strict prompt validation rubrics, and automated output sanitization.',
      },
      {
        step: '04',
        title: 'Autonomous Pipeline Development',
        description:
          'Construction of background workers, webhooks, automated email dispatch queues (Resend), and CRM synchronization bridges.',
      },
      {
        step: '05',
        title: 'Payment & Financial Infrastructure',
        description:
          'Stripe integration for structured client invoicing, recurring billing, deposit workflows, and automated transaction reconciliation.',
      },
      {
        step: '06',
        title: 'Observability & Telemetry Deployment',
        description:
          'Real-time system health logging, error alerting, latency tracing, and automated failover verification in live production.',
      },
    ],
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
    caseStudySlugs: ['drawdown', 'careeros'],
    faqTitle: 'AI & SYSTEMS INTEGRATION QUESTIONS',
    faqs: [
      {
        question: 'What is the difference between generic AI wrappers and custom AI systems development?',
        answer:
          'Generic AI wrappers merely pass unstructured prompts to public LLM endpoints without safeguards. Custom AI systems development, such as our work on CareerOS, integrates domain-specific vector embeddings (pgvector), deterministic scoring rubrics, and relational database constraints to ensure verifiable, hallucination-free outputs that execute reliable business decisions.',
      },
      {
        question: 'How do you guarantee the security of proprietary business data when using AI models?',
        answer:
          'We enforce strict data isolation protocols: zero data retention on model inference endpoints, encrypted vector stores, server-side execution with Row Level Security (RLS) in PostgreSQL, and zero exposure of client data to public training sets.',
      },
      {
        question: 'Can you automate complex multi-step workflows across our existing software stack?',
        answer:
          'Yes. We build autonomous background scout engines and event-driven worker queues that ingest webhooks, execute business logic, trigger automated transactional communications, and synchronize state across internal systems like ERPs, CRMs, and payment gateways without manual intervention.',
      },
      {
        question: 'How does server-side attribution solve the loss of third-party cookie tracking?',
        answer:
          'Modern ad blockers and browser privacy restrictions (Safari ITP, Brave) routinely block 30% to 50% of client-side tracking pixels. By deploying server-to-server Conversions APIs (CAPI) and PostgreSQL transaction ledgers, we record verified commercial actions with mathematical accuracy.',
      },
      {
        question: 'What payment and billing architectures can you deploy with Stripe?',
        answer:
          'We engineer custom Stripe checkout sessions, recurring SaaS subscription models, multi-tier equipment leasing deposits (as demonstrated in TAFM), and signed proposal payment token redemption directly integrated with bookkeeping ledgers.',
      },
    ],
    seo: {
      title: 'AI Development, Systems Integration & Workflow Automation — Avorria',
      description:
        'Avorria engineers commercial systems, server-side attribution, Stripe payment infrastructure, and intelligent AI workflow automation.',
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
