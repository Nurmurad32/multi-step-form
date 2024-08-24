import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../layout/Dashboard';
import CompanyRegistration from '../pages/CompanyRegistration';
import CompanyData from '../pages/CompanyData';
import VesselRegistration from '../pages/VesselRegistration';
import CompanyVesselManagement from '../pages/CompanyVesselManagement';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      { path: "/", element: <CompanyData /> },
      { path: "/vessel-management", element: <CompanyVesselManagement /> },
    ]
  },
]);

export default router;