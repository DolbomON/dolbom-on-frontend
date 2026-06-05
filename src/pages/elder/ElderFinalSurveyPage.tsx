import { Menu } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { MedicationHabitAnswers } from '../../components/elder-check/MedicationHabitQuestionCard'
import { DolbomLogo } from '../../components/layout/DolbomLogo'
import type { TranslationKey } from '../../lib/i18n/translations'
import { useI18n } from '../../lib/i18n/useI18n'
import { cn } from '../../lib/utils'
import type { DiseaseHistoryAnswers } from './ElderDiseaseHistoryPage'
import type { LivingEnvironmentAnswers } from './ElderLivingEnvironmentPage'
import type { PainWalkingAnswers } from './ElderPainWalkingPage'
import type { SelfCareAnswers } from './ElderSelfCarePage'
import type { SleepHabitAnswers } from './ElderSleepHabitPage'

export type ContactFrequency = 'daily' | 'weekly' | 'rarely'
export type LonelinessLevel = 'low' | 'medium' | 'high'

export type FinalSurveyAnswers = {
  contactFrequency: ContactFrequency
  loneliness: LonelinessLevel
}

type FinalSurveyRouteState = {
  diseaseHistory?: DiseaseHistoryAnswers
  finalSurvey?: FinalSurveyAnswers
  livingEnvironment?: LivingEnvironmentAnswers
  medicationHabit?: MedicationHabitAnswers
  painWalking?: PainWalkingAnswers
  selfCare?: SelfCareAnswers
  sleepHabit?: SleepHabitAnswers
}

const contactOptions: Array<{
  labelKey: TranslationKey
  tone?: 'caution'
  value: ContactFrequency
}> = [
  { labelKey: 'elder.survey.final.contact.daily', value: 'daily' },
  { labelKey: 'elder.survey.final.contact.weekly', value: 'weekly' },
  {
    labelKey: 'elder.survey.final.contact.rarely',
    tone: 'caution',
    value: 'rarely',
  },
]

const lonelinessOptions: Array<{
  labelKey: TranslationKey
  value: LonelinessLevel
}> = [
  { labelKey: 'elder.survey.final.loneliness.low', value: 'low' },
  { labelKey: 'elder.survey.final.loneliness.medium', value: 'medium' },
  { labelKey: 'elder.survey.final.loneliness.high', value: 'high' },
]

const defaultFinalSurveyAnswers: FinalSurveyAnswers = {
  contactFrequency: 'weekly',
  loneliness: 'medium',
}

function getFinalSurveyRouteState(state: unknown): FinalSurveyRouteState {
  if (typeof state === 'object' && state !== null) {
    return state as FinalSurveyRouteState
  }

  return {}
}

function FinalSurveyProgress() {
  const { t } = useI18n()
  const currentStep = 6
  const totalSteps = 6
  const progressPercent = (currentStep / totalSteps) * 100

  return (
    <section aria-label={t('elder.survey.final.progressAria')}>
      <div className="flex items-end justify-between gap-4">
        <h1 className="text-[38px] font-black leading-tight text-[#061844] min-[390px]:text-[44px]">
          {t('elder.survey.final.title')}
        </h1>
        <p
          className="text-[31px] font-black leading-none text-[#061844] min-[390px]:text-[35px]"
          aria-label={`${currentStep} / ${totalSteps}`}
        >
          {currentStep} / {totalSteps}
        </p>
      </div>

      <div
        className="mt-5 h-3.5 overflow-hidden rounded-full bg-[#edf0f5] min-[390px]:h-4"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={totalSteps}
        aria-valuenow={currentStep}
        aria-label={t('elder.progress.totalAria', {
          current: currentStep,
          total: totalSteps,
        })}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#2d86ff] to-[#0f74f5] shadow-[0_6px_14px_rgba(0,96,229,0.24)]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </section>
  )
}

export function ElderFinalSurveyPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useI18n()
  const routeState = getFinalSurveyRouteState(location.state)
  const [answers, setAnswers] = useState<FinalSurveyAnswers>({
    ...defaultFinalSurveyAnswers,
    ...routeState.finalSurvey,
  })

  function handleMenuClick() {
    navigate('/elder/mypage')
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // TODO: Replace route state with durable onboarding draft persistence.
    navigate('/elder', {
      state: { ...routeState, finalSurvey: answers },
    })
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#edf5ff] text-[#061844]">
      <section
        className="mx-auto flex min-h-svh w-full max-w-[480px] flex-col bg-white px-5 pb-[max(16px,env(safe-area-inset-bottom))] pt-[max(22px,env(safe-area-inset-top))] shadow-[0_20px_80px_rgba(55,104,184,0.08)] min-[390px]:px-6"
        aria-label={t('elder.survey.final.aria')}
      >
        <header className="flex items-center justify-between">
          <DolbomLogo ariaLabel={t('elder.home.logoAria')} to="/elder" />

          <button
            className="inline-grid h-12 w-12 place-items-center rounded-md text-[#061844] transition active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
            type="button"
            aria-label={t('common.myPage.open')}
            onClick={handleMenuClick}
          >
            <Menu aria-hidden="true" size={42} strokeWidth={2.8} />
          </button>
        </header>

        <form
          className="flex flex-1 flex-col pt-8 min-[390px]:pt-10"
          onSubmit={handleSubmit}
        >
          <FinalSurveyProgress />

          <fieldset className="mt-12 min-[390px]:mt-14">
            <legend className="mb-6 text-[27px] font-black leading-tight text-[#061844] min-[390px]:text-[31px]">
              {t('elder.survey.final.contactLegend')}
            </legend>

            <div className="grid grid-cols-3 gap-3 min-[390px]:gap-4">
              {contactOptions.map((option) => {
                const selected = answers.contactFrequency === option.value

                return (
                  <button
                    key={option.value}
                    className={cn(
                      'flex min-h-[116px] items-center justify-center rounded-[22px] border-2 px-2 font-black leading-none shadow-[0_12px_22px_rgba(22,48,88,0.09)] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[132px] min-[390px]:rounded-[24px]',
                      selected
                        ? 'border-[#0876ff] bg-gradient-to-br from-[#147cff] to-[#0066f5] text-white shadow-[0_18px_30px_rgba(2,92,221,0.22)]'
                        : option.tone === 'caution'
                          ? 'border-[#f1bd58] bg-[#fff9eb] text-[#9d6900]'
                          : 'border-[#d4dce8] bg-white text-[#061844]',
                    )}
                    type="button"
                    aria-pressed={selected}
                    onClick={() =>
                      setAnswers((currentAnswers) => ({
                        ...currentAnswers,
                        contactFrequency: option.value,
                      }))
                    }
                  >
                    <span className="text-[25px] font-black leading-none min-[390px]:text-[30px]">
                      {t(option.labelKey)}
                    </span>
                  </button>
                )
              })}
            </div>
          </fieldset>

          <fieldset className="mt-12 min-[390px]:mt-14">
            <legend className="mb-6 text-[27px] font-black leading-tight text-[#061844] min-[390px]:text-[31px]">
              {t('elder.survey.final.lonelinessLegend')}
            </legend>

            <div className="grid grid-cols-3 gap-3 min-[390px]:gap-4">
              {lonelinessOptions.map((option) => {
                const selected = answers.loneliness === option.value

                return (
                  <button
                    key={option.value}
                    className={cn(
                      'flex min-h-[112px] items-center justify-center rounded-[22px] border-2 px-2 font-black leading-none shadow-[0_12px_22px_rgba(22,48,88,0.09)] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[126px] min-[390px]:rounded-[24px]',
                      selected
                        ? 'border-[#0876ff] bg-gradient-to-br from-[#147cff] to-[#0066f5] text-white shadow-[0_18px_30px_rgba(2,92,221,0.22)]'
                        : 'border-[#d4dce8] bg-white text-[#061844]',
                    )}
                    type="button"
                    aria-pressed={selected}
                    onClick={() =>
                      setAnswers((currentAnswers) => ({
                        ...currentAnswers,
                        loneliness: option.value,
                      }))
                    }
                  >
                    <span className="text-[25px] font-black leading-none min-[390px]:text-[30px]">
                      {t(option.labelKey)}
                    </span>
                  </button>
                )
              })}
            </div>
          </fieldset>

          <section
            className="mt-10 rounded-[24px] border border-[#d9e2ee] bg-[#f9fcff] px-5 py-6 text-center shadow-[0_12px_24px_rgba(22,48,88,0.07)] min-[390px]:mt-12"
            aria-label={t('elder.survey.final.codeAria')}
          >
            <p className="text-[22px] font-semibold leading-none text-[#061844] min-[390px]:text-[26px]">
              {t('elder.survey.final.codeTitle')}
            </p>
            <p
              className="mt-5 text-[56px] font-black leading-none text-[#061844] min-[390px]:text-[68px]"
              aria-label={t('elder.survey.final.codeNumberAria')}
            >
              4 8 2 9
            </p>
            <p className="mt-4 text-[20px] font-semibold leading-tight text-[#526178] min-[390px]:text-[24px]">
              {t('elder.survey.final.codeDescription')}
            </p>
          </section>

          <div className="mt-auto pt-8">
            <button
              className="flex min-h-[70px] w-full items-center justify-center rounded-[20px] bg-gradient-to-br from-[#147cff] to-[#0066f5] px-6 font-black text-white shadow-[0_18px_30px_rgba(2,92,221,0.22)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[76px]"
              type="submit"
            >
              <span className="text-[32px] font-black leading-none min-[390px]:text-[36px]">
                {t('elder.survey.final.complete')}
              </span>
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}
