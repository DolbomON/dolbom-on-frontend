export type UserRole = 'elder' | 'family' | 'worker'

export type RiskLevel = 'stable' | 'watch' | 'urgent'

export type ElderSummary = {
  age: number
  id: string
  lastCheckAt: string
  name: string
  riskLevel: RiskLevel
  summary: string
}

export type HealthCheckMetric = {
  label: string
  value: string
}
