import { useParams } from 'react-router-dom'
import { PageShell } from '../../components/layout/PageShell'
import { managedElders } from '../../features/worker/managedEldersData'
import { cn } from '../../lib/utils'

const detailRiskTone = {
  caution: {
    badge: 'border-[#ffd36a] bg-[#fff7df] text-[#d48700]',
    summary: '주의 상태입니다. 담당 복지사의 확인이 필요합니다.',
  },
  danger: {
    badge: 'border-[#ffb8b8] bg-[#fff0f0] text-[#e11d1d]',
    summary: '위험 상태입니다. 빠른 전화 확인 또는 방문 확인이 필요합니다.',
  },
  stable: {
    badge: 'border-[#a9e7c0] bg-[#effbf4] text-[#17733d]',
    summary: '안정 상태입니다. 현재 입력 흐름이 정상입니다.',
  },
}

export function ElderDetailPage() {
  const { elderId } = useParams()
  const elder =
    managedElders.find((item) => item.id === elderId) ?? managedElders[0]
  const risk = detailRiskTone[elder.riskStatus]
  const lastInputTime = elder.lastInputText.replace('최근 입력 ', '')

  return (
    <PageShell
      title={`${elder.name} 상세`}
      description="건강 확인 기록과 위험 요약이 들어갈 화면입니다."
      backTo="/worker"
    >
      <section className="grid gap-3 lg:grid-cols-[0.8fr_1.2fr] lg:gap-4">
        <article className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-5">
          <span
            className={cn(
              'inline-flex min-h-9 items-center rounded-md border px-3 text-base font-black sm:min-h-11 sm:px-4 sm:text-lg',
              risk.badge,
            )}
          >
            {elder.riskLabel}
          </span>
          <h2 className="mt-2 text-2xl font-black text-[var(--color-text-strong)] sm:mt-4 sm:text-3xl">
            {elder.name}
          </h2>
          <p className="mt-1 text-sm text-[var(--color-muted)] sm:mt-3 sm:text-lg">
            최근 확인: {lastInputTime}
          </p>
          <p className="mt-2 text-base leading-snug text-[var(--color-text)] sm:mt-4 sm:text-xl">
            {elder.statusReason}. {risk.summary}
          </p>
        </article>

        <article className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-5">
          <h2 className="text-xl font-black text-[var(--color-text-strong)] sm:text-2xl">
            최근 건강 확인
          </h2>
          {/* TODO: Connect this placeholder to case memo and report data when the worker detail API is ready. */}
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
