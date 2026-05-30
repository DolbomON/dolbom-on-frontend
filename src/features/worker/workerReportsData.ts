export type ReportPeriod = 'today' | 'week' | 'month'

export type ReportMetricTone = 'blue' | 'orange' | 'green'

export type ReportMetric = {
  id: 'recordRate' | 'riskCount' | 'aiSummary'
  label: string
  tone: ReportMetricTone
  value: string
}

export type ReportProgressTone = 'blue' | 'gray' | 'green' | 'orange' | 'purple'

export type ReportProgressItem = {
  id: string
  label: string
  progress: number
  tone: ReportProgressTone
  valueText: string
}

export type ReportTargetStatus = 'emergency' | 'caution'

export type ReportTarget = {
  href: string
  id: string
  name: string
  reason: string
  status: ReportTargetStatus
  statusLabel: '긴급' | '주의'
}

export const reportPeriods: Array<{ label: string; value: ReportPeriod }> = [
  { label: '오늘', value: 'today' },
  { label: '주간', value: 'week' },
  { label: '월간', value: 'month' },
]

// TODO: Replace this mock report overview with the worker report API when it is ready.
export const reportMetrics: ReportMetric[] = [
  {
    id: 'recordRate',
    label: '오늘 기록률',
    tone: 'blue',
    value: '86%',
  },
  {
    id: 'riskCount',
    label: '주의/위험',
    tone: 'orange',
    value: '15명',
  },
  {
    id: 'aiSummary',
    label: 'AI 요약',
    tone: 'green',
    value: '12건',
  },
]

export const todaySummaryRows: ReportProgressItem[] = [
  {
    id: 'complete',
    label: '상태 입력 완료',
    progress: 86,
    tone: 'blue',
    valueText: '110명',
  },
  {
    id: 'missing',
    label: '미입력',
    progress: 14,
    tone: 'gray',
    valueText: '18명',
  },
  {
    id: 'risk',
    label: '위험 확인 필요',
    progress: 3,
    tone: 'orange',
    valueText: '3명',
  },
]

export const categoryRecordRows: ReportProgressItem[] = [
  {
    id: 'medication',
    label: '복약',
    progress: 92,
    tone: 'blue',
    valueText: '92%',
  },
  {
    id: 'meal',
    label: '식사',
    progress: 84,
    tone: 'orange',
    valueText: '84%',
  },
  {
    id: 'mood',
    label: '기분',
    progress: 88,
    tone: 'green',
    valueText: '88%',
  },
  {
    id: 'sleep',
    label: '수면',
    progress: 79,
    tone: 'purple',
    valueText: '79%',
  },
]

export const followUpTargets: ReportTarget[] = [
  {
    href: '/worker/elders/lee-sunja',
    id: 'lee-sunja',
    name: '이순자님',
    reason: '몸 불편 있음',
    status: 'emergency',
    statusLabel: '긴급',
  },
  {
    href: '/worker/elders/kim-yeongja',
    id: 'kim-yeongja',
    name: '김영자님',
    reason: '식사 미입력',
    status: 'caution',
    statusLabel: '주의',
  },
  {
    href: '/worker/elders/choi-bokrye',
    id: 'choi-bokrye',
    name: '최복례님',
    reason: '수면 부족 기록',
    status: 'caution',
    statusLabel: '주의',
  },
]
