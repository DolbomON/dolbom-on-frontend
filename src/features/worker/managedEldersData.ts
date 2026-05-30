export type RiskStatus = 'danger' | 'caution' | 'stable'

export type ElderFilter = 'all' | RiskStatus

export type ManagedElder = {
  age: number
  avatarSrc: string
  household: string
  id: string
  lastInputText: string
  name: string
  riskLabel: '위험' | '주의' | '안정'
  riskStatus: RiskStatus
  statusReason: string
}

export const elderFilters: Array<{ label: string; value: ElderFilter }> = [
  { label: '전체', value: 'all' },
  { label: '위험', value: 'danger' },
  { label: '주의', value: 'caution' },
  { label: '안정', value: 'stable' },
]

// TODO: Replace this mock data with the assigned elder API when it is ready.
export const managedElders: ManagedElder[] = [
  {
    age: 78,
    avatarSrc: '/assets/dolbomon/worker-elders/elder-kim-yeongja.png',
    household: '독거',
    id: 'kim-yeongja',
    lastInputText: '최근 입력 09:23',
    name: '김영자님',
    riskLabel: '주의',
    riskStatus: 'caution',
    statusReason: '식사 입력 지연',
  },
  {
    age: 82,
    avatarSrc: '/assets/dolbomon/worker-elders/elder-lee-sunja.png',
    household: '독거',
    id: 'lee-sunja',
    lastInputText: '최근 입력 08:47',
    name: '이순자님',
    riskLabel: '위험',
    riskStatus: 'danger',
    statusReason: '몸 불편 있음',
  },
  {
    age: 75,
    avatarSrc: '/assets/dolbomon/worker-elders/elder-park-cheolsu.png',
    household: '배우자 동거',
    id: 'park-cheolsu',
    lastInputText: '최근 입력 07:31',
    name: '박철수님',
    riskLabel: '주의',
    riskStatus: 'caution',
    statusReason: '수면 부족',
  },
  {
    age: 80,
    avatarSrc: '/assets/dolbomon/worker-elders/elder-choi-bokrye.png',
    household: '독거',
    id: 'choi-bokrye',
    lastInputText: '최근 입력 10:02',
    name: '최복례님',
    riskLabel: '안정',
    riskStatus: 'stable',
    statusReason: '오늘 상태 입력 완료',
  },
]
