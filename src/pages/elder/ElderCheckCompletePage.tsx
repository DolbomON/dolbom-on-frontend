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
import type { TranslationKey } from '../../lib/i18n/translations'
import { useI18n } from '../../lib/i18n/useI18n'

const completionIllustrationSrc =
  '/assets/dolbomon/elder-check/completion-illustration.png'

type DailyCheckRouteState = {
  discomfortAnswer?: Exclude<DiscomfortAnswer, null>
  mealAnswer?: Exclude<MealAnswer, null>
  medicationTaken?: Exclude<MedicationAnswer, null>
  moodAnswer?: Exclude<MoodAnswer, null>
  sleepAnswer?: Exclude<SleepAnswer, null>
}

type CompletionSummaryItemKeys = {
  answerKey: TranslationKey
  id: CompletionSummaryItem['id']
  labelKey: TranslationKey
}

const defaultSummaryItems: CompletionSummaryItemKeys[] = [
  {
    id: 'medication',
    labelKey: 'elder.check.summary.medication',
    answerKey: 'elder.check.medication.taken',
  },
  {
    id: 'meal',
    labelKey: 'elder.check.summary.meal',
    answerKey: 'elder.check.meal.done',
  },
  {
    id: 'discomfort',
    labelKey: 'elder.check.summary.discomfort',
    answerKey: 'elder.check.discomfort.none',
  },
  {
    id: 'mood',
    labelKey: 'elder.check.summary.mood',
    answerKey: 'elder.check.mood.good',
  },
  {
    id: 'sleep',
    labelKey: 'elder.check.summary.sleep',
    answerKey: 'elder.check.sleep.sleptWell',
  },
]

const medicationAnswerLabels: Record<
  Exclude<MedicationAnswer, null>,
  TranslationKey
> = {
  not_taken: 'elder.check.medication.notTaken',
  taken: 'elder.check.medication.taken',
}

const mealAnswerLabels: Record<Exclude<MealAnswer, null>, TranslationKey> = {
  done: 'elder.check.meal.done',
  not_done: 'elder.check.meal.notDone',
}

const discomfortAnswerLabels: Record<
  Exclude<DiscomfortAnswer, null>,
  TranslationKey
> = {
  has_discomfort: 'elder.check.discomfort.hasDiscomfort',
  none: 'elder.check.discomfort.none',
}

const moodAnswerLabels: Record<Exclude<MoodAnswer, null>, TranslationKey> = {
  good: 'elder.check.mood.good',
  sad: 'elder.check.mood.sad',
}

const sleepAnswerLabels: Record<Exclude<SleepAnswer, null>, TranslationKey> = {
  slept_well: 'elder.check.sleep.sleptWell',
  uncomfortable: 'elder.check.sleep.uncomfortable',
}

function getDailyCheckRouteState(state: unknown): DailyCheckRouteState {
  if (typeof state === 'object' && state !== null) {
    return state as DailyCheckRouteState
  }

  return {}
}

function getCompletionSummaryItems(
  routeState: DailyCheckRouteState,
): CompletionSummaryItemKeys[] {
  // TODO: Replace route-state fallbacks with durable daily-check draft persistence,
  // backend submission, risk score calculation, AI summary generation, and alert trigger.
  return defaultSummaryItems.map((item) => {
    if (item.id === 'medication' && routeState.medicationTaken) {
      return {
        ...item,
        answerKey: medicationAnswerLabels[routeState.medicationTaken],
      }
    }

    if (item.id === 'meal' && routeState.mealAnswer) {
      return {
        ...item,
        answerKey: mealAnswerLabels[routeState.mealAnswer],
      }
    }

    if (item.id === 'discomfort' && routeState.discomfortAnswer) {
      return {
        ...item,
        answerKey: discomfortAnswerLabels[routeState.discomfortAnswer],
      }
    }

    if (item.id === 'mood' && routeState.moodAnswer) {
      return {
        ...item,
        answerKey: moodAnswerLabels[routeState.moodAnswer],
      }
    }

    if (item.id === 'sleep' && routeState.sleepAnswer) {
      return {
        ...item,
        answerKey: sleepAnswerLabels[routeState.sleepAnswer],
      }
    }

    return item
  })
}

export function ElderCheckCompletePage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useI18n()
  const summaryItems = getCompletionSummaryItems(
    getDailyCheckRouteState(location.state),
  ).map(
    (item): CompletionSummaryItem => ({
      answer: t(item.answerKey),
      id: item.id,
      label: t(item.labelKey),
    }),
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
    <main className="min-h-svh overflow-x-hidden bg-[#edf5ff] text-[#102b53]">
      <section
        className="mx-auto flex min-h-svh w-full max-w-[480px] flex-col bg-[radial-gradient(circle_at_78%_20%,rgba(235,247,255,0.96)_0_16%,transparent_35%),linear-gradient(180deg,#ffffff_0%,#fbfdff_62%,#ffffff_100%)] px-5 pb-[calc(20px+env(safe-area-inset-bottom))] pt-[12px] shadow-[0_20px_80px_rgba(55,104,184,0.08)]"
        aria-label={t('elder.check.complete.pageAria')}
      >
        <ElderCheckHeader onNotificationClick={handleNotificationClick} />

        <section className="mt-4 shrink-0" aria-labelledby="greeting">
          <h1
            id="greeting"
            className="text-[34px] font-black leading-[1.06] tracking-[-0.075em] text-[#061844]"
          >
            {t('elder.check.greeting')}
          </h1>
          <p className="mt-1 text-[18px] font-bold leading-[1.2] tracking-[-0.045em] text-[#5b6473]">
            {t('elder.check.date')}
          </p>
        </section>

        <CompletionProgress />

        <section className="mt-4 flex flex-col gap-4 rounded-[22px] border border-[#d7e8ff] bg-[linear-gradient(180deg,#edf6ff_0%,#f8fbff_48%,#edf7ff_100%)] p-5 text-center shadow-[0_14px_30px_rgba(36,92,174,0.12),inset_0_1px_0_rgba(255,255,255,0.92)]">
          <div className="flex shrink-0 items-center gap-2 text-left">
            <img
              src={completionIllustrationSrc}
              alt={t('elder.check.complete.imageAlt')}
              width="305"
              height="160"
              className="h-[78px] w-[98px] shrink-0 rounded-[16px] bg-[#edf6ff] object-contain"
              draggable="false"
            />
            <div className="min-w-0 flex-1">
              <h2
                className="text-[30px] font-black leading-[1.04] tracking-[-0.075em] text-[#061844]"
                aria-label={t('elder.check.complete.titleAria')}
              >
                <span className="block whitespace-nowrap">
                  {t('elder.check.complete.titleLine1')}
                </span>
                <span className="block whitespace-nowrap">
                  {t('elder.check.complete.titleLine2')}
                </span>
              </h2>
              <p className="mt-2 text-[16px] font-bold leading-[1.25] tracking-[-0.045em] text-[#4f5a70]">
                {t('elder.check.complete.description')}
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
              {t('elder.check.complete.homeCta')}
            </button>

            <button
              className="min-h-[52px] w-full rounded-[17px] border-2 border-[#0867f2] bg-white/95 px-4 text-[22px] font-black tracking-[-0.055em] text-[#0867f2] shadow-[inset_0_0_0_1px_rgba(8,103,242,0.04)] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
              type="button"
              onClick={handleStartChatClick}
            >
              {t('elder.check.complete.chatCta')}
            </button>
          </div>
        </section>
      </section>
    </main>
  )
}
