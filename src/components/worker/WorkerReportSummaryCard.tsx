import type { LucideIcon } from 'lucide-react'
import type { ReportProgressItem } from '../../features/worker/workerReportsData'
import { WorkerReportProgressRow } from './WorkerReportProgressRow'

type WorkerReportSummaryCardProps = {
  iconForItem: (item: ReportProgressItem) => LucideIcon
  items: ReportProgressItem[]
  title: string
}

export function WorkerReportSummaryCard({
  iconForItem,
  items,
  title,
}: WorkerReportSummaryCardProps) {
  return (
    <section className="rounded-[24px] border border-[#e5ebf4] bg-white px-4 py-5 shadow-[0_14px_28px_rgba(32,79,150,0.09)]">
      <h2 className="text-[22px] font-black leading-tight text-[#101827]">
        {title}
      </h2>

      <div className="mt-4 grid gap-4">
        {items.map((item) => (
          <WorkerReportProgressRow
            key={item.id}
            icon={iconForItem(item)}
            item={item}
          />
        ))}
      </div>
    </section>
  )
}
