import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ElderCheckPage } from './ElderCheckPage'

describe('ElderCheckPage', () => {
  it('renders the first medication check question', () => {
    render(
      <MemoryRouter>
        <ElderCheckPage />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: '오늘 약을 드셨나요?' }),
    ).toBeTruthy()
    expect(screen.getByRole('button', { name: '네, 먹었어요' })).toBeTruthy()
    expect(
      screen.getByRole('button', { name: '아직 못 먹었어요' }),
    ).toBeTruthy()
    expect(screen.getByRole('button', { name: '음성 안내' })).toBeTruthy()
    expect(screen.getByRole('link', { name: '상태입력' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('selects a medication answer locally', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <ElderCheckPage />
      </MemoryRouter>,
    )

    const notTakenButton = screen.getByRole('button', {
      name: '아직 못 먹었어요',
    })

    await user.click(notTakenButton)

    expect(notTakenButton).toHaveAttribute('aria-pressed', 'true')
  })
})
