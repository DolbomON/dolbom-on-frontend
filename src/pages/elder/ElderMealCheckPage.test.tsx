import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ElderMealCheckPage } from './ElderMealCheckPage'

describe('ElderMealCheckPage', () => {
  it('renders the meal check step', () => {
    render(
      <MemoryRouter>
        <ElderMealCheckPage />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: '오늘 식사는 하셨나요?' }),
    ).toBeTruthy()
    expect(screen.getByRole('button', { name: '네, 했어요' })).toBeTruthy()
    expect(screen.getByRole('button', { name: '아직 못 했어요' })).toBeTruthy()
    expect(screen.getByRole('button', { name: '음성 안내' })).toBeTruthy()
    expect(screen.getByLabelText('2 / 5')).toBeTruthy()
    expect(
      screen.getByRole('progressbar', { name: '총 5단계 중 2단계' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('img', { name: '식사 확인 이미지' }),
    ).toHaveAttribute(
      'src',
      '/assets/dolbomon/elder-check/meal-illustration.png',
    )
    expect(screen.queryByRole('navigation', { name: '하단 메뉴' })).toBeNull()
  })

  it('selects a meal answer locally', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <ElderMealCheckPage />
      </MemoryRouter>,
    )

    const notDoneButton = screen.getByRole('button', {
      name: '아직 못 했어요',
    })

    await user.click(notDoneButton)

    expect(notDoneButton).toHaveAttribute('aria-pressed', 'true')
  })

  it('navigates to the body discomfort step after a meal answer', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/elder/check/meal']}>
        <Routes>
          <Route path="/elder/check/meal" element={<ElderMealCheckPage />} />
          <Route
            path="/elder/check/discomfort"
            element={<p>몸 불편 상태 입력 화면</p>}
          />
        </Routes>
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: '네, 했어요' }))

    expect(await screen.findByText('몸 불편 상태 입력 화면')).toBeTruthy()
  })
})
