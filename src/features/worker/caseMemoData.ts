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
  audioMemoAttached: boolean
  caregiverMessage: string
  consultationContent: string
  elderId: string
  followUpPlan: string
  memoContent: string
  observationContent: string
  photoAttachmentIds: string[]
  symptomIds: string[]
  visitDate: string
  visitEndTime: string
  visitPurpose: string
  visitStartTime: string
}

export type CaseMemoPayload = CaseMemoFormState & {
  createdBy: string
  createdAt: string
}

// TODO: Replace this mock data with the worker elder API when memo creation is connected.
export const caseMemoElders: WorkerElder[] = [
  {
    age: 84,
    assignedWorkerName: '김민수 요양사',
    avatarSrc: '/assets/dolbomon/worker-elders/elder-kim-yeongja.png',
    household: '배우자와 거주',
    id: 'kim-yeongja',
    name: '김영자님',
  },
  {
    age: 82,
    assignedWorkerName: '김민수 요양사',
    avatarSrc: '/assets/dolbomon/worker-elders/elder-lee-sunja.png',
    household: '독거',
    id: 'lee-sunja',
    name: '이순자님',
  },
  {
    age: 75,
    assignedWorkerName: '김민수 요양사',
    avatarSrc: '/assets/dolbomon/worker-elders/elder-park-cheolsu.png',
    household: '배우자 동거',
    id: 'park-cheolsu',
    name: '박철수님',
  },
  {
    age: 80,
    assignedWorkerName: '김민수 요양사',
    avatarSrc: '/assets/dolbomon/worker-elders/elder-choi-bokrye.png',
    household: '독거',
    id: 'choi-bokrye',
    name: '최복례님',
  },
]

export const defaultCaseMemoFormState: Omit<CaseMemoFormState, 'elderId'> = {
  audioMemoAttached: false,
  caregiverMessage: '',
  consultationContent: '',
  followUpPlan: '',
  memoContent: '',
  observationContent: '',
  photoAttachmentIds: [],
  symptomIds: [],
  visitDate: '2025-05-31',
  visitEndTime: '11:10',
  visitPurpose: '',
  visitStartTime: '10:30',
}
