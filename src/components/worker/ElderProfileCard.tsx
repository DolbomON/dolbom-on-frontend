import { Phone, UserRound } from 'lucide-react'
import type {
  ElderDetail,
  ElderRiskStatus,
} from '../../features/worker/workerElderDetailData'
import { cn } from '../../lib/utils'

const riskToneClasses: Record<
  ElderRiskStatus,
  {
    badge: string
    imageRing: string
  }
> = {
  caution: {
    badge: 'border-[#ffbd62] bg-[#fff9ef] text-[#d87800]',
    imageRing: 'ring-[#fff0c2]',
  },
  danger: {
    badge: 'border-[#ffb8b8] bg-[#fff0f0] text-[#d81f2a]',
    imageRing: 'ring-[#ffe0e3]',
  },
  emergency: {
    badge: 'border-[#f87171] bg-[#fff0f0] text-[#b91c1c]',
    imageRing: 'ring-[#ffd4d8]',
  },
  stable: {
    badge: 'border-[#a9e7c0] bg-[#effbf4] text-[#17733d]',
    imageRing: 'ring-[#dff7e9]',
  },
}

type ElderProfileCardProps = {
  elder: ElderDetail
  onGuardianContact?: () => void
}

export function ElderProfileCard({
  elder,
  onGuardianContact,
}: ElderProfileCardProps) {
  const tone = riskToneClasses[elder.riskStatus]

  return (
    <article className="grid gap-4 rounded-[24px] border border-[#e3e9f2] bg-white p-4 shadow-[0_14px_30px_rgba(32,79,150,0.11)] min-[390px]:grid-cols-[92px_minmax(0,1fr)] min-[410px]:grid-cols-[96px_minmax(0,1fr)_122px]">
      <img
        src={elder.avatarSrc}
        alt={`${elder.name} 프로필 이미지`}
        width="112"
        height="112"
        className={cn(
          'h-[88px] w-[88px] justify-self-center rounded-full bg-[#eaf3ff] object-cover shadow-[0_8px_18px_rgba(53,88,150,0.12)] ring-4 min-[390px]:h-[92px] min-[390px]:w-[92px] min-[390px]:justify-self-start',
          tone.imageRing,
        )}
        draggable="false"
      />

      <div className="min-w-0 text-center min-[390px]:text-left">
        <h2 className="text-[30px] font-black leading-tight text-[#101827]">
          {elder.name}
        </h2>
        <p className="mt-1.5 text-[18px] font-semibold leading-tight text-[#283344]">
          {elder.age}세 · {elder.household}
        </p>

        <div className="mt-3 flex flex-col items-center gap-2 min-[390px]:items-start">
          <span
            className={cn(
              'inline-flex min-h-8 items-center rounded-lg border px-3 text-[17px] font-black leading-none',
              tone.badge,
            )}
          >
            {elder.riskLabel}
          </span>
          <p className="text-[15px] font-semibold leading-snug text-[#5d6675]">
            {elder.statusText}
          </p>
        </div>
      </div>

      <div className="grid gap-2 min-[390px]:col-span-2 min-[390px]:grid-cols-2 min-[410px]:col-span-1 min-[410px]:grid-cols-1 min-[410px]:self-center">
        <a
          href={`tel:${elder.phoneNumber}`}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[16px] border border-[#0867f2] bg-white px-3 text-[16px] font-black text-[#0867f2] transition hover:bg-[#f3f8ff] active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
          aria-label={`${elder.name}에게 전화 걸기`}
        >
          <Phone aria-hidden="true" className="h-5 w-5" strokeWidth={3} />
          전화
        </a>

        {/* TODO: Open the real guardian contact workflow when the contact API is ready. */}
        <button
          type="button"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[16px] border border-[#0867f2] bg-[#0867f2] px-3 text-[16px] font-black text-white shadow-[0_10px_18px_rgba(8,103,242,0.22)] transition hover:bg-[#075fe0] active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
          aria-label={`${elder.name} 보호자 ${elder.guardianName} 연락`}
          onClick={onGuardianContact}
        >
          <UserRound aria-hidden="true" className="h-5 w-5" strokeWidth={3} />
          보호자 연락
        </button>
      </div>
    </article>
  )
}
