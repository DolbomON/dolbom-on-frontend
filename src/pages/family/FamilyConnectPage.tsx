import {
  ArrowRight,
  Bell,
  CheckCircle2,
  ChevronDown,
  Heart,
  HeartPulse,
  Home,
  Info,
  Link as LinkIcon,
  MessageSquare,
  Settings,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

const workerAssetBase = '/assets/dolbomon/worker'

const familyProfileSrc = `${workerAssetBase}/%EB%A9%B0%EB%8A%90%EB%A6%AC.png`
const elderProfileSrc = '/assets/dolbomon/worker-elders/elder-kim-yeongja.png'
const connectionIllustrationSrc = `${workerAssetBase}/image-removebg-preview.png`
const heroConnectionSrc = `${workerAssetBase}/image-removebg-preview%20(1).png`
const shieldIllustrationSrc = `${workerAssetBase}/image-removebg-preview%20(2).png`
const approvalIllustrationSrc = `${workerAssetBase}/image-removebg-preview%20(3).png`
const bellIllustrationSrc = `${workerAssetBase}/image-removebg-preview%20(4).png`

type NavItem = {
  href: string
  icon: LucideIcon
  label: string
}

type BenefitItem = {
  description: string
  imageSrc: string
  title: string
}

const navItems: NavItem[] = [
  { href: '/family', icon: Home, label: '홈' },
  { href: '/family/status', icon: HeartPulse, label: '안부현황' },
  { href: '/family/alerts', icon: Bell, label: '알림' },
  { href: '/family/chat', icon: MessageSquare, label: '대화' },
  { href: '#settings', icon: Settings, label: '설정' },
]

const benefitItems: BenefitItem[] = [
  {
    description: '안전한 암호화로 소중한 정보를 보호합니다.',
    imageSrc: shieldIllustrationSrc,
    title: '안심 연결',
  },
  {
    description: '담당 복지사의 승인 후 연결되어 더 안전합니다.',
    imageSrc: approvalIllustrationSrc,
    title: '복지사 승인',
  },
  {
    description: '중요한 변화는 즉시 알려드려 안심할 수 있어요.',
    imageSrc: bellIllustrationSrc,
    title: '빠른 알림',
  },
]

function FamilyLogo() {
  return (
    <Link
      to="/family"
      className="inline-flex min-h-12 items-center rounded-md text-[#0a57dd] drop-shadow-[0_5px_10px_rgba(23,98,232,0.16)] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
      aria-label="돌봄ON 가족 홈"
    >
      <span className="text-[30px] font-black leading-none md:text-[38px]">
        돌봄
      </span>
      <span className="mx-0.5 grid h-[26px] w-[26px] place-items-center rounded-full bg-[#1268f6] text-white md:h-[32px] md:w-[32px]">
        <Heart
          aria-hidden="true"
          className="h-[17px] w-[17px] fill-current md:h-[21px] md:w-[21px]"
          strokeWidth={3.2}
        />
      </span>
      <span className="text-[34px] font-black leading-none md:text-[42px]">
        N
      </span>
    </Link>
  )
}

function TopNavigation() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#e4edf8] bg-white/95 shadow-[0_8px_28px_rgba(22,57,112,0.08)] backdrop-blur">
      <div className="mx-auto grid min-h-[86px] w-full max-w-[1680px] grid-cols-[auto_auto] items-center gap-x-4 gap-y-3 px-5 py-3 lg:min-h-[96px] lg:grid-cols-[250px_minmax(0,1fr)_auto] lg:px-12">
        <FamilyLogo />

        <nav
          className="col-span-2 row-start-2 flex min-w-0 gap-4 overflow-x-auto text-[16px] font-bold text-[#11182f] [-ms-overflow-style:none] [scrollbar-width:none] lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:justify-center lg:gap-14 [&::-webkit-scrollbar]:hidden"
          aria-label="가족 화면 메뉴"
        >
          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <Link
                key={item.label}
                to={item.href}
                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg px-2 transition hover:text-[#0a63ef] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
              >
                <Icon
                  aria-hidden="true"
                  className="h-7 w-7"
                  strokeWidth={2.4}
                />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <Link
          to="#profile"
          className="col-start-2 row-start-1 inline-flex min-h-[58px] items-center justify-self-end rounded-lg pl-4 transition hover:bg-[#f4f8ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff] lg:col-start-3"
          aria-label="김하나님 가족 계정"
        >
          <span className="hidden h-12 w-px bg-[#dce4ef] md:block" />
          <img
            src={familyProfileSrc}
            alt=""
            width="512"
            height="512"
            className="ml-0 h-[54px] w-[54px] rounded-full bg-[#f0f6ff] object-cover shadow-[0_8px_18px_rgba(43,91,162,0.13)] md:ml-6 md:h-[62px] md:w-[62px]"
            draggable="false"
          />
          <span className="ml-3 hidden text-left sm:block">
            <strong className="block whitespace-nowrap text-[18px] font-black leading-tight text-[#10162e]">
              김하나님
            </strong>
            <span className="mt-1 block whitespace-nowrap text-[15px] font-semibold leading-tight text-[#58657a]">
              가족 계정
            </span>
          </span>
          <ChevronDown
            aria-hidden="true"
            className="ml-4 hidden h-6 w-6 text-[#8b97ac] sm:block"
            strokeWidth={2.5}
          />
        </Link>
      </div>
    </header>
  )
}

function InviteCodeCard() {
  const [inviteCode, setInviteCode] = useState('')
  const [requestMessage, setRequestMessage] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedCode = inviteCode.trim()

    setRequestMessage(
      trimmedCode
        ? `${trimmedCode} 코드로 연결 요청을 보냈어요.`
        : '초대코드를 입력해주세요.',
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
          초대코드 입력
        </h2>

        <label className="sr-only" htmlFor="invite-code">
          초대코드
        </label>
        <input
          id="invite-code"
          className="mt-4 h-[60px] w-full rounded-[8px] border-2 border-[#bac7dc] bg-white px-6 text-[21px] font-bold leading-none text-[#071747] outline-none transition placeholder:text-[#8a97ad] focus:border-[#0a63ef] focus:ring-4 focus:ring-[#cfe3ff]"
          placeholder="예: DOLBOM-3942"
          type="text"
          value={inviteCode}
          onChange={(event) => setInviteCode(event.target.value)}
        />

        <button
          type="submit"
          className="mt-4 inline-flex min-h-[66px] w-full items-center justify-center gap-5 rounded-[8px] bg-[#0867f2] px-5 text-[24px] font-black leading-none text-white shadow-[0_16px_30px_rgba(8,103,242,0.24)] transition hover:bg-[#005ae0] active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
        >
          연결 요청하기
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
          <p className="break-keep">
            연결 요청 후 담당 복지사가 승인하면 부모님의 오늘 상태와 알림을
            확인할 수 있어요.
          </p>
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
          초대 링크로 연결
        </Link>
      </form>
    </section>
  )
}

function ConnectedElderCard() {
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
          연결 후
        </h2>
      </div>

      <div className="mt-3 rounded-[18px] border border-[#dfe7f2] bg-white p-3.5 shadow-[0_9px_22px_rgba(32,76,140,0.07)]">
        <h3 className="text-[20px] font-black leading-none text-[#06143a]">
          연결된 어르신
        </h3>

        <article className="mt-3.5 grid gap-4 rounded-[16px] border border-[#e0e8f4] bg-white p-3.5 shadow-[0_10px_24px_rgba(32,76,140,0.07)] sm:grid-cols-[148px_minmax(0,1fr)] sm:items-start">
          <img
            src={elderProfileSrc}
            alt="김영자님 프로필"
            width="1280"
            height="1280"
            className="h-[174px] w-[140px] rounded-[8px] bg-[#eef6ff] object-cover object-[50%_18%] shadow-[0_10px_20px_rgba(42,82,148,0.1)]"
            draggable="false"
          />

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <strong className="text-[30px] font-black leading-tight text-[#06143a]">
                김영자님
              </strong>
              <span className="inline-flex min-h-9 items-center gap-2 rounded-[8px] bg-[#dff8e9] px-3.5 text-[17px] font-black leading-none text-[#079653]">
                <CheckCircle2
                  aria-hidden="true"
                  className="h-5 w-5"
                  strokeWidth={2.8}
                />
                승인 완료
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
                상태 요약 보기 가능
              </li>
              <li className="flex items-center gap-4">
                <span className="grid h-8 w-8 place-items-center rounded-[8px] border border-[#ffe0a6] bg-[#fff9ec] text-[#f3a308]">
                  <Bell
                    aria-hidden="true"
                    className="h-5 w-5"
                    strokeWidth={2.6}
                  />
                </span>
                위험 알림 수신 중
              </li>
            </ul>

            <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(198px,1fr)_150px]">
              <Link
                to="/family/status"
                className="inline-flex min-h-[52px] items-center justify-center gap-4 whitespace-nowrap rounded-[8px] bg-[#0867f2] px-4 text-[19px] font-black text-white shadow-[0_14px_26px_rgba(8,103,242,0.24)] transition hover:bg-[#005ae0] active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
              >
                오늘 상태 보기
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
                알림 설정
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

function BenefitCard({
  description,
  hasDivider,
  imageSrc,
  title,
}: BenefitItem & { hasDivider: boolean }) {
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
          {title}
        </h3>
        <p className="mt-2 break-keep text-[17px] font-semibold leading-snug text-[#4b5c78]">
          {description}
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
  return (
    <section
      className="grid rounded-[22px] border border-[#d9e4f2] bg-white shadow-[0_16px_36px_rgba(32,76,140,0.09)] lg:grid-cols-3"
      aria-label="어르신 연결 안내"
    >
      {benefitItems.map((benefit, index) => (
        <BenefitCard
          key={benefit.title}
          {...benefit}
          hasDivider={index < benefitItems.length - 1}
        />
      ))}
    </section>
  )
}

export function FamilyConnectPage() {
  return (
    <main className="min-h-svh overflow-x-hidden bg-[#fbfdff] text-[#06143a]">
      <TopNavigation />

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
            어르신 연결
          </h1>
          <p className="mt-4 break-keep text-[20px] font-semibold leading-snug text-[#4a5d7e] sm:text-[22px]">
            복지사 또는 어르신에게 받은 초대코드를 입력해주세요.
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
