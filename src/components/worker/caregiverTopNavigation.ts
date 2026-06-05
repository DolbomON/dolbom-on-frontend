import type { TranslationKey } from '../../lib/i18n/translations'

type CaregiverTopNavItem = {
  href: string
  label: string
  labelKey: TranslationKey
}

export const caregiverTopNavItems = [
  { href: '/caregiver', label: '홈', labelKey: 'caregiver.nav.home' },
  {
    href: '/caregiver/assignments',
    label: '오늘 업무',
    labelKey: 'caregiver.nav.assignments',
  },
  {
    href: '/caregiver/schedules',
    label: '방문일정',
    labelKey: 'caregiver.nav.schedules',
  },
  {
    href: '/caregiver/elders/kim-yeongja',
    label: '담당어르신',
    labelKey: 'caregiver.nav.elders',
  },
  {
    href: '/caregiver/connect',
    label: '어르신연결',
    labelKey: 'caregiver.nav.connect',
  },
  {
    href: '/caregiver/records',
    label: '방문기록',
    labelKey: 'caregiver.nav.records',
  },
  {
    href: '/caregiver/portfolio',
    label: '포트폴리오',
    labelKey: 'caregiver.nav.portfolio',
  },
] as const satisfies ReadonlyArray<CaregiverTopNavItem>
