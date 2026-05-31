import { useLocation, useNavigate } from 'react-router-dom'
import { CompletionProgress } from '../../components/elder-check/CompletionProgress'
import { CompletionSummaryCard } from '../../components/elder-check/CompletionSummaryCard'
import { ElderCheckHeader } from '../../components/elder-check/ElderCheckHeader'
import type { DiscomfortAnswer } from '../../components/elder-check/DiscomfortQuestionCard'
import type { MealAnswer } from '../../components/elder-check/MealQuestionCard'
import type { MedicationAnswer } from '../../components/elder-check/MedicationQuestionCard'
import type { MoodAnswer } from '../../components/elder-check/MoodQuestionCard'
import type { SleepAnswer } from '../../components/elder-check/SleepQuestionCard'
import type { CompletionSummaryItem } from '../../components/elder-check/CompletionSummaryRow'

const completionIllustrationSrc =
  '/assets/dolbomon/elder-check/completion-illustration.png'

type DailyCheckRouteState = {
  discomfortAnswer?: Exclude<DiscomfortAnswer, null>
  mealAnswer?: Exclude<MealAnswer, null>
  medicationTaken?: Exclude<MedicationAnswer, null>
  moodAnswer?: Exclude<MoodAnswer, null>
  sleepAnswer?: Exclude<SleepAnswer, null>
}

const defaultSummaryItems: CompletionSummaryItem[] = [
  {
    id: 'medication',
    label: '복약',
    answer: '네, 먹었어요',
  },
  {
    id: 'meal',
    label: '식사',
    answer: '네, 했어요',
  },
  {
    id: 'discomfort',
    label: '몸 상태',
    answer: '없어요',
  },
  {
    id: 'mood',
    label: '기분',
    answer: '좋아요',
  },
  {
    id: 'sleep',
    label: '수면',
    answer: '네, 잘 잤어요',
  },
]

const medicationAnswerLabels: Record<
  Exclude<MedicationAnswer, null>,
  string
> = {
  not_taken: '아직 못 먹었어요',
  taken: '네, 먹었어요',
}

const mealAnswerLabels: Record<Exclude<MealAnswer, null>, string> = {
  done: '네, 했어요',
  not_done: '아직 못 했어요',
}

const discomfortAnswerLabels: Record<
  Exclude<DiscomfortAnswer, null>,
  string
> = {
  has_discomfort: '있어요',
  none: '없어요',
}

const moodAnswerLabels: Record<Exclude<MoodAnswer, null>, string> = {
  good: '좋아요',
  sad: '조금 울적해요',
}

const sleepAnswerLabels: Record<Exclude<SleepAnswer, null>, string> = {
  slept_well: '네, 잘 잤어요',
  uncomfortable: '조금 불편했어요',
}

function getDailyCheckRouteState(state: unknown): DailyCheckRouteState {
  if (typeof state === 'object' && state !== null) {
    return state as DailyCheckRouteState
  }

  return {}
}

function getCompletionSummaryItems(
  routeState: DailyCheckRouteState,
): CompletionSummaryItem[] {
  // TODO: Replace route-state fallbacks with durable daily-check draft persistence,
  // backend submission, risk score calculation, AI summary generation, and alert trigger.
  return defaultSummaryItems.map((item) => {
    if (item.id === 'medication' && routeState.medicationTaken) {
      return {
        ...item,
        answer: medicationAnswerLabels[routeState.medicationTaken],
      }
    }

    if (item.id === 'meal' && routeState.mealAnswer) {
      return {
        ...item,
        answer: mealAnswerLabels[routeState.mealAnswer],
      }
    }

    if (item.id === 'discomfort' && routeState.discomfortAnswer) {
      return {
        ...item,
        answer: discomfortAnswerLabels[routeState.discomfortAnswer],
      }
    }

    if (item.id === 'mood' && routeState.moodAnswer) {
      return {
        ...item,
        answer: moodAnswerLabels[routeState.moodAnswer],
      }
    }

    if (item.id === 'sleep' && routeState.sleepAnswer) {
      return {
        ...item,
        answer: sleepAnswerLabels[routeState.sleepAnswer],
      }
    }

    return item
  })
}

export function ElderCheckCompletePage() {
  const location = useLocation()
  const navigate = useNavigate()
  const summaryItems = getCompletionSummaryItems(
    getDailyCheckRouteState(location.state),
  )

  function handleNotificationClick() {
    // TODO: Open the notification center when notifications are implemented.
    console.info('Notifications are not implemented yet.')
  }

  function handleHomeClick() {
    navigate('/elder')
  }

  function handleStartChatClick() {
    navigate('/elder/chat')
  }

  return (
    <main className="h-svh overflow-hidden bg-[#edf5ff] text-[#102b53]">
      <section
        className="mx-auto flex h-svh w-full max-w-[480px] flex-col overflow-hidden bg-[radial-gradient(circle_at_78%_20%,rgba(235,247,255,0.96)_0_16%,transparent_35%),linear-gradient(180deg,#ffffff_0%,#fbfdff_62%,#ffffff_100%)] px-5 pb-[calc(14px+env(safe-area-inset-bottom))] pt-[12px] shadow-[0_20px_80px_rgba(55,104,184,0.08)]"
        aria-label="오늘 상태 입력 완료 화면"
      >
        <ElderCheckHeader onNotificationClick={handleNotificationClick} />

        <section className="mt-4 shrink-0" aria-labelledby="greeting">
          <h1
            id="greeting"
            className="text-[34px] font-black leading-[1.06] tracking-[-0.075em] text-[#061844]"
          >
            안녕하세요, 김영자님
          </h1>
          <p className="mt-1 text-[18px] font-bold leading-[1.2] tracking-[-0.045em] text-[#5b6473]">
            2024년 5월 16일 (목)
          </p>
        </section>

        <CompletionProgress />

        <section className="mt-4 flex min-h-0 flex-1 flex-col gap-4 rounded-[22px] border border-[#d7e8ff] bg-[linear-gradient(180deg,#edf6ff_0%,#f8fbff_48%,#edf7ff_100%)] p-5 text-center shadow-[0_14px_30px_rgba(36,92,174,0.12),inset_0_1px_0_rgba(255,255,255,0.92)]">
          <div className="flex shrink-0 items-center gap-2 text-left">
            <img
              src={completionIllustrationSrc}
              alt="오늘 상태 입력 완료 이미지"
              width="305"
              height="160"
              className="h-[78px] w-[98px] shrink-0 rounded-[16px] bg-[#edf6ff] object-contain"
              draggable="false"
            />
            <div className="min-w-0 flex-1">
              <h2
                className="text-[30px] font-black leading-[1.04] tracking-[-0.075em] text-[#061844]"
                aria-label="오늘 상태 입력이 완료되었어요"
              >
                <span className="block whitespace-nowrap">
                  오늘 상태 입력이
                </span>
                <span className="block whitespace-nowrap">완료되었어요</span>
              </h2>
              <p className="mt-2 text-[16px] font-bold leading-[1.25] tracking-[-0.045em] text-[#4f5a70]">
                가족과 복지사가 안부를 확인할 수 있어요.
              </p>
            </div>
          </div>

          <CompletionSummaryCard items={summaryItems} />

          <div className="grid shrink-0 gap-2">
            <button
              className="min-h-[58px] w-full rounded-[18px] bg-gradient-to-br from-[#0878ff] to-[#005de8] px-4 text-[25px] font-black tracking-[-0.055em] text-white shadow-[0_14px_26px_rgba(2,92,221,0.22),inset_0_1px_0_rgba(255,255,255,0.24)] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
              type="button"
              onClick={handleHomeClick}
            >
              홈으로 가기
            </button>

            <button
              className="min-h-[52px] w-full rounded-[17px] border-2 border-[#0867f2] bg-white/95 px-4 text-[22px] font-black tracking-[-0.055em] text-[#0867f2] shadow-[inset_0_0_0_1px_rgba(8,103,242,0.04)] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
              type="button"
              onClick={handleStartChatClick}
            >
              AI 안부 대화 시작
            </button>
          </div>
        </section>
      </section>
    </main>
  )
}
