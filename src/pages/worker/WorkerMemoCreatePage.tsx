import { BookOpen, ClipboardPenLine } from 'lucide-react'
import { useMemo, useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ConsultationMethodSelector } from '../../components/worker/ConsultationMethodSelector'
import { MemoDateTimeField } from '../../components/worker/MemoDateTimeField'
import { MemoElderProfileCard } from '../../components/worker/MemoElderProfileCard'
import { MemoFollowUpSchedule } from '../../components/worker/MemoFollowUpSchedule'
import { MemoTextareaField } from '../../components/worker/MemoTextareaField'
import { WorkerBottomNav } from '../../components/worker/WorkerBottomNav'
import { WorkerMemoHeader } from '../../components/worker/WorkerMemoHeader'
import {
  caseMemoElders,
  defaultCaseMemoFormState,
  type CaseMemoFormState,
  type CaseMemoPayload,
} from '../../features/worker/caseMemoData'

const dayLabels = ['일', '월', '화', '수', '목', '금', '토']
function formatDate(value: string) {
  const [year = '', month = '', day = ''] = value.split('-')
  const date = new Date(`${value}T00:00:00`)
  const dayLabel = Number.isNaN(date.getTime())
    ? ''
    : ` (${dayLabels[date.getDay()]})`

  return `${year}.${month}.${day}${dayLabel}`
}

function formatDateTime(value: string) {
  const [date = '', time = ''] = value.split('T')

  return `${formatDate(date)} ${time}`
}

function WorkerMemoNotFound() {
  const navigate = useNavigate()

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#eef6ff] text-[#071747]">
      <div className="mx-auto min-h-svh w-full max-w-[480px] bg-[#f8fbff] shadow-[0_24px_70px_rgba(42,96,184,0.12)]">
        <WorkerMemoHeader onBack={() => navigate('/worker/elders')} />

        <div className="px-5 pb-[calc(112px+env(safe-area-inset-bottom))] pt-7">
          <section
            className="rounded-[28px] border border-[#dbe8ff] bg-white px-5 py-8 text-center shadow-[0_14px_28px_rgba(32,79,150,0.09)]"
            aria-labelledby="worker-memo-not-found-title"
          >
            <h1
              id="worker-memo-not-found-title"
              className="text-[30px] font-black leading-tight text-[#071747]"
            >
              대상자 정보를 찾을 수 없어요.
            </h1>
            <p className="mt-3 text-[17px] font-medium leading-snug text-[#4e596c]">
              대상자 목록에서 다시 선택해 주세요.
            </p>
            <Link
              to="/worker/elders"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-[16px] bg-[#0867f2] px-5 text-[17px] font-black text-white shadow-[0_12px_22px_rgba(8,103,242,0.22)] transition hover:bg-[#075fe0] active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
            >
              대상자 목록으로 돌아가기
            </Link>
          </section>
        </div>
      </div>

      <WorkerBottomNav />
    </main>
  )
}

export function WorkerMemoCreatePage() {
  const { elderId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [showGuide, setShowGuide] = useState(false)
  const [memoContentError, setMemoContentError] = useState('')
  const [formState, setFormState] = useState<CaseMemoFormState>(() => ({
    ...defaultCaseMemoFormState,
    elderId: elderId ?? '',
  }))

  const elder = useMemo(
    () => caseMemoElders.find((item) => item.id === elderId),
    [elderId],
  )

  if (!elder || !elderId) {
    return <WorkerMemoNotFound />
  }

  const detailPath = `/worker/elders/${elderId}`

  const navigateToDetail = () => {
    navigate(detailPath)
  }

  const handleBack = () => {
    const locationState = location.state as {
      fromWorkerElderDetail?: boolean
    } | null

    if (locationState?.fromWorkerElderDetail) {
      navigate(-1)
      return
    }

    navigateToDetail()
  }

  const updateFormState = <Key extends keyof CaseMemoFormState>(
    key: Key,
    value: CaseMemoFormState[Key],
  ) => {
    setFormState((current) => ({
      ...current,
      [key]: value,
    }))
  }

  const handleMemoContentChange = (value: string) => {
    updateFormState('memoContent', value)

    if (value.trim()) {
      setMemoContentError('')
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!formState.memoContent.trim()) {
      setMemoContentError('상담 내용을 입력해주세요.')
      return
    }

    const payload: CaseMemoPayload = {
      ...formState,
      createdAt: new Date().toISOString(),
      createdBy: elder.assignedWorkerName,
    }

    // TODO: Send payload to the case memo API when backend saving is available.
    void payload

    navigateToDetail()
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#eef6ff] text-[#071747]">
      <div className="mx-auto min-h-svh w-full max-w-[480px] bg-[#f8fbff] shadow-[0_24px_70px_rgba(42,96,184,0.12)]">
        <WorkerMemoHeader onBack={handleBack} />

        <form
          className="px-5 pb-[calc(112px+env(safe-area-inset-bottom))] pt-7"
          onSubmit={handleSubmit}
          noValidate
        >
          <section aria-labelledby="worker-memo-create-title">
            <div className="flex flex-col gap-4 min-[390px]:flex-row min-[390px]:items-start min-[390px]:justify-between">
              <div className="min-w-0">
                <h1
                  id="worker-memo-create-title"
                  className="text-[34px] font-black leading-tight text-[#071747]"
                >
                  상담 메모 작성
                </h1>
                <p className="mt-4 text-[17px] font-medium leading-snug text-[#4e596c]">
                  상담 내용을 기록하고 다음 계획을 남겨주세요.
                </p>
              </div>

              {/* TODO: Replace inline guide with the memo writing guide modal when that shared pattern exists. */}
              <button
                type="button"
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 self-end rounded-[16px] border border-[#c6dcff] bg-white px-4 text-[16px] font-black text-[#0867f2] transition hover:bg-[#f3f8ff] active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff] min-[390px]:self-start"
                aria-expanded={showGuide}
                aria-controls="memo-writing-guide"
                onClick={() => setShowGuide((current) => !current)}
              >
                <BookOpen
                  aria-hidden="true"
                  className="h-6 w-6"
                  strokeWidth={2.8}
                />
                작성 가이드
              </button>
            </div>

            {showGuide && (
              <div
                id="memo-writing-guide"
                className="mt-4 rounded-[20px] border border-[#cfe1ff] bg-[#f3f8ff] px-4 py-3 text-[15px] font-semibold leading-relaxed text-[#31527f]"
              >
                상담에서 확인한 변화, 즉시 조치한 내용, 다음 확인 일정을 짧고
                구체적으로 남겨주세요.
              </div>
            )}
          </section>

          <div className="mt-7">
            <MemoElderProfileCard elder={elder} />
          </div>

          <div className="mt-4">
            <ConsultationMethodSelector
              value={formState.method}
              onChange={(method) => updateFormState('method', method)}
            />
          </div>

          <div className="mt-4">
            <MemoDateTimeField
              label="상담 일시"
              valueText={formatDateTime(formState.consultationDateTime)}
            />
          </div>

          <section
            className="mt-4 rounded-[24px] border border-[#e3e9f2] bg-white p-4 shadow-[0_14px_30px_rgba(32,79,150,0.1)]"
            aria-label="상담 메모 입력"
          >
            <MemoTextareaField
              id="memo-content"
              label="상담 내용"
              maxLength={500}
              value={formState.memoContent}
              onChange={handleMemoContentChange}
              placeholder="오늘 어르신과 나눈 내용을 입력해주세요."
              errorMessage={memoContentError}
            />

            <div className="mt-6">
              <MemoTextareaField
                id="action-notes"
                label="조치 사항"
                maxLength={500}
                value={formState.actionNotes}
                onChange={(value) => updateFormState('actionNotes', value)}
                placeholder="취한 조치나 필요한 지원 내용을 입력해주세요."
              />
            </div>

            <div className="mt-7">
              <MemoFollowUpSchedule
                dateText={formatDate(formState.nextFollowUpDate)}
                timeText={formState.nextFollowUpTime}
              />
            </div>
          </section>

          <div className="mt-4 flex items-center gap-3 rounded-[16px] bg-[#eaf3ff] px-4 py-3 text-[#31527f]">
            <ClipboardPenLine
              aria-hidden="true"
              className="h-6 w-6 shrink-0 text-[#0867f2]"
              strokeWidth={2.6}
            />
            <p className="text-[15px] font-semibold leading-snug">
              메모는 담당팀과 공유되며, 어르신의 돌봄 관리에 활용됩니다.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-[0.9fr_2fr] gap-3 max-[359px]:grid-cols-1">
            <button
              type="button"
              className="min-h-14 rounded-[16px] border border-[#0867f2] bg-white px-4 text-[19px] font-black text-[#0867f2] transition hover:bg-[#f3f8ff] active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
              onClick={navigateToDetail}
            >
              취소
            </button>

            <button
              type="submit"
              className="min-h-14 rounded-[16px] bg-[#0867f2] px-4 text-[19px] font-black text-white shadow-[0_12px_22px_rgba(8,103,242,0.24)] transition hover:bg-[#075fe0] active:scale-[0.99] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
            >
              저장하기
            </button>
          </div>
        </form>
      </div>

      <WorkerBottomNav />
    </main>
  )
}
