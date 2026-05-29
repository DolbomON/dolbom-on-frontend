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
    <section className="mt-8 overflow-hidden rounded-[32px] border border-[#e7f1ff] bg-[linear-gradient(180deg,#f2f8ff_0%,#eaf5ff_100%)] pb-7 text-center shadow-[0_22px_48px_rgba(46,83,135,0.13),inset_0_1px_0_rgba(255,255,255,0.85)] min-[390px]:pb-8">
      <div className="bg-[#edf6ff]">
        <img
          src={mealIllustrationSrc}
          alt="식사 확인 이미지"
          width="1448"
          height="1086"
          className="h-auto w-full object-contain"
          draggable="false"
        />
      </div>

      <div className="px-5 min-[390px]:px-7">
        <h2 className="mt-8 whitespace-nowrap text-[31px] font-black leading-[1.12] tracking-[-0.055em] text-[#102b53] min-[360px]:text-[34px] min-[430px]:text-[38px]">
          오늘 식사는 하셨나요?
        </h2>

        <div className="mt-8 grid gap-4">
          {mealChoices.map((choice) => {
            const selected = answer === choice.value

            return (
              <button
                key={choice.value}
                className={cn(
                  'relative flex min-h-[76px] w-full items-center justify-center rounded-[24px] px-5 text-[25px] font-black tracking-[-0.045em] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[84px] min-[390px]:text-[27px]',
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
                    className="absolute left-4 h-7 w-7 min-[390px]:left-5 min-[390px]:h-8 min-[390px]:w-8"
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
