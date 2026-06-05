import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import {
  caregiverAssignmentStorageKey,
  type CaregiverAssignment,
} from '../../features/caregiver/visitAssignments'
import { CaregiverDashboardPage } from './CaregiverDashboardPage'

function renderCaregiverDashboard() {
  return render(
    <MemoryRouter initialEntries={['/caregiver']}>
      <CaregiverDashboardPage />
    </MemoryRouter>,
  )
}

describe('CaregiverDashboardPage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('focuses the caregiver home on today visit work and next visit actions', () => {
    renderCaregiverDashboard()

    expect(screen.getByRole('heading', { name: '홈' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: '알림 3건' })).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: '알림 3건' }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: '알림 3건' }),
    ).not.toBeInTheDocument()
    expect(screen.getAllByText('김영자님').length).toBeGreaterThan(0)
    expect(screen.getAllByText('담당 어르신').length).toBeGreaterThan(0)
    expect(screen.getByText('10:30 ~ 11:10')).toBeInTheDocument()
    expect(
      screen.getByText((_, element) => {
        return (
          element?.tagName.toLowerCase() === 'p' &&
          element?.textContent === '복지사 요청: 식사량과 복약 여부 확인'
        )
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '길찾기' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '전화하기' })).toHaveAttribute(
      'href',
      'tel:01012345678',
    )
    expect(
      screen.getAllByRole('link', { name: '방문 시작' })[0],
    ).toHaveAttribute('href', '/caregiver/elders/kim-yeongja')
    expect(
      screen.getByRole('heading', { name: '최근 방문 기록' }),
    ).toBeInTheDocument()
    const quickMenu = screen.getByRole('region', { name: '빠른 메뉴' })

    expect(
      within(quickMenu).getByRole('link', { name: '방문 시작' }),
    ).toHaveAttribute('href', '/caregiver/elders/kim-yeongja')
    expect(
      within(quickMenu).getByRole('link', { name: '방문 기록' }),
    ).toHaveAttribute('href', '/caregiver/records')
    expect(
      within(quickMenu).getByRole('link', { name: '방문 일정' }),
    ).toHaveAttribute('href', '/caregiver/schedules')
    expect(
      within(quickMenu).getByRole('link', { name: '담당 어르신' }),
    ).toHaveAttribute('href', '/caregiver/elders/kim-yeongja')
    expect(
      within(quickMenu).getByRole('link', { name: '포트폴리오' }),
    ).toHaveAttribute('href', '/caregiver/portfolio')
    expect(
      within(quickMenu).queryByRole('link', { name: '요양사 가입 정보' }),
    ).toBeNull()
    expect(
      within(quickMenu).queryByRole('link', { name: '담당 어르신 목록' }),
    ).toBeNull()
    expect(
      screen.getByRole('link', { name: '새 배정 업무 보기' }),
    ).toHaveAttribute('href', '/caregiver/assignments')

    const caregiverMenu = screen.getByRole('navigation', {
      name: '요양사 메뉴',
    })

    expect(
      within(caregiverMenu).getByRole('link', { name: '홈' }),
    ).toHaveAttribute('href', '/caregiver')
    expect(
      within(caregiverMenu).getByRole('link', { name: '오늘 업무' }),
    ).toHaveAttribute('href', '/caregiver/assignments')
    expect(
      within(caregiverMenu).getByRole('link', { name: '방문일정' }),
    ).toHaveAttribute('href', '/caregiver/schedules')
    expect(
      within(caregiverMenu).getByRole('link', { name: '담당어르신' }),
    ).toHaveAttribute('href', '/caregiver/elders/kim-yeongja')
    expect(
      within(caregiverMenu).getByRole('link', { name: '어르신연결' }),
    ).toHaveAttribute('href', '/caregiver/connect')
    expect(
      within(caregiverMenu).getByRole('link', { name: '방문기록' }),
    ).toHaveAttribute('href', '/caregiver/records')
    expect(
      within(caregiverMenu).getByRole('link', { name: '포트폴리오' }),
    ).toHaveAttribute('href', '/caregiver/portfolio')
    expect(
      within(caregiverMenu).queryAllByRole('link', { name: '설정' }),
    ).toHaveLength(0)
    expect(
      within(caregiverMenu).queryAllByRole('link', { name: '전달사항' }),
    ).toHaveLength(0)
    expect(
      within(caregiverMenu).queryAllByRole('link', { name: '안부현황' }),
    ).toHaveLength(0)
    expect(
      within(caregiverMenu).queryAllByRole('link', { name: '기록' }),
    ).toHaveLength(0)
    expect(
      within(caregiverMenu).queryAllByRole('link', { name: '일정' }),
    ).toHaveLength(0)
    expect(
      within(caregiverMenu).queryAllByRole('link', { name: '가족메모' }),
    ).toHaveLength(0)
    expect(
      screen.getByRole('link', { name: '김민수 요양사 마이페이지' }),
    ).toHaveAttribute('href', '/caregiver/mypage')
    expect(screen.queryByRole('navigation', { name: '하단 메뉴' })).toBeNull()
  })

  it('shows the latest mock assignment from the worker dashboard', () => {
    const assignment: CaregiverAssignment = {
      assignedCaregiver: '김민수 요양사',
      createdAt: '2026-06-01T09:00:00.000Z',
      dueTime: '12:00',
      elderId: 'lee-sunja',
      elderName: '이순자 어르신',
      priority: '긴급',
      requestContent: '통증 호소 확인 후 방문 기록을 남겨 주세요.',
    }

    window.localStorage.setItem(
      caregiverAssignmentStorageKey,
      JSON.stringify(assignment),
    )

    renderCaregiverDashboard()

    expect(
      screen.getByRole('heading', { name: '새 배정 업무' }),
    ).toBeInTheDocument()
    expect(screen.getByText('이순자 어르신')).toBeInTheDocument()
    expect(
      screen.getByText('통증 호소 확인 후 방문 기록을 남겨 주세요.'),
    ).toBeInTheDocument()
  })
})
