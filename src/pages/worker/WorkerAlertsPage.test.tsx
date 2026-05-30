import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { WorkerAlertsPage } from './WorkerAlertsPage'

function renderWorkerAlertsPage() {
  return render(
    <MemoryRouter initialEntries={['/worker/alerts']}>
      <WorkerAlertsPage />
    </MemoryRouter>,
  )
}

describe('WorkerAlertsPage', () => {
  it('renders the worker alert list screen', () => {
    renderWorkerAlertsPage()

    expect(screen.getByRole('heading', { name: '알림' })).toBeInTheDocument()
    expect(
      screen.getByText('위험 신호와 최근 상태 알림을 빠르게 확인하세요.'),
    ).toBeInTheDocument()
    expect(screen.getByText('3건')).toBeInTheDocument()
    expect(screen.getByText('7건')).toBeInTheDocument()
    expect(screen.getByText('12건')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '전체' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('button', { name: '긴급' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '주의' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '완료' })).toBeInTheDocument()
    expect(screen.getByText('이순자님 몸 불편 있음')).toBeInTheDocument()
    expect(screen.getByText('김영자님 식사 미입력')).toBeInTheDocument()
    expect(screen.getByText('박철수님 AI 요약 생성 완료')).toBeInTheDocument()
    expect(screen.getByText('최복례님 수면 부족 기록')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '빠른 작업' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '알림' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('filters alerts by status and restores the full list', async () => {
    const user = userEvent.setup()

    renderWorkerAlertsPage()

    await user.click(screen.getByRole('button', { name: '긴급' }))

    expect(screen.getByRole('button', { name: '긴급' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByText('이순자님 몸 불편 있음')).toBeInTheDocument()
    expect(screen.queryByText('김영자님 식사 미입력')).not.toBeInTheDocument()
    expect(
      screen.queryByText('박철수님 AI 요약 생성 완료'),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText('최복례님 수면 부족 기록'),
    ).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '전체' }))

    expect(screen.getByText('이순자님 몸 불편 있음')).toBeInTheDocument()
    expect(screen.getByText('김영자님 식사 미입력')).toBeInTheDocument()
    expect(screen.getByText('박철수님 AI 요약 생성 완료')).toBeInTheDocument()
    expect(screen.getByText('최복례님 수면 부족 기록')).toBeInTheDocument()
  })

  it('applies the urgent filter from the quick action', async () => {
    const user = userEvent.setup()

    renderWorkerAlertsPage()

    await user.click(screen.getByRole('button', { name: '긴급 알림만 보기' }))

    expect(screen.getByRole('button', { name: '긴급' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByText('이순자님 몸 불편 있음')).toBeInTheDocument()
    expect(screen.queryByText('김영자님 식사 미입력')).not.toBeInTheDocument()
  })
})
