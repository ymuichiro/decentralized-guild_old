import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Index from '@pages/Index';
import Join from '@pages/login/Join';
import Dashboard from '@pages/app/Dashboard';

import './styles/main.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/join',
    element: <Join />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
]);

const Root = (): JSX.Element => {
  return <RouterProvider router={router} />;
};

export default Root;
