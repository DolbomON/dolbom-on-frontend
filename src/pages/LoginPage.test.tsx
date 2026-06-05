import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { LoginPage } from './LoginPage'

function renderLoginPage() {
  return render(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/select-role" element={<div>이용 유형 선택 화면</div>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('LoginPage', () => {
  it('goes directly to role selection when the login button is pressed', async () => {
    const user = userEvent.setup()
    renderLoginPage()

    expect(screen.getByRole('heading', { name: '로그인' })).toBeInTheDocument()
    expect(screen.getByLabelText('아이디')).toBeInTheDocument()
    expect(screen.getByLabelText('비밀번호')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '로그인' }))

    expect(screen.getByText('이용 유형 선택 화면')).toBeInTheDocument()
  })

  it('does not block short passwords before moving to role selection', async () => {
    const user = userEvent.setup()
    renderLoginPage()

    await user.type(screen.getByLabelText('아이디'), 'elder@example.com')
    await user.type(screen.getByLabelText('비밀번호'), '1')
    await user.click(screen.getByRole('button', { name: '로그인' }))

    expect(screen.getByText('이용 유형 선택 화면')).toBeInTheDocument()
  })
})
