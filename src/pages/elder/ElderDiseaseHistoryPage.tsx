import { Menu } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { MedicationHabitAnswers } from '../../components/elder-check/MedicationHabitQuestionCard'
import { DolbomLogo } from '../../components/layout/DolbomLogo'
import type { TranslationKey } from '../../lib/i18n/translations'
import { useI18n } from '../../lib/i18n/useI18n'
import { cn } from '../../lib/utils'

export type DiseaseHistoryCondition =
  | 'hypertension'
  | 'diabetes'
  | 'dementia'
  | 'cardiovascular'
  | 'joint'
  | 'other'

export type HospitalFallHistory = 'yes' | 'no'

export type DiseaseHistoryAnswers = {
  conditions: DiseaseHistoryCondition[]
  hospitalFallHistory: HospitalFallHistory
}

type DiseaseHistoryRouteState = {
  diseaseHistory?: DiseaseHistoryAnswers
  medicationHabit?: MedicationHabitAnswers
}

type ConditionOption = {
  imageClassName?: string
  imageSrc: string
  labelKey: TranslationKey
  value: DiseaseHistoryCondition
}

const conditionOptions: ConditionOption[] = [
  {
    imageClassName:
      'h-[82px] w-[82px] min-[390px]:h-[92px] min-[390px]:w-[92px]',
    imageSrc: '/assets/dolbomon/elder-check/blade.png',
    labelKey: 'elder.survey.disease.condition.hypertension',
    value: 'hypertension',
  },
  {
    imageClassName:
      'h-[84px] w-[94px] min-[390px]:h-[94px] min-[390px]:w-[104px]',
    imageSrc: '/assets/dolbomon/elder-check/당뇨.png',
    labelKey: 'elder.survey.disease.condition.diabetes',
    value: 'diabetes',
  },
  {
    imageClassName:
      'h-[86px] w-[100px] min-[390px]:h-[98px] min-[390px]:w-[112px]',
    imageSrc: '/assets/dolbomon/elder-check/치매.png',
    labelKey: 'elder.survey.disease.condition.dementia',
    value: 'dementia',
  },
  {
    imageClassName:
      'h-[84px] w-[84px] min-[390px]:h-[96px] min-[390px]:w-[96px]',
    imageSrc: '/assets/dolbomon/elder-check/심장.png',
    labelKey: 'elder.survey.disease.condition.cardiovascular',
    value: 'cardiovascular',
  },
  {
    imageClassName:
      'h-[92px] w-[104px] min-[390px]:h-[106px] min-[390px]:w-[116px]',
    imageSrc: '/assets/dolbomon/elder-check/관절.png',
    labelKey: 'elder.survey.disease.condition.joint',
    value: 'joint',
  },
  {
    imageClassName:
      'h-[86px] w-[86px] min-[390px]:h-[100px] min-[390px]:w-[100px]',
    imageSrc: '/assets/dolbomon/elder-check/기타.png',
    labelKey: 'elder.survey.disease.condition.other',
    value: 'other',
  },
]

const hospitalFallOptions: Array<{
  labelKey: TranslationKey
  value: HospitalFallHistory
}> = [
  { labelKey: 'elder.survey.choice.yes', value: 'yes' },
  { labelKey: 'elder.survey.choice.no', value: 'no' },
]

function getDiseaseHistoryRouteState(state: unknown): DiseaseHistoryRouteState {
  if (typeof state === 'object' && state !== null) {
    return state as DiseaseHistoryRouteState
  }

  return {}
}

function DiseaseProgress() {
  const { t } = useI18n()
  const currentStep = 2
  const totalSteps = 6
  const progressPercent = (currentStep / totalSteps) * 100

  return (
    <section aria-label={t('elder.survey.disease.progressAria')}>
      <div className="flex items-end justify-between gap-4">
        <h1 className="text-[38px] font-black leading-tight text-[#061844] min-[390px]:text-[44px]">
          {t('elder.survey.disease.title')}
        </h1>
        <p
          className="text-[30px] font-black leading-none text-[#4f5a67] min-[390px]:text-[34px]"
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

export function ElderDiseaseHistoryPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useI18n()
  const routeState = getDiseaseHistoryRouteState(location.state)
  const [selectedConditions, setSelectedConditions] = useState<
    DiseaseHistoryCondition[]
  >(
    routeState.diseaseHistory?.conditions ?? [
      'hypertension',
      'diabetes',
      'joint',
    ],
  )
  const [hospitalFallHistory, setHospitalFallHistory] =
    useState<HospitalFallHistory>(
      routeState.diseaseHistory?.hospitalFallHistory ?? 'no',
    )

  function handleMenuClick() {
    navigate('/elder/mypage')
  }

  function handleConditionToggle(condition: DiseaseHistoryCondition) {
    setSelectedConditions((currentConditions) =>
      currentConditions.includes(condition)
        ? currentConditions.filter(
            (currentCondition) => currentCondition !== condition,
          )
        : [...currentConditions, condition],
    )
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const diseaseHistory: DiseaseHistoryAnswers = {
      conditions: selectedConditions,
      hospitalFallHistory,
    }

    // TODO: Replace route state with durable onboarding draft persistence.
    navigate('/elder/check/pain-walking', {
      state: { ...routeState, diseaseHistory },
    })
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#edf5ff] text-[#061844]">
      <section
        className="mx-auto flex min-h-svh w-full max-w-[480px] flex-col bg-white px-5 pb-[max(14px,env(safe-area-inset-bottom))] pt-[max(20px,env(safe-area-inset-top))] shadow-[0_20px_80px_rgba(55,104,184,0.08)] min-[390px]:px-6"
        aria-label={t('elder.survey.disease.aria')}
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
          className="flex flex-1 flex-col pt-5 min-[390px]:pt-7"
          onSubmit={handleSubmit}
        >
          <DiseaseProgress />

          <fieldset className="mt-7 min-[390px]:mt-8">
            <legend className="mb-4 text-[25px] font-black leading-tight text-[#5b6572] min-[390px]:text-[28px]">
              {t('elder.survey.disease.conditionLegend')}
            </legend>

            <div className="grid grid-cols-2 gap-3 min-[390px]:gap-4">
              {conditionOptions.map((option) => {
                const selected = selectedConditions.includes(option.value)

                return (
                  <button
                    key={option.value}
                    className={cn(
                      'flex min-h-[132px] flex-col items-center justify-center rounded-[24px] border-2 px-3 py-3 font-black leading-none shadow-[0_12px_20px_rgba(23,48,85,0.1)] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[150px]',
                      selected
                        ? 'border-[#0876ff] bg-gradient-to-br from-[#147cff] to-[#0066f5] text-white shadow-[0_16px_28px_rgba(2,92,221,0.24)]'
                        : 'border-[#d9e1ec] bg-white text-[#071634]',
                    )}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => handleConditionToggle(option.value)}
                  >
                    <img
                      src={option.imageSrc}
                      alt=""
                      width="1024"
                      height="1024"
                      className={cn(
                        'mb-3 object-contain drop-shadow-[0_10px_15px_rgba(19,36,66,0.15)]',
                        option.imageClassName,
                      )}
                      aria-hidden="true"
                      draggable="false"
                    />
                    <span className="text-[30px] font-black leading-none min-[390px]:text-[34px]">
                      {t(option.labelKey)}
                    </span>
                  </button>
                )
              })}
            </div>
          </fieldset>

          <fieldset className="mt-6 min-[390px]:mt-7">
            <legend className="mb-4 text-[25px] font-black leading-tight text-[#5b6572] min-[390px]:text-[28px]">
              {t('elder.survey.disease.fallLegend')}
            </legend>

            <div className="grid grid-cols-2 gap-4">
              {hospitalFallOptions.map((option) => {
                const selected = hospitalFallHistory === option.value

                return (
                  <button
                    key={option.value}
                    className={cn(
                      'min-h-[58px] rounded-[22px] border-2 px-3 font-black text-[#071634] shadow-[0_12px_20px_rgba(23,48,85,0.1)] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[64px]',
                      selected
                        ? 'border-[#0876ff] bg-gradient-to-br from-[#147cff] to-[#0066f5] text-white shadow-[0_16px_28px_rgba(2,92,221,0.24)]'
                        : 'border-[#d9e1ec] bg-white',
                    )}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setHospitalFallHistory(option.value)}
                  >
                    <span className="text-[28px] font-black leading-none min-[390px]:text-[32px]">
                      {t(option.labelKey)}
                    </span>
                  </button>
                )
              })}
            </div>
          </fieldset>

          <div className="mt-auto pt-6">
            <button
              className="flex min-h-[66px] w-full items-center justify-center rounded-[18px] bg-gradient-to-br from-[#147cff] to-[#0066f5] px-6 font-black text-white shadow-[0_18px_30px_rgba(2,92,221,0.22)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[72px] min-[390px]:rounded-[20px]"
              type="submit"
            >
              <span className="text-[28px] font-black leading-none min-[390px]:text-[32px]">
                {t('common.next')}
              </span>
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}
