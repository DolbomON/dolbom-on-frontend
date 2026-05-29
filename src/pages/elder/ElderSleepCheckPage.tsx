import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ElderCheckHeader } from '../../components/elder-check/ElderCheckHeader'
import { ElderProgress } from '../../components/elder-check/ElderProgress'
import {
  SleepQuestionCard,
  type SleepAnswer,
} from '../../components/elder-check/SleepQuestionCard'

const voiceGuideText =
  '어젯밤 잠은 잘 주무셨나요? 네, 잘 잤어요 또는 조금 불편했어요 중에서 선택해주세요.'

type DailyCheckRouteState = {
  discomfortAnswer?: unknown
  mealAnswer?: unknown
  medicationTaken?: unknown
  moodAnswer?: unknown
  sleepAnswer?: Exclude<SleepAnswer, null>
}

function getDailyCheckRouteState(state: unknown): DailyCheckRouteState {
  if (typeof state === 'object' && state !== null) {
    return state as DailyCheckRouteState
  }

  return {}
}

export function ElderSleepCheckPage() {
  const location = useLocation()
  const routeState = getDailyCheckRouteState(location.state)
  const [sleepAnswer, setSleepAnswer] = useState<SleepAnswer>(
    routeState.sleepAnswer ?? null,
  )

  function handleSleepAnswer(answer: Exclude<SleepAnswer, null>) {
    setSleepAnswer(answer)
    // TODO: Save this sleep answer to the daily check draft and continue to the final review/submit flow.
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
    <main className="min-h-svh bg-[#edf5ff] text-[#102b53]">
      <section
        className="mx-auto min-h-svh w-full max-w-[480px] overflow-hidden bg-[radial-gradient(circle_at_80%_22%,rgba(235,247,255,0.95)_0_15%,transparent_34%),linear-gradient(180deg,#ffffff_0%,#fbfdff_55%,#ffffff_100%)] px-5 pb-[calc(28px+env(safe-area-inset-bottom))] pt-7 shadow-[0_20px_80px_rgba(55,104,184,0.08)] min-[390px]:px-6"
        aria-label="수면 상태 입력 화면"
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

        <ElderProgress currentStep={5} totalSteps={5} />

        <SleepQuestionCard
          answer={sleepAnswer}
          onAnswer={handleSleepAnswer}
          onVoiceGuide={handleVoiceGuide}
        />
      </section>
    </main>
  )
}
