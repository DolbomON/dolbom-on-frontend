import {
  Bell,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  FileText,
  MapPin,
  MessageCircle,
  MoreVertical,
  Phone,
  Play,
  Search,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { caregiverTopNavItems } from '../../components/worker/caregiverTopNavigation'
import {
  caregiverAssignmentStorageKey,
  type CaregiverAssignment,
} from '../../features/caregiver/visitAssignments'
import { cn } from '../../lib/utils'

const workerAssetBase = '/assets/dolbomon/worker'
const profileSrc = `${workerAssetBase}/아들.png`

type AssignmentStatus = 'completed' | 'inProgress' | 'pending'
type AssignmentPriority = 'normal' | 'low' | 'caution'
type AssignmentFilter = AssignmentStatus | 'all' | 'caution' | 'todayDue'

type AssignmentTask = {
  action: 'call' | 'record' | 'visit'
  content: string
  due: string
  elderId: string
  iconSrc: string
  id: string
  priority: AssignmentPriority
  requester: string
  status: AssignmentStatus
  title: string
}

type MetricCard = {
  iconSrc: string
  id: string
  label: string
  tone: 'blue' | 'orange'
  unit: string
  value: string
}

type ScheduleItem = {
  address: string
  status: 'inProgress' | 'scheduled'
  time: string
  title: string
}

type ContactItem = {
  avatarSrc: string
  description: string
  name: string
  phone?: string
}

type ChecklistItem = {
  checked: boolean
  label: string
}

const navItems = [
  ...caregiverTopNavItems,
  { href: '/worker/mypage', label: '설정' },
] as const

const metricCards: MetricCard[] = [
  {
    iconSrc: `${workerAssetBase}/1.png`,
    id: 'assigned',
    label: '오늘 배정',
    tone: 'blue',
    unit: '건',
    value: '4',
  },
  {
    iconSrc: `${workerAssetBase}/2.png`,
    id: 'caution',
    label: '주의',
    tone: 'orange',
    unit: '건',
    value: '2',
  },
  {
    iconSrc: `${workerAssetBase}/3.png`,
    id: 'deadline',
    label: '오늘 마감',
    tone: 'blue',
    unit: '건',
    value: '3',
  },
]

const defaultTasks: AssignmentTask[] = [
  {
    action: 'visit',
    content: '식사량과 저녁 복약 여부를 확인해주세요.',
    due: '오늘 15:00',
    elderId: 'kim-yeongja',
    iconSrc: `${workerAssetBase}/7.png`,
    id: 'visit-confirm',
    priority: 'caution',
    requester: '이수진 복지사',
    status: 'inProgress',
    title: '김영자님 방문 확인 요청',
  },
  {
    action: 'visit',
    content: '밤중 각성 여부 확인',
    due: '오늘 17:00',
    elderId: 'lee-sunja',
    iconSrc: `${workerAssetBase}/수면.png`,
    id: 'sleep-check',
    priority: 'normal',
    requester: '박수진 복지사',
    status: 'pending',
    title: '이순자님 수면 상태 확인',
  },
  {
    action: 'call',
    content: '식사 여부와 기분 상태 확인',
    due: '내일 10:00',
    elderId: 'park-cheolsu',
    iconSrc: `${workerAssetBase}/5.png`,
    id: 'wellbeing-call',
    priority: 'low',
    requester: '이수진 복지사',
    status: 'pending',
    title: '박철수님 안부 전화 요청',
  },
  {
    action: 'record',
    content: '약 복용 여부 및 특이사항 확인',
    due: '오늘 18:00',
    elderId: 'choi-bokrye',
    iconSrc: `${workerAssetBase}/6.png`,
    id: 'medication-record',
    priority: 'normal',
    requester: '박수진 복지사',
    status: 'pending',
    title: '최복순님 복약 확인',
  },
]

const filters: Array<{ label: string; value: AssignmentFilter }> = [
  { label: '전체', value: 'all' },
  { label: '주의', value: 'caution' },
  { label: '오늘 마감', value: 'todayDue' },
  { label: '진행 중', value: 'inProgress' },
  { label: '완료', value: 'completed' },
]

const scheduleItems: ScheduleItem[] = [
  {
    address: '서울시 강남구 도산대로 123',
    status: 'inProgress',
    time: '09:30 ~ 10:30',
    title: '김영자님 방문 확인',
  },
  {
    address: '서울시 송파구 잠실로 45',
    status: 'scheduled',
    time: '14:00 ~ 15:00',
    title: '이순자님 수면 상태 확인',
  },
  {
    address: '전화 연락',
    status: 'scheduled',
    time: '16:30 ~ 17:00',
    title: '박철수님 안부 전화',
  },
]

const contactItems: ContactItem[] = [
  {
    avatarSrc: '/assets/dolbomon/worker-mypage/worker-lee-bokji.png',
    description: '복지관 사회복지사',
    name: '이수진 복지사',
  },
  {
    avatarSrc: `${workerAssetBase}/아들.png`,
    description: '김지현 010-1234-5678',
    name: '김영자님 가족 (딸)',
    phone: '01012345678',
  },
]

const checklistItems: ChecklistItem[] = [
  { checked: true, label: '신분 확인 (신분증, 명찰)' },
  { checked: true, label: '복약 확인 도구 (복약표, 기록지)' },
  { checked: true, label: '손 소독제 및 위생 용품' },
  { checked: false, label: '메모 준비 (메모지, 펜)' },
  { checked: false, label: '응급 연락처 확인' },
]

const priorityStyles: Record<
  AssignmentPriority,
  {
    badge: string
    label: string
  }
> = {
  caution: {
    badge: 'bg-[#fff1df] text-[#f06d00] ring-[#ffd6a3]',
    label: '주의',
  },
  low: {
    badge: 'bg-[#e7f8ed] text-[#178949] ring-[#bfe8cc]',
    label: '낮음',
  },
  normal: {
    badge: 'bg-[#e8f2ff] text-[#0a63df] ring-[#c9dcff]',
    label: '일반',
  },
}

const statusStyles: Record<
  AssignmentStatus,
  {
    badge: string
    label: string
  }
> = {
  completed: {
    badge: 'bg-[#e9f8ee] text-[#178949] ring-[#bfe8cc]',
    label: '완료',
  },
  inProgress: {
    badge: 'bg-[#fff1df] text-[#ef6f00] ring-[#ffd6a3]',
    label: '진행 중',
  },
  pending: {
    badge: 'bg-[#edf4ff] text-[#0a63df] ring-[#c9dcff]',
    label: '예정',
  },
}

const metricToneClass: Record<MetricCard['tone'], string> = {
  blue: 'text-[#0867f2]',
  orange: 'text-[#e96f00]',
}

function readLatestAssignment() {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const savedAssignment = window.localStorage.getItem(
      caregiverAssignmentStorageKey,
    )

    if (!savedAssignment) {
      return null
    }

    return JSON.parse(savedAssignment) as CaregiverAssignment
  } catch {
    return null
  }
}

function mapStoredAssignment(assignment: CaregiverAssignment): AssignmentTask {
  return {
    action: 'visit',
    content: assignment.requestContent,
    due: assignment.dueTime,
    elderId: assignment.elderId,
    iconSrc: `${workerAssetBase}/7.png`,
    id: `stored-${assignment.createdAt}`,
    priority:
      assignment.priority === '긴급' || assignment.priority === '주의'
        ? 'caution'
        : 'normal',
    requester: '복지사 배정',
    status: 'inProgress',
    title: `${assignment.elderName} 방문 확인 요청`,
  }
}

function normalizeSearch(value: string) {
  return value.trim().toLocaleLowerCase('ko-KR')
}

function taskMatchesSearch(task: AssignmentTask, searchQuery: string) {
  const keyword = normalizeSearch(searchQuery)

  if (!keyword) {
    return true
  }

  return [
    task.title,
    task.content,
    task.requester,
    task.due,
    priorityStyles[task.priority].label,
    statusStyles[task.status].label,
  ]
    .map(normalizeSearch)
    .join(' ')
    .includes(keyword)
}

function taskMatchesFilter(task: AssignmentTask, filter: AssignmentFilter) {
  if (filter === 'all') {
    return true
  }

  if (filter === 'caution') {
    return task.priority === 'caution'
  }

  if (filter === 'todayDue') {
    return task.due.startsWith('오늘')
  }

  return task.status === filter
}

function CaregiverAssignmentsTopBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#dde6f2] bg-white/96 shadow-[0_5px_18px_rgba(32,70,130,0.05)] backdrop-blur">
      <div className="mx-auto grid min-h-[76px] w-full max-w-[1800px] grid-cols-[auto_auto] items-center gap-x-4 gap-y-2 px-5 py-2 lg:grid-cols-[210px_minmax(0,1fr)_auto] lg:px-10">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center text-[30px] font-black leading-none text-[#0867f2] drop-shadow-[0_5px_10px_rgba(8,103,242,0.14)] focus-visible:rounded-lg lg:text-[38px]"
          aria-label="돌봄ON 홈"
        >
          돌봄ON
        </Link>

        <nav
          className="col-span-2 row-start-2 flex min-w-0 gap-2 overflow-x-auto text-[15px] font-black text-[#111827] [-ms-overflow-style:none] [scrollbar-width:none] lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:justify-self-center lg:gap-8 [&::-webkit-scrollbar]:hidden"
          aria-label="요양사 메뉴"
        >
          {navItems.map((item) => {
            const isActive = item.href === '/caregiver'

            return (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  'relative inline-flex min-h-11 shrink-0 items-center justify-center px-2 transition hover:text-[#0867f2] focus-visible:rounded-lg',
                  isActive ? 'text-[#0867f2]' : 'text-[#111827]',
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
                {isActive ? (
                  <span
                    className="absolute bottom-[-8px] left-0 right-0 h-1 rounded-full bg-[#0867f2] lg:bottom-[-14px]"
                    aria-hidden="true"
                  />
                ) : null}
              </Link>
            )
          })}
        </nav>

        <div className="col-start-2 row-start-1 flex items-center gap-3 justify-self-end lg:col-start-3">
          <button
            type="button"
            className="relative inline-grid min-h-11 min-w-11 place-items-center rounded-lg text-[#3d4c69] transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
            aria-label="알림 3건 확인"
          >
            <Bell aria-hidden="true" size={29} strokeWidth={2.4} />
            <span className="absolute right-1 top-0 grid h-[22px] min-w-[22px] place-items-center rounded-full bg-[#ff3648] px-1 text-[12px] font-black leading-none text-white ring-2 ring-white">
              3
            </span>
          </button>

          <Link
            to="/caregiver"
            className="hidden min-h-12 items-center gap-3 rounded-lg px-1.5 py-1 transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff] min-[560px]:inline-flex"
            aria-label="김민수 요양사 프로필 보기"
          >
            <img
              src={profileSrc}
              alt=""
              className="h-12 w-12 rounded-full bg-[#eaf4ff] object-cover shadow-[0_7px_15px_rgba(42,96,184,0.16)]"
              draggable="false"
            />
            <span className="hidden items-baseline gap-1 whitespace-nowrap sm:flex">
              <strong className="text-[15px] font-black leading-tight text-[#071747]">
                김민수
              </strong>
              <span className="text-[14px] font-bold leading-tight text-[#33415f]">
                요양사
              </span>
            </span>
            <ChevronDown
              aria-hidden="true"
              className="hidden h-4 w-4 text-[#33415f] sm:block"
              strokeWidth={2.8}
            />
          </Link>
        </div>
      </div>
    </header>
  )
}

function MetricSummaryCard({ metric }: { metric: MetricCard }) {
  return (
    <article
      className="grid min-h-[96px] grid-cols-[68px_minmax(0,1fr)] items-center gap-3 rounded-[12px] border border-[#dfe8f5] bg-white px-4 py-3 shadow-[0_12px_26px_rgba(37,72,125,0.08)]"
      aria-label={`${metric.label} ${metric.value}${metric.unit}`}
    >
      <img
        src={metric.iconSrc}
        alt=""
        className="h-[64px] w-[64px] object-contain"
        draggable="false"
      />
      <div className="min-w-0">
        <h2 className="whitespace-nowrap text-[15px] font-black leading-tight text-[#071747]">
          {metric.label}
        </h2>
        <p
          className={cn('mt-1 whitespace-nowrap', metricToneClass[metric.tone])}
        >
          <strong className="text-[34px] font-black leading-none">
            {metric.value}
          </strong>
          <span className="ml-1 text-[17px] font-black">{metric.unit}</span>
        </p>
      </div>
    </article>
  )
}

function FilterIcon({ filter }: { filter: AssignmentFilter }) {
  if (filter === 'caution') {
    return (
      <span className="grid h-5 w-5 place-items-center rounded-full bg-[#ff9d1b] text-[14px] font-black leading-none text-white">
        !
      </span>
    )
  }

  if (filter === 'todayDue') {
    return (
      <span className="grid h-5 w-5 place-items-center rounded-full border-2 border-[#f04444] text-[#f04444]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#f04444]" />
      </span>
    )
  }

  if (filter === 'inProgress') {
    return <Play aria-hidden="true" className="h-5 w-5" strokeWidth={2.9} />
  }

  if (filter === 'completed') {
    return (
      <CheckCircle2 aria-hidden="true" className="h-5 w-5" strokeWidth={2.8} />
    )
  }

  return null
}

function AssignmentControls({
  activeFilter,
  onFilterChange,
  onSearchChange,
  searchQuery,
}: {
  activeFilter: AssignmentFilter
  onFilterChange: (filter: AssignmentFilter) => void
  onSearchChange: (value: string) => void
  searchQuery: string
}) {
  return (
    <section
      className="grid gap-3 rounded-[16px] border border-[#dfe8f5] bg-white/80 p-3 shadow-[0_10px_24px_rgba(37,72,125,0.05)] lg:grid-cols-[minmax(0,1fr)_348px] lg:items-center"
      aria-label="배정 업무 검색 및 필터"
    >
      <div
        className="flex min-w-0 gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="group"
        aria-label="업무 상태 필터"
      >
        {filters.map((filter) => {
          const isActive = activeFilter === filter.value

          return (
            <button
              key={filter.value}
              type="button"
              className={cn(
                'inline-flex min-h-[42px] shrink-0 items-center justify-center gap-2 rounded-full border px-4 text-[15px] font-black shadow-[0_7px_16px_rgba(37,72,125,0.04)] transition focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]',
                isActive
                  ? 'border-[#0867f2] bg-[#0867f2] text-white shadow-[0_10px_20px_rgba(8,103,242,0.24)]'
                  : 'border-[#dfe8f5] bg-white text-[#1f2c48] hover:bg-[#f5f9ff]',
              )}
              aria-pressed={isActive}
              onClick={() => onFilterChange(filter.value)}
            >
              <FilterIcon filter={filter.value} />
              {filter.label}
            </button>
          )
        })}
      </div>

      <label className="relative block">
        <span className="sr-only">배정 업무 검색</span>
        <Search
          aria-hidden="true"
          className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#53678c]"
          strokeWidth={2.5}
        />
        <input
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          className="h-[46px] w-full rounded-[10px] border border-[#d5dfec] bg-white py-0 pl-12 pr-4 text-[15px] font-bold text-[#071747] shadow-[0_8px_18px_rgba(37,72,125,0.04)] placeholder:text-[#7b89a2] focus:border-[#0867f2] focus:outline focus:outline-4 focus:outline-[#d7e8ff]"
          placeholder="업무명, 어르신 이름, 요청자 검색"
          type="search"
        />
      </label>
    </section>
  )
}

function FeaturedAssignment({ task }: { task: AssignmentTask }) {
  return (
    <article className="grid gap-5 rounded-[14px] border border-[#ffd9a6] bg-[linear-gradient(135deg,#fff9ef_0%,#ffffff_58%,#fff5e5_100%)] px-5 py-5 shadow-[0_14px_34px_rgba(168,94,28,0.12)] lg:grid-cols-[280px_minmax(0,1fr)] lg:items-center lg:px-7">
      <div className="flex justify-center lg:justify-start">
        <img
          src={task.iconSrc}
          alt=""
          className="h-[150px] w-[150px] object-contain sm:h-[190px] sm:w-[190px] lg:h-[228px] lg:w-[228px]"
          draggable="false"
        />
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span
            className={cn(
              'inline-flex min-h-8 items-center rounded-full px-4 text-[15px] font-black ring-1',
              priorityStyles[task.priority].badge,
            )}
          >
            {priorityStyles[task.priority].label}
          </span>
          <span
            className={cn(
              'inline-flex min-h-8 items-center rounded-full px-4 text-[14px] font-black ring-1',
              statusStyles[task.status].badge,
            )}
          >
            {statusStyles[task.status].label}
          </span>
        </div>

        <h2 className="mt-3 break-keep text-[28px] font-black leading-tight text-[#071747] sm:text-[34px]">
          {task.title}
        </h2>

        <dl className="mt-5 grid gap-3 text-[16px] font-bold leading-snug text-[#253758]">
          <div className="grid grid-cols-[26px_minmax(0,1fr)] items-start gap-3">
            <UserRound
              aria-hidden="true"
              className="mt-0.5 h-6 w-6 text-[#60708e]"
              strokeWidth={2.3}
            />
            <div>
              <dt className="inline font-black">요청자:</dt>{' '}
              <dd className="inline">{task.requester}</dd>
            </div>
          </div>
          <div className="grid grid-cols-[26px_minmax(0,1fr)] items-start gap-3">
            <MessageCircle
              aria-hidden="true"
              className="mt-0.5 h-6 w-6 text-[#60708e]"
              strokeWidth={2.3}
            />
            <div>
              <dt className="inline font-black">요청 내용:</dt>{' '}
              <dd className="inline">{task.content}</dd>
            </div>
          </div>
          <div className="grid grid-cols-[26px_minmax(0,1fr)] items-start gap-3">
            <CalendarDays
              aria-hidden="true"
              className="mt-0.5 h-6 w-6 text-[#60708e]"
              strokeWidth={2.3}
            />
            <div>
              <dt className="inline font-black">마감:</dt>{' '}
              <dd className="inline font-black text-[#f05c13]">{task.due}</dd>
            </div>
          </div>
        </dl>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <Link
            to={`/caregiver/elders/${task.elderId}`}
            className="inline-flex min-h-[56px] items-center justify-center gap-3 rounded-lg bg-[#0867f2] px-5 text-[18px] font-black text-white shadow-[0_14px_26px_rgba(8,103,242,0.28)] transition hover:bg-[#0057d8] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
          >
            <Play aria-hidden="true" className="h-6 w-6 fill-white" />
            방문 시작
          </Link>
          <a
            href="tel:01012345678"
            className="inline-flex min-h-[56px] items-center justify-center gap-3 rounded-lg border-2 border-[#0867f2] bg-white px-5 text-[18px] font-black text-[#0867f2] shadow-[0_10px_22px_rgba(47,86,145,0.06)] transition hover:bg-[#f1f7ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
          >
            <Phone aria-hidden="true" className="h-6 w-6" strokeWidth={2.7} />
            전화하기
          </a>
          <Link
            to={`/caregiver/elders/${task.elderId}/visit-record`}
            className="inline-flex min-h-[56px] items-center justify-center gap-3 rounded-lg border-2 border-[#0867f2] bg-white px-5 text-[18px] font-black text-[#0867f2] shadow-[0_10px_22px_rgba(47,86,145,0.06)] transition hover:bg-[#f1f7ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
          >
            <FileText
              aria-hidden="true"
              className="h-6 w-6"
              strokeWidth={2.7}
            />
            기록 작성
          </Link>
        </div>
      </div>
    </article>
  )
}

function AssignmentRow({ task }: { task: AssignmentTask }) {
  const actionLabel =
    task.action === 'call'
      ? '전화하기'
      : task.action === 'record'
        ? '기록 작성'
        : '방문 시작'
  const actionHref =
    task.action === 'record'
      ? `/caregiver/elders/${task.elderId}/visit-record`
      : task.action === 'call'
        ? 'tel:01012345678'
        : `/caregiver/elders/${task.elderId}`

  return (
    <article className="grid gap-4 rounded-[12px] border border-[#dfe8f5] bg-white px-4 py-4 shadow-[0_10px_24px_rgba(37,72,125,0.06)] lg:grid-cols-[96px_minmax(0,1fr)_174px_90px_144px_36px] lg:items-center lg:gap-4 lg:px-5 lg:py-3">
      <div className="flex items-center gap-4 lg:contents">
        <img
          src={task.iconSrc}
          alt=""
          className="h-[72px] w-[72px] shrink-0 rounded-full bg-[#f2f7ff] object-contain p-1 shadow-[0_8px_18px_rgba(47,86,145,0.09)]"
          draggable="false"
        />
        <div className="min-w-0 lg:hidden">
          <h3 className="break-keep text-[19px] font-black leading-tight text-[#071747]">
            {task.title}
          </h3>
          <p className="mt-2 text-[14px] font-bold leading-snug text-[#425371]">
            내용: {task.content}
          </p>
        </div>
      </div>

      <div className="hidden min-w-0 lg:block">
        <h3 className="truncate text-[20px] font-black leading-tight text-[#071747]">
          {task.title}
        </h3>
        <p className="mt-2 text-[15px] font-bold leading-snug text-[#425371]">
          <span className="font-black">요청자:</span> {task.requester}
        </p>
        <p className="mt-1 text-[15px] font-bold leading-snug text-[#425371]">
          <span className="font-black">내용:</span> {task.content}
        </p>
      </div>

      <p className="text-[15px] font-bold leading-snug text-[#425371] lg:hidden">
        요청자: {task.requester}
      </p>

      <p className="inline-flex items-center gap-2 text-[15px] font-bold text-[#253758]">
        <CalendarDays
          aria-hidden="true"
          className="h-5 w-5 shrink-0 text-[#60708e]"
          strokeWidth={2.3}
        />
        <span>
          마감:{' '}
          <strong className="font-black text-[#f05c13]">{task.due}</strong>
        </span>
      </p>

      <span
        className={cn(
          'inline-flex min-h-8 w-fit items-center justify-center rounded-full px-4 text-[14px] font-black ring-1',
          priorityStyles[task.priority].badge,
        )}
      >
        {priorityStyles[task.priority].label}
      </span>

      {actionHref.startsWith('tel:') ? (
        <a
          href={actionHref}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border-2 border-[#0867f2] bg-white px-4 text-[15px] font-black text-[#0867f2] shadow-[0_8px_18px_rgba(37,72,125,0.05)] transition hover:bg-[#f1f7ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          <Phone aria-hidden="true" className="h-5 w-5" strokeWidth={2.7} />
          {actionLabel}
        </a>
      ) : (
        <Link
          to={actionHref}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border-2 border-[#0867f2] bg-white px-4 text-[15px] font-black text-[#0867f2] shadow-[0_8px_18px_rgba(37,72,125,0.05)] transition hover:bg-[#f1f7ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          {task.action === 'record' ? (
            <FileText
              aria-hidden="true"
              className="h-5 w-5"
              strokeWidth={2.7}
            />
          ) : (
            <Play aria-hidden="true" className="h-5 w-5 fill-[#0867f2]" />
          )}
          {actionLabel}
        </Link>
      )}

      <button
        type="button"
        className="hidden min-h-10 min-w-10 place-items-center rounded-lg text-[#61708f] transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff] lg:grid"
        aria-label={`${task.title} 추가 메뉴`}
      >
        <MoreVertical aria-hidden="true" className="h-6 w-6" />
      </button>
    </article>
  )
}

function TodaySchedulePanel() {
  return (
    <section
      className="rounded-[14px] border border-[#d6e1ef] bg-white p-4 shadow-[0_12px_28px_rgba(37,72,125,0.07)]"
      aria-labelledby="assignment-schedule-title"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <CalendarDays
            aria-hidden="true"
            className="h-6 w-6 text-[#4f85e8]"
            strokeWidth={2.5}
          />
          <h2
            id="assignment-schedule-title"
            className="text-[20px] font-black leading-tight text-[#071747]"
          >
            오늘 일정
          </h2>
        </div>
        <Link
          to="/caregiver/schedules"
          className="inline-flex min-h-8 items-center gap-1 rounded-lg px-2 text-[14px] font-black text-[#0867f2] transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          더보기
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>

      <ol className="mt-4 overflow-hidden rounded-[12px] border border-[#e3eaf5]">
        {scheduleItems.map((item) => (
          <li
            key={`${item.time}-${item.title}`}
            className="grid grid-cols-[78px_1px_minmax(0,1fr)_66px] items-center gap-3 border-b border-[#e5edf8] px-3 py-3 last:border-b-0"
          >
            <time className="text-center text-[18px] font-black leading-tight text-[#071747]">
              {item.time.split(' ')[0]}
              <span className="mt-1 block text-[13px] font-bold text-[#52627f]">
                ~ {item.time.split('~ ')[1]}
              </span>
            </time>
            <span
              className={cn(
                'h-full w-px rounded-full',
                item.status === 'inProgress' ? 'bg-[#ff8b00]' : 'bg-[#77a4ff]',
              )}
              aria-hidden="true"
            />
            <div className="min-w-0">
              <p className="truncate text-[16px] font-black leading-tight text-[#071747]">
                {item.title}
              </p>
              <p className="mt-2 flex min-w-0 items-center gap-1 text-[13px] font-bold leading-tight text-[#53627c]">
                <MapPin
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0"
                  strokeWidth={2.4}
                />
                <span className="truncate">{item.address}</span>
              </p>
            </div>
            <span
              className={cn(
                'inline-flex min-h-7 items-center justify-center rounded-full px-3 text-[12px] font-black ring-1',
                item.status === 'inProgress'
                  ? 'bg-[#fff1df] text-[#ef6f00] ring-[#ffd6a3]'
                  : 'bg-[#edf4ff] text-[#0a63df] ring-[#c9dcff]',
              )}
            >
              {item.status === 'inProgress' ? '진행 중' : '예정'}
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}

function QuickContactPanel() {
  return (
    <section
      className="rounded-[14px] border border-[#d6e1ef] bg-white p-4 shadow-[0_12px_28px_rgba(37,72,125,0.07)]"
      aria-labelledby="quick-contact-title"
    >
      <div className="flex items-center gap-2">
        <UserRound
          aria-hidden="true"
          className="h-6 w-6 text-[#5b8ee8]"
          strokeWidth={2.5}
        />
        <h2
          id="quick-contact-title"
          className="text-[20px] font-black leading-tight text-[#071747]"
        >
          빠른 연락
        </h2>
      </div>

      <div className="mt-4 grid gap-2">
        {contactItems.map((contact) => (
          <article
            key={contact.name}
            className="grid grid-cols-[54px_minmax(0,1fr)_100px] items-center gap-3 rounded-[10px] border border-[#e1e8f3] bg-white px-3 py-2 shadow-[0_7px_16px_rgba(37,72,125,0.04)]"
          >
            <img
              src={contact.avatarSrc}
              alt=""
              className="h-[50px] w-[50px] rounded-full bg-[#f1f7ff] object-cover shadow-[0_7px_16px_rgba(37,72,125,0.1)]"
              draggable="false"
            />
            <div className="min-w-0">
              <h3 className="truncate text-[16px] font-black leading-tight text-[#071747]">
                {contact.name}
              </h3>
              <p className="mt-1 truncate text-[13px] font-bold text-[#5c6b85]">
                {contact.description}
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <a
                href={`tel:${contact.phone ?? '01000000000'}`}
                className="grid h-10 w-10 place-items-center rounded-full border border-[#d5e6ff] bg-white text-[#0867f2] shadow-[0_6px_14px_rgba(37,72,125,0.06)] transition hover:bg-[#f1f7ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
                aria-label={`${contact.name} 전화하기`}
              >
                <Phone
                  aria-hidden="true"
                  className="h-5 w-5"
                  strokeWidth={2.8}
                />
              </a>
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-full border border-[#d5e6ff] bg-white text-[#0867f2] shadow-[0_6px_14px_rgba(37,72,125,0.06)] transition hover:bg-[#f1f7ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
                aria-label={`${contact.name} 메시지 보내기`}
              >
                <MessageCircle
                  aria-hidden="true"
                  className="h-5 w-5"
                  strokeWidth={2.8}
                />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function TaskChecklistPanel() {
  return (
    <section
      className="rounded-[14px] border border-[#d6e1ef] bg-white p-4 shadow-[0_12px_28px_rgba(37,72,125,0.07)]"
      aria-labelledby="task-checklist-title"
    >
      <div className="flex items-center gap-2">
        <ClipboardCheck
          aria-hidden="true"
          className="h-6 w-6 text-[#5b8ee8]"
          strokeWidth={2.5}
        />
        <h2
          id="task-checklist-title"
          className="text-[20px] font-black leading-tight text-[#071747]"
        >
          업무 체크
        </h2>
      </div>

      <ul className="mt-4 overflow-hidden rounded-[10px] border border-[#e3eaf5]">
        {checklistItems.map((item) => (
          <li
            key={item.label}
            className="grid min-h-[44px] grid-cols-[32px_minmax(0,1fr)_24px] items-center gap-2 border-b border-[#e8eef7] px-3 last:border-b-0"
          >
            <span
              className={cn(
                'grid h-6 w-6 place-items-center rounded-[5px] border',
                item.checked
                  ? 'border-[#0867f2] bg-[#0867f2] text-white'
                  : 'border-[#c7d3e3] bg-white text-transparent',
              )}
              aria-hidden="true"
            >
              <Check className="h-4 w-4" strokeWidth={3} />
            </span>
            <span className="truncate text-[15px] font-bold text-[#253758]">
              {item.label}
            </span>
            <ChevronRight
              aria-hidden="true"
              className="h-5 w-5 text-[#60708e]"
            />
          </li>
        ))}
      </ul>

      <Link
        to="/caregiver/records"
        className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg px-4 text-[15px] font-black text-[#0867f2] transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
      >
        전체 준비물 가이드 보기
        <ChevronRight aria-hidden="true" className="h-5 w-5" />
      </Link>
    </section>
  )
}

export function CaregiverAssignmentsPage() {
  const [activeFilter, setActiveFilter] = useState<AssignmentFilter>('all')
  const [latestAssignment] = useState(readLatestAssignment)
  const [searchQuery, setSearchQuery] = useState('')

  const tasks = useMemo(() => {
    if (!latestAssignment) {
      return defaultTasks
    }

    return [
      mapStoredAssignment(latestAssignment),
      ...defaultTasks.filter(
        (task) => task.elderId !== latestAssignment.elderId,
      ),
    ]
  }, [latestAssignment])

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      return (
        taskMatchesFilter(task, activeFilter) &&
        taskMatchesSearch(task, searchQuery)
      )
    })
  }, [activeFilter, searchQuery, tasks])

  const featuredTask = filteredTasks[0] ?? tasks[0]
  const listTasks = filteredTasks.filter((task) => task.id !== featuredTask.id)

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#f8fbff] text-[#071747]">
      <CaregiverAssignmentsTopBar />

      <div className="mx-auto grid w-full max-w-[1720px] gap-6 px-5 py-6 lg:px-10 xl:grid-cols-[minmax(0,1fr)_430px] xl:items-start">
        <div className="grid min-w-0 gap-4">
          <section
            className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(500px,568px)] lg:items-end"
            aria-labelledby="caregiver-assignments-title"
          >
            <div>
              <h1
                id="caregiver-assignments-title"
                className="break-keep text-[34px] font-black leading-tight text-[#071747] lg:text-[42px]"
              >
                배정받은 업무
              </h1>
              <p className="mt-3 break-keep text-[16px] font-bold leading-snug text-[#425371]">
                복지사가 배정한 방문 요청과 확인 업무를 빠르게 처리하세요.
              </p>
            </div>

            <section
              className="grid gap-3 sm:grid-cols-3"
              aria-label="배정 업무 요약"
            >
              {metricCards.map((metric) => (
                <MetricSummaryCard key={metric.id} metric={metric} />
              ))}
            </section>
          </section>

          <AssignmentControls
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            onSearchChange={setSearchQuery}
            searchQuery={searchQuery}
          />

          <FeaturedAssignment task={featuredTask} />

          <section className="grid gap-3" aria-label="배정 업무 목록">
            {listTasks.map((task) => (
              <AssignmentRow key={task.id} task={task} />
            ))}

            {filteredTasks.length === 0 ? (
              <p className="rounded-[12px] border border-[#dfe8f5] bg-white px-5 py-8 text-center text-[17px] font-black text-[#425371] shadow-[0_10px_24px_rgba(37,72,125,0.06)]">
                조건에 맞는 배정 업무가 없어요.
              </p>
            ) : null}
          </section>
        </div>

        <aside className="grid gap-4" aria-label="배정 업무 보조 정보">
          <TodaySchedulePanel />
          <QuickContactPanel />
          <TaskChecklistPanel />
          <section
            className="grid min-h-[96px] grid-cols-[54px_minmax(0,1fr)] items-center gap-3 rounded-[14px] border border-[#d6e1ef] bg-white px-4 py-4 shadow-[0_12px_28px_rgba(37,72,125,0.07)]"
            aria-label="안전 확인"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-[#ecf6ff] text-[#0867f2]">
              <ShieldCheck
                aria-hidden="true"
                className="h-7 w-7"
                strokeWidth={2.6}
              />
            </span>
            <p className="text-[14px] font-bold leading-snug text-[#425371]">
              방문 시작 전 신분 확인과 긴급 연락처를 다시 확인하세요.
            </p>
          </section>
        </aside>
      </div>
    </main>
  )
}
