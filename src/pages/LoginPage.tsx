import {
  ArrowLeft,
  Eye,
  EyeOff,
  KeyRound,
  LogIn,
  ShieldCheck,
  UserPlus,
  UserRound,
} from 'lucide-react'
import { useId, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function LoginPage() {
  const credentialId = useId()
  const passwordId = useId()
  const navigate = useNavigate()
  const [credential, setCredential] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate('/select-role')
  }

  return (
    <main className="min-h-svh bg-[#edf5ff] text-[#070707]">
      <section
        className="mx-auto flex min-h-svh w-full max-w-[480px] flex-col overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_58%,#ffffff_100%)] px-5 pb-6 pt-5 shadow-[0_20px_80px_rgba(55,104,184,0.08)] min-[390px]:px-6 min-[390px]:pt-6"
        aria-label="돌봄온 로그인 화면"
      >
        <header className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex h-12 w-12 items-center justify-center rounded-md text-[#0a56d5] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
            aria-label="처음 화면으로 돌아가기"
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
            to="/signup"
            className="inline-flex min-h-12 items-center rounded-md px-1 text-[18px] font-black text-[#0b63df] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
          >
            가입
          </Link>
        </header>

        <section className="mt-10 min-[390px]:mt-12">
          <p className="text-[20px] font-black text-[#0b63df]">돌봄ON</p>
          <h1
            className="mt-3 text-[42px] font-black leading-[1.08] tracking-[0] text-[#070707] min-[390px]:text-[48px]"
            aria-label="로그인"
          >
            로그인하고
            <br />
            <span className="text-[#0b63df]">이용 유형</span>을
            <br />
            선택해요
          </h1>
          <p className="mt-5 text-[20px] font-bold leading-[1.45] text-[#4d5968] min-[390px]:text-[22px]">
            어르신, 가족, 요양사, 복지사 중 사용할 화면으로 이어집니다.
          </p>
        </section>

        <form
          className="mt-8 grid gap-4 rounded-[28px] border-2 border-[#d8e7ff] bg-white p-4 shadow-[0_18px_40px_rgba(20,91,207,0.08)] min-[390px]:mt-9 min-[390px]:p-5"
          aria-labelledby="login-form-title"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center gap-3">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[18px] bg-[#eaf3ff] text-[#0b63df]">
              <LogIn aria-hidden="true" size={31} strokeWidth={3} />
            </span>
            <h2
              id="login-form-title"
              className="text-[24px] font-black leading-tight text-[#07111f]"
            >
              계정 정보 입력
            </h2>
          </div>

          <label className="block" htmlFor={credentialId}>
            <span className="mb-2 flex items-center gap-2 text-[18px] font-black text-[#07111f]">
              <UserRound aria-hidden="true" size={22} strokeWidth={3} />
              아이디
            </span>
            <input
              id={credentialId}
              className="min-h-[64px] w-full rounded-[18px] border-2 border-[#cfe0f6] bg-[#fbfdff] px-4 text-[20px] font-bold text-[#07111f] outline-none transition placeholder:text-[#7b8796] focus:border-[#0b63df] focus:ring-4 focus:ring-[#cfe4ff]"
              autoComplete="username"
              inputMode="email"
              placeholder="이메일 또는 전화번호"
              value={credential}
              onChange={(event) => setCredential(event.target.value)}
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
                autoComplete="current-password"
                placeholder="입력 후 로그인"
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

          <p
            className="rounded-[18px] bg-[#eaf3ff] px-4 py-3 text-[17px] font-black leading-snug text-[#0b63df]"
            aria-live="polite"
          >
            로그인 버튼을 누르면 바로 이용 유형 선택 화면으로 이동해요.
          </p>

          <button
            className="flex min-h-[70px] w-full items-center justify-center gap-3 rounded-[24px] bg-gradient-to-br from-[#0a75ff] to-[#005ee5] px-5 text-[24px] font-black text-white shadow-[0_16px_30px_rgba(2,92,221,0.24)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
            type="submit"
          >
            <LogIn aria-hidden="true" size={30} strokeWidth={3} />
            로그인
          </button>
        </form>

        <section className="mt-4 rounded-[24px] border-2 border-[#dcecff] bg-[#f7fbff] p-4">
          <div className="flex gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-white text-emerald-700">
              <ShieldCheck aria-hidden="true" size={25} strokeWidth={2.8} />
            </span>
            <div>
              <h2 className="text-[19px] font-black text-[#07111f]">
                선택 안내
              </h2>
              <p className="mt-1 text-[16px] font-bold leading-snug text-[#596778]">
                다음 화면에서 어르신, 가족, 요양사, 복지사를 선택합니다.
              </p>
            </div>
          </div>
        </section>

        <Link
          to="/signup"
          className="mt-4 flex min-h-[62px] items-center justify-center gap-3 rounded-[22px] border-2 border-[#0b63df] bg-white px-4 text-[21px] font-black text-[#0b63df] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff]"
        >
          <UserPlus aria-hidden="true" size={27} strokeWidth={3} />
          회원가입하기
        </Link>
      </section>
    </main>
  )
}
