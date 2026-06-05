import { Check, Info, Menu, Share2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { DolbomLogo } from '../../components/layout/DolbomLogo'
import { FamilyBottomNav } from '../../components/layout/FamilyBottomNav'
import type { TranslationKey } from '../../lib/i18n/translations'
import { useI18n } from '../../lib/i18n/useI18n'
import { cn } from '../../lib/utils'

const familyTalkAssetBase = '/assets/dolbomon/familly-talk'

type HealthTone = 'normal' | 'caution'

type HealthRecord = {
  iconSrc: string
  labelKey: TranslationKey
  tone: HealthTone
  valueKey: TranslationKey
}

const healthRecords: HealthRecord[] = [
  {
    iconSrc: `${familyTalkAssetBase}/밥.png`,
    labelKey: 'family.status.meal',
    tone: 'normal',
    valueKey: 'family.status.mealValue',
  },
  {
    iconSrc: `${familyTalkAssetBase}/알약.png`,
    labelKey: 'family.status.medication',
    tone: 'normal',
    valueKey: 'family.status.medicationValue',
  },
  {
    iconSrc: `${familyTalkAssetBase}/추가.png`,
    labelKey: 'family.status.pain',
    tone: 'caution',
    valueKey: 'family.status.painValue',
  },
  {
    iconSrc: `${familyTalkAssetBase}/채팅.png`,
    labelKey: 'family.status.mood',
    tone: 'normal',
    valueKey: 'family.status.moodValue',
  },
  {
    iconSrc: `${familyTalkAssetBase}/달.png`,
    labelKey: 'family.status.sleep',
    tone: 'caution',
    valueKey: 'family.status.sleepValue',
  },
]

function ElderSummaryCard() {
  const { t } = useI18n()

  return (
    <section
      className="mt-7 rounded-[24px] border border-[#cfe0fb] bg-white p-3.5 shadow-[0_14px_28px_rgba(42,83,142,0.12)]"
      aria-labelledby="elder-summary-title"
    >
      <div className="grid min-h-[114px] grid-cols-[88px_minmax(0,1fr)] items-center gap-4 min-[390px]:grid-cols-[98px_minmax(0,1fr)] min-[390px]:gap-5 min-[460px]:grid-cols-[86px_minmax(0,1fr)_146px] min-[460px]:gap-3">
        <span className="grid h-[86px] w-[86px] overflow-hidden rounded-full bg-[#edf5ff] min-[390px]:h-[96px] min-[390px]:w-[96px] min-[460px]:h-[86px] min-[460px]:w-[86px]">
          <img
            src={`${familyTalkAssetBase}/어르신.png`}
            alt=""
            width="1024"
            height="1024"
            className="h-full w-full scale-125 object-cover"
            aria-hidden="true"
            draggable="false"
          />
        </span>

        <div className="min-w-0 min-[460px]:contents">
          <div className="flex flex-col gap-3 min-[460px]:contents">
            <div className="min-w-0">
              <h2
                id="elder-summary-title"
                className="break-keep text-[28px] font-black leading-tight text-[#071747] min-[460px]:text-[23px]"
              >
                {t('family.home.elderName')}
              </h2>
              <p className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[18px] font-semibold leading-tight text-[#4f5c73]">
                <span>{t('family.status.currentState')}</span>
                <strong className="text-[24px] font-black text-[#1765fb]">
                  {t('family.status.stable')}
                </strong>
              </p>
            </div>

            <span className="inline-flex min-h-[42px] w-fit items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[#a9c7ff] bg-[#f8fbff] px-3 text-[17px] font-black leading-none text-[#1765fb] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] min-[460px]:px-2.5 min-[460px]:text-[16px]">
              <Check
                className="h-6 w-6 shrink-0 min-[460px]:h-5 min-[460px]:w-5"
                aria-hidden="true"
              />
              {t('family.status.familyConfirmed')}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

function HealthRecordCard({ record }: { record: HealthRecord }) {
  const isCaution = record.tone === 'caution'
  const { t } = useI18n()

  return (
    <li className="grid min-h-[86px] grid-cols-[80px_minmax(62px,0.75fr)_1px_minmax(92px,1fr)] items-center gap-3 rounded-[22px] border border-[#dfe7f2] bg-white px-3 py-2 shadow-[0_10px_22px_rgba(31,65,112,0.08)] min-[390px]:grid-cols-[90px_minmax(72px,0.75fr)_1px_minmax(112px,1fr)] min-[390px]:px-4">
      <span className="grid h-[72px] w-[72px] place-items-center rounded-[18px] bg-[#f2f7ff] min-[390px]:h-[78px] min-[390px]:w-[78px]">
        <img
          src={record.iconSrc}
          alt=""
          width="1024"
          height="1024"
          className="h-[62px] w-[62px] object-contain min-[390px]:h-[68px] min-[390px]:w-[68px]"
          aria-hidden="true"
          draggable="false"
        />
      </span>

      <span className="flex min-w-0 items-center gap-3">
        <span
          className={cn(
            'h-3.5 w-3.5 shrink-0 rounded-full shadow-[0_4px_8px_rgba(23,101,251,0.22)]',
            isCaution ? 'bg-[#ff3449]' : 'bg-[#1765fb]',
          )}
          aria-hidden="true"
        />
        <strong className="min-w-0 text-[21px] font-black leading-tight text-[#071747]">
          {t(record.labelKey)}
        </strong>
      </span>

      <span className="h-[42px] w-px bg-[#dfe5ef]" aria-hidden="true" />

      <span className="min-w-0 break-keep text-[20px] font-semibold leading-tight text-[#2f3e59]">
        {t(record.valueKey)}
      </span>
    </li>
  )
}

function WeeklyChangeCard() {
  const { t } = useI18n()
  const days = [
    { labelKey: 'common.weekday.mon', tone: 'normal' },
    { labelKey: 'common.weekday.tue', tone: 'normal' },
    { labelKey: 'common.weekday.wed', tone: 'normal' },
    { labelKey: 'common.weekday.thu', tone: 'caution' },
    { labelKey: 'common.weekday.fri', tone: 'normal' },
  ] as const

  return (
    <section className="mt-7" aria-labelledby="weekly-change-title">
      <h2
        id="weekly-change-title"
        className="text-[22px] font-black leading-none text-[#071747]"
      >
        {t('family.status.weekly.title')}
      </h2>

      <div className="mt-3 rounded-[22px] border border-[#d6e4fa] bg-white px-5 pb-3.5 pt-4 shadow-[0_10px_22px_rgba(31,65,112,0.08)]">
        <ol
          className="relative grid grid-cols-5 items-start text-center"
          aria-label={t('family.status.weeklyAria')}
        >
          <span
            className="absolute left-[10%] right-[10%] top-[38px] border-t-2 border-dashed border-[#a8caff]"
            aria-hidden="true"
          />

          {days.map((day) => {
            const isCaution = day.tone === 'caution'
            const dayLabel = t(day.labelKey)

            return (
              <li
                key={day.labelKey}
                className="relative z-10 flex flex-col items-center gap-3"
              >
                <span className="text-[17px] font-semibold leading-none text-[#2f3e59]">
                  {dayLabel}
                </span>
                <span
                  className={cn(
                    'grid h-5 w-5 place-items-center rounded-full',
                    isCaution
                      ? 'h-9 w-9 bg-[#ffd8dd]'
                      : 'bg-[#1765fb] shadow-[0_5px_9px_rgba(23,101,251,0.28)]',
                  )}
                  aria-label={
                    isCaution
                      ? t('family.status.weekly.cautionAria', {
                          day: dayLabel,
                        })
                      : t('family.status.weekly.stableAria', {
                          day: dayLabel,
                        })
                  }
                >
                  {isCaution ? (
                    <span
                      className="h-5 w-5 rounded-full border-[5px] border-white bg-[#ff3449] shadow-[0_5px_10px_rgba(255,52,73,0.24)]"
                      aria-hidden="true"
                    />
                  ) : null}
                </span>
              </li>
            )
          })}
        </ol>

        <div className="mt-3 flex min-h-[48px] items-center gap-3 rounded-full bg-[#f1f6fd] px-4 text-[18px] font-semibold leading-tight text-[#2f3e59]">
          <span
            className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#4f8dff] text-white shadow-[0_5px_10px_rgba(79,141,255,0.24)]"
            aria-hidden="true"
          >
            <Info className="h-5 w-5" />
          </span>
          <p className="min-w-0 break-keep">
            {t('family.status.weeklyNotice.before')}
            <strong className="font-black text-[#ff3449]">
              {t('family.status.weeklyNotice.item')}
            </strong>
            {t('family.status.weeklyNotice.after')}
          </p>
        </div>
      </div>
    </section>
  )
}

export function FamilyStatusPage() {
  const navigate = useNavigate()
  const { t } = useI18n()

  function handleMenuClick() {
    navigate('/family/mypage')
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#eef5ff] text-[#071747]">
      <section
        className="mx-auto flex min-h-svh w-full max-w-[480px] flex-col bg-white px-5 pb-[calc(88px+env(safe-area-inset-bottom))] pt-[max(18px,env(safe-area-inset-top))] shadow-[0_24px_80px_rgba(55,104,184,0.1)] min-[390px]:px-6 min-[430px]:px-7"
        aria-label={t('family.status.aria')}
      >
        <header className="flex items-start justify-between gap-4">
          <DolbomLogo ariaLabel={t('family.status.logoAria')} to="/family" />

          <button
            className="inline-grid h-11 w-11 place-items-center rounded-md text-[#071747] transition active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
            type="button"
            aria-label={t('common.myPage.open')}
            onClick={handleMenuClick}
          >
            <Menu aria-hidden="true" size={38} strokeWidth={2.8} />
          </button>
        </header>

        <section className="pt-9" aria-labelledby="family-status-title">
          <p className="text-[24px] font-semibold leading-none text-[#52617a]">
            {t('common.date.may31Sat')}
          </p>
          <h1
            id="family-status-title"
            className="mt-5 text-[42px] font-black leading-none text-[#071747]"
          >
            {t('family.status.title')}
          </h1>
          <p className="mt-5 break-keep text-[20px] font-semibold leading-snug text-[#34435d]">
            {t('family.status.description')}
          </p>
        </section>

        <ElderSummaryCard />

        <ol
          className="mt-5 grid gap-3.5"
          aria-label={t('family.status.recordsAria')}
        >
          {healthRecords.map((record) => (
            <HealthRecordCard key={record.labelKey} record={record} />
          ))}
        </ol>

        <WeeklyChangeCard />

        <button
          type="button"
          className="mt-5 flex min-h-[64px] w-full items-center justify-center gap-3 rounded-[18px] bg-[linear-gradient(135deg,#4f94ff_0%,#0966f2_100%)] px-4 text-[25px] font-black leading-none text-white shadow-[0_14px_26px_rgba(9,102,242,0.25),inset_0_1px_0_rgba(255,255,255,0.28)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
        >
          <Share2 className="h-8 w-8 shrink-0" aria-hidden="true" />
          {t('family.status.shareAnomaly')}
        </button>

        <FamilyBottomNav activeItem="status" />
      </section>
    </main>
  )
}
