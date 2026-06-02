import {
  Bell,
  Briefcase,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  Home,
  Lightbulb,
  MapPin,
  UploadCloud,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { caregiverTopNavItems } from '../../components/worker/caregiverTopNavigation'
import { cn } from '../../lib/utils'

const workerAvatarSrc = '/assets/dolbomon/role-select/role-worker.png'

const stepItems = [
  {
    id: 'basic',
    number: 1,
    state: 'done',
    subtitle: '현재 단계',
    title: '기본 정보',
  },
  {
    id: 'license',
    number: 2,
    state: 'current',
    subtitle: '다음 단계',
    title: '자격 정보',
  },
  {
    id: 'preview',
    number: 3,
    state: 'upcoming',
    subtitle: '최종 확인',
    title: '프로필 미리보기',
  },
] as const

const profileSummaryItems = [
  { icon: Briefcase, label: '경력', value: '3년' },
  { icon: Home, label: '거주지', value: '서울 강남구' },
  { icon: MapPin, label: '활동 지역', value: '서울 강남구 외 2곳' },
]

const checkItems = [
  { label: '기본 정보', number: 1, status: '완료', state: 'done' },
  { label: '자격 정보', number: 2, status: '진행 중', state: 'current' },
  { label: '프로필 사진', number: 3, status: '미완료', state: 'pending' },
  { label: '자격증 첨부', number: 4, status: '미완료', state: 'pending' },
  { label: '프로필 미리보기', number: 5, status: '미완료', state: 'pending' },
] as const

const tipItems = [
  '보유 자격증과 경력을 정확하게 기재해 주세요.',
  '활동 가능 지역은 최대 3곳까지 선택할 수 있습니다.',
  '자기소개는 300자 이내로 작성해 주세요.',
  '모든 정보는 설정에서 언제든 수정할 수 있습니다.',
]

const certificateOptions = [
  { checked: true, label: '요양보호사 1급' },
  { label: '사회복지사' },
  { label: '간호조무사' },
  { checked: true, label: '치매교육 수료' },
]

const serviceOptions = [
  { checked: true, label: '치매 케어' },
  { checked: true, label: '식사 보조' },
  { checked: true, label: '복약 관리' },
  { checked: true, label: '이동 보조' },
  { label: '정서 지원' },
  { label: '야간 케어' },
]

const workTypeOptions = [
  { checked: true, label: '방문 요양' },
  { checked: true, label: '주간 돌봄' },
  { label: '단기 돌봄' },
]

const dayOptions = [
  { label: '월' },
  { active: true, label: '화' },
  { label: '수' },
  { active: true, label: '목' },
  { label: '금' },
  { label: '토' },
  { label: '일' },
]

const inputClass =
  'h-9 w-full rounded-md border border-[#d7dfeb] bg-white px-4 text-[14px] font-semibold text-[#17244d] shadow-[0_4px_12px_rgba(40,71,120,0.05)] transition placeholder:text-[#8390a6] focus:border-[#0867f2] focus:outline focus:outline-4 focus:outline-[#d7e8ff]'
const compactInputClass =
  'h-9 w-full rounded-md border border-[#d7dfeb] bg-white px-0 text-center text-[12px] font-semibold text-[#17244d] shadow-[0_4px_12px_rgba(40,71,120,0.05)] transition focus:border-[#0867f2] focus:outline focus:outline-4 focus:outline-[#d7e8ff]'

function WorkerSignupTopBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#e5ecf7] bg-white/95 shadow-[0_4px_18px_rgba(32,70,130,0.06)] backdrop-blur">
      <div className="flex min-h-[67px] w-full flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-1 lg:flex-nowrap lg:px-10">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center text-[30px] font-black leading-none text-[#0867f2] drop-shadow-[0_5px_10px_rgba(8,103,242,0.16)] focus-visible:rounded-lg lg:text-[34px]"
          aria-label="돌봄ON 홈"
        >
          돌봄ON
        </Link>

        <nav
          className="order-3 flex w-full gap-3 overflow-x-auto text-[16px] font-extrabold text-[#111a38] lg:order-none lg:w-auto lg:justify-center lg:gap-14"
          aria-label="요양사 메뉴"
        >
          {caregiverTopNavItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-lg px-1 transition hover:bg-[#f1f6ff] hover:text-[#0867f2] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="relative inline-grid min-h-10 min-w-10 place-items-center rounded-lg text-[#60708e] transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
            aria-label="알림 2건 확인"
          >
            <Bell aria-hidden="true" size={27} strokeWidth={2.4} />
            <span className="absolute right-1 top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-[#ef2424] px-1 text-[12px] font-black leading-none text-white ring-2 ring-white">
              2
            </span>
          </button>

          <Link
            to="/worker/mypage"
            className="inline-flex min-h-12 items-center gap-3 rounded-lg px-1.5 py-1 transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
            aria-label="김민수 요양사 프로필 보기"
          >
            <img
              src={workerAvatarSrc}
              alt=""
              className="h-12 w-12 rounded-full bg-[#edf4ff] object-cover shadow-[0_6px_14px_rgba(42,96,184,0.16)]"
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

function SignupStepProgress() {
  return (
    <section
      className="mt-4 grid gap-3 md:grid-cols-3"
      aria-label="가입 진행 단계"
    >
      {stepItems.map((step, index) => {
        const isComplete = step.state === 'done'
        const isCurrent = step.state === 'current'
        const isActive = isComplete || isCurrent

        return (
          <article
            key={step.id}
            className={cn(
              'grid min-h-[70px] grid-cols-[42px_minmax(0,1fr)_20px] items-center gap-3 rounded-lg border bg-white px-5 py-3 shadow-[0_10px_26px_rgba(47,86,145,0.07)]',
              isCurrent
                ? 'border-[#1d6df2] ring-1 ring-[#8bbcff]'
                : 'border-[#dfe7f4]',
            )}
            aria-current={isCurrent ? 'step' : undefined}
          >
            <span
              className={cn(
                'grid h-9 w-9 place-items-center rounded-full text-[17px] font-black',
                isActive
                  ? 'bg-[#1164ee] text-white shadow-[0_6px_16px_rgba(17,100,238,0.25)]'
                  : 'bg-white text-[#50607f] ring-2 ring-[#ccd7e8]',
              )}
            >
              {step.number}
            </span>

            <span className="min-w-0">
              <strong
                className={cn(
                  'block truncate text-[16px] font-black leading-tight',
                  isActive ? 'text-[#0867f2]' : 'text-[#2d3957]',
                )}
              >
                {step.title}
              </strong>
              <span className="mt-1 block truncate text-[13px] font-bold leading-tight text-[#60708e]">
                {step.subtitle}
              </span>
            </span>

            {index < stepItems.length - 1 ? (
              <ChevronRight
                aria-hidden="true"
                className="h-5 w-5 justify-self-end text-[#64748b]"
                strokeWidth={2.6}
              />
            ) : (
              <span aria-hidden="true" />
            )}
          </article>
        )
      })}
    </section>
  )
}

function FormRow({
  children,
  id,
  label,
  top = false,
}: {
  children: ReactNode
  id: string
  label: string
  top?: boolean
}) {
  return (
    <div
      className={cn(
        'grid gap-2 lg:grid-cols-[180px_minmax(0,1fr)]',
        top ? 'lg:items-start' : 'lg:items-center',
      )}
      role="group"
      aria-labelledby={id}
    >
      <div
        id={id}
        className={cn(
          'text-[14px] font-black leading-tight text-[#16244d]',
          top ? 'lg:pt-2' : '',
        )}
      >
        {label}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  )
}

function InlineLabel({
  children,
  htmlFor,
}: {
  children: string
  htmlFor?: string
}) {
  if (htmlFor) {
    return (
      <label
        htmlFor={htmlFor}
        className="shrink-0 text-[14px] font-black text-[#16244d]"
      >
        {children}
      </label>
    )
  }

  return (
    <span className="shrink-0 text-[14px] font-black text-[#16244d]">
      {children}
    </span>
  )
}

function DateInput({
  ariaLabel,
  defaultValue,
  id,
}: {
  ariaLabel: string
  defaultValue: string
  id?: string
}) {
  return (
    <span className="relative block min-w-0">
      <CalendarDays
        aria-hidden="true"
        className="absolute left-3 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-[#6b7890]"
        strokeWidth={2.3}
      />
      <input
        aria-label={ariaLabel}
        className={`${inputClass} pl-10`}
        defaultValue={defaultValue}
        id={id}
        type="text"
      />
    </span>
  )
}

function SelectInput({
  ariaLabel,
  children,
  defaultValue,
}: {
  ariaLabel: string
  children: ReactNode
  defaultValue: string
}) {
  return (
    <span className="relative block min-w-0">
      <select
        aria-label={ariaLabel}
        className={`${inputClass} appearance-none pr-10`}
        defaultValue={defaultValue}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#60708e]"
        strokeWidth={2.6}
      />
    </span>
  )
}

function CheckboxChip({
  checked = false,
  label,
}: {
  checked?: boolean
  label: string
}) {
  return (
    <label
      className={cn(
        'inline-flex min-h-8 items-center justify-center gap-2 rounded-md border px-3 text-[14px] font-black shadow-[0_3px_9px_rgba(47,86,145,0.05)] transition',
        checked
          ? 'border-[#b9d2ff] bg-[#f7fbff] text-[#0867f2]'
          : 'border-[#d7dfeb] bg-white text-[#2d3957]',
      )}
    >
      <input
        className="h-4 w-4 rounded border-[#a7b8d2] accent-[#0867f2]"
        defaultChecked={checked}
        type="checkbox"
      />
      <span>{label}</span>
    </label>
  )
}

function DayToggle({
  active = false,
  label,
}: {
  active?: boolean
  label: string
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        'inline-flex h-8 min-w-11 items-center justify-center rounded-md border text-[13px] font-black shadow-[0_3px_9px_rgba(47,86,145,0.05)] transition focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]',
        active
          ? 'border-[#1164ee] bg-[#1164ee] text-white'
          : 'border-[#d7dfeb] bg-white text-[#2d3957]',
      )}
    >
      {label}
    </button>
  )
}

function UploadDropzone({ id, title }: { id: string; title: string }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[14px] font-black text-[#16244d]"
      >
        {title}
      </label>
      <label
        htmlFor={id}
        className="grid min-h-[76px] cursor-pointer place-items-center rounded-lg border border-dashed border-[#b6c8e4] bg-white px-4 py-3 text-center shadow-[0_4px_12px_rgba(40,71,120,0.04)] transition hover:bg-[#f7fbff] focus-within:outline focus-within:outline-4 focus-within:outline-offset-2 focus-within:outline-[#8bbcff]"
      >
        <input
          id={id}
          className="sr-only"
          accept="image/png,image/jpeg,application/pdf"
          type="file"
        />
        <span className="inline-flex items-center gap-2 text-[14px] font-bold text-[#52617d]">
          <UploadCloud
            aria-hidden="true"
            className="h-6 w-6 text-[#0867f2]"
            strokeWidth={2.5}
          />
          <span>
            <strong className="font-black text-[#0867f2]">파일 선택</strong>{' '}
            또는 드래그하여 업로드
          </span>
        </span>
        <span className="mt-1 text-[13px] font-bold text-[#6b7890]">
          JPG, PNG, PDF (최대 10MB)
        </span>
      </label>
    </div>
  )
}

function WorkerLicenseForm() {
  return (
    <form
      className="mt-3 rounded-lg border border-[#dfe7f4] bg-white px-6 py-4 shadow-[0_14px_36px_rgba(47,86,145,0.08)] md:px-7"
      aria-labelledby="worker-license-form-title"
    >
      <h2
        id="worker-license-form-title"
        className="text-[20px] font-black leading-tight text-[#071747]"
      >
        자격 정보 입력
      </h2>

      <div className="mt-4 grid gap-2">
        <FormRow id="worker-certificates-label" label="보유 자격증">
          <div className="flex flex-wrap gap-5">
            {certificateOptions.map((option) => (
              <CheckboxChip
                key={option.label}
                checked={option.checked}
                label={option.label}
              />
            ))}
          </div>
        </FormRow>

        <FormRow id="worker-license-issuer-label" label="자격증 발급기관">
          <div className="grid gap-4 xl:grid-cols-[minmax(0,264px)_minmax(0,230px)_minmax(0,240px)]">
            <input
              aria-label="자격증 발급기관"
              className={inputClass}
              defaultValue="한국보건의료인국가시험원"
              type="text"
            />

            <div className="grid min-w-0 grid-cols-[64px_minmax(0,1fr)] items-center gap-2">
              <InlineLabel htmlFor="worker-license-date">취득일</InlineLabel>
              <DateInput
                ariaLabel="취득일"
                defaultValue="2020-06-15"
                id="worker-license-date"
              />
            </div>

            <div className="grid min-w-0 grid-cols-[64px_minmax(0,1fr)] items-center gap-2">
              <InlineLabel htmlFor="worker-license-number">
                자격번호
              </InlineLabel>
              <input
                id="worker-license-number"
                className={inputClass}
                defaultValue="2021-01-123456"
                type="text"
              />
            </div>
          </div>
        </FormRow>

        <FormRow id="worker-agency-label" label="기관명">
          <div className="grid gap-4 xl:grid-cols-[minmax(0,264px)_minmax(0,250px)_minmax(0,300px)]">
            <input
              aria-label="기관명"
              className={inputClass}
              defaultValue="행복돌봄센터"
              type="text"
            />

            <div className="grid min-w-0 grid-cols-[64px_minmax(0,1fr)] items-center gap-2">
              <InlineLabel>근무 기간</InlineLabel>
              <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_16px_minmax(0,1fr)] items-center gap-2">
                <input
                  aria-label="근무 시작월"
                  className={compactInputClass}
                  defaultValue="2021.03"
                  type="text"
                />
                <span className="text-center text-[14px] font-black text-[#5d6880]">
                  ~
                </span>
                <input
                  aria-label="근무 종료월"
                  className={compactInputClass}
                  defaultValue="2024.05"
                  type="text"
                />
              </div>
            </div>

            <div className="grid min-w-0 grid-cols-[64px_minmax(0,1fr)] items-center gap-2">
              <InlineLabel>담당 업무</InlineLabel>
              <SelectInput
                ariaLabel="담당 업무"
                defaultValue="방문 요양 및 생활 지원"
              >
                <option>방문 요양 및 생활 지원</option>
                <option>주간 돌봄 지원</option>
                <option>정서 지원 및 말벗</option>
              </SelectInput>
            </div>
          </div>
        </FormRow>

        <FormRow id="worker-services-label" label="전문 분야 / 가능 서비스">
          <div className="flex flex-wrap gap-4">
            {serviceOptions.map((option) => (
              <CheckboxChip
                key={option.label}
                checked={option.checked}
                label={option.label}
              />
            ))}
          </div>
        </FormRow>

        <FormRow id="worker-work-type-label" label="희망 근무 형태">
          <div className="flex flex-wrap gap-4">
            {workTypeOptions.map((option) => (
              <CheckboxChip
                key={option.label}
                checked={option.checked}
                label={option.label}
              />
            ))}
          </div>
        </FormRow>

        <FormRow id="worker-availability-label" label="희망 활동 시간 / 요일">
          <div className="flex flex-wrap items-center gap-4">
            <div className="w-full min-w-[210px] max-w-[220px]">
              <SelectInput
                ariaLabel="희망 활동 시간"
                defaultValue="오전 (09:00 ~ 12:00)"
              >
                <option>오전 (09:00 ~ 12:00)</option>
                <option>오후 (13:00 ~ 17:00)</option>
                <option>저녁 (17:00 ~ 21:00)</option>
              </SelectInput>
            </div>
            <div className="flex flex-wrap gap-4">
              {dayOptions.map((day) => (
                <DayToggle
                  key={day.label}
                  active={day.active}
                  label={day.label}
                />
              ))}
            </div>
          </div>
        </FormRow>

        <FormRow id="worker-education-label" label="추가 교육 수료 내역">
          <div className="grid gap-4 xl:grid-cols-[minmax(0,600px)_minmax(0,240px)]">
            <input
              aria-label="추가 교육 수료 내역"
              className={inputClass}
              defaultValue="치매 이해와 케어 과정 수료 (대한치매협회)"
              type="text"
            />
            <div className="grid min-w-0 grid-cols-[64px_minmax(0,1fr)] items-center gap-2">
              <InlineLabel htmlFor="worker-education-date">수료일</InlineLabel>
              <input
                id="worker-education-date"
                className={inputClass}
                defaultValue="2023.09.20"
                type="text"
              />
            </div>
          </div>
        </FormRow>

        <FormRow id="worker-introduction-label" label="자기소개" top>
          <textarea
            aria-labelledby="worker-introduction-label"
            className="min-h-[66px] w-full resize-y rounded-md border border-[#d7dfeb] bg-white px-4 py-2 text-[14px] font-semibold leading-relaxed text-[#17244d] shadow-[0_4px_12px_rgba(40,71,120,0.05)] focus:border-[#0867f2] focus:outline focus:outline-4 focus:outline-[#d7e8ff]"
            defaultValue={
              '어르신 한 분 한 분의 일상을 따뜻하게 지켜드리고 싶어 요양사의 길을 선택했습니다.\n성실하고 책임감 있게 돌봄을 실천하며, 항상 어르신의 입장에서 생각하겠습니다.'
            }
            maxLength={300}
          />
          <span className="mt-1 block text-right text-[13px] font-bold text-[#60708e]">
            84 / 300자
          </span>
        </FormRow>

        <div className="grid gap-6 pt-2 lg:grid-cols-2">
          <UploadDropzone id="worker-license-file" title="자격증 첨부" />
          <UploadDropzone id="worker-career-file" title="경력 증빙 첨부" />
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-4">
        <Link
          to="/worker/signup"
          className="inline-flex min-h-11 min-w-[142px] items-center justify-center rounded-lg border border-[#7aa8ff] bg-white px-6 text-[16px] font-black text-[#0867f2] shadow-[0_8px_18px_rgba(47,86,145,0.08)] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          이전
        </Link>
        <Link
          to="/worker/signup/preview"
          className="inline-flex min-h-11 min-w-[162px] items-center justify-center rounded-lg bg-[#0867f2] px-7 text-[16px] font-black text-white shadow-[0_12px_24px_rgba(8,103,242,0.26)] transition hover:bg-[#0057d8] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          저장하고 다음
        </Link>
      </div>
    </form>
  )
}

function WorkerProfilePreviewCard() {
  return (
    <section
      className="rounded-lg border border-[#dfe7f4] bg-white p-5 shadow-[0_12px_30px_rgba(47,86,145,0.08)]"
      aria-labelledby="worker-preview-title"
    >
      <h2
        id="worker-preview-title"
        className="text-[21px] font-black leading-tight text-[#071747]"
      >
        프로필 미리보기
      </h2>

      <div className="mt-5 grid gap-5 sm:grid-cols-[124px_minmax(0,1fr)] sm:items-start">
        <img
          src={workerAvatarSrc}
          alt="김민수 요양사 프로필 미리보기"
          className="mx-auto h-[124px] w-[124px] rounded-full bg-[#edf4ff] object-cover shadow-[0_10px_24px_rgba(47,86,145,0.12)] sm:mx-0"
          draggable="false"
        />

        <div className="min-w-0 text-center sm:text-left">
          <strong className="block text-[20px] font-black leading-tight text-[#071747]">
            김민수 요양사
          </strong>
          <span className="mt-2 inline-flex min-h-8 items-center rounded-full border border-[#7aa8ff] bg-white px-4 text-[13px] font-black text-[#0867f2] shadow-[0_5px_12px_rgba(8,103,242,0.09)]">
            가입 준비중
          </span>

          <dl className="mt-3 grid gap-2 border-t border-[#e5ecf6] pt-2">
            {profileSummaryItems.map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.label}
                  className="grid grid-cols-[24px_70px_minmax(0,1fr)] items-center gap-2 text-[14px]"
                >
                  <Icon
                    aria-hidden="true"
                    className="h-5 w-5 text-[#60708e]"
                    strokeWidth={2.5}
                  />
                  <dt className="font-black text-[#50607f]">{item.label}</dt>
                  <dd className="min-w-0 text-right font-black text-[#64708a]">
                    {item.value}
                  </dd>
                </div>
              )
            })}
          </dl>
        </div>
      </div>
    </section>
  )
}

function InputCheckCard() {
  return (
    <section
      className="rounded-lg border border-[#dfe7f4] bg-white p-5 shadow-[0_12px_30px_rgba(47,86,145,0.08)]"
      aria-labelledby="worker-check-title"
    >
      <h2
        id="worker-check-title"
        className="text-[21px] font-black leading-tight text-[#071747]"
      >
        입력 항목 체크
      </h2>

      <ul className="mt-4 grid">
        {checkItems.map((item, index) => (
          <li
            key={item.label}
            className={cn(
              'grid min-h-[42px] grid-cols-[28px_minmax(0,1fr)_82px] items-center gap-2 text-[14px] font-black',
              index > 0 ? 'border-t border-[#e5ecf6]' : '',
            )}
          >
            <span
              className={cn(
                'grid h-6 w-6 place-items-center rounded-full text-[12px] font-black',
                item.state === 'done'
                  ? 'bg-[#10b981] text-white'
                  : item.state === 'current'
                    ? 'bg-[#1164ee] text-white'
                    : 'bg-[#8792a8] text-white',
              )}
            >
              {item.state === 'done' ? (
                <Check aria-hidden="true" className="h-4 w-4" strokeWidth={3} />
              ) : (
                item.number
              )}
            </span>
            <span className="text-[#1a2850]">{item.label}</span>
            <span
              className={cn(
                'inline-flex min-h-7 items-center justify-center rounded-full px-2 text-[12px]',
                item.state === 'done'
                  ? 'bg-[#dff7ec] text-[#12925c]'
                  : item.state === 'current'
                    ? 'bg-[#e7f0ff] text-[#0867f2]'
                    : 'bg-[#f1f3f6] text-[#7b8494]',
              )}
            >
              {item.status}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function SignupTipsCard() {
  return (
    <section
      className="rounded-lg border border-[#dfe7f4] bg-white p-5 shadow-[0_12px_30px_rgba(47,86,145,0.08)]"
      aria-labelledby="worker-tips-title"
    >
      <h2
        id="worker-tips-title"
        className="flex items-center gap-2 text-[21px] font-black leading-tight text-[#071747]"
      >
        <Lightbulb
          aria-hidden="true"
          className="h-6 w-6 text-[#0867f2]"
          fill="#eaf2ff"
          strokeWidth={2.6}
        />
        입력 팁
      </h2>

      <ul className="mt-4 grid gap-2 text-[12px] font-bold leading-snug text-[#445575]">
        {tipItems.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#64748b]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function WorkerSignupLicensePage() {
  return (
    <main className="min-h-svh bg-[#f8fbff] text-[#071747]">
      <WorkerSignupTopBar />

      <div className="mx-auto grid w-full max-w-[1608px] gap-6 px-4 py-4 md:px-6 xl:grid-cols-[minmax(0,1114px)_432px] xl:gap-14 xl:px-0">
        <div className="min-w-0">
          <header>
            <h1 className="text-[31px] font-black leading-tight text-[#071747]">
              요양사 가입 정보
            </h1>
            <p className="mt-2 text-[14px] font-bold leading-snug text-[#52617d]">
              정확한 정보를 입력하시면 더 빠르게 활동을 시작하실 수 있습니다.
            </p>
          </header>

          <SignupStepProgress />
          <WorkerLicenseForm />
        </div>

        <aside
          className="grid content-start gap-4"
          aria-label="가입 정보 보조 패널"
        >
          <WorkerProfilePreviewCard />
          <InputCheckCard />
          <SignupTipsCard />
        </aside>
      </div>
    </main>
  )
}
