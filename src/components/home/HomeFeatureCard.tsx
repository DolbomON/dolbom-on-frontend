import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export type HomeFeatureItem = {
  description: string
  imageSrc: string
  target: string
  title: string
}

type HomeFeatureCardProps = {
  item: HomeFeatureItem
}

export function HomeFeatureCard({ item }: HomeFeatureCardProps) {
  return (
    <Link
      to={item.target}
      className="grid min-h-[82px] w-full grid-rows-[38px_auto] justify-items-center gap-1 rounded-[18px] border border-[#e8edf5] bg-white/95 px-2 py-2 text-center shadow-[0_14px_28px_rgba(50,91,150,0.1)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[90px]"
    >
      <span className="grid h-[38px] w-[48px] place-items-center">
        <img
          src={item.imageSrc}
          alt=""
          width="1254"
          height="1254"
          className="max-h-[42px] max-w-[54px] object-contain"
          aria-hidden="true"
          draggable="false"
        />
      </span>

      <span className="grid gap-0.5">
        <strong className="text-[15px] font-black leading-[1.08] tracking-[-0.055em] text-[#070707] min-[390px]:text-[16px]">
          {item.title}
        </strong>
        <span className="hidden text-[13px] font-medium leading-[1.25] tracking-[-0.04em] text-[#68707c] min-[430px]:block">
          {item.description}
        </span>
      </span>

      <ChevronRight
        aria-hidden="true"
        className="hidden text-[#69717d]"
        size={24}
        strokeWidth={3}
      />
    </Link>
  )
}
