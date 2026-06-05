import {
  Menu,
  Mic,
  Share2,
  Smile,
  Stethoscope,
  UserRound,
  Utensils,
  type LucideIcon,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { DolbomLogo } from '../../components/layout/DolbomLogo'
import { FamilyBottomNav } from '../../components/layout/FamilyBottomNav'
import type { TranslationKey } from '../../lib/i18n/translations'
import { useI18n } from '../../lib/i18n/useI18n'
import { cn } from '../../lib/utils'

const familyAiAssetBase = '/assets/dolbomon/familly-ai'

const summaryRobotImageSrc = `${familyAiAssetBase}/ai.png`
const chatRobotImageSrc = `${familyAiAssetBase}/ai2.png`

type ChatMessage = {
  id: string
  role: 'assistant' | 'elder'
  textKey: TranslationKey
}

type QuickReply = {
  icon: LucideIcon
  labelKey: TranslationKey
}

const chatMessages: ChatMessage[] = [
  {
    id: 'meal-question',
    role: 'assistant',
    textKey: 'family.chat.message.mealQuestion',
  },
  {
    id: 'meal-answer',
    role: 'elder',
    textKey: 'family.chat.message.mealAnswer',
  },
  {
    id: 'pain-question',
    role: 'assistant',
    textKey: 'family.chat.message.painQuestion',
  },
  {
    id: 'pain-answer',
    role: 'elder',
    textKey: 'family.chat.message.painAnswer',
  },
  {
    id: 'mood-question',
    role: 'assistant',
    textKey: 'family.chat.message.moodQuestion',
  },
  {
    id: 'mood-answer',
    role: 'elder',
    textKey: 'family.chat.message.moodAnswer',
  },
]

const quickReplies: QuickReply[] = [
  {
    icon: Utensils,
    labelKey: 'family.chat.quick.meal',
  },
  {
    icon: Stethoscope,
    labelKey: 'family.chat.quick.pain',
  },
  {
    icon: Smile,
    labelKey: 'family.chat.quick.mood',
  },
]

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
  const { t } = useI18n()

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
        {t(message.textKey)}
      </p>

      {isElder ? <ElderAvatar /> : null}
    </div>
  )
}

function SummaryCard() {
  const { t } = useI18n()

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
          {t('family.chat.summaryTitle')}
        </h2>
        <p className="mt-2 break-keep text-[14px] font-semibold leading-[1.42] text-[#4d5c73] min-[390px]:text-[17px]">
          {t('family.chat.summaryDescription')}
        </p>
      </div>
    </section>
  )
}

function QuickActionButton({ reply }: { reply: QuickReply }) {
  const Icon = reply.icon
  const { t } = useI18n()

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
      {t(reply.labelKey)}
    </button>
  )
}

function ChatTranscriptCard() {
  const { t } = useI18n()

  return (
    <section
      className="mt-2 rounded-[25px] border border-[#e1e8f1] bg-white px-3 py-2 shadow-[0_14px_32px_rgba(36,75,131,0.13)] min-[390px]:mt-3 min-[390px]:rounded-[28px] min-[390px]:px-3.5 min-[390px]:py-2.5"
      aria-label={t('family.chat.transcriptAria')}
    >
      <div className="grid gap-[4px] min-[390px]:gap-[5px]">
        {chatMessages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
      </div>

      <div
        className="mt-2 grid grid-cols-3 gap-2.5 min-[390px]:gap-3"
        aria-label={t('family.chat.quickAria')}
      >
        {quickReplies.map((reply) => (
          <QuickActionButton key={reply.labelKey} reply={reply} />
        ))}
      </div>
    </section>
  )
}

function ActionButtons() {
  const { t } = useI18n()

  return (
    <div className="mt-3 grid grid-cols-2 gap-3.5 min-[390px]:mt-4 min-[390px]:gap-4">
      <button
        type="button"
        aria-label={t('family.chat.replayAria')}
        className="inline-flex min-h-[48px] items-center justify-center gap-1 rounded-[17px] bg-[linear-gradient(135deg,#2e8bff_0%,#075bea_100%)] px-1 text-[12px] font-black leading-none text-white shadow-[0_12px_24px_rgba(8,95,232,0.25),inset_0_1px_0_rgba(255,255,255,0.28)] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[54px] min-[390px]:gap-2.5 min-[390px]:px-2 min-[390px]:text-[18px] min-[430px]:text-[20px]"
      >
        <Mic className="h-[19px] w-[19px] shrink-0 min-[390px]:h-[30px] min-[390px]:w-[30px]" />
        <span className="whitespace-nowrap min-[390px]:hidden">
          {t('family.chat.replayShort')}
        </span>
        <span className="hidden whitespace-nowrap min-[390px]:inline">
          {t('family.chat.replayLong')}
        </span>
      </button>

      <button
        type="button"
        className="inline-flex min-h-[48px] items-center justify-center gap-1 rounded-[17px] border-2 border-[#0966f2] bg-white px-1 text-[12px] font-black leading-none text-[#095ee8] shadow-[0_10px_22px_rgba(32,80,148,0.08)] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[54px] min-[390px]:gap-2.5 min-[390px]:px-2 min-[390px]:text-[18px] min-[430px]:text-[20px]"
      >
        <Share2 className="h-[19px] w-[19px] shrink-0 min-[390px]:h-[28px] min-[390px]:w-[28px]" />
        <span className="whitespace-nowrap">{t('family.chat.share')}</span>
      </button>
    </div>
  )
}

export function FamilyChatPage() {
  const navigate = useNavigate()
  const { t } = useI18n()

  function handleMenuClick() {
    navigate('/family/mypage')
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#eef5ff] text-[#071747]">
      <section
        className="mx-auto flex min-h-svh w-full max-w-[480px] flex-col bg-white px-5 pb-[calc(88px+env(safe-area-inset-bottom))] pt-[max(15px,env(safe-area-inset-top))] shadow-[0_24px_80px_rgba(55,104,184,0.1)]"
        aria-label={t('family.chat.aria')}
      >
        <header className="flex min-h-11 items-start justify-between gap-4">
          <DolbomLogo ariaLabel={t('family.chat.logoAria')} to="/family" />

          <button
            className="inline-grid h-11 w-11 place-items-center rounded-md text-[#071747] transition active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
            type="button"
            aria-label={t('common.myPage.open')}
            onClick={handleMenuClick}
          >
            <Menu aria-hidden="true" size={38} strokeWidth={2.7} />
          </button>
        </header>

        <section className="pt-0" aria-labelledby="family-chat-title">
          <p className="text-[20px] font-semibold leading-none text-[#52617a] min-[390px]:text-[22px]">
            {t('common.date.may31Sat')}
          </p>
          <h1
            id="family-chat-title"
            className="mt-1 text-[38px] font-black leading-none text-[#071747] min-[390px]:text-[43px]"
          >
            {t('family.chat.title')}
          </h1>
          <p className="mt-2 break-keep text-[16px] font-semibold leading-snug text-[#52617a] min-[390px]:text-[18px]">
            {t('family.chat.description')}
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
