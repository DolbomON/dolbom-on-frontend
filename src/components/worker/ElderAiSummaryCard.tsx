import { Brain } from 'lucide-react'

export function ElderAiSummaryCard() {
  return (
    <section className="grid grid-cols-[58px_minmax(0,1fr)] items-center gap-4 rounded-[24px] border border-[#e5ebf4] bg-white px-4 py-5 shadow-[0_14px_28px_rgba(32,79,150,0.09)]">
      <span
        className="grid h-[58px] w-[58px] place-items-center rounded-full bg-[#def5eb] text-[#18a767]"
        aria-hidden="true"
      >
        <Brain className="h-8 w-8" strokeWidth={2.7} />
      </span>

      <div className="min-w-0">
        <h2 className="text-[22px] font-black leading-tight text-[#101827]">
          AI 안부 요약
        </h2>
        {/* TODO: Replace this static summary with the backend AI summary API. */}
        <p className="mt-2 text-[17px] font-medium leading-relaxed text-[#303743]">
          오늘 복약은 완료되었지만 아침 식사 기록이 아직 없습니다.
          <br />
          전반적인 기분과 수면 상태는 안정적입니다.
        </p>
      </div>
    </section>
  )
}
