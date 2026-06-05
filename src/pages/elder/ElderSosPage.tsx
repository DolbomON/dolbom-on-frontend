import {
  ArrowLeft,
  BellRing,
  CheckCircle2,
  Clock3,
  MapPin,
  Mic,
  PhoneCall,
  ShieldAlert,
  Siren,
  XCircle,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

type SosStatus = 'idle' | 'countdown' | 'sent' | 'cancelled'

const sosHistory = [
  {
    id: 'sos-20260604',
    result: '가족 확인 완료',
    status: '대응 완료',
    time: '2026.06.04 18:42',
    type: '실제 호출',
  },
  {
    id: 'sos-20260602',
    result: '10초 내 취소됨',
    status: '오작동 취소',
    time: '2026.06.02 09:18',
    type: '오작동',
  },
  {
    id: 'sos-20260529',
    result: '복지사 전화 확인',
    status: '대응 완료',
    time: '2026.05.29 21:07',
    type: '실제 호출',
  },
] as const

export function ElderSosPage() {
  const [status, setStatus] = useState<SosStatus>('idle')
  const [locationMessage, setLocationMessage] =
    useState('현재 위치 확인 전입니다.')

  const statusMessage = useMemo(() => {
    if (status === 'countdown') {
      return '긴급 알림 발송 대기 중입니다. 오작동이면 지금 취소할 수 있어요.'
    }

    if (status === 'sent') {
      return '긴급 알림이 가족과 복지사에게 최우선으로 발송되었습니다.'
    }

    if (status === 'cancelled') {
      return 'SOS 호출이 오작동으로 취소되었습니다.'
    }

    return '대형 버튼 또는 음성으로 긴급 SOS를 호출할 수 있어요.'
  }, [status])

  function requestLocation() {
    if (!navigator.geolocation) {
      setLocationMessage('이 브라우저에서는 위치 확인을 지원하지 않아요.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationMessage(
          `위치 확인됨: 위도 ${position.coords.latitude.toFixed(
            4,
          )}, 경도 ${position.coords.longitude.toFixed(4)}`,
        )
      },
      () => {
        setLocationMessage(
          '위치 권한이 없어 등록 주소 기준으로 알림을 보냅니다.',
        )
      },
      { enableHighAccuracy: true, timeout: 5000 },
    )
  }

  function startSos() {
    setStatus('countdown')
  }

  function sendNow() {
    setStatus('sent')
  }

  function cancelSos() {
    setStatus('cancelled')
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#fff5f5] text-[#071747]">
      <section
        className="mx-auto flex min-h-svh w-full max-w-[520px] flex-col bg-white px-5 pb-[max(18px,env(safe-area-inset-bottom))] pt-[max(16px,env(safe-area-inset-top))] shadow-[0_20px_80px_rgba(160,40,40,0.12)]"
        aria-label="긴급 SOS 화면"
      >
        <header className="flex items-center justify-between gap-3">
          <Link
            to="/elder"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-[17px] font-black text-[#9f1239] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#fecdd3]"
          >
            <ArrowLeft aria-hidden="true" size={22} />
            홈으로
          </Link>
          <span className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#ffe4e6] px-4 text-[15px] font-black text-[#be123c]">
            <ShieldAlert aria-hidden="true" size={20} />
            최우선 알림
          </span>
        </header>

        <section className="mt-6 text-center" aria-labelledby="sos-title">
          <p className="text-[20px] font-black text-[#be123c]">응급 대응</p>
          <h1
            id="sos-title"
            className="mt-2 text-[44px] font-black leading-tight text-[#111827]"
          >
            긴급 SOS
          </h1>
          <p className="mt-3 break-keep text-[19px] font-bold leading-snug text-[#4b5563]">
            도움이 필요하면 아래 버튼을 크게 눌러주세요.
          </p>
        </section>

        <section className="mt-7 grid justify-items-center">
          <button
            type="button"
            className={cn(
              'grid h-[220px] w-[220px] place-items-center rounded-full border-[10px] text-white shadow-[0_26px_55px_rgba(190,18,60,0.34)] transition active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#fda4af]',
              status === 'sent'
                ? 'border-[#fecdd3] bg-[#16a34a]'
                : 'border-[#fecdd3] bg-[#dc2626] hover:bg-[#be123c]',
            )}
            aria-label="긴급 SOS 호출"
            onClick={startSos}
          >
            <span className="grid justify-items-center gap-2">
              <Siren aria-hidden="true" size={66} strokeWidth={2.8} />
              <strong className="text-[42px] font-black leading-none">
                SOS
              </strong>
              <span className="text-[18px] font-black">긴급 신고</span>
            </span>
          </button>

          <p
            className="mt-5 rounded-[18px] border border-[#fecdd3] bg-[#fff1f2] px-5 py-4 text-center text-[18px] font-black leading-snug text-[#9f1239]"
            role="status"
          >
            {statusMessage}
          </p>
        </section>

        <section
          className="mt-5 grid gap-3 rounded-[18px] border border-[#fee2e2] bg-[#fffafa] p-4"
          aria-label="SOS 조작"
        >
          <button
            type="button"
            className="inline-flex min-h-[58px] items-center justify-center gap-3 rounded-lg bg-[#be123c] px-5 text-[20px] font-black text-white shadow-[0_14px_26px_rgba(190,18,60,0.24)] transition hover:bg-[#9f1239] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#fda4af]"
            onClick={sendNow}
          >
            <BellRing aria-hidden="true" size={28} />
            지금 바로 알림 발송
          </button>

          <button
            type="button"
            className="inline-flex min-h-[54px] items-center justify-center gap-3 rounded-lg border-2 border-[#be123c] bg-white px-5 text-[19px] font-black text-[#be123c] transition hover:bg-[#fff1f2] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#fda4af]"
            disabled={status === 'sent'}
            onClick={cancelSos}
          >
            <XCircle aria-hidden="true" size={26} />
            오작동 취소
          </button>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg border border-[#d1d5db] bg-white px-4 text-[17px] font-black text-[#374151] transition hover:bg-[#f9fafb] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#fecdd3]"
              onClick={requestLocation}
            >
              <MapPin aria-hidden="true" size={23} />
              위치 확인
            </button>
            <button
              type="button"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg border border-[#d1d5db] bg-white px-4 text-[17px] font-black text-[#374151] transition hover:bg-[#f9fafb] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#fecdd3]"
              onClick={startSos}
            >
              <Mic aria-hidden="true" size={23} />
              음성으로 SOS 호출
            </button>
          </div>

          <p className="rounded-lg bg-white px-4 py-3 text-[15px] font-bold leading-snug text-[#4b5563]">
            {locationMessage}
          </p>
        </section>

        <section
          className="mt-5 rounded-[18px] border border-[#e5e7eb] bg-white p-4"
          aria-labelledby="sos-history-title"
        >
          <div className="flex items-center justify-between gap-3">
            <h2
              id="sos-history-title"
              className="text-[24px] font-black text-[#111827]"
            >
              SOS 호출 이력
            </h2>
            <Clock3 aria-hidden="true" className="h-7 w-7 text-[#6b7280]" />
          </div>

          <ol className="mt-4 grid gap-3">
            {sosHistory.map((item) => (
              <li
                key={item.id}
                className="rounded-lg border border-[#e5e7eb] bg-[#f9fafb] px-4 py-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong className="text-[17px] font-black text-[#111827]">
                    {item.type}
                  </strong>
                  <span
                    className={cn(
                      'inline-flex min-h-8 items-center gap-1.5 rounded-full px-3 text-[13px] font-black',
                      item.status === '대응 완료'
                        ? 'bg-[#dcfce7] text-[#166534]'
                        : 'bg-[#fef3c7] text-[#92400e]',
                    )}
                  >
                    {item.status === '대응 완료' ? (
                      <CheckCircle2 aria-hidden="true" size={17} />
                    ) : (
                      <XCircle aria-hidden="true" size={17} />
                    )}
                    {item.status}
                  </span>
                </div>
                <p className="mt-2 text-[15px] font-bold text-[#4b5563]">
                  {item.time}
                </p>
                <p className="mt-1 text-[15px] font-bold text-[#4b5563]">
                  {item.result}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <a
          href="tel:119"
          className="mt-5 inline-flex min-h-[58px] items-center justify-center gap-3 rounded-lg border-2 border-[#991b1b] bg-white px-5 text-[20px] font-black text-[#991b1b] transition hover:bg-[#fef2f2] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#fda4af]"
        >
          <PhoneCall aria-hidden="true" size={26} />
          119 전화 연결
        </a>
      </section>
    </main>
  )
}
