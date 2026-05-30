import { useState } from 'react'
import {
  AlertCircle,
  CheckCircle,
  Moon,
  Pencil,
  Pill,
  Smile,
  Soup,
  type LucideIcon,
} from 'lucide-react'
import { WorkerBottomNav } from '../../components/worker/WorkerBottomNav'
import { WorkerPageHeader } from '../../components/worker/WorkerPageHeader'
import { WorkerReportMetricCard } from '../../components/worker/WorkerReportMetricCard'
import { WorkerReportPeriodChips } from '../../components/worker/WorkerReportPeriodChips'
import { WorkerReportQuickActions } from '../../components/worker/WorkerReportQuickActions'
import { WorkerReportSummaryCard } from '../../components/worker/WorkerReportSummaryCard'
import { WorkerReportTargetsCard } from '../../components/worker/WorkerReportTargetsCard'
import {
  categoryRecordRows,
  followUpTargets,
  reportMetrics,
  todaySummaryRows,
  type ReportPeriod,
  type ReportProgressItem,
} from '../../features/worker/workerReportsData'

const todaySummaryIcons: Record<string, LucideIcon> = {
  complete: CheckCircle,
  missing: Pencil,
  risk: AlertCircle,
}

const categoryRecordIcons: Record<string, LucideIcon> = {
  meal: Soup,
  medication: Pill,
  mood: Smile,
  sleep: Moon,
}

function getTodaySummaryIcon(item: ReportProgressItem) {
  return todaySummaryIcons[item.id] ?? CheckCircle
}

function getCategoryRecordIcon(item: ReportProgressItem) {
  return categoryRecordIcons[item.id] ?? CheckCircle
}

export function WorkerReportsPage() {
  const [activePeriod, setActivePeriod] = useState<ReportPeriod>('today')

  const handlePeriodChange = (nextPeriod: ReportPeriod) => {
    setActivePeriod(nextPeriod)
    // TODO: Query the report API with the selected period when backend data is available.
  }

  const openAiSummary = () => {
    // TODO: Navigate to /worker/reports/ai-summary once that screen exists.
  }

  const createWeeklyReport = () => {
    // TODO: Navigate to /worker/reports/weekly once report generation exists.
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#eef6ff] text-[#071747]">
      <div className="mx-auto min-h-svh w-full max-w-[480px] bg-[#f8fbff] shadow-[0_24px_70px_rgba(42,96,184,0.12)]">
        <WorkerPageHeader />

        <div className="px-5 pb-[calc(112px+env(safe-area-inset-bottom))] pt-7">
          <section aria-labelledby="worker-reports-title">
            <h1
              id="worker-reports-title"
              className="text-[34px] font-black leading-tight text-[#071747]"
            >
              보고서
            </h1>
            <p className="mt-4 text-[17px] font-medium leading-snug text-[#4e596c]">
              담당 어르신의 상태를 한눈에 정리해드려요.
            </p>
          </section>

          <section
            className="mt-7 grid grid-cols-3 gap-2 max-[349px]:grid-cols-1"
            aria-label="보고서 요약 통계"
          >
            {reportMetrics.map((metric) => (
              <WorkerReportMetricCard key={metric.id} metric={metric} />
            ))}
          </section>

          <div className="mt-6">
            <WorkerReportPeriodChips
              activePeriod={activePeriod}
              onPeriodChange={handlePeriodChange}
            />
          </div>

          <div className="mt-5">
            <WorkerReportSummaryCard
              iconForItem={getTodaySummaryIcon}
              items={todaySummaryRows}
              title="오늘 요약"
            />
          </div>

          <div className="mt-4">
            <WorkerReportSummaryCard
              iconForItem={getCategoryRecordIcon}
              items={categoryRecordRows}
              title="항목별 기록 현황"
            />
          </div>

          <div className="mt-4">
            <WorkerReportTargetsCard targets={followUpTargets} />
          </div>

          <div className="mt-8">
            <WorkerReportQuickActions
              onAiSummaryClick={openAiSummary}
              onWeeklyReportClick={createWeeklyReport}
            />
          </div>
        </div>
      </div>

      <WorkerBottomNav />
    </main>
  )
}
