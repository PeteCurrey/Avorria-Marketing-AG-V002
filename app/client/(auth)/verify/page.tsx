import Link from 'next/link'
import { AuthLayout } from '@/components/auth/AuthLayout'

export default function VerifyPage() {
  return (
    <AuthLayout
      title="Verify access."
      subtitle="Complete your client verification to access your Avorria workspace."
      badge="CLIENT PORTAL"
      backHref="/client/login"
      backLabel="Back to sign in"
      footerContent={
        <p className="text-[0.8125rem] font-light text-[var(--color-graphite-mid)]">
          Need support?{' '}
          <Link
            href="/contact"
            className="text-[var(--color-graphite)] underline underline-offset-4 hover:text-[var(--color-cobalt)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-graphite)]"
          >
            Contact us
          </Link>
        </p>
      }
    >
      <div className="space-y-6">
        <div className="p-5 border border-[var(--color-border-strong)] bg-white rounded-[var(--radius-sm)] space-y-3">
          <p className="text-[0.875rem] font-light text-[var(--color-graphite)] leading-relaxed">
            Please check your email inbox for a verification or magic sign-in link from Avorria.
          </p>
          <p className="text-[0.8125rem] font-light text-[var(--color-graphite-muted)] leading-relaxed">
            If you do not see the message in your inbox within a few minutes, check your junk or spam folder.
          </p>
        </div>

        <Link
          href="/client/login"
          className="block text-center w-full bg-[var(--color-cobalt)] hover:bg-[#2546E0] border border-[var(--color-cobalt)] text-white py-3.5 px-6 text-[0.8125rem] font-light tracking-[0.1em] uppercase rounded-[var(--radius-sm)] transition-colors duration-[var(--duration-base)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-cobalt)]"
        >
          Return to sign in
        </Link>
      </div>
    </AuthLayout>
  )
}
