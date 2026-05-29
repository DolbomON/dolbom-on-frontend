import {
  ClipboardPlus,
  HandHeart,
  House,
  MessageCircleMore,
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
    icon: House,
    id: 'home',
    label: '홈',
  },
  {
    href: '/elder/check',
    icon: ClipboardPlus,
    id: 'status',
    label: '상태입력',
  },
  {
    href: '/elder/chat',
    icon: MessageCircleMore,
    id: 'chat',
    label: '안부대화',
  },
  {
    href: null,
    icon: HandHeart,
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
      className="fixed bottom-0 left-1/2 z-30 grid h-[70px] w-full max-w-[480px] -translate-x-1/2 grid-cols-4 divide-x divide-[#e6ebf2] rounded-t-[18px] border-t border-[#e0e7f1] bg-white pb-[max(5px,env(safe-area-inset-bottom))] pt-[6px] shadow-[0_-8px_26px_rgba(67,85,116,0.08)]"
      aria-label="하단 메뉴"
    >
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = activeItem === item.id
        const className = cn(
          'flex min-h-[54px] flex-col items-center justify-center gap-0.5 text-[14px] font-extrabold tracking-[-0.045em] transition focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff] min-[390px]:text-[15px]',
          isActive ? 'text-[#0867f2]' : 'text-[#8b95a5]',
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
                  isActive &&
                    item.id === 'chat' &&
                    '[&>path:not(:first-child)]:stroke-white',
                )}
                aria-hidden="true"
                fill={isActive ? 'currentColor' : 'none'}
                strokeWidth={isActive ? 2.8 : 2.5}
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
                isActive &&
                  item.id === 'chat' &&
                  '[&>path:not(:first-child)]:stroke-white',
              )}
              aria-hidden="true"
              fill={isActive ? 'currentColor' : 'none'}
              strokeWidth={isActive ? 2.8 : 2.5}
            />
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
