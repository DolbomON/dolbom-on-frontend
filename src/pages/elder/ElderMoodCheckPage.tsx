import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ElderCheckHeader } from '../../components/elder-check/ElderCheckHeader'
import { ElderProgress } from '../../components/elder-check/ElderProgress'
import {
  MoodQuestionCard,
  type MoodAnswer,
} from '../../components/elder-check/MoodQuestionCard'

const voiceGuideText =
  '오늘 기분은 어떠세요? 좋아요 또는 조금 울적해요 중에서 선택해주세요.'

type DailyCheckRouteState = {
  discomfortAnswer?: unknown
  mealAnswer?: unknown
  medicationTaken?: unknown
  moodAnswer?: Exclude<MoodAnswer, null>
}

function getDailyCheckRouteState(state: unknown): DailyCheckRouteState {
  if (typeof state === 'object' && state !== null) {
    return state as DailyCheckRouteState
  }

  return {}
}

export function ElderMoodCheckPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const routeState = getDailyCheckRouteState(location.state)
  const [moodAnswer, setMoodAnswer] = useState<MoodAnswer>(
    routeState.moodAnswer ?? null,
  )

  function handleMoodAnswer(answer: Exclude<MoodAnswer, null>) {
    setMoodAnswer(answer)

    if (answer === 'sad') {
      // TODO: Collect loneliness or emotional-detail follow-up when that flow is designed.
    }

    // TODO: Replace route state with durable daily check draft persistence.
    navigate('/elder/check/sleep', {
      state: { ...routeState, moodAnswer: answer },
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
    <main className="min-h-svh overflow-x-hidden bg-[#edf5ff] text-[#102b53]">
      <section
        className="mx-auto flex min-h-svh w-full max-w-[480px] flex-col overflow-hidden bg-[radial-gradient(circle_at_80%_22%,rgba(235,247,255,0.95)_0_15%,transparent_34%),linear-gradient(180deg,#ffffff_0%,#fbfdff_55%,#ffffff_100%)] px-4 pb-[calc(12px+env(safe-area-inset-bottom))] pt-[10px] shadow-[0_20px_80px_rgba(55,104,184,0.08)] min-[390px]:px-5"
        aria-label="기분 상태 입력 화면"
      >
        <ElderCheckHeader onNotificationClick={handleNotificationClick} />

        <section className="mt-4" aria-labelledby="greeting">
          <h1
            id="greeting"
            className="text-[28px] font-black leading-[1.1] tracking-[-0.075em] text-[#102b53] min-[390px]:text-[32px]"
          >
            안녕하세요, 김영자님
          </h1>
          <p className="mt-1 text-[15px] font-semibold leading-[1.25] tracking-[-0.045em] text-[#6d7280] min-[390px]:text-[16px]">
            2024년 5월 16일 (목)
          </p>
        </section>

        <ElderProgress currentStep={4} totalSteps={5} />

        <MoodQuestionCard
          answer={moodAnswer}
          onAnswer={handleMoodAnswer}
          onVoiceGuide={handleVoiceGuide}
        />
      </section>
    </main>
  )
}
