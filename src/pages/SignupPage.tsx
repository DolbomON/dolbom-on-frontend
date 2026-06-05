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
  UsersRound,
} from 'lucide-react'
import { useId, useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../lib/utils'

type SignupRole =
  | 'elder'
  | 'family'
  | 'caregiver'
  | 'worker'
  | 'government'
  | 'admin'

const roleOptions: Array<{
  description: string
  label: string
  value: SignupRole
}> = [
  {
    description: '내 건강과 안부를 직접 기록해요.',
    label: '어르신',
    value: 'elder',
  },
  {
    description: '부모님의 상태와 알림을 확인해요.',
    label: '가족',
    value: 'family',
  },
  {
    description: '방문 돌봄과 기록을 담당해요.',
    label: '요양사',
    value: 'caregiver',
  },
  {
    description: '대상자와 돌봄팀을 관리해요.',
    label: '복지사',
    value: 'worker',
  },
  {
    description: '지역 관제와 통계를 확인해요.',
    label: '지자체',
    value: 'government',
  },
  {
    description: '서비스 운영과 정책을 관리해요.',
    label: '관리자',
    value: 'admin',
  },
]

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
  const emailId = useId()
  const phoneId = useId()
  const passwordId = useId()
  const passwordConfirmId = useId()
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [role, setRole] = useState<SignupRole>('elder')
  const [showPassword, setShowPassword] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [createdAccount, setCreatedAccount] = useState('')

  const passwordChecks = useMemo(
    () => [
      { label: '8자 이상', passed: password.length >= 8 },
      { label: '영문 포함', passed: /[a-zA-Z]/.test(password) },
      { label: '숫자 포함', passed: /\d/.test(password) },
      { label: '특수문자 포함', passed: /[^a-zA-Z0-9]/.test(password) },
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
      setStatusMessage('이메일 또는 전화번호 중 하나는 입력해야 해요.')
      return
    }

    if (trimmedEmail && !isValidEmail(trimmedEmail)) {
      setStatusMessage('이메일 형식을 확인해주세요.')
      return
    }

    if (normalizedPhone && normalizedPhone.length < 10) {
      setStatusMessage('전화번호를 10자리 이상 입력해주세요.')
      return
    }

    if (
      duplicatedEmails.has(trimmedEmail) ||
      duplicatedPhones.has(normalizedPhone)
    ) {
      setStatusMessage('이미 가입된 이메일 또는 전화번호입니다.')
      return
    }

    if (!passwordPolicyPassed) {
      setStatusMessage('비밀번호 정책을 모두 만족해야 해요.')
      return
    }

    if (!passwordMatched) {
      setStatusMessage('비밀번호 확인이 일치하지 않아요.')
      return
    }

    const accountId = `DOLBOM-${role.toUpperCase()}-${Date.now()
      .toString()
      .slice(-5)}`

    setCreatedAccount(accountId)
    setStatusMessage('계정이 생성되었습니다.')
  }

  return (
    <main className="min-h-svh bg-[#edf5ff] text-[#070707]">
      <section
        className="mx-auto flex min-h-svh w-full max-w-[480px] flex-col overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_58%,#ffffff_100%)] px-5 pb-6 pt-5 shadow-[0_20px_80px_rgba(55,104,184,0.08)] min-[390px]:px-6 min-[390px]:pt-6"
        aria-label="돌봄온 회원가입 화면"
      >
        <header className="flex items-center justify-between">
          <Link
            to="/login"
            className="inline-flex h-12 w-12 items-center justify-center rounded-md text-[#0a56d5] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
            aria-label="로그인으로 돌아가기"
          >
            <ArrowLeft aria-hidden="true" size={36} strokeWidth={3.2} />
          </Link>

          <Link
            to="/"
            className="inline-flex min-h-11 items-baseline rounded-md text-[#0b63df] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
            aria-label="돌봄온 홈"
          >
            <span className="text-[28px] font-black leading-none">돌봄</span>
            <span className="ml-1 text-[38px] font-black leading-none">ON</span>
          </Link>

          <Link
            to="/login"
            className="inline-flex min-h-12 items-center rounded-md px-1 text-[18px] font-black text-[#0b63df] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
          >
            로그인
          </Link>
        </header>

        <section className="mt-10 min-[390px]:mt-12">
          <p className="text-[20px] font-black text-[#0b63df]">돌봄ON</p>
          <h1
            className="mt-3 text-[42px] font-black leading-[1.08] tracking-[0] text-[#070707] min-[390px]:text-[48px]"
            aria-label="회원가입"
          >
            회원가입하고
            <br />
            <span className="text-[#0b63df]">돌봄</span>을
            <br />
            시작해요
          </h1>
          <p className="mt-5 text-[20px] font-bold leading-[1.45] text-[#4d5968] min-[390px]:text-[22px]">
            이메일 또는 전화번호로 공통 계정을 만들고 사용할 역할을 선택합니다.
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
              가입 정보 입력
            </h2>
          </div>

          <label className="block" htmlFor={emailId}>
            <span className="mb-2 flex items-center gap-2 text-[18px] font-black text-[#07111f]">
              <AtSign aria-hidden="true" size={22} strokeWidth={3} />
              이메일
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
              전화번호
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
              비밀번호
            </span>
            <span className="relative block">
              <input
                id={passwordId}
                className="min-h-[64px] w-full rounded-[18px] border-2 border-[#cfe0f6] bg-[#fbfdff] px-4 pr-16 text-[20px] font-bold text-[#07111f] outline-none transition placeholder:text-[#7b8796] focus:border-[#0b63df] focus:ring-4 focus:ring-[#cfe4ff]"
                autoComplete="new-password"
                placeholder="영문, 숫자, 특수문자 포함"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-[14px] text-[#596778] transition hover:bg-[#eaf3ff] hover:text-[#0b63df] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
                aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
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
              비밀번호 확인
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

          <fieldset className="grid gap-3">
            <legend className="mb-1 flex items-center gap-2 text-[20px] font-black text-[#07111f]">
              <UsersRound aria-hidden="true" size={24} strokeWidth={3} />
              역할 선택
            </legend>
            <div className="grid grid-cols-2 gap-3">
              {roleOptions.map((option) => {
                const selected = role === option.value

                return (
                  <button
                    key={option.value}
                    type="button"
                    className={cn(
                      'min-h-[104px] rounded-[20px] border-2 px-3 py-3 text-left transition focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]',
                      selected
                        ? 'border-[#0b63df] bg-[#eaf3ff]'
                        : 'border-[#d8e7ff] bg-[#fbfdff] hover:border-[#0b63df]',
                    )}
                    aria-pressed={selected}
                    onClick={() => setRole(option.value)}
                  >
                    <span className="flex items-center justify-between gap-2 text-[19px] font-black text-[#07111f]">
                      {option.label}
                      {selected ? (
                        <CheckCircle2
                          aria-hidden="true"
                          className="h-6 w-6 shrink-0 text-[#0b63df]"
                          strokeWidth={3}
                        />
                      ) : null}
                    </span>
                    <span className="mt-2 block text-[13px] font-bold leading-snug text-[#596778]">
                      {option.description}
                    </span>
                  </button>
                )
              })}
            </div>
          </fieldset>

          <section className="rounded-[20px] bg-[#f7fbff] p-4">
            <h2 className="text-[19px] font-black text-[#07111f]">
              비밀번호 정책
            </h2>
            <ul className="mt-3 grid gap-2">
              {passwordChecks.map((check) => (
                <li
                  key={check.label}
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
                  {check.label}
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
                비밀번호 확인 일치
              </li>
            </ul>
          </section>

          <button
            className="flex min-h-[70px] w-full items-center justify-center gap-3 rounded-[24px] bg-gradient-to-br from-[#0a75ff] to-[#005ee5] px-5 text-[24px] font-black text-white shadow-[0_16px_30px_rgba(2,92,221,0.24)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
            type="submit"
          >
            <UserPlus aria-hidden="true" size={30} strokeWidth={3} />
            계정 생성
          </button>

          {statusMessage ? (
            <p
              className="rounded-[18px] border-2 border-[#d8e7ff] bg-[#fbfdff] px-4 py-3 text-[18px] font-black leading-snug text-[#07111f]"
              role="status"
            >
              {statusMessage}
              {createdAccount ? (
                <span className="mt-2 block break-all text-[14px] font-bold text-[#596778]">
                  생성된 계정: {createdAccount}
                </span>
              ) : null}
            </p>
          ) : null}
        </form>

        <p className="mt-4 rounded-[20px] border-2 border-amber-200 bg-amber-50 px-4 py-3 text-[16px] font-bold leading-snug text-amber-950">
          이미 가입된 이메일 또는 전화번호는 계정 생성 시 바로 안내합니다.
        </p>
      </section>
    </main>
  )
}
