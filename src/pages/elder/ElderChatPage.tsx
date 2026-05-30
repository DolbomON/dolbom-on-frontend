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
      className="grid h-[36px] w-[36px] shrink-0 overflow-hidden rounded-full bg-[#eef7ff] shadow-[0_7px_16px_rgba(45,104,184,0.11)] min-[390px]:h-[42px] min-[390px]:w-[42px]"
      aria-hidden="true"
    >
      <img
        src={aiRobotImageSrc}
        alt=""
        className="h-full w-full scale-[1.32] object-cover object-[34%_52%]"
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
        'flex items-start gap-[6px] min-[390px]:gap-[5px]',
        isUser && 'justify-end',
      )}
    >
      {!isUser ? <ChatAvatar /> : null}
      <p
        className={cn(
          'max-w-[78%] whitespace-pre-line rounded-[20px] px-[14px] py-[10px] text-[17px] font-extrabold leading-[1.36] tracking-[-0.035em] min-[390px]:rounded-[22px] min-[390px]:px-[16px] min-[390px]:py-[11px] min-[390px]:text-[19px]',
          isUser
            ? 'rounded-br-[5px] bg-[#0867f2] text-white shadow-[0_10px_20px_rgba(8,103,242,0.2)]'
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
    <main className="h-svh overflow-hidden bg-white text-[#061844]">
      <section
        className="mx-auto flex h-svh w-full max-w-[480px] flex-col overflow-hidden bg-white"
        aria-label="AI 안부 대화 화면"
      >
        <div className="flex-1 px-4 pb-[calc(78px+env(safe-area-inset-bottom))] pt-[8px] min-[390px]:px-6 min-[390px]:pb-[calc(92px+env(safe-area-inset-bottom))] min-[390px]:pt-[10px]">
          <div className="-mx-[12px]">
            <ElderCheckHeader onNotificationClick={handleNotificationClick} />
          </div>

          <section
            className="mt-[12px] min-[390px]:mt-[18px]"
            aria-labelledby="chat-title"
          >
            <h1
              id="chat-title"
              className="text-[34px] font-black leading-[1.08] tracking-[-0.07em] text-[#061844] min-[390px]:text-[44px]"
            >
              AI 안부 대화
            </h1>
          </section>

          <section
            className="mt-[14px] flex items-center gap-[12px] rounded-[22px] border border-[#cfe3ff] bg-[#eef7ff] px-[12px] py-[10px] shadow-[0_10px_22px_rgba(36,92,174,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] min-[390px]:mt-[18px] min-[390px]:gap-[18px] min-[390px]:rounded-[24px] min-[390px]:px-[16px] min-[390px]:py-[12px]"
            aria-labelledby="chat-info-title"
          >
            <div className="grid h-[64px] w-[86px] shrink-0 overflow-hidden rounded-[16px] min-[390px]:h-[80px] min-[390px]:w-[108px] min-[390px]:rounded-[18px]">
              <img
                src={aiRobotImageSrc}
                alt=""
                width="112"
                height="112"
                className="h-full w-full scale-[1.22] object-cover object-[32%_55%] drop-shadow-[0_12px_20px_rgba(51,106,187,0.14)] min-[390px]:scale-[1.2]"
                draggable="false"
              />
            </div>

            <div className="min-w-0">
              <h2
                id="chat-info-title"
                className="text-[17px] font-black leading-[1.2] tracking-[-0.045em] text-[#061844] min-[390px]:text-[20px]"
              >
                오늘의 안부를 대화로 남겨보세요
              </h2>
              <p className="mt-[6px] text-[13px] font-semibold leading-[1.28] tracking-[-0.035em] text-[#566174] min-[390px]:mt-[8px] min-[390px]:text-[14px] min-[390px]:leading-[1.32]">
                음성 또는 텍스트로 편하게 이야기할 수 있어요.
              </p>
            </div>
          </section>

          <section
            className="mt-[12px] rounded-[22px] border border-[#cfe3ff] bg-white px-[6px] py-[12px] shadow-[0_12px_30px_rgba(36,92,174,0.12)] min-[390px]:mt-[14px] min-[390px]:rounded-[24px] min-[390px]:py-[16px]"
            aria-label="AI 안부 대화 내용"
          >
            <div className="grid gap-[10px] min-[390px]:gap-[12px]">
              {defaultMessages.map((message) => (
                <ChatBubble key={message.id} message={message} />
              ))}
            </div>
          </section>

          <section
            className="mt-[10px] flex flex-wrap gap-[8px] min-[390px]:mt-[12px] min-[390px]:gap-[10px] min-[430px]:grid min-[430px]:grid-cols-3 min-[430px]:gap-[12px]"
            aria-label="빠른 답변"
          >
            {quickReplies.map((reply) => (
              <button
                key={reply}
                className="min-h-[38px] min-w-[106px] flex-1 whitespace-nowrap rounded-[15px] border border-[#75a7ff] bg-white px-3 text-[15px] font-black tracking-[-0.045em] text-[#0867f2] shadow-[inset_0_0_0_1px_rgba(8,103,242,0.03)] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[42px] min-[390px]:min-w-[112px] min-[390px]:text-[16px] min-[430px]:min-w-0 min-[430px]:text-[17px]"
                type="button"
                onClick={() => handleQuickReply(reply)}
              >
                {reply}
              </button>
            ))}
          </section>

          <button
            className="mt-3 flex min-h-[50px] w-full items-center justify-center gap-2.5 rounded-[18px] bg-gradient-to-br from-[#0878ff] to-[#005de8] px-5 text-[20px] font-black tracking-[-0.05em] text-white shadow-[0_14px_28px_rgba(2,92,221,0.22),inset_0_1px_0_rgba(255,255,255,0.24)] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:mt-4 min-[390px]:min-h-[58px] min-[390px]:gap-3 min-[390px]:rounded-[20px] min-[390px]:text-[24px]"
            type="button"
            onClick={handleVoiceContinue}
          >
            <Mic size={28} strokeWidth={3.1} aria-hidden="true" />
            <span>음성으로 계속하기</span>
          </button>
        </div>

        <ElderBottomNav activeItem="chat" onHelpClick={handleHelpClick} />
      </section>
    </main>
  )
}
