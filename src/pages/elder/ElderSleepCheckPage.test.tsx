import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ElderSleepCheckPage } from './ElderSleepCheckPage'

describe('ElderSleepCheckPage', () => {
  it('renders the sleep check step', () => {
    render(
      <MemoryRouter>
        <ElderSleepCheckPage />
      </MemoryRouter>,
    )

    expect(screen.getByText('안녕하세요, 김영자님')).toBeTruthy()
    expect(screen.getByText('2024년 5월 16일 (목)')).toBeTruthy()
    const question = screen.getByRole('heading', {
      name: '어젯밤 잠은 잘 주무셨나요?',
    })

    expect(question).toHaveTextContent('어젯밤 잠은')
    expect(question).toHaveTextContent('잘 주무셨나요?')
    expect(screen.getByRole('button', { name: '네, 잘 잤어요' })).toBeTruthy()
    expect(screen.getByRole('button', { name: '조금 불편했어요' })).toBeTruthy()
    expect(screen.getByRole('button', { name: '음성 안내' })).toBeTruthy()
    expect(screen.getByLabelText('5 / 5')).toBeTruthy()
    expect(
      screen.getByRole('progressbar', { name: '총 5단계 중 5단계' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('img', { name: '수면 확인 이미지' }),
    ).toHaveAttribute(
      'src',
      '/assets/dolbomon/elder-check/sleep-illustration.png',
    )
    expect(screen.queryByRole('navigation', { name: '하단 메뉴' })).toBeNull()
  })

  it('selects a sleep answer locally', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <ElderSleepCheckPage />
      </MemoryRouter>,
    )

    const uncomfortableButton = screen.getByRole('button', {
      name: '조금 불편했어요',
    })

    await user.click(uncomfortableButton)

    expect(uncomfortableButton).toHaveAttribute('aria-pressed', 'true')
  })

  it('navigates to the completion screen after a sleep answer', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/elder/check/sleep']}>
        <Routes>
          <Route path="/elder/check/sleep" element={<ElderSleepCheckPage />} />
          <Route
            path="/elder/check/complete"
            element={<p>오늘 상태 입력 완료 화면</p>}
          />
        </Routes>
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: '네, 잘 잤어요' }))

    expect(await screen.findByText('오늘 상태 입력 완료 화면')).toBeTruthy()
  })
})
