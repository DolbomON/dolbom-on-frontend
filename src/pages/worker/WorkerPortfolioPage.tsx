import {
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  Circle,
  ClipboardList,
  FileBadge2,
  FileText,
  Home,
  MapPin,
  MessageCircle,
  Pencil,
  Plus,
  Settings,
  Star,
  UploadCloud,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { WorkerBottomNav } from '../../components/worker/WorkerBottomNav'
import { cn } from '../../lib/utils'

const portfolioAssetBase = '/assets/dolbomon/worker-portfolio'
const dashboardAssetBase = '/assets/dolbomon/worker-dashboard'
const elderAssetBase = '/assets/dolbomon/worker-elders'

type NavigationItem = {
  href: string
  label: string
}

type SidebarItem = NavigationItem & {
  active?: boolean
  icon: LucideIcon
}

type Specialty = {
  id: string
  label: string
}

type CareerItem = {
  duration: string
  period: string
  place: string
  title: string
}

type CertificateItem = {
  detail: string
  title: string
}

type CompletionItem = {
  complete: boolean
  label: string
}

type ActivityPhoto = {
  elderSrc: string
  label: string
  tone: string
}

const topNavigationItems: NavigationItem[] = [
  { href: '/worker', label: '홈' },
  { href: '/worker/alerts', label: '안부현황' },
  { href: '/worker/reports', label: '기록' },
  { href: '/worker#schedule', label: '일정' },
  { href: '/worker#family-memo', label: '가족메모' },
  { href: '/worker/mypage', label: '설정' },
]

const sidebarItems: SidebarItem[] = [
  { href: '/worker', icon: Home, label: '대시보드' },
  { href: '/worker/elders', icon: Users, label: '담당 어르신' },
  {
    active: true,
    href: '/worker/portfolio',
    icon: BriefcaseBusiness,
    label: '포트폴리오',
  },
  { href: '/worker#schedule', icon: CalendarDays, label: '일정 관리' },
  { href: '/worker/reports', icon: ClipboardList, label: '상담 및 기록' },
  { href: '/worker/community', icon: MessageCircle, label: '커뮤니티' },
  { href: '/worker/mypage', icon: Settings, label: '설정' },
]

const specialties: Specialty[] = [
  { id: 'dementia', label: '치매 케어' },
  { id: 'medication', label: '복약 관리' },
  { id: 'meal', label: '식사 보조' },
  { id: 'mobility', label: '이동 보조' },
  { id: 'emotion', label: '정서 지원' },
  { id: 'night', label: '야간 케어' },
]

const careerItems: CareerItem[] = [
  {
    duration: '3년 3개월',
    period: '2021.03 ~ 현재',
    place: '서울 강남구 / 개인 가정',
    title: '가정 방문 요양 서비스 제공',
  },
  {
    duration: '1년 8개월',
    period: '2019.06 ~ 2021.02',
    place: '사랑요양원 / 서울 서초구',
    title: '요양원 생활지원사',
  },
  {
    duration: '1년 8개월',
    period: '2017.09 ~ 2019.05',
    place: '행복재가센터 / 서울 송파구',
    title: '재가 요양보호사',
  },
]

const certificateItems: CertificateItem[] = [
  {
    detail: '취득일: 2018.03.15',
    title: '요양보호사 자격증',
  },
  {
    detail: '수료일: 2022.08.20',
    title: '치매전문교육 수료증',
  },
]

const activityPhotos: ActivityPhoto[] = [
  {
    elderSrc: `${elderAssetBase}/elder-kim-yeongja.png`,
    label: '김영자님과 식사 도움 활동',
    tone: 'from-[#f9d8c7] via-[#fff2df] to-[#d9ecff]',
  },
  {
    elderSrc: `${elderAssetBase}/elder-lee-sunja.png`,
    label: '이순자님과 복약 확인 활동',
    tone: 'from-[#f7cbd4] via-[#fff2e8] to-[#dbeafe]',
  },
  {
    elderSrc: `${elderAssetBase}/elder-park-cheolsu.png`,
    label: '박철수님과 산책 동행 활동',
    tone: 'from-[#d8f0da] via-[#fff7db] to-[#dff3ff]',
  },
]

const completionItems: CompletionItem[] = [
  { complete: true, label: '자기소개' },
  { complete: true, label: '전문 분야' },
  { complete: true, label: '주요 경력' },
  { complete: true, label: '자격 및 교육' },
  { complete: true, label: '활동 사진' },
  { complete: false, label: '대표 사례' },
]

function WorkerPortfolioTopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#e3eaf4] bg-white/95 shadow-[0_5px_20px_rgba(38,77,132,0.07)] backdrop-blur">
      <div className="mx-auto flex min-h-[70px] w-full max-w-[1600px] flex-wrap items-center gap-x-5 gap-y-2 px-5 py-3 lg:flex-nowrap lg:px-8">
        <Link
          to="/"
          className="inline-flex min-h-11 shrink-0 items-center text-[29px] font-black leading-none text-[#0867f2] drop-shadow-[0_4px_8px_rgba(8,103,242,0.14)] focus-visible:rounded-lg lg:text-[32px]"
          aria-label="돌봄ON 홈"
        >
          돌봄ON
        </Link>

        <nav
          className="order-last flex min-w-0 basis-full gap-2 overflow-x-auto text-[15px] font-black text-[#101a3d] lg:order-none lg:basis-auto lg:flex-1 lg:justify-center lg:gap-5"
          aria-label="요양사 상단 메뉴"
        >
          {topNavigationItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="inline-flex min-h-10 shrink-0 items-center rounded-lg px-2 transition hover:bg-[#f1f6ff] hover:text-[#0867f2] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            className="relative inline-grid min-h-11 min-w-11 place-items-center rounded-lg text-[#566783] transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
            aria-label="알림 2건 확인"
          >
            <Bell aria-hidden="true" size={28} strokeWidth={2.4} />
            <span className="absolute right-1 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#ef3d3d] px-1 text-[12px] font-black leading-none text-white ring-2 ring-white">
              2
            </span>
          </button>

          <Link
            to="/worker/portfolio"
            className="inline-flex min-h-12 items-center gap-3 rounded-lg px-1.5 py-1 transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
            aria-label="김영자님 요양사 프로필 보기"
          >
            <img
              src={`${elderAssetBase}/elder-kim-yeongja.png`}
              alt=""
              className="h-11 w-11 rounded-full object-cover shadow-[0_7px_16px_rgba(42,96,184,0.16)]"
              draggable="false"
            />
            <span className="hidden text-left sm:block">
              <strong className="block text-[15px] font-black leading-tight text-[#071747]">
                김영자님
              </strong>
              <span className="block text-[13px] font-bold leading-tight text-[#60708e]">
                요양사
              </span>
            </span>
            <ChevronDown
              aria-hidden="true"
              className="hidden h-4 w-4 text-[#4d5b76] sm:block"
              strokeWidth={2.8}
            />
          </Link>
        </div>
      </div>
    </header>
  )
}

function WorkerPortfolioSidebar() {
  return (
    <aside className="hidden w-[236px] shrink-0 border-r border-[#dfe7f2] bg-white/72 px-3 py-7 lg:block">
      <div className="flex items-center gap-3 border-b border-[#dde6f3] px-2 pb-5">
        <img
          src={`${elderAssetBase}/elder-kim-yeongja.png`}
          alt=""
          className="h-[58px] w-[58px] rounded-full object-cover shadow-[0_8px_18px_rgba(42,96,184,0.14)]"
          draggable="false"
        />
        <div className="min-w-0">
          <p className="truncate text-[16px] font-black leading-tight text-[#071747]">
            김영자님
          </p>
          <p className="mt-1 text-[14px] font-bold text-[#60708e]">요양사</p>
        </div>
      </div>

      <nav className="mt-4 grid gap-2" aria-label="요양사 좌측 메뉴">
        {sidebarItems.map((item) => {
          const Icon = item.icon

          return (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                'inline-flex min-h-[48px] items-center gap-3 rounded-lg px-4 text-[16px] font-black transition focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]',
                item.active
                  ? 'bg-[#eaf3ff] text-[#0867f2] shadow-[inset_0_0_0_1px_rgba(8,103,242,0.04)]'
                  : 'text-[#152245] hover:bg-[#f4f8ff] hover:text-[#0867f2]',
              )}
              aria-current={item.active ? 'page' : undefined}
            >
              <Icon
                aria-hidden="true"
                className={cn(
                  'h-8 w-8 shrink-0',
                  item.active ? 'text-[#0867f2]' : 'text-[#42577a]',
                )}
                strokeWidth={item.active ? 2.7 : 2.2}
              />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <section
        className="mt-[220px] rounded-[16px] border border-[#dce6f4] bg-white p-4 shadow-[0_12px_28px_rgba(42,96,184,0.08)]"
        aria-labelledby="portfolio-help-title"
      >
        <h2
          id="portfolio-help-title"
          className="text-[16px] font-black leading-tight text-[#071747]"
        >
          도움이 필요하신가요?
        </h2>
        <p className="mt-3 text-[13px] font-bold leading-snug text-[#667795]">
          돌봄ON 고객센터
          <br />
          평일 09:00 - 18:00
        </p>
        <div className="mt-4 flex items-end gap-2">
          <Link
            to="/worker/help"
            className="inline-flex min-h-10 flex-1 items-center justify-center rounded-lg border border-[#bcd4fb] bg-[#f8fbff] px-3 text-[14px] font-black text-[#0867f2] shadow-[0_6px_14px_rgba(47,86,145,0.06)] transition hover:bg-[#eef6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
          >
            1:1 문의하기
          </Link>
          <img
            src={`${portfolioAssetBase}/상담사.png`}
            alt=""
            className="h-[76px] w-[76px] shrink-0 object-contain"
            draggable="false"
          />
        </div>
      </section>
    </aside>
  )
}

function PortfolioSection({
  children,
  description,
  iconSrc,
  title,
}: {
  children: ReactNode
  description: string
  iconSrc: string
  title: string
}) {
  return (
    <section className="grid min-h-[112px] gap-4 rounded-[18px] border border-[#e1e9f5] bg-white px-4 py-4 shadow-[0_10px_26px_rgba(42,87,150,0.07)] md:grid-cols-[300px_minmax(0,1fr)] md:items-center xl:grid-cols-[315px_minmax(0,1fr)]">
      <div className="flex min-w-0 items-center gap-4">
        <img
          src={iconSrc}
          alt=""
          className="h-[76px] w-[76px] shrink-0 object-contain drop-shadow-[0_8px_12px_rgba(29,86,174,0.12)] md:h-[84px] md:w-[84px]"
          draggable="false"
        />
        <div className="min-w-0">
          <h2 className="text-[21px] font-black leading-tight text-[#071747]">
            {title}
          </h2>
          <p className="mt-3 text-[13px] font-bold leading-snug text-[#5d6e8d]">
            {description}
          </p>
        </div>
      </div>

      <div className="min-w-0">{children}</div>
    </section>
  )
}

function SpecialtyButton({
  isSelected,
  label,
  onToggle,
}: {
  isSelected: boolean
  label: string
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex min-h-11 items-center gap-2 rounded-lg border px-3 text-[14px] font-black shadow-[0_7px_14px_rgba(47,86,145,0.05)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]',
        isSelected
          ? 'border-[#8bbdff] bg-[#f3f8ff] text-[#0867f2]'
          : 'border-[#dce5f1] bg-white text-[#53627f] hover:border-[#bcd3fa]',
      )}
      aria-pressed={isSelected}
      onClick={onToggle}
    >
      <span
        className={cn(
          'inline-grid h-6 w-6 shrink-0 place-items-center rounded-full border',
          isSelected
            ? 'border-[#0867f2] bg-[#0867f2] text-white'
            : 'border-[#c8d3e4] bg-white text-transparent',
        )}
        aria-hidden="true"
      >
        <Check className="h-4 w-4" strokeWidth={3.2} />
      </span>
      {label}
    </button>
  )
}

function CareerTimeline() {
  return (
    <ol className="relative grid gap-4 pl-6 before:absolute before:bottom-1 before:left-[8px] before:top-1 before:w-px before:bg-[#aebbd1]">
      {careerItems.map((item) => (
        <li
          key={`${item.period}-${item.title}`}
          className="relative grid gap-2 md:grid-cols-[120px_minmax(0,1fr)_88px] md:items-start"
        >
          <span
            className="absolute -left-[23px] top-1.5 h-[11px] w-[11px] rounded-full bg-[#0867f2] ring-4 ring-[#e6f1ff]"
            aria-hidden="true"
          />
          <time className="text-[13px] font-bold leading-tight text-[#637491]">
            {item.period}
          </time>
          <div className="min-w-0">
            <p className="text-[14px] font-black leading-tight text-[#071747]">
              {item.title}
            </p>
            <p className="mt-1 text-[13px] font-bold leading-tight text-[#657491]">
              {item.place}
            </p>
          </div>
          <span className="text-left text-[13px] font-black leading-tight text-[#485a7a] md:text-right">
            {item.duration}
          </span>
        </li>
      ))}
    </ol>
  )
}

function AddButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="inline-flex min-h-9 items-center justify-center gap-1 rounded-lg border border-[#bed6fb] bg-white px-3 text-[14px] font-black text-[#0867f2] shadow-[0_7px_14px_rgba(47,86,145,0.08)] transition hover:bg-[#f4f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
    >
      <Plus aria-hidden="true" className="h-4 w-4" strokeWidth={3} />
      {children}
    </button>
  )
}

function CertificateCard({ certificate }: { certificate: CertificateItem }) {
  return (
    <article className="flex min-h-[88px] items-center gap-3 rounded-[12px] border border-[#dde6f2] bg-white px-3 py-3 shadow-[0_7px_18px_rgba(47,86,145,0.05)]">
      <span className="inline-grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-[#cfd9e8] bg-[#f7fbff] text-[#60708e] shadow-[0_5px_12px_rgba(47,86,145,0.06)]">
        <FileBadge2 aria-hidden="true" className="h-6 w-6" strokeWidth={2.1} />
      </span>
      <div className="min-w-0">
        <h3 className="truncate text-[14px] font-black leading-tight text-[#071747]">
          {certificate.title}
        </h3>
        <p className="mt-1 truncate text-[12px] font-bold leading-tight text-[#657491]">
          {certificate.detail}
        </p>
        <button
          type="button"
          className="mt-2 inline-flex min-h-7 items-center gap-1 rounded-lg border border-[#c7dcff] bg-[#f8fbff] px-2 text-[12px] font-black text-[#0867f2] transition hover:bg-[#eef6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          <FileText aria-hidden="true" className="h-3.5 w-3.5" />
          파일 보기
        </button>
      </div>
    </article>
  )
}

function UploadTile({ label, subLabel }: { label: string; subLabel: string }) {
  return (
    <button
      type="button"
      className="grid min-h-[88px] place-items-center rounded-[12px] border border-dashed border-[#b7c8e0] bg-[#fbfdff] px-3 py-3 text-center transition hover:border-[#0867f2] hover:bg-[#f4f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
    >
      <span className="inline-grid h-10 w-10 place-items-center rounded-full bg-white text-[#0867f2] shadow-[0_6px_14px_rgba(47,86,145,0.14)]">
        <UploadCloud aria-hidden="true" className="h-6 w-6" strokeWidth={2.4} />
      </span>
      <span className="mt-1 block text-[14px] font-black leading-tight text-[#0867f2]">
        {label}
      </span>
      <span className="block text-[11px] font-bold leading-tight text-[#667795]">
        {subLabel}
      </span>
    </button>
  )
}

function ActivityPhotoCard({ photo }: { photo: ActivityPhoto }) {
  return (
    <figure
      className={cn(
        'relative h-[90px] overflow-hidden rounded-[12px] border border-[#dfe7f3] bg-gradient-to-br shadow-[0_8px_18px_rgba(47,86,145,0.08)]',
        photo.tone,
      )}
      role="img"
      aria-label={photo.label}
    >
      <span
        className="absolute bottom-0 left-1/2 h-5 w-[74%] -translate-x-1/2 rounded-t-full bg-white/55"
        aria-hidden="true"
      />
      <span
        className="absolute bottom-[18px] left-[18%] h-3 w-[64%] rounded-full bg-[#f6d0aa]/70"
        aria-hidden="true"
      />
      <img
        src={`${dashboardAssetBase}/요양사.png`}
        alt=""
        className="absolute bottom-2 left-[8%] h-[76px] w-[76px] rounded-full object-cover shadow-[0_6px_16px_rgba(42,96,184,0.16)]"
        draggable="false"
      />
      <img
        src={photo.elderSrc}
        alt=""
        className="absolute bottom-2 right-[8%] h-[78px] w-[78px] rounded-full object-cover shadow-[0_6px_16px_rgba(42,96,184,0.16)]"
        draggable="false"
      />
    </figure>
  )
}

function ProfileSummaryCard() {
  return (
    <section className="rounded-[18px] border border-[#dde6f2] bg-white px-4 py-5 text-center shadow-[0_12px_28px_rgba(42,87,150,0.08)]">
      <div className="relative mx-auto h-[122px] w-[122px]">
        <img
          src={`${elderAssetBase}/elder-kim-yeongja.png`}
          alt=""
          className="h-full w-full rounded-full object-cover shadow-[0_10px_22px_rgba(42,96,184,0.16)]"
          draggable="false"
        />
        <button
          type="button"
          className="absolute bottom-1 right-0 inline-grid h-9 w-9 place-items-center rounded-full bg-white text-[#0867f2] shadow-[0_7px_16px_rgba(42,96,184,0.18)] transition hover:bg-[#f1f7ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
          aria-label="프로필 사진 수정"
        >
          <Pencil aria-hidden="true" className="h-4 w-4" strokeWidth={2.7} />
        </button>
      </div>

      <h2 className="mt-4 text-[22px] font-black leading-tight text-[#071747]">
        김영자님
      </h2>
      <p className="mt-2 flex items-center justify-center gap-1 text-[15px] font-black text-[#1f2a46]">
        <Star
          aria-hidden="true"
          className="h-5 w-5 fill-[#f7a800] text-[#f7a800]"
        />
        4.9
        <span className="font-bold text-[#596a88]">(후기 48개)</span>
      </p>

      <div className="mt-5 border-t border-[#e4ebf5] pt-4 text-left">
        <p className="flex items-center gap-2 text-[13px] font-black text-[#667795]">
          <MapPin aria-hidden="true" className="h-5 w-5 text-[#0867f2]" />
          활동 지역
        </p>
        <p className="mt-2 text-[14px] font-black leading-snug text-[#263555]">
          서울 강남구, 서초구, 송파구
        </p>
      </div>
    </section>
  )
}

function CompletionPanel() {
  return (
    <section className="rounded-[18px] border border-[#dde6f2] bg-white px-4 py-5 shadow-[0_12px_28px_rgba(42,87,150,0.08)]">
      <h2 className="text-[16px] font-black leading-tight text-[#071747]">
        완성도
      </h2>

      <div className="mt-5 flex items-center gap-4">
        <div
          className="grid h-[72px] w-[72px] shrink-0 place-items-center rounded-full bg-[conic-gradient(#0867f2_0_78%,#e3ecf8_78%_100%)]"
          aria-label="포트폴리오 완성도 78퍼센트"
          role="img"
        >
          <div className="grid h-[54px] w-[54px] place-items-center rounded-full bg-white">
            <span className="text-[20px] font-black leading-none text-[#0867f2]">
              78%
            </span>
          </div>
        </div>
        <div className="min-w-0">
          <p className="text-[15px] font-black leading-tight text-[#071747]">
            포트폴리오 완성도
          </p>
          <p className="mt-2 text-[12px] font-bold leading-snug text-[#62718e]">
            모든 항목을 작성하면 더 많은 신뢰를 얻을 수 있어요.
          </p>
        </div>
      </div>

      <div className="mt-5 border-t border-[#e4ebf5] pt-4">
        <h3 className="text-[13px] font-black leading-tight text-[#263555]">
          항목별 작성 현황
        </h3>
        <ul className="mt-3 grid gap-3">
          {completionItems.map((item) => (
            <li
              key={item.label}
              className="flex items-center justify-between gap-3 text-[13px] font-bold text-[#435273]"
            >
              <span>{item.label}</span>
              {item.complete ? (
                <CheckCircle2
                  aria-label="완료"
                  className="h-5 w-5 shrink-0 fill-[#38b352] text-white"
                  strokeWidth={2.8}
                />
              ) : (
                <Circle
                  aria-label="미완료"
                  className="h-5 w-5 shrink-0 text-[#0867f2]"
                  strokeWidth={2}
                />
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-[14px] border border-[#dde6f2] bg-[#fbfdff] p-4">
        <p className="text-[14px] font-black leading-tight text-[#0867f2]">
          TIP
        </p>
        <p className="mt-2 text-[12px] font-bold leading-relaxed text-[#64738f]">
          포트폴리오를 자세히 작성할수록 더 많은 신뢰와 후기가 선생님을 선택할
          확률이 높아져요.
        </p>
        <img
          src={`${portfolioAssetBase}/체크완성.png`}
          alt=""
          className="mx-auto mt-2 h-[106px] w-[106px] object-contain"
          draggable="false"
        />
      </div>
    </section>
  )
}

function CaseCard({
  description,
  label,
  title,
}: {
  description: string
  label: string
  title: string
}) {
  return (
    <article className="min-h-[84px] rounded-[12px] border border-[#dfe7f3] bg-white px-4 py-3 shadow-[0_7px_18px_rgba(47,86,145,0.05)]">
      <span className="inline-flex rounded-full bg-[#eaf3ff] px-3 py-1 text-[12px] font-black leading-tight text-[#0867f2]">
        {label}
      </span>
      <h3 className="mt-2 text-[14px] font-black leading-snug text-[#071747]">
        {title}
      </h3>
      <p className="mt-2 text-[12px] font-bold leading-snug text-[#60708e]">
        {description}
      </p>
    </article>
  )
}

export function WorkerPortfolioPage() {
  const [selfIntro, setSelfIntro] = useState('')
  const [saveMessage, setSaveMessage] = useState('')
  const [selectedSpecialties, setSelectedSpecialties] = useState(
    () => new Set(['dementia', 'medication', 'meal']),
  )

  const toggleSpecialty = (specialtyId: string) => {
    setSelectedSpecialties((current) => {
      const next = new Set(current)

      if (next.has(specialtyId)) {
        next.delete(specialtyId)
      } else {
        next.add(specialtyId)
      }

      return next
    })
  }

  const savePortfolio = () => {
    setSaveMessage('포트폴리오가 저장되었습니다.')
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#f8fbff] text-[#071747]">
      <WorkerPortfolioTopBar />

      <div className="mx-auto flex w-full max-w-[1600px]">
        <WorkerPortfolioSidebar />

        <div className="min-w-0 flex-1 px-4 pb-[calc(106px+env(safe-area-inset-bottom))] pt-5 sm:px-5 lg:px-9 lg:pb-10">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_260px] xl:items-start">
            <div className="min-w-0">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <section aria-labelledby="worker-portfolio-title">
                  <Link
                    to="/worker/mypage"
                    className="inline-flex min-h-9 items-center gap-1 rounded-lg text-[14px] font-black text-[#0867f2] transition hover:bg-[#edf6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
                  >
                    <ChevronLeft
                      aria-hidden="true"
                      className="h-5 w-5"
                      strokeWidth={2.8}
                    />
                    포트폴리오 목록으로
                  </Link>
                  <h1
                    id="worker-portfolio-title"
                    className="mt-2 text-[30px] font-black leading-tight text-[#071747] sm:text-[34px]"
                  >
                    포트폴리오 등록
                  </h1>
                  <p className="mt-2 text-[15px] font-bold leading-snug text-[#51617f] sm:text-[16px]">
                    어르신과 가족이 나를 더 잘 이해할 수 있도록 포트폴리오를
                    작성해보세요.
                  </p>
                </section>

                <button
                  type="button"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#0867f2] px-7 text-[16px] font-black text-white shadow-[0_12px_24px_rgba(8,103,242,0.28)] transition hover:bg-[#075fe0] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
                  onClick={savePortfolio}
                >
                  포트폴리오 저장
                </button>
              </div>

              <div className="mt-5 grid gap-3">
                <PortfolioSection
                  description="간단한 소개와 돌봄에 대한 소신을 작성해주세요."
                  iconSrc={`${portfolioAssetBase}/체크.png`}
                  title="1. 자기소개"
                >
                  <div className="relative">
                    <label htmlFor="portfolio-intro" className="sr-only">
                      자기소개
                    </label>
                    <textarea
                      id="portfolio-intro"
                      maxLength={500}
                      value={selfIntro}
                      onChange={(event) => setSelfIntro(event.target.value)}
                      placeholder="자기소개를 입력해주세요. (최대 500자)"
                      className="min-h-[78px] w-full resize-none rounded-[12px] border border-[#ccd8ea] bg-white px-4 py-3 pr-20 text-[14px] font-bold leading-snug text-[#071747] placeholder:text-[#7a89a5] focus:border-[#0867f2] focus:outline focus:outline-4 focus:outline-[#d7e8ff]"
                    />
                    <span className="absolute bottom-3 right-4 text-[12px] font-black text-[#6a7894]">
                      {selfIntro.length} / 500
                    </span>
                  </div>
                </PortfolioSection>

                <PortfolioSection
                  description="주요 돌봄 분야를 선택해주세요."
                  iconSrc={`${portfolioAssetBase}/마음.png`}
                  title="2. 전문 분야"
                >
                  <div
                    className="flex flex-wrap gap-3"
                    aria-label="전문 분야 선택"
                    role="group"
                  >
                    {specialties.map((specialty) => (
                      <SpecialtyButton
                        key={specialty.id}
                        isSelected={selectedSpecialties.has(specialty.id)}
                        label={specialty.label}
                        onToggle={() => toggleSpecialty(specialty.id)}
                      />
                    ))}
                  </div>
                </PortfolioSection>

                <PortfolioSection
                  description="지금까지의 경력을 입력해주세요."
                  iconSrc={`${portfolioAssetBase}/가방.png`}
                  title="3. 주요 경력"
                >
                  <div>
                    <div className="mb-3 flex justify-end">
                      <AddButton>경력 추가</AddButton>
                    </div>
                    <CareerTimeline />
                  </div>
                </PortfolioSection>

                <PortfolioSection
                  description="보유 자격증과 교육 이수를 등록해주세요."
                  iconSrc={`${portfolioAssetBase}/자격.png`}
                  title="4. 자격 및 교육"
                >
                  <div>
                    <div className="mb-3 flex justify-end">
                      <AddButton>자격/교육 추가</AddButton>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[repeat(3,minmax(0,1fr))]">
                      {certificateItems.map((certificate) => (
                        <CertificateCard
                          key={certificate.title}
                          certificate={certificate}
                        />
                      ))}
                      <UploadTile
                        label="파일 업로드"
                        subLabel="JPG, PNG, PDF (최대 10MB)"
                      />
                    </div>
                  </div>
                </PortfolioSection>

                <PortfolioSection
                  description="돌봄 활동 중의 모습을 공유해주세요."
                  iconSrc={`${portfolioAssetBase}/이미지.png`}
                  title="5. 활동 사진"
                >
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[repeat(4,minmax(0,1fr))]">
                    {activityPhotos.map((photo) => (
                      <ActivityPhotoCard key={photo.label} photo={photo} />
                    ))}
                    <UploadTile
                      label="사진 추가"
                      subLabel="JPG, PNG (최대 10MB)"
                    />
                  </div>
                </PortfolioSection>

                <PortfolioSection
                  description="기억에 남는 돌봄 사례를 소개해주세요."
                  iconSrc={`${portfolioAssetBase}/대화.png`}
                  title="6. 대표 사례"
                >
                  <div>
                    <div className="mb-3 flex justify-end">
                      <button
                        type="button"
                        className="inline-flex min-h-9 items-center justify-center rounded-lg border border-[#bed6fb] bg-white px-3 text-[14px] font-black text-[#0867f2] shadow-[0_7px_14px_rgba(47,86,145,0.08)] transition hover:bg-[#f4f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
                      >
                        상세 작성
                      </button>
                    </div>
                    <div className="grid items-center gap-3 md:grid-cols-[minmax(0,1fr)_32px_minmax(0,1fr)]">
                      <CaseCard
                        description="식사 거부와 약 복용 누락으로 건강 상태가 불안정했어요."
                        label="Before"
                        title="식사량이 적고 약 복용을 자주 잊으심"
                      />
                      <span className="hidden text-center text-[28px] font-black text-[#385681] md:block">
                        →
                      </span>
                      <CaseCard
                        description="식사량이 늘고 약 복용을 스스로 챙기시며 활력이 좋아졌어요."
                        label="After"
                        title="규칙적인 식사와 복약 습관 형성"
                      />
                    </div>
                  </div>
                </PortfolioSection>
              </div>
            </div>

            <aside className="grid gap-4 xl:sticky xl:top-[94px]">
              <ProfileSummaryCard />
              <CompletionPanel />
            </aside>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <WorkerBottomNav />
      </div>

      <p className="sr-only" aria-live="polite">
        {saveMessage}
      </p>
    </main>
  )
}
