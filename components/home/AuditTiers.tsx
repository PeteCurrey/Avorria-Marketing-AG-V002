/**
 * Audit Tiers Section (#audit)
 *
 * Three tiers matching the reference structure: Slate, Onyx, Obsidian.
 */
export function AuditTiers() {
  return (
    <section className="section-pad" id="audit">
      <div className="wrap">
        <h2 className="section-concept">Choose how deep the audit goes.</h2>
        <div className="tiers-grid">
          <div className="tier-col">
            <h3>Slate</h3>
            <p>A baseline. Where your site and systems stand today.</p>
          </div>
          <div className="tier-col">
            <h3>Onyx</h3>
            <p>The baseline, plus a prioritised roadmap you can act on.</p>
          </div>
          <div className="tier-col">
            <h3>Obsidian</h3>
            <p>The roadmap, with our team delivering it alongside yours.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
