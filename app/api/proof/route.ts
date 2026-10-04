import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * Public Proof Content API (anon query)
 *
 * Enforces RLS:
 * - clients: verified = true only
 * - markets: verified = true only
 * - case_studies: verified = true AND published = true only
 * - testimonials: verified = true AND consent_documented = true only
 */
export async function GET() {
  const supabase = await createClient()

  const [clientsRes, marketsRes, caseStudiesRes, testimonialsRes] = await Promise.all([
    supabase.from('clients').select('name, logo_url, market, verified, sort').order('sort'),
    supabase.from('markets').select('country, verified'),
    supabase.from('case_studies').select('slug, headline_result, metric_label, metric_value, period, published, verified'),
    supabase.from('testimonials').select('quote, person, role, verified, consent_documented'),
  ])

  return NextResponse.json({
    clients: clientsRes.data ?? [],
    markets: marketsRes.data ?? [],
    case_studies: caseStudiesRes.data ?? [],
    testimonials: testimonialsRes.data ?? [],
  })
}
