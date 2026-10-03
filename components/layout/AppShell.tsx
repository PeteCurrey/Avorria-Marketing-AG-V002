'use client'

import { usePathname } from 'next/navigation'
import { Navigation } from '@/components/navigation/Navigation'
import { Footer } from '@/components/layout/Footer'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { SmoothScrollProvider } from '@/components/motion/SmoothScrollProvider'
import type { ReactNode } from 'react'

/**
 * AppShell separates the public marketing experience from the dedicated
 * client and admin authentication / portal experiences.
 *
 * Client authentication and portal routes MUST NOT render the marketing
 * navigation bar, hamburger menu, Lobby CTA, or marketing footer.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  const isDedicatedPortalOrAuth =
    pathname?.startsWith('/client') ||
    pathname?.startsWith('/admin') ||
    pathname === '/admin-login' ||
    pathname === '/admin-mfa'

  if (isDedicatedPortalOrAuth) {
    return <>{children}</>
  }

  return (
    <SmoothScrollProvider>
      <Navigation />
      <main id="main-content" className="pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
      <RevealOnScroll />
    </SmoothScrollProvider>
  )
}
