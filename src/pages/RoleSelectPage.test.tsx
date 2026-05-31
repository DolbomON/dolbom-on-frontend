import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { RoleSelectPage } from './RoleSelectPage'

const headingName =
  '\uC774\uC6A9 \uC720\uD615\uC744 \uC120\uD0DD\uD574\uC8FC\uC138\uC694'
const elderRoleName = '\uC5B4\uB974\uC2E0'
const workerRoleName = '\uC694\uC591\uC0AC'
const nextButtonName = '\uB2E4\uC74C'

describe('RoleSelectPage', () => {
  it('enables the next button after selecting a role', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <RoleSelectPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: headingName })).toBeTruthy()

    const nextButton = screen.getByRole('button', { name: nextButtonName })
    expect(nextButton).toBeDisabled()

    const elderCard = screen.getByRole('button', { name: elderRoleName })
    await user.click(elderCard)

    expect(elderCard).toHaveAttribute('aria-pressed', 'true')
    expect(nextButton).toBeEnabled()
  })

  it('navigates elder users to the basic information screen', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/select-role']}>
        <Routes>
          <Route path="/select-role" element={<RoleSelectPage />} />
          <Route
            path="/elder/basic-info"
            element={<p>기본 정보 입력 화면</p>}
          />
        </Routes>
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: elderRoleName }))
    await user.click(screen.getByRole('button', { name: nextButtonName }))

    expect(screen.getByText('기본 정보 입력 화면')).toBeTruthy()
  })

  it('navigates care workers to the worker dashboard', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/select-role']}>
        <Routes>
          <Route path="/select-role" element={<RoleSelectPage />} />
          <Route path="/worker" element={<p>복지사 대시보드 화면</p>} />
        </Routes>
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: workerRoleName }))
    await user.click(screen.getByRole('button', { name: nextButtonName }))

    expect(screen.getByText('복지사 대시보드 화면')).toBeTruthy()
  })
})
