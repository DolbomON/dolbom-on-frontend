import {
  CalendarDays,
  ChevronRight,
  ClipboardList,
  Clock,
  FileText,
  MapPin,
  Navigation,
  Pencil,
  Phone,
  Play,
  ShieldCheck,
  UserRound,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { useMemo } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { CaregiverTopBar } from '../../components/worker/CaregiverTopBar'
import { WorkerTopBar } from '../../components/worker/WorkerTopBar'
import { elderDetails } from '../../features/worker/workerElderDetailData'
import { cn } from '../../lib/utils'

const workerAssetBase = '/assets/dolbomon/worker'
const dashboardAssetBase = '/assets/dolbomon/worker-dashboard'

const statusCards = [
  {
    iconSrc: `${workerAssetBase}/식사.png`,
    id: 'meal',
    label: '식사',
    tone: 'blue',
    value: '조금',
  },
  {
    iconSrc: `${workerAssetBase}/복약.png`,
    id: 'medicine',
    label: '복약',
    tone: 'green',
    value: '먹음',
  },
  {
    iconSrc: `${workerAssetBase}/통증.png`,
    id: 'pain',
    label: '통증',
    tone: 'orange',
    value: '보통',
  },
  {
    iconSrc: `${workerAssetBase}/기분.png`,
    id: 'mood',
    label: '기분',
    tone: 'orange',
    value: '보통',
  },
  {
    iconSrc: `${workerAssetBase}/수면.png`,
    id: 'sleep',
    label: '수면',
    tone: 'blue',
    value: '잘 잠',
  },
] as const

const profileRows: Array<{
  icon: LucideIcon
  id: string
  label: string
  value: string
}> = [
  {
    icon: UserRound,
    id: 'gender',
    label: '성별',
    value: '여성',
  },
  {
    icon: CalendarDays,
    id: 'birth',
    label: '생년월일',
    value: '1943.05.12',
  },
  {
    icon: UserRound,
    id: 'worker',
    label: '담당 요양사',
    value: '김민수 요양사',
  },
  {
    icon: MapPin,
    id: 'address',
    label: '주소',
    value: '서울특별시 강남구\n도산대로 123,\n101동 502호',
  },
]

const welfareRequests = [
  '식사량 감소 원인을 확인해주세요.',
  '저녁 약 복용 여부를 확인해주세요.',
  '수면 중 자주 깨는지 물어봐주세요.',
] as const

const referenceSummaries = [
  '최근 식사량이 다소 감소했고 복약 시간이 불규칙했습니다.',
  '통증과 기분은 보통 수준이며 수면은 대체로 안정적입니다.',
  '오늘은 식사 여부와 복약 상태를 중점 확인해주세요.',
] as const

const recentVisitHistory = [
  {
    content: '아침 식사량 70%, 복약 완료',
    date: '2025.05.30',
    id: 'visit-2025-05-30',
    time: '10:20',
  },
  {
    content: '낮잠 증가, 저녁 식사량 감소',
    date: '2025.05.29',
    id: 'visit-2025-05-29',
    time: '14:00',
  },
  {
    content: '수면 중 2회 각성',
    date: '2025.05.28',
    id: 'visit-2025-05-28',
    time: '09:30',
  },
] as const

const familyContacts = [
  {
    avatarSrc: `${workerAssetBase}/딸.png`,
    id: 'lee-soonja',
    name: '이순자',
    phone: '010-1234-5678',
    relation: '딸',
  },
  {
    avatarSrc: `${workerAssetBase}/아들.png`,
    id: 'park-cheolsu',
    name: '박철수',
    phone: '010-2345-6789',
    relation: '아들',
  },
  {
    avatarSrc: `${workerAssetBase}/딸.png`,
    id: 'choi-bokrye',
    name: '최복례',
    phone: '010-3456-7890',
    relation: '며느리',
  },
] as const

const safetyChecklist = ['신분 확인', '손 위생', '복약 확인 도구 준비'] as const

const statusPillClasses = {
  blue: 'bg-[#e8f1ff] text-[#0867f2]',
  green: 'bg-[#dff4e6] text-[#13a044]',
  orange: 'bg-[#fff0d8] text-[#ff6b00]',
} as const

type StatusTone = keyof typeof statusPillClasses

type DetailViewRole = 'caregiver' | 'worker'

function WorkerDetailTopBar({ viewRole }: { viewRole: DetailViewRole }) {
  const isCaregiverView = viewRole === 'caregiver'

  if (isCaregiverView) {
    return <CaregiverTopBar activeLabel="담당어르신" />
  }

  return <WorkerTopBar activeHref="/worker/welfare-connect" />
}

function NotFoundState({ viewRole }: { viewRole: DetailViewRole }) {
  const backHref = viewRole === 'caregiver' ? '/caregiver' : '/worker/elders'

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#f6f9fd] text-[#071747]">
      <WorkerDetailTopBar viewRole={viewRole} />

      <div className="mx-auto w-full max-w-[760px] px-5 py-16">
        <section
          className="rounded-[18px] border border-[#dfe8f5] bg-white px-6 py-10 text-center shadow-[0_16px_40px_rgba(47,86,145,0.09)]"
          aria-labelledby="elder-detail-not-found-title"
        >
          <h1
            id="elder-detail-not-found-title"
            className="text-[30px] font-black leading-tight text-[#071747]"
          >
            대상자 정보를 찾을 수 없어요.
          </h1>
          <p className="mt-3 text-[17px] font-bold leading-snug text-[#566784]">
            대상자 목록에서 다시 선택해 주세요.
          </p>
          <Link
            to={backHref}
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg bg-[#0867f2] px-5 text-[17px] font-black text-white shadow-[0_12px_22px_rgba(8,103,242,0.22)] transition hover:bg-[#075fe0] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
          >
            대상자 목록으로 돌아가기
          </Link>
        </section>
      </div>
    </main>
  )
}

function ProfileSummaryCard({
  age,
  avatarSrc,
  detailHref,
  household,
  name,
}: {
  age: number
  avatarSrc: string
  detailHref: string
  household: string
  name: string
}) {
  return (
    <aside
      className="flex flex-col rounded-[18px] border border-[#dfe8f5] bg-white px-5 py-5 shadow-[0_18px_42px_rgba(47,86,145,0.09)] xl:h-[705px]"
      aria-label={`${name} 기본 정보`}
    >
      <div className="flex flex-col items-center text-center">
        <img
          src={avatarSrc}
          alt={`${name} 프로필`}
          className="h-[188px] w-[188px] rounded-full bg-[#e8f3ff] object-cover shadow-[0_10px_24px_rgba(47,86,145,0.12)]"
          draggable="false"
        />
        <h2 className="mt-4 text-[28px] font-black leading-tight text-[#111827]">
          {name}
        </h2>
        <p className="mt-3 text-[17px] font-bold leading-tight text-[#3f5070]">
          {age}세&nbsp;&nbsp;|&nbsp;&nbsp;{household}
        </p>
      </div>

      <div className="my-7 h-px bg-[#d9e2ef]" aria-hidden="true" />

      <dl className="grid gap-5">
        {profileRows.map((row) => {
          const Icon = row.icon

          return (
            <div
              key={row.id}
              className="grid grid-cols-[30px_100px_minmax(0,1fr)] items-start gap-3"
            >
              <Icon
                aria-hidden="true"
                className="mt-0.5 h-6 w-6 text-[#384969]"
                strokeWidth={2.2}
              />
              <dt className="text-[17px] font-bold leading-snug text-[#52627f]">
                {row.label}
              </dt>
              <dd className="whitespace-pre-line text-[17px] font-bold leading-[1.45] text-[#111827]">
                {row.value}
              </dd>
            </div>
          )
        })}
      </dl>

      <Link
        to={detailHref}
        className="mt-8 inline-flex min-h-[58px] w-full items-center justify-center gap-2 rounded-lg border border-[#d5e0ee] bg-white px-4 text-[18px] font-black text-[#0867f2] shadow-[0_8px_18px_rgba(47,86,145,0.05)] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff] xl:mt-auto"
      >
        <FileText aria-hidden="true" className="h-6 w-6" strokeWidth={2.6} />
        어르신 정보 보기
      </Link>
    </aside>
  )
}

function StatusMetricCard({ card }: { card: (typeof statusCards)[number] }) {
  return (
    <article className="grid min-h-[148px] grid-cols-[72px_minmax(0,1fr)] items-center gap-x-2 rounded-[16px] border border-[#dfe8f5] bg-white px-4 py-4 shadow-[0_14px_32px_rgba(47,86,145,0.08)]">
      <img
        src={card.iconSrc}
        alt=""
        className="row-span-2 h-[86px] w-[86px] max-w-none object-contain"
        draggable="false"
      />
      <h3 className="self-end text-right text-[18px] font-black leading-tight text-[#111827]">
        {card.label}
      </h3>
      <span
        className={cn(
          'mt-3 inline-flex min-h-8 min-w-[82px] items-center justify-center justify-self-end rounded-full px-4 text-[16px] font-black leading-none',
          statusPillClasses[card.tone as StatusTone],
        )}
      >
        {card.value}
      </span>
    </article>
  )
}

function RequestSummaryPanel() {
  return (
    <section
      className="grid gap-5 overflow-hidden rounded-[18px] border border-[#dfe8f5] bg-white p-5 shadow-[0_16px_36px_rgba(47,86,145,0.08)] lg:grid-cols-[1.1fr_1fr] lg:gap-0 xl:h-[260px]"
      aria-label="방문 전 요청사항과 참고 요약"
    >
      <div className="min-w-0 lg:border-r lg:border-[#dfe6f1] lg:pr-7">
        <div className="flex items-center gap-3">
          <span className="inline-grid h-10 w-10 place-items-center rounded-lg bg-[#fff0f2] text-[#f05261]">
            <ClipboardList aria-hidden="true" className="h-6 w-6" />
          </span>
          <h2 className="text-[23px] font-black leading-tight text-[#111827]">
            복지사 요청사항
          </h2>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-[142px_minmax(0,1fr)] sm:items-center">
          <img
            src={`${workerAssetBase}/체크.png`}
            alt=""
            className="mx-auto h-[132px] w-[132px] object-contain sm:mx-0"
            draggable="false"
          />
          <ul className="grid gap-3">
            {welfareRequests.map((request) => (
              <li
                key={request}
                className="flex items-start gap-3 text-[16px] font-bold leading-snug text-[#172033]"
              >
                <span
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#ff4c5c]"
                  aria-hidden="true"
                />
                <span>{request}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="min-w-0 lg:pl-7">
        <div className="flex items-center gap-3">
          <span className="inline-grid h-10 w-10 place-items-center rounded-lg bg-[#ecf4ff] text-[#0867f2]">
            <FileText aria-hidden="true" className="h-6 w-6" />
          </span>
          <h2 className="text-[23px] font-black leading-tight text-[#111827]">
            방문 전 참고 요약
          </h2>
        </div>

        <ul className="mt-5 grid gap-3">
          {referenceSummaries.map((summary) => (
            <li
              key={summary}
              className="flex items-start gap-3 text-[16px] font-bold leading-[1.42] text-[#172033]"
            >
              <span
                className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#b8c1d0]"
                aria-hidden="true"
              />
              <span>{summary}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function RecentVisitHistoryPanel({ recordsHref }: { recordsHref: string }) {
  return (
    <section
      className="overflow-hidden rounded-[18px] border border-[#dfe8f5] bg-white px-5 py-3 shadow-[0_16px_36px_rgba(47,86,145,0.08)] xl:h-[192px]"
      aria-labelledby="recent-visit-history-title"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Clock
            aria-hidden="true"
            className="h-7 w-7 text-[#0867f2]"
            strokeWidth={2.5}
          />
          <h2
            id="recent-visit-history-title"
            className="text-[22px] font-black leading-tight text-[#111827]"
          >
            최근 방문 기록
          </h2>
        </div>
        <Link
          to={recordsHref}
          className="inline-flex min-h-8 items-center gap-1 rounded-lg px-2 text-[15px] font-black text-[#0867f2] transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          전체 기록 보기
          <ChevronRight aria-hidden="true" className="h-5 w-5" />
        </Link>
      </div>

      <ul className="mt-3 grid gap-2 sm:hidden">
        {recentVisitHistory.map((record) => (
          <li
            key={record.id}
            className="rounded-[12px] border border-[#dfe8f5] bg-white px-3 py-3"
          >
            <div className="flex items-center gap-2 text-[14px] font-black leading-tight text-[#3d4b68]">
              <CalendarDays
                aria-hidden="true"
                className="h-4 w-4 text-[#52627f]"
              />
              <span>{record.date}</span>
              <span>{record.time}</span>
            </div>
            <p className="mt-2 text-[15px] font-bold leading-snug text-[#111827]">
              {record.content}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-2 hidden overflow-hidden rounded-[12px] border border-[#dfe8f5] sm:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">김영자님 최근 방문 기록</caption>
          <tbody className="divide-y divide-[#dfe8f5] text-[14px] font-bold leading-tight text-[#25314a]">
            {recentVisitHistory.map((record) => (
              <tr key={record.id} className="bg-white">
                <td className="w-[132px] px-4 py-2 text-[#3d4b68]">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays
                      aria-hidden="true"
                      className="h-4 w-4 text-[#52627f]"
                    />
                    {record.date}
                  </span>
                </td>
                <td className="w-[88px] px-3 py-2 text-[#25314a]">
                  {record.time}
                </td>
                <td className="px-4 py-2">{record.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function ActionButtons({
  onMemoCreate,
  onVisitStart,
}: {
  onMemoCreate: () => void
  onVisitStart: () => void
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <button
        type="button"
        className="inline-flex min-h-[56px] items-center justify-center gap-3 rounded-lg bg-[#0867f2] px-5 text-[26px] font-black text-white shadow-[0_14px_26px_rgba(8,103,242,0.28)] transition hover:bg-[#0057d8] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        onClick={onVisitStart}
      >
        <Play aria-hidden="true" className="h-7 w-7 fill-white" />
        방문 시작
      </button>
      <button
        type="button"
        className="inline-flex min-h-[56px] items-center justify-center gap-3 rounded-lg border-2 border-[#0867f2] bg-white px-5 text-[24px] font-black text-[#0867f2] shadow-[0_12px_24px_rgba(47,86,145,0.08)] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        onClick={onMemoCreate}
      >
        <Pencil aria-hidden="true" className="h-7 w-7" strokeWidth={2.7} />
        방문 기록 작성
      </button>
    </div>
  )
}

function FamilyContactsPanel() {
  return (
    <section
      className="rounded-[18px] border border-[#dfe8f5] bg-white px-6 py-5 shadow-[0_16px_36px_rgba(47,86,145,0.08)] xl:h-[318px]"
      aria-labelledby="family-contacts-title"
    >
      <div className="flex items-center gap-3">
        <Users
          aria-hidden="true"
          className="h-7 w-7 fill-[#dceaff] text-[#0867f2]"
          strokeWidth={2.6}
        />
        <h2
          id="family-contacts-title"
          className="text-[23px] font-black leading-tight text-[#111827]"
        >
          가족 연락처
        </h2>
      </div>

      <ul className="mt-5 grid gap-5">
        {familyContacts.map((contact) => (
          <li
            key={contact.id}
            className="grid grid-cols-[58px_minmax(0,1fr)_58px] items-center gap-4"
          >
            <img
              src={contact.avatarSrc}
              alt=""
              className="h-[58px] w-[58px] rounded-full bg-[#f2f6ff] object-cover shadow-[0_8px_18px_rgba(47,86,145,0.12)]"
              draggable="false"
            />
            <div className="min-w-0">
              <p className="truncate text-[18px] font-black leading-tight text-[#111827]">
                {contact.name} ({contact.relation})
              </p>
              <p className="mt-2 text-[17px] font-bold leading-tight text-[#344360]">
                {contact.phone}
              </p>
            </div>
            <a
              href={`tel:${contact.phone.replaceAll('-', '')}`}
              className="inline-grid h-[50px] w-[58px] place-items-center rounded-lg border border-[#d7e1ef] bg-white text-[#263553] shadow-[0_8px_18px_rgba(47,86,145,0.05)] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
              aria-label={`${contact.name}에게 전화하기`}
            >
              <Phone aria-hidden="true" className="h-6 w-6" strokeWidth={2.8} />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

function VisitInfoPanel() {
  return (
    <section
      className="rounded-[18px] border border-[#dfe8f5] bg-white px-5 py-5 shadow-[0_16px_36px_rgba(47,86,145,0.08)]"
      aria-labelledby="today-visit-info-title"
    >
      <div className="flex items-center gap-3">
        <CalendarDays
          aria-hidden="true"
          className="h-7 w-7 text-[#0867f2]"
          strokeWidth={2.6}
        />
        <h2
          id="today-visit-info-title"
          className="text-[23px] font-black leading-tight text-[#111827]"
        >
          오늘 방문 정보
        </h2>
      </div>

      <dl className="mt-5 overflow-hidden rounded-[12px] border border-[#dfe8f5]">
        <div className="grid grid-cols-[110px_minmax(0,1fr)] border-b border-[#dfe8f5]">
          <dt className="bg-[#f7faff] px-4 py-3 text-center text-[17px] font-bold text-[#3f5070]">
            방문 시간
          </dt>
          <dd className="px-6 py-3 text-[24px] font-black leading-tight text-[#111827]">
            10:30 ~ 11:10
          </dd>
        </div>
        <div className="grid grid-cols-[110px_minmax(0,1fr)]">
          <dt className="bg-[#f7faff] px-4 py-3 text-center text-[17px] font-bold text-[#3f5070]">
            방문 목적
          </dt>
          <dd className="px-6 py-3 text-[18px] font-black leading-tight text-[#111827]">
            식사량/복약 확인
          </dd>
        </div>
      </dl>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          className="inline-flex min-h-[50px] items-center justify-center gap-3 rounded-lg border border-[#d7e1ef] bg-white px-4 text-[18px] font-black text-[#0867f2] shadow-[0_8px_18px_rgba(47,86,145,0.05)] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          <Navigation
            aria-hidden="true"
            className="h-6 w-6 fill-[#0867f2]"
            strokeWidth={2.6}
          />
          길찾기
        </button>
        <a
          href="tel:01012345678"
          className="inline-flex min-h-[50px] items-center justify-center gap-3 rounded-lg border border-[#d7e1ef] bg-white px-4 text-[18px] font-black text-[#0867f2] shadow-[0_8px_18px_rgba(47,86,145,0.05)] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          <Phone aria-hidden="true" className="h-6 w-6" strokeWidth={2.7} />
          전화하기
        </a>
      </div>
    </section>
  )
}

function SafetyChecklistPanel() {
  return (
    <section
      className="rounded-[18px] border border-[#dfe8f5] bg-white px-6 py-5 shadow-[0_16px_36px_rgba(47,86,145,0.08)] xl:h-[204px]"
      aria-labelledby="safety-checklist-title"
    >
      <div className="flex items-center gap-3">
        <ShieldCheck
          aria-hidden="true"
          className="h-7 w-7 fill-[#dceaff] text-[#0867f2]"
          strokeWidth={2.6}
        />
        <h2
          id="safety-checklist-title"
          className="text-[23px] font-black leading-tight text-[#111827]"
        >
          안전 체크리스트
        </h2>
      </div>

      <ul className="mt-5 grid gap-4">
        {safetyChecklist.map((item) => (
          <li key={item}>
            <label className="flex items-center gap-4 text-[18px] font-bold leading-tight text-[#111827]">
              <input
                type="checkbox"
                checked
                readOnly
                className="h-6 w-6 shrink-0 accent-[#0867f2]"
              />
              {item}
            </label>
          </li>
        ))}
      </ul>
    </section>
  )
}

function formatWorkerElderDisplayName(name: string) {
  return name.replace(/님$/, ' 어르신')
}

function WorkerBasicInfoPanel({
  age,
  avatarSrc,
  elder,
  household,
}: {
  age: number
  avatarSrc: string
  elder: (typeof elderDetails)[number]
  household: string
}) {
  return (
    <section
      className="rounded-[18px] border border-[#dfe8f5] bg-white px-5 py-5 shadow-[0_16px_36px_rgba(47,86,145,0.08)]"
      aria-labelledby="worker-basic-info-title"
    >
      <h2
        id="worker-basic-info-title"
        className="text-[23px] font-black leading-tight text-[#111827]"
      >
        기본 정보
      </h2>
      <div className="mt-5 flex items-center gap-4">
        <img
          src={avatarSrc}
          alt={`${elder.name} 프로필`}
          className="h-[92px] w-[92px] shrink-0 rounded-full bg-[#e8f3ff] object-cover shadow-[0_10px_24px_rgba(47,86,145,0.12)]"
          draggable="false"
        />
        <div className="min-w-0">
          <p className="truncate text-[26px] font-black leading-tight text-[#111827]">
            {formatWorkerElderDisplayName(elder.name)}
          </p>
          <p className="mt-2 text-[17px] font-bold leading-tight text-[#3f5070]">
            {age}세 · {household}
          </p>
          <p className="mt-2 text-[15px] font-bold leading-tight text-[#52627f]">
            담당 요양사 · 김민수 요양사
          </p>
        </div>
      </div>

      <dl className="mt-5 grid gap-3 rounded-[14px] border border-[#e5edf8] bg-[#fbfdff] px-4 py-4 text-[15px]">
        {[
          ['성별', '여성'],
          ['생년월일', '1943.05.12'],
          ['주소', '서울특별시 강남구 도산대로 123, 101동 502호'],
          ['관리 상태', elder.riskLabel],
        ].map(([label, value]) => (
          <div
            key={label}
            className="grid gap-1 sm:grid-cols-[92px_minmax(0,1fr)] sm:items-start"
          >
            <dt className="font-black text-[#52627f]">{label}</dt>
            <dd className="font-black text-[#111827]">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function WorkerTodayStatusPanel() {
  return (
    <section
      className="rounded-[18px] border border-[#dfe8f5] bg-white px-5 py-5 shadow-[0_16px_36px_rgba(47,86,145,0.08)]"
      aria-labelledby="worker-today-status-title"
    >
      <h2
        id="worker-today-status-title"
        className="text-[23px] font-black leading-tight text-[#111827]"
      >
        오늘 상태
      </h2>
      <div
        className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
        aria-label="오늘 주요 상태"
      >
        {statusCards.map((card) => (
          <StatusMetricCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  )
}

function WorkerAiSummaryPanel() {
  return (
    <section
      className="rounded-[18px] border border-[#dfe8f5] bg-white px-5 py-5 shadow-[0_16px_36px_rgba(47,86,145,0.08)]"
      aria-labelledby="worker-ai-summary-title"
    >
      <div className="flex items-center gap-3">
        <FileText
          aria-hidden="true"
          className="h-7 w-7 text-[#0867f2]"
          strokeWidth={2.6}
        />
        <h2
          id="worker-ai-summary-title"
          className="text-[23px] font-black leading-tight text-[#111827]"
        >
          AI 생활 상태 요약
        </h2>
      </div>
      <p className="mt-4 break-keep text-[16px] font-bold leading-relaxed text-[#25314a]">
        최근 7일간 식사량이 줄고 혈당 감소 기록이 반복되었습니다. 복약은 대부분
        완료했으나 저녁 복약 시간이 흔들려 확인이 필요합니다.
      </p>
      <ul className="mt-4 grid gap-2 text-[15px] font-bold leading-snug text-[#52627f]">
        <li>- 식사: 평소 대비 감소</li>
        <li>- 복약: 완료 비율 높음, 저녁 시간 확인 필요</li>
        <li>- 정서: 상담 시 피로감 표현</li>
      </ul>
    </section>
  )
}

function WorkerRecentCaseMemoPanel() {
  return (
    <section
      className="rounded-[18px] border border-[#dfe8f5] bg-white px-5 py-5 shadow-[0_16px_36px_rgba(47,86,145,0.08)]"
      aria-labelledby="worker-recent-case-memo-title"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Clock
            aria-hidden="true"
            className="h-7 w-7 text-[#0867f2]"
            strokeWidth={2.5}
          />
          <h2
            id="worker-recent-case-memo-title"
            className="text-[23px] font-black leading-tight text-[#111827]"
          >
            최근 상담 메모
          </h2>
        </div>
        <Link
          to="/worker/consultations"
          className="inline-flex min-h-8 items-center gap-1 rounded-lg px-2 text-[15px] font-black text-[#0867f2] transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          전체 보기
          <ChevronRight aria-hidden="true" className="h-5 w-5" />
        </Link>
      </div>

      <div className="mt-4 overflow-hidden rounded-[12px] border border-[#dfe8f5]">
        {[
          ['2026.06.02', '식사량 감소 원인 확인 필요, 식단 조절 상담 예정'],
          ['2026.05.30', '보호자에게 저녁 복약 시간 확인 요청'],
          ['2026.05.27', '혈당 감소 기록 확인 후 요양사 관찰 요청'],
        ].map(([date, content]) => (
          <article
            key={date}
            className="grid gap-2 border-b border-[#e5edf8] bg-white px-4 py-3 last:border-b-0 sm:grid-cols-[120px_minmax(0,1fr)]"
          >
            <time className="text-[14px] font-black text-[#52627f]">
              {date}
            </time>
            <p className="text-[15px] font-bold leading-snug text-[#111827]">
              {content}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

function WorkerWeeklyTrendPanel() {
  const trendItems = [
    { label: '식사 안정', value: '52%', width: '52%' },
    { label: '복약 완료', value: '86%', width: '86%' },
    { label: '수면 안정', value: '68%', width: '68%' },
    { label: '위험 신호', value: '3건', width: '38%' },
  ]

  return (
    <section
      className="rounded-[18px] border border-[#dfe8f5] bg-white px-5 py-5 shadow-[0_16px_36px_rgba(47,86,145,0.08)]"
      aria-labelledby="worker-weekly-trend-title"
    >
      <h2
        id="worker-weekly-trend-title"
        className="text-[23px] font-black leading-tight text-[#111827]"
      >
        주간 변화 추이
      </h2>
      <dl className="mt-5 grid gap-4">
        {trendItems.map((item) => (
          <div key={item.label} className="grid gap-2">
            <div className="flex items-center justify-between gap-3">
              <dt className="text-[15px] font-black text-[#25314a]">
                {item.label}
              </dt>
              <dd className="text-[15px] font-black text-[#071747]">
                {item.value}
              </dd>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-[#e7eef8]">
              <span
                className="block h-full rounded-full bg-[#0867f2]"
                style={{ width: item.width }}
              />
            </div>
          </div>
        ))}
      </dl>
    </section>
  )
}

function WorkerDetailActionsPanel({ elderId }: { elderId: string }) {
  return (
    <section
      className="rounded-[18px] border border-[#dfe8f5] bg-white px-5 py-5 shadow-[0_16px_36px_rgba(47,86,145,0.08)]"
      aria-labelledby="worker-detail-actions-title"
    >
      <div className="flex items-center gap-3">
        <ClipboardList
          aria-hidden="true"
          className="h-7 w-7 text-[#0867f2]"
          strokeWidth={2.6}
        />
        <h2
          id="worker-detail-actions-title"
          className="text-[23px] font-black leading-tight text-[#111827]"
        >
          복지사 조치
        </h2>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Link
          to={`/worker/elders/${elderId}/case-note`}
          className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#0867f2] px-4 text-[16px] font-black text-white shadow-[0_12px_24px_rgba(8,103,242,0.24)] transition hover:bg-[#0057d8] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          상담 메모 작성
        </Link>
        <Link
          to="/worker/reports"
          className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#dfe8f5] bg-white px-4 text-[16px] font-black text-[#0867f2] shadow-[0_8px_18px_rgba(47,86,145,0.05)] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          보고서 생성
        </Link>
        <Link
          to="/worker#risk-elder-panel"
          className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#bfd6fb] bg-[#edf6ff] px-4 text-[16px] font-black text-[#0867f2] shadow-[0_8px_18px_rgba(47,86,145,0.05)] transition hover:bg-[#e2f0ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          요양사 배정
        </Link>
      </div>
    </section>
  )
}

function WorkerElderManagementView({
  age,
  avatarSrc,
  elder,
  household,
}: {
  age: number
  avatarSrc: string
  elder: (typeof elderDetails)[number]
  household: string
}) {
  return (
    <main className="min-h-svh overflow-x-hidden bg-[#f6f9fd] text-[#071747]">
      <WorkerDetailTopBar viewRole="worker" />

      <div className="mx-auto grid w-full max-w-[1500px] gap-5 px-5 pb-9 pt-6 lg:px-8 xl:grid-cols-[minmax(0,1fr)_380px] xl:items-start">
        <div className="grid min-w-0 gap-5">
          <section aria-labelledby="elder-detail-title">
            <h1
              id="elder-detail-title"
              className="text-[34px] font-black leading-tight text-[#111827] lg:text-[40px]"
            >
              대상 어르신 상세 관리
            </h1>
            <p className="mt-3 text-[18px] font-bold leading-snug text-[#25314a]">
              {formatWorkerElderDisplayName(elder.name)}의 상태를 판단하고,
              배정·대응·보고를 관리하세요.
            </p>
          </section>

          <WorkerBasicInfoPanel
            age={age}
            avatarSrc={avatarSrc}
            elder={elder}
            household={household}
          />
          <WorkerTodayStatusPanel />
          <WorkerAiSummaryPanel />
          <WorkerRecentCaseMemoPanel />
          <WorkerWeeklyTrendPanel />
          <WorkerDetailActionsPanel elderId={elder.id} />
        </div>

        <aside className="grid gap-5" aria-label="가족 연락처와 대응 정보">
          <FamilyContactsPanel />
          <section
            className="rounded-[18px] border border-[#dfe8f5] bg-white px-5 py-5 shadow-[0_16px_36px_rgba(47,86,145,0.08)]"
            aria-labelledby="worker-response-status-title"
          >
            <h2
              id="worker-response-status-title"
              className="text-[23px] font-black leading-tight text-[#111827]"
            >
              대응 상태
            </h2>
            <dl className="mt-5 grid gap-3 text-[15px]">
              {[
                ['위험 판단', elder.riskLabel],
                ['처리 상태', '미처리'],
                ['다음 확인', '오늘 15:00'],
                ['보고서', '생성 가능'],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-[92px_minmax(0,1fr)] gap-3 rounded-[12px] border border-[#e5edf8] bg-[#fbfdff] px-4 py-3"
                >
                  <dt className="font-black text-[#52627f]">{label}</dt>
                  <dd className="font-black text-[#071747]">{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </aside>
      </div>
    </main>
  )
}

export function WorkerElderDetailPage() {
  const { elderId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const viewRole: DetailViewRole = location.pathname.startsWith('/caregiver/')
    ? 'caregiver'
    : 'worker'

  const elder = useMemo(
    () => elderDetails.find((item) => item.id === elderId),
    [elderId],
  )

  if (!elder) {
    return <NotFoundState viewRole={viewRole} />
  }

  const openMemoCreate = () => {
    if (viewRole === 'caregiver') {
      navigate(`/caregiver/elders/${elder.id}/visit-record`)
      return
    }

    navigate(`/worker/elders/${elder.id}/case-note`, {
      state: { fromWorkerElderDetail: true },
    })
  }

  const isKimYeongja = elder.id === 'kim-yeongja'
  const avatarSrc = isKimYeongja
    ? `${dashboardAssetBase}/elder-kim-yeongja.png`
    : elder.avatarSrc
  const age = isKimYeongja ? 82 : elder.age
  const household = isKimYeongja ? '배우자와 거주' : elder.household
  const detailTitle = `${elder.name} 방문 전 확인`
  const detailHref =
    viewRole === 'caregiver'
      ? `/caregiver/elders/${elder.id}`
      : `/worker/elders/${elder.id}`
  const recordsHref =
    viewRole === 'caregiver' ? '/caregiver/records' : '/worker/reports'

  if (viewRole === 'worker') {
    return (
      <WorkerElderManagementView
        age={age}
        avatarSrc={avatarSrc}
        elder={elder}
        household={household}
      />
    )
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#f6f9fd] text-[#071747]">
      <WorkerDetailTopBar viewRole={viewRole} />

      <div className="mx-auto w-full max-w-[1618px] px-5 pb-9 pt-[22px] lg:px-0">
        <div className="grid gap-x-[40px] gap-y-[18px] xl:grid-cols-[302px_minmax(0,1fr)_386px] 2xl:grid-cols-[302px_846px_386px]">
          <section
            className="order-1 xl:order-none xl:col-span-2"
            aria-labelledby="elder-detail-title"
          >
            <h1
              id="elder-detail-title"
              className="text-[34px] font-black leading-tight text-[#111827] lg:text-[40px]"
            >
              {detailTitle}
            </h1>
            <p className="mt-3 text-[18px] font-bold leading-snug text-[#25314a]">
              방문 전 요청사항과 참고 내용을 확인하고 업무를 시작하세요.
            </p>
          </section>

          <aside
            className="order-4 grid gap-4 xl:order-none xl:col-start-3 xl:row-span-2 xl:row-start-1 xl:mt-[20px]"
            aria-label="연락처와 오늘 방문 정보"
          >
            <FamilyContactsPanel />
            <VisitInfoPanel />
            <SafetyChecklistPanel />
          </aside>

          <div className="order-2 xl:order-none">
            <ProfileSummaryCard
              age={age}
              avatarSrc={avatarSrc}
              detailHref={detailHref}
              household={household}
              name={elder.name}
            />
          </div>

          <div className="order-3 min-w-0 xl:order-none">
            <section
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
              aria-label="오늘 주요 상태"
            >
              {statusCards.map((card) => (
                <StatusMetricCard key={card.id} card={card} />
              ))}
            </section>

            <div className="mt-4">
              <RequestSummaryPanel />
            </div>

            <div className="mt-4">
              <RecentVisitHistoryPanel recordsHref={recordsHref} />
            </div>

            <div className="mt-4">
              <ActionButtons
                onMemoCreate={openMemoCreate}
                onVisitStart={openMemoCreate}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
