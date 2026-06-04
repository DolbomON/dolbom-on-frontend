import { useMemo, useState, type ComponentProps } from 'react'
import { ChevronRight, Menu, Power } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { FamilyBottomNav } from '../../components/layout/FamilyBottomNav'
import { cn } from '../../lib/utils'

const familyBellAssetBase = '/assets/dolbomon/familly-bell'

type AlertFilter = 'all' | 'caution' | 'read' | 'urgent'
type AlertStatus = 'caution' | 'news' | 'read' | 'urgent'
type SummaryTone = 'blue' | 'orange' | 'red'

type AlertSummary = {
  iconSrc: string
  label: string
  tone: SummaryTone
  value: string
}

type FamilyAlert = {
  description: string
  iconSrc: string
  id: string
  status: AlertStatus
  statusLabel: string
  time: string
  title: string
}

const alertSummaries: AlertSummary[] = [
  {
    iconSrc: `${familyBellAssetBase}/bell.png`,
    label: '전체',
    tone: 'blue',
    value: '12건',
  },
  {
    iconSrc: `${familyBellAssetBase}/주의.png`,
    label: '주의',
    tone: 'orange',
    value: '2건',
  },
  {
    iconSrc: `${familyBellAssetBase}/경고.png`,
    label: '긴급',
    tone: 'red',
    value: '1건',
  },
]

const alertFilters: { label: string; value: AlertFilter }[] = [
  { label: '전체', value: 'all' },
  { label: '긴급', value: 'urgent' },
  { label: '주의', value: 'caution' },
  { label: '읽음', value: 'read' },
]

const familyAlerts: FamilyAlert[] = [
  {
    description: '무릎 통증이 있다고 입력되었어요',
    iconSrc: `${familyBellAssetBase}/알림경고.png`,
    id: 'pain-record',
    status: 'urgent',
    statusLabel: '긴급',
    time: '오전 09:40',
    title: '김영자 어르신 통증 기록',
  },
  {
    description: '식사량이 적게 입력되었어요',
    iconSrc: `${familyBellAssetBase}/밥.png`,
    id: 'breakfast-record',
    status: 'caution',
    statusLabel: '주의',
    time: '오전 08:20',
    title: '아침 식사 기록 확인',
  },
  {
    description: '오늘 대화 내용이 정리되었어요',
    iconSrc: `${familyBellAssetBase}/채팅.png`,
    id: 'ai-summary',
    status: 'news',
    statusLabel: '새 소식',
    time: '오전 07:55',
    title: 'AI 안부 대화 요약 도착',
  },
  {
    description: '5개 항목 기록이 모두 등록되었어요',
    iconSrc: `${familyBellAssetBase}/체크.png`,
    id: 'daily-check-complete',
    status: 'read',
    statusLabel: '읽음',
    time: '어제',
    title: '오늘 상태 입력 완료',
  },
]

const summaryToneClasses: Record<SummaryTone, string> = {
  blue: 'text-[#1667ff]',
  orange: 'text-[#f07a13]',
  red: 'text-[#f13243]',
}

const alertStatusClasses: Record<AlertStatus, string> = {
  caution: 'bg-[linear-gradient(180deg,#ff8c24_0%,#ff6d08_100%)] text-white',
  news: 'bg-[linear-gradient(180deg,#3d8cff_0%,#0f5bea_100%)] text-white',
  read: 'bg-[linear-gradient(180deg,#dce0e5_0%,#c7ccd3_100%)] text-[#344052]',
  urgent: 'bg-[linear-gradient(180deg,#ff5862_0%,#ef3545_100%)] text-white',
}

function Logo() {
  return (
    <Link
      to="/family"
      className="inline-flex items-center rounded-md text-[#125fe8] drop-shadow-[0_4px_7px_rgba(18,95,232,0.12)] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
      aria-label="돌봄ON 알림 홈"
    >
      <span className="text-[30px] font-black leading-none">돌봄</span>
      <Power
        aria-hidden="true"
        className="-mx-[1px] h-[31px] w-[31px]"
        strokeWidth={4.4}
      />
      <span className="text-[35px] font-black leading-none">N</span>
    </Link>
  )
}

function SummaryCard({ summary }: { summary: AlertSummary }) {
  return (
    <article
      className="flex min-h-[74px] min-w-0 items-center gap-1.5 rounded-[18px] border border-[#dfe5ee] bg-white px-2 py-1.5 shadow-[0_10px_22px_rgba(32,66,112,0.12)]"
      aria-label={`${summary.label} ${summary.value}`}
    >
      <img
        src={summary.iconSrc}
        alt=""
        width="1024"
        height="1024"
        className="h-[50px] w-[50px] shrink-0 object-contain drop-shadow-[0_7px_10px_rgba(43,80,132,0.18)]"
        aria-hidden="true"
        draggable="false"
      />
      <span className="min-w-0">
        <span className="block whitespace-nowrap text-[16px] font-black leading-none text-[#071747]">
          {summary.label}
        </span>
        <strong
          className={cn(
            'mt-1.5 block whitespace-nowrap text-[29px] font-black leading-none',
            summaryToneClasses[summary.tone],
          )}
        >
          {summary.value}
        </strong>
      </span>
    </article>
  )
}

function FilterChips({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: AlertFilter
  onFilterChange: (filter: AlertFilter) => void
}) {
  return (
    <div className="flex flex-wrap gap-2.5" aria-label="알림 상태 필터">
      {alertFilters.map((filter) => {
        const isActive = activeFilter === filter.value

        return (
          <button
            key={filter.value}
            type="button"
            className={cn(
              'inline-flex min-h-[30px] min-w-[64px] items-center justify-center rounded-full border px-4 text-[16px] font-extrabold leading-none transition active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]',
              isActive
                ? 'border-[#1765fb] bg-[#1765fb] text-white shadow-[0_9px_16px_rgba(23,101,251,0.26)]'
                : 'border-[#d7dde7] bg-white text-[#4c5668] shadow-[0_5px_12px_rgba(42,73,116,0.07)]',
            )}
            aria-pressed={isActive}
            onClick={() => onFilterChange(filter.value)}
          >
            {filter.label}
          </button>
        )
      })}
    </div>
  )
}

function StatusBadge({
  className,
  status,
  ...props
}: ComponentProps<'span'> & { status: AlertStatus }) {
  return (
    <span
      className={cn(
        'inline-flex min-h-[28px] min-w-[56px] items-center justify-center rounded-full px-3 text-[15px] font-black leading-none shadow-[inset_0_1px_0_rgba(255,255,255,0.26)]',
        alertStatusClasses[status],
        className,
      )}
      {...props}
    />
  )
}

function AlertCard({ alert }: { alert: FamilyAlert }) {
  return (
    <Link
      to={`#${alert.id}`}
      className="grid min-h-[74px] grid-cols-[58px_minmax(0,1fr)_auto] items-center gap-2.5 rounded-[22px] border border-[#e1e7f0] bg-white px-3 py-1.5 text-[#071747] shadow-[0_11px_24px_rgba(29,65,116,0.09)] transition active:scale-[0.995] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
      aria-label={`${alert.title} 상세 보기, ${alert.time}, ${alert.statusLabel}`}
    >
      <img
        src={alert.iconSrc}
        alt=""
        width="1024"
        height="1024"
        className="h-[58px] w-[58px] shrink-0 rounded-[18px] object-cover shadow-[0_7px_14px_rgba(50,91,152,0.13)]"
        aria-hidden="true"
        draggable="false"
      />

      <span className="min-w-0">
        <strong className="block truncate text-[18px] font-black leading-tight text-[#071747]">
          {alert.title}
        </strong>
        <span className="mt-1 block truncate text-[15px] font-semibold leading-tight text-[#5d6878]">
          {alert.description}
        </span>
      </span>

      <span className="flex h-full min-w-[72px] items-center gap-1.5 text-right">
        <span className="flex min-w-0 flex-col items-end justify-center gap-2">
          <time className="whitespace-nowrap text-[14px] font-semibold leading-none text-[#4e596c]">
            {alert.time}
          </time>
          <StatusBadge status={alert.status}>{alert.statusLabel}</StatusBadge>
        </span>
        <ChevronRight
          aria-hidden="true"
          className="h-6 w-6 shrink-0 text-[#677489]"
          strokeWidth={2.8}
        />
      </span>
    </Link>
  )
}

function NotificationSettingsCard() {
  return (
    <Link
      to="#notification-settings"
      className="grid min-h-[74px] grid-cols-[60px_minmax(0,1fr)_40px] items-center gap-3 rounded-[22px] border border-[#cfe0f8] bg-[linear-gradient(100deg,#f9fcff_0%,#eef7ff_100%)] px-4 py-1.5 text-[#071747] shadow-[0_12px_24px_rgba(38,86,154,0.1)] transition active:scale-[0.995] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
      aria-label="보호자 알림 설정 열기"
    >
      <img
        src={`${familyBellAssetBase}/알림설정.png`}
        alt=""
        width="1024"
        height="1024"
        className="h-[58px] w-[58px] rounded-[18px] object-cover"
        aria-hidden="true"
        draggable="false"
      />
      <span className="min-w-0">
        <strong className="block truncate text-[20px] font-black leading-tight">
          보호자 알림 설정
        </strong>
        <span className="mt-1 block truncate text-[15px] font-semibold leading-tight text-[#4c596b]">
          알림 방식과 시간을 관리해요.
        </span>
      </span>
      <span
        className="grid h-9 w-9 place-items-center rounded-full bg-white text-[#0f63ed] shadow-[0_5px_13px_rgba(32,78,139,0.12)]"
        aria-hidden="true"
      >
        <ChevronRight className="h-6 w-6" strokeWidth={3.4} />
      </span>
    </Link>
  )
}

export function FamilyAlertsPage() {
  const [activeFilter, setActiveFilter] = useState<AlertFilter>('all')
  const navigate = useNavigate()

  const filteredAlerts = useMemo(() => {
    if (activeFilter === 'all') {
      return familyAlerts
    }

    return familyAlerts.filter((alert) => alert.status === activeFilter)
  }, [activeFilter])

  function handleMenuClick() {
    navigate('/select-role')
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#edf5ff] text-[#071747]">
      <section
        className="mx-auto flex min-h-svh w-full max-w-[480px] flex-col bg-white px-[19px] pb-[calc(88px+env(safe-area-inset-bottom))] pt-[max(16px,env(safe-area-inset-top))] shadow-[0_24px_80px_rgba(55,104,184,0.1)]"
        aria-label="가족 알림 화면"
      >
        <header className="flex min-h-10 items-start justify-between gap-4">
          <Logo />

          <button
            className="inline-grid h-10 w-10 place-items-center rounded-md text-[#071747] transition active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
            type="button"
            aria-label="메뉴 열기"
            onClick={handleMenuClick}
          >
            <Menu aria-hidden="true" size={38} strokeWidth={2.6} />
          </button>
        </header>

        <section className="pt-2.5" aria-labelledby="family-alerts-title">
          <p className="text-[22px] font-bold leading-none text-[#58667a]">
            5월 31일 토요일
          </p>
          <h1
            id="family-alerts-title"
            className="mt-2 text-[38px] font-black leading-none text-[#071747]"
          >
            알림
          </h1>
          <p className="mt-2 break-keep text-[17px] font-semibold leading-snug text-[#4f5e73]">
            부모님의 상태 변화와 중요한 소식을 빠르게 확인하세요.
          </p>
        </section>

        <section
          className="mt-3.5 grid grid-cols-3 gap-2.5"
          aria-label="가족 알림 요약"
        >
          {alertSummaries.map((summary) => (
            <SummaryCard key={summary.label} summary={summary} />
          ))}
        </section>

        <div className="mt-3">
          <FilterChips
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        <section className="mt-3 grid gap-2" aria-label="가족 알림 목록">
          {filteredAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}

          {filteredAlerts.length === 0 ? (
            <div className="rounded-[24px] border border-[#e1e7f0] bg-white px-5 py-8 text-center shadow-[0_11px_24px_rgba(29,65,116,0.09)]">
              <p className="text-[19px] font-black text-[#071747]">
                표시할 알림이 없어요.
              </p>
              <p className="mt-2 text-[16px] font-semibold text-[#607086]">
                다른 필터를 선택해보세요.
              </p>
            </div>
          ) : null}
        </section>

        <div className="mt-2.5">
          <NotificationSettingsCard />
        </div>

        <FamilyBottomNav activeItem="alerts" />
      </section>
    </main>
  )
}
