export type AssignmentPriority = '긴급' | '주의' | '높음' | '보통'

export type CaregiverAssignment = {
  assignedCaregiver: string
  createdAt: string
  dueTime: string
  elderId: string
  elderName: string
  priority: AssignmentPriority
  requestContent: string
}

export type NextVisit = {
  address: string
  elderId: string
  elderName: string
  phoneNumber: string
  visitTime: string
  workerRequestSummary: string
}

export const caregiverAssignmentStorageKey =
  'dolbom-on:new-caregiver-assignment'

export const caregiverNextVisit: NextVisit = {
  address: '서울 강서구 화곡동',
  elderId: 'kim-yeongja',
  elderName: '김영자님',
  phoneNumber: '010-1234-5678',
  visitTime: '10:30 ~ 11:10',
  workerRequestSummary: '식사량과 복약 여부 확인',
}

export const caregiverTodayVisits = [
  {
    elderId: 'kim-yeongja',
    elderName: '김영자님',
    familyHandoff: '딸에게 저녁 복약 시간 지연 여부를 전달해 주세요.',
    status: '방문 전',
    task: '복지사 요청 관찰',
    time: '10:30',
  },
  {
    elderId: 'lee-sunja',
    elderName: '이순자님',
    familyHandoff: '보호자가 오후 통화를 원합니다.',
    status: '대기',
    task: '식사 및 통증 확인',
    time: '14:00',
  },
  {
    elderId: 'park-cheolsu',
    elderName: '박철수님',
    familyHandoff: '수면 변화가 있으면 가족 메모로 남겨 주세요.',
    status: '기록 필요',
    task: '관찰 기록 보완',
    time: '16:20',
  },
] as const
