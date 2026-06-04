import {
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Search,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

const dashboardAssetBase = '/assets/dolbomon/worker-dashboard'
const elderAssetBase = '/assets/dolbomon/worker-elders'
const memoAssetBase = '/assets/dolbomon/worker-memo'
const workerAssetBase = '/assets/dolbomon/worker'
const workerProfileSrc = '/assets/dolbomon/worker-mypage/worker-lee-bokji.png'

type ConsultationStatus = 'caution' | 'danger' | 'stable'

type MetricCard = {
  delta?: string
  description: string
  iconSrc: string
  id: string
  label: string
  unit: string
  value: string
}

type SymptomTag = {
  iconSrc: string
  label: string
}

type ConsultationRecord = {
  age: number
  avatarSrc: string
  dateLabel: string
  elderId: string
  household: string
  id: string
  location: string
  name: string
  preview: string
  status: ConsultationStatus
  statusLabel: '안정' | '위험' | '주의'
  symptoms: SymptomTag[]
  time: string
}

type TemplateItem = {
  description: string
  iconSrc: string
  title: string
}

type RecentMemoItem = {
  dateLabel: string
  description: string
  title: string
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
    delta: '전일 대비 ▲ 2',
    description: '전일 대비',
    iconSrc: `${dashboardAssetBase}/채팅.png`,
    id: 'today',
    label: '오늘 상담',
    unit: '건',
    value: '6',
  },
  {
    description: '신속한 작성이 필요해요',
    iconSrc: `${dashboardAssetBase}/체크.png`,
    id: 'pending',
    label: '미작성 메모',
    unit: '건',
    value: '3',
  },
  {
    description: '집중 관리 필요',
    iconSrc: `${dashboardAssetBase}/경고.png`,
    id: 'risk',
    label: '고위험 대상',
    unit: '명',
    value: '7',
  },
  {
    description: '이번 주 기준',
    iconSrc: `${dashboardAssetBase}/체크2.png`,
    id: 'done',
    label: '완료 건수',
    unit: '건',
    value: '38',
  },
]

const templateItems: TemplateItem[] = [
  {
    description: '식사량, 식욕, 영양 섭취',
    iconSrc: `${memoAssetBase}/식사2.png`,
    title: '식사 상담',
  },
  {
    description: '복용 여부, 부작용',
    iconSrc: `${memoAssetBase}/알약.png`,
    title: '투약 상담',
  },
  {
    description: '수면 시간, 수면 질',
    iconSrc: `${memoAssetBase}/수면.png`,
    title: '수면 상담',
  },
  {
    description: '우울감, 불안감, 정서 지지',
    iconSrc: `${memoAssetBase}/우울.png`,
    title: '정서 상담',
  },
]

const consultationRecords: ConsultationRecord[] = [
  {
    age: 84,
    avatarSrc: `${elderAssetBase}/elder-kim-yeongja.png`,
    dateLabel: '2024.05.21 (화)',
    elderId: 'kim-yeongja',
    household: '독거',
    id: 'consult-kim-yeongja',
    location: '서울 강서구',
    name: '김영자 어르신',
    preview:
      '식사량이 최근 감소했다고 말씀하시고, 우울감이 지속되어 정서적 지지가 필요합니다.',
    status: 'danger',
    statusLabel: '위험',
    symptoms: [
      { iconSrc: `${memoAssetBase}/식사2.png`, label: '식사' },
      { iconSrc: `${memoAssetBase}/우울.png`, label: '우울' },
      { iconSrc: `${workerAssetBase}/기분.png`, label: '불안' },
    ],
    time: '10:00',
  },
  {
    age: 79,
    avatarSrc: `${elderAssetBase}/elder-lee-sunja.png`,
    dateLabel: '2024.05.21 (화)',
    elderId: 'lee-sunja',
    household: '자녀와 거주',
    id: 'consult-lee-sunja',
    location: '서울 양천구',
    name: '이순자 어르신',
    preview:
      '수면 시간이 짧고 중간에 자주 깨어난다고 하셨으며, 어지럼 증상을 호소함.',
    status: 'caution',
    statusLabel: '주의',
    symptoms: [
      { iconSrc: `${memoAssetBase}/알약.png`, label: '복약' },
      { iconSrc: `${memoAssetBase}/수면.png`, label: '수면' },
      { iconSrc: `${workerAssetBase}/통증.png`, label: '어지럼' },
    ],
    time: '13:30',
  },
  {
    age: 81,
    avatarSrc: `${elderAssetBase}/elder-park-cheolsu.png`,
    dateLabel: '2024.05.21 (화)',
    elderId: 'park-cheolsu',
    household: '배우자와 거주',
    id: 'consult-park-cheolsu',
    location: '서울 구로구',
    name: '박철수 어르신',
    preview:
      '혈압은 안정적이나 무릎 통증으로 걷기 어려워 외부 이동을 줄이고 있음 진행.',
    status: 'stable',
    statusLabel: '안정',
    symptoms: [
      { iconSrc: `${workerAssetBase}/ai.png`, label: '혈압' },
      { iconSrc: `${workerAssetBase}/사람.png`, label: '관절' },
      { iconSrc: `${memoAssetBase}/통증.png`, label: '통증' },
    ],
    time: '15:00',
  },
  {
    age: 86,
    avatarSrc: `${elderAssetBase}/elder-choi-bokrye.png`,
    dateLabel: '2024.05.20 (월)',
    elderId: 'choi-bokrye',
    household: '배우자와 거주',
    id: 'consult-choi-bokrye',
    location: '서울 금천구',
    name: '최복례 어르신',
    preview:
      '식욕이 다소 떨어지고 체중이 감소하여 영양 보충 방법에 대해 안내드림.',
    status: 'caution',
    statusLabel: '주의',
    symptoms: [
      { iconSrc: `${memoAssetBase}/식사2.png`, label: '식사' },
      { iconSrc: `${workerAssetBase}/사람.png`, label: '체중' },
      { iconSrc: `${workerAssetBase}/집.png`, label: '변비' },
    ],
    time: '09:30',
  },
  {
    age: 77,
    avatarSrc: `${dashboardAssetBase}/어르신1.png`,
    dateLabel: '2024.05.20 (월)',
    elderId: 'jung-mansu',
    household: '독거',
    id: 'consult-jung-mansu',
    location: '서울 영등포구',
    name: '정만수 어르신',
    preview:
      '불안감과 우울감이 있다고 하셨으며, 수면 패턴 개선이 필요함을 확인.',
    status: 'danger',
    statusLabel: '위험',
    symptoms: [
      { iconSrc: `${memoAssetBase}/수면.png`, label: '수면' },
      { iconSrc: `${memoAssetBase}/우울.png`, label: '우울' },
      { iconSrc: `${workerAssetBase}/기분.png`, label: '불안' },
    ],
    time: '11:00',
  },
]

const recentMemoItems: RecentMemoItem[] = [
  {
    dateLabel: '05.21',
    description: '우울감 지속, 지지와 돌봄 격려',
    title: '김영자 어르신 정서 상담 메모',
  },
  {
    dateLabel: '05.21',
    description: '무릎 통증 심함, 파스 사용 권장',
    title: '박철수 어르신 통증 관리 메모',
  },
  {
    dateLabel: '05.20',
    description: '취침 전 스트레칭 및 수면 환경 조정 안내',
    title: '이순자 어르신 수면 개선 메모',
  },
]

const statusFilters: Array<{
  label: string
  value: ConsultationStatus | 'all'
}> = [
  { label: '전체', value: 'all' },
  { label: '위험', value: 'danger' },
  { label: '주의', value: 'caution' },
  { label: '안정', value: 'stable' },
]

const statusStyles: Record<
  ConsultationStatus,
  {
    badge: string
    filterActive: string
    filterInactive: string
  }
> = {
  caution: {
    badge: 'border-[#ffd89a] bg-[#fff8eb] text-[#ff8b00]',
    filterActive: 'border-[#ffc66d] bg-[#fff4dc] text-[#e18400]',
    filterInactive: 'border-[#ffd89a] bg-[#fffaf2] text-[#e18400]',
  },
  danger: {
    badge: 'border-[#ffccd2] bg-[#fff0f2] text-[#f12a3a]',
    filterActive: 'border-[#ffb7bf] bg-[#fff0f2] text-[#ee1f2a]',
    filterInactive: 'border-[#ffcfd5] bg-[#fff8f9] text-[#ee1f2a]',
  },
  stable: {
    badge: 'border-[#bfeccf] bg-[#edf9f1] text-[#169444]',
    filterActive: 'border-[#9fe2b7] bg-[#edf9f1] text-[#159147]',
    filterInactive: 'border-[#bfeccf] bg-[#f5fcf7] text-[#159147]',
  },
}

function normalizeSearchValue(value: string) {
  return value.trim().toLocaleLowerCase('ko-KR')
}

function consultationMatchesSearch(
  consultation: ConsultationRecord,
  searchQuery: string,
) {
  const keyword = normalizeSearchValue(searchQuery)

  if (!keyword) {
    return true
  }

  return [
    consultation.name,
    consultation.household,
    consultation.location,
    consultation.preview,
    consultation.statusLabel,
    ...consultation.symptoms.map((symptom) => symptom.label),
  ]
    .map(normalizeSearchValue)
    .join(' ')
    .includes(keyword)
}

function WorkerConsultationTopBar() {
  return (
    <header className="sticky top-0 z-30 overflow-x-hidden border-b border-[#dfe8f5] bg-white/96 shadow-[0_5px_18px_rgba(30,66,118,0.05)] backdrop-blur">
      <div className="mx-auto grid min-h-[68px] w-full max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 px-5 py-1 lg:grid-cols-[210px_minmax(0,1fr)_auto] lg:px-8">
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
            const isActive = item.href === '/worker/consultations'

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

        <div className="col-start-2 row-start-1 hidden items-center gap-3 justify-self-end min-[560px]:flex lg:col-start-3">
          <Link
            to="/worker/alerts"
            className="relative inline-grid min-h-10 min-w-10 place-items-center rounded-lg text-[#3c4b67] transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
            aria-label="알림 3건 확인"
          >
            <Bell aria-hidden="true" size={29} strokeWidth={2.4} />
            <span className="absolute right-0.5 top-0 grid h-[22px] min-w-[22px] place-items-center rounded-full bg-[#ff3648] px-1 text-[12px] font-black leading-none text-white ring-2 ring-white">
              3
            </span>
          </Link>

          <Link
            to="/worker/mypage"
            className="hidden min-h-11 items-center gap-3 rounded-lg py-1 pl-1 pr-2 transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff] min-[720px]:inline-flex"
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
      className="grid min-h-[134px] grid-cols-[78px_minmax(0,1fr)] items-center gap-4 rounded-[14px] border border-[#dfe8f5] bg-white px-5 py-4 shadow-[0_12px_26px_rgba(37,72,125,0.08)]"
      aria-label={`${metric.label} ${metric.value}${metric.unit}`}
    >
      <img
        src={metric.iconSrc}
        alt=""
        className="h-[76px] w-[76px] object-contain"
        draggable="false"
      />
      <div className="min-w-0 text-center">
        <h2 className="text-[16px] font-black leading-tight text-[#071747]">
          {metric.label}
        </h2>
        <p className="mt-2 whitespace-nowrap text-[#071747]">
          <strong className="text-[42px] font-black leading-none tracking-normal">
            {metric.value}
          </strong>
          <span className="ml-1 text-[17px] font-black">{metric.unit}</span>
        </p>
        <p className="mt-1 whitespace-nowrap text-[12px] font-bold leading-tight text-[#6f7f9b]">
          {metric.delta ?? metric.description}
        </p>
      </div>
    </article>
  )
}

function FilterButton({
  activeFilter,
  filter,
  onFilterChange,
}: {
  activeFilter: ConsultationStatus | 'all'
  filter: (typeof statusFilters)[number]
  onFilterChange: (filter: ConsultationStatus | 'all') => void
}) {
  const isActive = activeFilter === filter.value
  const isAll = filter.value === 'all'

  return (
    <button
      type="button"
      className={cn(
        'inline-flex min-h-11 min-w-[58px] items-center justify-center rounded-lg border px-4 text-[14px] font-black transition focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]',
        isAll && isActive && 'border-[#bed6fb] bg-[#edf6ff] text-[#0867f2]',
        isAll && !isActive && 'border-[#dfe8f5] bg-white text-[#0867f2]',
        !isAll &&
          isActive &&
          statusStyles[filter.value as ConsultationStatus].filterActive,
        !isAll &&
          !isActive &&
          statusStyles[filter.value as ConsultationStatus].filterInactive,
      )}
      aria-pressed={isActive}
      onClick={() => onFilterChange(filter.value)}
    >
      {filter.label}
    </button>
  )
}

function ConsultationToolbar({
  activeFilter,
  onFilterChange,
  onSearchChange,
  searchQuery,
}: {
  activeFilter: ConsultationStatus | 'all'
  onFilterChange: (filter: ConsultationStatus | 'all') => void
  onSearchChange: (value: string) => void
  searchQuery: string
}) {
  return (
    <div className="mt-5 grid gap-3 lg:grid-cols-[minmax(250px,368px)_minmax(0,1fr)_234px] lg:items-center">
      <label className="relative block">
        <span className="sr-only">상담 기록 검색</span>
        <input
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          className="h-12 w-full rounded-lg border border-[#dfe8f5] bg-white py-0 pl-4 pr-12 text-[15px] font-bold text-[#071747] shadow-[0_7px_16px_rgba(37,72,125,0.05)] placeholder:text-[#8794aa] focus:border-[#0867f2] focus:outline focus:outline-4 focus:outline-[#d7e8ff]"
          placeholder="어르신 이름, 증상, 내용으로 검색하세요."
          type="search"
        />
        <Search
          aria-hidden="true"
          className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#223353]"
          strokeWidth={2.5}
        />
      </label>

      <div
        className="flex flex-wrap gap-2 lg:justify-center"
        role="group"
        aria-label="상담 상태 필터"
      >
        {statusFilters.map((filter) => (
          <FilterButton
            key={filter.value}
            activeFilter={activeFilter}
            filter={filter}
            onFilterChange={onFilterChange}
          />
        ))}
      </div>

      <button
        type="button"
        className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg border border-[#dfe8f5] bg-white px-4 text-[14px] font-black text-[#334466] shadow-[0_7px_16px_rgba(37,72,125,0.05)] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
      >
        <CalendarDays aria-hidden="true" className="h-5 w-5 text-[#667a9d]" />
        2024.05.15 - 2024.05.21
        <ChevronDown aria-hidden="true" className="h-4 w-4 text-[#667a9d]" />
      </button>
    </div>
  )
}

function StatusBadge({
  label,
  status,
}: {
  label: ConsultationRecord['statusLabel']
  status: ConsultationStatus
}) {
  return (
    <span
      className={cn(
        'inline-flex min-h-9 w-fit items-center justify-center rounded-lg border px-4 text-[14px] font-black',
        statusStyles[status].badge,
      )}
    >
      {label}
    </span>
  )
}

function SymptomList({ symptoms }: { symptoms: SymptomTag[] }) {
  return (
    <ul className="flex flex-wrap gap-2 lg:flex-nowrap" aria-label="주요 증상">
      {symptoms.map((symptom) => (
        <li
          key={symptom.label}
          className="grid w-10 shrink-0 justify-items-center gap-1 text-center"
        >
          <img
            src={symptom.iconSrc}
            alt=""
            className="h-7 w-7 object-contain"
            draggable="false"
          />
          <span className="text-[10px] font-black leading-none text-[#27385a]">
            {symptom.label}
          </span>
        </li>
      ))}
    </ul>
  )
}

function ConsultationRecordRow({ record }: { record: ConsultationRecord }) {
  return (
    <article className="grid gap-4 border-t border-[#e6edf7] bg-white px-4 py-4 first:border-t-0 lg:grid-cols-[226px_120px_136px_minmax(210px,1fr)_68px_152px] lg:items-center lg:gap-3 lg:px-4 lg:py-3">
      <div className="flex min-w-0 items-center gap-4">
        <img
          src={record.avatarSrc}
          alt={`${record.name} 프로필`}
          className="h-[58px] w-[58px] shrink-0 rounded-full bg-[#f4f8ff] object-contain shadow-[0_8px_18px_rgba(47,86,145,0.12)]"
          draggable="false"
        />
        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-black leading-tight text-[#071747]">
            {record.name}
          </h3>
          <p className="mt-2 truncate text-[12px] font-bold leading-tight text-[#62718d]">
            {record.age}세 · {record.household} · {record.location}
          </p>
        </div>
      </div>

      <div className="text-[13px] font-black leading-tight text-[#24365a]">
        <span className="block lg:hidden">방문 일시</span>
        <time dateTime={record.dateLabel.slice(0, 10).replaceAll('.', '-')}>
          {record.dateLabel}
        </time>
        <span className="mt-2 flex items-center gap-2 text-[13px] font-bold text-[#17264a]">
          <span
            className="h-2 w-2 rounded-full bg-[#16b862]"
            aria-hidden="true"
          />
          {record.time}
        </span>
      </div>

      <SymptomList symptoms={record.symptoms} />

      <p className="line-clamp-2 min-w-0 break-keep text-[13px] font-bold leading-relaxed text-[#5f6f8e]">
        {record.preview}
      </p>

      <StatusBadge label={record.statusLabel} status={record.status} />

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-[1fr_1fr]">
        <Link
          to={`/worker/elders/${record.elderId}`}
          className="inline-flex min-h-9 items-center justify-center rounded-lg border border-[#d7e4f5] bg-white px-2 text-[13px] font-black text-[#0867f2] shadow-[0_7px_16px_rgba(37,72,125,0.06)] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          상세 보기
        </Link>
        <Link
          to={`/worker/elders/${record.elderId}/case-note`}
          className="inline-flex min-h-9 items-center justify-center rounded-lg bg-[#0867f2] px-2 text-[13px] font-black text-white shadow-[0_9px_18px_rgba(8,103,242,0.25)] transition hover:bg-[#0057d8] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          상담 작성
        </Link>
      </div>
    </article>
  )
}

function ConsultationRecordPanel({
  activeFilter,
  filteredRecords,
  onFilterChange,
  onSearchChange,
  searchQuery,
}: {
  activeFilter: ConsultationStatus | 'all'
  filteredRecords: ConsultationRecord[]
  onFilterChange: (filter: ConsultationStatus | 'all') => void
  onSearchChange: (value: string) => void
  searchQuery: string
}) {
  return (
    <section
      className="rounded-[16px] border border-[#dfe8f5] bg-white px-5 py-5 shadow-[0_12px_26px_rgba(37,72,125,0.08)]"
      aria-labelledby="consultation-record-title"
    >
      <h2
        id="consultation-record-title"
        className="text-[20px] font-black leading-tight text-[#071747]"
      >
        상담 기록 목록
      </h2>

      <ConsultationToolbar
        activeFilter={activeFilter}
        onFilterChange={onFilterChange}
        onSearchChange={onSearchChange}
        searchQuery={searchQuery}
      />

      <div className="mt-4 overflow-hidden rounded-[12px] border border-[#dfe8f5] bg-white">
        <div className="hidden min-h-[50px] grid-cols-[226px_120px_136px_minmax(210px,1fr)_68px_152px] items-center gap-3 border-b border-[#e6edf7] bg-[#fbfdff] px-4 text-center text-[13px] font-black text-[#17264a] lg:grid">
          <span>어르신</span>
          <span>방문 일시</span>
          <span>주요 증상</span>
          <span>상담 내용 (미리보기)</span>
          <span>상태</span>
          <span>관리</span>
        </div>

        <div>
          {filteredRecords.map((record) => (
            <ConsultationRecordRow key={record.id} record={record} />
          ))}

          {filteredRecords.length === 0 ? (
            <p className="px-4 py-10 text-center text-[16px] font-black text-[#52627f]">
              조건에 맞는 상담 기록이 없어요.
            </p>
          ) : null}
        </div>
      </div>

      <button
        type="button"
        className="mx-auto mt-4 flex min-h-9 items-center justify-center gap-2 rounded-lg px-4 text-[14px] font-black text-[#0867f2] transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
      >
        더 많은 상담 기록 보기
        <ChevronDown aria-hidden="true" className="h-4 w-4" />
      </button>
    </section>
  )
}

function PanelHeader({ id, title }: { id: string; title: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2
        id={id}
        className="text-[20px] font-black leading-tight text-[#071747]"
      >
        {title}
      </h2>
      <Link
        to="/worker/reports"
        className="inline-flex min-h-8 items-center gap-1 rounded-lg px-2 text-[13px] font-black text-[#0867f2] transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
      >
        전체 보기
        <ChevronRight aria-hidden="true" className="h-4 w-4" />
      </Link>
    </div>
  )
}

function QuickTemplatePanel() {
  return (
    <section
      className="rounded-[18px] border border-[#dfe8f5] bg-white px-5 py-5 shadow-[0_12px_26px_rgba(37,72,125,0.08)]"
      aria-labelledby="quick-template-title"
    >
      <PanelHeader id="quick-template-title" title="빠른 템플릿" />

      <div className="mt-4 grid grid-cols-2 gap-3">
        {templateItems.map((template) => (
          <button
            key={template.title}
            type="button"
            className="grid min-h-[116px] grid-cols-[62px_minmax(0,1fr)] items-center gap-3 rounded-[12px] border border-[#dfe8f5] bg-white px-4 py-3 text-left shadow-[0_8px_16px_rgba(37,72,125,0.05)] transition hover:-translate-y-0.5 hover:border-[#bad2f8] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
          >
            <img
              src={template.iconSrc}
              alt=""
              className="h-[62px] w-[62px] object-contain"
              draggable="false"
            />
            <span className="min-w-0">
              <strong className="block text-[15px] font-black leading-tight text-[#071747]">
                {template.title}
              </strong>
              <span className="mt-2 block break-keep text-[12px] font-bold leading-snug text-[#62718d]">
                {template.description}
              </span>
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}

function RecentMemoPanel() {
  return (
    <section
      className="rounded-[18px] border border-[#dfe8f5] bg-white px-5 py-5 shadow-[0_12px_26px_rgba(37,72,125,0.08)]"
      aria-labelledby="recent-memo-title"
    >
      <PanelHeader id="recent-memo-title" title="최근 메모 목록" />

      <div className="mt-4 overflow-hidden rounded-[12px] border border-[#e3ebf7]">
        {recentMemoItems.map((memo) => (
          <Link
            key={memo.title}
            to="/worker/reports"
            className="grid min-h-[82px] grid-cols-[50px_minmax(0,1fr)_48px] items-center gap-3 border-b border-[#e6edf7] bg-white px-3 py-3 transition last:border-b-0 hover:bg-[#f8fbff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-[#8bbcff]"
          >
            <img
              src={`${workerAssetBase}/파일.png`}
              alt=""
              className="h-10 w-10 object-contain"
              draggable="false"
            />
            <span className="min-w-0">
              <strong className="block truncate text-[14px] font-black leading-tight text-[#071747]">
                {memo.title}
              </strong>
              <span className="mt-2 block truncate text-[12px] font-bold leading-tight text-[#62718d]">
                {memo.description}
              </span>
            </span>
            <span className="justify-self-end text-[12px] font-bold text-[#5f6f8e]">
              {memo.dateLabel}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

function NextVisitPanel() {
  return (
    <section
      className="rounded-[18px] border border-[#dfe8f5] bg-white px-5 py-5 shadow-[0_12px_26px_rgba(37,72,125,0.08)]"
      aria-labelledby="next-visit-title"
    >
      <h2
        id="next-visit-title"
        className="text-[20px] font-black leading-tight text-[#071747]"
      >
        다음 방문 예정
      </h2>

      <article className="mt-4 grid min-h-[120px] grid-cols-[74px_minmax(0,1fr)_82px] items-center gap-4 rounded-[12px] border border-[#dfe8f5] bg-white px-3 py-4 shadow-[0_8px_16px_rgba(37,72,125,0.05)]">
        <img
          src={`${workerAssetBase}/달력2.png`}
          alt=""
          className="h-[64px] w-[64px] object-contain"
          draggable="false"
        />
        <div className="min-w-0">
          <time className="text-[13px] font-bold leading-tight text-[#5f6f8e]">
            2024.05.22 (수) 10:00
          </time>
          <h3 className="mt-2 text-[15px] font-black leading-tight text-[#071747]">
            최복례 어르신
          </h3>
          <p className="mt-2 truncate text-[12px] font-bold leading-tight text-[#62718d]">
            서울 금천구 시흥대로 123
          </p>
          <p className="mt-2 truncate text-[12px] font-bold leading-tight text-[#62718d]">
            정기 방문 · 건강 및 영양 관리 상담
          </p>
        </div>
        <Link
          to="/worker/schedules"
          className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#0867f2] px-3 text-[13px] font-black text-white shadow-[0_9px_18px_rgba(8,103,242,0.24)] transition hover:bg-[#0057d8] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          일정 확인
        </Link>
      </article>
    </section>
  )
}

export function WorkerConsultationsPage() {
  const [activeFilter, setActiveFilter] = useState<ConsultationStatus | 'all'>(
    'all',
  )
  const [searchQuery, setSearchQuery] = useState('')

  const filteredRecords = useMemo(() => {
    return consultationRecords.filter((record) => {
      const matchesFilter =
        activeFilter === 'all' || record.status === activeFilter

      return matchesFilter && consultationMatchesSearch(record, searchQuery)
    })
  }, [activeFilter, searchQuery])

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#f8fbff] text-[#071747]">
      <WorkerConsultationTopBar />

      <div className="mx-auto grid w-full max-w-[1600px] gap-7 px-5 py-7 lg:px-8 xl:grid-cols-[minmax(0,1034px)_456px] xl:items-start">
        <div className="grid min-w-0 gap-5">
          <section
            className="px-1 pt-3"
            aria-labelledby="worker-consultation-title"
          >
            <h1
              id="worker-consultation-title"
              className="break-keep text-[30px] font-black leading-tight text-[#071747] sm:text-[32px]"
            >
              상담 관리
            </h1>
            <p className="mt-3 text-[15px] font-bold leading-snug text-[#425371]">
              어르신과의 상담 내용을 기록하고 체계적으로 관리하세요.
            </p>
          </section>

          <section
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            aria-label="상담 관리 요약"
          >
            {metricCards.map((metric) => (
              <MetricSummaryCard key={metric.id} metric={metric} />
            ))}
          </section>

          <ConsultationRecordPanel
            activeFilter={activeFilter}
            filteredRecords={filteredRecords}
            onFilterChange={setActiveFilter}
            onSearchChange={setSearchQuery}
            searchQuery={searchQuery}
          />
        </div>

        <aside className="grid gap-5" aria-label="상담 관리 보조 정보">
          <QuickTemplatePanel />
          <RecentMemoPanel />
          <NextVisitPanel />
        </aside>
      </div>

      <span className="sr-only" aria-live="polite">
        {filteredRecords.length}건의 상담 기록이 표시됩니다.
      </span>
    </main>
  )
}
