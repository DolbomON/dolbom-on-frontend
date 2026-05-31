import { Menu } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import type { MedicationHabitAnswers } from '../../components/elder-check/MedicationHabitQuestionCard'
import { cn } from '../../lib/utils'
import type { DiseaseHistoryAnswers } from './ElderDiseaseHistoryPage'
import type { LivingEnvironmentAnswers } from './ElderLivingEnvironmentPage'
import type { PainWalkingAnswers } from './ElderPainWalkingPage'
import type { SleepHabitAnswers } from './ElderSleepHabitPage'

export type SelfCareItem = 'meal' | 'toilet' | 'outing' | 'bathing' | 'medicine'
export type SelfCareLevel = 'help' | 'partial' | 'self'

export type SelfCareAnswers = Record<SelfCareItem, SelfCareLevel>

type SelfCareRouteState = {
  diseaseHistory?: DiseaseHistoryAnswers
  livingEnvironment?: LivingEnvironmentAnswers
  medicationHabit?: MedicationHabitAnswers
  painWalking?: PainWalkingAnswers
  selfCare?: SelfCareAnswers
  sleepHabit?: SleepHabitAnswers
}

const selfCareItems: Array<{
  imageClassName?: string
  imageSrc: string
  label: string
  value: SelfCareItem
}> = [
  {
    imageClassName:
      'h-[54px] w-[54px] min-[390px]:h-[62px] min-[390px]:w-[62px]',
    imageSrc: '/assets/dolbomon/elder-check/밥.png',
    label: '식사',
    value: 'meal',
  },
  {
    imageClassName:
      'h-[56px] w-[56px] min-[390px]:h-[64px] min-[390px]:w-[64px]',
    imageSrc: '/assets/dolbomon/elder-check/변기.png',
    label: '화장실',
    value: 'toilet',
  },
  {
    imageClassName:
      'h-[60px] w-[54px] min-[390px]:h-[70px] min-[390px]:w-[62px]',
    imageSrc: '/assets/dolbomon/elder-check/사람.png',
    label: '외출',
    value: 'outing',
  },
  {
    imageClassName:
      'h-[54px] w-[62px] min-[390px]:h-[62px] min-[390px]:w-[74px]',
    imageSrc: '/assets/dolbomon/elder-check/욕조.png',
    label: '목욕',
    value: 'bathing',
  },
  {
    imageClassName:
      'h-[58px] w-[58px] min-[390px]:h-[68px] min-[390px]:w-[68px]',
    imageSrc: '/assets/dolbomon/elder-check/알약.png',
    label: '약 챙기기',
    value: 'medicine',
  },
]

const selfCareLevels: Array<{
  label: string
  value: SelfCareLevel
}> = [
  { label: '도움', value: 'help' },
  { label: '일부', value: 'partial' },
  { label: '혼자', value: 'self' },
]

const defaultSelfCareAnswers: SelfCareAnswers = {
  bathing: 'help',
  meal: 'self',
  medicine: 'partial',
  outing: 'partial',
  toilet: 'self',
}

function getSelfCareRouteState(state: unknown): SelfCareRouteState {
  if (typeof state === 'object' && state !== null) {
    return state as SelfCareRouteState
  }

  return {}
}

function SelfCareProgress() {
  const currentStep = 6
  const totalSteps = 6
  const progressPercent = (currentStep / totalSteps) * 100

  return (
    <section aria-label="스스로 하기 진행률">
      <div className="flex items-end justify-between gap-3">
        <h1 className="whitespace-nowrap text-[34px] font-black leading-tight text-[#061844] min-[390px]:text-[38px] min-[430px]:text-[45px]">
          스스로 하시나요
        </h1>
        <p
          className="flex items-baseline gap-1.5 text-[29px] font-black leading-none min-[390px]:text-[33px] min-[430px]:gap-2 min-[430px]:text-[36px]"
          aria-label={`${currentStep} / ${totalSteps}`}
        >
          <span className="text-[#0867f2]">{currentStep}</span>
          <span className="text-[#8a909d]">/ {totalSteps}</span>
        </p>
      </div>

      <div
        className="mt-5 h-3.5 overflow-hidden rounded-full bg-[#edf0f5] min-[390px]:h-4"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={totalSteps}
        aria-valuenow={currentStep}
        aria-label={`총 ${totalSteps}단계 중 ${currentStep}단계`}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#2d86ff] to-[#0f74f5] shadow-[0_6px_14px_rgba(0,96,229,0.24)]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </section>
  )
}

export function ElderSelfCarePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const routeState = getSelfCareRouteState(location.state)
  const [selfCare, setSelfCare] = useState<SelfCareAnswers>({
    ...defaultSelfCareAnswers,
    ...routeState.selfCare,
  })

  function handleMenuClick() {
    // TODO: Open the senior onboarding menu when navigation items are defined.
    console.info('Senior check menu is not implemented yet.')
  }

  function handleLevelChange(item: SelfCareItem, level: SelfCareLevel) {
    setSelfCare((currentSelfCare) => ({
      ...currentSelfCare,
      [item]: level,
    }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // TODO: Replace route state with durable onboarding draft persistence.
    navigate('/elder/check/final-survey', {
      state: { ...routeState, selfCare },
    })
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#edf5ff] text-[#061844]">
      <section
        className="mx-auto flex min-h-svh w-full max-w-[480px] flex-col bg-white px-5 pb-[max(16px,env(safe-area-inset-bottom))] pt-[max(22px,env(safe-area-inset-top))] shadow-[0_20px_80px_rgba(55,104,184,0.08)] min-[390px]:px-6"
        aria-label="스스로 하기 입력 화면"
      >
        <header className="flex items-center justify-between">
          <Link
            to="/elder"
            className="inline-flex min-h-12 items-baseline rounded-md text-[#0867f2] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
            aria-label="돌봄ON 어르신 홈"
          >
            <span className="text-[29px] font-black leading-none min-[390px]:text-[34px]">
              돌봄
            </span>
            <span className="ml-1 text-[39px] font-black leading-none min-[390px]:text-[46px]">
              ON
            </span>
          </Link>

          <button
            className="inline-grid h-12 w-12 place-items-center rounded-md text-[#061844] transition active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
            type="button"
            aria-label="메뉴 열기"
            onClick={handleMenuClick}
          >
            <Menu aria-hidden="true" size={42} strokeWidth={2.8} />
          </button>
        </header>

        <form
          className="flex flex-1 flex-col pt-8 min-[390px]:pt-10"
          onSubmit={handleSubmit}
        >
          <SelfCareProgress />

          <fieldset className="mt-8 min-[390px]:mt-9">
            <legend className="mb-5 text-[25px] font-black leading-tight text-[#061844] min-[390px]:text-[28px]">
              각 항목을 3단계로 골라주세요
            </legend>

            <div className="grid gap-4 min-[390px]:gap-5">
              {selfCareItems.map((item) => (
                <section
                  key={item.value}
                  className="grid min-h-[112px] grid-cols-[58px_1fr] items-center gap-x-3 gap-y-4 rounded-[22px] border border-[#dfe5ef] bg-white px-4 py-4 shadow-[0_10px_22px_rgba(34,56,91,0.1)] min-[390px]:grid-cols-[56px_minmax(78px,92px)_minmax(0,1fr)] min-[390px]:gap-x-2.5 min-[390px]:rounded-[24px] min-[390px]:px-4 min-[430px]:grid-cols-[68px_minmax(92px,112px)_minmax(0,1fr)] min-[430px]:gap-x-4 min-[430px]:px-5"
                  aria-label={`${item.label} 도움 정도`}
                >
                  <img
                    src={item.imageSrc}
                    alt=""
                    width="1024"
                    height="1024"
                    className={cn(
                      'justify-self-center object-contain drop-shadow-[0_10px_15px_rgba(19,36,66,0.14)]',
                      item.imageClassName,
                    )}
                    aria-hidden="true"
                    draggable="false"
                  />
                  <h2 className="whitespace-nowrap text-[27px] font-black leading-none text-[#061844] min-[390px]:text-[25px] min-[430px]:text-[31px]">
                    {item.label}
                  </h2>

                  <div className="col-span-2 grid grid-cols-3 gap-2 min-[390px]:col-span-1 min-[390px]:gap-2.5">
                    {selfCareLevels.map((level) => {
                      const selected = selfCare[item.value] === level.value

                      return (
                        <button
                          key={level.value}
                          className={cn(
                            'min-h-[50px] whitespace-nowrap rounded-[20px] border-2 px-1 text-[22px] font-black leading-none shadow-[0_8px_16px_rgba(21,45,81,0.08)] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[56px] min-[390px]:rounded-[22px] min-[390px]:text-[20px] min-[430px]:text-[25px]',
                            selected
                              ? 'border-[#0876ff] bg-gradient-to-br from-[#147cff] to-[#0066f5] text-white shadow-[0_16px_28px_rgba(2,92,221,0.22)]'
                              : 'border-[#c7ceda] bg-white text-[#151b2a]',
                          )}
                          type="button"
                          aria-pressed={selected}
                          onClick={() =>
                            handleLevelChange(item.value, level.value)
                          }
                        >
                          {level.label}
                        </button>
                      )
                    })}
                  </div>
                </section>
              ))}
            </div>
          </fieldset>

          <div className="mt-auto pt-7">
            <button
              className="flex min-h-[70px] w-full items-center justify-center rounded-[20px] bg-gradient-to-br from-[#147cff] to-[#0066f5] px-6 text-[32px] font-black text-white shadow-[0_18px_30px_rgba(2,92,221,0.22)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[76px] min-[390px]:text-[36px]"
              type="submit"
            >
              다음
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}
