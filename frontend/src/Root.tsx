import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Index from '@pages/Index';
import Join from '@pages/login/Join';
import Dashboard from '@pages/app/Dashboard';
import './styles/main.css';
import Quests from '@pages/app/Quests';
import QuestRequest from '@pages/app/QuestRequest';
import QuestOrderAccept from '@pages/app/QuestOrderAccept';

import Test from '@pages/Test';
export const ROUTER_PATHS = {
  _: {
    path: "/*",
    element: <Index />,
  },
  top: {
    path: "/",
    element: <Index />,
  },
  join: {
    path: "/join",
    element: <Join />,
  },
  dashboard: {
    path: "/dashboard",
    element: <Dashboard />,
  },
  quests: {
    path: "/quests",
    element: <Quests />,
  },
  questRequest: {
    path: "/quest-request",
    element: <QuestRequest />,
  },
  questOrderAccept: {
    path: "/quest-order-accept",
    element: <QuestOrderAccept />,
  },
  test: {
    path: "/test",
    name: "Test",
    element: <Test />,
  },
}

const router = createBrowserRouter(Object.keys(ROUTER_PATHS).map(e => ROUTER_PATHS[e as keyof typeof ROUTER_PATHS]));

const Root = (): JSX.Element => {
  return <RouterProvider router={router} />;
};

export default Root;
