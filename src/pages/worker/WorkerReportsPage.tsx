import {
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Download,
  Info,
  Printer,
  Share2,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Map as LeafletMap } from 'leaflet'
import { WorkerTopBar } from '../../components/worker/WorkerTopBar'
import {
  createWorkerReportPdf,
  downloadPdfFile,
} from '../../features/worker/workerReportPdf'

const welfareAssetBase = '/assets/dolbomon/welfare'
const reportDateRangeLabel = '2024.05.13 (월) ~ 2024.05.19 (일)'
const reportDateRangeAriaLabel =
  '보고서 기간 2024년 5월 13일 월요일부터 2024년 5월 19일 일요일까지'
const reportPdfFileName = 'dolbom-on-worker-report-2024-05-13-2024-05-19.pdf'

type MetricCard = {
  delta: string
  iconSrc: string
  id: string
  label: string
  unit: string
  value: string
}

type TrendSeries = {
  color: string
  id: string
  label: string
  values: number[]
}

type ServiceLink = {
  color: string
  count: number
  iconSrc: string
  id: string
  label: string
  percent: string
}

type InstitutionStat = {
  count: number
  label: string
}

type RegionStat = {
  count: number
  coordinates: [number, number]
  fillColor: string
  label: string
}

const metricCards: MetricCard[] = [
  {
    delta: '+3명',
    iconSrc: `${welfareAssetBase}/사람.png`,
    id: 'elders',
    label: '총 관리 어르신',
    unit: '명',
    value: '48',
  },
  {
    delta: '+4건',
    iconSrc: `${welfareAssetBase}/채팅.png`,
    id: 'consultations',
    label: '이번 주 상담 건수',
    unit: '건',
    value: '28',
  },
  {
    delta: '+2건',
    iconSrc: `${welfareAssetBase}/집.png`,
    id: 'services',
    label: '서비스 연계 건수',
    unit: '건',
    value: '16',
  },
  {
    delta: '+1건',
    iconSrc: `${welfareAssetBase}/경고.png`,
    id: 'risks',
    label: '위험 대응 건수',
    unit: '건',
    value: '5',
  },
]

const trendLabels = [
  '05.13 (월)',
  '05.14 (화)',
  '05.15 (수)',
  '05.16 (목)',
  '05.17 (금)',
  '05.18 (토)',
  '05.19 (일)',
]

const trendSeries: TrendSeries[] = [
  {
    color: '#0867f2',
    id: 'consultation',
    label: '상담 진행',
    values: [20, 25, 33, 28, 30, 16, 11],
  },
  {
    color: '#31b329',
    id: 'visit',
    label: '방문 활동',
    values: [11, 14, 17, 16, 18, 10, 7],
  },
  {
    color: '#8f42f3',
    id: 'service',
    label: '서비스 연계',
    values: [5, 7, 10, 11, 9, 6, 5],
  },
  {
    color: '#ff293d',
    id: 'risk',
    label: '위험 대응',
    values: [1, 2, 3, 3, 4, 2, 3],
  },
]

const serviceLinks: ServiceLink[] = [
  {
    color: '#0867f2',
    count: 6,
    iconSrc: `${welfareAssetBase}/식사.png`,
    id: 'meal',
    label: '식사 지원',
    percent: '37.5%',
  },
  {
    color: '#31b329',
    count: 4,
    iconSrc: `${welfareAssetBase}/차.png`,
    id: 'hospital',
    label: '병원 동행',
    percent: '25.0%',
  },
  {
    color: '#8f42f3',
    count: 3,
    iconSrc: `${welfareAssetBase}/정서.png`,
    id: 'emotion',
    label: '정서 지원',
    percent: '18.8%',
  },
  {
    color: '#ff9f20',
    count: 2,
    iconSrc: `${welfareAssetBase}/보안.png`,
    id: 'safety',
    label: '안전 확인',
    percent: '12.5%',
  },
]

const doughnutLegend = [
  ...serviceLinks,
  {
    color: '#c5ceda',
    count: 1,
    iconSrc: '',
    id: 'etc',
    label: '기타',
    percent: '6.3%',
  },
]

const reportSummaryRows = [
  {
    iconSrc: `${welfareAssetBase}/채팅.png`,
    text: '이번 주 상담은 28건으로 전주 대비 4건 증가했습니다.',
  },
  {
    iconSrc: `${welfareAssetBase}/집.png`,
    text: '서비스 연계는 총 16건, 식사 지원 비율이 가장 높았습니다.',
  },
  {
    iconSrc: `${welfareAssetBase}/경고.png`,
    text: '위험 대응은 5건으로, 신속한 조치가 이루어졌습니다.',
  },
]

const institutionStats: InstitutionStat[] = [
  { count: 18, label: '행복복지관' },
  { count: 13, label: '사랑복지센터' },
  { count: 9, label: '나눔복지관' },
  { count: 7, label: '희망복지센터' },
  { count: 4, label: '온누리복지관' },
]

const regionStats: RegionStat[] = [
  {
    coordinates: [37.5665, 126.978],
    count: 6,
    fillColor: '#0867f2',
    label: '중앙동',
  },
  {
    coordinates: [37.5907, 126.982],
    count: 4,
    fillColor: '#31b329',
    label: '북부동',
  },
  {
    coordinates: [37.5652, 127.016],
    count: 3,
    fillColor: '#8f42f3',
    label: '동부동',
  },
  {
    coordinates: [37.5588, 126.944],
    count: 2,
    fillColor: '#ff9f20',
    label: '서부동',
  },
  {
    coordinates: [37.5368, 126.981],
    count: 1,
    fillColor: '#ff293d',
    label: '남부동',
  },
]

const regionMapCenter: [number, number] = [37.565, 126.986]

const reportActionButtons = [
  { icon: Download, id: 'pdf', label: 'PDF 저장' },
  { icon: Printer, id: 'print', label: '인쇄' },
  { icon: Share2, id: 'share', label: '공유' },
] as const

type ReportActionId = (typeof reportActionButtons)[number]['id']

function PanelHeader({
  actionLabel,
  id,
  showInfo,
  title,
}: {
  actionLabel?: string
  id: string
  showInfo?: boolean
  title: string
}) {
  return (
    <div className="flex min-w-0 flex-wrap items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2">
        <h2
          id={id}
          className="break-keep text-[18px] font-black leading-tight text-[#071747]"
        >
          {title}
        </h2>
        {showInfo ? (
          <Info
            aria-label={`${title} 안내`}
            className="h-[18px] w-[18px] shrink-0 text-[#9aa8be]"
            strokeWidth={2.5}
          />
        ) : null}
      </div>

      {actionLabel ? (
        <Link
          to="/worker/reports"
          className="inline-flex min-h-8 items-center gap-1 rounded-lg px-2 text-[13px] font-black text-[#0867f2] transition hover:bg-[#f1f6ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          {actionLabel}
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      ) : null}
    </div>
  )
}

function MetricSummaryCard({ metric }: { metric: MetricCard }) {
  return (
    <article
      className="grid min-h-[142px] grid-cols-[82px_minmax(0,1fr)] items-center gap-3 rounded-[14px] border border-[#dfe8f5] bg-white px-6 py-4 shadow-[0_12px_26px_rgba(37,72,125,0.08)]"
      aria-label={`${metric.label} ${metric.value}${metric.unit}, 전주 대비 ${metric.delta}`}
    >
      <img
        src={metric.iconSrc}
        alt=""
        className="h-[78px] w-[78px] object-contain"
        draggable="false"
      />
      <div className="min-w-0 text-center">
        <h2 className="text-[16px] font-black leading-tight text-[#071747]">
          {metric.label}
        </h2>
        <p className="mt-2 whitespace-nowrap text-[#071747]">
          <strong className="text-[42px] font-black leading-none tracking-normal">
            {metric.value}
          </strong>
          <span className="ml-1 text-[17px] font-black">{metric.unit}</span>
        </p>
        <p className="mt-1 inline-flex items-center gap-2 whitespace-nowrap text-[12px] font-bold leading-tight text-[#6f7f9b]">
          전주 대비
          <strong className="text-[13px] font-black text-[#071747]">
            {metric.delta}
          </strong>
          <span className="text-[#0867f2]" aria-hidden="true">
            ▲
          </span>
        </p>
      </div>
    </article>
  )
}

function makePath(values: number[]) {
  const width = 720
  const height = 160
  const left = 42
  const right = 22
  const top = 8
  const bottom = 28
  const maxValue = 40
  const plotWidth = width - left - right
  const plotHeight = height - top - bottom

  return values
    .map((value, index) => {
      const x = left + (plotWidth / (values.length - 1)) * index
      const y = top + plotHeight - (value / maxValue) * plotHeight

      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(' ')
}

function getPoint(value: number, index: number, length: number) {
  const width = 720
  const height = 160
  const left = 42
  const right = 22
  const top = 8
  const bottom = 28
  const maxValue = 40
  const plotWidth = width - left - right
  const plotHeight = height - top - bottom

  return {
    x: left + (plotWidth / (length - 1)) * index,
    y: top + plotHeight - (value / maxValue) * plotHeight,
  }
}

function WeeklyTrendChart() {
  const horizontalGrid = [0, 10, 20, 30, 40]

  return (
    <section
      className="min-w-0 rounded-[16px] border border-[#dfe8f5] bg-white px-5 py-3 shadow-[0_12px_26px_rgba(37,72,125,0.08)]"
      aria-labelledby="weekly-trend-title"
    >
      <PanelHeader
        id="weekly-trend-title"
        showInfo
        title="주간 상담 및 서비스 추이"
      />

      <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
        <ul
          className="flex flex-wrap gap-x-8 gap-y-2 text-[12px] font-bold text-[#17264a]"
          aria-label="차트 범례"
        >
          {trendSeries.map((series) => (
            <li key={series.id} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: series.color }}
                aria-hidden="true"
              />
              {series.label}
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="inline-flex min-h-9 min-w-[100px] items-center justify-center gap-2 rounded-lg border border-[#dfe8f5] bg-white px-4 text-[13px] font-black text-[#071747] shadow-[0_7px_16px_rgba(37,72,125,0.05)] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
          aria-label="차트 기간 주간"
        >
          주간
          <ChevronDown aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-1 overflow-x-auto">
        <svg
          className="h-[160px] min-w-[720px] overflow-visible"
          role="img"
          viewBox="0 0 720 160"
          aria-labelledby="weekly-trend-chart-title"
        >
          <title id="weekly-trend-chart-title">
            2024년 5월 13일부터 19일까지 상담 진행, 방문 활동, 서비스 연계, 위험
            대응 추이
          </title>
          {horizontalGrid.map((value) => {
            const y = 132 - (value / 40) * 124

            return (
              <g key={value}>
                <line
                  x1="42"
                  x2="698"
                  y1={y}
                  y2={y}
                  stroke="#e5edf7"
                  strokeWidth="1"
                />
                <text
                  x="16"
                  y={y + 4}
                  fill="#27385a"
                  fontSize="12"
                  fontWeight="700"
                >
                  {value}
                </text>
              </g>
            )
          })}

          {trendLabels.map((label, index) => {
            const x = 42 + (656 / (trendLabels.length - 1)) * index

            return (
              <text
                key={label}
                x={x}
                y="154"
                fill="#27385a"
                fontSize="12"
                fontWeight="700"
                textAnchor="middle"
              >
                {label}
              </text>
            )
          })}

          {trendSeries.map((series) => (
            <g key={series.id}>
              <path
                d={makePath(series.values)}
                fill="none"
                stroke={series.color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              {series.values.map((value, index) => {
                const point = getPoint(value, index, series.values.length)

                return (
                  <circle
                    key={`${series.id}-${index}`}
                    cx={point.x}
                    cy={point.y}
                    r="5"
                    fill={series.color}
                    stroke="white"
                    strokeWidth="2"
                  />
                )
              })}
            </g>
          ))}
        </svg>
      </div>
    </section>
  )
}

function ServiceRatioPanel() {
  return (
    <section
      className="min-w-0 rounded-[16px] border border-[#dfe8f5] bg-white px-5 py-3 shadow-[0_12px_26px_rgba(37,72,125,0.08)]"
      aria-labelledby="service-ratio-title"
    >
      <PanelHeader id="service-ratio-title" showInfo title="서비스 연계 비율" />

      <div className="mt-3 grid gap-5 md:grid-cols-[210px_minmax(0,1fr)] md:items-center">
        <div className="relative mx-auto grid h-[190px] w-[190px] place-items-center">
          <div
            className="absolute inset-0 rounded-full shadow-[inset_0_-8px_0_rgba(7,23,71,0.08)]"
            style={{
              background:
                'conic-gradient(#2f86ff 0 37.5%, #5ec747 37.5% 62.5%, #9a55ed 62.5% 81.3%, #ffad30 81.3% 93.8%, #c8d0da 93.8% 100%)',
            }}
            aria-hidden="true"
          />
          <div className="relative grid h-[98px] w-[98px] place-items-center rounded-full bg-white text-center shadow-[0_10px_24px_rgba(37,72,125,0.1)]">
            <span className="text-[13px] font-bold text-[#425371]">
              총 연계 건수
            </span>
            <strong className="mt-[-14px] text-[29px] font-black leading-none text-[#071747]">
              16건
            </strong>
          </div>
        </div>

        <dl className="grid gap-3">
          {doughnutLegend.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[12px_minmax(0,1fr)_auto] items-center gap-3 text-[13px] font-bold"
            >
              <dt className="contents">
                <span
                  className="h-3 w-3 rounded-full shadow-[0_2px_5px_rgba(37,72,125,0.18)]"
                  style={{ backgroundColor: item.color }}
                  aria-hidden="true"
                />
                <span className="text-[#17264a]">{item.label}</span>
              </dt>
              <dd className="whitespace-nowrap text-[#071747]">
                {item.percent}
                <span className="ml-1 text-[#667a9d]">({item.count}건)</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function ServiceLinkStatusPanel() {
  return (
    <section
      className="min-w-0 rounded-[16px] border border-[#dfe8f5] bg-white px-5 py-2 shadow-[0_12px_26px_rgba(37,72,125,0.07)]"
      aria-labelledby="service-link-status-title"
    >
      <PanelHeader
        actionLabel="전체 서비스 연계 보기"
        id="service-link-status-title"
        title="서비스 연계 현황"
      />

      <div className="mt-1.5 grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {serviceLinks.map((service) => (
          <article
            key={service.id}
            className="grid min-h-[64px] grid-cols-[50px_minmax(0,1fr)] items-center gap-3 rounded-[12px] border border-[#dfe8f5] bg-white px-3 py-1.5 shadow-[0_7px_16px_rgba(37,72,125,0.04)]"
            aria-label={`${service.label} ${service.count}건, 전체 16건 중 ${service.percent}`}
          >
            <img
              src={service.iconSrc}
              alt=""
              className="h-[44px] w-[44px] object-contain"
              draggable="false"
            />
            <div className="min-w-0">
              <h3 className="truncate text-[14px] font-black leading-tight text-[#071747]">
                {service.label}
              </h3>
              <p className="mt-1 whitespace-nowrap text-[12px] font-black text-[#071747]">
                <strong className="text-[17px] leading-none">
                  {service.count}건
                </strong>
                <span className="ml-1 text-[#6f7f9b]">/ 16건</span>
              </p>
              <div
                className="mt-1.5 h-2 overflow-hidden rounded-full bg-[#e7eef8]"
                aria-hidden="true"
              >
                <span
                  className="block h-full rounded-full"
                  style={{
                    backgroundColor: service.color,
                    width: service.percent,
                  }}
                />
              </div>
              <p className="mt-1 text-[11px] font-bold text-[#5f6f8e]">
                {service.percent}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function WeeklyReportSummaryPanel() {
  return (
    <section
      className="grid min-h-[178px] gap-3 rounded-[16px] border border-[#dfe8f5] bg-white px-5 py-2.5 shadow-[0_12px_26px_rgba(37,72,125,0.07)] md:grid-cols-[minmax(0,1fr)_120px] md:items-center"
      aria-labelledby="weekly-report-summary-title"
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <h2
            id="weekly-report-summary-title"
            className="text-[20px] font-black leading-tight text-[#071747]"
          >
            주간 리포트 요약
          </h2>
          <span className="rounded-lg bg-[#edf5ff] px-3 py-1 text-[12px] font-black text-[#0867f2]">
            2024.05.13 ~ 05.19
          </span>
        </div>

        <ul className="mt-2 grid gap-2.5">
          {reportSummaryRows.map((row) => (
            <li
              key={row.text}
              className="grid grid-cols-[26px_minmax(0,1fr)] items-start gap-2.5 text-[12px] font-bold leading-snug text-[#17264a]"
            >
              <img
                src={row.iconSrc}
                alt=""
                className="h-6 w-6 object-contain"
                draggable="false"
              />
              <span className="break-keep">{row.text}</span>
            </li>
          ))}
        </ul>

        <Link
          to="/worker/reports"
          className="mt-2.5 inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#0867f2] px-6 text-[14px] font-black text-white shadow-[0_10px_20px_rgba(8,103,242,0.24)] transition hover:bg-[#0057d8] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
        >
          주간 리포트 상세 보기
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>

      <img
        src={`${welfareAssetBase}/체크.png`}
        alt=""
        className="mx-auto h-[104px] w-[104px] object-contain"
        draggable="false"
      />
    </section>
  )
}

function InstitutionPanel() {
  const maxCount = Math.max(...institutionStats.map((item) => item.count))

  return (
    <section
      className="min-h-[178px] rounded-[16px] border border-[#dfe8f5] bg-white px-5 py-2.5 shadow-[0_12px_26px_rgba(37,72,125,0.07)]"
      aria-labelledby="institution-status-title"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2
          id="institution-status-title"
          className="text-[20px] font-black leading-tight text-[#071747]"
        >
          기관별 / 지역별 현황
        </h2>
        <div
          className="inline-flex overflow-hidden rounded-lg border border-[#dfe8f5] bg-white"
          role="group"
          aria-label="현황 보기 방식"
        >
          <button
            type="button"
            className="inline-flex min-h-8 items-center bg-[#0867f2] px-3 text-[12px] font-black text-white"
            aria-pressed="true"
          >
            기관별
          </button>
          <button
            type="button"
            className="inline-flex min-h-8 items-center px-3 text-[12px] font-black text-[#52627f]"
            aria-pressed="false"
          >
            지역별
          </button>
        </div>
      </div>

      <h3 className="mt-3 text-[14px] font-black leading-tight text-[#17264a]">
        기관별 상담 건수 (주간)
      </h3>

      <dl className="mt-2 grid gap-2">
        {institutionStats.map((item) => (
          <div
            key={item.label}
            className="grid grid-cols-[96px_minmax(0,1fr)_38px] items-center gap-3"
          >
            <dt className="truncate text-[12px] font-bold text-[#425371]">
              {item.label}
            </dt>
            <dd className="contents">
              <span
                className="h-2.5 overflow-hidden rounded-full bg-[#e7eef8]"
                aria-hidden="true"
              >
                <span
                  className="block h-full rounded-full bg-[#0867f2]"
                  style={{ width: `${(item.count / maxCount) * 100}%` }}
                />
              </span>
              <span className="text-right text-[12px] font-black text-[#17264a]">
                {item.count}건
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function RegionLeafletMap() {
  const mapNodeRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<LeafletMap | null>(null)

  useEffect(() => {
    let isDisposed = false
    let resizeTimer: number | undefined

    void import('leaflet')
      .then((leaflet) => {
        if (isDisposed || !mapNodeRef.current || mapRef.current) {
          return
        }

        const map = leaflet.map(mapNodeRef.current, {
          attributionControl: true,
          center: regionMapCenter,
          keyboard: true,
          maxZoom: 16,
          minZoom: 11,
          preferCanvas: true,
          scrollWheelZoom: false,
          zoom: 12,
          zoomControl: false,
        })

        mapRef.current = map

        leaflet
          .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 19,
          })
          .addTo(map)

        leaflet.control.zoom({ position: 'bottomright' }).addTo(map)

        const maxCount = Math.max(...regionStats.map((region) => region.count))
        const bounds = leaflet.latLngBounds(
          regionStats.map((region) => region.coordinates),
        )

        regionStats.forEach((region) => {
          const markerRadius = 12 + (region.count / maxCount) * 8

          leaflet
            .circleMarker(region.coordinates, {
              color: '#ffffff',
              fillColor: region.fillColor,
              fillOpacity: 0.92,
              radius: markerRadius,
              weight: 3,
            })
            .bindTooltip(`${region.label}<br />${region.count}건`, {
              className: 'region-service-map-tooltip',
              direction: 'top',
              offset: [0, -8],
              opacity: 1,
              permanent: true,
            })
            .bindPopup(`${region.label} 서비스 연계 ${region.count}건`)
            .addTo(map)
        })

        map.fitBounds(bounds, {
          maxZoom: 13,
          padding: [36, 36],
        })

        resizeTimer = window.setTimeout(() => {
          map.invalidateSize()
        }, 0)
      })
      .catch(() => {
        if (mapNodeRef.current) {
          mapNodeRef.current.dataset.mapStatus = 'unavailable'
        }
      })

    return () => {
      isDisposed = true

      if (resizeTimer !== undefined) {
        window.clearTimeout(resizeTimer)
      }

      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [])

  return (
    <div
      ref={mapNodeRef}
      className="worker-report-region-map h-[236px] overflow-hidden rounded-[14px] border border-[#d6e2f0] bg-[#edf5ff]"
      aria-label="지역별 서비스 연계 Leaflet 지도"
    />
  )
}

function RegionMapPanel() {
  return (
    <section
      className="min-h-[178px] rounded-[16px] border border-[#dfe8f5] bg-white px-5 py-3 shadow-[0_12px_26px_rgba(37,72,125,0.07)]"
      aria-labelledby="region-status-title"
    >
      <PanelHeader
        actionLabel="전체 보기"
        id="region-status-title"
        title="지역별 서비스 연계 건수 (주간)"
      />

      <div className="mt-3">
        <RegionLeafletMap />

        <dl
          className="mt-3 grid gap-2 sm:grid-cols-2"
          aria-label="지역별 서비스 연계 건수 상세"
        >
          {regionStats.map((region) => (
            <div
              key={region.label}
              className="grid grid-cols-[12px_minmax(0,1fr)_auto] items-center gap-2 rounded-lg bg-[#f5f9ff] px-3 py-2"
            >
              <span
                className="h-3 w-3 rounded-full shadow-[0_2px_6px_rgba(37,72,125,0.18)]"
                style={{ backgroundColor: region.fillColor }}
                aria-hidden="true"
              />
              <dt className="truncate text-[12px] font-black text-[#425371]">
                {region.label}
              </dt>
              <dd className="whitespace-nowrap text-[13px] font-black text-[#071747]">
                {region.count}건
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export function WorkerReportsPage() {
  const [reportActionMessage, setReportActionMessage] = useState('')

  function handleDownloadPdf() {
    const pdfBytes = createWorkerReportPdf({
      dateRangeLabel: reportDateRangeLabel,
      generatedAt: new Date(),
      institutionStats,
      metricCards,
      regionStats: regionStats.map((region) => ({
        count: region.count,
        label: region.label,
      })),
      reportSummaryRows: reportSummaryRows.map((row) => row.text),
      serviceLinks: serviceLinks.map((service) => ({
        count: service.count,
        label: service.label,
        percent: service.percent,
      })),
      title: '복지사 보고서',
      trendLabels,
      trendSeries: trendSeries.map((series) => ({
        label: series.label,
        values: series.values,
      })),
    })

    downloadPdfFile(pdfBytes, reportPdfFileName)
    setReportActionMessage('PDF 다운로드를 시작했습니다.')
  }

  async function handleShareReport() {
    const shareUrl = window.location.href
    const shareText = `복지사 보고서 ${reportDateRangeLabel}`

    if (navigator.share) {
      try {
        await navigator.share({
          text: shareText,
          title: '복지사 보고서',
          url: shareUrl,
        })
        setReportActionMessage('보고서 공유 요청을 열었습니다.')
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }

        setReportActionMessage('공유를 완료하지 못했습니다.')
      }

      return
    }

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
      setReportActionMessage('보고서 링크를 복사했습니다.')
      return
    }

    setReportActionMessage('이 브라우저에서는 공유 기능을 사용할 수 없습니다.')
  }

  function handleReportAction(actionId: ReportActionId) {
    if (actionId === 'pdf') {
      handleDownloadPdf()
      return
    }

    if (actionId === 'print') {
      window.print()
      setReportActionMessage('인쇄 창을 열었습니다.')
      return
    }

    void handleShareReport()
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#f8fbff] text-[#071747]">
      <WorkerTopBar activeHref="/worker/reports" />

      <div className="mx-auto grid min-w-0 w-full max-w-[1600px] gap-3 px-5 py-3 lg:px-8">
        <section
          className="grid gap-4 px-1 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
          aria-labelledby="worker-report-title"
        >
          <div>
            <h1
              id="worker-report-title"
              className="break-keep text-[31px] font-black leading-tight text-[#071747] sm:text-[34px]"
            >
              복지사 보고서
            </h1>
            <p className="mt-2 text-[15px] font-bold leading-snug text-[#425371]">
              주간 및 월간 서비스와 상담 현황을 분석하여 제공합니다.
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto] md:justify-end">
            <button
              type="button"
              className="inline-flex min-h-12 w-full min-w-0 items-center justify-center gap-3 rounded-[10px] border border-[#dfe8f5] bg-white px-5 text-[15px] font-black text-[#17264a] shadow-[0_8px_18px_rgba(37,72,125,0.06)] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff] md:w-auto"
              aria-label={reportDateRangeAriaLabel}
            >
              <CalendarDays
                aria-hidden="true"
                className="h-5 w-5 text-[#40557d]"
                strokeWidth={2.5}
              />
              <span className="min-w-0 truncate">{reportDateRangeLabel}</span>
              <ChevronDown
                aria-hidden="true"
                className="h-4 w-4 text-[#40557d]"
                strokeWidth={2.8}
              />
            </button>

            <div className="grid grid-cols-3 gap-2">
              {reportActionButtons.map((action) => {
                const Icon = action.icon

                return (
                  <button
                    key={action.label}
                    type="button"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] border border-[#dfe8f5] bg-white px-3 text-[14px] font-black text-[#17264a] shadow-[0_8px_18px_rgba(37,72,125,0.06)] transition hover:bg-[#f5f9ff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#8bbcff]"
                    onClick={() => handleReportAction(action.id)}
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-5 w-5 text-[#40557d]"
                      strokeWidth={2.5}
                    />
                    <span className="whitespace-nowrap">{action.label}</span>
                  </button>
                )
              })}
            </div>

            {reportActionMessage ? (
              <p
                className="rounded-lg bg-[#edf5ff] px-3 py-2 text-[13px] font-black text-[#0b4fb3] sm:col-span-2"
                role="status"
              >
                {reportActionMessage}
              </p>
            ) : null}
          </div>
        </section>

        <section
          className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4"
          aria-label="복지사 보고서 요약"
        >
          {metricCards.map((metric) => (
            <MetricSummaryCard key={metric.id} metric={metric} />
          ))}
        </section>

        <div className="grid min-w-0 gap-3 xl:grid-cols-[minmax(0,1.4fr)_minmax(420px,0.86fr)]">
          <WeeklyTrendChart />
          <ServiceRatioPanel />
        </div>

        <ServiceLinkStatusPanel />

        <div className="grid min-w-0 gap-3 xl:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.66fr)_minmax(360px,0.85fr)]">
          <WeeklyReportSummaryPanel />
          <InstitutionPanel />
          <RegionMapPanel />
        </div>
      </div>
    </main>
  )
}
