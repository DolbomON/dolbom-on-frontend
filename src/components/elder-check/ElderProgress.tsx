import { useI18n } from '../../lib/i18n/useI18n'
import { cn } from '../../lib/utils'

type ElderProgressProps = {
  className?: string
  currentStep: number
  variant?: 'inline' | 'stacked'
  totalSteps: number
}

export function ElderProgress({
  className,
  currentStep,
  variant = 'inline',
  totalSteps,
}: ElderProgressProps) {
  const { t } = useI18n()
  const progressPercent = Math.min(
    100,
    Math.max(0, (currentStep / totalSteps) * 100),
  )

  const progressText = (
    <p
      className={cn(
        'flex items-baseline gap-2 whitespace-nowrap',
        variant === 'inline' ? 'min-w-[61px]' : 'pl-1',
      )}
      aria-label={t('elder.progress.currentAria', {
        current: currentStep,
        total: totalSteps,
      })}
    >
      <strong className="text-[22px] font-black tracking-[-0.04em] text-[#0867f2] min-[390px]:text-[24px]">
        {currentStep}
      </strong>
      <span className="text-[18px] font-semibold tracking-[-0.04em] text-[#6d7280] min-[390px]:text-[19px]">
        / {totalSteps}
      </span>
    </p>
  )

  const progressBar = (
    <div
      className="h-2.5 overflow-hidden rounded-full bg-[#edf2fa]"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={totalSteps}
      aria-valuenow={currentStep}
      aria-label={t('elder.progress.totalAria', {
        current: currentStep,
        total: totalSteps,
      })}
    >
      <div
        className="h-full min-w-3 rounded-full bg-gradient-to-r from-[#0878ff] to-[#005ce5] shadow-[0_6px_14px_rgba(0,96,229,0.24)]"
        style={{ width: `${progressPercent}%` }}
      />
    </div>
  )

  return (
    <section
      className={cn(
        variant === 'inline'
          ? 'mt-4 grid grid-cols-[auto_1fr] items-center gap-3 min-[390px]:mt-5 min-[390px]:gap-4'
          : 'grid gap-3',
        className,
      )}
      aria-label={t('elder.progress.aria')}
    >
      {variant === 'inline' ? (
        <>
          {progressText}
          {progressBar}
        </>
      ) : (
        <>
          {progressText}
          {progressBar}
        </>
      )}
    </section>
  )
}
