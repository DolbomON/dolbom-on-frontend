import { useMemo } from 'react'
import { useAppStore } from '../../app/store'
import { formatAppDate, translate, type TranslationKey } from './translations'

export function useI18n() {
  const language = useAppStore((state) => state.language)

  return useMemo(
    () => ({
      formatDate: (date: Date, options: Intl.DateTimeFormatOptions) =>
        formatAppDate(language, date, options),
      language,
      t: (key: TranslationKey, params?: Record<string, string | number>) =>
        translate(language, key, params),
    }),
    [language],
  )
}
