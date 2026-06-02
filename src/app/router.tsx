import { createBrowserRouter } from 'react-router-dom'
import { LandingPage } from '../pages/LandingPage'
import { LoginPage } from '../pages/LoginPage'
import { RoleSelectPage } from '../pages/RoleSelectPage'
import { CaregiverDashboardPage } from '../pages/caregiver/CaregiverDashboardPage'
import { CaregiverVisitRecordsPage } from '../pages/caregiver/CaregiverVisitRecordsPage'
import { CaregiverVisitSchedulePage } from '../pages/caregiver/CaregiverVisitSchedulePage'
import { ElderChatPage } from '../pages/elder/ElderChatPage'
import { ElderBasicInfoPage } from '../pages/elder/ElderBasicInfoPage'
import { ElderCheckCompletePage } from '../pages/elder/ElderCheckCompletePage'
import { ElderCheckPage } from '../pages/elder/ElderCheckPage'
import { ElderDiseaseHistoryPage } from '../pages/elder/ElderDiseaseHistoryPage'
import { ElderDiscomfortCheckPage } from '../pages/elder/ElderDiscomfortCheckPage'
import { ElderFinalSurveyPage } from '../pages/elder/ElderFinalSurveyPage'
import { ElderHomePage } from '../pages/elder/ElderHomePage'
import { ElderLivingEnvironmentPage } from '../pages/elder/ElderLivingEnvironmentPage'
import { ElderMealCheckPage } from '../pages/elder/ElderMealCheckPage'
import { ElderMedicationCheckPage } from '../pages/elder/ElderMedicationCheckPage'
import { ElderMedicationHabitPage } from '../pages/elder/ElderMedicationHabitPage'
import { ElderMoodCheckPage } from '../pages/elder/ElderMoodCheckPage'
import { ElderPainWalkingPage } from '../pages/elder/ElderPainWalkingPage'
import { ElderSelfCarePage } from '../pages/elder/ElderSelfCarePage'
import { ElderSleepHabitPage } from '../pages/elder/ElderSleepHabitPage'
import { ElderSleepCheckPage } from '../pages/elder/ElderSleepCheckPage'
import { ElderVoiceGuidePage } from '../pages/elder/ElderVoiceGuidePage'
import { ElderVoiceListeningPage } from '../pages/elder/ElderVoiceListeningPage'
import { FamilyAlertsPage } from '../pages/family/FamilyAlertsPage'
import { FamilyChatPage } from '../pages/family/FamilyChatPage'
import { FamilyDashboardPage } from '../pages/family/FamilyDashboardPage'
import { FamilyStatusPage } from '../pages/family/FamilyStatusPage'
import {
  WorkerAlertDetailPlaceholderPage,
  WorkerAlertsPage,
} from '../pages/worker/WorkerAlertsPage'
import { WorkerDashboardPage } from '../pages/worker/WorkerDashboardPage'
import { WorkerElderDetailPage } from '../pages/worker/WorkerElderDetailPage'
import { WorkerEldersPage } from '../pages/worker/WorkerEldersPage'
import { WorkerConsultationsPage } from '../pages/worker/WorkerConsultationsPage'
import { WorkerMemoCreatePage } from '../pages/worker/WorkerMemoCreatePage'
import { WorkerMypagePage } from '../pages/worker/WorkerMypagePage'
import { WorkerPortfolioPage } from '../pages/worker/WorkerPortfolioPage'
import { WorkerReportsPage } from '../pages/worker/WorkerReportsPage'
import { WorkerSchedulesPage } from '../pages/worker/WorkerSchedulesPage'
import { WorkerSignupBasicInfoPage } from '../pages/worker/WorkerSignupBasicInfoPage'
import { WorkerSignupLicensePage } from '../pages/worker/WorkerSignupLicensePage'
import { WorkerSignupPage } from '../pages/worker/WorkerSignupPage'

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
    path: '/elder/voice',
    element: <ElderVoiceGuidePage />,
  },
  {
    path: '/elder/voice/listening',
    element: <ElderVoiceListeningPage />,
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
    path: '/elder/check/sleep-habit',
    element: <ElderSleepHabitPage />,
  },
  {
    path: '/elder/check/living-environment',
    element: <ElderLivingEnvironmentPage />,
  },
  {
    path: '/elder/check/self-care',
    element: <ElderSelfCarePage />,
  },
  {
    path: '/elder/check/final-survey',
    element: <ElderFinalSurveyPage />,
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
    path: '/family/status',
    element: <FamilyStatusPage />,
  },
  {
    path: '/family/alerts',
    element: <FamilyAlertsPage />,
  },
  {
    path: '/family/chat',
    element: <FamilyChatPage />,
  },
  {
    path: '/caregiver',
    element: <CaregiverDashboardPage />,
  },
  {
    path: '/caregiver/schedules',
    element: <CaregiverVisitSchedulePage />,
  },
  {
    path: '/caregiver/records',
    element: <CaregiverVisitRecordsPage />,
  },
  {
    path: '/caregiver/elders/:elderId',
    element: <WorkerElderDetailPage />,
  },
  {
    path: '/worker',
    element: <WorkerDashboardPage />,
  },
  {
    path: '/worker/signup',
    element: <WorkerSignupBasicInfoPage />,
  },
  {
    path: '/worker/signup/license',
    element: <WorkerSignupLicensePage />,
  },
  {
    path: '/worker/signup/preview',
    element: <WorkerSignupPage />,
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
    path: '/worker/consultations',
    element: <WorkerConsultationsPage />,
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
    path: '/worker/schedules',
    element: <WorkerSchedulesPage />,
  },
  {
    path: '/caregiver/portfolio',
    element: <WorkerPortfolioPage />,
  },
  {
    path: '/worker/mypage',
    element: <WorkerMypagePage />,
  },
])
