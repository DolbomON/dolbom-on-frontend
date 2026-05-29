import type { ElderSummary } from '../../types/domain'

export const elderSummaries: ElderSummary[] = [
  {
    id: 'elder-001',
    name: '김영자',
    age: 78,
    lastCheckAt: '오늘 오전 8:20',
    riskLevel: 'stable',
    summary: '식사와 수면 모두 안정적입니다.',
  },
  {
    id: 'elder-002',
    name: '박정수',
    age: 82,
    lastCheckAt: '어제 오후 7:10',
    riskLevel: 'watch',
    summary: '수면 시간이 짧아 관찰 중입니다.',
  },
  {
    id: 'elder-003',
    name: '이순희',
    age: 75,
    lastCheckAt: '오늘 오전 9:05',
    riskLevel: 'urgent',
    summary: '통증 응답이 있어 확인이 필요합니다.',
  },
]
