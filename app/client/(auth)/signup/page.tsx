import Link from 'next/link'
import { AuthLayout } from '@/components/auth/AuthLayout'

export default function SignUpPage() {
  return (
    <AuthLayout
      title="Client access."
      subtitle="Avorria client workspaces are provisioned upon project engagement."
      badge="CLIENT PORTAL"
      backHref="/client/login"
      backLabel="Back to sign in"
      footerContent={
        <p className="text-[0.8125rem] font-light text-[var(--color-graphite-mid)]">
          Already have an account?{' '}
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
        <div className="p-5 border border-[var(--color-border-strong)] bg-white rounded-[var(--radius-sm)] space-y-3">
          <p className="text-[0.875rem] font-light text-[var(--color-graphite)] leading-relaxed">
            Client portal workspaces are invitation-only environments dedicated to active agency partners and project stakeholders.
          </p>
          <p className="text-[0.8125rem] font-light text-[var(--color-graphite-muted)] leading-relaxed">
            If you are launching a new initiative or need access for your team, please submit a project enquiry or speak with your engagement partner.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href="/start-a-project"
            className="block text-center w-full bg-[var(--color-cobalt)] hover:bg-[#2546E0] border border-[var(--color-cobalt)] text-white py-3.5 px-6 text-[0.8125rem] font-light tracking-[0.1em] uppercase rounded-[var(--radius-sm)] transition-colors duration-[var(--duration-base)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-cobalt)]"
          >
            Start a project
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
