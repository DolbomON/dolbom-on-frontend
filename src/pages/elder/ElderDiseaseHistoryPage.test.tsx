import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ElderDiseaseHistoryPage } from './ElderDiseaseHistoryPage'

describe('ElderDiseaseHistoryPage', () => {
  it('renders the known disease step with saved condition images', () => {
    render(
      <MemoryRouter>
        <ElderDiseaseHistoryPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: '알고 계신 병' })).toBeTruthy()
    expect(
      screen.getByRole('progressbar', { name: '총 6단계 중 2단계' }),
    ).toBeTruthy()
    expect(screen.getByText('해당되는 것을 모두 눌러주세요')).toBeTruthy()
    expect(screen.getByText('예전에 입원·낙상한 적 있나요?')).toBeTruthy()

    const hypertensionButton = screen.getByRole('button', { name: '고혈압' })
    const diabetesButton = screen.getByRole('button', { name: '당뇨' })
    const jointButton = screen.getByRole('button', { name: '관절' })
    const dementiaButton = screen.getByRole('button', { name: '치매' })
    const noButton = screen.getByRole('button', { name: '없어요' })

    expect(hypertensionButton).toHaveAttribute('aria-pressed', 'true')
    expect(diabetesButton).toHaveAttribute('aria-pressed', 'true')
    expect(jointButton).toHaveAttribute('aria-pressed', 'true')
    expect(dementiaButton).toHaveAttribute('aria-pressed', 'false')
    expect(noButton).toHaveAttribute('aria-pressed', 'true')
    expect(hypertensionButton.querySelector('img')).toHaveAttribute(
      'src',
      '/assets/dolbomon/elder-check/blade.png',
    )
    expect(diabetesButton.querySelector('img')).toHaveAttribute(
      'src',
      '/assets/dolbomon/elder-check/당뇨.png',
    )
    expect(screen.getByRole('button', { name: '다음' })).toBeTruthy()
  })

  it('toggles condition choices and hospital fall history', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <ElderDiseaseHistoryPage />
      </MemoryRouter>,
    )

    const dementiaButton = screen.getByRole('button', { name: '치매' })
    const noButton = screen.getByRole('button', { name: '없어요' })
    const yesButton = screen.getByRole('button', { name: '있어요' })

    await user.click(dementiaButton)
    await user.click(yesButton)

    expect(dementiaButton).toHaveAttribute('aria-pressed', 'true')
    expect(yesButton).toHaveAttribute('aria-pressed', 'true')
    expect(noButton).toHaveAttribute('aria-pressed', 'false')
  })

  it('continues to the pain walking step after disease history answers', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/elder/check/disease-history']}>
        <Routes>
          <Route
            path="/elder/check/disease-history"
            element={<ElderDiseaseHistoryPage />}
          />
          <Route
            path="/elder/check/pain-walking"
            element={<p>통증 걷기 입력 화면</p>}
          />
        </Routes>
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: '다음' }))

    expect(await screen.findByText('통증 걷기 입력 화면')).toBeTruthy()
  })
})
