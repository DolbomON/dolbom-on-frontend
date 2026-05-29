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
      className="relative flex min-h-[190px] flex-col items-center rounded-[22px] border border-[#e7edf5] bg-white/95 px-2.5 pb-5 pt-4 text-center shadow-[0_18px_42px_rgba(47,82,133,0.12)] transition active:scale-[0.99] aria-pressed:border-[#0867f2] aria-pressed:bg-[#f4f9ff] aria-pressed:shadow-[0_20px_48px_rgba(5,101,242,0.17)] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[206px] min-[390px]:px-3 min-[390px]:pb-5 min-[390px]:pt-[18px]"
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
          className="absolute right-3 top-3 inline-grid h-7 w-7 place-items-center rounded-full bg-[#0867f2] text-white shadow-[0_8px_18px_rgba(8,103,242,0.2)]"
          aria-hidden="true"
        >
          <Check size={18} strokeWidth={3.4} />
        </span>
      ) : null}

      <span className="grid h-[86px] w-[106px] place-items-center min-[390px]:h-[98px] min-[390px]:w-[120px]">
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
        className="mt-3 text-[24px] font-black leading-[1.1] tracking-[-0.06em] text-[#050505] min-[390px]:mt-4 min-[390px]:text-[27px]"
        aria-hidden="true"
      >
        {role.title}
      </strong>
      <span
        className="mt-2 text-[14px] font-medium leading-[1.35] tracking-[-0.045em] text-[#5e6673] min-[390px]:text-[15px]"
        aria-hidden="true"
      >
        {role.description}
      </span>
    </button>
  )
}
