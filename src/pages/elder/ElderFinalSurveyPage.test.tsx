import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ElderFinalSurveyPage } from './ElderFinalSurveyPage'

describe('ElderFinalSurveyPage', () => {
  it('renders the final survey screen with default answers and connection code', () => {
    render(
      <MemoryRouter>
        <ElderFinalSurveyPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: '마지막이에요' })).toBeTruthy()
    expect(
      screen.getByRole('progressbar', { name: '총 6단계 중 6단계' }),
    ).toBeTruthy()
    expect(screen.getByText('얼마나 자주 사람과 연락하세요?')).toBeTruthy()
    expect(screen.getByText('외로움을 느끼는 편인가요?')).toBeTruthy()
    expect(
      screen.getByRole('region', { name: '가족 요양사 연결 코드' }),
    ).toBeTruthy()
    expect(screen.getByLabelText('연결 코드 4829')).toBeTruthy()
    expect(screen.getByRole('button', { name: '주 몇번' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('button', { name: '보통' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('button', { name: '설문 완료!' })).toBeTruthy()
  })

  it('updates final survey answers', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <ElderFinalSurveyPage />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: '매일' }))
    await user.click(screen.getByRole('button', { name: '높음' }))

    expect(screen.getByRole('button', { name: '주 몇번' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
    expect(screen.getByRole('button', { name: '매일' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('button', { name: '보통' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
    expect(screen.getByRole('button', { name: '높음' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })

  it('continues to the elder home after completion', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/elder/check/final-survey']}>
        <Routes>
          <Route
            path="/elder/check/final-survey"
            element={<ElderFinalSurveyPage />}
          />
          <Route path="/elder" element={<p>어르신 홈 화면</p>} />
        </Routes>
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: '설문 완료!' }))

    expect(await screen.findByText('어르신 홈 화면')).toBeTruthy()
  })
})
