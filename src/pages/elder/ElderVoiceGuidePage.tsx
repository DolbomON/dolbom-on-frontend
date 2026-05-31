import { ChevronRight, Menu, Volume2, VolumeX } from 'lucide-react'
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
    navigate('/select-role')
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
        className="mx-auto flex min-h-svh w-full max-w-[480px] flex-col overflow-x-hidden bg-white px-5 pb-[max(16px,env(safe-area-inset-bottom))] pt-[max(20px,env(safe-area-inset-top))] shadow-[0_20px_80px_rgba(55,104,184,0.08)] min-[430px]:px-6"
        aria-label="음성 안내 화면"
      >
        <header className="flex items-start justify-between">
          <Link
            to="/elder"
            className="inline-flex min-h-11 items-baseline rounded-md leading-none focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
            aria-label="돌봄온 어르신 홈"
          >
            <span className="text-[31px] font-black text-[#062463] min-[430px]:text-[34px]">
              돌봄
            </span>
            <span className="ml-1 text-[39px] font-black text-[#117cff] min-[430px]:text-[43px]">
              ON
            </span>
          </Link>

          <button
            className="inline-grid h-11 w-11 place-items-center rounded-md text-[#061844] transition active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[430px]:h-12 min-[430px]:w-12"
            type="button"
            aria-label="메뉴 열기"
            onClick={handleMenuClick}
          >
            <Menu aria-hidden="true" size={42} strokeWidth={2.8} />
          </button>
        </header>

        <section className="mt-7 flex items-center justify-between gap-3 min-[430px]:mt-8">
          <h1 className="whitespace-nowrap text-[44px] font-black leading-none text-[#061844] min-[430px]:text-[50px]">
            음성 안내
          </h1>

          <button
            className="inline-flex min-h-[52px] shrink-0 items-center justify-center gap-2 rounded-[20px] border-2 border-[#2389ff] bg-white px-3 text-[20px] font-black text-[#117cff] shadow-[0_10px_20px_rgba(10,112,240,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[430px]:rounded-[24px] min-[430px]:px-4"
            type="button"
            aria-pressed={isMuted}
            onClick={handleMuteClick}
          >
            {isMuted ? (
              <Volume2 size={30} strokeWidth={3} aria-hidden="true" />
            ) : (
              <VolumeX size={30} strokeWidth={3} aria-hidden="true" />
            )}
            <span>{isMuted ? '소리 켜기' : '음소거'}</span>
          </button>
        </section>

        <div className="-mx-9 mt-3 h-[224px] overflow-hidden min-[430px]:mx-auto min-[430px]:w-[462px]">
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

        <blockquote className="relative mt-4 rounded-[28px] border-2 border-[#c9dfff] bg-[#f0f8ff] px-7 py-5 text-center text-[24px] font-black leading-[1.22] text-[#061844] shadow-[0_12px_28px_rgba(45,104,184,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] min-[390px]:text-[25px] min-[430px]:rounded-[32px] min-[430px]:px-8 min-[430px]:text-[28px]">
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
          <p className="whitespace-nowrap text-[22px] font-black leading-tight text-[#061844] min-[390px]:text-[24px] min-[430px]:text-[26px]">
            화면을 읽어 드리고 있어요...
          </p>
        </div>

        <section
          className="mt-6 grid grid-cols-2 gap-4 min-[430px]:gap-5"
          aria-label="음성 안내 조작"
        >
          <button
            className="flex min-h-[126px] flex-col items-center justify-center rounded-[24px] border border-[#dbe6f4] bg-white px-3 py-4 text-center shadow-[0_12px_26px_rgba(31,74,128,0.1)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[430px]:rounded-[28px]"
            type="button"
            onClick={handlePauseClick}
          >
            <img
              src={pauseIconSrc}
              alt=""
              width="1254"
              height="1254"
              className="h-[72px] w-[72px] object-contain drop-shadow-[0_12px_16px_rgba(2,92,221,0.18)] min-[430px]:h-[78px] min-[430px]:w-[78px]"
              aria-hidden="true"
              draggable="false"
            />
            <span className="mt-2 whitespace-nowrap text-[25px] font-black leading-none text-[#061844] min-[430px]:text-[27px]">
              잠깐 멈춤
            </span>
          </button>

          <button
            className="flex min-h-[126px] flex-col items-center justify-center rounded-[24px] border border-[#dbe6f4] bg-white px-3 py-4 text-center shadow-[0_12px_26px_rgba(31,74,128,0.1)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[430px]:rounded-[28px]"
            type="button"
            onClick={handleReplayClick}
          >
            <img
              src={replayIconSrc}
              alt=""
              width="1254"
              height="1254"
              className="h-[72px] w-[72px] object-contain drop-shadow-[0_12px_16px_rgba(2,92,221,0.18)] min-[430px]:h-[78px] min-[430px]:w-[78px]"
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
          className="mt-6 flex min-h-[70px] w-full items-center justify-center gap-3 rounded-[28px] bg-gradient-to-r from-[#0059ff] to-[#58c8f7] px-5 text-[31px] font-black text-white shadow-[0_18px_34px_rgba(2,92,221,0.22),inset_0_2px_0_rgba(255,255,255,0.26)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[430px]:text-[34px]"
        >
          <span>다음 안내</span>
          <ChevronRight size={38} strokeWidth={3.4} aria-hidden="true" />
        </Link>
      </section>
    </main>
  )
}
