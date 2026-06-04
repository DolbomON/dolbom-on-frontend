import {
  Bell,
  CalendarClock,
  Check,
  ChevronDown,
  ChevronLeft,
  FileText,
  UserRound,
} from 'lucide-react'
import { useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { caseMemoElders } from '../../features/worker/caseMemoData'
import { cn } from '../../lib/utils'

const workerProfileSrc = '/assets/dolbomon/worker-mypage/worker-lee-bokji.png'

type ConsultationMethod = 'guardian' | 'phone' | 'visit'
type RiskJudgement = 'danger' | 'emergency' | 'normal' | 'watch'
type AssignmentChoice = 'assign' | 'none'
type GuardianContact = 'done' | 'none' | 'scheduled'

const navItems = [
  { href: '/worker', label: '홈' },
  { href: '/worker/welfare-connect', label: '복지 현황' },
  { href: '/worker/consultations', label: '상담 관리' },
  { href: '/worker/reports', label: '보고서' },
  { href: '/worker/schedules', label: '기관 일정' },
  { href: '/worker/mypage', label: '설정' },
] as const

const consultationMethodOptions: Array<{
  label: string
  value: ConsultationMethod
}> = [
  { label: '전화 상담', value: 'phone' },
  { label: '방문 상담', value: 'visit' },
  { label: '보호자 상담', value: 'guardian' },
]

const riskJudgementOptions: Array<{
  label: string
  value: RiskJudgement
}> = [
  { label: '정상', value: 'normal' },
  { label: '주의', value: 'watch' },
  { label: '위험', value: 'danger' },
  { label: '긴급', value: 'emergency' },
]

const assignmentOptions: Array<{ label: string; value: AssignmentChoice }> = [
  { label: '배정 안 함', value: 'none' },
  { label: '요양사 배정', value: 'assign' },
]

const guardianContactOptions: Array<{
  label: string
  value: GuardianContact
}> = [
  { label: '연락 완료', value: 'done' },
  { label: '연락 예정', value: 'scheduled' },
  { label: '해당 없음', value: 'none' },
]

const riskButtonClasses: Record<RiskJudgement, string> = {
  danger: 'border-[#ffb7bf] bg-[#fff0f2] text-[#ee1f2a]',
  emergency: 'border-[#f59e0b] bg-[#fff4dc] text-[#b45309]',
  normal: 'border-[#bfeccf] bg-[#edf9f1] text-[#15803d]',
  watch: 'border-[#ffd89a] bg-[#fff8eb] text-[#c27400]',
}

function formatElderDisplayName(name: string) {
  return name.replace(/님$/, ' 어르신')
}

function WorkerCaseNoteTopBar() {
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

        <div className="col-start-2 row-start-1 flex items-center gap-3 justify-self-end lg:col-start-3">
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

function OptionGroup<Value extends string>({
  ariaLabel,
  options,
  value,
  onChange,
  toneByValue,
}: {
  ariaLabel: string
  options: Array<{ label: string; value: Value }>
  value: Value
  onChange: (value: Value) => void
  toneByValue?: Partial<Record<Value, string>>
}) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label={ariaLabel}>
      {options.map((option) => {
        const isSelected = value === option.value

        return (
          <button
            key={option.value}
            type="button"
            className={cn(
              'inline-flex min-h-11 items-center justify-center rounded-lg border px-4 text-[15px] font-black shadow-[0_7px_16px_rgba(37,72,125,0.05)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]',
              isSelected
                ? (toneByValue?.[option.value] ??
                    'border-[#bfd6fb] bg-[#edf6ff] text-[#0867f2]')
                : 'border-[#dfe8f5] bg-white text-[#253758]',
            )}
            aria-pressed={isSelected}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

function FormField({
  children,
  label,
}: {
  children: ReactNode
  label: string
}) {
  return (
    <div className="grid gap-2 border-b border-[#e8eef7] py-4 last:border-b-0 lg:grid-cols-[170px_minmax(0,1fr)] lg:items-start">
      <span className="pt-2 text-[17px] font-black leading-tight text-[#112250]">
        {label}
      </span>
      <div className="min-w-0">{children}</div>
    </div>
  )
}

function WorkerCaseNoteNotFound() {
  return (
    <main className="min-h-svh overflow-x-hidden bg-[#f8fbff] text-[#071747]">
      <WorkerCaseNoteTopBar />
      <div className="mx-auto w-full max-w-[760px] px-5 py-16">
        <section
          className="rounded-[18px] border border-[#dfe8f5] bg-white px-6 py-10 text-center shadow-[0_16px_40px_rgba(47,86,145,0.09)]"
          aria-labelledby="worker-case-note-not-found-title"
        >
          <h1
            id="worker-case-note-not-found-title"
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

export function WorkerCaseNoteCreatePage() {
  const { elderId } = useParams()
  const navigate = useNavigate()
  const [assignmentChoice, setAssignmentChoice] =
    useState<AssignmentChoice>('none')
  const [consultationContent, setConsultationContent] = useState('')
  const [consultationMethod, setConsultationMethod] =
    useState<ConsultationMethod>('phone')
  const [followUpAt, setFollowUpAt] = useState('2026-06-02T15:00')
  const [guardianContact, setGuardianContact] =
    useState<GuardianContact>('scheduled')
  const [riskJudgement, setRiskJudgement] = useState<RiskJudgement>('watch')
  const [actionPlan, setActionPlan] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const elder = useMemo(
    () => caseMemoElders.find((item) => item.id === elderId),
    [elderId],
  )

  if (!elder || !elderId) {
    return <WorkerCaseNoteNotFound />
  }

  const elderDisplayName = formatElderDisplayName(elder.name)
  const detailPath = `/worker/elders/${elderId}`

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!consultationContent.trim() || !actionPlan.trim()) {
      setErrorMessage('상담 내용과 조치 사항을 입력해 주세요.')
      return
    }

    setErrorMessage(null)
    navigate(detailPath)
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#f8fbff] text-[#071747]">
      <WorkerCaseNoteTopBar />

      <div className="mx-auto grid w-full max-w-[1320px] gap-5 px-5 py-6 lg:px-8">
        <button
          type="button"
          className="inline-flex min-h-10 w-fit items-center gap-2 rounded-lg px-1 text-[16px] font-black text-[#0867f2] transition hover:bg-[#edf5ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
          onClick={() => navigate(detailPath)}
        >
          <ChevronLeft aria-hidden="true" className="h-6 w-6" />
          어르신 상세로 돌아가기
        </button>

        <section
          className="grid gap-4 rounded-[18px] border border-[#dfe8f5] bg-white px-5 py-5 shadow-[0_16px_38px_rgba(37,72,125,0.08)] lg:grid-cols-[minmax(0,1fr)_260px] lg:items-center"
          aria-labelledby="case-note-title"
        >
          <div className="min-w-0">
            <h1
              id="case-note-title"
              className="text-[31px] font-black leading-tight text-[#071747] sm:text-[36px]"
            >
              사례관리 메모 작성
            </h1>
            <p className="mt-3 text-[18px] font-black leading-snug text-[#253758]">
              대상자: {elderDisplayName}
            </p>
            <p className="mt-2 text-[15px] font-bold leading-snug text-[#64738f]">
              상담 결과, 위험 판단, 후속 조치와 배정 여부를 복지사 업무 기준으로
              기록하세요.
            </p>
          </div>

          <div className="grid min-h-[116px] grid-cols-[72px_minmax(0,1fr)] items-center gap-4 rounded-[14px] border border-[#dfe8f5] bg-[#fbfdff] px-4">
            <img
              src={elder.avatarSrc}
              alt={`${elder.name} 프로필`}
              className="h-[64px] w-[64px] rounded-full bg-[#f2f6ff] object-cover shadow-[0_8px_18px_rgba(47,86,145,0.12)]"
              draggable="false"
            />
            <div className="min-w-0">
              <p className="truncate text-[19px] font-black text-[#071747]">
                {elderDisplayName}
              </p>
              <p className="mt-2 text-[14px] font-bold text-[#64738f]">
                {elder.age}세 · {elder.household}
              </p>
              <p className="mt-1 text-[14px] font-bold text-[#64738f]">
                담당 {elder.assignedWorkerName}
              </p>
            </div>
          </div>
        </section>

        <form
          className="rounded-[18px] border border-[#dfe8f5] bg-white px-5 py-2 shadow-[0_16px_38px_rgba(37,72,125,0.08)]"
          onSubmit={handleSubmit}
          noValidate
        >
          <FormField label="상담 방식">
            <OptionGroup
              ariaLabel="상담 방식"
              options={consultationMethodOptions}
              value={consultationMethod}
              onChange={setConsultationMethod}
            />
          </FormField>

          <FormField label="위험 판단">
            <OptionGroup
              ariaLabel="위험 판단"
              options={riskJudgementOptions}
              value={riskJudgement}
              onChange={setRiskJudgement}
              toneByValue={riskButtonClasses}
            />
          </FormField>

          <FormField label="상담 내용">
            <label className="block">
              <span className="sr-only">상담 내용</span>
              <textarea
                value={consultationContent}
                rows={5}
                maxLength={1200}
                onChange={(event) => {
                  setConsultationContent(event.target.value)
                  setErrorMessage(null)
                }}
                className="min-h-[154px] w-full resize-none rounded-lg border border-[#dbe3ef] bg-white px-4 py-3 text-[16px] font-bold leading-relaxed text-[#10204a] shadow-[inset_0_1px_2px_rgba(47,86,145,0.04)] outline-none transition placeholder:text-[#9aa8be] focus:border-[#0867f2] focus:ring-4 focus:ring-[#0867f2]/10"
                placeholder="상담 내용을 입력하세요."
              />
            </label>
          </FormField>

          <FormField label="조치 사항">
            <label className="block">
              <span className="sr-only">조치 사항</span>
              <textarea
                value={actionPlan}
                rows={4}
                maxLength={1000}
                onChange={(event) => {
                  setActionPlan(event.target.value)
                  setErrorMessage(null)
                }}
                className="min-h-[132px] w-full resize-none rounded-lg border border-[#dbe3ef] bg-white px-4 py-3 text-[16px] font-bold leading-relaxed text-[#10204a] shadow-[inset_0_1px_2px_rgba(47,86,145,0.04)] outline-none transition placeholder:text-[#9aa8be] focus:border-[#0867f2] focus:ring-4 focus:ring-[#0867f2]/10"
                placeholder="조치 사항을 입력하세요."
              />
            </label>
          </FormField>

          <FormField label="요양사 배정 여부">
            <OptionGroup
              ariaLabel="요양사 배정 여부"
              options={assignmentOptions}
              value={assignmentChoice}
              onChange={setAssignmentChoice}
            />
          </FormField>

          <FormField label="보호자 연락 여부">
            <OptionGroup
              ariaLabel="보호자 연락 여부"
              options={guardianContactOptions}
              value={guardianContact}
              onChange={setGuardianContact}
            />
          </FormField>

          <FormField label="다음 확인 일정">
            <label className="relative block max-w-[280px]">
              <span className="sr-only">다음 확인 일정</span>
              <input
                type="datetime-local"
                value={followUpAt}
                onChange={(event) => setFollowUpAt(event.target.value)}
                className="h-12 w-full rounded-lg border border-[#dbe3ef] bg-white px-4 pr-11 text-[15px] font-black text-[#10204a] shadow-[0_7px_16px_rgba(37,72,125,0.04)] outline-none transition focus:border-[#0867f2] focus:ring-4 focus:ring-[#0867f2]/10"
              />
              <CalendarClock
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#52627f]"
                strokeWidth={2.4}
              />
            </label>
          </FormField>

          {errorMessage ? (
            <p
              className="mt-3 rounded-lg border border-[#ffccd2] bg-[#fff0f2] px-4 py-3 text-[15px] font-black text-[#d81f2a]"
              role="alert"
            >
              {errorMessage}
            </p>
          ) : null}

          <div className="grid gap-3 py-5 sm:grid-cols-[1fr_auto_auto] sm:items-center">
            <p className="flex min-w-0 items-start gap-2 text-[13px] font-bold leading-relaxed text-[#64738f]">
              <FileText
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 shrink-0 text-[#0867f2]"
                strokeWidth={2.5}
              />
              저장 후 대상 어르신 상세 관리 화면으로 돌아갑니다.
            </p>
            <Link
              to={detailPath}
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#dfe8f5] bg-white px-5 text-[16px] font-black text-[#253758] shadow-[0_8px_18px_rgba(37,72,125,0.05)] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
            >
              취소
            </Link>
            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#0867f2] px-7 text-[17px] font-black text-white shadow-[0_12px_24px_rgba(8,103,242,0.28)] transition hover:bg-[#0057d8] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
            >
              <Check aria-hidden="true" className="h-5 w-5" strokeWidth={3} />
              저장하기
            </button>
          </div>
        </form>

        <aside className="grid gap-3 rounded-[16px] border border-[#dfe8f5] bg-white px-5 py-4 shadow-[0_10px_24px_rgba(37,72,125,0.06)] sm:grid-cols-3">
          {[
            ['최근 상담', '05.20 식단 조절 필요'],
            ['현재 위험도', '주의 관찰'],
            ['연계 상태', '요양사 배정 가능'],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex items-center gap-3 border-b border-[#e8eef7] pb-3 last:border-b-0 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-4 sm:last:border-r-0"
            >
              <UserRound
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-[#52627f]"
                strokeWidth={2.4}
              />
              <div className="min-w-0">
                <p className="text-[13px] font-bold text-[#64738f]">{label}</p>
                <p className="mt-1 truncate text-[15px] font-black text-[#071747]">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </main>
  )
}
