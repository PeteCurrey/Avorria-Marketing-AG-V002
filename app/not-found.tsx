import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: {
    absolute: 'Page Not Found — Avorria',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <div className="section-y-large">
      <div className="container-max">
        <div className="container-content">
          <div className="border-b border-[var(--color-border)] pb-16 mb-16">
            <p className="text-label-upper mb-6 text-muted">404</p>
            <h1 className="text-display-l max-w-[600px]">
              Page not found.
            </h1>
          </div>
          <p className="text-body-l text-secondary mb-10 max-w-[480px]">
            The page you are looking for does not exist, or may have moved.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button as="link" href="/" variant="primary" size="md">
              Go to homepage
            </Button>
            <Button as="link" href="/work" variant="ghost" size="md">
              View our work
            </Button>
            <Button as="link" href="/contact" variant="ghost" size="md">
              Contact us
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
