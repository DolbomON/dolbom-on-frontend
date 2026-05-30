import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ElderAiSummaryCard } from '../../components/worker/ElderAiSummaryCard'
import { ElderDetailMetricCard } from '../../components/worker/ElderDetailMetricCard'
import { ElderDetailPeriodChips } from '../../components/worker/ElderDetailPeriodChips'
import { ElderDetailQuickActions } from '../../components/worker/ElderDetailQuickActions'
import { ElderProfileCard } from '../../components/worker/ElderProfileCard'
import { ElderRecentActivityCard } from '../../components/worker/ElderRecentActivityCard'
import { ElderStatusSummaryCard } from '../../components/worker/ElderStatusSummaryCard'
import { WorkerBottomNav } from '../../components/worker/WorkerBottomNav'
import { WorkerPageHeader } from '../../components/worker/WorkerPageHeader'
import {
  elderDetailMetrics,
  elderDetails,
  elderRecentActivities,
  elderStatusSummaryItems,
  type ElderDetailPeriod,
} from '../../features/worker/workerElderDetailData'

function WorkerElderDetailNotFound() {
  return (
    <main className="min-h-svh overflow-x-hidden bg-[#eef6ff] text-[#071747]">
      <div className="mx-auto min-h-svh w-full max-w-[480px] bg-[#f8fbff] shadow-[0_24px_70px_rgba(42,96,184,0.12)]">
        <WorkerPageHeader />

        <div className="px-5 pb-[calc(112px+env(safe-area-inset-bottom))] pt-7">
          <section
            className="rounded-[28px] border border-[#dbe8ff] bg-white px-5 py-8 text-center shadow-[0_14px_28px_rgba(32,79,150,0.09)]"
            aria-labelledby="elder-detail-not-found-title"
          >
            <h1
              id="elder-detail-not-found-title"
              className="text-[30px] font-black leading-tight text-[#071747]"
            >
              대상자 정보를 찾을 수 없어요.
            </h1>
            <p className="mt-3 text-[17px] font-medium leading-snug text-[#4e596c]">
              대상자 목록에서 다시 선택해 주세요.
            </p>
            <Link
              to="/worker/elders"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-[16px] bg-[#0867f2] px-5 text-[17px] font-black text-white shadow-[0_12px_22px_rgba(8,103,242,0.22)] transition hover:bg-[#075fe0] active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
            >
              대상자 목록으로 돌아가기
            </Link>
          </section>
        </div>
      </div>

      <WorkerBottomNav />
    </main>
  )
}

export function WorkerElderDetailPage() {
  const { elderId } = useParams()
  const [activePeriod, setActivePeriod] = useState<ElderDetailPeriod>('today')

  const elder = useMemo(
    () => elderDetails.find((item) => item.id === elderId),
    [elderId],
  )

  if (!elder) {
    return <WorkerElderDetailNotFound />
  }

  const handlePeriodChange = (nextPeriod: ElderDetailPeriod) => {
    setActivePeriod(nextPeriod)
    // TODO: Query the elder detail API with the selected period when backend data is available.
  }

  // TODO: Navigate to /worker/elders/:elderId/risks when that screen exists.
  const openRiskRecords = () => undefined

  // TODO: Navigate to /worker/elders/:elderId/ai-summary when that screen exists.
  const openAiSummary = () => undefined

  // TODO: Open guardian contact flow when contact logging is implemented.
  const openGuardianContact = () => undefined

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#eef6ff] text-[#071747]">
      <div className="mx-auto min-h-svh w-full max-w-[480px] bg-[#f8fbff] shadow-[0_24px_70px_rgba(42,96,184,0.12)]">
        <WorkerPageHeader />

        <div className="px-5 pb-[calc(112px+env(safe-area-inset-bottom))] pt-7">
          <section aria-labelledby="worker-elder-detail-title">
            <h1
              id="worker-elder-detail-title"
              className="text-[34px] font-black leading-tight text-[#071747]"
            >
              대상자 상세
            </h1>
            <p className="mt-4 text-[17px] font-medium leading-snug text-[#4e596c]">
              {elder.name}의 최근 안부와 위험 신호를 확인하세요.
            </p>
          </section>

          <div className="mt-6">
            <ElderProfileCard
              elder={elder}
              onGuardianContact={openGuardianContact}
            />
          </div>

          <section
            className="mt-5 grid grid-cols-3 gap-2 max-[349px]:grid-cols-1"
            aria-label="대상자 상태 요약"
          >
            {elderDetailMetrics.map((metric) => (
              <ElderDetailMetricCard key={metric.id} metric={metric} />
            ))}
          </section>

          <div className="mt-6">
            <ElderDetailPeriodChips
              activePeriod={activePeriod}
              onPeriodChange={handlePeriodChange}
            />
          </div>

          <div className="mt-5">
            <ElderStatusSummaryCard items={elderStatusSummaryItems} />
          </div>

          <div className="mt-4">
            <ElderAiSummaryCard />
          </div>

          <div className="mt-4">
            <ElderRecentActivityCard activities={elderRecentActivities} />
          </div>

          <div className="mt-8">
            <ElderDetailQuickActions
              onAiSummaryClick={openAiSummary}
              onRiskRecordsClick={openRiskRecords}
            />
          </div>
        </div>
      </div>

      <WorkerBottomNav />
    </main>
  )
}
