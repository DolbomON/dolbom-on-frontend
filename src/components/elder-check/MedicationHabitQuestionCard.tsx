import type { TranslationKey } from '../../lib/i18n/translations'
import { useI18n } from '../../lib/i18n/useI18n'
import { cn } from '../../lib/utils'

export type MedicationFrequency = 'once' | 'twice' | 'three_or_more'
export type MedicationTime = 'morning' | 'lunch' | 'evening' | 'before_sleep'
export type MedicationHelp = 'needs_help' | 'self'

export type MedicationHabitAnswers = {
  assistance: MedicationHelp
  frequency: MedicationFrequency
  times: MedicationTime[]
}

type MedicationHabitQuestionCardProps = {
  assistance: MedicationHelp
  frequency: MedicationFrequency
  onAssistanceChange: (assistance: MedicationHelp) => void
  onFrequencyChange: (frequency: MedicationFrequency) => void
  onTimeToggle: (time: MedicationTime) => void
  selectedTimes: MedicationTime[]
}

const frequencyOptions: Array<{
  labelKey: TranslationKey
  value: MedicationFrequency
}> = [
  { labelKey: 'elder.check.medicationHabit.frequency.once', value: 'once' },
  { labelKey: 'elder.check.medicationHabit.frequency.twice', value: 'twice' },
  {
    labelKey: 'elder.check.medicationHabit.frequency.threeOrMore',
    value: 'three_or_more',
  },
]

const timeOptions: Array<{
  labelKey: TranslationKey
  value: MedicationTime
}> = [
  { labelKey: 'elder.check.medicationHabit.time.morning', value: 'morning' },
  { labelKey: 'elder.check.medicationHabit.time.lunch', value: 'lunch' },
  { labelKey: 'elder.check.medicationHabit.time.evening', value: 'evening' },
  {
    labelKey: 'elder.check.medicationHabit.time.beforeSleep',
    value: 'before_sleep',
  },
]

const assistanceOptions: Array<{
  labelKey: TranslationKey
  value: MedicationHelp
}> = [
  {
    labelKey: 'elder.check.medicationHabit.assistance.needsHelp',
    value: 'needs_help',
  },
  { labelKey: 'elder.check.medicationHabit.assistance.self', value: 'self' },
]

const legendClass =
  'mb-4 text-[25px] font-black leading-tight text-[#5b6572] min-[390px]:text-[28px]'
const frequencyButtonClass =
  'min-h-[96px] rounded-[22px] border-2 px-2 text-[36px] font-black text-[#071634] shadow-[0_12px_20px_rgba(23,48,85,0.1)] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[104px] min-[390px]:rounded-[24px] min-[390px]:text-[42px]'
const chipButtonClass =
  'min-h-[54px] rounded-[20px] border-2 px-2 text-[21px] font-black text-[#56606d] shadow-[0_8px_15px_rgba(23,48,85,0.1)] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[58px] min-[390px]:rounded-[22px] min-[390px]:text-[25px]'
const assistanceButtonClass =
  'min-h-[82px] rounded-[22px] border-2 px-3 text-[28px] font-black text-[#071634] shadow-[0_12px_20px_rgba(23,48,85,0.1)] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[88px] min-[390px]:rounded-[24px] min-[390px]:text-[33px]'
const selectedClass =
  'border-[#0876ff] bg-gradient-to-br from-[#147cff] to-[#0066f5] text-white shadow-[0_16px_28px_rgba(2,92,221,0.24)]'
const unselectedClass = 'border-[#d9e1ec] bg-white'

export function MedicationHabitQuestionCard({
  assistance,
  frequency,
  onAssistanceChange,
  onFrequencyChange,
  onTimeToggle,
  selectedTimes,
}: MedicationHabitQuestionCardProps) {
  const { t } = useI18n()

  return (
    <section className="mt-7 flex flex-col gap-6 min-[390px]:mt-8 min-[390px]:gap-7">
      <fieldset>
        <legend className={legendClass}>
          {t('elder.check.medicationHabit.frequencyLegend')}
        </legend>
        <div className="grid grid-cols-3 gap-3 min-[390px]:gap-4">
          {frequencyOptions.map((option) => {
            const selected = frequency === option.value

            return (
              <button
                key={option.value}
                className={cn(
                  frequencyButtonClass,
                  selected ? selectedClass : unselectedClass,
                )}
                type="button"
                aria-pressed={selected}
                onClick={() => onFrequencyChange(option.value)}
              >
                {t(option.labelKey)}
              </button>
            )
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className={legendClass}>
          {t('elder.check.medicationHabit.timeLegend')}
        </legend>
        <div className="grid grid-cols-4 gap-3 min-[390px]:gap-4">
          {timeOptions.map((option) => {
            const selected = selectedTimes.includes(option.value)

            return (
              <button
                key={option.value}
                className={cn(
                  chipButtonClass,
                  selected ? selectedClass : unselectedClass,
                )}
                type="button"
                aria-pressed={selected}
                onClick={() => onTimeToggle(option.value)}
              >
                {t(option.labelKey)}
              </button>
            )
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className={legendClass}>
          {t('elder.check.medicationHabit.assistanceLegend')}
        </legend>
        <div className="grid grid-cols-2 gap-4">
          {assistanceOptions.map((option) => {
            const selected = assistance === option.value

            return (
              <button
                key={option.value}
                className={cn(
                  assistanceButtonClass,
                  selected ? selectedClass : unselectedClass,
                )}
                type="button"
                aria-pressed={selected}
                onClick={() => onAssistanceChange(option.value)}
              >
                {t(option.labelKey)}
              </button>
            )
          })}
        </div>
      </fieldset>
    </section>
  )
}
