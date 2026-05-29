import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

type RoleSelectHeaderProps = {
  onBack: () => void
}

export function RoleSelectHeader({ onBack }: RoleSelectHeaderProps) {
  return (
    <header className="relative z-20 flex items-center justify-between">
      <Link
        to="/"
        className="inline-flex min-h-11 items-baseline rounded-md text-[#0b63df] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
        aria-label="돌봄온 홈"
      >
        <span className="text-[26px] font-black leading-none tracking-[-0.08em]">
          돌봄
        </span>
        <span className="ml-0.5 text-[37px] font-black leading-none tracking-[-0.06em]">
          ON
        </span>
      </Link>

      <button
        className="inline-grid h-11 w-11 place-items-center rounded-md text-[#0a56d5] transition active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
        type="button"
        aria-label="이전 화면으로 이동"
        onClick={onBack}
      >
        <ArrowLeft aria-hidden="true" size={40} strokeWidth={2.8} />
      </button>
    </header>
  )
}
