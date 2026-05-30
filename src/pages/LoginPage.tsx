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
      <section className="max-w-xl rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm sm:p-6">
        <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-md bg-[var(--color-brand-soft)] text-[var(--color-brand-strong)] sm:mb-6 sm:h-14 sm:w-14">
          <LogIn aria-hidden="true" size={26} />
        </div>
        <h2 className="text-xl font-black text-[var(--color-text-strong)] sm:text-2xl">
          계정 연결 준비 중
        </h2>
        <p className="mt-2 text-base leading-snug text-[var(--color-muted)] sm:mt-3 sm:text-lg">
          Supabase 인증 연동 전까지 역할 선택으로 이동합니다.
        </p>
        <LinkButton to="/select-role" className="mt-4 sm:mt-6" size="lg">
          역할 선택으로 이동
        </LinkButton>
      </section>
    </PageShell>
  )
}
