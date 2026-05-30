import { Link } from 'react-router-dom'
import type {
  ManagedElder,
  RiskStatus,
} from '../../features/worker/managedEldersData'
import { cn } from '../../lib/utils'

const riskToneClasses: Record<
  RiskStatus,
  {
    badge: string
    ring: string
    text: string
  }
> = {
  caution: {
    badge: 'bg-[#f5a300] text-white',
    ring: 'ring-[#fff0c2]',
    text: 'text-[#9a6400]',
  },
  danger: {
    badge: 'bg-[#ef3d48] text-white',
    ring: 'ring-[#ffe0e3]',
    text: 'text-[#b42323]',
  },
  stable: {
    badge: 'bg-[#24a95a] text-white',
    ring: 'ring-[#dff7e9]',
    text: 'text-[#17733d]',
  },
}

type ManagedElderCardProps = {
  elder: ManagedElder
}

export function ManagedElderCard({ elder }: ManagedElderCardProps) {
  const tone = riskToneClasses[elder.riskStatus]

  return (
    <article className="flex min-h-[118px] gap-3 rounded-[24px] border border-[#e5ebf4] bg-white p-3 shadow-[0_14px_28px_rgba(32,79,150,0.1)] min-[390px]:gap-4 min-[390px]:p-4">
      <img
        src={elder.avatarSrc}
        alt={`${elder.name} 프로필 이미지`}
        width="96"
        height="96"
        className={cn(
          'h-[72px] w-[72px] shrink-0 rounded-full bg-[#eaf3ff] object-cover shadow-[0_8px_16px_rgba(53,88,150,0.12)] ring-4 min-[390px]:h-[80px] min-[390px]:w-[80px]',
          tone.ring,
        )}
        draggable="false"
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate text-[23px] font-black leading-tight text-[#101827]">
              {elder.name}
            </h3>
            <p className="mt-1 text-[16px] font-semibold leading-tight text-[#4e596c]">
              {elder.age}세 · {elder.household}
            </p>
          </div>

          <Link
            to={`/worker/elders/${elder.id}`}
            className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-[14px] border border-[#0867f2] bg-white px-3 text-[15px] font-extrabold leading-none text-[#0867f2] transition hover:bg-[#f3f8ff] active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
            aria-label={`${elder.name} 상세 보기`}
          >
            상세 보기
          </Link>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px] leading-tight min-[390px]:text-[16px]">
          <span
            className={cn(
              'inline-flex min-h-7 items-center rounded-lg px-2.5 text-[15px] font-black',
              tone.badge,
            )}
          >
            {elder.riskLabel}
          </span>
          <strong className={cn('font-bold', tone.text)}>
            {elder.statusReason}
          </strong>
          <span
            className="hidden h-5 w-px bg-[#cfd6e0] min-[410px]:block"
            aria-hidden="true"
          />
          <span className="font-medium text-[#5d6675] min-[410px]:ml-auto">
            {elder.lastInputText}
          </span>
        </div>
      </div>
    </article>
  )
}
