import { Link } from 'react-router-dom'
import type { WorkerElder } from '../../features/worker/caseMemoData'

type MemoElderProfileCardProps = {
  elder: WorkerElder
}

export function MemoElderProfileCard({ elder }: MemoElderProfileCardProps) {
  return (
    <article className="grid gap-4 rounded-[24px] border border-[#e3e9f2] bg-white p-4 shadow-[0_14px_30px_rgba(32,79,150,0.1)] min-[390px]:grid-cols-[88px_minmax(0,1fr)_96px] min-[390px]:items-center">
      <img
        src={elder.avatarSrc}
        alt={`${elder.name} 프로필 이미지`}
        width="96"
        height="96"
        className="h-[84px] w-[84px] justify-self-center rounded-full bg-[#eaf3ff] object-cover shadow-[0_8px_18px_rgba(53,88,150,0.12)] ring-4 ring-[#dcecff] min-[390px]:justify-self-start"
        draggable="false"
      />

      <div className="min-w-0 text-center min-[390px]:text-left">
        <h2 className="text-[28px] font-black leading-tight text-[#101827]">
          {elder.name}
        </h2>
        <p className="mt-2 text-[18px] font-semibold leading-tight text-[#283344]">
          {elder.age}세 · {elder.household}
        </p>
        <p className="mt-2 truncate text-[15px] font-semibold leading-snug text-[#5d6675]">
          담당자: {elder.assignedWorkerName}
        </p>
      </div>

      <Link
        to={`/worker/elders/${elder.id}`}
        className="inline-flex min-h-12 items-center justify-center rounded-[16px] border border-[#0867f2] bg-white px-4 text-[16px] font-black leading-none text-[#0867f2] transition hover:bg-[#f3f8ff] active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff] min-[390px]:px-3"
        aria-label={`${elder.name} 상세 보기`}
      >
        상세 보기
      </Link>
    </article>
  )
}
