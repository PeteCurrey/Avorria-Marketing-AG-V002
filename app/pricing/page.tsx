import type { Metadata } from 'next'
import Link from 'next/link'
import { PRICING_MODELS, COST_DRIVERS } from '@/content/pricing'
import { ChapterGate } from '@/components/creative/ChapterGate'
import { AnalyticalLedger } from '@/components/creative/AnalyticalLedger'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Commercial Engagement & Project Economics',
  description:
    'Transparent commercial models, project scoping parameters, and fixed-fee diagnostic teardowns for digital flagships and systems.',
}

export default function PricingPage() {
  return (
    <div className="bg-[var(--color-ivory)] min-h-screen pb-24">
      {/* Chapter Gate Hero */}
      <ChapterGate
        number="04"
        category="ECONOMICS"
        title="Predictable Engineering Economics."
        statement="We operate with transparent milestone billing and clear scope boundaries. Zero hidden retainer drift, zero agency markup on media or compute."
      />

      <div className="container-max">
        {/* Engagement Models Grid */}
        <section className="mb-24" aria-label="Engagement Models">
          <div className="border-t border-[var(--color-border)] pt-8 mb-12">
            <p className="text-[var(--text-label)] tracking-[0.16em] uppercase font-light text-[var(--color-graphite-mid)]">
              ENGAGEMENT FRAMEWORKS
            </p>
          </div>

          <div className="border border-[var(--color-border)] divide-y lg:divide-y-0 lg:divide-x divide-[var(--color-border)] grid grid-cols-1 lg:grid-cols-3 bg-[var(--color-ivory-dark)]">
            {PRICING_MODELS.map((model) => (
              <div
                key={model.id}
                className="p-8 md:p-10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4 mb-6">
                    <span className="font-mono text-[var(--text-label)] text-[var(--color-accent)] font-light">
                      // {model.sequence}
                    </span>
                    <span className="text-[10px] font-mono uppercase text-[var(--color-graphite-muted)]">
                      {model.timeline}
                    </span>
                  </div>

                  <h3 className="font-display text-[1.5rem] font-light text-[var(--color-graphite)] uppercase tracking-[var(--tracking-heading)] mb-2">
                    {model.name}
                  </h3>

                  <p className="text-[1.25rem] font-light text-[var(--color-accent)] mb-4 font-mono">
                    {model.investment}
                  </p>

                  <p className="text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] leading-relaxed mb-6">
                    {model.summary}
                  </p>

                  <div className="border-t border-[var(--color-border)] pt-4 mb-6">
                    <p className="text-[var(--text-label)] uppercase tracking-[0.14em] font-light text-[var(--color-graphite-mid)] mb-3">
                      SPECIFICATION DELIVERABLES:
                    </p>
                    <ul className="space-y-2.5 text-[var(--text-small)] font-light text-[var(--color-graphite-mid)]" role="list">
                      {model.deliverables.map((d, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[var(--color-border-strong)] font-mono text-[10px] mt-1">
                            +
                          </span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-[var(--color-border)] mt-8">
                  <Button
                    as="link"
                    href={model.id === 'agency-teardown' ? '/contact?inquiry=teardown' : '/start-a-project'}
                    variant={model.id === 'agency-teardown' ? 'secondary' : 'primary'}
                    className="w-full text-center justify-center"
                  >
                    {model.id === 'agency-teardown' ? 'Request Teardown Audit' : 'Scope This Engagement'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Scoping Factors & Ledger */}
        <section className="mb-24" aria-label="Scoping Variables">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 border-t border-[var(--color-border)] pt-12">
            <div>
              <p className="text-[var(--text-label)] tracking-[0.16em] uppercase font-light text-[var(--color-graphite-mid)] mb-3">
                COST DRIVERS // TRANSPARENCY
              </p>
              <h3 className="font-display text-[var(--text-display-s)] font-extralight text-[var(--color-graphite)] uppercase leading-tight mb-6">
                What Influences Project Investment.
              </h3>
              <p className="text-[var(--text-body)] font-light text-[var(--color-graphite-mid)] leading-relaxed mb-6">
                We price engagements based on technical architecture, risk parameters, and required delivery velocity. We do not charge arbitrary hourly markups.
              </p>

              <div className="space-y-6">
                <div className="border border-[var(--color-border)] p-6 bg-[var(--color-ivory-dark)]">
                  <h4 className="text-[var(--text-small)] font-light uppercase text-[var(--color-graphite)] mb-3 flex items-center gap-2">
                    <span className="text-[var(--color-accent)] font-mono">▲</span> Factors Increasing Complexity
                  </h4>
                  <ul className="space-y-2 text-[var(--text-small)] font-light text-[var(--color-graphite-mid)]">
                    {COST_DRIVERS.increasesComplexity.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[var(--color-border-strong)]">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-[var(--color-border)] p-6 bg-[var(--color-ivory-dark)]">
                  <h4 className="text-[var(--text-small)] font-light uppercase text-[var(--color-graphite)] mb-3 flex items-center gap-2">
                    <span className="text-[var(--color-graphite)] font-mono">▼</span> Factors Reducing Investment
                  </h4>
                  <ul className="space-y-2 text-[var(--text-small)] font-light text-[var(--color-graphite-mid)]">
                    {COST_DRIVERS.reducesComplexity.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[var(--color-border-strong)]">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <AnalyticalLedger
                eyebrow="COMMERCIAL METRICS // BENCHMARKS"
                title="OPERATIONAL PARAMETERS"
                items={[
                  {
                    key: 'deposit',
                    label: 'Standard Project Deposit',
                    value: '33% on Execution',
                    subtext: 'Held in escrow before sprint initiation',
                  },
                  {
                    key: 'cwv',
                    label: 'Core Web Vitals SLA',
                    value: '100 / 100 Target',
                    subtext: 'Contractual standard on Next.js 16',
                  },
                  {
                    key: 'code-ownership',
                    label: 'Code & IP Ownership',
                    value: '100% Client Held',
                    subtext: 'No proprietary agency CMS locks',
                  },
                  {
                    key: 'turnaround',
                    label: 'Diagnostic Teardown SLA',
                    value: '5 Business Days',
                    subtext: 'Complete forensic report delivery',
                  },
                  {
                    key: 'retainer-terms',
                    label: 'Retainer Transition Notice',
                    value: '30 Days Rolling',
                    subtext: 'Following initial 90-day cycle',
                  },
                ]}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
