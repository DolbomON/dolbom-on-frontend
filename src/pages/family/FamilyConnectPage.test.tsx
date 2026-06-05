import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { FamilyConnectPage } from './FamilyConnectPage'

describe('FamilyConnectPage', () => {
  it('renders the family elder connection screen', () => {
    render(
      <MemoryRouter initialEntries={['/family/connect']}>
        <FamilyConnectPage />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: '어르신 연결' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', { name: '초대코드' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /연결 요청하기/ }),
    ).toBeInTheDocument()
    const topMenu = screen.getByRole('navigation', { name: '가족 화면 메뉴' })

    expect(
      within(topMenu).getByRole('link', { name: '어르신 연결' }),
    ).toHaveAttribute('aria-current', 'page')
    expect(within(topMenu).queryByRole('link', { name: '설정' })).toBeNull()
    expect(
      screen.getByRole('link', { name: '김하나님 가족 계정' }),
    ).toHaveAttribute('href', '/family/mypage')
    expect(screen.getByText('김영자님')).toBeInTheDocument()
    expect(screen.getByText('승인 완료')).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /오늘 상태 보기/ }),
    ).toHaveAttribute('href', '/family/status')
    expect(screen.getByText('안심 연결')).toBeInTheDocument()
    expect(screen.getByText('복지사 승인')).toBeInTheDocument()
    expect(screen.getByText('빠른 알림')).toBeInTheDocument()
  })
})
