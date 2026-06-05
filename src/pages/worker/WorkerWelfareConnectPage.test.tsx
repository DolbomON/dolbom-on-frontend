import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { WorkerWelfareConnectPage } from './WorkerWelfareConnectPage'

function renderWorkerWelfareConnectPage() {
  return render(
    <MemoryRouter initialEntries={['/worker/elders/kim-yeongja/care-team']}>
      <WorkerWelfareConnectPage />
    </MemoryRouter>,
  )
}

describe('WorkerWelfareConnectPage', () => {
  it('renders the welfare connection management screen', () => {
    renderWorkerWelfareConnectPage()

    expect(
      screen.getByRole('heading', { name: '돌봄팀 관리' }),
    ).toBeInTheDocument()
    expect(screen.getByText('김영자 어르신')).toBeInTheDocument()
    expect(screen.getByText('연결된 가족 2명')).toBeInTheDocument()
    expect(screen.getByText('담당 요양사 1명')).toBeInTheDocument()
    expect(screen.getByText('담당 복지사 1명')).toBeInTheDocument()
    expect(screen.getByText('돌봄팀 연결 상태 정상')).toBeInTheDocument()

    const familySection = screen
      .getByRole('heading', {
        name: '연결된 가족',
      })
      .closest('section')

    expect(familySection).toBeTruthy()
    expect(
      within(familySection as HTMLElement).getByText('이순자'),
    ).toBeInTheDocument()
    expect(
      within(familySection as HTMLElement).getByText('박철수'),
    ).toBeInTheDocument()
    expect(
      within(familySection as HTMLElement).getAllByRole('button', {
        name: '권한 변경',
      }),
    ).toHaveLength(2)

    expect(
      screen.getByRole('heading', { name: '권한 요약' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '최근 변경 내역' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '가족 초대' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '요양사 배정' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '초대 링크 복사' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '복지 현황' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })
})
