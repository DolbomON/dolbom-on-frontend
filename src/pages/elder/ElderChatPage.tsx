import { Mic } from 'lucide-react'
import { ElderCheckHeader } from '../../components/elder-check/ElderCheckHeader'
import { ElderBottomNav } from '../../components/layout/ElderBottomNav'
import { cn } from '../../lib/utils'

type ChatRole = 'assistant' | 'user'

type ChatMessage = {
  id: string
  role: ChatRole
  text: string
}

const defaultMessages: ChatMessage[] = [
  {
    id: 'welcome',
    role: 'assistant',
    text: '안녕하세요, 김영자님.\n오늘 기분은 어떠셨어요?',
  },
  {
    id: 'mood',
    role: 'user',
    text: '기분은 괜찮았어요.',
  },
  {
    id: 'meal-medication',
    role: 'assistant',
    text: '식사와 약은 잘 챙기셨나요?',
  },
  {
    id: 'meal-medication-answer',
    role: 'user',
    text: '네, 식사도 했고 약도 먹었어요.',
  },
]

const quickReplies: string[] = ['좋아요', '조금 피곤해요', '도움이 필요해요']

const aiRobotImageSrc = '/assets/dolbomon/elder-chat/ai-chat-robot.png'

function ChatAvatar() {
  return (
    <span
      className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#eef7ff] shadow-[0_7px_16px_rgba(45,104,184,0.11)] min-[390px]:h-12 min-[390px]:w-12"
      aria-hidden="true"
    >
      <img
        src={aiRobotImageSrc}
        alt=""
        className="h-9 w-9 object-contain min-[390px]:h-10 min-[390px]:w-10"
        draggable="false"
      />
    </span>
  )
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user'

  return (
    <div
      className={cn(
        'flex items-start gap-2.5 min-[390px]:gap-3',
        isUser && 'justify-end',
      )}
    >
      {!isUser ? <ChatAvatar /> : null}
      <p
        className={cn(
          'max-w-[78%] whitespace-pre-line rounded-[24px] px-4 py-3.5 text-[19px] font-extrabold leading-[1.42] tracking-[-0.045em] min-[390px]:text-[22px]',
          isUser
            ? 'rounded-br-md bg-[#0867f2] text-white shadow-[0_10px_20px_rgba(8,103,242,0.22)]'
            : 'rounded-tl-md bg-[#edf6ff] text-[#061844]',
        )}
      >
        {message.text}
      </p>
    </div>
  )
}

export function ElderChatPage() {
  function handleNotificationClick() {
    // TODO: Open the notification center when notifications are implemented.
    console.info('Notifications are not implemented yet.')
  }

  function handleQuickReply(reply: string) {
    // TODO: Send quick replies through the chat service when it is available.
    console.info(`Selected quick reply: ${reply}`)
  }

  function handleVoiceContinue() {
    // TODO: Connect this button to the voice/STT utility when it is available.
    console.info('Voice chat is not implemented yet.')
  }

  function handleHelpClick() {
    // TODO: Route to the senior help screen when that route is added.
    console.info('Help is not implemented yet.')
  }

  return (
    <main className="min-h-svh bg-[#edf5ff] text-[#061844]">
      <section
        className="mx-auto flex min-h-svh w-full max-w-[480px] flex-col overflow-hidden bg-[#f8fbff] shadow-[0_20px_80px_rgba(55,104,184,0.08)]"
        aria-label="AI 안부 대화 화면"
      >
        <div className="flex-1 px-5 pb-[calc(112px+env(safe-area-inset-bottom))] pt-7 min-[390px]:px-6">
          <ElderCheckHeader onNotificationClick={handleNotificationClick} />

          <section
            className="mt-10 min-[390px]:mt-12"
            aria-labelledby="chat-title"
          >
            <h1
              id="chat-title"
              className="text-[38px] font-black leading-[1.13] tracking-[-0.075em] text-[#061844] min-[390px]:text-[50px]"
            >
              AI 안부 대화
            </h1>
          </section>

          <section
            className="mt-7 flex items-center gap-3.5 rounded-[28px] border border-[#d7e8ff] bg-[#eef7ff] px-4 py-4 shadow-[0_14px_28px_rgba(36,92,174,0.1),inset_0_1px_0_rgba(255,255,255,0.86)] min-[390px]:gap-5 min-[390px]:px-5"
            aria-labelledby="chat-info-title"
          >
            <div className="grid h-[92px] w-[92px] shrink-0 place-items-center min-[390px]:h-[112px] min-[390px]:w-[112px]">
              <img
                src={aiRobotImageSrc}
                alt=""
                width="112"
                height="112"
                className="h-full w-full object-contain drop-shadow-[0_12px_20px_rgba(51,106,187,0.18)]"
                draggable="false"
              />
            </div>

            <div className="min-w-0">
              <h2
                id="chat-info-title"
                className="text-[21px] font-black leading-[1.25] tracking-[-0.06em] text-[#061844] min-[390px]:text-[26px]"
              >
                오늘의 안부를 대화로 남겨보세요
              </h2>
              <p className="mt-2 text-[16px] font-semibold leading-[1.45] tracking-[-0.04em] text-[#566174] min-[390px]:text-[19px]">
                음성 또는 텍스트로 편하게 이야기할 수 있어요.
              </p>
            </div>
          </section>

          <section
            className="mt-6 rounded-[28px] border border-[#d7e8ff] bg-white px-4 py-5 shadow-[0_14px_34px_rgba(36,92,174,0.1)] min-[390px]:px-5 min-[390px]:py-6"
            aria-label="AI 안부 대화 내용"
          >
            <div className="grid gap-5 min-[390px]:gap-6">
              {defaultMessages.map((message) => (
                <ChatBubble key={message.id} message={message} />
              ))}
            </div>
          </section>

          <section
            className="mt-5 flex flex-wrap gap-2.5 min-[390px]:grid min-[390px]:grid-cols-3 min-[390px]:gap-3"
            aria-label="빠른 답변"
          >
            {quickReplies.map((reply) => (
              <button
                key={reply}
                className="min-h-[54px] min-w-[128px] flex-1 rounded-[20px] border-2 border-[#75a7ff] bg-white px-3 text-[18px] font-black tracking-[-0.05em] text-[#0867f2] shadow-[inset_0_0_0_1px_rgba(8,103,242,0.03)] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-w-0 min-[390px]:text-[19px]"
                type="button"
                onClick={() => handleQuickReply(reply)}
              >
                {reply}
              </button>
            ))}
          </section>

          <button
            className="mt-5 flex min-h-16 w-full items-center justify-center gap-3.5 rounded-[24px] bg-gradient-to-br from-[#0878ff] to-[#005de8] px-5 text-[24px] font-black tracking-[-0.055em] text-white shadow-[0_18px_32px_rgba(2,92,221,0.24),inset_0_1px_0_rgba(255,255,255,0.24)] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[70px] min-[390px]:text-[30px]"
            type="button"
            onClick={handleVoiceContinue}
          >
            <Mic size={34} strokeWidth={3.2} aria-hidden="true" />
            <span>음성으로 계속하기</span>
          </button>
        </div>

        <ElderBottomNav activeItem="chat" onHelpClick={handleHelpClick} />
      </section>
    </main>
  )
}
