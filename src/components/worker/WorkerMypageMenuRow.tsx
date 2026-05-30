import {
  Bell,
  ChartNoAxesColumn,
  ChevronRight,
  CircleQuestionMark,
  FilePenLine,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'
import type { WorkerMypageMenuItem } from '../../features/worker/workerMypageData'

const menuIcons: Record<WorkerMypageMenuItem['id'], LucideIcon> = {
  account: ShieldCheck,
  help: CircleQuestionMark,
  memos: FilePenLine,
  notifications: Bell,
  reports: ChartNoAxesColumn,
}

const menuToneClasses: Record<
  WorkerMypageMenuItem['tone'],
  {
    icon: string
    chevron: string
  }
> = {
  blue: {
    icon: 'bg-[#e8f1ff] text-[#0867f2]',
    chevron: 'text-[#506076]',
  },
  green: {
    icon: 'bg-[#def5eb] text-[#18a767]',
    chevron: 'text-[#506076]',
  },
  orange: {
    icon: 'bg-[#fff0da] text-[#f07f00]',
    chevron: 'text-[#506076]',
  },
  purple: {
    icon: 'bg-[#f0e7ff] text-[#7c3aed]',
    chevron: 'text-[#506076]',
  },
}

const rowClassName =
  'grid min-h-[96px] w-full grid-cols-[58px_minmax(0,1fr)_24px] items-center gap-3 bg-white px-4 py-4 text-left transition hover:bg-[#f8fbff] active:scale-[0.995] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-[-3px] focus-visible:outline-[#8bbcff] min-[410px]:grid-cols-[64px_minmax(0,1fr)_26px] min-[410px]:gap-4 min-[410px]:px-5'

type WorkerMypageMenuRowProps = {
  item: WorkerMypageMenuItem
  isAvailable: boolean
  onUnavailableClick: (item: WorkerMypageMenuItem) => void
}

function WorkerMypageMenuRowContent({ item }: { item: WorkerMypageMenuItem }) {
  const Icon = menuIcons[item.id]
  const tone = menuToneClasses[item.tone]

  return (
    <>
      <span
        className={cn(
          'grid h-[58px] w-[58px] place-items-center rounded-[20px] min-[410px]:h-16 min-[410px]:w-16',
          tone.icon,
        )}
        aria-hidden="true"
      >
        <Icon className="h-8 w-8" strokeWidth={2.7} />
      </span>

      <span className="min-w-0">
        <span className="block text-[20px] font-black leading-tight text-[#101827] min-[410px]:text-[21px]">
          {item.title}
        </span>
        <span className="mt-2 block text-[15px] font-medium leading-snug text-[#56657a] min-[410px]:text-[16px]">
          {item.description}
        </span>
      </span>

      <ChevronRight
        aria-hidden="true"
        className={cn('h-7 w-7 justify-self-end', tone.chevron)}
        strokeWidth={3}
      />
    </>
  )
}

export function WorkerMypageMenuRow({
  item,
  isAvailable,
  onUnavailableClick,
}: WorkerMypageMenuRowProps) {
  if (isAvailable) {
    return (
      <Link to={item.href} className={rowClassName}>
        <WorkerMypageMenuRowContent item={item} />
      </Link>
    )
  }

  return (
    <button
      type="button"
      className={rowClassName}
      onClick={() => onUnavailableClick(item)}
    >
      <WorkerMypageMenuRowContent item={item} />
    </button>
  )
}
