import type { ReactNode } from 'react'

interface ArticleBodyProps {
  content: string
}

/**
 * ArticleBody
 * Server component that renders markdown / rich text content into clean semantic HTML.
 * Formatted with generous leading (1.82) and constrained to 62ch–68ch measure.
 */
export function ArticleBody({ content }: ArticleBodyProps) {
  // Split into paragraphs / blocks
  const blocks = content.split(/\n\n+/)

  return (
    <div className="lobby-article__body">
      {blocks.map((block, idx) => {
        const trimmed = block.trim()
        if (!trimmed) return null

        // H2 heading
        if (trimmed.startsWith('## ')) {
          const text = trimmed.replace(/^##\s+/, '')
          return <h2 key={idx}>{text}</h2>
        }

        // H3 heading
        if (trimmed.startsWith('### ')) {
          const text = trimmed.replace(/^###\s+/, '')
          return <h3 key={idx}>{text}</h3>
        }

        // Blockquote
        if (trimmed.startsWith('> ')) {
          const text = trimmed.replace(/^>\s+/, '')
          return <blockquote key={idx}><p>{text}</p></blockquote>
        }

        // Unordered list
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const items = trimmed.split('\n').map((line) => line.replace(/^[-*]\s+/, ''))
          return (
            <ul key={idx}>
              {items.map((item, itemIdx) => (
                <li key={itemIdx}>{item}</li>
              ))}
            </ul>
          )
        }

        // Standard paragraph
        return <p key={idx}>{trimmed}</p>
      })}
    </div>
  )
}
