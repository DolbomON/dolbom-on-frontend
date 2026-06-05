import { ChevronDown, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { WorkerTopBar } from '../../components/worker/WorkerTopBar'
import { cn } from '../../lib/utils'

const welfareAssetBase = '/assets/dolbomon/welfare'
const elderAssetBase = '/assets/dolbomon/worker-elders'
const dashboardAssetBase = '/assets/dolbomon/worker-dashboard'
const workerProfileSrc = '/assets/dolbomon/worker-mypage/worker-lee-bokji.png'

type ScheduleKind = 'visit' | 'call' | 'meeting' | 'unassigned'

type MetricCard = {
  description: string
  iconSrc: string
  id: string
  label: string
  unit: string
  value: string
}

type CalendarCell = {
  count?: number
  date: number
  flags?: Array<'warning' | 'urgent'>
  month: 'current' | 'next' | 'previous'
}

type ScheduleItem = {
  avatarSrc: string
  assignee: string
  description: string
  id: string
  kind: ScheduleKind
  time: string
  title: string
}

type StaffItem = {
  avatarSrc: string
  count: number
  id: string
  name: string
  tone: 'balanced' | 'busy'
}

type UpcomingItem = {
  assignee: string
  dateLabel: string
  id: string
  kind: ScheduleKind
  time: string
  title: string
}

const metricCards: MetricCard[] = [
  {
    description: '예정된 방문',
    iconSrc: `${welfareAssetBase}/집.png`,
    id: 'visit',
    label: '오늘 방문',
    unit: '건',
    value: '9',
  },
  {
    description: '예정된 상담',
    iconSrc: `${welfareAssetBase}/채팅.png`,
    id: 'call',
    label: '전화 상담',
    unit: '건',
    value: '7',
  },
  {
    description: '예정된 회의',
    iconSrc: `${welfareAssetBase}/회의.png`,
    id: 'meeting',
    label: '회의',
    unit: '건',
    value: '3',
  },
  {
    description: '배정 필요',
    iconSrc: `${welfareAssetBase}/체크.png`,
    id: 'unassigned',
    label: '미배정 일정',
    unit: '건',
    value: '4',
  },
]

const calendarCells: CalendarCell[] = [
  { date: 28, month: 'previous' },
  { date: 29, month: 'previous' },
  { date: 30, month: 'previous' },
  { count: 3, date: 1, month: 'current' },
  { count: 2, date: 2, month: 'current' },
  { date: 3, month: 'current' },
  { count: 1, date: 4, month: 'current' },
  { date: 5, month: 'current' },
  { count: 4, date: 6, month: 'current' },
  { count: 2, date: 7, month: 'current' },
  { count: 5, date: 8, month: 'current' },
  { count: 2, date: 9, month: 'current' },
  { count: 3, date: 10, month: 'current' },
  { count: 2, date: 11, month: 'current' },
  { count: 1, date: 12, month: 'current' },
  { count: 3, date: 13, month: 'current' },
  { count: 2, date: 14, flags: ['warning'], month: 'current' },
  { count: 6, date: 15, month: 'current' },
  { count: 3, date: 16, month: 'current' },
  { count: 2, date: 17, flags: ['urgent'], month: 'current' },
  { count: 1, date: 18, month: 'current' },
  { count: 2, date: 19, month: 'current' },
  { count: 3, date: 20, month: 'current' },
  { count: 2, date: 21, month: 'current' },
  { count: 4, date: 22, month: 'current' },
  { count: 4, date: 23, month: 'current' },
  { count: 3, date: 24, month: 'current' },
  { count: 2, date: 25, month: 'current' },
  { date: 26, month: 'current' },
  { count: 2, date: 27, month: 'current' },
  { count: 1, date: 28, month: 'current' },
  { count: 3, date: 29, month: 'current' },
  { count: 2, date: 30, month: 'current' },
  { count: 2, date: 31, month: 'current' },
  { date: 1, month: 'next' },
]

const dailySchedules: ScheduleItem[] = [
  {
    assignee: '박희수 복지사',
    avatarSrc: `${elderAssetBase}/elder-kim-yeongja.png`,
    description: '가정 방문',
    id: 'daily-visit-kim',
    kind: 'visit',
    time: '09:30',
    title: '김영희 어르신',
  },
  {
    assignee: '이수진 복지사',
    avatarSrc: `${elderAssetBase}/elder-park-cheolsu.png`,
    description: '전화 상담',
    id: 'daily-call-seo',
    kind: 'call',
    time: '11:00',
    title: '서영수 어르신',
  },
  {
    assignee: '최희원 복지사',
    avatarSrc: `${dashboardAssetBase}/어르신2.png`,
    description: '사례 회의',
    id: 'daily-case-meeting',
    kind: 'meeting',
    time: '13:30',
    title: '사례 회의',
  },
  {
    assignee: '김영자 복지사',
    avatarSrc: `${elderAssetBase}/elder-choi-bokrye.png`,
    description: '가정 방문',
    id: 'daily-visit-jung',
    kind: 'visit',
    time: '15:00',
    title: '정옥자 어르신',
  },
  {
    assignee: '이수진 복지사',
    avatarSrc: `${elderAssetBase}/elder-park-cheolsu.png`,
    description: '전화 상담',
    id: 'daily-call-park',
    kind: 'call',
    time: '16:30',
    title: '박동일 어르신',
  },
  {
    assignee: '담당자 배정 필요',
    avatarSrc: `${welfareAssetBase}/사람.png`,
    description: '방문 대기',
    id: 'daily-unassigned',
    kind: 'unassigned',
    time: '18:00',
    title: '방문 대기',
  },
]

const todaySchedules: ScheduleItem[] = [
  {
    assignee: '박희수 복지사',
    avatarSrc: `${elderAssetBase}/elder-kim-yeongja.png`,
    description: '가정 방문',
    id: 'today-kim',
    kind: 'visit',
    time: '10:00',
    title: '김영자 어르신',
  },
  {
    assignee: '이수진 복지사',
    avatarSrc: `${elderAssetBase}/elder-park-cheolsu.png`,
    description: '전화 상담',
    id: 'today-lee',
    kind: 'call',
    time: '11:00',
    title: '이순자 어르신',
  },
  {
    assignee: '최희원 복지사',
    avatarSrc: `${dashboardAssetBase}/어르신2.png`,
    description: '',
    id: 'today-meeting',
    kind: 'meeting',
    time: '13:30',
    title: '사례 회의',
  },
  {
    assignee: '김영자 복지사',
    avatarSrc: `${elderAssetBase}/elder-choi-bokrye.png`,
    description: '가정 방문',
    id: 'today-park',
    kind: 'visit',
    time: '15:00',
    title: '박희순 어르신',
  },
]

const staffItems: StaffItem[] = [
  {
    avatarSrc: workerProfileSrc,
    count: 8,
    id: 'lee-sujin',
    name: '이수진 복지사',
    tone: 'balanced',
  },
  {
    avatarSrc: `${dashboardAssetBase}/어르신4.png`,
    count: 7,
    id: 'park-heesu',
    name: '박희수 복지사',
    tone: 'balanced',
  },
  {
    avatarSrc: `${dashboardAssetBase}/어르신2.png`,
    count: 5,
    id: 'choi-heewon',
    name: '최희원 복지사',
    tone: 'busy',
  },
  {
    avatarSrc: `${elderAssetBase}/elder-kim-yeongja.png`,
    count: 6,
    id: 'kim-yeongja-worker',
    name: '김영자 복지사',
    tone: 'balanced',
  },
]

const upcomingSchedules: UpcomingItem[] = [
  {
    assignee: '박희수 복지사',
    dateLabel: '5.16 (목)',
    id: 'upcoming-choi',
    kind: 'visit',
    time: '10:00',
    title: '최복례 어르신 가정 방문',
  },
  {
    assignee: '이수진 복지사',
    dateLabel: '5.17 (금)',
    id: 'upcoming-hwang',
    kind: 'call',
    time: '14:00',
    title: '황영화 어르신 전화 상담',
  },
  {
    assignee: '최희원 복지사',
    dateLabel: '5.17 (금)',
    id: 'upcoming-meeting',
    kind: 'meeting',
    time: '16:00',
    title: '통합 사례회의',
  },
]

const dayHeaders = ['일', '월', '화', '수', '목', '금', '토']

const kindStyles: Record<
  ScheduleKind,
  {
    badge: string
    dot: string
    label: string
  }
> = {
  call: {
    badge: 'border-[#bfeccf] bg-[#edf9f1] text-[#169444]',
    dot: 'bg-[#1fbf66]',
    label: '전화상담',
  },
  meeting: {
    badge: 'border-[#d7c8ff] bg-[#f4efff] text-[#7a47ed]',
    dot: 'bg-[#8a52f0]',
    label: '회의',
  },
  unassigned: {
    badge: 'border-[#ffd7ad] bg-[#fff4e8] text-[#ff8b00]',
    dot: 'bg-[#ff9f18]',
    label: '미배정',
  },
  visit: {
    badge: 'border-[#cfe0ff] bg-[#eef5ff] text-[#0867f2]',
    dot: 'bg-[#0867f2]',
    label: '방문',
  },
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
          {metric.description}
        </p>
      </div>
    </article>
  )
}

function SegmentedButton({
  active,
  label,
  onClick,
}: {
  active: boolean
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex min-h-9 min-w-[68px] items-center justify-center border border-[#dfe8f5] px-4 text-[14px] font-black transition first:rounded-l-lg last:rounded-r-lg focus-visible:z-10 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]',
        active
          ? 'border-[#0867f2] bg-[#0867f2] text-white shadow-[0_8px_16px_rgba(8,103,242,0.24)]'
          : 'bg-white text-[#071747] hover:bg-[#f5f9ff]',
      )}
      aria-pressed={active}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

function CalendarToolbar({
  activeView,
  onViewChange,
}: {
  activeView: 'list' | 'month' | 'week'
  onViewChange: (view: 'list' | 'month' | 'week') => void
}) {
  return (
    <div className="grid gap-3 border-b border-[#edf2f8] px-4 py-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="inline-flex min-h-9 items-center justify-center rounded-lg border border-[#dfe8f5] bg-white px-5 text-[14px] font-black text-[#071747] shadow-[0_7px_16px_rgba(37,72,125,0.05)] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          오늘
        </button>

        <div className="inline-flex overflow-hidden rounded-lg border border-[#dfe8f5] bg-white">
          <button
            type="button"
            className="inline-grid min-h-9 min-w-11 place-items-center border-r border-[#dfe8f5] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-[-2px] focus-visible:outline-[#8bbcff]"
            aria-label="이전 달"
          >
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="inline-grid min-h-9 min-w-11 place-items-center transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-[-2px] focus-visible:outline-[#8bbcff]"
            aria-label="다음 달"
          >
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        <button
          type="button"
          className="inline-flex min-h-9 items-center gap-2 rounded-lg px-2 text-[22px] font-black leading-none text-[#071747] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
          aria-label="2024년 5월 달력 선택"
        >
          2024년 5월
          <ChevronDown aria-hidden="true" className="h-4 w-4 text-[#50617f]" />
        </button>
      </div>

      <div
        className="flex justify-start lg:justify-end"
        role="group"
        aria-label="일정 보기 방식"
      >
        <SegmentedButton
          active={activeView === 'month'}
          label="월간"
          onClick={() => onViewChange('month')}
        />
        <SegmentedButton
          active={activeView === 'week'}
          label="주간"
          onClick={() => onViewChange('week')}
        />
        <SegmentedButton
          active={activeView === 'list'}
          label="목록"
          onClick={() => onViewChange('list')}
        />
      </div>
    </div>
  )
}

function CalendarCellButton({
  cell,
  onSelect,
  selected,
}: {
  cell: CalendarCell
  onSelect: (date: number) => void
  selected: boolean
}) {
  const isMuted = cell.month !== 'current'
  const isSunday =
    cell.month === 'current' &&
    (cell.date === 5 ||
      cell.date === 12 ||
      cell.date === 19 ||
      cell.date === 26)

  return (
    <button
      type="button"
      className={cn(
        'relative min-h-[67px] w-full border-b border-r border-[#e8eef7] bg-white px-4 py-3 text-left transition hover:bg-[#f5f9ff] focus-visible:z-10 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-[#8bbcff] lg:min-h-[76px]',
        selected && 'bg-[#f3f8ff]',
      )}
      aria-pressed={selected}
      aria-label={
        cell.count
          ? `2024년 5월 ${cell.date}일 일정 ${cell.count}건`
          : `2024년 5월 ${cell.date}일`
      }
      disabled={cell.month !== 'current'}
      onClick={() => onSelect(cell.date)}
    >
      <span
        className={cn(
          'inline-grid h-8 min-w-8 place-items-center rounded-full text-[15px] font-black leading-none',
          selected && 'bg-[#0867f2] px-2 text-white',
          !selected && isMuted && 'text-[#a9b5c9]',
          !selected && isSunday && 'text-[#ff1f3d]',
          !selected && !isMuted && !isSunday && 'text-[#071747]',
        )}
      >
        {cell.date}
      </span>

      {cell.count ? (
        <span className="mt-2 flex items-center gap-2 text-[13px] font-bold text-[#5b6f95]">
          <span
            className="h-1.5 w-1.5 rounded-full bg-[#0867f2]"
            aria-hidden="true"
          />
          {cell.count}건
        </span>
      ) : null}

      {cell.flags?.includes('warning') ? (
        <span
          className="absolute bottom-3 left-[64px] grid h-4 w-4 place-items-center rounded-[4px] bg-[#ff9f18] text-[11px] font-black leading-none text-white"
          aria-hidden="true"
        >
          !
        </span>
      ) : null}

      {cell.flags?.includes('urgent') ? (
        <span
          className="absolute bottom-4 left-[64px] h-2.5 w-2.5 rounded-full bg-[#ff5961]"
          aria-hidden="true"
        />
      ) : null}
    </button>
  )
}

function MonthlyCalendarPanel({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: number
  setSelectedDate: (date: number) => void
}) {
  const [activeView, setActiveView] = useState<'list' | 'month' | 'week'>(
    'month',
  )

  return (
    <section
      className="overflow-hidden rounded-[16px] border border-[#dfe8f5] bg-white shadow-[0_12px_26px_rgba(37,72,125,0.08)]"
      aria-labelledby="monthly-calendar-title"
    >
      <h2 id="monthly-calendar-title" className="sr-only">
        월간 기관 일정 달력
      </h2>
      <CalendarToolbar activeView={activeView} onViewChange={setActiveView} />

      <div className="overflow-x-auto">
        <div className="min-w-[760px]">
          <div className="grid grid-cols-7 border-b border-[#e8eef7] text-center text-[14px] font-black">
            {dayHeaders.map((day, index) => (
              <span
                key={day}
                className={cn(
                  'min-h-8 border-r border-[#e8eef7] py-2 last:border-r-0',
                  index === 0 && 'text-[#ff1f3d]',
                  index === 6 && 'text-[#0867f2]',
                  index > 0 && index < 6 && 'text-[#071747]',
                )}
              >
                {day}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {calendarCells.map((cell, index) => (
              <CalendarCellButton
                key={`${cell.month}-${cell.date}-${index}`}
                cell={cell}
                onSelect={setSelectedDate}
                selected={
                  cell.month === 'current' && cell.date === selectedDate
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ScheduleBadge({ kind }: { kind: ScheduleKind }) {
  const style = kindStyles[kind]

  return (
    <span
      className={cn(
        'inline-flex min-h-7 shrink-0 items-center justify-center whitespace-nowrap rounded-lg border px-3 text-[12px] font-black',
        style.badge,
      )}
    >
      {style.label}
    </span>
  )
}

function DailyScheduleCard({ schedule }: { schedule: ScheduleItem }) {
  const style = kindStyles[schedule.kind]

  return (
    <article className="relative grid min-h-[122px] min-w-[156px] content-start rounded-[12px] border border-[#dfe8f5] bg-white px-3 py-3 shadow-[0_8px_16px_rgba(37,72,125,0.05)] xl:min-w-0">
      <div className="flex items-center justify-between gap-2">
        <time className="text-[15px] font-black leading-none text-[#071747]">
          {schedule.time}
        </time>
        <ScheduleBadge kind={schedule.kind} />
      </div>

      <div className="mt-4 flex min-w-0 items-center gap-3">
        <span className="relative shrink-0">
          <img
            src={schedule.avatarSrc}
            alt=""
            className={cn(
              'h-11 w-11 rounded-full object-contain shadow-[0_8px_16px_rgba(47,86,145,0.12)]',
              schedule.kind === 'unassigned'
                ? 'bg-[#edf2f8] p-2'
                : 'bg-[#f4f8ff]',
            )}
            draggable="false"
          />
          <span
            className={cn(
              'absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-white',
              style.dot,
            )}
            aria-hidden="true"
          />
        </span>
        <div className="min-w-0">
          <h3 className="break-keep text-[13px] font-black leading-tight text-[#071747]">
            {schedule.title}
          </h3>
          <p className="mt-1 truncate text-[12px] font-bold text-[#425371]">
            {schedule.description}
          </p>
        </div>
      </div>

      <p className="mt-3 truncate text-[11px] font-bold leading-tight text-[#6f7f9b]">
        담당: {schedule.assignee}
      </p>
    </article>
  )
}

function SelectedDayPanel({ selectedDate }: { selectedDate: number }) {
  const scheduleCount = dailySchedules.length

  return (
    <section
      className="rounded-[16px] border border-[#dfe8f5] bg-white px-5 py-4 shadow-[0_12px_26px_rgba(37,72,125,0.08)]"
      aria-labelledby="selected-day-title"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 flex-wrap items-center gap-3">
          <h2
            id="selected-day-title"
            className="text-[20px] font-black leading-tight text-[#071747]"
          >
            2024년 5월 {selectedDate}일 (수) 일정
          </h2>
          <span className="inline-flex min-h-7 items-center justify-center rounded-lg border border-[#d4e4ff] bg-[#eef5ff] px-3 text-[12px] font-black text-[#0867f2]">
            총 {scheduleCount}건
          </span>
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#0867f2] px-5 text-[15px] font-black text-white shadow-[0_10px_20px_rgba(8,103,242,0.24)] transition hover:bg-[#0057d8] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          <Plus aria-hidden="true" className="h-5 w-5" strokeWidth={2.8} />
          일정 추가
        </button>
      </div>

      <div className="mt-4 overflow-x-auto xl:overflow-visible">
        <div className="flex min-w-max gap-4 xl:grid xl:min-w-0 xl:grid-cols-6 xl:gap-3">
          {dailySchedules.map((schedule, index) => (
            <div
              key={schedule.id}
              className="flex items-center gap-4 xl:block xl:min-w-0"
            >
              <DailyScheduleCard schedule={schedule} />
              {index < dailySchedules.length - 1 ? (
                <span
                  className="hidden h-0.5 w-8 rounded-full bg-[#bcd2f3] md:block xl:hidden"
                  aria-hidden="true"
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PanelHeader({
  linkLabel = '전체 보기',
  title,
}: {
  linkLabel?: string
  title: string
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="text-[20px] font-black leading-tight text-[#071747]">
        {title}
      </h2>
      <Link
        to="/worker/schedules"
        className="inline-flex min-h-8 items-center gap-1 rounded-lg px-2 text-[13px] font-black text-[#0867f2] transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
      >
        {linkLabel}
        <ChevronRight aria-hidden="true" className="h-4 w-4" />
      </Link>
    </div>
  )
}

function TodayScheduleRow({ schedule }: { schedule: ScheduleItem }) {
  const style = kindStyles[schedule.kind]

  return (
    <li className="grid min-h-[78px] grid-cols-[56px_18px_minmax(0,1fr)_48px] items-center gap-2 border-b border-[#e5edf8] bg-white px-4 py-3 last:border-b-0">
      <time className="text-[16px] font-black leading-tight text-[#071747]">
        {schedule.time}
      </time>
      <span
        className={cn('h-2.5 w-2.5 rounded-full', style.dot)}
        aria-hidden="true"
      />
      <div className="min-w-0">
        <div className="flex min-w-0 items-center gap-2">
          <ScheduleBadge kind={schedule.kind} />
          <h3 className="truncate text-[14px] font-black leading-tight text-[#071747]">
            {[schedule.title, schedule.description].filter(Boolean).join(' ')}
          </h3>
        </div>
        <p className="mt-2 truncate text-[12px] font-bold text-[#60708d]">
          담당: {schedule.assignee}
        </p>
      </div>
      <img
        src={schedule.avatarSrc}
        alt=""
        className="h-11 w-11 rounded-full bg-[#f4f8ff] object-contain shadow-[0_8px_16px_rgba(47,86,145,0.12)]"
        draggable="false"
      />
    </li>
  )
}

function TodaySchedulePanel() {
  return (
    <section
      className="rounded-[18px] border border-[#dfe8f5] bg-white px-5 py-5 shadow-[0_12px_26px_rgba(37,72,125,0.08)]"
      aria-labelledby="today-schedule-title"
    >
      <PanelHeader linkLabel="전체 일정 보기" title="오늘 일정" />

      <ol className="mt-4 overflow-hidden rounded-[12px] border border-[#dfe8f5]">
        {todaySchedules.map((schedule) => (
          <TodayScheduleRow key={schedule.id} schedule={schedule} />
        ))}
      </ol>

      <button
        type="button"
        className="mx-auto mt-3 flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 text-[14px] font-black text-[#0867f2] transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
      >
        <Plus aria-hidden="true" className="h-5 w-5" strokeWidth={2.8} />
        일정 추가
      </button>
    </section>
  )
}

function StaffAssignmentPanel() {
  return (
    <section
      className="rounded-[18px] border border-[#dfe8f5] bg-white px-5 py-5 shadow-[0_12px_26px_rgba(37,72,125,0.08)]"
      aria-labelledby="staff-assignment-title"
    >
      <PanelHeader title="담당자 배정" />

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-4">
        {staffItems.map((staff) => (
          <article
            key={staff.id}
            className="grid min-h-[118px] justify-items-center rounded-[12px] border border-[#dfe8f5] bg-white px-3 py-3 text-center shadow-[0_8px_16px_rgba(37,72,125,0.05)]"
            aria-label={`${staff.name} ${staff.count}건 담당`}
          >
            <img
              src={staff.avatarSrc}
              alt=""
              className="h-12 w-12 rounded-full bg-[#f4f8ff] object-contain shadow-[0_8px_16px_rgba(47,86,145,0.12)]"
              draggable="false"
            />
            <h3 className="mt-2 whitespace-nowrap text-[13px] font-black leading-tight text-[#071747]">
              {staff.name}
            </h3>
            <p className="mt-2 flex items-center gap-2 text-[12px] font-bold text-[#6f7f9b]">
              <span
                className={cn(
                  'h-2.5 w-2.5 rounded-full',
                  staff.tone === 'busy' ? 'bg-[#ff9f18]' : 'bg-[#1fbf66]',
                )}
                aria-hidden="true"
              />
              {staff.count}건 담당
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

function UpcomingSchedulePanel() {
  return (
    <section
      className="rounded-[18px] border border-[#dfe8f5] bg-white px-5 py-5 shadow-[0_12px_26px_rgba(37,72,125,0.08)]"
      aria-labelledby="upcoming-schedule-title"
    >
      <PanelHeader title="다가오는 일정" />

      <ol className="mt-4">
        {upcomingSchedules.map((schedule) => (
          <li
            key={schedule.id}
            className="grid min-h-[64px] grid-cols-[74px_56px_minmax(0,1fr)] items-center gap-4 border-b border-[#e5edf8] py-3 last:border-b-0"
          >
            <span className="text-[13px] font-bold text-[#52627f]">
              {schedule.dateLabel}
            </span>
            <time className="text-[13px] font-black text-[#52627f]">
              {schedule.time}
            </time>
            <div className="min-w-0">
              <div className="flex min-w-0 items-center gap-2">
                <ScheduleBadge kind={schedule.kind} />
                <h3 className="truncate text-[14px] font-black leading-tight text-[#071747]">
                  {schedule.title}
                </h3>
              </div>
              <p className="mt-2 truncate text-[12px] font-bold text-[#60708d]">
                담당: {schedule.assignee}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function WorkerSchedulesPage() {
  const [selectedDate, setSelectedDate] = useState(15)
  const selectedCell = useMemo(
    () =>
      calendarCells.find(
        (cell) => cell.month === 'current' && cell.date === selectedDate,
      ),
    [selectedDate],
  )

  const selectedScheduleDate = selectedCell?.date ?? 15

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#f8fbff] text-[#071747]">
      <WorkerTopBar activeHref="/worker/schedules" />

      <div className="mx-auto grid w-full max-w-[1600px] gap-7 px-5 py-7 lg:px-8 xl:grid-cols-[1034px_456px] xl:items-start">
        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-5 xl:w-[1034px]">
          <section
            className="px-1 pt-3"
            aria-labelledby="worker-schedules-title"
          >
            <h1
              id="worker-schedules-title"
              className="break-keep text-[30px] font-black leading-tight text-[#071747] sm:text-[32px]"
            >
              기관 일정 관리
            </h1>
            <p className="mt-3 text-[15px] font-bold leading-snug text-[#425371]">
              방문, 전화 상담, 회의 등 기관의 일정을 체계적으로 관리하세요.
            </p>
          </section>

          <section
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            aria-label="기관 일정 요약"
          >
            {metricCards.map((metric) => (
              <MetricSummaryCard key={metric.id} metric={metric} />
            ))}
          </section>

          <MonthlyCalendarPanel
            selectedDate={selectedScheduleDate}
            setSelectedDate={setSelectedDate}
          />

          <SelectedDayPanel selectedDate={selectedScheduleDate} />
        </div>

        <aside
          className="grid gap-5 xl:w-[456px]"
          aria-label="기관 일정 보조 정보"
        >
          <TodaySchedulePanel />
          <StaffAssignmentPanel />
          <UpcomingSchedulePanel />
        </aside>
      </div>
    </main>
  )
}
