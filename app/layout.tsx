// Validate environment variables at server startup — throws descriptively if missing
import '@/lib/env'
import type { Metadata } from 'next'
import { Work_Sans } from 'next/font/google'
import { Navigation } from '@/components/navigation/Navigation'
import { Footer } from '@/components/layout/Footer'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { siteConfig } from '@/content/config/site'
import '@/styles/globals.css'

// ─── Font — next/font self-hosted, variable, latin subset ────────────────────
// Weights: 200 (Extra Light) + 300 (Light), normal + italic only.
// No other weights loaded. CSS variable --font-work-sans consumed in @theme.

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['200', '300'],
  style: ['normal', 'italic'],
  variable: '--font-work-sans',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
})

// ─── Global Metadata ─────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `Avorria — ${siteConfig.tagline}`,
    template: '%s — Avorria',
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [
    'web development agency',
    'AI development',
    'digital products',
    'digital systems',
    'web application development',
    'AI integration',
    'AI automation',
    'bespoke software development',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `Avorria — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: '/og/default.png',
        width: 1200,
        height: 630,
        alt: `Avorria — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Avorria — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ['/og/default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

// ─── Organization & WebSite Structured Data ───────────────────────────────────

function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteConfig.url}/#organization`,
        name: siteConfig.organization.name,
        url: siteConfig.organization.url,
        logo: {
          '@type': 'ImageObject',
          url: siteConfig.organization.logo,
        },
        description: siteConfig.organization.description,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          email: siteConfig.organization.contactEmail,
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.tagline,
        publisher: {
          '@id': `${siteConfig.url}/#organization`,
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteConfig.url}/lobby?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ─── Root Layout ─────────────────────────────────────────────────────────────

import { WordmarkCurtain } from '@/components/curtain/WordmarkCurtain'
import { SmoothScrollProvider } from '@/components/motion/SmoothScrollProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-GB" className={workSans.variable}>
      <head>
        <OrganizationSchema />
        {/*
          Inline script: add "js" class to <html> synchronously before first paint.
          This gates all CSS motion reveal states — content is always visible
          without JS. No FOUC, no layout shift.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body>
        <WordmarkCurtain />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--color-graphite)] focus:text-[var(--color-ivory)] focus:rounded-[var(--radius-sm)]"
        >
          Skip to main content
        </a>
        <SmoothScrollProvider>
          <Navigation />
          <main id="main-content" className="pt-16 md:pt-20">
            {children}
          </main>
          <Footer />
          <RevealOnScroll />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
