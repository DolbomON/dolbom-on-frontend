import {
  ClipboardCheck,
  Siren,
  TriangleAlert,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '../../lib/utils'
import type { WorkerAlertSummaryMetric } from '../../features/worker/workerAlertsData'

const metricIcons: Record<WorkerAlertSummaryMetric['id'], LucideIcon> = {
  caution: TriangleAlert,
  complete: ClipboardCheck,
  urgent: Siren,
}

const metricToneClasses: Record<
  WorkerAlertSummaryMetric['tone'],
  {
    card: string
    icon: string
    value: string
  }
> = {
  blue: {
    card: 'border-[#cfe1ff] bg-[#f7fbff]',
    icon: 'bg-[#e8f1ff] text-[#0867f2]',
    value: 'text-[#0867f2]',
  },
  orange: {
    card: 'border-[#ffe0bd] bg-[#fff9f1]',
    icon: 'bg-[#fff0da] text-[#f07f00]',
    value: 'text-[#f07f00]',
  },
  red: {
    card: 'border-[#ffd3da] bg-[#fff7f8]',
    icon: 'bg-[#ffe5e9] text-[#ef2f45]',
    value: 'text-[#ef2f45]',
  },
}

type WorkerAlertMetricCardProps = {
  metric: WorkerAlertSummaryMetric
}

export function WorkerAlertMetricCard({ metric }: WorkerAlertMetricCardProps) {
  const Icon = metricIcons[metric.id]
  const tone = metricToneClasses[metric.tone]

  return (
    <article
      className={cn(
        'flex min-h-[104px] min-w-0 flex-col items-center justify-center rounded-[22px] border px-2.5 py-3 text-center shadow-[0_10px_22px_rgba(40,91,172,0.07)] min-[410px]:min-h-[96px] min-[410px]:flex-row min-[410px]:gap-2.5 min-[410px]:text-left',
        tone.card,
      )}
      aria-label={`${metric.label} ${metric.value}`}
    >
      <span
        className={cn(
          'grid h-11 w-11 shrink-0 place-items-center rounded-full',
          tone.icon,
        )}
        aria-hidden="true"
      >
        <Icon className="h-7 w-7" strokeWidth={2.8} />
      </span>

      <span className="mt-2 min-w-0 min-[410px]:mt-0">
        <span className="block whitespace-nowrap text-[15px] font-black leading-tight text-[#071747]">
          {metric.label}
        </span>
        <strong
          className={cn(
            'mt-1 block whitespace-nowrap text-[29px] font-black leading-none',
            tone.value,
          )}
        >
          {metric.value}
        </strong>
      </span>
    </article>
  )
}
