export type ElderRiskStatus = 'stable' | 'caution' | 'danger' | 'emergency'

export type WorkerElder = {
  id: string
  name: string
  age: number
  household: string
  avatarSrc: string
  assignedWorkerName: string
}

export type ConsultationMethod = 'phone' | 'visit' | 'message'

export type CaseMemoFormState = {
  elderId: string
  method: ConsultationMethod
  consultationDateTime: string
  memoContent: string
  actionNotes: string
  nextFollowUpDate: string
  nextFollowUpTime: string
}

export type CaseMemoPayload = CaseMemoFormState & {
  createdBy: string
  createdAt: string
}

// TODO: Replace this mock data with the worker elder API when memo creation is connected.
export const caseMemoElders: WorkerElder[] = [
  {
    age: 78,
    assignedWorkerName: '이복지 선임사회복지사',
    avatarSrc: '/assets/dolbomon/worker-elders/elder-kim-yeongja.png',
    household: '독거',
    id: 'kim-yeongja',
    name: '김영자님',
  },
  {
    age: 82,
    assignedWorkerName: '이복지 선임사회복지사',
    avatarSrc: '/assets/dolbomon/worker-elders/elder-lee-sunja.png',
    household: '독거',
    id: 'lee-sunja',
    name: '이순자님',
  },
  {
    age: 75,
    assignedWorkerName: '이복지 선임사회복지사',
    avatarSrc: '/assets/dolbomon/worker-elders/elder-park-cheolsu.png',
    household: '배우자 동거',
    id: 'park-cheolsu',
    name: '박철수님',
  },
  {
    age: 80,
    assignedWorkerName: '이복지 선임사회복지사',
    avatarSrc: '/assets/dolbomon/worker-elders/elder-choi-bokrye.png',
    household: '독거',
    id: 'choi-bokrye',
    name: '최복례님',
  },
]

export const defaultCaseMemoFormState: Omit<CaseMemoFormState, 'elderId'> = {
  actionNotes: '',
  consultationDateTime: '2024-05-29T14:30',
  memoContent: '',
  method: 'phone',
  nextFollowUpDate: '2024-06-05',
  nextFollowUpTime: '10:00',
}
