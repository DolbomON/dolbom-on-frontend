import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { RoleSelectPage } from './RoleSelectPage'

const headingName =
  '\uC774\uC6A9 \uC720\uD615\uC744 \uC120\uD0DD\uD574\uC8FC\uC138\uC694'
const elderRoleName = '\uC5B4\uB974\uC2E0'
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
})
