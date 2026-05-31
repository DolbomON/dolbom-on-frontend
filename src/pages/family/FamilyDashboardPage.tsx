import {
  BarChart3,
  Bell,
  ChevronRight,
  Home,
  Menu,
  MessageCircle,
  Power,
  type LucideIcon,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { cn } from '../../lib/utils'

const familyAssetBase = '/assets/dolbomon/familly'

const familyHeroImageSrc = `${familyAssetBase}/가족.png`
const checklistImageSrc = `${familyAssetBase}/체크.png`
const phoneImageSrc = `${familyAssetBase}/전화.png`
const aiImageSrc = `${familyAssetBase}/ai.png`
const documentImageSrc = `${familyAssetBase}/문서.png`
const penImageSrc = `${familyAssetBase}/펜.png`

type MainAction = {
  description: string
  href: string
  imageSrc: string
  title: string
}

type QuickAction = {
  href: string
  imageSrc: string
  title: string
}

type BottomNavItem = {
  active?: boolean
  href: string
  icon: LucideIcon
  label: string
  notice?: boolean
}

const todayLabel = '5월 31일 토요일'

const mainActions: MainAction[] = [
  {
    description: '5개 항목 요약 보기',
    href: '/family/status',
    imageSrc: checklistImageSrc,
    title: '오늘 상태 확인',
  },
  {
    description: '가족 바로 연락',
    href: 'tel:010-0000-0000',
    imageSrc: phoneImageSrc,
    title: '전화 연결',
  },
  {
    description: '대화 내용 확인',
    href: '/family/chat',
    imageSrc: aiImageSrc,
    title: 'AI 안부 요약',
  },
]

const quickActions: QuickAction[] = [
  {
    href: '#today-record',
    imageSrc: documentImageSrc,
    title: '오늘 기록 보기',
  },
  {
    href: '#family-memo',
    imageSrc: penImageSrc,
    title: '가족 메모 남기기',
  },
]

const bottomNavItems: BottomNavItem[] = [
  {
    active: true,
    href: '/family',
    icon: Home,
    label: '홈',
  },
  {
    href: '/family/status',
    icon: BarChart3,
    label: '안부현황',
  },
  {
    href: '/family/alerts',
    icon: Bell,
    label: '알림',
    notice: true,
  },
  {
    href: '/family/chat',
    icon: MessageCircle,
    label: '대화',
  },
]

const statusItems = ['식사', '복약', '통증', '기분', '수면']

export function FamilyDashboardPage() {
  const navigate = useNavigate()

  function handleMenuClick() {
    navigate('/select-role')
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#eef6ff] text-[#071747]">
      <section
        className="mx-auto flex min-h-svh w-full max-w-[480px] flex-col bg-white px-5 pb-[max(18px,env(safe-area-inset-bottom))] pt-[max(18px,env(safe-area-inset-top))] shadow-[0_24px_80px_rgba(55,104,184,0.1)] min-[390px]:px-6 min-[430px]:px-7"
        aria-label="가족 안부 홈"
      >
        <header className="flex items-start justify-between gap-4">
          <Link
            to="/family"
            className="inline-flex min-h-11 items-center rounded-md text-[#0a63ef] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
            aria-label="돌봄ON 가족 홈"
          >
            <span className="text-[26px] font-black leading-none min-[390px]:text-[30px]">
              돌봄
            </span>
            <Power
              aria-hidden="true"
              className="-ml-0.5 h-[28px] w-[28px] min-[390px]:h-[32px] min-[390px]:w-[32px]"
              strokeWidth={4}
            />
            <span className="-ml-0.5 text-[30px] font-black leading-none min-[390px]:text-[34px]">
              N
            </span>
          </Link>

          <div className="flex items-center gap-5 text-[#071747] min-[390px]:gap-6">
            <Link
              to="/family/alerts"
              className="relative inline-grid h-11 w-11 place-items-center rounded-md text-[#0a63ef] transition active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
              aria-label="알림 열기"
            >
              <Bell aria-hidden="true" size={32} strokeWidth={2.7} />
            </Link>
            <button
              className="inline-grid h-11 w-11 place-items-center rounded-md text-[#071747] transition active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
              type="button"
              aria-label="메뉴 열기"
              onClick={handleMenuClick}
            >
              <Menu aria-hidden="true" size={38} strokeWidth={2.6} />
            </button>
          </div>
        </header>

        <section
          className="pt-7 min-[390px]:pt-8"
          aria-labelledby="family-title"
        >
          <p className="text-[20px] font-bold leading-none text-[#55657d] min-[390px]:text-[23px]">
            {todayLabel}
          </p>
          <h1
            id="family-title"
            className="mt-5 text-[36px] font-black leading-none text-[#071747] min-[390px]:text-[42px]"
          >
            가족 안부 홈
          </h1>
          <p className="mt-4 text-[18px] font-semibold leading-snug text-[#58687e] min-[390px]:text-[20px]">
            부모님의 오늘 상태를 한눈에 확인해보세요.
          </p>
        </section>

        <section
          id="today-status"
          className="relative mt-7 min-h-[226px] overflow-hidden rounded-[24px] border border-[#cfe0fa] bg-[linear-gradient(135deg,#fbfdff_0%,#eff7ff_52%,#f8fbff_100%)] px-6 py-7 shadow-[0_18px_36px_rgba(51,101,177,0.16)] min-[390px]:min-h-[250px] min-[390px]:rounded-[27px] min-[390px]:px-8 min-[390px]:py-8"
          aria-labelledby="today-status-title"
        >
          <div className="relative z-10 max-w-[72%]">
            <p className="text-[22px] font-black leading-tight text-[#0a63ef] min-[390px]:text-[26px]">
              김영자 어르신
            </p>
            <h2
              id="today-status-title"
              className="mt-5 whitespace-nowrap text-[30px] font-black leading-[1.18] text-[#071747] min-[390px]:text-[36px]"
            >
              오늘은 비교적
              <br />
              안정적이에요
            </h2>

            <div className="mt-6" aria-label="오늘 상태 항목 요약">
              <p className="whitespace-nowrap text-[13px] font-semibold leading-none text-[#42506a] min-[360px]:text-[14px] min-[390px]:text-[16px]">
                {statusItems.map((item, index) => (
                  <span key={item}>
                    {index > 0 ? <span aria-hidden="true"> · </span> : null}
                    {item}
                  </span>
                ))}
              </p>
              <div
                className="mt-5 flex items-center gap-4 min-[390px]:gap-[18px]"
                aria-hidden="true"
              >
                {statusItems.map((item, index) => (
                  <span
                    key={item}
                    className={cn(
                      'h-8 w-8 rounded-full shadow-[0_7px_12px_rgba(4,93,226,0.24)] min-[390px]:h-9 min-[390px]:w-9',
                      index === statusItems.length - 1
                        ? 'bg-[#d6d8dc] shadow-[0_7px_12px_rgba(82,91,108,0.12)]'
                        : 'bg-[linear-gradient(135deg,#2f85ff_0%,#0b5bf0_100%)]',
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          <img
            src={familyHeroImageSrc}
            alt=""
            width="1024"
            height="1024"
            className="pointer-events-none absolute bottom-3 right-[-12px] z-0 w-[49%] max-w-none select-none object-contain min-[390px]:right-[-8px] min-[390px]:w-[48%]"
            aria-hidden="true"
            draggable="false"
          />
        </section>

        <section
          className="mt-8 grid grid-cols-3 gap-3 min-[390px]:gap-4"
          aria-label="가족 주요 메뉴"
        >
          {mainActions.map((action) => (
            <Link
              key={action.title}
              to={action.href}
              className="flex min-h-[160px] flex-col items-center rounded-[19px] border border-[#dce5f1] bg-white px-2 pb-5 pt-4 text-center shadow-[0_13px_26px_rgba(34,65,111,0.11)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[176px] min-[390px]:rounded-[22px]"
            >
              <img
                src={action.imageSrc}
                alt=""
                width="1024"
                height="1024"
                className="h-[62px] w-[62px] shrink-0 object-contain min-[390px]:h-[76px] min-[390px]:w-[76px]"
                aria-hidden="true"
                draggable="false"
              />
              <strong className="mt-3 break-keep text-[17px] font-black leading-tight text-[#071747] min-[390px]:text-[20px]">
                {action.title}
              </strong>
              <span className="mt-2 break-keep text-[13px] font-semibold leading-tight text-[#56677f] min-[390px]:text-[15px]">
                {action.description}
              </span>
              <span
                className="mt-auto grid h-8 w-8 place-items-center rounded-full bg-[#f4f9ff] text-[#0a63ef] shadow-[0_5px_12px_rgba(30,73,133,0.13)] min-[390px]:h-9 min-[390px]:w-9"
                aria-hidden="true"
              >
                <ChevronRight size={22} strokeWidth={3} />
              </span>
            </Link>
          ))}
        </section>

        <section className="mt-8" aria-labelledby="quick-check-title">
          <h2
            id="quick-check-title"
            className="text-[22px] font-black leading-none text-[#071747] min-[390px]:text-[24px]"
          >
            빠른 확인
          </h2>

          <div className="mt-4 grid grid-cols-2 gap-3 min-[390px]:gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                to={action.href}
                className="flex min-h-[72px] items-center gap-1.5 rounded-[17px] border border-[#cfe0fa] bg-[#f6fbff] px-2.5 py-3 shadow-[0_12px_22px_rgba(44,98,170,0.09)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[78px] min-[390px]:gap-2 min-[390px]:rounded-[20px] min-[390px]:px-3"
              >
                <img
                  src={action.imageSrc}
                  alt=""
                  width="1024"
                  height="1024"
                  className="h-10 w-10 shrink-0 rounded-[13px] object-contain shadow-[0_7px_13px_rgba(18,93,203,0.2)] min-[390px]:h-11 min-[390px]:w-11"
                  aria-hidden="true"
                  draggable="false"
                />
                <strong className="min-w-0 flex-1 break-keep text-[12px] font-black leading-tight text-[#071747] min-[390px]:text-[13px]">
                  {action.title}
                </strong>
                <span
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-[#0a63ef] shadow-[0_5px_12px_rgba(30,73,133,0.13)] min-[430px]:h-8 min-[430px]:w-8"
                  aria-hidden="true"
                >
                  <ChevronRight size={19} strokeWidth={3} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <nav
          className="mt-7 grid h-[72px] w-full grid-cols-4 rounded-[24px] border border-[#dfe7f2] bg-white shadow-[0_12px_34px_rgba(39,78,136,0.14)]"
          aria-label="가족 하단 메뉴"
        >
          {bottomNavItems.map((item) => {
            const Icon = item.icon

            return (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  'relative flex min-h-[70px] flex-col items-center justify-center gap-1 rounded-[20px] text-[13px] font-extrabold leading-tight transition focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-[-2px] focus-visible:outline-[#8bbcff]',
                  item.active ? 'text-[#0a63ef]' : 'text-[#68758a]',
                )}
                aria-current={item.active ? 'page' : undefined}
              >
                <span className="relative">
                  <Icon
                    aria-hidden="true"
                    className="h-8 w-8"
                    strokeWidth={item.active ? 3 : 2.5}
                  />
                  {item.notice ? (
                    <span
                      className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-[#ff4257]"
                      aria-hidden="true"
                    />
                  ) : null}
                </span>
                <span>{item.label}</span>
                {item.active ? (
                  <span
                    className="absolute bottom-1.5 h-1 w-4 rounded-full bg-[#0a63ef]"
                    aria-hidden="true"
                  />
                ) : null}
              </Link>
            )
          })}
        </nav>
      </section>
    </main>
  )
}
