import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ElderPainWalkingPage } from './ElderPainWalkingPage'

describe('ElderPainWalkingPage', () => {
  it('renders the pain and walking step with the saved cane image', () => {
    render(
      <MemoryRouter>
        <ElderPainWalkingPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: '통증·걷기' })).toBeTruthy()
    expect(
      screen.getByRole('progressbar', { name: '총 6단계 중 3단계' }),
    ).toBeTruthy()
    expect(screen.getByText('평소 아픈 곳이 있나요?')).toBeTruthy()
    expect(screen.getByText('보행기·지팡이를 쓰세요?')).toBeTruthy()
    expect(screen.getByText('최근 넘어진 적 있나요?')).toBeTruthy()

    expect(screen.getByRole('button', { name: '허리' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('button', { name: '무릎' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('button', { name: '어깨' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
    expect(screen.getByRole('button', { name: '사용해요' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('button', { name: '없어요' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(
      screen.getByRole('button', { name: '사용해요' }).querySelector('img'),
    ).toHaveAttribute('src', '/assets/dolbomon/elder-check/지팡이.png')
  })

  it('toggles pain areas, walking aid use, and recent fall answers', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <ElderPainWalkingPage />
      </MemoryRouter>,
    )

    const nonePainButton = screen.getByRole('button', { name: '없음' })
    const notUseButton = screen.getByRole('button', { name: '안 써요' })
    const fallYesButton = screen.getByRole('button', { name: '있어요' })

    await user.click(nonePainButton)
    await user.click(notUseButton)
    await user.click(fallYesButton)

    expect(nonePainButton).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: '허리' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
    expect(notUseButton).toHaveAttribute('aria-pressed', 'true')
    expect(fallYesButton).toHaveAttribute('aria-pressed', 'true')
  })

  it('continues to the sleep habit step after pain walking answers', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/elder/check/pain-walking']}>
        <Routes>
          <Route
            path="/elder/check/pain-walking"
            element={<ElderPainWalkingPage />}
          />
          <Route
            path="/elder/check/sleep-habit"
            element={<p>수면 습관 입력 화면</p>}
          />
        </Routes>
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: '다음' }))

    expect(await screen.findByText('수면 습관 입력 화면')).toBeTruthy()
  })
})
