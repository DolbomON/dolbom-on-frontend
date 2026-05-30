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
      className="grid min-h-[106px] w-full grid-cols-[76px_minmax(0,1fr)_28px] items-center gap-3 rounded-[18px] border border-[#e7ecf4] bg-white/95 px-4 py-3 text-left shadow-[0_12px_28px_rgba(64,97,142,0.1)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:min-h-[118px] min-[390px]:grid-cols-[92px_minmax(0,1fr)_30px] min-[390px]:px-4 min-[390px]:py-4"
    >
      <span className="grid h-[76px] w-[76px] place-items-center min-[390px]:h-[88px] min-[390px]:w-[92px]">
        <img
          src={item.imageSrc}
          alt=""
          width="1254"
          height="1254"
          className="max-h-[82px] max-w-[88px] object-contain min-[390px]:max-h-[98px] min-[390px]:max-w-[104px]"
          aria-hidden="true"
          draggable="false"
        />
      </span>

      <span className="grid min-w-0 gap-2">
        <strong className="text-[22px] font-black leading-tight text-[#070707] min-[390px]:whitespace-nowrap min-[390px]:text-[24px]">
          {item.title}
        </strong>
        <span className="text-[16px] font-medium leading-[1.42] text-[#68707c] min-[390px]:text-[18px]">
          {item.description}
        </span>
      </span>

      <ChevronRight
        aria-hidden="true"
        className="justify-self-end text-[#737b87]"
        size={30}
        strokeWidth={3}
      />
    </Link>
  )
}
