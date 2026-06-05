import { render, screen, within } from '@testing-library/react'
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
    expect(screen.getAllByRole('link', { name: '상담 작성' })).toHaveLength(5)
    expect(
      screen.getAllByRole('link', { name: '상담 작성' })[0],
    ).toHaveAttribute('href', '/worker/elders/kim-yeongja/case-note')
    expect(screen.getByRole('link', { name: '요양사 배정' })).toHaveAttribute(
      'href',
      '/worker#risk-elder-panel',
    )
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

    const dialog = screen.getByRole('dialog', { name: '요양사 업무 배정' })

    expect(
      within(dialog).getByRole('heading', { name: '요양사 업무 배정' }),
    ).toBeInTheDocument()
    expect(within(dialog).getByText('대상자')).toBeInTheDocument()
    expect(within(dialog).getByText('김영자 어르신')).toBeInTheDocument()
    expect(within(dialog).getByText('요청 내용')).toBeInTheDocument()
    expect(
      within(dialog).getByText(
        /식사량 감소 원인을 확인하고\s*저녁 약 복용 여부/,
      ),
    ).toBeInTheDocument()
    expect(within(dialog).getByText('우선순위')).toBeInTheDocument()
    expect(
      within(dialog).getByRole('button', { name: '주의' }),
    ).toHaveAttribute('aria-pressed', 'true')
    expect(within(dialog).getByText('담당 요양사')).toBeInTheDocument()
    expect(within(dialog).getByText('김민수 요양사')).toBeInTheDocument()
    expect(within(dialog).getByText('마감 시간')).toBeInTheDocument()
    expect(within(dialog).getByText('오늘 15:00')).toBeInTheDocument()
    expect(
      within(dialog).getByRole('button', { name: '취소' }),
    ).toBeInTheDocument()

    await user.click(within(dialog).getByRole('button', { name: '배정하기' }))

    expect(screen.getByRole('status')).toHaveTextContent(
      '김영자 어르신 새 배정 업무가 요양사 대시보드에 전달되었습니다.',
    )
  })

  it('keeps top notifications from opening the risk response modal', () => {
    render(
      <MemoryRouter initialEntries={['/worker']}>
        <WorkerDashboardPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('img', { name: '알림 3건' })).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: '알림 3건' }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: '알림 3건' }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('dialog', { name: '위험 대응 상세' }),
    ).not.toBeInTheDocument()
  })
})
