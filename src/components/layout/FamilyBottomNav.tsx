import {
  BarChart3,
  Bell,
  Home,
  MessageCircle,
  type LucideIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useI18n } from '../../lib/i18n/useI18n'
import type { TranslationKey } from '../../lib/i18n/translations'
import { cn } from '../../lib/utils'

type FamilyBottomNavItemId = 'alerts' | 'chat' | 'home' | 'status'

type FamilyBottomNavItem = {
  href: string
  icon: LucideIcon
  id: FamilyBottomNavItemId
  labelKey: TranslationKey
  notice?: boolean
}

type FamilyBottomNavProps = {
  activeItem: FamilyBottomNavItemId
}

const navItems: FamilyBottomNavItem[] = [
  {
    href: '/family',
    icon: Home,
    id: 'home',
    labelKey: 'family.nav.home',
  },
  {
    href: '/family/status',
    icon: BarChart3,
    id: 'status',
    labelKey: 'family.nav.status',
  },
  {
    href: '/family/alerts',
    icon: Bell,
    id: 'alerts',
    labelKey: 'family.nav.alerts',
    notice: true,
  },
  {
    href: '/family/chat',
    icon: MessageCircle,
    id: 'chat',
    labelKey: 'family.nav.chat',
  },
]

export function FamilyBottomNav({ activeItem }: FamilyBottomNavProps) {
  const { t } = useI18n()

  return (
    <nav
      className="fixed bottom-0 left-1/2 z-40 w-full max-w-[480px] -translate-x-1/2 px-5 pb-[max(8px,env(safe-area-inset-bottom))]"
      aria-label={t('family.nav.aria')}
    >
      <div className="grid h-[58px] w-full grid-cols-4 rounded-[22px] border border-[#dfe7f2] bg-white shadow-[0_-4px_22px_rgba(42,78,132,0.12)]">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = item.id === activeItem

          return (
            <Link
              key={item.id}
              to={item.href}
              className={cn(
                'relative flex min-h-[56px] flex-col items-center justify-center gap-0.5 rounded-[20px] text-[12px] font-extrabold leading-tight transition active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-[-2px] focus-visible:outline-[#8bbcff]',
                isActive ? 'text-[#1765fb]' : 'text-[#6f7b8f]',
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="relative grid h-[29px] w-[29px] place-items-center">
                <Icon
                  aria-hidden="true"
                  className="h-[27px] w-[27px]"
                  strokeWidth={isActive ? 2.8 : 2.45}
                />
                {item.notice ? (
                  <span
                    className="absolute right-[-2px] top-0 h-3.5 w-3.5 rounded-full bg-[#ff3d4e] ring-2 ring-white"
                    aria-hidden="true"
                  />
                ) : null}
              </span>
              <span>{t(item.labelKey)}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
