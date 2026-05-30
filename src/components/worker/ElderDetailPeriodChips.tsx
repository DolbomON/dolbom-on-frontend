import type { ElderDetailPeriod } from '../../features/worker/workerElderDetailData'
import { elderDetailPeriods } from '../../features/worker/workerElderDetailData'
import { cn } from '../../lib/utils'

type ElderDetailPeriodChipsProps = {
  activePeriod: ElderDetailPeriod
  onPeriodChange: (period: ElderDetailPeriod) => void
}

export function ElderDetailPeriodChips({
  activePeriod,
  onPeriodChange,
}: ElderDetailPeriodChipsProps) {
  return (
    <div className="flex flex-wrap gap-3" aria-label="대상자 상세 기간 선택">
      {elderDetailPeriods.map((period) => {
        const isActive = activePeriod === period.value

        return (
          <button
            key={period.value}
            type="button"
            className={cn(
              'inline-flex min-h-11 min-w-[76px] items-center justify-center rounded-full border px-5 text-[17px] font-extrabold leading-none transition active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]',
              isActive
                ? 'border-[#0867f2] bg-[#0867f2] text-white shadow-[0_10px_18px_rgba(8,103,242,0.22)]'
                : 'border-[#d1d8e3] bg-white text-[#20242c] hover:border-[#b9c7d8] hover:bg-[#f8fbff]',
            )}
            aria-pressed={isActive}
            onClick={() => onPeriodChange(period.value)}
          >
            {period.label}
          </button>
        )
      })}
    </div>
  )
}
