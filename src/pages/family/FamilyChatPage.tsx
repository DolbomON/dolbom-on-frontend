import {
  Menu,
  Mic,
  Power,
  Share2,
  Smile,
  Stethoscope,
  UserRound,
  Utensils,
  type LucideIcon,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { FamilyBottomNav } from '../../components/layout/FamilyBottomNav'
import { cn } from '../../lib/utils'

const familyAiAssetBase = '/assets/dolbomon/familly-ai'

const summaryRobotImageSrc = `${familyAiAssetBase}/ai.png`
const chatRobotImageSrc = `${familyAiAssetBase}/ai2.png`

type ChatMessage = {
  id: string
  role: 'assistant' | 'elder'
  text: string
}

type QuickReply = {
  icon: LucideIcon
  label: string
}

const chatMessages: ChatMessage[] = [
  {
    id: 'meal-question',
    role: 'assistant',
    text: '안녕하세요, 김영자님.\n오늘 식사는 어떠셨어요?',
  },
  {
    id: 'meal-answer',
    role: 'elder',
    text: '조금 먹었어요.',
  },
  {
    id: 'pain-question',
    role: 'assistant',
    text: '몸이 불편한 곳은 있으세요?',
  },
  {
    id: 'pain-answer',
    role: 'elder',
    text: '무릎이 좀 아파요.',
  },
  {
    id: 'mood-question',
    role: 'assistant',
    text: '기분은 어떠세요?',
  },
  {
    id: 'mood-answer',
    role: 'elder',
    text: '그냥 보통이에요.',
  },
]

const quickReplies: QuickReply[] = [
  {
    icon: Utensils,
    label: '식사 자세히',
  },
  {
    icon: Stethoscope,
    label: '통증 확인',
  },
  {
    icon: Smile,
    label: '기분 요약',
  },
]

function Logo() {
  return (
    <Link
      to="/family"
      className="inline-flex min-h-11 items-center rounded-md text-[#0d61e8] drop-shadow-[0_4px_7px_rgba(18,95,232,0.14)] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
      aria-label="돌봄ON 가족 홈"
    >
      <span className="text-[29px] font-black leading-none min-[390px]:text-[31px]">
        돌봄
      </span>
      <Power
        aria-hidden="true"
        className="-mx-[1px] h-[30px] w-[30px] min-[390px]:h-[32px] min-[390px]:w-[32px]"
        strokeWidth={4.3}
      />
      <span className="text-[33px] font-black leading-none min-[390px]:text-[36px]">
        N
      </span>
    </Link>
  )
}

function AssistantAvatar() {
  return (
    <span
      className="grid h-[38px] w-[38px] shrink-0 overflow-hidden rounded-[14px] bg-[#eef6ff] shadow-[0_8px_18px_rgba(41,91,164,0.13)] min-[390px]:h-[43px] min-[390px]:w-[43px] min-[390px]:rounded-[16px]"
      aria-hidden="true"
    >
      <img
        src={chatRobotImageSrc}
        alt=""
        width="256"
        height="256"
        className="h-full w-full scale-[1.42] object-cover object-[50%_49%]"
        draggable="false"
      />
    </span>
  )
}

function ElderAvatar() {
  return (
    <span
      className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-full bg-[#eef6ff] text-[#1467f3] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] min-[390px]:h-[43px] min-[390px]:w-[43px]"
      aria-hidden="true"
    >
      <UserRound
        className="h-[27px] w-[27px] min-[390px]:h-[31px] min-[390px]:w-[31px]"
        fill="currentColor"
        strokeWidth={1.6}
      />
    </span>
  )
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const isElder = message.role === 'elder'

  return (
    <div
      className={cn(
        'flex items-start gap-2 min-[390px]:gap-2.5',
        isElder && 'justify-end',
      )}
    >
      {isElder ? null : <AssistantAvatar />}

      <p
        className={cn(
          'max-w-[76%] whitespace-pre-line break-keep px-[14px] py-[6px] text-[15px] font-semibold leading-[1.32] text-[#071747] shadow-[0_8px_18px_rgba(40,86,150,0.08)] min-[390px]:px-[16px] min-[390px]:text-[16px]',
          isElder
            ? 'rounded-[17px] rounded-br-[5px] bg-[linear-gradient(135deg,#dcebff_0%,#cfe4ff_100%)]'
            : 'rounded-[17px] rounded-tl-[5px] bg-[#f0f6fe]',
        )}
      >
        {message.text}
      </p>

      {isElder ? <ElderAvatar /> : null}
    </div>
  )
}

function SummaryCard() {
  return (
    <section
      className="relative mt-2 min-h-[112px] overflow-hidden rounded-[26px] border border-[#c7dbfb] bg-[linear-gradient(135deg,#fafdff_0%,#eef7ff_58%,#f8fbff_100%)] px-5 py-4 shadow-[0_16px_32px_rgba(54,101,173,0.16)] min-[390px]:mt-3 min-[390px]:min-h-[124px] min-[390px]:rounded-[28px]"
      aria-labelledby="family-chat-summary-title"
    >
      <img
        src={summaryRobotImageSrc}
        alt=""
        width="640"
        height="420"
        className="pointer-events-none absolute bottom-[-6px] left-0 h-[122px] w-[165px] max-w-none select-none object-cover object-[19%_52%] [mask-image:linear-gradient(90deg,#000_0%,#000_76%,transparent_100%)] min-[390px]:bottom-[-4px] min-[390px]:h-[130px] min-[390px]:w-[230px]"
        aria-hidden="true"
        draggable="false"
      />

      <div className="relative z-10 ml-[42%] min-h-[72px] min-w-0 min-[390px]:ml-[46%]">
        <h2
          id="family-chat-summary-title"
          className="whitespace-nowrap text-[19px] font-black leading-tight text-[#071747] min-[390px]:text-[26px]"
        >
          오늘의 안부 요약
        </h2>
        <p className="mt-2 break-keep text-[14px] font-semibold leading-[1.42] text-[#4d5c73] min-[390px]:text-[17px]">
          기분, 식사, 통증 이야기가 정리되었어요
        </p>
      </div>
    </section>
  )
}

function QuickActionButton({ reply }: { reply: QuickReply }) {
  const Icon = reply.icon

  return (
    <button
      type="button"
      className="inline-flex min-h-[34px] min-w-0 items-center justify-center gap-1 whitespace-nowrap rounded-[17px] border border-[#e0e7f1] bg-white px-1.5 text-[12px] font-black leading-none text-[#095ee8] shadow-[0_9px_18px_rgba(42,77,126,0.1)] transition active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[38px] min-[390px]:gap-1.5 min-[390px]:text-[15px] min-[430px]:text-[16px]"
    >
      <Icon
        className="h-[18px] w-[18px] shrink-0 text-[#4b94ff] min-[390px]:h-[21px] min-[390px]:w-[21px]"
        aria-hidden="true"
        strokeWidth={3}
      />
      {reply.label}
    </button>
  )
}

function ChatTranscriptCard() {
  return (
    <section
      className="mt-2 rounded-[25px] border border-[#e1e8f1] bg-white px-3 py-2 shadow-[0_14px_32px_rgba(36,75,131,0.13)] min-[390px]:mt-3 min-[390px]:rounded-[28px] min-[390px]:px-3.5 min-[390px]:py-2.5"
      aria-label="AI 안부 대화 내용"
    >
      <div className="grid gap-[4px] min-[390px]:gap-[5px]">
        {chatMessages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
      </div>

      <div
        className="mt-2 grid grid-cols-3 gap-2.5 min-[390px]:gap-3"
        aria-label="대화 빠른 확인"
      >
        {quickReplies.map((reply) => (
          <QuickActionButton key={reply.label} reply={reply} />
        ))}
      </div>
    </section>
  )
}

function ActionButtons() {
  return (
    <div className="mt-3 grid grid-cols-2 gap-3.5 min-[390px]:mt-4 min-[390px]:gap-4">
      <button
        type="button"
        aria-label="음성 대화 다시 듣기"
        className="inline-flex min-h-[48px] items-center justify-center gap-1 rounded-[17px] bg-[linear-gradient(135deg,#2e8bff_0%,#075bea_100%)] px-1 text-[12px] font-black leading-none text-white shadow-[0_12px_24px_rgba(8,95,232,0.25),inset_0_1px_0_rgba(255,255,255,0.28)] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[54px] min-[390px]:gap-2.5 min-[390px]:px-2 min-[390px]:text-[18px] min-[430px]:text-[20px]"
      >
        <Mic className="h-[19px] w-[19px] shrink-0 min-[390px]:h-[30px] min-[390px]:w-[30px]" />
        <span className="whitespace-nowrap min-[390px]:hidden">
          음성 다시 듣기
        </span>
        <span className="hidden whitespace-nowrap min-[390px]:inline">
          음성 대화 다시 듣기
        </span>
      </button>

      <button
        type="button"
        className="inline-flex min-h-[48px] items-center justify-center gap-1 rounded-[17px] border-2 border-[#0966f2] bg-white px-1 text-[12px] font-black leading-none text-[#095ee8] shadow-[0_10px_22px_rgba(32,80,148,0.08)] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[54px] min-[390px]:gap-2.5 min-[390px]:px-2 min-[390px]:text-[18px] min-[430px]:text-[20px]"
      >
        <Share2 className="h-[19px] w-[19px] shrink-0 min-[390px]:h-[28px] min-[390px]:w-[28px]" />
        <span className="whitespace-nowrap">대화 요약 공유</span>
      </button>
    </div>
  )
}

export function FamilyChatPage() {
  const navigate = useNavigate()

  function handleMenuClick() {
    navigate('/family/mypage')
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#eef5ff] text-[#071747]">
      <section
        className="mx-auto flex min-h-svh w-full max-w-[480px] flex-col bg-white px-5 pb-[calc(88px+env(safe-area-inset-bottom))] pt-[max(15px,env(safe-area-inset-top))] shadow-[0_24px_80px_rgba(55,104,184,0.1)]"
        aria-label="가족 AI 안부 대화 화면"
      >
        <header className="flex min-h-11 items-start justify-between gap-4">
          <Logo />

          <button
            className="inline-grid h-11 w-11 place-items-center rounded-md text-[#071747] transition active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
            type="button"
            aria-label="마이페이지 열기"
            onClick={handleMenuClick}
          >
            <Menu aria-hidden="true" size={38} strokeWidth={2.7} />
          </button>
        </header>

        <section className="pt-0" aria-labelledby="family-chat-title">
          <p className="text-[20px] font-semibold leading-none text-[#52617a] min-[390px]:text-[22px]">
            5월 31일 토요일
          </p>
          <h1
            id="family-chat-title"
            className="mt-1 text-[38px] font-black leading-none text-[#071747] min-[390px]:text-[43px]"
          >
            AI 안부 대화
          </h1>
          <p className="mt-2 break-keep text-[16px] font-semibold leading-snug text-[#52617a] min-[390px]:text-[18px]">
            어르신과 나눈 오늘의 대화를 가족이 쉽게 확인할 수 있어요.
          </p>
        </section>

        <SummaryCard />
        <ChatTranscriptCard />
        <ActionButtons />
        <FamilyBottomNav activeItem="chat" />
      </section>
    </main>
  )
}
