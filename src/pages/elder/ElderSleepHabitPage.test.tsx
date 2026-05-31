import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ElderSleepHabitPage } from './ElderSleepHabitPage'

describe('ElderSleepHabitPage', () => {
  it('renders the fourth sleep habit setup step with clock images', () => {
    render(
      <MemoryRouter>
        <ElderSleepHabitPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: '잠은 어떠세요' })).toBeTruthy()
    expect(
      screen.getByRole('progressbar', { name: '총 6단계 중 4단계' }),
    ).toBeTruthy()
    expect(screen.getByText('평소 몇 시간 주무세요?')).toBeTruthy()
    expect(screen.getByText('잠과 관련해 (복수)')).toBeTruthy()

    const underFourButton = screen.getByRole('button', { name: '4시간 미만' })
    const fourToSixButton = screen.getByRole('button', { name: '4~6시간' })
    const sixToEightButton = screen.getByRole('button', { name: '6~8시간' })
    const napButton = screen.getByRole('button', { name: '낮잠 잠' })
    const wakesOftenButton = screen.getByRole('button', { name: '자주 깸' })
    const hardToSleepButton = screen.getByRole('button', {
      name: '잠들기 어려움',
    })

    expect(underFourButton).toHaveAttribute('aria-pressed', 'false')
    expect(fourToSixButton).toHaveAttribute('aria-pressed', 'true')
    expect(sixToEightButton).toHaveAttribute('aria-pressed', 'false')
    expect(napButton).toHaveAttribute('aria-pressed', 'true')
    expect(wakesOftenButton).toHaveAttribute('aria-pressed', 'true')
    expect(hardToSleepButton).toHaveAttribute('aria-pressed', 'false')
    expect(fourToSixButton.querySelector('img')).toHaveAttribute(
      'src',
      '/assets/dolbomon/elder-check/시계_선택.png',
    )
    expect(underFourButton.querySelector('img')).toHaveAttribute(
      'src',
      '/assets/dolbomon/elder-check/시계_미선택.png',
    )
    expect(screen.getByRole('button', { name: '다음' })).toBeTruthy()
  })

  it('updates selected sleep duration and sleep concerns', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <ElderSleepHabitPage />
      </MemoryRouter>,
    )

    const eightOrMoreButton = screen.getByRole('button', {
      name: '8시간 이상',
    })
    const napButton = screen.getByRole('button', { name: '낮잠 잠' })
    const hardToSleepButton = screen.getByRole('button', {
      name: '잠들기 어려움',
    })

    await user.click(eightOrMoreButton)
    await user.click(napButton)
    await user.click(hardToSleepButton)

    expect(screen.getByRole('button', { name: '4~6시간' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
    expect(eightOrMoreButton).toHaveAttribute('aria-pressed', 'true')
    expect(napButton).toHaveAttribute('aria-pressed', 'false')
    expect(hardToSleepButton).toHaveAttribute('aria-pressed', 'true')
  })

  it('continues to the medication check after sleep habit answers', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/elder/check/sleep-habit']}>
        <Routes>
          <Route
            path="/elder/check/sleep-habit"
            element={<ElderSleepHabitPage />}
          />
          <Route
            path="/elder/check/medication"
            element={<p>복약 상태 입력 화면</p>}
          />
        </Routes>
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: '다음' }))

    expect(await screen.findByText('복약 상태 입력 화면')).toBeTruthy()
  })
})
