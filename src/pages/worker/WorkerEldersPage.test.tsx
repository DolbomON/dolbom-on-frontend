import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { WorkerEldersPage } from './WorkerEldersPage'

function renderWorkerEldersPage() {
  return render(
    <MemoryRouter initialEntries={['/worker/elders']}>
      <WorkerEldersPage />
    </MemoryRouter>,
  )
}

describe('WorkerEldersPage', () => {
  it('renders the assigned elder management screen', () => {
    renderWorkerEldersPage()

    expect(
      screen.getByRole('heading', { name: '대상자 관리' }),
    ).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('이름 또는 상태로 검색'),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '전체' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('button', { name: '위험' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '주의' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '안정' })).toBeInTheDocument()
    expect(screen.getByText('김영자님')).toBeInTheDocument()
    expect(screen.getByText('이순자님')).toBeInTheDocument()
    expect(screen.getByText('박철수님')).toBeInTheDocument()
    expect(screen.getByText('최복례님')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '빠른 작업' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '대상자' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('filters the elder list by risk status', async () => {
    const user = userEvent.setup()

    renderWorkerEldersPage()

    await user.click(screen.getByRole('button', { name: '위험' }))

    expect(screen.queryByText('김영자님')).not.toBeInTheDocument()
    expect(screen.getByText('이순자님')).toBeInTheDocument()
    expect(screen.queryByText('박철수님')).not.toBeInTheDocument()
    expect(screen.queryByText('최복례님')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '전체' }))

    expect(screen.getByText('김영자님')).toBeInTheDocument()
    expect(screen.getByText('이순자님')).toBeInTheDocument()
    expect(screen.getByText('박철수님')).toBeInTheDocument()
    expect(screen.getByText('최복례님')).toBeInTheDocument()
  })

  it('filters the elder list by search query', async () => {
    const user = userEvent.setup()

    renderWorkerEldersPage()

    await user.type(
      screen.getByRole('searchbox', { name: '대상자 검색' }),
      '수면',
    )

    expect(screen.queryByText('김영자님')).not.toBeInTheDocument()
    expect(screen.queryByText('이순자님')).not.toBeInTheDocument()
    expect(screen.getByText('박철수님')).toBeInTheDocument()
    expect(screen.queryByText('최복례님')).not.toBeInTheDocument()
  })
})
