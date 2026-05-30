export type RiskLevel = 'normal' | 'caution' | 'danger' | 'emergency'

export type DashboardMetric = {
  id: 'total' | 'risk' | 'urgent'
  label: string
  value: string
  tone: 'blue' | 'orange' | 'green'
}

export type ElderRiskItem = {
  avatarSrc?: string
  detailHref: string
  id: string
  lastInputText: string
  name: string
  riskLabel: '주의' | '위험'
  riskLevel: Extract<RiskLevel, 'caution' | 'danger'>
  riskReason: string
}

export type WorkerAlert = {
  href: string
  id: string
  time: string
  title: string
  tone: 'success' | 'danger' | 'info'
}

export const workerDashboardMetrics: DashboardMetric[] = [
  {
    id: 'total',
    label: '전체 대상자',
    tone: 'blue',
    value: '128명',
  },
  {
    id: 'risk',
    label: '위험 대상자',
    tone: 'orange',
    value: '12명',
  },
  {
    id: 'urgent',
    label: '긴급 알림',
    tone: 'green',
    value: '3건',
  },
]

export const workerRiskItems: ElderRiskItem[] = [
  {
    avatarSrc: '/assets/dolbomon/worker-dashboard/elder-kim-yeongja.png',
    detailHref: '/worker/elders/kim-yeongja',
    id: 'kim-yeongja',
    lastInputText: '최근 입력 09:23',
    name: '김영자님',
    riskLabel: '주의',
    riskLevel: 'caution',
    riskReason: '식사 미입력',
  },
  {
    avatarSrc: '/assets/dolbomon/worker-dashboard/elder-lee-sunja.png',
    detailHref: '/worker/elders/lee-sunja',
    id: 'lee-sunja',
    lastInputText: '최근 입력 08:47',
    name: '이순자님',
    riskLabel: '위험',
    riskLevel: 'danger',
    riskReason: '몸 불편 있음',
  },
  {
    avatarSrc: '/assets/dolbomon/worker-dashboard/elder-park-cheolsu.png',
    detailHref: '/worker/elders/park-cheolsu',
    id: 'park-cheolsu',
    lastInputText: '최근 입력 07:31',
    name: '박철수님',
    riskLabel: '주의',
    riskLevel: 'caution',
    riskReason: '수면 부족',
  },
]

// TODO: Add /worker/alerts/:alertId routes when alert detail screens are implemented.
export const workerAlerts: WorkerAlert[] = [
  {
    href: '/worker/alerts/alert-1',
    id: 'alert-1',
    time: '09:23',
    title: '김영자님 오늘 상태 입력 완료',
    tone: 'success',
  },
  {
    href: '/worker/alerts/alert-2',
    id: 'alert-2',
    time: '08:47',
    title: '이순자님 몸 불편 있음',
    tone: 'danger',
  },
  {
    href: '/worker/alerts/alert-3',
    id: 'alert-3',
    time: '07:31',
    title: '박철수님 AI 요약 생성 완료',
    tone: 'info',
  },
]
