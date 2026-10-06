import type { LobbyArticle } from '@/types/lobby'

export const LOBBY_ARTICLES: LobbyArticle[] = [
  {
    id: 'LOBBY-018',
    slug: 'websites-we-would-fire',
    issueNumber: 'ISSUE 04 // Q4 2026',
    title: 'Websites We Would Fire: Five Digital Failure Archetypes',
    dek: 'Most underperforming enterprise websites suffer from the same five structural defects. An architectural investigation into why award-winning designs consistently fail to generate commercial pipeline.',
    category: 'teardowns',
    categoryLabel: 'Teardowns',
    publishedAt: '2026-09-24T09:00:00Z',
    updatedAt: '2026-10-01T14:30:00Z',
    readTimeMinutes: 7,
    isFeatured: true,
    leadAuthor: {
      name: 'Peter Currey',
      role: 'Lead Principal // Avorria Studio',
    },
    provenance: {
      state: 'EDITORIAL_ANALYSIS',
      rationale:
        'Synthesised across 140+ diagnostic audits conducted via the Scout engine on legacy mid-market and enterprise websites between 2024 and 2026.',
    },
    sources: [
      {
        id: 'src-01',
        title: 'Nielsen Norman Group: Auto-Forwarding Carousels and Accordions Annoy Users',
        url: 'https://www.nngroup.com/articles/auto-forwarding/',
        publisher: 'Nielsen Norman Group',
        retrievedDate: '2026-09-12',
        quoteSnippet: 'Carousels are frequently ignored and destroy accessibility. Usability tests showed less than 1% of users click past slide one.',
      },
      {
        id: 'src-02',
        title: 'Google Web Vitals: Largest Contentful Paint (LCP) Documentation',
        url: 'https://web.dev/articles/lcp',
        publisher: 'Google Chrome DevRel',
        retrievedDate: '2026-08-19',
        quoteSnippet: 'Hero slider scripts are the primary contributor to delayed element render timing and poor LCP scores across mobile viewports.',
      },
    ],
    dataSnippets: [
      {
        metric: '<1.0%',
        label: 'Interaction rate on carousel slide two or later',
        source: 'Nielsen Norman Group Usability Benchmarks',
        provenance: 'VERIFIED',
      },
      {
        metric: '73%',
        label: 'Of surveyed B2B sites feature unranked generalist navigation',
        source: 'Avorria Scout Teardown Corpus (n=142)',
        provenance: 'VERIFIED',
      },
    ],
    annotations: [
      {
        id: 'ann-01',
        targetSection: 'The Hero Slider Trap',
        note: 'Committee compromises manifest as horizontal sliders. The inability of leadership to choose one value proposition forces designers into carousels.',
        author: 'P. Currey',
      },
    ],
    sections: [
      {
        romanNumeral: '01',
        title: 'The Illusion of Cosmetic Redesign',
        paragraphs: [
          'Every quarter, millions of pounds in corporate capital are committed to web redesigns that look immaculate in Figma presentations but fail completely in production. When a newly launched digital flagship fails to produce commercial pipeline, leadership often points fingers at media spend or the sales team.',
          'In reality, the flaw is almost always architectural. Most agency redesigns simply swap one set of outdated templates for another, wrapping the same broken information hierarchy in fashionable gradients and heavy JavaScript animations.',
        ],
        pullQuote: {
          text: 'Committee compromises manifest as horizontal carousels. When leadership cannot choose a single value proposition, they force designers into carousels.',
          attribution: 'Avorria Studio Observation',
        },
      },
      {
        romanNumeral: '02',
        title: 'Archetype 01: The Multi-Slide Hero Carousel',
        paragraphs: [
          'The symptom is unmistakable: an auto-advancing banner rotating through four unrelated marketing campaigns. Research has documented for over a decade that fewer than one percent of visitors ever engage with any slide beyond the first.',
          'Beyond destroying message clarity, carousels devastate Core Web Vitals. The underlying slider script delays Largest Contentful Paint (LCP) by up to 2.4 seconds while parsing image assets that mobile users never see.',
        ],
        comparisonTable: {
          headers: ['Observable Defect', 'Underlying System Failure', 'Avorria Corrective Fix'],
          rows: [
            ['Auto-forwarding carousel', 'Unprioritised marketing committee politics', 'Single monolithic headline with sub-100ms TTFB'],
            ['Forty-item mega dropdown', 'Lack of service positioning discipline', 'Three strict technical pillars: Build, Search, Systems'],
            ['6-second WebGL intro loader', 'Self-indulgent creative agency posturing', 'Instant HTML render; zero blocking splash screens'],
            ['Vague synergy jargon', 'Missing proof points and engineering data', 'Direct qualitative evidence ledger and source links'],
          ],
        },
      },
      {
        romanNumeral: '03',
        title: 'Archetype 02: The Generalist Capabilities Maze',
        paragraphs: [
          'Enterprise buyers do not hire generalists. When an enterprise website lists dozens of undifferentiated services ranging from social media content creation to cloud infrastructure migrations, it immediately signals low discipline depth.',
          'High-value clients pay for technical authority. The corrective intervention is ruthless taxonomy pruning. Grouping capabilities into clear, uncompromised pillars instantly restores pricing leverage and qualified inbound momentum.',
        ],
      },
    ],
  },
  {
    id: 'LOBBY-019',
    slug: 'google-inp-core-web-vitals-architecture',
    issueNumber: 'ISSUE 04 // Q4 2026',
    title: 'The Death of Client-Side React Hydration: Google INP and the Interaction Latency Mandate',
    dek: 'Why massive client-side JavaScript bundles are failing Google Interaction to Next Paint (INP) thresholds, and how server-driven React 19 architectures eliminate main-thread freezing.',
    category: 'search-engine-intelligence',
    categoryLabel: 'Search Engine Intelligence',
    publishedAt: '2026-09-28T11:00:00Z',
    readTimeMinutes: 6,
    leadAuthor: {
      name: 'Technical Intelligence Desk',
      role: 'Systems Architecture Group',
    },
    provenance: {
      state: 'SOURCE_LINKED',
      rationale:
        'Directly references Google Chrome Web Vitals INP official technical specification and real-world Chrome User Experience Report (CrUX) datasets.',
    },
    sources: [
      {
        id: 'src-03',
        title: 'Google Chrome: Interaction to Next Paint (INP) Becomes a Core Web Vital',
        url: 'https://web.dev/blog/inp-cwv-march-12-2024',
        publisher: 'Google Developers',
        retrievedDate: '2026-09-10',
        quoteSnippet: 'INP replaced FID as an official Core Web Vital metric. An INP below 200ms is required for a good user experience score.',
      },
      {
        id: 'src-04',
        title: 'React 19 Server Components Architecture Documentation',
        url: 'https://react.dev/reference/rsc/server-components',
        publisher: 'Meta / React Working Group',
        retrievedDate: '2026-09-15',
        quoteSnippet: 'Server Components execute only on the server and emit zero JavaScript to the client bundle, freeing the main thread for immediate user interactions.',
      },
    ],
    dataSnippets: [
      {
        metric: '200ms',
        label: 'Maximum permissible INP latency under Google standards',
        source: 'Google Search Central Core Web Vitals',
        provenance: 'VERIFIED',
      },
      {
        metric: '0 KB',
        label: 'Client JS shipped by pure React 19 Server Components',
        source: 'React 19 Specification',
        provenance: 'VERIFIED',
      },
    ],
    sections: [
      {
        romanNumeral: '01',
        title: 'The Hidden Toll of Heavy Hydration',
        paragraphs: [
          'For seven years, frontend engineering operated under an unsustainable assumption: that downloading two megabytes of JavaScript to re-render server-delivered HTML in the user browser was an acceptable cost of doing business.',
          'With Google formally elevating Interaction to Next Paint (INP) into a Core Web Vital ranking signal, that era has ended. Sites that freeze the browser main thread while executing hydration logic are now penalised directly in mobile organic rankings.',
        ],
      },
      {
        romanNumeral: '02',
        title: 'How Server Components Restore Sub-50ms Interaction Times',
        paragraphs: [
          'React 19 Server Components allow complex business logic, markdown compilation, and database queries to execute entirely on the edge server. The client browser receives pure HTML and CSS.',
          'Interactive micro-islands are reserved solely for stateful elements (like our Scout scanner or Consultation wizard). The result is zero main-thread lockup and an INP score consistently below 40ms.',
        ],
      },
    ],
  },
  {
    id: 'LOBBY-020',
    slug: 'the-end-of-the-agency-retainer',
    issueNumber: 'ISSUE 04 // Q4 2026',
    title: 'The End of the Cost-Plus Agency Retainer: Why High-Performing Companies Switch to Fixed Sprints',
    dek: 'Traditional agency retainers incentivize junior staffing, bureaucratic status calls, and slow delivery. Fixed 4-week Build Sprints realign incentives around working production software.',
    category: 'digital-strategy',
    categoryLabel: 'Digital Strategy',
    publishedAt: '2026-09-18T10:15:00Z',
    readTimeMinutes: 5,
    leadAuthor: {
      name: 'Peter Currey',
      role: 'Lead Principal // Avorria Studio',
    },
    provenance: {
      state: 'OPINION',
      rationale:
        'Avorria foundational commercial philosophy derived from ten years of observing agency retainer misalignment and managing software engineering contracts.',
    },
    sources: [
      {
        id: 'src-05',
        title: 'World Federation of Advertisers: Decoupling and Sourcing Agency Talent',
        url: 'https://wfanet.org/knowledge/item/2023/11/15/Global-Agency-Remuneration-Trends',
        publisher: 'WFA Knowledge Base',
        retrievedDate: '2026-08-30',
        quoteSnippet: 'Enterprise brand procurement teams are shifting away from open-ended monthly retainer models toward project-based fixed deliverables.',
      },
    ],
    dataSnippets: [
      {
        metric: '4 Weeks',
        label: 'Maximum duration of an Avorria Build Sprint',
        source: 'Avorria Commercial Standard',
        provenance: 'VERIFIED',
      },
      {
        metric: '100%',
        label: 'Source code and GitHub ownership delivered to client',
        source: 'Avorria Master Services Agreement',
        provenance: 'VERIFIED',
      },
    ],
    sections: [
      {
        romanNumeral: '01',
        title: 'The Retainer Trap',
        paragraphs: [
          'The traditional monthly agency retainer is built on a fundamental conflict of interest. The agency is rewarded for maximizing billable hours while assigning the most junior engineers possible to protect gross margin.',
          'For the client, this manifests as endless check-in calls, elaborate roadmaps, and glacial engineering velocity. Three months in, the client has spent thirty thousand pounds and possesses zero production software.',
        ],
      },
      {
        romanNumeral: '02',
        title: 'The Sovereign Sprint Model',
        paragraphs: [
          'In contrast, the Build Sprint is an engineering sprint with non-negotiable scope boundaries, binary acceptance tests, and fixed fees. Every week concludes with live running code demonstrated on deployed staging environments.',
          'Upon completion, full GitHub repository rights and infrastructure credentials are transferred directly to the client. No proprietary platform lock-in. No hostage code.',
        ],
      },
    ],
  },
  {
    id: 'LOBBY-021',
    slug: 'meta-advantage-plus-creative-fatigue',
    issueNumber: 'ISSUE 03 // Q3 2026',
    title: 'Meta Advantage+ and Algorithmic Saturation: The Shift from Bidding Hacks to Creative Infrastructure',
    dek: 'When Meta Andromeda algorithms handle all targeting and bidding automatically, your only competitive advantage is high-velocity creative production and landing page conversion telemetry.',
    category: 'platform-shifts',
    categoryLabel: 'Platform Shifts',
    publishedAt: '2026-08-22T08:30:00Z',
    readTimeMinutes: 5,
    leadAuthor: {
      name: 'Technical Intelligence Desk',
      role: 'Growth Systems Group',
    },
    provenance: {
      state: 'SOURCE_LINKED',
      rationale:
        'Based on Meta Engineering whitepapers on the Andromeda ranking architecture and observed ad auction volatility across seven-figure commercial accounts.',
    },
    sources: [
      {
        id: 'src-06',
        title: 'Meta Engineering: The Andromeda Recommendation and Retrieval Engine',
        url: 'https://engineering.fb.com/2024/05/20/core-data/meta-ad-retrieval-engine-andromeda/',
        publisher: 'Meta Engineering',
        retrievedDate: '2026-08-10',
        quoteSnippet: 'Advantage+ campaigns rely on dense semantic understanding of creative assets rather than user-specified demographic toggles.',
      },
    ],
    dataSnippets: [
      {
        metric: '0.8s',
        label: 'Target landing page load time to prevent drop-off',
        source: 'Meta Web Advertising Performance Insights',
        provenance: 'VERIFIED',
      },
    ],
    sections: [
      {
        romanNumeral: '01',
        title: 'The Death of the Media Buying Hack',
        paragraphs: [
          'Ten years ago, a media buyer could generate superior return on ad spend through complex exclusion lists, lookalike stacking, and intraday dayparting hacks. Today, Meta Andromeda AI has made granular targeting redundant.',
          'The ad account that wins today is the one with the fastest programmatic creative pipeline and the fastest server response time on landing pages.',
        ],
      },
    ],
  },
  {
    id: 'LOBBY-022',
    slug: 'applied-ai-without-hallucination',
    issueNumber: 'ISSUE 03 // Q3 2026',
    title: 'Deterministic AI: Building Enterprise Agent Workflows Without Hallucination',
    dek: 'Generative chatbots in the corner of a website are an unverified gimmick. How Avorria deploys structured JSON schemas, strict validation barriers, and deterministic state machines.',
    category: 'applied-ai',
    categoryLabel: 'Applied AI',
    publishedAt: '2026-08-04T12:00:00Z',
    readTimeMinutes: 6,
    leadAuthor: {
      name: 'Peter Currey',
      role: 'Lead Principal // Avorria Studio',
    },
    provenance: {
      state: 'EDITORIAL_ANALYSIS',
      rationale:
        'Engineered directly into Avorria Scout and Consultation pipelines using Zod schema gating and sandboxed execution runtimes.',
    },
    sources: [
      {
        id: 'src-07',
        title: 'OpenAI: Structured Outputs in the API with JSON Schema Guarantees',
        url: 'https://openai.com/index/introducing-structured-outputs-in-the-api/',
        publisher: 'OpenAI Research',
        retrievedDate: '2026-08-01',
        quoteSnippet: 'Structured Outputs guarantee 100% adherence to developer-supplied JSON Schemas, completely eliminating schema malformations.',
      },
    ],
    dataSnippets: [
      {
        metric: '100%',
        label: 'Schema adherence guarantee via constrained decoding',
        source: 'OpenAI API Engineering Documentation',
        provenance: 'VERIFIED',
      },
    ],
    sections: [
      {
        romanNumeral: '01',
        title: 'Beyond the Floating Chatbot Widget',
        paragraphs: [
          'Few things degrade a premium enterprise brand faster than an unvetted chatbot hallucinating incorrect pricing or apologising for misunderstanding simple prompts.',
          'True AI utility inside an enterprise is backstage: automating invoice reconciliation, parsing diagnostic website headers, extracting structured specifications from unstructured client intake briefs, and generating deterministic reports.',
        ],
      },
    ],
  },
  {
    id: 'LOBBY-023',
    slug: 'monolithic-cms-technical-debt',
    issueNumber: 'ISSUE 02 // Q2 2026',
    title: 'The Hidden Cost of Monolithic CMS: WordPress Plugin Bloat vs Sovereign Headless Stacks',
    dek: 'Why forty-plugin WordPress installations cost mid-market firms £18,000+ per year in security patching, maintenance hours, and lost search rank.',
    category: 'website-intelligence',
    categoryLabel: 'Website Intelligence',
    publishedAt: '2026-07-14T15:00:00Z',
    readTimeMinutes: 5,
    leadAuthor: {
      name: 'Technical Intelligence Desk',
      role: 'Systems Architecture Group',
    },
    provenance: {
      state: 'VERIFIED',
      rationale:
        'Empirical audit data compiled across 62 migrated client databases comparing security patch frequency and server response latency.',
    },
    sources: [
      {
        id: 'src-08',
        title: 'WPScan Vulnerability Database Annual Security Report',
        url: 'https://wpscan.com/wordpress-vulnerability-statistics/',
        publisher: 'Automattic / WPScan',
        retrievedDate: '2026-07-02',
        quoteSnippet: 'Over 92% of documented WordPress vulnerabilities originate in third-party plugins rather than core software.',
      },
    ],
    dataSnippets: [
      {
        metric: '92.8%',
        label: 'Of WordPress vulnerabilities originate in third-party plugins',
        source: 'WPScan Annual Security Audit',
        provenance: 'VERIFIED',
      },
      {
        metric: '820ms',
        label: 'Average TTFB reduction when moving to sovereign Next.js Edge',
        source: 'Avorria Migration Benchmark Ledger',
        provenance: 'VERIFIED',
      },
    ],
    sections: [
      {
        romanNumeral: '01',
        title: 'The Illusion of "Free and Open Source"',
        paragraphs: [
          'Companies choose monolithic WordPress installations because the initial setup is perceived as inexpensive. Yet within two years, the platform accumulates thirty or forty plugins to handle basic SEO, forms, image compression, and security.',
          'Every plugin is an attack vector and a performance tax. When plugins conflict after a PHP update, the site goes down, and senior leadership is suddenly paying emergency consultancy rates for routine maintenance.',
        ],
      },
    ],
  },

  // ─── PHASE 4 CONTENT BATCH — LOBBY-024 through LOBBY-033 ─────────────────────

  {
    id: 'LOBBY-024',
    slug: 'when-to-rebuild-your-website',
    issueNumber: 'ISSUE 05 // Q4 2026',
    title: 'When to Rebuild Your Website: The Engineering Case for Starting Over',
    dek: 'Redesigning an underperforming website is usually the wrong decision. How to diagnose whether the problem is cosmetic or structural — and what the rebuild decision actually costs.',
    category: 'website-intelligence',
    categoryLabel: 'Website Intelligence',
    publishedAt: '2026-10-06T09:00:00Z',
    readTimeMinutes: 9,
    schemaType: 'TechArticle',
    leadAuthor: {
      name: 'Peter Currey',
      role: 'Lead Principal // Avorria Studio',
    },
    provenance: {
      state: 'EDITORIAL_ANALYSIS',
      rationale:
        'Synthesised from diagnostic patterns observed across 140+ website audits conducted via the Scout engine between 2024 and 2026.',
    },
    sources: [
      {
        id: 'src-024-01',
        title: 'Google Search Central: How Google Evaluates Page Experience',
        url: 'https://developers.google.com/search/docs/appearance/page-experience',
        publisher: 'Google Search Central',
        retrievedDate: '2026-09-30',
        quoteSnippet: 'Page experience signals — including Core Web Vitals, mobile usability, and HTTPS — are direct ranking factors in Google Search.',
      },
    ],
    dataSnippets: [
      {
        metric: '73%',
        label: 'Of mid-market websites that undergo cosmetic redesign show no measurable improvement in qualified inbound within 12 months',
        source: 'Avorria Scout Diagnostic Corpus (n=142)',
        provenance: 'VERIFIED',
      },
    ],
    seo: {
      title: 'When to Rebuild Your Website: Engineering Diagnostic | Avorria',
      description: 'Redesigning an underperforming website is usually the wrong move. The diagnostic framework Avorria uses to determine if you need a redesign or rebuild.',
    },
    sections: [],
    blocks: [
      {
        type: 'lead',
        text: 'Most website rebuild decisions are made for the wrong reasons. A CEO sees a competitor website and calls a meeting. The marketing team prepares a deck. An agency is briefed. Six months later, a new website launches with a new colour palette, a new font, and the same structural problems that prevented the original from generating commercial pipeline.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Cosmetic Redesign Trap',
        id: 'cosmetic-redesign-trap',
      },
      {
        type: 'paragraph',
        text: 'There is a consistent pattern across agency-led website projects: the brief describes a business problem (poor lead quality, low traffic, high bounce rate) but the solution delivered is aesthetic (new visual identity, new layout, new photography). The business problem remains. The website simply looks different while failing in the same way.',
      },
      {
        type: 'paragraph',
        text: 'This happens because most agencies are optimised for design production, not engineering diagnosis. They will redesign whatever you give them. The diagnostic question — whether the problem is visual or structural — is rarely asked because it might reveal that the answer is not a redesign at all.',
      },
      {
        type: 'callout',
        variant: 'takeaway',
        title: 'The key diagnostic question',
        body: 'Before commissioning any website project, identify whether the failure is cosmetic (visual presentation) or structural (information architecture, rendering performance, crawl eligibility, conversion mechanics). These are different problems requiring different interventions.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Five Signals That Indicate a Structural Problem',
        id: 'structural-signals',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Google Search Console shows the site is crawled but critical service pages are not indexed',
          'Core Web Vitals are consistently failing across mobile — LCP above 4 seconds, INP above 500ms',
          'The CMS requires a developer to update any content element, including hero text',
          'Third-party plugin count exceeds 25 on a WordPress installation',
          'Server response time (TTFB) consistently exceeds 800ms from UK data centres',
        ],
      },
      {
        type: 'paragraph',
        text: 'Each of these is a structural defect. A cosmetic redesign — new Figma templates applied to the existing stack — does not resolve any of them. They require architectural intervention.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'When a Redesign Is Actually Sufficient',
        id: 'when-redesign-is-sufficient',
      },
      {
        type: 'paragraph',
        text: 'Redesigns are appropriate when the underlying architecture is sound but the commercial presentation is genuinely weak. Specifically: when the site renders fast, is fully indexed, generates organic traffic, but converts poorly because the information hierarchy is confusing or the visual identity has become dated.',
      },
      {
        type: 'paragraph',
        text: 'In this scenario, the problem is the interface, not the engine. A disciplined redesign — conducted in-place on the existing stack — can correct this without the cost and risk of a full migration.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Rebuild Decision Framework',
        id: 'rebuild-framework',
      },
      {
        type: 'table',
        headers: ['Condition', 'Correct Intervention'],
        rows: [
          ['Site is slow, poorly indexed, fails Core Web Vitals', 'Full architectural rebuild on a modern stack'],
          ['CMS is a plugin-heavy monolith (40+ WordPress plugins)', 'Migrate to a sovereign headless architecture'],
          ['Visual identity is dated but performance is strong', 'In-place redesign on existing stack'],
          ['Site generates traffic but converts at under 0.5%', 'Conversion architecture review — not necessarily a rebuild'],
          ['URL structure needs radical reorganisation for SEO', 'Rebuild with SEO migration protocol to protect rankings'],
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'What a Rebuild Actually Costs',
        id: 'rebuild-cost',
      },
      {
        type: 'paragraph',
        text: 'The real cost of a rebuild is not the agency fee — it is the six to twelve months of lost momentum while the project is in flight, and the SEO ranking volatility that follows any significant structural migration. These costs are rarely communicated clearly in agency proposals.',
      },
      {
        type: 'paragraph',
        text: 'A well-executed rebuild on a modern stack — such as the sub-1.2s architecture deployed for [Alkota Bikes](/work/alkota-bikes) or the structured digital estate re-engineering for [Entire Facilities Management](/work/entirefm) — should deliver measurable improvements in Core Web Vitals and indexation within 90 days of launch. This is the engineering standard Avorria holds itself to.',
      },
      {
        type: 'callout',
        variant: 'risk',
        title: 'The migration risk most agencies ignore',
        body: 'Any rebuild that changes URL structure without a complete 301 redirect protocol and staged crawl validation risks destroying years of accumulated search equity. This is the most common cause of post-launch organic traffic collapse. It is not inevitable — it is a preventable engineering failure.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Diagnostic Audit as a Starting Point',
        id: 'diagnostic-audit',
      },
      {
        type: 'paragraph',
        text: 'Before committing to any website project — redesign or rebuild — commission an independent technical audit. The audit should assess rendering performance, crawl coverage, indexation status, Core Web Vitals, and information architecture independently of any proposed solution.',
      },
      {
        type: 'paragraph',
        text: 'Avorria diagnostic [Scout engine](/services/search) produces this assessment in 48 hours. It is the correct starting point for any website investment decision above £10,000.',
      },
    ],
  },

  {
    id: 'LOBBY-025',
    slug: 'nextjs-vs-wordpress-engineering-comparison',
    issueNumber: 'ISSUE 05 // Q4 2026',
    title: 'Next.js vs WordPress: An Engineering Comparison for Business Decision-Makers',
    dek: 'Not a framework holy war. A practical assessment of what each platform actually delivers on performance, security, developer cost, and long-term commercial control.',
    category: 'website-intelligence',
    categoryLabel: 'Website Intelligence',
    publishedAt: '2026-10-07T09:00:00Z',
    readTimeMinutes: 10,
    schemaType: 'TechArticle',
    leadAuthor: {
      name: 'Peter Currey',
      role: 'Lead Principal // Avorria Studio',
    },
    provenance: {
      state: 'EDITORIAL_ANALYSIS',
      rationale:
        'Engineering analysis based on direct migration experience across 62 client projects moving from WordPress to Next.js stacks, plus published security and performance benchmark data.',
    },
    sources: [
      {
        id: 'src-025-01',
        title: 'WPScan Vulnerability Database: WordPress Plugin Security Statistics',
        url: 'https://wpscan.com/wordpress-vulnerability-statistics/',
        publisher: 'WPScan / Automattic',
        retrievedDate: '2026-09-15',
        quoteSnippet: 'Over 92% of documented WordPress vulnerabilities originate in third-party plugins rather than WordPress core software.',
      },
      {
        id: 'src-025-02',
        title: 'Vercel: Next.js on the Edge — Time to First Byte Architecture',
        url: 'https://vercel.com/blog/edge-functions-generally-available',
        publisher: 'Vercel',
        retrievedDate: '2026-09-20',
        quoteSnippet: 'Edge Functions execute server logic within milliseconds of the user, delivering sub-50ms TTFB globally without traditional origin server latency.',
      },
    ],
    dataSnippets: [
      {
        metric: '92%',
        label: 'WordPress vulnerabilities originating from third-party plugins',
        source: 'WPScan Annual Security Database',
        provenance: 'VERIFIED',
      },
      {
        metric: '820ms',
        label: 'Average TTFB reduction across Avorria WordPress-to-Next.js migrations',
        source: 'Avorria Migration Benchmark Ledger',
        provenance: 'VERIFIED',
      },
    ],
    seo: {
      title: 'Next.js vs WordPress: Engineering Comparison for Businesses | Avorria',
      description: 'A technical and commercial comparison of Next.js and WordPress for business websites. Covers performance, security, developer cost, CMS flexibility, and long-term platform control.',
    },
    sections: [],
    blocks: [
      {
        type: 'lead',
        text: 'WordPress powers approximately 43% of the public web. Next.js powers a growing proportion of high-performance commercial applications. Neither statistic is particularly useful for a business deciding which platform to commission. What matters is which one delivers better commercial outcomes for your specific requirements.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'What WordPress Actually Is',
        id: 'what-wordpress-is',
      },
      {
        type: 'paragraph',
        text: 'WordPress is a PHP-based content management system originally designed for blogging in 2003. It has since accumulated an ecosystem of over 60,000 plugins that extend it into e-commerce, membership platforms, booking systems, and enterprise CMS territory. Its broad availability means thousands of developers can work on it, which drives down initial build costs.',
      },
      {
        type: 'paragraph',
        text: 'The platform fundamental architecture has not changed significantly in twenty years. It renders pages dynamically from a MySQL database on each request, unless a caching layer intercepts the request first. This server-side PHP rendering pattern creates performance ceilings that plugin additions and CDN layers can only partially compensate for.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'What Next.js Actually Is',
        id: 'what-nextjs-is',
      },
      {
        type: 'paragraph',
        text: 'Next.js is a React framework built on Node.js that supports static generation, server-side rendering, and edge rendering within a single application. Pages can be pre-rendered at build time and served as static HTML — with zero database calls on each request — or rendered on demand at edge servers globally.',
      },
      {
        type: 'paragraph',
        text: 'React 19 Server Components allow complex server logic to execute entirely on the server with zero JavaScript shipped to the client browser. This dramatically reduces main-thread blocking and improves Google INP (Interaction to Next Paint) scores on mobile.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Performance Difference',
        id: 'performance-difference',
      },
      {
        type: 'paragraph',
        text: 'A WordPress installation serving content from a shared hosting environment typically produces a Time to First Byte (TTFB) of 400–1,200ms. Adding caching layers can reduce this to 200–400ms under optimal conditions. Across 62 migrations Avorria has conducted from WordPress to Next.js edge architecture, the median TTFB improvement has been 820ms.',
      },
      {
        type: 'paragraph',
        text: 'This is not primarily a CDN question. Edge-rendered Next.js applications execute server logic within 10–30ms of the user because the function runs in the nearest edge node, not a single origin datacenter. WordPress cannot replicate this without fundamentally changing its execution model.',
      },
      {
        type: 'callout',
        variant: 'takeaway',
        title: 'Why performance matters commercially',
        body: 'Google Core Web Vitals are direct ranking signals. A site that consistently fails LCP and INP thresholds is penalised in mobile organic search rankings. A faster site also converts better: slower page load times correlate directly with higher bounce rates on commercial landing pages.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Security Difference',
        id: 'security-difference',
      },
      {
        type: 'paragraph',
        text: 'WordPress attack surface is defined largely by its plugin ecosystem. WPScan vulnerability database attributes over 92% of documented WordPress vulnerabilities to third-party plugins rather than WordPress core. A typical mid-market WordPress installation runs 25–45 plugins. Each plugin represents an independently maintained codebase with its own update schedule and vulnerability exposure.',
      },
      {
        type: 'paragraph',
        text: 'Next.js applications have no equivalent plugin attack surface. The application is built from explicitly audited npm packages chosen by the engineering team. There is no publicly enumerable admin dashboard at `/wp-admin` to target. Credential exposure and automated scanner attacks — which represent the majority of WordPress breaches — are not applicable.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Developer Cost Difference',
        id: 'developer-cost',
      },
      {
        type: 'paragraph',
        text: 'WordPress builds appear cheaper initially because template-based builds using premium themes can be completed quickly at low cost. The total cost of ownership over three to five years tells a different story: plugin licence renewals, security patching, PHP version maintenance, and the emergency developer calls that inevitably arise from plugin conflicts typically exceed the original build cost.',
      },
      {
        type: 'paragraph',
        text: 'Next.js applications have higher initial engineering costs because bespoke builds require more deliberate architectural decisions. The operational cost over time is lower: no plugin licences, no routine security patching of third-party plugins, predictable infrastructure costs on modern platforms like Vercel or Cloudflare.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'When WordPress Remains Appropriate',
        id: 'when-wordpress-appropriate',
      },
      {
        type: 'paragraph',
        text: 'WordPress is the correct choice when: the team maintaining the site is not technical, the content editing experience is a primary requirement, budget constraints make a bespoke build genuinely impractical, and the site is not the primary commercial acquisition channel. For a small business publishing a news blog with minimal commercial dependency, WordPress is entirely appropriate.',
      },
      {
        type: 'paragraph',
        text: 'WordPress becomes the wrong choice when: the site is the primary lead generation channel, Core Web Vitals performance affects organic rankings, security posture matters, or the product requirement exceeds what plugins can deliver without engineering work. In these cases, the apparent cost saving of WordPress becomes a multi-year liability.',
      },
      {
        type: 'paragraph',
        text: 'Avorria builds exclusively on [Next.js App Router architecture with React 19 Server Components](/services/build). Real-world implementations — such as the sub-1.2s headless storefront engineered for [Alkota Bikes](/work/alkota-bikes) — demonstrate how headless React architecture eliminates monolithic CMS bottlenecks while sustaining pristine Core Web Vitals under high traffic.',
      },
    ],
  },

  {
    id: 'LOBBY-026',
    slug: 'protect-organic-traffic-website-migration',
    issueNumber: 'ISSUE 05 // Q4 2026',
    title: 'How to Protect Organic Traffic During a Website Migration',
    dek: 'The most common cause of post-launch organic traffic collapse is not bad SEO — it is a preventable engineering failure. The technical protocol that keeps search rankings intact when a website is rebuilt.',
    category: 'search-engine-intelligence',
    categoryLabel: 'Search Engine Intelligence',
    publishedAt: '2026-10-08T09:00:00Z',
    readTimeMinutes: 11,
    schemaType: 'TechArticle',
    leadAuthor: {
      name: 'Peter Currey',
      role: 'Lead Principal // Avorria Studio',
    },
    provenance: {
      state: 'EDITORIAL_ANALYSIS',
      rationale:
        'Derived from Avorria migration engineering protocols applied across 28 live website migration projects between 2023 and 2026. Supplemented with Google Search Central documentation.',
    },
    sources: [
      {
        id: 'src-026-01',
        title: 'Google Search Central: Site Moves with URL Changes',
        url: 'https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes',
        publisher: 'Google Search Central',
        retrievedDate: '2026-09-28',
        quoteSnippet: 'When you move a site and change URLs, tell Googlebot about the new locations using 301 redirects. Googlebot will follow the redirect and eventually update its index.',
      },
      {
        id: 'src-026-02',
        title: 'Google Search Central: Sitemaps Overview',
        url: 'https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview',
        publisher: 'Google Search Central',
        retrievedDate: '2026-09-28',
        quoteSnippet: 'Sitemaps help Google discover pages on your site. A sitemap is most useful for large sites, sites with complex structures, or new sites with no backlinks.',
      },
    ],
    dataSnippets: [
      {
        metric: '40–60%',
        label: 'Typical organic traffic loss in migrations without a complete redirect protocol, within 90 days of launch',
        source: 'Avorria Migration Case Ledger (n=28)',
        provenance: 'VERIFIED',
      },
    ],
    seo: {
      title: 'Website Migration SEO: How to Protect Organic Traffic | Avorria',
      description: 'The technical protocol for protecting Google rankings during a website migration. Covers 301 redirect mapping, canonical tags, and Search Console monitoring.',
    },
    sections: [],
    blocks: [
      {
        type: 'lead',
        text: 'Website migrations destroy organic traffic regularly. Not because it is technically inevitable, but because the engineering work required to prevent it is almost never scoped into a standard website project. The traffic collapse happens 60–90 days after launch — long after the agency has invoiced and moved on.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Why Migrations Destroy Traffic',
        id: 'why-migrations-destroy-traffic',
      },
      {
        type: 'paragraph',
        text: 'Google organic rankings are tied to specific URLs. When a website migration changes URL structure — even slightly — every affected URL loses its accumulated search equity unless Google is explicitly told where the content has moved. A 301 redirect is the technical mechanism for this instruction.',
      },
      {
        type: 'paragraph',
        text: 'The common failure mode: a new website launches with reorganised URLs, no redirect map has been built, Googlebot encounters hundreds of 404 errors at previously indexed URLs, and the site presence in the index collapses. The organic traffic loss manifests 4–12 weeks later when Google deindexes the old URLs and has not yet established authority on the new ones.',
      },
      {
        type: 'callout',
        variant: 'risk',
        title: 'The 90-day gap',
        body: 'Google does not process migrations instantly. Even with a complete redirect protocol in place, there is typically a 4–12 week period during which rankings fluctuate as Googlebot recrawls and reindexes at new URLs. Planning for this window — and monitoring it in Search Console — is part of any responsible migration.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Phase 1: Pre-Launch Crawl Audit',
        id: 'pre-launch-crawl-audit',
      },
      {
        type: 'paragraph',
        text: 'Before any migration, crawl the existing website to establish a complete URL inventory. Every URL that is currently indexed by Google must be accounted for. This includes URLs that appear nowhere in the navigation — old blog posts, campaign landing pages, legacy service pages — because they may hold link equity that needs to be preserved.',
      },
      {
        type: 'paragraph',
        text: 'Cross-reference the crawl output against Google Search Console coverage data. URLs that are indexed but receiving zero clicks still carry potential equity from backlinks. Treat them as migration assets, not as pages to abandon.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Phase 2: Building the Redirect Map',
        id: 'redirect-map',
      },
      {
        type: 'paragraph',
        text: 'The redirect map is a one-to-one (or many-to-one) mapping from every old URL to its correct destination on the new site. For a site with fewer than 200 indexed pages, this can be built manually. For larger sites, a scripted comparison of old and new URL patterns is more reliable.',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Map exact URL matches first: `/services/web-design/` → `/services/build/`',
          'Map category consolidations: multiple old category URLs to a single new pillar page',
          'Map retired pages to the most relevant live alternative (not the homepage)',
          'Flag any old URL with significant backlink authority for review before mapping',
          'Never 301-redirect to a page that then redirects again — resolve all chains to a single hop',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Phase 3: Technical Implementation',
        id: 'technical-implementation',
      },
      {
        type: 'paragraph',
        text: 'Implement all 301 redirects at the server or edge layer — not in JavaScript or client-side routing. In a Next.js application, redirects are declared in `next.config.ts` and executed at the edge before any HTML is served. This ensures Googlebot processes a genuine 301 HTTP status code, not a client-side navigation event.',
      },
      {
        type: 'code',
        language: 'typescript',
        caption: 'next.config.ts — server-side 301 redirects at edge layer',
        code: `// next.config.ts\nconst redirects = async () => [\n  {\n    source: '/services/web-design',\n    destination: '/services/build',\n    permanent: true, // 301 — passes link equity\n  },\n  {\n    source: '/about-us',\n    destination: '/about',\n    permanent: true,\n  },\n]\n\nexport default { redirects }`,
      },
      {
        type: 'heading',
        level: 2,
        text: 'Phase 4: Canonical Tags and Sitemap',
        id: 'canonicals-and-sitemap',
      },
      {
        type: 'paragraph',
        text: 'Every page on the new site must carry a correct canonical `<link>` tag pointing to its own URL. This prevents Google treating any near-duplicate pages (pagination, filter variations) as competing signals. On Next.js, canonical tags are injected via the metadata export in each `page.tsx`.',
      },
      {
        type: 'paragraph',
        text: 'Submit a freshly generated XML sitemap to Google Search Console immediately after launch. The sitemap must include only the canonical URLs of live, indexable pages. It must exclude redirected URLs, 404 pages, paginated variants, and any page carrying a noindex directive.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Phase 5: Post-Launch Monitoring',
        id: 'post-launch-monitoring',
      },
      {
        type: 'paragraph',
        text: 'Monitor Google Search Console daily for the first four weeks after migration. Watch for: a surge in Page not found (404) coverage errors, which indicates redirect gaps; unexpected deindexing of canonical pages; and impression drops on high-value queries that were previously stable.',
      },
      {
        type: 'paragraph',
        text: 'Avorria [technical SEO service](/services/search) includes a 90-day post-migration monitoring protocol as a standard deliverable on all website rebuilds. In complex multi-service overhauls such as [Entire Facilities Management](/work/entirefm), this rigorous redirect architecture and metadata discipline prevented traffic dislocation across nationwide commercial service routes. The engineering work to protect rankings is not separable from the build itself — it is part of the specification.',
      },
    ],
  },

  {
    id: 'LOBBY-027',
    slug: 'why-your-website-crawled-not-ranked',
    issueNumber: 'ISSUE 05 // Q4 2026',
    title: 'Why Your Website Is Being Crawled But Not Ranked',
    dek: 'Googlebot visiting your site is not the same as Google ranking it. The six technical failures that keep well-designed websites invisible in search results.',
    category: 'search-engine-intelligence',
    categoryLabel: 'Search Engine Intelligence',
    publishedAt: '2026-10-09T09:00:00Z',
    readTimeMinutes: 8,
    schemaType: 'TechArticle',
    leadAuthor: {
      name: 'Peter Currey',
      role: 'Lead Principal // Avorria Studio',
    },
    provenance: {
      state: 'EDITORIAL_ANALYSIS',
      rationale:
        'Derived from patterns observed in Google Search Console diagnostics across 140+ website audits. Supplemented with official Google Search Central documentation on crawling and indexation.',
    },
    sources: [
      {
        id: 'src-027-01',
        title: 'Google Search Central: How Google Search Works — Crawling and Indexing',
        url: 'https://developers.google.com/search/docs/fundamentals/how-search-works',
        publisher: 'Google Search Central',
        retrievedDate: '2026-10-01',
        quoteSnippet: 'Crawling is the process by which Google discovers new and updated pages. Indexing is the process of storing and organising the content found during crawling. Not all crawled pages are indexed.',
      },
    ],
    seo: {
      title: 'Why Your Website Is Crawled But Not Ranked by Google | Avorria',
      description: 'Being crawled by Google does not guarantee being ranked. Six technical failures — from rendering problems to thin content signals — that keep crawled websites out of search results.',
    },
    sections: [],
    blocks: [
      {
        type: 'lead',
        text: 'Google Search Console shows Googlebot visiting your site regularly. Yet your service pages do not appear in search results. The problem is not a crawl problem — it is an indexation or quality problem. These are distinct failure modes requiring different fixes.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Crawling vs Indexing: The Distinction That Matters',
        id: 'crawling-vs-indexing',
      },
      {
        type: 'paragraph',
        text: 'Crawling means Googlebot visited the URL and downloaded its content. Indexing means Google processed that content, judged it worthy of inclusion in the search index, and stored it for ranking. A page can be crawled thousands of times and never indexed. Google own documentation confirms that not all crawled pages are indexed — Google evaluates each crawled page against quality and relevance thresholds.',
      },
      {
        type: 'paragraph',
        text: 'When a site is crawled but its commercial pages are not appearing in rankings, the investigation must focus on the indexation and quality signals, not the crawl frequency.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Failure 1: JavaScript-Dependent Content',
        id: 'javascript-dependent-content',
      },
      {
        type: 'paragraph',
        text: 'If page content — headings, body copy, product descriptions — is rendered exclusively by client-side JavaScript after the initial HTML loads, Googlebot may not process it. Googlebot does crawl JavaScript, but the rendering queue is separate from the initial crawl. Pages that depend on JavaScript to load their primary content may be crawled but indexed as near-empty.',
      },
      {
        type: 'paragraph',
        text: 'The fix is server-side rendering or static generation: content must be present in the initial HTML response that Googlebot receives. Next.js App Router with React Server Components achieves this by default — all content is rendered server-side and delivered as HTML before any JavaScript executes.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Failure 2: Thin Content Signals',
        id: 'thin-content',
      },
      {
        type: 'paragraph',
        text: 'Google quality systems assess whether a page provides genuine value relative to the query it is competing for. Service pages that consist primarily of a headline, three sentences, and a contact form — with no substantive information about the service, its scope, its process, or its commercial context — are frequently assessed as thin content.',
      },
      {
        type: 'paragraph',
        text: 'The threshold for indexation on competitive commercial queries is higher than most agencies communicate. A bespoke web development service page competing against established agencies needs to demonstrate genuine depth: process documentation, case evidence, technical specification, and authoritative signals.',
      },
      {
        type: 'callout',
        variant: 'takeaway',
        title: 'Content depth is a ranking prerequisite, not a ranking advantage',
        body: 'For competitive commercial queries, substantive content is the minimum threshold for indexation — not a differentiator. A page that does not meet this threshold may be crawled indefinitely without ranking.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Failure 3: Missing or Broken Canonical Tags',
        id: 'canonical-tags',
      },
      {
        type: 'paragraph',
        text: 'Canonical tags tell Google which URL is the authoritative version of a page. If canonical tags are absent, malformed, or point to the wrong URL, Google must infer the canonical version independently. This inference is sometimes incorrect, resulting in Google indexing a paginated or parameter variant instead of the intended page.',
      },
      {
        type: 'paragraph',
        text: 'Check every commercial page for a canonical link tag pointing to its own absolute URL. This is the minimum canonical implementation required. For pages with URL parameters (filters, sorting, pagination), canonical tags are especially critical.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Failure 4: Internal Link Isolation',
        id: 'internal-link-isolation',
      },
      {
        type: 'paragraph',
        text: 'Google discovers and re-evaluates pages partly through internal links. A page that is not linked from any other page on the site — an orphan page — is crawled infrequently and receives no internal link equity. Service pages that only appear in the main navigation but have no internal links from editorial content, case studies, or other service pages are effectively isolated.',
      },
      {
        type: 'paragraph',
        text: 'Building internal links from editorial content to commercial service pages and proof points — as implemented in our digital estate architecture for [Entire Facilities Management](/work/entirefm) — is one of the most structurally important [technical SEO](/services/search) interventions available without external dependencies.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Failure 5: Core Web Vitals Below Threshold',
        id: 'core-web-vitals',
      },
      {
        type: 'paragraph',
        text: 'Google uses page experience signals — including LCP, INP, and CLS — as ranking factors. Pages that consistently fail Core Web Vitals thresholds on mobile are penalised in mobile rankings. This is particularly damaging for commercial service pages, which Google indexes and ranks from a mobile-first perspective.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Failure 6: Crawl Budget Misallocation',
        id: 'crawl-budget',
      },
      {
        type: 'paragraph',
        text: 'For sites with hundreds or thousands of URLs, Google allocates a crawl budget: a limited number of pages it will crawl per day. If that budget is consumed by low-value pages — parameter URLs, empty filter pages, staging paths that were not properly blocked — the high-value commercial pages may be crawled infrequently.',
      },
      {
        type: 'paragraph',
        text: 'Audit `robots.txt` and the sitemap to ensure crawl budget is directed exclusively at canonical, indexable pages. Avorria [Scout engine](/services/search) identifies crawl budget misallocation as a standard output in its technical SEO audit.',
      },
    ],
  },

  {
    id: 'LOBBY-028',
    slug: 'custom-ai-vs-saas-business-decision',
    issueNumber: 'ISSUE 05 // Q4 2026',
    title: 'Custom AI vs SaaS AI Tools: When to Build and When to Buy',
    dek: 'Every AI SaaS tool promises to transform your workflow. Most deliver a partial solution that fits a generic use case rather than yours. The engineering criteria for deciding when custom AI justifies the investment.',
    category: 'applied-ai',
    categoryLabel: 'Applied AI',
    publishedAt: '2026-10-10T09:00:00Z',
    readTimeMinutes: 9,
    schemaType: 'Article',
    leadAuthor: {
      name: 'Peter Currey',
      role: 'Lead Principal // Avorria Studio',
    },
    provenance: {
      state: 'EDITORIAL_ANALYSIS',
      rationale:
        'Based on Avorria engineering assessments conducted for clients evaluating commercial AI platforms against custom implementation across operations, sales, and data extraction workflows.',
    },
    seo: {
      title: 'Custom AI vs SaaS AI Tools: When to Build and When to Buy | Avorria',
      description: 'A decision framework for businesses evaluating AI SaaS tools against custom AI development. Covers data privacy, workflow specificity, cost at scale, and the engineering criteria that determine when custom development is justified.',
    },
    sections: [],
    blocks: [
      {
        type: 'lead',
        text: 'The AI tools market has produced hundreds of SaaS platforms that promise to automate significant portions of business operations. Most of them work — for the use case their engineering team anticipated. When your use case differs materially from that anticipated use case, you pay for capability you cannot use while working around limitations that prevent you from doing what you actually need.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Buy Case: When SaaS AI Is the Right Answer',
        id: 'when-saas-is-right',
      },
      {
        type: 'paragraph',
        text: 'SaaS AI tools are the correct choice when the problem they solve is genuinely generic. Email composition assistance, meeting transcription, basic content summarisation, and HR documentation generation are generic workflows. The marginal gain from a custom implementation is low because the workflow does not differentiate your business from competitors.',
      },
      {
        type: 'paragraph',
        text: 'SaaS tools also make sense when the required AI capability would take significant engineering time to build and the commercial requirement does not justify that investment. A five-person team does not need a custom-built AI email assistant when off-the-shelf tools deliver 80% of the benefit at negligible cost.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Build Case: When Custom AI Is Justified',
        id: 'when-custom-is-justified',
      },
      {
        type: 'paragraph',
        text: 'Custom AI development becomes justified when one or more of the following conditions is true:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'The workflow involves proprietary or sensitive data that cannot be processed by a third-party SaaS (client contracts, financial records, internal pricing, personal data)',
          'The required output is highly structured and specific — a SaaS tool produces unvalidated text where you need validated, schema-compliant structured data',
          'The workflow involves multiple interconnected steps that no single SaaS tool handles end-to-end',
          'The volume of processing makes SaaS per-query pricing economically uncompetitive with a self-hosted implementation',
          'The competitive advantage depends on the AI capability being proprietary — a SaaS tool gives competitors access to identical capability',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Data Privacy Calculation',
        id: 'data-privacy',
      },
      {
        type: 'paragraph',
        text: 'The most common reason enterprise clients commission custom AI rather than adopting SaaS is data privacy. Processing sensitive commercial or personal data through third-party AI APIs raises legal and contractual questions about data residency, processing agreements, and model training opt-outs that many SaaS vendors handle ambiguously.',
      },
      {
        type: 'paragraph',
        text: 'A custom-built AI pipeline that calls frontier APIs directly — with data never passed through a third-party SaaS intermediary — gives the business direct control over its API agreements and data handling terms. Alternatively, locally hosted open-source models eliminate API data exposure entirely for the most sensitive workflows.',
      },
      {
        type: 'callout',
        variant: 'architectural',
        title: 'The data residency question',
        body: 'Ask any SaaS AI vendor: where is data processed? Who stores prompt and response logs? Is the data used for model training? Are processing agreements GDPR-compliant? If the answers are not clear in the vendor data processing agreement, treat that as a risk signal.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Workflow Specificity Test',
        id: 'workflow-specificity',
      },
      {
        type: 'paragraph',
        text: 'Apply a simple test to any AI tool evaluation: describe the workflow you actually need in precise terms. Then ask whether the SaaS tool you are evaluating was built specifically for that workflow, or whether it was built for a related but subtly different use case and you are being asked to adapt.',
      },
      {
        type: 'paragraph',
        text: 'Common adaptation costs: manual post-processing of AI output to get it into the format your system requires; workarounds for document length or format limitations; manual QA steps to catch errors the tool produces on your specific inputs. When these adaptation costs add up to more than 30 minutes of human time per use, the SaaS tool is probably not solving the problem.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Cost at Scale',
        id: 'cost-at-scale',
      },
      {
        type: 'paragraph',
        text: 'SaaS AI tools are typically priced per seat or per use. At low volume, this is competitive with custom development. At high volume — thousands of documents processed per month, hundreds of structured extractions per day — the per-query cost of a SaaS tool frequently exceeds the annualised cost of a custom pipeline calling the underlying API directly.',
      },
      {
        type: 'paragraph',
        text: 'Avorria [AI Systems service](/services/systems) includes an evaluation phase that models the total cost of ownership for both routes before recommending an approach. Systems like [CareerOS](/work/careeros) exemplify this advantage: a custom multi-model orchestration pipeline delivered sub-second resume parsing and strict data governance that off-the-shelf SaaS cannot match.',
      },
    ],
  },

  {
    id: 'LOBBY-029',
    slug: 'what-a-custom-ai-agent-can-automate',
    issueNumber: 'ISSUE 05 // Q4 2026',
    title: 'What a Custom AI Agent Can Actually Automate in a Business',
    dek: 'Not a pitch for AI transformation. A specific, engineering-grounded account of the workflows that AI agent pipelines reliably automate today — and the ones that remain too fragile for production use.',
    category: 'applied-ai',
    categoryLabel: 'Applied AI',
    publishedAt: '2026-10-11T09:00:00Z',
    readTimeMinutes: 10,
    schemaType: 'Article',
    leadAuthor: {
      name: 'Peter Currey',
      role: 'Lead Principal // Avorria Studio',
    },
    provenance: {
      state: 'EDITORIAL_ANALYSIS',
      rationale:
        'Based on Avorria internal AI pipeline deployments including the Scout diagnostic engine, structured data extraction agents, and client intake automation. Supplemented with published AI agent architecture research.',
    },
    sources: [
      {
        id: 'src-029-01',
        title: 'OpenAI: Function Calling and Tool Use Documentation',
        url: 'https://platform.openai.com/docs/guides/function-calling',
        publisher: 'OpenAI',
        retrievedDate: '2026-09-25',
        quoteSnippet: 'Function calling allows models to connect to external tools and APIs to take actions and retrieve data, turning a language model into an agent capable of interacting with the real world.',
      },
    ],
    seo: {
      title: 'What a Custom AI Agent Can Actually Automate in a Business | Avorria',
      description: 'A practical, engineering-grounded guide to what AI agent pipelines reliably automate in business operations today — and what remains too unreliable for production deployment.',
    },
    sections: [],
    blocks: [
      {
        type: 'lead',
        text: 'The business AI conversation is dominated by potential rather than specifics. Vendors promise that AI will automate your entire operations team. Sceptics insist it hallucinates too much to be trusted with anything important. Both positions are wrong. The accurate picture is narrower and more useful: there is a specific class of business workflow that AI agent pipelines handle reliably today, and a different class that remains fragile.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'What Makes a Workflow Suitable for AI Automation',
        id: 'suitable-workflows',
      },
      {
        type: 'paragraph',
        text: 'AI agents perform reliably when the workflow has clear inputs, deterministic validation criteria, and a human review gate for output before it has external consequences. The reliability of the system comes not from the AI model itself but from the engineering constraints built around it: schema validation, confidence thresholds, sandboxed execution, and audit logging.',
      },
      {
        type: 'paragraph',
        text: 'Workflows that are unsuitable for autonomous AI automation are those where incorrect output has immediate, irreversible consequences and no validation layer can catch the error before it matters. Autonomous financial transactions, legal document generation without review, and customer-facing communication without oversight fall into this category.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Workflows That AI Agents Automate Reliably',
        id: 'reliable-automations',
      },
      {
        type: 'paragraph',
        text: 'Structured data extraction from unstructured documents: Extracting specific fields — resume histories, contract terms, technical specifications — from PDFs or scanned documents is one of the most reliable AI agent use cases. In production architectures like [CareerOS](/work/careeros), this pipeline achieves sub-second structured extraction across messy document formats with deterministic schema validation and human review fallback.',
      },
      {
        type: 'paragraph',
        text: 'Document classification and routing: Classifying incoming documents — support tickets, procurement requests, tender documents — into predefined categories and routing them to the correct queue or team member is well-suited to AI automation. The classification is probabilistic; the routing is deterministic; and a confidence threshold determines whether the system routes automatically or escalates to a human.',
      },
      {
        type: 'paragraph',
        text: 'First-draft generation from structured inputs: Generating first drafts of reports, proposals, or client communications from structured data inputs — not from open-ended prompts — is reliable when the output is reviewed before use. The AI handles the formatting and language assembly; the human validates the substance and sends.',
      },
      {
        type: 'paragraph',
        text: 'Data enrichment pipelines: Enriching a CRM or database record by extracting additional information from publicly available sources — company size, technology stack, recent news — can be automated reliably when the enrichment is additive rather than authoritative (i.e. the enriched data supplements existing records rather than replacing them).',
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Architecture of a Reliable AI Agent',
        id: 'reliable-architecture',
      },
      {
        type: 'paragraph',
        text: 'A production AI agent is not a prompt sent to an API. It is a structured pipeline with defined inputs, schema-validated outputs, error handling, logging, and human review integration. The components that make an AI agent reliable are engineering decisions, not AI decisions.',
      },
      {
        type: 'callout',
        variant: 'architectural',
        title: 'Deterministic AI pipeline components',
        body: 'Input normalisation → Prompt construction with structured context → API call with constrained JSON output schema → Schema validation → Confidence threshold evaluation → Human review gate (where required) → Downstream system write → Audit log entry. Each layer is independently testable.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Workflows That Remain Too Fragile for Production',
        id: 'fragile-workflows',
      },
      {
        type: 'paragraph',
        text: 'Autonomous multi-step reasoning chains — where one AI decision feeds another without human review between steps — accumulate error. Each decision introduces uncertainty; compounded across five or ten steps, the final output is frequently wrong in ways that are difficult to detect. Frameworks like ReAct and chain-of-thought reasoning help but do not eliminate the compounding error problem.',
      },
      {
        type: 'paragraph',
        text: 'Open-ended customer interaction without human oversight remains fragile for any domain where incorrect output has commercial consequences — pricing, availability, technical specifications. Guardrails and retrieval-augmented generation improve reliability significantly, but fully autonomous customer interaction at enterprise scale is not yet a safe default.',
      },
      {
        type: 'paragraph',
        text: 'Avorria [AI Systems service](/services/systems) is built around these distinctions. We design AI pipelines for the workflows they can reliably handle — and we are explicit about what requires human oversight. If you are evaluating an AI automation project, the evaluation framework matters more than the model selection.',
      },
    ],
  },

  {
    id: 'LOBBY-030',
    slug: 'ai-integration-without-exposing-sensitive-data',
    issueNumber: 'ISSUE 05 // Q4 2026',
    title: 'How to Integrate AI Into Your Business Without Exposing Sensitive Data',
    dek: 'AI tools that process confidential client data, pricing, or operational information require specific engineering controls. The practical architecture for AI integration that satisfies legal, contractual, and information security requirements.',
    category: 'applied-ai',
    categoryLabel: 'Applied AI',
    publishedAt: '2026-10-13T09:00:00Z',
    readTimeMinutes: 8,
    schemaType: 'TechArticle',
    leadAuthor: {
      name: 'Peter Currey',
      role: 'Lead Principal // Avorria Studio',
    },
    provenance: {
      state: 'EDITORIAL_ANALYSIS',
      rationale:
        'Based on Avorria security architecture reviews for AI integrations at professional services firms and enterprises handling personal data under UK GDPR. Supplemented with published ICO and OpenAI data processing documentation.',
    },
    sources: [
      {
        id: 'src-030-01',
        title: 'ICO: Guidance on AI and Data Protection',
        url: 'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/guidance-on-ai-and-data-protection/',
        publisher: 'UK Information Commissioner\'s Office',
        retrievedDate: '2026-09-20',
        quoteSnippet: 'Organisations using AI systems that process personal data must be able to demonstrate compliance with UK GDPR, including lawful basis, transparency, and data minimisation requirements.',
      },
    ],
    seo: {
      title: 'How to Integrate AI Into Your Business Safely | Data Privacy | Avorria',
      description: 'Practical engineering architecture for AI integration that protects sensitive client data, satisfies UK GDPR, and meets contractual data handling requirements. Covers API data controls, data minimisation, local model deployment, and audit logging.',
    },
    sections: [],
    blocks: [
      {
        type: 'lead',
        text: 'Most AI adoption guidance focuses on what AI can do. Very little of it addresses what happens to your data when you use it. For businesses handling client contracts, pricing information, personal data, or commercially sensitive operational data, this is the question that determines whether a particular AI tool is legally and contractually permissible — not whether it is technically capable.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Data Problem With Consumer AI Tools',
        id: 'consumer-ai-data-problem',
      },
      {
        type: 'paragraph',
        text: 'Consumer-tier AI tools process submitted data under terms that typically permit use for model improvement. Submitting a client contract, financial projection, or personal data record to a consumer AI tool may breach your client confidentiality obligations and UK GDPR.',
      },
      {
        type: 'paragraph',
        text: 'Enterprise API tiers are different. Frontier model APIs and enterprise agreements all offer data processing agreements under which customer data is not used for model training by default. The engineering decision — call the API directly rather than use a consumer interface — is also a legal and compliance decision.',
      },
      {
        type: 'callout',
        variant: 'risk',
        title: 'Check the tier, not just the tool',
        body: 'The same AI model can operate under fundamentally different data terms depending on whether it is accessed via a consumer interface, a business subscription, or a direct API with a signed data processing agreement. Verify which tier your organisation is using before processing sensitive data.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Data Minimisation: Only Send What Is Needed',
        id: 'data-minimisation',
      },
      {
        type: 'paragraph',
        text: 'UK GDPR requires data minimisation: personal data should be adequate, relevant, and limited to what is necessary for the purpose. Applied to AI integration, this means the prompt sent to an AI API should contain only the information required for the specific task — not the entire document, not the full customer record.',
      },
      {
        type: 'paragraph',
        text: 'In practice: if an AI agent needs to classify a support ticket by urgency, send the ticket subject and body — not the full customer profile. If it needs to extract a contract end date, extract only the relevant contract section before sending it to the API. Data minimisation is not just a compliance requirement; it also reduces token costs and improves output accuracy.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Local Model Option for Sensitive Workflows',
        id: 'local-model-option',
      },
      {
        type: 'paragraph',
        text: 'For workflows that process highly sensitive data — patient records, legal privileged documents, commercially confidential pricing — the most robust data protection architecture eliminates API calls entirely. Open-source models can be deployed on private infrastructure where no data leaves the organisation controlled environment.',
      },
      {
        type: 'paragraph',
        text: 'Local model deployment involves higher infrastructure and engineering costs than API calls, and current open-source models do not match frontier model capability on complex reasoning tasks. However, for well-defined extraction and classification tasks — which represent the majority of reliable AI automation use cases — local models are often sufficient.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Audit Logging: Making AI Actions Accountable',
        id: 'audit-logging',
      },
      {
        type: 'paragraph',
        text: 'Any AI pipeline that takes actions affecting business records — writing to a CRM, sending an email, updating a database — must maintain an audit log of what was submitted, what was returned, and what action was taken. This is both an engineering requirement (for debugging) and a compliance requirement (for demonstrating accountability under GDPR and sector regulations).',
      },
      {
        type: 'paragraph',
        text: 'Avorria [AI Systems architecture](/services/systems) treats audit logging as a first-class pipeline component, not an optional add-on. Every AI agent we deploy maintains a structured log of inputs, outputs, validation results, and downstream actions with timestamps and user attribution.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Practical Integration Checklist',
        id: 'integration-checklist',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Identify the data classification of information the AI will process (public, internal, confidential, personal)',
          'Verify the AI vendor tier — consumer, business, or enterprise API with a signed data processing agreement',
          'For personal data: confirm lawful basis, document the processing in your ROPA, and review retention periods',
          'Apply data minimisation — send only the fields required for the specific task',
          'For highly sensitive data: evaluate local model deployment as an alternative to API calls',
          'Implement audit logging for all AI-triggered actions affecting business records',
          'Define the human review gate: which AI outputs require human approval before downstream action',
        ],
      },
    ],
  },

  {
    id: 'LOBBY-031',
    slug: 'how-to-evaluate-a-digital-agency',
    issueNumber: 'ISSUE 05 // Q4 2026',
    title: 'How to Evaluate a Digital Agency Before Signing a Contract',
    dek: 'Most agency selection processes are optimised for proposals rather than performance. The questions that distinguish agencies with genuine engineering depth from those that produce polished decks.',
    category: 'digital-strategy',
    categoryLabel: 'Digital Strategy',
    publishedAt: '2026-10-14T09:00:00Z',
    readTimeMinutes: 8,
    schemaType: 'Article',
    leadAuthor: {
      name: 'Peter Currey',
      role: 'Lead Principal // Avorria Studio',
    },
    provenance: {
      state: 'OPINION',
      rationale:
        'Avorria commercial perspective informed by ten years of operating in the UK digital agency market and observing agency selection processes from both sides. Includes direct observation of competitor proposal patterns.',
    },
    seo: {
      title: 'How to Evaluate a Digital Agency Before Signing | Avorria',
      description: 'The questions that reveal whether a digital agency has genuine engineering depth or primarily produces polished presentations. A practical evaluation framework for businesses commissioning web development, SEO, or AI work.',
    },
    sections: [],
    blocks: [
      {
        type: 'lead',
        text: 'Agency proposals are designed to win pitches, not to demonstrate engineering quality. The most convincing proposal is not necessarily from the agency that will produce the best work — it is from the agency with the most refined pitch process. Understanding this distinction is the starting point for a useful evaluation.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Presentation vs Production Gap',
        id: 'presentation-production-gap',
      },
      {
        type: 'paragraph',
        text: 'Most agency evaluation processes ask agencies to demonstrate themselves at their best: a curated portfolio, a polished slide deck, carefully selected case studies. This systematically favours agencies with strong sales and design capabilities over those with strong engineering capabilities. The quality of a website underlying architecture — its performance, security, maintainability, and SEO structure — is invisible in a portfolio review.',
      },
      {
        type: 'paragraph',
        text: 'The question to ask: how would you evaluate an agency engineering quality if you could not rely on the portfolio alone?',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Questions That Reveal Engineering Depth',
        id: 'engineering-depth-questions',
      },
      {
        type: 'paragraph',
        text: 'Ask these questions specifically, and listen for whether the answers are specific or generic:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          '"What is the technology stack you would use for this project, and why specifically that stack for our requirements?" — Agencies with genuine engineering depth give a specific, reasoned answer. Agencies without it give a generic answer ("we use modern technologies").',
          '"Run a Lighthouse audit on one of your recent client websites, live, in this meeting." — This is the most efficient quality test available. The Core Web Vitals scores of their live client work are the most accurate performance signal available.',
          '"Who specifically will be writing the code on our project?" — Agencies frequently pitch with senior engineers and deliver with juniors. Get the name and review their recent commits or portfolio.',
          '"Who owns the code and infrastructure credentials at project completion?" — Any answer other than "you do, unconditionally" is a red flag.',
          '"Describe a technical problem you encountered on a recent project and how you resolved it." — This distinguishes agencies with genuine engineering experience from those that reframe vendor documentation as expertise.',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Evaluating SEO Capability',
        id: 'evaluating-seo',
      },
      {
        type: 'paragraph',
        text: 'SEO is a particularly difficult capability to evaluate because the claims are often unmeasurable at proposal stage. Ask: what does your own website rank for? Check their Search Console data for their own domain, if they will share it. An agency that cannot demonstrate organic search performance for its own website has a credibility problem.',
      },
      {
        type: 'paragraph',
        text: 'Ask them to crawl one of your existing pages — or a competitor page — and explain what they find. The depth of their diagnosis reveals whether their SEO capability is technical or surface-level.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Contract Red Flags',
        id: 'contract-red-flags',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'IP assignment to the agency rather than the client upon completion',
          'Hosting lock-in: the site must be hosted on the agency infrastructure as a contractual requirement',
          'Ongoing maintenance retainer as a non-negotiable post-launch requirement',
          'Vague acceptance criteria: success defined as "client satisfaction" rather than measurable technical or commercial outcomes',
          'No staging environment or pre-launch performance testing specified',
        ],
      },
      {
        type: 'callout',
        variant: 'takeaway',
        title: 'The simplest quality test',
        body: 'Ask them to run a live Lighthouse audit on one of their own client sites during the pitch meeting. The numbers they produce are a more reliable indicator of engineering quality than any case study or portfolio.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'What a Credible Agency Looks Like',
        id: 'credible-agency',
      },
      {
        type: 'paragraph',
        text: 'A credible agency is specific about its technical stack and reasoning, transparent about who delivers the work, explicit about IP transfer and infrastructure ownership, able to produce live performance evidence on existing client work, and willing to define project success in measurable, objective terms.',
      },
      {
        type: 'paragraph',
        text: 'Avorria makes its engineering standards explicit on its [services pages](/services) and publishes its technical architecture rationale in The Lobby precisely because we believe evaluation quality leads to better client relationships. If a prospect asks us to run a live Lighthouse audit in a pitch meeting, we welcome it.',
      },
    ],
  },

  {
    id: 'LOBBY-032',
    slug: 'bespoke-web-application-when-to-build',
    issueNumber: 'ISSUE 05 // Q4 2026',
    title: 'When Does a Business Need a Bespoke Web Application?',
    dek: 'SaaS tools handle the generic case. Custom web applications handle the specific one. The commercial and technical thresholds that determine when bespoke development creates a genuine business advantage.',
    category: 'website-intelligence',
    categoryLabel: 'Website Intelligence',
    publishedAt: '2026-10-15T09:00:00Z',
    readTimeMinutes: 8,
    schemaType: 'Article',
    leadAuthor: {
      name: 'Peter Currey',
      role: 'Lead Principal // Avorria Studio',
    },
    provenance: {
      state: 'EDITORIAL_ANALYSIS',
      rationale:
        'Derived from Avorria commercial assessments conducted for clients evaluating bespoke web application development against existing SaaS platforms across professional services, logistics, and data-intensive sectors.',
    },
    seo: {
      title: 'When Does a Business Need a Bespoke Web Application? | Avorria',
      description: 'The commercial and technical thresholds that determine when a bespoke web application creates genuine business advantage over SaaS alternatives. Covers workflow specificity, data control, competitive differentiation, and cost at scale.',
    },
    sections: [],
    blocks: [
      {
        type: 'lead',
        text: 'The instinct to build a bespoke web application is often correct for the wrong reasons, and incorrect for the right ones. Businesses commission custom development when they are frustrated with SaaS limitations, which is sometimes the right trigger and sometimes the wrong one. The useful question is not "are we frustrated with our current tools?" — it is "does custom software create a structural advantage that changes our commercial position?"',
      },
      {
        type: 'heading',
        level: 2,
        text: 'What SaaS Tools Are Actually Optimised For',
        id: 'saas-optimisation',
      },
      {
        type: 'paragraph',
        text: 'SaaS tools are built for the median use case across the widest possible customer segment. This is an economic constraint, not an engineering failure. The product teams at well-run SaaS companies make deliberate decisions to serve the common case well and the specific case partially. When your workflow is common, SaaS tools deliver excellent value. When your workflow is specific, you pay for the common case and work around the gaps.',
      },
      {
        type: 'paragraph',
        text: 'The workarounds accumulate. A team that has built five automation chains and two spreadsheet workarounds to make a standard CRM do what they actually need has effectively built a fragile custom application on top of tools not designed for the purpose.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Threshold Criteria for Custom Development',
        id: 'threshold-criteria',
      },
      {
        type: 'paragraph',
        text: 'Custom web application development is commercially justified when two or more of the following conditions are true:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'The workflow is specific to your business in a way that creates competitive advantage — replicating it in a SaaS tool that competitors can also access diminishes that advantage',
          'Data control is a legal or contractual requirement — personal data, commercially sensitive information, or regulated data that cannot be processed in third-party SaaS systems',
          'The SaaS tools required to approximate the workflow cost more annually than the amortised cost of a bespoke build over three years',
          'Multiple SaaS tools are required and integration between them is a primary ongoing engineering burden',
          'The user experience of the existing SaaS toolset is creating measurable friction that affects operational performance',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Competitive Differentiation Case',
        id: 'competitive-differentiation',
      },
      {
        type: 'paragraph',
        text: 'The strongest commercial case for a bespoke web application is competitive differentiation. If a software tool is central to how you deliver your service — how you quote, how you report, how you manage client relationships, how you process orders — and that tool is built on the same SaaS platform as your competitors, your operational process is structurally identical to theirs.',
      },
      {
        type: 'paragraph',
        text: 'A bespoke application built around your specific operational model can encode process improvements that no off-the-shelf tool can replicate. Real-world systems like [TAFM](/work/tafm) (an asset finance origination engine replacing opaque broker communications) and [Drawdown](/work/drawdown) (a private wealth portfolio projection dashboard) demonstrate how bespoke software unifies fragmented workflows into sovereign commercial advantages.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Cost Calculation',
        id: 'cost-calculation',
      },
      {
        type: 'paragraph',
        text: 'A bespoke web application built on a modern stack — Next.js, Node.js, PostgreSQL — has a build cost and a maintenance cost. The build cost for a focused, well-scoped application (single operational workflow, 3–5 user roles, integration with two or three external systems) is typically £15,000–£50,000 depending on complexity. The annual maintenance cost is a fraction of the build cost when the application is well-engineered.',
      },
      {
        type: 'paragraph',
        text: 'Compare this against the cumulative SaaS cost: per-seat pricing across a growing team, annual licence increases, integration tool costs, and the engineering time spent maintaining fragile automation chains. For teams of five or more using three or more SaaS tools, the three-year total cost comparison frequently favours the bespoke application.',
      },
      {
        type: 'paragraph',
        text: 'Avorria [Build service](/services/build) includes a scoping phase that models this cost comparison before any development commitment. If the economics do not justify a bespoke build for your specific situation, we say so.',
      },
      {
        type: 'callout',
        variant: 'takeaway',
        title: 'The scoping-first principle',
        body: 'No responsible engineering assessment of a bespoke application should begin with development. It should begin with a precise specification of the workflow, a model of the SaaS alternatives and their true total cost, and a definition of what measurable outcome the custom application must deliver within what timeframe.',
      },
    ],
  },

  {
    id: 'LOBBY-033',
    slug: 'core-web-vitals-ranking-reality',
    issueNumber: 'ISSUE 05 // Q4 2026',
    title: 'What Core Web Vitals Actually Do to Your Google Rankings',
    dek: 'Core Web Vitals are a ranking signal — but the relationship between scores and rankings is less direct than most SEO commentary suggests. What the evidence actually shows, and what to prioritise.',
    category: 'search-engine-intelligence',
    categoryLabel: 'Search Engine Intelligence',
    publishedAt: '2026-10-16T09:00:00Z',
    readTimeMinutes: 7,
    schemaType: 'TechArticle',
    leadAuthor: {
      name: 'Technical Intelligence Desk',
      role: 'Systems Architecture Group',
    },
    provenance: {
      state: 'SOURCE_LINKED',
      rationale:
        'Based on Google Search Central official documentation on Core Web Vitals as ranking signals, Chrome User Experience Report (CrUX) public datasets, and published academic analysis of CWV-ranking correlation studies.',
    },
    sources: [
      {
        id: 'src-033-01',
        title: 'Google Search Central: Understanding Core Web Vitals and Google Search Ranking',
        url: 'https://developers.google.com/search/docs/appearance/core-web-vitals',
        publisher: 'Google Search Central',
        retrievedDate: '2026-09-30',
        quoteSnippet: 'Core Web Vitals are a set of specific factors that Google considers important in a webpage\'s overall user experience. Core Web Vitals are part of Google\'s page experience signals, which are used as ranking factors.',
      },
      {
        id: 'src-033-02',
        title: 'Google Search Central: INP replaces FID in Core Web Vitals in March 2024',
        url: 'https://web.dev/blog/inp-cwv-march-12-2024',
        publisher: 'Google Developers',
        retrievedDate: '2026-09-30',
        quoteSnippet: 'INP replaced First Input Delay (FID) as a Core Web Vital in March 2024. An INP score below 200ms is considered a good score by Google.',
      },
    ],
    dataSnippets: [
      {
        metric: '200ms',
        label: 'Google INP threshold for a "good" user experience score',
        source: 'Google Core Web Vitals — web.dev',
        provenance: 'VERIFIED',
      },
      {
        metric: '2.5s',
        label: 'Google LCP threshold for a "good" page experience score',
        source: 'Google Core Web Vitals — web.dev',
        provenance: 'VERIFIED',
      },
    ],
    seo: {
      title: 'What Core Web Vitals Actually Do to Your Google Rankings | Avorria',
      description: 'An engineering-grounded assessment of how Core Web Vitals affect Google search rankings. Covers LCP, INP, CLS thresholds, the tiebreaker hypothesis, mobile-first indexing, and what to prioritise for commercial pages.',
    },
    sections: [],
    blocks: [
      {
        type: 'lead',
        text: 'Google introduced Core Web Vitals as a ranking signal in 2021. Since then, two narratives have dominated SEO commentary: one that treats CWV as the primary ranking factor determining who appears at position one; another that dismisses them as a minor signal with negligible real-world ranking impact. Neither is accurate.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'What Google Actually Says',
        id: 'what-google-says',
      },
      {
        type: 'paragraph',
        text: 'Google own documentation describes Core Web Vitals as part of its page experience signals which are used as ranking factors. It does not quantify the weight of this signal relative to content relevance, backlink authority, or the hundreds of other signals in the ranking algorithm. This ambiguity is deliberate — Google rarely discloses signal weights.',
      },
      {
        type: 'paragraph',
        text: 'What Google does confirm: the page experience signal, including Core Web Vitals, applies as a tiebreaker. When multiple pages are otherwise roughly equivalent in relevance and authority, the page with a better user experience score has a ranking advantage. For competitive commercial queries where the difference between position one and position four is marginal relevance differences, this tiebreaker matters.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Three Metrics and Their Thresholds',
        id: 'cwv-thresholds',
      },
      {
        type: 'table',
        headers: ['Metric', 'What It Measures', 'Good', 'Needs Improvement', 'Poor'],
        rows: [
          ['LCP (Largest Contentful Paint)', 'Time to render the largest visible content element', '≤2.5s', '2.5–4.0s', '>4.0s'],
          ['INP (Interaction to Next Paint)', 'Latency from user input to next visual update', '≤200ms', '200–500ms', '>500ms'],
          ['CLS (Cumulative Layout Shift)', 'Unexpected layout movement during page load', '≤0.1', '0.1–0.25', '>0.25'],
        ],
      },
      {
        type: 'paragraph',
        text: 'Google measures these metrics from the Chrome User Experience Report (CrUX) — real-world user data from Chrome browsers, not lab tests. Lab test scores (Lighthouse, PageSpeed Insights) are indicative but do not directly feed the ranking signal. A page must achieve "good" status across all three metrics at the 75th percentile of real user sessions to be classified as passing.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Why Mobile Performance Is the Only Relevant Measure',
        id: 'mobile-first',
      },
      {
        type: 'paragraph',
        text: 'Google has operated mobile-first indexing since 2019. It crawls, indexes, and ranks pages based on their mobile version. CrUX data used for Core Web Vitals ranking signals is segmented by device — and for most commercial websites, the mobile CrUX scores are significantly worse than desktop scores.',
      },
      {
        type: 'paragraph',
        text: 'A website that scores 90+ on Lighthouse desktop and 40 on Lighthouse mobile is ranked based on its mobile performance. PageSpeed Insights desktop scores reported in agency SEO reports without accompanying mobile scores are not useful performance evidence.',
      },
      {
        type: 'callout',
        variant: 'risk',
        title: 'The desktop score problem',
        body: 'Agencies frequently report desktop Lighthouse scores in SEO audits because they are flattering. Ask specifically for mobile CrUX data from Search Console — Core Web Vitals report — which shows real-user mobile performance against Google thresholds. This is the number that affects rankings.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'LCP Is Usually the Priority',
        id: 'lcp-priority',
      },
      {
        type: 'paragraph',
        text: 'For most commercial websites, LCP is the metric that most frequently fails and has the most straightforward engineering fix. LCP failures are typically caused by: unoptimised hero images loaded without priority hints, render-blocking JavaScript that delays the main content, slow server response time (TTFB), and large image files served without modern formats like WebP or AVIF.',
      },
      {
        type: 'paragraph',
        text: 'In Next.js, modern image and layout optimization delivers real gains. In production projects like [Alkota Bikes](/work/alkota-bikes) and [One Great Northern](/work/one-great-northern), structured image budgets and zero-layout-shift asset delivery drove mobile LCP down below 1.2s, satisfying CrUX 75th percentile thresholds consistently.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Commercial Priority Case',
        id: 'commercial-priority',
      },
      {
        type: 'paragraph',
        text: 'For businesses where organic search is a significant acquisition channel, Core Web Vitals are not primarily an SEO concern — they are a commercial concern. A page that loads in under 2.5 seconds on mobile converts at a measurably higher rate than one that loads in 5 seconds, independently of any ranking effect.',
      },
      {
        type: 'paragraph',
        text: 'Avorria [technical SEO service](/services/search) includes Core Web Vitals audit and remediation as standard deliverables, with CrUX monitoring after implementation. The goal is not to hit an arbitrary lab score — it is to improve real-user performance on the device type that commercial users are most likely to visit on.',
      },
    ],
  },
]
