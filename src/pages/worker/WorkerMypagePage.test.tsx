import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { WorkerMypagePage } from './WorkerMypagePage'

function renderWorkerMypagePage() {
  return render(
    <MemoryRouter initialEntries={['/worker/mypage']}>
      <WorkerMypagePage />
    </MemoryRouter>,
  )
}

describe('WorkerMypagePage', () => {
  it('renders the worker mypage overview screen', () => {
    renderWorkerMypagePage()

    expect(
      screen.getByRole('heading', { name: '마이페이지' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('내 정보와 자주 쓰는 설정을 한눈에 관리하세요.'),
    ).toBeInTheDocument()
    expect(screen.getByText('이복지')).toBeInTheDocument()
    expect(screen.getByText('선임사회복지사')).toBeInTheDocument()
    expect(screen.getByText('청주시 서원구 돌봄센터')).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: '이복지 복지사 프로필 이미지' }),
    ).toHaveAttribute(
      'src',
      '/assets/dolbomon/worker-mypage/worker-lee-bokji.png',
    )
    expect(
      screen.getByRole('button', { name: '프로필 수정' }),
    ).toBeInTheDocument()

    expect(screen.getByText('내 담당자')).toBeInTheDocument()
    expect(screen.getByText('오늘 일정')).toBeInTheDocument()
    expect(screen.getAllByText('알림 설정')).toHaveLength(2)
    expect(screen.getByText('상담 메모 관리')).toBeInTheDocument()
    expect(screen.getByText('보고서 관리')).toBeInTheDocument()
    expect(screen.getByText('계정 및 보안')).toBeInTheDocument()
    expect(screen.getByText('도움말 및 문의')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '로그아웃' })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '설정 저장' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: '마이페이지 열기' }),
    ).toHaveAttribute('href', '/worker/mypage')
    expect(screen.queryByRole('navigation', { name: '하단 메뉴' })).toBeNull()
  })

  it('keeps not-yet-implemented actions safe', async () => {
    const user = userEvent.setup()

    renderWorkerMypagePage()

    await user.click(screen.getByRole('button', { name: '프로필 수정' }))
    await user.click(screen.getByRole('button', { name: '로그아웃' }))
    await user.click(screen.getByRole('button', { name: '설정 저장' }))

    expect(
      screen.getByRole('button', { name: '프로필 수정' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '로그아웃' })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '설정 저장' }),
    ).toBeInTheDocument()
  })
})
