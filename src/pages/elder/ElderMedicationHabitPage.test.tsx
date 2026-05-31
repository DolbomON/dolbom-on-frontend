import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ElderMedicationHabitPage } from './ElderMedicationHabitPage'

describe('ElderMedicationHabitPage', () => {
  it('renders the first medication habit step', () => {
    render(
      <MemoryRouter>
        <ElderMedicationHabitPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: '복약 습관' })).toBeTruthy()
    expect(
      screen.getByRole('progressbar', { name: '총 6단계 중 4단계' }),
    ).toBeTruthy()
    expect(screen.getByText('하루에 약을 몇 번 드세요?')).toBeTruthy()
    expect(screen.getByText('언제 드세요? (복수)')).toBeTruthy()
    expect(screen.getByText('약 챙기기 도움이 필요하세요?')).toBeTruthy()
    expect(screen.getByRole('button', { name: '2번' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('button', { name: '아침' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('button', { name: '저녁' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('button', { name: '혼자 가능' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('button', { name: '다음' })).toBeTruthy()
    expect(screen.queryByRole('button', { name: '음성 안내' })).toBeNull()
  })

  it('continues to the medication check after confirming medication habit answers', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/elder/check/medication-habit']}>
        <Routes>
          <Route
            path="/elder/check/medication-habit"
            element={<ElderMedicationHabitPage />}
          />
          <Route
            path="/elder/check/medication"
            element={<p>복약 상태 입력 화면</p>}
          />
        </Routes>
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: '점심' }))
    await user.click(screen.getByRole('button', { name: '다음' }))

    expect(await screen.findByText('복약 상태 입력 화면')).toBeTruthy()
  })
})
