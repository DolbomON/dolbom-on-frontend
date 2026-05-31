import {
  CompletionSummaryRow,
  type CompletionSummaryItem,
} from './CompletionSummaryRow'

type CompletionSummaryCardProps = {
  items: CompletionSummaryItem[]
}

export function CompletionSummaryCard({ items }: CompletionSummaryCardProps) {
  return (
    <dl
      className="rounded-[18px] border border-[#d9e7ff] bg-white/95 px-4 py-2 shadow-[0_10px_22px_rgba(61,114,198,0.08)]"
      aria-label="입력한 상태 요약"
    >
      {items.map((item) => (
        <CompletionSummaryRow key={item.id} item={item} />
      ))}
    </dl>
  )
}
