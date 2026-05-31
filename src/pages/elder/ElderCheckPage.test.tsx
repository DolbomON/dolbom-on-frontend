import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ElderCheckPage } from './ElderCheckPage'

describe('ElderCheckPage', () => {
  it('renders the daily check introduction screen', () => {
    render(
      <MemoryRouter>
        <ElderCheckPage />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: /처음 한 번만 여쭤볼게요/ }),
    ).toBeTruthy()
    expect(screen.getByText(/평소 건강·생활 습관을/)).toBeTruthy()
    expect(screen.getByRole('button', { name: '시작하기' })).toBeTruthy()
    expect(screen.getByText('복약')).toBeTruthy()
    expect(screen.getByText('질환')).toBeTruthy()
    expect(screen.getByText('통증')).toBeTruthy()
    expect(screen.getByText('수면')).toBeTruthy()
    expect(screen.getByText('생활')).toBeTruthy()
    expect(screen.getByText('정서')).toBeTruthy()
  })

  it('navigates to the medication habit step when starting', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/elder/check']}>
        <Routes>
          <Route path="/elder/check" element={<ElderCheckPage />} />
          <Route
            path="/elder/check/medication-habit"
            element={<p>복약 습관 입력 화면</p>}
          />
        </Routes>
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: '시작하기' }))

    expect(await screen.findByText('복약 습관 입력 화면')).toBeTruthy()
  })
})
