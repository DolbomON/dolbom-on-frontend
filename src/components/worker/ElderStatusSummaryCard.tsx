import {
  AlertCircle,
  Moon,
  Pill,
  Smile,
  Soup,
  type LucideIcon,
} from 'lucide-react'
import type { ElderStatusSummaryItem } from '../../features/worker/workerElderDetailData'
import { cn } from '../../lib/utils'

const statusIcons: Record<ElderStatusSummaryItem['id'], LucideIcon> = {
  condition: AlertCircle,
  meal: Soup,
  medication: Pill,
  mood: Smile,
  sleep: Moon,
}

const statusToneClasses: Record<
  ElderStatusSummaryItem['tone'],
  {
    icon: string
    value: string
  }
> = {
  blue: {
    icon: 'bg-[#e6f0ff] text-[#0867f2]',
    value: 'text-[#0867f2]',
  },
  green: {
    icon: 'bg-[#def5eb] text-[#18a767]',
    value: 'text-[#15955c]',
  },
  orange: {
    icon: 'bg-[#fff0da] text-[#f07f00]',
    value: 'text-[#f07f00]',
  },
  purple: {
    icon: 'bg-[#eee7ff] text-[#7657dd]',
    value: 'text-[#7657dd]',
  },
}

type ElderStatusSummaryCardProps = {
  items: ElderStatusSummaryItem[]
}

export function ElderStatusSummaryCard({ items }: ElderStatusSummaryCardProps) {
  return (
    <section className="rounded-[24px] border border-[#e5ebf4] bg-white px-4 py-5 shadow-[0_14px_28px_rgba(32,79,150,0.09)]">
      <h2 className="text-[22px] font-black leading-tight text-[#101827]">
        오늘 상태 요약
      </h2>

      <div className="mt-4 overflow-hidden rounded-[16px] border border-[#edf0f5]">
        {items.map((item) => {
          const Icon = statusIcons[item.id]
          const tone = statusToneClasses[item.tone]

          return (
            <div
              key={item.id}
              className="grid min-h-[50px] grid-cols-[36px_minmax(0,1fr)_auto] items-center gap-3 border-b border-[#edf0f5] px-3 py-2 last:border-b-0"
            >
              <span
                className={cn(
                  'grid h-9 w-9 place-items-center rounded-full',
                  tone.icon,
                )}
                aria-hidden="true"
              >
                <Icon className="h-5 w-5" strokeWidth={2.8} />
              </span>
              <span className="text-[17px] font-extrabold leading-tight text-[#101827]">
                {item.label}
              </span>
              <strong
                className={cn(
                  'text-[17px] font-black leading-tight',
                  tone.value,
                )}
              >
                {item.value}
              </strong>
            </div>
          )
        })}
      </div>
    </section>
  )
}
