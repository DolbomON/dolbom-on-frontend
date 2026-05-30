export type WorkerProfile = {
  id: string
  name: string
  role: string
  organization: string
  assignedCount: number
  todayCheckCount: number
  email: string
  phone: string
  avatarSrc: string
}

export type WorkerMypageMetricTone = 'blue' | 'orange' | 'green'

export type WorkerMypageMetric = {
  id: 'assigned' | 'schedule' | 'notification'
  label: string
  value: string
  tone: WorkerMypageMetricTone
}

export type WorkerMypageMenuTone = 'blue' | 'orange' | 'green' | 'purple'

export type WorkerMypageMenuItem = {
  id: 'account' | 'help' | 'memos' | 'notifications' | 'reports'
  title: string
  description: string
  href: string
  tone: WorkerMypageMenuTone
}

// TODO: Replace this typed mock data with the worker profile/settings API response.
export const workerProfile: WorkerProfile = {
  id: 'worker-lee-bokji',
  name: '이복지',
  role: '선임사회복지사',
  organization: '청주시 서원구 돌봄센터',
  assignedCount: 128,
  todayCheckCount: 12,
  email: 'iwelfare@careon.kr',
  phone: '010-2345-6789',
  avatarSrc: '/assets/dolbomon/worker-mypage/worker-lee-bokji.png',
}

export const workerMypageMetrics: WorkerMypageMetric[] = [
  {
    id: 'assigned',
    label: '내 담당자',
    value: '128명',
    tone: 'blue',
  },
  {
    id: 'schedule',
    label: '오늘 일정',
    value: '4건',
    tone: 'orange',
  },
  {
    id: 'notification',
    label: '알림 설정',
    value: '켜짐',
    tone: 'green',
  },
]

export const workerMypageMenuItems: WorkerMypageMenuItem[] = [
  {
    id: 'notifications',
    title: '알림 설정',
    description: '긴급 알림, 상태 알림 관리',
    href: '/worker/settings/notifications',
    tone: 'blue',
  },
  {
    id: 'memos',
    title: '상담 메모 관리',
    description: '저장한 메모와 최근 기록 확인',
    href: '/worker/memos',
    tone: 'orange',
  },
  {
    id: 'reports',
    title: '보고서 관리',
    description: '주간 보고서와 AI 요약 보기',
    href: '/worker/reports',
    tone: 'blue',
  },
  {
    id: 'account',
    title: '계정 및 보안',
    description: '비밀번호 변경, 로그인 정보 관리',
    href: '/worker/settings/account',
    tone: 'green',
  },
  {
    id: 'help',
    title: '도움말 및 문의',
    description: '사용 가이드와 고객 지원',
    href: '/worker/help',
    tone: 'purple',
  },
]
