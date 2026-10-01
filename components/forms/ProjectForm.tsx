'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { submitEnquiry, type FormState } from '@/lib/actions/enquiry'
import { Button } from '@/components/ui/Button'
import { trackForm } from '@/lib/analytics'

const initialState: FormState = { status: 'idle' }

const serviceOptions = [
  { value: 'website', label: 'Website' },
  { value: 'web-application', label: 'Web Application' },
  { value: 'ai-development', label: 'AI Development' },
  { value: 'ai-integration', label: 'AI Integration' },
  { value: 'automation', label: 'Automation' },
  { value: 'digital-system', label: 'Digital System' },
  { value: 'ecommerce', label: 'Ecommerce' },
  { value: 'not-sure', label: 'Not sure yet' },
] as const

const budgetOptions = [
  { value: 'under-10k', label: 'Under £10k' },
  { value: '10k-25k', label: '£10k – £25k' },
  { value: '25k-50k', label: '£25k – £50k' },
  { value: '50k-100k', label: '£50k – £100k' },
  { value: 'over-100k', label: 'Over £100k' },
  { value: 'not-sure', label: 'Not sure yet' },
]

const timelineOptions = [
  { value: 'asap', label: 'As soon as possible' },
  { value: '1-3-months', label: '1 – 3 months' },
  { value: '3-6-months', label: '3 – 6 months' },
  { value: 'over-6-months', label: 'Over 6 months' },
  { value: 'not-sure', label: 'Not sure yet' },
]

// Shared field style
const inputClass = [
  'w-full bg-transparent border-b border-[var(--color-border)]',
  'py-3 text-[var(--color-graphite)] placeholder:text-[var(--color-graphite-muted)]',
  'focus:outline-none focus:border-[var(--color-graphite)]',
  'transition-colors duration-[var(--duration-base)]',
  'text-[var(--text-body)]',
].join(' ')

const inputErrorClass = 'border-[var(--color-accent)]'

const labelClass = 'block text-label-upper mb-3'

interface FieldProps {
  label: string
  error?: string[]
  required?: boolean
  children: React.ReactNode
  htmlFor: string
}

function Field({ label, error, required, children, htmlFor }: FieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
        {required && <span className="text-[var(--color-accent)] ml-1" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && error.length > 0 && (
        <p className="mt-2 text-[var(--text-label)] text-[var(--color-accent)] tracking-wide" role="alert">
          {error[0]}
        </p>
      )}
    </div>
  )
}

export function ProjectForm() {
  const [state, formAction, isPending] = useActionState(submitEnquiry, initialState)
  const formRef = useRef<HTMLFormElement>(null)
  const [hasStarted, setHasStarted] = useState(false)
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  // Track form start on first interaction
  function handleFirstInteraction() {
    if (!hasStarted) {
      setHasStarted(true)
      trackForm('start')
    }
  }

  // Track success / error
  useEffect(() => {
    if (state.status === 'success') trackForm('success')
    if (state.status === 'error') trackForm('error')
  }, [state.status])

  // Track abandonment via beforeunload if form started but not submitted
  useEffect(() => {
    if (!hasStarted) return
    const handler = () => {
      if (state.status === 'idle') trackForm('abandon')
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [hasStarted, state.status])

  function toggleService(value: string) {
    setSelectedServices((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value],
    )
  }

  if (state.status === 'success') {
    return (
      <div
        className="border border-[var(--color-border)] p-12 text-center"
        role="status"
        aria-live="polite"
      >
        <p className="text-label-upper text-[var(--color-accent)] mb-4">Received</p>
        <p className="text-display-s mb-4">Thank you.</p>
        <p className="text-secondary">{state.message}</p>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      onFocus={handleFirstInteraction}
      noValidate
      aria-label="Project enquiry form"
    >
      {/* ── Honeypot — hidden from real users, not from bots ── */}
      <div aria-hidden="true" className="absolute opacity-0 pointer-events-none -z-10 h-0 overflow-hidden">
        <label htmlFor="_hp">Leave this blank</label>
        <input
          id="_hp"
          name="_hp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="space-y-10">

        {/* Row: Name + Company */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <Field label="Name" htmlFor="name" required error={state.fieldErrors?.name}>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Your name"
              className={`${inputClass} ${state.fieldErrors?.name ? inputErrorClass : ''}`}
              aria-describedby={state.fieldErrors?.name ? 'name-error' : undefined}
              aria-invalid={!!state.fieldErrors?.name}
            />
          </Field>
          <Field label="Company" htmlFor="company" error={state.fieldErrors?.company}>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              placeholder="Company name (optional)"
              className={`${inputClass} ${state.fieldErrors?.company ? inputErrorClass : ''}`}
            />
          </Field>
        </div>

        {/* Row: Email + Website */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <Field label="Email" htmlFor="email" required error={state.fieldErrors?.email}>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="hello@example.com"
              className={`${inputClass} ${state.fieldErrors?.email ? inputErrorClass : ''}`}
              aria-invalid={!!state.fieldErrors?.email}
            />
          </Field>
          <Field label="Website" htmlFor="website" error={state.fieldErrors?.website}>
            <input
              id="website"
              name="website"
              type="url"
              autoComplete="url"
              placeholder="https://yoursite.com (optional)"
              className={`${inputClass} ${state.fieldErrors?.website ? inputErrorClass : ''}`}
            />
          </Field>
        </div>

        {/* What are you building */}
        <Field label="What are you looking to build?" htmlFor="whatBuilding" required error={state.fieldErrors?.whatBuilding}>
          <textarea
            id="whatBuilding"
            name="whatBuilding"
            required
            rows={4}
            placeholder="Describe the product, project or system you have in mind."
            className={`${inputClass} resize-none ${state.fieldErrors?.whatBuilding ? inputErrorClass : ''}`}
            aria-invalid={!!state.fieldErrors?.whatBuilding}
          />
        </Field>

        {/* Problem to solve */}
        <Field label="What problem are you trying to solve?" htmlFor="problemSolving" error={state.fieldErrors?.problemSolving}>
          <textarea
            id="problemSolving"
            name="problemSolving"
            rows={3}
            placeholder="What is the business or user problem this should address? (optional)"
            className={`${inputClass} resize-none`}
          />
        </Field>

        {/* Services */}
        <fieldset>
          <legend className={`${labelClass} mb-4`}>
            Services required
            <span className="text-[var(--color-accent)] ml-1" aria-hidden="true">*</span>
          </legend>
          {state.fieldErrors?.services && (
            <p className="mb-3 text-[var(--text-label)] text-[var(--color-accent)] tracking-wide" role="alert">
              {state.fieldErrors.services[0]}
            </p>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {serviceOptions.map((option) => {
              const checked = selectedServices.includes(option.value)
              return (
                <label
                  key={option.value}
                  className={[
                    'flex items-center gap-3 border p-4 cursor-pointer',
                    'transition-colors duration-[var(--duration-base)]',
                    checked
                      ? 'border-[var(--color-graphite)] bg-[var(--color-graphite)] text-[var(--color-ivory)]'
                      : 'border-[var(--color-border)] hover:border-[var(--color-border-strong)] text-[var(--color-graphite-mid)]',
                  ].join(' ')}
                >
                  <input
                    type="checkbox"
                    name="services"
                    value={option.value}
                    checked={checked}
                    onChange={() => toggleService(option.value)}
                    className="sr-only"
                    aria-label={option.label}
                  />
                  <span className="text-[var(--text-small)] font-light leading-tight">
                    {option.label}
                  </span>
                </label>
              )
            })}
          </div>
        </fieldset>

        {/* Budget + Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <Field label="Budget range" htmlFor="budget" required error={state.fieldErrors?.budget}>
            <select
              id="budget"
              name="budget"
              required
              defaultValue=""
              className={`${inputClass} cursor-pointer ${state.fieldErrors?.budget ? inputErrorClass : ''}`}
              aria-invalid={!!state.fieldErrors?.budget}
            >
              <option value="" disabled>Select a range</option>
              {budgetOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </Field>
          <Field label="Desired timeline" htmlFor="timeline" required error={state.fieldErrors?.timeline}>
            <select
              id="timeline"
              name="timeline"
              required
              defaultValue=""
              className={`${inputClass} cursor-pointer ${state.fieldErrors?.timeline ? inputErrorClass : ''}`}
              aria-invalid={!!state.fieldErrors?.timeline}
            >
              <option value="" disabled>Select a timeline</option>
              {timelineOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </Field>
        </div>

        {/* Additional */}
        <Field label="Anything else?" htmlFor="additional" error={state.fieldErrors?.additional}>
          <textarea
            id="additional"
            name="additional"
            rows={3}
            placeholder="Any other context, constraints or questions. (optional)"
            className={`${inputClass} resize-none`}
          />
        </Field>

        {/* Global error */}
        {(state.status === 'error' || state.status === 'rate-limited') && (
          <div
            className="border border-[var(--color-accent)] p-4 text-[var(--text-small)] text-[var(--color-accent)]"
            role="alert"
            aria-live="assertive"
          >
            {state.message}
          </div>
        )}

        {/* Submit */}
        <div className="flex items-center gap-6 pt-4 border-t border-[var(--color-border)]">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isPending}
          >
            {isPending ? 'Sending…' : 'Send enquiry ↗'}
          </Button>
          <p className="text-[var(--text-label)] text-muted tracking-wide">
            We typically respond within one business day.
          </p>
        </div>

      </div>
    </form>
  )
}
