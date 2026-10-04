import Link from 'next/link'
import { getLobbyArticles } from '@/lib/db/lobby'

/**
 * The Lobby Section (#lobby)
 * Sourced strictly from Supabase lobby_articles.
 * If database is empty or errors, section does not render.
 */
export async function LobbySection() {
  const { articles } = await getLobbyArticles()
  if (!articles || articles.length === 0) return null

  const preview = articles.slice(0, 3)

  return (
    <section className="section-pad" id="lobby">
      <div className="wrap">
        <h2 className="section-concept">The Lobby</h2>
        <div>
          {preview.map((article) => (
            <Link
              key={article.slug}
              className="lobby-concept-row"
              href={`/lobby/${article.slug}`}
            >
              <h3>{article.title}</h3>
              <span>{article.reading_time_minutes || 5} minutes</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
