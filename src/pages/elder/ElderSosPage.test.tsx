import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ElderSosPage } from './ElderSosPage'

function renderElderSosPage() {
  return render(
    <MemoryRouter>
      <ElderSosPage />
    </MemoryRouter>,
  )
}

describe('ElderSosPage', () => {
  it('renders emergency SOS controls and call history', async () => {
    const user = userEvent.setup()
    renderElderSosPage()

    expect(screen.getByLabelText('긴급 SOS 화면')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '긴급 SOS' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '긴급 SOS 호출' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'SOS 호출 이력' }),
    ).toBeInTheDocument()
    expect(screen.getAllByText('대응 완료')).toHaveLength(2)

    await user.click(screen.getByRole('button', { name: '긴급 SOS 호출' }))

    expect(
      screen.getByText(
        '긴급 알림 발송 대기 중입니다. 오작동이면 지금 취소할 수 있어요.',
      ),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '오작동 취소' }))

    expect(
      screen.getByText('SOS 호출이 오작동으로 취소되었습니다.'),
    ).toBeInTheDocument()

    await user.click(
      screen.getByRole('button', { name: '지금 바로 알림 발송' }),
    )

    expect(
      screen.getByText(
        '긴급 알림이 가족과 복지사에게 최우선으로 발송되었습니다.',
      ),
    ).toBeInTheDocument()
  })
})
