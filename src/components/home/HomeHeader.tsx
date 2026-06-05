import { LanguageToggle } from '../language/LanguageToggle'
import { DolbomLogo } from '../layout/DolbomLogo'

export function HomeHeader() {
  return (
    <header className="flex items-center justify-between gap-3">
      <DolbomLogo />
      <LanguageToggle />
    </header>
  )
}
