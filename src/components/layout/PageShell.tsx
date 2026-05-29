import { ArrowLeft, Home } from 'lucide-react'
import type { PropsWithChildren, ReactNode } from 'react'
import { Link } from 'react-router-dom'

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
    <div className="min-h-svh bg-[var(--color-page)] text-[var(--color-text)]">
      <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-md text-xl font-bold text-[var(--color-brand-strong)]"
          >
            <Home aria-hidden="true" size={24} />
            DolbomON
          </Link>
          <nav className="flex items-center gap-2" aria-label="주요 메뉴">
            <Link
              to="/select-role"
              className="rounded-md px-3 py-2 text-sm font-semibold text-[var(--color-muted)] hover:text-[var(--color-text)]"
            >
              역할 선택
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-8 sm:px-8 sm:py-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            {backTo ? (
              <Link
                to={backTo}
                className="mb-4 inline-flex min-h-11 items-center gap-2 rounded-md text-base font-semibold text-[var(--color-brand-strong)]"
              >
                <ArrowLeft aria-hidden="true" size={20} />
                이전
              </Link>
            ) : null}
            {eyebrow ? (
              <p className="mb-2 text-sm font-bold text-[var(--color-brand-strong)]">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="text-4xl font-black leading-tight text-[var(--color-text-strong)] sm:text-5xl">
              {title}
            </h1>
            {description ? (
              <p className="mt-4 text-xl text-[var(--color-muted)]">
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
