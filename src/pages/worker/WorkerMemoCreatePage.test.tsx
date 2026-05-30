import { render, screen } from '@testing-library/react'
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
  it('renders the memo creation form for the selected elder', () => {
    renderWorkerMemoCreatePage()

    expect(
      screen.getByRole('heading', { name: '상담 메모 작성' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('상담 내용을 기록하고 다음 계획을 남겨주세요.'),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '작성 가이드' }),
    ).toBeInTheDocument()
    expect(screen.getByText('김영자님')).toBeInTheDocument()
    expect(screen.getByText('78세 · 독거')).toBeInTheDocument()
    expect(
      screen.getByText('담당자: 이복지 선임사회복지사'),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: '김영자님 상세 보기' }),
    ).toHaveAttribute('href', '/worker/elders/kim-yeongja')
    expect(
      screen.getByRole('heading', { name: '상담 방식' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '전화 상담' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(
      screen.getByRole('button', { name: '방문 상담' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '문자 상담' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '상담 일시' }),
    ).toBeInTheDocument()
    expect(screen.getByText('2024.05.29 (수) 14:30')).toBeInTheDocument()
    expect(screen.getByLabelText('상담 내용')).toBeInTheDocument()
    expect(screen.getByLabelText('조치 사항')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '다음 확인 일정' }),
    ).toBeInTheDocument()
    expect(screen.getByText('2024.06.05 (수)')).toBeInTheDocument()
    expect(screen.getByText('10:00')).toBeInTheDocument()
    expect(screen.getAllByText('0 / 500')).toHaveLength(2)
    expect(
      screen.getByText(
        '메모는 담당팀과 공유되며, 어르신의 돌봄 관리에 활용됩니다.',
      ),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '취소' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '저장하기' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '대상자' })).toHaveAttribute(
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

  it('changes the selected consultation method', async () => {
    const user = userEvent.setup()

    renderWorkerMemoCreatePage()

    await user.click(screen.getByRole('button', { name: '방문 상담' }))

    expect(screen.getByRole('button', { name: '방문 상담' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('button', { name: '전화 상담' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
  })

  it('updates the consultation content character counter', async () => {
    const user = userEvent.setup()

    renderWorkerMemoCreatePage()

    await user.type(screen.getByLabelText('상담 내용'), 'abc')

    expect(screen.getByText('3 / 500')).toBeInTheDocument()
  })

  it('shows an inline validation message when memo content is empty', async () => {
    const user = userEvent.setup()

    renderWorkerMemoCreatePage()

    await user.click(screen.getByRole('button', { name: '저장하기' }))

    expect(screen.getByText('상담 내용을 입력해주세요.')).toBeInTheDocument()
    expect(screen.queryByText('대상자 상세 화면')).not.toBeInTheDocument()
  })

  it('navigates back to the elder detail page after a valid mock submit', async () => {
    const user = userEvent.setup()

    renderWorkerMemoCreatePage()

    await user.type(screen.getByLabelText('상담 내용'), '상담 완료')
    await user.click(screen.getByRole('button', { name: '저장하기' }))

    expect(screen.getByText('대상자 상세 화면')).toBeInTheDocument()
  })

  it('navigates back to the elder detail page when cancel is clicked', async () => {
    const user = userEvent.setup()

    renderWorkerMemoCreatePage()

    await user.click(screen.getByRole('button', { name: '취소' }))

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
