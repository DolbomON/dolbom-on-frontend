import { Mic, Send } from 'lucide-react'
import { PageShell } from '../../components/layout/PageShell'
import { Button } from '../../components/ui/Button'
import { chatMessages } from '../../features/chat/mockMessages'
import { voiceGuidanceCopy } from '../../features/voice/voicePrompts'

export function ElderChatPage() {
  return (
    <PageShell
      title="마음 대화"
      description="AI 정서 돌봄 대화가 들어갈 자리입니다."
      backTo="/elder"
    >
      <section className="grid gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <div className="rounded-lg bg-sky-50 p-4 text-lg text-sky-900">
          {voiceGuidanceCopy.chat}
        </div>
        <div className="grid gap-3">
          {chatMessages.map((item) => (
            <div
              key={`${item.from}-${item.message}`}
              className={
                item.from === 'assistant'
                  ? 'max-w-[85%] rounded-lg bg-[var(--color-brand-soft)] p-4 text-lg text-[var(--color-brand-strong)]'
                  : 'ml-auto max-w-[85%] rounded-lg bg-amber-50 p-4 text-lg text-amber-900'
              }
            >
              {item.message}
            </div>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
          <label className="sr-only" htmlFor="chat-input">
            대화 입력
          </label>
          <input
            id="chat-input"
            type="text"
            placeholder="말씀을 입력해 주세요"
            className="min-h-14 rounded-md border border-[var(--color-border)] px-4 text-lg"
          />
          <Button
            type="button"
            variant="secondary"
            icon={<Mic aria-hidden="true" size={24} />}
          >
            음성
          </Button>
          <Button type="button" icon={<Send aria-hidden="true" size={24} />}>
            보내기
          </Button>
        </div>
      </section>
    </PageShell>
  )
}
