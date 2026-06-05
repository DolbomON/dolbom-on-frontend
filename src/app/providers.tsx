import { useLayoutEffect, type PropsWithChildren } from 'react'
import { applyLegacyDomFallback } from '../lib/i18n/legacyDomFallback'
import { getHtmlLang } from '../lib/i18n/translations'
import { useAppStore } from './store'

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <>
      <LanguageEffects />
      {children}
    </>
  )
}

function LanguageEffects() {
  const language = useAppStore((state) => state.language)

  useLayoutEffect(() => {
    document.documentElement.lang = getHtmlLang(language)
    document.documentElement.dataset.language = language

    return applyLegacyDomFallback(language)
  }, [language])

  return null
}
