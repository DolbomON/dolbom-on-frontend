import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import {
  caregiverAssignmentStorageKey,
  type CaregiverAssignment,
} from '../../features/caregiver/visitAssignments'
import { CaregiverAssignmentsPage } from './CaregiverAssignmentsPage'

function renderCaregiverAssignments() {
  return render(
    <MemoryRouter initialEntries={['/caregiver/assignments']}>
      <CaregiverAssignmentsPage />
    </MemoryRouter>,
  )
}

describe('CaregiverAssignmentsPage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('renders assigned care work with primary actions and assistant panels', () => {
    renderCaregiverAssignments()

    expect(screen.getAllByRole('heading', { name: '오늘 업무' })).toHaveLength(
      2,
    )
    expect(screen.getAllByText('오늘 업무').length).toBeGreaterThan(1)
    expect(screen.getAllByText('오늘 마감').length).toBeGreaterThan(0)
    expect(
      screen.getByRole('heading', { name: '김영자님 방문 확인 요청' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('식사량과 저녁 복약 여부를 확인해주세요.'),
    ).toBeInTheDocument()

    expect(
      screen.getAllByRole('link', { name: '방문 시작' })[0],
    ).toHaveAttribute('href', '/caregiver/elders/kim-yeongja')
    expect(
      screen.getAllByRole('link', { name: '전화하기' })[0],
    ).toHaveAttribute('href', 'tel:01012345678')
    expect(
      screen.getAllByRole('link', { name: '기록 작성' })[0],
    ).toHaveAttribute('href', '/caregiver/elders/kim-yeongja/visit-record')

    expect(
      screen.getByRole('heading', { name: '오늘 일정' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '빠른 연락' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '업무 체크' }),
    ).toBeInTheDocument()

    const caregiverMenu = screen.getByRole('navigation', {
      name: '요양사 메뉴',
    })

    expect(
      within(caregiverMenu).getByRole('link', { name: '홈' }),
    ).toHaveAttribute('href', '/caregiver')
    expect(
      within(caregiverMenu).getByRole('link', { name: '오늘 업무' }),
    ).toHaveAttribute('aria-current', 'page')
    expect(
      within(caregiverMenu).queryByRole('link', { name: '설정' }),
    ).not.toBeInTheDocument()
  })

  it('uses the latest worker assignment when one exists', () => {
    const assignment: CaregiverAssignment = {
      assignedCaregiver: '김민수 요양사',
      createdAt: '2026-06-01T09:00:00.000Z',
      dueTime: '오늘 12:00',
      elderId: 'lee-sunja',
      elderName: '이순자 어르신',
      priority: '긴급',
      requestContent: '통증 호소 확인 후 방문 기록을 남겨 주세요.',
    }

    window.localStorage.setItem(
      caregiverAssignmentStorageKey,
      JSON.stringify(assignment),
    )

    renderCaregiverAssignments()

    expect(
      screen.getByRole('heading', {
        name: '이순자 어르신 방문 확인 요청',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('통증 호소 확인 후 방문 기록을 남겨 주세요.'),
    ).toBeInTheDocument()
    expect(
      screen.getAllByRole('link', { name: '방문 시작' })[0],
    ).toHaveAttribute('href', '/caregiver/elders/lee-sunja')
  })
})
