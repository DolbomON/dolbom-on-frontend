import { Bell, CalendarDays, Users, type LucideIcon } from 'lucide-react'
import { cn } from '../../lib/utils'
import type { WorkerMypageMetric } from '../../features/worker/workerMypageData'

const metricIcons: Record<WorkerMypageMetric['id'], LucideIcon> = {
  assigned: Users,
  notification: Bell,
  schedule: CalendarDays,
}

const metricToneClasses: Record<
  WorkerMypageMetric['tone'],
  {
    card: string
    icon: string
    text: string
  }
> = {
  blue: {
    card: 'border-[#cfe1ff] bg-[#f7fbff]',
    icon: 'bg-[#e8f1ff] text-[#0867f2]',
    text: 'text-[#0867f2]',
  },
  green: {
    card: 'border-[#cdeee0] bg-[#f2fcf7]',
    icon: 'bg-[#def5eb] text-[#18a767]',
    text: 'text-[#15955c]',
  },
  orange: {
    card: 'border-[#ffe0bd] bg-[#fff9f1]',
    icon: 'bg-[#fff0da] text-[#f07f00]',
    text: 'text-[#f07f00]',
  },
}

type WorkerMypageMetricCardProps = {
  metric: WorkerMypageMetric
}

export function WorkerMypageMetricCard({
  metric,
}: WorkerMypageMetricCardProps) {
  const Icon = metricIcons[metric.id]
  const tone = metricToneClasses[metric.tone]

  return (
    <article
      className={cn(
        'flex min-h-[118px] min-w-0 flex-col items-center justify-center rounded-[22px] border px-2.5 py-3 text-center shadow-[0_10px_22px_rgba(40,91,172,0.07)] min-[420px]:min-h-[96px] min-[420px]:flex-row min-[420px]:gap-2 min-[420px]:px-2 min-[420px]:text-left',
        tone.card,
      )}
      aria-label={`${metric.label} ${metric.value}`}
    >
      <span
        className={cn(
          'grid h-12 w-12 shrink-0 place-items-center rounded-full shadow-[0_8px_18px_rgba(45,85,148,0.08)] min-[420px]:h-11 min-[420px]:w-11',
          tone.icon,
        )}
        aria-hidden="true"
      >
        <Icon className="h-7 w-7" strokeWidth={2.8} />
      </span>

      <span className="mt-2 min-w-0 max-w-full min-[420px]:mt-0">
        <span
          className={cn(
            'block whitespace-nowrap text-[14px] font-black leading-tight min-[430px]:text-[15px]',
            tone.text,
          )}
        >
          {metric.label}
        </span>
        <strong
          className={cn(
            'mt-1 block whitespace-nowrap text-[28px] font-black leading-none min-[430px]:text-[30px]',
            tone.text,
          )}
        >
          {metric.value}
        </strong>
      </span>
    </article>
  )
}
