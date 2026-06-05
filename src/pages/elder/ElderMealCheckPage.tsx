import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ElderCheckHeader } from '../../components/elder-check/ElderCheckHeader'
import { ElderProgress } from '../../components/elder-check/ElderProgress'
import {
  MealQuestionCard,
  type MealAnswer,
} from '../../components/elder-check/MealQuestionCard'
import { useI18n } from '../../lib/i18n/useI18n'

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
  const { t } = useI18n()
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
    console.info(t('elder.check.meal.voiceGuide'))
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#edf5ff] text-[#080808]">
      <section
        className="mx-auto flex min-h-svh w-full max-w-[480px] flex-col overflow-hidden bg-[radial-gradient(circle_at_80%_22%,rgba(235,247,255,0.95)_0_15%,transparent_34%),linear-gradient(180deg,#ffffff_0%,#fbfdff_55%,#ffffff_100%)] px-4 pb-[calc(12px+env(safe-area-inset-bottom))] pt-[10px] shadow-[0_20px_80px_rgba(55,104,184,0.08)] min-[390px]:px-5"
        aria-label={t('elder.check.meal.pageAria')}
      >
        <ElderCheckHeader onNotificationClick={handleNotificationClick} />

        <section className="mt-4" aria-labelledby="greeting">
          <h1
            id="greeting"
            className="text-[28px] font-black leading-[1.1] tracking-[-0.075em] text-[#102b53] min-[390px]:text-[32px]"
          >
            {t('elder.check.greeting')}
          </h1>
          <p className="mt-1 text-[15px] font-semibold leading-[1.25] tracking-[-0.045em] text-[#6d7280] min-[390px]:text-[16px]">
            {t('elder.check.date')}
          </p>
        </section>

        <ElderProgress currentStep={2} totalSteps={5} />

        <MealQuestionCard
          answer={mealAnswer}
          onAnswer={handleMealAnswer}
          onVoiceGuide={handleVoiceGuide}
        />
      </section>
    </main>
  )
}
