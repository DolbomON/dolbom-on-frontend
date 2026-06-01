import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { WorkerDashboardPage } from './WorkerDashboardPage'

describe('WorkerDashboardPage', () => {
  it('renders the welfare worker home content and navigation', () => {
    render(
      <MemoryRouter initialEntries={['/worker']}>
        <WorkerDashboardPage />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', {
        name: '이수진 복지사님, 위험 대응 현황입니다.',
      }),
    ).toBeTruthy()
    expect(screen.getByText('관리 어르신')).toBeTruthy()
    expect(screen.getByText('김영자 어르신')).toBeTruthy()
    expect(screen.getByText('이순자 어르신')).toBeTruthy()
    expect(screen.getByText('박철수 어르신')).toBeTruthy()
    expect(screen.getByText('최복례 어르신')).toBeTruthy()
    expect(
      screen.getByRole('heading', { name: '고위험 어르신 우선순위' }),
    ).toBeTruthy()
    expect(screen.getByRole('heading', { name: '빠른 메뉴' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: '오늘 일정' })).toBeTruthy()
    expect(
      screen.getByRole('heading', { name: '최근 사례 관리 메모' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('heading', { name: '복지 서비스 연계 현황' }),
    ).toBeTruthy()
    expect(screen.getByRole('link', { name: '홈' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(screen.getAllByText('상세 보기')).toHaveLength(4)
    expect(screen.getAllByRole('button', { name: '요양사 배정' })).toHaveLength(
      3,
    )
  })

  it('opens the caregiver assignment modal and submits a mock assignment', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/worker']}>
        <WorkerDashboardPage />
      </MemoryRouter>,
    )

    await user.click(screen.getAllByRole('button', { name: '요양사 배정' })[0])

    expect(
      screen.getByRole('heading', { name: '요양사 배정' }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('어르신')).toHaveValue('김영자 어르신')
    expect(screen.getByLabelText('요청 내용')).toHaveValue(
      '식사 거르심,, 혈당 감소가 지속되고 있어요. 방문 확인 후 관찰 결과와 가족 인계 내용을 남겨 주세요.',
    )

    await user.selectOptions(screen.getByLabelText('우선순위'), '긴급')
    await user.click(screen.getByRole('button', { name: '배정하기' }))

    expect(screen.getByRole('status')).toHaveTextContent(
      '김영자 어르신 새 배정 업무가 요양사 대시보드에 전달되었습니다.',
    )
  })
})
