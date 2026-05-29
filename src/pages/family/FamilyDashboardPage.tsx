import { ShieldCheck } from 'lucide-react'
import { PageShell } from '../../components/layout/PageShell'
import { elderSummaries } from '../../features/dashboard/mockData'
import { riskLevelMeta } from '../../features/risk/riskLevels'

export function FamilyDashboardPage() {
  return (
    <PageShell
      title="가족 대시보드"
      description="가족이 돌봄 상태를 빠르게 확인하는 화면입니다."
      backTo="/select-role"
    >
      <section className="grid gap-4">
        {elderSummaries.slice(0, 2).map((elder) => {
          const risk = riskLevelMeta[elder.riskLevel]

          return (
            <article
              key={elder.id}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-2xl font-black text-[var(--color-text-strong)]">
                    {elder.name} 님
                  </h2>
                  <p className="mt-2 text-lg text-[var(--color-muted)]">
                    최근 확인: {elder.lastCheckAt}
                  </p>
                </div>
                <span
                  className={`inline-flex min-h-11 items-center gap-2 rounded-md px-4 text-lg font-black ${risk.pillClass}`}
                >
                  <ShieldCheck aria-hidden="true" size={22} />
                  {risk.label}
                </span>
              </div>
              <p className="mt-4 text-xl text-[var(--color-text)]">
                {elder.summary}
              </p>
            </article>
          )
        })}
      </section>
    </PageShell>
  )
}
