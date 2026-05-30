import { useMemo, useState } from 'react'
import { ManagedElderCard } from '../../components/worker/ManagedElderCard'
import { WorkerBottomNav } from '../../components/worker/WorkerBottomNav'
import { WorkerFilterChips } from '../../components/worker/WorkerFilterChips'
import { WorkerPageHeader } from '../../components/worker/WorkerPageHeader'
import { WorkerQuickActions } from '../../components/worker/WorkerQuickActions'
import { WorkerSearchInput } from '../../components/worker/WorkerSearchInput'
import {
  managedElders,
  type ElderFilter,
  type ManagedElder,
} from '../../features/worker/managedEldersData'

function normalizeSearchValue(value: string) {
  return value.trim().toLocaleLowerCase('ko-KR')
}

function elderMatchesSearch(elder: ManagedElder, searchQuery: string) {
  const keyword = normalizeSearchValue(searchQuery)

  if (!keyword) {
    return true
  }

  const searchableText = [
    elder.name,
    elder.household,
    elder.riskLabel,
    elder.statusReason,
    elder.lastInputText,
  ]
    .map(normalizeSearchValue)
    .join(' ')

  return searchableText.includes(keyword)
}

export function WorkerEldersPage() {
  const [activeFilter, setActiveFilter] = useState<ElderFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredElders = useMemo(() => {
    return managedElders.filter((elder) => {
      const matchesFilter =
        activeFilter === 'all' || elder.riskStatus === activeFilter

      return matchesFilter && elderMatchesSearch(elder, searchQuery)
    })
  }, [activeFilter, searchQuery])

  const showDangerOnly = () => {
    setActiveFilter('danger')
  }

  const showMissingInput = () => {
    setActiveFilter('all')
    // TODO: Replace this keyword shortcut with a dedicated missing-input filter
    // once the worker assigned elder API returns daily input status flags.
    setSearchQuery('입력 지연')
  }

  return (
    <main className="min-h-svh overflow-x-hidden bg-[#eef6ff] text-[#071747]">
      <div className="mx-auto min-h-svh w-full max-w-[480px] bg-[#f8fbff] shadow-[0_24px_70px_rgba(42,96,184,0.12)]">
        <WorkerPageHeader />

        <div className="px-5 pb-[calc(112px+env(safe-area-inset-bottom))] pt-7">
          <section aria-labelledby="worker-elders-title">
            <h1
              id="worker-elders-title"
              className="text-[34px] font-black leading-tight text-[#071747]"
            >
              대상자 관리
            </h1>
            <p className="mt-4 text-[17px] font-medium leading-snug text-[#4e596c]">
              담당 어르신의 상태를 빠르게 확인하고 관리할 수 있어요.
            </p>
          </section>

          <div className="mt-6">
            <WorkerSearchInput value={searchQuery} onChange={setSearchQuery} />
          </div>

          <div className="mt-4">
            <WorkerFilterChips
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </div>

          <section className="mt-5 grid gap-3" aria-label="대상자 목록">
            {filteredElders.map((elder) => (
              <ManagedElderCard key={elder.id} elder={elder} />
            ))}

            {filteredElders.length === 0 && (
              <div className="rounded-[24px] border border-[#dbe8ff] bg-white px-5 py-8 text-center shadow-[0_12px_24px_rgba(32,79,150,0.07)]">
                <p className="text-[18px] font-black text-[#071747]">
                  조건에 맞는 대상자가 없어요.
                </p>
              </div>
            )}
          </section>

          <div className="mt-8">
            <WorkerQuickActions
              onShowDangerOnly={showDangerOnly}
              onShowMissingInput={showMissingInput}
            />
          </div>
        </div>
      </div>

      <WorkerBottomNav />
    </main>
  )
}
