import { Globe2 } from 'lucide-react'
import { useAppStore } from '../../app/store'
import { languageOptions, type AppLanguage } from '../../lib/i18n/translations'
import { cn } from '../../lib/utils'

const languageControlLabels: Record<AppLanguage, string> = {
  ja: '表示言語',
  ko: '표시 언어',
}

const languageButtonLabels: Record<AppLanguage, Record<AppLanguage, string>> = {
  ja: {
    ja: '日本語で表示',
    ko: '韓国語で表示',
  },
  ko: {
    ja: '일본어로 보기',
    ko: '한국어로 보기',
  },
}

export function LanguageToggle() {
  const language = useAppStore((state) => state.language)
  const setLanguage = useAppStore((state) => state.setLanguage)

  return (
    <div
      className="inline-flex min-h-12 shrink-0 items-center gap-1 rounded-[18px] border-2 border-[#b8d3ff] bg-white/95 p-1 text-[#0b4fbd] shadow-[0_8px_18px_rgba(28,105,220,0.08)]"
      role="group"
      aria-label={languageControlLabels[language]}
      data-i18n-skip
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center text-[#0a56d5]">
        <Globe2 aria-hidden="true" size={24} strokeWidth={2.8} />
      </span>

      {languageOptions.map((option) => {
        const isSelected = option.value === language

        return (
          <button
            key={option.value}
            className={cn(
              'min-h-10 shrink-0 whitespace-nowrap rounded-[14px] px-2.5 text-[16px] font-black leading-none transition focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff] min-[390px]:px-3',
              isSelected
                ? 'bg-[#0a63e8] text-white shadow-[0_8px_16px_rgba(10,99,232,0.22)]'
                : 'bg-transparent text-[#0a56d5] hover:bg-[#eef6ff]',
            )}
            type="button"
            aria-label={languageButtonLabels[language][option.value]}
            aria-pressed={isSelected}
            onClick={() => setLanguage(option.value)}
          >
            {option.shortLabel}
          </button>
        )
      })}
    </div>
  )
}
