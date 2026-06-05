import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { FamilyMemoPage } from './FamilyMemoPage'

describe('FamilyMemoPage', () => {
  it('renders the family memo screen', () => {
    render(
      <MemoryRouter>
        <FamilyMemoPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: '가족 메모' })).toBeTruthy()
    expect(
      screen.getByRole('link', { name: '가족 홈으로 뒤로가기' }),
    ).toHaveAttribute('href', '/family')
    expect(screen.queryByText('FAM-008')).not.toBeInTheDocument()
    expect(screen.queryByText('FAM-009')).not.toBeInTheDocument()
    expect(screen.getByText('오늘 꼭 확인할 내용')).toBeTruthy()
    expect(screen.getByText('병원 예약 문의하기')).toBeTruthy()
    expect(screen.getByText('정형외과 방문')).toBeTruthy()
    expect(screen.getByRole('link', { name: '새 메모 추가' })).toBeTruthy()
    expect(screen.getByRole('link', { name: '홈' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })
})
