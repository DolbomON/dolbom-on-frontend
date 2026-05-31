import {
  Accessibility,
  HeartPulse,
  House,
  Menu,
  Moon,
  Pill,
  Smile,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const checklistImageSrc = '/assets/dolbomon/elder-check/checklist.png'

const checkCategories = [
  {
    icon: Pill,
    label: '복약',
  },
  {
    icon: HeartPulse,
    label: '질환',
  },
  {
    icon: Accessibility,
    label: '통증',
  },
  {
    icon: Moon,
    label: '수면',
  },
  {
    icon: House,
    label: '생활',
  },
  {
    icon: Smile,
    label: '정서',
  },
]

export function ElderCheckPage() {
  const navigate = useNavigate()

  function handleMenuClick() {
    // TODO: Open the senior onboarding menu when navigation items are defined.
    console.info('Senior check menu is not implemented yet.')
  }

  function handleStartClick() {
    navigate('/elder/check/medication-habit')
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#edf5ff] text-[#061844]">
      <section
        className="mx-auto flex min-h-svh w-full max-w-[480px] flex-col bg-white px-5 pb-[max(16px,env(safe-area-inset-bottom))] pt-[max(22px,env(safe-area-inset-top))] shadow-[0_20px_80px_rgba(55,104,184,0.08)] min-[390px]:px-6"
        aria-label="오늘 상태 입력 시작 안내 화면"
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
            aria-label="메뉴 열기"
            onClick={handleMenuClick}
          >
            <Menu aria-hidden="true" size={42} strokeWidth={2.8} />
          </button>
        </header>

        <div className="flex flex-1 flex-col items-center">
          <img
            src={checklistImageSrc}
            alt=""
            width="1536"
            height="1024"
            className="mt-7 h-[168px] w-full max-w-[310px] object-contain drop-shadow-[0_18px_28px_rgba(39,83,152,0.12)] min-[390px]:mt-8 min-[390px]:h-[190px] min-[390px]:max-w-[352px]"
            aria-hidden="true"
            draggable="false"
          />

          <section className="mt-4 text-center" aria-labelledby="check-intro">
            <h1
              id="check-intro"
              className="text-[40px] font-black leading-[1.1] text-[#061844] min-[390px]:text-[45px]"
              aria-label="처음 한 번만 여쭤볼게요"
            >
              처음 한 번만
              <br />
              여쭤볼게요
            </h1>

            <p className="mt-5 text-[24px] font-bold leading-[1.38] text-[#5a6572] min-[390px]:text-[26px]">
              평소 건강·생활 습관을
              <br />
              6가지로 나눠 묻습니다.
              <br />
              2~3분이면 끝나요.
            </p>
          </section>

          <ul
            className="mt-6 grid w-full grid-cols-3 gap-3 min-[390px]:gap-4"
            aria-label="확인할 건강 생활 항목"
          >
            {checkCategories.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex min-h-[50px] items-center justify-center gap-1.5 rounded-[22px] border-2 border-[#a9cbff] bg-white px-2 text-[18px] font-black text-[#071634] shadow-[0_10px_22px_rgba(38,100,210,0.06)] min-[390px]:min-h-[54px] min-[390px]:text-[20px]"
              >
                <Icon
                  className="h-[26px] w-[26px] shrink-0 text-[#2078ff] min-[390px]:h-7 min-[390px]:w-7"
                  aria-hidden="true"
                  strokeWidth={2.8}
                />
                <span className="whitespace-nowrap">{label}</span>
              </li>
            ))}
          </ul>

          <button
            className="mt-6 flex min-h-[72px] w-full items-center justify-center rounded-[22px] bg-gradient-to-br from-[#117cff] to-[#0065f5] px-6 text-[33px] font-black text-white shadow-[0_20px_34px_rgba(2,92,221,0.22)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[76px] min-[390px]:text-[36px]"
            type="button"
            onClick={handleStartClick}
          >
            <span className="text-[33px] font-black leading-none min-[390px]:text-[36px]">
              시작하기
            </span>
          </button>
        </div>
      </section>
    </main>
  )
}
