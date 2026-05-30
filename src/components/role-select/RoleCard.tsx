import { Check } from 'lucide-react'

export type RoleOption<TRole extends string> = {
  description: string
  id: TRole
  imageSrc: string
  title: string
}

type RoleCardProps<TRole extends string> = {
  onSelect: () => void
  role: RoleOption<TRole>
  selected: boolean
}

export function RoleCard<TRole extends string>({
  onSelect,
  role,
  selected,
}: RoleCardProps<TRole>) {
  return (
    <button
      className="relative flex min-h-[128px] flex-col items-center rounded-[18px] border border-[#e7edf5] bg-white/95 px-2 pb-3 pt-3 text-center shadow-[0_14px_28px_rgba(47,82,133,0.1)] transition active:scale-[0.99] aria-pressed:border-[#0867f2] aria-pressed:bg-[#f4f9ff] aria-pressed:shadow-[0_16px_34px_rgba(5,101,242,0.15)] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[142px]"
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
    >
      <span className="sr-only">
        {selected ? '선택됨: ' : ''}
        {role.title}
      </span>
      {selected ? (
        <span
          className="absolute right-2 top-2 inline-grid h-6 w-6 place-items-center rounded-full bg-[#0867f2] text-white shadow-[0_8px_18px_rgba(8,103,242,0.2)]"
          aria-hidden="true"
        >
          <Check size={16} strokeWidth={3.4} />
        </span>
      ) : null}

      <span className="grid h-[58px] w-[78px] place-items-center min-[390px]:h-[66px] min-[390px]:w-[86px]">
        <img
          src={role.imageSrc}
          alt=""
          width="1254"
          height="1254"
          className="h-full w-full object-contain drop-shadow-[0_10px_14px_rgba(57,86,130,0.1)]"
          aria-hidden="true"
          draggable="false"
        />
      </span>

      <strong
        className="mt-2 text-[20px] font-black leading-[1.08] tracking-[-0.06em] text-[#050505] min-[390px]:text-[22px]"
        aria-hidden="true"
      >
        {role.title}
      </strong>
      <span
        className="mt-1 text-[12px] font-medium leading-[1.25] tracking-[-0.045em] text-[#5e6673] min-[390px]:text-[13px]"
        aria-hidden="true"
      >
        {role.description}
      </span>
    </button>
  )
}
