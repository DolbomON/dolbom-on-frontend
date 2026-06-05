import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { LandingPage } from '../pages/LandingPage'

describe('LandingPage', () => {
  it('renders the mobile landing screen', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', {
        name: '오늘의 안부를 쉽고 안전하게 기록하세요',
      }),
    ).toBeTruthy()
    expect(
      screen.getByRole('link', { name: /오늘 상태 입력하기/ }),
    ).toHaveAttribute('href', '/login')
    expect(screen.getByRole('button', { name: '메뉴 열기' })).toBeTruthy()
  })
})
