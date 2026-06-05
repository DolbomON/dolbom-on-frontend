import { Bell, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

type WorkerTopBarItem = {
  href: string
  label: string
}

type WorkerTopBarProps = {
  activeHref: string
  ariaLabel?: string
}

const workerProfileSrc = '/assets/dolbomon/worker-mypage/worker-lee-bokji.png'

const workerTopBarItems: WorkerTopBarItem[] = [
  { href: '/worker', label: '홈' },
  { href: '/worker/welfare-connect', label: '복지 현황' },
  { href: '/worker/consultations', label: '상담 관리' },
  { href: '/worker/reports', label: '보고서' },
  { href: '/worker/schedules', label: '기관 일정' },
]

export function WorkerTopBar({
  activeHref,
  ariaLabel = '복지사 메뉴',
}: WorkerTopBarProps) {
  const notificationClassName =
    'relative inline-grid min-h-11 min-w-11 place-items-center rounded-lg text-[#3c4b67]'

  const notificationContent = (
    <>
      <Bell aria-hidden="true" size={29} strokeWidth={2.4} />
      <span className="absolute right-1 top-0 grid h-[22px] min-w-[22px] place-items-center rounded-full bg-[#ff3648] px-1 text-[12px] font-black leading-none text-white ring-2 ring-white">
        3
      </span>
    </>
  )

  return (
    <header className="sticky top-0 z-30 overflow-x-hidden border-b border-[#dfe8f5] bg-white/96 shadow-[0_5px_18px_rgba(30,66,118,0.05)] backdrop-blur">
      <div className="mx-auto grid min-h-[72px] w-full max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 px-5 py-1 lg:grid-cols-[210px_minmax(0,1fr)_auto] lg:px-8">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center text-[30px] font-black leading-none text-[#0867f2] drop-shadow-[0_5px_10px_rgba(8,103,242,0.12)] focus-visible:rounded-lg"
          aria-label="돌봄ON 홈"
        >
          돌봄ON
        </Link>

        <nav
          className="col-span-2 row-start-2 flex min-w-0 flex-wrap gap-x-3 gap-y-1 overflow-visible pb-2 text-[15px] font-black leading-none text-[#071747] lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:flex-nowrap lg:justify-self-center lg:gap-8 lg:pb-0"
          aria-label={ariaLabel}
        >
          {workerTopBarItems.map((item) => {
            const isActive = item.href === activeHref

            return (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  'relative inline-flex min-h-11 shrink-0 items-center justify-center px-2 transition hover:text-[#0867f2] focus-visible:rounded-lg',
                  isActive ? 'text-[#0867f2]' : 'text-[#071747]',
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
                {isActive ? (
                  <span
                    className="absolute bottom-[-8px] left-0 right-0 h-1 rounded-full bg-[#0867f2] lg:bottom-[-15px]"
                    aria-hidden="true"
                  />
                ) : null}
              </Link>
            )
          })}
        </nav>

        <div className="col-start-2 row-start-1 flex items-center gap-3 justify-self-end lg:col-start-3">
          <div
            className={notificationClassName}
            role="img"
            aria-label="알림 3건"
          >
            {notificationContent}
          </div>

          <div
            className="hidden min-h-11 items-center gap-3 rounded-lg py-1 pl-1 pr-2 min-[560px]:inline-flex"
            aria-label="이수진 복지사"
            role="group"
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
          </div>
        </div>
      </div>
    </header>
  )
}
