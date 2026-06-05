import {
  ArrowRight,
  Bell,
  CheckCircle2,
  ChevronDown,
  HeartPulse,
  Info,
  Link as LinkIcon,
  Users,
} from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { DolbomLogo } from '../../components/layout/DolbomLogo'
import { CaregiverTopBar } from '../../components/worker/CaregiverTopBar'
import type { TranslationKey } from '../../lib/i18n/translations'
import { useI18n } from '../../lib/i18n/useI18n'

const workerAssetBase = '/assets/dolbomon/worker'

const familyProfileSrc = `${workerAssetBase}/%EB%A9%B0%EB%8A%90%EB%A6%AC.png`
const elderProfileSrc = '/assets/dolbomon/worker-elders/elder-kim-yeongja.png'
const connectionIllustrationSrc = `${workerAssetBase}/image-removebg-preview.png`
const heroConnectionSrc = `${workerAssetBase}/image-removebg-preview%20(1).png`
const shieldIllustrationSrc = `${workerAssetBase}/image-removebg-preview%20(2).png`
const approvalIllustrationSrc = `${workerAssetBase}/image-removebg-preview%20(3).png`
const bellIllustrationSrc = `${workerAssetBase}/image-removebg-preview%20(4).png`

type BenefitItem = {
  imageSrc: string
  descriptionKey: TranslationKey
  titleKey: TranslationKey
}

const navItems = [
  { href: '/family', labelKey: 'family.nav.home' },
  { href: '/family/status', labelKey: 'family.nav.status' },
  { href: '/family/alerts', labelKey: 'family.nav.alerts' },
  { href: '/family/chat', labelKey: 'family.nav.chat' },
  { href: '/family/connect', labelKey: 'family.nav.connect' },
] as const

const benefitItems: BenefitItem[] = [
  {
    imageSrc: shieldIllustrationSrc,
    descriptionKey: 'family.connect.benefit.safe.description',
    titleKey: 'family.connect.benefit.safe.title',
  },
  {
    imageSrc: approvalIllustrationSrc,
    descriptionKey: 'family.connect.benefit.approval.description',
    titleKey: 'family.connect.benefit.approval.title',
  },
  {
    imageSrc: bellIllustrationSrc,
    descriptionKey: 'family.connect.benefit.alert.description',
    titleKey: 'family.connect.benefit.alert.title',
  },
]

function FamilyTopNavigation() {
  const { t } = useI18n()

  return (
    <header className="sticky top-0 z-40 overflow-x-hidden border-b border-[#dfe8f5] bg-white/96 shadow-[0_5px_18px_rgba(30,66,118,0.05)] backdrop-blur">
      <div className="mx-auto grid min-h-[72px] w-full max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 px-5 py-1 lg:grid-cols-[210px_minmax(0,1fr)_auto] lg:px-8">
        <DolbomLogo ariaLabel={t('family.home.logoAria')} to="/family" />

        <nav
          className="col-span-2 row-start-2 flex min-w-0 flex-wrap gap-x-3 gap-y-1 overflow-visible pb-2 text-[15px] font-black leading-none text-[#071747] lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:flex-nowrap lg:justify-self-center lg:gap-8 lg:pb-0"
          aria-label={t('family.connect.topNavAria')}
        >
          {navItems.map((item) => {
            const isActive = item.href === '/family/connect'
            const label = t(item.labelKey)

            return (
              <Link
                key={item.href}
                to={item.href}
                className={`relative inline-flex min-h-11 shrink-0 items-center justify-center px-2 transition hover:text-[#0867f2] focus-visible:rounded-lg ${
                  isActive ? 'text-[#0867f2]' : 'text-[#071747]'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {label}
                {isActive ? (
                  <span
                    className="absolute bottom-[-8px] left-0 right-0 h-1 rounded-full bg-[#0867f2] lg:bottom-[-15px]"
                    aria-hidden="true"
                  />
                ) : null}
              </Link>
            )
          })}
        </nav>

        <Link
          to="/family/mypage"
          className="col-start-2 row-start-1 inline-flex min-h-11 items-center gap-3 justify-self-end rounded-lg py-1 pl-1 pr-2 transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff] lg:col-start-3"
          aria-label={t('family.connect.profileAria')}
        >
          <img
            src={familyProfileSrc}
            alt=""
            width="512"
            height="512"
            className="h-11 w-11 rounded-full bg-[#eaf4ff] object-cover shadow-[0_7px_15px_rgba(42,96,184,0.16)]"
            draggable="false"
          />
          <span className="hidden text-left sm:block">
            <strong className="block whitespace-nowrap text-[14px] font-black leading-tight text-[#071747]">
              {t('family.connect.profileName')}
            </strong>
            <span className="mt-0.5 block whitespace-nowrap text-[12px] font-bold leading-tight text-[#58657a]">
              {t('family.connect.profileRole')}
            </span>
          </span>
          <ChevronDown
            aria-hidden="true"
            className="hidden h-4 w-4 text-[#33415f] sm:block"
            strokeWidth={2.8}
          />
        </Link>
      </div>
    </header>
  )
}

function InviteCodeCard() {
  const [inviteCode, setInviteCode] = useState('')
  const [requestMessage, setRequestMessage] = useState('')
  const { t } = useI18n()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedCode = inviteCode.trim()

    setRequestMessage(
      trimmedCode
        ? t('family.connect.requestSuccess', { code: trimmedCode })
        : t('family.connect.requestMissing'),
    )
  }

  return (
    <section
      className="grid min-h-[430px] gap-5 rounded-[22px] border border-[#d6e2f2] bg-white p-5 shadow-[0_16px_38px_rgba(32,76,140,0.1)] md:grid-cols-[minmax(250px,0.88fr)_minmax(300px,1.08fr)] md:items-center md:px-8 md:py-6"
      aria-labelledby="invite-code-title"
    >
      <div className="flex justify-center md:justify-start">
        <img
          src={connectionIllustrationSrc}
          alt=""
          width="512"
          height="512"
          className="h-[210px] w-[265px] object-contain drop-shadow-[0_18px_28px_rgba(43,94,167,0.12)] sm:h-[276px] sm:w-[348px]"
          aria-hidden="true"
          draggable="false"
        />
      </div>

      <form className="min-w-0" onSubmit={handleSubmit}>
        <h2
          id="invite-code-title"
          className="text-[28px] font-black leading-tight text-[#06143a] sm:text-[34px]"
        >
          {t('family.connect.inviteTitle')}
        </h2>

        <label className="sr-only" htmlFor="invite-code">
          {t('family.connect.inviteCodeLabel')}
        </label>
        <input
          id="invite-code"
          className="mt-4 h-[60px] w-full rounded-[8px] border-2 border-[#bac7dc] bg-white px-6 text-[21px] font-bold leading-none text-[#071747] outline-none transition placeholder:text-[#8a97ad] focus:border-[#0a63ef] focus:ring-4 focus:ring-[#cfe3ff]"
          placeholder={t('family.connect.invitePlaceholder')}
          type="text"
          value={inviteCode}
          onChange={(event) => setInviteCode(event.target.value)}
        />

        <button
          type="submit"
          className="mt-4 inline-flex min-h-[66px] w-full items-center justify-center gap-5 rounded-[8px] bg-[#0867f2] px-5 text-[24px] font-black leading-none text-white shadow-[0_16px_30px_rgba(8,103,242,0.24)] transition hover:bg-[#005ae0] active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
        >
          {t('family.connect.requestButton')}
          <ArrowRight
            aria-hidden="true"
            className="h-9 w-9"
            strokeWidth={2.8}
          />
        </button>

        <div className="mt-4 flex min-h-[78px] items-center gap-4 rounded-[8px] border border-[#c9ddf9] bg-[#eef6ff] px-5 py-3 text-[18px] font-semibold leading-snug text-[#203153]">
          <Info
            aria-hidden="true"
            className="h-10 w-10 shrink-0 rounded-full bg-[#0a63ef] p-2 text-white"
            strokeWidth={2.8}
          />
          <p className="break-keep">{t('family.connect.info')}</p>
        </div>

        {requestMessage ? (
          <p
            className="mt-3 rounded-[8px] bg-[#e9f7ef] px-4 py-3 text-[17px] font-black text-[#087849]"
            role="status"
          >
            {requestMessage}
          </p>
        ) : null}

        <Link
          to="#invite-link"
          className="mt-4 inline-flex min-h-10 items-center gap-3 rounded-lg px-2 text-[18px] font-black leading-none text-[#0867f2] transition hover:bg-[#f0f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          <LinkIcon aria-hidden="true" className="h-7 w-7" strokeWidth={2.8} />
          {t('family.connect.linkConnect')}
        </Link>
      </form>
    </section>
  )
}

function ConnectedElderCard() {
  const { t } = useI18n()

  return (
    <section
      className="min-h-[418px] rounded-[22px] border border-[#d6e2f2] bg-white px-5 py-4 shadow-[0_16px_38px_rgba(32,76,140,0.1)] md:px-7"
      aria-labelledby="connected-after-title"
    >
      <div className="flex items-center gap-4">
        <span className="grid h-[48px] w-[48px] shrink-0 place-items-center rounded-full border border-[#d8e8ff] bg-[#f5faff] text-[#0a63ef]">
          <Users aria-hidden="true" className="h-7 w-7" strokeWidth={2.6} />
        </span>
        <h2
          id="connected-after-title"
          className="text-[29px] font-black leading-tight text-[#06143a] sm:text-[32px]"
        >
          {t('family.connect.connectedAfterTitle')}
        </h2>
      </div>

      <div className="mt-3 rounded-[18px] border border-[#dfe7f2] bg-white p-3.5 shadow-[0_9px_22px_rgba(32,76,140,0.07)]">
        <h3 className="text-[20px] font-black leading-none text-[#06143a]">
          {t('family.connect.connectedElderTitle')}
        </h3>

        <article className="mt-3.5 grid gap-4 rounded-[16px] border border-[#e0e8f4] bg-white p-3.5 shadow-[0_10px_24px_rgba(32,76,140,0.07)] sm:grid-cols-[148px_minmax(0,1fr)] sm:items-start">
          <img
            src={elderProfileSrc}
            alt={t('family.connect.elderProfileAlt')}
            width="1280"
            height="1280"
            className="h-[174px] w-[140px] rounded-[8px] bg-[#eef6ff] object-cover object-[50%_18%] shadow-[0_10px_20px_rgba(42,82,148,0.1)]"
            draggable="false"
          />

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <strong className="text-[30px] font-black leading-tight text-[#06143a]">
                {t('family.connect.elderName')}
              </strong>
              <span className="inline-flex min-h-9 items-center gap-2 rounded-[8px] bg-[#dff8e9] px-3.5 text-[17px] font-black leading-none text-[#079653]">
                <CheckCircle2
                  aria-hidden="true"
                  className="h-5 w-5"
                  strokeWidth={2.8}
                />
                {t('family.connect.approved')}
              </span>
            </div>

            <ul className="mt-4 grid gap-2.5 text-[18px] font-semibold leading-tight text-[#23334f]">
              <li className="flex items-center gap-4">
                <span className="grid h-8 w-8 place-items-center rounded-[8px] border border-[#b8d4ff] bg-[#f4f9ff] text-[#0a63ef]">
                  <HeartPulse
                    aria-hidden="true"
                    className="h-5 w-5"
                    strokeWidth={2.6}
                  />
                </span>
                {t('family.connect.statusAvailable')}
              </li>
              <li className="flex items-center gap-4">
                <span className="grid h-8 w-8 place-items-center rounded-[8px] border border-[#ffe0a6] bg-[#fff9ec] text-[#f3a308]">
                  <Bell
                    aria-hidden="true"
                    className="h-5 w-5"
                    strokeWidth={2.6}
                  />
                </span>
                {t('family.connect.alertReceiving')}
              </li>
            </ul>

            <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(198px,1fr)_150px]">
              <Link
                to="/family/status"
                className="inline-flex min-h-[52px] items-center justify-center gap-4 whitespace-nowrap rounded-[8px] bg-[#0867f2] px-4 text-[19px] font-black text-white shadow-[0_14px_26px_rgba(8,103,242,0.24)] transition hover:bg-[#005ae0] active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
              >
                {t('family.connect.viewStatus')}
                <ArrowRight
                  aria-hidden="true"
                  className="h-8 w-8"
                  strokeWidth={2.8}
                />
              </Link>
              <Link
                to="/family/alerts"
                className="inline-flex min-h-[52px] items-center justify-center gap-3 whitespace-nowrap rounded-[8px] border-2 border-[#0867f2] bg-white px-3 text-[18px] font-black text-[#0867f2] shadow-[0_9px_20px_rgba(32,76,140,0.07)] transition hover:bg-[#f3f8ff] active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
              >
                <Bell
                  aria-hidden="true"
                  className="h-6 w-6"
                  strokeWidth={2.7}
                />
                {t('family.connect.alertSettings')}
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

function BenefitCard({
  hasDivider,
  imageSrc,
  descriptionKey,
  titleKey,
}: BenefitItem & { hasDivider: boolean }) {
  const { t } = useI18n()

  return (
    <article className="relative flex min-h-[110px] items-center gap-5 px-5 py-4">
      <img
        src={imageSrc}
        alt=""
        width="512"
        height="512"
        className="h-[82px] w-[82px] shrink-0 object-contain drop-shadow-[0_12px_18px_rgba(38,88,170,0.12)]"
        aria-hidden="true"
        draggable="false"
      />
      <div className="min-w-0">
        <h3 className="text-[21px] font-black leading-tight text-[#06143a]">
          {t(titleKey)}
        </h3>
        <p className="mt-2 break-keep text-[17px] font-semibold leading-snug text-[#4b5c78]">
          {t(descriptionKey)}
        </p>
      </div>
      {hasDivider ? (
        <span
          className="absolute right-0 top-1/2 hidden h-[70px] w-px -translate-y-1/2 bg-[#d5deea] lg:block"
          aria-hidden="true"
        />
      ) : null}
    </article>
  )
}

function BenefitsBar() {
  const { t } = useI18n()

  return (
    <section
      className="grid rounded-[22px] border border-[#d9e4f2] bg-white shadow-[0_16px_36px_rgba(32,76,140,0.09)] lg:grid-cols-3"
      aria-label={t('family.connect.benefitsAria')}
    >
      {benefitItems.map((benefit, index) => (
        <BenefitCard
          key={benefit.titleKey}
          {...benefit}
          hasDivider={index < benefitItems.length - 1}
        />
      ))}
    </section>
  )
}

type FamilyConnectPageProps = {
  topBarVariant?: 'caregiver' | 'family'
}

export function FamilyConnectPage({
  topBarVariant = 'family',
}: FamilyConnectPageProps) {
  const { t } = useI18n()
  const topBar =
    topBarVariant === 'caregiver' ? (
      <CaregiverTopBar activeHref="/caregiver/connect" />
    ) : (
      <FamilyTopNavigation />
    )

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#fbfdff] text-[#06143a]">
      {topBar}

      <div className="relative mx-auto w-full max-w-[1680px] px-5 pb-8 pt-5 sm:px-8 lg:px-[68px] lg:pb-10">
        <img
          src={heroConnectionSrc}
          alt=""
          width="706"
          height="400"
          className="pointer-events-none absolute right-7 -top-2 hidden h-[306px] w-[540px] select-none object-contain drop-shadow-[0_20px_34px_rgba(55,119,220,0.14)] lg:block xl:right-[70px]"
          aria-hidden="true"
          draggable="false"
        />

        <section
          className="relative max-w-[820px] pt-3"
          aria-labelledby="family-connect-title"
        >
          <h1
            id="family-connect-title"
            className="text-[44px] font-black leading-tight text-[#06143a] sm:text-[58px] lg:text-[70px]"
          >
            {t('family.connect.title')}
          </h1>
          <p className="mt-4 break-keep text-[20px] font-semibold leading-snug text-[#4a5d7e] sm:text-[22px]">
            {t('family.connect.description')}
          </p>
        </section>

        <div className="relative mt-6 grid gap-6 xl:grid-cols-[minmax(640px,1.04fr)_minmax(560px,0.86fr)]">
          <InviteCodeCard />
          <ConnectedElderCard />
        </div>

        <div className="mt-6">
          <BenefitsBar />
        </div>
      </div>
    </main>
  )
}
