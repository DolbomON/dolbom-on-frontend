import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { WorkerConsultationsPage } from './WorkerConsultationsPage'

describe('WorkerConsultationsPage', () => {
  it('renders the consultation management dashboard', () => {
    render(
      <MemoryRouter initialEntries={['/worker/consultations']}>
        <WorkerConsultationsPage />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: '상담 관리' }),
    ).toBeInTheDocument()
    expect(screen.getByText('오늘 상담')).toBeInTheDocument()
    expect(screen.getByText('미작성 메모')).toBeInTheDocument()
    expect(screen.getByText('고위험 대상')).toBeInTheDocument()
    expect(screen.getByText('완료 건수')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '상담 기록 목록' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '빠른 템플릿' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '최근 메모 목록' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '다음 방문 예정' }),
    ).toBeInTheDocument()
    expect(screen.getByText('김영자 어르신')).toBeInTheDocument()
    expect(screen.getByText('정만수 어르신')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '상담 관리' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(screen.getAllByRole('link', { name: '상담 작성' })).toHaveLength(5)
  })

  it('filters consultation records by status and search text', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/worker/consultations']}>
        <WorkerConsultationsPage />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: '위험' }))

    expect(screen.getByText('김영자 어르신')).toBeInTheDocument()
    expect(screen.getByText('정만수 어르신')).toBeInTheDocument()
    expect(screen.queryByText('이순자 어르신')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '전체' }))
    await user.type(screen.getByRole('searchbox'), '수면')

    expect(screen.getByText('이순자 어르신')).toBeInTheDocument()
    expect(screen.getByText('정만수 어르신')).toBeInTheDocument()
    expect(screen.queryByText('김영자 어르신')).not.toBeInTheDocument()
  })
})
