import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'
import type { WorkerAlertItem } from '../../features/worker/workerAlertsData'

const alertStatusClasses: Record<
  WorkerAlertItem['status'],
  {
    badge: string
    icon: string
  }
> = {
  caution: {
    badge: 'border-[#ffbd62] bg-[#fff8ed] text-[#f07f00]',
    icon: 'bg-[#fff0d8]',
  },
  complete: {
    badge: 'border-[#7bd6a8] bg-[#f0fff7] text-[#14995b]',
    icon: 'bg-[#def6eb]',
  },
  urgent: {
    badge: 'border-[#ff8d9b] bg-[#fff5f6] text-[#ef2f45]',
    icon: 'bg-[#ffe2e7]',
  },
}

type WorkerAlertCardProps = {
  alert: WorkerAlertItem
}

export function WorkerAlertCard({ alert }: WorkerAlertCardProps) {
  // TODO: Replace this placeholder-ready route with the full alert detail
  // experience when response memo and escalation history screens are added.
  const alertHref = `/worker/alerts/${alert.id}`
  const tone = alertStatusClasses[alert.status]

  return (
    <Link
      to={alertHref}
      className="grid min-h-[112px] grid-cols-[66px_minmax(0,1fr)] gap-x-3 gap-y-2 rounded-[24px] border border-[#e5ebf4] bg-white p-3.5 text-[#071747] shadow-[0_14px_28px_rgba(32,79,150,0.1)] transition hover:bg-[#fbfdff] active:scale-[0.995] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff] min-[380px]:grid-cols-[72px_minmax(0,1fr)_64px] min-[380px]:items-center min-[380px]:gap-x-3"
      aria-label={`${alert.title} 상세 보기, ${alert.statusLabel}, ${alert.time}`}
    >
      <span
        className={cn(
          'row-span-2 grid h-[62px] w-[62px] place-items-center overflow-hidden rounded-full min-[380px]:row-span-1 min-[380px]:h-[66px] min-[380px]:w-[66px]',
          tone.icon,
        )}
        aria-hidden="true"
      >
        <img
          src={alert.iconSrc}
          alt=""
          className="h-full w-full rounded-full object-cover"
        />
      </span>

      <span className="min-w-0 self-center">
        <strong className="block text-[20px] font-black leading-snug text-[#101827] min-[380px]:text-[21px]">
          {alert.title}
        </strong>
        <span className="mt-2 block text-[15px] font-medium leading-snug text-[#566174]">
          {alert.description}
        </span>
      </span>

      <span className="col-start-2 flex items-center justify-between gap-2 self-start min-[380px]:col-auto min-[380px]:flex-col min-[380px]:items-end min-[380px]:justify-center min-[380px]:gap-4 min-[380px]:self-center">
        <time
          className="text-[15px] font-semibold leading-none text-[#4f596b] min-[380px]:text-[16px]"
          dateTime={alert.time}
        >
          {alert.time}
        </time>
        <span
          className={cn(
            'inline-flex min-h-8 min-w-[48px] items-center justify-center rounded-[10px] border px-2.5 text-[16px] font-black leading-none',
            tone.badge,
          )}
        >
          {alert.statusLabel}
        </span>
      </span>
    </Link>
  )
}
