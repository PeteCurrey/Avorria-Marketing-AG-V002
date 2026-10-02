import React from 'react'

interface BriefReceivedReceiptProps {
  reference?: string
}

export const BriefReceivedReceipt: React.FC<BriefReceivedReceiptProps> = ({ reference }) => {
  return (
    <div className="max-w-2xl mx-auto py-20 px-6 font-work-sans font-light text-[var(--color-graphite)] flex flex-col gap-12">
      <div>
        <h1 className="text-4xl md:text-5xl font-[200] leading-tight mb-4">PROJECT RECEIVED.</h1>
        <p className="text-lg">Your brief is now with Avorria.</p>
        {reference && <p className="text-sm mt-2 text-[var(--color-graphite-muted)]">Reference: {reference}</p>}
      </div>

      <div className="flex flex-col gap-10">
        <h2 className="text-[11px] uppercase tracking-widest text-[var(--color-graphite-muted)] border-b border-[var(--color-border)] pb-2">WHAT HAPPENS NEXT</h2>
        
        <div className="flex gap-6">
          <span className="text-sm font-[300] w-6">01</span>
          <div>
            <h3 className="text-sm uppercase tracking-wider mb-2">WE REVIEW THE BRIEF.</h3>
            <p className="text-sm text-[var(--color-graphite-muted)]">A principal at Avorria reads your discovery brief in full.</p>
          </div>
        </div>

        <div className="flex gap-6">
          <span className="text-sm font-[300] w-6">02</span>
          <div>
            <h3 className="text-sm uppercase tracking-wider mb-2">WE IDENTIFY THE NEXT STEP.</h3>
            <p className="text-sm text-[var(--color-graphite-muted)]">Every project is different. We determine the appropriate next step based on your specific situation.</p>
          </div>
        </div>

        <div className="flex gap-6">
          <span className="text-sm font-[300] w-6">03</span>
          <div>
            <h3 className="text-sm uppercase tracking-wider mb-2">WE GET IN TOUCH.</h3>
            <p className="text-sm text-[var(--color-graphite-muted)]">We'll reach out via email to discuss further.</p>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--color-border)] pt-8 mt-4 text-sm text-[var(--color-graphite-muted)]">
        In the meantime, if you have any additional information or want to make a correction:<br/>
        <a href="mailto:hello@avorria.com" className="text-[var(--color-graphite)] hover:underline">hello@avorria.com</a>
      </div>
    </div>
  )
}
