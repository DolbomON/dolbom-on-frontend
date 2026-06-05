import { Menu, Siren } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { DolbomLogo } from '../../components/layout/DolbomLogo'
import { useI18n } from '../../lib/i18n/useI18n'

const mainAssetBase = '/assets/dolbomon/main'
const recordCardBackgroundSrc = `${mainAssetBase}/배경.png`
const penImageSrc = `${mainAssetBase}/펜.png`
const microphoneImageSrc = `${mainAssetBase}/마이크.png`
const chatImageSrc = `${mainAssetBase}/채팅.png`
const careTeamImageSrc = '/assets/dolbomon/welfare/보안.png'

export function ElderHomePage() {
  const navigate = useNavigate()
  const { formatDate, t } = useI18n()
  const todayLabel = formatDate(new Date(), {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
  })

  function handleMenuClick() {
    navigate('/elder/mypage')
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#edf5ff] text-[#061844]">
      <section
        className="mx-auto flex min-h-svh w-full max-w-[480px] flex-col bg-white px-5 pb-[max(14px,env(safe-area-inset-bottom))] pt-[max(18px,env(safe-area-inset-top))] shadow-[0_20px_80px_rgba(55,104,184,0.08)] min-[390px]:px-6 min-[430px]:px-7"
        aria-label={t('elder.home.aria')}
      >
        <header className="flex items-start justify-between">
          <DolbomLogo ariaLabel={t('elder.home.logoAria')} to="/elder" />

          <button
            className="inline-grid h-10 w-10 place-items-center rounded-md text-[#061844] transition active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
            type="button"
            aria-label={t('common.myPage.open')}
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
            {t('elder.home.greeting')}
            <br />
            <span className="whitespace-nowrap">
              {t('elder.home.name')} <span aria-hidden="true">👋</span>
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
            {t('elder.home.recordTitle')}
          </h2>

          <ol
            className="mt-7 flex items-center justify-center gap-0"
            aria-label={t('elder.home.recordStepsAria')}
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
            {t('elder.home.recordCategories')}
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
              {t('elder.home.recordCta')}
            </span>
          </Link>
        </section>

        <section
          className="mt-4 grid grid-cols-2 gap-3 min-[390px]:gap-4"
          aria-label={t('elder.home.menuAria')}
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
              {t('elder.home.voice.title')}
            </strong>
            <span className="mt-2 whitespace-nowrap text-[18px] font-bold leading-none text-[#6a7280] min-[390px]:text-[20px]">
              {t('elder.home.voice.description')}
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
              {t('elder.home.chat.title')}
            </strong>
            <span className="mt-2 whitespace-nowrap text-[18px] font-bold leading-none text-[#6a7280] min-[390px]:text-[20px]">
              {t('elder.home.chat.description')}
            </span>
          </Link>

          <Link
            to="/elder/care-team"
            className="flex min-h-[162px] flex-col items-center justify-center rounded-[22px] border border-[#d8e2ee] bg-white px-2 py-4 text-center shadow-[0_12px_24px_rgba(31,74,128,0.1)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[178px] min-[390px]:rounded-[24px]"
          >
            <span className="grid h-[74px] w-[74px] place-items-center rounded-full bg-[#eaf6ff] shadow-[inset_0_0_0_2px_rgba(205,226,251,0.68)] min-[390px]:h-[82px] min-[390px]:w-[82px]">
              <img
                src={careTeamImageSrc}
                alt=""
                width="1024"
                height="1024"
                className="h-[56px] w-[56px] object-contain min-[390px]:h-[64px] min-[390px]:w-[64px]"
                aria-hidden="true"
                draggable="false"
              />
            </span>
            <strong className="mt-4 whitespace-nowrap text-[26px] font-black leading-none text-[#061844] min-[390px]:text-[29px]">
              {t('elder.home.team.title')}
            </strong>
            <span className="mt-2 whitespace-nowrap text-[18px] font-bold leading-none text-[#6a7280] min-[390px]:text-[20px]">
              {t('elder.home.team.description')}
            </span>
          </Link>

          <Link
            to="/elder/sos"
            className="flex min-h-[162px] flex-col items-center justify-center rounded-[22px] border-2 border-[#fecdd3] bg-[#fff1f2] px-2 py-4 text-center shadow-[0_12px_24px_rgba(190,18,60,0.12)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#fda4af] min-[390px]:min-h-[178px] min-[390px]:rounded-[24px]"
          >
            <span className="grid h-[74px] w-[74px] place-items-center rounded-full bg-[#dc2626] text-white shadow-[0_12px_24px_rgba(190,18,60,0.22)] min-[390px]:h-[82px] min-[390px]:w-[82px]">
              <Siren
                aria-hidden="true"
                className="h-[45px] w-[45px] min-[390px]:h-[52px] min-[390px]:w-[52px]"
                strokeWidth={2.8}
              />
            </span>
            <strong className="mt-4 whitespace-nowrap text-[26px] font-black leading-none text-[#9f1239] min-[390px]:text-[29px]">
              {t('elder.home.sos.title')}
            </strong>
            <span className="mt-2 whitespace-nowrap text-[18px] font-bold leading-none text-[#6a2432] min-[390px]:text-[20px]">
              {t('elder.home.sos.description')}
            </span>
          </Link>
        </section>
      </section>
    </main>
  )
}
