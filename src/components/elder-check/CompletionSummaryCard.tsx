import {
  CompletionSummaryRow,
  type CompletionSummaryItem,
} from './CompletionSummaryRow'
import { useI18n } from '../../lib/i18n/useI18n'

type CompletionSummaryCardProps = {
  items: CompletionSummaryItem[]
}

export function CompletionSummaryCard({ items }: CompletionSummaryCardProps) {
  const { t } = useI18n()

  return (
    <dl
      className="flex shrink-0 flex-col rounded-[18px] border border-[#d9e7ff] bg-white/95 px-4 py-2 shadow-[0_10px_22px_rgba(61,114,198,0.08)]"
      aria-label={t('elder.check.complete.summaryAria')}
    >
      {items.map((item) => (
        <CompletionSummaryRow key={item.id} item={item} />
      ))}
    </dl>
  )
}
