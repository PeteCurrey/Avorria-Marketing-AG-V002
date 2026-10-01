/**
 * Avorria — Editorial Investigation Series: Websites We Would Fire
 *
 * An expandable critical series analyzing observable digital failures.
 * Non-defamatory, intelligent, precise, and structurally focused.
 */

export interface ObservableDefect {
  title: string
  observableSymptom: string
  structuralMechanism: string
  architecturalRemedy: string
}

export interface FiredArchetype {
  id: string
  slug: string
  sequence: string
  category:
    | 'INFORMATION_HIERARCHY'
    | 'CONVERSION_ARCHITECTURE'
    | 'TECHNICAL_PERFORMANCE'
    | 'NAVIGATION_ACCESSIBILITY'
    | 'MOBILE_EXPERIENCE'
    | 'CONTENT_STRUCTURE'
  title: string
  shortLabel: string
  synopsis: string
  thesis: string
  observableDefects: ObservableDefect[]
  tolerancesViolated: string[]
  prescribedStandard: string
}

export const FIRED_ARCHETYPES: FiredArchetype[] = [
  {
    id: 'hero-carousel-decay',
    slug: 'the-hero-carousel-decay',
    sequence: '01',
    category: 'INFORMATION_HIERARCHY',
    title: 'The Multi-Slide Hero Carousel',
    shortLabel: 'HERO CAROUSEL',
    synopsis:
      'Five auto-rotating marketing banners competing for viewport attention while destroying Largest Contentful Paint.',
    thesis:
      'The auto-rotating carousel is rarely a design decision; it is an organizational surrender. When internal committees cannot agree on a primary value proposition, they rotate everything. In practice, eye-tracking studies consistently confirm that fewer than 1% of visitors interact past the initial frame, while the continuous layout shift destroys Core Web Vitals.',
    observableDefects: [
      {
        title: 'Conflicting Viewport Messaging',
        observableSymptom: 'Four distinct value propositions cycle every 4.5 seconds with disparate headings.',
        structuralMechanism: 'Prevents cognitive anchoring. A visitor scanning on desktop or mobile cannot digest the business premise before the surface slides out from beneath them.',
        architecturalRemedy: 'A single monolithic Work Sans 200 statement establishing unambiguous company competence within 1.2 seconds of initial render.',
      },
      {
        title: 'Severe LCP & Paint Degradation',
        observableSymptom: 'Multiple high-resolution image assets loaded eagerly into browser memory to prepare for slide transitions.',
        structuralMechanism: 'Browser network queues are saturated pre-loading frames that 99% of visitors will never inspect, delaying primary DOM rendering.',
        architecturalRemedy: 'A single, static, highly optimized architectural aperture image or WebGL canvas gated to intersection visibility.',
      },
    ],
    tolerancesViolated: [
      'Largest Contentful Paint > 2.5s',
      'Cumulative Layout Shift > 0.1',
      'Cognitive Load Index: Extreme Saturation',
    ],
    prescribedStandard: 'One authoritative headline. One primary commercial action. Zero mechanical carousel distraction.',
  },
  {
    id: 'generalist-agency-maze',
    slug: 'the-generalist-agency-maze',
    sequence: '02',
    category: 'CONTENT_STRUCTURE',
    title: 'The Generalist Capabilities Maze',
    shortLabel: 'CAPABILITIES MAZE',
    synopsis:
      'Thirty-five services listed across four dropdown tiers, signaling zero domain depth and diluting search equity.',
    thesis:
      'Websites that attempt to offer every conceivable digital service suffer from the generalist trap. When an enterprise prospect lands on a domain offering social media management, enterprise ERP migration, branding workshops, and custom Web3 contracts simultaneously, they immediately discount senior competence.',
    observableDefects: [
      {
        title: 'Lack of Definitive Client Profiling',
        observableSymptom: 'Service pages filled with generic marketing copy that could apply to any business in any sector.',
        structuralMechanism: 'Broad positioning leads to diffuse organic search signals, high bounce rates from qualified decision-makers, and low deal margins.',
        architecturalRemedy: 'Ruthless taxonomy consolidation into three rigorous technical disciplines: Build, Search, Systems.',
      },
      {
        title: 'Bloated Navigation Topography',
        observableSymptom: 'Navigation menus requiring three levels of hover cascades, rendering mobile interaction nearly impossible.',
        structuralMechanism: 'Creates touch-target overlap and focus-trap violations on touch devices and screen readers.',
        architecturalRemedy: 'Flat, architectural header navigation with direct access to primary portfolio archives and commercial specifications.',
      },
    ],
    tolerancesViolated: [
      'WCAG 2.2 Accessible Tap Targets (< 44px)',
      'Search Intent Precision: Undifferentiated',
      'Navigation Hierarchy Depth > 2 Levels',
    ],
    prescribedStandard: 'Specialist engineering posture. Concise capability matrices backed by audited deliverables.',
  },
  {
    id: 'award-bait-preloader',
    slug: 'the-award-bait-preloader',
    sequence: '03',
    category: 'TECHNICAL_PERFORMANCE',
    title: 'The Award-Bait Preloader Trap',
    shortLabel: 'AWARD PRELOADER',
    synopsis:
      'Custom cursor lags, full-screen load screens, and heavy 3D scenes that prioritise agency ego over user comprehension.',
    thesis:
      'There is a persistent confusion in the design industry between technical capability and decorative excess. Websites engineered to impress design award juries frequently inflict 8-second loading screens, custom cursor momentum that breaks native OS accessibility, and heavy shader loops that trigger thermal throttling on mobile devices.',
    observableDefects: [
      {
        title: 'Artificial Latency Barriers',
        observableSymptom: 'Forced 0% to 100% numerical counter barring user interaction while arbitrary scripts initialize.',
        structuralMechanism: 'Replaces instant server-rendered HTML with client-side JavaScript execution cascades, destroying search indexing and mobile retention.',
        architecturalRemedy: 'Server-first App Router architecture where initial HTML paints immediately without client JavaScript dependencies.',
      },
      {
        title: 'Accessibility Hijacking',
        observableSymptom: 'Native browser scrollbars, mouse acceleration, and keyboard tab focus replaced by non-standard JavaScript listeners.',
        structuralMechanism: 'Breaks assistive technologies, disables native trackpad gestures, and introduces unacceptable input latency.',
        architecturalRemedy: 'Subordinate motion architecture. Pure CSS transforms, hardware-accelerated RAF listeners, and instant reduced-motion overrides.',
      },
    ],
    tolerancesViolated: [
      'First Input Delay / INP > 200ms',
      'Native Input Mechanics Overwritten',
      'Total Blocking Time > 500ms',
    ],
    prescribedStandard: 'Motion exists only to guide attention or clarify spatial hierarchy. Scarcity creates value.',
  },
  {
    id: 'wall-of-text-zero-proof',
    slug: 'the-wall-of-text-zero-proof',
    sequence: '04',
    category: 'CONVERSION_ARCHITECTURE',
    title: 'The Wall-of-Text Unverified Pitch',
    shortLabel: 'ZERO PROOF',
    synopsis:
      '4,000 words of self-congratulatory corporate prose unanchored by technical specifications or verified outcomes.',
    thesis:
      'Corporate buyers do not read generic marketing manifestos; they scan for verifiable competence. Websites filled with unsubstantiated superlatives ("revolutionary", "world-class", "bespoke excellence") without disclosing real architecture, case studies, or operational constraints instantly trigger skepticism among senior executives.',
    observableDefects: [
      {
        title: 'Absence of Factual Telemetry',
        observableSymptom: 'Vague promises of growth without describing the technology stack, delivery timeline, or architectural constraints.',
        structuralMechanism: 'Fails to address technical risk. Senior buyers cannot assess feasibility or compatibility with their existing systems.',
        architecturalRemedy: 'High-density analytical ledgers detailing exact technology, delivery SLAs, and verifiable qualitative evidence.',
      },
      {
        title: 'Fabricated Social Proof',
        observableSymptom: 'Anonymous quote cards attributed to "John D., Tech Founder" claiming "+300% ROI in 30 days".',
        structuralMechanism: 'Destroys brand credibility. Savvy institutional clients immediately identify templated marketing stubs.',
        architecturalRemedy: 'Strict data provenance states: verified case studies with disclosed client identities, sectors, and audited evidence.',
      },
    ],
    tolerancesViolated: [
      'Data Integrity Invariant: Unverified Claims',
      'Scannability Index: Low',
      'Commercial Transparency: Obscured',
    ],
    prescribedStandard: 'Factual engineering ledgers. If data does not exist, accommodate verified evidence rather than inventing it.',
  },
]

export function getFiredArchetypes(): FiredArchetype[] {
  return FIRED_ARCHETYPES
}

export function getFiredArchetypeBySlug(slug: string): FiredArchetype | undefined {
  return FIRED_ARCHETYPES.find((a) => a.slug === slug)
}
