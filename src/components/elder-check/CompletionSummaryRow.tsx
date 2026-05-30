import {
  MoonStar,
  Pill,
  Smile,
  UserRound,
  Utensils,
  type LucideIcon,
} from 'lucide-react'

export type CompletionSummaryItem = {
  id: 'medication' | 'meal' | 'discomfort' | 'mood' | 'sleep'
  label: string
  answer: string
}

type CompletionSummaryRowProps = {
  item: CompletionSummaryItem
}

const summaryIcons: Record<CompletionSummaryItem['id'], LucideIcon> = {
  discomfort: UserRound,
  meal: Utensils,
  medication: Pill,
  mood: Smile,
  sleep: MoonStar,
}

export function CompletionSummaryRow({ item }: CompletionSummaryRowProps) {
  const Icon = summaryIcons[item.id]

  return (
    <div className="grid min-h-[31px] grid-cols-[1fr_auto] items-center gap-2 border-b border-[#e1e7f0] py-0.5 last:border-b-0 min-[390px]:min-h-[36px] min-[390px]:py-1">
      <dt className="flex min-w-0 items-center gap-2 text-[16px] font-black leading-tight tracking-[-0.055em] text-[#071326] min-[390px]:text-[18px]">
        <span
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-b from-[#e8f2ff] to-[#dbeaff] text-[#0867f2] shadow-[inset_0_1px_0_rgba(255,255,255,0.92)] min-[390px]:h-8 min-[390px]:w-8"
          aria-hidden="true"
        >
          <Icon size={18} strokeWidth={3} />
        </span>
        <span className="truncate">{item.label}</span>
      </dt>

      <dd className="text-right text-[15px] font-black leading-tight tracking-[-0.055em] text-[#0867f2] min-[390px]:text-[17px]">
        {item.answer}
      </dd>
    </div>
  )
}
