import { HeartPulse, MessageCircle, Mic, PhoneCall } from 'lucide-react'
import { PageShell } from '../../components/layout/PageShell'
import { SeniorActionCard } from '../../components/senior/SeniorActionCard'
import { voiceGuidanceCopy } from '../../features/voice/voicePrompts'

export function ElderHomePage() {
  return (
    <PageShell
      title="안녕하세요"
      description="오늘 필요한 돌봄 기능을 크게 눌러 시작하세요."
      backTo="/select-role"
    >
      <section className="grid gap-4 md:grid-cols-2">
        <SeniorActionCard
          to="/elder/check"
          title="건강 확인"
          description="기분, 통증, 식사를 확인합니다."
          icon={<HeartPulse aria-hidden="true" size={32} />}
          tone="calm"
        />
        <SeniorActionCard
          to="/elder/chat"
          title="마음 대화"
          description="오늘 있었던 일을 편하게 말합니다."
          icon={<MessageCircle aria-hidden="true" size={32} />}
        />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md bg-sky-50 text-sky-700">
            <Mic aria-hidden="true" size={30} />
          </div>
          <h2 className="text-2xl font-black text-[var(--color-text-strong)]">
            음성 안내
          </h2>
          <p className="mt-2 text-lg text-[var(--color-muted)]">
            {voiceGuidanceCopy.elderCheck}
          </p>
        </div>
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md bg-amber-50 text-amber-700">
            <PhoneCall aria-hidden="true" size={30} />
          </div>
          <h2 className="text-2xl font-black text-[var(--color-text-strong)]">
            가족 연결
          </h2>
          <p className="mt-2 text-lg text-[var(--color-muted)]">
            위험 신호가 있으면 가족 화면에 바로 표시됩니다.
          </p>
        </div>
      </section>
    </PageShell>
  )
}
