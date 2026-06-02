import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { CaregiverVisitRecordsPage } from './CaregiverVisitRecordsPage'

function renderVisitRecordsPage() {
  return render(
    <MemoryRouter initialEntries={['/caregiver/records']}>
      <CaregiverVisitRecordsPage />
    </MemoryRouter>,
  )
}

describe('CaregiverVisitRecordsPage', () => {
  it('renders the caregiver visit record management screen', () => {
    renderVisitRecordsPage()

    expect(
      screen.getByRole('heading', { name: '방문 기록 관리' }),
    ).toBeInTheDocument()
    expect(screen.getByText('전체 기록')).toBeInTheDocument()
    expect(screen.getAllByText('미작성').length).toBeGreaterThan(0)
    expect(screen.getAllByText('작성 완료').length).toBeGreaterThan(0)
    expect(screen.getByText('위험 기록')).toBeInTheDocument()
    const recordList = screen.getByRole('region', { name: '방문 기록 목록' })

    expect(within(recordList).getByText('김영자님')).toBeInTheDocument()
    expect(within(recordList).getByText('2025.05.31 10:30')).toBeInTheDocument()
    expect(
      within(recordList).getByText(
        '식사량이 줄고 수면 중 자주 깨는 편입니다.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '기록 진행 현황' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '최근 방문 메모' }),
    ).toBeInTheDocument()

    const caregiverMenu = screen.getByRole('navigation', {
      name: '요양사 메뉴',
    })

    expect(
      within(caregiverMenu).getByRole('link', { name: '방문기록' }),
    ).toHaveAttribute('aria-current', 'page')
  })

  it('filters records by status and search text', async () => {
    const user = userEvent.setup()

    renderVisitRecordsPage()
    const recordList = screen.getByRole('region', { name: '방문 기록 목록' })

    await user.click(screen.getByRole('button', { name: '작성 완료' }))

    expect(within(recordList).getByText('박철수님')).toBeInTheDocument()
    expect(within(recordList).queryByText('김영자님')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '전체' }))
    await user.type(
      screen.getByLabelText('방문 기록 검색'),
      '혈압 확인 필요',
    )

    expect(within(recordList).getByText('이순자님')).toBeInTheDocument()
    expect(within(recordList).queryByText('박철수님')).not.toBeInTheDocument()
  })
})
