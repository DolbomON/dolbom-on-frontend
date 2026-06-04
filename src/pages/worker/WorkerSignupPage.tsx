import {
  Award,
  Briefcase,
  Check,
  ChevronRight,
  Clock,
  FileText,
  Heart,
  Home,
  Image,
  Lightbulb,
  MapPin,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { CaregiverTopBar } from '../../components/worker/CaregiverTopBar'
import { cn } from '../../lib/utils'

const workerAvatarSrc = '/assets/dolbomon/role-select/role-worker.png'
const documentAssetSrc = '/assets/dolbomon/worker/파일.png'

const stepItems = [
  {
    id: 'basic',
    number: 1,
    state: 'done',
    subtitle: '완료',
    title: '기본 정보',
  },
  {
    id: 'license',
    number: 2,
    state: 'done',
    subtitle: '완료',
    title: '자격 정보',
  },
  {
    id: 'preview',
    number: 3,
    state: 'current',
    subtitle: '최종 확인',
    title: '프로필 미리보기',
  },
] as const

const profileSummaryItems = [
  { icon: Briefcase, label: '경력', value: '3년' },
  { icon: Home, label: '거주지', value: '서울 강남구' },
  { icon: MapPin, label: '활동 지역', value: '서울 강남구 외 2곳' },
]

const qualificationItems = ['요양보호사 1급', '치매교육 수료']

const serviceItems = ['치매 케어', '식사 보조', '복약 관리', '이동 보조']

const availabilitySlots = ['오전 (09:00 ~ 12:00)', '오후 (13:00 ~ 17:00)']

const availabilityDays = [
  { active: true, label: '월' },
  { active: true, label: '화' },
  { label: '수' },
  { active: true, label: '목' },
  { active: true, label: '금' },
  { label: '토' },
  { label: '일' },
]

const documentItems = [
  {
    extension: 'JPG',
    name: '요양보호사 1급 자격증',
    size: '1.2MB',
  },
  {
    extension: 'PDF',
    name: '치매교육 수료증',
    size: '0.8MB',
  },
  {
    extension: 'JPG',
    name: '주민등록증',
    size: '0.6MB',
  },
]

const checkItems = [
  { label: '기본 정보', number: 1, status: '완료', state: 'done' },
  { label: '자격 정보', number: 2, status: '완료', state: 'done' },
  { label: '프로필 사진', number: 3, status: '완료', state: 'done' },
  { label: '자격증 첨부', number: 4, status: '완료', state: 'done' },
  { label: '프로필 미리보기', number: 5, status: '진행 중', state: 'current' },
] as const

const submissionCheckItems = [
  '모든 정보가 정확한지 다시 한 번 확인해 주세요.',
  '프로필 정보는 가입 완료 후에도 수정할 수 있습니다.',
  '자격증과 서류는 선명하게 첨부되어야 합니다.',
  '정보가 확인되면 보호자에게 프로필이 공개됩니다.',
]

const selfIntroduction =
  '안녕하세요. 어르신의 일상에 따뜻한 돌봄을 더하는 김민수 요양사입니다.\n3년간 다양한 어르신을 케어하며 쌓아온 경험을 바탕으로, 안전하고 세심한 돌봄 서비스를 제공합니다.\n항상 어르신의 입장에서 생각하고 정성을 다해 편안하고 행복한 일상을 함께 만들어가겠습니다.'

const guardianIntroduction =
  '따뜻한 마음과 전문성으로 어르신의 삶에 편안함과 안정을 드립니다.\n3년의 경력과 요양보호사 1급 자격, 치매교육 수료를 바탕으로 신뢰할 수 있는 돌봄 서비스를 제공합니다.\n치매 케어, 식사 보조, 복약 관리, 이동 보조 등 다양한 맞춤 케어를 통해 어르신과 가족 모두가 안심할 수 있도록 최선을 다하겠습니다.'

function SignupStepProgress() {
  return (
    <section
      className="mt-4 grid gap-3 md:grid-cols-3"
      aria-label="가입 진행 단계"
    >
      {stepItems.map((step) => {
        const isComplete = step.state === 'done'
        const isCurrent = step.state === 'current'

        return (
          <article
            key={step.id}
            className={cn(
              'grid min-h-[70px] grid-cols-[42px_minmax(0,1fr)_24px] items-center gap-3 rounded-lg border bg-white px-5 py-3 shadow-[0_10px_26px_rgba(47,86,145,0.07)]',
              isCurrent
                ? 'border-[#1d6df2] ring-1 ring-[#8bbcff]'
                : 'border-[#dfe7f4]',
            )}
            aria-current={isCurrent ? 'step' : undefined}
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#1164ee] text-[17px] font-black text-white shadow-[0_6px_16px_rgba(17,100,238,0.25)]">
              {step.number}
            </span>

            <span className="min-w-0">
              <strong
                className={cn(
                  'block truncate text-[16px] font-black leading-tight',
                  isCurrent ? 'text-[#0867f2]' : 'text-[#17244d]',
                )}
              >
                {step.title}
              </strong>
              <span className="mt-1 block truncate text-[13px] font-bold leading-tight text-[#60708e]">
                {step.subtitle}
              </span>
            </span>

            {isComplete ? (
              <Check
                aria-hidden="true"
                className="hidden h-6 w-6 justify-self-end text-[#1f3e75] sm:block"
                strokeWidth={3}
              />
            ) : (
              <ChevronRight
                aria-hidden="true"
                className="hidden h-6 w-6 justify-self-end text-[#1f3e75] sm:block"
                strokeWidth={2.8}
              />
            )}
          </article>
        )
      })}
    </section>
  )
}

function StatusBadge() {
  return (
    <span className="inline-flex min-h-8 items-center rounded-full border border-[#7aa8ff] bg-white px-4 text-[13px] font-black text-[#0867f2] shadow-[0_5px_12px_rgba(8,103,242,0.09)]">
      가입 준비중
    </span>
  )
}

function ProfileSummaryList({ compact = false }: { compact?: boolean }) {
  return (
    <dl
      className={cn(
        'grid gap-3',
        compact ? 'border-t border-[#e5ecf6] pt-3' : '',
      )}
    >
      {profileSummaryItems.map((item) => {
        const Icon = item.icon

        return (
          <div
            key={item.label}
            className={cn(
              'grid items-center gap-2 text-[14px]',
              compact
                ? 'grid-cols-[24px_70px_minmax(0,1fr)]'
                : 'grid-cols-[24px_86px_minmax(0,1fr)]',
            )}
          >
            <Icon
              aria-hidden="true"
              className="h-5 w-5 text-[#60708e]"
              strokeWidth={2.5}
            />
            <dt className="font-black text-[#50607f]">{item.label}</dt>
            <dd
              className={cn(
                'min-w-0 font-black text-[#64708a]',
                compact ? 'text-right' : '',
              )}
            >
              {item.value}
            </dd>
          </div>
        )
      })}
    </dl>
  )
}

function Pill({ children }: { children: string }) {
  return (
    <span className="inline-flex min-h-9 items-center justify-center rounded-md border border-[#9fc2ff] bg-[#f7fbff] px-4 text-[14px] font-black text-[#0867f2] shadow-[0_3px_9px_rgba(47,86,145,0.05)]">
      {children}
    </span>
  )
}

function DayChip({
  active = false,
  label,
}: {
  active?: boolean
  label: string
}) {
  return (
    <span
      className={cn(
        'inline-flex h-8 min-w-11 items-center justify-center rounded-md border text-[13px] font-black shadow-[0_3px_9px_rgba(47,86,145,0.05)]',
        active
          ? 'border-[#1164ee] bg-[#1164ee] text-white'
          : 'border-[#d7dfeb] bg-white text-[#2d3957]',
      )}
    >
      {label}
    </span>
  )
}

function SectionTitle({
  children,
  icon: Icon,
}: {
  children: string
  icon: typeof Briefcase
}) {
  return (
    <h3 className="flex items-center gap-2 text-[15px] font-black leading-tight text-[#17244d]">
      <Icon
        aria-hidden="true"
        className="h-5 w-5 text-[#3f5f9c]"
        strokeWidth={2.5}
      />
      {children}
    </h3>
  )
}

function MainProfileHeader() {
  return (
    <section
      className="mt-4 rounded-lg border border-[#dfe7f4] bg-white px-4 py-4 shadow-[0_8px_20px_rgba(47,86,145,0.05)] md:px-6"
      aria-label="김민수 요양사 핵심 프로필"
    >
      <div className="grid gap-5 lg:grid-cols-[180px_minmax(0,1fr)_minmax(240px,0.78fr)] lg:items-center">
        <img
          src={workerAvatarSrc}
          alt="김민수 요양사 프로필 사진"
          className="mx-auto h-[150px] w-[150px] rounded-full bg-[#edf4ff] object-cover shadow-[0_10px_24px_rgba(47,86,145,0.12)] lg:mx-0"
          draggable="false"
        />

        <div className="min-w-0 text-center lg:text-left">
          <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <strong className="text-[26px] font-black leading-tight text-[#071747]">
              김민수 요양사
            </strong>
            <StatusBadge />
          </div>

          <div className="mt-5 max-w-[430px]">
            <ProfileSummaryList />
          </div>
        </div>

        <div className="border-t border-[#dfe7f4] pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <SectionTitle icon={Award}>보유 자격</SectionTitle>
          <div className="mt-4 flex flex-wrap gap-3">
            {qualificationItems.map((item) => (
              <Pill key={item}>{item}</Pill>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceExpertiseCard() {
  return (
    <section className="rounded-lg border border-[#dfe7f4] bg-white p-4 shadow-[0_8px_20px_rgba(47,86,145,0.05)]">
      <SectionTitle icon={Briefcase}>서비스 전문 분야</SectionTitle>
      <div className="mt-4 flex flex-wrap gap-3">
        {serviceItems.map((item) => (
          <Pill key={item}>{item}</Pill>
        ))}
      </div>
    </section>
  )
}

function AvailabilityCard() {
  return (
    <section className="rounded-lg border border-[#dfe7f4] bg-white p-4 shadow-[0_8px_20px_rgba(47,86,145,0.05)]">
      <SectionTitle icon={Clock}>근무 가능 시간 / 요일</SectionTitle>
      <div className="mt-4 flex flex-wrap gap-3">
        {availabilitySlots.map((slot) => (
          <span
            key={slot}
            className="inline-flex min-h-8 items-center justify-center rounded-md border border-[#d7dfeb] bg-white px-4 text-[13px] font-black text-[#4a5975]"
          >
            {slot}
          </span>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-3">
        {availabilityDays.map((day) => (
          <DayChip key={day.label} active={day.active} label={day.label} />
        ))}
      </div>
    </section>
  )
}

function SelfIntroductionCard() {
  return (
    <section className="rounded-lg border border-[#dfe7f4] bg-white p-4 shadow-[0_8px_20px_rgba(47,86,145,0.05)]">
      <SectionTitle icon={Image}>자기소개</SectionTitle>
      <p className="mt-3 whitespace-pre-line rounded-lg border border-[#dfe7f4] bg-white px-4 py-3 text-[14px] font-bold leading-6 text-[#4a5975]">
        {selfIntroduction}
      </p>
    </section>
  )
}

function DocumentsCard() {
  return (
    <section className="rounded-lg border border-[#dfe7f4] bg-white p-4 shadow-[0_8px_20px_rgba(47,86,145,0.05)]">
      <SectionTitle icon={FileText}>첨부 서류 / 자격증</SectionTitle>

      <ul className="mt-3 grid gap-3 sm:grid-cols-3">
        {documentItems.map((document) => (
          <li
            key={document.name}
            className="grid min-h-[72px] grid-cols-[48px_minmax(0,1fr)] items-center gap-3 rounded-lg border border-[#dfe7f4] bg-white px-3 py-2 shadow-[0_5px_14px_rgba(47,86,145,0.05)]"
          >
            <img
              src={documentAssetSrc}
              alt=""
              className="h-14 w-12 rounded-md object-cover"
              draggable="false"
            />
            <span className="min-w-0">
              <strong className="block text-[13px] font-black leading-snug text-[#17244d]">
                {document.name}
              </strong>
              <span className="mt-1 block text-[12px] font-bold text-[#60708e]">
                {document.extension} · {document.size}
              </span>
            </span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mx-auto mt-2 inline-flex min-h-8 items-center justify-center gap-2 rounded-lg px-3 text-[13px] font-black text-[#1f3e75] transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
      >
        전체 첨부 파일 보기 (3개)
        <ChevronRight
          aria-hidden="true"
          className="h-4 w-4"
          strokeWidth={2.8}
        />
      </button>
    </section>
  )
}

function GuardianVisibleIntroCard() {
  return (
    <section className="rounded-lg border border-[#8bbcff] bg-white px-5 py-3 shadow-[0_8px_20px_rgba(47,86,145,0.05)]">
      <h3 className="flex items-center gap-2 text-[16px] font-black leading-tight text-[#0867f2]">
        <Heart
          aria-hidden="true"
          className="h-5 w-5"
          fill="#eaf2ff"
          strokeWidth={2.8}
        />
        보호자에게 보이는 소개
      </h3>
      <p className="mt-3 whitespace-pre-line text-[14px] font-bold leading-6 text-[#405270]">
        {guardianIntroduction}
      </p>
    </section>
  )
}

function WorkerSignupPreviewMain() {
  return (
    <section
      className="mt-4 rounded-lg border border-[#dfe7f4] bg-white px-5 py-5 shadow-[0_14px_36px_rgba(47,86,145,0.08)] md:px-7"
      aria-labelledby="worker-profile-preview-title"
    >
      <h2
        id="worker-profile-preview-title"
        className="text-[21px] font-black leading-tight text-[#071747]"
      >
        프로필 미리보기
      </h2>
      <p className="mt-2 text-[13px] font-bold leading-snug text-[#52617d]">
        아래는 보호자에게 공개될 프로필 예시입니다.
      </p>

      <MainProfileHeader />

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <ServiceExpertiseCard />
        <AvailabilityCard />
        <SelfIntroductionCard />
        <DocumentsCard />
      </div>

      <div className="mt-4">
        <GuardianVisibleIntroCard />
      </div>

      <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-4">
        <button
          type="button"
          className="inline-flex min-h-12 min-w-[170px] items-center justify-center rounded-lg border border-[#7aa8ff] bg-white px-6 text-[16px] font-black text-[#0867f2] shadow-[0_8px_18px_rgba(47,86,145,0.08)] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          이전
        </button>
        <Link
          to="/caregiver"
          className="inline-flex min-h-12 min-w-[170px] items-center justify-center rounded-lg bg-[#0867f2] px-7 text-[16px] font-black text-white shadow-[0_12px_24px_rgba(8,103,242,0.26)] transition hover:bg-[#0057d8] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          가입 완료
        </Link>
      </div>
    </section>
  )
}

function WorkerProfilePreviewCard() {
  return (
    <section
      className="rounded-lg border border-[#dfe7f4] bg-white p-6 shadow-[0_12px_30px_rgba(47,86,145,0.08)]"
      aria-labelledby="worker-side-preview-title"
    >
      <h2
        id="worker-side-preview-title"
        className="text-[21px] font-black leading-tight text-[#071747]"
      >
        프로필 미리보기
      </h2>

      <div className="mt-6 grid gap-5 sm:grid-cols-[132px_minmax(0,1fr)] sm:items-start xl:grid-cols-[132px_minmax(0,1fr)]">
        <img
          src={workerAvatarSrc}
          alt="김민수 요양사 프로필 미리보기"
          className="mx-auto h-[132px] w-[132px] rounded-full bg-[#edf4ff] object-cover shadow-[0_10px_24px_rgba(47,86,145,0.12)] sm:mx-0"
          draggable="false"
        />

        <div className="min-w-0 text-center sm:text-left">
          <strong className="block text-[21px] font-black leading-tight text-[#071747]">
            김민수 요양사
          </strong>
          <span className="mt-3 inline-flex">
            <StatusBadge />
          </span>

          <div className="mt-4">
            <ProfileSummaryList compact />
          </div>
        </div>
      </div>
    </section>
  )
}

function InputCheckCard() {
  return (
    <section
      className="rounded-lg border border-[#dfe7f4] bg-white p-6 shadow-[0_12px_30px_rgba(47,86,145,0.08)]"
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
              'grid min-h-[44px] grid-cols-[28px_minmax(0,1fr)_82px] items-center gap-2 text-[14px] font-black',
              index > 0 ? 'border-t border-[#e5ecf6]' : '',
            )}
          >
            <span
              className={cn(
                'grid h-6 w-6 place-items-center rounded-full text-[12px] font-black',
                item.state === 'done'
                  ? 'bg-[#10b981] text-white'
                  : 'bg-[#1164ee] text-white',
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
                  : 'bg-[#e7f0ff] text-[#0867f2]',
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

function SubmissionChecklistCard() {
  return (
    <section
      className="rounded-lg border border-[#dfe7f4] bg-white p-6 shadow-[0_12px_30px_rgba(47,86,145,0.08)]"
      aria-labelledby="worker-submission-check-title"
    >
      <h2
        id="worker-submission-check-title"
        className="flex items-center gap-2 text-[21px] font-black leading-tight text-[#071747]"
      >
        <Lightbulb
          aria-hidden="true"
          className="h-6 w-6 text-[#0867f2]"
          fill="#eaf2ff"
          strokeWidth={2.6}
        />
        제출 전 확인
      </h2>

      <ul className="mt-4 grid gap-2 text-[13px] font-bold leading-snug text-[#445575]">
        {submissionCheckItems.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#64748b]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function WorkerSignupPage() {
  return (
    <main className="min-h-svh overflow-x-hidden bg-[#f8fbff] text-[#071747]">
      <CaregiverTopBar />

      <div className="mx-4 box-border grid w-[calc(100vw-32px)] max-w-[1544px] gap-6 py-4 md:mx-auto md:w-full md:px-6 xl:grid-cols-[minmax(0,1040px)_432px] xl:gap-10 xl:px-4">
        <div className="min-w-0">
          <header>
            <h1 className="text-[31px] font-black leading-tight text-[#071747]">
              요양사 가입 정보
            </h1>
            <p className="mt-2 max-w-[350px] text-[14px] font-bold leading-snug text-[#52617d] sm:max-w-none">
              정확한 정보로 등록하시면 더 빠르고 정확하게 활동을 시작하실 수
              있습니다.
            </p>
          </header>

          <SignupStepProgress />
          <WorkerSignupPreviewMain />
        </div>

        <aside
          className="grid content-start gap-4"
          aria-label="가입 정보 보조 패널"
        >
          <WorkerProfilePreviewCard />
          <InputCheckCard />
          <SubmissionChecklistCard />
        </aside>
      </div>
    </main>
  )
}
