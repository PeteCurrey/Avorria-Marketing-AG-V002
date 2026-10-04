export interface HomeHeroCms {
  lines: [string, string, string]
  support: string
  cta: {
    text: string
    href: string
  }
}

export interface HomeCmsContent {
  hero: HomeHeroCms
}

/**
 * CMS Content for Homepage — Prompt 3
 * Headline and support copy Sourced directly from reference concept.
 */
export const homeContent: HomeCmsContent = {
  hero: {
    lines: [
      'Websites and AI systems',
      'for companies that',
      'operate across borders.',
    ],
    support: 'One team to design, build and run the digital side of your business.',
    cta: {
      text: 'Start a conversation',
      href: '#contact',
    },
  },
}

/**
 * Fetch home.hero CMS field.
 * Fails loudly if the field is empty or missing, per brief rule.
 */
export function getHomeHero(): HomeHeroCms {
  const hero = homeContent?.hero
  if (
    !hero ||
    !Array.isArray(hero.lines) ||
    hero.lines.length !== 3 ||
    hero.lines.some((l) => typeof l !== 'string' || !l.trim()) ||
    !hero.support?.trim() ||
    !hero.cta?.text?.trim()
  ) {
    throw new Error(
      'FATAL: CMS field home.hero is empty or incomplete. Build failed loudly as required.',
    )
  }
  return hero
}
