import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RoleCard, type RoleOption } from '../components/role-select/RoleCard'
import { RoleSelectHeader } from '../components/role-select/RoleSelectHeader'

type UserRole = 'elder' | 'family' | 'worker' | 'government'

const heroImage = '/assets/dolbomon/role-select/hero-role-select.png'

const roleOptions: Array<RoleOption<UserRole>> = [
  {
    description: '건강과 안부를 쉽게 기록해요',
    id: 'elder',
    imageSrc: '/assets/dolbomon/role-select/role-elder.png',
    title: '어르신',
  },
  {
    description: '가족의 상태를 함께 살펴봐요',
    id: 'family',
    imageSrc: '/assets/dolbomon/role-select/role-family.png',
    title: '가족',
  },
  {
    description: '오늘 방문 업무를 실행하고 기록해요',
    id: 'worker',
    imageSrc: '/assets/dolbomon/role-select/role-worker.png',
    title: '요양사',
  },
  {
    description: '위험 대응과 요양사 배정을 관리해요',
    id: 'government',
    imageSrc: '/assets/dolbomon/role-select/role-government.png',
    title: '복지사',
  },
]

const nextRouteByRole: Record<UserRole, string> = {
  elder: '/elder/basic-info',
  family: '/family',
  worker: '/worker/signup',
  government: '/worker',
}

export function RoleSelectPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const navigate = useNavigate()

  function handleBack() {
    if (window.history.length > 1) {
      navigate(-1)
      return
    }

    navigate('/')
  }

  function handleNext() {
    if (!selectedRole) {
      return
    }

    const nextRoute = nextRouteByRole[selectedRole]

    navigate(nextRoute)
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#eef6ff] text-[#050505]">
      <section
        className="mx-auto flex min-h-svh w-full max-w-[480px] flex-col overflow-hidden bg-[radial-gradient(circle_at_87%_25%,rgba(228,242,255,0.95)_0_17%,transparent_36%),linear-gradient(180deg,#ffffff_0%,#fbfdff_62%,#ffffff_100%)] px-4 pb-[max(14px,env(safe-area-inset-bottom))] pt-3 shadow-[0_20px_80px_rgba(55,104,184,0.08)] min-[390px]:px-5 min-[390px]:pt-4 sm:px-6"
        aria-label="이용 유형 선택 화면"
      >
        <RoleSelectHeader onBack={handleBack} />

        <section
          className="relative min-h-[208px] pt-8 min-[390px]:min-h-[236px] min-[390px]:pt-10"
          aria-labelledby="role-title"
        >
          <div className="relative z-10 flex items-center gap-4">
            <span
              className="inline-flex min-h-[31px] min-w-[59px] items-center justify-center gap-1 rounded-full border border-[#b8d3ff] bg-white/75 px-4 text-[19px] tracking-[-0.04em] shadow-[0_8px_18px_rgba(36,95,190,0.05)]"
              aria-label="1단계, 총 3단계"
            >
              <strong className="font-black text-[#0867f2]">1</strong>
              <span className="font-bold text-[#8ea7cf]">/ 3</span>
            </span>
            <span className="text-[16px] font-bold tracking-[-0.045em] text-[#0867f2]">
              이용 유형 선택
            </span>
          </div>

          <div className="relative z-10 mt-4 min-[390px]:mt-5">
            <h1
              id="role-title"
              className="text-[32px] font-black leading-[1.1] tracking-[-0.075em] min-[390px]:text-[38px]"
              aria-label="이용 유형을 선택해주세요"
            >
              이용 유형을
              <br />
              <span className="text-[#005ee6]">선택해주세요</span>
            </h1>

            <p className="mt-3 text-[14px] font-medium leading-[1.35] tracking-[-0.045em] text-[#596170] min-[390px]:mt-4 min-[390px]:text-[15px]">
              사용할 대상에 맞는 메뉴와
              <br />
              기능을 안내해드릴게요.
            </p>
          </div>

          <img
            src={heroImage}
            alt=""
            width="1448"
            height="1086"
            className="pointer-events-none absolute right-[-68px] top-9 z-0 w-[230px] max-w-none select-none min-[390px]:right-[-86px] min-[390px]:top-7 min-[390px]:w-[282px]"
            aria-hidden="true"
            draggable="false"
          />
        </section>

        <section
          className="relative z-10 grid flex-1 auto-rows-fr grid-cols-2 gap-3"
          aria-label="이용 유형 목록"
        >
          {roleOptions.map((role) => (
            <RoleCard
              key={role.id}
              role={role}
              selected={selectedRole === role.id}
              onSelect={() => setSelectedRole(role.id)}
            />
          ))}
        </section>

        <button
          className="relative z-10 mt-4 flex min-h-[50px] w-full items-center justify-center rounded-[20px] bg-gradient-to-br from-[#0876ff] to-[#005ee6] px-5 text-[21px] font-black tracking-[-0.045em] text-white shadow-[0_16px_28px_rgba(2,92,221,0.22)] transition enabled:active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-none disabled:bg-[#d8e4f4] disabled:text-[#8190a6] disabled:shadow-none focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[56px] min-[390px]:text-[24px]"
          type="button"
          disabled={!selectedRole}
          onClick={handleNext}
        >
          다음
        </button>
      </section>
    </main>
  )
}
