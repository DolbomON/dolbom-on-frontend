export type WorkerAlertStatus = 'urgent' | 'caution' | 'complete'

export type WorkerAlertFilter = 'all' | WorkerAlertStatus

export type WorkerAlertSummaryMetric = {
  id: 'urgent' | 'caution' | 'complete'
  label: string
  tone: 'red' | 'orange' | 'blue'
  value: string
}

export type WorkerAlertItem = {
  description: string
  iconSrc: string
  id: string
  status: WorkerAlertStatus
  statusLabel: '긴급' | '주의' | '완료'
  time: string
  title: string
}

export type WorkerAlertFilterOption = {
  label: string
  value: WorkerAlertFilter
}

export const workerAlertSummaryMetrics: WorkerAlertSummaryMetric[] = [
  {
    id: 'urgent',
    label: '긴급',
    tone: 'red',
    value: '3건',
  },
  {
    id: 'caution',
    label: '주의',
    tone: 'orange',
    value: '7건',
  },
  {
    id: 'complete',
    label: '오늘 완료',
    tone: 'blue',
    value: '12건',
  },
]

export const workerAlertFilters: WorkerAlertFilterOption[] = [
  { label: '전체', value: 'all' },
  { label: '긴급', value: 'urgent' },
  { label: '주의', value: 'caution' },
  { label: '완료', value: 'complete' },
]

// TODO: Replace this mock data with the worker alerts API when backend alert
// status, read state, and response metadata are available.
export const workerAlertItems: WorkerAlertItem[] = [
  {
    description: '통증 기록 입력 · 즉시 확인 필요',
    iconSrc: '/assets/dolbomon/worker-alerts/alert-pain.png',
    id: 'alert-pain-lee-sunja',
    status: 'urgent',
    statusLabel: '긴급',
    time: '08:47',
    title: '이순자님 몸 불편 있음',
  },
  {
    description: '아침 식사 상태가 아직 입력되지 않았어요',
    iconSrc: '/assets/dolbomon/worker-alerts/alert-meal.png',
    id: 'alert-meal-kim-yeongja',
    status: 'caution',
    statusLabel: '주의',
    time: '09:23',
    title: '김영자님 식사 미입력',
  },
  {
    description: '오늘 안부 대화 내용이 정리되었어요',
    iconSrc: '/assets/dolbomon/worker-alerts/alert-ai-summary.png',
    id: 'alert-ai-park-cheolsu',
    status: 'complete',
    statusLabel: '완료',
    time: '07:31',
    title: '박철수님 AI 요약 생성 완료',
  },
  {
    description: '어젯밤 수면 상태를 추가 확인해보세요',
    iconSrc: '/assets/dolbomon/worker-alerts/alert-sleep.png',
    id: 'alert-sleep-choi-bokrye',
    status: 'caution',
    statusLabel: '주의',
    time: '10:02',
    title: '최복례님 수면 부족 기록',
  },
]
