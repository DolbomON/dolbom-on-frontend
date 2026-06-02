import {
  Bell,
  CalendarDays,
  CalendarRange,
  ChevronDown,
  Clock3,
  Filter,
  Flag,
  House,
  Map,
  MapPin,
  Navigation,
  Phone,
  Plus,
  Route,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { caregiverTopNavItems } from '../../components/worker/caregiverTopNavigation'
import { cn } from '../../lib/utils'

const visitAssetBase = '/assets/dolbomon/welfare-visit'
const elderAssetBase = '/assets/dolbomon/worker-elders'
const workerProfileSrc = '/assets/dolbomon/worker-mypage/worker-lee-bokji.png'

type VisitStatus = 'completed' | 'inProgress' | 'scheduled' | 'warning'

type MetricCard = {
  iconSrc: string
  id: string
  label: string
  tone: 'blue' | 'green' | 'orange'
  unit: string
  value: string
}

type VisitItem = {
  address: string
  age: number
  avatarSrc: string
  elderId: string
  gender: '남' | '여'
  name: string
  orderLabel: string
  request: string
  status: VisitStatus
  timeRange: string
}

type MemoItem = {
  body: string
  elderName: string
  id: string
  severity: 'normal' | 'warning'
  timeLabel: string
}

type ScheduleTab = 'calendar' | 'today' | 'week'

const metricCards: MetricCard[] = [
  {
    iconSrc: `${visitAssetBase}/달력.png`,
    id: 'today',
    label: '오늘 방문',
    tone: 'blue',
    unit: '건',
    value: '5',
  },
  {
    iconSrc: `${visitAssetBase}/시계.png`,
    id: 'active',
    label: '진행 중',
    tone: 'green',
    unit: '건',
    value: '1',
  },
  {
    iconSrc: `${visitAssetBase}/보안.png`,
    id: 'done',
    label: '완료',
    tone: 'blue',
    unit: '건',
    value: '2',
  },
  {
    iconSrc: `${visitAssetBase}/주의.png`,
    id: 'caution',
    label: '주의 대상',
    tone: 'orange',
    unit: '건',
    value: '1',
  },
]

const todayVisits: VisitItem[] = [
  {
    address: '서울특별시 강남구 도산대로 123, 101동 502호',
    age: 82,
    avatarSrc: `${elderAssetBase}/elder-kim-yeongja.png`,
    elderId: 'kim-yeongja',
    gender: '여',
    name: '김영자님',
    orderLabel: '1번째 방문',
    request: '식사량과 복약 여부 확인',
    status: 'scheduled',
    timeRange: '10:30 ~ 11:10',
  },
  {
    address: '서울특별시 서초구 반포대로 45, 3동 1201호',
    age: 79,
    avatarSrc: `${elderAssetBase}/elder-lee-sunja.png`,
    elderId: 'lee-sunja',
    gender: '여',
    name: '이순자님',
    orderLabel: '2번째 방문',
    request: '혈압 측정 및 건강 상태 확인',
    status: 'inProgress',
    timeRange: '11:30 ~ 12:10',
  },
  {
    address: '서울특별시 강남구 개포로 110, 5동 803호',
    age: 85,
    avatarSrc: `${elderAssetBase}/elder-park-cheolsu.png`,
    elderId: 'park-cheolsu',
    gender: '남',
    name: '박철수님',
    orderLabel: '완료',
    request: '식사량 기록 및 운동 도움',
    status: 'completed',
    timeRange: '09:00 ~ 09:40',
  },
  {
    address: '서울특별시 송파구 마천로 12, 201동 1502호',
    age: 87,
    avatarSrc: `${elderAssetBase}/elder-choi-bokrye.png`,
    elderId: 'choi-bokrye',
    gender: '여',
    name: '최복례님',
    orderLabel: '4번째 방문',
    request: '복약 확인 및 정서 지원',
    status: 'warning',
    timeRange: '13:30 ~ 14:10',
  },
  {
    address: '서울특별시 강동구 고덕로 210, 7동 701호',
    age: 81,
    avatarSrc: `${elderAssetBase}/elder-park-cheolsu.png`,
    elderId: 'kim-taehwan',
    gender: '남',
    name: '김태환님',
    orderLabel: '5번째 방문',
    request: '병원 진료 동행',
    status: 'scheduled',
    timeRange: '15:00 ~ 15:40',
  },
]

const routeSummaries = [
  {
    icon: Clock3,
    label: '총 이동 시간',
    value: '1시간 35분',
  },
  {
    icon: House,
    label: '첫 방문',
    value: '10:30 김영자님',
  },
  {
    icon: Navigation,
    label: '마지막 방문',
    value: '15:00 김태환님',
  },
  {
    icon: Route,
    label: '총 이동 거리',
    value: '18.6 km',
  },
]

const memoItems: MemoItem[] = [
  {
    body: '약 복용을 가끔 잊으시는 편입니다. 복약 여부를 꼭 확인해주세요.',
    elderName: '최복례님',
    id: 'memo-choi',
    severity: 'warning',
    timeLabel: '어제 17:30',
  },
  {
    body: '최근 혈압이 다소 높게 측정되었습니다. 식단과 휴식 상태도 함께 확인 부탁드립니다.',
    elderName: '이순자님',
    id: 'memo-lee',
    severity: 'normal',
    timeLabel: '어제 16:20',
  },
]

const tabItems: Array<{
  icon: typeof CalendarDays
  label: string
  value: ScheduleTab
}> = [
  { icon: CalendarDays, label: '오늘', value: 'today' },
  { icon: CalendarRange, label: '이번 주', value: 'week' },
  { icon: CalendarDays, label: '캘린더', value: 'calendar' },
]

const statusStyles: Record<
  VisitStatus,
  {
    accent: string
    orderBadge: string
    rowLabel: string
    statusBadge: string
  }
> = {
  completed: {
    accent: 'bg-[#a3acb8]',
    orderBadge: 'bg-[#eef1f4] text-[#445166]',
    rowLabel: '완료',
    statusBadge: 'bg-[#eef1f4] text-[#1f2937]',
  },
  inProgress: {
    accent: 'bg-[#22b964]',
    orderBadge: 'bg-[#e8f9ef] text-[#15803d]',
    rowLabel: '방문중',
    statusBadge: 'bg-[#daf7e4] text-[#147d3d]',
  },
  scheduled: {
    accent: 'bg-[#0867f2]',
    orderBadge: 'bg-[#e8f2ff] text-[#0867f2]',
    rowLabel: '예정',
    statusBadge: 'bg-[#e8f2ff] text-[#0867f2]',
  },
  warning: {
    accent: 'bg-[#ff8b00]',
    orderBadge: 'bg-[#fff1e0] text-[#e56f00]',
    rowLabel: '주의',
    statusBadge: 'bg-[#fff1e0] text-[#e56f00]',
  },
}

const metricValueClass: Record<MetricCard['tone'], string> = {
  blue: 'text-[#0867f2]',
  green: 'text-[#169444]',
  orange: 'text-[#ef7a00]',
}

const memoBadgeClass: Record<MemoItem['severity'], string> = {
  normal: 'bg-[#e8f2ff] text-[#0867f2]',
  warning: 'bg-[#ffe9ec] text-[#ef2f43]',
}

function CaregiverVisitTopBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#e1e8f3] bg-white/96 shadow-[0_5px_18px_rgba(32,70,130,0.05)] backdrop-blur">
      <div className="mx-auto grid min-h-[76px] w-full max-w-[1800px] grid-cols-[auto_auto] items-center gap-x-4 gap-y-2 px-5 py-2 lg:grid-cols-[210px_minmax(0,1fr)_auto] lg:px-10">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center text-[30px] font-black leading-none text-[#0867f2] drop-shadow-[0_5px_10px_rgba(8,103,242,0.14)] focus-visible:rounded-lg lg:text-[38px]"
          aria-label="돌봄ON 홈"
        >
          돌봄ON
        </Link>

        <nav
          className="col-span-2 row-start-2 flex min-w-0 gap-2 overflow-x-auto text-[15px] font-black text-[#101a3d] [-ms-overflow-style:none] [scrollbar-width:none] lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:justify-self-center lg:gap-8 [&::-webkit-scrollbar]:hidden"
          aria-label="요양사 메뉴"
        >
          {caregiverTopNavItems.map((item) => {
            const isActive = item.href === '/caregiver/schedules'

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
            to="/worker/mypage"
            className="hidden min-h-12 items-center gap-3 rounded-lg px-1.5 py-1 transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff] min-[560px]:inline-flex"
            aria-label="김민수 요양사 프로필 보기"
          >
            <img
              src={workerProfileSrc}
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
      className="grid min-h-[138px] grid-cols-[94px_minmax(0,1fr)] items-center gap-4 rounded-[14px] border border-[#dfe8f5] bg-white px-5 py-4 shadow-[0_12px_28px_rgba(37,72,125,0.08)]"
      aria-label={`${metric.label} ${metric.value}${metric.unit}`}
    >
      <img
        src={metric.iconSrc}
        alt=""
        className="h-[90px] w-[90px] scale-110 object-contain"
        draggable="false"
      />
      <div className="min-w-0 text-center">
        <h2 className="break-keep text-[16px] font-black leading-tight text-[#071747]">
          {metric.label}
        </h2>
        <p
          className={cn(
            'mt-3 whitespace-nowrap',
            metricValueClass[metric.tone],
          )}
        >
          <strong className="text-[40px] font-black leading-none">
            {metric.value}
          </strong>
          <span className="ml-1 text-[18px] font-black">{metric.unit}</span>
        </p>
      </div>
    </article>
  )
}

function ScheduleTabs({
  activeTab,
  onTabChange,
}: {
  activeTab: ScheduleTab
  onTabChange: (tab: ScheduleTab) => void
}) {
  return (
    <div className="grid gap-3 border-b border-[#dfe8f5] pb-2 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
      <div
        className="flex min-w-0 gap-4 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="방문 일정 보기"
      >
        {tabItems.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.value

          return (
            <button
              key={tab.value}
              type="button"
              className={cn(
                'relative inline-flex min-h-11 shrink-0 items-center gap-2 px-3 text-[16px] font-black transition focus-visible:rounded-lg',
                isActive
                  ? 'text-[#0867f2]'
                  : 'text-[#33415f] hover:text-[#0867f2]',
              )}
              role="tab"
              aria-selected={isActive}
              onClick={() => onTabChange(tab.value)}
            >
              <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={2.6} />
              {tab.label}
              {isActive ? (
                <span
                  className="absolute bottom-[-9px] left-0 right-0 h-1 rounded-full bg-[#0867f2]"
                  aria-hidden="true"
                />
              ) : null}
            </button>
          )
        })}
      </div>

      <button
        type="button"
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#dfe8f5] bg-white px-4 text-[14px] font-black text-[#1f2c48] shadow-[0_7px_16px_rgba(37,72,125,0.05)] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff] md:justify-self-end"
      >
        <Filter aria-hidden="true" className="h-5 w-5" strokeWidth={2.5} />
        필터
        <ChevronDown aria-hidden="true" className="h-4 w-4" strokeWidth={2.8} />
      </button>
    </div>
  )
}

function VisitScheduleRow({ visit }: { visit: VisitItem }) {
  const style = statusStyles[visit.status]
  const primaryActionLabel =
    visit.status === 'completed' ? '기록 보기' : '방문 시작'

  return (
    <article className="grid gap-4 rounded-[12px] border border-[#dfe8f5] bg-white px-4 py-4 shadow-[0_8px_18px_rgba(37,72,125,0.06)] lg:grid-cols-[188px_minmax(0,1fr)_424px] lg:items-center lg:gap-0 lg:px-5 lg:py-1.5">
      <div className="flex min-w-0 items-center gap-4 lg:border-r lg:border-[#e3eaf5] lg:pr-5">
        <span
          className={cn('h-[54px] w-0.5 shrink-0 rounded-full', style.accent)}
          aria-hidden="true"
        />
        <div className="min-w-0">
          <time className="block whitespace-nowrap text-[22px] font-black leading-tight text-[#071747] lg:text-[19px]">
            {visit.timeRange}
          </time>
          <span
            className={cn(
              'mt-3 inline-flex min-h-7 items-center justify-center rounded-lg px-3 text-[13px] font-black',
              style.orderBadge,
            )}
          >
            {visit.orderLabel}
          </span>
        </div>
      </div>

      <div className="flex min-w-0 items-center gap-4 lg:px-5">
        <img
          src={visit.avatarSrc}
          alt={`${visit.name} 프로필`}
          className="h-[54px] w-[54px] shrink-0 rounded-full bg-[#f2f6ff] object-cover shadow-[0_8px_18px_rgba(47,86,145,0.14)]"
          draggable="false"
        />
        <div className="min-w-0">
          <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
            <h3 className="text-[18px] font-black leading-tight text-[#071747]">
              {visit.name}
            </h3>
            <span className="text-[13px] font-bold text-[#52627f]">
              {visit.age}세
            </span>
            <span className="text-[13px] font-bold text-[#52627f]">
              {visit.gender}
            </span>
          </div>
          <p className="mt-2 flex flex-wrap items-center gap-2 text-[14px] font-bold leading-snug text-[#425371]">
            <span className="inline-flex min-h-6 items-center gap-1 rounded-lg bg-[#eef3f8] px-2 text-[12px] font-black text-[#52627f]">
              <House aria-hidden="true" className="h-3.5 w-3.5" />
              방문
            </span>
            {visit.request}
          </p>
          <p className="mt-2 flex min-w-0 items-start gap-2 text-[13px] font-bold leading-snug text-[#60708e]">
            <MapPin
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 text-[#4e91ff]"
              fill="#4e91ff"
              strokeWidth={2.2}
            />
            <span className="line-clamp-2">{visit.address}</span>
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-[1fr_1fr_1fr] lg:grid-cols-[96px_112px_112px_120px] lg:items-center lg:justify-end">
        <span
          className={cn(
            'inline-flex min-h-8 items-center justify-center rounded-lg px-3 text-[13px] font-black',
            style.statusBadge,
          )}
        >
          {style.rowLabel}
        </span>
        <button
          type="button"
          className="inline-flex min-h-9 items-center justify-center gap-2 rounded-lg border border-[#dbe5f3] bg-white px-3 text-[14px] font-black text-[#1f2c48] shadow-[0_6px_14px_rgba(37,72,125,0.04)] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          <Map aria-hidden="true" className="h-5 w-5" strokeWidth={2.4} />
          길찾기
        </button>
        <a
          href="tel:01012345678"
          className="inline-flex min-h-9 items-center justify-center gap-2 rounded-lg border border-[#dbe5f3] bg-white px-3 text-[14px] font-black text-[#1f2c48] shadow-[0_6px_14px_rgba(37,72,125,0.04)] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          <Phone aria-hidden="true" className="h-5 w-5" strokeWidth={2.4} />
          전화하기
        </a>
        <Link
          to={`/worker/elders/${visit.elderId}/memo`}
          className={cn(
            'inline-flex min-h-9 items-center justify-center rounded-lg px-4 text-[14px] font-black shadow-[0_10px_20px_rgba(8,103,242,0.24)] transition focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]',
            visit.status === 'completed'
              ? 'border border-[#dbe5f3] bg-white text-[#1f2c48] shadow-[0_6px_14px_rgba(37,72,125,0.04)] hover:bg-[#f5f9ff]'
              : 'bg-[#0867f2] text-white hover:bg-[#0057d8]',
          )}
        >
          {primaryActionLabel}
        </Link>
      </div>
    </article>
  )
}

function RouteMapPreview() {
  const markers = [
    { label: '1', left: '42%', top: '30%' },
    { label: '2', left: '59%', top: '16%' },
    { label: '3', left: '72%', top: '43%' },
    { label: '4', left: '35%', top: '56%' },
    { label: '5', left: '18%', top: '78%' },
  ]

  return (
    <div
      className="relative min-h-[260px] overflow-hidden rounded-[18px] bg-[#eef2f7] shadow-inner"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-95"
        style={{
          backgroundImage:
            'linear-gradient(28deg, transparent 47%, #ffffff 48%, #ffffff 52%, transparent 53%), linear-gradient(116deg, transparent 45%, #ffffff 46%, #ffffff 50%, transparent 51%), linear-gradient(0deg, transparent 48%, #ffffff 49%, #ffffff 51%, transparent 52%), linear-gradient(63deg, transparent 52%, #dce5f0 53%, #dce5f0 56%, transparent 57%)',
          backgroundSize: '92px 72px, 120px 86px, 84px 68px, 130px 100px',
        }}
      />
      <div className="absolute -left-6 top-[42%] h-16 w-[58%] rotate-[-28deg] rounded-full bg-[#bfe2ff]" />
      <div className="absolute right-5 top-9 h-7 w-10 rotate-[-22deg] rounded-[8px] bg-[#b9e8b9]" />
      <div className="absolute left-16 top-20 h-6 w-9 rotate-[-28deg] rounded-[7px] bg-[#b9e8b9]" />
      <svg
        className="absolute inset-0 h-full w-full"
        fill="none"
        viewBox="0 0 280 260"
      >
        <path
          d="M52 208 L82 170 L117 154 L108 114 L146 92 L188 75 L211 116 L244 128"
          stroke="#2c73f6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        />
        <path
          d="M117 154 L153 137 L184 129"
          stroke="#2c73f6"
          strokeLinecap="round"
          strokeWidth="4"
        />
        <path
          d="M52 208 L82 170 L117 154 L108 114 L146 92 L188 75 L211 116 L244 128"
          stroke="#ffffff"
          strokeDasharray="1 14"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </svg>

      {markers.map((marker) => (
        <span
          key={marker.label}
          className="absolute grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#2b70f6] text-[15px] font-black text-white shadow-[0_8px_14px_rgba(27,100,230,0.3)] ring-4 ring-white"
          style={{ left: marker.left, top: marker.top }}
        >
          {marker.label}
        </span>
      ))}

      <span className="absolute bottom-0 right-5 grid h-20 w-24 place-items-center rounded-[42%] bg-gradient-to-b from-white to-[#dfe8f5] shadow-[0_16px_28px_rgba(40,70,116,0.18)]">
        <MapPin
          className="h-[86px] w-[86px] translate-y-[-16px] text-[#1c68ee] drop-shadow-[0_18px_14px_rgba(34,92,203,0.22)]"
          fill="#2f78ff"
          strokeWidth={1.9}
        />
      </span>
    </div>
  )
}

function RoutePanel() {
  return (
    <section
      className="rounded-[16px] border border-[#dfe8f5] bg-white p-5 shadow-[0_14px_32px_rgba(37,72,125,0.08)]"
      aria-labelledby="today-route-title"
    >
      <div className="mb-5 flex items-center gap-3">
        <Route aria-hidden="true" className="h-7 w-7 text-[#52627f]" />
        <h2
          id="today-route-title"
          className="text-[20px] font-black leading-tight text-[#071747]"
        >
          오늘 동선
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-[150px_minmax(0,1fr)] xl:grid-cols-[142px_minmax(0,1fr)]">
        <dl className="grid gap-4">
          {routeSummaries.map((item) => {
            const Icon = item.icon

            return (
              <div key={item.label} className="grid grid-cols-[28px_1fr] gap-3">
                <Icon
                  aria-hidden="true"
                  className="mt-0.5 h-6 w-6 text-[#52627f]"
                  strokeWidth={2.4}
                />
                <div>
                  <dt className="text-[14px] font-bold leading-tight text-[#425371]">
                    {item.label}
                  </dt>
                  <dd className="mt-1 break-keep text-[16px] font-black leading-snug text-[#071747]">
                    {item.value}
                  </dd>
                </div>
              </div>
            )
          })}
        </dl>

        <RouteMapPreview />
      </div>

      <p className="mt-4 text-[13px] font-bold leading-snug text-[#6a7891]">
        ※ 교통 상황에 따라 시간이 달라질 수 있습니다.
      </p>
    </section>
  )
}

function MemoPanel() {
  return (
    <section
      className="rounded-[16px] border border-[#dfe8f5] bg-white p-5 shadow-[0_14px_32px_rgba(37,72,125,0.08)]"
      aria-labelledby="worker-memo-title"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Flag aria-hidden="true" className="h-6 w-6 text-[#ff6f7c]" />
          <h2
            id="worker-memo-title"
            className="text-[20px] font-black leading-tight text-[#071747]"
          >
            복지사 요청 메모
          </h2>
        </div>
        <Link
          to="/caregiver/records"
          className="inline-flex min-h-8 items-center rounded-lg px-2 text-[13px] font-black text-[#0867f2] transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          더보기
        </Link>
      </div>

      <div className="mt-4 grid gap-3">
        {memoItems.map((memo) => (
          <article
            key={memo.id}
            className="rounded-[10px] border border-[#dfe8f5] bg-white px-4 py-3 shadow-[0_8px_18px_rgba(37,72,125,0.04)]"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className={cn(
                    'inline-flex min-h-7 items-center justify-center rounded-lg px-3 text-[12px] font-black',
                    memoBadgeClass[memo.severity],
                  )}
                >
                  {memo.severity === 'warning' ? '주의' : '일반'}
                </span>
                <h3 className="truncate text-[15px] font-black text-[#071747]">
                  {memo.elderName}
                </h3>
              </div>
              <time className="shrink-0 text-[12px] font-bold text-[#7a89a4]">
                {memo.timeLabel}
              </time>
            </div>
            <p className="mt-3 text-[14px] font-bold leading-relaxed text-[#071747]">
              {memo.body}
            </p>
          </article>
        ))}
      </div>

      <button
        type="button"
        className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#dfe8f5] bg-white px-4 text-[16px] font-black text-[#071747] shadow-[0_7px_16px_rgba(37,72,125,0.04)] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
      >
        <Plus aria-hidden="true" className="h-5 w-5" strokeWidth={2.7} />새 메모
        작성
      </button>
    </section>
  )
}

export function CaregiverVisitSchedulePage() {
  const [activeTab, setActiveTab] = useState<ScheduleTab>('today')

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#f8fbff] text-[#071747]">
      <CaregiverVisitTopBar />

      <div className="mx-auto grid w-full max-w-[1800px] gap-6 px-5 py-4 lg:px-10 xl:grid-cols-[minmax(0,1210px)_456px] xl:items-start">
        <div className="grid min-w-0 gap-5">
          <section aria-labelledby="caregiver-visit-title">
            <h1
              id="caregiver-visit-title"
              className="break-keep text-[34px] font-black leading-tight text-[#071747] lg:text-[42px]"
            >
              방문 일정
            </h1>
            <p className="mt-3 text-[16px] font-bold leading-snug text-[#425371]">
              오늘과 이번 주 방문 일정을 확인하고 방문을 시작하세요.
            </p>
          </section>

          <section
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            aria-label="방문 일정 요약"
          >
            {metricCards.map((metric) => (
              <MetricSummaryCard key={metric.id} metric={metric} />
            ))}
          </section>

          <section aria-label="방문 일정 목록">
            <ScheduleTabs activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="mt-2 grid gap-2">
              {todayVisits.map((visit) => (
                <VisitScheduleRow key={visit.elderId} visit={visit} />
              ))}
            </div>
          </section>
        </div>

        <aside
          className="grid gap-4 xl:pt-[50px]"
          aria-label="방문 일정 보조 정보"
        >
          <RoutePanel />
          <MemoPanel />
        </aside>
      </div>
    </main>
  )
}
