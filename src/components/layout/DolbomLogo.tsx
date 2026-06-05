import { Link } from 'react-router-dom'
import { useI18n } from '../../lib/i18n/useI18n'

type DolbomLogoProps = {
  ariaLabel?: string
  to?: string
}

export function DolbomLogo({ ariaLabel, to = '/' }: DolbomLogoProps) {
  const { t } = useI18n()

  return (
    <Link
      to={to}
      className="inline-flex min-h-11 w-[115px] shrink-0 items-baseline rounded-md text-[#0867f2] drop-shadow-[0_4px_8px_rgba(8,103,242,0.14)] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
      aria-label={ariaLabel ?? t('app.logo.aria')}
      data-i18n-skip
    >
      <span className="text-[28px] font-black leading-none">돌봄</span>
      <span className="ml-1 text-[38px] font-black leading-none">ON</span>
    </Link>
  )
}
