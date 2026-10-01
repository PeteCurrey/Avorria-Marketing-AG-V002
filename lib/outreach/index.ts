import 'server-only'
import { writeAuditEvent } from '@/lib/db/audit'
import type { OutreachProspect, OutreachTemplate, OutreachStage } from '@/lib/outreach/types'

export const OUTREACH_TEMPLATES: Record<string, OutreachTemplate> = {
  TEARDOWN_TEASER: {
    code: 'TEARDOWN_TEASER',
    subject: 'Diagnostic telemetry and architecture review // {{companyName}}',
    headline: 'Independent Technical Audit Findings',
    bodyTemplate: `Dear {{decisionMakerName}},

Our engineering group recently examined the public digital architecture and rendering pipeline of {{domain}}.

We identified specific friction vectors in server handshake latency ({{ttfbMs}}ms TTFB) and security policy configuration that directly impact customer conversion and organic discoverability.

We have compiled a non-public, objective diagnostic report detailing observable symptoms and technical remediations.

If of interest, you can review the live dossier here:
{{auditUrl}}

No sales follow-up will occur without your explicit request.

Sincerely,
Avorria Strategic Advisory`,
  },
  PROPOSAL_FOLLOWUP: {
    code: 'PROPOSAL_FOLLOWUP',
    subject: 'Proposal & Scope Schedule // {{projectTitle}}',
    headline: 'Project Scope Review',
    bodyTemplate: `Dear {{decisionMakerName}},

The commercial proposal and fixed-sprint delivery schedule for {{projectTitle}} is currently available for your review:
{{proposalUrl}}

We are holding staff engineering capacity for your target delivery milestone through {{validUntil}}.

Let us know if you wish to adjust any deliverable criteria.

Sincerely,
Avorria Principals`,
  },
}

// In-memory prospect queue
const prospectStore = new Map<string, OutreachProspect>()

// Seed sample prospects
const sampleProspects: OutreachProspect[] = [
  {
    id: 'pros-01',
    companyName: 'Meridian Capital Partners',
    domain: 'meridiancap.co.uk',
    decisionMakerName: 'Alistair Vance',
    decisionMakerRole: 'Managing Partner',
    decisionMakerEmail: 'a.vance@meridiancap.co.uk',
    stage: 'INITIAL_TEARDOWN_SENT',
    opportunityScore: 78,
    lastContactedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    nextFollowUpAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    notes: 'Monolithic WordPress site with 1.2s TTFB. Target for Build Sprint replatforming.',
  },
  {
    id: 'pros-02',
    companyName: 'Vanguard Biopharma',
    domain: 'vanguardbio.com',
    decisionMakerName: 'Dr. Elena Rostova',
    decisionMakerRole: 'Chief Commercial Officer',
    decisionMakerEmail: 'elena.rostova@vanguardbio.com',
    stage: 'CALL_SCHEDULED',
    opportunityScore: 84,
    lastContactedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    notes: 'Consultation call set for Thursday 2pm regarding investor portal rebuild.',
  },
]
sampleProspects.forEach((p) => prospectStore.set(p.id, p))

export async function listOutreachProspects(): Promise<OutreachProspect[]> {
  return Array.from(prospectStore.values())
}

export async function updateProspectStage(
  prospectId: string,
  newStage: OutreachStage
): Promise<boolean> {
  const prospect = prospectStore.get(prospectId)
  if (!prospect) return false

  prospect.stage = newStage
  prospect.lastContactedAt = new Date().toISOString()
  prospectStore.set(prospectId, prospect)

  await writeAuditEvent({
    action: 'OUTREACH_PROSPECT_STAGE_UPDATED',
    resourceType: 'prospect',
    resourceId: prospectId,
    metadata: { newStage, domain: prospect.domain },
  }).catch(() => {})

  return true
}
