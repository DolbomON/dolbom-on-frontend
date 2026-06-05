import { Bell, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useI18n } from '../../lib/i18n/useI18n'
import type { TranslationKey } from '../../lib/i18n/translations'
import { cn } from '../../lib/utils'
import { DolbomLogo } from '../layout/DolbomLogo'

type WorkerTopBarItem = {
  href: string
  labelKey: TranslationKey
}

type WorkerTopBarProps = {
  activeHref: string
  ariaLabel?: string
}

const workerProfileSrc = '/assets/dolbomon/worker-mypage/worker-lee-bokji.png'

const workerTopBarItems: WorkerTopBarItem[] = [
  { href: '/worker', labelKey: 'worker.nav.home' },
  {
    href: '/worker/elders/kim-yeongja/care-team',
    labelKey: 'worker.nav.welfare',
  },
  { href: '/worker/consultations', labelKey: 'worker.nav.consultations' },
  { href: '/worker/reports', labelKey: 'worker.nav.reports' },
  { href: '/worker/schedules', labelKey: 'worker.nav.schedules' },
]

export function WorkerTopBar({ activeHref, ariaLabel }: WorkerTopBarProps) {
  const { t } = useI18n()
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
        <DolbomLogo />

        <nav
          className="col-span-2 row-start-2 flex min-w-0 flex-wrap gap-x-3 gap-y-1 overflow-visible pb-2 text-[15px] font-black leading-none text-[#071747] lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:flex-nowrap lg:justify-self-center lg:gap-8 lg:pb-0"
          aria-label={ariaLabel ?? t('worker.nav.aria')}
        >
          {workerTopBarItems.map((item) => {
            const isActive = item.href === activeHref

            return (
              <Link
                key={item.labelKey}
                to={item.href}
                className={cn(
                  'relative inline-flex min-h-11 shrink-0 items-center justify-center px-2 transition hover:text-[#0867f2] focus-visible:rounded-lg',
                  isActive ? 'text-[#0867f2]' : 'text-[#071747]',
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {t(item.labelKey)}
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
            aria-label={t('worker.nav.notificationAria')}
          >
            {notificationContent}
          </div>

          <Link
            to="/worker/mypage"
            className="hidden min-h-11 items-center gap-3 rounded-lg py-1 pl-1 pr-2 transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff] min-[560px]:inline-flex"
            aria-label={t('worker.nav.profileAria')}
          >
            <img
              src={workerProfileSrc}
              alt=""
              className="h-11 w-11 rounded-full bg-[#eaf4ff] object-cover shadow-[0_7px_15px_rgba(42,96,184,0.16)]"
              draggable="false"
            />
            <span className="hidden whitespace-nowrap text-[14px] font-black leading-tight text-[#071747] sm:block">
              {t('worker.nav.profileName')}
            </span>
            <ChevronDown
              aria-hidden="true"
              className="hidden h-4 w-4 text-[#33415f] sm:block"
              strokeWidth={2.8}
            />
          </Link>
        </div>
      </div>
    </header>
  )
}
