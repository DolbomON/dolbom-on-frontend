import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { WorkerSchedulesPage } from './WorkerSchedulesPage'

describe('WorkerSchedulesPage', () => {
  it('renders the agency schedule management dashboard', () => {
    render(
      <MemoryRouter initialEntries={['/worker/schedules']}>
        <WorkerSchedulesPage />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: '기관 일정 관리' }),
    ).toBeInTheDocument()
    expect(screen.getByText('오늘 방문')).toBeInTheDocument()
    expect(screen.getAllByText('전화 상담').length).toBeGreaterThan(0)
    expect(screen.getAllByText('회의').length).toBeGreaterThan(0)
    expect(screen.getByText('미배정 일정')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '오늘 일정' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '담당자 배정' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '다가오는 일정' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '기관 일정' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(
      within(
        screen.getByRole('navigation', { name: '복지사 메뉴' }),
      ).queryByRole('link', { name: '설정' }),
    ).toBeNull()
    expect(
      screen.getByRole('link', { name: '이수진 복지사 마이페이지' }),
    ).toHaveAttribute('href', '/worker/mypage')
    expect(screen.getByText('2024년 5월 15일 (수) 일정')).toBeInTheDocument()
  })

  it('updates the selected day panel from the monthly calendar', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/worker/schedules']}>
        <WorkerSchedulesPage />
      </MemoryRouter>,
    )

    await user.click(
      screen.getByRole('button', { name: '2024년 5월 22일 일정 4건' }),
    )

    expect(screen.getByText('2024년 5월 22일 (수) 일정')).toBeInTheDocument()
  })
})
