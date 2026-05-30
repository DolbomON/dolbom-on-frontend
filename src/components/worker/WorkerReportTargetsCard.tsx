import { ChevronRight, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ReportTarget } from '../../features/worker/workerReportsData'
import { cn } from '../../lib/utils'

const targetStatusClasses: Record<
  ReportTarget['status'],
  {
    avatar: string
    badge: string
  }
> = {
  caution: {
    avatar: 'bg-[#fff0da] text-[#f07f00]',
    badge: 'border-[#ffbe62] bg-[#fff9ef] text-[#f07f00]',
  },
  emergency: {
    avatar: 'bg-[#ffe5e9] text-[#ef2f45]',
    badge: 'border-[#ff9aa7] bg-[#fff5f6] text-[#ef2f45]',
  },
}

type WorkerReportTargetsCardProps = {
  targets: ReportTarget[]
}

export function WorkerReportTargetsCard({
  targets,
}: WorkerReportTargetsCardProps) {
  return (
    <section className="rounded-[24px] border border-[#e5ebf4] bg-white px-4 py-5 shadow-[0_14px_28px_rgba(32,79,150,0.09)]">
      <h2 className="text-[22px] font-black leading-tight text-[#101827]">
        주요 확인 대상
      </h2>

      <div className="mt-4 overflow-hidden rounded-[16px] border border-[#edf1f6]">
        {targets.map((target) => {
          const tone = targetStatusClasses[target.status]

          return (
            <Link
              key={target.id}
              to={target.href}
              className="grid min-h-[62px] grid-cols-[34px_minmax(0,1fr)_52px_18px] items-center gap-2.5 border-b border-[#edf1f6] bg-white px-2.5 py-2 text-left transition last:border-b-0 hover:bg-[#f8fbff] active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-[-2px] focus-visible:outline-[#8bbcff]"
              aria-label={`${target.name} 상세 보기, ${target.reason}, ${target.statusLabel}`}
            >
              <span
                className={cn(
                  'grid h-9 w-9 place-items-center rounded-full',
                  tone.avatar,
                )}
                aria-hidden="true"
              >
                <User className="h-6 w-6" strokeWidth={2.7} />
              </span>

              <span className="min-w-0 min-[390px]:grid min-[390px]:grid-cols-[96px_minmax(0,1fr)] min-[390px]:items-center min-[390px]:gap-2">
                <strong className="block truncate text-[16px] font-black leading-tight text-[#111827]">
                  {target.name}
                </strong>
                <span className="mt-1 block truncate text-[15px] font-semibold leading-tight text-[#273140] min-[390px]:mt-0">
                  {target.reason}
                </span>
              </span>

              <span
                className={cn(
                  'inline-flex min-h-8 items-center justify-center rounded-lg border px-2 text-[15px] font-black leading-none',
                  tone.badge,
                )}
              >
                {target.statusLabel}
              </span>

              <ChevronRight
                aria-hidden="true"
                className="h-5 w-5 text-[#778293]"
                strokeWidth={2.8}
              />
            </Link>
          )
        })}
      </div>
    </section>
  )
}
