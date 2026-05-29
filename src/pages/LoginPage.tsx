import { LogIn } from 'lucide-react'
import { PageShell } from '../components/layout/PageShell'
import { LinkButton } from '../components/ui/Button'

export function LoginPage() {
  return (
    <PageShell
      title="로그인"
      description="초기 버전은 목업 화면으로 시작합니다."
      backTo="/"
    >
      <section className="max-w-xl rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-md bg-[var(--color-brand-soft)] text-[var(--color-brand-strong)]">
          <LogIn aria-hidden="true" size={30} />
        </div>
        <h2 className="text-2xl font-black text-[var(--color-text-strong)]">
          계정 연결 준비 중
        </h2>
        <p className="mt-3 text-lg text-[var(--color-muted)]">
          Supabase 인증 연동 전까지 역할 선택으로 이동합니다.
        </p>
        <LinkButton to="/select-role" className="mt-6" size="lg">
          역할 선택으로 이동
        </LinkButton>
      </section>
    </PageShell>
  )
}
