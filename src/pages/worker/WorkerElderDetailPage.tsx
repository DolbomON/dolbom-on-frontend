import {
  Bell,
  CalendarDays,
  ChevronDown,
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
import { caregiverTopNavItems } from '../../components/worker/caregiverTopNavigation'
import { elderDetails } from '../../features/worker/workerElderDetailData'
import { cn } from '../../lib/utils'

const workerAssetBase = '/assets/dolbomon/worker'
const dashboardAssetBase = '/assets/dolbomon/worker-dashboard'
const workerProfileSrc = '/assets/dolbomon/worker-mypage/worker-lee-bokji.png'

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

const workerDetailTopNavItems = [
  { href: '/worker', label: '홈' },
  { href: '/worker/elders', label: '복지 현황' },
  { href: '/worker/consultations', label: '상담 관리' },
  { href: '/worker/reports', label: '보고서' },
  { href: '/worker/schedules', label: '기관 일정' },
  { href: '/worker/mypage', label: '설정' },
] as const

function WorkerDetailTopBar({ viewRole }: { viewRole: DetailViewRole }) {
  const isCaregiverView = viewRole === 'caregiver'
  const navItems = isCaregiverView
    ? caregiverTopNavItems
    : workerDetailTopNavItems
  const navLabel = isCaregiverView ? '요양사 메뉴' : '복지사 메뉴'
  const profileHref = isCaregiverView ? '/caregiver' : '/worker/mypage'
  const profileName = isCaregiverView ? '김민수 요양사' : '이수진 복지사'
  const profileImageSrc = isCaregiverView
    ? `${workerAssetBase}/아들.png`
    : workerProfileSrc

  return (
    <header className="sticky top-0 z-30 border-b border-[#dde7f4] bg-white/95 shadow-[0_5px_18px_rgba(35,73,128,0.07)] backdrop-blur">
      <div className="mx-auto grid min-h-[82px] w-full grid-cols-[auto_auto] items-center gap-x-4 gap-y-2 px-5 py-2 lg:h-[72px] lg:min-h-[72px] lg:grid-cols-[214px_minmax(0,1fr)_auto] lg:px-[31px] lg:py-0">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center text-[29px] font-black leading-none text-[#0867f2] drop-shadow-[0_5px_10px_rgba(8,103,242,0.16)] focus-visible:rounded-lg lg:text-[34px]"
          aria-label="돌봄ON 홈"
        >
          돌봄ON
        </Link>

        <nav
          className="col-span-2 row-start-2 flex min-w-0 justify-start gap-3 overflow-x-auto text-[15px] font-extrabold text-[#101a3d] lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:justify-center lg:gap-12"
          aria-label={navLabel}
        >
          {navItems.map((item) => {
            const isActive = isCaregiverView
              ? item.label === '담당어르신'
              : item.href === '/worker/elders'

            return (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  'relative inline-flex min-h-11 shrink-0 items-center justify-center px-2 transition hover:text-[#0867f2] focus-visible:rounded-lg lg:min-h-[72px]',
                  isActive ? 'text-[#0867f2]' : 'text-[#111827]',
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
                <span
                  className={cn(
                    'absolute bottom-0 left-0 right-0 h-1 rounded-full bg-[#0867f2]',
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
            className="relative inline-grid min-h-11 min-w-11 place-items-center rounded-lg text-[#33415c] transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
            aria-label="알림 3건 확인"
          >
            <Bell aria-hidden="true" size={27} strokeWidth={2.4} />
            <span className="absolute right-1 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#ef3b43] px-1 text-[12px] font-black leading-none text-white ring-2 ring-white">
              3
            </span>
          </button>

          <Link
            to={profileHref}
            className="hidden min-h-12 items-center gap-3 rounded-lg px-1.5 py-1 transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff] min-[540px]:inline-flex"
            aria-label={`${profileName} 프로필 보기`}
          >
            <img
              src={profileImageSrc}
              alt=""
              className="h-11 w-11 rounded-full bg-[#f0f5ff] object-cover shadow-[0_6px_14px_rgba(42,96,184,0.16)]"
              draggable="false"
            />
            <strong className="hidden text-[15px] font-black leading-tight text-[#111827] sm:block">
              {profileName}
            </strong>
            <ChevronDown
              aria-hidden="true"
              className="hidden h-5 w-5 text-[#25324a] sm:block"
              strokeWidth={2.7}
            />
          </Link>
        </div>
      </div>
    </header>
  )
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
      className="rounded-[18px] border border-[#dfe8f5] bg-white px-5 py-5 shadow-[0_16px_36px_rgba(47,86,145,0.08)] xl:h-[235px]"
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
      navigate('/caregiver/records')
      return
    }

    navigate(`/worker/elders/${elder.id}/memo`, {
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
