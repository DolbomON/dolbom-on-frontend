import { ArrowLeft } from 'lucide-react'
import { useI18n } from '../../lib/i18n/useI18n'
import { DolbomLogo } from '../layout/DolbomLogo'

type RoleSelectHeaderProps = {
  onBack: () => void
}

export function RoleSelectHeader({ onBack }: RoleSelectHeaderProps) {
  const { t } = useI18n()

  return (
    <header className="relative z-20 flex items-center justify-between">
      <DolbomLogo />

      <button
        className="inline-grid h-11 w-11 place-items-center rounded-md text-[#0a56d5] transition active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
        type="button"
        aria-label={t('role.back')}
        onClick={onBack}
      >
        <ArrowLeft aria-hidden="true" size={32} strokeWidth={2.8} />
      </button>
    </header>
  )
}
