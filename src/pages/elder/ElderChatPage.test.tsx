import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ElderChatPage } from './ElderChatPage'

describe('ElderChatPage', () => {
  it('renders the cleaned AI chat screen', () => {
    const { container } = render(
      <MemoryRouter>
        <ElderChatPage />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { level: 1, name: 'AI 안부 대화' }),
    ).toBeTruthy()
    expect(
      screen.queryByText('김영자님, 오늘 하루는 어떠셨어요?'),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText('편하게 말씀해주시면 제가 정리해드릴게요.'),
    ).not.toBeInTheDocument()

    expect(screen.getByText('오늘의 안부를 대화로 남겨보세요')).toBeTruthy()
    expect(
      screen.getByText('음성 또는 텍스트로 편하게 이야기할 수 있어요.'),
    ).toBeTruthy()
    expect(
      container.querySelector('img[src="/assets/dolbomon/image.png"]'),
    ).toBeTruthy()
    expect(
      container.querySelector(
        'img[src="/assets/dolbomon/elder-chat/ai-chat-robot.png"]',
      ),
    ).toBeTruthy()

    expect(screen.getByText(/안녕하세요, 김영자님\./)).toBeTruthy()
    expect(screen.getByText(/오늘 기분은 어떠셨어요\?/)).toBeTruthy()
    expect(screen.getByText('기분은 괜찮았어요.')).toBeTruthy()
    expect(screen.getByText('식사와 약은 잘 챙기셨나요?')).toBeTruthy()
    expect(screen.getByText('네, 식사도 했고 약도 먹었어요.')).toBeTruthy()

    expect(screen.getByRole('button', { name: '좋아요' })).toBeTruthy()
    expect(screen.getByRole('button', { name: '조금 피곤해요' })).toBeTruthy()
    expect(screen.getByRole('button', { name: '도움이 필요해요' })).toBeTruthy()
    expect(
      screen.getByRole('button', { name: '음성으로 계속하기' }),
    ).toBeTruthy()
    expect(
      screen.queryByRole('button', { name: '대화 마치기' }),
    ).not.toBeInTheDocument()

    expect(screen.getByRole('button', { name: '알림 보기' })).toBeTruthy()
    expect(screen.getByRole('link', { name: '안부대화' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })
})
