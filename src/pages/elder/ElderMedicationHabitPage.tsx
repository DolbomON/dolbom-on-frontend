import { Menu } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  MedicationHabitQuestionCard,
  type MedicationFrequency,
  type MedicationHabitAnswers,
  type MedicationHelp,
  type MedicationTime,
} from '../../components/elder-check/MedicationHabitQuestionCard'

type MedicationHabitRouteState = {
  medicationHabit?: MedicationHabitAnswers
}

function getMedicationHabitRouteState(
  state: unknown,
): MedicationHabitRouteState {
  if (typeof state === 'object' && state !== null) {
    return state as MedicationHabitRouteState
  }

  return {}
}

function HabitProgress() {
  const currentStep = 1
  const totalSteps = 6
  const progressPercent = (currentStep / totalSteps) * 100

  return (
    <section aria-label="복약 습관 진행률">
      <div className="flex items-end justify-between gap-4">
        <h1 className="text-[40px] font-black leading-none text-[#061844] min-[390px]:text-[46px]">
          복약 습관
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

export function ElderMedicationHabitPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const routeState = getMedicationHabitRouteState(location.state)
  const [frequency, setFrequency] = useState<MedicationFrequency>(
    routeState.medicationHabit?.frequency ?? 'twice',
  )
  const [selectedTimes, setSelectedTimes] = useState<MedicationTime[]>(
    routeState.medicationHabit?.times ?? ['morning', 'evening'],
  )
  const [assistance, setAssistance] = useState<MedicationHelp>(
    routeState.medicationHabit?.assistance ?? 'self',
  )

  function handleMenuClick() {
    navigate('/elder/mypage')
  }

  function handleTimeToggle(time: MedicationTime) {
    setSelectedTimes((currentTimes) =>
      currentTimes.includes(time)
        ? currentTimes.filter((currentTime) => currentTime !== time)
        : [...currentTimes, time],
    )
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const medicationHabit: MedicationHabitAnswers = {
      assistance,
      frequency,
      times: selectedTimes,
    }

    // TODO: Replace route state with durable onboarding draft persistence.
    navigate('/elder/check/disease-history', {
      state: { ...routeState, medicationHabit },
    })
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#edf5ff] text-[#061844]">
      <section
        className="mx-auto flex min-h-svh w-full max-w-[480px] flex-col bg-white px-5 pb-[max(22px,env(safe-area-inset-bottom))] pt-[max(26px,env(safe-area-inset-top))] shadow-[0_20px_80px_rgba(55,104,184,0.08)] min-[390px]:px-6"
        aria-label="복약 습관 입력 화면"
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
          className="flex flex-1 flex-col pt-6 min-[390px]:pt-8"
          onSubmit={handleSubmit}
        >
          <HabitProgress />

          <MedicationHabitQuestionCard
            assistance={assistance}
            frequency={frequency}
            selectedTimes={selectedTimes}
            onAssistanceChange={setAssistance}
            onFrequencyChange={setFrequency}
            onTimeToggle={handleTimeToggle}
          />

          <div className="mt-auto pt-7">
            <button
              className="flex min-h-[72px] w-full items-center justify-center rounded-[22px] bg-gradient-to-br from-[#147cff] to-[#0066f5] px-6 text-[33px] font-black text-white shadow-[0_18px_30px_rgba(2,92,221,0.22)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[78px] min-[390px]:text-[38px]"
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
