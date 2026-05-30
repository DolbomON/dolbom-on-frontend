import {
  Brain,
  ClipboardCheck,
  TriangleAlert,
  type LucideIcon,
} from 'lucide-react'
import type { ReportMetric } from '../../features/worker/workerReportsData'
import { cn } from '../../lib/utils'

const metricIcons: Record<ReportMetric['id'], LucideIcon> = {
  aiSummary: Brain,
  recordRate: ClipboardCheck,
  riskCount: TriangleAlert,
}

const metricToneClasses: Record<
  ReportMetric['tone'],
  {
    card: string
    icon: string
    text: string
  }
> = {
  blue: {
    card: 'border-[#cfe1ff] bg-[#f7fbff]',
    icon: 'bg-[#e6f0ff] text-[#0867f2]',
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

type WorkerReportMetricCardProps = {
  metric: ReportMetric
}

export function WorkerReportMetricCard({
  metric,
}: WorkerReportMetricCardProps) {
  const Icon = metricIcons[metric.id]
  const tone = metricToneClasses[metric.tone]

  return (
    <article
      className={cn(
        'flex min-h-[108px] min-w-0 flex-col items-center justify-center rounded-[20px] border px-2.5 py-3 text-center shadow-[0_10px_22px_rgba(40,91,172,0.08)] min-[410px]:min-h-[96px] min-[410px]:flex-row min-[410px]:gap-2.5 min-[410px]:text-left',
        tone.card,
      )}
      aria-label={`${metric.label} ${metric.value}`}
    >
      <span
        className={cn(
          'grid h-12 w-12 shrink-0 place-items-center rounded-full shadow-[0_8px_18px_rgba(45,85,148,0.08)]',
          tone.icon,
        )}
        aria-hidden="true"
      >
        <Icon className="h-7 w-7" strokeWidth={2.8} />
      </span>

      <span className="mt-2 min-w-0 min-[410px]:mt-0">
        <span
          className={cn(
            'block whitespace-nowrap text-[15px] font-black leading-tight',
            tone.text,
          )}
        >
          {metric.label}
        </span>
        <strong
          className={cn(
            'mt-1 block whitespace-nowrap text-[30px] font-black leading-none',
            tone.text,
          )}
        >
          {metric.value}
        </strong>
      </span>
    </article>
  )
}
