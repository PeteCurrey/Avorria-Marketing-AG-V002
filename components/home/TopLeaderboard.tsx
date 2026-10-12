import Link from 'next/link'

interface Benchmark {
  rank: string
  metric: string
  label: string
  project: string
  discipline: string
  detail: string
  slug: string
}

const BENCHMARKS: Benchmark[] = [
  {
    rank: '01',
    metric: '0.62s LCP',
    label: 'Cold-Edge Route Transitions',
    project: 'Alkota Bikes',
    discipline: 'BUILD // 3D FLAGSHIP',
    detail: 'Server-rendered WebGL stage with zero layout shift and 100% Google Core Web Vitals compliance.',
    slug: '/work/alkota-bikes',
  },
  {
    rank: '02',
    metric: '5,000/s',
    label: 'Realtime Data Ticks Rendered',
    project: 'Drawdown Terminal',
    discipline: 'SEARCH // RISK ENGINE',
    detail: 'Sub-10ms canvas rendering under multi-asset market stress with zero main-thread jank.',
    slug: '/work/drawdown',
  },
  {
    rank: '03',
    metric: '8 Domains',
    label: 'Unified with 0% Traffic Loss',
    project: 'EntireFM',
    discipline: 'SEARCH ARCHITECTURE',
    detail: 'Surgical redirect mapping and semantic entity consolidation across 3,400+ indexed URLs.',
    slug: '/work/entirefm',
  },
  {
    rank: '04',
    metric: '100% Valid',
    label: 'Deterministic Zod Pipeline',
    project: 'CareerOS',
    discipline: 'SYSTEMS // AGENTIC AI',
    detail: 'Self-correcting structured output validator eliminating hallucinations in live talent routing.',
    slug: '/work/careeros',
  },
  {
    rank: '05',
    metric: '100/100',
    label: 'Production Lighthouse Score',
    project: 'Avorria Engine 4.2',
    discipline: 'PLATFORM ARCHITECTURE',
    detail: 'Strict architectural hygiene with zero bloated tracking scripts and native font optimizations.',
    slug: '/process',
  },
]

export function TopLeaderboard() {
  return (
    <section
      id="leaderboard"
      className="relative bg-[#07080A] text-white py-20 lg:py-28 border-b border-white/10 overflow-hidden"
      aria-labelledby="leaderboard-heading"
    >
      {/* Background Subtle Accent Grids */}
      <div className="absolute inset-0 bg-radial-gradient opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.2em] font-light text-[var(--color-cobalt)] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cobalt)]" />
              <span>LEADERBOARD // AUDITED TELEMETRY</span>
            </div>
            <h2
              id="leaderboard-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extralight uppercase tracking-[-0.03em] leading-tight text-white"
            >
              Top 05 Production Benchmarks
            </h2>
          </div>

          <p className="font-light text-white/60 text-sm max-w-md">
            Every metric published by Avorria is recorded from production environments under live load.
            Zero simulated lab data or inflated agency estimates.
          </p>
        </div>

        {/* 5-Column Red Bull Leaderboard Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
          {BENCHMARKS.map((item) => (
            <Link
              key={item.rank}
              href={item.slug}
              className="group relative flex flex-col justify-between p-6 rounded-sm border border-white/10 bg-[#0E1015] hover:border-[var(--color-cobalt)] hover:bg-[#12151D] transition-all duration-300 min-h-[320px]"
            >
              {/* Giant Architectural Numeral */}
              <div className="flex items-start justify-between">
                <span className="text-4xl lg:text-5xl font-extralight text-white/20 group-hover:text-[var(--color-cobalt)] transition-colors select-none tracking-tight">
                  {item.rank}
                </span>
                <span className="text-[0.5625rem] font-light uppercase tracking-[0.14em] text-[var(--color-cobalt)] bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                  {item.discipline.split('//')[0]?.trim()}
                </span>
              </div>

              {/* Middle Metric Display */}
              <div className="my-auto py-4">
                <div className="text-2xl lg:text-3xl font-extralight text-white tracking-tight mb-1 group-hover:text-white transition-colors">
                  {item.metric}
                </div>
                <div className="text-xs font-light text-white/90 uppercase tracking-[0.06em] mb-2">
                  {item.label}
                </div>
                <div className="text-[0.6875rem] font-extralight text-white/50 leading-relaxed line-clamp-3">
                  {item.detail}
                </div>
              </div>

              {/* Bottom Project Tag */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[0.6875rem] font-light text-white/80 group-hover:text-white transition-colors">
                  {item.project}
                </span>
                <span className="text-xs text-[var(--color-cobalt)] group-hover:translate-x-1 transition-transform">
                  ↗
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
