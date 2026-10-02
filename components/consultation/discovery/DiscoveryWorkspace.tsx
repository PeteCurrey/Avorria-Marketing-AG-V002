'use client'

import React, { useReducer, useEffect, useState } from 'react'
import { Stage01Business } from './stages/Stage01Business'
import { Stage02Problem } from './stages/Stage02Problem'
import { Stage03Outcome } from './stages/Stage03Outcome'
import { Stage04Project } from './stages/Stage04Project'
import { Stage05Environment } from './stages/Stage05Environment'
import { Stage06Materials } from './stages/Stage06Materials'
import { Stage07Investment } from './stages/Stage07Investment'
import { Stage08Context } from './stages/Stage08Context'
import { Stage09Review } from './stages/Stage09Review'
import { DiscoveryDossier } from './DiscoveryDossier'
import { StageProgressNav } from './StageProgressNav'
import { BriefReceivedReceipt } from './BriefReceivedReceipt'
import { CompletenessMatrix, ProjectBrief, DiscoveryPack } from '@/types/discovery'
import { initOrResumeDiscoveryAction, saveStageAnswerAction, generateBriefPreviewAction, submitFinalBriefAction } from '@/lib/actions/discovery'

type WizardState = {
  stage: number
  sessionToken: string
  projectId: string
  answers: Record<string, Record<string, any>>
  completeness: CompletenessMatrix
  dossierEdits: Record<string, string>
  followUp: any | null
  pendingFollowUpAnswer: string
  saveStatus: 'idle' | 'saving' | 'saved' | 'error'
  briefPreview: { clientBrief: ProjectBrief | null, internalPack: DiscoveryPack | null }
  submissionResult: { reference?: string, enquiryId?: string } | null
  isGeneratingBrief: boolean
  isInitialising: boolean
}

type Action = 
  | { type: 'INIT_SUCCESS', payload: { sessionToken: string, projectId: string } }
  | { type: 'SET_STAGE', payload: number }
  | { type: 'SAVE_START' }
  | { type: 'SAVE_SUCCESS', payload: { stageSlug: string, answers: any, completeness: CompletenessMatrix } }
  | { type: 'SAVE_ERROR' }
  | { type: 'GENERATE_BRIEF_START' }
  | { type: 'GENERATE_BRIEF_SUCCESS', payload: { clientBrief: ProjectBrief, internalPack: DiscoveryPack } }
  | { type: 'SUBMIT_SUCCESS', payload: { reference?: string, enquiryId?: string } }

const initialState: WizardState = {
  stage: 1,
  sessionToken: '',
  projectId: '',
  answers: {},
  completeness: {
    business: 'NOT_YET_DEFINED', problem: 'NOT_YET_DEFINED', objective: 'NOT_YET_DEFINED',
    audience: 'NOT_YET_DEFINED', technical_environment: 'NOT_YET_DEFINED', materials: 'NOT_YET_DEFINED',
    timing: 'NOT_YET_DEFINED', budget: 'NOT_YET_DEFINED'
  },
  dossierEdits: {},
  followUp: null,
  pendingFollowUpAnswer: '',
  saveStatus: 'idle',
  briefPreview: { clientBrief: null, internalPack: null },
  submissionResult: null,
  isGeneratingBrief: false,
  isInitialising: true
}

function reducer(state: WizardState, action: Action): WizardState {
  switch (action.type) {
    case 'INIT_SUCCESS':
      return { ...state, sessionToken: action.payload.sessionToken, projectId: action.payload.projectId, isInitialising: false }
    case 'SET_STAGE':
      return { ...state, stage: action.payload }
    case 'SAVE_START':
      return { ...state, saveStatus: 'saving' }
    case 'SAVE_SUCCESS':
      return { 
        ...state, 
        saveStatus: 'saved', 
        answers: { ...state.answers, [action.payload.stageSlug]: action.payload.answers },
        completeness: action.payload.completeness 
      }
    case 'SAVE_ERROR':
      return { ...state, saveStatus: 'error' }
    case 'GENERATE_BRIEF_START':
      return { ...state, isGeneratingBrief: true }
    case 'GENERATE_BRIEF_SUCCESS':
      return { ...state, isGeneratingBrief: false, briefPreview: action.payload }
    case 'SUBMIT_SUCCESS':
      return { ...state, submissionResult: action.payload }
    default:
      return state
  }
}

export const DiscoveryWorkspace: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [mobileDossierCollapsed, setMobileDossierCollapsed] = useState(true)

  useEffect(() => {
    async function init() {
      const storedToken = localStorage.getItem('avr_discovery_token') || undefined
      const res = await initOrResumeDiscoveryAction(storedToken)
      if (res.success && res.sessionToken && res.project) {
        localStorage.setItem('avr_discovery_token', res.sessionToken)
        dispatch({ type: 'INIT_SUCCESS', payload: { sessionToken: res.sessionToken, projectId: res.project.id } })
      } else {
        // Fallback or error handling
        dispatch({ type: 'INIT_SUCCESS', payload: { sessionToken: '', projectId: '' } })
      }
    }
    init()
  }, [])

  const handleNext = async (stageData: any) => {
    const currentStageSlug = `stage-0${state.stage}`
    
    // Save current stage
    dispatch({ type: 'SAVE_START' })
    const runAI = state.stage === 2 || state.stage === 3
    const res = await saveStageAnswerAction({
      sessionToken: state.sessionToken,
      stageNumber: state.stage,
      stageSlug: currentStageSlug,
      inputData: stageData,
      runAIExtraction: runAI
    })

    if (res.success) {
      dispatch({ 
        type: 'SAVE_SUCCESS', 
        payload: { stageSlug: currentStageSlug, answers: stageData, completeness: res.completeness || state.completeness } 
      })
      
      const nextStage = state.stage + 1
      dispatch({ type: 'SET_STAGE', payload: nextStage })

      if (nextStage === 9) {
        dispatch({ type: 'GENERATE_BRIEF_START' })
        const briefRes = await generateBriefPreviewAction(state.sessionToken)
        if (briefRes.success && briefRes.clientBrief && briefRes.internalPack) {
          dispatch({ type: 'GENERATE_BRIEF_SUCCESS', payload: { clientBrief: briefRes.clientBrief, internalPack: briefRes.internalPack } })
        }
      }
    } else {
      dispatch({ type: 'SAVE_ERROR' })
    }
  }

  const handleCorrection = async (field: string, text: string) => {
    dispatch({ type: 'SAVE_START' })
    const res = await saveStageAnswerAction({
      sessionToken: state.sessionToken,
      stageNumber: 9,
      stageSlug: 'stage-09',
      inputData: { [field]: text },
      runAIExtraction: false
    })
    
    if (res.success) {
      // Regenerate brief with corrections
      dispatch({ type: 'GENERATE_BRIEF_START' })
      const briefRes = await generateBriefPreviewAction(state.sessionToken)
      if (briefRes.success && briefRes.clientBrief && briefRes.internalPack) {
        dispatch({ type: 'GENERATE_BRIEF_SUCCESS', payload: { clientBrief: briefRes.clientBrief, internalPack: briefRes.internalPack } })
        dispatch({ type: 'SAVE_SUCCESS', payload: { stageSlug: 'stage-09', answers: { [field]: text }, completeness: res.completeness || state.completeness } })
      }
    } else {
      dispatch({ type: 'SAVE_ERROR' })
    }
  }

  const handleSubmitFinal = async () => {
    const res = await submitFinalBriefAction(state.sessionToken)
    if (res.success) {
      localStorage.removeItem('avr_discovery_token')
      dispatch({ type: 'SUBMIT_SUCCESS', payload: { reference: res.reference, enquiryId: res.enquiryId } })
    } else {
      alert(res.error || 'Submission failed')
    }
  }

  if (state.submissionResult) {
    return <BriefReceivedReceipt reference={state.submissionResult.reference} />
  }

  if (state.isInitialising) {
    return <div className="py-20 text-center font-work-sans text-[var(--color-graphite-muted)] text-sm">INITIALISING WORKSPACE...</div>
  }

  const renderStage = () => {
    const props = { onNext: handleNext, initialData: state.answers[`stage-0${state.stage}`] || {}, sessionToken: state.sessionToken }
    switch (state.stage) {
      case 1: return <Stage01Business {...props} />
      case 2: return <Stage02Problem {...props} />
      case 3: return <Stage03Outcome {...props} />
      case 4: return <Stage04Project {...props} />
      case 5: return <Stage05Environment {...props} />
      case 6: return <Stage06Materials {...props} />
      case 7: return <Stage07Investment {...props} />
      case 8: return <Stage08Context {...props} />
      case 9: return (
        <Stage09Review 
          clientBrief={state.briefPreview.clientBrief} 
          completeness={state.completeness} 
          isGeneratingBrief={state.isGeneratingBrief} 
          onSubmit={handleSubmitFinal} 
          onSaveCorrection={handleCorrection}
        />
      )
      default: return null
    }
  }

  return (
    <section id="discovery-workspace" className="bg-white scroll-mt-20">
      <div className="container-max">
        
        {/* Mobile Dossier Strip */}
        <div className="md:hidden sticky top-0 z-10 bg-white shadow-sm -mx-6 px-6 py-2 mb-6 border-b border-[var(--color-border)]">
          <DiscoveryDossier 
            completeness={state.completeness} 
            answers={state.answers} 
            saveStatus={state.saveStatus} 
            isMobileCollapsed={mobileDossierCollapsed}
            onToggleMobile={() => setMobileDossierCollapsed(!mobileDossierCollapsed)}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-12 py-12">
          {/* Left: Wizard (60%) */}
          <div className="w-full md:w-3/5 md:pr-12">
            <StageProgressNav currentStage={state.stage} totalStages={9} />
            <div className="min-h-[500px]">
              {renderStage()}
            </div>
          </div>

          {/* Right: Dossier (40%) */}
          <div className="hidden md:block w-full md:w-2/5 relative">
            <div className="sticky top-24">
              <DiscoveryDossier 
                completeness={state.completeness} 
                answers={state.answers} 
                saveStatus={state.saveStatus} 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
