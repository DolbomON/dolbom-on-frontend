import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { WorkerDashboardPage } from './WorkerDashboardPage'

describe('WorkerDashboardPage', () => {
  it('renders the caregiver dashboard content and navigation', () => {
    render(
      <MemoryRouter initialEntries={['/worker']}>
        <WorkerDashboardPage />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: '담당 어르신 대시보드' }),
    ).toBeTruthy()
    expect(screen.getByText('담당 어르신')).toBeTruthy()
    expect(screen.getByText('김영자님')).toBeTruthy()
    expect(screen.getByText('이순자님')).toBeTruthy()
    expect(screen.getByText('박철수님')).toBeTruthy()
    expect(screen.getByText('최복례님')).toBeTruthy()
    expect(screen.getByRole('heading', { name: '빠른 메뉴' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: '오늘 일정' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: '최근 상담 메모' })).toBeTruthy()
    expect(screen.getByRole('link', { name: '홈' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(screen.getAllByText('상세 보기')).toHaveLength(4)
  })
})
