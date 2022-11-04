import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Index from '@pages/Index';
import Join from '@pages/login/Join';
import Dashboard from '@pages/app/Dashboard';
import './styles/main.css';

export const ROUTER_PATHS = {
  _: {
    path: "/*",
    name: "_",
    element: <Index />,
  },
  top: {
    path: "/",
    name: "Top",
    element: <Index />,
  },
  join: {
    path: "/join",
    name: "Join",
    element: <Join />,
  },
  dashboard: {
    path: "/dashboard",
    name: "DashBoard",
    element: <div />,
  },
}

const router = createBrowserRouter(Object.keys(ROUTER_PATHS).map(e => ROUTER_PATHS[e as keyof typeof ROUTER_PATHS]));

const Root = (): JSX.Element => {
  return <RouterProvider router={router} />;
};

export default Root;
