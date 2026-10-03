import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Client Portal // Principal Communications — Avorria',
  robots: { index: false, follow: false },
}

export default async function ClientMessagesPage() {
  const messages = [
    {
      id: 'MSG-03',
      sender: 'Peter C. (Lead Principal)',
      role: 'AVORRIA PRINCIPAL',
      time: 'Yesterday at 16:42',
      body: 'Sprint 02 WebGL shader optimizations have passed frame budget testing on iPhone 13+ devices (sustained 60fps at <12% battery draw). We are deploying the staging build to https://staging.alkota.avorria.dev for your review.',
    },
    {
      id: 'MSG-02',
      sender: 'Marcus K. (Systems Architect)',
      role: 'AVORRIA ENGINEERING',
      time: 'Sept 26 at 11:15',
      body: 'Stripe webhook listener confirmed in sandbox mode. Automated PDF build sheet generation now includes the parametric CAD coordinate table. Ready for acceptance test review.',
    },
    {
      id: 'MSG-01',
      sender: 'Peter C. (Lead Principal)',
      role: 'AVORRIA PRINCIPAL',
      time: 'Sept 21 at 09:30',
      body: 'Sprint 01 kicked off. GitHub organization transferred to Alkota enterprise team with full CI/CD deployment permissions. Weekly sync scheduled for Thursdays at 14:00 GMT.',
    },
  ]

  return (
    <div className="p-8 md:p-12 max-w-4xl space-y-10">
      
      {/* Header */}
      <div className="border-b border-black/10 pb-6">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 block mb-1">
          CLIENT PORTAL // DIRECT CORRESPONDENCE
        </span>
        <h1 className="text-2xl md:text-3xl font-light text-neutral-900">
          Principal Communications
        </h1>
        <p className="text-xs text-neutral-500 font-light mt-1">
          Direct engineering dialogue, sprint debriefs, and decision logs with senior staff.
        </p>
      </div>

      {/* Messages Thread */}
      <div className="space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className="border border-black/10 bg-white p-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-neutral-100 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-light text-neutral-900">{msg.sender}</span>
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">[{msg.role}]</span>
              </div>
              <span className="text-xs font-mono text-neutral-400">{msg.time}</span>
            </div>

            <p className="text-sm text-neutral-700 font-light leading-relaxed">
              {msg.body}
            </p>
          </div>
        ))}
      </div>

      {/* Response Box */}
      <div className="border border-neutral-200 bg-neutral-50 p-6 space-y-4">
        <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500">
          Reply to Engineering Thread
        </label>
        <textarea
          rows={3}
          placeholder="Send an inquiry or architectural feedback directly to your assigned Avorria Principal..."
          className="w-full bg-white border border-neutral-200 p-3 text-sm font-light text-neutral-900 focus:outline-none focus:border-neutral-400"
        />
        <button
          type="button"
          className="px-6 py-2.5 bg-neutral-900 text-white text-xs font-mono uppercase tracking-wider font-light hover:bg-neutral-800 transition-colors"
        >
          Send Message
        </button>
      </div>

    </div>
  )
}
