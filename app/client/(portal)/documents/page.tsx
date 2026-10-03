import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Client Portal // Documents & IP Records — Avorria',
  robots: { index: false, follow: false },
}

export default async function ClientDocumentsPage() {
  const documents = [
    {
      id: 'DOC-01',
      title: 'Executed Mutual Non-Disclosure Agreement (NDA)',
      category: 'LEGAL',
      date: 'Sept 15, 2026',
      status: 'VERIFIED_SIGNATURE',
    },
    {
      id: 'DOC-02',
      title: 'Master Services Agreement & Sovereign Code Assignment (MSA)',
      category: 'CONTRACT',
      date: 'Sept 18, 2026',
      status: 'EXECUTED',
    },
    {
      id: 'DOC-03',
      title: 'Architectural Technical Specification (v1.2)',
      category: 'SPECIFICATION',
      date: 'Sept 20, 2026',
      status: 'ACTIVE_SPEC',
    },
    {
      id: 'DOC-04',
      title: 'Invoice #AVR-INV-1049 (50% Build Sprint Commitment Deposit)',
      category: 'INVOICE',
      date: 'Sept 21, 2026',
      status: 'PAID',
    },
  ]

  return (
    <div className="p-8 md:p-12 max-w-5xl space-y-10">
      
      {/* Header */}
      <div className="border-b border-black/10 pb-6">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 block mb-1">
          CLIENT PORTAL // CONTRACTUAL & GOVERNANCE ARCHIVE
        </span>
        <h1 className="text-2xl md:text-3xl font-light text-neutral-900">
          Governance & IP Documents
        </h1>
        <p className="text-xs text-neutral-500 font-light mt-1">
          Access signed legal agreements, intellectual property assignments, and invoices.
        </p>
      </div>

      <div className="border border-black/10 bg-white divide-y divide-neutral-100">
        {documents.map((doc) => (
          <div key={doc.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-neutral-400">{doc.id}</span>
                <span className="text-neutral-400">/</span>
                <span className="text-neutral-500">{doc.category}</span>
                <span className="text-neutral-300">·</span>
                <span className="text-emerald-700 font-mono text-[11px]">[{doc.status}]</span>
              </div>
              <h3 className="text-base font-light text-neutral-900">{doc.title}</h3>
              <p className="text-xs text-neutral-400">{doc.date}</p>
            </div>

            <button
              type="button"
              className="px-4 py-2 border border-neutral-200 text-xs font-mono uppercase tracking-wider text-neutral-700 hover:border-neutral-900 hover:text-neutral-900 transition-colors shrink-0 self-start sm:self-auto"
            >
              Download PDF ↓
            </button>
          </div>
        ))}
      </div>

    </div>
  )
}
