/**
 * Avorria — Metadata Utilities
 * Centralised metadata generation using Next.js Metadata API.
 * All canonical/OG URLs use the production domain.
 */

import type { Metadata } from 'next'
import { siteConfig } from '@/content/config/site'

interface GenerateMetadataOptions {
  title?: string
  description?: string
  path?: string              // e.g. '/services/web-development'
  ogImage?: string           // Absolute URL or relative path
  noIndex?: boolean
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
}

/**
 * Generate consistent page metadata.
 * Title is suffixed with "— Avorria" unless it's the homepage.
 */
export function generatePageMetadata({
  title,
  description,
  path = '',
  ogImage,
  noIndex = false,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
}: GenerateMetadataOptions = {}): Metadata {
  const canonicalUrl = `${siteConfig.url}${path}`
  const pageTitle = title
    ? `${title} — Avorria`
    : `Avorria — ${siteConfig.tagline}`
  const pageDescription = description ?? siteConfig.description
  const resolvedOgImage = ogImage
    ? ogImage.startsWith('http')
      ? ogImage
      : `${siteConfig.url}${ogImage}`
    : `${siteConfig.url}/og/default.png`

  const metadata: Metadata = {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: 'en_GB',
      type,
      images: [
        {
          url: resolvedOgImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors && { authors }),
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [resolvedOgImage],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
        googleBot: { index: false, follow: false },
      },
    }),
  }

  return metadata
}
