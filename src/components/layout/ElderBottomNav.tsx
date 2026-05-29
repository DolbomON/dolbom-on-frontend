import {
  CircleHelp,
  ClipboardCheck,
  Home,
  MessageCircle,
  type LucideIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

type ElderNavItemId = 'home' | 'status' | 'chat' | 'help'

type ElderBottomNavItem = {
  href: string | null
  icon: LucideIcon
  id: ElderNavItemId
  label: string
}

type ElderBottomNavProps = {
  activeItem: ElderNavItemId
  onHelpClick: () => void
}

const navItems: ElderBottomNavItem[] = [
  {
    href: '/elder',
    icon: Home,
    id: 'home',
    label: '홈',
  },
  {
    href: '/elder/check',
    icon: ClipboardCheck,
    id: 'status',
    label: '상태입력',
  },
  {
    href: '/elder/chat',
    icon: MessageCircle,
    id: 'chat',
    label: '안부대화',
  },
  {
    href: null,
    icon: CircleHelp,
    id: 'help',
    label: '도움',
  },
]

export function ElderBottomNav({
  activeItem,
  onHelpClick,
}: ElderBottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-1/2 z-30 grid h-[86px] w-full max-w-[480px] -translate-x-1/2 grid-cols-4 gap-1 border-t border-[#dfe5ee] bg-white/95 px-4 pb-[max(7px,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_26px_rgba(67,85,116,0.06)]"
      aria-label="하단 메뉴"
    >
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = activeItem === item.id
        const className = cn(
          'flex min-h-[66px] flex-col items-center justify-center gap-1 rounded-2xl text-[15px] font-extrabold tracking-[-0.045em] transition focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]',
          isActive ? 'text-[#0867f2]' : 'text-[#a5adba]',
        )

        if (!item.href) {
          return (
            <button
              key={item.id}
              className={className}
              type="button"
              aria-current={isActive ? 'page' : undefined}
              onClick={onHelpClick}
            >
              <Icon
                className={cn(
                  'h-8 w-8',
                  isActive && 'drop-shadow-[0_7px_9px_rgba(5,101,242,0.16)]',
                )}
                aria-hidden="true"
                strokeWidth={isActive ? 3 : 2.6}
              />
              <span>{item.label}</span>
            </button>
          )
        }

        return (
          <Link
            key={item.id}
            to={item.href}
            className={className}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon
              className={cn(
                'h-8 w-8',
                isActive && 'drop-shadow-[0_7px_9px_rgba(5,101,242,0.16)]',
              )}
              aria-hidden="true"
              strokeWidth={isActive ? 3 : 2.6}
            />
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
