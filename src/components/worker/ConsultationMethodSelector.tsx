import { Home, MessageCircle, Phone, type LucideIcon } from 'lucide-react'
import type { ConsultationMethod } from '../../features/worker/caseMemoData'
import { cn } from '../../lib/utils'

type ConsultationMethodOption = {
  icon: LucideIcon
  label: string
  value: ConsultationMethod
}

const methodOptions: ConsultationMethodOption[] = [
  { icon: Phone, label: '전화 상담', value: 'phone' },
  { icon: Home, label: '방문 상담', value: 'visit' },
  { icon: MessageCircle, label: '문자 상담', value: 'message' },
]

type ConsultationMethodSelectorProps = {
  value: ConsultationMethod
  onChange: (value: ConsultationMethod) => void
}

export function ConsultationMethodSelector({
  value,
  onChange,
}: ConsultationMethodSelectorProps) {
  return (
    <section
      className="rounded-[24px] border border-[#e3e9f2] bg-white p-4 shadow-[0_14px_30px_rgba(32,79,150,0.1)]"
      aria-labelledby="consultation-method-title"
    >
      <h2
        id="consultation-method-title"
        className="text-[20px] font-black leading-tight text-[#101827]"
      >
        상담 방식
      </h2>

      <div className="mt-4 grid gap-2 min-[390px]:grid-cols-3">
        {methodOptions.map((option) => {
          const Icon = option.icon
          const isSelected = value === option.value

          return (
            <button
              key={option.value}
              type="button"
              className={cn(
                'inline-flex min-h-14 items-center justify-center gap-2 rounded-[16px] border px-3 text-[17px] font-black leading-none transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]',
                isSelected
                  ? 'border-[#0867f2] bg-[#f7fbff] text-[#0867f2] shadow-[0_8px_16px_rgba(8,103,242,0.08)]'
                  : 'border-[#d8e0eb] bg-white text-[#4f5b70] hover:bg-[#f8fbff]',
              )}
              aria-pressed={isSelected}
              onClick={() => onChange(option.value)}
            >
              <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={2.8} />
              <span>{option.label}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
