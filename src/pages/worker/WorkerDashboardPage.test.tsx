import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { WorkerDashboardPage } from './WorkerDashboardPage'

describe('WorkerDashboardPage', () => {
  it('renders the welfare worker home content and navigation', () => {
    render(
      <MemoryRouter initialEntries={['/worker']}>
        <WorkerDashboardPage />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', {
        name: '이수진 복지사님, 오늘도 감사합니다! 💙',
      }),
    ).toBeTruthy()
    expect(screen.getByText('관리 어르신')).toBeTruthy()
    expect(screen.getByText('김영자 어르신')).toBeTruthy()
    expect(screen.getByText('이순자 어르신')).toBeTruthy()
    expect(screen.getByText('박철수 어르신')).toBeTruthy()
    expect(screen.getByText('최복례 어르신')).toBeTruthy()
    expect(
      screen.getByRole('heading', { name: '위기·주의 어르신 현황' }),
    ).toBeTruthy()
    expect(screen.getByRole('heading', { name: '빠른 메뉴' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: '오늘 일정' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: '최근 상담 메모' })).toBeTruthy()
    expect(
      screen.getByRole('heading', { name: '복지 서비스 연계 현황' }),
    ).toBeTruthy()
    expect(screen.getByRole('link', { name: '홈' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(screen.getAllByText('상세 보기')).toHaveLength(4)
  })
})
