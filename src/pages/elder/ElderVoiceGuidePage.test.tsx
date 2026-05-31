import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ElderVoiceGuidePage } from './ElderVoiceGuidePage'

describe('ElderVoiceGuidePage', () => {
  it('renders the voice guide screen with local assets', () => {
    const { container } = render(
      <MemoryRouter>
        <ElderVoiceGuidePage />
      </MemoryRouter>,
    )

    expect(screen.getByLabelText('음성 안내 화면')).toBeTruthy()
    expect(
      screen.getByRole('heading', { level: 1, name: '음성 안내' }),
    ).toBeTruthy()
    expect(screen.getByRole('button', { name: '음소거' })).toBeTruthy()
    expect(screen.getByText('오늘 식사는 어떠셨어요?')).toBeTruthy()
    expect(screen.getByText('화면을 읽어 드리고 있어요...')).toBeTruthy()
    expect(screen.getByRole('button', { name: '잠깐 멈춤' })).toBeTruthy()
    expect(screen.getByRole('button', { name: '다시 듣기' })).toBeTruthy()
    expect(screen.getByRole('link', { name: '다음 안내' })).toHaveAttribute(
      'href',
      '/elder/voice/listening',
    )

    expect(
      container.querySelector('img[src="/assets/dolbomon/voice/ai.png"]'),
    ).toBeTruthy()
    expect(
      container.querySelector('img[src="/assets/dolbomon/voice/image.png"]'),
    ).toBeTruthy()
    expect(
      container.querySelector('img[src="/assets/dolbomon/voice/일시정지.png"]'),
    ).toBeTruthy()
    expect(
      container.querySelector('img[src="/assets/dolbomon/voice/다시.png"]'),
    ).toBeTruthy()
  })

  it('toggles the mute control label', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <ElderVoiceGuidePage />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: '음소거' }))

    expect(screen.getByRole('button', { name: '소리 켜기' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })
})
