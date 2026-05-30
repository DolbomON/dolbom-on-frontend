import { Brain, Pill, Soup, type LucideIcon } from 'lucide-react'
import type { ElderActivityItem } from '../../features/worker/workerElderDetailData'
import { cn } from '../../lib/utils'

const activityIcons: Record<ElderActivityItem['tone'], LucideIcon> = {
  blue: Pill,
  green: Brain,
  orange: Soup,
}

const activityToneClasses: Record<ElderActivityItem['tone'], string> = {
  blue: 'bg-[#e6f0ff] text-[#0867f2]',
  green: 'bg-[#def5eb] text-[#18a767]',
  orange: 'bg-[#fff0da] text-[#f07f00]',
}

type ElderRecentActivityCardProps = {
  activities: ElderActivityItem[]
}

export function ElderRecentActivityCard({
  activities,
}: ElderRecentActivityCardProps) {
  return (
    <section className="rounded-[24px] border border-[#e5ebf4] bg-white px-4 py-5 shadow-[0_14px_28px_rgba(32,79,150,0.09)]">
      <h2 className="text-[22px] font-black leading-tight text-[#101827]">
        최근 활동
      </h2>

      <div className="relative mt-4 grid gap-4">
        <span
          className="absolute bottom-5 left-[19px] top-5 w-0.5 bg-[#d8dde6]"
          aria-hidden="true"
        />
        {activities.map((activity) => {
          const Icon = activityIcons[activity.tone]

          return (
            <div
              key={activity.id}
              className="relative grid grid-cols-[40px_58px_minmax(0,1fr)] items-center gap-3"
            >
              <span
                className={cn(
                  'z-10 grid h-10 w-10 place-items-center rounded-full',
                  activityToneClasses[activity.tone],
                )}
                aria-hidden="true"
              >
                <Icon className="h-5 w-5" strokeWidth={2.8} />
              </span>
              <time className="text-[16px] font-semibold leading-tight text-[#4f5b70]">
                {activity.time}
              </time>
              <span className="min-w-0">
                <strong className="block text-[16px] font-black leading-tight text-[#101827]">
                  {activity.title}
                </strong>
                <span className="mt-1 block truncate text-[15px] font-medium leading-tight text-[#596273]">
                  {activity.description}
                </span>
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
