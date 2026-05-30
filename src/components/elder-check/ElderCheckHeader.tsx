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
        className="inline-flex min-h-11 items-center rounded-md leading-none text-[#0867f2] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
        aria-label="돌봄온 홈"
      >
        <span className="text-[22px] font-black tracking-[-0.075em] min-[390px]:text-[23px]">
          돌봄
        </span>
        <strong className="ml-0.5 text-[30px] font-black tracking-[-0.055em] min-[390px]:text-[32px]">
          ON
        </strong>
      </Link>

      <button
        className="inline-grid h-11 w-11 place-items-center rounded-full text-[#0867f2] drop-shadow-[0_7px_8px_rgba(5,101,242,0.14)] transition active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
        type="button"
        aria-label="알림 보기"
        onClick={onNotificationClick}
      >
        <Bell size={30} strokeWidth={2.9} aria-hidden="true" />
      </button>
    </header>
  )
}
