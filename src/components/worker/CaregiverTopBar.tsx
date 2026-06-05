import { Bell, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useI18n } from '../../lib/i18n/useI18n'
import { cn } from '../../lib/utils'
import { DolbomLogo } from '../layout/DolbomLogo'
import { caregiverTopNavItems } from './caregiverTopNavigation'

type CaregiverTopNavLabel = (typeof caregiverTopNavItems)[number]['label']

type CaregiverTopBarProps = {
  activeHref?: string
  activeLabel?: CaregiverTopNavLabel
  sticky?: boolean
}

const caregiverProfileSrc = '/assets/dolbomon/worker-dashboard/요양사.png'

export function CaregiverTopBar({
  activeHref,
  activeLabel,
  sticky = true,
}: CaregiverTopBarProps) {
  const { t } = useI18n()

  return (
    <header
      className={cn(
        'z-40 border-b border-[#dde7f4] bg-white/96 shadow-[0_5px_18px_rgba(35,73,128,0.07)] backdrop-blur',
        sticky ? 'sticky top-0' : 'relative',
      )}
    >
      <div className="mx-auto grid min-h-[74px] w-full max-w-[1800px] grid-cols-[auto_auto] items-center gap-x-4 gap-y-2 px-5 py-2 lg:grid-cols-[196px_minmax(0,1fr)_auto] lg:px-10">
        <DolbomLogo ariaLabel={t('caregiver.nav.logoAria')} to="/caregiver" />

        <nav
          className="col-span-2 row-start-2 flex min-w-0 flex-wrap gap-x-2 gap-y-1 overflow-visible pb-2 text-[15px] font-black text-[#101a3d] lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:flex-nowrap lg:justify-self-center lg:gap-6 lg:pb-0"
          aria-label={t('caregiver.nav.aria')}
        >
          {caregiverTopNavItems.map((item) => {
            const isActive =
              item.href === activeHref || item.label === activeLabel
            const label = t(item.labelKey)

            return (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  'relative inline-flex min-h-11 shrink-0 items-center justify-center px-2 transition hover:text-[#0867f2] focus-visible:rounded-lg',
                  isActive ? 'text-[#0867f2]' : 'text-[#101a3d]',
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {label}
                {isActive ? (
                  <span
                    className="absolute bottom-[-8px] left-0 right-0 h-1 rounded-full bg-[#0867f2] lg:bottom-[-14px]"
                    aria-hidden="true"
                  />
                ) : null}
              </Link>
            )
          })}
        </nav>

        <div className="col-start-2 row-start-1 flex items-center gap-2 justify-self-end lg:col-start-3">
          <div
            className="relative inline-grid min-h-9 min-w-9 place-items-center rounded-lg text-[#3d4c69]"
            role="img"
            aria-label={t('caregiver.nav.notificationAria')}
          >
            <Bell aria-hidden="true" size={24} strokeWidth={2.4} />
            <span className="absolute right-0.5 top-0 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-[#ff3648] px-1 text-[10px] font-black leading-none text-white ring-2 ring-white">
              3
            </span>
          </div>

          <Link
            to="/caregiver/mypage"
            className="hidden min-h-10 items-center gap-2 rounded-lg px-1.5 py-1 transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff] min-[560px]:inline-flex"
            aria-label={t('caregiver.nav.profileAria')}
          >
            <img
              src={caregiverProfileSrc}
              alt=""
              className="h-10 w-10 rounded-full bg-[#eaf4ff] object-cover shadow-[0_7px_15px_rgba(42,96,184,0.16)]"
              draggable="false"
            />
            <span className="hidden items-baseline gap-1 whitespace-nowrap sm:flex">
              <strong className="text-[14px] font-black leading-tight text-[#071747]">
                {t('caregiver.nav.profileName')}
              </strong>
              <span className="text-[13px] font-bold leading-tight text-[#33415f]">
                {t('caregiver.nav.profileRole')}
              </span>
            </span>
            <ChevronDown
              aria-hidden="true"
              className="hidden h-3.5 w-3.5 text-[#33415f] sm:block"
              strokeWidth={2.8}
            />
          </Link>
        </div>
      </div>
    </header>
  )
}
