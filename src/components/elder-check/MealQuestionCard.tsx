import { CheckCircle2 } from 'lucide-react'
import { cn } from '../../lib/utils'
import { VoiceGuideButton } from './VoiceGuideButton'

export type MealAnswer = 'done' | 'not_done' | null

type MealQuestionCardProps = {
  answer: MealAnswer
  onAnswer: (answer: Exclude<MealAnswer, null>) => void
  onVoiceGuide: () => void
}

type MealChoice = {
  label: string
  value: Exclude<MealAnswer, null>
  variant: 'primary' | 'outline'
}

const mealChoices: MealChoice[] = [
  {
    label: '네, 했어요',
    value: 'done',
    variant: 'primary',
  },
  {
    label: '아직 못 했어요',
    value: 'not_done',
    variant: 'outline',
  },
]

const mealIllustrationSrc = '/assets/dolbomon/elder-check/meal-illustration.png'

export function MealQuestionCard({
  answer,
  onAnswer,
  onVoiceGuide,
}: MealQuestionCardProps) {
  return (
    <section className="mt-4 flex flex-1 flex-col overflow-hidden rounded-[22px] border border-[#e7f1ff] bg-[linear-gradient(180deg,#f2f8ff_0%,#eaf5ff_100%)] pb-4 text-center shadow-[0_14px_30px_rgba(46,83,135,0.12),inset_0_1px_0_rgba(255,255,255,0.85)] min-[390px]:pb-5">
      <div className="min-h-[128px] flex-[0.8] bg-[#edf6ff] min-[390px]:min-h-[148px]">
        <img
          src={mealIllustrationSrc}
          alt="식사 확인 이미지"
          width="1448"
          height="1086"
          className="h-full w-full object-cover object-center"
          draggable="false"
        />
      </div>

      <div className="flex flex-1 flex-col justify-center px-4 min-[390px]:px-5">
        <h2 className="mt-4 whitespace-nowrap text-[27px] font-black leading-[1.1] tracking-[-0.055em] text-[#102b53] min-[390px]:text-[30px]">
          오늘 식사는 하셨나요?
        </h2>

        <div className="mt-4 grid gap-3">
          {mealChoices.map((choice) => {
            const selected = answer === choice.value

            return (
              <button
                key={choice.value}
                className={cn(
                  'relative flex min-h-[54px] w-full items-center justify-center rounded-[18px] px-4 text-[21px] font-black tracking-[-0.045em] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[58px] min-[390px]:text-[23px]',
                  choice.variant === 'primary'
                    ? 'bg-gradient-to-br from-[#6fa8ff] to-[#4c8ff0] text-white shadow-[0_20px_34px_rgba(2,92,221,0.24),inset_0_1px_0_rgba(255,255,255,0.24)]'
                    : 'border-[2.5px] border-[#6fa8ff] bg-white/92 text-[#5f9cf4] shadow-[inset_0_0_0_1px_rgba(8,103,242,0.04)]',
                  selected &&
                    'ring-4 ring-[#8bbcff] ring-offset-2 ring-offset-[#eaf5ff]',
                )}
                type="button"
                aria-pressed={selected}
                onClick={() => onAnswer(choice.value)}
              >
                {selected ? (
                  <CheckCircle2
                    className="absolute left-3 h-6 w-6 min-[390px]:left-4"
                    aria-hidden="true"
                    strokeWidth={3}
                  />
                ) : null}
                <span>{choice.label}</span>
              </button>
            )
          })}
        </div>

        <VoiceGuideButton variant="pill" onClick={onVoiceGuide} />
      </div>
    </section>
  )
}
