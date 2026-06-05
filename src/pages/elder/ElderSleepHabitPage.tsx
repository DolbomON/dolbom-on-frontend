import { Check, Menu } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import type { MedicationHabitAnswers } from '../../components/elder-check/MedicationHabitQuestionCard'
import { cn } from '../../lib/utils'
import type { DiseaseHistoryAnswers } from './ElderDiseaseHistoryPage'
import type { PainWalkingAnswers } from './ElderPainWalkingPage'

export type SleepDuration =
  | 'under_four'
  | 'four_to_six'
  | 'six_to_eight'
  | 'eight_or_more'

export type SleepConcern = 'nap' | 'wakes_often' | 'hard_to_fall_asleep'

export type SleepHabitAnswers = {
  concerns: SleepConcern[]
  duration: SleepDuration
}

type SleepHabitRouteState = {
  diseaseHistory?: DiseaseHistoryAnswers
  medicationHabit?: MedicationHabitAnswers
  painWalking?: PainWalkingAnswers
  sleepHabit?: SleepHabitAnswers
}

type SleepDurationOption = {
  label: string
  value: SleepDuration
}

const clockSelectedImageSrc = '/assets/dolbomon/elder-check/시계_선택.png'
const clockUnselectedImageSrc = '/assets/dolbomon/elder-check/시계_미선택.png'

const durationOptions: SleepDurationOption[] = [
  { label: '4시간 미만', value: 'under_four' },
  { label: '4~6시간', value: 'four_to_six' },
  { label: '6~8시간', value: 'six_to_eight' },
  { label: '8시간 이상', value: 'eight_or_more' },
]

const concernOptions: Array<{
  label: string
  value: SleepConcern
}> = [
  { label: '낮잠 잠', value: 'nap' },
  { label: '자주 깸', value: 'wakes_often' },
  { label: '잠들기 어려움', value: 'hard_to_fall_asleep' },
]

function getSleepHabitRouteState(state: unknown): SleepHabitRouteState {
  if (typeof state === 'object' && state !== null) {
    return state as SleepHabitRouteState
  }

  return {}
}

function SleepHabitProgress() {
  const currentStep = 4
  const totalSteps = 6
  const progressPercent = (currentStep / totalSteps) * 100

  return (
    <section aria-label="수면 습관 진행률">
      <div className="flex items-end justify-between gap-4">
        <h1 className="text-[39px] font-black leading-tight text-[#061844] min-[390px]:text-[46px]">
          잠은 어떠세요
        </h1>
        <p
          className="flex items-baseline gap-2 text-[31px] font-black leading-none min-[390px]:text-[36px]"
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

export function ElderSleepHabitPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const routeState = getSleepHabitRouteState(location.state)
  const [duration, setDuration] = useState<SleepDuration>(
    routeState.sleepHabit?.duration ?? 'four_to_six',
  )
  const [concerns, setConcerns] = useState<SleepConcern[]>(
    routeState.sleepHabit?.concerns ?? ['nap', 'wakes_often'],
  )

  function handleMenuClick() {
    navigate('/elder/mypage')
  }

  function handleConcernToggle(concern: SleepConcern) {
    setConcerns((currentConcerns) =>
      currentConcerns.includes(concern)
        ? currentConcerns.filter((currentConcern) => currentConcern !== concern)
        : [...currentConcerns, concern],
    )
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const sleepHabit: SleepHabitAnswers = {
      concerns,
      duration,
    }

    // TODO: Replace route state with durable onboarding draft persistence.
    navigate('/elder/check/living-environment', {
      state: { ...routeState, sleepHabit },
    })
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#edf5ff] text-[#061844]">
      <section
        className="mx-auto flex min-h-svh w-full max-w-[480px] flex-col bg-white px-5 pb-[max(14px,env(safe-area-inset-bottom))] pt-[max(20px,env(safe-area-inset-top))] shadow-[0_20px_80px_rgba(55,104,184,0.08)] min-[390px]:px-6"
        aria-label="수면 습관 입력 화면"
      >
        <header className="flex items-center justify-between">
          <Link
            to="/elder"
            className="inline-flex min-h-12 items-baseline rounded-md text-[#0867f2] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
            aria-label="돌봄온 어르신 홈"
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
            aria-label="마이페이지 열기"
            onClick={handleMenuClick}
          >
            <Menu aria-hidden="true" size={42} strokeWidth={2.8} />
          </button>
        </header>

        <form
          className="flex flex-1 flex-col pt-8 min-[390px]:pt-10"
          onSubmit={handleSubmit}
        >
          <SleepHabitProgress />

          <fieldset className="mt-8 min-[390px]:mt-10">
            <legend className="mb-4 text-[25px] font-black leading-tight text-[#061844] min-[390px]:text-[28px]">
              평소 몇 시간 주무세요?
            </legend>

            <div className="grid grid-cols-2 gap-4">
              {durationOptions.map((option) => {
                const selected = duration === option.value

                return (
                  <button
                    key={option.value}
                    className={cn(
                      'flex min-h-[132px] flex-col items-center justify-center rounded-[24px] border-2 px-3 py-4 font-black shadow-[0_12px_20px_rgba(23,48,85,0.1)] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[150px]',
                      selected
                        ? 'border-[#0876ff] bg-gradient-to-br from-[#147cff] to-[#0066f5] text-white shadow-[0_16px_28px_rgba(2,92,221,0.24)]'
                        : 'border-[#d9e1ec] bg-white text-[#061844]',
                    )}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setDuration(option.value)}
                  >
                    <img
                      src={
                        selected
                          ? clockSelectedImageSrc
                          : clockUnselectedImageSrc
                      }
                      alt=""
                      width="1024"
                      height="1024"
                      className={cn(
                        'mb-3 h-[58px] w-[58px] object-contain drop-shadow-[0_10px_15px_rgba(19,36,66,0.18)] min-[390px]:h-[70px] min-[390px]:w-[70px]',
                        selected && 'rounded-full',
                      )}
                      aria-hidden="true"
                      draggable="false"
                    />
                    <span className="text-[29px] font-black leading-none min-[390px]:text-[34px]">
                      {option.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </fieldset>

          <fieldset className="mt-8 min-[390px]:mt-10">
            <legend className="mb-4 text-[25px] font-black leading-tight text-[#061844] min-[390px]:text-[28px]">
              잠과 관련해 (복수)
            </legend>

            <div className="grid grid-cols-2 gap-3 min-[390px]:gap-4">
              {concernOptions.map((option) => {
                const selected = concerns.includes(option.value)

                return (
                  <button
                    key={option.value}
                    className={cn(
                      'flex min-h-[58px] items-center justify-center gap-2 rounded-[999px] border-2 px-4 font-black shadow-[0_10px_18px_rgba(23,48,85,0.1)] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[64px]',
                      selected
                        ? 'border-[#0876ff] bg-gradient-to-br from-[#147cff] to-[#0066f5] text-white shadow-[0_16px_28px_rgba(2,92,221,0.24)]'
                        : 'border-[#b8c1cf] bg-white text-[#061844]',
                      option.value === 'hard_to_fall_asleep' && 'col-span-2',
                    )}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => handleConcernToggle(option.value)}
                  >
                    <span
                      className={cn(
                        'grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 min-[390px]:h-9 min-[390px]:w-9',
                        selected
                          ? 'border-white bg-white text-[#0e72f8]'
                          : 'border-[#b8c1cf] bg-white text-transparent',
                      )}
                      aria-hidden="true"
                    >
                      <Check size={22} strokeWidth={3.4} />
                    </span>
                    <span className="whitespace-nowrap text-[21px] font-black leading-none min-[390px]:text-[25px]">
                      {option.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </fieldset>

          <div className="mt-auto pt-8">
            <button
              className="flex min-h-[66px] w-full items-center justify-center rounded-[18px] bg-gradient-to-br from-[#147cff] to-[#0066f5] px-6 font-black text-white shadow-[0_18px_30px_rgba(2,92,221,0.22)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[72px] min-[390px]:rounded-[20px]"
              type="submit"
            >
              <span className="text-[30px] font-black leading-none min-[390px]:text-[34px]">
                다음
              </span>
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}
