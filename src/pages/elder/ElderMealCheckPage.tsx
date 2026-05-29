import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ElderCheckHeader } from '../../components/elder-check/ElderCheckHeader'
import {
  MealQuestionCard,
  type MealAnswer,
} from '../../components/elder-check/MealQuestionCard'

const voiceGuideText =
  '오늘 식사는 하셨나요? 네, 했어요 또는 아직 못 했어요 중에서 선택해주세요.'

type DailyCheckRouteState = {
  mealAnswer?: Exclude<MealAnswer, null>
  medicationTaken?: unknown
}

function getDailyCheckRouteState(state: unknown): DailyCheckRouteState {
  if (typeof state === 'object' && state !== null) {
    return state as DailyCheckRouteState
  }

  return {}
}

export function ElderMealCheckPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const routeState = getDailyCheckRouteState(location.state)
  const [mealAnswer, setMealAnswer] = useState<MealAnswer>(
    routeState.mealAnswer ?? null,
  )

  function handleMealAnswer(answer: Exclude<MealAnswer, null>) {
    setMealAnswer(answer)
    // TODO: Replace route state with durable daily check draft persistence.
    navigate('/elder/check/discomfort', {
      state: { ...routeState, mealAnswer: answer },
    })
  }

  function handleNotificationClick() {
    // TODO: Open the notification center when notifications are implemented.
    console.info('Notifications are not implemented yet.')
  }

  function handleVoiceGuide() {
    // TODO: Connect this to the voice/TTS feature when it is ready.
    console.info(voiceGuideText)
  }

  return (
    <main className="min-h-svh bg-[#edf5ff] text-[#080808]">
      <section
        className="mx-auto min-h-svh w-full max-w-[480px] overflow-hidden bg-[radial-gradient(circle_at_80%_22%,rgba(235,247,255,0.95)_0_15%,transparent_34%),linear-gradient(180deg,#ffffff_0%,#fbfdff_55%,#ffffff_100%)] px-5 pb-[calc(28px+env(safe-area-inset-bottom))] pt-7 shadow-[0_20px_80px_rgba(55,104,184,0.08)] min-[390px]:px-6"
        aria-label="식사 상태 입력 화면"
      >
        <ElderCheckHeader onNotificationClick={handleNotificationClick} />

        <section className="mt-10 min-[390px]:mt-12" aria-labelledby="greeting">
          <h1
            id="greeting"
            className="text-[37px] font-black leading-[1.13] tracking-[-0.075em] text-[#102b53] min-[390px]:text-[48px]"
          >
            안녕하세요, 김영자님
          </h1>
          <p className="mt-2.5 text-[21px] font-semibold leading-[1.3] tracking-[-0.045em] text-[#6d7280] min-[390px]:text-[24px]">
            2024년 5월 16일 (목)
          </p>
        </section>

        <MealQuestionCard
          answer={mealAnswer}
          onAnswer={handleMealAnswer}
          onVoiceGuide={handleVoiceGuide}
        />
      </section>
    </main>
  )
}
