import { NextResponse } from 'next/server'
import { getPublishedArticles } from '@/lib/lobby'
import { siteConfig } from '@/content/config/site'

export const revalidate = 3600

/**
 * GET /lobby/rss.xml
 * RSS 2.0 feed of published Lobby articles.
 * Valid application/xml MIME type, item per article.
 */
export async function GET() {
  const articles = await getPublishedArticles({ limit: 50 })
  const base = siteConfig.url

  const escXml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

  const items = articles.map((a) => {
    const title = escXml(a.title)
    const desc = escXml(a.excerpt ?? a.dek ?? '')
    const link = `${base}/lobby/${a.slug}`
    const pubDate = new Date(a.publishedAt).toUTCString()
    const authorName = escXml(
      typeof a.author === 'object' && 'name' in a.author
        ? a.author.name
        : a.leadAuthor?.name ?? 'Avorria Editorial Desk'
    )
    const category = escXml(a.categoryName ?? a.categoryLabel ?? a.category ?? '')
    return `
    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${desc}</description>
      <pubDate>${pubDate}</pubDate>
      <author>${authorName}</author>
      ${category ? `<category>${category}</category>` : ''}
    </item>`
  }).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Lobby — Avorria</title>
    <link>${base}/lobby</link>
    <description>What changed. What matters. What you should do about it. Editorial intelligence on Google, Meta, websites, and marketing from Avorria.</description>
    <language>en-GB</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${base}/lobby/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
