/**
 * /industries/[slug] — Route Architecture Stub
 *
 * This route is architecturally prepared for future industry pages.
 * No thin industry pages are built during this foundation phase.
 *
 * When ready to implement:
 * 1. Add IndustryPage content type to types/content.ts
 * 2. Add content/industries/index.ts with industry data
 * 3. Implement getPublishedIndustries() and getIndustry() helpers
 * 4. Replace this stub with the full page implementation
 * 5. Update sitemap.ts to include industry routes
 *
 * Example future routes:
 * /industries/financial-services
 * /industries/ecommerce
 * /industries/professional-services
 */

import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

// No static params — returns 404 until content is added
export async function generateStaticParams() {
  return []
}

export default async function IndustryPage({ params }: Props) {
  // All industry pages 404 until content layer is implemented
  void await params
  notFound()
}
