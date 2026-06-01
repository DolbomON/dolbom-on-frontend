import { render, screen } from '@testing-library/react'
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

    expect(
      screen.getByRole('heading', { name: '담당 어르신 대시보드' }),
    ).toBeInTheDocument()
    expect(screen.getAllByText('김영자님').length).toBeGreaterThan(0)
    expect(screen.getByText('담당 어르신')).toBeInTheDocument()
    expect(screen.getByText('10:30 ~ 11:10')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '길찾기' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '전화하기' })).toHaveAttribute(
      'href',
      'tel:01012345678',
    )
    expect(screen.getByRole('link', { name: '방문 시작' })).toHaveAttribute(
      'href',
      '/worker/elders/kim-yeongja/memo',
    )
    expect(
      screen.getByRole('heading', { name: '최근 방문 기록' }),
    ).toBeInTheDocument()
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
