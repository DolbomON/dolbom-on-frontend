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
      <section className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <article className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <span
            className={`inline-flex min-h-11 items-center rounded-md px-4 text-lg font-black ${risk.pillClass}`}
          >
            {risk.label}
          </span>
          <h2 className="mt-4 text-3xl font-black text-[var(--color-text-strong)]">
            {elder.name} 님, {elder.age}세
          </h2>
          <p className="mt-3 text-lg text-[var(--color-muted)]">
            최근 확인: {elder.lastCheckAt}
          </p>
          <p className="mt-4 text-xl text-[var(--color-text)]">
            {elder.summary}
          </p>
        </article>

        <article className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <h2 className="text-2xl font-black text-[var(--color-text-strong)]">
            최근 건강 확인
          </h2>
          <dl className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-md bg-[var(--color-surface-muted)] p-4">
              <dt className="text-base font-bold text-[var(--color-muted)]">
                기분
              </dt>
              <dd className="mt-2 text-2xl font-black">보통</dd>
            </div>
            <div className="rounded-md bg-[var(--color-surface-muted)] p-4">
              <dt className="text-base font-bold text-[var(--color-muted)]">
                통증
              </dt>
              <dd className="mt-2 text-2xl font-black">관찰</dd>
            </div>
            <div className="rounded-md bg-[var(--color-surface-muted)] p-4">
              <dt className="text-base font-bold text-[var(--color-muted)]">
                식사
              </dt>
              <dd className="mt-2 text-2xl font-black">완료</dd>
            </div>
          </dl>
        </article>
      </section>
    </PageShell>
  )
}
