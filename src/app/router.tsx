import { createBrowserRouter } from 'react-router-dom'
import { LandingPage } from '../pages/LandingPage'
import { LoginPage } from '../pages/LoginPage'
import { RoleSelectPage } from '../pages/RoleSelectPage'
import { ElderChatPage } from '../pages/elder/ElderChatPage'
import { ElderBasicInfoPage } from '../pages/elder/ElderBasicInfoPage'
import { ElderCheckCompletePage } from '../pages/elder/ElderCheckCompletePage'
import { ElderCheckPage } from '../pages/elder/ElderCheckPage'
import { ElderDiseaseHistoryPage } from '../pages/elder/ElderDiseaseHistoryPage'
import { ElderDiscomfortCheckPage } from '../pages/elder/ElderDiscomfortCheckPage'
import { ElderHomePage } from '../pages/elder/ElderHomePage'
import { ElderMealCheckPage } from '../pages/elder/ElderMealCheckPage'
import { ElderMedicationCheckPage } from '../pages/elder/ElderMedicationCheckPage'
import { ElderMedicationHabitPage } from '../pages/elder/ElderMedicationHabitPage'
import { ElderMoodCheckPage } from '../pages/elder/ElderMoodCheckPage'
import { ElderPainWalkingPage } from '../pages/elder/ElderPainWalkingPage'
import { ElderSleepCheckPage } from '../pages/elder/ElderSleepCheckPage'
import { FamilyDashboardPage } from '../pages/family/FamilyDashboardPage'
import {
  WorkerAlertDetailPlaceholderPage,
  WorkerAlertsPage,
} from '../pages/worker/WorkerAlertsPage'
import { WorkerDashboardPage } from '../pages/worker/WorkerDashboardPage'
import { WorkerElderDetailPage } from '../pages/worker/WorkerElderDetailPage'
import { WorkerEldersPage } from '../pages/worker/WorkerEldersPage'
import { WorkerMemoCreatePage } from '../pages/worker/WorkerMemoCreatePage'
import { WorkerMypagePage } from '../pages/worker/WorkerMypagePage'
import { WorkerReportsPage } from '../pages/worker/WorkerReportsPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/select-role',
    element: <RoleSelectPage />,
  },
  {
    path: '/elder',
    element: <ElderHomePage />,
  },
  {
    path: '/elder/basic-info',
    element: <ElderBasicInfoPage />,
  },
  {
    path: '/elder/check',
    element: <ElderCheckPage />,
  },
  {
    path: '/elder/check/medication-habit',
    element: <ElderMedicationHabitPage />,
  },
  {
    path: '/elder/check/disease-history',
    element: <ElderDiseaseHistoryPage />,
  },
  {
    path: '/elder/check/pain-walking',
    element: <ElderPainWalkingPage />,
  },
  {
    path: '/elder/check/medication',
    element: <ElderMedicationCheckPage />,
  },
  {
    path: '/elder/check/meal',
    element: <ElderMealCheckPage />,
  },
  {
    path: '/elder/check/discomfort',
    element: <ElderDiscomfortCheckPage />,
  },
  {
    path: '/elder/check/mood',
    element: <ElderMoodCheckPage />,
  },
  {
    path: '/elder/check/sleep',
    element: <ElderSleepCheckPage />,
  },
  {
    path: '/elder/check/complete',
    element: <ElderCheckCompletePage />,
  },
  {
    path: '/elder/chat',
    element: <ElderChatPage />,
  },
  {
    path: '/family',
    element: <FamilyDashboardPage />,
  },
  {
    path: '/worker',
    element: <WorkerDashboardPage />,
  },
  {
    path: '/worker/alerts',
    element: <WorkerAlertsPage />,
  },
  {
    path: '/worker/alerts/:alertId',
    element: <WorkerAlertDetailPlaceholderPage />,
  },
  {
    path: '/worker/elders',
    element: <WorkerEldersPage />,
  },
  {
    path: '/worker/elders/:elderId/memo',
    element: <WorkerMemoCreatePage />,
  },
  {
    path: '/worker/elders/:elderId',
    element: <WorkerElderDetailPage />,
  },
  {
    path: '/worker/reports',
    element: <WorkerReportsPage />,
  },
  {
    path: '/worker/mypage',
    element: <WorkerMypagePage />,
  },
])
