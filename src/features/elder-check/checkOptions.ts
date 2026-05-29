export const moodOptions = [
  { label: '좋아요', value: 'good' },
  { label: '보통이에요', value: 'okay' },
  { label: '힘들어요', value: 'bad' },
] as const

export const painOptions = [
  { label: '통증 없음', value: 'none' },
  { label: '조금 아파요', value: 'mild' },
  { label: '많이 아파요', value: 'strong' },
] as const

export const mealOptions = [
  { label: '식사했어요', value: 'yes' },
  { label: '아직 못 했어요', value: 'no' },
] as const
