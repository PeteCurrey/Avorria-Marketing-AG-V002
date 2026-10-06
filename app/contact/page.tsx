import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'
import { Button } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'
import { siteConfig } from '@/content/config/site'

export const metadata: Metadata = generatePageMetadata({
  title: 'Contact',
  description:
    'Commission a digital product build, embedded engineering retainer, or pre-build architecture audit with Avorria. We review every enquiry personally.',
  path: '/contact',
})

// ─── Schema.org JSON-LD ──────────────────────────────────────────────────────

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${siteConfig.url}/contact#webpage`,
  name: 'Contact Avorria',
  url: `${siteConfig.url}/contact`,
  description:
    'Commission a digital product build, embedded engineering retainer, or pre-build architecture audit with Avorria.',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: `${siteConfig.url}/contact` },
    ],
  },
  mainEntity: {
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: 'Avorria',
    email: siteConfig.email.hello,
    url: siteConfig.url,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: siteConfig.email.hello,
        availableLanguage: 'en',
      },
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: siteConfig.email.support,
        availableLanguage: 'en',
      },
    ],
  },
}

// ─── Qualification process steps ─────────────────────────────────────────────

const INTAKE_STEPS = [
  {
    number: '01',
    title: 'Tell us what you are building',
    body: 'Complete our 4-minute project intake form. It covers scope, timeline, technical context, and commercial intent. We read every submission the same day.',
    action: null,
  },
  {
    number: '02',
    title: 'We review the opportunity',
    body: 'A senior member of the Avorria team reviews your brief personally — not a sales coordinator. We assess fit, technical complexity, and whether we can add genuine value.',
    action: null,
  },
  {
    number: '03',
    title: 'We respond with clarity',
    body: 'Within one business day we respond with either an initial observations note, a request for further context, or an honest assessment that we are not the right fit.',
    action: null,
  },
  {
    number: '04',
    title: 'We scope the work together',
    body: 'If there is a clear fit, we move to a scoping call and produce a structured proposal document — scope, technical approach, milestone billing, and timeline.',
    action: null,
  },
]

// ─── Enquiry types ────────────────────────────────────────────────────────────

const ENQUIRY_TYPES = [
  { label: 'Digital product build', href: '/start-a-project?type=product-build' },
  { label: 'Embedded retainer partnership', href: '/start-a-project?type=retainer' },
  { label: 'Pre-build architecture audit', href: '/start-a-project?type=audit' },
  { label: 'Technical SEO & search authority', href: '/start-a-project?type=search' },
  { label: 'Digital systems & AI automation', href: '/start-a-project?type=systems' },
]

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      <PageHero
        eyebrow="CONTACT / COMMISSION WORK"
        headline={[
          { before: 'Commission work' },
          { before: 'with', accent: 'Avorria.' },
        ]}
        body="We work with a small number of clients at any given time. Every enquiry is reviewed personally by a senior member of the team — not a sales coordinator."
        primaryCta={{ label: 'Start a project ↗', href: '/start-a-project' }}
        secondaryCta={{ label: 'View our work', href: '/work' }}
        image="/images/cinematic/discipline-strategy.jpg"
        imageAlt="Avorria — Architectural studio drafting space, London"
        metaLeft="EVERY ENQUIRY REVIEWED PERSONALLY"
        metaRight="RESPONDS WITHIN ONE BUSINESS DAY"
        theme="graphite"
      />

      <div className="bg-[var(--color-ivory)]">
        <div className="container-max">
          <div className="container-content">

            {/* ── What we are for ──────────────────────────────────── */}
            <section className="py-20 md:py-24 border-b border-[var(--color-border)]" aria-label="Enquiry types">
              <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-16">
                <div>
                  <p className="text-label-upper text-[var(--color-graphite-mid)] mb-4 font-light">
                    WE CAN HELP WITH
                  </p>
                  <h2 className="text-display-s font-extralight tracking-tight text-[var(--color-graphite)] uppercase max-w-[280px]">
                    What we build.
                  </h2>
                </div>
                <div className="border border-[var(--color-border)] divide-y divide-[var(--color-border)]">
                  {ENQUIRY_TYPES.map((type) => (
                    <a
                      key={type.href}
                      href={type.href}
                      className="flex items-center justify-between p-6 hover:bg-[var(--color-ivory-dark)] transition-colors duration-[var(--duration-base)] group"
                    >
                      <span className="text-[var(--text-body)] font-light text-[var(--color-graphite)]">
                        {type.label}
                      </span>
                      <span className="text-[var(--color-graphite-mid)] group-hover:text-[var(--color-accent)] transition-colors text-sm font-light">
                        ↗
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </section>

            {/* ── Qualification process ────────────────────────────── */}
            <section className="py-20 md:py-28 border-b border-[var(--color-border)]" aria-label="Our process">
              <div className="mb-16">
                <p className="text-label-upper text-[var(--color-graphite-mid)] mb-3 font-light">
                  HOW WE ENGAGE // PROCESS
                </p>
                <h2 className="text-display-s font-extralight tracking-tight text-[var(--color-graphite)] uppercase max-w-[500px]">
                  What happens after you enquire.
                </h2>
              </div>

              <div className="space-y-0 divide-y divide-[var(--color-border)] border border-[var(--color-border)]">
                {INTAKE_STEPS.map((step) => (
                  <div
                    key={step.number}
                    className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-0"
                  >
                    <div className="border-r-0 md:border-r border-[var(--color-border)] p-6 md:p-8 flex items-start justify-start md:justify-center pt-8">
                      <span className="text-[var(--color-graphite-mid)] font-extralight text-[1.5rem] tracking-tight">
                        {step.number}
                      </span>
                    </div>
                    <div className="p-6 md:p-8">
                      <h3 className="text-[var(--text-body)] font-light text-[var(--color-graphite)] mb-3 uppercase tracking-[0.06em]">
                        {step.title}
                      </h3>
                      <p className="text-[var(--text-small)] font-light text-secondary leading-relaxed">
                        {step.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Direct contact ───────────────────────────────────── */}
            <section className="py-20 md:py-28" aria-label="Direct contact">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                <div>
                  <p className="text-label-upper text-[var(--color-graphite-mid)] mb-6 font-light">
                    DIRECT CONTACT // GENERAL ENQUIRIES
                  </p>
                  <a
                    href={`mailto:${siteConfig.email.hello}`}
                    className="text-display-s font-extralight text-[var(--color-graphite)] hover:text-[var(--color-accent)] transition-colors duration-[var(--duration-base)] block mb-4"
                    aria-label={`Email Avorria at ${siteConfig.email.hello}`}
                  >
                    {siteConfig.email.hello}
                  </a>
                  <p className="text-[var(--text-small)] font-light text-secondary">
                    All general enquiries — new project commissions, partnership
                    discussions, and press.
                  </p>
                </div>

                <div className="space-y-10">
                  <div>
                    <p className="text-label-upper text-[var(--color-graphite-mid)] mb-4 font-light">
                      SUPPORT
                    </p>
                    <a
                      href={`mailto:${siteConfig.email.support}`}
                      className="text-[var(--text-body)] font-light text-[var(--color-graphite)] hover:text-[var(--color-accent)] transition-colors duration-[var(--duration-base)] block"
                      aria-label={`Support email: ${siteConfig.email.support}`}
                    >
                      {siteConfig.email.support}
                    </a>
                    <p className="text-[var(--text-small)] font-light text-secondary mt-2">
                      For existing clients with live projects or technical queries.
                    </p>
                  </div>

                  <div className="border-t border-[var(--color-border)] pt-10">
                    <p className="text-label-upper text-[var(--color-graphite-mid)] mb-3 font-light">
                      RESPONSE TIME
                    </p>
                    <p className="text-[var(--text-body)] font-light text-[var(--color-graphite)]">
                      Within one business day.
                    </p>
                    <p className="text-[var(--text-small)] font-light text-secondary mt-2">
                      We do not route enquiries through sales teams or automated
                      pipelines. You receive a response from a senior practitioner.
                    </p>
                  </div>

                  <div className="border-t border-[var(--color-border)] pt-10">
                    <p className="text-label-upper text-[var(--color-graphite-mid)] mb-4 font-light">
                      NOT SURE WHERE TO START?
                    </p>
                    <Button as="link" href="/digital-audit" variant="secondary" size="md">
                      Commission a project audit first
                    </Button>
                    <p className="text-[var(--text-small)] font-light text-secondary mt-3">
                      A fixed-fee architectural audit before any build commitment.
                    </p>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  )
}
