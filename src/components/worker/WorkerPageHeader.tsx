import { Menu } from 'lucide-react'
import { Link } from 'react-router-dom'

type WorkerPageHeaderProps = {
  onMenuClick?: () => void
}

export function WorkerPageHeader({ onMenuClick }: WorkerPageHeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-[#e2eaf5] bg-white/95 backdrop-blur">
      <div className="flex h-[72px] items-center justify-between px-5">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center text-[30px] font-black leading-none text-[#0867f2] drop-shadow-[0_4px_8px_rgba(8,103,242,0.14)] focus-visible:rounded-lg"
          aria-label="돌봄ON 홈"
        >
          돌봄<span className="font-black">ON</span>
        </Link>

        <button
          type="button"
          className="inline-grid min-h-11 min-w-11 place-items-center rounded-full text-[#0867f2] transition hover:bg-[#eef6ff] active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
          aria-label="메뉴 열기"
          onClick={onMenuClick}
        >
          <Menu aria-hidden="true" size={34} strokeWidth={3} />
        </button>
      </div>
    </header>
  )
}
