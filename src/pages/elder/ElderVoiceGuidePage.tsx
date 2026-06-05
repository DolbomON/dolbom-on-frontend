import { ChevronRight, Menu, Volume2 } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const voiceAssetBase = '/assets/dolbomon/voice'
const aiGuideImageSrc = `${voiceAssetBase}/ai.png`
const listeningIconSrc = `${voiceAssetBase}/image.png`
const pauseIconSrc = `${voiceAssetBase}/일시정지.png`
const replayIconSrc = `${voiceAssetBase}/다시.png`

export function ElderVoiceGuidePage() {
  const navigate = useNavigate()
  const [isMuted, setIsMuted] = useState(false)

  function handleMenuClick() {
    navigate('/elder/mypage')
  }

  function handleMuteClick() {
    setIsMuted((current) => !current)
  }

  function handlePauseClick() {
    // TODO: Pause text-to-speech playback when the voice guide is wired up.
    console.info('Voice guide pause is not implemented yet.')
  }

  function handleReplayClick() {
    // TODO: Restart text-to-speech playback when the voice guide is wired up.
    console.info('Voice guide replay is not implemented yet.')
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#edf5ff] text-[#061844]">
      <section
        className="mx-auto flex min-h-svh w-full max-w-[480px] flex-col overflow-x-hidden bg-white px-5 pb-[max(16px,env(safe-area-inset-bottom))] pt-[max(18px,env(safe-area-inset-top))] shadow-[0_20px_80px_rgba(55,104,184,0.08)] min-[390px]:px-6 min-[430px]:px-7"
        aria-label="음성 안내 화면"
      >
        <header className="flex items-start justify-between">
          <Link
            to="/elder"
            className="inline-flex min-h-10 items-baseline rounded-md text-[#0867f2] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
            aria-label="돌봄온 어르신 홈"
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
            aria-label="마이페이지 열기"
            onClick={handleMenuClick}
          >
            <Menu aria-hidden="true" size={36} strokeWidth={2.8} />
          </button>
        </header>

        <section className="relative z-10 mt-4 flex items-center justify-between gap-3">
          <h1 className="whitespace-nowrap text-[44px] font-black leading-none text-[#061844] min-[430px]:text-[50px]">
            음성 안내
          </h1>

          <button
            className="inline-flex min-h-[52px] shrink-0 items-center justify-center gap-2 rounded-[20px] border-2 border-[#2389ff] bg-white px-3 text-[20px] font-black text-[#117cff] shadow-[0_10px_20px_rgba(10,112,240,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[430px]:rounded-[24px] min-[430px]:px-4"
            type="button"
            aria-pressed={isMuted}
            onClick={handleMuteClick}
          >
            <span
              className="relative inline-grid h-9 w-9 shrink-0 place-items-center"
              aria-hidden="true"
            >
              <Volume2
                className="text-[#63b8ff] drop-shadow-[0_5px_8px_rgba(31,126,238,0.2)]"
                size={34}
                strokeWidth={2.8}
              />
              {!isMuted && (
                <span className="absolute h-[42px] w-1.5 rotate-45 rounded-full bg-[#ff5a48] shadow-[0_2px_4px_rgba(214,42,30,0.22)]" />
              )}
            </span>
            <span>{isMuted ? '소리 켜기' : '음소거'}</span>
          </button>
        </section>

        <div className="-mx-5 -mt-2 h-[276px] overflow-hidden min-[430px]:-mx-6">
          <img
            src={aiGuideImageSrc}
            alt=""
            width="1448"
            height="1086"
            className="h-full w-full object-cover object-center"
            aria-hidden="true"
            draggable="false"
          />
        </div>

        <blockquote className="relative mt-5 rounded-[28px] border-2 border-[#c9dfff] bg-[#f0f8ff] px-7 py-6 text-center text-[26px] font-black leading-[1.22] text-[#061844] shadow-[0_12px_28px_rgba(45,104,184,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] min-[390px]:text-[28px] min-[430px]:rounded-[32px] min-[430px]:px-8 min-[430px]:text-[30px]">
          <span
            className="absolute left-4 top-3 text-[36px] leading-none text-[#1e78ff] min-[430px]:text-[42px]"
            aria-hidden="true"
          >
            “
          </span>
          <p className="whitespace-nowrap">오늘 식사는 어떠셨어요?</p>
          <span
            className="absolute bottom-1 right-4 text-[36px] leading-none text-[#1e78ff] min-[430px]:text-[42px]"
            aria-hidden="true"
          >
            ”
          </span>
        </blockquote>

        <div className="mt-5 flex items-center justify-center gap-3">
          <img
            src={listeningIconSrc}
            alt=""
            width="1254"
            height="1254"
            className="h-[48px] w-[48px] shrink-0 object-contain min-[430px]:h-[52px] min-[430px]:w-[52px]"
            aria-hidden="true"
            draggable="false"
          />
          <p className="whitespace-nowrap text-[22px] font-black leading-tight text-[#061844] min-[390px]:text-[24px]">
            화면을 읽어 드리고 있어요...
          </p>
        </div>

        <section
          className="mt-1 grid grid-cols-2 gap-4 min-[430px]:gap-5"
          aria-label="음성 안내 조작"
        >
          <button
            className="flex min-h-[136px] flex-col items-center justify-center rounded-[24px] border border-[#dbe6f4] bg-white px-3 py-3 text-center shadow-[0_12px_26px_rgba(31,74,128,0.1)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[430px]:rounded-[28px]"
            type="button"
            onClick={handlePauseClick}
          >
            <img
              src={pauseIconSrc}
              alt=""
              width="1254"
              height="1254"
              className="h-[64px] w-[64px] object-contain drop-shadow-[0_12px_16px_rgba(2,92,221,0.18)] min-[430px]:h-[66px] min-[430px]:w-[66px]"
              aria-hidden="true"
              draggable="false"
            />
            <span className="mt-2 whitespace-nowrap text-[25px] font-black leading-none text-[#061844] min-[430px]:text-[27px]">
              잠깐 멈춤
            </span>
          </button>

          <button
            className="flex min-h-[136px] flex-col items-center justify-center rounded-[24px] border border-[#dbe6f4] bg-white px-3 py-3 text-center shadow-[0_12px_26px_rgba(31,74,128,0.1)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[430px]:rounded-[28px]"
            type="button"
            onClick={handleReplayClick}
          >
            <img
              src={replayIconSrc}
              alt=""
              width="1254"
              height="1254"
              className="h-[64px] w-[64px] object-contain drop-shadow-[0_12px_16px_rgba(2,92,221,0.18)] min-[430px]:h-[66px] min-[430px]:w-[66px]"
              aria-hidden="true"
              draggable="false"
            />
            <span className="mt-2 whitespace-nowrap text-[25px] font-black leading-none text-[#061844] min-[430px]:text-[27px]">
              다시 듣기
            </span>
          </button>
        </section>

        <Link
          to="/elder/voice/listening"
          className="mt-3 flex min-h-[66px] w-full items-center justify-center gap-3 rounded-[28px] bg-gradient-to-r from-[#0059ff] to-[#58c8f7] px-5 text-[31px] font-black text-white shadow-[0_18px_34px_rgba(2,92,221,0.22),inset_0_2px_0_rgba(255,255,255,0.26)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[430px]:text-[34px]"
        >
          <span>다음 안내</span>
          <ChevronRight size={38} strokeWidth={3.4} aria-hidden="true" />
        </Link>
      </section>
    </main>
  )
}
