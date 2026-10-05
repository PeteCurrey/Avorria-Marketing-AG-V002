/**
 * components/lobby/LobbyBlockRenderer.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Server component that renders structured article content as clean semantic
 * HTML. Handles both new LobbyBlock[] format and legacy LobbySection[].
 * Zero editor/admin JavaScript in the public bundle.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import React from 'react'
import Link from 'next/link'
import type { LobbyBlock, LobbySection } from '@/types/lobby'

interface LobbyBlockRendererProps {
  blocks?: LobbyBlock[]
  sections?: LobbySection[]     // legacy static seed format
  className?: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
}

/**
 * Parses markdown inline links [text](url) and `code` spans safely.
 */
function formatInlineText(text: string): React.ReactNode {
  if (!text || typeof text !== 'string') return text

  // Regex to split on [anchor](url) and `code`
  const tokenRegex = /(\[[^\]]+\]\([^)]+\)|`[^`]+`)/g
  const parts = text.split(tokenRegex)

  if (parts.length === 1) return text

  return parts.map((part, index) => {
    // Markdown link: [text](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (linkMatch) {
      const [, label, href] = linkMatch
      const isInternal = href.startsWith('/') || href.startsWith('#')
      if (isInternal) {
        return (
          <Link
            key={index}
            href={href}
            className="text-[var(--color-graphite)] underline underline-offset-4 decoration-[var(--color-accent)] hover:text-[var(--color-rose-text)] transition-colors duration-200"
          >
            {label}
          </Link>
        )
      }
      return (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-graphite)] underline underline-offset-4 decoration-[var(--color-border-strong)] hover:text-[var(--color-accent)] transition-colors duration-200"
        >
          {label}
        </a>
      )
    }

    // Inline code: `code`
    const codeMatch = part.match(/^`([^`]+)`$/)
    if (codeMatch) {
      return (
        <code
          key={index}
          className="bg-[var(--color-ivory-dark)] px-1.5 py-0.5 rounded text-[0.875em] font-mono text-[var(--color-graphite)]"
        >
          {codeMatch[1]}
        </code>
      )
    }

    return part
  })
}

// ─── Block Renderers ──────────────────────────────────────────────────────────

function RenderBlock({ block }: { block: LobbyBlock }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="text-[var(--text-body)] font-light text-[var(--color-graphite)] leading-[1.8] mb-6 max-w-[68ch]">
          {formatInlineText(block.text)}
        </p>
      )

    case 'lead':
      return (
        <p className="text-[1.125rem] font-light text-[var(--color-graphite)] leading-[1.7] mb-8 max-w-[60ch] border-l-2 border-[var(--color-accent)] pl-6">
          {formatInlineText(block.text)}
        </p>
      )

    case 'heading': {
      const id = block.id ?? slugify(block.text)
      if (block.level === 2) return (
        <h2 id={id} className="text-[1.125rem] font-light tracking-[0.02em] text-[var(--color-graphite)] mt-12 mb-4 max-w-[68ch]">
          {block.text}
        </h2>
      )
      if (block.level === 3) return (
        <h3 id={id} className="text-[var(--text-small)] font-light tracking-[0.04em] uppercase text-[var(--color-graphite-mid)] mt-10 mb-3">
          {block.text}
        </h3>
      )
      return (
        <h4 id={id} className="text-[var(--text-small)] font-light text-[var(--color-graphite)] mt-8 mb-2">
          {block.text}
        </h4>
      )
    }

    case 'pullquote':
      return (
        <blockquote className="border-l border-[var(--color-accent)] pl-8 py-2 my-10 max-w-[54ch]">
          <p className="text-[1.0625rem] font-light text-[var(--color-graphite)] leading-[1.7] italic mb-3">
            "{block.quote}"
          </p>
          {block.attribution && (
            <cite className="text-[0.6875rem] font-light tracking-[0.12em] uppercase text-[var(--color-graphite-muted)] not-italic">
              — {block.attribution}
            </cite>
          )}
        </blockquote>
      )

    case 'callout': {
      const variantStyles = {
        takeaway:      'border-[var(--color-accent)]',
        risk:          'border-[var(--color-graphite-mid)]',
        architectural: 'border-[var(--color-graphite)]',
      }
      const variantLabels = {
        takeaway:      'KEY TAKEAWAY',
        risk:          'OPERATIONAL RISK',
        architectural: 'ARCHITECTURAL NOTE',
      }
      return (
        <aside className={`border-l-2 ${variantStyles[block.variant]} pl-6 py-4 my-8 max-w-[58ch]`}>
          <p className="text-[0.6875rem] font-light tracking-[0.16em] uppercase text-[var(--color-graphite-muted)] mb-2">
            {variantLabels[block.variant]}
          </p>
          <p className="text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] mb-1">
            {block.title}
          </p>
          <p className="text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] leading-relaxed">
            {block.body}
          </p>
        </aside>
      )
    }

    case 'table':
      return (
        <div className="overflow-x-auto my-8 max-w-full">
          <table className="w-full text-[var(--text-small)] font-light text-[var(--color-graphite)] border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                {block.headers.map((h, i) => (
                  <th key={i} className="text-left text-[0.6875rem] tracking-[0.1em] uppercase text-[var(--color-graphite-muted)] pb-3 pr-6 font-light">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-[var(--color-border)] h-14">
                  {row.map((cell, ci) => (
                    <td key={ci} className="py-4 pr-6 align-middle leading-relaxed">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'code':
      return (
        <figure className="my-8">
          <pre className="bg-[var(--color-ivory)] border border-[var(--color-border)] rounded-[var(--radius-sm)] p-6 overflow-x-auto text-[0.8125rem] font-mono text-[var(--color-graphite)] leading-[1.7]">
            <code>{block.code}</code>
          </pre>
          {block.caption && (
            <figcaption className="text-[0.6875rem] font-light tracking-[0.08em] uppercase text-[var(--color-graphite-muted)] mt-2">
              {block.caption}
            </figcaption>
          )}
        </figure>
      )

    case 'list':
      if (block.ordered) {
        return (
          <ol className="my-6 space-y-2 max-w-[60ch] list-none pl-0">
            {block.items.map((item, i) => (
              <li key={i} className="flex gap-4 text-[var(--text-small)] font-light text-[var(--color-graphite)] leading-relaxed">
                <span className="text-[0.6875rem] tracking-[0.12em] uppercase text-[var(--color-graphite-muted)] pt-0.5 shrink-0 w-6 text-right">{String(i + 1).padStart(2, '0')}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        )
      }
      return (
        <ul className="my-6 space-y-2 max-w-[60ch] list-none pl-0">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-4 text-[var(--text-small)] font-light text-[var(--color-graphite)] leading-relaxed">
              <span className="text-[var(--color-accent)] mt-1 shrink-0">·</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )

    case 'divider':
      return <hr className="border-0 border-t border-[var(--color-border)] my-12 max-w-[120px]" aria-hidden="true" />

    case 'image':
      return (
        <figure className="my-10">
          {/* Use next/image when URL is on-domain; plain img for external */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.url}
            alt={block.alt}
            className="w-full rounded-[var(--radius-sm)] border border-[var(--color-border)]"
            loading="lazy"
          />
          {block.caption && (
            <figcaption className="text-[0.6875rem] font-light tracking-[0.08em] uppercase text-[var(--color-graphite-muted)] mt-3">
              {block.caption}
            </figcaption>
          )}
        </figure>
      )

    default:
      return null
  }
}

// ─── Legacy Section Renderer ──────────────────────────────────────────────────

function RenderSection({ section }: { section: LobbySection }) {
  const headingId = section.title ? slugify(section.romanNumeral ? `${section.romanNumeral} ${section.title}` : section.title) : undefined

  return (
    <section className="mb-12">
      {(section.romanNumeral || section.title) && (
        <div className="mb-6 pb-4 border-b border-[var(--color-border)]">
          {section.romanNumeral && (
            <span className="text-[0.625rem] font-light tracking-[0.2em] uppercase text-[var(--color-graphite-muted)] mr-4">
              {section.romanNumeral}
            </span>
          )}
          {section.title && (
            <h2 id={headingId} className="inline text-[1.0625rem] font-light text-[var(--color-graphite)]">
              {section.title}
            </h2>
          )}
        </div>
      )}

      {section.paragraphs.map((p, i) => (
        <p key={i} className="text-[var(--text-body)] font-light text-[var(--color-graphite)] leading-[1.8] mb-6 max-w-[68ch]">
          {formatInlineText(p)}
        </p>
      ))}

      {section.pullQuote && (
        <blockquote className="border-l border-[var(--color-accent)] pl-8 py-2 my-10 max-w-[54ch]">
          <p className="text-[1.0625rem] font-light text-[var(--color-graphite)] leading-[1.7] italic mb-3">
            "{section.pullQuote.text}"
          </p>
          {section.pullQuote.attribution && (
            <cite className="text-[0.6875rem] font-light tracking-[0.12em] uppercase text-[var(--color-graphite-muted)] not-italic">
              — {section.pullQuote.attribution}
            </cite>
          )}
        </blockquote>
      )}

      {section.comparisonTable && (
        <div className="overflow-x-auto my-8">
          <table className="w-full text-[var(--text-small)] font-light text-[var(--color-graphite)] border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                {section.comparisonTable.headers.map((h, i) => (
                  <th key={i} className="text-left text-[0.6875rem] tracking-[0.1em] uppercase text-[var(--color-graphite-muted)] pb-3 pr-6 font-light">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.comparisonTable.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-[var(--color-border)] h-14">
                  {row.map((cell, ci) => (
                    <td key={ci} className="py-4 pr-6 align-middle">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {section.codeSnippet && (
        <pre className="bg-[var(--color-ivory)] border border-[var(--color-border)] rounded-[var(--radius-sm)] p-6 my-8 overflow-x-auto text-[0.8125rem] font-mono text-[var(--color-graphite)] leading-[1.7]">
          <code>{section.codeSnippet.code}</code>
        </pre>
      )}

      {section.callout && (
        <aside className="border-l-2 border-[var(--color-accent)] pl-6 py-4 my-8 max-w-[58ch]">
          <p className="text-[0.6875rem] font-light tracking-[0.16em] uppercase text-[var(--color-graphite-muted)] mb-2">
            {section.callout.type.replace(/_/g, ' ')}
          </p>
          <p className="text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] mb-1">{section.callout.title}</p>
          <p className="text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] leading-relaxed">{section.callout.body}</p>
        </aside>
      )}
    </section>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function LobbyBlockRenderer({ blocks, sections, className = '' }: LobbyBlockRendererProps) {
  // Use structured blocks if available, fall back to legacy sections
  const hasBlocks = blocks && blocks.length > 0
  const hasSections = sections && sections.length > 0

  if (!hasBlocks && !hasSections) {
    return null
  }

  return (
    <div className={`lobby-body ${className}`} aria-label="Article body">
      {hasBlocks
        ? blocks!.map((block, i) => <RenderBlock key={i} block={block} />)
        : sections!.map((section, i) => <RenderSection key={i} section={section} />)
      }
    </div>
  )
}

// ─── Table of Contents extractor (server-side) ────────────────────────────────

export interface TocItem {
  id: string
  text: string
  level: number
}

export function extractToc(blocks?: LobbyBlock[], sections?: LobbySection[]): TocItem[] {
  const items: TocItem[] = []

  if (blocks && blocks.length > 0) {
    for (const block of blocks) {
      if (block.type === 'heading' && (block.level === 2 || block.level === 3)) {
        items.push({
          id: block.id ?? slugify(block.text),
          text: block.text,
          level: block.level,
        })
      }
    }
  } else if (sections) {
    for (const section of sections) {
      if (section.title) {
        items.push({
          id: slugify(section.romanNumeral ? `${section.romanNumeral} ${section.title}` : section.title),
          text: section.title,
          level: 2,
        })
      }
    }
  }

  return items
}
