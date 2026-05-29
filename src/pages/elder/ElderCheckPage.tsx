import { useState } from 'react'
import { ElderCheckHeader } from '../../components/elder-check/ElderCheckHeader'
import { ElderProgress } from '../../components/elder-check/ElderProgress'
import {
  MedicationQuestionCard,
  type MedicationAnswer,
} from '../../components/elder-check/MedicationQuestionCard'
import { VoiceGuideButton } from '../../components/elder-check/VoiceGuideButton'
import { ElderBottomNav } from '../../components/layout/ElderBottomNav'

const voiceGuideText =
  '오늘 약을 드셨나요? 네, 먹었어요 또는 아직 못 먹었어요 중에서 선택해주세요.'

export function ElderCheckPage() {
  const [medicationTaken, setMedicationTaken] = useState<MedicationAnswer>(null)

  function handleMedicationAnswer(answer: Exclude<MedicationAnswer, null>) {
    setMedicationTaken(answer)
    // TODO: Save this answer and move to the next daily check step.
  }

  function handleNotificationClick() {
    // TODO: Open the notification center when notifications are implemented.
    console.info('Notifications are not implemented yet.')
  }

  function handleVoiceGuide() {
    // TODO: Connect this to the voice/TTS feature when it is ready.
    console.info(voiceGuideText)
  }

  function handleHelpClick() {
    // TODO: Navigate to /help when the help route is implemented.
    console.info('Help flow is not implemented yet.')
  }

  return (
    <main className="min-h-svh bg-[#edf5ff] text-[#080808]">
      <section
        className="mx-auto min-h-svh w-full max-w-[480px] overflow-hidden bg-[radial-gradient(circle_at_80%_22%,rgba(235,247,255,0.95)_0_15%,transparent_34%),linear-gradient(180deg,#ffffff_0%,#fbfdff_55%,#ffffff_100%)] px-5 pb-[calc(104px+env(safe-area-inset-bottom))] pt-7 shadow-[0_20px_80px_rgba(55,104,184,0.08)] min-[390px]:px-6"
        aria-label="복약 상태 입력 화면"
      >
        <ElderCheckHeader onNotificationClick={handleNotificationClick} />

        <section className="mt-10 min-[390px]:mt-12" aria-labelledby="greeting">
          <h1
            id="greeting"
            className="text-[37px] font-black leading-[1.13] tracking-[-0.075em] text-[#080808] min-[390px]:text-[48px]"
          >
            안녕하세요, 김영자님
          </h1>
          <p className="mt-2.5 text-[21px] font-semibold leading-[1.3] tracking-[-0.045em] text-[#6d7280] min-[390px]:text-[24px]">
            2024년 5월 16일 (목)
          </p>
        </section>

        <ElderProgress currentStep={1} totalSteps={5} />

        <MedicationQuestionCard
          answer={medicationTaken}
          onAnswer={handleMedicationAnswer}
        />

        <VoiceGuideButton onClick={handleVoiceGuide} />

        <ElderBottomNav activeItem="status" onHelpClick={handleHelpClick} />
      </section>
    </main>
  )
}
