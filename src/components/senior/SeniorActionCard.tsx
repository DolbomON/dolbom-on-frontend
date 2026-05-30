import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

type SeniorActionCardProps = {
  description: string
  icon: ReactNode
  tone?: 'brand' | 'calm' | 'warm'
  title: string
  to: string
}

const toneClass = {
  brand: 'border-[var(--color-brand)] bg-[var(--color-brand-soft)]',
  calm: 'border-emerald-200 bg-emerald-50',
  warm: 'border-amber-200 bg-amber-50',
}

export function SeniorActionCard({
  description,
  icon,
  title,
  to,
  tone = 'brand',
}: SeniorActionCardProps) {
  return (
    <Link
      to={to}
      className={cn(
        'flex min-h-[98px] flex-col justify-between rounded-lg border-2 p-3 no-underline transition hover:-translate-y-0.5 hover:shadow-md sm:min-h-36 sm:p-5',
        toneClass[tone],
      )}
    >
      <span className="mb-1.5 inline-flex h-9 w-9 items-center justify-center rounded-md bg-white text-[var(--color-brand-strong)] shadow-sm sm:mb-4 sm:h-12 sm:w-12">
        {icon}
      </span>
      <span className="text-lg font-black text-[var(--color-text-strong)] sm:text-2xl">
        {title}
      </span>
      <span className="mt-1 text-sm leading-snug text-[var(--color-muted)] sm:mt-2 sm:text-lg">
        {description}
      </span>
    </Link>
  )
}
