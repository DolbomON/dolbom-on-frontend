import { Menu } from 'lucide-react'
import { Link } from 'react-router-dom'

type HomeHeaderProps = {
  onMenuClick: () => void
}

export function HomeHeader({ onMenuClick }: HomeHeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <Link
        to="/"
        className="inline-flex min-h-11 items-baseline rounded-md text-[#0b63df] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-12"
        aria-label="돌봄온 홈"
      >
        <span className="text-[29px] font-black leading-none min-[390px]:text-[34px]">
          돌봄
        </span>
        <span className="ml-1 text-[39px] font-black leading-none min-[390px]:text-[46px]">
          ON
        </span>
      </Link>

      <button
        className="inline-grid h-12 w-12 place-items-center rounded-md text-[#0a56d5] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
        type="button"
        aria-label="메뉴 열기"
        onClick={onMenuClick}
      >
        <Menu aria-hidden="true" size={40} strokeWidth={3.2} />
      </button>
    </header>
  )
}
