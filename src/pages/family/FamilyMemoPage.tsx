import { ChevronRight, Menu, PlusCircle, Power } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { FamilyBottomNav } from '../../components/layout/FamilyBottomNav'

const familyAssetBase = '/assets/dolbomon/familly'
const familyTalkAssetBase = '/assets/dolbomon/familly-talk'
const workerMemoAssetBase = '/assets/dolbomon/worker-memo'

const todayLabel = '5월 31일 토요일'

const sharedMemos = [
  {
    description: '딸이 오전 중 연락 예정',
    iconSrc: `${familyAssetBase}/전화.png`,
    title: '병원 예약 문의하기',
  },
  {
    description: '부드러운 죽, 과일 선호',
    iconSrc: `${familyTalkAssetBase}/밥.png`,
    title: '식사 선호 메모',
  },
  {
    description: '저녁 복약 완료 여부 확인',
    iconSrc: `${familyTalkAssetBase}/알약.png`,
    title: '복약 체크',
  },
]

const upcomingSchedules = [
  {
    date: '6월 1일',
    iconSrc: `${workerMemoAssetBase}/달력.png`,
    title: '정형외과 방문',
  },
  {
    date: '6월 3일',
    iconSrc: `${familyAssetBase}/전화.png`,
    title: '가족 통화',
  },
]

function Logo() {
  return (
    <Link
      to="/family"
      className="inline-flex min-h-11 items-center rounded-md text-[#0b63ef] drop-shadow-[0_4px_7px_rgba(18,95,232,0.12)] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
      aria-label="돌봄ON 가족 홈"
    >
      <span className="text-[31px] font-black leading-none">돌봄</span>
      <Power
        aria-hidden="true"
        className="-mx-[1px] h-[32px] w-[32px]"
        strokeWidth={4.35}
      />
      <span className="text-[36px] font-black leading-none">N</span>
    </Link>
  )
}

function CodeBadge({ code }: { code: string }) {
  return (
    <span className="inline-flex min-h-[30px] items-center justify-center rounded-[6px] border-2 border-[#2f70f6] bg-[#edf5ff] px-2 text-[17px] font-black leading-none text-[#2f70f6]">
      {code}
    </span>
  )
}

function PriorityMemoCard() {
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
          오늘 꼭 확인할 내용
        </h2>
        <p className="mt-3 break-keep text-[20px] font-semibold leading-[1.55] text-[#5c6678]">
          무릎 통증이 있어 병원 일정 확인이 필요해요. 저녁 약은 식후 30분 뒤
          복용.
        </p>
        <span className="mt-4 inline-flex min-h-[34px] items-center rounded-full bg-white px-5 text-[19px] font-black leading-none text-[#2f70f6]">
          중요
        </span>
      </div>
    </section>
  )
}

function SharedMemoList() {
  return (
    <section className="mt-7" aria-labelledby="shared-memo-title">
      <h2
        id="shared-memo-title"
        className="text-[29px] font-black leading-none text-[#131b31]"
      >
        공유 메모
      </h2>

      <div className="mt-4 grid gap-4">
        {sharedMemos.map((memo) => (
          <Link
            key={memo.title}
            to="#shared-memo"
            className="grid min-h-[82px] grid-cols-[70px_minmax(0,1fr)_28px] items-center gap-4 rounded-[24px] border border-[#e1e7f0] bg-white px-4 py-3 shadow-[0_8px_18px_rgba(35,66,111,0.08)] transition active:scale-[0.995] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
            aria-label={`${memo.title}, ${memo.description}`}
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
                {memo.title}
              </strong>
              <span className="mt-1 block truncate text-[17px] font-semibold leading-tight text-[#5c6678]">
                {memo.description}
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
  return (
    <section className="mt-7" aria-labelledby="upcoming-schedule-title">
      <div className="flex items-end gap-2">
        <h2
          id="upcoming-schedule-title"
          className="text-[29px] font-black leading-none text-[#131b31]"
        >
          다가오는 일정
        </h2>
        <CodeBadge code="FAM-009" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {upcomingSchedules.map((schedule) => (
          <article
            key={schedule.title}
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
                {schedule.date}
              </time>
              <strong className="mt-2 block break-keep text-[19px] font-black leading-tight text-[#131b31]">
                {schedule.title}
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

  function handleMenuClick() {
    navigate('/select-role')
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#eef5ff] text-[#131b31]">
      <section
        className="mx-auto flex min-h-svh w-full max-w-[480px] flex-col bg-white px-6 pb-[calc(94px+env(safe-area-inset-bottom))] pt-[max(16px,env(safe-area-inset-top))] shadow-[0_24px_80px_rgba(55,104,184,0.1)]"
        aria-label="가족 메모 화면"
      >
        <header className="flex min-h-12 items-start justify-between gap-4">
          <Logo />

          <button
            className="inline-grid h-12 w-12 place-items-center rounded-[16px] bg-[#eef2f8] text-[#596273] transition active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
            type="button"
            aria-label="메뉴 열기"
            onClick={handleMenuClick}
          >
            <Menu aria-hidden="true" size={34} strokeWidth={2.65} />
          </button>
        </header>

        <section className="pt-5" aria-labelledby="family-memo-title">
          <p className="text-[22px] font-semibold leading-none text-[#5b6476]">
            {todayLabel}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
            <h1
              id="family-memo-title"
              className="text-[39px] font-black leading-none text-[#131b31]"
            >
              가족 메모
            </h1>
            <CodeBadge code="FAM-008" />
          </div>
          <p className="mt-3 break-keep text-[21px] font-semibold leading-snug text-[#5b6476]">
            가족끼리 공유할 메모와 돌봄 일정을 관리해보세요.
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
          <span>새 메모 추가</span>
        </Link>

        <FamilyBottomNav activeItem="home" />
      </section>
    </main>
  )
}
