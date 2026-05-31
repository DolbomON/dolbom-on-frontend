import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ElderSelfCarePage } from './ElderSelfCarePage'

describe('ElderSelfCarePage', () => {
  it('renders the sixth self-care setup step with saved images', () => {
    render(
      <MemoryRouter>
        <ElderSelfCarePage />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: '스스로 하시나요' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('progressbar', { name: '총 6단계 중 6단계' }),
    ).toBeTruthy()
    expect(screen.getByText('각 항목을 3단계로 골라주세요')).toBeTruthy()

    const mealRegion = screen.getByRole('region', { name: '식사 도움 정도' })
    const bathingRegion = screen.getByRole('region', { name: '목욕 도움 정도' })
    const medicineRegion = screen.getByRole('region', {
      name: '약 챙기기 도움 정도',
    })

    expect(mealRegion.querySelector('img')).toHaveAttribute(
      'src',
      '/assets/dolbomon/elder-check/밥.png',
    )
    expect(
      within(mealRegion).getByRole('button', { name: '혼자' }),
    ).toHaveAttribute('aria-pressed', 'true')
    expect(
      within(bathingRegion).getByRole('button', { name: '도움' }),
    ).toHaveAttribute('aria-pressed', 'true')
    expect(
      within(medicineRegion).getByRole('button', { name: '일부' }),
    ).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: '다음' })).toBeTruthy()
  })

  it('updates self-care answers', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <ElderSelfCarePage />
      </MemoryRouter>,
    )

    const outingRegion = screen.getByRole('region', { name: '외출 도움 정도' })
    const helpButton = within(outingRegion).getByRole('button', {
      name: '도움',
    })
    const partialButton = within(outingRegion).getByRole('button', {
      name: '일부',
    })

    await user.click(helpButton)

    expect(partialButton).toHaveAttribute('aria-pressed', 'false')
    expect(helpButton).toHaveAttribute('aria-pressed', 'true')
  })

  it('continues to the final survey after self-care answers', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/elder/check/self-care']}>
        <Routes>
          <Route
            path="/elder/check/self-care"
            element={<ElderSelfCarePage />}
          />
          <Route
            path="/elder/check/final-survey"
            element={<p>마지막 설문 입력 화면</p>}
          />
        </Routes>
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: '다음' }))

    expect(await screen.findByText('마지막 설문 입력 화면')).toBeTruthy()
  })
})
