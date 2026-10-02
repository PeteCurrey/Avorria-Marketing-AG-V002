'use client'

/**
 * DiscoveryJourney.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Primary orchestrator for the Start A Project cinematic discovery experience.
 *
 * Manages:
 * - Session token lifecycle (localStorage persistence)
 * - Scene routing (Intro → 01–09 → Confirmation)
 * - CSS-only scene transitions (no Framer Motion / GSAP)
 * - Server action calls (init, save, preview, submit)
 * - Global answers accumulation across scenes
 * - Save status indicator (passed to DiscoveryTopNav)
 * - DiscoveryDossier drawer toggle
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { DiscoveryTopNav } from './DiscoveryTopNav'
import { IntroScene } from './scenes/IntroScene'
import { Scene01Business } from './scenes/Scene01Business'
import { Scene02Problem } from './scenes/Scene02Problem'
import { Scene03Outcome } from './scenes/Scene03Outcome'
import { Scene04Project } from './scenes/Scene04Project'
import { Scene05Environment } from './scenes/Scene05Environment'
import { Scene06Materials } from './scenes/Scene06Materials'
import { Scene07Investment } from './scenes/Scene07Investment'
import { Scene08Context } from './scenes/Scene08Context'
import { Scene09Review } from './scenes/Scene09Review'
import { ConfirmationScene } from './scenes/ConfirmationScene'
import {
  initOrResumeDiscoveryAction,
  saveStageAnswerAction,
  generateBriefPreviewAction,
  submitFinalBriefAction,
} from '@/lib/actions/discovery'
import type { ProjectBrief, CompletenessMatrix } from '@/types/discovery'

const TOKEN_KEY = 'avr_discovery_token'

// Scene indices: 0 = Intro, 1–9 = stages, 10 = Confirmation
type SceneIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

// Stage metadata for TopNav (scenes 1–9 map to top-nav stages)
const STAGE_META = [
  { label: 'BUSINESS', slug: 'stage-01', number: 1 },
  { label: 'PROBLEM', slug: 'stage-02', number: 2 },
  { label: 'OUTCOME', slug: 'stage-03', number: 3 },
  { label: 'PROJECT', slug: 'stage-04', number: 4 },
  { label: 'ENVIRONMENT', slug: 'stage-05', number: 5 },
  { label: 'MATERIALS', slug: 'stage-06', number: 6 },
  { label: 'INVESTMENT', slug: 'stage-07', number: 7 },
  { label: 'CONTEXT', slug: 'stage-08', number: 8 },
  { label: 'REVIEW', slug: 'stage-09', number: 9 },
]

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

export function DiscoveryJourney() {
  // ── Session ──────────────────────────────────────────────────────────────
  const [sessionToken, setSessionToken] = useState<string>('')
  const [isInitialized, setIsInitialized] = useState(false)
  const [initError, setInitError] = useState<string | null>(null)

  // ── Scene routing ─────────────────────────────────────────────────────────
  const [scene, setScene] = useState<SceneIndex>(0)
  const [transitioning, setTransitioning] = useState(false)

  // ── Answers ───────────────────────────────────────────────────────────────
  // Accumulated across all scenes; merged from DB resume + local updates
  const [answers, setAnswers] = useState<Record<string, any>>({})

  // ── Brief / Completeness ──────────────────────────────────────────────────
  const [clientBrief, setClientBrief] = useState<ProjectBrief | null>(null)
  const [completeness, setCompleteness] = useState<CompletenessMatrix | null>(null)
  const [isGeneratingBrief, setIsGeneratingBrief] = useState(false)

  // ── Save status ───────────────────────────────────────────────────────────
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')

  // ── Dossier drawer ────────────────────────────────────────────────────────
  const [dossierOpen, setDossierOpen] = useState(false)

  // ── Error banners ─────────────────────────────────────────────────────────
  const [errorBanner, setErrorBanner] = useState<string | null>(null)

  // ── Transition ref to prevent double-fires ────────────────────────────────
  const transitionRef = useRef(false)

  // ── Initialize session on mount ───────────────────────────────────────────
  useEffect(() => {
    let mounted = true

    const initSession = async () => {
      const stored = typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null

      const result = await initOrResumeDiscoveryAction(stored || undefined)

      if (!mounted) return

      if (!result.success) {
        setInitError(result.error || 'Failed to start your session. Please refresh.')
        setIsInitialized(true)
        return
      }

      // Persist token
      if (typeof window !== 'undefined') {
        localStorage.setItem(TOKEN_KEY, result.sessionToken)
      }
      setSessionToken(result.sessionToken)

      // Merge any resumed answers from DB
      if (result.answers?.length > 0) {
        const merged: Record<string, any> = {}
        for (const a of result.answers) {
          Object.assign(merged, a.raw_input as Record<string, any>)
        }
        setAnswers(merged)

        // Resume to the furthest completed stage
        const maxStage = result.answers.reduce(
          (max: number, a: any) => Math.max(max, a.stage_number || 0),
          0
        )
        if (maxStage > 0 && maxStage < 9) {
          // Resume to that stage (clamp to scene range 1–9)
          const resumeScene = Math.min(maxStage, 9) as SceneIndex
          setScene(resumeScene)
        }
      }

      setIsInitialized(true)
    }

    initSession()
    return () => { mounted = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Scene transition helper ───────────────────────────────────────────────
  const goToScene = useCallback((next: SceneIndex) => {
    if (transitionRef.current) return
    transitionRef.current = true
    setTransitioning(true)
    setTimeout(() => {
      setScene(next)
      setTransitioning(false)
      transitionRef.current = false
      // Scroll to top of content on scene change
      window.scrollTo({ top: 0, behavior: 'instant' })
    }, 320)
  }, [])

  // ── Save stage answer ─────────────────────────────────────────────────────
  const saveStage = useCallback(
    async (stageNumber: number, stageSlug: string, inputData: Record<string, any>) => {
      if (!sessionToken) return

      setSaveStatus('saving')
      setErrorBanner(null)

      try {
        const result = await saveStageAnswerAction({
          sessionToken,
          stageNumber,
          stageSlug,
          inputData,
          runAIExtraction: stageNumber <= 4, // AI extraction on richer narrative stages
        })

        if (result.success) {
          if (result.completeness) setCompleteness(result.completeness)
          setSaveStatus('saved')
          setTimeout(() => setSaveStatus('idle'), 3000)
        } else {
          setSaveStatus('error')
          // Non-fatal — data is held in local answers state
        }
      } catch {
        setSaveStatus('error')
      }
    },
    [sessionToken]
  )

  // ── onNext for scenes 0–8: merge answers, save, advance ──────────────────
  const handleSceneNext = useCallback(
    async (stageNumber: number | null, stageSlug: string | null, data: Record<string, any>) => {
      // Merge into accumulated answers
      setAnswers((prev) => ({ ...prev, ...data }))

      // Save to DB if this is a numbered stage
      if (stageNumber !== null && stageSlug !== null && sessionToken) {
        saveStage(stageNumber, stageSlug, data)
      }

      const nextScene = (scene + 1) as SceneIndex

      // When entering Scene 09 (Review), trigger brief generation
      if (nextScene === 9) {
        setIsGeneratingBrief(true)
        goToScene(9)
        try {
          const briefResult = await generateBriefPreviewAction(sessionToken)
          if (briefResult.success) {
            setClientBrief(briefResult.clientBrief)
          }
        } catch {
          // Brief generation failure is non-fatal — raw answers still shown
        } finally {
          setIsGeneratingBrief(false)
        }
        return
      }

      goToScene(nextScene)
    },
    [scene, sessionToken, saveStage, goToScene]
  )

  // ── onBack: simply go to previous scene ──────────────────────────────────
  const handleBack = useCallback(() => {
    if (scene > 0) goToScene((scene - 1) as SceneIndex)
  }, [scene, goToScene])

  // ── onSkip: advance without saving answers ────────────────────────────────
  const handleSkip = useCallback(() => {
    const next = (scene + 1) as SceneIndex
    goToScene(next)
  }, [scene, goToScene])

  // ── onSaveCorrection (Stage 09 inline edit) ───────────────────────────────
  const handleSaveCorrection = useCallback(
    (field: string, text: string) => {
      setAnswers((prev) => ({ ...prev, [field]: text }))
      if (sessionToken) {
        saveStage(9, 'stage-09', { [field]: text })
      }
    },
    [sessionToken, saveStage]
  )

  // ── Submit final brief ────────────────────────────────────────────────────
  const handleSubmit = useCallback(async () => {
    if (!sessionToken) throw new Error('No session')

    const result = await submitFinalBriefAction(sessionToken)
    if (!result.success) {
      throw new Error(result.error || 'Submission failed')
    }

    // Clear the token on successful submission
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY)
    }

    goToScene(10)
  }, [sessionToken, goToScene])

  // ── Navigate to specific stage via TopNav ─────────────────────────────────
  const handleNavStageClick = useCallback(
    (stageNumber: number) => {
      // Only allow navigation to completed or adjacent stages
      if (stageNumber <= scene) {
        goToScene(stageNumber as SceneIndex)
      }
    },
    [scene, goToScene]
  )

  // ── Save & Return ─────────────────────────────────────────────────────────
  const handleSaveAndReturn = useCallback(() => {
    // Token is already persisted in localStorage; simply navigate home
    if (typeof window !== 'undefined') {
      window.location.href = '/'
    }
  }, [])

  // ── Render ────────────────────────────────────────────────────────────────

  // Loading state
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-paper)]">
        <div className="flex flex-col items-center gap-4 font-work-sans font-light">
          <div className="w-8 h-[1px] bg-[var(--color-border-strong)]" />
          <span className="text-xs uppercase tracking-widest text-[var(--color-graphite-muted)]">
            PREPARING
          </span>
        </div>
      </div>
    )
  }

  // Critical init error
  if (initError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-paper)] px-6">
        <div className="max-w-md font-work-sans font-light flex flex-col gap-4">
          <p className="text-sm text-[var(--color-rose-text)] uppercase tracking-wider">
            SESSION ERROR
          </p>
          <p className="text-base text-[var(--color-graphite)]">{initError}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-xs uppercase tracking-widest text-[var(--color-graphite)] border-b border-[var(--color-border)] pb-0.5 self-start hover:border-[var(--color-graphite)] transition-colors"
          >
            REFRESH AND TRY AGAIN
          </button>
        </div>
      </div>
    )
  }

  // Confirmation scene (no nav)
  if (scene === 10) {
    return (
      <div className="min-h-screen bg-[var(--color-paper)]">
        <ConfirmationScene
          companyName={answers.companyName}
          contactEmail={answers.contactEmail}
        />
      </div>
    )
  }

  // ── Active journey scenes ─────────────────────────────────────────────────
  // TopNav active stage: scene 0 shows no active stage indicator; 1–9 maps 1:1
  const activeStageForNav = scene >= 1 && scene <= 9 ? scene : null

  return (
    <div className="min-h-screen bg-[var(--color-paper)] flex flex-col">
      {/* Sticky Top Navigation — hidden on intro and confirmation */}
      {scene > 0 && scene < 10 && (
        <DiscoveryTopNav
          stages={STAGE_META}
          currentStage={activeStageForNav ?? 1}
          completedStages={Array.from({ length: scene - 1 }, (_, i) => i + 1)}
          saveStatus={saveStatus}
          dossierOpen={dossierOpen}
          onDossierToggle={() => setDossierOpen((o) => !o)}
          onStageClick={handleNavStageClick}
          onSaveAndReturn={handleSaveAndReturn}
        />
      )}

      {/* Global error banner */}
      {errorBanner && (
        <div className="bg-[#FDF2F0] border-b border-[var(--color-rose-text)] px-6 py-3 flex items-center justify-between font-work-sans font-light">
          <p className="text-sm text-[var(--color-rose-text)]">{errorBanner}</p>
          <button
            onClick={() => setErrorBanner(null)}
            className="text-xs uppercase tracking-wider text-[var(--color-rose-text)] hover:underline"
          >
            DISMISS
          </button>
        </div>
      )}

      {/* Scene wrapper with CSS transition */}
      <div
        className={`flex-1 transition-opacity duration-300 ease-out ${
          transitioning ? 'opacity-0' : 'opacity-100'
        }`}
        aria-live="polite"
      >
        {scene === 0 && (
          <IntroScene
            onBegin={() => handleSceneNext(null, null, {})}
          />
        )}

        {scene === 1 && (
          <Scene01Business
            initialData={answers}
            onNext={(data) => handleSceneNext(1, 'stage-01', data)}
            onBack={handleBack}
          />
        )}

        {scene === 2 && (
          <Scene02Problem
            initialData={answers}
            onNext={(data) => handleSceneNext(2, 'stage-02', data)}
            onBack={handleBack}
          />
        )}

        {scene === 3 && (
          <Scene03Outcome
            initialData={answers}
            onNext={(data) => handleSceneNext(3, 'stage-03', data)}
            onBack={handleBack}
          />
        )}

        {scene === 4 && (
          <Scene04Project
            initialData={answers}
            onNext={(data) => handleSceneNext(4, 'stage-04', data)}
            onBack={handleBack}
            onSkip={handleSkip}
          />
        )}

        {scene === 5 && (
          <Scene05Environment
            initialData={answers}
            onNext={(data) => handleSceneNext(5, 'stage-05', data)}
            onBack={handleBack}
            onSkip={handleSkip}
          />
        )}

        {scene === 6 && (
          <Scene06Materials
            initialData={answers}
            sessionToken={sessionToken}
            onNext={(data) => handleSceneNext(6, 'stage-06', data)}
            onBack={handleBack}
            onSkip={handleSkip}
          />
        )}

        {scene === 7 && (
          <Scene07Investment
            initialData={answers}
            onNext={(data) => handleSceneNext(7, 'stage-07', data)}
            onBack={handleBack}
            onSkip={handleSkip}
          />
        )}

        {scene === 8 && (
          <Scene08Context
            initialData={answers}
            onNext={(data) => handleSceneNext(8, 'stage-08', data)}
            onBack={handleBack}
            onSkip={handleSkip}
          />
        )}

        {scene === 9 && (
          <Scene09Review
            answers={answers}
            clientBrief={clientBrief}
            completeness={completeness}
            isGeneratingBrief={isGeneratingBrief}
            onSubmit={handleSubmit}
            onBack={handleBack}
            onSaveCorrection={handleSaveCorrection}
          />
        )}
      </div>
    </div>
  )
}
