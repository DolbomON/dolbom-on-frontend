import {
  Check,
  ChevronRight,
  CircleAlert,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'
import type { WorkerAlert } from '../../features/dashboard/workerDashboardData'

const alertToneClasses: Record<
  WorkerAlert['tone'],
  {
    icon: LucideIcon
    tone: string
  }
> = {
  danger: {
    icon: CircleAlert,
    tone: 'bg-[#ffe8e8] text-[#ef2424]',
  },
  info: {
    icon: Sparkles,
    tone: 'bg-[#e8f8f1] text-[#18a767]',
  },
  success: {
    icon: Check,
    tone: 'bg-[#eaf3ff] text-[#0867f2]',
  },
}

type RecentAlertListProps = {
  alerts: WorkerAlert[]
}

export function RecentAlertList({ alerts }: RecentAlertListProps) {
  return (
    <ul className="divide-y divide-[#e5ebf4] overflow-hidden rounded-[24px] border border-[#e3e9f2] bg-white px-3 shadow-[0_14px_28px_rgba(32,79,150,0.1)]">
      {alerts.map((alert) => {
        const tone = alertToneClasses[alert.tone]
        const Icon = tone.icon

        return (
          <li key={alert.id}>
            <Link
              to={alert.href}
              className="grid min-h-[62px] grid-cols-[38px_minmax(0,1fr)_auto_18px] items-center gap-2.5 py-2 text-[#071747] transition hover:bg-[#f8fbff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-[-2px] focus-visible:outline-[#8bbcff]"
              aria-label={`${alert.title} 상세 보기, ${alert.time}`}
            >
              <span
                className={cn(
                  'grid h-9 w-9 place-items-center rounded-full',
                  tone.tone,
                )}
                aria-hidden="true"
              >
                <Icon size={22} strokeWidth={3} />
              </span>
              <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-bold leading-tight">
                {alert.title}
              </span>
              <time
                className="text-[14px] font-semibold leading-none text-[#5e687a]"
                dateTime={alert.time}
              >
                {alert.time}
              </time>
              <ChevronRight
                aria-hidden="true"
                className="h-[18px] w-[18px] text-[#8b95a5]"
                strokeWidth={2.6}
              />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
