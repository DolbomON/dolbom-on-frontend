import { Link } from 'react-router-dom'
import { PageShell } from '../../components/layout/PageShell'
import { elderSummaries } from '../../features/dashboard/mockData'
import { riskLevelMeta } from '../../features/risk/riskLevels'

export function WorkerDashboardPage() {
  return (
    <PageShell
      title="복지사 대시보드"
      description="담당 어르신의 위험 상태를 한눈에 확인합니다."
      backTo="/select-role"
    >
      <section className="grid gap-2.5 md:grid-cols-3 md:gap-4">
        {elderSummaries.map((elder) => {
          const risk = riskLevelMeta[elder.riskLevel]

          return (
            <Link
              key={elder.id}
              to={`/worker/elders/${elder.id}`}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 no-underline shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5"
            >
              <span
                className={`inline-flex min-h-7 items-center rounded-md px-2.5 text-sm font-black sm:min-h-10 sm:px-3 sm:text-base ${risk.pillClass}`}
              >
                {risk.label}
              </span>
              <h2 className="mt-1.5 text-lg font-black text-[var(--color-text-strong)] sm:mt-4 sm:text-2xl">
                {elder.name} 님
              </h2>
              <p className="mt-0.5 text-sm text-[var(--color-muted)] sm:mt-2 sm:text-lg">
                {elder.age}세 · {elder.lastCheckAt}
              </p>
              <p className="mt-1.5 text-sm leading-snug text-[var(--color-text)] sm:mt-4 sm:text-lg">
                {risk.summary}
              </p>
            </Link>
          )
        })}
      </section>
    </PageShell>
  )
}
