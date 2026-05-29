import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { LandingPage } from '../pages/LandingPage'

describe('LandingPage', () => {
  it('renders DolbomON branding', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'DolbomON' })).toBeTruthy()
  })
})
