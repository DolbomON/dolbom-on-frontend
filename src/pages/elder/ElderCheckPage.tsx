import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { PageShell } from '../../components/layout/PageShell'
import { Button } from '../../components/ui/Button'
import {
  mealOptions,
  moodOptions,
  painOptions,
} from '../../features/elder-check/checkOptions'
import { cn } from '../../lib/utils'

const healthCheckSchema = z.object({
  meal: z.enum(['yes', 'no']),
  mood: z.enum(['good', 'okay', 'bad']),
  pain: z.enum(['none', 'mild', 'strong']),
})

type HealthCheckForm = z.infer<typeof healthCheckSchema>
type FieldName = keyof HealthCheckForm

const groups: Array<{
  field: FieldName
  legend: string
  options: ReadonlyArray<{ label: string; value: HealthCheckForm[FieldName] }>
}> = [
  {
    field: 'mood',
    legend: '오늘 기분은 어떠세요?',
    options: moodOptions,
  },
  {
    field: 'pain',
    legend: '몸이 아픈 곳이 있나요?',
    options: painOptions,
  },
  {
    field: 'meal',
    legend: '오늘 식사는 하셨나요?',
    options: mealOptions,
  },
]

export function ElderCheckPage() {
  const [submittedValues, setSubmittedValues] =
    useState<HealthCheckForm | null>(null)
  const { control, handleSubmit, setValue } = useForm<HealthCheckForm>({
    defaultValues: {
      meal: 'yes',
      mood: 'good',
      pain: 'none',
    },
    resolver: zodResolver(healthCheckSchema),
  })

  const values = useWatch({ control })

  function onSubmit(data: HealthCheckForm) {
    setSubmittedValues(data)
  }

  return (
    <PageShell
      title="오늘 건강 확인"
      description="큰 버튼을 눌러 현재 상태를 남겨 주세요."
      backTo="/elder"
    >
      <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
        {groups.map((group) => (
          <fieldset
            key={group.field}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
          >
            <legend className="px-1 text-2xl font-black text-[var(--color-text-strong)]">
              {group.legend}
            </legend>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {group.options.map((option) => {
                const selected = values[group.field] === option.value

                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() =>
                      setValue(group.field, option.value, {
                        shouldValidate: true,
                      })
                    }
                    className={cn(
                      'min-h-20 rounded-lg border-2 px-4 py-5 text-xl font-black transition',
                      selected
                        ? 'border-[var(--color-brand)] bg-[var(--color-brand-soft)] text-[var(--color-brand-strong)]'
                        : 'border-[var(--color-border)] bg-white text-[var(--color-text-strong)]',
                    )}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
          </fieldset>
        ))}

        <Button
          type="submit"
          size="lg"
          icon={<CheckCircle2 aria-hidden="true" size={28} />}
          className="w-full sm:w-auto"
        >
          확인 완료
        </Button>
      </form>

      {submittedValues ? (
        <section
          className="rounded-lg border border-emerald-200 bg-emerald-50 p-5"
          aria-live="polite"
        >
          <h2 className="text-2xl font-black text-emerald-900">
            건강 확인이 저장되었습니다.
          </h2>
          <p className="mt-2 text-lg text-emerald-800">
            이후 Supabase 연동 시 가족과 복지사에게 공유됩니다.
          </p>
        </section>
      ) : null}
    </PageShell>
  )
}
