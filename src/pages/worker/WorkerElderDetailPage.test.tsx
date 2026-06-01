import { render, screen, within } from '@testing-library/react'
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
  it('renders the redesigned elder status detail dashboard', () => {
    renderWorkerElderDetailPage()

    expect(
      screen.getByRole('heading', { name: '김영자님 상태 상세' }),
    ).toBeInTheDocument()
    expect(screen.getByText('84세 · 배우자와 거주')).toBeInTheDocument()
    expect(
      within(screen.getByRole('navigation', { name: '요양사 메뉴' })).getByRole(
        'link',
        { name: '방문 기록' },
      ),
    ).toHaveAttribute('aria-current', 'page')

    const statusRegion = screen.getByLabelText('오늘 주요 상태')
    expect(
      within(statusRegion).getByRole('heading', { name: '식사' }),
    ).toBeInTheDocument()
    expect(
      within(statusRegion).getByRole('heading', { name: '복약' }),
    ).toBeInTheDocument()
    expect(
      within(statusRegion).getByRole('heading', { name: '통증' }),
    ).toBeInTheDocument()
    expect(
      within(statusRegion).getByRole('heading', { name: '기분' }),
    ).toBeInTheDocument()
    expect(
      within(statusRegion).getByRole('heading', { name: '수면' }),
    ).toBeInTheDocument()
    expect(within(statusRegion).getByText('먹음')).toBeInTheDocument()
    expect(within(statusRegion).getByText('잘 잠')).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: 'AI 생활 상태 요약' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '오늘 방문 기록' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '가족 연락처' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '복지사 요청사항' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '최근 방문 기록' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '주간 변화 추이' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '방문 기록 추가' }),
    ).toBeInTheDocument()
    expect(
      screen.getAllByRole('button', { name: '방문 기록 작성' }).length,
    ).toBeGreaterThanOrEqual(1)
    expect(screen.getByRole('button', { name: '최근 7일' })).toBeInTheDocument()
  })

  it('renders detail identity from the elderId URL param', () => {
    renderWorkerElderDetailPage('/worker/elders/lee-sunja')

    expect(
      screen.getByRole('heading', { name: '이순자님 상태 상세' }),
    ).toBeInTheDocument()
    expect(screen.getByAltText('이순자님 프로필')).toBeInTheDocument()
    expect(screen.getByText('82세 · 독거')).toBeInTheDocument()
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

  it('navigates to memo creation from the memo action', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/worker/elders/kim-yeongja']}>
        <Routes>
          <Route
            path="/worker/elders/:elderId"
            element={<WorkerElderDetailPage />}
          />
          <Route
            path="/worker/elders/:elderId/memo"
            element={<div>방문 기록 작성 화면</div>}
          />
        </Routes>
      </MemoryRouter>,
    )

    await user.click(
      screen.getAllByRole('button', { name: '방문 기록 작성' })[0],
    )

    expect(screen.getByText('방문 기록 작성 화면')).toBeInTheDocument()
  })
})
