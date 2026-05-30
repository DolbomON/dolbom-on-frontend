import { CheckCircle2 } from 'lucide-react'
import { cn } from '../../lib/utils'
import { VoiceGuideButton } from './VoiceGuideButton'

export type SleepAnswer = 'slept_well' | 'uncomfortable' | null

type SleepQuestionCardProps = {
  answer: SleepAnswer
  onAnswer: (answer: Exclude<SleepAnswer, null>) => void
  onVoiceGuide: () => void
}

type SleepChoice = {
  label: string
  value: Exclude<SleepAnswer, null>
  variant: 'primary' | 'outline'
}

const sleepChoices: SleepChoice[] = [
  {
    label: '네, 잘 잤어요',
    value: 'slept_well',
    variant: 'primary',
  },
  {
    label: '조금 불편했어요',
    value: 'uncomfortable',
    variant: 'outline',
  },
]

const sleepIllustrationSrc =
  '/assets/dolbomon/elder-check/sleep-illustration.png'

export function SleepQuestionCard({
  answer,
  onAnswer,
  onVoiceGuide,
}: SleepQuestionCardProps) {
  return (
    <section className="mt-4 overflow-hidden rounded-[22px] border border-[#e7f1ff] bg-[linear-gradient(180deg,#edf6ff_0%,#f8fbff_50%,#edf6ff_100%)] px-4 pb-4 text-center shadow-[0_14px_30px_rgba(46,83,135,0.12),inset_0_1px_0_rgba(255,255,255,0.88)] min-[390px]:px-5 min-[390px]:pb-5">
      <div className="relative -mx-4 bg-[#edf6ff] min-[390px]:-mx-5">
        <img
          src={sleepIllustrationSrc}
          alt="수면 확인 이미지"
          width="1448"
          height="1086"
          className="mx-auto h-[126px] w-full object-cover object-center min-[390px]:h-[146px]"
          draggable="false"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-b from-transparent to-[#f8fbff]"
          aria-hidden="true"
        />
      </div>

      <h2
        className="mt-4 text-[28px] font-black leading-[1.12] tracking-[-0.075em] text-[#102b53] min-[390px]:text-[32px]"
        aria-label="어젯밤 잠은 잘 주무셨나요?"
      >
        어젯밤 잠은
        <br />잘 주무셨나요?
      </h2>

      <div className="mt-4 grid gap-3" aria-label="수면 선택">
        {sleepChoices.map((choice) => {
          const selected = answer === choice.value

          return (
            <button
              key={choice.value}
              className={cn(
                'relative flex min-h-[54px] w-full items-center justify-center rounded-[18px] px-4 text-[21px] font-black tracking-[-0.045em] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[58px] min-[390px]:text-[23px]',
                choice.variant === 'primary'
                  ? 'bg-gradient-to-br from-[#0878ff] to-[#005de8] text-white shadow-[0_20px_34px_rgba(2,92,221,0.24),inset_0_1px_0_rgba(255,255,255,0.24)]'
                  : 'border-[2.5px] border-[#0867f2] bg-white/92 text-[#0867f2] shadow-[inset_0_0_0_1px_rgba(8,103,242,0.04)]',
                selected &&
                  'ring-4 ring-[#8bbcff] ring-offset-2 ring-offset-[#edf6ff]',
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

      <VoiceGuideButton onClick={onVoiceGuide} />
    </section>
  )
}
