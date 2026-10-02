import Link from 'next/link'

const INFO_BLOCKS = [
  {
    num: '01',
    title: 'WHO THIS IS FOR',
    content:
      'We partner directly with founders, CTOs, product leaders, and managing directors who require sovereign digital platforms, flagship editorial websites, or custom AI integrations. Ambitious enterprises tired of agency bloat, bloated CMS templates, and unscalable technical debt.',
    link: { href: '/about', label: 'About Avorria' },
  },
  {
    num: '02',
    title: 'WHAT WE BUILD',
    content:
      'Production digital infrastructure: low-latency Next.js websites, WebGL geometry systems, financial telemetry dashboards, sovereign PostgreSQL architectures, and autonomous AI orchestration workflows. Every line of code is bespoke and 100% owned by you.',
    link: { href: '/services', label: 'Explore Services' },
  },
  {
    num: '03',
    title: 'WHAT HAPPENS AFTER YOU SUBMIT',
    content:
      'Your project brief is transmitted to our private engineering queue. A senior principal conducts a forensic review of your objectives and technical parameters within one business day. We respond with initial feedback and proposed next steps.',
    link: { href: '/process', label: 'Our Process' },
  },
  {
    num: '04',
    title: 'HOW WE SCOPE PROJECTS',
    content:
      'We dissect requirements into architectural milestones with fixed deliverables, clear SLA tolerances, and zero hidden fees. We work under mutual NDA when discussing proprietary data or trade secrets.',
    link: { href: '/work', label: 'View Verified Work' },
  },
  {
    num: '05',
    title: 'HOW LONG PROJECTS TYPICALLY TAKE',
    content:
      'Targeted sprints and technical audits deploy within 2 to 4 weeks. Flagship websites and bespoke web applications typically complete within 6 to 12 weeks. Embedded systems retainers operate on continuous quarterly commitments.',
    link: { href: '/pricing', label: 'Pricing & Tracks' },
  },
  {
    num: '06',
    title: 'HOW COMMERCIAL SCOPE IS ESTABLISHED',
    content:
      'Commercial scope is anchored to tangible deliverables rather than arbitrary billed hours. We define unambiguous specifications, milestone payments, and rigorous code reviews to eliminate scope creep completely.',
    link: { href: '/contact', label: 'Contact Details' },
  },
]

export function ProjectInfoSection() {
  return (
    <section
      className="border-t border-[var(--color-border)] bg-[var(--color-ivory-dark)] py-20 lg:py-28"
      aria-labelledby="scoping-info-heading"
    >
      <div className="container-max">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[var(--color-rose-text)] font-light">
              INFORMATION ARCHITECTURE
            </span>
            <span className="h-px w-8 bg-[var(--color-border-strong)]" aria-hidden="true" />
          </div>
          <h2
            id="scoping-info-heading"
            className="text-display-s md:text-display-m font-extralight text-[var(--color-graphite)] tracking-tight"
          >
            How we engageAmbitious partners.
          </h2>
          <p className="text-body-l text-[var(--color-graphite-mid)] font-light leading-relaxed">
            Direct collaboration with technical principals. Transparent commercial boundaries,
            uncompromising engineering standards, and zero fabricated promises.
          </p>
        </div>

        {/* 6-Block Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20 border-b border-[var(--color-border)]">
          {INFO_BLOCKS.map((block) => (
            <div
              key={block.num}
              className="border border-[var(--color-border)] bg-white p-8 space-y-4 flex flex-col justify-between hover:border-[var(--color-border-strong)] transition-colors"
            >
              <div className="space-y-3">
                <span className="text-xs font-mono text-[var(--color-rose-text)] font-light">
                  {block.num} // SPEC
                </span>
                <h3 className="text-sm uppercase tracking-[0.14em] font-light text-[var(--color-graphite)]">
                  {block.title}
                </h3>
                <p className="text-xs font-light text-[var(--color-graphite-mid)] leading-relaxed">
                  {block.content}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--color-border)]">
                <Link
                  href={block.link.href}
                  className="inline-flex items-center gap-1.5 text-xs font-light text-[var(--color-graphite)] hover:text-[var(--color-rose-text)] tracking-wider uppercase transition-colors"
                >
                  <span>{block.link.label}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Closing CTA */}
        <div className="pt-20 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-2">
            <h2 className="text-display-s font-extralight text-[var(--color-graphite)] tracking-tight">
              Ready when you are.
            </h2>
            <p className="text-sm md:text-base font-light text-[var(--color-graphite-mid)]">
              Good digital work starts with a clear problem.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/work"
              className="btn-secondary px-8 py-4 text-xs uppercase tracking-[0.16em] font-light border border-[var(--color-border-strong)] hover:border-black transition-colors"
            >
              View Our Work →
            </Link>
            <Link
              href="/"
              className="btn-primary px-8 py-4 text-xs uppercase tracking-[0.16em] font-light"
            >
              Return Home →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
