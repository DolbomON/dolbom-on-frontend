import {
  Bell,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  MapPin,
  Navigation,
  Pencil,
  Phone,
  PlayCircle,
  PlusCircle,
  Search,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  caregiverAssignmentStorageKey,
  caregiverNextVisit,
  type CaregiverAssignment,
} from '../../features/caregiver/visitAssignments'
import { caregiverTopNavItems } from '../../components/worker/caregiverTopNavigation'
import { cn } from '../../lib/utils'

const dashboardAssetBase = '/assets/dolbomon/worker-dashboard'

type ElderStatus = 'caution' | 'danger' | 'stable'

type MetricCard = {
  iconSrc: string
  id: string
  label: string
  unit: string
  value: string
}

type ElderRow = {
  age: number
  avatarSrc: string
  household: string
  id: string
  lastRecord: string
  memo: string
  name: string
  status: ElderStatus
  statusLabel: '안정' | '위험' | '주의'
}

type QuickMenuItem = {
  description: string
  href: string
  iconSrc: string
  label: string
}

type ScheduleItem = {
  category: string
  description: string
  time: string
  title: string
}

const metricCards: MetricCard[] = [
  {
    iconSrc: `${dashboardAssetBase}/사람.png`,
    id: 'assigned',
    label: '담당 어르신',
    unit: '명',
    value: '12',
  },
  {
    iconSrc: `${dashboardAssetBase}/주의.png`,
    id: 'caution',
    label: '주의',
    unit: '명',
    value: '3',
  },
  {
    iconSrc: `${dashboardAssetBase}/경고.png`,
    id: 'danger',
    label: '위험',
    unit: '명',
    value: '1',
  },
  {
    iconSrc: `${dashboardAssetBase}/체크.png`,
    id: 'records',
    label: '오늘 기록',
    unit: '건',
    value: '8',
  },
]

const elderRows: ElderRow[] = [
  {
    age: 84,
    avatarSrc: `${dashboardAssetBase}/어르신3.png`,
    household: '배우자와 거주',
    id: 'kim-yeongja',
    lastRecord: '30분 전',
    memo: '수면 질이 낮고 식사량이 감소했어요.',
    name: '김영자님',
    status: 'danger',
    statusLabel: '위험',
  },
  {
    age: 79,
    avatarSrc: `${dashboardAssetBase}/어르신4.png`,
    household: '자녀와 거주',
    id: 'lee-sunja',
    lastRecord: '1시간 전',
    memo: '복약 시간이 불규칙하고 활동량이 줄었어요.',
    name: '이순자님',
    status: 'caution',
    statusLabel: '주의',
  },
  {
    age: 81,
    avatarSrc: `${dashboardAssetBase}/어르신1.png`,
    household: '혼자 거주',
    id: 'park-cheolsu',
    lastRecord: '2시간 전',
    memo: '식사와 수면이 안정적으로 유지되고 있어요.',
    name: '박철수님',
    status: 'stable',
    statusLabel: '안정',
  },
  {
    age: 86,
    avatarSrc: `${dashboardAssetBase}/어르신2.png`,
    household: '배우자와 거주',
    id: 'choi-bokrye',
    lastRecord: '3시간 전',
    memo: '가벼운 어지럼증을 호소했어요.',
    name: '최복례님',
    status: 'caution',
    statusLabel: '주의',
  },
]

const quickMenus: QuickMenuItem[] = [
  {
    description: '오늘 방문 기록 작성',
    href: '/caregiver/elders/kim-yeongja',
    iconSrc: `${dashboardAssetBase}/체크.png`,
    label: '방문 시작',
  },
  {
    description: '방문/관찰 기록 관리',
    href: '/caregiver/records',
    iconSrc: `${dashboardAssetBase}/채팅.png`,
    label: '방문 기록',
  },
  {
    description: '방문 일정 확인',
    href: '/caregiver/schedules',
    iconSrc: `${dashboardAssetBase}/가방.png`,
    label: '방문 일정',
  },
  {
    description: '담당 어르신 상세 확인',
    href: '/caregiver/elders/kim-yeongja',
    iconSrc: `${dashboardAssetBase}/체크2.png`,
    label: '담당 어르신',
  },
]

const scheduleItems: ScheduleItem[] = [
  {
    category: '방문',
    description: '자택 방문',
    time: '10:30',
    title: '김영자님 방문 및 상태 확인',
  },
  {
    category: '통화',
    description: '전화 통화',
    time: '13:00',
    title: '이순자님 안부 전화',
  },
  {
    category: '방문',
    description: '자택 방문',
    time: '15:30',
    title: '박철수님 식사 및 복약 확인',
  },
]

const statusFilters: Array<{ label: string; value: ElderStatus | 'all' }> = [
  { label: '전체', value: 'all' },
  { label: '위험', value: 'danger' },
  { label: '주의', value: 'caution' },
  { label: '안정', value: 'stable' },
]

const statusClasses: Record<
  ElderStatus,
  {
    badge: string
    dot: string
  }
> = {
  caution: {
    badge: 'bg-[#fff6df] text-[#ce7a00] ring-[#ffd991]',
    dot: 'bg-[#f5a300]',
  },
  danger: {
    badge: 'bg-[#fff0f0] text-[#e11d1d] ring-[#ffc9c9]',
    dot: 'bg-[#ef2424]',
  },
  stable: {
    badge: 'bg-[#ecfbf1] text-[#15803d] ring-[#b9ecc9]',
    dot: 'bg-[#24aa4a]',
  },
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

function normalizeSearchValue(value: string) {
  return value.trim().toLocaleLowerCase('ko-KR')
}

function elderMatchesSearch(elder: ElderRow, searchQuery: string) {
  const keyword = normalizeSearchValue(searchQuery)

  if (!keyword) {
    return true
  }

  return [
    elder.name,
    elder.statusLabel,
    elder.memo,
    elder.household,
    `${elder.age}세`,
  ]
    .map(normalizeSearchValue)
    .join(' ')
    .includes(keyword)
}

function CaregiverDashboardTopBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#e6edf8] bg-white/95 shadow-[0_5px_18px_rgba(32,70,130,0.06)] backdrop-blur">
      <div className="mx-auto grid min-h-[74px] w-full max-w-[1600px] grid-cols-[auto_auto] items-center gap-x-4 gap-y-2 px-5 py-3 lg:grid-cols-[180px_minmax(0,1fr)_auto] lg:px-10">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center text-[28px] font-black leading-none text-[#0867f2] drop-shadow-[0_5px_10px_rgba(8,103,242,0.16)] focus-visible:rounded-lg lg:text-[32px]"
          aria-label="돌봄ON 홈"
        >
          돌봄ON
        </Link>

        <nav
          className="col-span-2 row-start-2 flex min-w-0 flex-wrap gap-x-2 gap-y-1 overflow-visible pb-2 text-[15px] font-extrabold text-[#101a3d] lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:flex-nowrap lg:justify-self-center lg:gap-4 lg:pb-0"
          aria-label="요양사 메뉴"
        >
          {caregiverTopNavItems.map((item) => {
            const isActive = item.href === '/caregiver'

            return (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  'relative inline-flex min-h-11 shrink-0 items-center justify-center px-3 transition hover:text-[#0867f2] focus-visible:rounded-lg',
                  isActive ? 'text-[#0867f2]' : 'text-[#101a3d]',
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
                <span
                  className={cn(
                    'absolute bottom-0 left-3 right-3 h-[3px] rounded-full bg-[#0867f2]',
                    !isActive && 'hidden',
                  )}
                  aria-hidden="true"
                />
              </Link>
            )
          })}
        </nav>

        <div className="col-start-2 row-start-1 flex items-center gap-3 justify-self-end lg:col-start-3">
          <button
            type="button"
            className="relative inline-grid min-h-11 min-w-11 place-items-center rounded-lg text-[#60708e] transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
            aria-label="알림 2건 확인"
          >
            <Bell aria-hidden="true" size={27} strokeWidth={2.5} />
            <span className="absolute right-1.5 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#f43f3f] px-1 text-[12px] font-black leading-none text-white ring-2 ring-white">
              2
            </span>
          </button>

          <Link
            to="/caregiver"
            className="hidden min-h-12 items-center gap-3 rounded-lg px-1.5 py-1 transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff] min-[520px]:inline-flex"
            aria-label="김민수 요양사 프로필 보기"
          >
            <img
              src={`${dashboardAssetBase}/요양사.png`}
              alt=""
              className="h-11 w-11 rounded-full object-cover shadow-[0_6px_14px_rgba(42,96,184,0.16)]"
              draggable="false"
            />
            <span className="hidden text-left sm:block">
              <strong className="block text-[15px] font-black leading-tight text-[#071747]">
                김민수 요양사
              </strong>
              <span className="block text-[13px] font-bold leading-tight text-[#60708e]">
                요양사
              </span>
            </span>
            <ChevronDown
              aria-hidden="true"
              className="hidden h-4 w-4 text-[#60708e] sm:block"
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
      className="flex min-h-[104px] items-center gap-4 rounded-[18px] border border-[#e4ebf6] bg-white px-4 py-3 shadow-[0_12px_30px_rgba(47,86,145,0.08)]"
      aria-label={`${metric.label} ${metric.value}${metric.unit}`}
    >
      <img
        src={metric.iconSrc}
        alt=""
        className="h-[58px] w-[58px] shrink-0 object-contain"
        draggable="false"
      />
      <div className="min-w-0">
        <p className="text-[15px] font-extrabold leading-tight text-[#12214b]">
          {metric.label}
        </p>
        <p className="mt-2 whitespace-nowrap text-[#071747]">
          <strong className="text-[32px] font-black leading-none">
            {metric.value}
          </strong>
          <span className="ml-1 text-[18px] font-black">{metric.unit}</span>
        </p>
      </div>
    </article>
  )
}

function SearchAndFilter({
  activeFilter,
  onFilterChange,
  onSearchChange,
  searchQuery,
}: {
  activeFilter: ElderStatus | 'all'
  onFilterChange: (filter: ElderStatus | 'all') => void
  onSearchChange: (value: string) => void
  searchQuery: string
}) {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(280px,510px)_1fr]">
      <label className="relative block">
        <span className="sr-only">어르신 검색</span>
        <input
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          className="h-[52px] w-full rounded-[18px] border border-[#e3eaf5] bg-white py-0 pl-5 pr-14 text-[17px] font-semibold text-[#071747] shadow-[0_10px_24px_rgba(47,86,145,0.06)] placeholder:text-[#7686a0] focus:border-[#0867f2] focus:outline focus:outline-4 focus:outline-[#d7e8ff]"
          placeholder="이름, 상태, 메모 내용으로 검색하세요."
          type="search"
        />
        <Search
          aria-hidden="true"
          className="absolute right-5 top-1/2 h-7 w-7 -translate-y-1/2 text-[#53678c]"
          strokeWidth={2.5}
        />
      </label>

      <div
        className="flex min-h-[52px] flex-wrap items-center gap-3 rounded-[18px] border border-[#e3eaf5] bg-white p-2 shadow-[0_10px_24px_rgba(47,86,145,0.06)]"
        aria-label="상태 필터"
        role="group"
      >
        {statusFilters.map((filter) => {
          const isActive = activeFilter === filter.value
          const statusStyle =
            filter.value === 'all' ? null : statusClasses[filter.value]

          return (
            <button
              key={filter.value}
              type="button"
              className={cn(
                'inline-flex min-h-9 items-center gap-2 rounded-lg border px-4 text-[16px] font-black shadow-[0_6px_14px_rgba(47,86,145,0.06)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]',
                isActive
                  ? 'border-[#0867f2] bg-[#0867f2] text-white shadow-[0_10px_20px_rgba(8,103,242,0.25)]'
                  : 'border-[#dfe8f5] bg-white text-[#243154]',
              )}
              aria-pressed={isActive}
              onClick={() => onFilterChange(filter.value)}
            >
              {filter.value !== 'all' && statusStyle ? (
                <span
                  className={cn('h-3 w-3 rounded-full', statusStyle.dot)}
                  aria-hidden="true"
                />
              ) : null}
              {filter.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ElderDashboardRow({ elder }: { elder: ElderRow }) {
  const tone = statusClasses[elder.status]

  return (
    <article className="grid gap-2.5 rounded-[18px] border border-[#e3eaf5] bg-white px-3 py-2 shadow-[0_12px_28px_rgba(47,86,145,0.07)] lg:grid-cols-[minmax(220px,1.1fr)_minmax(320px,1.4fr)_auto] lg:items-center">
      <div className="flex min-w-0 items-center gap-4">
        <img
          src={elder.avatarSrc}
          alt={`${elder.name} 프로필`}
          className="h-[54px] w-[54px] shrink-0 rounded-full bg-[#f2f6ff] object-cover shadow-[0_8px_18px_rgba(47,86,145,0.12)]"
          draggable="false"
        />
        <div className="min-w-0">
          <h3 className="truncate text-[20px] font-black leading-tight text-[#071747]">
            {elder.name}
          </h3>
          <p className="mt-1 text-[13px] font-bold leading-tight text-[#61708f]">
            {elder.age}세 · {elder.household}
          </p>
        </div>
        <span
          className={cn(
            'ml-auto inline-flex min-h-8 shrink-0 items-center rounded-full px-4 text-[16px] font-black ring-1',
            tone.badge,
          )}
        >
          {elder.statusLabel}
        </span>
      </div>

      <div className="min-w-0 border-t border-[#e8eef7] pt-3 lg:border-l lg:border-t-0 lg:py-0 lg:pl-5">
        <p className="flex min-w-0 items-start gap-2 text-[15px] font-bold leading-snug text-[#314263]">
          <CheckCircle2
            aria-hidden="true"
            className="mt-0.5 h-5 w-5 shrink-0 text-[#6c82ab]"
            strokeWidth={2.4}
          />
          <span>{elder.memo}</span>
        </p>
        <p className="mt-1.5 text-[14px] font-bold leading-tight text-[#6f7d99]">
          최근 기록: {elder.lastRecord}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:flex sm:justify-end">
        <Link
          to={`/caregiver/elders/${elder.id}`}
          className="inline-flex min-h-9 items-center justify-center gap-2 rounded-lg border border-[#dfe7f4] bg-white px-4 text-[15px] font-black text-[#0867f2] shadow-[0_8px_18px_rgba(47,86,145,0.06)] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          상세 보기
          <ChevronRight aria-hidden="true" className="h-5 w-5" />
        </Link>
        <Link
          to="/caregiver/records"
          className="inline-flex min-h-9 items-center justify-center gap-2 rounded-lg bg-[#0867f2] px-4 text-[15px] font-black text-white shadow-[0_10px_22px_rgba(8,103,242,0.28)] transition hover:bg-[#0057d8] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          <Pencil aria-hidden="true" className="h-5 w-5" strokeWidth={2.8} />
          기록 작성
        </Link>
      </div>
    </article>
  )
}

function NextVisitPanel() {
  return (
    <section
      className="rounded-[20px] border border-[#cfe0f8] bg-white p-4 shadow-[0_14px_32px_rgba(47,86,145,0.08)]"
      aria-labelledby="next-visit-title"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[13px] font-black text-[#0867f2]">
            오늘 방문 업무
          </p>
          <h2
            id="next-visit-title"
            className="mt-1 text-[19px] font-black leading-tight text-[#071747]"
          >
            다음 방문
          </h2>
        </div>
        <span className="rounded-lg bg-[#edf6ff] px-3 py-2 text-[15px] font-black text-[#0867f2]">
          {caregiverNextVisit.visitTime}
        </span>
      </div>
      <p className="mt-3 text-[22px] font-black leading-tight text-[#071747]">
        {caregiverNextVisit.elderName}
      </p>
      <p className="mt-2 flex items-center gap-2 text-[14px] font-bold text-[#52627f]">
        <MapPin aria-hidden="true" className="h-5 w-5 text-[#0867f2]" />
        {caregiverNextVisit.address}
      </p>
      <div className="mt-3 rounded-[14px] border border-[#e3eaf5] bg-[#fbfdff] px-3 py-3">
        <p className="text-[14px] font-bold leading-snug text-[#52627f]">
          <strong className="font-black text-[#071747]">복지사 요청:</strong>{' '}
          {caregiverNextVisit.workerRequestSummary}
        </p>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <button
          type="button"
          className="inline-flex min-h-10 items-center justify-center gap-1 rounded-lg border border-[#d6e6fb] bg-white px-2 text-[13px] font-black text-[#0867f2] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          <Navigation aria-hidden="true" className="h-4 w-4" />
          길찾기
        </button>
        <a
          href={`tel:${caregiverNextVisit.phoneNumber.replaceAll('-', '')}`}
          className="inline-flex min-h-10 items-center justify-center gap-1 rounded-lg border border-[#d6e6fb] bg-white px-2 text-[13px] font-black text-[#0867f2] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          <Phone aria-hidden="true" className="h-4 w-4" />
          전화하기
        </a>
        <Link
          to="/caregiver/elders/kim-yeongja"
          className="inline-flex min-h-10 items-center justify-center gap-1 rounded-lg bg-[#0867f2] px-2 text-[13px] font-black text-white shadow-[0_10px_20px_rgba(8,103,242,0.24)] transition hover:bg-[#0057d8] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          <PlayCircle aria-hidden="true" className="h-4 w-4" />
          방문 시작
        </Link>
      </div>
    </section>
  )
}

function AssignmentPanel({
  assignment,
}: {
  assignment: CaregiverAssignment | null
}) {
  return (
    <section
      className={cn(
        'rounded-[20px] border shadow-[0_14px_32px_rgba(47,86,145,0.08)]',
        assignment
          ? 'border-[#ffd89a] bg-[#fffaf0]'
          : 'border-[#e3eaf5] bg-white',
      )}
      aria-labelledby="assignment-title"
    >
      <Link
        to="/caregiver/assignments"
        className="group block rounded-[20px] p-4 transition hover:bg-white/70 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        aria-label="새 배정 업무 보기"
      >
        <div className="flex items-center justify-between gap-3">
          <h2
            id="assignment-title"
            className="text-[19px] font-black leading-tight text-[#071747]"
          >
            새 배정 업무
          </h2>
          <span className="inline-flex items-center gap-1 text-[13px] font-black text-[#0867f2]">
            업무 보기
            <ChevronRight
              aria-hidden="true"
              className="h-4 w-4 transition group-hover:translate-x-0.5"
              strokeWidth={2.8}
            />
          </span>
        </div>
        {assignment ? (
          <>
            <p className="mt-3 text-[17px] font-black text-[#071747]">
              {assignment.elderName}
            </p>
            <p className="mt-2 text-[14px] font-bold leading-snug text-[#52627f]">
              {assignment.requestContent}
            </p>
            <p className="mt-3 text-[13px] font-black text-[#4d5f7e]">
              마감 {assignment.dueTime} · 담당 {assignment.assignedCaregiver}
            </p>
          </>
        ) : (
          <p className="mt-3 text-[14px] font-bold leading-snug text-[#667795]">
            복지사가 배정한 방문 요청이 생기면 이 영역에 표시됩니다.
          </p>
        )}
      </Link>
    </section>
  )
}

function QuickMenuPanel() {
  return (
    <section
      className="rounded-[20px] border border-[#e3eaf5] bg-white p-4 shadow-[0_14px_32px_rgba(47,86,145,0.08)]"
      aria-labelledby="quick-menu-title"
    >
      <h2
        id="quick-menu-title"
        className="text-[19px] font-black leading-tight text-[#071747]"
      >
        빠른 메뉴
      </h2>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {quickMenus.map((item) => (
          <Link
            key={item.label}
            aria-label={item.label}
            to={item.href}
            className="flex min-h-[136px] flex-col items-center justify-center rounded-[16px] border border-[#e3eaf5] bg-white px-3 py-3 text-center shadow-[0_8px_18px_rgba(47,86,145,0.06)] transition hover:-translate-y-0.5 hover:border-[#bcd3fa] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
          >
            <img
              src={item.iconSrc}
              alt=""
              className="h-16 w-16 object-contain"
              draggable="false"
            />
            <strong className="mt-2 text-[16px] font-black leading-tight text-[#12214b]">
              {item.label}
            </strong>
            <span className="mt-1 text-[13px] font-bold leading-tight text-[#667795]">
              {item.description}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

function TodaySchedulePanel() {
  return (
    <section
      id="schedule"
      className="rounded-[20px] border border-[#e3eaf5] bg-white p-4 shadow-[0_14px_32px_rgba(47,86,145,0.08)]"
      aria-labelledby="today-schedule-title"
    >
      <div className="flex items-center justify-between gap-3">
        <h2
          id="today-schedule-title"
          className="text-[19px] font-black leading-tight text-[#071747]"
        >
          오늘 일정
        </h2>
        <Link
          to="/caregiver/schedules"
          className="inline-flex min-h-9 items-center gap-1 rounded-lg border border-[#e0e8f5] px-3 text-[14px] font-black text-[#0867f2] shadow-[0_6px_14px_rgba(47,86,145,0.06)] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          전체 일정 보기
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>

      <ol className="mt-3 overflow-hidden rounded-[16px] border border-[#e3eaf5]">
        {scheduleItems.map((item) => (
          <li
            key={`${item.time}-${item.title}`}
            className="grid grid-cols-[78px_1fr] border-b border-[#e3eaf5] last:border-b-0"
          >
            <div className="flex min-h-[62px] flex-col items-center justify-center bg-[#fbfdff] px-2 text-center">
              <time className="text-[17px] font-black leading-tight text-[#12214b]">
                {item.time}
              </time>
              <span className="mt-1 text-[13px] font-black leading-tight text-[#60708e]">
                {item.category}
              </span>
            </div>
            <div className="min-w-0 px-4 py-2.5">
              <p className="truncate text-[15px] font-black leading-tight text-[#12214b]">
                {item.title}
              </p>
              <p className="mt-2 text-[14px] font-bold leading-tight text-[#667795]">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <button
        type="button"
        className="mx-auto mt-2 inline-flex min-h-8 items-center justify-center gap-2 rounded-lg px-4 text-[16px] font-black text-[#0867f2] transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
      >
        일정 추가
        <PlusCircle aria-hidden="true" className="h-5 w-5" strokeWidth={2.7} />
      </button>
    </section>
  )
}

function RecentMemoPanel() {
  return (
    <section
      id="family-memo"
      className="grid gap-4 rounded-[20px] border border-[#e3eaf5] bg-white p-5 shadow-[0_14px_32px_rgba(47,86,145,0.08)] lg:grid-cols-[310px_minmax(0,1fr)_auto] lg:items-center"
      aria-labelledby="recent-memo-title"
    >
      <div className="flex items-center gap-4">
        <img
          src={`${dashboardAssetBase}/채팅2.png`}
          alt=""
          className="h-[74px] w-[74px] shrink-0 object-contain"
          draggable="false"
        />
        <div>
          <h2
            id="recent-memo-title"
            className="text-[20px] font-black leading-tight text-[#071747]"
          >
            최근 방문 기록
          </h2>
          <p className="mt-2 text-[14px] font-bold leading-tight text-[#667795]">
            최근 작성한 방문/관찰 기록을 확인하세요.
          </p>
        </div>
      </div>

      <div className="flex min-w-0 items-center gap-4 border-t border-[#e8eef7] pt-4 lg:border-l lg:border-t-0 lg:py-0 lg:pl-5">
        <img
          src={`${dashboardAssetBase}/어르신3.png`}
          alt="김영자님 프로필"
          className="h-[56px] w-[56px] shrink-0 rounded-full bg-[#f2f6ff] object-cover shadow-[0_8px_18px_rgba(47,86,145,0.12)]"
          draggable="false"
        />
        <div className="min-w-0">
          <p className="flex flex-wrap items-center gap-2 text-[17px] font-black leading-tight text-[#12214b]">
            김영자님 방문 기록
            <span className="rounded-full bg-[#fff0f0] px-2 py-1 text-[13px] font-black text-[#e11d1d]">
              위험
            </span>
          </p>
          <p className="mt-2 line-clamp-2 text-[15px] font-bold leading-snug text-[#425375]">
            밤에 자주 깨시고 새벽에 혼돈 증세가 있어 가족에게 수면 환경 조절을
            전달했습니다.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 lg:justify-end">
        <span className="whitespace-nowrap text-[15px] font-bold text-[#314263]">
          30분 전
        </span>
        <Link
          to="/caregiver/records"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#dfe7f4] bg-white px-4 text-[16px] font-black text-[#0867f2] shadow-[0_8px_18px_rgba(47,86,145,0.06)] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          전체 기록 보기
          <ChevronRight aria-hidden="true" className="h-5 w-5" />
        </Link>
      </div>
    </section>
  )
}

export function CaregiverDashboardPage() {
  const [activeFilter, setActiveFilter] = useState<ElderStatus | 'all'>('all')
  const [latestAssignment] = useState(readLatestAssignment)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredElders = useMemo(() => {
    return elderRows.filter((elder) => {
      const matchesFilter =
        activeFilter === 'all' || elder.status === activeFilter

      return matchesFilter && elderMatchesSearch(elder, searchQuery)
    })
  }, [activeFilter, searchQuery])

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#f8fbff] text-[#071747]">
      <CaregiverDashboardTopBar />

      <div className="mx-auto w-full max-w-[1600px] px-5 py-7 lg:px-[60px]">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_376px] xl:items-start">
          <div className="min-w-0">
            <section
              className="relative min-h-[86px] overflow-visible"
              aria-labelledby="caregiver-dashboard-title"
            >
              <div className="relative z-10 max-w-[680px]">
                <h1
                  id="caregiver-dashboard-title"
                  className="text-[32px] font-black leading-tight text-[#071747] lg:text-[38px]"
                >
                  오늘 방문 업무
                </h1>
                <p className="mt-3 text-[17px] font-bold leading-snug text-[#50607f]">
                  오늘 방문할 어르신과 복지사 요청사항을 확인해보세요.
                </p>
              </div>
              <img
                src={`${dashboardAssetBase}/노인체크.png`}
                alt=""
                className="pointer-events-none absolute top-[-25px] -right-3 hidden w-[170px] object-contain lg:block xl:right-5 xl:w-[180px]"
                draggable="false"
              />
            </section>

            <section
              className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
              aria-label="담당 어르신 요약"
            >
              {metricCards.map((metric) => (
                <MetricSummaryCard key={metric.id} metric={metric} />
              ))}
            </section>

            <section
              className="mt-4 rounded-[20px] border border-[#e3eaf5] bg-white/70 p-3 shadow-[0_14px_32px_rgba(47,86,145,0.06)]"
              aria-label="담당 어르신 목록"
            >
              <SearchAndFilter
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                onSearchChange={setSearchQuery}
                searchQuery={searchQuery}
              />

              <div className="mt-2.5 grid gap-2">
                {filteredElders.map((elder) => (
                  <ElderDashboardRow key={elder.id} elder={elder} />
                ))}

                {filteredElders.length === 0 ? (
                  <p className="rounded-[18px] border border-[#e3eaf5] bg-white px-5 py-8 text-center text-[18px] font-black text-[#12214b] shadow-[0_12px_28px_rgba(47,86,145,0.07)]">
                    조건에 맞는 어르신이 없어요.
                  </p>
                ) : null}
              </div>

              <div className="mt-2 flex justify-center">
                <Link
                  to="/caregiver/elders/kim-yeongja"
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-5 text-[17px] font-black text-[#0867f2] transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
                >
                  담당 어르신 상세 보기
                  <ChevronDown
                    aria-hidden="true"
                    className="h-5 w-5"
                    strokeWidth={2.8}
                  />
                </Link>
              </div>
            </section>
          </div>

          <aside className="grid gap-5" aria-label="대시보드 보조 메뉴">
            <QuickMenuPanel />
            <NextVisitPanel />
            <AssignmentPanel assignment={latestAssignment} />
            <TodaySchedulePanel />
          </aside>
        </div>

        <div className="mt-5">
          <RecentMemoPanel />
        </div>
      </div>
    </main>
  )
}
