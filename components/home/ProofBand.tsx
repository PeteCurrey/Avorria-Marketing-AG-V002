import { getVerifiedClients, getVerifiedMarkets } from '@/lib/db/proof'

/**
 * Proof Band Section
 *
 * Rules:
 * - Renders only verified clients and markets from Supabase.
 * - Fewer than 3 verified clients: the band DOES NOT RENDER.
 */
export async function ProofBand() {
  const [clients, markets] = await Promise.all([
    getVerifiedClients(),
    getVerifiedMarkets(),
  ])

  // Rule: Fewer than 3 verified clients: the band does not render
  if (!clients || clients.length < 3) {
    return null
  }

  return (
    <section className="proof" aria-label="Selected clients and markets">
      <div className="wrap">
        <div className="flex flex-col gap-1">
          <span className="text-[var(--muted)] text-[0.9375rem] font-light">
            Selected clients and markets
          </span>
          {markets.length > 0 && (
            <span className="text-[var(--muted)] text-[0.75rem] font-light tracking-wide uppercase opacity-75">
              {markets.map((m) => m.country).join(' · ')}
            </span>
          )}
        </div>
        <div className="proof-row">
          {clients.map((client) => (
            <div key={client.name} className="slot">
              {client.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
