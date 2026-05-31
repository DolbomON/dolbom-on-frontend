import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { LandingPage } from '../pages/LandingPage'

describe('LandingPage', () => {
  it('renders the updated mobile main screen', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>,
    )

    expect(screen.getByLabelText('돌봄ON 메인 화면')).toBeTruthy()
    expect(screen.getByText(/\d+월 \d+일 .요일/)).toBeTruthy()
    expect(
      screen.getByRole('heading', { name: /안녕하세요,\s*길동 어르신/ }),
    ).toBeTruthy()
    expect(screen.getByText('오늘 상태를 기록해요')).toBeTruthy()
    expect(screen.getByText('식사 · 복약 · 통증 · 기분 · 수면')).toBeTruthy()
    expect(
      screen.getByRole('link', { name: /오늘 기록 시작/ }),
    ).toHaveAttribute('href', '/elder/check/medication')
    expect(screen.getByRole('link', { name: /음성으로/ })).toHaveAttribute(
      'href',
      '/elder/check/medication',
    )
    expect(screen.getByRole('link', { name: /말동무/ })).toHaveAttribute(
      'href',
      '/elder/chat',
    )
    expect(screen.getByRole('button', { name: '메뉴 열기' })).toBeTruthy()
  })
})
