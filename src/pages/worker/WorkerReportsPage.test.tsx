import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { WorkerReportsPage } from './WorkerReportsPage'

function renderWorkerReportsPage() {
  return render(
    <MemoryRouter initialEntries={['/worker/reports']}>
      <WorkerReportsPage />
    </MemoryRouter>,
  )
}

describe('WorkerReportsPage', () => {
  it('renders the welfare worker report dashboard', () => {
    renderWorkerReportsPage()

    expect(
      screen.getByRole('heading', { name: '복지사 보고서' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        '주간 및 월간 서비스와 상담 현황을 분석하여 제공합니다.',
      ),
    ).toBeInTheDocument()
    expect(screen.getByText('총 관리 어르신')).toBeInTheDocument()
    expect(screen.getByText('이번 주 상담 건수')).toBeInTheDocument()
    expect(screen.getByText('서비스 연계 건수')).toBeInTheDocument()
    expect(screen.getByText('위험 대응 건수')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '주간 상담 및 서비스 추이' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '서비스 연계 비율' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '서비스 연계 현황' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '주간 리포트 요약' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '기관별 / 지역별 현황' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: '지역별 서비스 연계 건수 (주간)',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByLabelText('지역별 서비스 연계 Leaflet 지도'),
    ).toBeInTheDocument()
  })

  it('marks the report navigation item and exposes the selected date range', () => {
    renderWorkerReportsPage()

    expect(screen.getByRole('link', { name: '보고서' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(
      screen.getByRole('button', {
        name: '보고서 기간 2024년 5월 13일 월요일부터 2024년 5월 19일 일요일까지',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '차트 기간 주간' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'PDF 저장' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '인쇄' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '공유' })).toBeInTheDocument()
  })
})
