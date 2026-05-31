type CompletionProgressProps = {
  label?: string
}

export function CompletionProgress({
  label = '완료',
}: CompletionProgressProps) {
  return (
    <section
      className="mt-4 grid shrink-0 grid-cols-[auto_1fr] items-center gap-4"
      aria-label="진행률"
    >
      <strong className="whitespace-nowrap text-[25px] font-black tracking-[-0.05em] text-[#0867f2]">
        {label}
      </strong>

      <div
        className="h-3 overflow-hidden rounded-full bg-[#d9e7ff] shadow-[inset_0_1px_2px_rgba(17,80,170,0.12)]"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={100}
        aria-label="오늘 상태 입력 완료"
      >
        <div className="h-full w-full rounded-full bg-gradient-to-r from-[#0972ff] to-[#005de8] shadow-[0_5px_14px_rgba(0,102,246,0.3)]" />
      </div>
    </section>
  )
}
