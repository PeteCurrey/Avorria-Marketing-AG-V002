import { describe, it, expect } from 'vitest'
import { evaluateCompleteness } from '@/lib/ai/openai'

describe('Discovery Factual Completeness Evaluation', () => {
  it('evaluates an empty initial project as entirely NOT_YET_DEFINED', () => {
    const matrix = evaluateCompleteness({})

    expect(matrix.business).toBe('NOT_YET_DEFINED')
    expect(matrix.problem).toBe('NOT_YET_DEFINED')
    expect(matrix.objective).toBe('NOT_YET_DEFINED')
    expect(matrix.audience).toBe('NOT_YET_DEFINED')
    expect(matrix.technical_environment).toBe('NOT_YET_DEFINED')
    expect(matrix.materials).toBe('NOT_YET_DEFINED')
    expect(matrix.timing).toBe('NOT_YET_DEFINED')
    expect(matrix.budget).toBe('NOT_YET_DEFINED')
  })

  it('evaluates stage 1 completion to PARTIALLY_UNDERSTOOD or UNDERSTOOD for business', () => {
    // Only company name provided
    const partial = evaluateCompleteness({
      companyName: 'Acme Robotics Ltd',
    })
    expect(partial.business).toBe('PARTIALLY_UNDERSTOOD')

    // Company name AND business description provided
    const complete = evaluateCompleteness({
      companyName: 'Acme Robotics Ltd',
      businessDescription: 'Autonomous warehouse fulfillment systems for tier-1 3PL operators.',
    })
    expect(complete.business).toBe('UNDERSTOOD')
  })

  it('correctly categorises problem understanding across primary and secondary prompts', () => {
    const withProblemOnly = evaluateCompleteness({
      problemStatement: 'Our custom quote generator drops 40% of sessions before pricing checkout.',
    })
    expect(withProblemOnly.problem).toBe('PARTIALLY_UNDERSTOOD')

    const withProblemAndImpact = evaluateCompleteness({
      problemStatement: 'Our custom quote generator drops 40% of sessions before pricing checkout.',
      problemImpact: 'Losing an estimated £35,000 monthly in qualified merchant pipeline.',
    })
    expect(withProblemAndImpact.problem).toBe('UNDERSTOOD')
  })

  it('recognises uploaded materials strictly based on verified file list', () => {
    const noFiles = evaluateCompleteness({})
    expect(noFiles.materials).toBe('NOT_YET_DEFINED')

    const withFiles = evaluateCompleteness({
      files: [
        { name: 'Brand_Guidelines.pdf', size: 245000 },
        { name: 'Sitemap_Draft.xlsx', size: 12000 },
      ],
    })
    expect(withFiles.materials).toBe('UNDERSTOOD')
  })

  it('evaluates commercial parameters without forcing rigid values', () => {
    const withBudget = evaluateCompleteness({
      budgetRange: '£25k-50k',
    })
    expect(withBudget.budget).toBe('UNDERSTOOD')

    const withTiming = evaluateCompleteness({
      timeline: '1-3-months',
    })
    expect(withTiming.timing).toBe('UNDERSTOOD')
  })

  it('evaluates technical environment when existing systems and frustrations are noted', () => {
    const withTech = evaluateCompleteness({
      existingSystems: ['Shopify Plus', 'NetSuite ERP', 'Klaviyo'],
      systemsToKeep: ['NetSuite ERP'],
    })
    expect(withTech.technical_environment).toBe('UNDERSTOOD')
  })

  it('yields a fully UNDERSTOOD matrix when all stages have substantive content', () => {
    const fullDiscovery = {
      companyName: 'Sovereign Health Ltd',
      businessDescription: 'Private clinical pathology network operating 8 diagnostics labs in the UK.',
      customers: 'General practitioners, private oncology clinics, and enterprise occupational health.',
      problemStatement: 'Result turnaround notifications require manual CSV export and batch email dispatch.',
      problemImpact: 'Clinicians face 4-hour delays waiting on critical biomarker results.',
      desiredOutcome: 'Automated encrypted clinician portal with real-time HL7/FHIR lab telemetry.',
      goals: ['Automate workflow', 'Reduce operational friction', 'Accelerate clinician decisions'],
      existingSystems: ['Legacy LIMS database', 'Exchange SMTP server'],
      systemsToKeep: ['LIMS core database'],
      files: [{ name: 'FHIR_Integration_Spec.pdf' }],
      timeline: '3-6-months',
      budgetRange: '£50k+',
    }

    const matrix = evaluateCompleteness(fullDiscovery)
    expect(matrix.business).toBe('UNDERSTOOD')
    expect(matrix.problem).toBe('UNDERSTOOD')
    expect(matrix.objective).toBe('UNDERSTOOD')
    expect(matrix.audience).toBe('UNDERSTOOD')
    expect(matrix.technical_environment).toBe('UNDERSTOOD')
    expect(matrix.materials).toBe('UNDERSTOOD')
    expect(matrix.timing).toBe('UNDERSTOOD')
    expect(matrix.budget).toBe('UNDERSTOOD')
  })
})
