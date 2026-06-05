import { useI18n } from '../../lib/i18n/useI18n'

type CompletionProgressProps = {
  label?: string
}

export function CompletionProgress({ label }: CompletionProgressProps) {
  const { t } = useI18n()
  const progressLabel = label ?? t('elder.check.complete.label')

  return (
    <section
      className="mt-4 grid shrink-0 grid-cols-[auto_1fr] items-center gap-4"
      aria-label={t('elder.progress.aria')}
    >
      <strong className="whitespace-nowrap text-[25px] font-black tracking-[-0.05em] text-[#0867f2]">
        {progressLabel}
      </strong>

      <div
        className="h-3 overflow-hidden rounded-full bg-[#d9e7ff] shadow-[inset_0_1px_2px_rgba(17,80,170,0.12)]"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={100}
        aria-label={t('elder.check.complete.progressAria')}
      >
        <div className="h-full w-full rounded-full bg-gradient-to-r from-[#0972ff] to-[#005de8] shadow-[0_5px_14px_rgba(0,102,246,0.3)]" />
      </div>
    </section>
  )
}
