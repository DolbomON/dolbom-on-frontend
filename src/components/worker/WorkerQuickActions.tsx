import { ChevronRight, ClipboardList, Siren } from 'lucide-react'

type WorkerQuickActionsProps = {
  onShowDangerOnly: () => void
  onShowMissingInput: () => void
}

export function WorkerQuickActions({
  onShowDangerOnly,
  onShowMissingInput,
}: WorkerQuickActionsProps) {
  return (
    <section aria-labelledby="worker-quick-actions-title">
      <h2
        id="worker-quick-actions-title"
        className="text-[22px] font-black leading-tight text-[#101827]"
      >
        빠른 작업
      </h2>

      <div className="mt-3 grid gap-3 min-[380px]:grid-cols-2">
        <button
          type="button"
          className="grid min-h-[84px] grid-cols-[52px_minmax(0,1fr)_20px] items-center gap-3 rounded-[20px] border border-[#e5ebf4] bg-white px-3 text-left shadow-[0_12px_24px_rgba(32,79,150,0.09)] transition hover:bg-[#f8fbff] active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
          onClick={onShowDangerOnly}
        >
          <span className="grid h-[52px] w-[52px] place-items-center rounded-full bg-[#e6f0ff] text-[#0867f2]">
            <Siren aria-hidden="true" className="h-8 w-8" strokeWidth={2.6} />
          </span>
          <span className="text-[17px] font-black leading-snug text-[#101827]">
            위험 대상자만 보기
          </span>
          <ChevronRight
            aria-hidden="true"
            className="h-5 w-5 text-[#0867f2]"
            strokeWidth={3}
          />
        </button>

        <button
          type="button"
          className="grid min-h-[84px] grid-cols-[52px_minmax(0,1fr)_20px] items-center gap-3 rounded-[20px] border border-[#e5ebf4] bg-white px-3 text-left shadow-[0_12px_24px_rgba(32,79,150,0.09)] transition hover:bg-[#f8fbff] active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
          onClick={onShowMissingInput}
        >
          <span className="grid h-[52px] w-[52px] place-items-center rounded-full bg-[#e6f0ff] text-[#0867f2]">
            <ClipboardList
              aria-hidden="true"
              className="h-8 w-8"
              strokeWidth={2.6}
            />
          </span>
          <span className="text-[17px] font-black leading-snug text-[#101827]">
            오늘 미입력 대상 확인
          </span>
          <ChevronRight
            aria-hidden="true"
            className="h-5 w-5 text-[#0867f2]"
            strokeWidth={3}
          />
        </button>
      </div>
    </section>
  )
}
