import Link from 'next/link'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm'
import { createClient } from '@/lib/supabase/server'
import { getSession } from '@/lib/auth'

interface ResetPasswordPageProps {
  searchParams: Promise<{
    code?: string
    error?: string
    error_description?: string
  }>
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const params = await searchParams
  const code = params.code
  const errorParam = params.error

  let tokenInvalidOrExpired = false

  // If Supabase returned an explicit error parameter in URL
  if (errorParam) {
    tokenInvalidOrExpired = true
  }

  // If a recovery code was provided in the query string, exchange it for a session
  if (code && !tokenInvalidOrExpired) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
      console.error('[Auth Recovery Code Exchange Error]:', error.message)
      tokenInvalidOrExpired = true
    }
  }

  // Verify that an active session exists (either from code exchange or active recovery session)
  const session = await getSession()
  const hasActiveSession = Boolean(session)

  // If token is explicitly invalid/expired, or if visiting without any token/session
  if (tokenInvalidOrExpired || (!code && !hasActiveSession)) {
    return (
      <AuthLayout
        title="Link expired."
        subtitle="This password reset link is invalid or has already been used."
        badge="CLIENT PORTAL"
        backHref="/client/login"
        backLabel="Back to sign in"
        footerContent={
          <p className="text-[0.8125rem] font-light text-[var(--color-graphite-mid)]">
            Remember your credentials?{' '}
            <Link
              href="/client/login"
              className="text-[var(--color-graphite)] underline underline-offset-4 hover:text-[var(--color-cobalt)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-graphite)]"
            >
              Sign in
            </Link>
          </p>
        }
      >
        <div className="space-y-6">
          <div className="p-4 border border-[#B5616A]/30 bg-[#B5616A]/10 text-[0.8125rem] font-light text-[#9A4A53] leading-relaxed rounded-[var(--radius-sm)] space-y-2">
            <p>
              For security, password reset links can only be used once and expire shortly after being generated.
            </p>
          </div>

          <div className="space-y-3">
            <Link
              href="/client/forgot-password"
              className="block text-center w-full bg-[var(--color-cobalt)] hover:bg-[#2546E0] border border-[var(--color-cobalt)] text-white py-3.5 px-6 text-[0.8125rem] font-light tracking-[0.1em] uppercase rounded-[var(--radius-sm)] transition-colors duration-[var(--duration-base)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-cobalt)]"
            >
              Request a new reset link
            </Link>

            <Link
              href="/client/login"
              className="block text-center w-full bg-transparent hover:bg-black/5 border border-[var(--color-border-strong)] text-[var(--color-graphite)] py-3 px-6 text-[0.8125rem] font-light tracking-[0.06em] rounded-[var(--radius-sm)] transition-colors duration-[var(--duration-base)]"
            >
              Return to sign in
            </Link>
          </div>
        </div>
      </AuthLayout>
    )
  }

  // Token is valid and session is active for password update
  return (
    <AuthLayout
      title="Set new password."
      subtitle="Enter your new credentials to update your client portal access."
      badge="CLIENT PORTAL"
      backHref="/client/login"
      backLabel="Back to sign in"
      footerContent={
        <p className="text-[0.8125rem] font-light text-[var(--color-graphite-mid)]">
          Need assistance?{' '}
          <Link
            href="/contact"
            className="text-[var(--color-graphite)] underline underline-offset-4 hover:text-[var(--color-cobalt)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-graphite)]"
          >
            Contact us
          </Link>
        </p>
      }
    >
      <ResetPasswordForm />
    </AuthLayout>
  )
}
