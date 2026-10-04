import Link from 'next/link'
import { getFeaturedVerifiedCaseStudy } from '@/lib/db/proof'

/**
 * Featured Case Study Section
 *
 * Rules:
 * - Case study metrics render only from a verified, published row in Supabase.
 * - Headline must be a stated result with a metric from the row.
 * - If none exist, the homepage section does not render.
 */
export async function FeaturedCaseStudy() {
  const caseStudy = await getFeaturedVerifiedCaseStudy()

  if (!caseStudy || !caseStudy.headline_result || !caseStudy.metric_value) {
    return null
  }

  const clientName = caseStudy.clients?.name || 'Verified Case Study'

  return (
    <section className="case-section" aria-label="Featured case study">
      <div className="wrap">
        <blockquote>
          {caseStudy.headline_result}
          {' '}
          <em>{caseStudy.metric_value}</em>
          {caseStudy.metric_label ? ` ${caseStudy.metric_label}` : ''}
        </blockquote>
        <div className="case-meta">
          <span className="text-[var(--alt-muted)] text-[0.9375rem] font-light">
            {clientName}{caseStudy.period ? ` · ${caseStudy.period}` : ''}
          </span>
          <Link className="link-rose text-[var(--alt-fg)]" href={`/work/${caseStudy.slug}`}>
            Read the case study
          </Link>
        </div>
      </div>
    </section>
  )
}
