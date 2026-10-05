/**
 * Avorria — Case Study & Work Architecture Types
 *
 * Grounded in editorial investigation principles.
 * Rigorous provenance tracking: verified | partially verified | draft | internal.
 */

export type DataProvenanceState =
  | 'verified'           // Fully audited, publicly deliverable, verifiable facts only
  | 'partially_verified' // Preliminary facts confirmed, awaiting final commercial sign-off
  | 'draft'              // Internal draft, not displayed publicly
  | 'internal'           // Internal proprietary engineering, restricted view

export type ChapterType =
  | 'CONTEXT'
  | 'PROBLEM'
  | 'INTERVENTION'
  | 'SYSTEM'
  | 'DESIGN'
  | 'TECHNOLOGY'
  | 'OUTCOME'
  | 'EVIDENCE'
  | 'SPLIT'
  | 'INTERFACE'
  | 'PROCESS'

export interface CaseStudyMedia {
  id: string
  type: 'IMAGE' | 'INTERFACE' | 'SCHEMATIC' | 'DIAGRAM' | 'VIDEO'
  /** Absolute path under /public — e.g. /images/projects/alkota-bikes/gallery-01.webp */
  src?: string
  /** AVIF variant (preferred). If present, used in <picture> srcset. */
  srcAvif?: string
  /** Poster frame for video media, or blur placeholder for images */
  poster?: string
  /** Intrinsic width in px (required when not using fill layout) */
  width?: number
  /** Intrinsic height in px (required when not using fill layout) */
  height?: number
  alt: string
  caption?: string
  aspectRatio?: '21/9' | '16/9' | '4/3' | '1/1' | '16/5'
  figureNumber?: string
  spec?: string
}

/**
 * Bespoke media composition for a case study.
 * Every field is optional — each project can have a different media set.
 * Never fabricate: only add verified assets.
 */
export interface CaseStudyMediaCollection {
  /** Primary hero visual — displayed large at top of case study */
  hero_image?: {
    src: string
    srcAvif?: string
    alt: string
    blurDataURL?: string
    width?: number
    height?: number
  }
  /** Hero video — replaces hero_image when supplied */
  hero_video?: {
    src: string
    poster: string
    alt: string
  }
  /** Card thumbnail — used on homepage Work showcase and /work listing */
  thumbnail?: {
    src: string
    srcAvif?: string
    alt: string
    blurDataURL?: string
    width?: number
    height?: number
  }
  /** Project gallery — multiple full-quality editorial images */
  gallery?: CaseStudyMedia[]
  /** Specific interface/UI crops */
  interface_images?: CaseStudyMedia[]
  /** Mobile viewport captures */
  mobile_images?: CaseStudyMedia[]
  /** Full desktop captures — may render full-bleed */
  desktop_images?: CaseStudyMedia[]
  /** Short screen recordings / interactions */
  video_clips?: Array<{
    src: string
    poster: string
    caption?: string
    alt: string
    /** Seconds — short clips only. Target: under 30s. */
    duration?: number
  }>
  /** Process / system architecture visuals */
  process_images?: CaseStudyMedia[]
  /** Outcome / result visuals */
  outcome_images?: CaseStudyMedia[]
  /** Custom render order for gallery — array of CaseStudyMedia.id values */
  media_order?: string[]
}

export interface QualitativeEvidence {
  id: string
  category:
    | 'SYSTEM_REBUILT'
    | 'WORKFLOW_AUTOMATED'
    | 'PLATFORM_LAUNCHED'
    | 'INFRASTRUCTURE_CONSOLIDATED'
    | 'JOURNEY_REDESIGNED'
    | 'INTERNAL_TOOLING'
    | 'PERFORMANCE_VERIFIED'
  statement: string
  verificationMethod: string
  verifiableMetric?: {
    value: string
    context: string
  }
}

export interface CaseStudyChapter {
  id: string
  type: ChapterType
  sequence: string
  eyebrow: string
  title: string
  statement?: string
  paragraphs: string[]
  media?: CaseStudyMedia
  evidence?: QualitativeEvidence[]
  technicalSpecs?: Array<{
    label: string
    value: string
    detail?: string
  }>
}

export interface DetailedCaseStudy {
  slug: string
  provenance: DataProvenanceState
  sequenceNumber: string
  title: string
  client: string
  year: number
  sector: string
  discipline: '01 // BUILD' | '02 // SEARCH' | '03 // SYSTEMS'
  executiveSummary: string
  context: string
  problemStatement: string
  interventionSummary: string
  technologyStack: string[]
  chapters: CaseStudyChapter[]
  qualitativeEvidence: QualitativeEvidence[]
  /**
   * Bespoke media composition — all fields optional.
   * Add only verified assets. Never fabricate.
   */
  mediaCollection?: CaseStudyMediaCollection
  /**
   * Homepage Selected Work layout variant.
   * Controls which editorial treatment is applied to this project's showcase card.
   * Defaults to 'horizontal' if omitted.
   */
  homepageLayout?: 'horizontal' | 'dark-split' | 'asymmetric' | 'full-width' | 'side-by-side' | 'text-led'
  /**
   * Primary service discipline relationship for entity graph & internal linking.
   */
  primaryServiceSlug?: 'build' | 'search' | 'systems'
  /**
   * Secondary service relationships if multiple disciplines were involved.
   */
  secondaryServiceSlugs?: Array<'build' | 'search' | 'systems'>
  /**
   * Related Lobby article slugs that expand on methodologies or tech used.
   */
  relatedLobbySlugs?: string[]
  /**
   * Curated related case study slugs demonstrating similar architecture or problem domains.
   */
  relatedProjectSlugs?: string[]
  /**
   * Contextual next step CTA tailored to the project's technical scope.
   */
  customCta?: {
    headline: string
    subtext: string
    primaryLabel: string
    primaryHref: string
    secondaryLabel?: string
    secondaryHref?: string
  }
  seo: {
    title: string
    description: string
  }
}

