import { CheckCircle2 } from 'lucide-react'
import { cn } from '../../lib/utils'

export type MedicationAnswer = 'taken' | 'not_taken' | null

type MedicationQuestionCardProps = {
  answer: MedicationAnswer
  onAnswer: (answer: Exclude<MedicationAnswer, null>) => void
}

const answerOptions: Array<{
  label: string
  value: Exclude<MedicationAnswer, null>
  variant: 'primary' | 'outline'
}> = [
  {
    label: '네, 먹었어요',
    value: 'taken',
    variant: 'primary',
  },
  {
    label: '아직 못 먹었어요',
    value: 'not_taken',
    variant: 'outline',
  },
]

const medicationIconSrc = '/assets/dolbomon/elder-check/icon-medication.png'

export function MedicationQuestionCard({
  answer,
  onAnswer,
}: MedicationQuestionCardProps) {
  return (
    <section className="mt-4 flex flex-1 flex-col justify-evenly rounded-[22px] bg-[radial-gradient(circle_at_50%_23%,rgba(255,255,255,0.86)_0_24%,transparent_50%),linear-gradient(180deg,#eff8ff_0%,#eaf5ff_100%)] px-4 pb-4 pt-5 text-center shadow-[0_14px_30px_rgba(39,77,128,0.12),inset_0_1px_0_rgba(255,255,255,0.8)] min-[390px]:px-5 min-[390px]:pb-5 min-[390px]:pt-6">
      <img
        src={medicationIconSrc}
        alt="복약 확인 아이콘"
        width="512"
        height="512"
        className="mx-auto h-[126px] w-[126px] object-contain drop-shadow-[0_14px_20px_rgba(66,105,168,0.18)] min-[390px]:h-[142px] min-[390px]:w-[142px]"
        draggable="false"
      />

      <h2 className="mt-3 text-[28px] font-black leading-[1.1] tracking-[-0.075em] text-[#080808] min-[390px]:text-[32px]">
        오늘 약을 드셨나요?
      </h2>

      <div className="mt-4 grid gap-3">
        {answerOptions.map((option) => {
          const selected = answer === option.value

          return (
            <button
              key={option.value}
              className={cn(
                'relative flex min-h-[54px] w-full items-center justify-center rounded-[18px] px-4 text-[22px] font-black tracking-[-0.06em] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[58px] min-[390px]:text-[24px]',
                option.variant === 'primary'
                  ? 'bg-gradient-to-br from-[#0878ff] to-[#005de8] text-white shadow-[0_20px_34px_rgba(2,92,221,0.24),inset_0_1px_0_rgba(255,255,255,0.24)]'
                  : 'border-[2.5px] border-[#0867f2] bg-white/90 text-[#0867f2] shadow-[inset_0_0_0_1px_rgba(8,103,242,0.04)]',
                selected &&
                  'ring-4 ring-[#8bbcff] ring-offset-2 ring-offset-[#eaf5ff]',
              )}
              type="button"
              aria-pressed={selected}
              onClick={() => onAnswer(option.value)}
            >
              {selected ? (
                <CheckCircle2
                  className="absolute left-3 h-6 w-6 min-[390px]:left-4"
                  aria-hidden="true"
                  strokeWidth={3}
                />
              ) : null}
              <span>{option.label}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
