import { cn } from '../../lib/utils'

type MemoTextareaFieldProps = {
  describedBy?: string
  errorMessage?: string
  id: string
  label: string
  maxLength: number
  onChange: (value: string) => void
  placeholder: string
  value: string
}

export function MemoTextareaField({
  describedBy,
  errorMessage,
  id,
  label,
  maxLength,
  onChange,
  placeholder,
  value,
}: MemoTextareaFieldProps) {
  const counterId = `${id}-counter`
  const errorId = errorMessage ? `${id}-error` : undefined
  const description = [counterId, errorId, describedBy]
    .filter(Boolean)
    .join(' ')

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[20px] font-black leading-tight text-[#101827]"
      >
        {label}
      </label>
      <div className="relative mt-3">
        <textarea
          id={id}
          value={value}
          maxLength={maxLength}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={cn(
            'min-h-[118px] w-full resize-none rounded-[16px] border bg-white px-4 pb-9 pt-4 text-[17px] font-medium leading-relaxed text-[#101827] outline-none transition placeholder:text-[#8a94a6] focus:border-[#0867f2] focus:ring-4 focus:ring-[#0867f2]/10',
            errorMessage ? 'border-[#d81f2a]' : 'border-[#d8e0eb]',
          )}
          aria-describedby={description}
          aria-invalid={errorMessage ? 'true' : undefined}
        />
        <span
          id={counterId}
          className="absolute bottom-3 right-4 text-[14px] font-semibold leading-none text-[#6f7786]"
        >
          {value.length} / {maxLength}
        </span>
      </div>
      {errorMessage && (
        <p
          id={errorId}
          className="mt-2 text-[15px] font-bold leading-snug text-[#d81f2a]"
        >
          {errorMessage}
        </p>
      )}
    </div>
  )
}
