import {
  Accessibility,
  HeartPulse,
  House,
  Menu,
  Moon,
  Pill,
  Smile,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { DolbomLogo } from '../../components/layout/DolbomLogo'
import type { TranslationKey } from '../../lib/i18n/translations'
import { useI18n } from '../../lib/i18n/useI18n'

const checklistImageSrc = '/assets/dolbomon/elder-check/checklist.png'

const checkCategories = [
  {
    icon: Pill,
    labelKey: 'elder.onboarding.category.medication',
  },
  {
    icon: HeartPulse,
    labelKey: 'elder.onboarding.category.disease',
  },
  {
    icon: Accessibility,
    labelKey: 'elder.onboarding.category.pain',
  },
  {
    icon: Moon,
    labelKey: 'elder.onboarding.category.sleep',
  },
  {
    icon: House,
    labelKey: 'elder.onboarding.category.living',
  },
  {
    icon: Smile,
    labelKey: 'elder.onboarding.category.emotion',
  },
] satisfies Array<{ icon: typeof Pill; labelKey: TranslationKey }>

export function ElderCheckPage() {
  const navigate = useNavigate()
  const { t } = useI18n()

  function handleMenuClick() {
    navigate('/elder/mypage')
  }

  function handleStartClick() {
    navigate('/elder/check/medication-habit')
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#edf5ff] text-[#061844]">
      <section
        className="mx-auto flex min-h-svh w-full max-w-[480px] flex-col bg-white px-5 pb-[max(16px,env(safe-area-inset-bottom))] pt-[max(22px,env(safe-area-inset-top))] shadow-[0_20px_80px_rgba(55,104,184,0.08)] min-[390px]:px-6"
        aria-label={t('elder.onboarding.aria')}
      >
        <header className="flex items-center justify-between">
          <DolbomLogo ariaLabel={t('elder.home.logoAria')} to="/elder" />

          <button
            className="inline-grid h-12 w-12 place-items-center rounded-md text-[#061844] transition active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
            type="button"
            aria-label={t('common.myPage.open')}
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
              aria-label={t('elder.onboarding.headingAria')}
            >
              {t('elder.onboarding.headingLine1')}
              <br />
              {t('elder.onboarding.headingLine2')}
            </h1>

            <p className="mt-5 text-[24px] font-bold leading-[1.38] text-[#5a6572] min-[390px]:text-[26px]">
              {t('elder.onboarding.descriptionLine1')}
              <br />
              {t('elder.onboarding.descriptionLine2')}
              <br />
              {t('elder.onboarding.descriptionLine3')}
            </p>
          </section>

          <ul
            className="mt-6 grid w-full grid-cols-3 gap-3 min-[390px]:gap-4"
            aria-label={t('elder.onboarding.categoriesAria')}
          >
            {checkCategories.map(({ icon: Icon, labelKey }) => (
              <li
                key={labelKey}
                className="flex min-h-[50px] items-center justify-center gap-1.5 rounded-[22px] border-2 border-[#a9cbff] bg-white px-2 text-[18px] font-black text-[#071634] shadow-[0_10px_22px_rgba(38,100,210,0.06)] min-[390px]:min-h-[54px] min-[390px]:text-[20px]"
              >
                <Icon
                  className="h-[26px] w-[26px] shrink-0 text-[#2078ff] min-[390px]:h-7 min-[390px]:w-7"
                  aria-hidden="true"
                  strokeWidth={2.8}
                />
                <span className="whitespace-nowrap">{t(labelKey)}</span>
              </li>
            ))}
          </ul>

          <button
            className="mt-6 flex min-h-[72px] w-full items-center justify-center rounded-[22px] bg-gradient-to-br from-[#117cff] to-[#0065f5] px-6 text-[33px] font-black text-white shadow-[0_20px_34px_rgba(2,92,221,0.22)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[76px] min-[390px]:text-[36px]"
            type="button"
            onClick={handleStartClick}
          >
            <span className="text-[33px] font-black leading-none min-[390px]:text-[36px]">
              {t('elder.onboarding.start')}
            </span>
          </button>
        </div>
      </section>
    </main>
  )
}
