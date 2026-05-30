import { DashboardMetricCard } from '../../components/worker/DashboardMetricCard'
import { ElderRiskCard } from '../../components/worker/ElderRiskCard'
import { RecentAlertList } from '../../components/worker/RecentAlertList'
import { WorkerBottomNav } from '../../components/worker/WorkerBottomNav'
import { WorkerDashboardHeader } from '../../components/worker/WorkerDashboardHeader'
import {
  workerAlerts,
  workerDashboardMetrics,
  workerRiskItems,
} from '../../features/dashboard/workerDashboardData'

export function WorkerDashboardPage() {
  return (
    <main className="min-h-svh overflow-x-hidden bg-[#eef6ff] text-[#071747]">
      <div className="mx-auto min-h-svh w-full max-w-[480px] bg-[#f8fbff] shadow-[0_24px_70px_rgba(42,96,184,0.12)]">
        <WorkerDashboardHeader />

        <div className="px-5 pb-[calc(106px+env(safe-area-inset-bottom))] pt-7">
          <section aria-labelledby="worker-dashboard-title">
            <h1
              id="worker-dashboard-title"
              className="text-[34px] font-black leading-tight text-[#071747]"
            >
              복지사 대시보드
            </h1>
            <p className="mt-3 text-[17px] font-medium leading-snug text-[#4e596c]">
              오늘 확인이 필요한 어르신을 먼저 보여드려요.
            </p>
          </section>

          <section
            className="mt-7 grid grid-cols-3 gap-2"
            aria-label="대시보드 요약 지표"
          >
            {workerDashboardMetrics.map((metric) => (
              <DashboardMetricCard key={metric.id} metric={metric} />
            ))}
          </section>

          <section className="mt-8" aria-labelledby="worker-risk-section-title">
            <h2
              id="worker-risk-section-title"
              className="text-[24px] font-black leading-tight text-[#071747]"
            >
              오늘 위험 대상자
            </h2>

            <div className="mt-3 grid gap-3">
              {workerRiskItems.map((elder) => (
                <ElderRiskCard key={elder.id} elder={elder} />
              ))}
            </div>
          </section>

          <section
            className="mt-8"
            aria-labelledby="worker-alert-section-title"
          >
            <h2
              id="worker-alert-section-title"
              className="text-[24px] font-black leading-tight text-[#071747]"
            >
              최근 알림
            </h2>

            <div className="mt-3">
              <RecentAlertList alerts={workerAlerts} />
            </div>
          </section>
        </div>
      </div>

      <WorkerBottomNav />
    </main>
  )
}
