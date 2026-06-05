import { Bell } from 'lucide-react'
import { useI18n } from '../../lib/i18n/useI18n'
import { DolbomLogo } from '../layout/DolbomLogo'

type ElderCheckHeaderProps = {
  onNotificationClick: () => void
}

export function ElderCheckHeader({
  onNotificationClick,
}: ElderCheckHeaderProps) {
  const { t } = useI18n()

  return (
    <header className="flex items-center justify-between">
      <DolbomLogo ariaLabel={t('elder.check.logoAria')} to="/elder" />

      <button
        className="inline-grid h-11 w-11 place-items-center rounded-full text-[#0867f2] drop-shadow-[0_7px_8px_rgba(5,101,242,0.14)] transition active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
        type="button"
        aria-label={t('common.notification.view')}
        onClick={onNotificationClick}
      >
        <Bell size={30} strokeWidth={2.9} aria-hidden="true" />
      </button>
    </header>
  )
}
