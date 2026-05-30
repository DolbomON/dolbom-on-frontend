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
      <section className="grid grid-cols-2 gap-3 md:gap-4">
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

      <section className="grid grid-cols-2 gap-3 md:gap-4">
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 sm:p-5">
          <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-md bg-sky-50 text-sky-700 sm:mb-4 sm:h-12 sm:w-12">
            <Mic aria-hidden="true" size={24} />
          </div>
          <h2 className="text-lg font-black text-[var(--color-text-strong)] sm:text-2xl">
            음성 안내
          </h2>
          <p className="mt-1 text-sm leading-snug text-[var(--color-muted)] sm:mt-2 sm:text-lg">
            {voiceGuidanceCopy.elderCheck}
          </p>
        </div>
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 sm:p-5">
          <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-md bg-amber-50 text-amber-700 sm:mb-4 sm:h-12 sm:w-12">
            <PhoneCall aria-hidden="true" size={24} />
          </div>
          <h2 className="text-lg font-black text-[var(--color-text-strong)] sm:text-2xl">
            가족 연결
          </h2>
          <p className="mt-1 text-sm leading-snug text-[var(--color-muted)] sm:mt-2 sm:text-lg">
            위험 신호가 있으면 가족 화면에 바로 표시됩니다.
          </p>
        </div>
      </section>
    </PageShell>
  )
}
