import {
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  FileText,
  Filter,
  Search,
  TriangleAlert,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { caregiverTopNavItems } from '../../components/worker/caregiverTopNavigation'
import { cn } from '../../lib/utils'

const visitAssetBase = '/assets/dolbomon/welfare-visit'
const dashboardAssetBase = '/assets/dolbomon/worker-dashboard'

type RecordStatus = 'caution' | 'completed' | 'draft' | 'risk'

type RecordFilter = RecordStatus | 'all' | 'missing'

type MetricCard = {
  iconSrc: string
  id: string
  label: string
  tone: 'blue' | 'green' | 'red'
  unit: string
  value: string
}

type VisitRecord = {
  actionLabel: string
  avatarSrc: string
  elderId: string
  elderName: string
  status: RecordStatus
  summary: string
  type: string
  visitedAt: string
}

type ProgressItem = {
  color: string
  id: string
  label: string
  percent: string
  value: string
}

type RecentMemo = {
  body: string
  elderName: string
  icon: typeof TriangleAlert
  id: string
  time: string
  tone: 'blue' | 'orange' | 'red'
}

const metricCards: MetricCard[] = [
  {
    iconSrc: `${visitAssetBase}/체크.png`,
    id: 'all',
    label: '전체 기록',
    tone: 'blue',
    unit: '건',
    value: '18',
  },
  {
    iconSrc: `${visitAssetBase}/펜.png`,
    id: 'missing',
    label: '미작성',
    tone: 'blue',
    unit: '건',
    value: '4',
  },
  {
    iconSrc: `${visitAssetBase}/체크보안.png`,
    id: 'completed',
    label: '작성 완료',
    tone: 'green',
    unit: '건',
    value: '11',
  },
  {
    iconSrc: `${visitAssetBase}/경고.png`,
    id: 'risk',
    label: '위험 기록',
    tone: 'red',
    unit: '건',
    value: '3',
  },
]

const filterItems: Array<{ label: string; value: RecordFilter }> = [
  { label: '전체', value: 'all' },
  { label: '미작성', value: 'missing' },
  { label: '작성 완료', value: 'completed' },
  { label: '위험', value: 'risk' },
  { label: '임시 저장', value: 'draft' },
]

const visitRecords: VisitRecord[] = [
  {
    actionLabel: '기록 작성',
    avatarSrc: `${dashboardAssetBase}/어르신3.png`,
    elderId: 'kim-yeongja',
    elderName: '김영자님',
    status: 'risk',
    summary: '식사량이 줄고 수면 중 자주 깨는 편입니다.',
    type: '방문 관찰 기록',
    visitedAt: '2025.05.31 10:30',
  },
  {
    actionLabel: '기록 작성',
    avatarSrc: `${dashboardAssetBase}/어르신4.png`,
    elderId: 'lee-sunja',
    elderName: '이순자님',
    status: 'caution',
    summary: '복약 시간 다소 불규칙, 혈압 확인 필요.',
    type: '방문 관찰 기록',
    visitedAt: '2025.05.31 11:30',
  },
  {
    actionLabel: '기록 보기',
    avatarSrc: `${dashboardAssetBase}/어르신1.png`,
    elderId: 'park-cheolsu',
    elderName: '박철수님',
    status: 'completed',
    summary: '식사와 활동 상태가 안정적입니다.',
    type: '방문 관찰 기록',
    visitedAt: '2025.05.31 09:00',
  },
  {
    actionLabel: '기록 작성',
    avatarSrc: `${dashboardAssetBase}/어르신2.png`,
    elderId: 'choi-bokrye',
    elderName: '최복례님',
    status: 'caution',
    summary: '가벼운 어지럼증과 피로감 호소.',
    type: '방문 관찰 기록',
    visitedAt: '2025.05.30 14:10',
  },
  {
    actionLabel: '이어쓰기',
    avatarSrc: `${dashboardAssetBase}/elder-park-cheolsu.png`,
    elderId: 'kim-taehwan',
    elderName: '김태환님',
    status: 'draft',
    summary: '병원 동행 후 약 복용 확인.',
    type: '방문 관찰 기록',
    visitedAt: '2025.05.30 15:00',
  },
]

const progressItems: ProgressItem[] = [
  {
    color: '#22b65f',
    id: 'completed',
    label: '작성 완료',
    percent: '61%',
    value: '11건',
  },
  {
    color: '#126cf3',
    id: 'missing',
    label: '미작성',
    percent: '22%',
    value: '4건',
  },
  {
    color: '#ff3434',
    id: 'risk',
    label: '위험',
    percent: '17%',
    value: '3건',
  },
]

const recentMemos: RecentMemo[] = [
  {
    body: '어르신 수면 중 호흡 불규칙 관찰되어 보호자께 안내드렸습니다.',
    elderName: '김영자님',
    icon: TriangleAlert,
    id: 'memo-kim',
    time: '05.31 10:45',
    tone: 'red',
  },
  {
    body: '혈압 측정 결과 평소보다 높아 복약 시간 조정 권유.',
    elderName: '이순자님',
    icon: CircleAlert,
    id: 'memo-lee',
    time: '05.31 11:35',
    tone: 'orange',
  },
  {
    body: '산책 후 기분이 좋아 보였고 식사량도 양호했습니다.',
    elderName: '박철수님',
    icon: FileText,
    id: 'memo-park',
    time: '05.31 09:20',
    tone: 'blue',
  },
]

const metricValueClass: Record<MetricCard['tone'], string> = {
  blue: 'text-[#0867f2]',
  green: 'text-[#159447]',
  red: 'text-[#ee2929]',
}

const statusStyles: Record<
  RecordStatus,
  {
    action: string
    badge: string
    label: string
  }
> = {
  caution: {
    action: 'bg-[#0867f2] text-white hover:bg-[#0057d8]',
    badge: 'bg-[#fff2e6] text-[#f07800]',
    label: '주의',
  },
  completed: {
    action:
      'border border-[#cdddf4] bg-white text-[#0867f2] shadow-[0_6px_14px_rgba(37,72,125,0.04)] hover:bg-[#f5f9ff]',
    badge: 'bg-[#e9f8ee] text-[#159447]',
    label: '작성 완료',
  },
  draft: {
    action: 'bg-[#0867f2] text-white hover:bg-[#0057d8]',
    badge: 'bg-[#e7f1ff] text-[#1767cf]',
    label: '임시 저장',
  },
  risk: {
    action: 'bg-[#0867f2] text-white hover:bg-[#0057d8]',
    badge: 'bg-[#fff0f0] text-[#ef2f43]',
    label: '위험',
  },
}

const memoToneClass: Record<RecentMemo['tone'], string> = {
  blue: 'bg-[#2e75f8] text-white',
  orange: 'bg-[#ff8708] text-white',
  red: 'bg-[#ff3c45] text-white',
}

function normalizeSearch(value: string) {
  return value.trim().toLocaleLowerCase('ko-KR')
}

function recordMatchesFilter(record: VisitRecord, filter: RecordFilter) {
  if (filter === 'all') {
    return true
  }

  if (filter === 'missing') {
    return record.status === 'risk' || record.status === 'caution'
  }

  return record.status === filter
}

function recordMatchesSearch(record: VisitRecord, searchQuery: string) {
  const keyword = normalizeSearch(searchQuery)

  if (!keyword) {
    return true
  }

  return [
    record.elderName,
    record.visitedAt,
    record.type,
    record.summary,
    statusStyles[record.status].label,
  ]
    .map(normalizeSearch)
    .join(' ')
    .includes(keyword)
}

function CaregiverRecordTopBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#e1e8f3] bg-white/96 shadow-[0_5px_18px_rgba(32,70,130,0.05)] backdrop-blur">
      <div className="mx-auto grid min-h-[76px] w-full max-w-[1720px] grid-cols-[auto_auto] items-center gap-x-4 gap-y-2 px-5 py-2 lg:grid-cols-[210px_minmax(0,1fr)_auto] lg:px-10">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center text-[30px] font-black leading-none text-[#0867f2] drop-shadow-[0_5px_10px_rgba(8,103,242,0.14)] focus-visible:rounded-lg lg:text-[38px]"
          aria-label="돌봄ON 홈"
        >
          돌봄ON
        </Link>

        <nav
          className="col-span-2 row-start-2 flex min-w-0 flex-wrap gap-x-2 gap-y-1 overflow-visible pb-2 text-[15px] font-black text-[#101a3d] lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:flex-nowrap lg:justify-self-center lg:gap-8 lg:pb-0"
          aria-label="요양사 메뉴"
        >
          {caregiverTopNavItems.map((item) => {
            const isActive = item.href === '/caregiver/records'

            return (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  'relative inline-flex min-h-11 shrink-0 items-center justify-center px-2 transition hover:text-[#0867f2] focus-visible:rounded-lg',
                  isActive ? 'text-[#0867f2]' : 'text-[#101a3d]',
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
              src={`${dashboardAssetBase}/요양사.png`}
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
      className="grid min-h-[146px] grid-cols-[102px_minmax(0,1fr)] items-center gap-4 rounded-[14px] border border-[#dfe8f5] bg-white px-5 py-4 shadow-[0_12px_28px_rgba(37,72,125,0.08)]"
      aria-label={`${metric.label} ${metric.value}${metric.unit}`}
    >
      <img
        src={metric.iconSrc}
        alt=""
        className="h-[90px] w-[90px] object-contain"
        draggable="false"
      />
      <div className="min-w-0 text-center">
        <h2 className="break-keep text-[17px] font-black leading-tight text-[#071747]">
          {metric.label}
        </h2>
        <p
          className={cn(
            'mt-3 whitespace-nowrap',
            metricValueClass[metric.tone],
          )}
        >
          <strong className="text-[43px] font-black leading-none">
            {metric.value}
          </strong>
          <span className="ml-1 text-[19px] font-black">{metric.unit}</span>
        </p>
      </div>
    </article>
  )
}

function RecordControls({
  activeFilter,
  onFilterChange,
  onSearchChange,
  searchQuery,
}: {
  activeFilter: RecordFilter
  onFilterChange: (filter: RecordFilter) => void
  onSearchChange: (value: string) => void
  searchQuery: string
}) {
  return (
    <section
      className="mt-2 grid gap-3 xl:grid-cols-[354px_minmax(0,1fr)_248px]"
      aria-label="방문 기록 검색 및 필터"
    >
      <label className="relative block">
        <span className="sr-only">방문 기록 검색</span>
        <Search
          aria-hidden="true"
          className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#53678c]"
          strokeWidth={2.5}
        />
        <input
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          className="h-[50px] w-full rounded-[10px] border border-[#d5dfec] bg-white py-0 pl-12 pr-4 text-[16px] font-bold text-[#071747] shadow-[0_8px_18px_rgba(37,72,125,0.04)] placeholder:text-[#7b89a2] focus:border-[#0867f2] focus:outline focus:outline-4 focus:outline-[#d7e8ff]"
          placeholder="이름, 날짜, 내용으로 검색하세요."
          type="search"
        />
      </label>

      <div
        className="flex min-w-0 flex-wrap items-center gap-2"
        aria-label="기록 상태 필터"
        role="group"
      >
        {filterItems.map((item) => {
          const isActive = activeFilter === item.value

          return (
            <button
              key={item.value}
              type="button"
              className={cn(
                'inline-flex min-h-[42px] shrink-0 items-center justify-center rounded-full border px-4 text-[15px] font-black shadow-[0_6px_14px_rgba(37,72,125,0.04)] transition focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]',
                isActive
                  ? 'border-[#0867f2] bg-[#0867f2] text-white shadow-[0_10px_20px_rgba(8,103,242,0.24)]'
                  : 'border-[#dfe8f5] bg-white text-[#1f2c48] hover:bg-[#f5f9ff]',
              )}
              aria-pressed={isActive}
              onClick={() => onFilterChange(item.value)}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-[10px] border border-[#dfe8f5] bg-white px-3 text-[15px] font-black text-[#1f2c48] shadow-[0_8px_18px_rgba(37,72,125,0.04)] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          <Filter aria-hidden="true" className="h-5 w-5" strokeWidth={2.5} />
          <span className="whitespace-nowrap">필터</span>
          <ChevronDown
            aria-hidden="true"
            className="h-4 w-4"
            strokeWidth={2.8}
          />
        </button>
        <button
          type="button"
          className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-[10px] border border-[#dfe8f5] bg-white px-3 text-[15px] font-black text-[#1f2c48] shadow-[0_8px_18px_rgba(37,72,125,0.04)] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          <CalendarDays
            aria-hidden="true"
            className="h-5 w-5"
            strokeWidth={2.5}
          />
          <span className="whitespace-nowrap">오늘</span>
          <ChevronDown
            aria-hidden="true"
            className="h-4 w-4"
            strokeWidth={2.8}
          />
        </button>
      </div>
    </section>
  )
}

function RecordStatusBadge({ status }: { status: RecordStatus }) {
  const style = statusStyles[status]

  return (
    <span
      className={cn(
        'inline-flex min-h-8 items-center justify-center rounded-full px-3 text-[14px] font-black',
        style.badge,
      )}
    >
      {style.label}
    </span>
  )
}

function RecordActionLink({ record }: { record: VisitRecord }) {
  const style = statusStyles[record.status]
  const actionHref =
    record.status === 'completed'
      ? '/caregiver/records'
      : `/caregiver/elders/${record.elderId}/visit-record`

  return (
    <Link
      to={actionHref}
      className={cn(
        'inline-flex min-h-10 items-center justify-center rounded-lg px-4 text-[15px] font-black shadow-[0_10px_20px_rgba(8,103,242,0.23)] transition focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]',
        style.action,
      )}
    >
      {record.actionLabel}
    </Link>
  )
}

function RecordTable({ records }: { records: VisitRecord[] }) {
  return (
    <section
      className="overflow-hidden rounded-[12px] border border-[#dfe8f5] bg-white shadow-[0_12px_28px_rgba(37,72,125,0.08)]"
      aria-label="방문 기록 목록"
    >
      <div className="hidden min-h-[44px] grid-cols-[184px_180px_146px_minmax(240px,1fr)_112px_200px] items-center border-b border-[#dfe8f5] bg-[#fbfdff] px-5 text-[14px] font-black text-[#425371] lg:grid">
        <span>어르신</span>
        <span>방문 일시</span>
        <span>방문 유형</span>
        <span>기록 요약</span>
        <span className="text-center">상태</span>
        <span className="text-center">관리</span>
      </div>

      <div className="divide-y divide-[#e3eaf5]">
        {records.map((record) => (
          <article
            key={`${record.elderId}-${record.visitedAt}`}
            className="grid gap-4 px-4 py-4 lg:min-h-[77px] lg:grid-cols-[184px_180px_146px_minmax(240px,1fr)_112px_200px] lg:items-center lg:gap-0 lg:px-5 lg:py-2"
          >
            <div className="flex min-w-0 items-center gap-4">
              <img
                src={record.avatarSrc}
                alt={`${record.elderName} 프로필`}
                className="h-[56px] w-[56px] shrink-0 rounded-full bg-[#f2f6ff] object-cover shadow-[0_8px_18px_rgba(47,86,145,0.14)]"
                draggable="false"
              />
              <h3 className="truncate text-[16px] font-black leading-tight text-[#071747]">
                {record.elderName}
              </h3>
            </div>

            <time className="text-[15px] font-bold text-[#1f2c48]">
              {record.visitedAt}
            </time>
            <p className="text-[15px] font-bold text-[#1f2c48]">
              {record.type}
            </p>
            <p className="text-[15px] font-bold leading-snug text-[#1f2c48]">
              {record.summary}
            </p>
            <div className="flex justify-start lg:justify-center">
              <RecordStatusBadge status={record.status} />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center sm:justify-start lg:justify-end">
              <Link
                to={`/caregiver/elders/${record.elderId}`}
                className="inline-flex min-h-10 items-center justify-center rounded-lg border border-[#dbe5f3] bg-white px-4 text-[15px] font-black text-[#1f2c48] shadow-[0_6px_14px_rgba(37,72,125,0.04)] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
              >
                상세 보기
              </Link>
              <RecordActionLink record={record} />
            </div>
          </article>
        ))}
      </div>

      {records.length === 0 ? (
        <p className="px-5 py-10 text-center text-[17px] font-black text-[#425371]">
          조건에 맞는 방문 기록이 없어요.
        </p>
      ) : null}
    </section>
  )
}

function RecordProgressPanel() {
  return (
    <section
      className="relative overflow-hidden rounded-[16px] border border-[#dfe8f5] bg-white p-5 shadow-[0_14px_32px_rgba(37,72,125,0.08)]"
      aria-labelledby="record-progress-title"
    >
      <div className="flex min-h-[70px] items-start justify-between gap-3">
        <h2
          id="record-progress-title"
          className="text-[23px] font-black leading-tight text-[#071747]"
        >
          기록 진행 현황
        </h2>
        <img
          src={`${visitAssetBase}/확인.png`}
          alt=""
          className="-mr-1 -mt-2 h-[94px] w-[94px] object-contain"
          draggable="false"
        />
      </div>

      <div className="mt-1 grid gap-5 md:grid-cols-[170px_minmax(0,1fr)] md:items-center xl:grid-cols-[168px_minmax(0,1fr)]">
        <div className="relative mx-auto h-[154px] w-[154px]">
          <div
            className="absolute inset-0 rounded-full shadow-[inset_0_-9px_0_rgba(7,23,71,0.14),0_16px_22px_rgba(37,72,125,0.14)]"
            style={{
              background:
                'conic-gradient(from 222deg, #ff4c4c 0 17%, #2b72f6 17% 39%, #48c96a 39% 100%)',
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-[44px] rounded-full bg-white shadow-[inset_0_8px_14px_rgba(37,72,125,0.08)]" />
          <span className="sr-only">작성 완료 61%, 미작성 22%, 위험 17%</span>
        </div>

        <dl className="grid gap-4">
          {progressItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[14px_minmax(0,1fr)_auto] items-center gap-3 border-b border-[#e3eaf5] pb-3 last:border-b-0 last:pb-0"
            >
              <dt className="contents">
                <span
                  className="h-3 w-3 rounded-full shadow-[0_2px_6px_rgba(37,72,125,0.18)]"
                  style={{ backgroundColor: item.color }}
                  aria-hidden="true"
                />
                <span className="text-[14px] font-bold text-[#425371]">
                  {item.label}
                </span>
              </dt>
              <dd className="whitespace-nowrap text-[15px] font-black text-[#071747]">
                {item.value}
                <span className="ml-3 font-bold text-[#6a7891]">
                  ({item.percent})
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function RecentMemoPanel() {
  return (
    <section
      className="rounded-[16px] border border-[#dfe8f5] bg-white p-5 shadow-[0_14px_32px_rgba(37,72,125,0.08)]"
      aria-labelledby="recent-visit-memo-title"
    >
      <div className="flex items-center justify-between gap-3">
        <h2
          id="recent-visit-memo-title"
          className="text-[23px] font-black leading-tight text-[#071747]"
        >
          최근 방문 메모
        </h2>
        <Link
          to="/caregiver/records"
          className="inline-flex min-h-9 items-center rounded-lg px-2 text-[14px] font-black text-[#0867f2] transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          전체 메모 보기
        </Link>
      </div>

      <div className="mt-4 grid gap-3">
        {recentMemos.map((memo) => {
          const Icon = memo.icon

          return (
            <article
              key={memo.id}
              className="grid grid-cols-[28px_minmax(0,1fr)_82px] gap-3 rounded-[10px] border border-[#e1e8f3] bg-white px-3 py-2 shadow-[0_8px_18px_rgba(37,72,125,0.04)]"
            >
              <span
                className={cn(
                  'mt-0.5 grid h-6 w-6 place-items-center rounded-md',
                  memoToneClass[memo.tone],
                )}
              >
                <Icon
                  aria-hidden="true"
                  className="h-4 w-4"
                  strokeWidth={2.8}
                />
              </span>
              <div className="min-w-0">
                <h3 className="text-[14px] font-black leading-tight text-[#071747]">
                  {memo.elderName}
                </h3>
                <p className="mt-1 text-[13px] font-bold leading-snug text-[#1f2c48]">
                  {memo.body}
                </p>
              </div>
              <time className="mt-0.5 whitespace-nowrap text-right text-[12px] font-bold text-[#6a7891]">
                {memo.time}
              </time>
            </article>
          )
        })}
      </div>

      <Link
        to="/caregiver/records"
        className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#dfe8f5] bg-white px-4 text-[15px] font-black text-[#0867f2] shadow-[0_7px_16px_rgba(37,72,125,0.04)] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
      >
        전체 메모 보기
        <ChevronRight
          aria-hidden="true"
          className="h-5 w-5"
          strokeWidth={2.8}
        />
      </Link>
    </section>
  )
}

export function CaregiverVisitRecordsPage() {
  const [activeFilter, setActiveFilter] = useState<RecordFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredRecords = useMemo(() => {
    return visitRecords.filter((record) => {
      return (
        recordMatchesFilter(record, activeFilter) &&
        recordMatchesSearch(record, searchQuery)
      )
    })
  }, [activeFilter, searchQuery])

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#f8fbff] text-[#071747]">
      <CaregiverRecordTopBar />

      <div className="mx-auto grid w-full max-w-[1604px] gap-8 px-5 py-4 lg:px-9 xl:grid-cols-[minmax(0,1120px)_436px] xl:items-start xl:gap-x-12 xl:px-0">
        <div className="grid min-w-0 gap-5">
          <section aria-labelledby="caregiver-record-title">
            <h1
              id="caregiver-record-title"
              className="break-keep text-[34px] font-black leading-tight text-[#071747] lg:text-[42px]"
            >
              방문 기록 관리
            </h1>
            <p className="mt-3 text-[16px] font-bold leading-snug text-[#1f2c48]">
              작성 완료, 미작성, 위험 기록을 확인하고 방문 기록을 관리하세요.
            </p>
          </section>

          <section
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            aria-label="방문 기록 요약"
          >
            {metricCards.map((metric) => (
              <MetricSummaryCard key={metric.id} metric={metric} />
            ))}
          </section>

          <RecordControls
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            onSearchChange={setSearchQuery}
            searchQuery={searchQuery}
          />

          <RecordTable records={filteredRecords} />
        </div>

        <aside
          className="grid gap-6 xl:pt-[72px]"
          aria-label="방문 기록 보조 정보"
        >
          <RecordProgressPanel />
          <RecentMemoPanel />
        </aside>
      </div>
    </main>
  )
}
