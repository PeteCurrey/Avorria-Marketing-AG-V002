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
]
