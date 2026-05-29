import { Mic } from 'lucide-react'

type VoiceGuideButtonProps = {
  onClick: () => void
}

export function VoiceGuideButton({ onClick }: VoiceGuideButtonProps) {
  return (
    <button
      className="mt-4 flex min-h-[59px] w-full items-center justify-center gap-4 rounded-[21px] border border-[#e8edf5] bg-white/95 px-5 text-[23px] font-black tracking-[-0.05em] text-[#0867f2] shadow-[0_12px_28px_rgba(39,77,128,0.11),inset_0_1px_0_rgba(255,255,255,0.8)] transition active:scale-[0.985] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8bbcff] min-[390px]:text-[25px]"
      type="button"
      onClick={onClick}
    >
      <Mic size={36} strokeWidth={3.4} aria-hidden="true" />
      <span>음성 안내</span>
    </button>
  )
}
