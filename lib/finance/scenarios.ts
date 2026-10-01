export interface FinancialScenario {
  id: string
  name: string
  activeBuildSprints: number
  averageSprintFee: number
  activeRetainers: number
  averageRetainerFee: number
  monthlyGrossRevenue: number
  annualizedRunRate: number
  estimatedDirectCosts: number
  netMarginPercentage: number
  cashflowProjection30d: number
  cashflowProjection90d: number
}

export function computeFinancialScenario(params: {
  activeBuildSprints: number
  averageSprintFee: number
  activeRetainers: number
  averageRetainerFee: number
  directEngineeringCostRatio?: number // default 0.28 (28% direct cost)
}): FinancialScenario {
  const directCostRatio = params.directEngineeringCostRatio ?? 0.28

  // Average build sprint runs 6-8 weeks, roughly half billed monthly
  const monthlySprintRevenue = (params.activeBuildSprints * params.averageSprintFee) / 2
  const monthlyRetainerRevenue = params.activeRetainers * params.averageRetainerFee
  const monthlyGrossRevenue = monthlySprintRevenue + monthlyRetainerRevenue

  const annualizedRunRate = monthlyGrossRevenue * 12
  const estimatedDirectCosts = monthlyGrossRevenue * directCostRatio
  const netMargin = monthlyGrossRevenue - estimatedDirectCosts
  const netMarginPercentage = Math.round((netMargin / monthlyGrossRevenue) * 100) || 72

  // Cashflow projections assuming 50% deposit upfront on sprints
  const cashflowProjection30d = Math.round(monthlyGrossRevenue * 0.95)
  const cashflowProjection90d = Math.round(monthlyGrossRevenue * 2.8)

  return {
    id: `scenario-${Date.now().toString(36)}`,
    name: 'Current Operational Run-Rate',
    activeBuildSprints: params.activeBuildSprints,
    averageSprintFee: params.averageSprintFee,
    activeRetainers: params.activeRetainers,
    averageRetainerFee: params.averageRetainerFee,
    monthlyGrossRevenue,
    annualizedRunRate,
    estimatedDirectCosts,
    netMarginPercentage,
    cashflowProjection30d,
    cashflowProjection90d,
  }
}
