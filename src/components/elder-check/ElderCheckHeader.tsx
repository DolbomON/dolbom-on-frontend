import { Bell } from 'lucide-react'
import { Link } from 'react-router-dom'

type ElderCheckHeaderProps = {
  onNotificationClick: () => void
}

export function ElderCheckHeader({
  onNotificationClick,
}: ElderCheckHeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <Link
        to="/elder"
        className="inline-flex items-baseline leading-none tracking-[-0.08em] text-[#6ea5f7] focus-visible:rounded-md focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
        aria-label="돌봄온 홈"
      >
        <span className="text-[25px] font-black min-[390px]:text-[27px]">
          돌봄
        </span>
        <strong className="ml-0.5 text-[36px] font-black tracking-[-0.06em] min-[390px]:text-[39px]">
          ON
        </strong>
      </Link>

      <button
        className="inline-grid h-11 w-11 place-items-center rounded-full text-[#6ea5f7] drop-shadow-[0_7px_8px_rgba(5,101,242,0.14)] transition active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:h-12 min-[390px]:w-12"
        type="button"
        aria-label="알림 보기"
        onClick={onNotificationClick}
      >
        <Bell size={36} strokeWidth={3} aria-hidden="true" />
      </button>
    </header>
  )
}
