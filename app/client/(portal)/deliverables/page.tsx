import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Client Portal // Deliverables & Artifacts — Avorria',
  robots: { index: false, follow: false },
}

export default async function ClientDeliverablesPage() {
  const deliverables = [
    {
      id: 'DEL-01',
      title: 'Staging Environment Preview Build (Release v0.4.2)',
      category: 'DEVELOPMENT_RELEASE',
      link: 'https://staging.alkota.avorria.dev',
      date: 'Deployed 2 days ago',
      sha: 'c8f4201',
    },
    {
      id: 'DEL-02',
      title: 'Figma Design System Tokens & Monolith Spec (v1.1)',
      category: 'DESIGN_FILE',
      link: 'https://figma.com/@avorria/alkota-spec',
      date: 'Published Sept 28',
      sha: 'Tokens synced',
    },
    {
      id: 'DEL-03',
      title: 'Parametric Tube Mitering Geometry Engine Module',
      category: 'SOURCE_CODE',
      link: 'https://github.com/alkota/platform/releases/tag/v0.3.0',
      date: 'Merged Sept 22',
      sha: '7a91bf2',
    },
  ]

  return (
    <div className="p-8 md:p-12 max-w-5xl space-y-10">
      
      {/* Header */}
      <div className="border-b border-black/10 pb-6">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 block mb-1">
          CLIENT PORTAL // ARTIFACT ARCHIVE
        </span>
        <h1 className="text-2xl md:text-3xl font-light text-neutral-900">
          Project Deliverables & Releases
        </h1>
        <p className="text-xs text-neutral-500 font-light mt-1">
          Direct access to verified engineering builds, staging links, and design tokens.
        </p>
      </div>

      {/* Deliverables List */}
      <div className="border border-black/10 bg-white divide-y divide-neutral-100">
        {deliverables.map((item) => (
          <div key={item.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-neutral-400">{item.id}</span>
                <span className="text-neutral-400">/</span>
                <span className="text-neutral-500">{item.category}</span>
              </div>
              <h3 className="text-base font-light text-neutral-900">{item.title}</h3>
              <p className="text-xs text-neutral-400 font-mono">{item.date} // COMMIT: {item.sha}</p>
            </div>

            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-neutral-200 text-xs font-mono uppercase tracking-wider text-neutral-700 hover:border-neutral-900 hover:text-neutral-900 transition-colors shrink-0 self-start sm:self-auto"
            >
              Access Artifact ↗
            </a>
          </div>
        ))}
      </div>

    </div>
  )
}
