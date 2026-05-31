import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ElderLivingEnvironmentPage } from './ElderLivingEnvironmentPage'

describe('ElderLivingEnvironmentPage', () => {
  it('renders the fifth living environment setup step with saved images', () => {
    render(
      <MemoryRouter>
        <ElderLivingEnvironmentPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: '생활 환경' })).toBeTruthy()
    expect(
      screen.getByRole('progressbar', { name: '총 6단계 중 5단계' }),
    ).toBeTruthy()
    expect(screen.getByText('지금 누구와 사세요?')).toBeTruthy()
    expect(screen.getByText('주거 형태')).toBeTruthy()
    expect(screen.getByText('급할 때 연락할 가족이 있나요?')).toBeTruthy()

    const aloneButton = screen.getByRole('button', { name: '혼자' })
    const familyButton = screen.getByRole('button', { name: '가족과' })
    const apartmentButton = screen.getByRole('button', { name: '아파트' })
    const detachedButton = screen.getByRole('button', { name: '단독주택' })
    const yesButton = screen.getByRole('button', { name: '있어요' })
    const noButton = screen.getByRole('button', { name: '없어요' })

    expect(aloneButton).toHaveAttribute('aria-pressed', 'true')
    expect(familyButton).toHaveAttribute('aria-pressed', 'false')
    expect(apartmentButton).toHaveAttribute('aria-pressed', 'false')
    expect(detachedButton).toHaveAttribute('aria-pressed', 'true')
    expect(apartmentButton.querySelector('span')).toHaveClass(
      'whitespace-nowrap',
    )
    expect(detachedButton.querySelector('span')).toHaveClass(
      'whitespace-nowrap',
    )
    expect(yesButton).toHaveAttribute('aria-pressed', 'true')
    expect(noButton).toHaveAttribute('aria-pressed', 'false')
    expect(aloneButton.querySelector('img')).toHaveAttribute(
      'src',
      '/assets/dolbomon/elder-check/혼자.png',
    )
    expect(familyButton.querySelector('img')).toHaveAttribute(
      'src',
      '/assets/dolbomon/elder-check/같이.png',
    )
    expect(screen.getByRole('button', { name: '다음' })).toBeTruthy()
  })

  it('updates living environment answers', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <ElderLivingEnvironmentPage />
      </MemoryRouter>,
    )

    const familyButton = screen.getByRole('button', { name: '가족과' })
    const rentalButton = screen.getByRole('button', { name: '임대' })
    const noButton = screen.getByRole('button', { name: '없어요' })

    await user.click(familyButton)
    await user.click(rentalButton)
    await user.click(noButton)

    expect(screen.getByRole('button', { name: '혼자' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
    expect(familyButton).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: '단독주택' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
    expect(rentalButton).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: '있어요' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
    expect(noButton).toHaveAttribute('aria-pressed', 'true')
  })

  it('continues to the self-care step after living environment answers', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/elder/check/living-environment']}>
        <Routes>
          <Route
            path="/elder/check/living-environment"
            element={<ElderLivingEnvironmentPage />}
          />
          <Route
            path="/elder/check/self-care"
            element={<p>스스로 하기 입력 화면</p>}
          />
        </Routes>
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: '다음' }))

    expect(await screen.findByText('스스로 하기 입력 화면')).toBeTruthy()
  })
})
