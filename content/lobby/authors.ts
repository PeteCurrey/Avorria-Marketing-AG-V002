/**
 * content/lobby/authors.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Canonical verified authors for The Lobby.
 * Strict principle: Real authors only. Never fabricate contributor profiles.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { LobbyAuthor } from '@/types/lobby'

export const LOBBY_AUTHORS: LobbyAuthor[] = [
  {
    id: 'author-peter-currey',
    name: 'Peter Currey',
    role: 'Principal, Technical Strategy & Systems Architecture',
    bio: 'Directs digital architecture and software engineering at Avorria. Specialises in high-concurrency web systems, technical SEO engineering, and forensic UX teardowns.',
    slug: 'peter-currey',
    profileImage: null,
    socialLinks: {
      linkedin: 'https://linkedin.com/company/avorria',
    },
    isActive: true,
  },
  {
    id: 'author-avorria-desk',
    name: 'Avorria Editorial Desk',
    role: 'Forensic Digital Intelligence & Research Bureau',
    bio: 'The analytical research unit of Avorria, monitoring algorithmic shifts across Google, Meta, technical infrastructure, and sovereign software economics.',
    slug: 'editorial-desk',
    profileImage: null,
    socialLinks: {
      github: 'https://github.com/avorria',
    },
    isActive: true,
  },
]

export function getAuthorBySlug(slug: string): LobbyAuthor | undefined {
  return LOBBY_AUTHORS.find((a) => a.slug === slug && a.isActive)
}

export function getAllAuthors(): LobbyAuthor[] {
  return LOBBY_AUTHORS.filter((a) => a.isActive)
}
