import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ElderBasicInfoPage } from './ElderBasicInfoPage'

describe('ElderBasicInfoPage', () => {
  it('renders the senior basic information form without progress dots', () => {
    render(
      <MemoryRouter>
        <ElderBasicInfoPage />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: /기본 정보를 알려주세요/ }),
    ).toBeTruthy()
    expect(screen.getByLabelText('이름')).toBeTruthy()
    expect(screen.getByLabelText('나이')).toBeTruthy()
    expect(screen.getByLabelText('연락처')).toBeTruthy()
    expect(screen.getByLabelText('주소')).toBeTruthy()
    expect(screen.queryByLabelText(/단계/)).not.toBeInTheDocument()
  })

  it('continues to the daily check screen', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/elder/basic-info']}>
        <Routes>
          <Route path="/elder/basic-info" element={<ElderBasicInfoPage />} />
          <Route path="/elder/check" element={<p>복약 상태 입력 화면</p>} />
        </Routes>
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: '다음' }))

    expect(screen.getByText('복약 상태 입력 화면')).toBeTruthy()
  })
})
