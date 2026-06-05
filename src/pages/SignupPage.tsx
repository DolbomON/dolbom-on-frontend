import {
  ArrowLeft,
  AtSign,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Phone,
  ShieldAlert,
  UserPlus,
} from 'lucide-react'
import { useId, useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { DolbomLogo } from '../components/layout/DolbomLogo'
import type { TranslationKey } from '../lib/i18n/translations'
import { useI18n } from '../lib/i18n/useI18n'
import { cn } from '../lib/utils'

const duplicatedEmails = new Set([
  'already@dolbom-on.local',
  'test@example.com',
])
const duplicatedPhones = new Set(['01012345678'])

function normalizePhone(phone: string) {
  return phone.replace(/\D/g, '')
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export function SignupPage() {
  const { t } = useI18n()
  const emailId = useId()
  const phoneId = useId()
  const passwordId = useId()
  const passwordConfirmId = useId()
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [statusKey, setStatusKey] = useState<TranslationKey | ''>('')
  const [createdAccount, setCreatedAccount] = useState('')

  const passwordChecks = useMemo(
    () => [
      {
        labelKey: 'signup.passwordPolicy.length' as TranslationKey,
        passed: password.length >= 8,
      },
      {
        labelKey: 'signup.passwordPolicy.letter' as TranslationKey,
        passed: /[a-zA-Z]/.test(password),
      },
      {
        labelKey: 'signup.passwordPolicy.number' as TranslationKey,
        passed: /\d/.test(password),
      },
      {
        labelKey: 'signup.passwordPolicy.special' as TranslationKey,
        passed: /[^a-zA-Z0-9]/.test(password),
      },
    ],
    [password],
  )
  const passwordPolicyPassed = passwordChecks.every((check) => check.passed)
  const passwordMatched = password.length > 0 && password === passwordConfirm

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedEmail = email.trim().toLowerCase()
    const normalizedPhone = normalizePhone(phone)

    setCreatedAccount('')

    if (!trimmedEmail && !normalizedPhone) {
      setStatusKey('signup.status.missingContact')
      return
    }

    if (trimmedEmail && !isValidEmail(trimmedEmail)) {
      setStatusKey('signup.status.invalidEmail')
      return
    }

    if (normalizedPhone && normalizedPhone.length < 10) {
      setStatusKey('signup.status.shortPhone')
      return
    }

    if (
      duplicatedEmails.has(trimmedEmail) ||
      duplicatedPhones.has(normalizedPhone)
    ) {
      setStatusKey('signup.status.duplicated')
      return
    }

    if (!passwordPolicyPassed) {
      setStatusKey('signup.status.passwordPolicy')
      return
    }

    if (!passwordMatched) {
      setStatusKey('signup.status.passwordMismatch')
      return
    }

    const accountId = `DOLBOM-USER-${Date.now()
      .toString()
      .slice(-5)}`

    setCreatedAccount(accountId)
    setStatusKey('signup.status.created')
  }

  return (
    <main className="min-h-svh bg-[#edf5ff] text-[#070707]">
      <section
        className="mx-auto flex min-h-svh w-full max-w-[480px] flex-col overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_58%,#ffffff_100%)] px-5 pb-6 pt-5 shadow-[0_20px_80px_rgba(55,104,184,0.08)] min-[390px]:px-6 min-[390px]:pt-6"
        aria-label={t('signup.aria')}
      >
        <header className="flex items-center justify-between">
          <Link
            to="/login"
            className="inline-flex h-12 w-12 items-center justify-center rounded-md text-[#0a56d5] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
            aria-label={t('signup.backToLogin')}
          >
            <ArrowLeft aria-hidden="true" size={36} strokeWidth={3.2} />
          </Link>

          <DolbomLogo />

          <Link
            to="/login"
            className="inline-flex min-h-12 items-center rounded-md px-1 text-[18px] font-black text-[#0b63df] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
          >
            {t('login.submit')}
          </Link>
        </header>

        <section className="mt-10 min-[390px]:mt-12">
          <p className="text-[20px] font-black text-[#0b63df]">
            {t('login.brand')}
          </p>
          <h1
            className="mt-3 text-[42px] font-black leading-[1.08] tracking-[0] text-[#070707] min-[390px]:text-[48px]"
            aria-label={t('signup.heading.aria')}
          >
            {t('signup.heading.line1')}
            <br />
            <span className="text-[#0b63df]">{t('signup.heading.accent')}</span>
            {t('signup.heading.suffix')}
            <br />
            {t('signup.heading.line3')}
          </h1>
          <p className="mt-5 text-[20px] font-bold leading-[1.45] text-[#4d5968] min-[390px]:text-[22px]">
            {t('signup.description')}
          </p>
        </section>

        <form
          className="mt-8 grid gap-4 rounded-[28px] border-2 border-[#d8e7ff] bg-white p-4 shadow-[0_18px_40px_rgba(20,91,207,0.08)] min-[390px]:mt-9 min-[390px]:p-5"
          aria-labelledby="signup-form-title"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center gap-3">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[18px] bg-[#eaf3ff] text-[#0b63df]">
              <UserPlus aria-hidden="true" size={31} strokeWidth={3} />
            </span>
            <h2
              id="signup-form-title"
              className="text-[24px] font-black leading-tight text-[#07111f]"
            >
              {t('signup.formTitle')}
            </h2>
          </div>

          <label className="block" htmlFor={emailId}>
            <span className="mb-2 flex items-center gap-2 text-[18px] font-black text-[#07111f]">
              <AtSign aria-hidden="true" size={22} strokeWidth={3} />
              {t('signup.emailLabel')}
            </span>
            <input
              id={emailId}
              className="min-h-[64px] w-full rounded-[18px] border-2 border-[#cfe0f6] bg-[#fbfdff] px-4 text-[20px] font-bold text-[#07111f] outline-none transition placeholder:text-[#7b8796] focus:border-[#0b63df] focus:ring-4 focus:ring-[#cfe4ff]"
              autoComplete="email"
              inputMode="email"
              placeholder="name@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <label className="block" htmlFor={phoneId}>
            <span className="mb-2 flex items-center gap-2 text-[18px] font-black text-[#07111f]">
              <Phone aria-hidden="true" size={22} strokeWidth={3} />
              {t('signup.phoneLabel')}
            </span>
            <input
              id={phoneId}
              className="min-h-[64px] w-full rounded-[18px] border-2 border-[#cfe0f6] bg-[#fbfdff] px-4 text-[20px] font-bold text-[#07111f] outline-none transition placeholder:text-[#7b8796] focus:border-[#0b63df] focus:ring-4 focus:ring-[#cfe4ff]"
              autoComplete="tel"
              inputMode="tel"
              placeholder="010-1234-5678"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </label>

          <label className="block" htmlFor={passwordId}>
            <span className="mb-2 flex items-center gap-2 text-[18px] font-black text-[#07111f]">
              <KeyRound aria-hidden="true" size={22} strokeWidth={3} />
              {t('login.passwordLabel')}
            </span>
            <span className="relative block">
              <input
                id={passwordId}
                className="min-h-[64px] w-full rounded-[18px] border-2 border-[#cfe0f6] bg-[#fbfdff] px-4 pr-16 text-[20px] font-bold text-[#07111f] outline-none transition placeholder:text-[#7b8796] focus:border-[#0b63df] focus:ring-4 focus:ring-[#cfe4ff]"
                autoComplete="new-password"
                placeholder={t('signup.passwordPlaceholder')}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-[14px] text-[#596778] transition hover:bg-[#eaf3ff] hover:text-[#0b63df] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
                aria-label={
                  showPassword
                    ? t('login.password.hide')
                    : t('login.password.show')
                }
                onClick={() => setShowPassword((value) => !value)}
              >
                {showPassword ? (
                  <EyeOff aria-hidden="true" size={25} strokeWidth={2.8} />
                ) : (
                  <Eye aria-hidden="true" size={25} strokeWidth={2.8} />
                )}
              </button>
            </span>
          </label>

          <label className="block" htmlFor={passwordConfirmId}>
            <span className="mb-2 flex items-center gap-2 text-[18px] font-black text-[#07111f]">
              <ShieldAlert aria-hidden="true" size={22} strokeWidth={3} />
              {t('signup.passwordConfirmLabel')}
            </span>
            <input
              id={passwordConfirmId}
              className="min-h-[64px] w-full rounded-[18px] border-2 border-[#cfe0f6] bg-[#fbfdff] px-4 text-[20px] font-bold text-[#07111f] outline-none transition placeholder:text-[#7b8796] focus:border-[#0b63df] focus:ring-4 focus:ring-[#cfe4ff]"
              autoComplete="new-password"
              type={showPassword ? 'text' : 'password'}
              value={passwordConfirm}
              onChange={(event) => setPasswordConfirm(event.target.value)}
            />
          </label>

          <section className="rounded-[20px] bg-[#f7fbff] p-4">
            <h2 className="text-[19px] font-black text-[#07111f]">
              {t('signup.passwordPolicy.title')}
            </h2>
            <ul className="mt-3 grid gap-2">
              {passwordChecks.map((check) => (
                <li
                  key={check.labelKey}
                  className="flex items-center gap-3 text-[16px] font-bold text-[#07111f]"
                >
                  <CheckCircle2
                    aria-hidden="true"
                    className={cn(
                      'h-6 w-6',
                      check.passed ? 'text-emerald-600' : 'text-slate-300',
                    )}
                    strokeWidth={3}
                  />
                  {t(check.labelKey)}
                </li>
              ))}
              <li className="flex items-center gap-3 text-[16px] font-bold text-[#07111f]">
                <CheckCircle2
                  aria-hidden="true"
                  className={cn(
                    'h-6 w-6',
                    passwordMatched ? 'text-emerald-600' : 'text-slate-300',
                  )}
                  strokeWidth={3}
                />
                {t('signup.passwordPolicy.match')}
              </li>
            </ul>
          </section>

          <button
            className="flex min-h-[70px] w-full items-center justify-center gap-3 rounded-[24px] bg-gradient-to-br from-[#0a75ff] to-[#005ee5] px-5 text-[24px] font-black text-white shadow-[0_16px_30px_rgba(2,92,221,0.24)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
            type="submit"
          >
            <UserPlus aria-hidden="true" size={30} strokeWidth={3} />
            {t('signup.createAccount')}
          </button>

          {statusKey ? (
            <p
              className="rounded-[18px] border-2 border-[#d8e7ff] bg-[#fbfdff] px-4 py-3 text-[18px] font-black leading-snug text-[#07111f]"
              role="status"
            >
              {t(statusKey)}
              {createdAccount ? (
                <span className="mt-2 block break-all text-[14px] font-bold text-[#596778]">
                  {t('signup.status.createdAccount', {
                    accountId: createdAccount,
                  })}
                </span>
              ) : null}
            </p>
          ) : null}
        </form>

        <p className="mt-4 rounded-[20px] border-2 border-amber-200 bg-amber-50 px-4 py-3 text-[16px] font-bold leading-snug text-amber-950">
          {t('signup.duplicateNotice')}
        </p>
      </section>
    </main>
  )
}
