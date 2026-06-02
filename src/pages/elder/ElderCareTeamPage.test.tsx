import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ElderCareTeamPage } from './ElderCareTeamPage'

function renderElderCareTeamPage() {
  return render(
    <MemoryRouter initialEntries={['/elder/connect']}>
      <ElderCareTeamPage />
    </MemoryRouter>,
  )
}

describe('ElderCareTeamPage', () => {
  it('renders the elder care team connection screen', () => {
    renderElderCareTeamPage()

    expect(
      screen.getByRole('heading', { name: '내 돌봄팀' }),
    ).toBeInTheDocument()
    expect(screen.getByText('김영자')).toBeInTheDocument()
    expect(screen.getByText('어르신')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: '내 정보는 연결된 가족과 담당자에게만 공유돼요.',
      }),
    ).toBeInTheDocument()
    expect(screen.getAllByText('가족')[0]).toBeInTheDocument()
    expect(screen.getByText('2명')).toBeInTheDocument()
    expect(screen.getAllByText('복지사')[0]).toBeInTheDocument()
    expect(screen.getAllByText('요양사')[0]).toBeInTheDocument()

    const familySection = screen
      .getByRole('heading', { name: '가족' })
      .closest('section')

    expect(familySection).toBeTruthy()
    expect(
      within(familySection as HTMLElement).getByText('이순자'),
    ).toBeInTheDocument()
    expect(
      within(familySection as HTMLElement).getByText('박철수'),
    ).toBeInTheDocument()
    expect(
      within(familySection as HTMLElement).getAllByText('상태 요약 보기 가능'),
    ).toHaveLength(2)

    expect(
      screen.getByRole('heading', { name: '담당 복지사' }),
    ).toBeInTheDocument()
    expect(screen.getByText('이수진')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '담당 요양사' }),
    ).toBeInTheDocument()
    expect(screen.getByText('김민수')).toBeInTheDocument()

    expect(screen.getByText('DOLBOM-3942')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '초대코드 보내기' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '코드 복사' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '내 돌봄팀' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(
      screen.getByRole('heading', { name: '정보 공유 안내' }),
    ).toBeInTheDocument()
  })
})
