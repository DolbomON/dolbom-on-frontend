import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { WorkerCaseNoteCreatePage } from './WorkerCaseNoteCreatePage'

function renderWorkerCaseNoteCreatePage(
  initialPath = '/worker/elders/kim-yeongja/case-note',
) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route
          path="/worker/elders/:elderId/case-note"
          element={<WorkerCaseNoteCreatePage />}
        />
        <Route
          path="/worker/elders/:elderId"
          element={<div>대상자 상세 화면</div>}
        />
        <Route path="/worker/elders" element={<div>대상자 목록 화면</div>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('WorkerCaseNoteCreatePage', () => {
  it('renders the welfare worker case note form', () => {
    renderWorkerCaseNoteCreatePage()

    expect(
      screen.getByRole('heading', { name: '사례관리 메모 작성' }),
    ).toBeInTheDocument()
    expect(screen.getByText('대상자: 김영자 어르신')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '전화 상담' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(
      screen.getByRole('button', { name: '방문 상담' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '보호자 상담' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '정상' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '주의' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('button', { name: '위험' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '긴급' })).toBeInTheDocument()
    expect(screen.getByLabelText('상담 내용')).toBeInTheDocument()
    expect(screen.getByLabelText('조치 사항')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '배정 안 함' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '요양사 배정' }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('다음 확인 일정')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '저장하기' })).toBeInTheDocument()
  })

  it('updates option selections and saves back to the elder detail page', async () => {
    const user = userEvent.setup()

    renderWorkerCaseNoteCreatePage()

    await user.click(screen.getByRole('button', { name: '방문 상담' }))
    await user.click(screen.getByRole('button', { name: '위험' }))
    await user.click(screen.getByRole('button', { name: '요양사 배정' }))
    await user.click(screen.getByRole('button', { name: '연락 완료' }))
    await user.type(screen.getByLabelText('상담 내용'), '식사량 감소 상담')
    await user.type(screen.getByLabelText('조치 사항'), '요양사 확인 요청')
    await user.click(screen.getByRole('button', { name: '저장하기' }))

    expect(screen.getByText('대상자 상세 화면')).toBeInTheDocument()
  })

  it('shows validation when required text is missing', async () => {
    const user = userEvent.setup()

    renderWorkerCaseNoteCreatePage()

    await user.click(screen.getByRole('button', { name: '저장하기' }))

    expect(screen.getByRole('alert')).toHaveTextContent(
      '상담 내용과 조치 사항을 입력해 주세요.',
    )
  })

  it('renders a friendly not-found state for an unknown elderId', () => {
    renderWorkerCaseNoteCreatePage('/worker/elders/unknown-elder/case-note')

    expect(
      screen.getByRole('heading', {
        name: '대상자 정보를 찾을 수 없어요.',
      }),
    ).toBeInTheDocument()
    expect(
      within(screen.getByRole('main')).getByRole('link', {
        name: '대상자 목록으로 돌아가기',
      }),
    ).toHaveAttribute('href', '/worker#risk-elder-panel')
  })
})
