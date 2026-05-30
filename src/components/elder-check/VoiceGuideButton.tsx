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
        'flex min-h-[42px] items-center justify-center gap-2.5 border border-[#d9e8fb] bg-white/95 px-4 text-[17px] font-black tracking-[-0.045em] text-[#6ea5f7] shadow-[0_10px_22px_rgba(39,77,128,0.1),inset_0_1px_0_rgba(255,255,255,0.8)] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:text-[19px]',
        variant === 'full'
          ? 'mt-3 w-full rounded-[18px]'
          : 'mx-auto mt-1 min-w-[164px] rounded-full px-6 min-[390px]:min-w-[184px]',
      )}
      type="button"
      onClick={onClick}
    >
      <Volume2 size={24} strokeWidth={3.2} aria-hidden="true" />
      <span>음성 안내</span>
    </button>
  )
}
