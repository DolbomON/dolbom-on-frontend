import { useParams } from 'react-router-dom'
import { PageShell } from '../../components/layout/PageShell'
import { elderSummaries } from '../../features/dashboard/mockData'
import { riskLevelMeta } from '../../features/risk/riskLevels'

export function ElderDetailPage() {
  const { elderId } = useParams()
  const elder =
    elderSummaries.find((item) => item.id === elderId) ?? elderSummaries[0]
  const risk = riskLevelMeta[elder.riskLevel]

  return (
    <PageShell
      title={`${elder.name} 님 상세`}
      description="건강 확인 기록과 위험 요약이 들어갈 화면입니다."
      backTo="/worker"
    >
      <section className="grid gap-3 lg:grid-cols-[0.8fr_1.2fr] lg:gap-4">
        <article className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-5">
          <span
            className={`inline-flex min-h-9 items-center rounded-md px-3 text-base font-black sm:min-h-11 sm:px-4 sm:text-lg ${risk.pillClass}`}
          >
            {risk.label}
          </span>
          <h2 className="mt-2 text-2xl font-black text-[var(--color-text-strong)] sm:mt-4 sm:text-3xl">
            {elder.name} 님, {elder.age}세
          </h2>
          <p className="mt-1 text-sm text-[var(--color-muted)] sm:mt-3 sm:text-lg">
            최근 확인: {elder.lastCheckAt}
          </p>
          <p className="mt-2 text-base leading-snug text-[var(--color-text)] sm:mt-4 sm:text-xl">
            {elder.summary}
          </p>
        </article>

        <article className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-5">
          <h2 className="text-xl font-black text-[var(--color-text-strong)] sm:text-2xl">
            최근 건강 확인
          </h2>
          <dl className="mt-3 grid grid-cols-3 gap-2 sm:mt-5 sm:gap-4">
            <div className="rounded-md bg-[var(--color-surface-muted)] p-3 sm:p-4">
              <dt className="text-sm font-bold text-[var(--color-muted)] sm:text-base">
                기분
              </dt>
              <dd className="mt-1 text-xl font-black sm:mt-2 sm:text-2xl">
                보통
              </dd>
            </div>
            <div className="rounded-md bg-[var(--color-surface-muted)] p-3 sm:p-4">
              <dt className="text-sm font-bold text-[var(--color-muted)] sm:text-base">
                통증
              </dt>
              <dd className="mt-1 text-xl font-black sm:mt-2 sm:text-2xl">
                관찰
              </dd>
            </div>
            <div className="rounded-md bg-[var(--color-surface-muted)] p-3 sm:p-4">
              <dt className="text-sm font-bold text-[var(--color-muted)] sm:text-base">
                식사
              </dt>
              <dd className="mt-1 text-xl font-black sm:mt-2 sm:text-2xl">
                완료
              </dd>
            </div>
          </dl>
        </article>
      </section>
    </PageShell>
  )
}
