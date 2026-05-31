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
        className="mx-auto flex min-h-svh w-full max-w-[480px] flex-col bg-white px-5 pb-[max(14px,env(safe-area-inset-bottom))] pt-[max(18px,env(safe-area-inset-top))] shadow-[0_20px_80px_rgba(55,104,184,0.08)] min-[390px]:px-6 min-[430px]:px-7"
        aria-label="어르신 홈 화면"
      >
        <header className="flex items-start justify-between">
          <Link
            to="/elder"
            className="inline-flex min-h-10 items-baseline rounded-md text-[#0867f2] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
            aria-label="돌봄ON 어르신 홈"
          >
            <span className="text-[31px] font-black leading-none min-[390px]:text-[34px]">
              돌봄
            </span>
            <span className="ml-1 text-[40px] font-black leading-none min-[390px]:text-[44px]">
              ON
            </span>
          </Link>

          <button
            className="inline-grid h-10 w-10 place-items-center rounded-md text-[#061844] transition active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
            type="button"
            aria-label="메뉴 열기"
            onClick={handleMenuClick}
          >
            <Menu aria-hidden="true" size={36} strokeWidth={2.8} />
          </button>
        </header>

        <section className="pt-10 min-[390px]:pt-11" aria-labelledby="greeting">
          <p className="text-[22px] font-bold leading-none text-[#6a7280] min-[390px]:text-[24px]">
            {todayLabel}
          </p>
          <h1
            id="greeting"
            className="mt-5 text-[39px] font-black leading-[1.15] text-[#061844] min-[390px]:text-[42px]"
          >
            안녕하세요,
            <br />
            <span className="whitespace-nowrap">
              길동 어르신 <span aria-hidden="true">👋</span>
            </span>
          </h1>
        </section>

        <section
          className="mt-8 overflow-hidden rounded-[26px] bg-[#f4f9ff] bg-no-repeat px-4 pb-5 pt-6 shadow-[0_18px_34px_rgba(35,88,168,0.14)] min-[390px]:px-5 min-[390px]:pb-6 min-[390px]:pt-7"
          style={{
            backgroundImage: `url("${recordCardBackgroundSrc}")`,
            backgroundPosition: 'center',
            backgroundSize: '100% 100%',
          }}
          aria-labelledby="record-title"
        >
          <h2
            id="record-title"
            className="whitespace-nowrap text-center text-[28px] font-black leading-tight text-[#061844] min-[390px]:text-[31px]"
          >
            오늘 상태를 기록해요
          </h2>

          <ol
            className="mt-7 flex items-center justify-center gap-0"
            aria-label="오늘 기록 단계"
          >
            {[1, 2, 3, 4, 5].map((step) => (
              <li key={step} className="flex items-center gap-1">
                <span
                  className={
                    step === 1
                      ? 'grid h-7 w-7 place-items-center rounded-full bg-[#0c78ff] text-[16px] font-black leading-none text-white shadow-[0_10px_18px_rgba(8,103,242,0.24)] min-[390px]:h-8 min-[390px]:w-8 min-[390px]:text-[18px]'
                      : 'grid h-7 w-7 place-items-center rounded-full bg-[#aeb8c6] text-[16px] font-black leading-none text-white shadow-[0_8px_15px_rgba(57,77,105,0.16)] min-[390px]:h-8 min-[390px]:w-8 min-[390px]:text-[18px]'
                  }
                >
                  {step}
                </span>
                {step < 5 ? (
                  <span
                    className="h-0.5 w-3 rounded-full border-t-2 border-dashed border-[#bfc8d5] min-[390px]:w-4"
                    aria-hidden="true"
                  />
                ) : null}
              </li>
            ))}
          </ol>

          <p className="mt-6 whitespace-nowrap text-center text-[19px] font-bold leading-tight text-[#6a7280] min-[390px]:text-[21px]">
            식사 · 복약 · 통증 · 기분 · 수면
          </p>

          <Link
            to="/elder/check/medication"
            className="mt-6 flex min-h-[64px] w-full items-center justify-center gap-2 rounded-[999px] bg-gradient-to-br from-[#2d93ff] to-[#0068f2] px-4 text-white shadow-[0_18px_32px_rgba(2,92,221,0.24),inset_0_2px_0_rgba(255,255,255,0.26)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[70px] min-[390px]:gap-3"
          >
            <img
              src={penImageSrc}
              alt=""
              width="1024"
              height="1024"
              className="h-[34px] w-[34px] shrink-0 object-contain min-[390px]:h-[40px] min-[390px]:w-[40px]"
              aria-hidden="true"
              draggable="false"
            />
            <span className="whitespace-nowrap text-[25px] font-black leading-none min-[390px]:text-[28px]">
              오늘 기록 시작
            </span>
          </Link>
        </section>

        <section
          className="mt-4 grid grid-cols-2 gap-3 min-[390px]:gap-4"
          aria-label="어르신 안부 메뉴"
        >
          <Link
            to="/elder/voice"
            className="flex min-h-[162px] flex-col items-center justify-center rounded-[22px] border border-[#d8e2ee] bg-white px-2 py-4 text-center shadow-[0_12px_24px_rgba(31,74,128,0.1)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[178px] min-[390px]:rounded-[24px]"
          >
            <span className="grid h-[74px] w-[74px] place-items-center rounded-full bg-[#eaf6ff] shadow-[inset_0_0_0_2px_rgba(205,226,251,0.68)] min-[390px]:h-[82px] min-[390px]:w-[82px]">
              <img
                src={microphoneImageSrc}
                alt=""
                width="1024"
                height="1024"
                className="h-[56px] w-[56px] object-contain min-[390px]:h-[64px] min-[390px]:w-[64px]"
                aria-hidden="true"
                draggable="false"
              />
            </span>
            <strong className="mt-4 whitespace-nowrap text-[26px] font-black leading-none text-[#061844] min-[390px]:text-[29px]">
              음성으로
            </strong>
            <span className="mt-2 whitespace-nowrap text-[18px] font-bold leading-none text-[#6a7280] min-[390px]:text-[20px]">
              말로 답하기
            </span>
          </Link>

          <Link
            to="/elder/chat"
            className="flex min-h-[162px] flex-col items-center justify-center rounded-[22px] border border-[#d8e2ee] bg-white px-2 py-4 text-center shadow-[0_12px_24px_rgba(31,74,128,0.1)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[178px] min-[390px]:rounded-[24px]"
          >
            <span className="grid h-[74px] w-[74px] place-items-center rounded-full bg-[#eaf6ff] shadow-[inset_0_0_0_2px_rgba(205,226,251,0.68)] min-[390px]:h-[82px] min-[390px]:w-[82px]">
              <img
                src={chatImageSrc}
                alt=""
                width="1024"
                height="1024"
                className="h-[56px] w-[56px] object-contain min-[390px]:h-[64px] min-[390px]:w-[64px]"
                aria-hidden="true"
                draggable="false"
              />
            </span>
            <strong className="mt-4 whitespace-nowrap text-[26px] font-black leading-none text-[#061844] min-[390px]:text-[29px]">
              말동무
            </strong>
            <span className="mt-2 whitespace-nowrap text-[18px] font-bold leading-none text-[#6a7280] min-[390px]:text-[20px]">
              AI 안부
            </span>
          </Link>
        </section>
      </section>
    </main>
  )
}
