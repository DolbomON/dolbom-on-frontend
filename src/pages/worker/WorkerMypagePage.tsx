import { useMemo, useState } from 'react'
import { WorkerBottomNav } from '../../components/worker/WorkerBottomNav'
import { WorkerMypageMenuList } from '../../components/worker/WorkerMypageMenuList'
import { WorkerMypageMetricCard } from '../../components/worker/WorkerMypageMetricCard'
import { WorkerPageHeader } from '../../components/worker/WorkerPageHeader'
import { WorkerProfileCard } from '../../components/worker/WorkerProfileCard'
import {
  workerMypageMenuItems,
  workerMypageMetrics,
  workerProfile,
  type WorkerMypageMenuItem,
} from '../../features/worker/workerMypageData'

export function WorkerMypagePage() {
  const [statusMessage, setStatusMessage] = useState('')

  const availableMenuHrefs = useMemo(
    () => new Set<string>(['/worker/reports']),
    [],
  )

  const openProfileEdit = () => {
    // TODO: Navigate to /worker/mypage/edit after the profile edit screen is implemented.
    setStatusMessage('프로필 수정 화면은 준비 중입니다.')
  }

  const handleUnavailableMenuClick = (item: WorkerMypageMenuItem) => {
    // TODO: Replace this placeholder with real routes as each settings screen ships.
    setStatusMessage(`${item.title} 화면은 준비 중입니다.`)
  }

  const handleLogout = () => {
    // TODO: Connect to the auth logout flow when authentication is integrated.
    setStatusMessage('로그아웃 기능은 준비 중입니다.')
  }

  const handleSaveSettings = () => {
    // TODO: Persist worker notification/account settings when settings APIs exist.
    setStatusMessage('설정 저장 기능은 준비 중입니다.')
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#eef6ff] text-[#071747]">
      <div className="mx-auto min-h-svh w-full max-w-[480px] bg-[#f8fbff] shadow-[0_24px_70px_rgba(42,96,184,0.12)]">
        <WorkerPageHeader />

        <div className="px-5 pb-[calc(112px+env(safe-area-inset-bottom))] pt-7">
          <section aria-labelledby="worker-mypage-title">
            <h1
              id="worker-mypage-title"
              className="text-[34px] font-black leading-tight text-[#071747]"
            >
              마이페이지
            </h1>
            <p className="mt-4 text-[17px] font-medium leading-snug text-[#4e596c]">
              내 정보와 자주 쓰는 설정을 한눈에 관리하세요.
            </p>
          </section>

          <div className="mt-7">
            <WorkerProfileCard
              profile={workerProfile}
              onEditProfile={openProfileEdit}
            />
          </div>

          <section
            className="mt-5 grid grid-cols-3 gap-2 max-[359px]:grid-cols-1"
            aria-label="복지사 마이페이지 요약"
          >
            {workerMypageMetrics.map((metric) => (
              <WorkerMypageMetricCard key={metric.id} metric={metric} />
            ))}
          </section>

          <div className="mt-7">
            <WorkerMypageMenuList
              availableHrefs={availableMenuHrefs}
              items={workerMypageMenuItems}
              onUnavailableClick={handleUnavailableMenuClick}
            />
          </div>

          <div className="mt-7 grid grid-cols-[0.95fr_1.35fr] gap-3 max-[359px]:grid-cols-1">
            <button
              type="button"
              className="min-h-14 rounded-[18px] border-2 border-[#0867f2] bg-white px-4 text-[19px] font-black text-[#0867f2] transition hover:bg-[#f3f8ff] active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
              onClick={handleLogout}
            >
              로그아웃
            </button>

            <button
              type="button"
              className="min-h-14 rounded-[18px] bg-[#0867f2] px-4 text-[19px] font-black text-white shadow-[0_12px_22px_rgba(8,103,242,0.24)] transition hover:bg-[#075fe0] active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
              onClick={handleSaveSettings}
            >
              설정 저장
            </button>
          </div>

          <p className="sr-only" aria-live="polite">
            {statusMessage}
          </p>
        </div>
      </div>

      <WorkerBottomNav />
    </main>
  )
}
