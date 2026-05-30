import type { WorkerMypageMenuItem } from '../../features/worker/workerMypageData'
import { WorkerMypageMenuRow } from './WorkerMypageMenuRow'

type WorkerMypageMenuListProps = {
  availableHrefs: ReadonlySet<string>
  items: WorkerMypageMenuItem[]
  onUnavailableClick: (item: WorkerMypageMenuItem) => void
}

export function WorkerMypageMenuList({
  availableHrefs,
  items,
  onUnavailableClick,
}: WorkerMypageMenuListProps) {
  return (
    <section
      className="overflow-hidden rounded-[28px] border border-[#dce7f6] bg-white shadow-[0_16px_34px_rgba(32,79,150,0.1)]"
      aria-label="마이페이지 설정 메뉴"
    >
      <div className="divide-y divide-[#e3eaf4]">
        {items.map((item) => (
          <WorkerMypageMenuRow
            key={item.id}
            item={item}
            isAvailable={availableHrefs.has(item.href)}
            onUnavailableClick={onUnavailableClick}
          />
        ))}
      </div>
    </section>
  )
}
