import { createBrowserRouter, Navigate } from 'react-router-dom'
import { LandingPage } from '../pages/LandingPage'
import { LoginPage } from '../pages/LoginPage'
import { RoleSelectPage } from '../pages/RoleSelectPage'
import { SignupPage } from '../pages/SignupPage'
import { RoleMypagePage } from '../pages/RoleMypagePage'
import { CaregiverAssignmentsPage } from '../pages/caregiver/CaregiverAssignmentsPage'
import { CaregiverDashboardPage } from '../pages/caregiver/CaregiverDashboardPage'
import { CaregiverVisitRecordsPage } from '../pages/caregiver/CaregiverVisitRecordsPage'
import { CaregiverVisitSchedulePage } from '../pages/caregiver/CaregiverVisitSchedulePage'
import { ElderChatPage } from '../pages/elder/ElderChatPage'
import { ElderBasicInfoPage } from '../pages/elder/ElderBasicInfoPage'
import { ElderCareTeamPage } from '../pages/elder/ElderCareTeamPage'
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
import { ElderSosPage } from '../pages/elder/ElderSosPage'
import { ElderVoiceGuidePage } from '../pages/elder/ElderVoiceGuidePage'
import { ElderVoiceListeningPage } from '../pages/elder/ElderVoiceListeningPage'
import { FamilyAlertsPage } from '../pages/family/FamilyAlertsPage'
import { FamilyChatPage } from '../pages/family/FamilyChatPage'
import { FamilyConnectPage } from '../pages/family/FamilyConnectPage'
import { FamilyDashboardPage } from '../pages/family/FamilyDashboardPage'
import { FamilyMemoPage } from '../pages/family/FamilyMemoPage'
import { FamilyStatusPage } from '../pages/family/FamilyStatusPage'
import {
  WorkerAlertDetailPlaceholderPage,
  WorkerAlertsPage,
} from '../pages/worker/WorkerAlertsPage'
import { WorkerCaseNoteCreatePage } from '../pages/worker/WorkerCaseNoteCreatePage'
import { WorkerDashboardPage } from '../pages/worker/WorkerDashboardPage'
import { WorkerElderDetailPage } from '../pages/worker/WorkerElderDetailPage'
import { WorkerConsultationsPage } from '../pages/worker/WorkerConsultationsPage'
import { WorkerMemoCreatePage } from '../pages/worker/WorkerMemoCreatePage'
import { WorkerMypagePage } from '../pages/worker/WorkerMypagePage'
import { WorkerPortfolioPage } from '../pages/worker/WorkerPortfolioPage'
import { WorkerReportsPage } from '../pages/worker/WorkerReportsPage'
import { WorkerSchedulesPage } from '../pages/worker/WorkerSchedulesPage'
import { WorkerSignupBasicInfoPage } from '../pages/worker/WorkerSignupBasicInfoPage'
import { WorkerSignupLicensePage } from '../pages/worker/WorkerSignupLicensePage'
import { WorkerSignupPage } from '../pages/worker/WorkerSignupPage'
import { WorkerWelfareConnectPage } from '../pages/worker/WorkerWelfareConnectPage'

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
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/register',
    element: <Navigate replace to="/signup" />,
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
    path: '/elder/sos',
    element: <ElderSosPage />,
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
    path: '/elder/connect',
    element: <ElderCareTeamPage />,
  },
  {
    path: '/elder/mypage',
    element: <RoleMypagePage role="elder" />,
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
    path: '/family/memo',
    element: <FamilyMemoPage />,
  },
  {
    path: '/family/connect',
    element: <FamilyConnectPage />,
  },
  {
    path: '/family/mypage',
    element: <RoleMypagePage role="family" />,
  },
  {
    path: '/caregiver',
    element: <CaregiverDashboardPage />,
  },
  {
    path: '/caregiver/assignments',
    element: <CaregiverAssignmentsPage />,
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
    path: '/caregiver/mypage',
    element: <RoleMypagePage role="caregiver" />,
  },

  {
    path: '/caregiver/elders/:elderId',
    element: <WorkerElderDetailPage />,
  },
  {
    path: '/caregiver/elders/:elderId/visit-record',
    element: <WorkerMemoCreatePage />,
  },
  {
    path: '/worker',
    element: <WorkerDashboardPage />,
  },
  {
    path: '/worker/welfare-connect',
    element: <WorkerWelfareConnectPage />,
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
    element: <Navigate replace to="/worker#risk-elder-panel" />,
  },
  {
    path: '/worker/consultations',
    element: <WorkerConsultationsPage />,
  },
  {
    path: '/worker/elders/:elderId/memo',
    element: <WorkerCaseNoteCreatePage />,
  },
  {
    path: '/worker/elders/:elderId/case-note',
    element: <WorkerCaseNoteCreatePage />,
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
