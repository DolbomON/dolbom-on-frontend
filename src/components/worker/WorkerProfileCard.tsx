import type { WorkerProfile } from '../../features/worker/workerMypageData'

type WorkerProfileCardProps = {
  profile: WorkerProfile
  onEditProfile: () => void
}

export function WorkerProfileCard({
  profile,
  onEditProfile,
}: WorkerProfileCardProps) {
  return (
    <article className="rounded-[28px] border border-[#dce7f6] bg-white p-4 shadow-[0_16px_34px_rgba(32,79,150,0.1)] min-[390px]:p-5">
      <div className="grid grid-cols-[92px_minmax(0,1fr)] gap-4 max-[359px]:grid-cols-1 max-[359px]:justify-items-center max-[359px]:text-center min-[410px]:grid-cols-[116px_minmax(0,1fr)]">
        <img
          src={profile.avatarSrc}
          alt={`${profile.name} 복지사 프로필 이미지`}
          className="h-[92px] w-[92px] rounded-full bg-[#e8f2ff] object-cover shadow-[0_10px_20px_rgba(8,103,242,0.1)] min-[410px]:h-[116px] min-[410px]:w-[116px]"
        />

        <div className="min-w-0 self-center">
          <div className="flex flex-col gap-3 min-[430px]:flex-row min-[430px]:items-start min-[430px]:justify-between">
            <div className="min-w-0">
              <h2 className="text-[27px] font-black leading-tight text-[#071747] min-[410px]:text-[31px]">
                {profile.name}
              </h2>
              <p className="mt-1 text-[16px] font-extrabold leading-snug text-[#1c2535] min-[410px]:text-[18px]">
                {profile.role}
              </p>
            </div>

            <button
              type="button"
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-[16px] border-2 border-[#0867f2] bg-white px-4 text-[16px] font-black text-[#0867f2] transition hover:bg-[#f3f8ff] active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff] max-[429px]:self-start max-[359px]:self-center"
              onClick={onEditProfile}
            >
              프로필 수정
            </button>
          </div>

          <p className="mt-4 text-[16px] font-semibold leading-snug text-[#405066] min-[410px]:text-[17px]">
            {profile.organization}
          </p>

          <p className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-[16px] font-semibold leading-snug text-[#405066] min-[410px]:text-[17px]">
            <span className="whitespace-nowrap">
              담당 대상자{' '}
              <strong className="font-black text-[#0867f2]">
                {profile.assignedCount}명
              </strong>
            </span>
            <span
              className="hidden text-[#8a95a6] min-[560px]:inline"
              aria-hidden="true"
            >
              ·
            </span>
            <span className="whitespace-nowrap">
              오늘 확인{' '}
              <strong className="font-black text-[#0867f2]">
                {profile.todayCheckCount}건
              </strong>
            </span>
          </p>

          <p className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-[15px] font-medium leading-snug text-[#59667a] min-[410px]:text-[16px]">
            <span className="break-all">{profile.email}</span>
            <span
              className="hidden text-[#8a95a6] min-[560px]:inline"
              aria-hidden="true"
            >
              ·
            </span>
            <span className="whitespace-nowrap">{profile.phone}</span>
          </p>
        </div>
      </div>
    </article>
  )
}
