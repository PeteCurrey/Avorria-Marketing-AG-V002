'use client'

import { usePathname } from 'next/navigation'
import { Navigation } from '@/components/navigation/Navigation'
import { ScrollProgress } from '@/components/motion/ScrollProgress'
import { SmoothScrollProvider } from '@/components/motion/SmoothScrollProvider'
import type { ReactNode } from 'react'

/**
 * AppShell foundation layout
 *
 * - Includes 2px rose scroll-progress line driven by ScrollTrigger
 * - Foundation Navigation with mix-blend-difference over dark sections
 * - Lenis + GSAP ScrollTrigger provider
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
      <ScrollProgress />
      <Navigation />
      {children}
    </SmoothScrollProvider>
  )
}
