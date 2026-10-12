import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

interface MosaicStory {
  id: string
  title: string
  category: string
  metric: string
  readTime: string
  excerpt: string
  image: string
  slug: string
  featured?: boolean
}

const MOSAIC_STORIES: MosaicStory[] = [
  {
    id: 'alkota',
    featured: true,
    title: 'Alkota Bikes: Sub-Second 3D Frame Geometry & Custom Configurator',
    category: '01 // FLAGSHIP BUILD',
    metric: '0.62S LCP · ZERO SHIFT',
    readTime: '6 MIN INSPECTION',
    excerpt:
      'How Avorria replaced an off-the-shelf £6,000 titanium bicycle purchase flow with a custom server-rendered Next.js 16 WebGL inspection platform, eliminating 38 bloated tracking scripts and driving sub-second route changes.',
    image: '/images/cinematic/work-alkota.jpg',
    slug: '/work/alkota-bikes',
  },
  {
    id: 'drawdown',
    title: 'Drawdown: High-Frequency Macro Volatility & Risk Modeling Terminal',
    category: '02 // RISK SYSTEMS',
    metric: '5,000 TICKS/SEC',
    readTime: '8 MIN CASE STUDY',
    excerpt: 'Streamlined risk intelligence processing multi-asset volatility with sub-10ms canvas rendering.',
    image: '/images/cinematic/work-drawdown.jpg',
    slug: '/work/drawdown',
  },
  {
    id: 'entirefm',
    title: 'EntireFM: Merging 8 Legacy Domains with Zero Organic Traffic Falloff',
    category: '03 // SEARCH ARCHITECTURE',
    metric: '8 DOMAINS CONSOLIDATED',
    readTime: '5 MIN CASE STUDY',
    excerpt: 'Surgical redirect mapping and unified semantic architecture across 3,400+ indexed URLs.',
    image: '/images/cinematic/work-entirefm.jpg',
    slug: '/work/entirefm',
  },
  {
    id: 'careeros',
    title: 'CareerOS: Autonomous Multi-Agent Talent Pipeline with Zod State Machine',
    category: '04 // AGENTIC AI',
    metric: '100% DETERMINISTIC',
    readTime: '7 MIN CASE STUDY',
    excerpt: 'Self-correcting AI interview pipeline with structured LLM extractions and strict runtime validation.',
    image: '/images/cinematic/work-careeros.jpg',
    slug: '/work/careeros',
  },
  {
    id: 'websites-fire',
    title: 'The Slow Architecture Epidemic: Analysis of 40 Enterprise Redesigns',
    category: '05 // EDITORIAL TEARDOWN',
    metric: 'VERIFIED BENCHMARKS',
    readTime: '12 MIN READ',
    excerpt: 'Why 73% of agency redesigns fail Core Web Vitals within 90 days of launch, and how to prevent it.',
    image: '/images/cinematic/discipline-build.jpg',
    slug: '/the-lobby/websites-we-would-fire',
  },
]

export function EditorialMosaic() {
  const leadStory = MOSAIC_STORIES[0]
  const secondaryStories = MOSAIC_STORIES.slice(1)

  return (
    <section
      id="mosaic"
      className="relative bg-[#0A0B0E] text-white py-20 lg:py-28 border-b border-white/10"
      aria-labelledby="mosaic-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header — Red Bull Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.2em] font-light text-[var(--color-cobalt)] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cobalt)]" />
              <span>DISCOVERY & RECENT PRODUCTIONS</span>
            </div>
            <h2
              id="mosaic-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extralight uppercase tracking-[-0.03em] leading-tight text-white"
            >
              Featured Stories & Deployments
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.16em] font-light text-white/70 hover:text-[var(--color-cobalt)] transition-colors"
            >
              <span>Explore All 7 Verified Cases</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* ── Red Bull Asymmetric Mosaic Grid: 1 Super Feature + 4 Complementary ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Dominant 2-Column Super Feature Card (Left Column, Span 7) */}
          <article className="lg:col-span-7 group relative flex flex-col justify-end overflow-hidden rounded-sm border border-white/10 bg-[#12141A] hover:border-[var(--color-cobalt)] transition-all duration-500 min-h-[460px] sm:min-h-[540px] lg:min-h-[640px]">
            {/* Background Image with Zoom */}
            <div className="absolute inset-0 z-0">
              <Image
                src={leadStory.image}
                alt={leadStory.title}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Deep Red Bull gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E] via-[#0A0B0E]/70 to-transparent" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            {/* Top Badges */}
            <div className="absolute top-5 left-5 right-5 z-10 flex items-center justify-between gap-3">
              <span className="px-3 py-1 rounded-full text-[0.625rem] uppercase tracking-[0.18em] font-light bg-[var(--color-cobalt)] text-white shadow-[0_0_15px_rgba(49,87,255,0.4)]">
                {leadStory.category}
              </span>
              <span className="px-3 py-1 rounded-full text-[0.625rem] uppercase tracking-[0.14em] font-light bg-black/70 backdrop-blur-md text-white/90 border border-white/15">
                {leadStory.readTime}
              </span>
            </div>

            {/* Lead Story Content Overlay */}
            <div className="relative z-10 p-6 sm:p-8 lg:p-10">
              <div className="inline-flex items-center gap-2 text-[0.6875rem] font-extralight tracking-[0.16em] uppercase text-emerald-400 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {leadStory.metric}
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extralight uppercase tracking-[-0.025em] text-white leading-tight mb-4 group-hover:text-white transition-colors">
                <Link href={leadStory.slug} className="hover:underline focus-visible:outline-none">
                  {leadStory.title}
                </Link>
              </h3>

              <p className="font-light text-white/75 text-sm sm:text-base leading-relaxed max-w-xl mb-6">
                {leadStory.excerpt}
              </p>

              <div className="flex items-center gap-4">
                <Button as="link" href={leadStory.slug} variant="cobalt" size="sm">
                  View Full Case Study <span aria-hidden="true">↗</span>
                </Button>
                <span className="text-xs uppercase tracking-[0.14em] font-extralight text-white/50">
                  VERIFIED PROVENANCE
                </span>
              </div>
            </div>
          </article>

          {/* Complementary 4-Card Stack (Right Column, Span 5: 2x2 Grid) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            {secondaryStories.map((story) => (
              <article
                key={story.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-sm border border-white/10 bg-[#12141A] hover:border-[var(--color-cobalt)] transition-all duration-300 min-h-[260px] sm:min-h-[290px]"
              >
                {/* Media Half */}
                <div className="relative w-full h-36 overflow-hidden bg-black/40">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12141A] to-transparent opacity-80" />

                  {/* Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-full text-[0.5625rem] uppercase tracking-[0.14em] font-light bg-black/70 backdrop-blur-md text-white/90 border border-white/10">
                      {story.category.split('//')[1]?.trim() || story.category}
                    </span>
                    <span className="text-[0.5625rem] font-extralight tracking-[0.1em] text-white/70 bg-black/60 px-1.5 py-0.5 rounded-xs">
                      {story.readTime}
                    </span>
                  </div>
                </div>

                {/* Content Half */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[0.625rem] uppercase tracking-[0.14em] font-extralight text-emerald-400 block mb-1.5">
                      {story.metric}
                    </span>
                    <h4 className="text-sm font-light uppercase tracking-[-0.01em] text-white leading-snug line-clamp-2 group-hover:text-[var(--color-cobalt)] transition-colors">
                      <Link href={story.slug} className="focus-visible:outline-none">
                        {story.title}
                      </Link>
                    </h4>
                  </div>

                  <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[0.625rem] uppercase tracking-[0.14em] font-light text-white/50 group-hover:text-white transition-colors">
                      Read Breakdown
                    </span>
                    <span className="text-[var(--color-cobalt)] group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
