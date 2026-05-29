import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ElderMoodCheckPage } from './ElderMoodCheckPage'

describe('ElderMoodCheckPage', () => {
  it('renders the mood check step', () => {
    render(
      <MemoryRouter>
        <ElderMoodCheckPage />
      </MemoryRouter>,
    )

    expect(screen.getByText('안녕하세요, 김영자님')).toBeTruthy()
    expect(screen.getByText('2024년 5월 16일 (목)')).toBeTruthy()
    expect(
      screen.getByRole('heading', { name: '오늘 기분은 어떠세요?' }),
    ).toBeTruthy()
    expect(screen.getByRole('button', { name: '좋아요' })).toBeTruthy()
    expect(screen.getByRole('button', { name: '조금 울적해요' })).toBeTruthy()
    expect(screen.getByRole('button', { name: '음성 안내' })).toBeTruthy()
    expect(screen.getByLabelText('4 / 5')).toBeTruthy()
    expect(
      screen.getByRole('progressbar', { name: '총 5단계 중 4단계' }),
    ).toBeTruthy()
    expect(screen.getByRole('img', { name: '기분 확인 이미지' })).toBeTruthy()
    expect(screen.queryByRole('navigation', { name: '하단 메뉴' })).toBeNull()
  })

  it('selects a mood answer locally', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <ElderMoodCheckPage />
      </MemoryRouter>,
    )

    const sadButton = screen.getByRole('button', {
      name: '조금 울적해요',
    })

    await user.click(sadButton)

    expect(sadButton).toHaveAttribute('aria-pressed', 'true')
  })

  it('navigates to the sleep check step after a mood answer', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/elder/check/mood']}>
        <Routes>
          <Route path="/elder/check/mood" element={<ElderMoodCheckPage />} />
          <Route
            path="/elder/check/sleep"
            element={<p>수면 상태 입력 화면</p>}
          />
        </Routes>
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: '좋아요' }))

    expect(await screen.findByText('수면 상태 입력 화면')).toBeTruthy()
  })
})
