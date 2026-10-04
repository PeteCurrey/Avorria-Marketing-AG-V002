import Link from 'next/link'
import { getHomeHero } from '@/content/home'

/**
 * Concept Hero Section
 *
 * Requirements:
 * - One H1 across three lines, huge (clamp 2.6rem to 7.6rem), Work Sans 200, tight tracking,
 *   left aligned, positioned at the bottom of the viewport.
 * - Line-by-line mask reveal on load (only unprompted motion on the page).
 * - One sentence of support text and one text link in rose underline (no arrow icon).
 * - Headline and support copy come from CMS field home.hero (Prompt 3).
 * - If the field is empty, build fails loudly.
 */
export function ConceptHero() {
  const hero = getHomeHero()

  return (
    <header className="hero-concept">
      <div className="wrap">
        <h1 className="h1-concept">
          <span className="line">
            <span>{hero.lines[0]}</span>
          </span>
          <span className="line">
            <span>{hero.lines[1]}</span>
          </span>
          <span className="line">
            <span>{hero.lines[2]}</span>
          </span>
        </h1>
        <div className="hero-foot fade-in">
          <p>{hero.support}</p>
          <Link className="link-rose" href={hero.cta.href}>
            {hero.cta.text}
          </Link>
        </div>
      </div>
    </header>
  )
}
