import { Mic } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const microphoneImageSrc = '/assets/dolbomon/voice/마이크.png'

export function ElderVoiceListeningPage() {
  const navigate = useNavigate()

  function handleDoneClick() {
    // TODO: Submit the recognized speech when the STT flow is connected.
    navigate('/elder')
  }

  function handleRetryClick() {
    // TODO: Restart speech recognition when the STT flow is connected.
    console.info('Voice recognition retry is not implemented yet.')
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#edf5ff] text-[#061844]">
      <section
        className="mx-auto flex min-h-svh w-full max-w-[480px] flex-col overflow-hidden bg-white px-8 pb-[max(18px,env(safe-area-inset-bottom))] pt-[max(16px,env(safe-area-inset-top))] shadow-[0_20px_80px_rgba(55,104,184,0.08)] min-[430px]:px-11"
        aria-label="음성 인식 화면"
      >
        <section className="mt-14 shrink-0 text-center min-[430px]:mt-16">
          <h1 className="text-[41px] font-black leading-none text-[#061844] min-[430px]:text-[50px]">
            말씀해 주세요
          </h1>
          <p className="mt-5 whitespace-nowrap text-[20px] font-semibold leading-tight text-[#24385b] min-[430px]:text-[22px]">
            음성을 인식하여 정확하게 도와드릴게요.
          </p>
        </section>

        <div className="-mx-11 mt-1 h-[250px] shrink-0 overflow-hidden min-[430px]:-mx-14 min-[430px]:h-[260px]">
          <img
            src={microphoneImageSrc}
            alt=""
            width="1254"
            height="1254"
            className="mx-auto h-[360px] w-[360px] max-w-none -translate-y-[54px] object-contain object-center min-[430px]:h-[390px] min-[430px]:w-[390px] min-[430px]:-translate-y-[66px]"
            aria-hidden="true"
            draggable="false"
          />
        </div>

        <div className="mt-4 flex shrink-0 items-center justify-center gap-5">
          <span
            className="h-[24px] w-[24px] rounded-full bg-gradient-to-br from-[#6bb7ff] to-[#0068f2] shadow-[0_8px_14px_rgba(0,104,242,0.25)] min-[430px]:h-[28px] min-[430px]:w-[28px]"
            aria-hidden="true"
          />
          <p className="text-[33px] font-black leading-none text-[#126fff] min-[430px]:text-[38px]">
            듣는 중...
          </p>
        </div>

        <section
          className="relative mt-5 shrink-0 rounded-[22px] border-2 border-[#e1ecfb] bg-[#f7fbff] px-5 pb-5 pt-5 text-center shadow-[0_12px_24px_rgba(45,104,184,0.11),inset_0_1px_0_rgba(255,255,255,0.92)] min-[430px]:rounded-[24px]"
          aria-labelledby="recognized-title"
        >
          <span
            className="absolute -bottom-[14px] left-1/2 h-7 w-7 -translate-x-1/2 rotate-45 rounded-[4px] border-b-2 border-r-2 border-[#e1ecfb] bg-[#f7fbff]"
            aria-hidden="true"
          />
          <h2
            id="recognized-title"
            className="text-[25px] font-bold leading-none text-[#0b72ff] min-[430px]:text-[28px]"
          >
            인식된 말
          </h2>
          <p className="relative mt-4 whitespace-nowrap text-[29px] font-black leading-none text-[#061844] min-[430px]:text-[33px]">
            “밥은 조금 먹었고...”
          </p>
        </section>

        <button
          className="mt-5 flex min-h-[74px] w-full shrink-0 items-center justify-center gap-5 rounded-[26px] border-2 border-[#ff5a5a] bg-gradient-to-br from-[#ff4646] to-[#ed2020] px-5 font-black text-white shadow-[0_14px_28px_rgba(237,32,32,0.2),inset_0_2px_0_rgba(255,255,255,0.24),inset_0_0_0_3px_rgba(255,255,255,0.16)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#ff9c9c] min-[430px]:min-h-[80px] min-[430px]:rounded-[30px]"
          type="button"
          onClick={handleDoneClick}
        >
          <span
            className="h-[27px] w-[27px] rounded-md bg-white shadow-[inset_0_2px_5px_rgba(217,38,38,0.12),0_4px_10px_rgba(116,0,0,0.12)] min-[430px]:h-[31px] min-[430px]:w-[31px]"
            aria-hidden="true"
          />
          <span className="text-[31px] leading-none min-[430px]:text-[36px]">
            말 끝났어요
          </span>
        </button>

        <button
          className="mt-4 flex min-h-[52px] w-full shrink-0 items-center justify-center gap-3 rounded-[999px] border-2 border-[#c7dcfb] bg-white px-5 font-black text-[#126fff] shadow-[0_8px_18px_rgba(45,104,184,0.06)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
          type="button"
          onClick={handleRetryClick}
        >
          <Mic size={31} strokeWidth={3.2} aria-hidden="true" />
          <span className="text-[22px] leading-none min-[430px]:text-[25px]">
            다시 말할게요
          </span>
        </button>
      </section>
    </main>
  )
}
