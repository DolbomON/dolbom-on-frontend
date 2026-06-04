import {
  Bell,
  BellOff,
  BadgeCheck,
  ChevronDown,
  Clock3,
  ClipboardCheck,
  Eye,
  Link as LinkIcon,
  ShieldCheck,
  UserPlus,
  UserRoundCheck,
  Users,
  type LucideIcon,
} from 'lucide-react'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

const connectAssetBase = '/assets/dolbomon/welfare-connect'
const workerAssetBase = '/assets/dolbomon/worker'
const dashboardAssetBase = '/assets/dolbomon/worker-dashboard'
const workerProfileSrc = '/assets/dolbomon/worker-mypage/worker-lee-bokji.png'

const navItems = [
  { href: '/worker', label: '홈' },
  { href: '/worker/welfare-connect', label: '복지 현황' },
  { href: '/worker/consultations', label: '상담 관리' },
  { href: '/worker/reports', label: '보고서' },
  { href: '/worker/schedules', label: '기관 일정' },
  { href: '/worker/mypage', label: '설정' },
] as const

const summaryMetrics = [
  {
    icon: Users,
    label: '연결된 가족 2명',
    tone: 'blue',
  },
  {
    icon: UserRoundCheck,
    label: '담당 요양사 1명',
    tone: 'green',
  },
  {
    icon: ShieldCheck,
    label: '담당 복지사 1명',
    tone: 'blue',
  },
] as const

const familyConnections = [
  {
    avatarSrc: `${workerAssetBase}/딸.png`,
    name: '이순자',
    notifications: true,
    permission: '상태 요약 보기 가능',
    relation: '딸',
  },
  {
    avatarSrc: `${workerAssetBase}/아들.png`,
    name: '박철수',
    notifications: false,
    permission: '상태 요약 보기 가능',
    relation: '아들',
  },
] as const

const permissionSummary = [
  {
    description: '상태 요약 확인, 알림 수신 설정',
    iconSrc: `${connectAssetBase}/사람.png`,
    title: '가족',
    tone: 'blue',
  },
  {
    description: '방문 기록 작성',
    iconSrc: `${connectAssetBase}/사람2.png`,
    title: '요양사',
    tone: 'green',
  },
  {
    description: '전체 연결 및 권한 관리',
    iconSrc: `${connectAssetBase}/보안.png`,
    title: '복지사',
    tone: 'purple',
  },
] as const

const recentChanges = [
  {
    description: '오늘 09:25',
    icon: Bell,
    state: 'active',
    title: '이순자 딸 알림 수신 켜짐',
  },
  {
    description: '어제 14:18',
    icon: UserRoundCheck,
    state: 'info',
    title: '김민수 요양사 배정 완료',
  },
  {
    description: '어제 10:42',
    icon: BadgeCheck,
    state: 'muted',
    title: '박철수 아들 권한 변경 대기 없음',
  },
] as const

const toneClasses = {
  blue: {
    icon: 'bg-[#e9f2ff] text-[#0867f2]',
    pill: 'border-[#d5e6ff] bg-white text-[#0b54d9]',
  },
  green: {
    icon: 'bg-[#ddf6f0] text-[#0f9b86]',
    pill: 'border-[#cceee6] bg-[#f3fffb] text-[#0a7f70]',
  },
  purple: {
    icon: 'bg-[#f1ecff] text-[#7357f6]',
    pill: 'border-[#ddd4ff] bg-[#f8f5ff] text-[#624be0]',
  },
} as const

type Tone = keyof typeof toneClasses

function WelfareConnectTopBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#dde7f4] bg-white/96 shadow-[0_5px_18px_rgba(35,73,128,0.07)] backdrop-blur">
      <div className="mx-auto grid min-h-[82px] w-full max-w-[1680px] grid-cols-[auto_auto] items-center gap-x-4 gap-y-2 px-5 py-2 lg:min-h-[82px] lg:grid-cols-[260px_minmax(0,1fr)_auto] lg:px-10">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center text-[30px] font-black leading-none text-[#0867f2] drop-shadow-[0_5px_10px_rgba(8,103,242,0.16)] focus-visible:rounded-lg lg:text-[38px]"
          aria-label="돌봄ON 홈"
        >
          돌봄ON
        </Link>

        <nav
          className="col-span-2 row-start-2 flex min-w-0 flex-wrap justify-start gap-x-4 gap-y-1 overflow-visible pb-2 text-[16px] font-extrabold text-[#101a3d] lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:flex-nowrap lg:justify-center lg:gap-12 lg:pb-0"
          aria-label="복지사 돌봄 연결 메뉴"
        >
          {navItems.map((item) => {
            const isActive = item.href === '/worker/welfare-connect'

            return (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  'relative inline-flex min-h-11 shrink-0 items-center justify-center px-2 transition hover:text-[#0867f2] focus-visible:rounded-lg lg:min-h-[82px]',
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
            <Bell aria-hidden="true" size={28} strokeWidth={2.4} />
            <span className="absolute right-0.5 top-0 grid h-[23px] min-w-[23px] place-items-center rounded-full bg-[#ef3b43] px-1 text-[12px] font-black leading-none text-white ring-2 ring-white">
              3
            </span>
          </button>

          <Link
            to="/worker/mypage"
            className="hidden min-h-12 items-center gap-3 rounded-lg px-1.5 py-1 transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff] min-[560px]:inline-flex"
            aria-label="이수진 복지사 프로필 보기"
          >
            <img
              src={workerProfileSrc}
              alt=""
              className="h-12 w-12 rounded-full bg-[#f0f5ff] object-cover shadow-[0_6px_14px_rgba(42,96,184,0.16)]"
              draggable="false"
            />
            <span className="hidden text-left sm:block">
              <strong className="block whitespace-nowrap text-[16px] font-black leading-tight text-[#111827]">
                이수진 복지사
              </strong>
              <span className="mt-1 inline-flex rounded-lg bg-[#eaf3ff] px-2 py-1 text-[13px] font-black leading-none text-[#0867f2]">
                복지사
              </span>
            </span>
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

type SectionFrameProps = ComponentPropsWithoutRef<'section'> & {
  children: ReactNode
}

function SectionFrame({
  children,
  className,
  ...sectionProps
}: SectionFrameProps) {
  return (
    <section
      {...sectionProps}
      className={cn(
        'rounded-[18px] border border-[#dfe8f5] bg-white px-5 py-5 shadow-[0_14px_36px_rgba(47,86,145,0.08)]',
        className,
      )}
    >
      {children}
    </section>
  )
}

function SummaryMetric({
  icon: Icon,
  label,
  tone,
}: {
  icon: LucideIcon
  label: string
  tone: Tone
}) {
  return (
    <span
      className={cn(
        'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-4 text-[15px] font-black shadow-[0_8px_18px_rgba(47,86,145,0.06)]',
        toneClasses[tone].pill,
      )}
    >
      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={2.8} />
      {label}
    </span>
  )
}

function ConnectionHeroCard() {
  return (
    <SectionFrame className="overflow-hidden p-0">
      <div className="relative grid gap-5 px-5 py-5 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.92fr)] lg:items-center lg:px-6 lg:py-4">
        <div className="grid gap-5 sm:grid-cols-[150px_minmax(0,1fr)] sm:items-center">
          <img
            src={`${dashboardAssetBase}/elder-kim-yeongja.png`}
            alt="김영자 어르신 프로필"
            className="h-[142px] w-[142px] rounded-full bg-[#e6f2ff] object-cover shadow-[0_12px_24px_rgba(47,86,145,0.12)]"
            draggable="false"
          />

          <div className="min-w-0">
            <h2 className="text-[29px] font-black leading-tight text-[#071747] lg:text-[32px]">
              김영자 어르신
            </h2>
            <p className="mt-3 text-[17px] font-bold leading-tight text-[#243453]">
              84세 <span aria-hidden="true">·</span> 배우자와 거주
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {summaryMetrics.map((metric) => (
                <SummaryMetric
                  key={metric.label}
                  icon={metric.icon}
                  label={metric.label}
                  tone={metric.tone}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="relative min-h-[180px] overflow-hidden rounded-[16px] bg-[linear-gradient(135deg,#f6fbff_0%,#eaf4ff_62%,#d8eaff_100%)] px-4 pt-4 sm:min-h-[210px] lg:bg-transparent">
          <div className="absolute right-4 top-4 z-10 inline-flex min-h-10 items-center gap-2 rounded-full bg-[#0867f2] px-4 text-[15px] font-black text-white shadow-[0_10px_22px_rgba(8,103,242,0.25)]">
            <ShieldCheck
              aria-hidden="true"
              className="h-5 w-5 fill-white/15"
              strokeWidth={2.8}
            />
            돌봄팀 연결 상태 정상
          </div>
          <img
            src={`${connectAssetBase}/돌봄연결.png`}
            alt=""
            className="pointer-events-none absolute bottom-[-8px] right-[-18px] h-[184px] w-[410px] max-w-none object-contain sm:h-[220px] sm:w-[492px] lg:right-[-34px]"
            draggable="false"
          />
        </div>
      </div>
    </SectionFrame>
  )
}

function PermissionChip({
  icon: Icon,
  label,
  tone,
}: {
  icon: LucideIcon
  label: string
  tone: Tone
}) {
  return (
    <span
      className={cn(
        'inline-flex min-h-9 items-center gap-2 rounded-lg border px-4 text-[14px] font-black',
        toneClasses[tone].pill,
      )}
    >
      <Icon aria-hidden="true" className="h-4.5 w-4.5" strokeWidth={2.8} />
      {label}
    </span>
  )
}

function ConnectedFamiliesCard() {
  return (
    <SectionFrame aria-labelledby="connected-family-title">
      <div className="flex items-center gap-3">
        <Users aria-hidden="true" className="h-7 w-7 text-[#0867f2]" />
        <h2
          id="connected-family-title"
          className="text-[22px] font-black leading-tight text-[#071747]"
        >
          연결된 가족
        </h2>
      </div>

      <div className="mt-4 grid gap-2">
        {familyConnections.map((family) => (
          <article
            key={family.name}
            className="grid gap-3 rounded-[10px] border border-[#e3eaf5] bg-white px-4 py-2.5 shadow-[0_8px_18px_rgba(47,86,145,0.04)] md:grid-cols-[minmax(180px,1fr)_auto_auto] md:items-center"
          >
            <div className="flex min-w-0 items-center gap-4">
              <img
                src={family.avatarSrc}
                alt={`${family.name} ${family.relation} 프로필`}
                className="h-[54px] w-[54px] rounded-full bg-[#f1f7ff] object-cover shadow-[0_7px_16px_rgba(47,86,145,0.12)]"
                draggable="false"
              />
              <p className="min-w-0 text-[17px] font-black leading-tight text-[#071747]">
                <span>{family.name}</span>
                <span className="ml-2 text-[14px] font-bold text-[#425371]">
                  {family.relation}
                </span>
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <PermissionChip
                icon={Eye}
                label={family.permission}
                tone="green"
              />
              <PermissionChip
                icon={family.notifications ? Bell : BellOff}
                label={
                  family.notifications ? '알림 수신 켜짐' : '알림 수신 꺼짐'
                }
                tone={family.notifications ? 'green' : 'blue'}
              />
            </div>

            <div className="grid grid-cols-2 gap-3 md:min-w-[300px]">
              <button
                type="button"
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#0867f2] bg-white px-4 text-[15px] font-black text-[#0867f2] shadow-[0_8px_18px_rgba(47,86,145,0.05)] transition hover:bg-[#f1f7ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
              >
                <ShieldCheck
                  aria-hidden="true"
                  className="h-5 w-5"
                  strokeWidth={2.7}
                />
                권한 변경
              </button>
              <button
                type="button"
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#c9d3e2] bg-white px-4 text-[15px] font-black text-[#25314a] shadow-[0_8px_18px_rgba(47,86,145,0.05)] transition hover:bg-[#f8fbff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
              >
                <LinkIcon
                  aria-hidden="true"
                  className="h-5 w-5"
                  strokeWidth={2.7}
                />
                연결 해제
              </button>
            </div>
          </article>
        ))}
      </div>
    </SectionFrame>
  )
}

function CaregiverAssignmentCard() {
  return (
    <SectionFrame aria-labelledby="assigned-caregiver-title">
      <div className="flex items-center gap-3">
        <UserRoundCheck
          aria-hidden="true"
          className="h-7 w-7 text-[#0867f2]"
          strokeWidth={2.6}
        />
        <h2
          id="assigned-caregiver-title"
          className="text-[22px] font-black leading-tight text-[#071747]"
        >
          담당 요양사
        </h2>
      </div>

      <article className="mt-3 grid gap-3 rounded-[10px] border border-[#e3eaf5] bg-white px-4 py-2.5 shadow-[0_8px_18px_rgba(47,86,145,0.04)] md:grid-cols-[minmax(210px,1fr)_minmax(240px,0.9fr)_160px] md:items-center">
        <div className="flex min-w-0 items-center gap-4">
          <img
            src={workerAssetBase + '/아들.png'}
            alt="김민수 요양사 프로필"
            className="h-[54px] w-[54px] rounded-full bg-[#e6f7ff] object-cover shadow-[0_7px_16px_rgba(47,86,145,0.12)]"
            draggable="false"
          />
          <p className="min-w-0 text-[17px] font-black leading-tight text-[#071747]">
            김민수
            <span className="ml-2 text-[14px] font-bold text-[#425371]">
              요양사
            </span>
          </p>
        </div>

        <PermissionChip
          icon={ClipboardCheck}
          label="방문 기록 작성 가능"
          tone="blue"
        />

        <button
          type="button"
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#0867f2] bg-white px-4 text-[15px] font-black text-[#0867f2] shadow-[0_8px_18px_rgba(47,86,145,0.05)] transition hover:bg-[#f1f7ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          <UserRoundCheck
            aria-hidden="true"
            className="h-5 w-5"
            strokeWidth={2.7}
          />
          담당 변경
        </button>
      </article>
    </SectionFrame>
  )
}

function WorkerAssignmentCard() {
  return (
    <SectionFrame aria-labelledby="assigned-worker-title">
      <div className="flex items-center gap-3">
        <ShieldCheck
          aria-hidden="true"
          className="h-7 w-7 fill-[#dceaff] text-[#0867f2]"
          strokeWidth={2.7}
        />
        <h2
          id="assigned-worker-title"
          className="text-[22px] font-black leading-tight text-[#071747]"
        >
          담당 복지사
        </h2>
      </div>

      <article className="mt-3 grid gap-3 rounded-[10px] border border-[#d6e6fb] bg-[#f7fbff] px-4 py-2.5 md:grid-cols-[minmax(210px,1fr)_minmax(230px,0.92fr)] md:items-center">
        <div className="flex min-w-0 items-center gap-4">
          <img
            src={workerProfileSrc}
            alt="이수진 복지사 프로필"
            className="h-[54px] w-[54px] rounded-full bg-[#f0f5ff] object-cover shadow-[0_7px_16px_rgba(47,86,145,0.12)]"
            draggable="false"
          />
          <p className="min-w-0 text-[17px] font-black leading-tight text-[#071747]">
            이수진
            <span className="ml-2 text-[14px] font-bold text-[#425371]">
              복지사
            </span>
          </p>
        </div>

        <PermissionChip
          icon={ShieldCheck}
          label="전체 연결 및 권한 관리"
          tone="blue"
        />
      </article>
    </SectionFrame>
  )
}

function PrimaryActions() {
  return (
    <section
      className="grid gap-4 rounded-[18px] border border-[#dfe8f5] bg-white px-5 py-5 shadow-[0_14px_36px_rgba(47,86,145,0.08)] md:grid-cols-3"
      aria-label="돌봄팀 연결 주요 작업"
    >
      <button
        type="button"
        className="inline-flex min-h-[56px] items-center justify-center gap-3 rounded-lg bg-[#0867f2] px-5 text-[18px] font-black text-white shadow-[0_14px_26px_rgba(8,103,242,0.28)] transition hover:bg-[#0057d8] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
      >
        <UserPlus aria-hidden="true" className="h-6 w-6" strokeWidth={2.8} />
        가족 초대
      </button>
      <button
        type="button"
        className="inline-flex min-h-[56px] items-center justify-center gap-3 rounded-lg border border-[#0867f2] bg-white px-5 text-[18px] font-black text-[#0867f2] shadow-[0_10px_22px_rgba(47,86,145,0.06)] transition hover:bg-[#f1f7ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
      >
        <UserRoundCheck
          aria-hidden="true"
          className="h-6 w-6"
          strokeWidth={2.8}
        />
        요양사 배정
      </button>
      <button
        type="button"
        className="inline-flex min-h-[56px] items-center justify-center gap-3 rounded-lg border border-[#aab5c5] bg-white px-5 text-[18px] font-black text-[#425371] shadow-[0_10px_22px_rgba(47,86,145,0.06)] transition hover:bg-[#f8fbff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
      >
        <LinkIcon aria-hidden="true" className="h-6 w-6" strokeWidth={2.8} />
        초대 링크 복사
      </button>
    </section>
  )
}

function PermissionSummaryPanel() {
  return (
    <aside
      className="rounded-[22px] border border-[#dfe8f5] bg-white px-6 py-6 shadow-[0_18px_44px_rgba(47,86,145,0.08)]"
      aria-labelledby="permission-summary-title"
    >
      <div className="flex items-start justify-between gap-4">
        <h2
          id="permission-summary-title"
          className="text-[26px] font-black leading-tight text-[#071747]"
        >
          권한 요약
        </h2>
        <img
          src={`${connectAssetBase}/체크.png`}
          alt=""
          className="h-[78px] w-[78px] shrink-0 object-contain"
          draggable="false"
        />
      </div>

      <div className="mt-2 grid gap-3">
        {permissionSummary.map((item) => (
          <article
            key={item.title}
            className="grid min-h-[72px] grid-cols-[60px_minmax(0,1fr)] items-center gap-3 rounded-[13px] border border-[#e3eaf5] bg-white px-3 py-2 shadow-[0_8px_18px_rgba(47,86,145,0.04)]"
          >
            <span
              className={cn(
                'grid h-[56px] w-[56px] place-items-center rounded-full',
                toneClasses[item.tone].icon,
              )}
            >
              <img
                src={item.iconSrc}
                alt=""
                className="h-[42px] w-[42px] object-contain"
                draggable="false"
              />
            </span>
            <div className="min-w-0">
              <h3 className="text-[17px] font-black leading-tight text-[#071747]">
                {item.title}
              </h3>
              <p className="mt-1 text-[14px] font-bold leading-snug text-[#4d5f7e]">
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </aside>
  )
}

function RecentChangesPanel() {
  return (
    <aside
      className="rounded-[22px] border border-[#dfe8f5] bg-white px-6 py-7 shadow-[0_18px_44px_rgba(47,86,145,0.08)]"
      aria-labelledby="recent-changes-title"
    >
      <div className="flex items-center justify-between gap-4">
        <h2
          id="recent-changes-title"
          className="text-[26px] font-black leading-tight text-[#071747]"
        >
          최근 변경 내역
        </h2>
        <Clock3
          aria-hidden="true"
          className="h-8 w-8 text-[#8695ad]"
          strokeWidth={2.4}
        />
      </div>

      <ol className="relative mt-5 grid gap-0">
        {recentChanges.map((change, index) => {
          const Icon = change.icon
          const stateClasses =
            change.state === 'active'
              ? 'bg-[#dff8ef] text-[#089268]'
              : change.state === 'info'
                ? 'bg-[#dceaff] text-[#0867f2]'
                : 'bg-[#eef1f5] text-[#737b88]'

          return (
            <li
              key={change.title}
              className="relative grid grid-cols-[64px_minmax(0,1fr)] gap-3 pb-6 last:pb-0"
            >
              {index < recentChanges.length - 1 ? (
                <span
                  className="absolute left-[31px] top-[60px] h-[calc(100%-60px)] w-px bg-[#d7e0ec]"
                  aria-hidden="true"
                />
              ) : null}
              <span
                className={cn(
                  'z-10 grid h-[58px] w-[58px] place-items-center rounded-full border border-white shadow-[0_8px_18px_rgba(47,86,145,0.09)]',
                  stateClasses,
                )}
              >
                <Icon
                  aria-hidden="true"
                  className="h-7 w-7"
                  strokeWidth={2.7}
                />
              </span>
              <div className="min-w-0 pt-1">
                <h3 className="break-keep text-[16px] font-black leading-snug text-[#071747]">
                  {change.title}
                </h3>
                <p className="mt-2 text-[14px] font-bold leading-tight text-[#65728b]">
                  {change.description}
                </p>
              </div>
            </li>
          )
        })}
      </ol>
    </aside>
  )
}

export function WorkerWelfareConnectPage() {
  return (
    <main className="min-h-svh overflow-x-hidden bg-[#f7fbff] text-[#071747]">
      <WelfareConnectTopBar />

      <div className="mx-auto grid w-full max-w-[1680px] gap-6 px-5 py-7 lg:px-10 xl:grid-cols-[minmax(0,1fr)_420px] xl:items-start">
        <div className="grid min-w-0 gap-4">
          <section
            className="px-1 pt-2"
            aria-labelledby="welfare-connect-title"
          >
            <h1
              id="welfare-connect-title"
              className="text-[38px] font-black leading-tight text-[#071747] lg:text-[46px]"
            >
              돌봄팀 관리
            </h1>
            <p className="mt-2 break-keep text-[17px] font-bold leading-snug text-[#253758] lg:text-[18px]">
              김영자 어르신에게 연결된 가족과 요양사를 관리하고 권한을
              설정하세요.
            </p>
          </section>

          <ConnectionHeroCard />
          <ConnectedFamiliesCard />
          <CaregiverAssignmentCard />
          <WorkerAssignmentCard />
          <PrimaryActions />
        </div>

        <div className="grid gap-5" aria-label="돌봄팀 권한과 변경 내역">
          <PermissionSummaryPanel />
          <RecentChangesPanel />
        </div>
      </div>
    </main>
  )
}
