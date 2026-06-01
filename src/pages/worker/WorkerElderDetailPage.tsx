import {
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Home,
  Info,
  Pencil,
  Phone,
  PlusCircle,
  RefreshCw,
  UserRound,
  Users,
} from 'lucide-react'
import { useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { elderDetails } from '../../features/worker/workerElderDetailData'
import { cn } from '../../lib/utils'

const workerAssetBase = '/assets/dolbomon/worker'
const dashboardAssetBase = '/assets/dolbomon/worker-dashboard'

const navItems = [
  { href: '/worker', label: '홈' },
  { href: '/worker/alerts', label: '안부현황' },
  { href: '/worker/elders/kim-yeongja', label: '기록' },
  { href: '/worker#schedule', label: '일정' },
  { href: '/worker#family-memo', label: '가족메모' },
  { href: '/worker/mypage', label: '설정' },
]

const statusCards = [
  {
    id: 'meal',
    iconSrc: `${workerAssetBase}/식사.png`,
    label: '식사',
    tone: 'amber',
    value: '조금',
  },
  {
    id: 'medicine',
    iconSrc: `${workerAssetBase}/복약.png`,
    label: '복약',
    tone: 'green',
    value: '먹음',
  },
  {
    id: 'pain',
    iconSrc: `${workerAssetBase}/통증.png`,
    label: '통증',
    tone: 'gray',
    value: '보통',
  },
  {
    id: 'mood',
    iconSrc: `${workerAssetBase}/기분.png`,
    label: '기분',
    tone: 'gray',
    value: '보통',
  },
  {
    id: 'sleep',
    iconSrc: `${workerAssetBase}/수면.png`,
    label: '수면',
    tone: 'blue',
    value: '잘 잠',
  },
] as const

const profileInfoRows = [
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
    value: '1941.05.12',
  },
  {
    icon: Home,
    id: 'household',
    label: '거주 형태',
    value: '배우자와 거주',
  },
  {
    icon: UserRound,
    id: 'worker',
    label: '담당 요양사',
    value: '김민수 요양사',
  },
  {
    iconSrc: `${workerAssetBase}/달력2.png`,
    id: 'start',
    label: '관리 시작일',
    value: '2024.02.01',
  },
] as const

const familyContacts = [
  {
    avatarSrc: `${workerAssetBase}/딸.png`,
    id: 'lee-soonja',
    name: '이순자 (딸)',
    phone: '010-1234-5678',
  },
  {
    avatarSrc: `${workerAssetBase}/아들.png`,
    id: 'park-cheolsu',
    name: '박철수 (아들)',
    phone: '010-9876-5432',
  },
  {
    avatarSrc: `${workerAssetBase}/딸.png`,
    id: 'choi-bokrye',
    name: '최복례 (며느리)',
    phone: '010-2222-3333',
  },
] as const

const todayRecords = [
  {
    author: '김민수 요양사',
    content: '기상 시간 07:50',
    id: 'wake',
    item: '기상/수면',
    status: '잘 잠',
    tone: 'blue',
    time: '07:50',
  },
  {
    author: '김민수 요양사',
    content: '아침 식사량 평소의 60%',
    id: 'breakfast',
    item: '식사',
    status: '조금',
    tone: 'amber',
    time: '08:15',
  },
  {
    author: '김민수 요양사',
    content: '아침 약 2종 복용',
    id: 'medicine-morning',
    item: '복약',
    status: '먹음',
    tone: 'green',
    time: '09:30',
  },
  {
    author: '이순자 가족',
    content: '점심 식사량 평소의 70%',
    id: 'lunch',
    item: '식사',
    status: '조금',
    tone: 'amber',
    time: '12:10',
  },
  {
    author: '김민수 요양사',
    content: '가벼운 산책 후 편안해하심',
    id: 'activity',
    item: '활동/기분',
    status: '보통',
    tone: 'gray',
    time: '15:30',
  },
  {
    author: '김민수 요양사',
    content: '저녁 식사량 평소의 80%',
    id: 'dinner',
    item: '식사',
    status: '보통',
    tone: 'gray',
    time: '19:00',
  },
  {
    author: '김민수 요양사',
    content: '저녁 약 2종 복용 (10분 지연)',
    id: 'medicine-evening',
    item: '복약',
    status: '조금 지연',
    tone: 'orange',
    time: '21:30',
  },
  {
    author: '김민수 요양사',
    content: '취침 시간 22:00',
    id: 'sleep',
    item: '취침/수면',
    status: '잘 잠',
    tone: 'blue',
    time: '22:00',
  },
] as const

const weeklyTrend = [
  { date: '5/25', label: '안정', tone: 'green', x: 16, y: 64 },
  { date: '5/26', label: '주의', tone: 'amber', x: 64, y: 48 },
  { date: '5/27', label: '주의', tone: 'amber', x: 112, y: 48 },
  { date: '5/28', label: '위험', tone: 'red', x: 160, y: 70 },
  { date: '5/29', label: '주의', tone: 'amber', x: 208, y: 52 },
  { date: '5/30', label: '주의', tone: 'amber', x: 256, y: 52 },
  { date: '5/31', label: '주의', tone: 'amber', x: 304, y: 52 },
] as const

const statusPillClasses = {
  amber: 'bg-[#ffe6ad] text-[#d77800]',
  blue: 'bg-[#d8eaff] text-[#0068f4]',
  gray: 'bg-[#edf0f4] text-[#1d2b4f]',
  green: 'bg-[#cbefd7] text-[#1f8a40]',
  orange: 'bg-[#ffe1d6] text-[#f05a1a]',
} as const

const trendToneClasses = {
  amber: 'fill-[#f4a100] text-[#e19100]',
  green: 'fill-[#18a957] text-[#179049]',
  red: 'fill-[#ff1d25] text-[#ef1119]',
} as const

type StatusTone = keyof typeof statusPillClasses

function WorkerDetailTopBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#e3ebf7] bg-white/96 shadow-[0_6px_20px_rgba(35,73,128,0.07)] backdrop-blur">
      <div className="mx-auto grid min-h-[74px] w-full max-w-[1640px] grid-cols-[auto_auto] items-center gap-x-4 gap-y-2 px-5 py-3 lg:grid-cols-[190px_minmax(0,1fr)_auto] lg:px-10">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center text-[29px] font-black leading-none text-[#0867f2] drop-shadow-[0_5px_10px_rgba(8,103,242,0.18)] focus-visible:rounded-lg lg:text-[34px]"
          aria-label="돌봄ON 홈"
        >
          돌봄ON
        </Link>

        <nav
          className="col-span-2 row-start-2 flex min-w-0 justify-start gap-2 overflow-x-auto text-[15px] font-extrabold text-[#101a3d] lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:justify-center lg:gap-8"
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

function NotFoundState() {
  return (
    <main className="min-h-svh overflow-x-hidden bg-[#f8fbff] text-[#071747]">
      <WorkerDetailTopBar />

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

function ProfileSummaryCard({
  age,
  avatarSrc,
  household,
  name,
}: {
  age: number
  avatarSrc: string
  household: string
  name: string
}) {
  return (
    <aside
      className="rounded-[18px] border border-[#dfe8f5] bg-white px-4 py-5 shadow-[0_18px_42px_rgba(47,86,145,0.09)]"
      aria-label={`${name} 기본 정보`}
    >
      <div className="flex flex-col items-center text-center">
        <img
          src={avatarSrc}
          alt={`${name} 프로필`}
          className="h-[142px] w-[142px] rounded-full bg-[#f2f6ff] object-cover shadow-[0_12px_28px_rgba(47,86,145,0.13)]"
          draggable="false"
        />
        <h2 className="mt-5 text-[28px] font-black leading-tight text-[#071747]">
          {name}
        </h2>
        <p className="mt-2 text-[17px] font-bold leading-tight text-[#546384]">
          {age}세 · {household}
        </p>
      </div>

      <section className="mt-8 rounded-[16px] border border-[#e3ebf7] bg-white px-4 py-5 shadow-[0_10px_24px_rgba(47,86,145,0.05)]">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-[19px] font-black leading-tight text-[#071747]">
            오늘 상태 요약
          </h3>
          <span className="inline-flex min-h-8 items-center rounded-full bg-[#fff1bd] px-4 text-[16px] font-black text-[#e68900]">
            주의
          </span>
        </div>

        <p className="mt-5 text-[16px] font-bold leading-[1.65] text-[#4c5d7c]">
          식사량이 평소보다 낮고, 복약 시간이 불규칙했습니다.
        </p>

        <div className="my-4 h-px bg-[#e6eef8]" aria-hidden="true" />

        <dl className="grid gap-4">
          {profileInfoRows.map((row) => {
            const Icon = 'icon' in row ? row.icon : null

            return (
              <div
                key={row.id}
                className="grid grid-cols-[34px_minmax(84px,1fr)_auto] items-center gap-2"
              >
                <span className="inline-grid h-8 w-8 place-items-center text-[#0867f2]">
                  {Icon ? (
                    <Icon aria-hidden="true" size={24} strokeWidth={2.5} />
                  ) : (
                    <img
                      src={row.iconSrc}
                      alt=""
                      className="h-7 w-7 object-contain"
                      draggable="false"
                    />
                  )}
                </span>
                <dt className="text-[15px] font-bold leading-tight text-[#75819a]">
                  {row.label}
                </dt>
                <dd className="text-right text-[15px] font-black leading-tight text-[#071747]">
                  {row.value}
                </dd>
              </div>
            )
          })}
        </dl>
      </section>

      <Link
        to="/worker/elders/kim-yeongja"
        className="mx-auto mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 text-[17px] font-black text-[#0867f2] transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
      >
        어르신 정보 보기
        <ChevronRight aria-hidden="true" className="h-5 w-5" />
      </Link>
    </aside>
  )
}

function StatusMetricCard({ card }: { card: (typeof statusCards)[number] }) {
  return (
    <article className="flex min-h-[168px] flex-col items-center justify-center rounded-[16px] border border-[#e2eaf6] bg-white px-3 py-4 text-center shadow-[0_14px_32px_rgba(47,86,145,0.08)]">
      <img
        src={card.iconSrc}
        alt=""
        className="h-[82px] w-[92px] object-contain"
        draggable="false"
      />
      <h3 className="mt-1 text-[17px] font-black leading-tight text-[#071747]">
        {card.label}
      </h3>
      <span
        className={cn(
          'mt-3 inline-flex min-h-8 min-w-[78px] items-center justify-center rounded-full px-4 text-[15px] font-black leading-none shadow-[0_8px_16px_rgba(47,86,145,0.08)]',
          statusPillClasses[card.tone],
        )}
      >
        {card.value}
      </span>
    </article>
  )
}

function AiSummaryPanel() {
  return (
    <section
      className="rounded-[18px] border border-[#e0e8f5] bg-white shadow-[0_16px_36px_rgba(47,86,145,0.08)]"
      aria-labelledby="ai-summary-title"
    >
      <div className="flex items-start gap-4 px-5 py-5">
        <img
          src={`${workerAssetBase}/ai.png`}
          alt=""
          className="h-[42px] w-[42px] shrink-0 object-contain"
          draggable="false"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2
              id="ai-summary-title"
              className="text-[19px] font-black leading-tight text-[#071747]"
            >
              AI 생활 상태 요약
            </h2>
            <div className="flex items-center gap-2 text-[14px] font-bold text-[#697895]">
              <span>오늘 09:30 기준</span>
              <button
                type="button"
                className="inline-grid h-8 w-8 place-items-center rounded-lg text-[#657695] transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
                aria-label="AI 요약 새로고침"
              >
                <RefreshCw aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>

          <p className="mt-3 text-[16px] font-bold leading-[1.75] text-[#314263]">
            식사량이 평소 대비 감소하였고, 복약 시간이 다소 지연되었습니다.
            <br />
            통증과 기분은 보통 수준이며, 수면은 안정적으로 유지되었습니다.
            <br />
            수분 섭취와 규칙적인 복약 시간을 재확인하고 권장드립니다.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-[#e6eef8] px-5 py-3 text-[13px] font-bold text-[#7a86a0]">
        <Info
          aria-hidden="true"
          className="h-5 w-5 shrink-0 text-[#7b8aa7]"
          strokeWidth={2.5}
        />
        <p>AI 요약은 참고용으로 제공되며, 실제 상담을 대체하지 않습니다.</p>
      </div>
    </section>
  )
}

function StatusBadge({ status, tone }: { status: string; tone: StatusTone }) {
  return (
    <span
      className={cn(
        'inline-flex min-h-7 min-w-[64px] items-center justify-center rounded-full px-3 text-[14px] font-black leading-none',
        statusPillClasses[tone],
      )}
    >
      {status}
    </span>
  )
}

function TodayRecordsPanel({ onMemoCreate }: { onMemoCreate: () => void }) {
  return (
    <section
      className="rounded-[18px] border border-[#e0e8f5] bg-white px-5 py-3 shadow-[0_16px_36px_rgba(47,86,145,0.08)]"
      aria-labelledby="today-records-title"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2
          id="today-records-title"
          className="text-[20px] font-black leading-tight text-[#071747]"
        >
          오늘 기록
        </h2>
        <button
          type="button"
          className="inline-flex min-h-9 items-center justify-center gap-2 rounded-lg border border-[#dfe8f5] bg-white px-3 text-[15px] font-black text-[#0867f2] shadow-[0_8px_18px_rgba(47,86,145,0.07)] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
          onClick={onMemoCreate}
        >
          <PlusCircle aria-hidden="true" className="h-5 w-5" />
          기록 추가
        </button>
      </div>

      <div className="mt-3 overflow-x-auto rounded-[14px] border border-[#e3ebf7]">
        <table className="w-full min-w-[680px] border-collapse text-left">
          <caption className="sr-only">김영자님 오늘 상태 기록</caption>
          <thead className="bg-[#fbfdff] text-[14px] font-black text-[#687792]">
            <tr>
              <th className="w-[96px] px-4 py-2.5" scope="col">
                시간
              </th>
              <th className="w-[130px] px-4 py-2.5" scope="col">
                항목
              </th>
              <th className="px-4 py-2.5" scope="col">
                내용
              </th>
              <th className="w-[128px] px-4 py-2.5" scope="col">
                상태
              </th>
              <th className="w-[150px] px-4 py-2.5" scope="col">
                기록자
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e7eef8] text-[14px] font-bold text-[#253758]">
            {todayRecords.map((record) => (
              <tr key={record.id} className="bg-white">
                <td className="px-4 py-2.5 font-black text-[#1e3a66]">
                  {record.time}
                </td>
                <td className="px-4 py-2.5">{record.item}</td>
                <td className="px-4 py-2.5">{record.content}</td>
                <td className="px-4 py-2.5">
                  <StatusBadge status={record.status} tone={record.tone} />
                </td>
                <td className="px-4 py-2.5">{record.author}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function FamilyContactsPanel() {
  return (
    <section
      className="rounded-[18px] border border-[#e0e8f5] bg-white px-5 py-5 shadow-[0_16px_36px_rgba(47,86,145,0.08)]"
      aria-labelledby="family-contacts-title"
    >
      <h2
        id="family-contacts-title"
        className="text-[20px] font-black leading-tight text-[#071747]"
      >
        가족 연락처
      </h2>

      <ul className="mt-5 divide-y divide-[#e6eef8]">
        {familyContacts.map((contact) => (
          <li
            key={contact.id}
            className="grid grid-cols-[54px_minmax(0,1fr)_auto_auto] items-center gap-3 py-3 first:pt-0"
          >
            <img
              src={contact.avatarSrc}
              alt=""
              className="h-[50px] w-[50px] rounded-full bg-[#f2f6ff] object-cover shadow-[0_8px_18px_rgba(47,86,145,0.12)]"
              draggable="false"
            />
            <div className="min-w-0">
              <p className="truncate text-[15px] font-black leading-tight text-[#071747]">
                {contact.name}
              </p>
              <p className="mt-1 text-[13px] font-bold leading-tight text-[#697895]">
                가족
              </p>
            </div>
            <a
              href={`tel:${contact.phone.replaceAll('-', '')}`}
              className="hidden whitespace-nowrap text-[14px] font-bold text-[#496186] transition hover:text-[#0867f2] min-[380px]:inline"
            >
              {contact.phone}
            </a>
            <a
              href={`tel:${contact.phone.replaceAll('-', '')}`}
              className="inline-grid h-9 w-9 place-items-center rounded-lg text-[#0867f2] transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
              aria-label={`${contact.name}에게 전화하기`}
            >
              <Phone aria-hidden="true" className="h-5 w-5" strokeWidth={2.5} />
            </a>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mx-auto mt-3 inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 text-[16px] font-black text-[#0867f2] transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
      >
        <Users aria-hidden="true" className="h-5 w-5" strokeWidth={2.5} />
        전체 연락처 보기
        <ChevronRight aria-hidden="true" className="h-5 w-5" />
      </button>
    </section>
  )
}

function RecentMemoPanel({ onMemoCreate }: { onMemoCreate: () => void }) {
  return (
    <section
      className="rounded-[18px] border border-[#e0e8f5] bg-white px-5 py-5 shadow-[0_16px_36px_rgba(47,86,145,0.08)]"
      aria-labelledby="recent-memo-title"
    >
      <div className="flex items-center justify-between gap-3">
        <h2
          id="recent-memo-title"
          className="text-[20px] font-black leading-tight text-[#071747]"
        >
          최근 상담 메모
        </h2>
        <button
          type="button"
          className="inline-flex min-h-8 items-center gap-1 rounded-lg px-2 text-[14px] font-black text-[#0867f2] transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          전체 보기
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>

      <article className="mt-4 rounded-[12px] border border-[#e2eaf6] bg-[#fbfdff] px-4 py-4">
        <h3 className="text-[16px] font-black leading-tight text-[#071747]">
          식사량 감소 관련 상담
        </h3>
        <p className="mt-2 text-[14px] font-bold leading-[1.65] text-[#52627f]">
          최근 식사량이 줄어든 원인에 대해 이야기하고 소량씩 자주 드시도록
          안내드렸습니다.
        </p>
        <p className="mt-3 text-[13px] font-bold text-[#6e7c98]">
          김민수 요양사 · 2024.05.31 10:45
        </p>
      </article>

      <button
        type="button"
        className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#0867f2] px-4 text-[17px] font-black text-white shadow-[0_14px_26px_rgba(8,103,242,0.28)] transition hover:bg-[#0057d8] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        onClick={onMemoCreate}
      >
        <Pencil aria-hidden="true" className="h-6 w-6" strokeWidth={2.7} />
        상담 메모 작성
      </button>
    </section>
  )
}

function WeeklyTrendPanel() {
  const linePoints = weeklyTrend
    .map((point) => `${point.x},${point.y}`)
    .join(' ')

  return (
    <section
      className="rounded-[18px] border border-[#e0e8f5] bg-white px-5 py-5 shadow-[0_16px_36px_rgba(47,86,145,0.08)]"
      aria-labelledby="weekly-trend-title"
    >
      <div className="flex items-center justify-between gap-3">
        <h2
          id="weekly-trend-title"
          className="text-[20px] font-black leading-tight text-[#071747]"
        >
          주간 변화 추이
        </h2>
        <button
          type="button"
          className="inline-flex min-h-9 items-center gap-1 rounded-lg border border-[#dfe8f5] bg-white px-3 text-[14px] font-black text-[#223156] shadow-[0_8px_18px_rgba(47,86,145,0.07)] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          최근 7일
          <ChevronDown aria-hidden="true" className="h-4 w-4 text-[#0867f2]" />
        </button>
      </div>

      <div className="mt-5 overflow-hidden">
        <svg
          aria-label="5월 25일부터 5월 31일까지 주간 변화 추이"
          className="h-[138px] w-full"
          role="img"
          viewBox="0 0 320 138"
        >
          <polyline
            fill="none"
            points={linePoints}
            stroke="#ff8f00"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />
          {weeklyTrend.map((point) => (
            <g key={point.date}>
              <text
                className={cn(
                  'text-[12px] font-black',
                  trendToneClasses[point.tone],
                )}
                textAnchor="middle"
                x={point.x}
                y={point.y - 22}
              >
                {point.label}
              </text>
              <circle
                className={trendToneClasses[point.tone]}
                cx={point.x}
                cy={point.y}
                r="7"
                stroke="#ffffff"
                strokeWidth="3"
              />
              <text
                fill="#496186"
                fontSize="13"
                fontWeight="800"
                textAnchor="middle"
                x={point.x}
                y="124"
              >
                {point.date}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-1 h-px bg-[#e6eef8]" aria-hidden="true" />

      <button
        type="button"
        className="mx-auto mt-3 inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 text-[16px] font-black text-[#0867f2] transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
      >
        <img
          src={`${workerAssetBase}/파일.png`}
          alt=""
          className="h-5 w-5 object-contain"
          draggable="false"
        />
        변화 추이 자세히 보기
        <ChevronRight aria-hidden="true" className="h-5 w-5" />
      </button>
    </section>
  )
}

export function WorkerElderDetailPage() {
  const { elderId } = useParams()
  const navigate = useNavigate()

  const elder = useMemo(
    () => elderDetails.find((item) => item.id === elderId),
    [elderId],
  )

  if (!elder) {
    return <NotFoundState />
  }

  const openMemoCreate = () => {
    navigate(`/worker/elders/${elder.id}/memo`, {
      state: { fromWorkerElderDetail: true },
    })
  }

  const avatarSrc =
    elder.id === 'kim-yeongja'
      ? '/assets/dolbomon/worker-elders/elder-kim-yeongja.png'
      : elder.avatarSrc
  const age = elder.id === 'kim-yeongja' ? 84 : elder.age

  const household =
    elder.id === 'kim-yeongja' ? '배우자와 거주' : elder.household
  const detailTitle = `${elder.name} 상태 상세`

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#f8fbff] text-[#071747]">
      <WorkerDetailTopBar />

      <div className="mx-auto w-full max-w-[1600px] px-5 pb-10 pt-8 lg:px-11">
        <nav
          className="flex flex-wrap items-center gap-2 text-[15px] font-bold text-[#64738f]"
          aria-label="현재 위치"
        >
          <Link
            to="/worker/elders/kim-yeongja"
            className="transition hover:text-[#0867f2] focus-visible:rounded-lg"
          >
            기록
          </Link>
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
          <Link
            to="/worker/elders"
            className="transition hover:text-[#0867f2] focus-visible:rounded-lg"
          >
            담당 어르신 목록
          </Link>
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
          <span className="font-black text-[#071747]">{detailTitle}</span>
        </nav>

        <div className="mt-5 grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)_360px] xl:items-start">
          <ProfileSummaryCard
            age={age}
            avatarSrc={avatarSrc}
            household={household}
            name={elder.name}
          />

          <div className="min-w-0">
            <section aria-labelledby="elder-detail-title">
              <h1
                id="elder-detail-title"
                className="text-[31px] font-black leading-tight text-[#071747] lg:text-[36px]"
              >
                {detailTitle}
              </h1>
              <p className="mt-2 text-[16px] font-bold leading-snug text-[#566784]">
                오늘의 상태와 기록을 확인하고 관리하세요.
              </p>
            </section>

            <section
              className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
              aria-label="오늘 주요 상태"
            >
              {statusCards.map((card) => (
                <StatusMetricCard key={card.id} card={card} />
              ))}
            </section>

            <div className="mt-4">
              <AiSummaryPanel />
            </div>

            <div className="mt-4">
              <TodayRecordsPanel onMemoCreate={openMemoCreate} />
            </div>
          </div>

          <aside className="grid gap-4" aria-label="연락처 및 상담 정보">
            <FamilyContactsPanel />
            <RecentMemoPanel onMemoCreate={openMemoCreate} />
            <WeeklyTrendPanel />
          </aside>
        </div>
      </div>
    </main>
  )
}
