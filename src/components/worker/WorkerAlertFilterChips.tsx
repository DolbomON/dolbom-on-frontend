import { cn } from '../../lib/utils'
import {
  workerAlertFilters,
  type WorkerAlertFilter,
} from '../../features/worker/workerAlertsData'

type WorkerAlertFilterChipsProps = {
  activeFilter: WorkerAlertFilter
  onFilterChange: (filter: WorkerAlertFilter) => void
}

export function WorkerAlertFilterChips({
  activeFilter,
  onFilterChange,
}: WorkerAlertFilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-2.5" aria-label="알림 상태 필터">
      {workerAlertFilters.map((filter) => {
        const isActive = activeFilter === filter.value

        return (
          <button
            key={filter.value}
            type="button"
            className={cn(
              'inline-flex min-h-11 min-w-[72px] items-center justify-center rounded-full border px-5 text-[17px] font-extrabold leading-none transition active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]',
              isActive
                ? 'border-[#0867f2] bg-[#0867f2] text-white shadow-[0_10px_18px_rgba(8,103,242,0.22)]'
                : 'border-[#d1d8e3] bg-white text-[#20242c] hover:border-[#b9c7d8] hover:bg-[#f8fbff]',
            )}
            aria-pressed={isActive}
            onClick={() => onFilterChange(filter.value)}
          >
            {filter.label}
          </button>
        )
      })}
    </div>
  )
}
