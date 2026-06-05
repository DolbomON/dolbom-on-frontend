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
  it('renders the welfare worker elder management dashboard', () => {
    renderWorkerElderDetailPage()

    expect(
      screen.getByRole('heading', { name: '대상 어르신 상세 관리' }),
    ).toBeInTheDocument()
    expect(screen.getByText(/82세/)).toBeInTheDocument()
    expect(screen.getByText(/배우자와 거주/)).toBeInTheDocument()
    expect(
      within(screen.getByRole('navigation', { name: '복지사 메뉴' })).getByRole(
        'link',
        { name: '복지 현황' },
      ),
    ).toHaveAttribute('aria-current', 'page')

    expect(
      screen.getByRole('heading', { name: '기본 정보' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '오늘 상태' }),
    ).toBeInTheDocument()
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
      screen.getByRole('heading', { name: '최근 상담 메모' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '주간 변화 추이' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '가족 연락처' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '복지사 조치' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '대응 상태' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: '상담 메모 작성' }),
    ).toHaveAttribute('href', '/worker/elders/kim-yeongja/case-note')
    expect(screen.getByRole('link', { name: '보고서 생성' })).toHaveAttribute(
      'href',
      '/worker/reports',
    )
    expect(screen.getByRole('link', { name: '요양사 배정' })).toHaveAttribute(
      'href',
      '/worker#risk-elder-panel',
    )
    expect(
      screen.queryByRole('button', { name: '방문 시작' }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: '방문 기록 작성' }),
    ).not.toBeInTheDocument()
  })

  it('keeps the caregiver pre-visit detail screen on the caregiver route', () => {
    render(
      <MemoryRouter initialEntries={['/caregiver/elders/kim-yeongja']}>
        <Routes>
          <Route
            path="/caregiver/elders/:elderId"
            element={<WorkerElderDetailPage />}
          />
        </Routes>
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: '김영자님 방문 전 확인' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '방문 전 참고 요약' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '방문 시작' }),
    ).toBeInTheDocument()
    expect(
      screen.getAllByRole('button', { name: '방문 기록 작성' }).length,
    ).toBeGreaterThanOrEqual(1)
  })

  it('renders detail identity from the elderId URL param', () => {
    renderWorkerElderDetailPage('/worker/elders/lee-sunja')

    expect(
      screen.getByRole('heading', { name: '대상 어르신 상세 관리' }),
    ).toBeInTheDocument()
    expect(screen.getByAltText('이순자님 프로필')).toBeInTheDocument()
    expect(screen.getByText(/82세/)).toBeInTheDocument()
    expect(screen.getByText(/독거/)).toBeInTheDocument()
  })

  it('keeps caregiver detail navigation on the caregiver detail route', () => {
    render(
      <MemoryRouter initialEntries={['/caregiver/elders/kim-yeongja']}>
        <Routes>
          <Route
            path="/caregiver/elders/:elderId"
            element={<WorkerElderDetailPage />}
          />
        </Routes>
      </MemoryRouter>,
    )

    expect(
      within(screen.getByRole('navigation', { name: '요양사 메뉴' })).getByRole(
        'link',
        { name: '담당어르신' },
      ),
    ).toHaveAttribute('aria-current', 'page')
    expect(
      screen.getByRole('link', { name: '전체 기록 보기' }),
    ).toHaveAttribute('href', '/caregiver/records')
    expect(
      screen.getByRole('link', { name: '어르신 정보 보기' }),
    ).toHaveAttribute('href', '/caregiver/elders/kim-yeongja')
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
    ).toHaveAttribute('href', '/worker#risk-elder-panel')
  })

  it('navigates to case note creation from the case note action', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/worker/elders/kim-yeongja']}>
        <Routes>
          <Route
            path="/worker/elders/:elderId"
            element={<WorkerElderDetailPage />}
          />
          <Route
            path="/worker/elders/:elderId/case-note"
            element={<div>사례관리 메모 작성 화면</div>}
          />
        </Routes>
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('link', { name: '상담 메모 작성' }))

    expect(screen.getByText('사례관리 메모 작성 화면')).toBeInTheDocument()
  })
})
