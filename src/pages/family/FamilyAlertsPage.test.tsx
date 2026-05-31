import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { FamilyAlertsPage } from './FamilyAlertsPage'

describe('FamilyAlertsPage', () => {
  it('renders the family alert screen', () => {
    render(
      <MemoryRouter>
        <FamilyAlertsPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: '알림' })).toBeTruthy()
    expect(screen.getByText('12건')).toBeTruthy()
    expect(screen.getByRole('button', { name: '긴급' })).toBeTruthy()
    expect(screen.getByText('김영자 어르신 통증 기록')).toBeTruthy()
    expect(screen.getByText('AI 안부 대화 요약 도착')).toBeTruthy()
    expect(
      screen.getByRole('link', { name: '보호자 알림 설정 열기' }),
    ).toBeTruthy()
    expect(screen.getByRole('link', { name: '알림' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })
})
