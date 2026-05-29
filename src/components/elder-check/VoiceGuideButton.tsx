import { Volume2 } from 'lucide-react'
import { cn } from '../../lib/utils'

type VoiceGuideButtonProps = {
  onClick: () => void
  variant?: 'full' | 'pill'
}

export function VoiceGuideButton({
  onClick,
  variant = 'full',
}: VoiceGuideButtonProps) {
  return (
    <button
      className={cn(
        'flex min-h-[59px] items-center justify-center gap-3.5 border border-[#d9e8fb] bg-white/95 px-5 text-[23px] font-black tracking-[-0.045em] text-[#6ea5f7] shadow-[0_12px_28px_rgba(39,77,128,0.11),inset_0_1px_0_rgba(255,255,255,0.8)] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:text-[25px]',
        variant === 'full'
          ? 'mt-4 w-full rounded-[21px]'
          : 'mx-auto mt-5 min-w-[202px] rounded-full px-7 min-[390px]:min-w-[234px]',
      )}
      type="button"
      onClick={onClick}
    >
      <Volume2 size={36} strokeWidth={3.4} aria-hidden="true" />
      <span>음성 안내</span>
    </button>
  )
}
