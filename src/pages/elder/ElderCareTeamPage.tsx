import {
  ArrowLeft,
  Bell,
  CheckCircle2,
  Copy,
  Eye,
  Send,
  Users,
  type LucideIcon,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { DolbomLogo } from '../../components/layout/DolbomLogo'
import type { TranslationKey } from '../../lib/i18n/translations'
import { useI18n } from '../../lib/i18n/useI18n'
import { cn } from '../../lib/utils'

const welfareAssetBase = '/assets/dolbomon/welfare'
const workerAssetBase = '/assets/dolbomon/worker'

const teamHeroSrc = `${welfareAssetBase}/6f29695f-1a78-453b-a8a0-b3caa432e8ab.png`
const socialWorkerSrc = `${welfareAssetBase}/image-removebg-preview%20(1).png`
const caregiverSrc = `${welfareAssetBase}/image-removebg-preview%20(2).png`
const securityShieldSrc = `${welfareAssetBase}/image-removebg-preview%20(3).png`
const inviteIconSrc = `${welfareAssetBase}/image-removebg-preview%20(4).png`
const laptopSrc = `${welfareAssetBase}/image-removebg-preview%20(5).png`
const caregiverPropsSrc = `${welfareAssetBase}/image-removebg-preview%20(6).png`
const infoShieldSrc = `${welfareAssetBase}/image-removebg-preview%20(7).png`
const familyIconSrc = `${welfareAssetBase}/image-removebg-preview.png`
const eyeIconSrc = `${welfareAssetBase}/1.png`
const lockIconSrc = `${welfareAssetBase}/2.png`
const sliderIconSrc = `${welfareAssetBase}/3.png`
const chatIconSrc = `${welfareAssetBase}/4.png`

type NavItem = {
  active?: boolean
  href: string
  labelKey: TranslationKey
}

type FamilyMember = {
  avatarSrc: string
  nameKey: TranslationKey
  relationKey: TranslationKey
}

type TeamRole = {
  avatarSrc: string
  badgeKey: TranslationKey
  badgeClassName: string
  descriptionKey: TranslationKey
  headingKey: TranslationKey
  iconSrc: string
  nameKey: TranslationKey
  propSrc: string
}

type InfoItem = {
  descriptionKey?: TranslationKey
  icon?: LucideIcon
  iconClassName?: string
  iconSrc?: string
  titleKey?: TranslationKey
}

const navItems: NavItem[] = [
  { active: true, href: '/elder/care-team', labelKey: 'elder.careTeam.title' },
]

const familyMembers: FamilyMember[] = [
  {
    avatarSrc: `${workerAssetBase}/딸.png`,
    nameKey: 'elder.careTeam.family.daughter.name',
    relationKey: 'elder.careTeam.family.daughter.relation',
  },
  {
    avatarSrc: `${workerAssetBase}/아들.png`,
    nameKey: 'elder.careTeam.family.son.name',
    relationKey: 'elder.careTeam.family.son.relation',
  },
]

const teamRoles: TeamRole[] = [
  {
    avatarSrc: socialWorkerSrc,
    badgeKey: 'elder.careTeam.role.worker',
    badgeClassName: 'bg-[#efeaff] text-[#654ee9]',
    descriptionKey: 'elder.careTeam.worker.description',
    headingKey: 'elder.careTeam.worker.heading',
    iconSrc: socialWorkerSrc,
    nameKey: 'elder.careTeam.worker.name',
    propSrc: laptopSrc,
  },
  {
    avatarSrc: caregiverSrc,
    badgeKey: 'elder.careTeam.role.caregiver',
    badgeClassName: 'bg-[#dff8e8] text-[#0a8f53]',
    descriptionKey: 'elder.careTeam.caregiver.description',
    headingKey: 'elder.careTeam.caregiver.heading',
    iconSrc: caregiverSrc,
    nameKey: 'elder.careTeam.caregiver.name',
    propSrc: caregiverPropsSrc,
  },
]

const infoItems: InfoItem[] = [
  {
    iconSrc: infoShieldSrc,
    titleKey: 'elder.careTeam.info.title',
  },
  {
    descriptionKey: 'elder.careTeam.info.familyOnly',
    iconSrc: eyeIconSrc,
  },
  {
    descriptionKey: 'elder.careTeam.info.staff',
    iconSrc: lockIconSrc,
  },
  {
    descriptionKey: 'elder.careTeam.info.adjust',
    iconSrc: sliderIconSrc,
  },
  {
    descriptionKey: 'elder.careTeam.info.contact',
    iconSrc: chatIconSrc,
  },
]

function Logo() {
  const { t } = useI18n()

  return <DolbomLogo ariaLabel={t('elder.home.logoAria')} to="/elder" />
}

function TopNavigation() {
  const { t } = useI18n()

  return (
    <header className="sticky top-0 z-40 border-b border-[#dce5f1] bg-white/96 shadow-[0_5px_18px_rgba(35,73,128,0.06)] backdrop-blur">
      <div className="mx-auto grid min-h-[74px] w-full max-w-[1800px] grid-cols-[auto_auto] items-center gap-x-4 gap-y-2 px-5 lg:grid-cols-[300px_minmax(0,1fr)_auto] lg:px-8">
        <Logo />

        <nav
          className="col-span-2 row-start-2 flex min-w-0 justify-start overflow-visible pb-2 text-[16px] font-extrabold text-[#0c1531] lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:justify-center lg:pb-0"
          aria-label={t('elder.careTeam.navAria')}
        >
          {navItems.map((item) => (
            <Link
              key={item.labelKey}
              to={item.href}
              className={cn(
                'relative inline-flex min-h-12 shrink-0 items-center justify-center rounded-md px-2 transition hover:text-[#0867f2] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff] lg:min-h-[74px]',
                item.active ? 'text-[#0867f2]' : 'text-[#111827]',
              )}
              aria-current={item.active ? 'page' : undefined}
            >
              {t(item.labelKey)}
              <span
                className={cn(
                  'absolute bottom-0 left-1 right-1 h-1 rounded-full bg-[#0867f2]',
                  !item.active && 'hidden',
                )}
                aria-hidden="true"
              />
            </Link>
          ))}
        </nav>

        <div className="col-start-2 row-start-1 flex items-center gap-4 justify-self-end lg:col-start-3">
          <Link
            to="/elder"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#dfe7f2] bg-white px-4 text-[15px] font-black text-[#071747] shadow-[0_8px_20px_rgba(48,82,132,0.08)] transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff] sm:min-h-12 sm:px-5 sm:text-[16px]"
            aria-label={t('elder.careTeam.backAria')}
          >
            <ArrowLeft
              aria-hidden="true"
              className="h-5 w-5"
              strokeWidth={2.7}
            />
            {t('elder.careTeam.back')}
          </Link>
        </div>
      </div>
    </header>
  )
}

function HeroMetric({
  count,
  iconSrc,
  labelKey,
}: {
  count: string
  iconSrc: string
  labelKey: TranslationKey
}) {
  const { t } = useI18n()

  return (
    <span className="inline-flex min-h-[74px] min-w-[160px] items-center justify-center gap-3 rounded-[12px] border border-[#e5edf7] bg-white/92 px-4 shadow-[0_12px_24px_rgba(43,86,150,0.08)]">
      <img
        src={iconSrc}
        alt=""
        className="h-11 w-11 object-contain"
        aria-hidden="true"
        draggable="false"
      />
      <span className="text-left">
        <span className="block text-[16px] font-extrabold leading-tight text-[#253653]">
          {t(labelKey)}
        </span>
        <strong className="block text-[27px] font-black leading-none text-[#071747]">
          {count}
        </strong>
      </span>
    </span>
  )
}

function PrivacyHero() {
  const { t } = useI18n()

  return (
    <section
      className="relative min-h-[230px] overflow-hidden rounded-[14px] border border-[#cfe0f6] bg-[linear-gradient(105deg,#f9fcff_0%,#eef7ff_54%,#f8fbff_100%)] shadow-[0_14px_34px_rgba(44,91,157,0.09)] md:h-[270px]"
      aria-labelledby="care-team-privacy-title"
    >
      <img
        src={teamHeroSrc}
        alt=""
        className="pointer-events-none absolute bottom-0 left-0 hidden h-full w-[430px] select-none object-cover object-left-top md:block lg:w-[480px]"
        aria-hidden="true"
        draggable="false"
      />

      <div className="relative z-10 grid min-h-[230px] gap-5 px-5 py-6 md:h-full md:min-h-0 md:grid-cols-[minmax(360px,0.82fr)_minmax(430px,1fr)_minmax(240px,0.62fr)] md:items-center md:px-8 lg:grid-cols-[520px_minmax(430px,1fr)_330px] lg:px-10">
        <div className="hidden md:block" aria-hidden="true" />

        <div className="min-w-0">
          <h2
            id="care-team-privacy-title"
            className="break-keep text-[31px] font-black leading-tight text-[#071747] lg:text-[36px]"
          >
            {t('elder.careTeam.hero.line1')}{' '}
            <br className="hidden sm:block" />
            {t('elder.careTeam.hero.line2')}
          </h2>

          <div
            className="mt-6 flex flex-wrap gap-5"
            aria-label={t('elder.careTeam.hero.metricsAria')}
          >
            <HeroMetric
              count={t('elder.careTeam.metric.familyCount')}
              iconSrc={familyIconSrc}
              labelKey="elder.careTeam.metric.family"
            />
            <HeroMetric
              count={t('elder.careTeam.metric.workerCount')}
              iconSrc={socialWorkerSrc}
              labelKey="elder.careTeam.metric.worker"
            />
            <HeroMetric
              count={t('elder.careTeam.metric.caregiverCount')}
              iconSrc={caregiverSrc}
              labelKey="elder.careTeam.metric.caregiver"
            />
          </div>
        </div>

        <div className="relative min-h-[170px] md:min-h-[210px]">
          <img
            src={securityShieldSrc}
            alt=""
            className="pointer-events-none absolute bottom-[-10px] left-1/2 h-[190px] w-[240px] -translate-x-1/2 select-none object-contain drop-shadow-[0_22px_28px_rgba(55,110,194,0.14)] md:right-0 md:left-auto md:h-[220px] md:w-[300px] md:translate-x-0"
            aria-hidden="true"
            draggable="false"
          />
        </div>
      </div>
    </section>
  )
}

function SectionCard({
  children,
  className,
  titleId,
}: {
  children: ReactNode
  className?: string
  titleId?: string
}) {
  return (
    <section
      className={cn(
        'rounded-[14px] border border-[#dfe7f2] bg-white p-5 shadow-[0_14px_34px_rgba(40,76,132,0.08)]',
        className,
      )}
      aria-labelledby={titleId}
    >
      {children}
    </section>
  )
}

function CardTitle({
  children,
  iconSrc,
  id,
}: {
  children: ReactNode
  iconSrc?: string
  id: string
}) {
  return (
    <div className="flex items-center gap-3">
      {iconSrc ? (
        <img
          src={iconSrc}
          alt=""
          className="h-8 w-8 object-contain"
          aria-hidden="true"
          draggable="false"
        />
      ) : (
        <Users aria-hidden="true" className="h-8 w-8 text-[#0867f2]" />
      )}
      <h2
        id={id}
        className="text-[22px] font-black leading-tight text-[#071747]"
      >
        {children}
      </h2>
    </div>
  )
}

function PermissionPill({
  children,
  icon: Icon,
  tone = 'blue',
}: {
  children: ReactNode
  icon: LucideIcon
  tone?: 'blue' | 'green'
}) {
  return (
    <span
      className={cn(
        'inline-flex min-h-7 items-center gap-1.5 rounded-full px-3 text-[13px] font-black leading-none',
        tone === 'green'
          ? 'bg-[#e6f8ed] text-[#118248]'
          : 'bg-[#edf5ff] text-[#0867f2]',
      )}
    >
      <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={2.6} />
      {children}
    </span>
  )
}

function FamilyMemberRow({ member }: { member: FamilyMember }) {
  const { t } = useI18n()

  return (
    <article className="grid min-h-[104px] grid-cols-[74px_minmax(0,1fr)_32px] items-center gap-4 rounded-[12px] border border-[#e3eaf4] bg-white px-4 py-3 shadow-[0_8px_20px_rgba(35,68,116,0.05)]">
      <img
        src={member.avatarSrc}
        alt=""
        className="h-[74px] w-[74px] rounded-full bg-[#eef6ff] object-cover"
        aria-hidden="true"
        draggable="false"
      />

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <strong className="text-[23px] font-black leading-tight text-[#071747]">
            {t(member.nameKey)}
          </strong>
          <span className="inline-flex min-h-7 items-center rounded-full bg-[#eaf3ff] px-3 text-[14px] font-black leading-none text-[#0867f2]">
            {t(member.relationKey)}
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <PermissionPill icon={Eye}>
            {t('elder.careTeam.permission.status')}
          </PermissionPill>
          <PermissionPill icon={Bell} tone="green">
            {t('elder.careTeam.permission.notification')}
          </PermissionPill>
        </div>
      </div>

      <CheckCircle2
        aria-label={t('elder.careTeam.connectedAria')}
        className="h-8 w-8 text-[#14a34a]"
        strokeWidth={2.6}
      />
    </article>
  )
}

function FamilyCard() {
  const { t } = useI18n()

  return (
    <SectionCard
      className="min-h-[360px] xl:h-[360px]"
      titleId="connected-family-title"
    >
      <CardTitle id="connected-family-title" iconSrc={familyIconSrc}>
        {t('elder.careTeam.metric.family')}
      </CardTitle>

      <div className="mt-4 grid gap-3">
        {familyMembers.map((member) => (
          <FamilyMemberRow key={member.nameKey} member={member} />
        ))}
      </div>
    </SectionCard>
  )
}

function TeamRoleCard({ role }: { role: TeamRole }) {
  const { t } = useI18n()

  return (
    <SectionCard
      className="min-h-[360px] xl:h-[360px]"
      titleId={`${role.nameKey}-title`}
    >
      <CardTitle id={`${role.nameKey}-title`} iconSrc={role.iconSrc}>
        {t(role.headingKey)}
      </CardTitle>

      <article className="mt-5 flex min-h-[265px] flex-col items-center justify-between text-center">
        <div className="flex flex-col items-center">
          <img
            src={role.avatarSrc}
            alt=""
            className="h-[96px] w-[96px] rounded-full bg-[#eef6ff] object-contain shadow-[0_10px_22px_rgba(39,80,140,0.1)]"
            aria-hidden="true"
            draggable="false"
          />
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <strong className="text-[24px] font-black leading-tight text-[#071747]">
              {t(role.nameKey)}
            </strong>
            <span
              className={cn(
                'inline-flex min-h-7 items-center rounded-full px-3 text-[14px] font-black leading-none',
                role.badgeClassName,
              )}
            >
              {t(role.badgeKey)}
            </span>
          </div>
          <p className="mt-3 break-keep text-[16px] font-bold leading-tight text-[#53627a]">
            {t(role.descriptionKey)}
          </p>
        </div>

        <img
          src={role.propSrc}
          alt=""
          className="h-[88px] w-[190px] object-contain drop-shadow-[0_14px_18px_rgba(55,91,143,0.1)]"
          aria-hidden="true"
          draggable="false"
        />
      </article>
    </SectionCard>
  )
}

function InviteCodeCard() {
  const { t } = useI18n()

  return (
    <SectionCard
      className="min-h-[382px] p-5 xl:h-[382px]"
      titleId="family-invite-title"
    >
      <div className="flex items-center gap-3">
        <img
          src={inviteIconSrc}
          alt=""
          className="h-9 w-9 object-contain"
          aria-hidden="true"
          draggable="false"
        />
        <h2
          id="family-invite-title"
          className="break-keep text-[21px] font-black leading-tight text-[#071747]"
        >
          {t('elder.careTeam.invite.title')}
        </h2>
      </div>

      <div className="mt-4 rounded-[12px] border border-[#bcd8ff] bg-[#f1f7ff] p-2 shadow-[inset_0_0_0_4px_rgba(255,255,255,0.55)]">
        <p className="rounded-[10px] border-2 border-dashed border-[#c8ddff] bg-white/72 px-4 py-4 text-center text-[34px] font-black leading-none tracking-[0.05em] text-[#0867f2]">
          DOLBOM-3942
        </p>
      </div>

      <p className="mx-auto mt-3 max-w-[300px] break-keep text-center text-[16px] font-bold leading-snug text-[#52617a]">
        {t('elder.careTeam.invite.description')}
      </p>

      <div className="mt-3 grid gap-3">
        <button
          type="button"
          className="inline-flex min-h-[52px] w-full items-center justify-center gap-3 rounded-[8px] bg-[#0867f2] px-4 text-[19px] font-black leading-none text-white shadow-[0_14px_28px_rgba(8,103,242,0.23)] transition hover:bg-[#005cdf] active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
        >
          <Send aria-hidden="true" className="h-6 w-6" strokeWidth={2.8} />
          {t('elder.careTeam.invite.send')}
        </button>
        <button
          type="button"
          className="inline-flex min-h-[46px] w-full items-center justify-center gap-3 rounded-[8px] border-2 border-[#0867f2] bg-white px-4 text-[17px] font-black leading-none text-[#0867f2] transition hover:bg-[#f2f7ff] active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
        >
          <Copy aria-hidden="true" className="h-6 w-6" strokeWidth={2.7} />
          {t('elder.careTeam.invite.copy')}
        </button>
      </div>
    </SectionCard>
  )
}

function InfoItemCard({
  item,
  showDivider,
}: {
  item: InfoItem
  showDivider: boolean
}) {
  const Icon = item.icon
  const { t } = useI18n()

  return (
    <article className="relative flex min-h-[88px] items-center gap-4 px-4 py-3">
      {item.iconSrc ? (
        <img
          src={item.iconSrc}
          alt=""
          className="h-12 w-12 shrink-0 object-contain"
          aria-hidden="true"
          draggable="false"
        />
      ) : Icon ? (
        <Icon
          aria-hidden="true"
          className={cn('h-12 w-12 shrink-0', item.iconClassName)}
          strokeWidth={2.7}
        />
      ) : null}

      <div className="min-w-0">
        {item.titleKey ? (
          <h2 className="text-[21px] font-black leading-tight text-[#071747]">
            {t(item.titleKey)}
          </h2>
        ) : (
          <p className="break-keep text-[16px] font-bold leading-snug text-[#34415d]">
            {item.descriptionKey ? t(item.descriptionKey) : ''}
          </p>
        )}
      </div>

      {showDivider ? (
        <span
          className="absolute right-0 top-1/2 hidden h-16 w-px -translate-y-1/2 bg-[#d7dfea] lg:block"
          aria-hidden="true"
        />
      ) : null}
    </article>
  )
}

function InfoBar() {
  const { t } = useI18n()

  return (
    <section
      className="grid rounded-[14px] border border-[#dfe7f2] bg-white shadow-[0_14px_34px_rgba(40,76,132,0.08)] md:grid-cols-2 lg:grid-cols-[1.12fr_1.4fr_1.55fr_1.4fr_1.45fr]"
      aria-label={t('elder.careTeam.info.title')}
    >
      {infoItems.map((item, index) => (
        <InfoItemCard
          key={item.titleKey ?? item.descriptionKey}
          item={item}
          showDivider={index < infoItems.length - 1}
        />
      ))}
    </section>
  )
}

export function ElderCareTeamPage() {
  const { t } = useI18n()

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#fbfdff] text-[#071747]">
      <TopNavigation />

      <div className="mx-auto w-full max-w-[1800px] px-5 pb-7 pt-6 sm:px-7 lg:px-[54px]">
        <section aria-labelledby="care-team-title">
          <h1
            id="care-team-title"
            className="text-[42px] font-black leading-tight text-[#071747] lg:text-[52px]"
          >
            {t('elder.careTeam.title')}
          </h1>
          <p className="mt-2 break-keep text-[19px] font-bold leading-snug text-[#3f4e68]">
            {t('elder.careTeam.description')}
          </p>
        </section>

        <div className="mt-6">
          <PrivacyHero />
        </div>

        <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(470px,1.28fr)_minmax(260px,0.62fr)_minmax(270px,0.66fr)_minmax(360px,0.94fr)]">
          <FamilyCard />
          {teamRoles.map((role) => (
            <TeamRoleCard key={role.nameKey} role={role} />
          ))}
          <InviteCodeCard />
        </div>

        <div className="mt-5">
          <InfoBar />
        </div>
      </div>
    </main>
  )
}
