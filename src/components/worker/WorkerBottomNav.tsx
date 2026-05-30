import {
  Bell,
  FileText,
  LayoutDashboard,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { cn } from '../../lib/utils'

type WorkerNavItemId = 'alerts' | 'dashboard' | 'elders' | 'reports'

type WorkerNavItem = {
  href: string
  icon: LucideIcon
  id: WorkerNavItemId
  label: string
}

// TODO: Add full worker list, alert, and report pages for these routes.
const workerNavItems: WorkerNavItem[] = [
  {
    href: '/worker',
    icon: LayoutDashboard,
    id: 'dashboard',
    label: '대시보드',
  },
  {
    href: '/worker/elders',
    icon: Users,
    id: 'elders',
    label: '대상자',
  },
  {
    href: '/worker/alerts',
    icon: Bell,
    id: 'alerts',
    label: '알림',
  },
  {
    href: '/worker/reports',
    icon: FileText,
    id: 'reports',
    label: '보고서',
  },
]

export function WorkerBottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-1/2 z-30 grid h-[78px] w-full max-w-[480px] -translate-x-1/2 grid-cols-4 border-t border-[#e2eaf5] bg-white pb-[max(8px,env(safe-area-inset-bottom))] pt-1 shadow-[0_-10px_24px_rgba(40,91,172,0.1)]"
      aria-label="하단 메뉴"
    >
      {workerNavItems.map((item) => {
        const Icon = item.icon

        return (
          <NavLink
            key={item.id}
            to={item.href}
            end={item.href === '/worker'}
            className={({ isActive }) =>
              cn(
                'relative flex min-h-[62px] flex-col items-center justify-center gap-1 text-[13px] font-extrabold leading-tight transition focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-[-2px] focus-visible:outline-[#8bbcff]',
                isActive ? 'text-[#0867f2]' : 'text-[#6f7786]',
              )
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={cn(
                    'absolute left-[18%] right-[18%] top-[-4px] h-0.5 rounded-full bg-[#0867f2]',
                    !isActive && 'hidden',
                  )}
                  aria-hidden="true"
                />
                <Icon
                  aria-hidden="true"
                  className="h-8 w-8"
                  strokeWidth={isActive ? 2.9 : 2.4}
                />
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        )
      })}
    </nav>
  )
}
