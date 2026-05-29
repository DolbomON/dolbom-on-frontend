import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ElderDiscomfortCheckPage } from './ElderDiscomfortCheckPage'

describe('ElderDiscomfortCheckPage', () => {
  it('renders the body discomfort check step', () => {
    render(
      <MemoryRouter>
        <ElderDiscomfortCheckPage />
      </MemoryRouter>,
    )

    expect(screen.getByText('안녕하세요, 김영자님')).toBeTruthy()
    expect(screen.getByText('2024년 5월 16일 (목)')).toBeTruthy()
    expect(
      screen.getByRole('heading', {
        name: '오늘 몸이 불편한 곳이 있나요?',
      }),
    ).toBeTruthy()
    expect(screen.getByRole('button', { name: '없어요' })).toBeTruthy()
    expect(screen.getByRole('button', { name: '있어요' })).toBeTruthy()
    expect(screen.getByRole('button', { name: '음성 안내' })).toBeTruthy()
    expect(screen.getByLabelText('3 / 5')).toBeTruthy()
    expect(
      screen.getByRole('progressbar', { name: '총 5단계 중 3단계' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('img', { name: '몸 불편 여부 확인 이미지' }),
    ).toHaveAttribute(
      'src',
      '/assets/dolbomon/elder-check/discomfort-illustration.png',
    )
    expect(screen.queryByRole('navigation', { name: '하단 메뉴' })).toBeNull()
  })

  it('selects a discomfort answer locally', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <ElderDiscomfortCheckPage />
      </MemoryRouter>,
    )

    const hasDiscomfortButton = screen.getByRole('button', {
      name: '있어요',
    })

    await user.click(hasDiscomfortButton)

    expect(hasDiscomfortButton).toHaveAttribute('aria-pressed', 'true')
  })

  it('navigates to the mood check step after a discomfort answer', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/elder/check/discomfort']}>
        <Routes>
          <Route
            path="/elder/check/discomfort"
            element={<ElderDiscomfortCheckPage />}
          />
          <Route
            path="/elder/check/mood"
            element={<p>기분 상태 입력 화면</p>}
          />
        </Routes>
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: '없어요' }))

    expect(await screen.findByText('기분 상태 입력 화면')).toBeTruthy()
  })
})
