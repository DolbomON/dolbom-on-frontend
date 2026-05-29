import { BriefcaseMedical, HeartHandshake, UsersRound } from 'lucide-react'
import { PageShell } from '../components/layout/PageShell'
import { SeniorActionCard } from '../components/senior/SeniorActionCard'

export function RoleSelectPage() {
  return (
    <PageShell
      title="역할을 선택해 주세요"
      description="처음 화면은 역할별 흐름을 빠르게 확인할 수 있게 나누었습니다."
      backTo="/"
    >
      <section className="grid gap-4 md:grid-cols-3">
        <SeniorActionCard
          to="/elder"
          title="어르신"
          description="건강 확인과 마음 대화를 시작합니다."
          icon={<HeartHandshake aria-hidden="true" size={30} />}
          tone="calm"
        />
        <SeniorActionCard
          to="/family"
          title="가족"
          description="가족의 돌봄 상태를 확인합니다."
          icon={<UsersRound aria-hidden="true" size={30} />}
          tone="warm"
        />
        <SeniorActionCard
          to="/worker"
          title="복지사"
          description="담당 어르신의 위험 신호를 봅니다."
          icon={<BriefcaseMedical aria-hidden="true" size={30} />}
        />
      </section>
    </PageShell>
  )
}
