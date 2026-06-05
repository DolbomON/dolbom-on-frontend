import { Menu } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { DolbomLogo } from '../../components/layout/DolbomLogo'
import type { DiseaseHistoryAnswers } from './ElderDiseaseHistoryPage'
import type { MedicationHabitAnswers } from '../../components/elder-check/MedicationHabitQuestionCard'
import type { TranslationKey } from '../../lib/i18n/translations'
import { useI18n } from '../../lib/i18n/useI18n'
import { cn } from '../../lib/utils'

export type PainArea = 'back' | 'knee' | 'shoulder' | 'head' | 'none'
export type WalkingAidUse = 'use' | 'not_use'
export type RecentFall = 'yes' | 'no'

export type PainWalkingAnswers = {
  painAreas: PainArea[]
  recentFall: RecentFall
  walkingAidUse: WalkingAidUse
}

type PainWalkingRouteState = {
  diseaseHistory?: DiseaseHistoryAnswers
  medicationHabit?: MedicationHabitAnswers
  painWalking?: PainWalkingAnswers
}

const caneImageSrc = '/assets/dolbomon/elder-check/지팡이.png'

const painAreaOptions: Array<{
  labelKey: TranslationKey
  value: PainArea
}> = [
  { labelKey: 'elder.survey.pain.area.back', value: 'back' },
  { labelKey: 'elder.survey.pain.area.knee', value: 'knee' },
  { labelKey: 'elder.survey.pain.area.shoulder', value: 'shoulder' },
  { labelKey: 'elder.survey.pain.area.head', value: 'head' },
  { labelKey: 'elder.survey.pain.area.none', value: 'none' },
]

const walkingAidOptions: Array<{
  labelKey: TranslationKey
  value: WalkingAidUse
}> = [
  { labelKey: 'elder.survey.pain.walkingAid.use', value: 'use' },
  { labelKey: 'elder.survey.pain.walkingAid.notUse', value: 'not_use' },
]

const recentFallOptions: Array<{
  labelKey: TranslationKey
  value: RecentFall
}> = [
  { labelKey: 'elder.survey.choice.yes', value: 'yes' },
  { labelKey: 'elder.survey.choice.no', value: 'no' },
]

function getPainWalkingRouteState(state: unknown): PainWalkingRouteState {
  if (typeof state === 'object' && state !== null) {
    return state as PainWalkingRouteState
  }

  return {}
}

function PainWalkingProgress() {
  const { t } = useI18n()
  const currentStep = 3
  const totalSteps = 6
  const progressPercent = (currentStep / totalSteps) * 100

  return (
    <section aria-label={t('elder.survey.pain.progressAria')}>
      <div className="flex items-end justify-between gap-4">
        <h1 className="text-[40px] font-black leading-tight text-[#061844] min-[390px]:text-[46px]">
          {t('elder.survey.pain.title')}
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

export function ElderPainWalkingPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useI18n()
  const routeState = getPainWalkingRouteState(location.state)
  const [painAreas, setPainAreas] = useState<PainArea[]>(
    routeState.painWalking?.painAreas ?? ['back', 'knee'],
  )
  const [walkingAidUse, setWalkingAidUse] = useState<WalkingAidUse>(
    routeState.painWalking?.walkingAidUse ?? 'use',
  )
  const [recentFall, setRecentFall] = useState<RecentFall>(
    routeState.painWalking?.recentFall ?? 'no',
  )

  function handleMenuClick() {
    navigate('/elder/mypage')
  }

  function handlePainAreaToggle(area: PainArea) {
    setPainAreas((currentAreas) => {
      if (area === 'none') {
        return currentAreas.includes('none') ? [] : ['none']
      }

      const withoutNone = currentAreas.filter(
        (currentArea) => currentArea !== 'none',
      )

      return withoutNone.includes(area)
        ? withoutNone.filter((currentArea) => currentArea !== area)
        : [...withoutNone, area]
    })
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const painWalking: PainWalkingAnswers = {
      painAreas,
      recentFall,
      walkingAidUse,
    }

    // TODO: Replace route state with durable onboarding draft persistence.
    navigate('/elder/check/sleep-habit', {
      state: { ...routeState, painWalking },
    })
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#edf5ff] text-[#061844]">
      <section
        className="mx-auto flex min-h-svh w-full max-w-[480px] flex-col bg-white px-5 pb-[max(14px,env(safe-area-inset-bottom))] pt-[max(20px,env(safe-area-inset-top))] shadow-[0_20px_80px_rgba(55,104,184,0.08)] min-[390px]:px-6"
        aria-label={t('elder.survey.pain.aria')}
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
          <PainWalkingProgress />

          <fieldset className="mt-7 min-[390px]:mt-8">
            <legend className="mb-4 text-[25px] font-black leading-tight text-[#5b6572] min-[390px]:text-[28px]">
              {t('elder.survey.pain.areaLegend')}
            </legend>

            <div className="grid grid-cols-2 gap-3 min-[390px]:grid-cols-4 min-[390px]:gap-4">
              {painAreaOptions.map((option) => {
                const selected = painAreas.includes(option.value)

                return (
                  <button
                    key={option.value}
                    className={cn(
                      'min-h-[58px] rounded-[24px] border-2 px-3 font-black text-[#4f5a67] shadow-[0_10px_18px_rgba(23,48,85,0.09)] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[64px]',
                      selected
                        ? 'border-[#0876ff] bg-gradient-to-br from-[#147cff] to-[#0066f5] text-white shadow-[0_16px_28px_rgba(2,92,221,0.24)]'
                        : 'border-[#d9e1ec] bg-white',
                    )}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => handlePainAreaToggle(option.value)}
                  >
                    <span className="text-[28px] font-black leading-none min-[390px]:text-[32px]">
                      {t(option.labelKey)}
                    </span>
                  </button>
                )
              })}
            </div>
          </fieldset>

          <fieldset className="mt-6 min-[390px]:mt-7">
            <legend className="mb-4 text-[25px] font-black leading-tight text-[#5b6572] min-[390px]:text-[28px]">
              {t('elder.survey.pain.walkingAidLegend')}
            </legend>

            <div className="grid grid-cols-2 gap-4">
              {walkingAidOptions.map((option) => {
                const selected = walkingAidUse === option.value

                return (
                  <button
                    key={option.value}
                    className={cn(
                      'flex min-h-[168px] flex-col items-center justify-center rounded-[24px] border-2 px-4 py-4 font-black text-[#061844] shadow-[0_12px_20px_rgba(23,48,85,0.1)] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[190px]',
                      selected
                        ? 'border-[#0876ff] bg-gradient-to-br from-[#147cff] to-[#0066f5] text-white shadow-[0_16px_28px_rgba(2,92,221,0.24)]'
                        : 'border-[#d9e1ec] bg-white',
                    )}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setWalkingAidUse(option.value)}
                  >
                    {option.value === 'use' ? (
                      <span
                        className="mb-4 grid h-[90px] w-[124px] place-items-center overflow-visible min-[390px]:h-[104px] min-[390px]:w-[144px]"
                        aria-hidden="true"
                      >
                        <img
                          src={caneImageSrc}
                          alt=""
                          width="500"
                          height="500"
                          className="h-full w-full -translate-y-7 scale-[1.05] object-contain drop-shadow-[0_10px_15px_rgba(19,36,66,0.18)]"
                          draggable="false"
                        />
                      </span>
                    ) : null}
                    <span className="text-[34px] font-black leading-none min-[390px]:text-[40px]">
                      {t(option.labelKey)}
                    </span>
                  </button>
                )
              })}
            </div>
          </fieldset>

          <fieldset className="mt-6 min-[390px]:mt-7">
            <legend className="mb-4 text-[25px] font-black leading-tight text-[#5b6572] min-[390px]:text-[28px]">
              {t('elder.survey.pain.recentFallLegend')}
            </legend>

            <div className="grid grid-cols-2 gap-4">
              {recentFallOptions.map((option) => {
                const selected = recentFall === option.value

                return (
                  <button
                    key={option.value}
                    className={cn(
                      'min-h-[64px] rounded-[22px] border-2 px-3 font-black text-[#071634] shadow-[0_12px_20px_rgba(23,48,85,0.1)] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[72px]',
                      selected
                        ? 'border-[#0876ff] bg-gradient-to-br from-[#147cff] to-[#0066f5] text-white shadow-[0_16px_28px_rgba(2,92,221,0.24)]'
                        : option.value === 'yes'
                          ? 'border-[#f3d197] bg-white'
                          : 'border-[#d9e1ec] bg-white',
                    )}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setRecentFall(option.value)}
                  >
                    <span className="text-[30px] font-black leading-none min-[390px]:text-[34px]">
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
              <span className="text-[30px] font-black leading-none min-[390px]:text-[34px]">
                {t('common.next')}
              </span>
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}
