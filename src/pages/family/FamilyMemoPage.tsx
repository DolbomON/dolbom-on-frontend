import { ChevronLeft, ChevronRight, Menu, PlusCircle } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { DolbomLogo } from '../../components/layout/DolbomLogo'
import { FamilyBottomNav } from '../../components/layout/FamilyBottomNav'
import type { TranslationKey } from '../../lib/i18n/translations'
import { useI18n } from '../../lib/i18n/useI18n'

const familyAssetBase = '/assets/dolbomon/familly'
const familyTalkAssetBase = '/assets/dolbomon/familly-talk'
const workerMemoAssetBase = '/assets/dolbomon/worker-memo'

const sharedMemos = [
  {
    descriptionKey: 'family.memo.shared.hospital.description',
    iconSrc: `${familyAssetBase}/전화.png`,
    titleKey: 'family.memo.shared.hospital.title',
  },
  {
    descriptionKey: 'family.memo.shared.meal.description',
    iconSrc: `${familyTalkAssetBase}/밥.png`,
    titleKey: 'family.memo.shared.meal.title',
  },
  {
    descriptionKey: 'family.memo.shared.medication.description',
    iconSrc: `${familyTalkAssetBase}/알약.png`,
    titleKey: 'family.memo.shared.medication.title',
  },
] satisfies Array<{
  descriptionKey: TranslationKey
  iconSrc: string
  titleKey: TranslationKey
}>

const upcomingSchedules = [
  {
    dateKey: 'common.date.june1',
    iconSrc: `${workerMemoAssetBase}/달력.png`,
    titleKey: 'family.memo.schedule.orthopedics',
  },
  {
    dateKey: 'common.date.june3',
    iconSrc: `${familyAssetBase}/전화.png`,
    titleKey: 'family.memo.schedule.familyCall',
  },
] satisfies Array<{
  dateKey: TranslationKey
  iconSrc: string
  titleKey: TranslationKey
}>

function PriorityMemoCard() {
  const { t } = useI18n()

  return (
    <section
      className="mt-8 grid min-h-[176px] grid-cols-[86px_minmax(0,1fr)] gap-5 rounded-[28px] border border-[#dbe6f5] bg-[#eaf2ff] px-5 py-6 shadow-[0_12px_22px_rgba(45,79,133,0.12)]"
      aria-labelledby="priority-memo-title"
    >
      <span className="grid h-[68px] w-[68px] place-items-center rounded-[15px] bg-white shadow-[0_8px_14px_rgba(41,76,128,0.09)]">
        <img
          src={`${familyAssetBase}/펜.png`}
          alt=""
          width="1024"
          height="1024"
          className="h-[42px] w-[42px] object-contain"
          aria-hidden="true"
          draggable="false"
        />
      </span>

      <div className="min-w-0">
        <h2
          id="priority-memo-title"
          className="break-keep text-[30px] font-black leading-tight text-[#131b31]"
        >
          {t('family.memo.priorityTitle')}
        </h2>
        <p className="mt-3 break-keep text-[20px] font-semibold leading-[1.55] text-[#5c6678]">
          {t('family.memo.priorityDescription')}
        </p>
        <span className="mt-4 inline-flex min-h-[34px] items-center rounded-full bg-white px-5 text-[19px] font-black leading-none text-[#2f70f6]">
          {t('family.memo.priorityBadge')}
        </span>
      </div>
    </section>
  )
}

function SharedMemoList() {
  const { t } = useI18n()

  return (
    <section className="mt-7" aria-labelledby="shared-memo-title">
      <h2
        id="shared-memo-title"
        className="text-[29px] font-black leading-none text-[#131b31]"
      >
        {t('family.memo.sharedTitle')}
      </h2>

      <div className="mt-4 grid gap-4">
        {sharedMemos.map((memo) => (
          <Link
            key={memo.titleKey}
            to="#shared-memo"
            className="grid min-h-[82px] grid-cols-[70px_minmax(0,1fr)_28px] items-center gap-4 rounded-[24px] border border-[#e1e7f0] bg-white px-4 py-3 shadow-[0_8px_18px_rgba(35,66,111,0.08)] transition active:scale-[0.995] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
            aria-label={`${t(memo.titleKey)}, ${t(memo.descriptionKey)}`}
          >
            <span className="grid h-[54px] w-[54px] place-items-center rounded-[15px] bg-[#eef3fb] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
              <img
                src={memo.iconSrc}
                alt=""
                width="1024"
                height="1024"
                className="h-[38px] w-[38px] object-contain"
                aria-hidden="true"
                draggable="false"
              />
            </span>
            <span className="min-w-0">
              <strong className="block truncate text-[22px] font-black leading-tight text-[#131b31]">
                {t(memo.titleKey)}
              </strong>
              <span className="mt-1 block truncate text-[17px] font-semibold leading-tight text-[#5c6678]">
                {t(memo.descriptionKey)}
              </span>
            </span>
            <ChevronRight
              aria-hidden="true"
              className="h-7 w-7 text-[#2f70f6]"
              strokeWidth={3}
            />
          </Link>
        ))}
      </div>
    </section>
  )
}

function UpcomingScheduleList() {
  const { t } = useI18n()

  return (
    <section className="mt-7" aria-labelledby="upcoming-schedule-title">
      <div className="flex items-end gap-2">
        <h2
          id="upcoming-schedule-title"
          className="text-[29px] font-black leading-none text-[#131b31]"
        >
          {t('family.memo.scheduleTitle')}
        </h2>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {upcomingSchedules.map((schedule) => (
          <article
            key={schedule.titleKey}
            className="grid min-h-[88px] grid-cols-[54px_minmax(0,1fr)] items-center gap-3 rounded-[23px] border border-[#e1e7f0] bg-white px-3 py-3 shadow-[0_8px_18px_rgba(35,66,111,0.08)]"
          >
            <span className="grid h-[50px] w-[50px] place-items-center rounded-[15px] bg-[#eef3fb]">
              <img
                src={schedule.iconSrc}
                alt=""
                width="1024"
                height="1024"
                className="h-[34px] w-[34px] object-contain"
                aria-hidden="true"
                draggable="false"
              />
            </span>
            <span className="min-w-0">
              <time className="block truncate text-[20px] font-bold leading-none text-[#2f70f6]">
                {t(schedule.dateKey)}
              </time>
              <strong className="mt-2 block break-keep text-[19px] font-black leading-tight text-[#131b31]">
                {t(schedule.titleKey)}
              </strong>
            </span>
          </article>
        ))}
      </div>
    </section>
  )
}

export function FamilyMemoPage() {
  const navigate = useNavigate()
  const { t } = useI18n()

  function handleMenuClick() {
    navigate('/family/mypage')
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#eef5ff] text-[#131b31]">
      <section
        className="mx-auto flex min-h-svh w-full max-w-[480px] flex-col bg-white px-6 pb-[calc(94px+env(safe-area-inset-bottom))] pt-[max(16px,env(safe-area-inset-top))] shadow-[0_24px_80px_rgba(55,104,184,0.1)]"
        aria-label={t('family.memo.aria')}
      >
        <header className="flex min-h-12 items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2">
            <Link
              to="/family"
              className="inline-grid h-12 w-12 shrink-0 place-items-center rounded-[16px] bg-[#eef2f8] text-[#2f70f6] transition active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
              aria-label={t('family.memo.backAria')}
            >
              <ChevronLeft aria-hidden="true" size={34} strokeWidth={2.8} />
            </Link>
            <DolbomLogo ariaLabel={t('family.home.logoAria')} to="/family" />
          </div>

          <button
            className="inline-grid h-12 w-12 place-items-center rounded-[16px] bg-[#eef2f8] text-[#596273] transition active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
            type="button"
            aria-label={t('common.myPage.open')}
            onClick={handleMenuClick}
          >
            <Menu aria-hidden="true" size={34} strokeWidth={2.65} />
          </button>
        </header>

        <section className="pt-5" aria-labelledby="family-memo-title">
          <p className="text-[22px] font-semibold leading-none text-[#5b6476]">
            {t('common.date.may31Sat')}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
            <h1
              id="family-memo-title"
              className="text-[39px] font-black leading-none text-[#131b31]"
            >
              {t('family.memo.title')}
            </h1>
          </div>
          <p className="mt-3 break-keep text-[21px] font-semibold leading-snug text-[#5b6476]">
            {t('family.memo.description')}
          </p>
        </section>

        <PriorityMemoCard />
        <SharedMemoList />
        <UpcomingScheduleList />

        <Link
          to="#new-family-memo"
          className="mt-7 inline-flex min-h-[64px] w-full items-center justify-center gap-2 rounded-[18px] bg-[#316df0] px-4 text-[25px] font-black leading-none text-white shadow-[0_14px_26px_rgba(49,109,240,0.26)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
        >
          <PlusCircle className="h-7 w-7 shrink-0" aria-hidden="true" />
          <span>{t('family.memo.newMemo')}</span>
        </Link>

        <FamilyBottomNav activeItem="home" />
      </section>
    </main>
  )
}
