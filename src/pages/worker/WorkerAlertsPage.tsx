import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { WorkerAlertCard } from '../../components/worker/WorkerAlertCard'
import { WorkerAlertFilterChips } from '../../components/worker/WorkerAlertFilterChips'
import { WorkerAlertMetricCard } from '../../components/worker/WorkerAlertMetricCard'
import { WorkerAlertQuickActions } from '../../components/worker/WorkerAlertQuickActions'
import { WorkerBottomNav } from '../../components/worker/WorkerBottomNav'
import { WorkerPageHeader } from '../../components/worker/WorkerPageHeader'
import {
  workerAlertItems,
  workerAlertSummaryMetrics,
  type WorkerAlertFilter,
} from '../../features/worker/workerAlertsData'

export function WorkerAlertsPage() {
  const [activeFilter, setActiveFilter] = useState<WorkerAlertFilter>('all')

  const filteredAlerts = useMemo(() => {
    if (activeFilter === 'all') {
      return workerAlertItems
    }

    return workerAlertItems.filter((alert) => alert.status === activeFilter)
  }, [activeFilter])

  const showUrgentAlertsOnly = () => {
    setActiveFilter('urgent')
  }

  const openReadStatusManagement = () => {
    // TODO: Navigate to alert read-status management when that worker tool exists.
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#eef6ff] text-[#071747]">
      <div className="mx-auto min-h-svh w-full max-w-[480px] bg-[#f8fbff] shadow-[0_24px_70px_rgba(42,96,184,0.12)]">
        <WorkerPageHeader />

        <div className="px-5 pb-[calc(112px+env(safe-area-inset-bottom))] pt-7">
          <section aria-labelledby="worker-alerts-title">
            <h1
              id="worker-alerts-title"
              className="text-[34px] font-black leading-tight text-[#071747]"
            >
              알림
            </h1>
            <p className="mt-4 text-[17px] font-medium leading-snug text-[#4e596c]">
              위험 신호와 최근 상태 알림을 빠르게 확인하세요.
            </p>
          </section>

          <section
            className="mt-7 grid grid-cols-3 gap-2"
            aria-label="알림 요약"
          >
            {workerAlertSummaryMetrics.map((metric) => (
              <WorkerAlertMetricCard key={metric.id} metric={metric} />
            ))}
          </section>

          <div className="mt-6">
            <WorkerAlertFilterChips
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </div>

          <section className="mt-5 grid gap-3" aria-label="알림 목록">
            {filteredAlerts.map((alert) => (
              <WorkerAlertCard key={alert.id} alert={alert} />
            ))}

            {filteredAlerts.length === 0 && (
              <div className="rounded-[24px] border border-[#dbe8ff] bg-white px-5 py-8 text-center shadow-[0_12px_24px_rgba(32,79,150,0.07)]">
                <p className="text-[18px] font-black text-[#071747]">
                  표시할 알림이 없어요.
                </p>
                <p className="mt-2 text-[15px] font-medium text-[#66758a]">
                  다른 상태 필터를 선택해보세요.
                </p>
              </div>
            )}
          </section>

          <div className="mt-8">
            <WorkerAlertQuickActions
              onManageReadStatus={openReadStatusManagement}
              onShowUrgentOnly={showUrgentAlertsOnly}
            />
          </div>
        </div>
      </div>

      <WorkerBottomNav />
    </main>
  )
}

export function WorkerAlertDetailPlaceholderPage() {
  const { alertId } = useParams()

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#eef6ff] text-[#071747]">
      <div className="mx-auto min-h-svh w-full max-w-[480px] bg-[#f8fbff] shadow-[0_24px_70px_rgba(42,96,184,0.12)]">
        <WorkerPageHeader />

        <div className="px-5 pb-[calc(112px+env(safe-area-inset-bottom))] pt-7">
          <section
            className="rounded-[28px] border border-[#dbe8ff] bg-white px-5 py-8 shadow-[0_14px_28px_rgba(32,79,150,0.09)]"
            aria-labelledby="worker-alert-detail-title"
          >
            <p className="text-[15px] font-extrabold text-[#0867f2]">
              {alertId}
            </p>
            <h1
              id="worker-alert-detail-title"
              className="mt-2 text-[30px] font-black leading-tight text-[#071747]"
            >
              알림 상세 준비 중
            </h1>
            <p className="mt-3 text-[17px] font-medium leading-snug text-[#4e596c]">
              대응 메모, 읽음 상태, 연락 이력은 다음 단계에서 연결할 예정이에요.
            </p>

            <Link
              to="/worker/alerts"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-[16px] bg-[#0867f2] px-5 text-[17px] font-black text-white shadow-[0_12px_22px_rgba(8,103,242,0.22)] transition hover:bg-[#075fe0] active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
            >
              알림 목록으로 돌아가기
            </Link>
          </section>
        </div>
      </div>

      <WorkerBottomNav />
    </main>
  )
}
