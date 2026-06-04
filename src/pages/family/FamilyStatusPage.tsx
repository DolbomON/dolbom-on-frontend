import { Check, Info, Menu, Power, Share2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { FamilyBottomNav } from '../../components/layout/FamilyBottomNav'
import { cn } from '../../lib/utils'

const familyTalkAssetBase = '/assets/dolbomon/familly-talk'

type HealthTone = 'normal' | 'caution'

type HealthRecord = {
  iconSrc: string
  label: string
  tone: HealthTone
  value: string
}

const healthRecords: HealthRecord[] = [
  {
    iconSrc: `${familyTalkAssetBase}/밥.png`,
    label: '식사',
    tone: 'normal',
    value: '조금 드셨어요',
  },
  {
    iconSrc: `${familyTalkAssetBase}/알약.png`,
    label: '복약',
    tone: 'normal',
    value: '약을 드셨어요',
  },
  {
    iconSrc: `${familyTalkAssetBase}/추가.png`,
    label: '통증',
    tone: 'caution',
    value: '무릎, 허리 불편',
  },
  {
    iconSrc: `${familyTalkAssetBase}/채팅.png`,
    label: '기분',
    tone: 'normal',
    value: '보통이에요',
  },
  {
    iconSrc: `${familyTalkAssetBase}/달.png`,
    label: '수면',
    tone: 'caution',
    value: '자주 깨셨어요',
  },
]

function Logo() {
  return (
    <Link
      to="/family"
      className="inline-flex min-h-11 items-center rounded-md text-[#0867f2] drop-shadow-[0_4px_7px_rgba(18,95,232,0.12)] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
      aria-label="돌봄온 가족 안부 현황"
    >
      <span className="text-[31px] font-black leading-none">돌봄</span>
      <Power
        aria-hidden="true"
        className="-mx-[1px] h-[32px] w-[32px]"
        strokeWidth={4.2}
      />
      <span className="text-[36px] font-black leading-none">N</span>
    </Link>
  )
}

function ElderSummaryCard() {
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
                김영자 어르신
              </h2>
              <p className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[18px] font-semibold leading-tight text-[#4f5c73]">
                <span>현재 상태</span>
                <strong className="text-[24px] font-black text-[#1765fb]">
                  안정
                </strong>
              </p>
            </div>

            <span className="inline-flex min-h-[42px] w-fit items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[#a9c7ff] bg-[#f8fbff] px-3 text-[17px] font-black leading-none text-[#1765fb] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] min-[460px]:px-2.5 min-[460px]:text-[16px]">
              <Check
                className="h-6 w-6 shrink-0 min-[460px]:h-5 min-[460px]:w-5"
                aria-hidden="true"
              />
              가족 확인 완료
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

function HealthRecordCard({ record }: { record: HealthRecord }) {
  const isCaution = record.tone === 'caution'

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
          {record.label}
        </strong>
      </span>

      <span className="h-[42px] w-px bg-[#dfe5ef]" aria-hidden="true" />

      <span className="min-w-0 break-keep text-[20px] font-semibold leading-tight text-[#2f3e59]">
        {record.value}
      </span>
    </li>
  )
}

function WeeklyChangeCard() {
  const days = [
    { label: '월', tone: 'normal' },
    { label: '화', tone: 'normal' },
    { label: '수', tone: 'normal' },
    { label: '목', tone: 'caution' },
    { label: '금', tone: 'normal' },
  ] as const

  return (
    <section className="mt-7" aria-labelledby="weekly-change-title">
      <h2
        id="weekly-change-title"
        className="text-[22px] font-black leading-none text-[#071747]"
      >
        주간 변화
      </h2>

      <div className="mt-3 rounded-[22px] border border-[#d6e4fa] bg-white px-5 pb-3.5 pt-4 shadow-[0_10px_22px_rgba(31,65,112,0.08)]">
        <ol
          className="relative grid grid-cols-5 items-start text-center"
          aria-label="요일별 안부 변화"
        >
          <span
            className="absolute left-[10%] right-[10%] top-[38px] border-t-2 border-dashed border-[#a8caff]"
            aria-hidden="true"
          />

          {days.map((day) => {
            const isCaution = day.tone === 'caution'

            return (
              <li
                key={day.label}
                className="relative z-10 flex flex-col items-center gap-3"
              >
                <span className="text-[17px] font-semibold leading-none text-[#2f3e59]">
                  {day.label}
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
                      ? `${day.label}요일 주의 필요`
                      : `${day.label}요일 안정`
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
            오늘 <strong className="font-black text-[#ff3449]">통증</strong>{' '}
            항목만 주의가 필요해요
          </p>
        </div>
      </div>
    </section>
  )
}

export function FamilyStatusPage() {
  const navigate = useNavigate()

  function handleMenuClick() {
    navigate('/select-role')
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#eef5ff] text-[#071747]">
      <section
        className="mx-auto flex min-h-svh w-full max-w-[480px] flex-col bg-white px-5 pb-[calc(88px+env(safe-area-inset-bottom))] pt-[max(18px,env(safe-area-inset-top))] shadow-[0_24px_80px_rgba(55,104,184,0.1)] min-[390px]:px-6 min-[430px]:px-7"
        aria-label="가족 안부 확인"
      >
        <header className="flex items-start justify-between gap-4">
          <Logo />

          <button
            className="inline-grid h-11 w-11 place-items-center rounded-md text-[#071747] transition active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
            type="button"
            aria-label="메뉴 열기"
            onClick={handleMenuClick}
          >
            <Menu aria-hidden="true" size={38} strokeWidth={2.8} />
          </button>
        </header>

        <section className="pt-9" aria-labelledby="family-status-title">
          <p className="text-[24px] font-semibold leading-none text-[#52617a]">
            5월 31일 토요일
          </p>
          <h1
            id="family-status-title"
            className="mt-5 text-[42px] font-black leading-none text-[#071747]"
          >
            안부 현황
          </h1>
          <p className="mt-5 break-keep text-[20px] font-semibold leading-snug text-[#34435d]">
            오늘 기록을 항목별로 자세히 확인해보세요.
          </p>
        </section>

        <ElderSummaryCard />

        <ol className="mt-5 grid gap-3.5" aria-label="오늘 안부 기록">
          {healthRecords.map((record) => (
            <HealthRecordCard key={record.label} record={record} />
          ))}
        </ol>

        <WeeklyChangeCard />

        <button
          type="button"
          className="mt-5 flex min-h-[64px] w-full items-center justify-center gap-3 rounded-[18px] bg-[linear-gradient(135deg,#4f94ff_0%,#0966f2_100%)] px-4 text-[25px] font-black leading-none text-white shadow-[0_14px_26px_rgba(9,102,242,0.25),inset_0_1px_0_rgba(255,255,255,0.28)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
        >
          <Share2 className="h-8 w-8 shrink-0" aria-hidden="true" />
          이상 징후 공유
        </button>

        <FamilyBottomNav activeItem="status" />
      </section>
    </main>
  )
}
