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
        'flex min-h-36 flex-col justify-between rounded-lg border-2 p-5 no-underline transition hover:-translate-y-0.5 hover:shadow-md',
        toneClass[tone],
      )}
    >
      <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md bg-white text-[var(--color-brand-strong)] shadow-sm">
        {icon}
      </span>
      <span className="text-2xl font-black text-[var(--color-text-strong)]">
        {title}
      </span>
      <span className="mt-2 text-lg text-[var(--color-muted)]">
        {description}
      </span>
    </Link>
  )
}
