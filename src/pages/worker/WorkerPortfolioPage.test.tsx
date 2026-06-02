import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { WorkerPortfolioPage } from './WorkerPortfolioPage'

function renderWorkerPortfolioPage() {
  return render(
    <MemoryRouter initialEntries={['/caregiver/portfolio']}>
      <WorkerPortfolioPage />
    </MemoryRouter>,
  )
}

describe('WorkerPortfolioPage', () => {
  it('renders the caregiver portfolio registration screen', () => {
    renderWorkerPortfolioPage()

    expect(
      screen.getByRole('heading', { name: '포트폴리오 등록' }),
    ).toBeInTheDocument()
    const topMenu = screen.getByRole('navigation', {
      name: '요양사 상단 메뉴',
    })
    const sideMenu = screen.getByRole('navigation', {
      name: '요양사 좌측 메뉴',
    })
    const bottomMenu = screen.getByRole('navigation', { name: '하단 메뉴' })

    expect(
      within(topMenu).getByRole('link', { name: '오늘업무' }),
    ).toHaveAttribute('href', '/caregiver')
    expect(
      within(topMenu).getByRole('link', { name: '방문일정' }),
    ).toHaveAttribute('href', '/caregiver/schedules')
    expect(
      within(topMenu).getByRole('link', { name: '담당어르신' }),
    ).toHaveAttribute('href', '/caregiver/elders/kim-yeongja')
    expect(
      within(topMenu).getByRole('link', { name: '방문기록' }),
    ).toHaveAttribute('href', '/caregiver/records')
    expect(
      within(topMenu).getByRole('link', { name: '전달사항' }),
    ).toHaveAttribute('href', '/caregiver#family-memo')
    expect(
      within(topMenu).queryAllByRole('link', { name: '설정' }),
    ).toHaveLength(0)
    expect(within(topMenu).queryAllByRole('link', { name: '홈' })).toHaveLength(
      0,
    )
    expect(
      within(topMenu).queryAllByRole('link', { name: '포트폴리오' }),
    ).toHaveLength(0)
    expect(
      within(topMenu).queryAllByRole('link', { name: '안부현황' }),
    ).toHaveLength(0)
    expect(
      within(topMenu).queryAllByRole('link', { name: '기록' }),
    ).toHaveLength(0)
    expect(
      within(topMenu).queryAllByRole('link', { name: '일정' }),
    ).toHaveLength(0)
    expect(
      within(topMenu).queryAllByRole('link', { name: '가족메모' }),
    ).toHaveLength(0)
    expect(
      within(sideMenu).getByRole('link', { name: '대시보드' }),
    ).toHaveAttribute('href', '/caregiver')
    expect(
      within(sideMenu).getByRole('link', { name: '담당 어르신' }),
    ).toHaveAttribute('href', '/caregiver/elders/kim-yeongja')
    expect(
      within(sideMenu).getByRole('link', { name: '포트폴리오' }),
    ).toHaveAttribute('aria-current', 'page')
    expect(
      within(sideMenu).getByRole('link', { name: '포트폴리오' }),
    ).toHaveAttribute('href', '/caregiver/portfolio')
    expect(
      within(bottomMenu).getByRole('link', { name: '대시보드' }),
    ).toHaveAttribute('href', '/caregiver')
    expect(screen.getByText('1. 자기소개')).toBeInTheDocument()
    expect(screen.getByText('2. 전문 분야')).toBeInTheDocument()
    expect(screen.getByText('3. 주요 경력')).toBeInTheDocument()
    expect(screen.getByText('4. 자격 및 교육')).toBeInTheDocument()
    expect(screen.getByText('5. 활동 사진')).toBeInTheDocument()
    expect(screen.getByText('6. 대표 사례')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '포트폴리오 저장' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: '포트폴리오 완성도 78퍼센트' }),
    ).toBeInTheDocument()
  })

  it('updates form controls and announces save state', async () => {
    const user = userEvent.setup()

    renderWorkerPortfolioPage()

    await user.type(
      screen.getByLabelText('자기소개'),
      '어르신의 일상을 차분히 살피는 요양사입니다.',
    )
    await user.click(screen.getByRole('button', { name: '정서 지원' }))
    await user.click(screen.getByRole('button', { name: '포트폴리오 저장' }))

    expect(screen.getByText('24 / 500')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '정서 지원' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByText('포트폴리오가 저장되었습니다.')).toBeInTheDocument()
  })
})
