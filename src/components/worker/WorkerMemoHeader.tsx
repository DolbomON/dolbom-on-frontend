import { ArrowLeft, Menu, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useI18n } from '../../lib/i18n/useI18n'
import { DolbomLogo } from '../layout/DolbomLogo'

type WorkerMemoHeaderProps = {
  onBack: () => void
  onMenuClick?: () => void
}

export function WorkerMemoHeader({
  onBack,
  onMenuClick,
}: WorkerMemoHeaderProps) {
  const { t } = useI18n()

  return (
    <header className="sticky top-0 z-20 border-b border-[#e2eaf5] bg-white/95 backdrop-blur">
      <div className="flex h-[72px] items-center justify-between px-5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-grid min-h-11 min-w-11 place-items-center rounded-full text-[#42516a] transition hover:bg-[#eef6ff] active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
            aria-label={t('common.back')}
            onClick={onBack}
          >
            <ArrowLeft aria-hidden="true" className="h-8 w-8" strokeWidth={3} />
          </button>

          <DolbomLogo />
        </div>

        {onMenuClick ? (
          <button
            type="button"
            className="inline-grid min-h-11 min-w-11 place-items-center rounded-full text-[#1f2d44] transition hover:bg-[#eef6ff] active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
            aria-label={t('common.menu.open')}
            onClick={onMenuClick}
          >
            <Menu aria-hidden="true" size={34} strokeWidth={3} />
          </button>
        ) : (
          <Link
            to="/caregiver/mypage"
            className="inline-grid min-h-11 min-w-11 place-items-center rounded-full text-[#1f2d44] transition hover:bg-[#eef6ff] active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
            aria-label={t('common.myPage.open')}
          >
            <UserRound aria-hidden="true" size={33} strokeWidth={2.8} />
          </Link>
        )}
      </div>
    </header>
  )
}
