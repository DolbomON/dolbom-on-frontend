import { CheckCircle2 } from 'lucide-react'
import { cn } from '../../lib/utils'
import { VoiceGuideButton } from './VoiceGuideButton'

export type DiscomfortAnswer = 'none' | 'has_discomfort' | null

type DiscomfortQuestionCardProps = {
  answer: DiscomfortAnswer
  onAnswer: (answer: Exclude<DiscomfortAnswer, null>) => void
  onVoiceGuide: () => void
}

type DiscomfortChoice = {
  label: string
  value: Exclude<DiscomfortAnswer, null>
  variant: 'primary' | 'outline'
}

const discomfortChoices: DiscomfortChoice[] = [
  {
    label: '없어요',
    value: 'none',
    variant: 'primary',
  },
  {
    label: '있어요',
    value: 'has_discomfort',
    variant: 'outline',
  },
]

const discomfortIllustrationSrc =
  '/assets/dolbomon/elder-check/discomfort-illustration.png'

export function DiscomfortQuestionCard({
  answer,
  onAnswer,
  onVoiceGuide,
}: DiscomfortQuestionCardProps) {
  return (
    <section className="mt-8 rounded-[32px] border border-[#e7f1ff] bg-[radial-gradient(circle_at_52%_28%,rgba(255,255,255,0.96)_0_22%,transparent_52%),linear-gradient(180deg,#f4f9ff_0%,#edf6ff_100%)] px-5 pb-7 pt-6 text-center shadow-[0_22px_48px_rgba(46,83,135,0.13),inset_0_1px_0_rgba(255,255,255,0.86)] min-[390px]:px-7 min-[390px]:pb-8 min-[390px]:pt-8">
      <div className="-mx-4 min-[390px]:-mx-6">
        <img
          src={discomfortIllustrationSrc}
          alt="몸 불편 여부 확인 이미지"
          width="1448"
          height="1086"
          className="mx-auto h-auto w-full max-w-[390px] object-contain drop-shadow-[0_18px_28px_rgba(66,105,168,0.16)]"
          draggable="false"
        />
      </div>

      <h2
        className="mt-6 text-[38px] font-black leading-[1.17] tracking-[-0.075em] text-[#102b53] min-[390px]:mt-7 min-[390px]:text-[46px]"
        aria-label="오늘 몸이 불편한 곳이 있나요?"
      >
        오늘 몸이
        <br />
        불편한 곳이 있나요?
      </h2>

      <div className="mt-8 grid gap-4 min-[390px]:mt-9">
        {discomfortChoices.map((choice) => {
          const selected = answer === choice.value

          return (
            <button
              key={choice.value}
              className={cn(
                'relative flex min-h-[76px] w-full items-center justify-center rounded-[24px] px-5 text-[25px] font-black tracking-[-0.045em] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[84px] min-[390px]:text-[28px]',
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

      <VoiceGuideButton onClick={onVoiceGuide} />
    </section>
  )
}
