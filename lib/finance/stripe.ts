import 'server-only'
import { writeAuditEvent } from '@/lib/db/audit'

export interface CreateDepositParams {
  proposalId: string
  organisationName: string
  projectTitle: string
  depositAmount: number
  currency: 'GBP' | 'USD' | 'EUR'
  clientEmail: string
}

export interface StripeDepositResult {
  success: boolean
  checkoutUrl?: string
  sessionId?: string
  error?: string
  mode: 'LIVE' | 'SIMULATED'
}

export async function createDepositCheckoutSession(
  params: CreateDepositParams
): Promise<StripeDepositResult> {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://avorria.com'

  // If live Stripe API key is configured
  if (stripeSecretKey && stripeSecretKey.startsWith('sk_')) {
    try {
      const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${stripeSecretKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          'payment_method_types[0]': 'card',
          'line_items[0][price_data][currency]': params.currency.toLowerCase(),
          'line_items[0][price_data][product_data][name]': `50% Commitment Deposit // ${params.projectTitle}`,
          'line_items[0][price_data][product_data][description]': `Fixed-scope sprint deposit for ${params.organisationName} (Proposal: ${params.proposalId})`,
          'line_items[0][price_data][unit_amount]': (params.depositAmount * 100).toString(),
          'line_items[0][quantity]': '1',
          mode: 'payment',
          customer_email: params.clientEmail,
          success_url: `${siteUrl}/client/proposals?deposit_success=true&proposal=${params.proposalId}`,
          cancel_url: `${siteUrl}/client/proposals?deposit_canceled=true&proposal=${params.proposalId}`,
        }),
      })

      const data = await response.json()
      if (response.ok && data.url) {
        return {
          success: true,
          checkoutUrl: data.url,
          sessionId: data.id,
          mode: 'LIVE',
        }
      }
      return {
        success: false,
        error: data.error?.message || 'Stripe session creation failed',
        mode: 'LIVE',
      }
    } catch (err: unknown) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Stripe network error',
        mode: 'LIVE',
      }
    }
  }

  // Simulated Test Environment (Graceful, explicit simulation without false claims)
  const mockSessionId = `cs_test_${Date.now().toString(36)}`
  const mockCheckoutUrl = `${siteUrl}/client/proposals?simulated_checkout=true&session=${mockSessionId}&amount=${params.depositAmount}&proposal=${params.proposalId}`

  await writeAuditEvent({
    action: 'STRIPE_DEPOSIT_SESSION_CREATED_SIMULATED',
    resourceType: 'deposit_session',
    resourceId: mockSessionId,
    metadata: {
      proposalId: params.proposalId,
      amount: params.depositAmount,
      currency: params.currency,
      mode: 'SIMULATED',
    },
  }).catch(() => {})

  return {
    success: true,
    checkoutUrl: mockCheckoutUrl,
    sessionId: mockSessionId,
    mode: 'SIMULATED',
  }
}
