import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { FamilyChatPage } from './FamilyChatPage'

describe('FamilyChatPage', () => {
  it('renders the family AI conversation screen', () => {
    render(
      <MemoryRouter>
        <FamilyChatPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'AI 안부 대화' })).toBeTruthy()
    expect(screen.getByText('오늘의 안부 요약')).toBeTruthy()
    expect(screen.getByText(/안녕하세요, 김영자님/)).toBeTruthy()
    expect(screen.getByText('무릎이 좀 아파요.')).toBeTruthy()
    expect(screen.getByRole('button', { name: '식사 자세히' })).toBeTruthy()
    expect(
      screen.getByRole('button', { name: '음성 대화 다시 듣기' }),
    ).toBeTruthy()
    expect(screen.getByRole('link', { name: '대화' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })
})
