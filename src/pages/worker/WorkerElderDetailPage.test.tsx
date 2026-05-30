import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { WorkerElderDetailPage } from './WorkerElderDetailPage'

function renderWorkerElderDetailPage(
  initialPath = '/worker/elders/kim-yeongja',
) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route
          path="/worker/elders/:elderId"
          element={<WorkerElderDetailPage />}
        />
      </Routes>
    </MemoryRouter>,
  )
}

describe('WorkerElderDetailPage', () => {
  it('renders the selected elder detail overview', () => {
    renderWorkerElderDetailPage()

    expect(
      screen.getByRole('heading', { name: '대상자 상세' }),
    ).toBeInTheDocument()
    expect(screen.getByText('김영자님')).toBeInTheDocument()
    expect(screen.getByText('오늘 기록')).toBeInTheDocument()
    expect(screen.getByText('주의 신호')).toBeInTheDocument()
    expect(screen.getByText('AI 요약')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '오늘' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('button', { name: '최근 7일' })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '최근 30일' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '오늘 상태 요약' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'AI 안부 요약' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '최근 활동' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '위험 기록 보기' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'AI 요약 다시 보기' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '대상자' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('renders detail data from the elderId URL param', () => {
    renderWorkerElderDetailPage('/worker/elders/lee-sunja')

    expect(screen.getByText('이순자님')).toBeInTheDocument()
    expect(
      screen.getByText('몸 불편 있음 · 최근 입력 08:47'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('이순자님의 최근 안부와 위험 신호를 확인하세요.'),
    ).toBeInTheDocument()
  })

  it('renders a friendly not-found state for an unknown elderId', () => {
    renderWorkerElderDetailPage('/worker/elders/unknown-elder')

    expect(
      screen.getByRole('heading', {
        name: '대상자 정보를 찾을 수 없어요.',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: '대상자 목록으로 돌아가기' }),
    ).toHaveAttribute('href', '/worker/elders')
  })

  it('updates the active period chip', async () => {
    const user = userEvent.setup()

    renderWorkerElderDetailPage()

    await user.click(screen.getByRole('button', { name: '최근 7일' }))

    expect(screen.getByRole('button', { name: '최근 7일' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('button', { name: '오늘' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )

    await user.click(screen.getByRole('button', { name: '최근 30일' }))

    expect(screen.getByRole('button', { name: '최근 30일' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })
})
