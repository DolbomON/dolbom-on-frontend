type ElderProgressProps = {
  currentStep: number
  totalSteps: number
}

export function ElderProgress({ currentStep, totalSteps }: ElderProgressProps) {
  const progressPercent = Math.min(
    100,
    Math.max(0, (currentStep / totalSteps) * 100),
  )

  return (
    <section
      className="mt-8 grid grid-cols-[1fr_auto] items-center gap-4 min-[390px]:mt-9 min-[390px]:gap-5"
      aria-label="진행률"
    >
      <div
        className="h-3 overflow-hidden rounded-full bg-[#edf2fa]"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={totalSteps}
        aria-valuenow={currentStep}
        aria-label={`총 ${totalSteps}단계 중 ${currentStep}단계`}
      >
        <div
          className="h-full min-w-3 rounded-full bg-gradient-to-r from-[#0878ff] to-[#005ce5] shadow-[0_6px_14px_rgba(0,96,229,0.24)]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <p
        className="flex min-w-[61px] items-baseline gap-2 whitespace-nowrap"
        aria-label={`${currentStep} / ${totalSteps}`}
      >
        <strong className="text-[29px] font-black tracking-[-0.04em] text-[#0867f2]">
          {currentStep}
        </strong>
        <span className="text-[23px] font-semibold tracking-[-0.04em] text-[#6d7280]">
          / {totalSteps}
        </span>
      </p>
    </section>
  )
}
