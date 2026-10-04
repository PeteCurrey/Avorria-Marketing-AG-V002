/**
 * Avorria — Site Configuration
 * Single source of truth for URLs, entity data, and global metadata.
 */

export const siteConfig = {
  name: 'Avorria',
  tagline: 'Digital Products. Intelligent Systems.',
  description:
    'Avorria designs and builds digital products, intelligent systems and high-performance websites for ambitious businesses.',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://avorria.com').replace(/^http:\/\//i, 'https://'),
  email: {
    hello: 'hello@avorria.com',
    support: 'support@avorria.com',
  },
  social: {
    // Only add verified, active profiles
    // linkedin: 'https://linkedin.com/company/avorria',
  },
  // Organization entity — verified information only
  organization: {
    name: 'Avorria',
    url: 'https://avorria.com',
    logo: 'https://avorria.com/images/avorria-logo.svg',
    description:
      'Avorria is a digital agency and technology studio specialising in web development, AI development and digital systems.',
    contactEmail: 'hello@avorria.com',
    // Address intentionally omitted until verified
    // sameAs: [], // social profiles when verified
  },
} as const

export type SiteConfig = typeof siteConfig
