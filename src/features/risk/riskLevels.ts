import type { RiskLevel } from '../../types/domain'

export const riskLevelMeta: Record<
  RiskLevel,
  { label: string; pillClass: string; summary: string }
> = {
  stable: {
    label: '안정',
    pillClass: 'bg-emerald-100 text-emerald-800',
    summary: '최근 확인 내용이 안정적입니다.',
  },
  watch: {
    label: '관찰',
    pillClass: 'bg-amber-100 text-amber-800',
    summary: '변화가 있어 가족 확인이 필요합니다.',
  },
  urgent: {
    label: '주의',
    pillClass: 'bg-rose-100 text-rose-800',
    summary: '빠른 연락 또는 방문 확인이 필요합니다.',
  },
}
