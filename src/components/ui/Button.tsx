import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { cn } from '../../lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'soft'
type ButtonSize = 'md' | 'lg'

const variantClass: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-strong)]',
  secondary:
    'border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-strong)] hover:border-[var(--color-brand)]',
  soft: 'bg-[var(--color-brand-soft)] text-[var(--color-brand-strong)] hover:bg-[var(--color-brand-soft-strong)]',
}

const sizeClass: Record<ButtonSize, string> = {
  md: 'min-h-11 px-4 py-2.5 text-base sm:min-h-12 sm:px-5 sm:py-3',
  lg: 'min-h-12 px-5 py-3 text-lg sm:min-h-16 sm:px-6 sm:py-4 sm:text-xl',
}

type SharedButtonProps = {
  icon?: ReactNode
  size?: ButtonSize
  variant?: ButtonVariant
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & SharedButtonProps

export function Button({
  children,
  className,
  icon,
  size = 'md',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-bold transition disabled:cursor-not-allowed disabled:opacity-60',
        variantClass[variant],
        sizeClass[size],
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  )
}

type LinkButtonProps = LinkProps & SharedButtonProps

export function LinkButton({
  children,
  className,
  icon,
  size = 'md',
  variant = 'primary',
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-bold no-underline transition',
        variantClass[variant],
        sizeClass[size],
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </Link>
  )
}
