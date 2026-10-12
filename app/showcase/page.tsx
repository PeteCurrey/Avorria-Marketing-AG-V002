import type { Metadata } from 'next'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { EditorialCard } from '@/components/ui/EditorialCard'
import { MetricBadge, MetricBadgeRow } from '@/components/ui/MetricBadge'
import { CategoryBadge } from '@/components/ui/CategoryBadge'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Button } from '@/components/ui/Button'
import { ImageReveal } from '@/components/ui/ImageReveal'
import { HorizontalContentRail } from '@/components/ui/HorizontalContentRail'
import { AsymmetricContentGrid } from '@/components/ui/AsymmetricContentGrid'
import { FeaturedServicePanel } from '@/components/ui/FeaturedServicePanel'
import { CaseStudyFeature } from '@/components/ui/CaseStudyFeature'
import { CtaBanner } from '@/components/ui/CtaBanner'
import { ProjectEnquiryEntryPoint } from '@/components/ui/ProjectEnquiryEntryPoint'
import { FullBleedMediaHero } from '@/components/ui/FullBleedMediaHero'

export const metadata: Metadata = {
  title: 'Design System & Component Showcase // Phase 2 Redesign Foundation',
  description:
    'Interactive verification showcase of Avorria’s Red Bull-inspired premium editorial design system and reusable component primitives.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ShowcasePage() {
  return (
    <div className="w-full bg-[var(--color-ivory)] text-[var(--color-graphite)] pb-28">
      {/* 1. Hero Showcase */}
      <FullBleedMediaHero
        eyebrow="PHASE 2 FOUNDATION · DESIGN SYSTEM ARCHITECTURE"
        title="Engineering precision meets"
        italicAccent="editorial momentum."
        description="A comprehensive library of modular editorial components, cinematic cards, high-contrast typography, and fluid responsive compositions built for Avorria."
        primaryCta={{ label: 'Explore Primitives', href: '#primitives' }}
        secondaryCta={{ label: 'View Case Studies', href: '#case-studies' }}
        image="/images/cinematic/discipline-build.jpg"
        imageAlt="Avorria Design System Foundation"
        metadata={[
          { label: 'FRAMEWORK', value: 'NEXT.JS 16 APP ROUTER' },
          { label: 'TYPEFACE', value: 'WORK SANS 200/300' },
          { label: 'STATUS', value: 'PHASE 2 READY' },
        ]}
      />

      <div id="primitives" className="w-full px-6 md:px-10 lg:px-[7vw] pt-20">
        {/* 2. Section Heading & Eyebrow Primitives */}
        <SectionHeading
          number="01"
          eyebrow="SYSTEM PRIMITIVES &amp; TYPOGRAPHY"
          accentEyebrow="cobalt"
          title="Tokens, Badges &amp;"
          italicAccent="Micro-Interactions."
          description="Consistent architectural hierarchy driven by strict weight constraints (Work Sans 200/300), precise fluid scales, and calculated brand accents."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-white border border-[var(--color-border)] rounded-[var(--radius-card)] mb-20">
          <div>
            <p className="text-[10px] tracking-[0.16em] uppercase text-[var(--color-graphite-muted)] mb-3">
              Eyebrow Variants
            </p>
            <div className="space-y-2">
              <Eyebrow accent="cobalt" withDot>
                Cobalt Primary
              </Eyebrow>
              <Eyebrow accent="coral" withDot>
                Coral Accent
              </Eyebrow>
              <Eyebrow accent="chartreuse" withDot>
                Chartreuse Signal
              </Eyebrow>
            </div>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.16em] uppercase text-[var(--color-graphite-muted)] mb-3">
              Category Badges
            </p>
            <div className="flex flex-wrap gap-3">
              <CategoryBadge label="ENGINEERING" href="/lobby" active />
              <CategoryBadge label="TECHNICAL SEO" href="/lobby" />
              <CategoryBadge label="SYSTEMS &amp; DATA" href="/lobby" />
            </div>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.16em] uppercase text-[var(--color-graphite-muted)] mb-3">
              Button Hierarchy
            </p>
            <div className="flex flex-col gap-2.5">
              <Button variant="cobalt" size="sm">
                Cobalt Action ↗
              </Button>
              <Button variant="primary" size="sm">
                Graphite Primary
              </Button>
              <Button variant="secondary" size="sm">
                Secondary Ghost
              </Button>
            </div>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.16em] uppercase text-[var(--color-graphite-muted)] mb-3">
              Metric Indicators
            </p>
            <div className="space-y-2">
              <MetricBadge value="0.62s" label="LCP Rendertime" />
              <MetricBadge value="100%" label="Accessibility Core" />
            </div>
          </div>
        </div>

        {/* 3. Editorial Cards Matrix (Red Bull Inspiration) */}
        <SectionHeading
          number="02"
          eyebrow="EDITORIAL CONTENT DISCOVERY"
          accentEyebrow="coral"
          title="Image-Bleed"
          italicAccent="Card Matrices."
          description="Transforming content lists into high-density magazine discovery grids. Edge-to-edge photography with contrast scrims and persistent read-time indicators."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
          <div className="lg:col-span-8">
            <EditorialCard
              size="feature"
              href="/lobby"
              title="Websites We Would Fire: Forensic Architecture &amp; The Cost of Fragile Stacks"
              excerpt="An unvarnished investigation into why high-growth enterprises consistently outgrow boutique WordPress and monolithic agency retainers."
              category="STRATEGIC DISPATCH"
              categoryHref="/lobby"
              readTime={6}
              date="OCTOBER 2026"
              metric="DEEP DIVE"
              image="/images/cinematic/work-drawdown.jpg"
              imageAlt="Strategic Case Study Analysis"
            />
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            <EditorialCard
              size="standard"
              href="/lobby"
              title="Autonomous Agents &amp; Vector Taxonomy in Production"
              category="INTELLIGENCE"
              categoryHref="/lobby"
              readTime={4}
              date="OCTOBER 2026"
              metric="ENGINEERING"
              image="/images/cinematic/work-careeros.jpg"
              imageAlt="CareerOS Autonomous Workflows"
            />

            <EditorialCard
              size="standard"
              href="/lobby"
              title="Consolidating 8 Legacy Domains with Zero Organic Equity Loss"
              category="SEARCH ARCHITECTURE"
              categoryHref="/lobby"
              readTime={5}
              date="SEPTEMBER 2026"
              metric="SEO RECORD"
              image="/images/cinematic/discipline-strategy.jpg"
              imageAlt="EntireFM Migration Strategy"
            />
          </div>
        </div>

        {/* 4. Horizontal Content Rail */}
        <SectionHeading
          number="03"
          eyebrow="HORIZONTAL MOMENTUM &amp; TELEMETRY"
          accentEyebrow="chartreuse"
          title="Responsive Snap"
          italicAccent="Content Rail."
          description="Native CSS scroll-snap horizontal rails for friction-free browsing on touch devices and desktop trackpads without scroll hijacking."
        />

        <div className="mb-24">
          <HorizontalContentRail label="Verified production benchmarks">
            {[
              {
                title: 'Alkota Bikes Titanium Platform',
                metric: '0.62s LCP // 60 FPS',
                image: '/images/cinematic/work-alkota.jpg',
                tag: 'BUILD',
              },
              {
                title: 'Drawdown Trading Quantitative Engine',
                metric: '5,000 Ticks/Sec',
                image: '/images/cinematic/work-drawdown.jpg',
                tag: 'SYSTEMS',
              },
              {
                title: 'TAFM Commercial Marketplace',
                metric: 'Multi-Tier Supplier Portal',
                image: '/images/cinematic/work-tafm.jpg',
                tag: 'PRODUCTS',
              },
              {
                title: 'CareerOS Enterprise Engine',
                metric: 'Sub-Millisecond Vector Retrieval',
                image: '/images/cinematic/work-careeros.jpg',
                tag: 'INTELLIGENCE',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="w-[300px] sm:w-[380px] shrink-0 snap-start bg-white p-4 border border-[var(--color-border)] rounded-[var(--radius-card)] group"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-sm)] mb-4 bg-[var(--color-stone)]">
                  <ImageReveal src={item.image} alt={item.title} aspectRatio="16/9" />
                </div>
                <div className="flex items-center justify-between text-[10px] tracking-[0.16em] uppercase text-[var(--color-graphite-muted)] mb-2">
                  <span className="text-[var(--color-cobalt)]">{item.tag}</span>
                  <span>{item.metric}</span>
                </div>
                <h4 className="text-base font-light text-[var(--color-graphite)] group-hover:text-[var(--color-cobalt)] transition-colors">
                  {item.title}
                </h4>
              </div>
            ))}
          </HorizontalContentRail>
        </div>

        {/* 5. Featured Service Panel */}
        <SectionHeading
          number="04"
          eyebrow="CAPABILITY PANELS"
          accentEyebrow="cobalt"
          title="Integrated Engineering"
          italicAccent="Disciplines."
          description="High-density service presentation pairing technical execution specifications with verifiable metric achievements."
        />

        <div className="mb-24">
          <FeaturedServicePanel
            index="01"
            label="BUILD"
            title="Digital Flagships &amp; Web Platforms"
            statement="Sub-second rendering, architectural typography, and responsive WebGL stages built for brands where digital execution directly impacts commercial valuation."
            deliverables={[
              'Next.js 16 App Router Architectures',
              'Sub-second Core Web Vitals Engineering',
              'Interactive WebGL & Canvas Experiences',
              'Strict TypeScript Data Contracts',
            ]}
            proofMetric={{
              value: '0.62s',
              label: 'Verified Production LCP',
            }}
            href="/services/build"
            image="/images/cinematic/discipline-build.jpg"
            imageAlt="Build discipline architecture"
            accent="cobalt"
          />
        </div>

        {/* 6. Monumental Case Study Card */}
        <div id="case-studies" className="mb-24">
          <SectionHeading
            number="05"
            eyebrow="FLAGSHIP SHOWCASE"
            accentEyebrow="coral"
            title="Monumental Cinematic"
            italicAccent="Case Presentation."
          />

          <CaseStudyFeature
            title="Alkota Bikes: Real-Time 3D Titanium Geometry Platform"
            client="ALKOTA BIKES"
            sector="PRECISION CYCLING"
            statement="Engineering a sub-second 3D WebGL configurator paired with headless e-commerce and zero cumulative layout shift."
            metrics={[
              { value: '0.62s', label: 'LARGEST CONTENTFUL PAINT' },
              { value: '0.00', label: 'CUMULATIVE LAYOUT SHIFT' },
              { value: '60 FPS', label: 'WEBGL STAGE RENDERING' },
            ]}
            image="/images/cinematic/work-alkota.jpg"
            imageAlt="Alkota Bikes WebGL Platform"
            href="/work/alkota-bikes"
          />
        </div>
      </div>

      {/* 7. Dedicated Enquiry & CTA Banner Primitives */}
      <ProjectEnquiryEntryPoint />

      <CtaBanner
        eyebrow="AVORRIA COMMISSIONS · Q4 INTAKE"
        headline="Have something worth"
        italicAccent="building?"
        description="We partner with ambitious enterprises and founders who require bespoke digital flagships, low-latency web systems, and server-side intelligence engineered to exacting tolerances."
        primaryCta={{ label: 'Start a Project', href: '/start-a-project' }}
        secondaryCta={{ label: 'Explore Our Work', href: '/work' }}
        theme="wine"
        watermark="BUILD"
      />
    </div>
  )
}
