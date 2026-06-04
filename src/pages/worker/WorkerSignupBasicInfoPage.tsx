import {
  Bell,
  Briefcase,
  CalendarDays,
  Camera,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Circle,
  Mail,
  MapPin,
  Moon,
  Phone,
  ShieldCheck,
  Sun,
  Upload,
  UserRound,
  type LucideIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { caregiverTopNavItems } from '../../components/worker/caregiverTopNavigation'
import { cn } from '../../lib/utils'

const workerAvatarSrc = '/assets/dolbomon/role-select/role-worker.png'
const certificateAssetSrc = '/assets/dolbomon/worker/파일.png'

const steps = [
  { current: true, number: 1, subtitle: '현재 단계', title: '기본 정보' },
  { current: false, number: 2, subtitle: '다음 단계', title: '자격 정보' },
  {
    current: false,
    number: 3,
    subtitle: '최종 확인',
    title: '프로필 미리보기',
  },
]

const workAreaTags = ['서울 강남구', '서울 서초구', '경기 성남시 분당구']

const profileSummaryItems = [
  { icon: Briefcase, label: '경력', value: '3년' },
  { icon: MapPin, label: '거주지', value: '서울 강남구' },
  { icon: MapPin, label: '활동 지역', value: '서울 강남구 외 2곳' },
]

const checkItems = [
  { complete: true, label: '기본 정보' },
  { complete: false, label: '자격 정보' },
  { complete: false, label: '프로필 사진' },
  { complete: false, label: '자격증 첨부' },
  { complete: false, label: '프로필 미리보기' },
]

const tipItems = [
  '정확한 정보를 입력하시면 매칭 확률이 높아져요.',
  '희망 근무 지역은 최대 3곳까지 선택할 수 있어요.',
  '자기소개는 300자 이내로 작성해주세요.',
  '모든 내용은 추후 설정에서 수정할 수 있어요.',
]

const inputClass =
  'h-8 w-full rounded-lg border border-[#d6dfec] bg-white py-0 pl-10 pr-3 text-[14px] font-semibold text-[#10204f] shadow-[0_4px_12px_rgba(40,71,120,0.06)] transition placeholder:text-[#7c8ca8] focus:border-[#0867f2] focus:outline focus:outline-4 focus:outline-[#d7e8ff]'

function RequiredMark() {
  return (
    <span className="font-black text-[#e11d1d]" aria-hidden="true">
      *
    </span>
  )
}

function TopBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#e6edf8] bg-white/95 shadow-[0_4px_18px_rgba(32,70,130,0.06)] backdrop-blur">
      <div className="mx-auto flex min-h-[64px] w-full max-w-[1600px] flex-wrap items-center justify-between gap-x-5 gap-y-2 px-5 py-1 lg:flex-nowrap lg:px-10">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center text-[28px] font-black leading-none text-[#0867f2] drop-shadow-[0_5px_10px_rgba(8,103,242,0.16)] focus-visible:rounded-lg lg:text-[32px]"
          aria-label="돌봄ON 홈"
        >
          돌봄ON
        </Link>

        <nav
          className="order-3 flex w-full flex-wrap gap-x-2 gap-y-1 overflow-visible pb-2 text-[15px] font-extrabold text-[#101a3d] lg:order-none lg:w-auto lg:flex-nowrap lg:justify-center lg:gap-5 lg:pb-0"
          aria-label="요양사 메뉴"
        >
          {caregiverTopNavItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-lg px-2 transition hover:bg-[#f1f6ff] hover:text-[#0867f2] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="relative inline-grid min-h-10 min-w-10 place-items-center rounded-lg text-[#60708e] transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
            aria-label="알림 2건 확인"
          >
            <Bell aria-hidden="true" size={27} strokeWidth={2.5} />
            <span className="absolute right-1.5 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#ef2424] px-1 text-[12px] font-black leading-none text-white ring-2 ring-white">
              2
            </span>
          </button>

          <Link
            to="/caregiver"
            className="hidden min-h-11 items-center gap-3 rounded-lg px-1.5 py-1 transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff] sm:inline-flex"
            aria-label="김민수 요양사 프로필 보기"
          >
            <img
              src={workerAvatarSrc}
              alt=""
              className="h-10 w-10 rounded-full bg-[#edf4ff] object-cover shadow-[0_6px_14px_rgba(42,96,184,0.16)]"
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

function FieldLabel({
  children,
  required = false,
}: {
  children: string
  required?: boolean
}) {
  return (
    <span className="mb-1 block text-[13px] font-black leading-tight text-[#182650]">
      {children} {required ? <RequiredMark /> : null}
    </span>
  )
}

function TextField({
  defaultValue,
  icon: Icon,
  id,
  inputMode,
  label,
  required = false,
  type = 'text',
}: {
  defaultValue: string
  icon: LucideIcon
  id: string
  inputMode?: 'email' | 'numeric' | 'tel' | 'text'
  label: string
  required?: boolean
  type?: string
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id}>
        <FieldLabel required={required}>{label}</FieldLabel>
      </label>
      <span className="relative block">
        <Icon
          aria-hidden="true"
          className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#1d63df]"
          strokeWidth={2.5}
        />
        <input
          id={id}
          className={inputClass}
          defaultValue={defaultValue}
          inputMode={inputMode}
          required={required}
          type={type}
        />
      </span>
    </div>
  )
}

function StepProgress() {
  return (
    <section
      className="mt-3 grid gap-2 rounded-lg border border-[#dfe7f4] bg-white p-1 shadow-[0_10px_26px_rgba(47,86,145,0.07)] md:grid-cols-3"
      aria-label="가입 진행 단계"
    >
      {steps.map((step, index) => (
        <article
          key={step.number}
          className={cn(
            'grid min-h-[64px] grid-cols-[42px_minmax(0,1fr)_20px] items-center gap-3 rounded-lg px-3 py-1.5',
            step.current
              ? 'bg-[#f7fbff] text-[#0867f2] shadow-[0_8px_18px_rgba(8,103,242,0.10)] ring-1 ring-[#cfe0ff]'
              : 'bg-white text-[#16244d]',
          )}
          aria-current={step.current ? 'step' : undefined}
        >
          <span
            className={cn(
              'grid h-10 w-10 place-items-center rounded-full text-[18px] font-black shadow-[0_6px_14px_rgba(47,86,145,0.10)]',
              step.current
                ? 'bg-[#1b6df0] text-white ring-2 ring-white'
                : 'bg-[#f7faff] text-[#26365e] ring-1 ring-[#dde6f3]',
            )}
          >
            {step.number}
          </span>
          <span className="min-w-0">
            <strong className="block truncate text-[16px] font-black leading-tight">
              {step.title}
            </strong>
            <span
              className={cn(
                'mt-1 block truncate text-[13px] font-bold leading-tight',
                step.current ? 'text-[#0867f2]' : 'text-[#60708e]',
              )}
            >
              {step.subtitle}
            </span>
          </span>
          {index < steps.length - 1 ? (
            <ChevronRight
              aria-hidden="true"
              className="h-5 w-5 justify-self-end text-[#64748b]"
              strokeWidth={2.6}
            />
          ) : (
            <span aria-hidden="true" />
          )}
        </article>
      ))}
    </section>
  )
}

function AddressFields() {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-1 block text-[13px] font-black leading-tight text-[#182650]">
        주소 <RequiredMark />
      </legend>
      <div className="grid gap-1.5 sm:grid-cols-[164px_auto] sm:justify-start">
        <label className="relative block">
          <span className="sr-only">우편번호</span>
          <Mail
            aria-hidden="true"
            className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#60708e]"
            strokeWidth={2.5}
          />
          <input
            className={inputClass}
            defaultValue="06236"
            inputMode="numeric"
            required
            type="text"
          />
        </label>
        <button
          type="button"
          className="inline-flex min-h-8 items-center justify-center gap-2 rounded-lg border border-[#d6e4fb] bg-white px-4 text-[14px] font-black text-[#0867f2] shadow-[0_4px_12px_rgba(47,86,145,0.08)] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          <MapPin aria-hidden="true" className="h-5 w-5" strokeWidth={2.8} />
          우편번호 찾기
        </button>
      </div>
      <label className="mt-1 block">
        <span className="sr-only">기본 주소</span>
        <input
          className="h-8 w-full rounded-lg border border-[#d6dfec] bg-white px-4 text-[14px] font-semibold text-[#10204f] shadow-[0_4px_12px_rgba(40,71,120,0.06)] focus:border-[#0867f2] focus:outline focus:outline-4 focus:outline-[#d7e8ff]"
          defaultValue="서울특별시 강남구 테헤란로 123"
          required
          type="text"
        />
      </label>
      <label className="mt-1 block">
        <span className="sr-only">상세 주소</span>
        <input
          className="h-8 w-full rounded-lg border border-[#d6dfec] bg-white px-4 text-[14px] font-semibold text-[#10204f] shadow-[0_4px_12px_rgba(40,71,120,0.06)] focus:border-[#0867f2] focus:outline focus:outline-4 focus:outline-[#d7e8ff]"
          defaultValue="삼성동, 돌봄빌딩 101호"
          required
          type="text"
        />
      </label>
    </fieldset>
  )
}

function CareerSelect() {
  return (
    <label className="block min-w-0">
      <FieldLabel required>경력 연차</FieldLabel>
      <span className="relative block">
        <Briefcase
          aria-hidden="true"
          className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#1d63df]"
          strokeWidth={2.5}
        />
        <select
          className={`${inputClass} appearance-none pr-10`}
          defaultValue="3년"
          required
        >
          <option>1년 미만</option>
          <option>1년</option>
          <option>2년</option>
          <option>3년</option>
          <option>5년 이상</option>
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#60708e]"
          strokeWidth={2.6}
        />
      </span>
    </label>
  )
}

function WorkAreaField() {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-1 block text-[13px] font-black leading-tight text-[#182650]">
        희망 근무지 / 지역 <RequiredMark />
      </legend>
      <div className="relative flex min-h-8 w-full flex-wrap items-center gap-1.5 rounded-lg border border-[#d6dfec] bg-white py-0.5 pl-2 pr-9 shadow-[0_4px_12px_rgba(40,71,120,0.06)]">
        {workAreaTags.map((tag) => (
          <span
            key={tag}
            className="inline-flex min-h-6 items-center gap-1.5 whitespace-nowrap rounded-lg bg-[#eaf2ff] px-2.5 text-[12px] font-black text-[#0867f2]"
          >
            {tag}
            <button
              type="button"
              className="grid h-5 w-5 place-items-center rounded-full text-[#4c7fdc] transition hover:bg-white"
              aria-label={`${tag} 삭제`}
            >
              x
            </button>
          </span>
        ))}
        <button
          type="button"
          className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-lg text-[#60708e] transition hover:bg-[#f1f6ff]"
          aria-label="근무 지역 더 선택"
        >
          <ChevronDown aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>
    </fieldset>
  )
}

function AvailabilityCheckbox({
  checked = false,
  icon: Icon,
  label,
}: {
  checked?: boolean
  icon: LucideIcon
  label: string
}) {
  return (
    <label className="inline-flex min-h-7 items-center gap-2 text-[14px] font-bold text-[#182650]">
      <input
        className="h-5 w-5 rounded border-[#a7b8d2] accent-[#0867f2]"
        defaultChecked={checked}
        type="checkbox"
      />
      <Icon
        aria-hidden="true"
        className={cn('h-5 w-5', checked ? 'text-[#f5a300]' : 'text-[#8ea0bd]')}
        strokeWidth={2.5}
      />
      <span>{label}</span>
    </label>
  )
}

function ProfilePhotoUploader() {
  return (
    <fieldset className="rounded-lg border border-[#dfe7f4] bg-white p-2.5">
      <legend className="px-1 text-[13px] font-black text-[#182650]">
        프로필 사진 <RequiredMark />
      </legend>
      <div className="mt-1 grid gap-4 sm:grid-cols-[120px_minmax(0,1fr)] sm:items-center">
        <div className="text-center">
          <img
            src={workerAvatarSrc}
            alt="김민수 요양사 프로필 사진"
            className="mx-auto h-[64px] w-[64px] rounded-full bg-[#edf4ff] object-cover shadow-[0_8px_18px_rgba(47,86,145,0.14)]"
            draggable="false"
          />
          <label
            htmlFor="worker-profile-photo"
            className="mt-2 inline-flex min-h-9 cursor-pointer items-center justify-center gap-1 rounded-lg bg-[#eaf2ff] px-3 text-[13px] font-black text-[#0867f2] shadow-[0_4px_10px_rgba(47,86,145,0.08)] transition hover:bg-[#dceaff]"
          >
            <Camera aria-hidden="true" className="h-4 w-4" strokeWidth={2.8} />
            사진 변경
            <input
              id="worker-profile-photo"
              className="sr-only"
              accept="image/png,image/jpeg"
              type="file"
            />
          </label>
        </div>
        <div className="text-[14px] font-bold leading-relaxed text-[#52617d]">
          <p>권장 규격: 1:1 (최소 300x300px)</p>
          <p>JPG, PNG 파일만 가능 (최대 5MB)</p>
          <p>밝고 선명한 사진을 권장합니다.</p>
        </div>
      </div>
    </fieldset>
  )
}

function CertificateUploader() {
  return (
    <fieldset className="rounded-lg border border-[#dfe7f4] bg-white p-2.5">
      <legend className="px-1 text-[13px] font-black text-[#182650]">
        자격증 첨부 <RequiredMark />
      </legend>
      <div className="mt-1 grid gap-4 sm:grid-cols-[132px_minmax(0,1fr)] sm:items-center">
        <div className="text-center">
          <img
            src={certificateAssetSrc}
            alt="자격증 첨부 파일 아이콘"
            className="mx-auto h-[66px] w-[66px] object-contain"
            draggable="false"
          />
          <label
            htmlFor="worker-license-file"
            className="mt-1 inline-flex min-h-9 cursor-pointer items-center justify-center gap-1 rounded-lg bg-[#eaf2ff] px-3 text-[13px] font-black text-[#0867f2] shadow-[0_4px_10px_rgba(47,86,145,0.08)] transition hover:bg-[#dceaff]"
          >
            <Upload aria-hidden="true" className="h-4 w-4" strokeWidth={2.8} />
            파일 선택
            <input
              id="worker-license-file"
              className="sr-only"
              accept="image/png,image/jpeg,application/pdf"
              type="file"
            />
          </label>
        </div>
        <div className="text-[14px] font-bold leading-relaxed text-[#52617d]">
          <p>요양보호사 자격증을 첨부해주세요.</p>
          <p>JPG, PNG, PDF 파일만 가능 (최대 10MB)</p>
          <p>선명하게 보이는 파일을 업로드해주세요.</p>
        </div>
      </div>
    </fieldset>
  )
}

function ProfilePreviewCard() {
  return (
    <section
      className="rounded-lg border border-[#dfe7f4] bg-white p-4 shadow-[0_12px_30px_rgba(47,86,145,0.08)]"
      aria-labelledby="worker-preview-title"
    >
      <h2
        id="worker-preview-title"
        className="text-[18px] font-black leading-tight text-[#071747]"
      >
        프로필 미리보기
      </h2>
      <div className="mt-4 text-center">
        <img
          src={workerAvatarSrc}
          alt="김민수 요양사 프로필 미리보기"
          className="mx-auto h-[128px] w-[128px] rounded-full bg-[#edf4ff] object-cover shadow-[0_10px_24px_rgba(47,86,145,0.12)]"
          draggable="false"
        />
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <strong className="text-[20px] font-black leading-tight text-[#071747]">
            김민수 요양사
          </strong>
          <span className="inline-flex min-h-8 items-center rounded-full bg-[#eaf2ff] px-3 text-[13px] font-black text-[#0867f2] shadow-[0_5px_12px_rgba(8,103,242,0.12)]">
            가입 준비중
          </span>
        </div>
      </div>
      <dl className="mt-4 grid gap-2.5">
        {profileSummaryItems.map((item) => {
          const Icon = item.icon

          return (
            <div
              key={item.label}
              className="grid grid-cols-[28px_78px_minmax(0,1fr)] items-center gap-2 text-[14px]"
            >
              <Icon
                aria-hidden="true"
                className="h-5 w-5 text-[#60708e]"
                strokeWidth={2.5}
              />
              <dt className="font-black text-[#50607f]">{item.label}</dt>
              <dd className="min-w-0 font-black text-[#17244d]">
                {item.value}
              </dd>
            </div>
          )
        })}
      </dl>
    </section>
  )
}

function InputCheckCard() {
  return (
    <section
      className="rounded-lg border border-[#dfe7f4] bg-white p-4 shadow-[0_12px_30px_rgba(47,86,145,0.08)]"
      aria-labelledby="worker-check-title"
    >
      <h2
        id="worker-check-title"
        className="text-[18px] font-black leading-tight text-[#071747]"
      >
        입력 항목 체크
      </h2>
      <ul className="mt-3 grid gap-1.5">
        {checkItems.map((item) => (
          <li
            key={item.label}
            className="grid grid-cols-[24px_minmax(0,1fr)_58px] items-center gap-2 text-[14px] font-black"
          >
            {item.complete ? (
              <CheckCircle2
                aria-hidden="true"
                className="h-[18px] w-[18px] text-[#1db36b]"
                fill="#1db36b"
                strokeWidth={2.8}
              />
            ) : (
              <Circle
                aria-hidden="true"
                className="h-[18px] w-[18px] text-[#9aa9bf]"
                strokeWidth={2.5}
              />
            )}
            <span className="text-[#1a2850]">{item.label}</span>
            <span
              className={cn(
                'inline-flex min-h-6 items-center justify-center rounded-full px-2 text-[11px] ring-1',
                item.complete
                  ? 'bg-[#e9fbf2] text-[#15915a] ring-[#bdeccf]'
                  : 'bg-[#f4f7fb] text-[#6b7a91] ring-[#dce4ef]',
              )}
            >
              {item.complete ? '완료' : '미완료'}
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
      className="rounded-lg border border-[#dfe7f4] bg-white p-4 shadow-[0_12px_30px_rgba(47,86,145,0.08)]"
      aria-labelledby="worker-tips-title"
    >
      <h2
        id="worker-tips-title"
        className="flex items-center gap-2 text-[18px] font-black leading-tight text-[#0867f2]"
      >
        <span
          className="grid h-8 w-8 place-items-center rounded-full bg-[#fff4d6] text-[#d97706]"
          aria-hidden="true"
        >
          !
        </span>
        입력 팁
      </h2>
      <ul className="mt-3 grid gap-2.5 text-[13px] font-bold leading-snug text-[#445575]">
        {tipItems.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0867f2]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function WorkerSignupBasicInfoPage() {
  return (
    <main className="min-h-svh overflow-x-hidden bg-[#f8fbff] text-[#071747]">
      <TopBar />

      <div className="mx-auto grid w-full max-w-[1400px] gap-6 px-4 py-4 md:px-6 xl:grid-cols-[minmax(0,970px)_360px] xl:gap-12 xl:px-5">
        <div className="min-w-0">
          <header>
            <h1 className="text-[30px] font-black leading-tight text-[#071747]">
              요양사 가입 정보
            </h1>
            <p className="mt-1.5 max-w-[330px] text-[16px] font-bold leading-snug text-[#52617d] sm:max-w-none">
              정확한 정보를 입력하시면 더 빠르게 활동을 시작하실 수 있습니다.
            </p>
          </header>

          <StepProgress />

          <form
            className="mt-2 rounded-lg border border-[#dfe7f4] bg-white p-4 shadow-[0_14px_36px_rgba(47,86,145,0.08)]"
            aria-labelledby="worker-basic-form-title"
          >
            <h2
              id="worker-basic-form-title"
              className="text-[20px] font-black leading-tight text-[#071747]"
            >
              기본 정보 입력
            </h2>

            <div className="mt-3 grid gap-3 lg:grid-cols-3">
              <TextField
                defaultValue="김민수"
                icon={UserRound}
                id="worker-name"
                label="이름"
                required
              />
              <TextField
                defaultValue="1985-03-15"
                icon={CalendarDays}
                id="worker-birth-date"
                label="생년월일"
                required
              />
              <TextField
                defaultValue="010-1234-5678"
                icon={Phone}
                id="worker-phone"
                inputMode="tel"
                label="연락처"
                required
                type="tel"
              />
            </div>

            <div className="mt-2 grid gap-3 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
              <TextField
                defaultValue="minsu.kim@example.com"
                icon={Mail}
                id="worker-email"
                inputMode="email"
                label="이메일"
                required
                type="email"
              />
            </div>

            <div className="mt-2">
              <AddressFields />
            </div>

            <div className="mt-2 grid gap-3 lg:grid-cols-[minmax(0,1fr)_144px_minmax(0,1.8fr)]">
              <TextField
                defaultValue="2021-01-123456"
                icon={ShieldCheck}
                id="worker-license-number"
                label="요양보호사 자격번호"
                required
              />
              <CareerSelect />
              <WorkAreaField />
            </div>

            <div className="mt-2 grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <fieldset>
                <legend className="mb-1 block text-[13px] font-black leading-tight text-[#182650]">
                  근무 가능 시간 <RequiredMark />
                </legend>
                <div className="grid gap-x-5 gap-y-2 sm:grid-cols-2">
                  <AvailabilityCheckbox
                    checked
                    icon={Sun}
                    label="오전 (09:00 ~ 13:00)"
                  />
                  <AvailabilityCheckbox
                    checked
                    icon={Sun}
                    label="오후 (13:00 ~ 17:00)"
                  />
                  <AvailabilityCheckbox
                    checked
                    icon={Moon}
                    label="저녁 (17:00 ~ 21:00)"
                  />
                  <AvailabilityCheckbox
                    icon={Moon}
                    label="야간 (21:00 ~ 09:00)"
                  />
                </div>
              </fieldset>

              <label className="block min-w-0">
                <FieldLabel required>자기소개</FieldLabel>
                <span className="relative block">
                  <textarea
                    className="h-[72px] w-full resize-none overflow-hidden rounded-lg border border-[#d6dfec] bg-white px-4 pb-6 pt-2 text-[14px] font-semibold leading-snug text-[#10204f] shadow-[0_4px_12px_rgba(40,71,120,0.06)] focus:border-[#0867f2] focus:outline focus:outline-4 focus:outline-[#d7e8ff]"
                    defaultValue={
                      '어르신의 일상에 따뜻한 동행이 되어드리고 싶습니다.\n성실하고 책임감 있게 최선을 다하겠습니다.'
                    }
                    maxLength={300}
                    required
                  />
                  <span className="absolute bottom-2 right-3 text-[12px] font-bold text-[#60708e]">
                    46/300
                  </span>
                </span>
              </label>
            </div>

            <div className="mt-2 grid gap-3 lg:grid-cols-2">
              <ProfilePhotoUploader />
              <CertificateUploader />
            </div>

            <div className="mt-3 flex flex-col gap-3 border-t border-[#e5ecf6] pt-2.5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[14px] font-bold text-[#50607f]">
                <RequiredMark /> 표시는 필수 입력 항목입니다.
              </p>
              <Link
                to="/worker/signup/license"
                className="inline-flex min-h-10 items-center justify-center gap-3 rounded-lg bg-[#0867f2] px-7 text-[17px] font-black text-white shadow-[0_12px_24px_rgba(8,103,242,0.26)] transition hover:bg-[#0057d8] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
              >
                저장하고 다음
                <ChevronRight
                  aria-hidden="true"
                  className="h-6 w-6"
                  strokeWidth={2.8}
                />
              </Link>
            </div>
          </form>
        </div>

        <aside
          className="grid content-start gap-4 xl:pt-[66px]"
          aria-label="가입 정보 보조 패널"
        >
          <ProfilePreviewCard />
          <InputCheckCard />
          <SignupTipsCard />
        </aside>
      </div>
    </main>
  )
}
