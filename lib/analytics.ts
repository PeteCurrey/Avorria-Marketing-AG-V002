/**
 * Avorria — Analytics Event Tracking
 *
 * Provider-agnostic analytics layer. Tracks conversion-critical events
 * without loading heavy third-party scripts or compromising performance.
 *
 * To connect a provider, set NEXT_PUBLIC_ANALYTICS_ID and implement
 * the dispatch function below for Plausible, Fathom, PostHog, etc.
 *
 * Privacy: no PII is sent. Only event names and non-identifying metadata.
 */

export type AnalyticsEvent =
  // CTAs
  | 'cta_click_start_project'
  | 'cta_click_view_work'
  | 'cta_click_hero_primary'
  | 'cta_click_hero_secondary'
  | 'cta_click_footer'
  | 'cta_click_service_enquire'
  | 'cta_click_work_enquire'
  // Contact
  | 'contact_email_click'
  | 'outbound_click'
  // Project form lifecycle
  | 'form_start'
  | 'form_submit'
  | 'form_success'
  | 'form_error'
  | 'form_abandon'
  // Journey
  | 'service_to_enquiry'
  | 'work_to_enquiry'
  | 'journal_to_enquiry'

export interface AnalyticsPayload {
  event: AnalyticsEvent
  props?: Record<string, string | number | boolean>
}

/**
 * Track an analytics event.
 * Safe to call server-side (no-op) and during SSR.
 */
export function track(event: AnalyticsEvent, props?: Record<string, string | number | boolean>): void {
  if (typeof window === 'undefined') return
  if (!process.env.NEXT_PUBLIC_ANALYTICS_ID) {
    // Log to console in development only
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', event, props)
    }
    return
  }

  // Provider dispatch — implement for your chosen analytics provider
  // Example (Plausible):
  // window.plausible?.(event, { props })
  //
  // Example (Fathom):
  // window.fathom?.trackEvent(event)
  //
  // Example (PostHog):
  // window.posthog?.capture(event, props)
}

/**
 * Hook: track form lifecycle events.
 * Call from ProjectForm to track start, submit, success, error, abandon.
 */
export function trackForm(stage: 'start' | 'submit' | 'success' | 'error' | 'abandon'): void {
  const map: Record<typeof stage, AnalyticsEvent> = {
    start: 'form_start',
    submit: 'form_submit',
    success: 'form_success',
    error: 'form_error',
    abandon: 'form_abandon',
  }
  track(map[stage])
}

/**
 * Track journey: source page → enquiry form
 */
export function trackJourney(source: 'service' | 'work' | 'journal'): void {
  const map: Record<typeof source, AnalyticsEvent> = {
    service: 'service_to_enquiry',
    work: 'work_to_enquiry',
    journal: 'journal_to_enquiry',
  }
  track(map[source])
}
