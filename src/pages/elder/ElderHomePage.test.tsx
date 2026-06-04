import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ElderHomePage } from './ElderHomePage'

describe('ElderHomePage', () => {
  it('renders the elder home screen', () => {
    render(
      <MemoryRouter>
        <ElderHomePage />
      </MemoryRouter>,
    )

    expect(screen.getByLabelText('어르신 홈 화면')).toBeTruthy()
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
      '/elder/voice',
    )
    expect(screen.getByRole('link', { name: /말동무/ })).toHaveAttribute(
      'href',
      '/elder/chat',
    )
    expect(screen.getByRole('link', { name: /내 돌봄팀/ })).toHaveAttribute(
      'href',
      '/elder/connect',
    )
  })

  it('starts the daily check from the primary action', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/elder']}>
        <Routes>
          <Route path="/elder" element={<ElderHomePage />} />
          <Route
            path="/elder/check/medication"
            element={<p>복약 상태 입력 화면</p>}
          />
        </Routes>
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('link', { name: /오늘 기록 시작/ }))

    expect(await screen.findByText('복약 상태 입력 화면')).toBeTruthy()
  })
})
