import { Search } from 'lucide-react'

type WorkerSearchInputProps = {
  onChange: (value: string) => void
  value: string
}

export function WorkerSearchInput({ onChange, value }: WorkerSearchInputProps) {
  return (
    <div>
      <label htmlFor="worker-elder-search" className="sr-only">
        대상자 검색
      </label>
      <div className="flex min-h-[56px] items-center gap-3 rounded-full border border-[#cfd6e0] bg-white px-5 text-[#5f6672] shadow-[0_8px_18px_rgba(30,55,95,0.06)] focus-within:border-[#0867f2] focus-within:ring-4 focus-within:ring-[#dbeafe]">
        <Search aria-hidden="true" className="h-7 w-7 shrink-0" />
        <input
          id="worker-elder-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="이름 또는 상태로 검색"
          className="h-12 min-w-0 flex-1 border-0 bg-transparent text-[18px] font-medium leading-none text-[#20242c] outline-none placeholder:text-[#8a929f]"
        />
      </div>
    </div>
  )
}
