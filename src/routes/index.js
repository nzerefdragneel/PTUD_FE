import AppLayout from "../pages/layout";
import { appRouters } from "./route.config";
import { appRouters_nv } from "./route_nv.config";
import { appRouters_qtv } from "./route_qtv.config";
import { appRouters_taiChinh } from "./route_taiChinh.config";
export default [
  {
    path: "/",
    element: <AppLayout />,
    children: appRouters.map((route) => {
      return {
        path: route.path,
        element: <route.component />,
      };
    }),
  },
  {
    path: "/",
    element: <AppLayout />,
    children: appRouters_nv.map((route) => {
      return {
        path: route.path,
        element: <route.component />,
      };
    }),
  },
  {
    path: "/",
    element: <AppLayout />,
    children: appRouters_qtv.map((route) => {
      return {
        path: route.path,
        element: <route.component />,
      };
    }),
  },
  {
    path: "/",
    element: <AppLayout />,
    children: appRouters_taiChinh.map((route) => {
      return {
        path: route.path,
        element: <route.component />,
      };
    }),
  },
];
