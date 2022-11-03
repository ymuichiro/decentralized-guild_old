import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Index from '@pages/Index';
import Join from '@pages/login/Join';
import Dashboard from '@pages/app/Dashboard';

import './styles/main.css';

import Test from '@pages/Test';

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
    path: '/test',
    element: <Test />,
  },
]);

const Root = (): JSX.Element => {
  return <RouterProvider router={router} />;
};

export default Root;
