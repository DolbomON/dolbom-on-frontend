import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ElderCheckPage } from './ElderCheckPage'

describe('ElderCheckPage', () => {
  it('renders the first medication check question', () => {
    render(
      <MemoryRouter>
        <ElderCheckPage />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: '오늘 약을 드셨나요?' }),
    ).toBeTruthy()
    expect(screen.getByRole('button', { name: '네, 먹었어요' })).toBeTruthy()
    expect(
      screen.getByRole('button', { name: '아직 못 먹었어요' }),
    ).toBeTruthy()
    expect(screen.getByRole('button', { name: '음성 안내' })).toBeTruthy()
    expect(screen.queryByRole('navigation', { name: '하단 메뉴' })).toBeNull()
  })

  it('navigates to the meal check step after a medication answer', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/elder/check']}>
        <Routes>
          <Route path="/elder/check" element={<ElderCheckPage />} />
          <Route
            path="/elder/check/meal"
            element={<p>식사 상태 입력 화면</p>}
          />
        </Routes>
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: '네, 먹었어요' }))

    expect(await screen.findByText('식사 상태 입력 화면')).toBeTruthy()
  })
})
