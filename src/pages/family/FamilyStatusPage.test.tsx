import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { FamilyStatusPage } from './FamilyStatusPage'

describe('FamilyStatusPage', () => {
  it('renders the family status overview screen', () => {
    render(
      <MemoryRouter>
        <FamilyStatusPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: '안부 현황' })).toBeTruthy()
    expect(screen.getByText('김영자 어르신')).toBeTruthy()
    expect(screen.getByText('가족 확인 완료')).toBeTruthy()
    expect(screen.getByText('무릎, 허리 불편')).toBeTruthy()
    expect(screen.getByRole('button', { name: '이상 징후 공유' })).toBeTruthy()
    expect(screen.getByRole('link', { name: '안부현황' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })
})
