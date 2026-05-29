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
      <section className="grid gap-4 md:grid-cols-3">
        {elderSummaries.map((elder) => {
          const risk = riskLevelMeta[elder.riskLevel]

          return (
            <Link
              key={elder.id}
              to={`/worker/elders/${elder.id}`}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5 no-underline shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span
                className={`inline-flex min-h-10 items-center rounded-md px-3 text-base font-black ${risk.pillClass}`}
              >
                {risk.label}
              </span>
              <h2 className="mt-4 text-2xl font-black text-[var(--color-text-strong)]">
                {elder.name} 님
              </h2>
              <p className="mt-2 text-lg text-[var(--color-muted)]">
                {elder.age}세 · {elder.lastCheckAt}
              </p>
              <p className="mt-4 text-lg text-[var(--color-text)]">
                {risk.summary}
              </p>
            </Link>
          )
        })}
      </section>
    </PageShell>
  )
}
