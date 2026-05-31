import { Menu } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const mainAssetBase = '/assets/dolbomon/main'
const recordCardBackgroundSrc = `${mainAssetBase}/배경.png`
const penImageSrc = `${mainAssetBase}/펜.png`
const microphoneImageSrc = `${mainAssetBase}/마이크.png`
const chatImageSrc = `${mainAssetBase}/채팅.png`

function getTodayLabel() {
  return new Intl.DateTimeFormat('ko-KR', {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
  }).format(new Date())
}

export function ElderHomePage() {
  const navigate = useNavigate()
  const todayLabel = getTodayLabel()

  function handleMenuClick() {
    navigate('/select-role')
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#edf5ff] text-[#061844]">
      <section
        className="mx-auto flex min-h-svh w-full max-w-[480px] flex-col bg-white px-5 pb-[max(24px,env(safe-area-inset-bottom))] pt-[max(28px,env(safe-area-inset-top))] shadow-[0_20px_80px_rgba(55,104,184,0.08)] min-[390px]:px-6 min-[430px]:px-7"
        aria-label="어르신 홈 화면"
      >
        <header className="flex items-start justify-between">
          <Link
            to="/elder"
            className="inline-flex min-h-12 items-baseline rounded-md text-[#0867f2] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
            aria-label="돌봄ON 어르신 홈"
          >
            <span className="text-[34px] font-black leading-none min-[390px]:text-[40px]">
              돌봄
            </span>
            <span className="ml-1 text-[44px] font-black leading-none min-[390px]:text-[52px]">
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

        <section className="pt-16 min-[390px]:pt-20" aria-labelledby="greeting">
          <p className="text-[27px] font-bold leading-none text-[#6a7280] min-[390px]:text-[32px]">
            {todayLabel}
          </p>
          <h1
            id="greeting"
            className="mt-9 text-[47px] font-black leading-[1.22] text-[#061844] min-[390px]:mt-10 min-[390px]:text-[55px] min-[430px]:text-[61px]"
          >
            안녕하세요,
            <br />
            <span className="whitespace-nowrap">
              길동 어르신 <span aria-hidden="true">👋</span>
            </span>
          </h1>
        </section>

        <section
          className="mt-12 overflow-hidden rounded-[28px] border border-[#cfe1fb] bg-[#f4f9ff] bg-cover bg-center px-6 pb-8 pt-10 shadow-[0_18px_34px_rgba(35,88,168,0.14)] min-[390px]:mt-14 min-[390px]:rounded-[30px] min-[390px]:px-7 min-[390px]:pb-9 min-[390px]:pt-12"
          style={{ backgroundImage: `url("${recordCardBackgroundSrc}")` }}
          aria-labelledby="record-title"
        >
          <h2
            id="record-title"
            className="whitespace-nowrap text-center text-[30px] font-black leading-tight text-[#061844] min-[390px]:text-[32px] min-[430px]:text-[45px]"
          >
            오늘 상태를 기록해요
          </h2>

          <ol
            className="mt-10 flex items-center justify-center gap-0"
            aria-label="오늘 기록 단계"
          >
            {[1, 2, 3, 4, 5].map((step) => (
              <li
                key={step}
                className="flex items-center gap-1 min-[430px]:gap-2"
              >
                <span
                  className={
                    step === 1
                      ? 'grid h-8 w-8 place-items-center rounded-full bg-[#0c78ff] text-[18px] font-black leading-none text-white shadow-[0_10px_18px_rgba(8,103,242,0.24)] min-[430px]:h-10 min-[430px]:w-10 min-[430px]:text-[22px]'
                      : 'grid h-8 w-8 place-items-center rounded-full bg-[#aeb8c6] text-[18px] font-black leading-none text-white shadow-[0_8px_15px_rgba(57,77,105,0.16)] min-[430px]:h-9 min-[430px]:w-9 min-[430px]:text-[20px]'
                  }
                >
                  {step}
                </span>
                {step < 5 ? (
                  <span
                    className="h-0.5 w-4 rounded-full border-t-2 border-dashed border-[#bfc8d5] min-[430px]:w-5"
                    aria-hidden="true"
                  />
                ) : null}
              </li>
            ))}
          </ol>

          <p className="mt-9 whitespace-nowrap text-center text-[21px] font-bold leading-tight text-[#6a7280] min-[390px]:text-[22px] min-[430px]:text-[32px]">
            식사 · 복약 · 통증 · 기분 · 수면
          </p>

          <Link
            to="/elder/check/medication"
            className="mt-10 flex min-h-[78px] w-full items-center justify-center gap-3 rounded-[999px] bg-gradient-to-br from-[#2d93ff] to-[#0068f2] px-4 text-white shadow-[0_18px_32px_rgba(2,92,221,0.24),inset_0_2px_0_rgba(255,255,255,0.26)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[88px] min-[430px]:gap-5 min-[430px]:px-5"
          >
            <img
              src={penImageSrc}
              alt=""
              width="1024"
              height="1024"
              className="h-[42px] w-[42px] shrink-0 object-contain min-[390px]:h-[48px] min-[390px]:w-[48px] min-[430px]:h-[58px] min-[430px]:w-[58px]"
              aria-hidden="true"
              draggable="false"
            />
            <span className="whitespace-nowrap text-[27px] font-black leading-none min-[390px]:text-[30px] min-[430px]:text-[39px]">
              오늘 기록 시작
            </span>
          </Link>
        </section>

        <section
          className="mt-8 grid grid-cols-2 gap-4 min-[390px]:mt-9 min-[390px]:gap-5"
          aria-label="어르신 안부 메뉴"
        >
          <Link
            to="/elder/check/medication"
            className="flex min-h-[216px] flex-col items-center justify-center rounded-[24px] border border-[#d8e2ee] bg-white px-3 py-6 text-center shadow-[0_12px_24px_rgba(31,74,128,0.1)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[260px] min-[390px]:rounded-[28px]"
          >
            <span className="grid h-[100px] w-[100px] place-items-center rounded-full bg-[#eaf6ff] shadow-[inset_0_0_0_2px_rgba(205,226,251,0.68)] min-[390px]:h-[124px] min-[390px]:w-[124px]">
              <img
                src={microphoneImageSrc}
                alt=""
                width="1024"
                height="1024"
                className="h-[76px] w-[76px] object-contain min-[390px]:h-[96px] min-[390px]:w-[96px]"
                aria-hidden="true"
                draggable="false"
              />
            </span>
            <strong className="mt-7 whitespace-nowrap text-[31px] font-black leading-none text-[#061844] min-[390px]:text-[38px]">
              음성으로
            </strong>
            <span className="mt-4 whitespace-nowrap text-[21px] font-bold leading-none text-[#6a7280] min-[390px]:text-[27px]">
              말로 답하기
            </span>
          </Link>

          <Link
            to="/elder/chat"
            className="flex min-h-[216px] flex-col items-center justify-center rounded-[24px] border border-[#d8e2ee] bg-white px-3 py-6 text-center shadow-[0_12px_24px_rgba(31,74,128,0.1)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[260px] min-[390px]:rounded-[28px]"
          >
            <span className="grid h-[100px] w-[100px] place-items-center rounded-full bg-[#eaf6ff] shadow-[inset_0_0_0_2px_rgba(205,226,251,0.68)] min-[390px]:h-[124px] min-[390px]:w-[124px]">
              <img
                src={chatImageSrc}
                alt=""
                width="1024"
                height="1024"
                className="h-[76px] w-[76px] object-contain min-[390px]:h-[96px] min-[390px]:w-[96px]"
                aria-hidden="true"
                draggable="false"
              />
            </span>
            <strong className="mt-7 whitespace-nowrap text-[31px] font-black leading-none text-[#061844] min-[390px]:text-[38px]">
              말동무
            </strong>
            <span className="mt-4 whitespace-nowrap text-[21px] font-bold leading-none text-[#6a7280] min-[390px]:text-[27px]">
              AI 안부
            </span>
          </Link>
        </section>
      </section>
    </main>
  )
}
