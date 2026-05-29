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
      className="grid min-h-[103px] w-full grid-cols-[74px_1fr_22px] items-center gap-3 rounded-[21px] border border-[#e8edf5] bg-white/95 px-[18px] py-4 text-left shadow-[0_18px_45px_rgba(50,91,150,0.12)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:grid-cols-[82px_1fr_24px] min-[390px]:gap-4 min-[390px]:px-5"
    >
      <span className="grid h-[72px] w-[74px] place-items-center min-[390px]:w-[82px]">
        <img
          src={item.imageSrc}
          alt=""
          width="1254"
          height="1254"
          className="max-h-[72px] max-w-[82px] object-contain"
          aria-hidden="true"
          draggable="false"
        />
      </span>

      <span className="grid gap-2">
        <strong className="text-[24px] font-black leading-[1.1] tracking-[-0.055em] text-[#070707] min-[390px]:text-[27px]">
          {item.title}
        </strong>
        <span className="text-[15px] font-medium leading-[1.35] tracking-[-0.04em] text-[#68707c] min-[390px]:text-[16px]">
          {item.description}
        </span>
      </span>

      <ChevronRight
        aria-hidden="true"
        className="text-[#69717d]"
        size={34}
        strokeWidth={3.5}
      />
    </Link>
  )
}
