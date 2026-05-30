import { CalendarDays, ChevronDown, type LucideIcon } from 'lucide-react'

type MemoDateTimeFieldProps = {
  icon?: LucideIcon
  label: string
  valueText: string
}

export function MemoDateTimeField({
  icon: Icon = CalendarDays,
  label,
  valueText,
}: MemoDateTimeFieldProps) {
  return (
    <section
      className="rounded-[24px] border border-[#e3e9f2] bg-white p-4 shadow-[0_14px_30px_rgba(32,79,150,0.1)]"
      aria-labelledby="consultation-date-time-title"
    >
      <h2
        id="consultation-date-time-title"
        className="text-[20px] font-black leading-tight text-[#101827]"
      >
        {label}
      </h2>

      {/* TODO: Replace this button with the shared date-time picker when scheduling UI is available. */}
      <button
        type="button"
        className="mt-4 flex min-h-14 w-full items-center justify-between gap-3 rounded-[16px] border border-[#d8e0eb] bg-white px-4 text-left text-[#101827] transition hover:bg-[#f8fbff] active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        aria-label={`${label} 선택, 현재 값 ${valueText}`}
      >
        <span className="inline-flex min-w-0 items-center gap-3">
          <Icon
            aria-hidden="true"
            className="h-6 w-6 shrink-0 text-[#4f5b70]"
            strokeWidth={2.5}
          />
          <span className="truncate text-[18px] font-semibold leading-tight">
            {valueText}
          </span>
        </span>
        <ChevronDown
          aria-hidden="true"
          className="h-6 w-6 shrink-0"
          strokeWidth={3}
        />
      </button>
    </section>
  )
}
