import {
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Info,
  MoreHorizontal,
  Plus,
  UserRound,
  X,
} from 'lucide-react'
import { useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  caseMemoElders,
  defaultCaseMemoFormState,
  type CaseMemoFormState,
  type CaseMemoPayload,
} from '../../features/worker/caseMemoData'
import { cn } from '../../lib/utils'

const dashboardAssetBase = '/assets/dolbomon/worker-dashboard'
const memoAssetBase = '/assets/dolbomon/worker-memo'

const dayLabels = ['일', '월', '화', '수', '목', '금', '토']

const navItems = [
  { href: '/worker', label: '홈' },
  { href: '/worker/alerts', label: '안부현황' },
  { href: '/worker/elders/kim-yeongja', label: '기록' },
  { href: '/worker#schedule', label: '일정' },
  { href: '/worker#family-memo', label: '가족메모' },
  { href: '/worker/mypage', label: '설정' },
]

const purposeOptions = [
  '정기 방문 관찰',
  '식사 및 복약 확인',
  '수면 상태 상담',
  '통증 및 불편감 확인',
  '보호자 전달 상담',
]

const symptomOptions = [
  {
    iconSrc: `${memoAssetBase}/식사.png`,
    id: 'meal',
    label: '식사량 감소',
  },
  {
    iconSrc: `${memoAssetBase}/수면.png`,
    id: 'sleep',
    label: '수면 문제',
  },
  {
    iconSrc: `${memoAssetBase}/통증.png`,
    id: 'pain',
    label: '통증 호소',
  },
  {
    iconSrc: `${memoAssetBase}/기력.png`,
    id: 'energy',
    label: '기력 저하',
  },
  {
    iconSrc: `${memoAssetBase}/우울.png`,
    id: 'mood',
    label: '우울감',
  },
  {
    id: 'etc',
    label: '기타',
  },
] as const

const recentMemoItems = [
  {
    author: '김민수 요양사',
    content: '식사와 수면이 안정적으로 유지되고 있어요.',
    dateTime: '2025.05.28 (수) 10:20',
    status: '안정',
    tone: 'stable',
  },
  {
    author: '김민수 요양사',
    content: '복약 시간이 불규칙하고 활동량이 줄었어요.',
    dateTime: '2025.05.26 (월) 15:30',
    status: '주의',
    tone: 'caution',
  },
  {
    author: '김민수 요양사',
    content: '수면 질이 낮고 식사량이 감소했어요.',
    dateTime: '2025.05.24 (토) 09:40',
    status: '위험',
    tone: 'danger',
  },
] as const

const quickTemplates = [
  {
    description: '식사량, 식욕, 식사 태도 관련 템플릿',
    iconSrc: `${memoAssetBase}/식사2.png`,
    label: '식사',
  },
  {
    description: '복약 여부, 복약 순응도 관련 템플릿',
    iconSrc: `${memoAssetBase}/알약.png`,
    label: '복약',
  },
  {
    description: '수면 시간, 수면 질 관련 템플릿',
    iconSrc: `${memoAssetBase}/수면.png`,
    label: '수면',
  },
  {
    description: '기분, 정서 상태 관련 템플릿',
    iconSrc: `${memoAssetBase}/기분.png`,
    label: '정서',
  },
] as const

type StatusTone = 'caution' | 'danger' | 'stable'

const statusBadgeClasses: Record<StatusTone, string> = {
  caution:
    'bg-[#fff4dc] text-[#e18400] shadow-[0_5px_12px_rgba(245,158,11,0.18)]',
  danger:
    'bg-[#fff0f0] text-[#ee1f2a] shadow-[0_5px_12px_rgba(239,68,68,0.16)]',
  stable:
    'bg-[#e8f9ef] text-[#159147] shadow-[0_5px_12px_rgba(34,197,94,0.15)]',
}

type PhotoAttachment = {
  alt: string
  id: string
  src: string
}

const localPhotoAttachments: PhotoAttachment[] = [
  {
    alt: '식사 사진 첨부',
    id: 'meal-photo',
    src: `${memoAssetBase}/attachment-meal.png`,
  },
  {
    alt: '욕실 환경 사진 첨부',
    id: 'bathroom-photo',
    src: `${memoAssetBase}/attachment-bathroom.png`,
  },
  {
    alt: '피부 관찰 사진 첨부',
    id: 'skin-photo',
    src: `${memoAssetBase}/attachment-skin.png`,
  },
]

type MemoFieldKey =
  | 'caregiverMessage'
  | 'consultationContent'
  | 'followUpPlan'
  | 'memoContent'
  | 'observationContent'

const requiredMemoFields: Array<keyof CaseMemoFormState> = [
  'visitPurpose',
  'observationContent',
  'consultationContent',
  'memoContent',
]

const fieldErrorMessages: Partial<Record<keyof CaseMemoFormState, string>> = {
  consultationContent: '상담 내용을 입력해주세요.',
  memoContent: '메모를 입력해주세요.',
  observationContent: '관찰 내용을 입력해주세요.',
  visitPurpose: '방문 목적을 선택해주세요.',
}

function formatDate(value: string) {
  const [year = '', month = '', day = ''] = value.split('-')
  const date = new Date(`${value}T00:00:00`)
  const dayLabel = Number.isNaN(date.getTime())
    ? ''
    : ` (${dayLabels[date.getDay()]})`

  return `${year}.${month}.${day}${dayLabel}`
}

function WorkerMemoTopBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#e3ebf7] bg-white/96 shadow-[0_6px_20px_rgba(35,73,128,0.07)] backdrop-blur">
      <div className="mx-auto grid min-h-[82px] w-full max-w-[1640px] grid-cols-[auto_auto] items-center gap-x-4 gap-y-2 px-5 py-2 lg:h-[72px] lg:min-h-[72px] lg:grid-cols-[190px_minmax(0,1fr)_auto] lg:px-10 lg:py-0">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center text-[29px] font-black leading-none text-[#0867f2] drop-shadow-[0_5px_10px_rgba(8,103,242,0.18)] focus-visible:rounded-lg lg:text-[34px]"
          aria-label="돌봄ON 홈"
        >
          돌봄ON
        </Link>

        <nav
          className="col-span-2 row-start-2 flex min-w-0 justify-start gap-2 overflow-x-auto text-[15px] font-extrabold text-[#101a3d] lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:justify-center lg:gap-7"
          aria-label="요양사 메뉴"
        >
          {navItems.map((item) => {
            const isActive = item.label === '기록'

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
            <Bell aria-hidden="true" size={28} strokeWidth={2.5} />
            <span className="absolute right-1 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#f43f3f] px-1 text-[12px] font-black leading-none text-white ring-2 ring-white">
              2
            </span>
          </button>

          <Link
            to="/worker/mypage"
            className="hidden min-h-12 items-center gap-3 rounded-lg px-1.5 py-1 transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff] min-[540px]:inline-flex"
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

function WorkerMemoNotFound() {
  return (
    <main className="min-h-svh overflow-x-hidden bg-[#f8fbff] text-[#071747]">
      <WorkerMemoTopBar />

      <div className="mx-auto w-full max-w-[760px] px-5 py-16">
        <section
          className="rounded-[18px] border border-[#dfe8f5] bg-white px-6 py-10 text-center shadow-[0_16px_40px_rgba(47,86,145,0.09)]"
          aria-labelledby="worker-memo-not-found-title"
        >
          <h1
            id="worker-memo-not-found-title"
            className="text-[30px] font-black leading-tight text-[#071747]"
          >
            대상자 정보를 찾을 수 없어요.
          </h1>
          <p className="mt-3 text-[17px] font-bold leading-snug text-[#566784]">
            대상자 목록에서 다시 선택해 주세요.
          </p>
          <Link
            to="/worker/elders"
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg bg-[#0867f2] px-5 text-[17px] font-black text-white shadow-[0_12px_22px_rgba(8,103,242,0.22)] transition hover:bg-[#075fe0] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
          >
            대상자 목록으로 돌아가기
          </Link>
        </section>
      </div>
    </main>
  )
}

function StatusBadge({
  count,
  label,
  tone,
}: {
  count: number
  label: string
  tone: StatusTone
}) {
  return (
    <span
      className={cn(
        'inline-flex min-h-8 items-center justify-center rounded-full px-4 text-[16px] font-black leading-none lg:min-h-7 lg:px-3 lg:text-[15px]',
        statusBadgeClasses[tone],
      )}
    >
      {label} {count}
    </span>
  )
}

function VisitSummaryCard({
  elder,
  visitDate,
  visitEndTime,
  visitStartTime,
}: {
  elder: (typeof caseMemoElders)[number]
  visitDate: string
  visitEndTime: string
  visitStartTime: string
}) {
  return (
    <section
      className="grid gap-4 rounded-[18px] border border-[#dfe7f3] bg-white px-4 py-4 shadow-[0_15px_38px_rgba(47,86,145,0.08)] lg:h-[136px] lg:grid-cols-[300px_220px_220px_minmax(280px,1fr)] lg:items-center lg:px-5 lg:py-3"
      aria-label="방문 상담 요약"
    >
      <div className="flex items-center gap-4">
        <img
          src={elder.avatarSrc}
          alt={`${elder.name} 프로필`}
          className="h-[86px] w-[86px] shrink-0 rounded-full bg-[#f1f5ff] object-cover shadow-[0_10px_24px_rgba(47,86,145,0.12)]"
          draggable="false"
        />
        <div className="min-w-0">
          <h2 className="truncate text-[24px] font-black leading-tight text-[#071747]">
            {elder.name}
          </h2>
          <p className="mt-2 text-[17px] font-bold leading-tight text-[#64738f]">
            {elder.age}세 · {elder.household}
          </p>
          <Link
            to={`/worker/elders/${elder.id}`}
            className="mt-3 inline-flex min-h-9 items-center justify-center gap-1 rounded-full border border-[#dfe8f5] bg-white px-4 text-[15px] font-black text-[#0867f2] shadow-[0_8px_16px_rgba(47,86,145,0.06)] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
            aria-label={`${elder.name} 상세 보기`}
          >
            상세보기
            <ChevronRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="border-t border-[#e7eef8] pt-4 lg:border-l lg:border-t-0 lg:py-2 lg:pl-8">
        <h3 className="text-[15px] font-black leading-tight text-[#071747]">
          방문 일시
        </h3>
        <p className="mt-3 flex items-center gap-3 text-[17px] font-black leading-tight text-[#10204a]">
          <img
            src={`${memoAssetBase}/달력.png`}
            alt=""
            className="h-6 w-6 object-contain"
            draggable="false"
          />
          {formatDate(visitDate)}
        </p>
        <p className="mt-2 flex items-center gap-3 text-[17px] font-black leading-tight text-[#10204a]">
          <img
            src={`${memoAssetBase}/시간.png`}
            alt=""
            className="h-6 w-6 object-contain"
            draggable="false"
          />
          {visitStartTime} ~ {visitEndTime}
        </p>
      </div>

      <div className="border-t border-[#e7eef8] pt-4 lg:border-l lg:border-t-0 lg:py-2 lg:pl-8">
        <h3 className="text-[15px] font-black leading-tight text-[#071747]">
          담당 요양사
        </h3>
        <p className="mt-4 flex items-center gap-3 text-[17px] font-black leading-tight text-[#10204a]">
          <UserRound
            aria-hidden="true"
            className="h-7 w-7 fill-[#5ca0ff] text-[#0867f2]"
            strokeWidth={2.2}
          />
          {elder.assignedWorkerName}
        </p>
      </div>

      <div className="border-t border-[#e7eef8] pt-4 lg:border-l lg:border-t-0 lg:py-2 lg:pl-8">
        <h3 className="text-[15px] font-black leading-tight text-[#071747]">
          상태 요약
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          <StatusBadge count={1} label="위험" tone="danger" />
          <StatusBadge count={1} label="주의" tone="caution" />
          <StatusBadge count={2} label="안정" tone="stable" />
        </div>
        <Link
          to={`/worker/elders/${elder.id}`}
          className="mt-3 inline-flex min-h-8 items-center gap-1 rounded-lg text-[15px] font-black text-[#0867f2] transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          최근 기록 보기
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}

function FormRow({
  children,
  help,
  id,
  label,
  required,
}: {
  children: ReactNode
  help?: boolean
  id?: string
  label: string
  required?: boolean
}) {
  return (
    <div className="grid gap-2 border-b border-[#e8eef7] py-3 last:border-b-0 lg:grid-cols-[178px_minmax(0,1fr)] lg:items-start lg:gap-4 lg:py-1">
      <label
        className="flex items-center gap-2 pt-2 text-[17px] font-black leading-tight text-[#112250]"
        htmlFor={id}
      >
        <span>
          {label}
          {required ? (
            <span className="ml-1 text-[#ee1f2a]" aria-hidden="true">
              *
            </span>
          ) : null}
        </span>
        {help ? (
          <span className="inline-grid h-5 w-5 place-items-center rounded-full border border-[#b8c7df] text-[12px] font-black text-[#60708e]">
            ?
          </span>
        ) : null}
      </label>
      <div className="min-w-0">{children}</div>
    </div>
  )
}

function MemoTextareaRow({
  errorMessage,
  id,
  label,
  maxLength,
  onChange,
  placeholder,
  required,
  value,
}: {
  errorMessage?: string
  id: MemoFieldKey
  label: string
  maxLength: number
  onChange: (value: string) => void
  placeholder: string
  required?: boolean
  value: string
}) {
  const counterId = `${id}-counter`
  const errorId = errorMessage ? `${id}-error` : undefined

  return (
    <FormRow id={id} label={label} required={required}>
      <div className="relative">
        <textarea
          id={id}
          value={value}
          rows={2}
          maxLength={maxLength}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={cn(
            'h-[86px] w-full resize-none rounded-lg border bg-white px-4 pb-7 pt-3 text-[16px] font-bold leading-snug text-[#10204a] shadow-[inset_0_1px_2px_rgba(47,86,145,0.04)] outline-none transition placeholder:text-[#9aa8be] focus:border-[#0867f2] focus:ring-4 focus:ring-[#0867f2]/10 lg:h-[48px] lg:pb-4 lg:pt-2',
            errorMessage ? 'border-[#ee1f2a]' : 'border-[#dbe3ef]',
          )}
          aria-describedby={[counterId, errorId].filter(Boolean).join(' ')}
          aria-invalid={errorMessage ? 'true' : undefined}
        />
        <span
          id={counterId}
          className="absolute bottom-3 right-4 text-[13px] font-bold leading-none text-[#7a8498]"
        >
          {value.length}/{maxLength}
        </span>
      </div>
      {errorMessage ? (
        <p
          id={errorId}
          className="mt-2 text-[14px] font-black leading-snug text-[#d81f2a]"
        >
          {errorMessage}
        </p>
      ) : null}
    </FormRow>
  )
}

function SymptomIcon({ option }: { option: (typeof symptomOptions)[number] }) {
  if ('iconSrc' in option) {
    return (
      <img
        src={option.iconSrc}
        alt=""
        className="h-7 w-7 object-contain lg:h-6 lg:w-6"
        draggable="false"
      />
    )
  }

  return (
    <MoreHorizontal
      aria-hidden="true"
      className="h-7 w-7 text-[#2f77de] lg:h-6 lg:w-6"
      strokeWidth={3}
    />
  )
}

function RecentMemoList() {
  return (
    <section
      className="rounded-[18px] border border-[#dfe8f5] bg-white p-4 shadow-[0_15px_38px_rgba(47,86,145,0.08)] lg:p-3"
      aria-labelledby="recent-memo-list-title"
    >
      <div className="flex items-center justify-between gap-3">
        <h2
          id="recent-memo-list-title"
          className="text-[20px] font-black leading-tight text-[#071747]"
        >
          최근 메모 목록
        </h2>
        <Link
          to="/worker/reports"
          className="inline-flex min-h-9 items-center gap-1 rounded-lg px-2 text-[14px] font-black text-[#0867f2] transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          전체 보기
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-4 grid gap-3">
        {recentMemoItems.map((item) => (
          <article
            key={`${item.status}-${item.dateTime}`}
            className="rounded-[14px] border border-[#e2eaf6] bg-white px-4 py-4 shadow-[0_8px_20px_rgba(47,86,145,0.05)] lg:px-3 lg:py-3"
          >
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'inline-flex min-h-8 shrink-0 items-center rounded-full px-3 text-[15px] font-black leading-none lg:min-h-7 lg:px-2.5 lg:text-[14px]',
                  statusBadgeClasses[item.tone],
                )}
              >
                {item.status}
              </span>
              <p
                className="min-w-0 text-[15px] font-black leading-snug text-[#253758] lg:truncate lg:text-[14px]"
                title={item.content}
              >
                {item.content}
              </p>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 pl-11 text-[13px] font-bold text-[#71809b] lg:text-[12px]">
              <span>{item.dateTime}</span>
              <span className="inline-flex items-center gap-1">
                <UserRound
                  aria-hidden="true"
                  className="h-4 w-4"
                  strokeWidth={2.6}
                />
                {item.author}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function QuickTemplatePanel() {
  return (
    <section
      className="rounded-[18px] border border-[#dfe8f5] bg-white p-4 shadow-[0_15px_38px_rgba(47,86,145,0.08)]"
      aria-labelledby="quick-template-title"
    >
      <h2
        id="quick-template-title"
        className="text-[20px] font-black leading-tight text-[#071747]"
      >
        빠른 템플릿
      </h2>

      <div className="mt-4 grid grid-cols-2 gap-3 max-[420px]:grid-cols-1">
        {quickTemplates.map((template) => (
          <button
            key={template.label}
            type="button"
            className="min-h-[126px] rounded-[14px] border border-[#e2eaf6] bg-white px-4 py-4 text-left shadow-[0_8px_20px_rgba(47,86,145,0.05)] transition hover:-translate-y-0.5 hover:border-[#bfd5fb] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
          >
            <span className="flex items-center gap-3">
              <img
                src={template.iconSrc}
                alt=""
                className="h-11 w-11 object-contain"
                draggable="false"
              />
              <strong className="text-[17px] font-black leading-tight text-[#071747]">
                {template.label}
              </strong>
            </span>
            <span className="mt-3 block text-[13px] font-bold leading-relaxed text-[#52627f]">
              {template.description}
            </span>
          </button>
        ))}
      </div>

      <button
        type="button"
        className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-[#dfe8f5] bg-white px-4 text-[16px] font-black text-[#0867f2] shadow-[0_8px_18px_rgba(47,86,145,0.06)] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
      >
        <img
          src={`${memoAssetBase}/스택.png`}
          alt=""
          className="h-7 w-7 object-contain"
          draggable="false"
        />
        템플릿 더보기
        <ChevronRight aria-hidden="true" className="h-5 w-5" />
      </button>
    </section>
  )
}

export function WorkerMemoCreatePage() {
  const { elderId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [errors, setErrors] = useState<
    Partial<Record<keyof CaseMemoFormState, string>>
  >({})
  const [photoAttachments, setPhotoAttachments] = useState<PhotoAttachment[]>(
    localPhotoAttachments,
  )
  const [formState, setFormState] = useState<CaseMemoFormState>(() => ({
    ...defaultCaseMemoFormState,
    elderId: elderId ?? '',
    photoAttachmentIds: localPhotoAttachments.map((photo) => photo.id),
  }))

  const elder = useMemo(
    () => caseMemoElders.find((item) => item.id === elderId),
    [elderId],
  )

  if (!elder || !elderId) {
    return <WorkerMemoNotFound />
  }

  const detailPath = `/worker/elders/${elderId}`
  const availablePhotoCount = Math.max(
    0,
    localPhotoAttachments.length - photoAttachments.length,
  )

  const navigateToDetail = () => {
    navigate(detailPath)
  }

  const handleBack = () => {
    const locationState = location.state as {
      fromWorkerElderDetail?: boolean
    } | null

    if (locationState?.fromWorkerElderDetail) {
      navigate(-1)
      return
    }

    navigateToDetail()
  }

  const updateFormState = <Key extends keyof CaseMemoFormState>(
    key: Key,
    value: CaseMemoFormState[Key],
  ) => {
    setFormState((current) => ({
      ...current,
      [key]: value,
    }))

    if (typeof value === 'string' && value.trim()) {
      setErrors((current) => ({
        ...current,
        [key]: undefined,
      }))
    }
  }

  const updateTextField = (key: MemoFieldKey, value: string) => {
    updateFormState(key, value)
  }

  const toggleSymptom = (symptomId: string) => {
    setFormState((current) => {
      const isSelected = current.symptomIds.includes(symptomId)

      return {
        ...current,
        symptomIds: isSelected
          ? current.symptomIds.filter((id) => id !== symptomId)
          : [...current.symptomIds, symptomId],
      }
    })
  }

  const removePhoto = (photoId: string) => {
    setPhotoAttachments((current) =>
      current.filter((photo) => photo.id !== photoId),
    )
    setFormState((current) => ({
      ...current,
      photoAttachmentIds: current.photoAttachmentIds.filter(
        (id) => id !== photoId,
      ),
    }))
  }

  const addLocalPhoto = () => {
    const nextPhoto = localPhotoAttachments.find(
      (photo) =>
        !photoAttachments.some(
          (attachedPhoto) => attachedPhoto.id === photo.id,
        ),
    )

    if (!nextPhoto || photoAttachments.length >= 5) {
      return
    }

    setPhotoAttachments((current) => [...current, nextPhoto])
    setFormState((current) => ({
      ...current,
      photoAttachmentIds: [...current.photoAttachmentIds, nextPhoto.id],
    }))
  }

  const validateForm = () => {
    const nextErrors: Partial<Record<keyof CaseMemoFormState, string>> = {}

    requiredMemoFields.forEach((field) => {
      const value = formState[field]

      if (typeof value === 'string' && !value.trim()) {
        nextErrors[field] = fieldErrorMessages[field]
      }
    })

    setErrors(nextErrors)

    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    const payload: CaseMemoPayload = {
      ...formState,
      createdAt: new Date().toISOString(),
      createdBy: elder.assignedWorkerName,
    }

    // TODO: Send payload to the case memo API when backend saving is available.
    void payload

    navigateToDetail()
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#f8fbff] text-[#071747]">
      <WorkerMemoTopBar />

      <div className="mx-auto w-full max-w-[1600px] px-5 pb-10 pt-3 lg:px-11">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <button
            type="button"
            className="inline-flex min-h-10 w-fit items-center gap-2 rounded-lg px-1 text-[16px] font-black text-[#0867f2] transition hover:bg-[#edf5ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
            onClick={handleBack}
          >
            <ChevronLeft aria-hidden="true" className="h-6 w-6" />
            어르신 상세로 돌아가기
          </button>

          <h1 className="text-center text-[30px] font-black leading-tight text-[#071747] lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:text-[31px]">
            상담 · 관찰 기록
          </h1>
        </div>

        <div className="mt-2 grid gap-5 xl:grid-cols-[minmax(0,1fr)_382px] xl:items-start">
          <div className="min-w-0">
            <VisitSummaryCard
              elder={elder}
              visitDate={formState.visitDate}
              visitEndTime={formState.visitEndTime}
              visitStartTime={formState.visitStartTime}
            />

            <form
              className="mt-4 rounded-[18px] border border-[#dfe8f5] bg-white px-4 py-3 shadow-[0_15px_38px_rgba(47,86,145,0.08)] lg:px-7"
              onSubmit={handleSubmit}
              noValidate
            >
              <FormRow id="visit-purpose" label="방문 목적" required>
                <div className="relative max-w-[390px]">
                  <select
                    id="visit-purpose"
                    value={formState.visitPurpose}
                    onChange={(event) =>
                      updateFormState('visitPurpose', event.target.value)
                    }
                    className={cn(
                      'h-[45px] w-full appearance-none rounded-lg border bg-white px-4 pr-12 text-[15px] font-bold text-[#10204a] shadow-[0_4px_12px_rgba(47,86,145,0.05)] outline-none transition invalid:text-[#8794aa] focus:border-[#0867f2] focus:ring-4 focus:ring-[#0867f2]/10',
                      errors.visitPurpose
                        ? 'border-[#ee1f2a]'
                        : 'border-[#dbe3ef]',
                    )}
                    aria-invalid={errors.visitPurpose ? 'true' : undefined}
                    aria-describedby={
                      errors.visitPurpose ? 'visit-purpose-error' : undefined
                    }
                    required
                  >
                    <option value="">선택하세요</option>
                    {purposeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#61708f]"
                    strokeWidth={2.8}
                  />
                </div>
                {errors.visitPurpose ? (
                  <p
                    id="visit-purpose-error"
                    className="mt-2 text-[14px] font-black leading-snug text-[#d81f2a]"
                  >
                    {errors.visitPurpose}
                  </p>
                ) : null}
              </FormRow>

              <FormRow label="증상 체크" help>
                <div className="flex flex-wrap gap-3" role="group">
                  <span className="sr-only">증상 체크</span>
                  {symptomOptions.map((option) => {
                    const isSelected = formState.symptomIds.includes(option.id)

                    return (
                      <button
                        key={option.id}
                        type="button"
                        className={cn(
                          'inline-flex min-h-10 items-center gap-2 rounded-lg border px-4 text-[15px] font-black leading-none shadow-[0_6px_14px_rgba(47,86,145,0.08)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff] lg:px-3 lg:text-[14px]',
                          isSelected
                            ? 'border-[#0867f2] bg-[#edf6ff] text-[#0867f2]'
                            : 'border-[#dfe8f5] bg-white text-[#253758]',
                        )}
                        aria-pressed={isSelected}
                        onClick={() => toggleSymptom(option.id)}
                      >
                        <SymptomIcon option={option} />
                        {option.label}
                      </button>
                    )
                  })}
                </div>
              </FormRow>

              <MemoTextareaRow
                id="observationContent"
                label="관찰 내용"
                maxLength={1000}
                value={formState.observationContent}
                onChange={(value) =>
                  updateTextField('observationContent', value)
                }
                placeholder="어르신의 현재 상태를 관찰하여 기록해주세요."
                errorMessage={errors.observationContent}
                required
              />

              <MemoTextareaRow
                id="consultationContent"
                label="상담 내용"
                maxLength={1000}
                value={formState.consultationContent}
                onChange={(value) =>
                  updateTextField('consultationContent', value)
                }
                placeholder="나눈 대화 내용과 어르신의 반응을 기록해주세요."
                errorMessage={errors.consultationContent}
                required
              />

              <MemoTextareaRow
                id="caregiverMessage"
                label="보호자 전달 사항"
                maxLength={1000}
                value={formState.caregiverMessage}
                onChange={(value) => updateTextField('caregiverMessage', value)}
                placeholder="가족(보호자)에게 전달할 내용을 기록해주세요."
              />

              <MemoTextareaRow
                id="followUpPlan"
                label="후속 조치 / 계획"
                maxLength={1000}
                value={formState.followUpPlan}
                onChange={(value) => updateTextField('followUpPlan', value)}
                placeholder="다음 방문 전 또는 보호자와 협의할 후속 조치 내용을 기록해주세요."
              />

              <MemoTextareaRow
                id="memoContent"
                label="메모 작성"
                maxLength={1500}
                value={formState.memoContent}
                onChange={(value) => updateTextField('memoContent', value)}
                placeholder="기타 참고할 사항을 자유롭게 작성해주세요."
                errorMessage={errors.memoContent}
                required
              />

              <FormRow label="음성 메모 (선택)">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    className={cn(
                      'inline-flex min-h-10 items-center gap-2 rounded-lg border px-4 text-[15px] font-black shadow-[0_7px_16px_rgba(47,86,145,0.08)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]',
                      formState.audioMemoAttached
                        ? 'border-[#0867f2] bg-[#edf6ff] text-[#0867f2]'
                        : 'border-[#dfe8f5] bg-white text-[#0867f2]',
                    )}
                    aria-pressed={formState.audioMemoAttached}
                    onClick={() =>
                      updateFormState(
                        'audioMemoAttached',
                        !formState.audioMemoAttached,
                      )
                    }
                  >
                    <img
                      src={`${memoAssetBase}/마이크.png`}
                      alt=""
                      className="h-7 w-7 object-contain"
                      draggable="false"
                    />
                    음성 녹음
                  </button>
                  <p className="text-[14px] font-bold text-[#71809b]">
                    녹음 후 파일이 첨부됩니다.
                  </p>
                </div>
              </FormRow>

              <FormRow label="사진 첨부 (선택)">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-[#dfe8f5] bg-white px-4 text-[15px] font-black text-[#0867f2] shadow-[0_7px_16px_rgba(47,86,145,0.08)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
                    onClick={addLocalPhoto}
                  >
                    <img
                      src={`${memoAssetBase}/카메라.png`}
                      alt=""
                      className="h-7 w-7 object-contain"
                      draggable="false"
                    />
                    사진 선택
                  </button>
                  <p className="text-[14px] font-bold text-[#71809b]">
                    최대 5장까지 첨부 가능합니다.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 lg:ml-4">
                    {photoAttachments.map((photo) => (
                      <div
                        key={photo.id}
                        className="relative h-[66px] w-[112px] overflow-hidden rounded-lg border border-[#dfe8f5] bg-[#eef4ff] shadow-[0_8px_18px_rgba(47,86,145,0.08)] lg:h-[56px] lg:w-[96px]"
                      >
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className="h-full w-full object-cover"
                          draggable="false"
                        />
                        <button
                          type="button"
                          className="absolute right-1 top-1 inline-grid h-7 w-7 place-items-center rounded-full bg-white/95 text-[#60708e] shadow-[0_5px_12px_rgba(20,31,53,0.22)] transition hover:text-[#d81f2a] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
                          aria-label={`${photo.alt} 삭제`}
                          onClick={() => removePhoto(photo.id)}
                        >
                          <X aria-hidden="true" className="h-4 w-4" />
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      className="inline-grid h-[66px] w-[72px] place-items-center rounded-lg border border-dashed border-[#9fc2f7] bg-[#f8fbff] text-[#0867f2] transition hover:bg-[#edf6ff] disabled:cursor-not-allowed disabled:opacity-55 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff] lg:h-[56px] lg:w-[64px]"
                      aria-label={
                        availablePhotoCount > 0
                          ? '로컬 사진 추가'
                          : '추가할 로컬 사진 없음'
                      }
                      disabled={availablePhotoCount === 0}
                      onClick={addLocalPhoto}
                    >
                      <Plus aria-hidden="true" className="h-8 w-8" />
                    </button>
                  </div>
                </div>
              </FormRow>

              <button
                type="submit"
                className="mt-4 min-h-14 w-full rounded-lg bg-[#0867f2] px-5 text-[19px] font-black text-white shadow-[0_12px_24px_rgba(8,103,242,0.28)] transition hover:bg-[#0057d8] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff] lg:mt-3 lg:min-h-12"
              >
                기록 저장
              </button>
            </form>
          </div>

          <aside className="grid gap-5" aria-label="상담 메모 보조 정보">
            <RecentMemoList />
            <QuickTemplatePanel />
          </aside>
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-[14px] border border-[#dfe8f5] bg-white px-4 py-3 text-[13px] font-bold leading-relaxed text-[#61708f] shadow-[0_8px_20px_rgba(47,86,145,0.04)]">
          <Info
            aria-hidden="true"
            className="mt-0.5 h-4 w-4 shrink-0 text-[#0867f2]"
            strokeWidth={2.7}
          />
          <p>
            작성한 상담·관찰 기록은 담당 돌봄 관리에 활용되며 보호자에게 필요한
            내용만 전달됩니다.
          </p>
        </div>
      </div>
    </main>
  )
}
