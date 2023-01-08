import type { RouteObject } from "react-router-dom";
import { Home } from "src/pages/Home";

const routes: RouteObject[] = [
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "views",
        element: <div />
      },
      {
        path: "projects",
        element: <div />
      }
    ]
  },
  {
    path: "designer",
    element: <div />
  }
];

export default routes;
