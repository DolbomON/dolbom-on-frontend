import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { WorkerMemoCreatePage } from './WorkerMemoCreatePage'

function renderWorkerMemoCreatePage(
  initialPath = '/worker/elders/kim-yeongja/memo',
) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route
          path="/worker/elders/:elderId/memo"
          element={<WorkerMemoCreatePage />}
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

describe('WorkerMemoCreatePage', () => {
  it('renders the consultation observation record form for the selected elder', () => {
    renderWorkerMemoCreatePage()

    expect(
      screen.getByRole('heading', { name: '상담 · 관찰 기록' }),
    ).toBeInTheDocument()
    expect(screen.getByText('김영자님')).toBeInTheDocument()
    expect(screen.getByText('84세 · 배우자와 거주')).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: '김영자님 상세 보기' }),
    ).toHaveAttribute('href', '/worker/elders/kim-yeongja')
    expect(screen.getByText('2025.05.31 (토)')).toBeInTheDocument()
    expect(screen.getByText('10:30 ~ 11:10')).toBeInTheDocument()
    expect(screen.getAllByText('김민수 요양사').length).toBeGreaterThan(0)
    expect(screen.getByText('위험 1')).toBeInTheDocument()
    expect(screen.getByText('주의 1')).toBeInTheDocument()
    expect(screen.getByText('안정 2')).toBeInTheDocument()

    expect(screen.getByLabelText(/방문 목적/)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '식사량 감소' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '수면 문제' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '통증 호소' }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText(/관찰 내용/)).toBeInTheDocument()
    expect(screen.getByLabelText(/상담 내용/)).toBeInTheDocument()
    expect(screen.getByLabelText('보호자 전달 사항')).toBeInTheDocument()
    expect(screen.getByLabelText('후속 조치 / 계획')).toBeInTheDocument()
    expect(screen.getByLabelText(/메모 작성/)).toBeInTheDocument()
    expect(screen.getAllByText('0/1000')).toHaveLength(4)
    expect(screen.getByText('0/1500')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '음성 녹음' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
    expect(
      screen.getByRole('button', { name: '사진 선택' }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('img', { name: /사진 첨부/ })).toHaveLength(3)
    expect(
      screen.getByRole('button', { name: '기록 저장' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '기록' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('renders detail data from the elderId URL param', () => {
    renderWorkerMemoCreatePage('/worker/elders/lee-sunja/memo')

    expect(screen.getByText('이순자님')).toBeInTheDocument()
    expect(screen.getByText('82세 · 독거')).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: '이순자님 상세 보기' }),
    ).toHaveAttribute('href', '/worker/elders/lee-sunja')
  })

  it('updates selected symptoms and audio memo state', async () => {
    const user = userEvent.setup()

    renderWorkerMemoCreatePage()

    const sleepButton = screen.getByRole('button', { name: '수면 문제' })
    const audioButton = screen.getByRole('button', { name: '음성 녹음' })

    await user.click(sleepButton)
    await user.click(audioButton)

    expect(sleepButton).toHaveAttribute('aria-pressed', 'true')
    expect(audioButton).toHaveAttribute('aria-pressed', 'true')
  })

  it('updates text character counters', async () => {
    const user = userEvent.setup()

    renderWorkerMemoCreatePage()

    await user.type(screen.getByLabelText(/관찰 내용/), 'abc')
    await user.type(screen.getByLabelText(/메모 작성/), '상담 완료')

    expect(screen.getByText('3/1000')).toBeInTheDocument()
    expect(screen.getByText('5/1500')).toBeInTheDocument()
  })

  it('removes a local photo attachment', async () => {
    const user = userEvent.setup()

    renderWorkerMemoCreatePage()

    const photoRegion = screen
      .getByRole('img', { name: '식사 사진 첨부' })
      .closest('div')

    expect(photoRegion).not.toBeNull()
    await user.click(
      within(photoRegion as HTMLElement).getByRole('button', {
        name: '식사 사진 첨부 삭제',
      }),
    )

    expect(
      screen.queryByRole('img', { name: '식사 사진 첨부' }),
    ).not.toBeInTheDocument()
    expect(screen.getAllByRole('img', { name: /사진 첨부/ })).toHaveLength(2)
  })

  it('shows inline validation messages when required fields are empty', async () => {
    const user = userEvent.setup()

    renderWorkerMemoCreatePage()

    await user.click(screen.getByRole('button', { name: '기록 저장' }))

    expect(screen.getByText('방문 목적을 선택해주세요.')).toBeInTheDocument()
    expect(screen.getByText('관찰 내용을 입력해주세요.')).toBeInTheDocument()
    expect(screen.getByText('상담 내용을 입력해주세요.')).toBeInTheDocument()
    expect(screen.getByText('메모를 입력해주세요.')).toBeInTheDocument()
    expect(screen.queryByText('대상자 상세 화면')).not.toBeInTheDocument()
  })

  it('navigates back to the elder detail page after a valid mock submit', async () => {
    const user = userEvent.setup()

    renderWorkerMemoCreatePage()

    await user.selectOptions(
      screen.getByLabelText(/방문 목적/),
      '정기 방문 관찰',
    )
    await user.type(
      screen.getByLabelText(/관찰 내용/),
      '식사량을 확인했습니다.',
    )
    await user.type(
      screen.getByLabelText(/상담 내용/),
      '수면 상태를 상담했습니다.',
    )
    await user.type(screen.getByLabelText(/메모 작성/), '보호자에게 공유 예정')
    await user.click(screen.getByRole('button', { name: '기록 저장' }))

    expect(screen.getByText('대상자 상세 화면')).toBeInTheDocument()
  })

  it('navigates back to the elder detail page when back is clicked', async () => {
    const user = userEvent.setup()

    renderWorkerMemoCreatePage()

    await user.click(
      screen.getByRole('button', { name: '어르신 상세로 돌아가기' }),
    )

    expect(screen.getByText('대상자 상세 화면')).toBeInTheDocument()
  })

  it('renders a friendly not-found state for an unknown elderId', () => {
    renderWorkerMemoCreatePage('/worker/elders/unknown-elder/memo')

    expect(
      screen.getByRole('heading', {
        name: '대상자 정보를 찾을 수 없어요.',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: '대상자 목록으로 돌아가기' }),
    ).toHaveAttribute('href', '/worker/elders')
  })
})
