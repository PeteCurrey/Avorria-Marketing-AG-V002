import Link from 'next/link'

/**
 * Closing CTA Footer (#contact)
 *
 * Final section on the concept homepage:
 * - H2: Tell us what you are building.
 * - Text link in rose underline: Start a conversation
 * - Minimal base bar with Avorria mark and descriptor
 */
export function ClosingCtaFooter() {
  return (
    <footer className="footer-concept" id="contact" role="contentinfo">
      <div className="wrap">
        <h2>Tell us what you are building.</h2>
        <Link className="link-rose text-[var(--alt-fg)]" href="/contact">
          Start a conversation
        </Link>
        <div className="foot-concept-base">
          <span>Avorria</span>
          <span>Digital products and systems for companies operating across borders</span>
        </div>
      </div>
    </footer>
  )
}
