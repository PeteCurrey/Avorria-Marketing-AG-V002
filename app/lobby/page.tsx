import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'The Lobby',
  description:
    'Ideas, thinking and notes from the Avorria studio — on web development, AI, digital systems and the practice of building things that last.',
  path: '/lobby',
})

/**
 * /lobby — The Lobby
 *
 * Publishing space for Avorria: longer-form writing, notes, thinking.
 * Content will be populated in a future phase.
 */
export default function LobbyPage() {
  return (
    <div className="section-y">
      <div className="container-max">
        <div className="container-content">

          {/* Page header */}
          <div className="border-b border-[var(--color-border)] pb-12 mb-16">
            <p className="text-label-upper mb-4">The Lobby</p>
            <h1 className="text-display-l max-w-[640px]">
              Writing, thinking,<br />
              <em className="not-italic italic text-[var(--color-graphite-mid)]">notes</em> from the studio.
            </h1>
          </div>

          {/* Empty state — truthful, no fabricated articles */}
          <div className="border border-[var(--color-border)] p-12 text-center max-w-[480px] mx-auto">
            <p className="text-label-upper text-[var(--color-graphite-muted)] mb-3">Nothing published yet</p>
            <p className="text-[var(--text-small)] font-light text-[var(--color-graphite-mid)] leading-relaxed">
              When we publish, it will appear here. No filler, no frequency targets.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
