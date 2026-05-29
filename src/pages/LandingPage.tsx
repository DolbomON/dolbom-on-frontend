import { Mic, SquarePen } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import {
  HomeFeatureCard,
  type HomeFeatureItem,
} from '../components/home/HomeFeatureCard'
import { HomeHeader } from '../components/home/HomeHeader'
import { HomeHero } from '../components/home/HomeHero'

const featureItems: HomeFeatureItem[] = [
  {
    description: '약을 드셨는지 쉽게 기록합니다.',
    imageSrc: '/assets/dolbomon/home/icon-medication.png',
    target: '/elder/check',
    title: '복약 확인',
  },
  {
    description: '오늘 기분과 건강 상태를 편하게 이야기합니다.',
    imageSrc: '/assets/dolbomon/home/icon-ai-chat.png',
    target: '/elder/chat',
    title: 'AI 안부 대화',
  },
  {
    description: '위험 신호가 있으면 빠르게 확인할 수 있습니다.',
    imageSrc: '/assets/dolbomon/home/icon-family-alert.png',
    target: '/family',
    title: '가족·복지사 알림',
  },
]

export function LandingPage() {
  const navigate = useNavigate()

  function handleVoiceStart() {
    // TODO: Replace this temporary navigation with the real voice start flow.
    navigate('/elder/chat')
  }

  return (
    <main className="min-h-svh bg-[#edf5ff] text-[#070707]">
      <section
        className="mx-auto min-h-svh w-full max-w-[480px] overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_58%,#ffffff_100%)] px-5 pb-8 pt-7 shadow-[0_20px_80px_rgba(55,104,184,0.08)] sm:px-6"
        aria-label="돌봄온 홈 화면"
      >
        <HomeHeader onMenuClick={() => navigate('/select-role')} />
        <HomeHero />

        <section className="relative z-10 -mt-12 grid justify-items-center gap-3">
          <Link
            to="/select-role"
            className="flex min-h-16 w-full items-center justify-center gap-4 rounded-[26px] bg-gradient-to-br from-[#0875ff] to-[#005ee5] px-5 py-4 text-[24px] font-black tracking-[-0.05em] text-white shadow-[0_22px_36px_rgba(2,92,221,0.25)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[72px] min-[390px]:text-[27px]"
          >
            <SquarePen aria-hidden="true" size={38} strokeWidth={3} />
            <span>오늘 상태 입력하기</span>
          </Link>

          <button
            className="inline-flex min-h-11 min-w-[184px] items-center justify-center gap-3 rounded-full border-2 border-[#0867f2] bg-white/90 px-6 py-1 text-[20px] font-bold tracking-[-0.04em] text-[#0867f2] shadow-[0_8px_18px_rgba(28,105,220,0.06)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
            type="button"
            onClick={handleVoiceStart}
          >
            <Mic aria-hidden="true" size={25} strokeWidth={3} />
            <span>음성으로 시작</span>
          </button>
        </section>

        <section
          className="relative z-10 mt-7 grid gap-3"
          aria-label="주요 기능"
        >
          {featureItems.map((item) => (
            <HomeFeatureCard key={item.title} item={item} />
          ))}
        </section>
      </section>
    </main>
  )
}
