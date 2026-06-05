import { Menu } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { DolbomLogo } from '../../components/layout/DolbomLogo'
import { useI18n } from '../../lib/i18n/useI18n'
import { cn } from '../../lib/utils'

type LivesAloneOption = 'yes' | 'no'

const textInputClass =
  'h-[66px] w-full rounded-[22px] border-2 border-[#d8e1ee] bg-white px-7 text-[30px] font-semibold text-[#111827] placeholder:text-[#9ca3af] focus:border-[#0876ff] focus:outline-none focus:ring-4 focus:ring-[#b9d7ff]'
const compactInputClass =
  'h-[66px] w-full rounded-[20px] border-2 border-[#d8e1ee] bg-white px-5 text-[24px] font-semibold text-[#111827] placeholder:text-[#9ca3af] focus:border-[#0876ff] focus:outline-none focus:ring-4 focus:ring-[#b9d7ff]'
const labelClass =
  'mb-3 block text-[27px] font-black leading-none text-[#1f2937]'
const choiceButtonClass =
  'min-h-[80px] rounded-[20px] border-2 px-4 text-[30px] font-black shadow-[0_10px_22px_rgba(47,82,133,0.12)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]'
const selectedChoiceClass =
  'border-[#0876ff] bg-gradient-to-br from-[#0876ff] to-[#005ee6] text-white shadow-[0_16px_28px_rgba(2,92,221,0.24)]'
const unselectedChoiceClass = 'border-[#d8e1ee] bg-white text-[#111827]'

export function ElderBasicInfoPage() {
  const navigate = useNavigate()
  const { t } = useI18n()
  const [livesAlone, setLivesAlone] = useState<LivesAloneOption>('yes')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate('/elder/check')
  }

  function handleMenuClick() {
    navigate('/elder/mypage')
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#f2f7ff] text-[#111827]">
      <section
        className="mx-auto flex min-h-svh w-full max-w-[480px] flex-col bg-white shadow-[0_20px_80px_rgba(55,104,184,0.08)]"
        aria-label={t('elder.basicInfo.aria')}
      >
        <header className="flex min-h-[90px] items-center justify-between border-b border-[#e5ebf4] px-6 pt-[max(10px,env(safe-area-inset-top))]">
          <DolbomLogo ariaLabel={t('elder.basicInfo.logoAria')} to="/select-role" />

          <button
            className="inline-grid h-12 w-12 place-items-center rounded-md text-[#374151] transition active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
            type="button"
            aria-label={t('common.myPage.open')}
            onClick={handleMenuClick}
          >
            <Menu aria-hidden="true" size={42} strokeWidth={2.8} />
          </button>
        </header>

        <form
          className="flex flex-1 flex-col px-6 pb-[max(24px,env(safe-area-inset-bottom))] pt-9"
          onSubmit={handleSubmit}
        >
          <h1
            className="text-[42px] font-black leading-[1.12] text-[#111827]"
            aria-label={t('elder.basicInfo.headingAria')}
          >
            {t('elder.basicInfo.headingLine1')}
            <br />
            {t('elder.basicInfo.headingLine2')}
          </h1>

          <div className="mt-8 flex flex-col gap-6">
            <label className="block">
              <span className={labelClass}>{t('elder.basicInfo.name')}</span>
              <input
                className={textInputClass}
                name="name"
                placeholder={t('elder.basicInfo.namePlaceholder')}
                type="text"
                autoComplete="name"
              />
            </label>

            <div className="grid grid-cols-2 gap-5">
              <label className="block min-w-0">
                <span className={labelClass}>{t('elder.basicInfo.age')}</span>
                <input
                  className={compactInputClass}
                  name="age"
                  placeholder="78"
                  type="number"
                  inputMode="numeric"
                  min="1"
                  max="120"
                />
              </label>

              <label className="block min-w-0">
                <span className={labelClass}>{t('elder.basicInfo.phone')}</span>
                <input
                  className={compactInputClass}
                  name="phone"
                  placeholder="010-..."
                  type="tel"
                  autoComplete="tel"
                />
              </label>
            </div>

            <label className="block">
              <span className={labelClass}>{t('elder.basicInfo.address')}</span>
              <input
                className={textInputClass}
                name="address"
                placeholder={t('elder.basicInfo.addressPlaceholder')}
                type="text"
                autoComplete="street-address"
              />
            </label>

            <fieldset>
              <legend className="mb-4 text-[30px] font-black leading-tight text-[#1f2937]">
                {t('elder.basicInfo.livesAloneLegend')}
              </legend>
              <div className="grid grid-cols-2 gap-5">
                <button
                  className={cn(
                    choiceButtonClass,
                    livesAlone === 'yes'
                      ? selectedChoiceClass
                      : unselectedChoiceClass,
                  )}
                  type="button"
                  aria-pressed={livesAlone === 'yes'}
                  onClick={() => setLivesAlone('yes')}
                >
                  {t('elder.basicInfo.livesAlone.yes')}
                </button>
                <button
                  className={cn(
                    choiceButtonClass,
                    livesAlone === 'no'
                      ? selectedChoiceClass
                      : unselectedChoiceClass,
                  )}
                  type="button"
                  aria-pressed={livesAlone === 'no'}
                  onClick={() => setLivesAlone('no')}
                >
                  {t('elder.basicInfo.livesAlone.no')}
                </button>
              </div>
            </fieldset>
          </div>

          <button
            className="mt-7 min-h-[78px] w-full rounded-[22px] bg-gradient-to-br from-[#0876ff] to-[#005ee6] px-6 text-[36px] font-black text-white shadow-[0_16px_28px_rgba(2,92,221,0.22)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
            type="submit"
          >
            {t('common.next')}
          </button>
        </form>
      </section>
    </main>
  )
}
