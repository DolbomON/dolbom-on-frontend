import { Bell, ChevronRight, Menu, Power } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { FamilyBottomNav } from '../../components/layout/FamilyBottomNav'
import { cn } from '../../lib/utils'

const familyAssetBase = '/assets/dolbomon/familly'
const workerAssetBase = '/assets/dolbomon/worker'

const familyHeroImageSrc = `${familyAssetBase}/가족.png`
const checklistImageSrc = `${familyAssetBase}/체크.png`
const phoneImageSrc = `${familyAssetBase}/전화.png`
const aiImageSrc = `${familyAssetBase}/ai.png`
const documentImageSrc = `${familyAssetBase}/문서.png`
const penImageSrc = `${familyAssetBase}/펜.png`
const connectImageSrc = `${workerAssetBase}/image-removebg-preview.png`

type MainAction = {
  description: string
  href: string
  imageSrc: string
  title: string
}

type QuickAction = {
  href: string
  imageSrc: string
  title: string
}

const todayLabel = '5월 31일 토요일'

const mainActions: MainAction[] = [
  {
    description: '5개 항목 요약 보기',
    href: '/family/status',
    imageSrc: checklistImageSrc,
    title: '오늘 상태 확인',
  },
  {
    description: '가족 바로 연락',
    href: 'tel:010-0000-0000',
    imageSrc: phoneImageSrc,
    title: '전화 연결',
  },
  {
    description: '대화 내용 확인',
    href: '/family/chat',
    imageSrc: aiImageSrc,
    title: 'AI 안부 요약',
  },
  {
    description: '초대코드 입력',
    href: '/family/connect',
    imageSrc: connectImageSrc,
    title: '어르신 연결',
  },
]

const quickActions: QuickAction[] = [
  {
    href: '#today-record',
    imageSrc: documentImageSrc,
    title: '오늘 기록 보기',
  },
  {
    href: '/family/memo',
    imageSrc: penImageSrc,
    title: '가족 메모 남기기',
  },
]

const statusItems = ['식사', '복약', '통증', '기분', '수면']

export function FamilyDashboardPage() {
  const navigate = useNavigate()

  function handleMenuClick() {
    navigate('/family/mypage')
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#eef6ff] text-[#071747]">
      <section
        className="mx-auto flex min-h-svh w-full max-w-[480px] flex-col bg-white px-[22px] pb-[calc(88px+env(safe-area-inset-bottom))] pt-[max(18px,env(safe-area-inset-top))] shadow-[0_24px_80px_rgba(55,104,184,0.1)]"
        aria-label="가족 안부 홈"
      >
        <header className="flex min-h-10 items-start justify-between gap-4">
          <Link
            to="/family"
            className="inline-flex min-h-10 items-center rounded-md text-[#0a63ef] drop-shadow-[0_4px_7px_rgba(18,95,232,0.12)] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
            aria-label="돌봄ON 가족 홈"
          >
            <span className="text-[28px] font-black leading-none">돌봄</span>
            <Power
              aria-hidden="true"
              className="-mx-[1px] h-[30px] w-[30px]"
              strokeWidth={4.25}
            />
            <span className="text-[33px] font-black leading-none">N</span>
          </Link>

          <div className="flex items-center gap-5 text-[#071747]">
            <Link
              to="/family/alerts"
              className="relative inline-grid h-10 w-10 place-items-center rounded-md text-[#0a63ef] transition active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
              aria-label="알림 열기"
            >
              <Bell aria-hidden="true" size={31} strokeWidth={2.7} />
            </Link>
            <button
              className="inline-grid h-10 w-10 place-items-center rounded-md text-[#071747] transition active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
              type="button"
              aria-label="마이페이지 열기"
              onClick={handleMenuClick}
            >
              <Menu aria-hidden="true" size={38} strokeWidth={2.55} />
            </button>
          </div>
        </header>

        <section className="pt-2" aria-labelledby="family-title">
          <p className="text-[21px] font-semibold leading-none text-[#56647d]">
            {todayLabel}
          </p>
          <h1
            id="family-title"
            className="mt-2.5 text-[39px] font-black leading-none text-[#071747]"
          >
            가족 안부 홈
          </h1>
          <p className="mt-2.5 text-[18px] font-semibold leading-snug text-[#56647d]">
            부모님의 오늘 상태를 한눈에 확인해보세요.
          </p>
        </section>

        <section
          id="today-status"
          className="relative mt-4 min-h-[238px] overflow-hidden rounded-[25px] border border-[#cfe0fa] bg-[linear-gradient(135deg,#fafdff_0%,#eef7ff_100%)] px-7 py-5 shadow-[0_18px_36px_rgba(51,101,177,0.16)]"
          aria-labelledby="today-status-title"
        >
          <div className="relative z-10 max-w-[68%]">
            <p className="text-[25px] font-black leading-tight text-[#0a63ef]">
              김영자 어르신
            </p>
            <h2
              id="today-status-title"
              className="mt-3.5 whitespace-nowrap text-[34px] font-black leading-[1.14] text-[#071747]"
            >
              오늘은 비교적
              <br />
              안정적이에요
            </h2>

            <div
              className="mt-[18px] w-[246px] max-w-full"
              aria-label="오늘 상태 항목 요약"
            >
              <div className="grid grid-cols-5 text-center text-[15px] font-semibold leading-none text-[#42506a]">
                {statusItems.map((item, index) => (
                  <span key={item} className="relative">
                    {item}
                    {index < statusItems.length - 1 ? (
                      <span
                        className="absolute right-[-4px] top-0 text-[#0a63ef]"
                        aria-hidden="true"
                      >
                        ·
                      </span>
                    ) : null}
                  </span>
                ))}
              </div>
              <div
                className="mt-3.5 grid grid-cols-5 justify-items-center"
                aria-hidden="true"
              >
                {statusItems.map((item, index) => (
                  <span
                    key={item}
                    className={cn(
                      'h-[34px] w-[34px] rounded-full shadow-[0_7px_12px_rgba(4,93,226,0.24)]',
                      index === statusItems.length - 1
                        ? 'bg-[#d6d8dc] shadow-[0_7px_12px_rgba(82,91,108,0.12)]'
                        : 'bg-[linear-gradient(135deg,#2f85ff_0%,#0b5bf0_100%)]',
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          <img
            src={familyHeroImageSrc}
            alt=""
            width="1024"
            height="1024"
            className="pointer-events-none absolute inset-y-0 right-0 z-0 h-full w-[50%] max-w-none select-none object-cover object-[48%_50%] [mask-image:linear-gradient(to_right,transparent_0%,black_16%)]"
            aria-hidden="true"
            draggable="false"
          />
        </section>

        <section
          className="mt-5 grid grid-cols-2 gap-[18px]"
          aria-label="가족 주요 메뉴"
        >
          {mainActions.map((action) => (
            <Link
              key={action.title}
              to={action.href}
              className="flex min-h-[184px] flex-col items-center rounded-[18px] border border-[#dce5f1] bg-white px-2 pb-3 pt-3 text-center shadow-[0_13px_26px_rgba(34,65,111,0.11)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
            >
              <img
                src={action.imageSrc}
                alt=""
                width="1024"
                height="1024"
                className="h-[58px] w-[58px] shrink-0 object-contain"
                aria-hidden="true"
                draggable="false"
              />
              <strong className="mt-2 break-keep text-[18px] font-black leading-tight text-[#071747]">
                {action.title}
              </strong>
              <span className="mt-1.5 break-keep text-[13px] font-semibold leading-tight text-[#56677f]">
                {action.description}
              </span>
              <span
                className="mt-auto grid h-8 w-8 place-items-center rounded-full bg-[#f4f9ff] text-[#0a63ef] shadow-[0_5px_12px_rgba(30,73,133,0.13)]"
                aria-hidden="true"
              >
                <ChevronRight size={22} strokeWidth={3} />
              </span>
            </Link>
          ))}
        </section>

        <section className="mt-6" aria-labelledby="quick-check-title">
          <h2
            id="quick-check-title"
            className="text-[24px] font-black leading-none text-[#071747]"
          >
            빠른 확인
          </h2>

          <div className="mt-2.5 grid grid-cols-2 gap-[22px]">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                to={action.href}
                className="flex min-h-[66px] items-center gap-3 rounded-[18px] border border-[#cfe0fa] bg-[#f6fbff] px-3 py-2 shadow-[0_12px_22px_rgba(44,98,170,0.09)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
              >
                <img
                  src={action.imageSrc}
                  alt=""
                  width="1024"
                  height="1024"
                  className="h-11 w-11 shrink-0 rounded-[14px] object-contain shadow-[0_7px_13px_rgba(18,93,203,0.2)]"
                  aria-hidden="true"
                  draggable="false"
                />
                <strong className="min-w-0 flex-1 whitespace-nowrap text-[14px] font-black leading-tight text-[#071747] min-[430px]:text-[15px]">
                  {action.title}
                </strong>
                <span
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-[#0a63ef] shadow-[0_5px_12px_rgba(30,73,133,0.13)]"
                  aria-hidden="true"
                >
                  <ChevronRight size={19} strokeWidth={3} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <FamilyBottomNav activeItem="home" />
      </section>
    </main>
  )
}
