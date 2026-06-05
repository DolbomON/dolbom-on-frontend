import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { RoleMypagePage } from './RoleMypagePage'

function renderRoleMypage(role: 'caregiver' | 'elder' | 'family') {
  return render(
    <MemoryRouter initialEntries={[`/${role}/mypage`]}>
      <RoleMypagePage role={role} />
    </MemoryRouter>,
  )
}

describe('RoleMypagePage', () => {
  it('renders family mypage settings', () => {
    renderRoleMypage('family')

    expect(
      screen.getByRole('heading', { name: '마이페이지' }),
    ).toBeInTheDocument()
    expect(screen.getByText('김하나님')).toBeInTheDocument()
    expect(screen.getByText('가족 계정')).toBeInTheDocument()
    expect(screen.getByText('마이페이지 설정')).toBeInTheDocument()
    expect(screen.getByText('긴급 알림 받기')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /알림 설정/ })).toHaveAttribute(
      'href',
      '/family/alerts#notification-settings',
    )
  })

  it('renders caregiver mypage settings', () => {
    renderRoleMypage('caregiver')

    expect(screen.getByText('김민수')).toBeInTheDocument()
    expect(screen.getByText('요양사')).toBeInTheDocument()
    expect(screen.getByText('방문 전 알림 받기')).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /포트폴리오 관리/ }),
    ).toHaveAttribute('href', '/caregiver/portfolio')
  })

  it('renders elder mypage settings and announces save', async () => {
    const user = userEvent.setup()

    renderRoleMypage('elder')

    expect(screen.getByText('김영자님')).toBeInTheDocument()
    expect(screen.getByText('어르신 계정')).toBeInTheDocument()
    expect(screen.getByText('큰 글씨 유지')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /내 돌봄팀/ })).toHaveAttribute(
      'href',
      '/elder/care-team',
    )

    await user.click(screen.getByRole('button', { name: /설정 저장/ }))

    expect(
      screen.getByRole('button', { name: /설정 저장/ }),
    ).toBeInTheDocument()
  })
})
