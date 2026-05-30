import type { LucideIcon } from 'lucide-react'
import type { ReportProgressItem } from '../../features/worker/workerReportsData'
import { cn } from '../../lib/utils'

const progressToneClasses: Record<
  ReportProgressItem['tone'],
  {
    fill: string
    icon: string
    value: string
  }
> = {
  blue: {
    fill: 'bg-[#0867f2]',
    icon: 'bg-[#e6f0ff] text-[#0867f2]',
    value: 'text-[#0867f2]',
  },
  gray: {
    fill: 'bg-[#7b8494]',
    icon: 'bg-[#edf1f6] text-[#667085]',
    value: 'text-[#596273]',
  },
  green: {
    fill: 'bg-[#24ad70]',
    icon: 'bg-[#def5eb] text-[#18a767]',
    value: 'text-[#15955c]',
  },
  orange: {
    fill: 'bg-[#ff970f]',
    icon: 'bg-[#fff0da] text-[#f07f00]',
    value: 'text-[#f07f00]',
  },
  purple: {
    fill: 'bg-[#8b62dd]',
    icon: 'bg-[#efe8ff] text-[#8b62dd]',
    value: 'text-[#8159d7]',
  },
}

type WorkerReportProgressRowProps = {
  icon: LucideIcon
  item: ReportProgressItem
}

export function WorkerReportProgressRow({
  icon: Icon,
  item,
}: WorkerReportProgressRowProps) {
  const tone = progressToneClasses[item.tone]
  const progress = Math.min(100, Math.max(0, item.progress))

  return (
    <div className="grid grid-cols-[34px_minmax(78px,108px)_minmax(36px,1fr)_58px] items-center gap-2.5">
      <span
        className={cn(
          'grid h-9 w-9 place-items-center rounded-full',
          tone.icon,
        )}
        aria-hidden="true"
      >
        <Icon className="h-6 w-6" strokeWidth={2.8} />
      </span>

      <span className="min-w-0 text-[15px] font-extrabold leading-tight text-[#111827]">
        {item.label}
      </span>

      <span
        className="h-2.5 overflow-hidden rounded-full bg-[#edf1f6]"
        role="progressbar"
        aria-label={`${item.label} ${item.valueText}`}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={progress}
      >
        <span
          className={cn('block h-full min-w-1 rounded-full', tone.fill)}
          style={{ width: `${progress}%` }}
        />
      </span>

      <strong
        className={cn(
          'justify-self-end whitespace-nowrap text-[20px] font-black leading-none',
          tone.value,
        )}
      >
        {item.valueText}
      </strong>
    </div>
  )
}
