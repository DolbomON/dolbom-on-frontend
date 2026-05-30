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
      <section className="grid gap-3 sm:gap-4">
        {elderSummaries.slice(0, 2).map((elder) => {
          const risk = riskLevelMeta[elder.riskLevel]

          return (
            <article
              key={elder.id}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm sm:p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black text-[var(--color-text-strong)] sm:text-2xl">
                    {elder.name} 님
                  </h2>
                  <p className="mt-1 text-sm text-[var(--color-muted)] sm:mt-2 sm:text-lg">
                    최근 확인: {elder.lastCheckAt}
                  </p>
                </div>
                <span
                  className={`inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-md px-3 text-base font-black sm:min-h-11 sm:gap-2 sm:px-4 sm:text-lg ${risk.pillClass}`}
                >
                  <ShieldCheck aria-hidden="true" size={20} />
                  {risk.label}
                </span>
              </div>
              <p className="mt-3 text-base leading-snug text-[var(--color-text)] sm:mt-4 sm:text-xl">
                {elder.summary}
              </p>
            </article>
          )
        })}
      </section>
    </PageShell>
  )
}
