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
import { DolbomLogo } from '../../components/layout/DolbomLogo'
import type { TranslationKey } from '../../lib/i18n/translations'
import { useI18n } from '../../lib/i18n/useI18n'
import { cn } from '../../lib/utils'

type SosStatus = 'idle' | 'countdown' | 'sent' | 'cancelled'

const sosHistory = [
  {
    id: 'sos-20260604',
    resultKey: 'elder.sos.history.familyConfirmed',
    statusKey: 'elder.sos.history.completed',
    tone: 'completed',
    time: '2026.06.04 18:42',
    typeKey: 'elder.sos.history.realCall',
  },
  {
    id: 'sos-20260602',
    resultKey: 'elder.sos.history.cancelledWithin10',
    statusKey: 'elder.sos.history.falseAlarmCancelled',
    tone: 'cancelled',
    time: '2026.06.02 09:18',
    typeKey: 'elder.sos.history.falseAlarm',
  },
  {
    id: 'sos-20260529',
    resultKey: 'elder.sos.history.workerCallConfirmed',
    statusKey: 'elder.sos.history.completed',
    tone: 'completed',
    time: '2026.05.29 21:07',
    typeKey: 'elder.sos.history.realCall',
  },
] as const satisfies Array<{
  id: string
  resultKey: TranslationKey
  statusKey: TranslationKey
  time: string
  tone: 'cancelled' | 'completed'
  typeKey: TranslationKey
}>

export function ElderSosPage() {
  const { t } = useI18n()
  const [status, setStatus] = useState<SosStatus>('idle')
  const [locationMessage, setLocationMessage] = useState<{
    key: TranslationKey
    params?: Record<string, string>
  }>({ key: 'elder.sos.location.before' })

  const statusMessage = useMemo(() => {
    if (status === 'countdown') {
      return t('elder.sos.status.countdown')
    }

    if (status === 'sent') {
      return t('elder.sos.status.sent')
    }

    if (status === 'cancelled') {
      return t('elder.sos.status.cancelled')
    }

    return t('elder.sos.status.idle')
  }, [status, t])

  function requestLocation() {
    if (!navigator.geolocation) {
      setLocationMessage({ key: 'elder.sos.location.unsupported' })
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationMessage({
          key: 'elder.sos.location.confirmed',
          params: {
            latitude: position.coords.latitude.toFixed(4),
            longitude: position.coords.longitude.toFixed(4),
          },
        })
      },
      () => {
        setLocationMessage({ key: 'elder.sos.location.permissionDenied' })
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
        aria-label={t('elder.sos.aria')}
      >
        <header className="grid gap-3">
          <div className="flex items-center justify-between gap-3">
            <DolbomLogo ariaLabel={t('elder.home.logoAria')} to="/elder" />
            <span className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#ffe4e6] px-4 text-[15px] font-black text-[#be123c]">
              <ShieldAlert aria-hidden="true" size={20} />
              {t('elder.sos.priorityBadge')}
            </span>
          </div>

          <Link
            to="/elder"
            className="inline-flex min-h-11 w-fit items-center gap-2 rounded-lg px-2 text-[17px] font-black text-[#9f1239] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#fecdd3]"
          >
            <ArrowLeft aria-hidden="true" size={22} />
            {t('elder.sos.home')}
          </Link>
        </header>

        <section className="mt-6 text-center" aria-labelledby="sos-title">
          <p className="text-[20px] font-black text-[#be123c]">
            {t('elder.sos.category')}
          </p>
          <h1
            id="sos-title"
            className="mt-2 text-[44px] font-black leading-tight text-[#111827]"
          >
            {t('elder.sos.title')}
          </h1>
          <p className="mt-3 break-keep text-[19px] font-bold leading-snug text-[#4b5563]">
            {t('elder.sos.description')}
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
            aria-label={t('elder.sos.callAria')}
            onClick={startSos}
          >
            <span className="grid justify-items-center gap-2">
              <Siren aria-hidden="true" size={66} strokeWidth={2.8} />
              <strong className="text-[42px] font-black leading-none">
                SOS
              </strong>
              <span className="text-[18px] font-black">
                {t('elder.sos.emergencyReport')}
              </span>
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
          aria-label={t('elder.sos.controlsAria')}
        >
          <button
            type="button"
            className="inline-flex min-h-[58px] items-center justify-center gap-3 rounded-lg bg-[#be123c] px-5 text-[20px] font-black text-white shadow-[0_14px_26px_rgba(190,18,60,0.24)] transition hover:bg-[#9f1239] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#fda4af]"
            onClick={sendNow}
          >
            <BellRing aria-hidden="true" size={28} />
            {t('elder.sos.sendNow')}
          </button>

          <button
            type="button"
            className="inline-flex min-h-[54px] items-center justify-center gap-3 rounded-lg border-2 border-[#be123c] bg-white px-5 text-[19px] font-black text-[#be123c] transition hover:bg-[#fff1f2] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#fda4af]"
            disabled={status === 'sent'}
            onClick={cancelSos}
          >
            <XCircle aria-hidden="true" size={26} />
            {t('elder.sos.cancel')}
          </button>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg border border-[#d1d5db] bg-white px-4 text-[17px] font-black text-[#374151] transition hover:bg-[#f9fafb] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#fecdd3]"
              onClick={requestLocation}
            >
              <MapPin aria-hidden="true" size={23} />
              {t('elder.sos.checkLocation')}
            </button>
            <button
              type="button"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg border border-[#d1d5db] bg-white px-4 text-[17px] font-black text-[#374151] transition hover:bg-[#f9fafb] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#fecdd3]"
              onClick={startSos}
            >
              <Mic aria-hidden="true" size={23} />
              {t('elder.sos.voiceCall')}
            </button>
          </div>

          <p className="rounded-lg bg-white px-4 py-3 text-[15px] font-bold leading-snug text-[#4b5563]">
            {t(locationMessage.key, locationMessage.params)}
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
              {t('elder.sos.historyTitle')}
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
                    {t(item.typeKey)}
                  </strong>
                  <span
                    className={cn(
                      'inline-flex min-h-8 items-center gap-1.5 rounded-full px-3 text-[13px] font-black',
                      item.tone === 'completed'
                        ? 'bg-[#dcfce7] text-[#166534]'
                        : 'bg-[#fef3c7] text-[#92400e]',
                    )}
                  >
                    {item.tone === 'completed' ? (
                      <CheckCircle2 aria-hidden="true" size={17} />
                    ) : (
                      <XCircle aria-hidden="true" size={17} />
                    )}
                    {t(item.statusKey)}
                  </span>
                </div>
                <p className="mt-2 text-[15px] font-bold text-[#4b5563]">
                  {item.time}
                </p>
                <p className="mt-1 text-[15px] font-bold text-[#4b5563]">
                  {t(item.resultKey)}
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
          {t('elder.sos.call119')}
        </a>
      </section>
    </main>
  )
}
