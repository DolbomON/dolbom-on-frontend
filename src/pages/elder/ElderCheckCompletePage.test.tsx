import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ElderCheckCompletePage } from './ElderCheckCompletePage'

describe('ElderCheckCompletePage', () => {
  it('renders the daily check completion summary', () => {
    render(
      <MemoryRouter>
        <ElderCheckCompletePage />
      </MemoryRouter>,
    )

    expect(screen.getByText('안녕하세요, 김영자님')).toBeTruthy()
    expect(screen.getByText('2024년 5월 16일 (목)')).toBeTruthy()
    expect(screen.getByText('완료')).toBeTruthy()
    expect(screen.getByText('오늘 상태 입력이')).toBeTruthy()
    expect(screen.getByText('완료되었어요')).toBeTruthy()
    expect(screen.getByText('복약')).toBeTruthy()
    expect(screen.getByText('식사')).toBeTruthy()
    expect(screen.getByText('몸 상태')).toBeTruthy()
    expect(screen.getByText('기분')).toBeTruthy()
    expect(screen.getByText('수면')).toBeTruthy()
    expect(screen.getByRole('button', { name: '홈으로 가기' })).toBeTruthy()
    expect(
      screen.getByRole('button', { name: 'AI 안부 대화 시작' }),
    ).toBeTruthy()
    expect(screen.getByRole('button', { name: '음성 안내' })).toBeTruthy()
    expect(screen.getByRole('button', { name: '알림 보기' })).toBeTruthy()
    expect(
      screen.getByRole('progressbar', { name: '오늘 상태 입력 완료' }),
    ).toHaveAttribute('aria-valuenow', '100')
    expect(
      screen.getByRole('img', { name: '오늘 상태 입력 완료 이미지' }),
    ).toHaveAttribute(
      'src',
      '/assets/dolbomon/elder-check/completion-illustration.png',
    )
  })

  it('uses submitted route-state answers when they are available', () => {
    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: '/elder/check/complete',
            state: {
              discomfortAnswer: 'has_discomfort',
              mealAnswer: 'not_done',
              medicationTaken: 'not_taken',
              moodAnswer: 'sad',
              sleepAnswer: 'uncomfortable',
            },
          },
        ]}
      >
        <ElderCheckCompletePage />
      </MemoryRouter>,
    )

    expect(screen.getByText('아직 못 먹었어요')).toBeTruthy()
    expect(screen.getByText('아직 못 했어요')).toBeTruthy()
    expect(screen.getByText('있어요')).toBeTruthy()
    expect(screen.getByText('조금 울적해요')).toBeTruthy()
    expect(screen.getByText('조금 불편했어요')).toBeTruthy()
  })

  it('navigates to home from the primary action button', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/elder/check/complete']}>
        <Routes>
          <Route
            path="/elder/check/complete"
            element={<ElderCheckCompletePage />}
          />
          <Route path="/elder" element={<p>어르신 홈</p>} />
        </Routes>
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: '홈으로 가기' }))
    expect(await screen.findByText('어르신 홈')).toBeTruthy()
  })

  it('navigates to AI chat from the secondary action button', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/elder/check/complete']}>
        <Routes>
          <Route
            path="/elder/check/complete"
            element={<ElderCheckCompletePage />}
          />
          <Route path="/elder/chat" element={<p>AI 안부 대화</p>} />
        </Routes>
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: 'AI 안부 대화 시작' }))
    expect(await screen.findByText('AI 안부 대화')).toBeTruthy()
  })
})
