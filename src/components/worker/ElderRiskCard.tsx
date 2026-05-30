import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'
import type { ElderRiskItem } from '../../features/dashboard/workerDashboardData'

const riskToneClasses: Record<
  ElderRiskItem['riskLevel'],
  {
    dot: string
    label: string
    placeholder: string
  }
> = {
  caution: {
    dot: 'bg-[#f5a300]',
    label: 'text-[#d48700]',
    placeholder: 'bg-[#fff5db] text-[#9a6400]',
  },
  danger: {
    dot: 'bg-[#ef2424]',
    label: 'text-[#e11d1d]',
    placeholder: 'bg-[#ffe8e8] text-[#b42323]',
  },
}

type ElderRiskCardProps = {
  elder: ElderRiskItem
}

function getPlaceholderInitial(name: string) {
  return name.replace('님', '').slice(0, 1)
}

function ElderAvatar({ elder }: ElderRiskCardProps) {
  if (elder.avatarSrc) {
    return (
      <img
        src={elder.avatarSrc}
        alt={`${elder.name} 프로필 이미지`}
        width="96"
        height="96"
        className="h-16 w-16 rounded-full bg-[#eaf3ff] object-cover shadow-[0_8px_16px_rgba(53,88,150,0.12)] min-[390px]:h-[74px] min-[390px]:w-[74px]"
        draggable="false"
      />
    )
  }

  return (
    <span
      className={cn(
        'grid h-16 w-16 shrink-0 place-items-center rounded-full text-[26px] font-black shadow-[0_8px_16px_rgba(53,88,150,0.1)] min-[390px]:h-[74px] min-[390px]:w-[74px]',
        riskToneClasses[elder.riskLevel].placeholder,
      )}
      role="img"
      aria-label={`${elder.name} 프로필 이미지`}
    >
      <span aria-hidden="true">{getPlaceholderInitial(elder.name)}</span>
    </span>
  )
}

export function ElderRiskCard({ elder }: ElderRiskCardProps) {
  const tone = riskToneClasses[elder.riskLevel]

  return (
    <article className="grid min-h-[108px] grid-cols-[64px_minmax(0,1fr)_auto] items-center gap-2.5 rounded-[24px] border border-[#e3e9f2] bg-white p-3 shadow-[0_14px_28px_rgba(32,79,150,0.1)] min-[390px]:grid-cols-[76px_minmax(0,1fr)_auto] min-[390px]:gap-3 min-[390px]:p-4">
      <ElderAvatar elder={elder} />

      <div className="min-w-0">
        <h3 className="text-[22px] font-black leading-tight text-[#071747]">
          {elder.name}
        </h3>
        <p className="mt-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[15px] font-semibold leading-tight text-[#596273]">
          <span
            className={cn('h-2.5 w-2.5 rounded-full', tone.dot)}
            aria-hidden="true"
          />
          <strong className={cn('font-black', tone.label)}>
            {elder.riskLabel}
          </strong>
          <span aria-hidden="true" className="text-[#9aa3b1]">
            ·
          </span>
          <span>{elder.riskReason}</span>
        </p>
        <p className="mt-1.5 text-[14px] font-semibold leading-tight text-[#667085]">
          {elder.lastInputText}
        </p>
      </div>

      <Link
        to={elder.detailHref}
        className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-[14px] border border-[#0867f2] bg-white px-3 text-[15px] font-extrabold leading-none text-[#0867f2] transition hover:bg-[#f3f8ff] active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        aria-label={`${elder.name} 상세 보기`}
      >
        상세 보기
      </Link>
    </article>
  )
}
