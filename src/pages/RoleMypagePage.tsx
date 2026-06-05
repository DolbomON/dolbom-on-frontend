import {
  Bell,
  CalendarCheck,
  ChevronRight,
  FileText,
  HeartHandshake,
  HelpCircle,
  LogOut,
  ShieldCheck,
  UserRound,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DolbomLogo } from '../components/layout/DolbomLogo'
import type { TranslationKey } from '../lib/i18n/translations'
import { useI18n } from '../lib/i18n/useI18n'
import { cn } from '../lib/utils'

type RoleMypageKind = 'caregiver' | 'elder' | 'family'

type RoleMypageMetric = {
  labelKey: TranslationKey
  tone: 'blue' | 'green' | 'orange'
  valueKey: TranslationKey
}

type RoleMypageMenuItem = {
  descriptionKey: TranslationKey
  href: string
  icon: LucideIcon
  titleKey: TranslationKey
}

type RoleMypageConfig = {
  avatarSrc: string
  backTo: string
  descriptionKey: TranslationKey
  homeLabelKey: TranslationKey
  metrics: RoleMypageMetric[]
  menuItems: RoleMypageMenuItem[]
  nameKey: TranslationKey
  profileLabelKey: TranslationKey
  roleLabelKey: TranslationKey
  settings: TranslationKey[]
}

const configs: Record<RoleMypageKind, RoleMypageConfig> = {
  family: {
    avatarSrc: '/assets/dolbomon/worker/%EB%A9%B0%EB%8A%90%EB%A6%AC.png',
    backTo: '/family',
    descriptionKey: 'mypage.family.description',
    homeLabelKey: 'mypage.family.homeLabel',
    metrics: [
      {
        labelKey: 'mypage.family.metric.elder',
        valueKey: 'mypage.family.metric.elderValue',
        tone: 'blue',
      },
      {
        labelKey: 'mypage.family.metric.unread',
        valueKey: 'mypage.family.metric.unreadValue',
        tone: 'orange',
      },
      {
        labelKey: 'mypage.family.metric.notification',
        valueKey: 'mypage.family.metric.notificationValue',
        tone: 'green',
      },
    ],
    menuItems: [
      {
        descriptionKey: 'mypage.family.menu.notification.description',
        href: '/family/alerts#notification-settings',
        icon: Bell,
        titleKey: 'mypage.family.menu.notification.title',
      },
      {
        descriptionKey: 'mypage.family.menu.connect.description',
        href: '/family/connect',
        icon: HeartHandshake,
        titleKey: 'mypage.family.menu.connect.title',
      },
      {
        descriptionKey: 'mypage.family.menu.memo.description',
        href: '/family/memo',
        icon: FileText,
        titleKey: 'mypage.family.menu.memo.title',
      },
      {
        descriptionKey: 'mypage.menu.account.description',
        href: '#account',
        icon: ShieldCheck,
        titleKey: 'mypage.menu.account.title',
      },
    ],
    nameKey: 'mypage.family.name',
    profileLabelKey: 'mypage.family.profileAria',
    roleLabelKey: 'mypage.family.roleLabel',
    settings: [
      'mypage.family.setting.emergency',
      'mypage.family.setting.summary',
      'mypage.family.setting.memo',
    ],
  },
  caregiver: {
    avatarSrc: '/assets/dolbomon/worker-dashboard/요양사.png',
    backTo: '/caregiver',
    descriptionKey: 'mypage.caregiver.description',
    homeLabelKey: 'mypage.caregiver.homeLabel',
    metrics: [
      {
        labelKey: 'mypage.caregiver.metric.elder',
        valueKey: 'mypage.caregiver.metric.elderValue',
        tone: 'blue',
      },
      {
        labelKey: 'mypage.caregiver.metric.visit',
        valueKey: 'mypage.caregiver.metric.visitValue',
        tone: 'orange',
      },
      {
        labelKey: 'mypage.caregiver.metric.portfolio',
        valueKey: 'mypage.caregiver.metric.portfolioValue',
        tone: 'green',
      },
    ],
    menuItems: [
      {
        descriptionKey: 'mypage.caregiver.menu.assignment.description',
        href: '/caregiver/assignments',
        icon: CalendarCheck,
        titleKey: 'mypage.caregiver.menu.assignment.title',
      },
      {
        descriptionKey: 'mypage.caregiver.menu.schedule.description',
        href: '/caregiver/schedules',
        icon: Bell,
        titleKey: 'mypage.caregiver.menu.schedule.title',
      },
      {
        descriptionKey: 'mypage.caregiver.menu.portfolio.description',
        href: '/caregiver/portfolio',
        icon: UserRound,
        titleKey: 'mypage.caregiver.menu.portfolio.title',
      },
      {
        descriptionKey: 'mypage.menu.account.description',
        href: '#account',
        icon: ShieldCheck,
        titleKey: 'mypage.menu.account.title',
      },
    ],
    nameKey: 'mypage.caregiver.name',
    profileLabelKey: 'mypage.caregiver.profileAria',
    roleLabelKey: 'mypage.caregiver.roleLabel',
    settings: [
      'mypage.caregiver.setting.beforeVisit',
      'mypage.caregiver.setting.newAssignment',
      'mypage.caregiver.setting.familyMemo',
    ],
  },
  elder: {
    avatarSrc: '/assets/dolbomon/worker-elders/elder-kim-yeongja.png',
    backTo: '/elder',
    descriptionKey: 'mypage.elder.description',
    homeLabelKey: 'mypage.elder.homeLabel',
    metrics: [
      {
        labelKey: 'mypage.elder.metric.record',
        valueKey: 'mypage.elder.metric.recordValue',
        tone: 'orange',
      },
      {
        labelKey: 'mypage.elder.metric.family',
        valueKey: 'mypage.elder.metric.familyValue',
        tone: 'blue',
      },
      {
        labelKey: 'mypage.elder.metric.team',
        valueKey: 'mypage.elder.metric.teamValue',
        tone: 'green',
      },
    ],
    menuItems: [
      {
        descriptionKey: 'mypage.elder.menu.basic.description',
        href: '/elder/basic-info',
        icon: UserRound,
        titleKey: 'mypage.elder.menu.basic.title',
      },
      {
        descriptionKey: 'mypage.elder.menu.team.description',
        href: '/elder/care-team',
        icon: Users,
        titleKey: 'mypage.elder.menu.team.title',
      },
      {
        descriptionKey: 'mypage.elder.menu.emergency.description',
        href: '#emergency',
        icon: HeartHandshake,
        titleKey: 'mypage.elder.menu.emergency.title',
      },
      {
        descriptionKey: 'mypage.elder.menu.account.description',
        href: '#account',
        icon: ShieldCheck,
        titleKey: 'mypage.menu.account.title',
      },
    ],
    nameKey: 'mypage.elder.name',
    profileLabelKey: 'mypage.elder.profileAria',
    roleLabelKey: 'mypage.elder.roleLabel',
    settings: [
      'mypage.elder.setting.largeText',
      'mypage.elder.setting.voiceGuide',
      'mypage.elder.setting.shareFamily',
    ],
  },
}

const metricToneClasses: Record<RoleMypageMetric['tone'], string> = {
  blue: 'bg-[#edf6ff] text-[#0867f2]',
  green: 'bg-[#eaf8ef] text-[#0d7f45]',
  orange: 'bg-[#fff6e5] text-[#b86a00]',
}

type RoleMypagePageProps = {
  role: RoleMypageKind
}

export function RoleMypagePage({ role }: RoleMypagePageProps) {
  const config = configs[role]
  const { t } = useI18n()
  const [statusKey, setStatusKey] = useState<TranslationKey | ''>('')

  function handleLogout() {
    setStatusKey('mypage.status.logoutPending')
  }

  function handleSaveSettings() {
    setStatusKey('mypage.status.saved')
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#eef6ff] text-[#071747] lg:grid lg:place-items-center lg:p-[12px]">
      <div className="mx-auto min-h-svh w-full max-w-[520px] bg-[#f8fbff] shadow-[0_24px_80px_rgba(42,96,184,0.12)] lg:min-h-[calc(100svh-24px)] lg:max-w-[1120px] lg:overflow-hidden lg:rounded-[28px]">
        <header className="sticky top-0 z-20 border-b border-[#dfe8f5] bg-white/95 backdrop-blur lg:static">
          <div className="flex min-h-[72px] items-center justify-between gap-3 px-5 lg:min-h-16 lg:px-8">
            <DolbomLogo ariaLabel={t(config.homeLabelKey)} to={config.backTo} />
            <Link
              to={config.backTo}
              className="inline-flex min-h-11 items-center rounded-lg border border-[#cfe0f8] bg-white px-4 text-[16px] font-black text-[#0867f2] shadow-[0_8px_18px_rgba(47,86,145,0.08)] transition hover:bg-[#f1f7ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
            >
              {t('common.home')}
            </Link>
          </div>
        </header>

        <div className="px-5 pb-[max(28px,env(safe-area-inset-bottom))] pt-7 lg:px-8 lg:py-5">
          <section aria-labelledby={`${role}-mypage-title`}>
            <h1
              id={`${role}-mypage-title`}
              className="text-[34px] font-black leading-tight text-[#071747] lg:text-[36px]"
            >
              {t('mypage.title')}
            </h1>
            <p className="mt-3 break-keep text-[17px] font-semibold leading-snug text-[#4e596c]">
              {t(config.descriptionKey)}
            </p>
          </section>

          <div className="mt-6 grid gap-6 lg:mt-5 lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)] lg:gap-5">
            <div className="min-w-0">
              <section
                className="rounded-[22px] border border-[#d9e5f4] bg-white p-4 shadow-[0_16px_34px_rgba(47,86,145,0.1)]"
                aria-label={t(config.profileLabelKey)}
              >
                <div className="flex items-center gap-4 max-[359px]:flex-col max-[359px]:items-start lg:gap-5">
                  <img
                    src={config.avatarSrc}
                    alt=""
                    className="h-20 w-20 shrink-0 rounded-full bg-[#eaf4ff] object-cover shadow-[0_10px_24px_rgba(42,96,184,0.14)] lg:h-[88px] lg:w-[88px]"
                    draggable="false"
                  />
                  <div className="min-w-0">
                    <p className="text-[25px] font-black leading-tight text-[#071747] lg:text-[28px]">
                      {t(config.nameKey)}
                    </p>
                    <p className="mt-1 text-[16px] font-bold leading-tight text-[#53627a]">
                      {t(config.roleLabelKey)}
                    </p>
                    <button
                      type="button"
                      className="mt-3 inline-flex min-h-10 items-center rounded-lg border border-[#cfe0f8] bg-[#f6fbff] px-4 text-[16px] font-black text-[#0867f2] transition hover:bg-[#edf6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff] lg:min-h-11"
                      onClick={() =>
                        setStatusKey('mypage.status.profilePending')
                      }
                    >
                      {t('mypage.editProfile')}
                    </button>
                  </div>
                </div>
              </section>

              <section
                className="mt-4 grid grid-cols-3 gap-2 max-[359px]:grid-cols-1 lg:gap-3"
                aria-label={t('mypage.summaryAria')}
              >
                {config.metrics.map((metric) => (
                  <article
                    key={metric.labelKey}
                    className={cn(
                      'min-h-[86px] rounded-[18px] px-3 py-3 text-center shadow-[0_12px_24px_rgba(47,86,145,0.08)] lg:min-h-[84px]',
                      metricToneClasses[metric.tone],
                    )}
                  >
                    <p className="text-[14px] font-black leading-tight">
                      {t(metric.labelKey)}
                    </p>
                    <p className="mt-3 text-[24px] font-black leading-none lg:text-[26px]">
                      {t(metric.valueKey)}
                    </p>
                  </article>
                ))}
              </section>

              <section
                className="mt-6 lg:mt-5"
                aria-labelledby={`${role}-settings-title`}
              >
                <h2
                  id={`${role}-settings-title`}
                  className="text-[24px] font-black leading-tight text-[#071747] lg:text-[25px]"
                >
                  {t('mypage.settingsTitle')}
                </h2>

                <div className="mt-3 overflow-hidden rounded-[20px] border border-[#dfe7f2] bg-white shadow-[0_14px_30px_rgba(47,86,145,0.08)]">
                  {config.settings.map((settingKey) => (
                    <label
                      key={settingKey}
                      className="flex min-h-[62px] items-center justify-between gap-4 border-b border-[#e6edf6] px-4 py-3 last:border-b-0 lg:min-h-[54px] lg:py-2"
                    >
                      <span className="break-keep text-[17px] font-black leading-tight text-[#1f2d44]">
                        {t(settingKey)}
                      </span>
                      <input
                        className="h-7 w-7 accent-[#0867f2]"
                        type="checkbox"
                        defaultChecked
                      />
                    </label>
                  ))}
                </div>
              </section>
            </div>

            <div className="min-w-0">
              <section aria-label={t('mypage.menuAria')}>
                <div className="grid gap-3">
                  {config.menuItems.map((item) => {
                    const Icon = item.icon

                    return (
                      <Link
                        key={item.titleKey}
                        to={item.href}
                        className="grid min-h-[76px] grid-cols-[48px_minmax(0,1fr)_28px] items-center gap-3 rounded-[18px] border border-[#dfe7f2] bg-white px-4 py-3 shadow-[0_12px_26px_rgba(47,86,145,0.08)] transition hover:bg-[#f8fbff] active:scale-[0.995] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff] lg:min-h-[74px]"
                      >
                        <span className="grid h-12 w-12 place-items-center rounded-[14px] bg-[#edf6ff] text-[#0867f2]">
                          <Icon aria-hidden="true" className="h-7 w-7" />
                        </span>
                        <span className="min-w-0">
                          <strong className="block text-[18px] font-black leading-tight text-[#071747]">
                            {t(item.titleKey)}
                          </strong>
                          <span className="mt-1 block break-keep text-[14px] font-bold leading-snug text-[#5b6880] lg:text-[15px]">
                            {t(item.descriptionKey)}
                          </span>
                        </span>
                        <ChevronRight
                          aria-hidden="true"
                          className="h-7 w-7 text-[#63728b]"
                          strokeWidth={2.8}
                        />
                      </Link>
                    )
                  })}
                </div>
              </section>

              <div className="mt-7 grid grid-cols-[0.95fr_1.35fr] gap-3 max-[359px]:grid-cols-1 lg:mt-5">
                <button
                  type="button"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-[18px] border-2 border-[#0867f2] bg-white px-4 text-[18px] font-black text-[#0867f2] transition hover:bg-[#f3f8ff] active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
                  onClick={handleLogout}
                >
                  <LogOut aria-hidden="true" className="h-5 w-5" />
                  {t('common.logout')}
                </button>

                <button
                  type="button"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-[18px] bg-[#0867f2] px-4 text-[18px] font-black text-white shadow-[0_12px_22px_rgba(8,103,242,0.24)] transition hover:bg-[#075fe0] active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
                  onClick={handleSaveSettings}
                >
                  <HelpCircle aria-hidden="true" className="h-5 w-5" />
                  {t('mypage.saveSettings')}
                </button>
              </div>
            </div>
          </div>

          <p className="sr-only" aria-live="polite">
            {statusKey ? t(statusKey) : ''}
          </p>
        </div>
      </div>
    </main>
  )
}
