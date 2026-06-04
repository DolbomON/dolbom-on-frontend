import {
  Bell,
  ChevronDown,
  ChevronRight,
  Pencil,
  Search,
  TriangleAlert,
  UserPlus,
  X,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  caregiverAssignmentStorageKey,
  type AssignmentPriority,
  type CaregiverAssignment,
} from '../../features/caregiver/visitAssignments'
import { cn } from '../../lib/utils'

const welfareAssetBase = '/assets/dolbomon/welfare'
const elderAssetBase = '/assets/dolbomon/worker-elders'
const workerProfileSrc = '/assets/dolbomon/worker-mypage/worker-lee-bokji.png'

type ElderStatus = 'danger' | 'caution' | 'stable'

type MetricCard = {
  description: string
  iconSrc: string
  id: string
  label: string
  unit: string
  value: string
}

type ElderRow = {
  age: number
  avatarSrc: string
  id: string
  lastMemoDate: string
  lastSeen: string
  memo: string
  name: string
  profile: string
  status: ElderStatus
  statusLabel: '위험' | '주의' | '안정'
}

type QuickMenuItem = {
  description: string
  href: string
  iconSrc: string
  noticeCount?: number
  title: string
}

type ScheduleItem = {
  category: string
  color: string
  description: string
  time: string
  title: string
}

type ServiceLinkItem = {
  current: number
  iconSrc: string
  label: string
  percent: string
  total: number
}

type WeeklyReportItem = {
  label: string
  value: string
}

type MemoItem = {
  age: string
  body: string
  status: Extract<ElderStatus, 'danger' | 'caution'>
  statusLabel: '위험' | '주의'
  title: string
}

type AssignmentDraft = {
  assignedCaregiver: string
  dueTime: string
  priority: AssignmentPriority
  requestContent: string
}

const navItems = [
  { href: '/worker', label: '홈' },
  { href: '/worker/welfare-connect', label: '복지 현황' },
  { href: '/worker/consultations', label: '상담 관리' },
  { href: '/worker/reports', label: '보고서' },
  { href: '/worker/schedules', label: '기관 일정' },
  { href: '/worker/mypage', label: '설정' },
]

const metricCards: MetricCard[] = [
  {
    description: '전체 대상자 기준',
    iconSrc: `${welfareAssetBase}/사람.png`,
    id: 'managed',
    label: '관리 어르신',
    unit: '명',
    value: '48',
  },
  {
    description: '위기·주의 대상자',
    iconSrc: `${welfareAssetBase}/경고.png`,
    id: 'focused',
    label: '집중 관리',
    unit: '명',
    value: '7',
  },
  {
    description: '사례 관리 메모',
    iconSrc: `${welfareAssetBase}/대화.png`,
    id: 'new-consult',
    label: '사례 메모',
    unit: '건',
    value: '5',
  },
  {
    description: '요양사 배정 대기',
    iconSrc: `${welfareAssetBase}/집.png`,
    id: 'today-visit',
    label: '배정 필요',
    unit: '건',
    value: '4',
  },
]

const elderRows: ElderRow[] = [
  {
    age: 84,
    avatarSrc: `${elderAssetBase}/elder-kim-yeongja.png`,
    id: 'kim-yeongja',
    lastMemoDate: '2024.05.20',
    lastSeen: '1시간 전',
    memo: '식사 거르심,, 혈당 감소가 지속되고 있어요.',
    name: '김영자 어르신',
    profile: '독거 · 서울 강서구',
    status: 'danger',
    statusLabel: '위험',
  },
  {
    age: 79,
    avatarSrc: `${elderAssetBase}/elder-lee-sunja.png`,
    id: 'lee-sunja',
    lastMemoDate: '2024.05.17',
    lastSeen: '3시간 전',
    memo: '복약 시간 불규칙, 어지럼증 호소',
    name: '이순자 어르신',
    profile: '저소득 가구 · 서울 양천구',
    status: 'caution',
    statusLabel: '주의',
  },
  {
    age: 81,
    avatarSrc: `${elderAssetBase}/elder-park-cheolsu.png`,
    id: 'park-cheolsu',
    lastMemoDate: '2024.05.16',
    lastSeen: '1일 전',
    memo: '식사·수면 양호, 정서 안정적',
    name: '박철수 어르신',
    profile: '독거 · 서울 구로구',
    status: 'stable',
    statusLabel: '안정',
  },
  {
    age: 86,
    avatarSrc: `${elderAssetBase}/elder-choi-bokrye.png`,
    id: 'choi-bokrye',
    lastMemoDate: '2024.05.15',
    lastSeen: '1일 전',
    memo: '허리 통증 악화, 병원 방문 예정',
    name: '최복례 어르신',
    profile: '배우자와 거주 · 서울 금천구',
    status: 'caution',
    statusLabel: '주의',
  },
]

const quickMenus: QuickMenuItem[] = [
  {
    description: '위험 대상자 업무 배정',
    href: '/worker#risk-elder-panel',
    iconSrc: `${welfareAssetBase}/집.png`,
    title: '요양사 배정',
  },
  {
    description: '사례 관리 메모 작성',
    href: '/worker/elders/kim-yeongja/case-note',
    iconSrc: `${welfareAssetBase}/채팅.png`,
    title: '상담 작성',
  },
  {
    description: '서식 및 대응 보고',
    href: '/worker/reports',
    iconSrc: `${welfareAssetBase}/체크.png`,
    title: '보고서 생성',
  },
  {
    description: '대응 결과 확인',
    href: '/worker/elders',
    iconSrc: `${welfareAssetBase}/연락.png`,
    title: '대응 완료',
  },
]

const scheduleItems: ScheduleItem[] = [
  {
    category: '방문',
    color: '#0a68f3',
    description: '서울 강서구 화곡동',
    time: '10:00',
    title: '김영자 어르신 방문 대응',
  },
  {
    category: '회의',
    color: '#22b964',
    description: '3층 사례 회의실',
    time: '13:30',
    title: '사례 회의',
  },
  {
    category: '통화',
    color: '#7a4ff2',
    description: '보호자(딸)',
    time: '15:00',
    title: '이순자 어르신 가족 통화',
  },
]

const serviceLinks: ServiceLinkItem[] = [
  {
    current: 32,
    iconSrc: `${welfareAssetBase}/식사.png`,
    label: '식사 지원',
    percent: '66.7%',
    total: 48,
  },
  {
    current: 18,
    iconSrc: `${welfareAssetBase}/차.png`,
    label: '병원 동행',
    percent: '37.5%',
    total: 48,
  },
  {
    current: 25,
    iconSrc: `${welfareAssetBase}/정서.png`,
    label: '정서 지원',
    percent: '52.1%',
    total: 48,
  },
  {
    current: 41,
    iconSrc: `${welfareAssetBase}/보안.png`,
    label: '안전 확인',
    percent: '85.4%',
    total: 48,
  },
]

const weeklyReports: WeeklyReportItem[] = [
  { label: '사례 메모', value: '28건' },
  { label: '요양사 배정', value: '16건' },
  { label: '서비스 연계', value: '12건' },
  { label: '대응 완료', value: '3건' },
]

const recentMemos: MemoItem[] = [
  {
    age: '1시간 전',
    body: '식사 불균형으로 혈당 수치가 불안정하여 식단 조절과 ...',
    status: 'danger',
    statusLabel: '위험',
    title: '김영자 어르신 혈당 사례 관리',
  },
  {
    age: '5시간 전',
    body: '복약 시간 불규칙으로 복약 알림 앱 설정을 안내드림.',
    status: 'caution',
    statusLabel: '주의',
    title: '이순자 어르신 복약 관리 안내',
  },
]

const statusFilters: Array<{ label: string; value: ElderStatus | 'all' }> = [
  { label: '전체 상태', value: 'all' },
  { label: '위험', value: 'danger' },
  { label: '주의', value: 'caution' },
  { label: '안정', value: 'stable' },
]

const defaultAssignmentDraft: AssignmentDraft = {
  assignedCaregiver: '김민수 요양사',
  dueTime: '오늘 15:00',
  priority: '주의',
  requestContent:
    '식사량 감소 원인을 확인하고\n저녁 약 복용 여부를 확인해주세요.',
}

const assignmentPriorityOptions: AssignmentPriority[] = ['일반', '주의', '긴급']

const statusStyles: Record<
  ElderStatus,
  {
    badge: string
    icon: string
    memoIcon: 'alert' | 'check'
    text: string
  }
> = {
  caution: {
    badge: 'border-[#ffd89a] bg-[#fff8eb] text-[#ff8b00]',
    icon: 'text-[#ffad18]',
    memoIcon: 'alert',
    text: 'text-[#c27400]',
  },
  danger: {
    badge: 'border-[#ffccd2] bg-[#fff0f2] text-[#f12a3a]',
    icon: 'text-[#ff9f13]',
    memoIcon: 'alert',
    text: 'text-[#df1f32]',
  },
  stable: {
    badge: 'border-[#bfeccf] bg-[#edf9f1] text-[#169444]',
    icon: 'text-[#20b84c]',
    memoIcon: 'check',
    text: 'text-[#15803d]',
  },
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
    elder.profile,
    `${elder.age}세`,
  ]
    .map(normalizeSearchValue)
    .join(' ')
    .includes(keyword)
}

function WorkerDashboardTopBar({
  onOpenRiskAlert,
}: {
  onOpenRiskAlert: () => void
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#dfe8f5] bg-white/96 shadow-[0_5px_18px_rgba(30,66,118,0.05)] backdrop-blur">
      <div className="mx-auto grid min-h-[68px] w-full max-w-[1600px] grid-cols-[auto_auto] items-center gap-x-4 gap-y-1 px-5 py-1 lg:grid-cols-[210px_minmax(0,1fr)_auto] lg:px-8">
        <Link
          to="/"
          className="inline-flex min-h-10 items-center text-[29px] font-black leading-none text-[#0867f2] drop-shadow-[0_5px_10px_rgba(8,103,242,0.12)] focus-visible:rounded-lg"
          aria-label="돌봄ON 홈"
        >
          돌봄ON
        </Link>

        <nav
          className="col-span-2 row-start-2 flex min-w-0 flex-wrap gap-x-3 gap-y-1 overflow-visible pb-2 text-[15px] font-black text-[#071747] lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:flex-nowrap lg:justify-self-center lg:gap-8 lg:overflow-x-visible lg:pb-0"
          aria-label="복지사 메뉴"
        >
          {navItems.map((item) => {
            const isActive = item.href === '/worker'

            return (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  'relative inline-flex min-h-10 shrink-0 items-center justify-center px-2 transition hover:text-[#0867f2] focus-visible:rounded-lg',
                  isActive ? 'text-[#0867f2]' : 'text-[#071747]',
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
                {isActive ? (
                  <span
                    className="absolute bottom-[-10px] left-0 right-0 h-1 rounded-full bg-[#0867f2] lg:bottom-[-14px]"
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
            className="relative inline-grid min-h-10 min-w-10 place-items-center rounded-lg text-[#3c4b67] transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
            aria-label="알림 3건 확인"
            onClick={onOpenRiskAlert}
          >
            <Bell aria-hidden="true" size={29} strokeWidth={2.4} />
            <span className="absolute right-0.5 top-0 grid h-[22px] min-w-[22px] place-items-center rounded-full bg-[#ff3648] px-1 text-[12px] font-black leading-none text-white ring-2 ring-white">
              3
            </span>
          </button>

          <Link
            to="/worker/mypage"
            className="hidden min-h-11 items-center gap-3 rounded-lg py-1 pl-1 pr-2 transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff] min-[560px]:inline-flex"
            aria-label="이수진 복지사 프로필 보기"
          >
            <img
              src={workerProfileSrc}
              alt=""
              className="h-11 w-11 rounded-full bg-[#eaf4ff] object-cover shadow-[0_7px_15px_rgba(42,96,184,0.16)]"
              draggable="false"
            />
            <span className="hidden whitespace-nowrap text-[14px] font-black leading-tight text-[#071747] sm:block">
              이수진 복지사
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
      className="grid min-h-[142px] grid-cols-[82px_minmax(0,1fr)] items-center gap-3 rounded-[14px] border border-[#dfe8f5] bg-white px-6 py-4 shadow-[0_12px_26px_rgba(37,72,125,0.08)]"
      aria-label={`${metric.label} ${metric.value}${metric.unit}`}
    >
      <img
        src={metric.iconSrc}
        alt=""
        className="h-[76px] w-[76px] object-contain"
        draggable="false"
      />
      <div className="min-w-0 text-center">
        <h3 className="text-[17px] font-black leading-tight text-[#071747]">
          {metric.label}
        </h3>
        <p className="mt-2 whitespace-nowrap text-[#071747]">
          <strong className="text-[42px] font-black leading-none tracking-normal">
            {metric.value}
          </strong>
          <span className="ml-1 text-[18px] font-black">{metric.unit}</span>
        </p>
        <p className="mt-1 whitespace-nowrap text-[12px] font-bold leading-tight text-[#7a89a4]">
          {metric.description}
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
    <div className="grid gap-3 md:grid-cols-[132px_minmax(220px,268px)] md:justify-end">
      <label className="sr-only" htmlFor="worker-status-filter">
        어르신 상태 필터
      </label>
      <select
        id="worker-status-filter"
        value={activeFilter}
        onChange={(event) =>
          onFilterChange(event.target.value as ElderStatus | 'all')
        }
        className="h-9 rounded-lg border border-[#dfe8f5] bg-white px-4 text-[14px] font-black text-[#071747] shadow-[0_7px_16px_rgba(37,72,125,0.05)] focus:border-[#0867f2] focus:outline focus:outline-4 focus:outline-[#d7e8ff]"
      >
        {statusFilters.map((filter) => (
          <option key={filter.value} value={filter.value}>
            {filter.label}
          </option>
        ))}
      </select>

      <label className="relative block">
        <span className="sr-only">어르신 검색</span>
        <input
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          className="h-9 w-full rounded-lg border border-[#dfe8f5] bg-white py-0 pl-4 pr-11 text-[14px] font-bold text-[#071747] shadow-[0_7px_16px_rgba(37,72,125,0.05)] placeholder:text-[#8794aa] focus:border-[#0867f2] focus:outline focus:outline-4 focus:outline-[#d7e8ff]"
          placeholder="이름, 상태, 메모로 검색하세요."
          type="search"
        />
        <Search
          aria-hidden="true"
          className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#223353]"
          strokeWidth={2.4}
        />
      </label>
    </div>
  )
}

function StatusMemoIcon({ status }: { status: ElderStatus }) {
  if (statusStyles[status].memoIcon === 'check') {
    return (
      <span
        className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 border-[#21b84c] text-[13px] font-black leading-none text-[#21b84c]"
        aria-hidden="true"
      >
        ✓
      </span>
    )
  }

  return (
    <TriangleAlert
      aria-hidden="true"
      className={cn('mt-0.5 h-5 w-5 shrink-0', statusStyles[status].icon)}
      fill="currentColor"
      strokeWidth={2.2}
    />
  )
}

function ElderDashboardRow({
  elder,
  onAssignCaregiver,
}: {
  elder: ElderRow
  onAssignCaregiver: (elder: ElderRow) => void
}) {
  const tone = statusStyles[elder.status]
  const isHighRisk = elder.status !== 'stable'

  return (
    <article className="grid gap-4 border-t border-[#e5edf8] bg-white px-4 py-2 first:border-t-0 lg:grid-cols-[minmax(230px,1fr)_76px_minmax(240px,1.3fr)_78px_180px] lg:items-center">
      <div className="flex min-w-0 items-center gap-4">
        <img
          src={elder.avatarSrc}
          alt={`${elder.name} 프로필`}
          className="h-[54px] w-[54px] shrink-0 rounded-full bg-[#f4f8ff] object-cover shadow-[0_8px_18px_rgba(47,86,145,0.12)]"
          draggable="false"
        />
        <div className="min-w-0">
          <h3 className="truncate text-[17px] font-black leading-tight text-[#071747]">
            {elder.name}
          </h3>
          <p className="mt-1 truncate text-[12px] font-bold leading-tight text-[#62718d]">
            {elder.age}세 · {elder.profile}
          </p>
        </div>
      </div>

      <span
        className={cn(
          'inline-flex min-h-8 w-fit items-center justify-center rounded-lg border px-4 text-[14px] font-black lg:justify-self-center',
          tone.badge,
        )}
      >
        {elder.statusLabel}
      </span>

      <div className="min-w-0">
        <p className="flex min-w-0 items-start gap-2 text-[13px] font-black leading-snug text-[#12214b]">
          <StatusMemoIcon status={elder.status} />
          <span className="break-keep">{elder.memo}</span>
        </p>
        <p className="mt-1 text-[12px] font-bold leading-tight text-[#7a89a4]">
          최근 메모: {elder.lastMemoDate}
        </p>
      </div>

      <div className="text-[12px] font-bold leading-snug text-[#5f6f8e] lg:text-center">
        <span className="block">마지막 확인</span>
        <strong className="mt-1 block text-[13px] font-black text-[#4b5d7e]">
          {elder.lastSeen}
        </strong>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
        <Link
          to={`/worker/elders/${elder.id}`}
          className="inline-flex min-h-9 whitespace-nowrap items-center justify-center gap-1 rounded-lg border border-[#dbe5f3] bg-white px-3 text-[13px] font-black text-[#0867f2] shadow-[0_7px_16px_rgba(37,72,125,0.06)] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          상세 보기
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
        </Link>
        {isHighRisk ? (
          <button
            type="button"
            className="inline-flex min-h-9 whitespace-nowrap items-center justify-center gap-1 rounded-lg border border-[#bfd6fb] bg-[#edf6ff] px-3 text-[13px] font-black text-[#0867f2] shadow-[0_7px_16px_rgba(37,72,125,0.06)] transition hover:bg-[#e2f0ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
            onClick={() => onAssignCaregiver(elder)}
          >
            <UserPlus
              aria-hidden="true"
              className="h-4 w-4"
              strokeWidth={2.8}
            />
            요양사 배정
          </button>
        ) : null}
        <Link
          to={`/worker/elders/${elder.id}/case-note`}
          className="inline-flex min-h-9 whitespace-nowrap items-center justify-center gap-1 rounded-lg bg-[#0867f2] px-3 text-[13px] font-black text-white shadow-[0_9px_18px_rgba(8,103,242,0.25)] transition hover:bg-[#0057d8] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          <Pencil aria-hidden="true" className="h-4 w-4" strokeWidth={2.8} />
          상담 작성
        </Link>
      </div>
    </article>
  )
}

function RiskElderPanel({
  activeFilter,
  filteredElders,
  onFilterChange,
  onAssignCaregiver,
  onSearchChange,
  searchQuery,
}: {
  activeFilter: ElderStatus | 'all'
  filteredElders: ElderRow[]
  onAssignCaregiver: (elder: ElderRow) => void
  onFilterChange: (filter: ElderStatus | 'all') => void
  onSearchChange: (value: string) => void
  searchQuery: string
}) {
  return (
    <section
      id="risk-elder-panel"
      className="rounded-[15px] border border-[#dfe8f5] bg-white shadow-[0_12px_26px_rgba(37,72,125,0.07)]"
      aria-labelledby="risk-elder-title"
    >
      <div className="grid gap-4 px-4 py-2 md:grid-cols-[1fr_auto] md:items-center">
        <div className="flex min-w-0 items-center gap-3">
          <h2
            id="risk-elder-title"
            className="text-[21px] font-black leading-tight text-[#071747]"
          >
            고위험 어르신 우선순위
          </h2>
          <span className="inline-flex min-h-8 items-center rounded-lg bg-[#e8f2ff] px-3 text-[13px] font-black text-[#0867f2]">
            3명
          </span>
        </div>
        <SearchAndFilter
          activeFilter={activeFilter}
          onFilterChange={onFilterChange}
          onSearchChange={onSearchChange}
          searchQuery={searchQuery}
        />
      </div>

      <div className="overflow-hidden rounded-b-[15px] border-t border-[#e5edf8]">
        {filteredElders.map((elder) => (
          <ElderDashboardRow
            key={elder.id}
            elder={elder}
            onAssignCaregiver={onAssignCaregiver}
          />
        ))}

        {filteredElders.length === 0 ? (
          <p className="px-5 py-8 text-center text-[17px] font-black text-[#12214b]">
            조건에 맞는 어르신이 없어요.
          </p>
        ) : null}
      </div>

      <div className="flex justify-end border-t border-[#e5edf8] px-5 py-0.5">
        <Link
          to="/worker/elders"
          className="inline-flex min-h-8 items-center justify-center gap-1 rounded-lg px-3 text-[15px] font-black text-[#0867f2] transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          전체 고위험 어르신 보기
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}

function CaregiverAssignmentModal({
  draft,
  elder,
  onClose,
  onPriorityChange,
  onSubmit,
}: {
  draft: AssignmentDraft
  elder: ElderRow | null
  onClose: () => void
  onPriorityChange: (priority: AssignmentPriority) => void
  onSubmit: () => void
}) {
  if (!elder) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-[#071747]/50 px-4 py-6"
      role="presentation"
    >
      <section
        className="w-full max-w-[430px] rounded-[18px] border border-[#dfe8f5] bg-white shadow-[0_22px_60px_rgba(7,23,71,0.24)]"
        role="dialog"
        aria-labelledby="caregiver-assignment-title"
        aria-modal="true"
      >
        <div className="flex items-start justify-between gap-3 border-b border-[#e5edf8] px-5 py-4">
          <h2
            id="caregiver-assignment-title"
            className="text-[22px] font-black leading-tight text-[#071747]"
          >
            요양사 업무 배정
          </h2>
          <button
            type="button"
            className="inline-grid h-10 w-10 place-items-center rounded-lg text-[#60708e] transition hover:bg-[#f1f6ff] hover:text-[#071747] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
            aria-label="요양사 업무 배정 닫기"
            onClick={onClose}
          >
            <X aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>

        <div className="grid gap-5 px-5 py-5">
          <dl className="grid gap-4 rounded-[14px] bg-[#f8fbff] p-4 text-[16px] leading-snug">
            <div className="grid gap-1 sm:grid-cols-[104px_1fr] sm:items-start">
              <dt className="font-black text-[#425371]">대상자</dt>
              <dd className="font-black text-[#071747]">{elder.name}</dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[104px_1fr] sm:items-start">
              <dt className="font-black text-[#425371]">요청 내용</dt>
              <dd className="whitespace-pre-line font-black text-[#071747]">
                {draft.requestContent}
              </dd>
            </div>
            <div className="grid gap-2 sm:grid-cols-[104px_1fr] sm:items-start">
              <dt className="font-black text-[#425371]">우선순위</dt>
              <dd
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="요양사 업무 우선순위"
              >
                {assignmentPriorityOptions.map((priority) => {
                  const isSelected = draft.priority === priority

                  return (
                    <button
                      key={priority}
                      type="button"
                      className={cn(
                        'inline-flex min-h-9 items-center justify-center rounded-lg border px-3 text-[14px] font-black transition focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]',
                        isSelected
                          ? 'border-[#0867f2] bg-[#edf6ff] text-[#0867f2]'
                          : 'border-[#dfe8f5] bg-white text-[#425371] hover:bg-[#f5f9ff]',
                      )}
                      aria-pressed={isSelected}
                      onClick={() => onPriorityChange(priority)}
                    >
                      {priority}
                    </button>
                  )
                })}
              </dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[104px_1fr] sm:items-start">
              <dt className="font-black text-[#425371]">담당 요양사</dt>
              <dd className="font-black text-[#071747]">
                {draft.assignedCaregiver}
              </dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[104px_1fr] sm:items-start">
              <dt className="font-black text-[#425371]">마감 시간</dt>
              <dd className="font-black text-[#071747]">{draft.dueTime}</dd>
            </div>
          </dl>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#dfe8f5] bg-white px-5 text-[17px] font-black text-[#253758] shadow-[0_8px_18px_rgba(37,72,125,0.05)] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
              onClick={onClose}
            >
              취소
            </button>
            <button
              type="button"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#0867f2] px-5 text-[17px] font-black text-white shadow-[0_12px_24px_rgba(8,103,242,0.28)] transition hover:bg-[#0057d8] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
              onClick={onSubmit}
            >
              배정하기
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

function RiskResponseModal({
  elder,
  onAssignCaregiver,
  onClose,
  onComplete,
}: {
  elder: ElderRow | null
  onAssignCaregiver: (elder: ElderRow) => void
  onClose: () => void
  onComplete: (elder: ElderRow) => void
}) {
  if (!elder) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-[#071747]/50 px-4 py-6"
      role="presentation"
    >
      <section
        className="w-full max-w-[520px] rounded-[18px] border border-[#dfe8f5] bg-white shadow-[0_22px_60px_rgba(7,23,71,0.24)]"
        role="dialog"
        aria-labelledby="risk-response-title"
        aria-modal="true"
      >
        <div className="flex items-start justify-between gap-3 border-b border-[#e5edf8] px-5 py-4">
          <div className="min-w-0">
            <h2
              id="risk-response-title"
              className="text-[22px] font-black leading-tight text-[#071747]"
            >
              위험 대응 상세
            </h2>
            <p className="mt-2 text-[15px] font-black leading-snug text-[#df1f32]">
              {elder.name} · 위험 · 식사 거르심, 혈당 감소 지속
            </p>
          </div>
          <button
            type="button"
            className="inline-grid h-10 w-10 place-items-center rounded-lg text-[#60708e] transition hover:bg-[#f1f6ff] hover:text-[#071747] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
            aria-label="위험 대응 상세 닫기"
            onClick={onClose}
          >
            <X aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>

        <div className="grid gap-5 px-5 py-5">
          <section
            className="rounded-[14px] border border-[#ffe0e4] bg-[#fff8f9] px-4 py-4"
            aria-labelledby="risk-reason-title"
          >
            <h3
              id="risk-reason-title"
              className="text-[17px] font-black text-[#071747]"
            >
              위험 사유
            </h3>
            <ul className="mt-3 grid gap-2 text-[15px] font-bold leading-snug text-[#253758]">
              <li>- 식사량 감소</li>
              <li>- 혈당 감소 기록</li>
              <li>- 최근 메모: 식단 조절 필요</li>
            </ul>
          </section>

          <dl className="grid grid-cols-[104px_minmax(0,1fr)] items-center gap-3 rounded-[14px] bg-[#f8fbff] px-4 py-3 text-[15px]">
            <dt className="font-black text-[#425371]">처리 상태</dt>
            <dd className="font-black text-[#df1f32]">미처리</dd>
          </dl>

          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href="tel:01012345678"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#dfe8f5] bg-white px-4 text-[15px] font-black text-[#253758] shadow-[0_8px_18px_rgba(37,72,125,0.05)] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
            >
              전화하기
            </a>
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#dfe8f5] bg-white px-4 text-[15px] font-black text-[#253758] shadow-[0_8px_18px_rgba(37,72,125,0.05)] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
            >
              보호자 연락
            </button>
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#bfd6fb] bg-[#edf6ff] px-4 text-[15px] font-black text-[#0867f2] shadow-[0_8px_18px_rgba(37,72,125,0.05)] transition hover:bg-[#e2f0ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
              onClick={() => onAssignCaregiver(elder)}
            >
              요양사 배정
            </button>
            <Link
              to={`/worker/elders/${elder.id}/case-note`}
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#0867f2] px-4 text-[15px] font-black text-white shadow-[0_10px_20px_rgba(8,103,242,0.24)] transition hover:bg-[#0057d8] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
            >
              상담 메모 작성
            </Link>
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#169444] px-4 text-[15px] font-black text-white shadow-[0_10px_20px_rgba(22,148,68,0.22)] transition hover:bg-[#137d3a] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
              onClick={() => onComplete(elder)}
            >
              대응 완료
            </button>
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#dfe8f5] bg-white px-4 text-[15px] font-black text-[#425371] shadow-[0_8px_18px_rgba(37,72,125,0.05)] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
              onClick={onClose}
            >
              보류
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

function QuickMenuPanel() {
  return (
    <section
      className="rounded-[18px] border border-[#dfe8f5] bg-white px-5 py-5 shadow-[0_12px_26px_rgba(37,72,125,0.08)]"
      aria-labelledby="quick-menu-title"
    >
      <h2
        id="quick-menu-title"
        className="text-[20px] font-black leading-tight text-[#071747]"
      >
        빠른 메뉴
      </h2>

      <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {quickMenus.map((item) => (
          <Link
            key={item.title}
            aria-label={item.title}
            to={item.href}
            className="relative flex min-h-[178px] flex-col items-center justify-center rounded-[12px] border border-[#dfe8f5] bg-white px-3 py-4 text-center shadow-[0_8px_16px_rgba(37,72,125,0.05)] transition hover:-translate-y-0.5 hover:border-[#bad2f8] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
          >
            {item.noticeCount ? (
              <span className="absolute right-5 top-4 grid h-6 min-w-6 place-items-center rounded-full bg-[#ff3648] px-1 text-[12px] font-black leading-none text-white">
                {item.noticeCount}
              </span>
            ) : null}
            <img
              src={item.iconSrc}
              alt=""
              className="h-[72px] w-[72px] object-contain"
              draggable="false"
            />
            <strong className="mt-2 text-[16px] font-black leading-tight text-[#071747]">
              {item.title}
            </strong>
            <span className="mt-2 whitespace-nowrap text-[11px] font-bold leading-tight text-[#7a89a4]">
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
      className="rounded-[18px] border border-[#dfe8f5] bg-white px-5 py-5 shadow-[0_12px_26px_rgba(37,72,125,0.08)]"
      aria-labelledby="today-schedule-title"
    >
      <div className="flex items-center justify-between gap-3">
        <h2
          id="today-schedule-title"
          className="text-[20px] font-black leading-tight text-[#071747]"
        >
          오늘 일정
        </h2>
        <Link
          to="/worker/schedules"
          className="inline-flex min-h-8 items-center gap-1 rounded-lg px-2 text-[13px] font-black text-[#0867f2] transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          전체 일정 보기
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>

      <ol className="mt-4 overflow-hidden rounded-[12px] border border-[#dfe8f5]">
        {scheduleItems.map((item) => (
          <li
            key={`${item.time}-${item.title}`}
            className="grid min-h-[78px] grid-cols-[86px_26px_minmax(0,1fr)_52px] items-center border-b border-[#e5edf8] bg-white px-3 last:border-b-0"
          >
            <div className="min-w-0 text-center">
              <time className="text-[16px] font-black leading-tight text-[#071747]">
                {item.time}
              </time>
              <span className="mt-1 block text-[12px] font-bold leading-tight text-[#7a89a4]">
                {item.category}
              </span>
            </div>
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
              aria-hidden="true"
            />
            <div className="min-w-0">
              <p className="truncate text-[14px] font-black leading-tight text-[#071747]">
                {item.title}
              </p>
              <p className="mt-2 truncate text-[12px] font-bold leading-tight text-[#62718d]">
                {item.description}
              </p>
            </div>
            <span className="inline-flex min-h-9 items-center justify-center rounded-lg border border-[#d6e6fb] bg-[#f2f7ff] text-[13px] font-black text-[#0867f2]">
              예정
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}

function RecentMemoPanel() {
  return (
    <section
      className="rounded-[18px] border border-[#dfe8f5] bg-white px-5 py-5 shadow-[0_12px_26px_rgba(37,72,125,0.08)]"
      aria-labelledby="recent-memo-title"
    >
      <div className="flex items-center justify-between gap-3">
        <h2
          id="recent-memo-title"
          className="text-[20px] font-black leading-tight text-[#071747]"
        >
          최근 사례 관리 메모
        </h2>
        <Link
          to="/worker/reports"
          className="inline-flex min-h-8 items-center gap-1 rounded-lg px-2 text-[13px] font-black text-[#0867f2] transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          전체 보기
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-4 grid gap-3">
        {recentMemos.map((memo) => (
          <Link
            key={memo.title}
            to="/worker/reports"
            className="grid min-h-[86px] grid-cols-[52px_minmax(0,1fr)_64px] items-center gap-3 rounded-[12px] border border-[#dfe8f5] bg-white px-3 py-3 shadow-[0_8px_16px_rgba(37,72,125,0.04)] transition hover:border-[#bad2f8] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
          >
            <span
              className={cn(
                'inline-flex min-h-8 items-center justify-center rounded-lg border px-2 text-[13px] font-black',
                statusStyles[memo.status].badge,
              )}
            >
              {memo.statusLabel}
            </span>
            <span className="min-w-0">
              <strong className="block truncate text-[14px] font-black leading-tight text-[#071747]">
                {memo.title}
              </strong>
              <span className="mt-2 block truncate text-[12px] font-bold leading-tight text-[#62718d]">
                {memo.body}
              </span>
            </span>
            <span className="justify-self-end text-[12px] font-bold text-[#7a89a4]">
              {memo.age}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

function ServiceLinksPanel() {
  return (
    <section
      className="rounded-[15px] border border-[#dfe8f5] bg-white px-5 py-3 shadow-[0_12px_26px_rgba(37,72,125,0.07)]"
      aria-labelledby="service-link-title"
    >
      <div className="flex flex-wrap items-center gap-2">
        <h2
          id="service-link-title"
          className="text-[20px] font-black leading-tight text-[#071747]"
        >
          복지 서비스 연계 현황
        </h2>
        <span className="text-[12px] font-bold text-[#93a0b6]">
          (2024년 5월 기준)
        </span>
      </div>

      <div className="mt-2 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {serviceLinks.map((service) => (
          <article
            key={service.label}
            className="grid min-h-[84px] grid-cols-[58px_minmax(0,1fr)] items-center gap-2 rounded-[12px] border border-[#dfe8f5] bg-white px-3 py-2"
            aria-label={`${service.label} ${service.current}명 중 ${service.total}명`}
          >
            <img
              src={service.iconSrc}
              alt=""
              className="h-[52px] w-[52px] object-contain"
              draggable="false"
            />
            <div className="min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="whitespace-nowrap text-[13px] font-black leading-tight text-[#071747]">
                  {service.label}
                </h3>
                <p className="whitespace-nowrap text-[11px] font-black text-[#071747]">
                  <strong className="text-[15px]">{service.current}</strong>
                  <span className="text-[#93a0b6]">명 / {service.total}명</span>
                </p>
              </div>
              <div
                className="mt-3 h-2 overflow-hidden rounded-full bg-[#e7eef8]"
                aria-hidden="true"
              >
                <span
                  className="block h-full rounded-full bg-[#0867f2]"
                  style={{ width: service.percent }}
                />
              </div>
              <p className="mt-2 text-[12px] font-bold text-[#62718d]">
                연계율 {service.percent}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function WeeklyReportPanel() {
  return (
    <section
      className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.82fr)]"
      aria-label="주간 리포트 요약"
    >
      <div className="rounded-[15px] border border-[#dfe8f5] bg-white px-5 py-4 shadow-[0_12px_26px_rgba(37,72,125,0.06)]">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-[18px] font-black leading-tight text-[#071747]">
            주간 리포트 요약
          </h2>
          <span className="text-[12px] font-bold text-[#93a0b6]">
            (이번 주 5.13 ~ 5.19)
          </span>
        </div>
        <dl className="mt-3 grid grid-cols-2 gap-y-3 sm:grid-cols-4">
          {weeklyReports.map((item, index) => (
            <div
              key={item.label}
              className={cn(
                'px-3 text-center',
                index > 0 && 'sm:border-l sm:border-[#e5edf8]',
              )}
            >
              <dt className="text-[12px] font-bold text-[#7a89a4]">
                {item.label}
              </dt>
              <dd className="mt-1 text-[19px] font-black leading-none text-[#071747]">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="grid gap-3 rounded-[15px] border border-[#dfe8f5] bg-white px-5 py-4 shadow-[0_12px_26px_rgba(37,72,125,0.06)] sm:grid-cols-[1fr_auto] sm:items-center">
        <p className="break-keep text-[13px] font-bold leading-relaxed text-[#62718d]">
          이번 주 고위험 대응은 전주 대비 12% 증가했어요.
          <br />
          서식 제출 문서가 8건이 예정되었습니다.
        </p>
        <Link
          to="/worker/reports"
          className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#0867f2] px-8 text-[15px] font-black text-white shadow-[0_10px_20px_rgba(8,103,242,0.24)] transition hover:bg-[#0057d8] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          주간 리포트 보기
        </Link>
      </div>
    </section>
  )
}

export function WorkerDashboardPage() {
  const [activeFilter, setActiveFilter] = useState<ElderStatus | 'all'>('all')
  const [assignmentDraft, setAssignmentDraft] = useState<AssignmentDraft>(
    defaultAssignmentDraft,
  )
  const [assignmentMessage, setAssignmentMessage] = useState<string | null>(
    null,
  )
  const [assignmentTarget, setAssignmentTarget] = useState<ElderRow | null>(
    null,
  )
  const [riskModalTarget, setRiskModalTarget] = useState<ElderRow | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredElders = useMemo(() => {
    return elderRows.filter((elder) => {
      const matchesFilter =
        activeFilter === 'all' || elder.status === activeFilter

      return matchesFilter && elderMatchesSearch(elder, searchQuery)
    })
  }, [activeFilter, searchQuery])

  const openAssignmentModal = (elder: ElderRow) => {
    setAssignmentDraft(defaultAssignmentDraft)
    setAssignmentTarget(elder)
  }

  const openRiskAlert = () => {
    setRiskModalTarget(elderRows[0])
  }

  const openAssignmentFromRiskModal = (elder: ElderRow) => {
    setRiskModalTarget(null)
    openAssignmentModal(elder)
  }

  const completeRiskResponse = (elder: ElderRow) => {
    setRiskModalTarget(null)
    setAssignmentMessage(`${elder.name} 위험 대응을 완료 처리했습니다.`)
  }

  const submitAssignment = () => {
    if (!assignmentTarget) {
      return
    }

    const payload: CaregiverAssignment = {
      assignedCaregiver: assignmentDraft.assignedCaregiver,
      createdAt: new Date().toISOString(),
      dueTime: assignmentDraft.dueTime,
      elderId: assignmentTarget.id,
      elderName: assignmentTarget.name,
      priority: assignmentDraft.priority,
      requestContent: assignmentDraft.requestContent,
    }

    try {
      window.localStorage.setItem(
        caregiverAssignmentStorageKey,
        JSON.stringify(payload),
      )
    } catch {
      // Local persistence is best-effort until the assignment API exists.
    }

    setAssignmentMessage(
      `${payload.elderName} 새 배정 업무가 요양사 대시보드에 전달되었습니다.`,
    )
    setAssignmentTarget(null)
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#f8fbff] text-[#071747]">
      <WorkerDashboardTopBar onOpenRiskAlert={openRiskAlert} />

      <div className="mx-auto grid w-full max-w-[1600px] gap-6 px-5 py-7 lg:px-10 xl:grid-cols-[minmax(0,1054px)_456px] xl:items-start">
        <div className="grid min-w-0 gap-4">
          <section
            className="px-1 pt-3"
            aria-labelledby="worker-dashboard-title"
          >
            <h1
              id="worker-dashboard-title"
              className="break-keep text-[28px] font-black leading-tight text-[#071747] sm:text-[32px]"
            >
              이수진 복지사님, 위험 대응 현황입니다.
            </h1>
            <p className="mt-3 text-[15px] font-bold leading-snug text-[#425371]">
              고위험 어르신 우선순위, 요양사 배정, 사례 메모와 대응 완료를
              한눈에 확인하세요.
            </p>
          </section>

          <section
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            aria-label="복지사 홈 요약"
          >
            {metricCards.map((metric) => (
              <MetricSummaryCard key={metric.id} metric={metric} />
            ))}
          </section>

          <RiskElderPanel
            activeFilter={activeFilter}
            filteredElders={filteredElders}
            onAssignCaregiver={openAssignmentModal}
            onFilterChange={setActiveFilter}
            onSearchChange={setSearchQuery}
            searchQuery={searchQuery}
          />

          {assignmentMessage ? (
            <p
              className="rounded-[14px] border border-[#bfeccf] bg-[#edf9f1] px-4 py-3 text-[15px] font-black text-[#15803d] shadow-[0_10px_22px_rgba(34,197,94,0.1)]"
              role="status"
            >
              {assignmentMessage}
            </p>
          ) : null}

          <ServiceLinksPanel />
          <WeeklyReportPanel />
        </div>

        <aside className="grid gap-5" aria-label="복지사 홈 보조 메뉴">
          <QuickMenuPanel />
          <TodaySchedulePanel />
          <RecentMemoPanel />
        </aside>
      </div>

      <CaregiverAssignmentModal
        draft={assignmentDraft}
        elder={assignmentTarget}
        onClose={() => setAssignmentTarget(null)}
        onPriorityChange={(priority) =>
          setAssignmentDraft((current) => ({
            ...current,
            priority,
          }))
        }
        onSubmit={submitAssignment}
      />
      <RiskResponseModal
        elder={riskModalTarget}
        onAssignCaregiver={openAssignmentFromRiskModal}
        onClose={() => setRiskModalTarget(null)}
        onComplete={completeRiskResponse}
      />
    </main>
  )
}
