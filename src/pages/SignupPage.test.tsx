import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { SignupPage } from './SignupPage'

function renderSignupPage() {
  return render(
    <MemoryRouter>
      <SignupPage />
    </MemoryRouter>,
  )
}

describe('SignupPage', () => {
  it('creates a common account with email, phone, password, and role', async () => {
    const user = userEvent.setup()
    renderSignupPage()

    expect(
      screen.getByRole('heading', { name: '회원가입' }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('이메일')).toBeInTheDocument()
    expect(screen.getByLabelText('전화번호')).toBeInTheDocument()
    expect(screen.getByLabelText('비밀번호')).toBeInTheDocument()
    expect(
      screen.getByText('이미 가입된 이메일 또는 전화번호는 계정 생성 시 바로 안내합니다.'),
    ).toBeInTheDocument()

    await user.type(screen.getByLabelText('이메일'), 'family@example.com')
    await user.type(screen.getByLabelText('전화번호'), '010-2222-3333')
    await user.type(screen.getByLabelText('비밀번호'), 'Dolbom123!')
    await user.type(screen.getByLabelText('비밀번호 확인'), 'Dolbom123!')
    await user.click(screen.getByRole('button', { name: '계정 생성' }))

    expect(screen.getByText('계정이 생성되었습니다.')).toBeInTheDocument()
    expect(screen.getByText(/생성된 계정:/)).toBeInTheDocument()
  })

  it('blocks duplicate signup identifiers', async () => {
    const user = userEvent.setup()
    renderSignupPage()

    await user.type(screen.getByLabelText('이메일'), 'already@dolbom-on.local')
    await user.type(screen.getByLabelText('비밀번호'), 'Dolbom123!')
    await user.type(screen.getByLabelText('비밀번호 확인'), 'Dolbom123!')
    await user.click(screen.getByRole('button', { name: '계정 생성' }))

    expect(
      screen.getByText('이미 가입된 이메일 또는 전화번호입니다.'),
    ).toBeInTheDocument()
  })
})
