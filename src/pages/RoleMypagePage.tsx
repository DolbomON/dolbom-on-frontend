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
import { cn } from '../lib/utils'

type RoleMypageKind = 'caregiver' | 'elder' | 'family'

type RoleMypageMetric = {
  label: string
  tone: 'blue' | 'green' | 'orange'
  value: string
}

type RoleMypageMenuItem = {
  description: string
  href: string
  icon: LucideIcon
  title: string
}

type RoleMypageConfig = {
  avatarSrc: string
  backTo: string
  description: string
  homeLabel: string
  metrics: RoleMypageMetric[]
  menuItems: RoleMypageMenuItem[]
  name: string
  roleLabel: string
  settings: string[]
}

const configs: Record<RoleMypageKind, RoleMypageConfig> = {
  family: {
    avatarSrc: '/assets/dolbomon/worker/%EB%A9%B0%EB%8A%90%EB%A6%AC.png',
    backTo: '/family',
    description: '김영자 어르신의 안부 알림과 가족 계정을 관리해요.',
    homeLabel: '가족 홈으로 돌아가기',
    metrics: [
      { label: '연결 어르신', value: '1명', tone: 'blue' },
      { label: '읽지 않은 알림', value: '3건', tone: 'orange' },
      { label: '가족 알림', value: '켜짐', tone: 'green' },
    ],
    menuItems: [
      {
        description: '긴급 알림과 안부 알림을 관리해요.',
        href: '/family/alerts#notification-settings',
        icon: Bell,
        title: '알림 설정',
      },
      {
        description: '어르신 연결 상태와 초대코드를 확인해요.',
        href: '/family/connect',
        icon: HeartHandshake,
        title: '어르신 연결',
      },
      {
        description: '공유 메모와 가족 일정을 확인해요.',
        href: '/family/memo',
        icon: FileText,
        title: '가족 메모',
      },
      {
        description: '비밀번호와 로그인 정보를 관리해요.',
        href: '#account',
        icon: ShieldCheck,
        title: '계정 및 보안',
      },
    ],
    name: '김하나님',
    roleLabel: '가족 계정',
    settings: ['긴급 알림 받기', '오늘 안부 요약 받기', '가족 메모 공유'],
  },
  caregiver: {
    avatarSrc: '/assets/dolbomon/worker-dashboard/요양사.png',
    backTo: '/caregiver',
    description: '방문 일정, 담당 어르신, 내 활동 정보를 관리해요.',
    homeLabel: '요양사 홈으로 돌아가기',
    metrics: [
      { label: '담당 어르신', value: '12명', tone: 'blue' },
      { label: '오늘 방문', value: '3건', tone: 'orange' },
      { label: '포트폴리오', value: '78%', tone: 'green' },
    ],
    menuItems: [
      {
        description: '오늘 배정된 방문 업무를 확인해요.',
        href: '/caregiver/assignments',
        icon: CalendarCheck,
        title: '오늘 업무',
      },
      {
        description: '방문 일정과 복지사 요청 메모를 봐요.',
        href: '/caregiver/schedules',
        icon: Bell,
        title: '방문 알림 설정',
      },
      {
        description: '내 소개와 활동 이력을 관리해요.',
        href: '/caregiver/portfolio',
        icon: UserRound,
        title: '포트폴리오 관리',
      },
      {
        description: '비밀번호와 로그인 정보를 관리해요.',
        href: '#account',
        icon: ShieldCheck,
        title: '계정 및 보안',
      },
    ],
    name: '김민수',
    roleLabel: '요양사',
    settings: ['방문 전 알림 받기', '새 배정 알림 받기', '가족 공유 메모 보기'],
  },
  elder: {
    avatarSrc: '/assets/dolbomon/worker-elders/elder-kim-yeongja.png',
    backTo: '/elder',
    description: '내 기본 정보, 돌봄팀, 긴급 연락 설정을 확인해요.',
    homeLabel: '어르신 홈으로 돌아가기',
    metrics: [
      { label: '오늘 기록', value: '대기', tone: 'orange' },
      { label: '연결 가족', value: '2명', tone: 'blue' },
      { label: '돌봄팀', value: '2명', tone: 'green' },
    ],
    menuItems: [
      {
        description: '이름, 연락처, 생활 정보를 확인해요.',
        href: '/elder/basic-info',
        icon: UserRound,
        title: '내 기본 정보',
      },
      {
        description: '가족, 복지사, 요양사 연결 정보를 봐요.',
        href: '/elder/care-team',
        icon: Users,
        title: '내 돌봄팀',
      },
      {
        description: '긴급 도움 요청과 연락 설정을 확인해요.',
        href: '#emergency',
        icon: HeartHandshake,
        title: '긴급 연락',
      },
      {
        description: '로그인과 개인정보 보호 설정을 관리해요.',
        href: '#account',
        icon: ShieldCheck,
        title: '계정 및 보안',
      },
    ],
    name: '김영자님',
    roleLabel: '어르신 계정',
    settings: ['큰 글씨 유지', '음성 안내 켜기', '가족에게 기록 공유'],
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
  const [statusMessage, setStatusMessage] = useState('')

  function handleLogout() {
    setStatusMessage('로그아웃 기능은 준비 중입니다.')
  }

  function handleSaveSettings() {
    setStatusMessage('마이페이지 설정을 저장했습니다.')
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#eef6ff] text-[#071747] lg:grid lg:place-items-center lg:p-[12px]">
      <div className="mx-auto min-h-svh w-full max-w-[520px] bg-[#f8fbff] shadow-[0_24px_80px_rgba(42,96,184,0.12)] lg:min-h-[calc(100svh-24px)] lg:max-w-[1120px] lg:overflow-hidden lg:rounded-[28px]">
        <header className="sticky top-0 z-20 border-b border-[#dfe8f5] bg-white/95 backdrop-blur lg:static">
          <div className="flex min-h-[72px] items-center justify-between gap-3 px-5 lg:min-h-16 lg:px-8">
            <Link
              to={config.backTo}
              className="inline-flex min-h-11 items-center rounded-lg text-[29px] font-black leading-none text-[#0867f2] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
              aria-label={config.homeLabel}
            >
              돌봄ON
            </Link>
            <Link
              to={config.backTo}
              className="inline-flex min-h-11 items-center rounded-lg border border-[#cfe0f8] bg-white px-4 text-[16px] font-black text-[#0867f2] shadow-[0_8px_18px_rgba(47,86,145,0.08)] transition hover:bg-[#f1f7ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
            >
              홈
            </Link>
          </div>
        </header>

        <div className="px-5 pb-[max(28px,env(safe-area-inset-bottom))] pt-7 lg:px-8 lg:py-5">
          <section aria-labelledby={`${role}-mypage-title`}>
            <h1
              id={`${role}-mypage-title`}
              className="text-[34px] font-black leading-tight text-[#071747] lg:text-[36px]"
            >
              마이페이지
            </h1>
            <p className="mt-3 break-keep text-[17px] font-semibold leading-snug text-[#4e596c]">
              {config.description}
            </p>
          </section>

          <div className="mt-6 grid gap-6 lg:mt-5 lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)] lg:gap-5">
            <div className="min-w-0">
              <section
                className="rounded-[22px] border border-[#d9e5f4] bg-white p-4 shadow-[0_16px_34px_rgba(47,86,145,0.1)]"
                aria-label={`${config.roleLabel} 프로필`}
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
                      {config.name}
                    </p>
                    <p className="mt-1 text-[16px] font-bold leading-tight text-[#53627a]">
                      {config.roleLabel}
                    </p>
                    <button
                      type="button"
                      className="mt-3 inline-flex min-h-10 items-center rounded-lg border border-[#cfe0f8] bg-[#f6fbff] px-4 text-[16px] font-black text-[#0867f2] transition hover:bg-[#edf6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff] lg:min-h-11"
                      onClick={() =>
                        setStatusMessage('프로필 수정 화면은 준비 중입니다.')
                      }
                    >
                      프로필 수정
                    </button>
                  </div>
                </div>
              </section>

              <section
                className="mt-4 grid grid-cols-3 gap-2 max-[359px]:grid-cols-1 lg:gap-3"
                aria-label="마이페이지 요약"
              >
                {config.metrics.map((metric) => (
                  <article
                    key={metric.label}
                    className={cn(
                      'min-h-[86px] rounded-[18px] px-3 py-3 text-center shadow-[0_12px_24px_rgba(47,86,145,0.08)] lg:min-h-[84px]',
                      metricToneClasses[metric.tone],
                    )}
                  >
                    <p className="text-[14px] font-black leading-tight">
                      {metric.label}
                    </p>
                    <p className="mt-3 text-[24px] font-black leading-none lg:text-[26px]">
                      {metric.value}
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
                  마이페이지 설정
                </h2>

                <div className="mt-3 overflow-hidden rounded-[20px] border border-[#dfe7f2] bg-white shadow-[0_14px_30px_rgba(47,86,145,0.08)]">
                  {config.settings.map((setting) => (
                    <label
                      key={setting}
                      className="flex min-h-[62px] items-center justify-between gap-4 border-b border-[#e6edf6] px-4 py-3 last:border-b-0 lg:min-h-[54px] lg:py-2"
                    >
                      <span className="break-keep text-[17px] font-black leading-tight text-[#1f2d44]">
                        {setting}
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
              <section aria-label="마이페이지 메뉴">
                <div className="grid gap-3">
                  {config.menuItems.map((item) => {
                    const Icon = item.icon

                    return (
                      <Link
                        key={item.title}
                        to={item.href}
                        className="grid min-h-[76px] grid-cols-[48px_minmax(0,1fr)_28px] items-center gap-3 rounded-[18px] border border-[#dfe7f2] bg-white px-4 py-3 shadow-[0_12px_26px_rgba(47,86,145,0.08)] transition hover:bg-[#f8fbff] active:scale-[0.995] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff] lg:min-h-[74px]"
                      >
                        <span className="grid h-12 w-12 place-items-center rounded-[14px] bg-[#edf6ff] text-[#0867f2]">
                          <Icon aria-hidden="true" className="h-7 w-7" />
                        </span>
                        <span className="min-w-0">
                          <strong className="block text-[18px] font-black leading-tight text-[#071747]">
                            {item.title}
                          </strong>
                          <span className="mt-1 block break-keep text-[14px] font-bold leading-snug text-[#5b6880] lg:text-[15px]">
                            {item.description}
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
                  로그아웃
                </button>

                <button
                  type="button"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-[18px] bg-[#0867f2] px-4 text-[18px] font-black text-white shadow-[0_12px_22px_rgba(8,103,242,0.24)] transition hover:bg-[#075fe0] active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
                  onClick={handleSaveSettings}
                >
                  <HelpCircle aria-hidden="true" className="h-5 w-5" />
                  설정 저장
                </button>
              </div>
            </div>
          </div>

          <p className="sr-only" aria-live="polite">
            {statusMessage}
          </p>
        </div>
      </div>
    </main>
  )
}
