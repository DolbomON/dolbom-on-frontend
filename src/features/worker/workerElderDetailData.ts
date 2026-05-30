export type ElderRiskStatus = 'stable' | 'caution' | 'danger' | 'emergency'

export type ElderDetailPeriod = 'today' | 'last7' | 'last30'

export type ElderDetail = {
  age: number
  avatarSrc: string
  guardianName: string
  household: string
  id: string
  name: string
  phoneNumber: string
  riskLabel: '안정' | '주의' | '위험' | '긴급'
  riskStatus: ElderRiskStatus
  statusText: string
}

export type ElderMetric = {
  id: 'todayRecord' | 'riskSignal' | 'aiSummary'
  label: string
  tone: 'blue' | 'orange' | 'green'
  value: string
}

export type ElderStatusSummaryItem = {
  id: 'medication' | 'meal' | 'condition' | 'mood' | 'sleep'
  label: string
  tone: 'blue' | 'orange' | 'green' | 'purple'
  value: string
}

export type ElderActivityItem = {
  description: string
  id: string
  time: string
  title: string
  tone: 'blue' | 'orange' | 'green'
}

export const elderDetailPeriods: Array<{
  label: string
  value: ElderDetailPeriod
}> = [
  { label: '오늘', value: 'today' },
  { label: '최근 7일', value: 'last7' },
  { label: '최근 30일', value: 'last30' },
]

// TODO: Replace this mock data with the worker elder detail API when it is ready.
export const elderDetails: ElderDetail[] = [
  {
    age: 78,
    avatarSrc: '/assets/dolbomon/worker-elders/elder-kim-yeongja.png',
    guardianName: '김민수',
    household: '독거',
    id: 'kim-yeongja',
    name: '김영자님',
    phoneNumber: '010-0000-0000',
    riskLabel: '주의',
    riskStatus: 'caution',
    statusText: '식사 입력 지연 · 최근 입력 09:23',
  },
  {
    age: 82,
    avatarSrc: '/assets/dolbomon/worker-elders/elder-lee-sunja.png',
    guardianName: '이현주',
    household: '독거',
    id: 'lee-sunja',
    name: '이순자님',
    phoneNumber: '010-0000-0000',
    riskLabel: '위험',
    riskStatus: 'danger',
    statusText: '몸 불편 있음 · 최근 입력 08:47',
  },
  {
    age: 75,
    avatarSrc: '/assets/dolbomon/worker-elders/elder-park-cheolsu.png',
    guardianName: '박지훈',
    household: '배우자 동거',
    id: 'park-cheolsu',
    name: '박철수님',
    phoneNumber: '010-0000-0000',
    riskLabel: '주의',
    riskStatus: 'caution',
    statusText: '수면 부족 · 최근 입력 07:31',
  },
  {
    age: 80,
    avatarSrc: '/assets/dolbomon/worker-elders/elder-choi-bokrye.png',
    guardianName: '최윤아',
    household: '독거',
    id: 'choi-bokrye',
    name: '최복례님',
    phoneNumber: '010-0000-0000',
    riskLabel: '안정',
    riskStatus: 'stable',
    statusText: '오늘 상태 입력 완료 · 최근 입력 10:02',
  },
]

export const elderDetailMetrics: ElderMetric[] = [
  {
    id: 'todayRecord',
    label: '오늘 기록',
    tone: 'blue',
    value: '4/5',
  },
  {
    id: 'riskSignal',
    label: '주의 신호',
    tone: 'orange',
    value: '1건',
  },
  {
    id: 'aiSummary',
    label: 'AI 요약',
    tone: 'green',
    value: '있음',
  },
]

export const elderStatusSummaryItems: ElderStatusSummaryItem[] = [
  {
    id: 'medication',
    label: '복약',
    tone: 'blue',
    value: '완료',
  },
  {
    id: 'meal',
    label: '식사',
    tone: 'orange',
    value: '미입력',
  },
  {
    id: 'condition',
    label: '몸 상태',
    tone: 'orange',
    value: '주의',
  },
  {
    id: 'mood',
    label: '기분',
    tone: 'green',
    value: '좋음',
  },
  {
    id: 'sleep',
    label: '수면',
    tone: 'purple',
    value: '양호',
  },
]

export const elderRecentActivities: ElderActivityItem[] = [
  {
    description: '식사 미입력',
    id: 'activity-status-input',
    time: '09:23',
    title: '상태 입력',
    tone: 'orange',
  },
  {
    description: '기분 좋음으로 기록',
    id: 'activity-ai-chat',
    time: '08:55',
    title: 'AI 안부 대화',
    tone: 'green',
  },
  {
    description: '복약 완료',
    id: 'activity-medication',
    time: '07:40',
    title: '복약 기록',
    tone: 'blue',
  },
]
