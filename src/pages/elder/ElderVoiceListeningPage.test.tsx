import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ElderVoiceListeningPage } from './ElderVoiceListeningPage'

describe('ElderVoiceListeningPage', () => {
  it('renders the speech recognition screen with the local microphone asset', () => {
    const { container } = render(
      <MemoryRouter>
        <ElderVoiceListeningPage />
      </MemoryRouter>,
    )

    expect(screen.getByLabelText('음성 인식 화면')).toBeTruthy()
    expect(
      screen.getByRole('heading', { level: 1, name: '말씀해 주세요' }),
    ).toBeTruthy()
    expect(
      screen.getByText('음성을 인식하여 정확하게 도와드릴게요.'),
    ).toBeTruthy()
    expect(screen.getByText('듣는 중...')).toBeTruthy()
    expect(screen.getByRole('heading', { name: '인식된 말' })).toBeTruthy()
    expect(screen.getByText('“밥은 조금 먹었고...”')).toBeTruthy()
    expect(screen.getByRole('button', { name: '말 끝났어요' })).toBeTruthy()
    expect(screen.getByRole('button', { name: '다시 말할게요' })).toBeTruthy()
    expect(
      container.querySelector('img[src="/assets/dolbomon/voice/마이크.png"]'),
    ).toBeTruthy()
  })

  it('moves to the meal check after speech is finished', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/elder/voice/listening']}>
        <Routes>
          <Route
            path="/elder/voice/listening"
            element={<ElderVoiceListeningPage />}
          />
          <Route
            path="/elder/check/meal"
            element={<p>식사 상태 입력 화면</p>}
          />
        </Routes>
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: '말 끝났어요' }))

    expect(await screen.findByText('식사 상태 입력 화면')).toBeTruthy()
  })
})
