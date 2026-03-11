import { RouteObject } from 'react-router-dom';
import HomePage from '../pages/home/page';
import DashboardPage from '../pages/dashboard/page';
import EquipmentPage from '../pages/equipment/page';
import MaintenancePage from '../pages/maintenance/page';
import TicketsPage from '../pages/tickets/page';
import UsersPage from '../pages/users/page';
import LocationsPage from '../pages/locations/page';
import ReportsPage from '../pages/reports/page';
import LoginPage from '../pages/auth/login/page';
import ProfilePage from '../pages/profile/page';
import SettingsPage from '../pages/settings/page';
import DepartmentsPage from '../pages/departments/page';
import ChatPage from '../pages/chat/page';
import NotFound from '../pages/NotFound';
import NotificationsPage from '../pages/notifications/page';

const routes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/',
    element: <DashboardPage />
  },
  {
    path: '/equipment',
    element: <EquipmentPage />
  },
  {
    path: '/maintenance',
    element: <MaintenancePage />
  },
  {
    path: '/tickets',
    element: <TicketsPage />
  },
  {
    path: '/chat',
    element: <ChatPage />
  },
  {
    path: '/users',
    element: <UsersPage />
  },
  {
    path: '/locations',
    element: <LocationsPage />
  },
  {
    path: '/reports',
    element: <ReportsPage />
  },
  {
    path: '/profile',
    element: <ProfilePage />
  },
  {
    path: '/settings',
    element: <SettingsPage />
  },
  {
    path: '/home',
    element: <HomePage />
  },
  {
    path: '/departments',
    element: <DepartmentsPage />,
  },
  {
    path: '/notifications',
    element: <NotificationsPage />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes;
