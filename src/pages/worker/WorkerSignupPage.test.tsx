import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { WorkerSignupBasicInfoPage } from './WorkerSignupBasicInfoPage'
import { WorkerSignupPage } from './WorkerSignupPage'

describe('WorkerSignupPage', () => {
  it('renders the caregiver signup form with local profile and certificate assets', () => {
    render(
      <MemoryRouter initialEntries={['/worker/signup']}>
        <WorkerSignupBasicInfoPage />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: '요양사 가입 정보' }),
    ).toBeTruthy()
    expect(screen.getByRole('heading', { name: '기본 정보 입력' })).toBeTruthy()
    expect(screen.getByLabelText(/이름/)).toHaveValue('김민수')
    expect(screen.getByLabelText(/연락처/)).toHaveValue('010-1234-5678')
    expect(
      screen.getByRole('heading', { name: '프로필 미리보기' }),
    ).toBeTruthy()
    expect(screen.getByText('가입 준비중')).toBeTruthy()

    expect(screen.getByAltText('김민수 요양사 프로필 사진')).toHaveAttribute(
      'src',
      '/assets/dolbomon/role-select/role-worker.png',
    )

    expect(screen.getByAltText('자격증 첨부 파일 아이콘')).toHaveAttribute(
      'src',
      '/assets/dolbomon/worker/파일.png',
    )
    expect(screen.getByRole('link', { name: /저장하고 다음/ })).toHaveAttribute(
      'href',
      '/worker/signup/license',
    )
  })

  it('renders the third caregiver signup profile preview screen', () => {
    render(
      <MemoryRouter initialEntries={['/worker/signup/preview']}>
        <WorkerSignupPage />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: '요양사 가입 정보' }),
    ).toBeTruthy()
    expect(
      screen.getAllByRole('heading', { name: '프로필 미리보기' }).length,
    ).toBeGreaterThanOrEqual(2)
    expect(screen.getByText('보호자에게 보이는 소개')).toBeTruthy()
    expect(screen.getAllByText('가입 준비중').length).toBeGreaterThanOrEqual(2)
    expect(screen.getByText('전체 첨부 파일 보기 (3개)')).toBeTruthy()
    expect(screen.getByRole('link', { name: '가입 완료' })).toHaveAttribute(
      'href',
      '/worker',
    )
  })
})
