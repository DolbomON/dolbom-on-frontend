import { Heart, Menu, MessageCircle, Mic, PenLine } from 'lucide-react'
import { Link } from 'react-router-dom'

function getTodayLabel() {
  return new Intl.DateTimeFormat('ko-KR', {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
  }).format(new Date())
}

export function ElderHomePage() {
  const todayLabel = getTodayLabel()

  function handleMenuClick() {
    // TODO: Open the senior home menu when navigation items are defined.
    console.info('Senior home menu is not implemented yet.')
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#edf5ff] text-[#061844]">
      <section
        className="mx-auto flex min-h-svh w-full max-w-[480px] flex-col bg-white px-5 pb-[max(24px,env(safe-area-inset-bottom))] pt-[max(24px,env(safe-area-inset-top))] shadow-[0_20px_80px_rgba(55,104,184,0.08)] min-[390px]:px-6"
        aria-label="어르신 홈 화면"
      >
        <header className="flex items-start justify-between">
          <Link
            to="/elder"
            className="inline-flex min-h-12 items-center rounded-md text-[#0867f2] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
            aria-label="돌봄ON 어르신 홈"
          >
            <span className="text-[29px] font-black leading-none min-[390px]:text-[34px]">
              돌봄
            </span>
            <span className="relative ml-1 inline-grid h-[34px] w-[34px] place-items-center rounded-full bg-[#0867f2] align-middle shadow-[0_8px_14px_rgba(8,103,242,0.14)] min-[390px]:h-[39px] min-[390px]:w-[39px]">
              <Heart
                aria-hidden="true"
                className="h-[18px] w-[18px] text-white min-[390px]:h-[21px] min-[390px]:w-[21px]"
                fill="currentColor"
                strokeWidth={0}
              />
            </span>
            <span className="ml-0.5 text-[38px] font-black leading-none min-[390px]:text-[45px]">
              N
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

        <section className="pt-14 min-[390px]:pt-16" aria-labelledby="greeting">
          <p className="text-[27px] font-bold leading-none text-[#6a7280] min-[390px]:text-[30px]">
            {todayLabel}
          </p>
          <h1
            id="greeting"
            className="mt-9 text-[45px] font-black leading-[1.2] text-[#061844] min-[390px]:mt-10 min-[390px]:text-[50px] min-[430px]:text-[57px]"
          >
            안녕하세요,
            <br />
            <span className="whitespace-nowrap">
              길동 어르신 <span aria-hidden="true">👋</span>
            </span>
          </h1>
        </section>

        <section
          className="mt-12 overflow-hidden rounded-[28px] border border-[#d6e1ee] bg-[radial-gradient(circle_at_96%_56%,rgba(219,241,255,0.88)_0_15%,transparent_38%),linear-gradient(135deg,#f8fcff_0%,#eef8ff_100%)] p-6 shadow-[0_14px_28px_rgba(31,74,128,0.12)] min-[390px]:mt-14 min-[390px]:rounded-[30px] min-[390px]:p-7 min-[430px]:p-8"
          aria-labelledby="record-title"
        >
          <h2
            id="record-title"
            className="whitespace-nowrap text-center text-[30px] font-black leading-tight text-[#061844] min-[390px]:text-[32px] min-[430px]:text-[45px]"
          >
            오늘 상태를 기록해요
          </h2>

          <div
            className="mt-8 flex items-center gap-5 min-[390px]:mt-9 min-[390px]:gap-6"
            aria-label="오늘 기록 항목 진행 상태"
          >
            <span className="h-5 w-5 rounded-full bg-[#0c78ff] min-[390px]:h-6 min-[390px]:w-6" />
            {[1, 2, 3, 4].map((dot) => (
              <span
                key={dot}
                className="h-5 w-5 rounded-full bg-[#c9d4e1] min-[390px]:h-6 min-[390px]:w-6"
              />
            ))}
          </div>

          <p className="mt-8 whitespace-nowrap text-[22px] font-bold leading-tight text-[#6a7280] min-[390px]:mt-10 min-[390px]:text-[24px] min-[430px]:text-[30px]">
            식사 · 복약 · 통증 · 기분 · 수면
          </p>

          <Link
            to="/elder/check/medication"
            className="mt-9 flex min-h-[74px] w-full items-center justify-center gap-3 rounded-[26px] bg-gradient-to-br from-[#2d93ff] to-[#0068f2] px-5 text-white shadow-[0_18px_32px_rgba(2,92,221,0.24)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:mt-10 min-[390px]:min-h-[84px] min-[390px]:gap-4 min-[390px]:rounded-[30px] min-[430px]:gap-5"
          >
            <PenLine
              aria-hidden="true"
              className="h-9 w-9 shrink-0 min-[390px]:h-11 min-[390px]:w-11"
              strokeWidth={3}
            />
            <span className="whitespace-nowrap text-[29px] font-black leading-none min-[390px]:text-[32px] min-[430px]:text-[39px]">
              오늘 기록 시작
            </span>
          </Link>
        </section>

        <section
          className="mt-8 grid grid-cols-2 gap-4 min-[390px]:mt-9 min-[390px]:gap-5"
          aria-label="어르신 도움 메뉴"
        >
          <Link
            to="/elder/check/medication"
            className="flex min-h-[190px] flex-col items-center justify-center rounded-[24px] border border-[#d8e2ee] bg-white px-3 py-5 text-center shadow-[0_12px_24px_rgba(31,74,128,0.1)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[230px] min-[390px]:rounded-[28px]"
          >
            <span className="grid h-[94px] w-[94px] place-items-center rounded-full bg-[#eaf6ff] text-[#0876f8] min-[390px]:h-[116px] min-[390px]:w-[116px]">
              <Mic
                aria-hidden="true"
                className="h-[58px] w-[58px] min-[390px]:h-[72px] min-[390px]:w-[72px]"
                strokeWidth={2.8}
              />
            </span>
            <strong className="mt-6 text-[29px] font-black leading-none text-[#061844] min-[390px]:text-[32px] min-[430px]:text-[38px]">
              음성으로
            </strong>
            <span className="mt-3 text-[20px] font-bold leading-none text-[#6a7280] min-[390px]:text-[27px]">
              말로 답하기
            </span>
          </Link>

          <Link
            to="/elder/chat"
            className="flex min-h-[190px] flex-col items-center justify-center rounded-[24px] border border-[#d8e2ee] bg-white px-3 py-5 text-center shadow-[0_12px_24px_rgba(31,74,128,0.1)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[230px] min-[390px]:rounded-[28px]"
          >
            <span className="grid h-[94px] w-[94px] place-items-center rounded-full bg-[#eaf6ff] text-[#0876f8] min-[390px]:h-[116px] min-[390px]:w-[116px]">
              <MessageCircle
                aria-hidden="true"
                className="h-[58px] w-[58px] min-[390px]:h-[72px] min-[390px]:w-[72px]"
                strokeWidth={2.8}
              />
            </span>
            <strong className="mt-6 text-[29px] font-black leading-none text-[#061844] min-[390px]:text-[32px] min-[430px]:text-[38px]">
              말동무
            </strong>
            <span className="mt-3 text-[20px] font-bold leading-none text-[#6a7280] min-[390px]:text-[27px]">
              AI 안부
            </span>
          </Link>
        </section>
      </section>
    </main>
  )
}
