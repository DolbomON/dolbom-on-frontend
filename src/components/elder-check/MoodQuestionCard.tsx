import { CheckCircle2 } from 'lucide-react'
import { cn } from '../../lib/utils'
import { VoiceGuideButton } from './VoiceGuideButton'

export type MoodAnswer = 'good' | 'sad' | null

type MoodQuestionCardProps = {
  answer: MoodAnswer
  onAnswer: (answer: Exclude<MoodAnswer, null>) => void
  onVoiceGuide: () => void
}

type MoodChoice = {
  label: string
  value: Exclude<MoodAnswer, null>
  variant: 'primary' | 'outline'
}

const moodChoices: MoodChoice[] = [
  {
    label: '좋아요',
    value: 'good',
    variant: 'primary',
  },
  {
    label: '조금 울적해요',
    value: 'sad',
    variant: 'outline',
  },
]

export function MoodQuestionCard({
  answer,
  onAnswer,
  onVoiceGuide,
}: MoodQuestionCardProps) {
  return (
    <section className="mt-8 rounded-[32px] border border-[#e7f1ff] bg-[radial-gradient(circle_at_50%_26%,rgba(255,255,255,0.96)_0_22%,transparent_52%),linear-gradient(180deg,#f4f9ff_0%,#edf6ff_100%)] px-5 pb-7 pt-6 text-center shadow-[0_22px_48px_rgba(46,83,135,0.13),inset_0_1px_0_rgba(255,255,255,0.86)] min-[390px]:px-7 min-[390px]:pb-8 min-[390px]:pt-8">
      <MoodIllustrationPlaceholder />

      <h2 className="mt-7 break-keep text-[31px] font-black leading-[1.14] tracking-[-0.055em] text-[#102b53] min-[360px]:text-[35px] min-[430px]:text-[43px]">
        오늘 기분은 어떠세요?
      </h2>

      <div className="mt-8 grid gap-4" aria-label="기분 선택">
        {moodChoices.map((choice) => {
          const selected = answer === choice.value

          return (
            <button
              key={choice.value}
              className={cn(
                'relative flex min-h-[76px] w-full items-center justify-center rounded-[24px] px-5 text-[25px] font-black tracking-[-0.045em] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[84px] min-[390px]:text-[28px]',
                choice.variant === 'primary'
                  ? 'bg-gradient-to-br from-[#6fa8ff] to-[#4c8ff0] text-white shadow-[0_20px_34px_rgba(2,92,221,0.24),inset_0_1px_0_rgba(255,255,255,0.24)]'
                  : 'border-[2.5px] border-[#6fa8ff] bg-white/92 text-[#5f9cf4] shadow-[inset_0_0_0_1px_rgba(8,103,242,0.04)]',
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

      <VoiceGuideButton variant="pill" onClick={onVoiceGuide} />
    </section>
  )
}

function MoodIllustrationPlaceholder() {
  return (
    <div
      className="-mx-4 flex h-[290px] items-center justify-center overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_50%_34%,rgba(255,255,255,0.94)_0_18%,transparent_46%),linear-gradient(180deg,#eef7ff_0%,#dcecff_100%)] min-[360px]:h-[330px] min-[390px]:-mx-6 min-[430px]:h-[372px]"
      role="img"
      aria-label="기분 확인 이미지"
    >
      {/* TODO: Replace this placeholder with /assets/dolbomon/elder-check/mood-illustration.png when that asset is added. */}
      <svg
        className="h-full w-full max-w-[400px]"
        viewBox="0 0 400 360"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="moodFace" x1="148" y1="82" x2="263" y2="275">
            <stop stopColor="#dcecff" />
            <stop offset="1" stopColor="#79afff" />
          </linearGradient>
          <linearGradient id="moodCloud" x1="35" y1="60" x2="355" y2="320">
            <stop stopColor="#f2f8ff" />
            <stop offset="1" stopColor="#cfe4ff" />
          </linearGradient>
          <filter
            id="moodSoftShadow"
            x="0"
            y="0"
            width="400"
            height="360"
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feDropShadow
              dx="0"
              dy="16"
              stdDeviation="14"
              floodColor="#3768ae"
              floodOpacity="0.18"
            />
          </filter>
        </defs>

        <path
          d="M0 253C28 216 72 213 103 239C122 179 166 152 211 166C237 79 303 54 343 118C365 153 366 199 345 232C373 242 395 263 400 296V360H0V253Z"
          fill="url(#moodCloud)"
          opacity="0.9"
        />
        <path
          d="M0 292C61 260 136 250 203 259C275 268 342 294 400 329V360H0V292Z"
          fill="#f8fbff"
        />

        <path
          d="M85 94C74 69 97 49 120 64C130 41 164 48 165 78C167 110 129 136 123 140C116 138 96 119 85 94Z"
          fill="#8bbcff"
          filter="url(#moodSoftShadow)"
        />
        <path
          d="M313 212C301 186 327 166 349 183C361 163 392 174 388 204C383 234 347 256 340 259C334 255 322 232 313 212Z"
          fill="#fff6fa"
          filter="url(#moodSoftShadow)"
        />
        <path
          d="M291 54V82M277 68H305"
          stroke="#75afff"
          strokeLinecap="round"
          strokeWidth="10"
        />

        <g filter="url(#moodSoftShadow)">
          <circle cx="210" cy="178" r="78" fill="url(#moodFace)" />
          <circle cx="186" cy="164" r="13" fill="#f8fbff" />
          <circle cx="234" cy="164" r="13" fill="#f8fbff" />
          <path
            d="M164 195C177 226 216 238 248 198"
            stroke="white"
            strokeLinecap="round"
            strokeWidth="11"
          />
          <path
            d="M246 107C265 121 279 146 281 175"
            stroke="white"
            strokeLinecap="round"
            strokeOpacity="0.28"
            strokeWidth="5"
          />
        </g>

        <circle cx="53" cy="148" r="8" fill="white" opacity="0.9" />
        <circle cx="84" cy="217" r="10" fill="white" opacity="0.6" />
        <circle cx="347" cy="115" r="9" fill="white" opacity="0.72" />
        <circle cx="324" cy="154" r="8" fill="white" opacity="0.72" />
        <path
          d="M57 304C57 272 70 254 90 244"
          stroke="#82b8ff"
          strokeLinecap="round"
          strokeWidth="5"
        />
        <path
          d="M63 280C42 272 34 258 42 246C63 256 70 269 63 280Z"
          fill="#89bcff"
        />
        <path
          d="M81 267C98 250 113 250 121 260C106 277 92 281 81 267Z"
          fill="#abd0ff"
        />
      </svg>
    </div>
  )
}
