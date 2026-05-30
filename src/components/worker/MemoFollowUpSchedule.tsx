import { CalendarDays, ChevronDown, Clock3 } from 'lucide-react'

type MemoFollowUpScheduleProps = {
  dateText: string
  timeText: string
}

export function MemoFollowUpSchedule({
  dateText,
  timeText,
}: MemoFollowUpScheduleProps) {
  return (
    <div aria-labelledby="next-follow-up-title">
      <h2
        id="next-follow-up-title"
        className="text-[20px] font-black leading-tight text-[#101827]"
      >
        다음 확인 일정
      </h2>

      <div className="mt-3 grid gap-3 min-[390px]:grid-cols-[1.1fr_0.9fr]">
        {/* TODO: Replace these buttons with shared date/time picker controls when available. */}
        <button
          type="button"
          className="flex min-h-14 items-center justify-between gap-3 rounded-[16px] border border-[#d8e0eb] bg-white px-4 text-left transition hover:bg-[#f8fbff] active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
          aria-label={`다음 확인 날짜 선택, 현재 값 ${dateText}`}
        >
          <span className="inline-flex min-w-0 items-center gap-3">
            <CalendarDays
              aria-hidden="true"
              className="h-6 w-6 shrink-0 text-[#4f5b70]"
              strokeWidth={2.5}
            />
            <span className="truncate text-[17px] font-semibold leading-tight text-[#101827]">
              {dateText}
            </span>
          </span>
          <ChevronDown
            aria-hidden="true"
            className="h-6 w-6 shrink-0 text-[#101827]"
            strokeWidth={3}
          />
        </button>

        <button
          type="button"
          className="flex min-h-14 items-center justify-between gap-3 rounded-[16px] border border-[#d8e0eb] bg-white px-4 text-left transition hover:bg-[#f8fbff] active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
          aria-label={`다음 확인 시간 선택, 현재 값 ${timeText}`}
        >
          <span className="inline-flex min-w-0 items-center gap-3">
            <Clock3
              aria-hidden="true"
              className="h-6 w-6 shrink-0 text-[#4f5b70]"
              strokeWidth={2.5}
            />
            <span className="truncate text-[17px] font-semibold leading-tight text-[#101827]">
              {timeText}
            </span>
          </span>
          <ChevronDown
            aria-hidden="true"
            className="h-6 w-6 shrink-0 text-[#101827]"
            strokeWidth={3}
          />
        </button>
      </div>
    </div>
  )
}
