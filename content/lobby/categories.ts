import type { LobbyCategory } from '@/types/lobby'

export const LOBBY_CATEGORIES: LobbyCategory[] = [
  {
    slug: 'teardowns',
    label: 'Teardowns',
    shortDescription: 'Forensic architecture & UX failure diagnostics',
    longDescription:
      'Objective, observable dissections of why high-budget corporate digital platforms break down in production, and how architectural engineering corrects them.',
  },
  {
    slug: 'digital-strategy',
    label: 'Digital Strategy',
    shortDescription: 'Commercial models, capital discipline & agency contracts',
    longDescription:
      'Deep investigations into studio economics, fixed-scope engineering sprints versus cost-plus time-and-materials, and software sovereignty for scaling enterprises.',
  },
  {
    slug: 'website-intelligence',
    label: 'Website Intelligence',
    shortDescription: 'TTFB, latency forensics & modern tech stacks',
    longDescription:
      'Technical telemetry covering server-side rendering, edge compute, database bottlenecks, and the structural debt of monolithic CMS platforms.',
  },
  {
    slug: 'search-engine-intelligence',
    label: 'Search Engine Intelligence',
    shortDescription: 'Google core algorithmic shifts & crawl dynamics',
    longDescription:
      'Empirical analysis of Google indexation behaviour, Core Web Vitals mandates (INP, LCP), and the technical requirements for programmatic discovery.',
  },
  {
    slug: 'platform-shifts',
    label: 'Platform Shifts',
    shortDescription: 'Meta algorithms, ad auctions & attribution',
    longDescription:
      'Deconstructing paid social machine-learning changes, creative fatigue mechanics, and the infrastructure needed to support Advantage+ campaigns.',
  },
  {
    slug: 'applied-ai',
    label: 'Applied AI',
    shortDescription: 'Deterministic agent pipelines & operational utility',
    longDescription:
      'Cutting past generative hype into verifiable business automation, structured schema outputs, and enterprise data extraction pipelines.',
  },
  {
    slug: 'field-memos',
    label: 'Field Memos',
    shortDescription: 'Direct guidance for founders & engineering leaders',
    longDescription:
      'Concise, practical notes from the Avorria engineering desk addressing scoping friction, vendor evaluation, and digital risk mitigation.',
  },
  {
    slug: 'studio-dispatch',
    label: 'Studio Dispatch',
    shortDescription: 'Avorria engineering log, benchmarks & releases',
    longDescription:
      'Internal dispatches from the Avorria workshop detailing release logs, open tooling, research experiments, and studio milestones.',
  },
]
