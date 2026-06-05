import { Menu } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import type { MedicationHabitAnswers } from '../../components/elder-check/MedicationHabitQuestionCard'
import { cn } from '../../lib/utils'
import type { DiseaseHistoryAnswers } from './ElderDiseaseHistoryPage'
import type { PainWalkingAnswers } from './ElderPainWalkingPage'
import type { SleepHabitAnswers } from './ElderSleepHabitPage'

export type Cohabitant = 'alone' | 'family'
export type HousingType = 'apartment' | 'detached' | 'rental' | 'other'
export type EmergencyFamilyContact = 'yes' | 'no'

export type LivingEnvironmentAnswers = {
  cohabitant: Cohabitant
  emergencyFamilyContact: EmergencyFamilyContact
  housingType: HousingType
}

type LivingEnvironmentRouteState = {
  diseaseHistory?: DiseaseHistoryAnswers
  livingEnvironment?: LivingEnvironmentAnswers
  medicationHabit?: MedicationHabitAnswers
  painWalking?: PainWalkingAnswers
  sleepHabit?: SleepHabitAnswers
}

const aloneImageSrc = '/assets/dolbomon/elder-check/혼자.png'
const familyImageSrc = '/assets/dolbomon/elder-check/같이.png'

const cohabitantOptions: Array<{
  imageSrc: string
  label: string
  value: Cohabitant
}> = [
  { imageSrc: aloneImageSrc, label: '혼자', value: 'alone' },
  { imageSrc: familyImageSrc, label: '가족과', value: 'family' },
]

const housingOptions: Array<{
  label: string
  value: HousingType
}> = [
  { label: '아파트', value: 'apartment' },
  { label: '단독주택', value: 'detached' },
  { label: '임대', value: 'rental' },
  { label: '기타', value: 'other' },
]

const emergencyContactOptions: Array<{
  label: string
  value: EmergencyFamilyContact
}> = [
  { label: '있어요', value: 'yes' },
  { label: '없어요', value: 'no' },
]

function getLivingEnvironmentRouteState(
  state: unknown,
): LivingEnvironmentRouteState {
  if (typeof state === 'object' && state !== null) {
    return state as LivingEnvironmentRouteState
  }

  return {}
}

function LivingEnvironmentProgress() {
  const currentStep = 5
  const totalSteps = 6
  const progressPercent = (currentStep / totalSteps) * 100

  return (
    <section aria-label="생활 환경 진행률">
      <div className="flex items-end justify-between gap-4">
        <h1 className="text-[40px] font-black leading-tight text-[#061844] min-[390px]:text-[47px]">
          생활 환경
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

export function ElderLivingEnvironmentPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const routeState = getLivingEnvironmentRouteState(location.state)
  const [cohabitant, setCohabitant] = useState<Cohabitant>(
    routeState.livingEnvironment?.cohabitant ?? 'alone',
  )
  const [housingType, setHousingType] = useState<HousingType>(
    routeState.livingEnvironment?.housingType ?? 'detached',
  )
  const [emergencyFamilyContact, setEmergencyFamilyContact] =
    useState<EmergencyFamilyContact>(
      routeState.livingEnvironment?.emergencyFamilyContact ?? 'yes',
    )

  function handleMenuClick() {
    navigate('/elder/mypage')
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const livingEnvironment: LivingEnvironmentAnswers = {
      cohabitant,
      emergencyFamilyContact,
      housingType,
    }

    // TODO: Replace route state with durable onboarding draft persistence.
    navigate('/elder/check/self-care', {
      state: { ...routeState, livingEnvironment },
    })
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#edf5ff] text-[#061844]">
      <section
        className="mx-auto flex min-h-svh w-full max-w-[480px] flex-col bg-white px-5 pb-[max(14px,env(safe-area-inset-bottom))] pt-[max(20px,env(safe-area-inset-top))] shadow-[0_20px_80px_rgba(55,104,184,0.08)] min-[390px]:px-6"
        aria-label="생활 환경 입력 화면"
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
          <LivingEnvironmentProgress />

          <fieldset className="mt-8 min-[390px]:mt-9">
            <legend className="mb-4 text-[25px] font-black leading-tight text-[#333333] min-[390px]:text-[28px]">
              지금 누구와 사세요?
            </legend>

            <div className="grid grid-cols-2 gap-4">
              {cohabitantOptions.map((option) => {
                const selected = cohabitant === option.value

                return (
                  <button
                    key={option.value}
                    className={cn(
                      'flex min-h-[166px] flex-col items-center justify-center rounded-[24px] border-2 px-3 py-4 font-black shadow-[0_12px_20px_rgba(23,48,85,0.1)] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[184px]',
                      selected
                        ? 'border-[#0876ff] bg-gradient-to-br from-[#147cff] to-[#0066f5] text-white shadow-[0_16px_28px_rgba(2,92,221,0.24)]'
                        : 'border-[#d9e1ec] bg-white text-[#061844]',
                    )}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setCohabitant(option.value)}
                  >
                    <img
                      src={option.imageSrc}
                      alt=""
                      width="1024"
                      height="1024"
                      className={cn(
                        'mb-4 h-[82px] w-[96px] object-contain drop-shadow-[0_10px_15px_rgba(19,36,66,0.14)] min-[390px]:h-[96px] min-[390px]:w-[118px]',
                        option.value === 'family' &&
                          'h-[88px] w-[118px] min-[390px]:h-[104px] min-[390px]:w-[138px]',
                      )}
                      aria-hidden="true"
                      draggable="false"
                    />
                    <span className="text-[34px] font-black leading-none min-[390px]:text-[40px]">
                      {option.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </fieldset>

          <fieldset className="mt-7 min-[390px]:mt-8">
            <legend className="mb-4 text-[25px] font-black leading-tight text-[#333333] min-[390px]:text-[28px]">
              주거 형태
            </legend>

            <div className="grid grid-cols-2 gap-3 min-[390px]:gap-4">
              {housingOptions.map((option) => {
                const selected = housingType === option.value

                return (
                  <button
                    key={option.value}
                    className={cn(
                      'min-h-[58px] rounded-[999px] border-2 px-3 font-black shadow-[0_10px_18px_rgba(23,48,85,0.09)] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[64px] min-[390px]:px-4',
                      selected
                        ? 'border-[#0876ff] bg-gradient-to-br from-[#147cff] to-[#0066f5] text-white shadow-[0_16px_28px_rgba(2,92,221,0.24)]'
                        : 'border-[#d9e1ec] bg-white text-[#666666]',
                    )}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setHousingType(option.value)}
                  >
                    <span className="whitespace-nowrap text-[26px] font-black leading-none min-[390px]:text-[30px]">
                      {option.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </fieldset>

          <fieldset className="mt-7 min-[390px]:mt-8">
            <legend className="mb-4 text-[25px] font-black leading-tight text-[#333333] min-[390px]:text-[28px]">
              급할 때 연락할 가족이 있나요?
            </legend>

            <div className="grid grid-cols-2 gap-4">
              {emergencyContactOptions.map((option) => {
                const selected = emergencyFamilyContact === option.value

                return (
                  <button
                    key={option.value}
                    className={cn(
                      'min-h-[82px] rounded-[22px] border-2 px-3 font-black shadow-[0_12px_20px_rgba(23,48,85,0.1)] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[92px] min-[390px]:rounded-[24px]',
                      selected
                        ? option.value === 'yes'
                          ? 'border-[#0876ff] bg-gradient-to-br from-[#147cff] to-[#0066f5] text-white shadow-[0_16px_28px_rgba(2,92,221,0.24)]'
                          : 'border-[#efc676] bg-[#fff8e8] text-[#a87508] shadow-[0_14px_24px_rgba(168,117,8,0.12)]'
                        : option.value === 'yes'
                          ? 'border-[#d9e1ec] bg-white text-[#061844]'
                          : 'border-[#efc676] bg-[#fff8e8] text-[#a87508]',
                    )}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setEmergencyFamilyContact(option.value)}
                  >
                    <span className="text-[34px] font-black leading-none min-[390px]:text-[40px]">
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
