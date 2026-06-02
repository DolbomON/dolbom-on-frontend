import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { CaregiverVisitSchedulePage } from './CaregiverVisitSchedulePage'

function renderVisitSchedulePage() {
  return render(
    <MemoryRouter initialEntries={['/caregiver/schedules']}>
      <CaregiverVisitSchedulePage />
    </MemoryRouter>,
  )
}

describe('CaregiverVisitSchedulePage', () => {
  it('renders the caregiver visit schedule screen from the reference', () => {
    renderVisitSchedulePage()

    expect(
      screen.getByRole('heading', { name: '방문 일정' }),
    ).toBeInTheDocument()
    expect(screen.getByText('오늘 방문')).toBeInTheDocument()
    expect(screen.getByText('진행 중')).toBeInTheDocument()
    expect(screen.getByText('주의 대상')).toBeInTheDocument()
    expect(screen.getByText('10:30 ~ 11:10')).toBeInTheDocument()
    expect(screen.getByText('김영자님')).toBeInTheDocument()
    expect(screen.getByText('식사량과 복약 여부 확인')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '오늘 동선' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '복지사 요청 메모' }),
    ).toBeInTheDocument()

    const caregiverMenu = screen.getByRole('navigation', {
      name: '요양사 메뉴',
    })

    expect(
      within(caregiverMenu).getByRole('link', { name: '방문일정' }),
    ).toHaveAttribute('aria-current', 'page')
  })

  it('supports changing the schedule tab without leaving the screen', async () => {
    const user = userEvent.setup()

    renderVisitSchedulePage()

    await user.click(screen.getByRole('tab', { name: '이번 주' }))

    expect(screen.getByRole('tab', { name: '이번 주' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    expect(screen.getByText('김태환님')).toBeInTheDocument()
  })
})
