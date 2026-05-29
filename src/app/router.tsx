import { createBrowserRouter } from 'react-router-dom'
import { LandingPage } from '../pages/LandingPage'
import { LoginPage } from '../pages/LoginPage'
import { RoleSelectPage } from '../pages/RoleSelectPage'
import { ElderChatPage } from '../pages/elder/ElderChatPage'
import { ElderCheckPage } from '../pages/elder/ElderCheckPage'
import { ElderHomePage } from '../pages/elder/ElderHomePage'
import { FamilyDashboardPage } from '../pages/family/FamilyDashboardPage'
import { ElderDetailPage } from '../pages/worker/ElderDetailPage'
import { WorkerDashboardPage } from '../pages/worker/WorkerDashboardPage'

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
    path: '/elder/check',
    element: <ElderCheckPage />,
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
    path: '/worker/elders/:elderId',
    element: <ElderDetailPage />,
  },
])
