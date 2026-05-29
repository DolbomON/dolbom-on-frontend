import { HeartHandshake, MessageCircle, ShieldCheck } from 'lucide-react'
import { LinkButton } from '../components/ui/Button'

export function LandingPage() {
  return (
    <main className="min-h-svh bg-[var(--color-page)] text-[var(--color-text)]">
      <section className="mx-auto grid min-h-svh w-full max-w-6xl items-center gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="max-w-3xl">
          <p className="mb-3 text-lg font-bold text-[var(--color-brand-strong)]">
            어르신 돌봄을 더 가깝게
          </p>
          <h1 className="text-5xl font-black leading-tight text-[var(--color-text-strong)] sm:text-6xl">
            DolbomON
          </h1>
          <p className="mt-5 text-2xl leading-relaxed text-[var(--color-muted)]">
            건강 확인, 마음 대화, 위험 알림을 한 곳에서 이어 주는 시니어 케어
            앱입니다.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton to="/select-role" size="lg">
              시작하기
            </LinkButton>
            <LinkButton to="/login" size="lg" variant="secondary">
              로그인
            </LinkButton>
          </div>
        </div>

        <div
          className="grid gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm"
          aria-label="주요 돌봄 상태"
        >
          <div className="flex items-center gap-4 rounded-lg bg-emerald-50 p-5">
            <ShieldCheck
              aria-hidden="true"
              className="text-emerald-700"
              size={36}
            />
            <div>
              <p className="text-xl font-black text-[var(--color-text-strong)]">
                위험 상태 요약
              </p>
              <p className="text-lg text-[var(--color-muted)]">
                가족과 복지사가 같은 정보를 봅니다.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg bg-amber-50 p-5">
            <HeartHandshake
              aria-hidden="true"
              className="text-amber-700"
              size={36}
            />
            <div>
              <p className="text-xl font-black text-[var(--color-text-strong)]">
                매일 건강 확인
              </p>
              <p className="text-lg text-[var(--color-muted)]">
                큰 글씨와 쉬운 버튼으로 응답합니다.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg bg-sky-50 p-5">
            <MessageCircle
              aria-hidden="true"
              className="text-sky-700"
              size={36}
            />
            <div>
              <p className="text-xl font-black text-[var(--color-text-strong)]">
                마음 돌봄 대화
              </p>
              <p className="text-lg text-[var(--color-muted)]">
                음성과 대화 흐름을 확장할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
