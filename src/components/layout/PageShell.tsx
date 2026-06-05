import { ArrowLeft } from 'lucide-react'
import type { PropsWithChildren, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { DolbomLogo } from './DolbomLogo'

type PageShellProps = PropsWithChildren<{
  actions?: ReactNode
  backTo?: string
  description?: string
  eyebrow?: string
  title: string
}>

export function PageShell({
  actions,
  backTo,
  children,
  description,
  eyebrow,
  title,
}: PageShellProps) {
  return (
    <div className="flex min-h-svh flex-col overflow-x-hidden bg-[var(--color-page)] text-[var(--color-text)]">
      <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-2 sm:px-8 sm:py-4">
          <DolbomLogo />
          <nav className="flex items-center gap-2" aria-label="주요 메뉴">
            <Link
              to="/select-role"
              className="rounded-md px-2 py-1.5 text-sm font-semibold text-[var(--color-muted)] hover:text-[var(--color-text)] sm:px-3 sm:py-2"
            >
              역할 선택
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 px-4 py-4 sm:gap-8 sm:px-8 sm:py-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-5">
          <div className="max-w-3xl">
            {backTo ? (
              <Link
                to={backTo}
                className="mb-2 inline-flex min-h-9 items-center gap-2 rounded-md text-sm font-semibold text-[var(--color-brand-strong)] sm:mb-4 sm:min-h-11 sm:text-base"
              >
                <ArrowLeft aria-hidden="true" size={18} />
                이전
              </Link>
            ) : null}
            {eyebrow ? (
              <p className="mb-1 text-sm font-bold text-[var(--color-brand-strong)] sm:mb-2">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="text-3xl font-black leading-tight text-[var(--color-text-strong)] sm:text-5xl">
              {title}
            </h1>
            {description ? (
              <p className="mt-2 text-base leading-snug text-[var(--color-muted)] sm:mt-4 sm:text-xl">
                {description}
              </p>
            ) : null}
          </div>
          {actions ? (
            <div className="flex flex-wrap gap-3">{actions}</div>
          ) : null}
        </div>

        {children}
      </main>
    </div>
  )
}
