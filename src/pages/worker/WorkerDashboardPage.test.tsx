import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { WorkerDashboardPage } from './WorkerDashboardPage'

describe('WorkerDashboardPage', () => {
  it('renders the worker dashboard content and navigation', () => {
    render(
      <MemoryRouter initialEntries={['/worker']}>
        <WorkerDashboardPage />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: '복지사 대시보드' }),
    ).toBeTruthy()
    expect(screen.getByText('전체 대상자')).toBeTruthy()
    expect(screen.getByText('위험 대상자')).toBeTruthy()
    expect(screen.getByText('긴급 알림')).toBeTruthy()
    expect(screen.getByText('김영자님')).toBeTruthy()
    expect(screen.getByText('이순자님')).toBeTruthy()
    expect(screen.getByText('박철수님')).toBeTruthy()
    expect(screen.getByRole('heading', { name: '최근 알림' })).toBeTruthy()
    expect(screen.getByRole('link', { name: '대시보드' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(screen.getAllByText('상세 보기')).toHaveLength(3)
  })
})
