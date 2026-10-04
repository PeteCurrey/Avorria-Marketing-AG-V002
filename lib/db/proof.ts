import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/types/supabase'

export type ClientRow = Database['public']['Tables']['clients']['Row']
export type MarketRow = Database['public']['Tables']['markets']['Row']
export type CaseStudyRow = Database['public']['Tables']['case_studies']['Row']
export type TestimonialRow = Database['public']['Tables']['testimonials']['Row']

export type CaseStudyWithClient = CaseStudyRow & {
  clients?: ClientRow | null
}

/**
 * Fetch verified clients.
 * Enforced by Supabase RLS: returns only rows where verified = true.
 * Own ventures are not clients and must never appear in the proof band.
 */
export async function getVerifiedClients(): Promise<ClientRow[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('verified', true)
      .order('sort', { ascending: true })

    if (error) {
      console.error('[Proof] Error fetching verified clients:', error.message)
      return []
    }
    return data ?? []
  } catch (err) {
    console.error('[Proof] Unexpected error fetching clients:', err)
    return []
  }
}

/**
 * Fetch verified markets.
 * Enforced by Supabase RLS: returns only rows where verified = true.
 */
export async function getVerifiedMarkets(): Promise<MarketRow[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('markets')
      .select('*')
      .eq('verified', true)

    if (error) {
      console.error('[Proof] Error fetching verified markets:', error.message)
      return []
    }
    return data ?? []
  } catch (err) {
    console.error('[Proof] Unexpected error fetching markets:', err)
    return []
  }
}

/**
 * Fetch verified and published case studies with their associated client.
 * Enforced by Supabase RLS: returns only rows where verified = true AND published = true.
 */
export async function getVerifiedPublishedCaseStudies(): Promise<CaseStudyWithClient[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('case_studies')
      .select('*, clients(*)')
      .eq('verified', true)
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[Proof] Error fetching verified case studies:', error.message)
      return []
    }
    return (data as unknown as CaseStudyWithClient[]) ?? []
  } catch (err) {
    console.error('[Proof] Unexpected error fetching case studies:', err)
    return []
  }
}

/**
 * Fetch featured verified case study.
 * Case study metrics render only from a verified row.
 * Returns null if no verified case study exists.
 */
export async function getFeaturedVerifiedCaseStudy(): Promise<CaseStudyWithClient | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('case_studies')
      .select('*, clients(*)')
      .eq('verified', true)
      .eq('published', true)
      .limit(1)
      .maybeSingle()

    if (error) {
      console.error('[Proof] Error fetching featured case study:', error.message)
      return null
    }
    return (data as unknown as CaseStudyWithClient) ?? null
  } catch (err) {
    console.error('[Proof] Unexpected error fetching featured case study:', err)
    return null
  }
}

/**
 * Fetch a single verified, published case study by its slug.
 * Returns null if no verified row exists — metrics must never show placeholder data.
 */
export async function getVerifiedCaseStudyBySlug(slug: string): Promise<CaseStudyWithClient | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('case_studies')
      .select('*, clients(*)')
      .eq('slug', slug)
      .eq('verified', true)
      .eq('published', true)
      .maybeSingle()

    if (error) {
      console.error('[Proof] Error fetching case study by slug:', error.message)
      return null
    }
    return (data as unknown as CaseStudyWithClient) ?? null
  } catch (err) {
    console.error('[Proof] Unexpected error fetching case study by slug:', err)
    return null
  }
}

/**
 * Fetch verified testimonials.
 * Enforced by Supabase RLS: returns only rows where verified = true AND consent_documented = true.
 */
export async function getVerifiedTestimonials(): Promise<TestimonialRow[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('verified', true)
      .eq('consent_documented', true)

    if (error) {
      console.error('[Proof] Error fetching verified testimonials:', error.message)
      return []
    }
    return data ?? []
  } catch (err) {
    console.error('[Proof] Unexpected error fetching testimonials:', err)
    return []
  }
}

/**
 * Fetch site copy value by key.
 */
export async function getSiteCopy(key: string): Promise<string | null> {
  try {
    const supabase = await createClient()
    const result = await supabase
      .from('site_copy')
      .select('value')
      .eq('key', key)
      .maybeSingle()

    if (result.error || !result.data) {
      return null
    }
    const row = result.data as unknown as { value: string }
    return row.value
  } catch {
    return null
  }
}
