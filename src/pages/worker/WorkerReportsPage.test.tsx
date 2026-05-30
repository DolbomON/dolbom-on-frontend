import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
  it('renders the worker report overview screen', () => {
    renderWorkerReportsPage()

    expect(screen.getByRole('heading', { name: '보고서' })).toBeInTheDocument()
    expect(
      screen.getByText('담당 어르신의 상태를 한눈에 정리해드려요.'),
    ).toBeInTheDocument()
    expect(screen.getByText('오늘 기록률')).toBeInTheDocument()
    expect(screen.getByText('주의/위험')).toBeInTheDocument()
    expect(screen.getByText('AI 요약')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '오늘' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('button', { name: '주간' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '월간' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '오늘 요약' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '항목별 기록 현황' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '주요 확인 대상' }),
    ).toBeInTheDocument()
    expect(screen.getByText('이순자님')).toBeInTheDocument()
    expect(screen.getByText('김영자님')).toBeInTheDocument()
    expect(screen.getByText('최복례님')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '빠른 작업' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'AI 요약 보기' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '주간 보고서 생성' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '보고서' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('updates the active report period', async () => {
    const user = userEvent.setup()

    renderWorkerReportsPage()

    await user.click(screen.getByRole('button', { name: '주간' }))

    expect(screen.getByRole('button', { name: '오늘' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
    expect(screen.getByRole('button', { name: '주간' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )

    await user.click(screen.getByRole('button', { name: '월간' }))

    expect(screen.getByRole('button', { name: '주간' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
    expect(screen.getByRole('button', { name: '월간' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })
})
