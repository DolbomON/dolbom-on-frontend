import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import { LandingPage } from '../pages/LandingPage'
import { useAppStore } from './store'
import { AppProviders } from './providers'

describe('LandingPage', () => {
  afterEach(() => {
    useAppStore.getState().setLanguage('ko')
    window.localStorage.clear()
  })

  it('renders the mobile landing screen', () => {
    renderLandingPage()

    expect(
      screen.getByRole('heading', {
        name: '오늘의 안부를 쉽고 안전하게 기록하세요',
      }),
    ).toBeTruthy()
    expect(
      screen.getByRole('link', { name: /오늘 상태 입력하기/ }),
    ).toHaveAttribute('href', '/login')
    expect(
      screen.getByRole('button', { name: '한국어로 보기' }),
    ).toHaveAttribute('aria-pressed', 'true')
    expect(
      screen.getByRole('button', { name: '일본어로 보기' }),
    ).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('button', { name: '음성으로 시작' })).toBeTruthy()
  })

  it('switches the landing screen to Japanese', async () => {
    const user = userEvent.setup()

    renderLandingPage()

    await user.click(screen.getByRole('button', { name: '일본어로 보기' }))

    expect(document.documentElement).toHaveAttribute('lang', 'ja')
    expect(
      screen.getByRole('heading', {
        name: '今日の安否をかんたん・安全に記録しましょう',
      }),
    ).toBeTruthy()
    expect(
      screen.getByRole('link', { name: /今日の状態を入力/ }),
    ).toHaveAttribute('href', '/login')
  })

  it('switches the landing screen from Japanese back to Korean', async () => {
    const user = userEvent.setup()

    renderLandingPage()

    await user.click(screen.getByRole('button', { name: '일본어로 보기' }))
    await user.click(screen.getByRole('button', { name: '韓国語で表示' }))

    expect(document.documentElement).toHaveAttribute('lang', 'ko')
    expect(
      screen.getByRole('heading', {
        name: '오늘의 안부를 쉽고 안전하게 기록하세요',
      }),
    ).toBeTruthy()
    expect(
      screen.getByRole('link', { name: /오늘 상태 입력하기/ }),
    ).toHaveAttribute('href', '/login')
  })
})

function renderLandingPage() {
  return render(
    <AppProviders>
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    </AppProviders>,
  )
}
