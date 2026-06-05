import { useI18n } from '../../lib/i18n/useI18n'

const heroImage = '/assets/dolbomon/home/hero-care-check.png'

export function HomeHero() {
  const { t } = useI18n()

  return (
    <section
      className="relative mt-7 min-h-[410px] flex-1 min-[390px]:mt-8 min-[390px]:min-h-[480px]"
      aria-labelledby="home-title"
    >
      <div className="relative z-10 max-w-[280px] min-[390px]:max-w-[330px]">
        <h1
          id="home-title"
          className="text-[39px] font-black leading-[1.12] min-[390px]:text-[49px]"
          aria-label={t('landing.hero.aria')}
        >
          {t('landing.hero.line1')}
          <br />
          {t('landing.hero.line2Prefix')}{' '}
          <span className="text-[#0057dd]">
            {t('landing.hero.line2Accent')}
            <br />
            {t('landing.hero.line3Accent')}
          </span>
        </h1>

        <p className="mt-5 text-[18px] font-medium leading-[1.45] text-[#4e5662] min-[390px]:text-[20px]">
          {t('landing.hero.description1')}
          <br />
          {t('landing.hero.description2')}
          <br />
          {t('landing.hero.description3')}
        </p>
      </div>

      <img
        src={heroImage}
        alt=""
        width="1448"
        height="1086"
        className="pointer-events-none absolute bottom-[-12px] right-[-44px] z-0 w-[424px] max-w-none select-none min-[390px]:bottom-[-18px] min-[390px]:right-[-40px] min-[390px]:w-[540px]"
        aria-hidden="true"
        draggable="false"
      />
    </section>
  )
}
