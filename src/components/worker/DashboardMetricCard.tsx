import { Bell, ShieldAlert, Users, type LucideIcon } from 'lucide-react'
import { cn } from '../../lib/utils'
import type { DashboardMetric } from '../../features/dashboard/workerDashboardData'

const metricIcons: Record<DashboardMetric['id'], LucideIcon> = {
  risk: ShieldAlert,
  total: Users,
  urgent: Bell,
}

const metricToneClasses: Record<
  DashboardMetric['tone'],
  {
    card: string
    icon: string
    value: string
  }
> = {
  blue: {
    card: 'border-[#cfe1ff] bg-[#f7fbff]',
    icon: 'bg-white text-[#0867f2]',
    value: 'text-[#0867f2]',
  },
  green: {
    card: 'border-[#cdeee0] bg-[#f2fcf7]',
    icon: 'bg-white text-[#18a767]',
    value: 'text-[#15955c]',
  },
  orange: {
    card: 'border-[#ffd8c5] bg-[#fff8f4]',
    icon: 'bg-white text-[#f05b13]',
    value: 'text-[#f05b13]',
  },
}

type DashboardMetricCardProps = {
  metric: DashboardMetric
}

export function DashboardMetricCard({ metric }: DashboardMetricCardProps) {
  const Icon = metricIcons[metric.id]
  const tone = metricToneClasses[metric.tone]

  return (
    <article
      className={cn(
        'flex min-h-[118px] min-w-0 flex-col items-center justify-center rounded-[22px] border px-2.5 py-3 text-center shadow-[0_10px_22px_rgba(40,91,172,0.07)]',
        tone.card,
      )}
      aria-label={`${metric.label} ${metric.value}`}
    >
      <span
        className={cn(
          'grid h-11 w-11 place-items-center rounded-full shadow-[0_8px_18px_rgba(45,85,148,0.08)]',
          tone.icon,
        )}
        aria-hidden="true"
      >
        <Icon size={27} strokeWidth={2.8} />
      </span>
      <p className="mt-2.5 whitespace-nowrap text-[14px] font-extrabold leading-tight text-[#071747]">
        {metric.label}
      </p>
      <strong
        className={cn(
          'mt-1 block whitespace-nowrap text-[28px] font-black leading-none',
          tone.value,
        )}
      >
        {metric.value}
      </strong>
    </article>
  )
}
