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
    navigate('/elder/voice')
  }

  return (
    <main className="min-h-svh bg-[#edf5ff] text-[#070707]">
      <section
        className="mx-auto flex min-h-svh w-full max-w-[480px] flex-col overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_54%,#ffffff_100%)] px-5 pb-6 pt-5 shadow-[0_20px_80px_rgba(55,104,184,0.08)] min-[390px]:px-6 min-[390px]:pt-6"
        aria-label="돌봄온 홈 화면"
      >
        <HomeHeader onMenuClick={() => navigate('/select-role')} />
        <HomeHero />

        <section className="relative z-10 -mt-8 grid justify-items-center gap-3 min-[390px]:-mt-10">
          <Link
            to="/login"
            className="flex min-h-[72px] w-full items-center justify-center gap-4 rounded-[28px] bg-gradient-to-br from-[#0a75ff] to-[#005ee5] px-4 text-[24px] font-black text-white shadow-[0_16px_30px_rgba(2,92,221,0.24)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[78px] min-[390px]:text-[30px]"
          >
            <SquarePen aria-hidden="true" size={38} strokeWidth={3} />
            <span>오늘 상태 입력하기</span>
          </Link>

          <button
            className="inline-flex min-h-11 min-w-[196px] items-center justify-center gap-3 rounded-full border-2 border-[#0867f2] bg-white/95 px-6 text-[20px] font-bold text-[#0867f2] shadow-[0_8px_18px_rgba(28,105,220,0.06)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-12 min-[390px]:min-w-[216px] min-[390px]:text-[22px]"
            type="button"
            onClick={handleVoiceStart}
          >
            <Mic aria-hidden="true" size={28} strokeWidth={3} />
            <span>음성으로 시작</span>
          </button>
        </section>

        <section
          className="relative z-10 mt-6 grid gap-3 min-[390px]:mt-7 min-[390px]:gap-4"
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
